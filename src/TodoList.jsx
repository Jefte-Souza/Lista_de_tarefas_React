import React, {useState, useEffect} from "react";
import './TodoList.css';
import icone from './assets/todo-list.png';

function TodoList(){

    const listaStorage = localStorage.getItem('lista');
    const [lista, setLista] = useState(listaStorage ? JSON.parse(listaStorage) : []); //verifica se existe dados no localstorage
    const [novoItem, setNovoItem] = useState("");

    //monitonar área sempre que 'lista' for alterada, salva no localstorage
    useEffect(()=>{
        localStorage.setItem('lista', JSON.stringify(lista));
    },[lista])

    function adicionaItem(form){
        form.preventDefault();
        if(!novoItem){
            return
        }
        setLista([...lista, {text: novoItem, isCompleted: false}]);
        setNovoItem("");
        document.getElementById('input-entrada').focus();
    }

    function clicou(index){
        const listaAux = [...lista];
        listaAux[index].isCompleted = !listaAux[index].isCompleted;
        setLista(listaAux);
    }

    function deletar(index){
        const listaAux = [...lista];
        listaAux.splice(index, 1);
        setLista(listaAux);
    }

    function deletarTudo(){
        setLista([]);
    }



    return (
        <div>
            <h1>Lista de Tarefas</h1>

            <form onSubmit={adicionaItem}>
                <input
                    id="input-entrada"
                    type="text"
                    value={novoItem}
                    onChange={(e)=> {setNovoItem(e.target.value)}}
                    placeholder="Digite a sua tarefa"
                    />

                <button className="add" type="submit">Add</button>
            </form>

            <div className="listaTarefas">
                <div style={{textAlign: 'center'}}>
                    {
                        lista.length < 1
                        ? 
                        <img className="icone-central" src={icone}/> 
                        : 
                        lista.map((item, index)=>(
                            <div 
                            key={index}
                            className={item.isCompleted ? "item completo" : "item"}
                            >
                                <span onClick={()=>{clicou(index)}}>{item.text}</span>
                                <button onClick={()=>{deletar(index)}} className="del">Deletar</button>
                            </div>
                        ))
                    }
                    
                </div>
                    {
                        lista.length > 0 && 
                        <button onClick={()=>{deletarTudo()}} className="deleteAll">Deletar Todas</button>
                    }

            </div>
        </div>
    )
}

export default TodoList;