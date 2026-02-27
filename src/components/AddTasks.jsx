import { useState } from "react";
import Input from "./input";

function AddTasks({onAddTaskSubmit}) {
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");

    return (
      <div className="space-y-4 p-6 bg-slate-200 rounded-md shadow flex flex-col">
        <Input type="text" placeholder="Digite o nome da tarefa" value={title}
        onChange={(e) => setTitle(e.currentTarget.value)}/>

        <Input type="text" placeholder="Digite a descrição da tarefa" value={description}
        onChange={(e) => setDescription(e.currentTarget.value)}/>
        <button 
          onClick={() => {
            // Verificando se os campos estao vazios
            if(!title.trim() || !description.trim()){
              alert("Preencha os campos para adicionar a tarefa");
              return;
            }
            // Adicionando a tarefa
            onAddTaskSubmit(title, description);
            // Limpando os campos
            setTitle("");
            setDescription("");
          }} className="bg-slate-500 text-white px-4 py-2 rounded-md font-medium">
          Adicionar
        </button>
      </div>
    );
}

export default AddTasks;