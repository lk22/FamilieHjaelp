import { MouseEvent } from 'react';
import ProfileOverviewLayout from '@/layouts/profile/profile-layout';
import { useForm } from '@inertiajs/react';

import CreateNoteEditor, {type CreateNoteEditorHandle} from '@/components/Editors/CreateNoteEditor';

import {useState, useRef} from 'react';
import { LiaSave } from "react-icons/lia";

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

  const { data, setData, post, processing } = useForm<NoteItemProps>({
    title: 'Ny note',
    note_content: '',
    type: 'generel'
  });

  const handleCreateNote = async (e: MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    if (saving) return;
    setSaving(true);

    try {
      console.log("saving note...")
      if (!editorRef.current) throw new Error('Editor.js is not available')
      const content = JSON.stringify(await editorRef.current.save())

      post(route('profile.notes.create'));
    } catch (error) {
      console.error('Could not save note content', error)
    } finally {
      setSaving(false);
    }
  }

    return (
      <ProfileOverviewLayout title="Create Note">
        <div className="toolbar-header h-25 bg-white fixed top-15 left-0 w-full shadow-sm">
          <div className="flex items-center h-full m-auto justify-between max-w-[1520px]">
            <div className="flex-1">
              <select name="note-type" id="type" onChange={(type) => setData('type', type.target.value)}>
                <option value="general">Generel note</option>
                <option value="health">Sundheds note</option>
                <option value="family">Familie note</option>
              </select>
            </div>
            <div className="flex-1 m-auto">
              <p className="text-2xl font-bold">
                {data?.title}
              </p>
            </div>
            <div className="note-title">
              <div className="toolbar-actions">
                <div className="action">
                  <button
                    className="bg-gray-100/50 hover:bg-gray-50/50 shadow-sm cursor-pointer text-blue-800 font-bold p-2 rounded focus:outline-none focus:shadow-outline"
                    type="button"
                    onClick={(e) => handleCreateNote(e)}
                    disabled={processing}
                  >
                    <LiaSave className="inline-block text-2xl" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
        <form className="mt-20">
          <div className="mb-4">
            <h1
              className="text-7xl mb-2 font-medium outline-none"
              contentEditable={true}
              suppressContentEditableWarning={true}
              onInput={(e) => setData('title', (e.target as HTMLHeadingElement).innerText)}
            >
              Ny note
            </h1>
          </div>
          <div className="mb-4">
            <CreateNoteEditor
              ref={editorRef}
              onChange={handleEditorChange}
            />
          </div>
        </form>
      </ProfileOverviewLayout>
    );
};

export default CreateNote;