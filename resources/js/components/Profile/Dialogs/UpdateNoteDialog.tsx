import {
  Dialog,
  DialogHeader,
  DialogTitle,
  DialogContent,
  DialogFooter,
  DialogDescription
} from '@/components/ui/dialog';

import { useForm } from '@inertiajs/react';

import { useState } from 'react';

import { createEditor } from 'slate';
import {Slate, Editable, withReact } from 'slate-react';

interface UpdateNoteDialogProps {
  isDialogOpen: boolean;
  setIsDialogOpen: (isOpen: boolean) => void;
  note: Note;
}

type Note = {
  title: string;
  family_member_id: number;
  user_id: number;
  slug: string;
  note_content: string;
  created_at: string;
  updated_at: string;
}

export function UpdateNoteDialog({ isDialogOpen, setIsDialogOpen, note }: UpdateNoteDialogProps) {
  const form = useForm<Note>({
    family_member_id: note.family_member_id,
    user_id: note.user_id,
    slug: note.slug,
    title: note.title,
    note_content: note.note_content,
    created_at: note.created_at,
    updated_at: note.updated_at
  });

  const [editor] = useState(() => withReact(createEditor()));

  const handleUpdateNote = () => {
    form.setData('updated_at', new Date().toISOString());

    form.post(route('profile.note.update', note.slug));
  }

  return (
    <Dialog
      open={isDialogOpen}
      onOpenChange={setIsDialogOpen}
    >
      <DialogContent
        className="bg-white/50 backdrop-blur-md border border-white/20 shadow-lg rounded-lg p-6 max-w-lg shadow-blue-500/30"
      >
        <DialogContent>
        <DialogHeader>
          <DialogTitle className="text-blue-800">Opdater note</DialogTitle>
          <DialogDescription>
            Opdater detaljerne for din note.
          </DialogDescription>
        </DialogHeader>
          <form onSubmit={(e) => { e.preventDefault(); handleUpdateNote(); }}>
            <input type="hidden" name="family_member_id" value={form.data.family_member_id} />
            <input type="hidden" name="user_id" value={form.data.user_id} />
            <input type="hidden" name="slug" value={form.data.slug} />
            <input
              type="text"
              value={form.data.title}
              onChange={(e) => form.setData('title', e.target.value)}
              placeholder="Title"
              className="w-full p-2 border border-gray-300 rounded-md mb-4"
            />
            <textarea
              value={form.data.note_content}
              onChange={(e) => form.setData('note_content', e.target.value)}
              placeholder="Note Content"
              className="w-full p-2 border border-gray-300 rounded-md mb-4"
            />

          </form>
          <DialogFooter>
            <button
              className="bg-blue-900 text-white px-4 py-2 rounded-md mr-2"
              type="button" onClick={handleUpdateNote}>
              Opdater Note
            </button>
            <button
              className="bg-gray-300 text-gray-800 px-4 py-2 rounded-md"
              type="button" onClick={() => setIsDialogOpen(false)}>
              Annuller
            </button>
          </DialogFooter>
        </DialogContent>
      </DialogContent>
    </Dialog>
  );
}