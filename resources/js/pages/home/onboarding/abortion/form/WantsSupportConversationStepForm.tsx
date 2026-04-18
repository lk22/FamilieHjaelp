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

type WantsSupportConversationStepProps = {
  handleStepSubmit: (data: {wantsSupportConversation: boolean}) => void;
}

type WantsSupperConversationProps = {
  data: {
    wantsSupportConversation: boolean;
  }
}

export default function WantsSupportConversationStepForm({ handleStepSubmit }: WantsSupportConversationStepProps) {
  const [step] = useState<string>('four');
  const [wantsSupportConversation, setWantsSupportConversation] = useState<boolean>(false);
  const [submitted, setSubmitted] = useState<boolean>(false);
  const [isLoading, setLoading] = useState<boolean>(false);
  const { onboardingState } = useOnboarding();

  const {post, data, setData} = useForm<WantsSupperConversationProps>({
    data: {
      wantsSupportConversation: false,
    }
  })

  logState('WantsSupportConversationStepForm', { onboardingState, wantsSupportConversation });

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    setLoading(true);
    setSubmitted(true);
    const nextStep = 'five';

    try {
      handleStepSubmit({ wantsSupportConversation: wantsSupportConversation });

      post(route('onboarding.scenario.step.submit', {
        scenario: onboardingState.currentScenario,
        step: step,
        nextStep: nextStep
      }), {
        onFinish: () => setLoading(false),
        onError: () => {
          setLoading(false);
          setSubmitted(false);
          console.log('Error submitting form:', data);
        },
        onSuccess: () => {
          setLoading(false);
          setSubmitted(false);
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
                  id="wantsSupportConversationYes"
                  checked={wantsSupportConversation || data.data.wantsSupportConversation}
                  onCheckedChange={(checked) => {
                    setWantsSupportConversation(Boolean(checked));
                    setData('data', {
                      ...data.data,
                      wantsSupportConversation: Boolean(checked)
                    });
                  }}
                  className="mt-2 mb-4"
                />
                <Label htmlFor="wantsSupportConversationYes" className="ml-2 text-lg">
                  Ja jeg ønsker en samtale med en støtteperson
                </Label>
            </div>
            <div className="flex items-center">
                <Checkbox
                  id="wantsSupportConversationNo"
                  checked={!wantsSupportConversation || !data.data.wantsSupportConversation}
                  onCheckedChange={(checked) => {
                    setWantsSupportConversation(!checked);
                    setData('data', {
                      ...data.data,
                      wantsSupportConversation: !checked
                    });
                  }}
                  className="mt-2 mb-4"
                />
                <Label htmlFor="wantsSupportConversationNo" className="ml-2 text-lg">
                  Nej jeg ønsker ikke en samtale med en støtteperson
                </Label>
            </div>
              <Button
                type="submit"
                className="bg-blue-700 text-white hover:bg-blue-800 mt-4"
                disabled={isLoading}
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