import { Head } from '@inertiajs/react';
import OnboardingTemplate from './template/onboarding-template';
import OnboardingStepTwoForm from './forms/onboarding-step-two-form';

import { type OnboardingInitialSteps } from '@/types/onboarding';

export default function OnboardingStepTwo({ currentStep, totalSteps }: OnboardingInitialSteps) {
    return (
        <OnboardingTemplate 
            title={`Spørgsmål`} 
            description="Hvilken situation er du i ?"
            screenGraphic={null}
            steps={totalSteps}
            currentStep={currentStep || 2}
        >
        <Head title={`Kom i gang | FamilieHjælp`} />
            <div className="container max-w-[960px] px-4 py-8 mx-auto">
                <OnboardingStepTwoForm />
            </div>
        </OnboardingTemplate>
    );
}
