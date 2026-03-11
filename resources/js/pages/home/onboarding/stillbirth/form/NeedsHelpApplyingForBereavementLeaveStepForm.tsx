// Dependencies
import { useState } from 'react';

// Contexts
import { useOnboarding } from '@/contexts/OnboardingContext';

// components
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import CompletedModal from '@/components/Onboarding/Modals/CompletedModal';

type StepData = {
  needsHelpApplyingForBereavementLeave: boolean;
}

interface FirstStepFormProps {
  handleStepSubmit: (data: {
    needsHelpApplyingForBereavementLeave: boolean;
  }) => void;
}

export default function NeedsHelpApplyingForBereavementLeaveStepForm({ handleStepSubmit }: FirstStepFormProps) {
  const [needsHelpApplyingForBereavementLeave, setNeedsHelpApplyingForBereavementLeave] = useState<boolean>(false);
  const [submitted, setSubmitted] = useState<boolean>(false);
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const { onboardingState } = useOnboarding();

  const currentScenario = onboardingState.scenarios.find(scenario => scenario.id === onboardingState.currentScenario);
  const currentStep = currentScenario?.steps[0]; // First step (index 0)

  const currentNeedsHelpApplyingForBereavementLeave = currentStep?.data.needsHelpApplyingForBereavementLeave;

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();

    const submittedData: StepData = {
      needsHelpApplyingForBereavementLeave: needsHelpApplyingForBereavementLeave,
    }

    // Proceed to the next step or perform other actions
    handleStepSubmit({ ...submittedData });
    setSubmitted(true);
    setIsOpen(true);
  };

  return (
    <>
      <form onSubmit={handleSubmit} className={submitted ? "" : "animate animate-appear"}>
        {
          submitted ? (
          <>
            <p className="mt-4 text-green-600">Indsendt</p>
            <CompletedModal isOpen={isOpen} closeModal={() => setIsOpen(false)} />
          </>
          ) : (
            <>
              <div className="flex items-center">
                <Checkbox
                  id="needsHelpApplyingForBereavementLeave"
                  checked={needsHelpApplyingForBereavementLeave || currentNeedsHelpApplyingForBereavementLeave === true}
                  onCheckedChange={(checked) => setNeedsHelpApplyingForBereavementLeave(Boolean(checked))}
                  className="mr-2"
                >
                  Ja, jeg ønsker information om obduktion
                </Checkbox>
                <label htmlFor="needsHelpApplyingForBereavementLeave" className="block mt-4 mb-2 font-medium text-gray-700">
                  Ja, jeg ønsker information om obduktion
                </label>
              </div>
              <div className="flex items-center">
                <Checkbox
                  id="needsHelpApplyingForBereavementLeaveNo"
                  checked={!needsHelpApplyingForBereavementLeave || currentNeedsHelpApplyingForBereavementLeave === false}
                  onCheckedChange={(checked) => setNeedsHelpApplyingForBereavementLeave(!Boolean(checked))}
                  className="mr-2"
                />
                <label htmlFor="needsHelpApplyingForBereavementLeaveNo" className="block mt-4 mb-2 font-medium text-gray-700">
                  Nej, jeg ønsker ikke information om obduktion
                </label>
              </div>
              <Button
                type="submit"
                className="bg-blue-700 text-white hover:bg-blue-800 mt-4"
              >
                Næste
              </Button>
            </>
          )
        }
      </form>
    </>
  )
}