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
    <Dialog open={isOpen} modal={true} onOpenChange={(open) => !open && closeModal?.()}>
      <DialogContent className='bg-blue-500'>
        <DialogHeader>
          <DialogTitle className="text-2xl font-semibold mb-4 text-white">Sat på pause</DialogTitle>
        </DialogHeader>
        <DialogDescription className="text-lg text-white">
          <DialogDescription className="mb-6 text-lg text-white" asChild>
            <div>
              <p>Det ser ud til, at du har været inaktiv i et stykke tid. For at beskytte dine oplysninger har vi sat din onboarding-session på pause.</p>
              <p className="mt-4">Bevæg musen for at fortsætte din session.</p>
            </div>
          </DialogDescription>
        </DialogDescription>
      </DialogContent>
    </Dialog>
  );
}