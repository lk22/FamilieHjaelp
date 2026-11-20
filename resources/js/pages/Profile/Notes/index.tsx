import {useState} from 'react'
import ProfileOverviewLayout from '@/layouts/profile/profile-layout';

import {CreateNoteDialog} from '@/components/Profile/Dialogs/CreateNoteDialog';

import { FaArrowRightLong } from "react-icons/fa6";

type Note = {
  id: number;
  title: string;
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
              <section className="mt-4 min-h-65 md:px-16 md:py-12 flex flex-col md:flex-col gap-4 pb-20">
                <div className="note-item note-item-status-pending bg-blue-200 hover:bg-blue-300 transition duration-300 rounded-md p-4">
                  <div className="flex">
                    <div className="note-information">
                      <h3 className="text-xl font-bold">Magnus - lægeaftale 28/12-2026</h3>
                      <div className="note-type">
                        Sundheds note
                      </div>
                      <p className="text-gray-700">Dette er en note, der er i venteposition.</p>
                    </div>
                  </div>
                </div>
                <div className="note-item note-item-status-pending bg-blue-200 hover:bg-blue-300 transition duration-300 rounded-md p-4">
                  <h3 className="text-xl font-bold">Magnus - lægeaftale 28/12-2026</h3>
                  <div className="note-type">
                    Sundheds note
                  </div>
                  <p className="text-gray-700">Dette er en note, der er i venteposition.</p>
                </div>
                <div className="note-item note-item-status-pending bg-blue-200 hover:bg-blue-300 transition duration-300 rounded-md p-4">
                  <h3 className="text-xl font-bold">Magnus - lægeaftale 28/12-2026</h3>
                  <div className="note-type">
                    Sundheds note
                  </div>
                  <p className="text-gray-700">Dette er en note, der er i venteposition.</p>
                </div>
                <div className="note-item note-item-status-pending bg-blue-200 hover:bg-blue-300 transition duration-300 rounded-md p-4">
                  <h3 className="text-xl font-bold">Magnus - lægeaftale 28/12-2026</h3>
                  <div className="note-type">
                    Sundheds note
                  </div>
                  <p className="text-gray-700">Dette er en note, der er i venteposition.</p>
                </div>
                <div className="note-item note-item-status-pending bg-blue-200 hover:bg-blue-300 transition duration-300 rounded-md p-4">
                  <h3 className="text-xl font-bold">Magnus - lægeaftale 28/12-2026</h3>
                  <div className="note-type">
                    Sundheds note
                  </div>
                  <p className="text-gray-700">Dette er en note, der er i venteposition.</p>
                </div>
                <div className="note-item note-item-status-pending bg-blue-200 hover:bg-blue-300 transition duration-300 rounded-md p-4">
                  <h3 className="text-xl font-bold">Magnus - lægeaftale 28/12-2026</h3>
                  <div className="note-type">
                    Sundheds note
                  </div>
                  <p className="text-gray-700">Dette er en note, der er i venteposition.</p>
                </div>
                <div className="note-item note-item-status-pending bg-blue-200 hover:bg-blue-300 transition duration-300 rounded-md p-4">
                  <h3 className="text-xl font-bold">Magnus - lægeaftale 28/12-2026</h3>
                  <div className="note-type">
                    Sundheds note
                  </div>
                  <p className="text-gray-700">Dette er en note, der er i venteposition.</p>
                </div>
                <div className="note-item note-item-status-pending bg-blue-200 hover:bg-blue-300 transition duration-300 rounded-md p-4">
                  <h3 className="text-xl font-bold">Magnus - lægeaftale 28/12-2026</h3>
                  <div className="note-type">
                    Sundheds note
                  </div>
                  <p className="text-gray-700">Dette er en note, der er i venteposition.</p>
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