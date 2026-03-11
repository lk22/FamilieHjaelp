// dependencies
import { useState } from 'react';
import { router } from '@inertiajs/react';

// Contexts
import { useOnboarding } from '@/contexts/OnboardingContext';

// components
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";

type StepData = {
  knowsSupportOptions: boolean;
}

interface KnowsSupportOptionsStepFormProps {
  handleStepSubmit: (data: {
    knowsSupportOptions: boolean;
  }) => void;
}

export default function KnowsSupportOptionsStepForm({ handleStepSubmit }: KnowsSupportOptionsStepFormProps) {
  const [knowsSupportOptions, setknowsSupportOptions] = useState<boolean>(false);
  const [submitted, setSubmitted] = useState<boolean>(false);

  const { onboardingState } = useOnboarding();

  const currentScenario = onboardingState.scenarios.find(scenario => scenario.id === onboardingState.currentScenario);

  // TODO: this needs fix
  const currentStep = currentScenario?.steps[0]; // First step (index 0)

  const currentknowsSupportOptions: boolean | undefined = currentStep?.data.knowsSupportOptions;

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();

    const submittedData: StepData = {
      knowsSupportOptions: knowsSupportOptions,
    }

    // Proceed to the next step or perform other actions
    handleStepSubmit({ ...submittedData });
    setSubmitted(true);

    setTimeout(() => {
      setSubmitted(false);

      router.get(route('onboarding.scenario.step', {
        scenario: onboardingState.currentScenario,
        step: 'nine'
      }));
    }, 1000);
  };

  return (
    <>
      <form onSubmit={handleSubmit} className={submitted ? "" : "animate animate-appear"}>
        {
          submitted ? (
          <>
            <p className="mt-4 text-green-600">Indsendt!</p>
          </>
          ) : (
            <>
            <div className="flex items-center">
              <Checkbox
                id="knowsSupportOptions"
                checked={knowsSupportOptions || currentknowsSupportOptions === true}
                onCheckedChange={(checked) => setknowsSupportOptions(Boolean(checked))}
                className="mr-2"
              >
                Ja Jeg kender mine muligheder for støtte
              </Checkbox>
              <label htmlFor="knowsSupportOptions" className="block mt-4 mb-2 font-medium text-gray-700">
                Ja Jeg kender mine muligheder for støtte
              </label>
            </div>
            <div className="flex items-center">
              <Checkbox
                id="knowsSupportOptionsNo"
                checked={!(knowsSupportOptions || currentknowsSupportOptions === false)}
                onCheckedChange={(checked) => setknowsSupportOptions(!Boolean(checked))}
                className="mr-2"
              >
                Nej, jeg kender ikke mine muligheder for støtte
              </Checkbox>
              <label htmlFor="knowsSupportOptionsNo" className="block mt-4 mb-2 font-medium text-gray-700">
                Nej, jeg kender ikke mine muligheder for støtte
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