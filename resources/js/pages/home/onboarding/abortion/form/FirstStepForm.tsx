import { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

import { useForm } from '@inertiajs/react';
import { useOnboarding } from '@/contexts/OnboardingContext';

import { router } from '@inertiajs/react';

interface FirstStepFormProps {
  handleStepSubmit: (data: {name: string}) => void;
}

export default function FirstStepForm({ handleStepSubmit }: FirstStepFormProps) {
  const [name, setName] = useState<string>('');
  const [submitted, setSubmitted] = useState<boolean>(false);

  const { onboardingState } = useOnboarding();
  console.log({onboardingState})

  const { data, setData, post, processing, errors } = useForm<{
    name: string;
  }>({
    name: '',
  });

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    setName(name);

    // Proceed to the next step or perform other actions
    handleStepSubmit({ name });
    setSubmitted(true);

    // post(route('onboarding.scenario.update-step', {
    //   scenario: onboardingState.currentScenario,
    //   step: onboardingState.currentStep
    // }));

    router.get(route('onboarding.scenario.step', {
      scenario: onboardingState.currentScenario,
      step: 'two'
    }));
  };

  return (
    <>
      <form onSubmit={handleSubmit}>
        {
          submitted ? (
          <>
            <p className="mt-4 text-green-600">Tak, {name}! Du kan nu fortsætte til næste trin.</p>
          </>
          ) : (
            <>
            <p className="mt-4 text-gray-600">Indtast dit navn for at fortsætte.</p>
              <Input
                id="name"
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
              />
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