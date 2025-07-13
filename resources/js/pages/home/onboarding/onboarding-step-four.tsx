import OnboardingTemplate from './template/onboarding-template';
import OnboardingStepFourForm from './forms/onboarding-step-four-form';
import {Head} from '@inertiajs/react';

import { type OnboardingInitialSteps } from '@/types/onboarding';

export default function OnboardingStepFour({ currentStep, totalSteps }: OnboardingInitialSteps) {
    return (
        <OnboardingTemplate 
            title={`Spørgsmål`} 
            description="Hvornår endte du i din nuværende situation ?"
            screenGraphic={null}
            steps={totalSteps}
            currentStep={currentStep || 4}
        >
            <Head title={`Spørgsmål | Familiehjælp`} />
            <div className="container max-w-[960px] px-4 py-8 mx-auto">
                <OnboardingStepFourForm />
            </div>
        </OnboardingTemplate>
    );
}
