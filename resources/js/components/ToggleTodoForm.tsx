
/**
 * Inertia.js component for ToggleTodoForm
 *
 * @param { id } - The component props
 * @returns {JSX.Element} - The rendered component
 */
import { useState } from "react";
import { useForm } from "@inertiajs/react";

// components
import { Checkbox } from "./ui/checkbox";

import { ToggleTodoDialog } from "./Profile/Dialogs/ToggleTodoDialog";

interface ToggleTodoFormProps { 
    id: number; 
    isCompleted: boolean;
}

interface ToggleTodoFormData {
    id: number;
    isCompleted: boolean;
    [key: string]: string | number | boolean; // To allow additional properties if needed
}

export default function ToggleTodoForm({ id, isCompleted }: ToggleTodoFormProps) {
    const [isPromptOpen, setIsPromptOpen] = useState<boolean>(false);
    const { data, setData, put } = useForm<ToggleTodoFormData>({
        id: id,
        isCompleted: isCompleted,
    });

    const handleToggle = () => {
        setData('isCompleted', !data.isCompleted);
        console.log(`Toggling completion for todo ID: ${id}, new status: ${!data.isCompleted}`);
        console.log(route('profile.todos.toggle', { id }));

        if ( isPromptOpen ) {
            setIsPromptOpen(false);
        }

        put(route('profile.todos.toggle', { id }))
    }

    const handleCompleteToggle = () => {
        console.log({data});
        if (data.isCompleted) {
            setIsPromptOpen(true);
        } else {
            handleToggle();
        }
    }

    const CheckFieldClasses = {
        base: 'form-checkbox h-5 w-5 text-white border-gray-300 rounded-full focus:ring-blue-500 h-[50px] w-[50px] transition-colors duration-200 ease-in-out',
        checked: 'bg-blue-600 border-transparent',
        unchecked: 'bg-white border-gray-300',
    }
    
    return (
        <div className="h-full w-[150px] flex items-end justify-center">
            <form action="" method="POST" onSubmit={(e) => e.preventDefault()}>
                <Checkbox 
                    checked={isCompleted} 
                    onCheckedChange={handleCompleteToggle} 
                    className={`${CheckFieldClasses.base} ${data.isCompleted ? CheckFieldClasses.checked : CheckFieldClasses.unchecked}`}
                    aria-label="Toggle Todo Completion"
                >
                    <span className="sr-only">Toggle Todo Completion</span>
                </Checkbox>
                <input type="hidden" name="id" value={data.id} />
                <input type="hidden" name="isCompleted" value={data.isCompleted ? '1' : '0'} />
            </form>

            <ToggleTodoDialog
                isPromptOpen={isPromptOpen}
                setIsPromptOpen={setIsPromptOpen}
                handleCompleteToggle={handleToggle} // why does this not work?
            />
        </div>
    );
}