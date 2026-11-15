import {Link, router} from '@inertiajs/react';
import {
  Dialog,
  DialogHeader,
  DialogContent,
  DialogTitle,
  DialogDescription,
  DialogFooter
} from '@/components/ui/dialog';

type modalProps = {
  isOpen: boolean;
  closeModal?: () => void;
}

import { useOnboarding } from '@/contexts/OnboardingContext';

export default function CompletedModal({ isOpen, closeModal }: modalProps) {
  const {
    resetOnboarding
  } = useOnboarding();
  return (
    <Dialog open={isOpen} modal={true} onOpenChange={closeModal}>
      <DialogContent className="sm:max-w-2xl p-8">
        <DialogHeader>
          <DialogTitle className="text-4xl font-semibold mb-4 text-blue-900">
            Du har udfyldt spørgeskemaet!
          </DialogTitle>
        </DialogHeader>
        <DialogDescription>
          Tak fordi du tog dig tid til at gennemføre vores onboarding! Vi håber, at det har givet dig en klar forståelse af, hvordan du kan bruge vores platform til at få den støtte og information, du har brug for.
        </DialogDescription>
        <DialogDescription>
          Hvis du har spørgsmål eller brug for yderligere hjælp, er du altid velkommen til at kontakte os. Vi er her for at støtte dig på din rejse.
        </DialogDescription>
        <DialogFooter className="mt-6 flex space-x-4">
          <Link
            href={route('onboarding.confirmation')}
            className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition inline-block"
          >
            Gå til bekræftelsessiden
          </Link>
          <button
            onClick={() => {
              resetOnboarding();
              if (closeModal) closeModal();
              router.visit(route('getting-started'));
            }}
            className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition cursor-pointer"
          >
            Start forfra
          </button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}