import {Head} from '@inertiajs/react';
import OnboardingTemplate from './template/onboarding-template';
import OnboardingStepSixForm from './forms/onboarding-step-six-form';

export default function OnboardingStepSix() {

    const stateStorage = JSON.parse(localStorage.getItem('onboarding_shared_state') || '{}');
    const situationStepData = stateStorage?.steps?.find((step: {id: number}) => step.id === 2);
    const partnerStepData = stateStorage?.steps?.find((step: {id: number}) => step.id === 3);

    const handleStepDescription = () => {
        const situation = situationStepData?.data?.stepTwo?.checks || [];
        const checks = partnerStepData?.data?.stepThree?.checks || [];

        if ( 
            checks.includes('is_not_alone') || situation.includes('abort') ||
            checks.includes('is_not_alone') || situation.includes('deathborn')
        ) {
            return (
                <>
                    <p className="mb-4">Det kan være en udfordring at håndtere en abort eller dødsfødsel for begge parter, det er vigtigt og få lagt en plan for for at komme bedre videre.</p> <p>hvordan har i det lige nu i situationen ?</p>
                </>
            );
        } else if (
            checks.includes('is_alone') || situation.includes('deathborn') ||
            checks.includes('is_alone') || situation.includes('abort')
        ) {
            return (
                <>
                    <p className="mb-4">Det kan være en udfordring at håndtere en abort eller dødsfødsel, det kan være en god ide og lave en plan for at komme bedere videre.</p>
                    <p>hvordan har du det lige nu i situationen ?</p>
                </>
            );
        }
    }

    return (
        <OnboardingTemplate 
            title={`Spørgsmål`} 
            description={handleStepDescription()}
            screenGraphic={null}
        >
            <Head title={`Spørgsmål | Familiehjælp`} />
            <div className="container max-w-[960px] px-4 py-8 mx-auto">
                <OnboardingStepSixForm />
            </div>
        </OnboardingTemplate>
    );
}
