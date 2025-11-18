import { Link } from '@inertiajs/react';

import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogDescription
} from '@/components/ui/dialog';

interface GettingStartedModalProps {
    isOpen: boolean;
}

import { useOnboarding } from '@/contexts/OnboardingContext';

export default function GettingStartedModal({ isOpen }: GettingStartedModalProps) {

    const { resetOnboarding, onboardingState } = useOnboarding();

    return (
        <Dialog open={isOpen} modal={true}>
            <DialogContent className="sm:max-w-2xl">
                <DialogHeader>
                    <DialogTitle className="text-4xl font-semibold mb-4 text-white">Kom i gang med Familiehjælp</DialogTitle>
                    <DialogDescription className="mb-6">
                        Velkommen til Familiehjælp! Følg trinene nedenfor for at komme i gang med at bruge platformen.
                    </DialogDescription>
                </DialogHeader>
                <div className="space-y-4">
                    {
                        onboardingState.completedSteps.length > 0 ? (
                            <div className="bg-yellow-100 border-l-4 border-yellow-500 text-yellow-700 p-4" role="alert">
                                <p className="font-bold">Bemærk:</p>
                                <p>Det ser ud til, at du allerede har påbegyndt onboarding-processen. Ved at klikke på "Lad os komme i gang!" nedenfor, vil din tidligere fremgang blive nulstillet, og du kan starte forfra.</p>
                            </div>
                        ) : (
                            <ol className="list-decimal list-inside space-y-2 text-white">
                                <li>
                                    Fortæl os om din familie: Gå til din profil og udfyld oplysninger om dine familiemedlemmer, deres behov og præferencer.
                                </li>
                            </ol>
                        )
                    }
                    <div className="mt-6">
                        {
                            onboardingState.completedSteps.length > 0 ? (
                                <>
                                    <div className="flex gap-4 justify-end">
                                        <div className="reset-onboarding" onClick={() => resetOnboarding()}>
                                            <Link href={route('getting-started')} className="inline-block rounded-sm border border-white px-5 py-1.5 text-xl leading-normal bg-white text-blue-500 hover:border-white">
                                                Start forfra
                                            </Link>
                                        </div>
                                        <div className="continue">
                                            <Link href={route('getting-started')} className="inline-block rounded-sm border border-white px-5 py-1.5 text-xl leading-normal bg-white text-blue-500 hover:border-white">
                                                Fortsæt hvor du slap
                                            </Link>
                                        </div>
                                    </div>
                                </>
                            ) : (
                                <div className="reset-onboarding" onClick={() => resetOnboarding()}>
                                    <Link href={route('getting-started')} className="inline-block rounded-sm border border-white px-5 py-1.5 text-xl leading-normal bg-white text-blue-500 hover:border-white">
                                        Lad os komme i gang!
                                    </Link>
                                </div>
                            )
                        }
                    </div>
                </div>
            </DialogContent>
        </Dialog>
    );
}