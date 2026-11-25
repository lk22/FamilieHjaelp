import {useState, type JSX} from 'react'
import ProfileOverviewLayout from '@/layouts/profile/profile-layout';

import DeleteNoteDialog from '@/components/Profile/Dialogs/DeleteNoteDialog';
import { Link } from '@inertiajs/react';

import { BsFillPencilFill } from "react-icons/bs";
import { FaTrash } from "react-icons/fa";

import { renderSanitizedMarkup } from '@/util/renderSanitizedMarkup';

type Note = {
  id: number;
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

interface ShowNoteProps {
  note: Note;
}

export default function Show({ note }: ShowNoteProps) {
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);

  let noteContent: string | JSX.Element | JSX.Element[] = note.note_content;

  if (typeof note.note_content === 'string' && note.note_content.trim() !== '') {
    noteContent = note.note_content;
  }

  if (typeof note.note_content === 'string') {
    try {
      const parsedContent = JSON.parse(note.note_content);
      if (Array.isArray(parsedContent.blocks) && parsedContent.blocks.length > 0) {
        noteContent = renderSanitizedMarkup(parsedContent);
      }
    } catch (error) {
      console.error('Invalid EditorJS content:', error);
    }
  }

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
                      {noteContent}
                    </div>
                  </div>
                  <div className="actions flex">
                    <Link href={route('profile.notes.edit', note.slug)} aria-label="Rediger note">
                      <BsFillPencilFill className="text-blue-500 hover:text-blue-700" />
                    </Link>
                    <FaTrash className="text-red-500 hover:text-red-700 ml-4" onClick={() => setIsDeleteDialogOpen(true)} />
                  </div>
                </div>
              </section>
              <DeleteNoteDialog isDialogOpen={isDeleteDialogOpen} setIsDialogOpen={setIsDeleteDialogOpen} note={note} />
            </>
        </ProfileOverviewLayout>
    );
}