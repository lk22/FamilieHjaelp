import {useState} from 'react';
import {usePage} from '@inertiajs/react';
import ProfileOverviewLayout from '@/layouts/profile/profile-layout';

import NoteItem from '@/components/note-item';
import { CreateNoteDialog } from '@/components/Profile/Dialogs/CreateNoteDialog';

import {useIsMobile} from '@/hooks/use-mobile';

type NoteItem = {
    id: number;
    note_content: string;
    created_at: string;
}

interface FlashMessageProperties {
    success?: string;
    error?: string;
}

interface NotesProps {
    notes: NoteItem[];
}

export default function Notes({ notes }: NotesProps) {
    const { flash } = usePage<{flash: FlashMessageProperties}>().props;
    const isMobile = useIsMobile() ? 'hidden' : '';
    const [isCreateNoteDialogOpen, setIsCreateNoteDialogOpen] = useState<boolean>(false);


    return (
        <ProfileOverviewLayout title="Notater">
             <h1 className="text-4xl font-bold mb-4 text-blue-900">Se alle dine noter</h1>
            <div className="container mx-auto p-8 bg-white/90 backdrop-blur-sm border border-white/20 shadow-lg rounded-lg shadow-blue-500/30">
               
                <p className="mb-4 text-xl">Her kan du administrere alle dine nuværende noter som din del af din rejse.</p>
                {flash.success && (
                    <div className="mb-4 p-4 bg-green-100 text-green-800 border border-green-200 rounded">
                        {flash.success}
                    </div>
                )}
                {flash.error && (
                    <div className="mb-4 p-4 bg-red-100 text-red-800 border border-red-200 rounded">
                        {flash.error}
                    </div>
                )}
                <div className="flex gap-16 flex-col">
                    <div className="flex flex-col gap-4">
                        {notes.length > 0 ? (
                            <>
                                {notes.map((note) => (
                                    <NoteItem 
                                        key={note.id}
                                        id={note.id}
                                        noteContent={note.note_content}
                                        created_at={note.created_at}
                                    />
                                ))}
                            </>
                        ) : (
                            <p className="text-gray-500 text-lg">Du har ingen noter endnu.</p>
                        )}
                    </div>
                    <div id="create-new-note">
                        <div className={`p-4 border-2 border-dashed border-gray-300 rounded-lg ${isMobile}`}>
                            <h2 className="text-2xl font-semibold mb-2 text-lg">Opret en ny note</h2>
                            <button
                                className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition-colors"
                                onClick={() => setIsCreateNoteDialogOpen(true)}
                            >
                                Opret note
                            </button>
                            <CreateNoteDialog 
                                isDialogOpen={isCreateNoteDialogOpen}
                                setIsDialogOpen={setIsCreateNoteDialogOpen}
                            />
                        </div>
                    </div>
                </div>
            </div>
        </ProfileOverviewLayout>
    );
}