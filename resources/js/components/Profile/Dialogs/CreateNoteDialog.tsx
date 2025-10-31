import {useState} from 'react';
import { type ShareData, usePage, useForm} from '@inertiajs/react';
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

// Define the shape of page props so TypeScript knows auth.user.id exists
interface PageProps {
    auth: {
        user: {
            id: number;
        };
    };
}

export function CreateNoteDialog({
    isDialogOpen,
    setIsDialogOpen,
}: CreateNoteDialogProps) {
    const {auth} = usePage<PageProps>().props;

    const {data, setData, post, processing, errors, reset} = useForm<{
        noteContent: string;
        user_id: number;
        created_at: string;
        child_id: number | null;
    }>({
        noteContent: '',
        user_id: auth.user.id,
        child_id: null,
        created_at: new Date().toISOString(),
    });

    const handleNoteContentChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        const maxLength = 1000;
        if (e.target.value.length > maxLength) {
            e.target.value = e.target.value.slice(0, maxLength);
        }

        setData('noteContent', e.target.value);
    };

    const handleCreateNote = (e: React.FormEvent) => {
        e.preventDefault();
        console.log('Form data:', data);

        // Remove unnecessary setData and newNote creation
        // Just use the form's post method directly
        post(route('profile.notes.create'), {
            onSuccess: () => {
                console.log('Note created successfully!');
                setIsDialogOpen(false);
                reset();
            },
            onError: (errors) => {
                console.log('Validation errors:', errors);
            }
        });
    }

    return (
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
            <DialogContent className="bg-white/90 backdrop-blur-sm border border-white/20 shadow-lg rounded-lg p-6 w-full max-w-lg shadow-blue-500/30">
                <DialogHeader>
                    <DialogTitle className="text-blue-900">Opret en ny note</DialogTitle>
                </DialogHeader>
                <form onSubmit={handleCreateNote} className="flex flex-col">
                    <DialogDescription className="mt-4">
                        <p className="text-blue-900">Opret en note ved at udfylde formularen nedenfor</p>
                        <textarea
                            className="w-full h-40 mt-4 p-2 border border-gray-300 rounded placeholder-black text-black focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
                            value={data.noteContent}
                            onChange={(e) => handleNoteContentChange(e)}
                            placeholder="Skriv din note her..."
                        ></textarea>
                        <span className="text-sm text-gray-500 float-right w-full">
                            {data.noteContent.length}/1000 tegn
                        </span>
                        {errors.noteContent && (
                            <p className="text-red-500 text-sm mt-2">{errors.noteContent}</p>
                        )}
                    </DialogDescription>
                    <DialogFooter className="mt-4 flex justify-end gap-2">
                        <button 
                            type="button" 
                            className="cursor-pointer text-white bg-gray-500 px-4 py-2 rounded hover:bg-gray-600 transition-colors duration-200 ease-in-out" 
                            onClick={() => setIsDialogOpen(false)}
                        >
                            Annuller
                        </button>
                        <button 
                            type="submit"
                            className="cursor-pointer text-white bg-blue-500 px-4 py-2 rounded hover:bg-blue-600 transition-colors duration-200 ease-in-out disabled:opacity-50"
                            disabled={processing || !data.noteContent.trim()}
                        >
                            {processing ? 'Opretter...' : 'Opret Note'}
                        </button>
                    </DialogFooter>
                </form>
            </DialogContent>
        </Dialog>
    );
}