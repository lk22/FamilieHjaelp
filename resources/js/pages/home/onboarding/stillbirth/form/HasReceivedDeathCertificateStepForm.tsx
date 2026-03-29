// dependencies
import { useState } from 'react';
import { router } from '@inertiajs/react';

// Contexts
import { useOnboarding } from '@/contexts/OnboardingContext';

// Components
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";



type StepData = {
  hasReceivedDeathCertificate: boolean;
}

type HasReceivedDeathCertificateStepProps = {
  handleStepSubmit: (data: {
    hasReceivedDeathCertificate: boolean;
  }) => void;
}

export default function HasReceivedDeathCertificateStepForm({ handleStepSubmit }: HasReceivedDeathCertificateStepProps) {
  const [hasReceivedDeathCertificate, setHasReceivedDeathCertificate] = useState<boolean>(false);
  const [submitted, setSubmitted] = useState<boolean>(false);

  const { onboardingState, getCurrentScenario, completeStep } = useOnboarding();

  const currentScenario = onboardingState.scenarios.find(scenario => scenario.id === onboardingState.currentScenario);
  const currentStep = currentScenario?.steps[0]; // First step (index 0)

  const currentHasReceivedDeathCertificate = currentStep?.data.hasReceivedDeathCertificate

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();

    const submittedData: StepData = {
      hasReceivedDeathCertificate: hasReceivedDeathCertificate,
    }

    console.log(submittedData)

    // Proceed to the next step or perform other actions
    handleStepSubmit({ ...submittedData });
    setSubmitted(true);

    setTimeout(() => {
      setSubmitted(false);

      router.get(route('onboarding.scenario.step', {
        scenario: onboardingState.currentScenario,
        step: 'six'
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
                id="hasReceivedDeathCertificate"
                value="yes"
                checked={hasReceivedDeathCertificate || currentHasReceivedDeathCertificate === true}
                onCheckedChange={(checked) => setHasReceivedDeathCertificate(Boolean(checked))}
                className="mr-2"
              >
                Ja, jeg har modtaget dødsattesten
              </Checkbox>
              <label htmlFor="hasReceivedDeathCertificate" className="block mt-4 mb-2 font-medium text-gray-700">
                Ja, jeg har modtaget dødsattesten
              </label>
            </div>
            <div className="flex items-center">
              <Checkbox
                id="hasReceivedDeathCertificate"
                value="no"
                checked={!hasReceivedDeathCertificate || currentHasReceivedDeathCertificate === false}
                onCheckedChange={(checked) => setHasReceivedDeathCertificate(!checked)}
                className="mr-2"
              >
                Nej, jeg har ikke modtaget dødsattesten
              </Checkbox>
              <label htmlFor="hasReceivedDeathCertificate" className="block mt-4 mb-2 font-medium text-gray-700">
                Nej, jeg har ikke modtaget dødsattesten
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