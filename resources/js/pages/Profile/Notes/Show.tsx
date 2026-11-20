import {useState} from 'react'
import ProfileOverviewLayout from '@/layouts/profile/profile-layout';

import {
  UpdateNoteDialog
} from '@/components/Profile/Dialogs/UpdateNoteDialog';

type Note = {
  title: string;
  slug: string;
  note_content: string;
  created_at: string;
  updated_at: string;
  family_member_id: number;
  user_id: number;
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

  return (
        <ProfileOverviewLayout
          title={`Noter for ${note.title}`}
        >
            <>
              <section className="bg-gradient-to-br from-blue-500 to-blue-900 rounded-xl h-45 shadow-md px-10 py-8 md:px-16 md:py-12 flex flex-col md:flex-col gap-4 border-2 border-blue-300">
                <h1 className="text-3xl text-blue-800 font-bold mb-2 md:mb-0 text-white">Magnus - læge noter</h1>
                <p className="text-base md:text-lg leading-relaxed max-w-2xl text-white">
                    Oprettet d. 01-01-2024
                </p>
              </section>
              <section className="mt-8 bg-white p-6 rounded-xl shadow-md">
                <p className="text-base text-blue-900 md:text-lg leading-relaxed max-w-2xl">
                    {note.note_content}
                </p>
              </section>
              <section className="mt-8">
                <button
                  onClick={() => setIsDialogOpen(true)}
                  className="bg-blue-900 text-white px-4 py-2 rounded-md"
                >
                  Rediger Note
                </button>
              </section>
              <UpdateNoteDialog isDialogOpen={isDialogOpen} setIsDialogOpen={setIsDialogOpen} note={note} />
            </>
        </ProfileOverviewLayout>
    );
}