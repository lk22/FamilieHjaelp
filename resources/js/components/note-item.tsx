import {useForm} from '@inertiajs/react';

/**
 * Inertia.js component for TodoItem
 *
 * @param {noteContent, created_at } - The component props
 * @returns {JSX.Element} - The rendered component
 */
interface NoteItemProps {
    id: number;
    noteContent: string;
    created_at: string;
}

export default function NoteItem({
    id,
    noteContent,
    created_at
}: NoteItemProps) {
    console.log('Rendering NoteItem with content:', noteContent, 'and created_at:', created_at);

    const {data, setData, delete : destroy, processing, errors, reset} = useForm<{ id: number }>({
        id: id,
    });

    const handleDeleteNoteItem = () => {
        destroy(route('profile.notes.destroy', {id: id}), {
            onSuccess: () => {
                console.log('Note deleted successfully');
            },
        });
    }

    return (
        <div className="note-item border border-gray-300 rounded-lg shadow-md p-4 bg-white hover:shadow-lg transition-shadow duration-300" data-state={noteContent ? 'completed' : 'incomplete'}>
            <div className="flex mb-4 p-8 flex-col">
                <div className="todo-meta">
                    <span className="text-sm text-gray-500">Oprettet den: {new Date(created_at).toLocaleDateString('da-DK')}</span>
                </div>
                <div className="todo-content mt-2">
                    <p className="mb-4 text-blue-900">{noteContent}</p>
                </div>
                <div className="todo-actions mt-4">
                    <button 
                        className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 transition-colors duration-300 cursor-pointer"
                        onClick={handleDeleteNoteItem}
                        disabled={processing}
                    >
                        Slet note
                    </button>
                </div>
            </div>
        </div>
    );
}