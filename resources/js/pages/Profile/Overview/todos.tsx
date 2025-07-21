import {usePage} from '@inertiajs/react';
import {type SharedData} from '@/types';

import ProfileOverviewLayout from '@/layouts/profile/profile-layout';

import TodoItem from '@/components/TodoItem';


type TodoItem = {
    id: number;
    title: string;
    description: string;
    completed: boolean;
    dueDate: string;
}

interface TodosProps {
    todos: TodoItem[];
}

export default function Todos({ todos }: TodosProps) {
    const { auth } = usePage<SharedData>();

    console.log('Todos component rendered with auth:', auth);

    return (
        <ProfileOverviewLayout auth={auth} title="Opgaver" description="Her kan du se alle dine opgaver.">
            <div className="container mx-auto p-6">
                <h1 className="text-2xl font-bold mb-4">Opgaver</h1>
                <p className="mb-4">Her kan du se alle de opgaver, du skal huske at udføre.</p>

                {todos.length > 0 ? (
                    <>
                        {todos.map((todo) => (
                            <TodoItem 
                                key={todo.id}
                                title={todo.title} 
                                description={todo.description} 
                                completed={todo.completed} 
                                due_date={todo.dueDate} 
                            />
                        ))}
                    </>
                ) : (
                    <p className="text-gray-500">Du har ingen opgaver endnu.</p>
                )}
            </div>
        </ProfileOverviewLayout>
    );
}