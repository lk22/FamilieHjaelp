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
    onConfirm?: () => void;
    handleStateReset?: (e: React.MouseEvent) => void;
}

export default function ResetModal({ isOpen, closeModal, onConfirm, handleStateReset }: ResetModalProps) {
  return (
    <Dialog open={isOpen} modal={true} onOpenChange={(open) => !open && closeModal?.()}>
      <DialogContent className='bg-blue-500'>
        <DialogHeader>
          <DialogTitle className="text-2xl font-semibold mb-4 text-white">Du er igang med at besvare vores spørgsmål</DialogTitle>
        </DialogHeader>
          <DialogDescription className="text-lg text-white">Det ser ud til du er igang med at besvare vores spørgsmål.</DialogDescription>
          <DialogDescription className="text-lg mt-4 text-white">Ønsker du at forlade processen?</DialogDescription>
        <DialogFooter>
          <button
            className="bg-white text-blue-500 px-4 py-2 rounded hover:bg-gray-200"
            onClick={() => closeModal?.()}
          >
            Fortsæt
          </button>
          <button
            className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 ms-2"
            onClick={() => {
              onConfirm?.();
              router.visit(route('getting-started'));
              handleStateReset?.(new MouseEvent('click') as unknown as React.MouseEvent);
            }}
          >
            Start forfra
          </button>
          <button
            className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 ms-2"
            onClick={() => {
              onConfirm?.();
              router.visit(route('home'));
            }}
          >
            Gå til forsiden
          </button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}