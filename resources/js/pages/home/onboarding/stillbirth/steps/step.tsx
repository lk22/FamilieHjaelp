import {useEffect} from 'react';
import { Head } from '@inertiajs/react';
import OnboardingTemplate from '@/pages/home/onboarding/template/onboarding-template';
import StepForm from '@/pages/home/onboarding/stillbirth/form/step-form';
import { usePage } from '@inertiajs/react';
import { type SharedData } from '@/types';
import { useOnboarding, OnboardingProvider } from '@/contexts/OnboardingContext';

interface SessionProps extends SharedData {
    currentStep: string;
    scenario: string;
    onboardingSession: {
        token: string | null;
        currentStep: string | null;
        stepsData: Record<string, any>;
        formData: Record<string, any>;
        completed: boolean;
    }
}

interface OnboardingStepProperties {
    currentStep: string;
    scenario: string;
}

/**
 * OnboardingStep component renders the onboarding step with the given properties.
 * @param currentStep The current step identifier
 * @param category The category of the onboarding
 * @returns void
 */
export default function OnboardingStep({
    currentStep,
    scenario,
}: OnboardingStepProperties) {
    const {onboardingSession} = usePage<SessionProps>().props;

    return (
        <OnboardingProvider
            initialSession={onboardingSession}
        >
            <OnboardingStepContent
                currentStep={currentStep}
                scenario={scenario}
            />
        </OnboardingProvider>
    );
}

/**
 * OnboardingStepContent component renders the content for a specific onboarding step.
 * @param currentStep The current step identifier
 * @param scenario The scenario of the onboarding
 * @returns void
 */
const OnboardingStepContent = ({
    currentStep,
    scenario,
}: OnboardingStepProperties) =>  {
    const {onboardingState, updateCurrentScenario} = useOnboarding();
    const scenarioData = onboardingState.scenarios.find((s) => s.id === scenario);
    const stepData = scenarioData?.steps.find((s) => s.stepName === currentStep);

    const handleInitialize = () => {
        if (onboardingState.currentScenario !== scenario) {
            console.log(`Initializing scenario: ${scenario}`);
            updateCurrentScenario(scenario);
        }
    };

    useEffect(() => {
        handleInitialize();
    }, []);

    return (
        <OnboardingTemplate
            title={stepData?.question || "Onboarding Step"}
            description={stepData?.description || ""}
            screenGraphic={null}
            state={onboardingState}
        >
            <Head title={stepData?.question || "Onboarding Step"} />
            <div className="container py-8 mx-auto">
                <StepForm
                    currentStep={currentStep}
                    scenario={scenario}
                />
            </div>
        </OnboardingTemplate>
    );
}
