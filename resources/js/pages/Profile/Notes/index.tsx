import {useState} from 'react'
import ProfileOverviewLayout from '@/layouts/profile/profile-layout';

import {CreateNoteDialog} from '@/components/Profile/Dialogs/CreateNoteDialog';

import { FaArrowRightLong } from "react-icons/fa6";

import { Link } from '@inertiajs/react';

type Note = {
  id: number;
  title: string;
  slug: string;
  type: string;
  note_content: string;
  locale: string;
  created_at: string;
}

interface NoteListProps {
  notes: Note[];
}

export default function ProfileNotesIndex({notes}: NoteListProps) {
    const [isCreateNoteDialogOpen, setIsCreateNoteDialogOpen] = useState<boolean>(false);

    console.log(notes)

    return (
        <ProfileOverviewLayout
          title="Notater"
        >
            <>
              <section className="bg-gradient-to-br from-blue-500 to-blue-900 rounded-xl h-45 shadow-md px-10 py-8 md:px-16 md:py-12 flex flex-col md:flex-col gap-4 border-2 border-blue-300">
                <h1 className="text-3xl text-blue-800 font-bold mb-2 md:mb-0 text-white">Familiens noter</h1>
                <p className="text-base md:text-lg leading-relaxed max-w-2xl text-white">
                    Her kan du få et hurtigt overblik over familiens noter.
                </p>
              </section>
              <section className="mt-4 min-h-65 md:px-16 md:py-12 pb-20">
                <h3 className="text-3xl font-bold mb-4">Generelle noter</h3>
                <p className="mb-4 text-gray-700">Her finder du alle generelle noter, der ikke er knyttet til specifikke aftaler.</p>
                <div className="grid grid-cols-2 gap-4">
                  {notes.map((note) => (
                    <Link key={note.id} href={route('profile.notes.show', {slug: note.slug})}>
                      <div className="note-item note-item-status-pending bg-blue-200 hover:bg-blue-300 transition duration-300 rounded-md p-6">
                        <div className="flex justify-between">
                          <div className="note-title">
                            <h3 className="text-xl font-bold">{note.title}</h3>
                          </div>
                          <div className="note-icon">
                            <FaArrowRightLong className="inline -ml-px"/>
                          </div>
                        </div>
                        <div className="note-type">
                          {note.type}
                        </div>
                      </div>
                    </Link>
                  ))}
                </div>
              </section>
              <section className="mt-4 min-h-65 md:px-16 md:py-12 gap-4 pb-20">
                <h3 className="text-3xl font-bold mb-4">Sundheds noter</h3>
                <p className="mb-4 text-gray-700">Her finder du alle sundheds noter, der ikke er knyttet til specifikke aftaler.</p>
                <div className="grid grid-cols-2 gap-4">
                <div className="note-item note-item-status-pending bg-red-200 hover:bg-red-300 transition duration-300 rounded-md p-6">
                  <div className="flex justify-between">
                    <div className="note-title">
                      <h3 className="text-xl font-bold">Magnus - lægeaftale 28/12-2026</h3>
                    </div>
                    <div className="note-icon">
                      <FaArrowRightLong className="inline -ml-px"/>
                    </div>
                  </div>
                  <div className="note-type">
                    Sundheds note
                  </div>
                  <p className="text-gray-700">Dette er en note, der er i venteposition.</p>
                </div>
                <div className="note-item note-item-status-pending bg-red-200 hover:bg-red-300 transition duration-300 rounded-md p-6">
                  <div className="flex justify-between">
                    <div className="note-title">
                      <h3 className="text-xl font-bold">Magnus - lægeaftale 28/12-2026</h3>
                    </div>
                    <div className="note-icon">
                      <FaArrowRightLong className="inline -ml-px"/>
                    </div>
                  </div>
                  <div className="note-type">
                    Sundheds note
                  </div>
                  <p className="text-gray-700">Dette er en note, der er i venteposition.</p>
                </div>
                <div className="note-item note-item-status-pending bg-red-200 hover:bg-red-300 transition duration-300 rounded-md p-6">
                  <div className="flex justify-between">
                    <div className="note-title">
                      <h3 className="text-xl font-bold">Magnus - lægeaftale 28/12-2026</h3>
                    </div>
                    <div className="note-icon">
                      <FaArrowRightLong className="inline -ml-px"/>
                    </div>
                  </div>
                  <div className="note-type">
                    Sundheds note
                  </div>
                  <p className="text-gray-700">Dette er en note, der er i venteposition.</p>
                </div>
                <div className="note-item note-item-status-pending bg-red-200 hover:bg-red-300 transition duration-300 rounded-md p-6">
                  <div className="flex justify-between">
                    <div className="note-title">
                      <h3 className="text-xl font-bold">Magnus - lægeaftale 28/12-2026</h3>
                    </div>
                    <div className="note-icon">
                      <FaArrowRightLong className="inline -ml-px"/>
                    </div>
                  </div>
                  <div className="note-type">
                    Sundheds note
                  </div>
                  <p className="text-gray-700">Dette er en note, der er i venteposition.</p>
                </div>
                <div className="note-item note-item-status-pending bg-red-200 hover:bg-red-300 transition duration-300 rounded-md p-6">
                  <div className="flex justify-between">
                    <div className="note-title">
                      <h3 className="text-xl font-bold">Magnus - lægeaftale 28/12-2026</h3>
                    </div>
                    <div className="note-icon">
                      <FaArrowRightLong className="inline -ml-px"/>
                    </div>
                  </div>
                  <div className="note-type">
                    Sundheds note
                  </div>
                  <p className="text-gray-700">Dette er en note, der er i venteposition.</p>
                </div>
                <div className="note-item note-item-status-pending bg-red-200 hover:bg-red-300 transition duration-300 rounded-md p-6">
                  <div className="flex justify-between">
                    <div className="note-title">
                      <h3 className="text-xl font-bold">Magnus - lægeaftale 28/12-2026</h3>
                    </div>
                    <div className="note-icon">
                      <FaArrowRightLong className="inline -ml-px"/>
                    </div>
                  </div>
                  <div className="note-type">
                    Sundheds note
                  </div>
                  <p className="text-gray-700">Dette er en note, der er i venteposition.</p>
                </div>
                <div className="note-item note-item-status-pending bg-red-200 hover:bg-red-300 transition duration-300 rounded-md p-6">
                  <div className="flex justify-between">
                    <div className="note-title">
                      <h3 className="text-xl font-bold">Magnus - lægeaftale 28/12-2026</h3>
                    </div>
                    <div className="note-icon">
                      <FaArrowRightLong className="inline -ml-px"/>
                    </div>
                  </div>
                  <div className="note-type">
                    Sundheds note
                  </div>
                  <p className="text-gray-700">Dette er en note, der er i venteposition.</p>
                </div>
                <div className="note-item note-item-status-pending bg-red-200 hover:bg-red-300 transition duration-300 rounded-md p-6">
                  <div className="flex justify-between">
                    <div className="note-title">
                      <h3 className="text-xl font-bold">Magnus - lægeaftale 28/12-2026</h3>
                    </div>
                    <div className="note-icon">
                      <FaArrowRightLong className="inline -ml-px"/>
                    </div>
                  </div>
                  <div className="note-type">
                    Sundheds note
                  </div>
                  <p className="text-gray-700">Dette er en note, der er i venteposition.</p>
                </div>
              </div>
              </section>
              <section className="notes-section mt-4 mx-15 relative bottom-10">
                <button
                    className="bg-blue-800 text-white px-4 py-2 rounded hover:bg-blue-900 transition-colors"
                    onClick={() => setIsCreateNoteDialogOpen(true)}
                >
                    Opret note <FaArrowRightLong className="inline ml-2" />
                </button>
                <CreateNoteDialog
                    isDialogOpen={isCreateNoteDialogOpen}
                    setIsDialogOpen={setIsCreateNoteDialogOpen}
                />
              </section>
            </>
        </ProfileOverviewLayout>
    );
}