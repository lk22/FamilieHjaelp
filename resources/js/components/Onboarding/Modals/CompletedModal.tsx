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
          <DialogTitle className="text-4xl font-semibold mb-4 text-white">
            Du har gennemført onboardingen
          </DialogTitle>
        </DialogHeader>
        <DialogDescription className="mb-6">
          <div className="space-y-4">
            <p className="text-lg text-white">
              Du har svaret på alle spørgmsål i onboardingen.
            </p>
            <p>
              Hvis du ønsker at starte forfra og ændre dine svar, kan du klikke på knappen nedenfor.
            </p>
          </div>
        </DialogDescription>
        <DialogFooter>
          <button>
            <Link href={route('onboarding.confirmation')} className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition">
              Gå til bekræftelsessiden
            </Link>
          </button>
          <button
            onClick={() => {
              resetOnboarding();
              if (closeModal) closeModal();
              router.visit(route('getting-started'));
            }}
            className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition"
          >
            Start forfra
          </button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}