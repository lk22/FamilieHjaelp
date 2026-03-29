import { useOnboarding } from '@/contexts/OnboardingContext';
import { type ScenarioProperties } from '@/state/OnboardingState';

import BirthDateStepForm from './BirthDateStepForm';
import ChildTestProcessPlannedStepForm from './ChildTestProcessPlannedStepForm';
import ContactedByMidwifeOrHealthVisitorStepForm from './ContactedByMidwifeOrHealthVisitorStepForm';
import HasHealthConcernsStepForm from './HasHealthConcernsStepForm';
import HasPlannedDaycareStepForm from './HasPlannedDaycareStepForm';
import HasPlannedParentalLeaveWithEmployerStepForm from './HasPlannedParentalLeaveWithEmployerStepForm';
import HasReturnedHomeStepForm from './HasReturnedHomeStepForm';
import IsFirstChildStepForm from './IsFirstChildStepForm';
import KnowsChildBenefitsAndCheckupsStepForm from './KnowsChildBenefitsAndCheckupsStepForm';
import KnowsHealthVisitorScheduleStepForm from './KnowsHealthVisitorScheduleStepForm';
import NeedsInfoOnParentalLeaveStepForm from './NeedsInfoOnParentalLeaveStepForm';
import NeedsSupportForPostpartumIssuesStepForm from './NeedsSupportForPostpartumIssuesStepForm';
import WantsToJoinParentGroupsStepForm from './WantsToJoinParentGroupsStepForm';
import WellbeingChallengesStepForm from './WellbeingChallengesStepForm';

export default function StepForm({ currentStep, scenario }: { currentStep: string; scenario: string }) {
    return (
        <>
            <StepFormContent currentStep={currentStep} scenario={scenario} />
        </>
    );
}

const StepFormContent = ({ currentStep, scenario }: { currentStep: string; scenario: string }) => {
    const { onboardingState } = useOnboarding();
    const currentScenario = onboardingState.scenarios.find((s) => s.id === scenario);

    if (!currentScenario) {
        return <div>Scenario not found</div>;
    }

    return (
        <div className="pt-8">
            <StepFormFieldsDisplay currentStep={currentStep} scenario={currentScenario} />
        </div>
    );
};

const StepFormFieldsDisplay = ({ currentStep, scenario }: { currentStep: string; scenario: ScenarioProperties }) => {
    const { updateFormData, updateStep, completeStep } = useOnboarding();

    const submitStep = (data: Record<string, any>) => {
        const currentScenario = scenario?.id;
        updateStep(currentStep, data);
        updateFormData(data);
        completeStep(currentStep, currentScenario, data);
    };

    switch (currentStep) {
        case 'one':
            return <BirthDateStepForm handleStepSubmit={submitStep} />;
        case 'two':
            return <HasReturnedHomeStepForm handleStepSubmit={submitStep} />;
        case 'three':
            return <IsFirstChildStepForm handleStepSubmit={submitStep} />;
        case 'four':
            return <ContactedByMidwifeOrHealthVisitorStepForm handleStepSubmit={submitStep} />;
        case 'five':
            return <ChildTestProcessPlannedStepForm handleStepSubmit={submitStep} />;
        case 'six':
            return <NeedsInfoOnParentalLeaveStepForm handleStepSubmit={submitStep} />;
        case 'seven':
            return <KnowsChildBenefitsAndCheckupsStepForm handleStepSubmit={submitStep} />;
        case 'eight':
            return <WellbeingChallengesStepForm handleStepSubmit={submitStep} />;
        case 'nine':
            return <NeedsSupportForPostpartumIssuesStepForm handleStepSubmit={submitStep} />;
        case 'ten':
            return <WantsToJoinParentGroupsStepForm handleStepSubmit={submitStep} />;
        case 'eleven':
            return <HasPlannedDaycareStepForm handleStepSubmit={submitStep} />;
        case 'twelve':
            return <HasPlannedParentalLeaveWithEmployerStepForm handleStepSubmit={submitStep} />;
        case 'thirteen':
            return <KnowsHealthVisitorScheduleStepForm handleStepSubmit={submitStep} />;
        case 'fourteen':
            return <HasHealthConcernsStepForm handleStepSubmit={submitStep} />;
        default:
            return <div>Unknown Step</div>;
    }
};
