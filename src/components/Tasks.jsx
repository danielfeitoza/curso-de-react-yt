import { CheckIcon, ChevronRightIcon, TrashIcon } from "lucide-react";
import { useNavigate } from "react-router-dom";
import Button from "./Button";


function Tasks({tasks, onTaskClick, onDeleteTaskClick, onSeeDetailsTaskClick}) {
    const navigate = useNavigate();

    function getShortTitle(title) {
        if (title.length <= 20) {
            return title;
        }

        return `${title.slice(0, 20)}...`;
    }

    function onSeeDetailsClick(task){
        const queryParams = new URLSearchParams({
            title: task.title,
            description: task.description
        }).toString();
        navigate(`/task?${queryParams}`); 
    }

    return (
        <ul className="space-y-4 p-6 bg-slate-200 rounded-md shadow">
            {tasks.map((task) => (
                <li key={task.id} className="flex gap-2">
                    <button onClick={() => onTaskClick(task.id)} 
                    className={`bg-slate-600 text-left w-full flex items-center gap-2 text-white p-2 rounded-md ${task.isCompleted ? "line-through" : ""}`}>
                        {task.isCompleted && <CheckIcon />}
                        {getShortTitle(task.title)}
                    </button>
                    <Button onClick={() => onSeeDetailsClick(task)} >
                        <ChevronRightIcon />
                    </Button>
                    <Button onClick={() => onDeleteTaskClick(task.id)} >
                        <TrashIcon />
                    </Button>
                </li>
            ))}
        </ul>
    );
}

export default Tasks;