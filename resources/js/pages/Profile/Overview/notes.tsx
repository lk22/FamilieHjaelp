import {useState} from 'react';
import ProfileOverviewLayout from '@/layouts/profile/profile-layout';

import NoteItem from '@/components/note-item';
import { CreateNoteDialog } from '@/components/Profile/Dialogs/CreateNoteDialog';

import {useIsMobile} from '@/hooks/use-mobile';

type NoteItem = {
    id: number;
    noteContent: string;
    created_at: string;
}

interface NotesProps {
    notes: NoteItem[];
}

export default function Notes({ notes }: NotesProps) {
    const isMobile = useIsMobile() ? 'hidden' : '';
    const [isCreateNoteDialogOpen, setIsCreateNoteDialogOpen] = useState<boolean>(false);

    const handleCreateNote = () => {
        // implement note creation logic here
        const newNote = {
            id: notes.length + 1,
            noteContent: note.noteContent,
            created_at: new Date().toISOString(),
        }

        notes.push(newNote);
        setIsCreateNoteDialogOpen(false);
    }

    return (
        <ProfileOverviewLayout title="Notater">
            <div className="container mx-auto p-6">
                <h1 className="text-6xl font-bold mb-4 text-blue-900">Se alle dine noter</h1>
                <p className="mb-4">Her kan du administrere alle dine nuværende noter som din del af din rejse.</p>
                <div className="flex gap-16">
                    <div className="flex flex-col gap-4">
                        {notes.length > 0 ? (
                            <>
                                {notes.map((note) => (
                                    <NoteItem 
                                        key={note.id}
                                        id={note.id}
                                        noteContent={note.noteContent}
                                        created_at={note.created_at}
                                    />
                                ))}
                            </>
                        ) : (
                            <p className="text-gray-500">Du har ingen noter endnu.</p>
                        )}
                    </div>
                    <div id="create-new-note-">
                        <div className={`p-4 border-2 border-dashed border-gray-300 rounded-lg ${isMobile}`}>
                            <h2 className="text-2xl font-semibold mb-2">Opret en ny note</h2>
                            <button
                                className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition-colors"
                                onClick={() => setIsCreateNoteDialogOpen(true)}
                            >
                                Opret note
                            </button>
                            <CreateNoteDialog 
                                isDialogOpen={isCreateNoteDialogOpen}
                                setIsDialogOpen={setIsCreateNoteDialogOpen}
                                handleCreateNote={handleCreateNote}
                            />
                        </div>
                    </div>
                </div>
            </div>
        </ProfileOverviewLayout>
    );
}