import { useRef, useState, type FormEvent } from 'react';
import { Link, useForm } from '@inertiajs/react';
import { LiaSave } from 'react-icons/lia';
import ProfileOverviewLayout from '@/layouts/profile/profile-layout';
import UpdateNoteEditor, { type UpdateNoteEditorHandle } from '@/components/Editors/UpdateNoteEditor';

type Note = {
  title: string;
  slug: string;
  note_content: string;
  type: string;
};

export default function EditNote({ note }: { note: Note }) {
  const editorRef = useRef<UpdateNoteEditorHandle>(null);
  const [saving, setSaving] = useState(false);
  const [editorError, setEditorError] = useState<string | null>(null);
  const form = useForm({
    title: note.title,
    note_content: note.note_content,
    type: note.type,
  });

  const handleUpdate = async (event: FormEvent) => {
    event.preventDefault();
    if (saving || form.processing) return;
    setSaving(true);
    setEditorError(null);

    try {
      if (!editorRef.current) throw new Error('Editor.js is not available');
      const content = JSON.stringify(await editorRef.current.save());
      form.transform((data) => ({ ...data, note_content: content }));
      form.put(route('profile.notes.update', note.slug));
    } catch (error) {
      console.error('Could not save note content:', error);
      setEditorError('Kunne ikke gemme notens indhold. Prøv igen.');
    } finally {
      setSaving(false);
    }
  };

  return (
    <ProfileOverviewLayout title="Rediger note">
      <form onSubmit={handleUpdate} className="mt-20">
        <div className="toolbar-header h-25 bg-white fixed top-15 left-0 w-full shadow-sm">
          <div className="flex items-center h-full m-auto justify-between max-w-[1520px]">
            <div className="flex-1">
              <select aria-label="Notetype" name="note-type" value={form.data.type} onChange={(event) => form.setData('type', event.target.value)}>
                {!['general', 'health', 'family'].includes(note.type) && <option value={note.type}>{note.type}</option>}
                <option value="general">Generel note</option>
                <option value="health">Sundheds note</option>
                <option value="family">Familie note</option>
              </select>
            </div>
            <div className="flex-1 m-auto">
              <p className="text-2xl font-bold">{form.data.title}</p>
            </div>
            <div className="note-title">
              <div className="toolbar-actions flex items-center gap-4">
                <Link href={route('profile.notes.show', note.slug)} className="text-blue-800">Annuller</Link>
                <button
                  className="bg-gray-100/50 hover:bg-gray-50/50 shadow-sm cursor-pointer text-blue-800 font-bold p-2 rounded focus:outline-none focus:shadow-outline"
                  type="submit"
                  aria-label="Gem note"
                  disabled={saving || form.processing}
                >
                  <LiaSave className="inline-block text-2xl" />
                </button>
              </div>
            </div>
          </div>
        </div>
        <div className="mb-4">
          <h1
            className="text-7xl mb-2 font-medium outline-none"
            contentEditable
            suppressContentEditableWarning
            role="textbox"
            aria-label="Notens titel"
            onInput={(event) => form.setData('title', event.currentTarget.innerText)}
          >
            {note.title}
          </h1>
        </div>
        <div className="mb-4">
          <UpdateNoteEditor
            ref={editorRef}
            initialContent={note.note_content}
            onChange={(content) => form.setData('note_content', content)}
            className="w-full p-2 mb-4"
          />
        </div>
        {editorError && <p role="alert" className="text-red-600">{editorError}</p>}
        {Object.values(form.errors).map((error, index) => <p role="alert" className="text-red-600" key={index}>{error}</p>)}
      </form>
    </ProfileOverviewLayout>
  );
}
