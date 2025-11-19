import { Head } from '@inertiajs/react';
import OnboardingTemplate from './template/onboarding-template';
import OnboardingStepOneForm from './forms/onboarding-step-one-form';

export default function OnboardingStepOne() {

    return (
        <OnboardingTemplate 
            title={`Spørgsmål`} 
            description="Hvad er dit navn ?"
            screenGraphic={null}
        >
            <Head title={`Kom i gang | FamilieHjælp`} />
            <div className="container max-w-[960px] px-4 py-8 mx-auto">
                <OnboardingStepOneForm />
            </div>
        </OnboardingTemplate>
    );
}
