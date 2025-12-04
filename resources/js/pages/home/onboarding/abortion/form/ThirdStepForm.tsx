import { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";

import { useForm } from '@inertiajs/react';
import { useOnboarding } from '@/contexts/OnboardingContext';

import { router } from '@inertiajs/react';

interface FirstStepFormProps {
  handleStepSubmit: (data: {hasPartner: boolean}) => void;
}

export default function FirstStepForm({ handleStepSubmit }: FirstStepFormProps) {
  const [hasPartner, setHasPartner] = useState<boolean>(false);
  const [submitted, setSubmitted] = useState<boolean>(false);

  const { onboardingState } = useOnboarding();
  console.log({onboardingState})

  const { data, setData, processing } = useForm<{
    has_partner: boolean;
  }>({
    has_partner: false,
  });

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    setHasPartner(data.has_partner);

    // Proceed to the next step or perform other actions
    handleStepSubmit({ hasPartner });
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
                  id="has_partner"
                  checked={data.has_partner}
                  onCheckedChange={(checked) => setData('has_partner', Boolean(checked))}
                  className="mt-2 mb-4"
                >
                  Ja, jeg har en partner
                </Checkbox>
                <Label htmlFor="has_partner" className="ml-2 text-lg">
                  Ja, jeg har en partner
                </Label>
            </div>
            <div className="flex items-center">
                <Checkbox
                  id="has_partner"
                  checked={!data.has_partner}
                  onCheckedChange={(checked) => setData('has_partner', !Boolean(checked))}
                  className="mt-2 mb-4"
                >
                  Ja, jeg har en partner
                </Checkbox>
                <Label htmlFor="has_partner" className="ml-2 text-lg">
                  Nej jeg har ikke en partner
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