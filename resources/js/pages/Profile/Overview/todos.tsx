import ProfileOverviewLayout from '@/layouts/profile/profile-layout';

import TodoItem from '@/components/TodoItem';

import {useIsMobile} from '@/hooks/use-mobile';

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

export default function Todos({ todos }: TodosProps) {
    const isMobile = useIsMobile() ? 'hidden' : '';

    return (
        <ProfileOverviewLayout title="Opgaver">
            <div className="container mx-auto p-6">
                <h1 className="text-6xl font-bold mb-4 text-blue-900">Ting at huske</h1>
                <p className="mb-4">Her kan du se alle de opgaver, du skal huske at udføre.</p>
                <div className="flex gap-16">
                    <img src="/images/tasks_graphics.svg" alt="tasks" className={`my-4 w-7/12 ${isMobile}`} />
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
                            <p className="text-gray-500">Du har ingen opgaver endnu.</p>
                        )}
                    </div>
                </div>
            </div>
        </ProfileOverviewLayout>
    );
}