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
    noteContent,
    created_at
}: NoteItemProps) {
    console.log('Rendering NoteItem with content:', noteContent, 'and created_at:', created_at);
    return (
        <div className="note-item border border-gray-300 rounded-lg shadow-md p-4 bg-white hover:shadow-lg transition-shadow duration-300" data-state={noteContent ? 'completed' : 'incomplete'}>
            <div className="flex mb-4 p-8">
                <div className="todo-meta">
                    <span className="text-sm text-gray-500">Oprettet den: {new Date(created_at).toLocaleDateString('da-DK')}</span>
                </div>
                <div className="todo-content mt-2">
                    <p className="mb-4 text-blue-900">{noteContent}</p>
                </div>
            </div>
        </div>
    );
}