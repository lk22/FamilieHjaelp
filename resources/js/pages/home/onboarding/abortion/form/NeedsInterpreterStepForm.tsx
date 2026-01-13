import { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";

import { useForm } from '@inertiajs/react';
import { useOnboarding } from '@/contexts/OnboardingContext';

import { router } from '@inertiajs/react';

type NeedsInterpeterStepProps = {
  handleStepSubmit: (data: {needsInterpreter: boolean}) => void;
}

export default function NeedsInterpreterStepForm({ handleStepSubmit }: NeedsInterpeterStepProps) {
  const [needsInterpreter, setneedsInterpreter] = useState<boolean>(false);
  const [submitted, setSubmitted] = useState<boolean>(false);

  const { onboardingState } = useOnboarding();
  console.log({onboardingState})

  const { data, setData, processing } = useForm<{
    needsInterpreter: boolean;
  }>({
    needsInterpreter: false,
  });

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    setneedsInterpreter(data.needsInterpreter);

    // Proceed to the next step or perform other actions
    handleStepSubmit({ needsInterpreter: data.needsInterpreter });
    setSubmitted(true);

    router.get(route('onboarding.scenario.step', {
      scenario: onboardingState.currentScenario,
      step: 'four'
    }));
  };

  return (
    <>
      <form onSubmit={handleSubmit}>
        {
          submitted ? (
            <>
              <p className="mt-4 text-green-600">Tak! Du kan nu fortsætte til næste trin.</p>
            </>
          ) : (
            <>
            <div className="flex items-center">
                <Checkbox
                  id="needs-translator"
                  checked={data.needsInterpreter}
                  onCheckedChange={(checked) => setData('needsInterpreter', Boolean(checked))}
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
                  checked={!data.needsInterpreter}
                  onCheckedChange={(checked) => setData('needsInterpreter', !Boolean(checked))}
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