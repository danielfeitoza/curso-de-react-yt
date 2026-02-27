// Eu posso simplificar o esse elemento input, substituindo o type={props.type} 
// placeholder={props.placeholder} 
// value={props.value} onChange={props.onChange}
//            por {...props} 
function Input(props){
    return(
        <input {...props} className="bg-white border border-slate-300 outline-slate-400 px-4 py-2 rounded-md"/>
    )
}

export default Input;

// Dentro do return como comentar o código JSX
// Para comentar o código JSX, você pode usar a sintaxe de comentário do JavaScript dentro de chaves {}. 
// Por exemplo, para comentar uma linha de código JSX, você pode fazer o seguinte:
// {/* <input type="text" placeholder="Digite o nome da tarefa" value={title} onChange={(e) => setTitle(e.currentTarget.value)} /> */}