// dependencies
import { useState } from 'react';
import { router, useForm } from '@inertiajs/react';

// Contexts
import { useOnboarding } from '@/contexts/OnboardingContext';

// Utilities
import { logState } from '@/lib/utils'

// components
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";

type NeedsPostpartumSupportInfoStepFormProps = {
  handleStepSubmit: (data: {needsPostpartumSupportInfo: boolean}) => void;
}

type NeedsPostpartumSupportInfoProps = {
  data: {
    needsPostpartumSupportInfo: boolean;
  }
}

export default function NeedsPostpartumSupportInfoStepForm({ handleStepSubmit }: NeedsPostpartumSupportInfoStepFormProps) {
  const [step] = useState<string>('seven');
  const [needsPostpartumSupportInfo, setNeedsPostpartumSupportInfo] = useState<boolean>(false);
  const [submitted, setSubmitted] = useState<boolean>(false);
  const [isLoading, setLoading] = useState<boolean>(false);

  const { onboardingState } = useOnboarding();

  const {post, data, setData} = useForm<NeedsPostpartumSupportInfoProps>({
    data: {
      needsPostpartumSupportInfo: false,
    }
  })


  logState('NeedsPostpartumSupportInfoStepForm', { onboardingState, needsPostpartumSupportInfo });

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    setLoading(true);
    setSubmitted(true);
    const nextStep = 'eight';
    try {
      handleStepSubmit({ needsPostpartumSupportInfo: Boolean(needsPostpartumSupportInfo) });

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
            <div className="absolute inset-0 flex items-center justify-center bg-white bg-opacity-75 z-50">
              <div className="loader ease-linear rounded-full border-8 border-t-8 border-blue-700 h-16 w-16"></div>
            </div>
          </>
          ) : (
            <>
              <div className="check-field flex items-center">
                <Checkbox
                  id="needs_postpartum_support_info"
                  name="needs_postpartum_support_info"
                  checked={needsPostpartumSupportInfo || data.data.needsPostpartumSupportInfo}
                  onCheckedChange={(checked) => {
                    setNeedsPostpartumSupportInfo(Boolean(checked));
                    setData('data', {
                      ...data.data,
                      needsPostpartumSupportInfo: Boolean(checked)
                    });
                  }}
                  className="mt-2 mb-4"
                >
                  Ja, jeg ønsker information om efterfødselsstøtte
                </Checkbox>
                <label htmlFor="needs_postpartum_support_info" className="text-lg ml-4">
                  Ja, jeg ønsker information om efterfødselsstøtte
                </label>
              </div>
              <div className="check-field flex items-center">
                <Checkbox
                  id="needs_postpartum_support_info"
                  name="needs_postpartum_support_info"
                  checked={!needsPostpartumSupportInfo && !data.data.needsPostpartumSupportInfo}
                  onCheckedChange={(checked) => {
                    setNeedsPostpartumSupportInfo(!checked);
                    setData('data', {
                      ...data.data,
                      needsPostpartumSupportInfo: !checked
                    });
                  }}
                  className="mt-2 mb-4"
                />
                <label htmlFor="needs_postpartum_support_info" className='text-lg ml-4'>
                  Nej, jeg har ikke brug for information om efterfødselsstøtte
                </label>
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