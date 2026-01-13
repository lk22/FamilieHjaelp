import { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";

import { useForm, router, usePage } from '@inertiajs/react';
import { useOnboarding } from '@/contexts/OnboardingContext';

type KnowsConfidentialityRightsStepFormProps = {
  handleStepSubmit: (data: {knowsConfidentialityRights: string}) => void;
}

export default function KnowsConfidentialityRightsStepForm({ handleStepSubmit }: KnowsConfidentialityRightsStepFormProps) {
  const [knowsConfidentialityRights, setKnowsConfidentialityRights] = useState<string>('');
  const [submitted, setSubmitted] = useState<boolean>(false);
  const {onboardingSession} = usePage().props as any;
  console.log({onboardingSession})

  const { onboardingState } = useOnboarding();
  console.log({onboardingState})

  const { data, setData, post, processing, errors } = useForm<{
    knowsConfidentialityRights: string;
    onboardingSession: any;
  }>({
    knowsConfidentialityRights: '',
    onboardingSession: onboardingSession,
  });

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    setKnowsConfidentialityRights(knowsConfidentialityRights);

    // Proceed to the next step or perform other actions
    handleStepSubmit({ knowsConfidentialityRights });
    setSubmitted(true);

    console.log({data});
    router.get(route('onboarding.confirmation', {
      scenario: onboardingState.currentScenario,
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
                  id="knows_confidentiality_rights"
                  value={data.knowsConfidentialityRights}
                  onChange={() => setData('knowsConfidentialityRights', data.knowsConfidentialityRights)}
                  className="mt-2 mb-4"
                />
                <label htmlFor="knows_confidentiality_rights" className='text-lg ml-4'>
                  Ja, jeg ønsker information om efterfødselsstøtte
                </label>
              </div>
              <div className="check-field flex items-center">
                <Checkbox
                  id="knows_confidentiality_rights"
                  value={data.knowsConfidentialityRights}
                  onChange={() => setData('knowsConfidentialityRights', data.knowsConfidentialityRights)}
                  className="mt-2 mb-4"
                />
                <label htmlFor="knows_confidentiality_rights" className='text-lg ml-4'>
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