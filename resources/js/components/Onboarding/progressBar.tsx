import { Link } from '@inertiajs/react';
import { useOnboarding } from '@/contexts/OnboardingContext';

// defining the progress step properties
interface ProgressStepProps {
    step: number;
    lastStep?: boolean;
    isCompleted: boolean;
    stepName: string;
    currentScenario: string;
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
    console.log('Rendering ProgressBar with onboardingState:', onboardingState);
    const currentScenario = onboardingState.scenarios.find((s) => s.id === onboardingState.currentScenario);
    const steps = currentScenario ? currentScenario.steps : [];

    const handleStepsList = () => {
        return steps.map((step, index: number) => {
            const lastStep = steps.length - 1 === index;
            const isCompleted = step.completed;
            const stepName = step.stepName; // Fallback to step id if name is not defined

            return (
                <div key={index} className="relative flex-1">
                    <ProgressStep
                        step={index + 1}
                        lastStep={lastStep}
                        isCompleted={isCompleted}
                        stepName={stepName}
                        currentScenario={onboardingState.currentScenario}
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

/**
 * Component for individual progress step
 *
 * @param step
 * @param lastStep
 * @param isCompleted
 * @param stepName
 * @param currentScenario
 *
 * @description Renders a single step in the progress bar, indicating whether it is completed or not.
 * @returns JSX.Element
 */
const ProgressStep = ({
    step,
    lastStep,
    isCompleted,
    stepName,
    currentScenario
}: ProgressStepProps) => {
    // give me the last element in the array;
    return (
        <>
            {isCompleted ? (
                <Link href={route('onboarding.scenario.step', { scenario: currentScenario, step: stepName })} className="relative flex items-center">
                    <div className={`relative top-8 z-10 p-4 h-[60px] rounded-full w-[60px] flex items-center justify-center ${isCompleted ? 'bg-blue-900 text-white hover:bg-blue-700' : 'bg-white text-blue-900'}`}>{step}</div>
                </Link>
            ) : (
                <div className={`relative top-8 z-10 p-4 h-[60px] rounded-full w-[60px] flex items-center cursor-pointer justify-center border-2 border-blue-900 ${isCompleted ? 'bg-blue-900 text-white' : 'bg-white hover:bg-blue-500 hover:text-white text-blue-900'} ${isCompleted ? 'animate-completed-step' : ''}`}>{step}</div>
            )}
            <div className={` step-after absolute top-[60px] left-0 w-full h-1 ${isCompleted ? 'bg-blue-900' : 'bg-gray-300'} ${lastStep ? 'hidden': ''} `}></div>
        </>
    )
}