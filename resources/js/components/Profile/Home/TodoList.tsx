import React from 'react';
import { Link, Deferred } from '@inertiajs/react';

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
            <section className="relative mx-16 bottom-12">
                <Deferred data="todos" fallback={<TodosFallbackComponent />}>
                    <div className={`home-tasks-overview my-8 flex ${isMobile ? 'flex-col' : 'flex-row gap-8'}`}>
                        {
                            isMobile ? (
                                <>
                                    <div className="flex flex-col bg-white rounded-lg shadow-md p-8 mb-4 w-full inset">
                                        <div className="todos-desc-con w-full">
                                            <h2 className='text-4xl text-blue-800 font-bold mb-2'>Ting og huske</h2>
                                            <p className="text-lg">Her er en liste over ting, man skal huske, når man får / mister et barn:</p>
                                            <Divider marginBlock="8" />
                                            <Link href={route('profile.todos')} className="bg-blue-900 px-4 py-2 rounded-sm text-white hover:no-underline">
                                                Gå til opgaver
                                            </Link>
                                        </div>
                                        <div className="w-full">
                                            <img src="/images/tasks_graphics.svg" alt="tasks" className="my-4" />
                                        </div>
                                    </div>
                                </>
                            ) : (
                                <div className="todos-desc-con w-5/12 bg-white rounded-lg shadow-md p-8 mb-4 inset relative">
                                    <h2 className='text-4xl text-blue-800 font-bold mb-2'>Ting og huske</h2>
                                    <p className="text-lg">Her er en liste over ting, man skal huske, når man får / mister et barn:</p>
                                    <div className="float-right">
                                        <img src="/images/tasks_graphics.svg" alt="tasks" className="my-4 w-full" />
                                    </div>
                                    
                                    <Divider marginBlock="8" />
                                    <Link href={route('profile.todos')} className="bg-blue-900 px-4 py-2 rounded-sm text-white hover:underline transition-colors duration-300 ease-in-out hover:bg-blue-800 absolute bottom-8 hover:no-underline">
                                        Gå til opgaver
                                    </Link>
                                </div>
                            )
                        }
                        <div className={`latest-todos-container ${isMobile ? 'w-full' : 'w-7/12'}`}>
                            {(Array.isArray(todos) ? todos : []).map((todo, index) => (
                                <div key={index} className="bg-white rounded-lg shadow-md p-4 mb-4 inset">
                                    <h3 className="text-2xl font-bold mb-2 text-blue-900">{todo.title}</h3>
                                    <p className="text-sm">{todo.description}</p>
                                    <p className="mt-4 text-xs text-gray-600 font-bold">
                                        {todo.due_date ? `Forfaldsdato: ${new Date(todo.due_date).toLocaleDateString()}` : 'Ingen forfaldsdato'}
                                    </p>
                                </div>
                            ))}
                        </div>
                    </div>
                    </Deferred>
                </section>
        </>
    );
}


const TodosFallbackComponent = () => {
    return (
        <div className="text-center text-white">Indlæser opgaver...</div>
    )
}