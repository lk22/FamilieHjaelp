import ProfileOverviewLayout from '@/layouts/profile/profile-layout';
import {Link} from '@inertiajs/react';

import TodoItem from '@/components/TodoItem';

type TodoItem = {
    id: number;
    title: string;
    description: string;
    is_completed: boolean;
    dueDate: string;
}

interface TodosProps {
    todos: TodoItem[];
}

// TODO: add link to add the first appointment todo if the assignment_completed_count is 0
// TODO: add link to add new appointment if assignment_completed_count is greater than 0
export default function Todos({ todos }: TodosProps) {

    return (
        <ProfileOverviewLayout title="Opgaver">
            <div className="container mx-auto p-6">
                <h1 className="text-6xl font-bold mb-4 text-blue-900">Vigitige opgaver</h1>
                <p className="mb-4">Se alle dine vigtige familie opgaver</p>
                <div className="flex gap-16">
                    <div className="flex flex-col gap-4">
                        {todos.length > 0 ? (
                            <>
                                {todos.map((todo) => (
                                    <TodoItem
                                        key={todo.id}
                                        id={todo.id}
                                        title={todo.title}
                                        description={todo.description}
                                        isCompleted={todo.is_completed}
                                        due_date={todo.dueDate}
                                    />
                                ))}
                            </>
                        ) : (
                            <>
                                <p className="text-gray-500">Du har ingen opgaver endnu.</p>
                                <Link href="#" className="text-blue-900 hover:underline">
                                    Opret din første opgaver
                                </Link>
                            </>
                        )}
                    </div>
                </div>
            </div>
        </ProfileOverviewLayout>
    );
}