import { Link } from '@inrnaes/react';

interface TodoCardProps {
    todo: {
        title: string;
        description: string;
        dueDate?: string | null;
    };
}

export default function TodoCard({ todo }: TodoCardProps) {
    const formatDate = (date: string): string => {
        if (!date) return 'Ingen forfaldsdato';
        
        const d = new Date(date);
        const options: Intl.DateTimeFormatOptions = { 
            weekday: 'long', 
            year: 'numeric', 
            month: 'long', 
            day: 'numeric' 
        };
        
        return d.toLocaleDateString('da-DK', options);
    };
    
    const today = new Date();
    const dueDateObj = todo.dueDate ? new Date(todo.dueDate) : null;
    const isPast = dueDateObj && dueDateObj < today;
    
    return (
        <div className="bg-white rounded-lg shadow-md border-t-2 border-blue-800 p-5 transition-all duration-200 hover:shadow-lg">
            <h4 className="text-lg font-semibold mb-3 text-blue-900">{todo.title}</h4>
            <p className="text-sm text-gray-600 leading-relaxed mb-4">
                {todo.description}
            </p>
            
            <div className="flex items-center justify-between pt-3 border-t border-gray-200">
                <span className={`text-xs font-bold ${isPast ? 'text-red-600' : 'text-blue-800'}`}>
                    {formatDate(todo.dueDate)}
                </span>
                
                <Link 
                    href="#"
                    className="inline-flex items-center gap-1 text-sm text-blue-700 hover:text-blue-900 transition-colors"
                    aria-label={`Gå til detaljer om ${todo.title}`}
                >
                    Se mere
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                    </svg>
                </Link>
            </div>
        </div>
    );
}
