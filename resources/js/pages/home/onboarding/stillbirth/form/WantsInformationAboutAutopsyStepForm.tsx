// dependencies
import { useState } from 'react';
import { router } from '@inertiajs/react';

// contexts
import { useOnboarding } from '@/contexts/OnboardingContext';

// components
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";

interface StepData {
  wantsInformationAboutAutopsy: boolean;
}

interface FirstStepFormProps {
  handleStepSubmit: (data: {
    wantsInformationAboutAutopsy: boolean;
  }) => void;
}

export default function WantsInformationAboutAutopsyStepForm({ handleStepSubmit }: FirstStepFormProps) {
  const [wantsInformationAboutAutopsy, setWantsInformationAboutAutopsy] = useState<boolean>(false);
  const [submitted, setSubmitted] = useState<boolean>(false);

  const { onboardingState, getCurrentScenario, completeStep } = useOnboarding();

  const currentScenario = onboardingState.scenarios.find(scenario => scenario.id === onboardingState.currentScenario);
  const currentStep = currentScenario?.steps[0]; // First step (index 0)

  // current existing state value for wantsInformationAboutAutopsy from onboarding state, if it exists
  const currentwantsInformationAboutAutopsy = currentStep?.data.wantsInformationAboutAutopsy;

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();

    const submittedData: StepData = {
      wantsInformationAboutAutopsy: wantsInformationAboutAutopsy,
    }

    console.log(submittedData)

    // Proceed to the next step or perform other actions
    handleStepSubmit({ ...submittedData });
    setSubmitted(true);

    setTimeout(() => {
      setSubmitted(false);

      router.get(route('onboarding.scenario.step', {
        scenario: onboardingState.currentScenario,
        step: 'seven'
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
                id="wantsInformationAboutAutopsy"
                checked={wantsInformationAboutAutopsy || currentwantsInformationAboutAutopsy === true}
                onCheckedChange={(checked) => setWantsInformationAboutAutopsy(Boolean(checked))}
                className="mr-2"
              >
                Ja, jeg ønsker information om obduktion
              </Checkbox>
              <label htmlFor="wantsInformationAboutAutopsy" className="block mt-4 mb-2 font-medium text-gray-700">
                Ja, jeg ønsker information om obduktion
              </label>
            </div>
            <div className="flex items-center">
              <Checkbox
                id="wantsInformationAboutAutopsyNo"
                value="no"
                checked={!(wantsInformationAboutAutopsy || currentwantsInformationAboutAutopsy === false)}
                onCheckedChange={(checked) => setWantsInformationAboutAutopsy(!Boolean(checked))}
                className="mr-2"
              >
                Nej, jeg ønsker ikke information om obduktion
              </Checkbox>
              <label htmlFor="wantsInformationAboutAutopsyNo" className="block mt-4 mb-2 font-medium text-gray-700">
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