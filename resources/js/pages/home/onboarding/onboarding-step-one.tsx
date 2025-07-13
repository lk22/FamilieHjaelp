import { Head, usePage } from '@inertiajs/react';
import OnboardingTemplate from './template/onboarding-template';
import OnboardingStepOneForm from './forms/onboarding-step-one-form';

import { type OnboardingInitialSteps } from '@/types/onboarding';

export default function OnboardingStepOne({ currentStep, totalSteps }: OnboardingInitialSteps) {
    const { flash } = usePage().props;

    return (
        <OnboardingTemplate 
            title={`Spørgsmål`} 
            description="Hvad er dit navn ?"
            screenGraphic={null}
            steps={totalSteps}
            currentStep={currentStep || 1}
        >
            <Head title={`Kom i gang | FamilieHjælp`} />
            <div className="container max-w-[960px] px-4 py-8 mx-auto">
                <OnboardingStepOneForm />
                
            </div>
        </OnboardingTemplate>
    );
}
