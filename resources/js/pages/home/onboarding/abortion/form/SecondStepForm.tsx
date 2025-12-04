import {useState} from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

import { useForm } from '@inertiajs/react';
import { useOnboarding } from '@/contexts/OnboardingContext';

import { router } from '@inertiajs/react';

interface FormStepProps {
    handleStepSubmit: (data: { gender: string }) => void;
}

export default function SecondStepForm({ handleStepSubmit }: FormStepProps) {
  const [gender, setGender] = useState<string>('');
  const [submitted, setSubmitted] = useState<boolean>(false);
  const { onboardingState } = useOnboarding();

  const { processing } = useForm<{
    gender: string;
  }>({
    gender: '',
  });

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    setGender(gender);

    handleStepSubmit({gender});
    setSubmitted(true);

    router.get(route('onboarding.scenario.step', {
      scenario: onboardingState.currentScenario,
      step: 'three'
    }));
  }

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
            <p className="mt-4 text-gray-600">Vælg dit køn for at fortsætte.</p>
              <Input
                id="gender"
                type="text"
                value={gender}
                onChange={(e) => setGender(e.target.value)}
                placeholder="Indtast dit køn"
                className="mt-2 mb-4 w-full"
                required
              />
              <Button
                type="submit" className="bg-blue-700 text-white hover:bg-blue-800 mt-4"
                disabled={processing}
              >
                  Fortsæt til næste trin
                </Button>
          </>
          )
        }
      </form>
    </>
  );
}