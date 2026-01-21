import {useState, useEffect} from 'react';
import { Link, router } from '@inertiajs/react';

import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogDescription,
    DialogFooter,
} from '@/components/ui/dialog';

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
    }

    useEffect(() => {
        if ( ! preparing) return;
        const timer = setTimeout(() => {
            try {
                router.visit(route('getting-started'));
            } catch (error) {
                console.error("Failed to navigate to getting started:", error);
            }
        }, 2000);

        return () => clearTimeout(timer);
    }, [preparing])

    return (
        <Dialog open={isOpen} modal={true} onOpenChange={closeModal}>
            <DialogContent className="sm:max-w-6xl  p-8">
                <DialogHeader>
                    <DialogTitle className="text-4xl font-semibold mb-4 text-white">
                        Kom i gang med Familiehjælp
                    </DialogTitle>
                </DialogHeader>
                <DialogDescription className="mb-6">
                    <div className="space-y-4">
                        {!preparing && (
                            <>
                                <p className="text-lg text-white">
                                    Velkommen til Familiehjælp! Vi er glade for at have dig ombord og ser frem til at hjælpe dig med at organisere og administrere dine familiemedlemmer og deres behov.
                                </p>
                                <p className="text-lg text-white">
                                    For at sikre, at du får den bedst mulige oplevelse, har vi designet en onboarding-proces, der guider dig gennem de vigtigste funktioner og indstillinger i appen. Denne proces vil hjælpe dig med at konfigurere din konto, tilføje familiemedlemmer og forstå, hvordan du bedst kan bruge Familiehjælp til at støtte din familie.
                                </p>
                            </>
                        )}
                        {
                            preparing ? (
                                <>
                                    <div className="bg-blue-100 border-l-4 border-blue-500 text-blue-700 p-4" role="alert">
                                        <p className="font-bold">Klargøring i gang:</p>
                                        <p>Vi klargør din onboarding-oplevelse. Dette kan tage et øjeblik. Tak for din tålmodighed!</p>
                                    </div>
                                </>
                            ) : (
                                <>
                                    {
                                        onboardingState.completed ? (
                                            <div className="bg-yellow-100 border-l-4 border-yellow-500 text-yellow-700 p-4" role="alert">
                                                <p className="font-bold">Bemærk:</p>
                                                <p>Det ser ud til, at du allerede har påbegyndt onboarding-processen. Ved at klikke på "Lad os komme i gang!" nedenfor, vil din tidligere fremgang blive nulstillet, og du kan starte forfra.</p>
                                            </div>
                                        ) : (
                                            <div className="bg-green-100 border-l-4 border-green-500 text-green-700 p-4" role="alert">
                                                <p className="font-bold">Klar til at starte:</p>
                                                <p>Du er nu klar til at begynde onboarding-processen. Klik på "Lad os komme i gang!" nedenfor for at starte din rejse med Familiehjælp.</p>
                                            </div>
                                        )
                                    }
                                </>
                            )
                        }
                </div>
                </DialogDescription>
                <DialogFooter>
                    <div className="mt-6">
                        {
                            onboardingState.completed ? (
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
                                <>
                                    <div className="flex gap-4 justify-end">
                                        <div className="reset-onboarding cursor-pointer">
                                            <button
                                                className="inline-block rounded-sm border border-white px-5 py-1.5 text-xl leading-normal bg-white text-blue-500 hover:border-white cursor-pointer"
                                                onClick={() => prepareOnboarding()}
                                                disabled={preparing}
                                            >
                                                {preparing ? 'Klargører' : 'Lad os komme i gang'}
                                            </button>
                                        </div>
                                        {! preparing && (
                                            <>
                                                <div className="inline-block rounded-sm border border-white px-5 py-1.5 text-xl leading-normal bg-white text-blue-500 hover:border-white cursor-pointer">
                                                    <button onClick={closeModal} className="decoration-none">
                                                        Luk
                                                    </button>
                                                </div>
                                            </>
                                        )}
                                    </div>
                                </>
                            )
                        }
                    </div>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
}