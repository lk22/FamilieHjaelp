// dependencies
import { useState } from 'react';
import { useForm, router } from '@inertiajs/react';

// Contexts
import { useOnboarding } from '@/contexts/OnboardingContext';

// Components
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";

type StepData = {
  hasOtherChildrenAtHome: boolean;
}

interface FirstStepFormProps {
  handleStepSubmit: (data: {
    hasOtherChildrenAtHome: boolean;
  }) => void;
}

export default function HasOtherChildrenAtHomeStepForm({ handleStepSubmit }: FirstStepFormProps) {
  const [hasOtherChildrenAtHome, setHasOtherChildrenAtHome] = useState<boolean>(false);
  const [submitted, setSubmitted] = useState<boolean>(false);

  const { onboardingState} = useOnboarding();

  const currentScenario = onboardingState.scenarios.find(scenario => scenario.id === onboardingState.currentScenario);
  const currentStep = currentScenario?.steps[0]; // First step (index 0)

  const currentHasOtherChildrenAtHome = currentStep?.data.hasOtherChildrenAtHome;

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();

    const submittedData: StepData = {
      hasOtherChildrenAtHome: hasOtherChildrenAtHome,
    }

    // Proceed to the next step or perform other actions
    handleStepSubmit({ ...submittedData });
    setSubmitted(true);

    setTimeout(() => {
      setSubmitted(false);

      router.get(route('onboarding.scenario.step', {
        scenario: onboardingState.currentScenario,
        step: 'eight'
      }));
    }, 1000);
  };

  return (
    <>
      <form onSubmit={handleSubmit} className={submitted ? "" : "animate animate-appear"}>
        {
          submitted ? (
          <>
            <p className="mt-4 text-green-600">Indsendt</p>
          </>
          ) : (
            <>
              <div className="flex items-center">
                <Checkbox
                  id="hasOtherChildrenAtHomeYes"
                  value="yes"
                  checked={hasOtherChildrenAtHome ||currentHasOtherChildrenAtHome === true}
                  onCheckedChange={(checked) => setHasOtherChildrenAtHome(Boolean(checked))}
                  className="mr-2"
                >
                  Ja jeg/vi har andre børn hjemme eller passet
                </Checkbox>
                <label htmlFor="hasOtherChildrenAtHomeYes" className="block mt-4 mb-2 font-medium text-gray-700">
                  Ja jeg/vi har andre børn hjemme eller passet
                </label>
              </div>
              <div className="flex items-center">
                <Checkbox
                  id="hasOtherChildrenAtHomeNo"
                  value="no"
                  checked={!hasOtherChildrenAtHome || currentHasOtherChildrenAtHome === false}
                  onCheckedChange={(checked) => setHasOtherChildrenAtHome(!Boolean(checked))}
                  className="mr-2"
                >
                  Nej jeg/vi har ikke andre børn hjemme eller passet
                </Checkbox>
                <label htmlFor="hasOtherChildrenAtHomeNo" className="block mt-4 mb-2 font-medium text-gray-700">
                  Nej jeg/vi har ikke andre børn hjemme eller passet
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