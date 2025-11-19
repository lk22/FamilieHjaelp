import { Head } from '@inertiajs/react';
import OnboardingTemplate from '@/pages/home/onboarding/template/onboarding-template';
import StepForm from '@/pages/home/onboarding/abort/form/step-form';

import {OnboardingProvider} from '@/contexts/OnboardingContext';
import { useOnboarding } from '@/contexts/OnboardingContext';

export default function OnboardingStep() {

    const {onboardingState} = useOnboarding();
    const currentStep = onboardingState.currentStep;

    const currentStepData = onboardingState.steps.find(step => step.id === currentStep);

    console.log('OnboardingStep - Current step data:', currentStepData);
    return (
        <OnboardingProvider>
            <OnboardingTemplate 
                title={`Spørgsmål`} 
                description=""
                screenGraphic={null}
            >
                <Head title={`Kom i gang | FamilieHjælp`} />
                <div className="container max-w-[960px] px-4 py-8 mx-auto">
                    <StepForm />
                </div>
            </OnboardingTemplate>
        </OnboardingProvider>
    );
}
