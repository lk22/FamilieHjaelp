import { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { useForm } from '@inertiajs/react';
import { useOnboarding } from '@/contexts/OnboardingContext';

import { router } from '@inertiajs/react';

interface StepData {
  hasReceivedDeathCertificate: string;
}

interface FirstStepFormProps {
  handleStepSubmit: (data: {
    hasReceivedDeathCertificate: string;
  }) => void;
}

export default function HasReceivedDeathCertificateStepForm({ handleStepSubmit }: FirstStepFormProps) {
  const [hasReceivedDeathCertificate, setHasReceivedDeathCertificate] = useState<string>('');
  const [step, setStep] = useState<string>('one');
  const [submitted, setSubmitted] = useState<boolean>(false);

  const { onboardingState, getCurrentScenario, completeStep } = useOnboarding();

  const currentScenario = getCurrentScenario();

  // TODO: this needs fix
  const currentStep = currentScenario?.steps[0]; // First step (index 0)

  const currentHasReceivedDeathCertificate = currentStep?.data.hasReceivedDeathCertificate || '';

  const { data, setData, post, processing, errors } = useForm<{
    hasReceivedDeathCertificate: string
  }>({
    hasReceivedDeathCertificate: ''
  });

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
        step: 'eight'
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
                  checked={hasReceivedDeathCertificate === 'yes'}
                  onChange={(e) => setHasReceivedDeathCertificate(e.target.value)}
                  className="mr-2"
                />
                <label htmlFor="hasReceivedDeathCertificate" className="block mt-4 mb-2 font-medium text-gray-700">
                  Ja jeg er blevet informeret om mine rettigheder til orlov
                </label>
                <Checkbox
                  id="hasReceivedDeathCertificate"
                  value="no"
                  checked={hasReceivedDeathCertificate === 'no'}
                  onChange={(e) => setHasReceivedDeathCertificate(e.target.value)}
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