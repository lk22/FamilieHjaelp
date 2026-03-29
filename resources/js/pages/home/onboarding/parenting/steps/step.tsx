import { OnboardingProvider, useOnboarding } from '@/contexts/OnboardingContext';
import StepForm from '@/pages/home/onboarding/parenting/form/step-form';
import OnboardingTemplate from '@/pages/home/onboarding/template/onboarding-template';
import { type SharedData } from '@/types';
import { Head, usePage } from '@inertiajs/react';
import { useEffect } from 'react';

interface SessionProps extends SharedData {
    currentStep: string;
    scenario: string;
    onboardingSession: {
        token: string | null;
        currentStep: string | null;
        stepsData: Record<string, any>;
        formData: Record<string, any>;
        completed: boolean;
    };
}

interface OnboardingStepProperties {
    currentStep: string;
    scenario: string;
}

export default function OnboardingStep({ currentStep, scenario }: OnboardingStepProperties) {
    const { onboardingSession } = usePage<SessionProps>().props;

    return (
        <OnboardingProvider initialSession={onboardingSession}>
            <OnboardingStepContent currentStep={currentStep} scenario={scenario} />
        </OnboardingProvider>
    );
}

const OnboardingStepContent = ({ currentStep, scenario }: OnboardingStepProperties) => {
    const { onboardingState, updateCurrentScenario } = useOnboarding();
    const scenarioData = onboardingState.scenarios.find((s) => s.id === scenario);
    const stepData = scenarioData?.steps.find((s) => s.stepName === currentStep);

    useEffect(() => {
        if (onboardingState.currentScenario !== scenario) {
            updateCurrentScenario(scenario);
        }
    }, []);

    return (
        <OnboardingTemplate
            title={stepData?.question || 'Onboarding Step'}
            description={stepData?.description || ''}
            screenGraphic={null}
            state={onboardingState}
        >
            <Head title={stepData?.question || 'Onboarding Step'} />
            <div className="container mx-auto py-8">
                <StepForm currentStep={currentStep} scenario={scenario} />
            </div>
        </OnboardingTemplate>
    );
};
