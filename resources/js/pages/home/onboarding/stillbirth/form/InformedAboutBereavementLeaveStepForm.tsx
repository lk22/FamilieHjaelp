// dependencies
import { useState } from 'react';
import { router, useForm } from '@inertiajs/react';

// Contexts
import { useOnboarding } from '@/contexts/OnboardingContext';

// components
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";

type StepData = {
  informedAboutBereavementLeave: boolean;
}

interface FirstStepFormProps {
  handleStepSubmit: (data: {
    informedAboutBereavementLeave: boolean;
  }) => void;
}

export default function InformedAboutBereavementLeaveStepForm({ handleStepSubmit }: FirstStepFormProps) {
  const [step, setStep] = useState<string>('nine');
  const [nextStep, setNextStep] = useState<string>('');
  const [informedAboutBereavementLeave, setInformedAboutBereavementLeave] = useState<boolean>(false);
  const [submitted, setSubmitted] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const { post, data, setData } = useForm<{
    data: {
      informedAboutBereavementLeave: boolean;
    }
  }>({
    data: {
      informedAboutBereavementLeave: false,
    }
  });

  const { onboardingState } = useOnboarding();

  const currentScenario = onboardingState.scenarios.find(scenario => scenario.id === onboardingState.currentScenario);
  const currentStep = currentScenario?.steps[0]; // First step (index 0)
  const currentInformedAboutBereavementLeave = currentStep?.data.informedAboutBereavementLeave || '';

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    setSubmitted(true);
    setIsLoading(true);
    const nextStep = 'ten';

    try {
        handleStepSubmit({ informedAboutBereavementLeave: informedAboutBereavementLeave });

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
            <p>Indsendt!</p>
          </>
          ) : (
            <>
              <div className="flex items-center">
                <Checkbox
                  id="informedAboutBereavementLeave"
                  value="yes"
                  checked={informedAboutBereavementLeave || currentInformedAboutBereavementLeave === true}
                  onCheckedChange={(checked) => {
                    setInformedAboutBereavementLeave(Boolean(checked));
                    setData('data', { informedAboutBereavementLeave: Boolean(checked) });
                  }}
                  className="mr-2"
                />
                <label htmlFor="informedAboutBereavementLeave" className="block mt-4 mb-2 font-medium text-gray-700">
                  Ja jeg er blevet informeret om mine rettigheder til orlov
                </label>
              </div>
              <div className="flex items-center">
                <Checkbox
                  id="informedAboutBereavementLeave"
                  value="no"
                  checked={!informedAboutBereavementLeave || currentInformedAboutBereavementLeave === false}
                  onCheckedChange={(checked) => {
                    setInformedAboutBereavementLeave(!checked);
                    setData('data', { informedAboutBereavementLeave: !checked });
                  }}
                  className="mr-2"
                />
                <label htmlFor="informedAboutBereavementLeave" className="block mt-4 mb-2 font-medium text-gray-700">
                  Nej jeg er ikke blevet informeret om mine rettigheder til orlov
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