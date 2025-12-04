import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogTitle,
  DialogHeader
} from '@/components/ui/dialog';

interface InactivityModalProps {
    isOpen: boolean;
    closeModal?: () => void;
}

export default function InactivityModal({ isOpen, closeModal }: InactivityModalProps) {
  return (
    <Dialog open={isOpen} modal={true}>
      <DialogContent className='bg-blue-500'>
        <DialogHeader>
          <DialogTitle className="text-2xl font-semibold mb-4 text-white">Din session er paused</DialogTitle>
        </DialogHeader>
        <DialogDescription className="mb-6">
          <p className="text-lg">Det ser ud til, at du har været inaktiv i et stykke tid. For at beskytte dine oplysninger har vi paused din onboarding-session.</p>
          <p className="text-lg mt-4">bevæg musen for at fortsætte din session</p>
        </DialogDescription>
      </DialogContent>
    </Dialog>
  );
}