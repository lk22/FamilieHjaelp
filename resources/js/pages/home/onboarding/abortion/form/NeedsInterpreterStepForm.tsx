import { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";

import { useForm } from '@inertiajs/react';
import { useOnboarding } from '@/contexts/OnboardingContext';

import { router } from '@inertiajs/react';
import { logState } from '@/lib/utils'

type NeedsInterpeterStepProps = {
  handleStepSubmit: (data: {needsInterpreter: boolean}) => void;
}

export default function NeedsInterpreterStepForm({ handleStepSubmit }: NeedsInterpeterStepProps) {
  const [needsInterpreter, setneedsInterpreter] = useState<boolean>(false);
  const [submitted, setSubmitted] = useState<boolean>(false);
  const [isLoading, setLoading] = useState<boolean>(false);

  const { onboardingState } = useOnboarding();

  logState('NeedsInterpreterStepForm', { onboardingState, needsInterpreter });

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    setneedsInterpreter(needsInterpreter);

    setTimeout(() => {
      setLoading(true)
    }, 200);

    // Proceed to the next step or perform other actions
    handleStepSubmit({ needsInterpreter: needsInterpreter });
    setSubmitted(true);

    setTimeout(() => {
      setLoading(true)
      router.get(route('onboarding.scenario.step', {
        scenario: onboardingState.currentScenario,
        step: 'four'
      }));
    }, 500);

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
                  checked={needsInterpreter}
                  onCheckedChange={(checked) => setneedsInterpreter(Boolean(checked))}
                  className="mt-2 mb-4"
                >
                  Ja, jeg har brug for en tolk
                </Checkbox>
                <Label htmlFor="needs" className="ml-2 text-lg">
                  Ja, jeg har brug for en tolk
                </Label>
            </div>
            <div className="flex items-center">
                <Checkbox
                  id="needs-translator"
                  checked={!needsInterpreter}
                  onCheckedChange={(checked) => setneedsInterpreter(!Boolean(checked))}
                  className="mt-2 mb-4"
                >
                  Nej jeg har ikke brug for en tolk
                </Checkbox>
                <Label htmlFor="needs" className="ml-2 text-lg">
                  Nej jeg har ikke brug for en tolk
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