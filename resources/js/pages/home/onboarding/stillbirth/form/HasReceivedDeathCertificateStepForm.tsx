// dependencies
import { useState } from 'react';
import { router, useForm } from '@inertiajs/react';

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
  const [step, setStep] = useState<string>('five');
  const [hasReceivedDeathCertificate, setHasReceivedDeathCertificate] = useState<boolean>(false);
  const [submitted, setSubmitted] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const { post, data, setData } = useForm<{
    data: {
      hasReceivedDeathCertificate: boolean;
    }
  }>({
    data: {
      hasReceivedDeathCertificate: false,
    }
  });

  const { onboardingState, getCurrentScenario, completeStep } = useOnboarding();

  const currentScenario = onboardingState.scenarios.find(scenario => scenario.id === onboardingState.currentScenario);
  const currentStep = currentScenario?.steps[0]; // First step (index 0)

  const currentHasReceivedDeathCertificate = currentStep?.data.hasReceivedDeathCertificate

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    setSubmitted(true);
    setIsLoading(true);
    const nextStep = 'six';

    try {
        handleStepSubmit({ hasReceivedDeathCertificate: hasReceivedDeathCertificate });

        post(route('onboarding.scenario.step.submit', {
            scenario: onboardingState.currentScenario,
            step: step,
            nextStep: nextStep
        }), {
            onFinish: () => setIsLoading(false),
            onError: () => {
                setIsLoading(false);
                setSubmitted(false);
                console.log('Error submitting form:', data);
            },
            onSuccess: () => {
                setIsLoading(false);
                setSubmitted(false);
                router.get(route('onboarding.scenario.step', {
                    scenario: onboardingState.currentScenario,
                    step: nextStep
                }));
            }
        });
    } catch (error) {
        console.error('Error submitting step:', error);
        setIsLoading(false);
        setSubmitted(false);
    }
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
                onCheckedChange={(checked) => {
                  setHasReceivedDeathCertificate(Boolean(checked));
                  setData('data', { hasReceivedDeathCertificate: Boolean(checked) });
                }}
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
                onCheckedChange={(checked) => {
                  setHasReceivedDeathCertificate(!checked);
                  setData('data', { hasReceivedDeathCertificate: !checked });
                }}
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