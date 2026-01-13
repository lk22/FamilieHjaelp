import { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";

import { useForm, router } from '@inertiajs/react';
import { useOnboarding } from '@/contexts/OnboardingContext';

type NeedsPostpartumSupportInfoStepFormProps = {
  handleStepSubmit: (data: {needsPostpartumSupportInfo: string}) => void;
}

export default function NeedsPostpartumSupportInfoStepForm({ handleStepSubmit }: NeedsPostpartumSupportInfoStepFormProps) {
  const [needsPostpartumSupportInfo, setNeedsPostpartumSupportInfo] = useState<string>('');
  const [submitted, setSubmitted] = useState<boolean>(false);

  const { onboardingState } = useOnboarding();
  console.log({onboardingState})

  const { data, setData, post, processing, errors } = useForm<{
    needsPostpartumSupportInfo: string;
  }>({
    needsPostpartumSupportInfo: '',
  });

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    setNeedsPostpartumSupportInfo(needsPostpartumSupportInfo);

    // Proceed to the next step or perform other actions
    handleStepSubmit({ needsPostpartumSupportInfo });
    setSubmitted(true);

    router.get(route('onboarding.scenario.step', {
      scenario: onboardingState.currentScenario,
      step: 'seven'
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
              <div className="check-field flex items-center">
                <Checkbox
                  id="needs_postpartum_support_info"
                  value={data.needsPostpartumSupportInfo}
                  onChange={() => setData('needsPostpartumSupportInfo', 'true')}
                  className="mt-2 mb-4"
                />
                <label htmlFor="needs_postpartum_support_info" className="text-lg ml-4">
                  Ja, jeg ønsker information om efterfødselsstøtte
                </label>
              </div>
              <div className="check-field flex items-center">
                <Checkbox
                  id="needs_postpartum_support_info"
                  value={data.needsPostpartumSupportInfo}
                  onChange={() => setData('needsPostpartumSupportInfo', 'false')}
                  className="mt-2 mb-4"
                />
                <label htmlFor="needs_postpartum_support_info" className='text-lg ml-4'>
                  Nej, jeg har ikke brug for information om efterfødselsstøtte
                </label>
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