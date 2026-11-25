import { SubmitEvent } from 'react';

import ProfileOverviewLayout from '@/layouts/profile/profile-layout';
import { useForm } from '@inertiajs/react';

import CreateNoteEditor, {type CreateNoteEditorHandle} from '@/components/Editors/CreateNoteEditor';

import {useState, useRef} from 'react';

type NoteItemProps = {
  title: string;
  note_content: string;
  type: string;
}

const CreateNote = () => {
  const editorRef = useRef<CreateNoteEditorHandle>(null);
  const [saving, setSaving] = useState<boolean>(false);

  const handleEditorChange = (content: string) => {
    setData('note_content', content);
  };

  const {setData, post, processing } = useForm<NoteItemProps>({
    title: '',
    note_content: '',
    type: 'generel'
  });

  const handleCreateNote = async (e: SubmitEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (saving) return;
    setSaving(true);

    try {
      console.log("saving note...")
      if (!editorRef.current) throw new Error('Editor.js is not available')
      const content = JSON.stringify(await editorRef.current.save())
      console.log(content)

      post(route('profile.notes.create'));
    } catch (error) {
      console.error('Could not save note content', error)
    } finally {
      setSaving(false);
    }
  }

    return (
      <ProfileOverviewLayout title="Create Note">
        <form>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="title">
              Title
            </label>
            <input
              type="text"
              className="@2xl:fi-grid-col-order"
              id="title"
              onChange={(title) => setData('title', title.target.value)}
              placeholder="Angiv titel"
            />
          </div>
          <div className="mb-4">
            <label htmlFor="type">
              <select name="note-type" id="type" onChange={(type) => setData('type', type.target.value)}>
                <option value="general">Generel note</option>
                <option value="health">Sundheds note</option>
                <option value="family">Familie note</option>
              </select>
            </label>
          </div>
          <div className="mb-4">
            <CreateNoteEditor
              ref={editorRef}
              onChange={handleEditorChange}
            />
          </div>
          <div className="flex items-center justify-between">
            <input
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
              type="submit"
              onClick={handleCreateNote}
              disabled={processing}
              value="Opret note"
            />
          </div>
        </form>
      </ProfileOverviewLayout>
    );
};

export default CreateNote;