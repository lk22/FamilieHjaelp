import { Link, router } from '@inertiajs/react';
import { useEffect, useState } from 'react';

import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle, DialogDescription } from '@/components/ui/dialog';

interface GettingStartedModalProps {
    isOpen: boolean;
    closeModal?: () => void;
}

import { useOnboarding } from '@/contexts/OnboardingContext';

export default function GettingStartedModal({ isOpen, closeModal }: GettingStartedModalProps) {
    const { resetOnboarding, onboardingState } = useOnboarding();
    const [preparing, setPreparing] = useState<boolean>(false);

    /**
     * Prepares the onboarding by resetting state and setting loading
     * @returns void
     */
    const prepareOnboarding = () => {
        resetOnboarding(); // resets the onboarding state
        setPreparing(true); // setting preparing loading state
    };

    useEffect(() => {
        if (!preparing) return;
        const timer = setTimeout(() => {
            try {
                router.visit(route('getting-started'));
            } catch (error) {
                console.error('Failed to navigate to getting started:', error);
            }
        }, 2000);

        return () => clearTimeout(timer);
    }, [preparing]);

    return (
        <Dialog open={isOpen} modal={true} onOpenChange={closeModal}>
            <DialogContent className="p-8 sm:max-w-6xl">
                <DialogHeader>
                    <DialogTitle className="mb-4 text-4xl font-semibold text-white">Kom i gang med Familiehjælp</DialogTitle>
                </DialogHeader>
                <div className="mb-6">
                    <span className="space-y-4">
                        {!preparing && (
                            <>
                                <span className="text-lg text-white">
                                    <DialogDescription>
                                        Velkommen til Familiehjælp! Vi er glade for at have dig ombord og ser frem til at hjælpe dig med at organisere og administrere dine familiemedlemmer og deres behov.
                                    </DialogDescription>
                                </span>
                                <span className="text-lg text-white">
                                    <DialogDescription>
                                        For at sikre, at du får den bedst mulige oplevelse, har vi designet en onboarding-proces, der guider dig gennem de
                                        vigtigste funktioner og indstillinger i appen. Denne proces vil hjælpe dig med at konfigurere din konto, tilføje
                                        familiemedlemmer og forstå, hvordan du bedst kan bruge Familiehjælp til at støtte din familie.
                                    </DialogDescription>
                                </span>
                            </>
                        )}
                        {preparing ? (
                            <>
                                <span className="border-l-4 border-blue-500 bg-blue-100 p-4 text-blue-700" role="alert">
                                    <DialogDescription className="font-bold">Klargøring i gang:</DialogDescription>
                                    <DialogDescription>Vi klargør din onboarding-oplevelse. Dette kan tage et øjeblik. Tak for din tålmodighed!</DialogDescription>
                                </span>
                            </>
                        ) : (
                            <>
                                {onboardingState.completed ? (
                                    <span className="border-l-4 border-yellow-500 bg-yellow-100 p-4 text-yellow-700" role="alert">
                                        <DialogDescription className="font-bold">Bemærk:</DialogDescription>
                                        <DialogDescription>
                                            Det ser ud til, at du allerede har påbegyndt onboarding-processen. Ved at klikke på "Lad os komme i gang!"
                                            nedenfor, vil din tidligere fremgang blive nulstillet, og du kan starte forfra.
                                        </DialogDescription>
                                    </span>
                                ) : (
                                    <span className="border-l-4 border-green-500 bg-green-100 p-4 text-green-700" role="alert">
                                        <DialogDescription className="font-bold">Klar til at starte:</DialogDescription>
                                        <DialogDescription>
                                            Du er nu klar til at begynde onboarding-processen. Klik på "Lad os komme i gang!" nedenfor for at starte
                                            din rejse med Familiehjælp.
                                        </DialogDescription>
                                    </span>
                                )}
                            </>
                        )}
                    </span>
                </div>
                <DialogFooter>
                    <span className="mt-6">
                        {onboardingState.progress !== 'not_started' ? (
                            <>
                                <div className="flex justify-end gap-4">
                                    <div className="reset-onboarding" onClick={() => resetOnboarding()}>
                                        <Link
                                            href={route('getting-started')}
                                            className="inline-block rounded-sm border border-white bg-white px-5 py-1.5 text-xl leading-normal text-blue-500 hover:border-white"
                                        >
                                            Start forfra
                                        </Link>
                                    </div>
                                    <div className="continue">
                                        <Link
                                            href={route('getting-started')}
                                            className="inline-block rounded-sm border border-white bg-white px-5 py-1.5 text-xl leading-normal text-blue-500 hover:border-white"
                                        >
                                            Fortsæt hvor du slap
                                        </Link>
                                    </div>
                                </div>
                            </>
                        ) : (
                            <>
                                <div className="flex justify-end gap-4">
                                    <div className="reset-onboarding cursor-pointer">
                                        <button
                                            className="inline-block cursor-pointer rounded-sm border border-white bg-white px-5 py-1.5 text-xl leading-normal text-blue-500 hover:border-white"
                                            onClick={() => prepareOnboarding()}
                                            disabled={preparing}
                                        >
                                            {preparing ? 'Klargører' : 'Lad os komme i gang'}
                                        </button>
                                    </div>
                                    {!preparing && (
                                        <>
                                            <div className="inline-block cursor-pointer rounded-sm border border-white bg-white px-5 py-1.5 text-xl leading-normal text-blue-500 hover:border-white">
                                                <button onClick={closeModal} className="decoration-none">
                                                    Luk
                                                </button>
                                            </div>
                                        </>
                                    )}
                                </div>
                            </>
                        )}
                    </span>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
}
