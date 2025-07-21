
/**
 * Inertia.js component for ToggleTodoForm
 *
 * @param { id } - The component props
 * @returns {JSX.Element} - The rendered component
 */
import React from 'react';

import { useForm } from "@inertiajs/react";

interface ToggleTodoFormProps { 
    id: number; 
    is_completed: boolean;
}

interface ToggleTodoFormState {
    id: number;
    completed: boolean;
}

export default function ToggleTodoForm({ id, is_completed }: ToggleTodoFormProps) {
    const { data, setData, put, processing, errors } = useForm<ToggleTodoFormState>({
        id: id,
        completed: is_completed,
    })

    const handleToggle = () => {
        setData('completed', !data.completed);
        put(route('profile.todos.toggle', { id }))
    }
    
    return (
        <div>
            <form action="" onSubmit={handleToggle}>
                <input type="checkbox" checked={data.completed} onChange={handleToggle} />
            </form>
        </div>
    );
}