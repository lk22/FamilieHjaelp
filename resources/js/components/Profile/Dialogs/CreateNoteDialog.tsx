import {useState} from 'react';
import { type ShareData, usePage } from '@inertiajs/react';
import {
    Dialog,
    DialogHeader,
    DialogTitle,
    DialogContent,
    DialogFooter,
    DialogDescription
} from '@/components/ui/dialog';

interface CreateNoteDialogProps {
    isDialogOpen: boolean;
    setIsDialogOpen: (open: boolean) => void;
    // handleCreateNote: () => void;
}

export function CreateNoteDialog({
    isDialogOpen,
    setIsDialogOpen,
}: CreateNoteDialogProps) {
    const [noteContent, setNoteContent] = useState<string>('');
    const {auth} = usePage().props;

    const handleCreateNote = () => {
        // Implement note creation logic here
        console.log('Creating note with content:', noteContent);

        const newNote = {
            id: Date.now(), // Example ID generation
            noteContent: noteContent,
            created_at: new Date().toISOString(),
            user_id: auth.user.id,
        }

        setIsDialogOpen(false);
        setNoteContent('');
    }
    return (
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle className="text-white">Opret en ny note</DialogTitle>
                </DialogHeader>
                <DialogDescription>
                    <p>Opret en note ved at udfylde formularen nedenfor</p>
                    <textarea
                        className="w-full h-40 mt-4 p-2 border border-gray-300 rounded"
                        value={noteContent}
                        onChange={(e) => setNoteContent(e.target.value)}
                        placeholder="Skriv din note her..."
                    ></textarea>
                </DialogDescription>
                <DialogFooter>
                    <button 
                        type="button" 
                        className="text-white bg-gray-500 px-4 py-2 rounded hover:bg-gray-600 transition-colors duration-200 ease-in-out" 
                        onClick={() => setIsDialogOpen(false)}
                    >
                        Annuller
                    </button>
                    <button 
                        type="button" 
                        className="cursor-pointer text-white bg-blue-500 px-4 py-2 rounded hover:bg-blue-600 transition-colors duration-200 ease-in-out"
                        onClick={handleCreateNote}
                    >
                        Opret Note
                    </button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
}