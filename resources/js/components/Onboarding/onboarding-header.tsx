import { useState } from 'react';
import { useOnboarding } from '@/contexts/OnboardingContext';
import { router } from '@inertiajs/react';

import ResetModal from './Modals/ResetModal';

export default function OnboardingHeader() {
    const {resetOnboarding, onboardingState} = useOnboarding();
    const [isResetModalOpen, setIsResetModalOpen] = useState(false);

    const handleStateReset = (e: React.MouseEvent) => {
        e.preventDefault();
        resetOnboarding();
        router.visit(route('onboarding.reset'));
    }

    // Handle validate process (go back to home if not in progress)
    const handleValidateProcess = (e: React.MouseEvent) => {
        e.preventDefault();

        setIsResetModalOpen(true);
    }

    return (
        <>
            <header>
                <nav className="fixed top-0 left-0 z-50 w-full bg-transparent">
                    <div className="container mx-auto flex h-16 items-center justify-between px-4">
                        <a href={route('home')} onClick={handleValidateProcess} className="flex items-center text-white">
                            Gå tilbage
                        </a>
                        <a
                            href={route('onboarding.reset')}
                            className="flex items-center text-white"
                            onClick={(e) => handleStateReset(e)}
                        >
                            Start forfra
                        </a>
                    </div>
                </nav>
            </header>
            {
                isResetModalOpen && (
                    <ResetModal isOpen={isResetModalOpen} closeModal={() => setIsResetModalOpen(false)} />
                )
            }
        </>
    );
}