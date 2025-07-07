import OnboardingTemplate from './template/onboarding-template';
import OnboardingStepFiveForm from './forms/onboarding-step-five-form';
import {Head} from '@inertiajs/react';
export default function OnboardingStepFive() {
    return (
        <OnboardingTemplate title={`Spørgsmål`} description="Hvornår endte du i din nuværende situation ?">
            <Head title={`Spørgsmål | Familiehjælp`} />
            <div className="container max-w-[960px] px-4 py-8 mx-auto">
                <OnboardingStepFiveForm />
            </div>
        </OnboardingTemplate>
    );
}
