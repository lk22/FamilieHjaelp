import { Link } from '@inertiajs/react';
import { useOnboarding } from '@/contexts/OnboardingContext';

// defining the progress step properties
interface ProgressStepProps {
    step: number;
    currentStep: number;
    lastStep?: boolean;
    isCompleted: boolean;
}

/**
 * ProgressBar Component
 * @author Leo Knudsen
 * @description A simple progress bar component that displays steps and highlights the current step.
 * Now uses OnboardingContext for real-time state updates across all components.
 */
export default function ProgressBar() {
    
    // Get onboarding state from context - this will automatically update when state changes
    const { onboardingState } = useOnboarding();
    
    console.log('ProgressBar - Current onboarding state:', onboardingState);

    const handleStepsList = () => {
        const { steps } = onboardingState;
        return steps.map((step, index: number) => {
            console.log('ProgressBar - Step:', step);
            const lastStep = steps.length - 1 === index;
            const isCompleted = step.progress.completed;
            return (
                <div key={index} className="relative flex-1">
                    <ProgressStep 
                        step={index + 1} 
                        lastStep={lastStep} 
                        isCompleted={isCompleted} 
                    />
                </div>
            );
        });
    }

    return (
        <>
            <div className="flex items-center">
                {handleStepsList()}
            </div>
        </>
    )
}

const ProgressStep = ({
    step,
    lastStep,
    isCompleted
}: Omit<ProgressStepProps, 'currentStep'>) => {
    // give me the last element in the array;
    return (
        <>
            <Link href={route('onboarding.step', { step: step })} className="relative flex items-center">
                <div className={`relative top-8 z-10 p-4 h-[60px] rounded-full w-[60px] flex items-center justify-center ${isCompleted ? 'bg-blue-900 text-white' : 'bg-white text-blue-900'}`}>{step}</div>
            </Link>
            <div className={`absolute top-[60px] left-0 w-full h-1 ${isCompleted ? 'bg-blue-900' : 'bg-gray-300'} ${lastStep ? 'hidden': ''} `}></div>
        </>
    )
}