import { Head } from '@inertiajs/react';
import OnboardingTemplate from '@/pages/home/onboarding/template/onboarding-template';
import StepForm from '@/pages/home/onboarding/abort/form/step-form';

import {OnboardingProvider} from '@/contexts/OnboardingContext_bak';
import { useOnboarding } from '@/contexts/OnboardingContext_bak';

export default function OnboardingStep() {
    return (
        <OnboardingProvider>
            <OnboardingStepContent />
        </OnboardingProvider>
    );
}

function OnboardingStepContent() {
    const {onboardingState} = useOnboarding();
    const currentStep = onboardingState.currentStep;
    const currentStepData = onboardingState.steps.find(step => step.id === currentStep);
    
    return (
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
    );
}
