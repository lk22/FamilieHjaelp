import { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";

import { useForm } from '@inertiajs/react';
import { useOnboarding } from '@/contexts/OnboardingContext';

import { router } from '@inertiajs/react';

type WantsSupportConversationStepProps = {
  handleStepSubmit: (data: {wantsSupportConversation: boolean}) => void;
}

export default function WantsSupportConversationStepForm({ handleStepSubmit }: WantsSupportConversationStepProps) {
  const [wantsSupportConversation, setWantsSupportConversation] = useState<boolean>(false);
  const [submitted, setSubmitted] = useState<boolean>(false);
  const [isLoading, setLoading] = useState<boolean>(false);

  const { onboardingState } = useOnboarding();
  console.log({onboardingState})

  const { data, setData, processing } = useForm<{
    wantsSupportConversation: boolean;
  }>({
    wantsSupportConversation: null,
  });

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    setWantsSupportConversation(data.wantsSupportConversation);

    setTimeout(() => {
      setLoading(true)
    }, 200);

    // Proceed to the next step or perform other actions
    handleStepSubmit({ wantsSupportConversation: data.wantsSupportConversation });
    setSubmitted(true);

    setTimeout(() => {
      setLoading(true)
      router.get(route('onboarding.scenario.step', {
        scenario: onboardingState.currentScenario,
        step: 'five'
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
                  id="has_partner"
                  checked={data.wantsSupportConversation}
                  onCheckedChange={(checked) => setData('wantsSupportConversation', Boolean(checked))}
                  className="mt-2 mb-4"
                >
                  Ja jeg ønsker en samtale med en støtteperson
                </Checkbox>
                <Label htmlFor="wantsSupportConversation" className="ml-2 text-lg">
                  Ja jeg ønsker en samtale med en støtteperson
                </Label>
            </div>
            <div className="flex items-center">
                <Checkbox
                  id="signed"
                  checked={!data.wantsSupportConversation}
                  onCheckedChange={(checked) => setData('wantsSupportConversation', !Boolean(checked))}
                  className="mt-2 mb-4"
                >
                  Nej jeg ønsker ikke en samtale med en støtteperson
                </Checkbox>
                <Label htmlFor="wantsSupportConversation" className="ml-2 text-lg">
                  Nej jeg ønsker ikke en samtale med en støtteperson
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