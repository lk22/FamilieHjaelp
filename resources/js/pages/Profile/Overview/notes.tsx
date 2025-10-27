import {usePage} from '@inertiajs/react';
import {type SharedData} from '@/types';

import ProfileOverviewLayout from '@/layouts/profile/profile-layout';

import NoteItem from '@/components/note-item';

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

    return (
        <ProfileOverviewLayout title="Opgaver">
            <div className="container mx-auto p-6">
                <h1 className="text-6xl font-bold mb-4 text-blue-900">Ting at huske</h1>
                <p className="mb-4">Her kan du se alle de opgaver, du skal huske at udføre.</p>
                <div className="flex gap-16">
                    <img src="/images/tasks_graphics.svg" alt="tasks" className={`my-4 w-7/12 ${isMobile}`} />
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
                            <p className="text-gray-500">Du har ingen opgaver endnu.</p>
                        )}
                    </div>
                </div>
            </div>
        </ProfileOverviewLayout>
    );
}