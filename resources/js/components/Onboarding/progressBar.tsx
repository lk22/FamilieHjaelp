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
    const { onboardingState } = useOnboarding();
    const currentScenario = onboardingState.scenarios.find((s) => s.id === onboardingState.currentScenario);
    const steps = currentScenario ? currentScenario.steps : [];

    const handleStepsList = () => {
        return steps.map((step, index: number) => {
            const lastStep = steps.length - 1 === index;
            const isCompleted = step.completed;
            const stepName = step.stepName;

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

    const calculateProgressWidth = () => {
        const totalSteps = steps.length;
        const completedSteps = steps.filter(step => step.completed).length;

        if (totalSteps === 0) return '0%';

        // if all steps are completed, return the width to the last step
        if (completedSteps === totalSteps) return '90%';

        const progressPercentage = (completedSteps / totalSteps) * 100;
        return `${progressPercentage}%`;
    }

    return (
        <>
            <div className="flex items-center relative">
                {handleStepsList()}
                <div id="step-progress-line" className='step-progress-line' style={{ width: calculateProgressWidth() }}></div>
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
    const isCompletedStyles = `relative top-8 z-10 p-4 h-[60px] transition rounded-full w-[60px] flex items-center justify-center ${isCompleted ? 'bg-blue-700 text-white hover:bg-blue-900' : 'bg-white text-blue-900'}`;
    const notCompletedStyles = `relative top-8 z-10 p-4 h-[60px] transition rounded-full w-[60px] flex items-center cursor-pointer justify-center border-2 border-blue-700 ${isCompleted ? 'bg-blue-700 text-white' : 'bg-white hover:bg-blue-500 hover:text-white text-blue-700'} ${isCompleted ? 'step-completed' : ''}`;
    return (
        <>
            {isCompleted ? (
                <Link href={route('onboarding.scenario.step', { scenario: currentScenario, step: stepName })} className="relative flex items-center">
                    <div className={isCompletedStyles}>{step}</div>
                </Link>
            ) : (
                <div className={notCompletedStyles}>{step}</div>
            )}
            {!lastStep && (
                <div className="flex-1 h-1 bg-gray-300 relative top-1 w-full mx-2"></div>
            )}
        </>
    )
}