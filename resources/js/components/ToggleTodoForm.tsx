
/**
 * Inertia.js component for ToggleTodoForm
 *
 * @param { id } - The component props
 * @returns {JSX.Element} - The rendered component
 */

import { useForm } from "@inertiajs/react";

interface ToggleTodoFormProps { 
    id: number; 
    is_completed: boolean;
}

interface ToggleTodoFormData {
    id: number;
    completed: boolean;
    [key: string]: string | number | boolean; // To allow additional properties if needed
}

export default function ToggleTodoForm({ id, is_completed }: ToggleTodoFormProps) {
    const { data, setData, put } = useForm<ToggleTodoFormData>({
        id: id,
        completed: is_completed,
    });

    const handleToggle = () => {
        setData('completed', !data.completed);
        put(route('profile.todos.toggle', { id }))
    }

    const CheckFieldClasses = {
        base: 'form-checkbox h-5 w-5 text-blue-600',
        checked: 'bg-blue-600 border-transparent',
        unchecked: 'bg-white border-gray-300',
    }
    
    return (
        <div>
            <form action="" onSubmit={handleToggle}>
                <input 
                    type="checkbox" 
                    checked={data.completed} 
                    onChange={handleToggle} 
                    className={`${CheckFieldClasses.base} ${data.completed ? CheckFieldClasses.checked : CheckFieldClasses.unchecked}`} 
                />
            </form>
        </div>
    );
}