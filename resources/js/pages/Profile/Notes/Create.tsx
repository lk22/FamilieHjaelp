import React, { ChangeEvent } from 'react';

import ProfileOverviewLayout from '@/layouts/profile/profile-layout';
import { useForm } from '@inertiajs/react';

import CreateNoteEditor, {type CreateNoteEditorHandle} from '@/components/Editors/CreateNoteEditor';

import {useState, useRef} from 'react';
import { form } from 'framer-motion/client';

type NoteItemProps = {
  title: string;
  note_content: string;
}

const CreateNote = () => {
  const editorRef = useRef<CreateNoteEditorHandle>(null);
  const [saving, setSaving] = useState<boolean>(false);

  const handleEditorChange = (content: string) => {
    setData('note_content', content);
  };

  const { data, setData, post, processing } = useForm<NoteItemProps>({
    title: '',
    note_content: '',
  });

  const handleCreateNote = async () => {
    if (saving) return;
    setSaving(true);

    try {
      console.log("saving note...")
      if (!editorRef.current) throw new Error('Editor.js is not available')
      const content = JSON.stringify(await editorRef.current.save())
      console.log(content)

      // post(route('profile.notes.create'));
    } catch (error) {
      console.error('Could not save note content', error)
    } finally {
      setSaving(false);
    }
  }

    return (
      <ProfileOverviewLayout title="Create Note">
        <form onSubmit={handleCreateNote}>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="title">
              Title
            </label>
            <input
              type="text"
              className="@2xl:fi-grid-col-order"
              id="title"
              onChange={(title) => setData('title', title.target.value)}
            />
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