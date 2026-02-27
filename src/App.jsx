import { useEffect, useState } from "react";
import Tasks from "./components/Tasks";
import AddTasks from "./components/AddTasks";
import { Routes, Route, Link, useNavigate, useParams } from "react-router-dom";
import TaskPages from "./pages/TaskPage";
import Title from "./components/Title";
import Test from "./components/Test";


function Home({ tasks, onTaskClick, onDeleteTaskClick, onAddTaskSubmit, onSeeDetailsClick }) {
  return (
    <div className="w-screen h-screen bg-slate-500 flex justify-center p-6">
      <div className="w-100 space-y-4">
        <Title>Gerenciador de Tarefas</Title>
        <AddTasks onAddTaskSubmit={onAddTaskSubmit}/>
        <Tasks
          tasks={tasks}
          onTaskClick={onTaskClick}
          onDeleteTaskClick={onDeleteTaskClick}
          onSeeDetailsClick={onSeeDetailsClick}
        />
      </div>
    </div>
  );
}


function App(){
  const navigate = useNavigate();
  // Hooks - Funções especiais que permitem "ligar" recursos do React a componentes funcionais

  // State (Estado) - Variáveis que eu quero que o React monitore
  // Props (Propriedades) - Informações que um componente pai passa para um componente filho
  // Eventos - Ações que podem ser disparadas pelo usuário, como cliques, submit de formulários, etc.
  
  // Usando o useState para criar um estado para a mensagem
  //const [message, setMessage] = useState("Olá, mundo! Esta é a mensagem inicial.");

    const [tasks, setTasks] = useState(() => {
      const storedTasks = localStorage.getItem("tasks");

      if (!storedTasks) {
        return [
          {
            id: 1,
            title: "Estudar React",
            description: "Aprender os conceitos básicos e avançados do React",
            isCompleted: false,
          },
        ];
      }

      try {
        const parsedTasks = JSON.parse(storedTasks);
        if (!Array.isArray(parsedTasks)) {
          return [];
        }

        return parsedTasks.filter(
          (task) =>
            task &&
            typeof task === "object" &&
            typeof task.id === "number" &&
            typeof task.title === "string"
        );
      } catch {
        return [];
      }
    });

  // No lugar dos dois [] vazios ou poderia ter uma lista elementos
  //{
  //    id: 1,
  //    title: "Estudar React",
  //    description: "Aprender os conceitos básicos e avançados do React",
  //    isCompleted: false
  //  }


  // localStorage - Permite armazenar dados no navegador do usuario, mesmo após o fechamento da aba ou do navegador. Ele é útil para persistir informações, como preferências do usuário, dados de formulários, ou até mesmo o estado de uma aplicação.
  // useEffect() - Permite executar código em momentos específicos do ciclo de vida do componente, como quando ele é montado, atualizado ou desmontado.

  // Usando o useEffect 

  //Explicando cada linha do useEffect:
  useEffect(() => { // O código dentro dessa função será executado sempre que o estado de "tasks" for atualizado.
    //console.log("O estado de tarefas foi atualizado:");// Imprime uma mensagem no console indicando que o estado de tarefas foi atualizado.
    //Salvando no localStorage
    localStorage.setItem("tasks", JSON.stringify(tasks)); // Converte o estado de "tasks" para uma string JSON e salva no localStorage com a chave "tasks". Isso permite que as tarefas sejam persistidas mesmo após o fechamento do navegador.
  },[tasks]);// O array de dependências [tasks] indica que o useEffect deve ser executado apenas quando o estado de "tasks" for atualizado. Se o array estivesse vazio [], o useEffect seria executado apenas uma vez, quando o componente fosse montado.

  //Um useEffect vazio (sem dependências) é executado apenas uma vez, quando o componente é montado. 
  // Ele é útil para realizar ações de inicialização, como buscar dados de uma API ou configurar um timer.
  useEffect(() => {
    //Chamando a API para buscar as tarefas
    async function fetchTasks(){
      const response = await fetch("https://jsonplaceholder.typicode.com/todos?_limit=10");
      const data = await response.json();
      setTasks(data);
      console.log(data);
    };

    // Se quiser voce pode chamar a API e salvar as tarefas em um banco de dados
    //fetchTasks();

  }, []);



  // useContext() - Permite compartilhar dados entre componentes sem precisar passar props manualmente em cada nível da árvore de componentes.
  // useRef() - Permite criar uma referência a um elemento DOM ou a um valor que persiste entre renderizações, sem causar uma nova renderização quando o valor é atualizado.
  // useMemo() - Permite memorizar um valor calculado para evitar cálculos desnecessários em renderizações subsequentes.
  // useCallback() - Permite memorizar uma função para evitar que ela seja recriada em cada renderização, o que pode ser útil para otimizar o desempenho de componentes filhos que dependem dessa função.


  function onTaskClick(taksId){
    const newTasks = tasks.map(task => {
      // Preciso atualizar a tarefa que foi clicada
      if(task.id === taksId){
        return {...task, isCompleted: !task.isCompleted};
      }
      return task;
    })

    setTasks(newTasks);
  }

  function onDeleteTaskClick(taskId){
    const taskDelete = tasks.filter(task => task.id !== taskId);
    setTasks(taskDelete);
  }

  function onSeeDetailsTaskClick(taskId) {
    navigate(`/tasks/${taskId}`);
  }

  // Criando uma nova tarefa
  function onAddTaskSubmit(title, description){
    //Id vai ser o id da última tarefa + 1
    const newTask = {
      id: tasks.length > 0 ? tasks[tasks.length - 1].id + 1 : 1,
      title,
      description,
      isCompleted: false
    };
    setTasks([...tasks, newTask]);
  }

  return (
    <Routes>
      <Route
        path="/"
        element={
          <Home
            tasks={tasks}
            onTaskClick={onTaskClick}
            onDeleteTaskClick={onDeleteTaskClick}
            onAddTaskSubmit={onAddTaskSubmit}
            onSeeDetailsClick={onSeeDetailsTaskClick}
          />
        }
      />
      <Route path="/task" element={<TaskPages />} />
    </Routes>
  )
}

export default App;

//Comando para instalar a biblioteca Tailwind CSS: 
// npm install -D tailwindcss postcss autoprefixer
// npx tailwindcss init -p