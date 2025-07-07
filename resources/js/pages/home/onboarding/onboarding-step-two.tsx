import { Head } from '@inertiajs/react';
import OnboardingTemplate from './template/onboarding-template';
import OnboardingStepTwoForm from './forms/onboarding-step-two-form';

export default function OnboardingStepTwo() {
    return (
        <OnboardingTemplate title={`Spørgsmål`} description="Hvilken situation er du i ?">
        <Head title={`Kom i gang | FamilieHjælp`} />
            <div className="container max-w-[960px] px-4 py-8 mx-auto">
                <OnboardingStepTwoForm />
            </div>
        </OnboardingTemplate>
    );
}
