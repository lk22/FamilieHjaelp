// dependencies
import { useState } from 'react';
import { router, useForm } from '@inertiajs/react';

// Contexts
import { useOnboarding } from '@/contexts/OnboardingContext';

// components
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";

// utilities
import { logState } from '@/lib/utils'

type NeedsInterpreterStepProps = {
  handleStepSubmit: (data: {needsInterpreter: boolean}) => void;
}

export default function NeedsInterpreterStepForm({ handleStepSubmit }: NeedsInterpreterStepProps) {
  const [step, setStep] = useState<string>('three');
  const [nextStep, setNextStep] = useState<string>('');
  const [needsInterpreter, setneedsInterpreter] = useState<boolean>(false);
  const [submitted, setSubmitted] = useState<boolean>(false);
  const [isLoading, setLoading] = useState<boolean>(false);

  const { onboardingState } = useOnboarding();

  const {post, data, setData, errors, processing, reset} = useForm<{
    data: {
      needsInterpreter: boolean;
    }
  }>({
    data: {
      needsInterpreter: false,
    }
  })

  logState('NeedsInterpreterStepForm', { onboardingState, needsInterpreter });

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    setLoading(true);
    setSubmitted(true);
    const nextStep = 'four';

    try {
      handleStepSubmit({ needsInterpreter: needsInterpreter });

      post(route('onboarding.scenario.step.submit', {
        scenario: onboardingState.currentScenario,
        step: 'three',
        nextStep: nextStep
      }), {
        onFinish: () => setLoading(false),
        onError: () => {
          setLoading(false);
          setSubmitted(false);
          console.log('Error submitting form:', errors);
        },
        onSuccess: () => {
          setSubmitted(false);
          setLoading(false);
          router.get(route('onboarding.scenario.step', {
            scenario: onboardingState.currentScenario,
            step: nextStep
          }));
        }
      });
    } catch (error) {
      console.error('Error submitting step:', error);
      setLoading(false);
      setSubmitted(false);
    }
  };

  return (
    <>
      <form onSubmit={handleSubmit} className={submitted ? "" : "animate animate-appear"}>
        {
          isLoading ? (
            <>
              <div className="inset-0 flex items-center justify-center bg-white bg-opacity-75 z-50">
                  <div className="loader ease-linear rounded-full border-8 border-t-8 border-blue-700 h-16 w-16"></div>
                </div>
            </>
          ) : (
            <>
              <div className="flex items-center">
                  <Checkbox
                    id="needs-translator"
                    name='needs-translator'
                    checked={needsInterpreter || data.data.needsInterpreter}
                    onCheckedChange={(checked) => {
                      setneedsInterpreter(Boolean(checked));
                      setData('data', {
                        ...data.data,
                        needsInterpreter: Boolean(checked)
                      });
                    }}
                    className="mt-2 mb-4"
                  >
                    Ja, jeg har brug for en tolk
                  </Checkbox>
                  <Label htmlFor="needs-translator" className="ml-2 text-lg">
                    Ja, jeg har brug for en tolk
                  </Label>
              </div>
              <div className="flex items-center">
                  <Checkbox
                    id="needs-translator-no"
                    name='needs-translator'
                    checked={!needsInterpreter || !data.data.needsInterpreter}
                    onCheckedChange={(checked) => {
                      setneedsInterpreter(!checked);
                      setData('data', {
                        ...data.data,
                        needsInterpreter: !checked
                      });
                    }}
                    className="mt-2 mb-4"
                  >
                    Nej, jeg har ikke brug for en tolk
                  </Checkbox>
                  <Label htmlFor="needs-translator-no" className="ml-2 text-lg">
                    Nej, jeg har ikke brug for en tolk
                  </Label>
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