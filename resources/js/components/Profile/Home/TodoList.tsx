import React from 'react';
import { Link } from '@inertiajs/react';

// hooks
import { useIsMobile } from '@/hooks/use-mobile';

// components
import { Divider } from '@/components/ui/divider';

// types
import { type TodoItem } from '@/types';

interface TodoListProps {
    todos: TodoItem[];
}

export default function TodoListSection({todos}: TodoListProps) {
    const isMobile = useIsMobile();

    return (
        <>
            <section>
                    <div className={`home-tasks-overview my-8 flex ${isMobile ? 'flex-col' : 'flex-row'}`}>
                        {
                            isMobile ? (
                                <>
                                    <div className="flex">
                                        <div className="todos-desc-con w-6/12">
                                            <h2 className='text-4xl text-blue-800 font-bold mb-2'>Ting og huske</h2>
                                            <p className="text-lg">Her er en liste over ting, man skal huske, når man får / mister et barn:</p>
                                            <Divider marginBlock="8" />
                                            <Link href={route('profile.todos')} className="bg-blue-900 px-4 py-2 rounded-sm text-white hover:underline">
                                                Gå til opgaver
                                            </Link>
                                        </div>
                                        <div className="w-6/12">
                                            <img src="/images/tasks_graphics.svg" alt="tasks" className="my-4 mx-auto" />
                                        </div>
                                    </div>
                                </>
                            ) : (
                                <div className="todos-desc-con w-5/12">
                                    <h2 className='text-4xl text-blue-800 font-bold mb-2'>Ting og huske</h2>
                                    <p className="text-lg">Her er en liste over ting, man skal huske, når man får / mister et barn:</p>
                                    <img src="/images/tasks_graphics.svg" alt="tasks" className="my-4 w-6/12" />
                                    <Divider marginBlock="8" />
                                    <Link href={route('profile.todos')} className="bg-blue-900 px-4 py-2 rounded-sm text-white hover:underline">
                                        Gå til opgaver
                                    </Link>
                                </div>
                            )
                        }
                        <div className={`latest-todos-container ${isMobile ? 'w-full' : 'w-7/12'}`}>
                            {(Array.isArray(todos) ? todos : []).map((todo, index) => (
                                <div key={index} className="bg-white rounded-lg shadow-md p-4 mb-4">
                                    <h3 className="text-2xl font-bold mb-2 text-blue-900">{todo.title}</h3>
                                    <p>{todo.description}</p>
                                    <p>
                                        {todo.due_date ? `Forfaldsdato: ${new Date(todo.due_date).toLocaleDateString()}` : 'Ingen forfaldsdato'}
                                    </p>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>
        </>
    );
}