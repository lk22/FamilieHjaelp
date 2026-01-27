import { router } from '@inertiajs/react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogTitle,
  DialogHeader,
  DialogFooter
} from '@/components/ui/dialog';

interface ResetModalProps {
    isOpen: boolean;
    closeModal?: () => void;
}

export default function ResetModal({ isOpen, closeModal }: ResetModalProps) {
  return (
    <Dialog open={isOpen} modal={true} onOpenChange={(open) => !open && closeModal?.()}>
      <DialogContent className='bg-blue-500'>
        <DialogHeader>
          <DialogTitle className="text-2xl font-semibold mb-4 text-white">Du er igang med at besvare vores spørgsmål</DialogTitle>
        </DialogHeader>
        <DialogDescription className="mb-6">
          <div className="text-lg">Det ser ud til du er igang med at besvare vores spørgsmål.</div>
          <div className="text-lg mt-4">Vi gemmer din fremgang, så du kan fortsætte senere.</div>
        </DialogDescription>
        <DialogFooter>
          <button
            className="bg-white text-blue-500 px-4 py-2 rounded hover:bg-gray-200"
            onClick={() => closeModal?.()}
          >
            Fortsæt
          </button>
          <button
            className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700 ms-4"
            onClick={() => router.visit(route('home'))}
          >
            Afslut og gå til forsiden
          </button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}