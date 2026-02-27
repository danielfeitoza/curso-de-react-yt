import { ChevronLeftIcon } from "lucide-react";
import { useNavigate, useSearchParams } from "react-router-dom";
import Title from "../components/Title";

function TaskPage() {
    //Voltando a tela anterior
    const navigate = useNavigate();

    //No navigate, podemos chamar a pagina de destino usando as aspas simples ou aspas duplas, 
    // Exemplo navigate('/task') ou navigate("/task").
    // Se quesermos voltar para a página anterior, podemos usar navigate(-1) ou navigate("..").
    const [searchParams] = useSearchParams();
    const title = searchParams.get("title");
    const description = searchParams.get("description");
    return (
        <div className="w-screen h-screen bg-slate-500 flex items-top justify-center p-6">
            <div className="w-100 space-y-4">
                <div className="flex justify-center relative left-0">
                    <button onClick={() => navigate("/")} className="absolute left-0 top-0 bottom-0">
                        <ChevronLeftIcon className="text-slate-100" /> 
                    </button>
                    <Title>Detalhes da Tarefa</Title>
                </div>
                <div className="p-4 bg-slate-200 rounded-md shadow">
                    <h2 className="text-left text-slate-500 text-2xl font-bold ">{title}</h2>
                    <p className="text-left text-slate-500">{description}</p>
                </div>
            </div>

        </div>
    )
}

export default TaskPage;