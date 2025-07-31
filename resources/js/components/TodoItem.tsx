import ToggleTodoForm from "./ToggleTodoForm";

/**
 * Inertia.js component for TodoItem
 *
 * @param {title, description, completed, due_date } - The component props
 * @returns {JSX.Element} - The rendered component
 */
interface TodoItemProps {
    id: number;
    title: string; 
    description: string;
    due_date: string; 
    isCompleted: boolean;
}

export default function TodoItem({
    id,
    title,
    description,
    due_date,
    isCompleted
}: TodoItemProps) {

    console.log({isCompleted})
    
    const classes = isCompleted 
        ? 'bg-blue-900 shadow-lg data-[state=completed]:bg-blue-900 data-[state=completed]:text-white' 
        : 'bg-white shadow-md';
    
    return (
        <div className={`${classes} rounded`} data-state={isCompleted ? 'completed' : 'incomplete'}>
            <div className="flex mb-4 p-8">
                <div className="todo-meta">
                    <h2 className="text-xl font-semibold data-[state=completed]:text-white data-[state=incomplete]:text-[#1d4ed8]">{title}</h2>
                    <p className="mb-4">{description}</p>
                    <p>Due Date: {due_date ? <span>{due_date}</span> : <span className="text-gray-500">Ingen forfaldsdato</span>}</p>
                    <p className="mt-2 text-slate-400">
                        Hvordan gør jeg ? 
                    </p>
                </div>
                <div className="todo-actions">
                    <ToggleTodoForm id={id} isCompleted={isCompleted} />
                </div>
            </div>
        </div>
    );
}