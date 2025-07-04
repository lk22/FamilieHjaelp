import OnboardingTemplate from './template/onboarding-template';
import OnboardingStepFourForm from './forms/onboarding-step-four-form';
import {Head} from '@inertiajs/react';
export default function OnboardingStepTwo() {
    return (
        <OnboardingTemplate title={`Spørgsmål`} description="Står du alene i situationen ?">
            <Head title={`Spørgsmål | Familiehjælp`} />
            <div className="container max-w-[960px] px-4 py-8 mx-auto">
                <OnboardingStepFourForm />
            </div>
        </OnboardingTemplate>
    );
}
