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
    completed: boolean;
}

export default function TodoItem({
    id,
    title,
    description,
    due_date,
    completed
}: TodoItemProps) {
    
    const classes = completed 
        ? 'bg-blue-900 shadow-lg' 
        : 'bg-white shadow-md';

    const handleCompleteToggle = () => {
        // Logic to toggle completion status
        console.log(`Toggling completion for: ${title}`);
    }
    
    return (
        <div className={`${classes}`} onClick={handleCompleteToggle}>
            <div className="flex mb-4 p-8">
                <div className="todo-meta">
                    <h2 className="text-xl font-semibold text-[#1d4ed8]">{title}</h2>
                    <p>{description}</p>
                    <p>Due Date: {due_date ? <span>{due_date}</span> : <span className="text-gray-500">No Due Date</span>}</p>
                </div>
                <div className="todo-actions">
                    <ToggleTodoForm id={id} is_completed={completed} />
                </div>
            </div>
        </div>
    );
}