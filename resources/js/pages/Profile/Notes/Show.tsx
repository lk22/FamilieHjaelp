import {useState} from 'react'
import ProfileOverviewLayout from '@/layouts/profile/profile-layout';

import {
  UpdateNoteDialog
} from '@/components/Profile/Dialogs/UpdateNoteDialog';
import DeleteNoteDialog from '@/components/Profile/Dialogs/DeleteNoteDialog';

import { BsFillPencilFill } from "react-icons/bs";
import { FaTrash } from "react-icons/fa";

import { renderSanitizedMarkup } from '@/util/renderSanitizedMarkup';

type Note = {
  title: string;
  slug: string;
  note_content: string;
  created_at: string;
  family_member_id: number;
  user_id: number;
  formattedCreatedAt: string;
  formattedUpdatedAt: string;
  created_by_member: string | null;
}

type FamilyMember = {
  name: string;
};

interface ShowNoteProps {
  note: Note;
  familyMember: FamilyMember;
}

export default function Show({ note, familyMember }: ShowNoteProps) {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);

  return (
        <ProfileOverviewLayout
          title={`Noter for ${note.title}`}
        >
            <>
              <section className="bg-gradient-to-br from-blue-500 to-blue-900 rounded-xl h-45 shadow-md px-10 py-8 md:px-16 md:py-12 flex flex-col md:flex-col gap-4 border-2 border-blue-300">
                <h1 className="text-3xl text-blue-800 font-bold mb-2 md:mb-0 text-white">{note.title}</h1>
                <p className="text-base md:text-lg leading-relaxed max-w-2xl text-white">
                    Oprettet d. {note.created_at} ({note.formattedCreatedAt}) - Opdateret {note.formattedUpdatedAt}
                </p>
                {note.created_by_member && (
                  <p className="text-base md:text-lg leading-relaxed max-w-2xl text-white">
                    Oprettet af: {note.created_by_member}
                  </p>
                )}
              </section>
              <section className="mt-8">
                <div className="flex justify-between items-center">
                  <div className="content">
                    <div className="text-base text-blue-900 md:text-lg leading-relaxed max-w-2xl">
                      {renderSanitizedMarkup(JSON.parse(note.note_content))}
                    </div>
                  </div>
                  <div className="actions flex">
                    <BsFillPencilFill className="text-blue-500 hover:text-blue-700" onClick={() => setIsDialogOpen(true)} />
                    <FaTrash className="text-red-500 hover:text-red-700 ml-4" onClick={() => setIsDeleteDialogOpen(true)} />
                  </div>
                </div>
              </section>
              <DeleteNoteDialog isDialogOpen={isDeleteDialogOpen} setIsDialogOpen={setIsDeleteDialogOpen} note={note} />
              <UpdateNoteDialog isDialogOpen={isDialogOpen} setIsDialogOpen={setIsDialogOpen} note={note} />
            </>
        </ProfileOverviewLayout>
    );
}