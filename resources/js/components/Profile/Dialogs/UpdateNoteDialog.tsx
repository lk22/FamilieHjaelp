import {
  Dialog,
  DialogHeader,
  DialogTitle,
  DialogContent,
  DialogFooter,
  DialogDescription
} from '@/components/ui/dialog';

import { useForm } from '@inertiajs/react';

import React, { useRef, useState } from 'react';

import UpdateNoteEditor, { type UpdateNoteEditorHandle } from '@/components/Editors/UpdateNoteEditor';

interface UpdateNoteDialogProps {
  isDialogOpen: boolean;
  setIsDialogOpen: (isOpen: boolean) => void;
  note: Note;
}

type Note = {
  id: number;
  title: string;
  family_member_id: number;
  user_id: number;
  slug: string;
  note_content: string;
  created_at: string;
  updated_at: string;
  family_id: number;
}

export function UpdateNoteDialog({ isDialogOpen, setIsDialogOpen, note }: UpdateNoteDialogProps) {
  const [processing, setProcessing] = useState<boolean>(false);
  const form = useForm<Note>({
    id: note.id,
    family_id: note.family_id,
    family_member_id: note.family_member_id,
    user_id: note.user_id,
    slug: note.slug,
    title: note.title,
    note_content: note.note_content,
    created_at: note.created_at,
    updated_at: note.updated_at
  });

  const editorRef = useRef<UpdateNoteEditorHandle>(null);
  const [savingEditor, setSavingEditor] = useState(false);
  const [editorError, setEditorError] = useState<string | null>(null);

  const handleUpdateNote = async () => {
    if (savingEditor || form.processing) return;
    setProcessing(true);
    setSavingEditor(true);
    setEditorError(null);
    try {
      console.log("Saving note...")
      if (!editorRef.current) throw new Error('Editor.js is not available');
      const content = JSON.stringify(await editorRef.current.save());
      const updatedAt = new Date().toISOString();
      form.setData((data) => ({ ...data, note_content: content, updated_at: updatedAt }));
      form.transform((data) => ({ ...data, note_content: content, updated_at: updatedAt }));
      form.put(route('profile.notes.update', note.slug));
    } catch (error) {
      console.error('Could not save note content:', error);
      setEditorError('Kunne ikke gemme notens indhold. Prøv igen.');
    } finally {
      setSavingEditor(false);
    }
    setProcessing(false);
  }

  return (
    <Dialog
      open={isDialogOpen}
      onOpenChange={setIsDialogOpen}
    >
      <DialogContent
        className="bg-white backdrop-blur-md border border-white/20 shadow-lg rounded-lg p-6 max-w-lg shadow-blue-500/30"
      >
        <DialogHeader>
          <DialogTitle className="text-blue-800">Opdater note</DialogTitle>
          <DialogDescription>
            Opdater detaljerne for din note.
          </DialogDescription>
        </DialogHeader>
            <div hidden={processing}>
            <form onSubmit={(e) => { e.preventDefault(); handleUpdateNote(); }}>
              <input type="hidden" name="id" value={form.data.id} />
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
              <UpdateNoteEditor ref={editorRef} initialContent={note.note_content} onChange={(content) => form.setData('note_content', content)} />
              {editorError && <p role="alert" className="text-red-600">{editorError}</p>}
            </form>
              {Object.keys(form.errors).length > 0 && (
                <ul className="text-red-600 mb-4">
                  {Object.entries(form.errors).map(([key, error]) => (
                    <li key={key}>{error}</li>
                  ))}
                </ul>
              )}
            </div>
          {processing && <p className="text-gray-600 mb-4">Opdaterer note...</p>}
          <DialogFooter>
            <button
              className="bg-blue-900 text-white px-4 py-2 rounded-md mr-2"
              type="button"
              disabled={savingEditor || form.processing}
              onClick={handleUpdateNote}
              >
              Opdater Note
            </button>
            <button
              className="bg-gray-300 text-gray-800 px-4 py-2 rounded-md"
              type="button" onClick={() => setIsDialogOpen(false)}>
              Annuller
            </button>
          </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}