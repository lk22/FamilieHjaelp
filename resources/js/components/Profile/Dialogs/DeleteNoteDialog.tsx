import {useState} from 'react'
import { useForm } from '@inertiajs/react';

interface DeleteNoteDialogProps {
  isDialogOpen: boolean;
  setIsDialogOpen: (isOpen: boolean) => void;
  note: Note
}

type Note = {
  id: number;
  title: string;
  slug: string;
}

export default function DeleteNoteDialog({ isDialogOpen, setIsDialogOpen, note }: DeleteNoteDialogProps) {
  if (!isDialogOpen) return null;
  const [processing, setProcessing] = useState(false);

  const handleClose = () => {
    setProcessing(false);
    setIsDialogOpen(false);
  }

  const form = useForm<Note>({
    id: note.id,
    title: note.title,
    slug: note.slug
  });

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white p-6 rounded-lg shadow-lg">
        <h2 className="text-xl font-bold mb-4">Slet note</h2>
        {processing && <p>Sletter note... vent venligst!</p>}
        <p>Er du sikker på, at du vil slette noten "{note.title}"?</p>
        <div className="mt-4 flex justify-end">
          <button
            onClick={handleClose}
            className="bg-gray-300 text-gray-800 px-4 py-2 rounded-md mr-2"
          >
            Annuller
          </button>
          <button
            onClick={() => {
              setProcessing(true);
              // Implement delete logic here
              form.delete(route('profile.notes.destroy', note.slug));
              handleClose();
            }}
            className="bg-red-600 text-white px-4 py-2 rounded-md"
          >
            Slet
          </button>
        </div>
      </div>
    </div>
  );
}