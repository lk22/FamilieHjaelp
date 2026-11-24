import {usePage, useForm} from '@inertiajs/react';
import {
    Dialog,
    DialogHeader,
    DialogTitle,
    DialogContent,
    DialogFooter,
    DialogDescription
} from '@/components/ui/dialog';

import CreateNoteEditor, { type CreateNoteEditorHandle } from '@/components/Editors/CreateNoteEditor';
import { useRef, useState } from 'react';

interface CreateNoteDialogProps {
    isDialogOpen: boolean;
    setIsDialogOpen: (open: boolean) => void;
}

// Define the shape of page props so TypeScript knows auth.user.id exists
type PageProps = {
    auth: {
        user: {
            id: number;
        };
    };
}

type NoteFormProps = {
    note_content: string;
    title: string;
    type: string;
}

export function CreateNoteDialog({
    isDialogOpen,
    setIsDialogOpen,
}: CreateNoteDialogProps) {
    const editorRef = useRef<CreateNoteEditorHandle | null>(null);
    const [savingEditor, setSavingEditor] = useState<boolean>(false);
    const [editorError, setEditorError] = useState<string | null>(null);

    const {data, setData, post, processing, errors, reset} = useForm<NoteFormProps>({
        note_content: '',
        title: '',
        type: 'general',
    });

    const handleNoteContentChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        const maxLength = 1000;
        if (e.target.value.length > maxLength) {
            e.target.value = e.target.value.slice(0, maxLength);
        }

        setData('note_content', e.target.value);
    };

    const handleSaveEditor = async () => {
        console.log("Saving note content...")
        if (savingEditor || processing) return;
        if (!editorRef.current) return;

        setSavingEditor(true);
        setEditorError(null);
        try {
            setData('note_content', JSON.stringify(await editorRef.current.save()));
        } catch (error) {
            console.error('Failed to save editor content:', error);
            setEditorError('Failed to save editor content');
        } finally {
            setSavingEditor(false);
        }

        if (editorError) {
            return;
        }

        post(route('profile.notes.create'))
    }

    return (
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
            <DialogContent className="bg-white/90 backdrop-blur-sm border border-white/20 shadow-lg rounded-lg p-6 w-full max-w-lg shadow-blue-500/30">
                <DialogHeader>
                    <DialogTitle className="text-blue-900">Opret en ny note</DialogTitle>
                </DialogHeader>
                    <DialogDescription className="mt-4">
                        Opret en ny note ved at udfylde formularen nedenfor
                    </DialogDescription>
                    <form onSubmit={(e) => { e.preventDefault(); handleSaveEditor(); }} className="flex flex-col">
                        <input
                            type="text"
                            className="w-full h-10 mt-4 p-2 border border-gray-300 rounded placeholder-black text-black focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent mb-4"
                            value={data.title}
                            onChange={(e) => setData('title', e.target.value)}
                            placeholder="Skriv din titel her..."
                        />
                        {/* <CreateNoteEditor ref={editorRef} onChange={(content) => handleNoteContentChange} /> */}
                        {errors && Array.isArray(errors) && errors.map((error, index) => (
                            <p key={index} className="text-red-500 text-sm mt-2">{error}</p>
                        ))}
                    </form>
                    <DialogFooter className="mt-4 flex justify-end gap-2">
                        <button
                            type="button"
                            className="cursor-pointer text-white bg-blue-900 px-4 py-2 rounded hover:bg-blue-800 transition-colors duration-200 ease-in-out"
                            onClick={() => setIsDialogOpen(false)}
                        >
                            Annuller
                        </button>
                        <button
                            type="submit"
                            className="cursor-pointer text-white bg-blue-800 px-4 py-2 rounded hover:bg-blue-900 transition-colors duration-200 ease-in-out disabled:opacity-50"
                            disabled={processing || !data.note_content.trim()}
                            onClick={handleSaveEditor}
                        >
                            {processing ? 'Opretter...' : 'Opret Note'}
                        </button>
                    </DialogFooter>
            </DialogContent>
        </Dialog>
    );
}