import { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { useForm } from '@inertiajs/react';
import { useOnboarding } from '@/contexts/OnboardingContext';

import { router } from '@inertiajs/react';

interface StepData {
  hasOtherChildrenAtHome: string;
}

interface FirstStepFormProps {
  handleStepSubmit: (data: {
    hasOtherChildrenAtHome: string;
  }) => void;
}

export default function HasOtherChildrenAtHomeStepForm({ handleStepSubmit }: FirstStepFormProps) {
  const [hasOtherChildrenAtHome, setHasOtherChildrenAtHome] = useState<string>('');
  const [step, setStep] = useState<string>('one');
  const [submitted, setSubmitted] = useState<boolean>(false);

  const { onboardingState, getCurrentScenario, completeStep } = useOnboarding();

  const currentScenario = getCurrentScenario();

  // TODO: this needs fix
  const currentStep = currentScenario?.steps[0]; // First step (index 0)

  const currentHasReceivedDeathCertificate = currentStep?.data.hasReceivedDeathCertificate || '';

  const { data, setData, post, processing, errors } = useForm<{
    hasOtherChildrenAtHome: string
  }>({
    hasOtherChildrenAtHome: ''
  });

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();

    const submittedData: StepData = {
      hasOtherChildrenAtHome: hasOtherChildrenAtHome,
    }

    console.log(submittedData)

    // Proceed to the next step or perform other actions
    handleStepSubmit({ ...submittedData });
    setSubmitted(true);

    setTimeout(() => {
      setSubmitted(false);

      router.get(route('onboarding.scenario.step', {
        scenario: onboardingState.currentScenario,
        step: 'ten'
      }));
    }, 1000);
  };

  return (
    <>
      <form onSubmit={handleSubmit}>
        {
          submitted ? (
          <>
            <p className="mt-4 text-green-600">Indsendt</p>
          </>
          ) : (
            <>
              <input type="hidden" name="step" value={step} />
                <Checkbox
                  id="hasReceivedDeathCertificate"
                  value="yes"
                  checked={hasOtherChildrenAtHome === 'yes'}
                  onChange={(e) => setHasOtherChildrenAtHome(e.target.value)}
                  className="mr-2"
                />
                <label htmlFor="hasReceivedDeathCertificate" className="block mt-4 mb-2 font-medium text-gray-700">
                  Ja jeg er blevet informeret om mine rettigheder til orlov
                </label>
                <Checkbox
                  id="hasReceivedDeathCertificate"
                  value="no"
                  checked={hasOtherChildrenAtHome === 'no'}
                  onChange={(e) => setHasOtherChildrenAtHome(e.target.value)}
                  className="mr-2"
                />
                <label htmlFor="hasReceivedDeathCertificate" className="block mt-4 mb-2 font-medium text-gray-700">
                  Nej jeg er ikke blevet informeret om mine rettigheder til orlov
                </label>
              <Button
                type="submit"
                className="bg-blue-700 text-white hover:bg-blue-800 mt-4"
                disabled={processing}
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