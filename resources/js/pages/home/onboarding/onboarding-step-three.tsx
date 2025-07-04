import { Head } from '@inertiajs/react';
import OnboardingTemplate from './template/onboarding-template';
import OnboardingStepThreeForm from './forms/onboarding-step-three-form';

export default function OnboardingStepTwo() {

    return (
        <OnboardingTemplate title={`Spørgsmål`} description="Hvornår skete situationen ?">
            <Head title={`Kom i gang | FamilieHjælp`} />
            <div className="container max-w-[960px] px-4 py-8 mx-auto">
                <OnboardingStepThreeForm />
            </div>
        </OnboardingTemplate>
    );
}
