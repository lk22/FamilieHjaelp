import { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import CompletedModal from '@/components/Onboarding/Modals/CompletedModal';

import { useForm, router, usePage } from '@inertiajs/react';
import { useOnboarding } from '@/contexts/OnboardingContext';

import { logState } from '@/lib/utils'

type KnowsConfidentialityRightsStepFormProps = {
  handleStepSubmit: (data: {knowsConfidentialityRights: string}) => void;
}

export default function KnowsConfidentialityRightsStepForm({ handleStepSubmit }: KnowsConfidentialityRightsStepFormProps) {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [knowsConfidentialityRights, setKnowsConfidentialityRights] = useState<string>('');
  const [submitted, setSubmitted] = useState<boolean>(false);
  const [isLoading, setLoading] = useState<boolean>(false);
  const {onboardingSession} = usePage().props as any;
  console.log({onboardingSession})

  const { onboardingState } = useOnboarding();
  logState('KnowsConfidentialityRightsStepForm', { onboardingState, knowsConfidentialityRights });

  // const { data, setData, post, processing, errors } = useForm<{
  //   knowsConfidentialityRights: string;
  //   onboardingSession: any;
  // }>({
  //   knowsConfidentialityRights: '',
  //   onboardingSession: onboardingSession,
  // });

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    setKnowsConfidentialityRights(knowsConfidentialityRights);

    // Proceed to the next step or perform other actions
    handleStepSubmit({ knowsConfidentialityRights });
    setSubmitted(true);

    setIsOpen(true);
  };

  return (
    <>
      <form onSubmit={handleSubmit} className={submitted ? "" : "animate animate-appear"}>
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
                  value={knowsConfidentialityRights}
                  onChange={() => setKnowsConfidentialityRights(knowsConfidentialityRights)}
                  className="mt-2 mb-4"
                />
                <label htmlFor="knows_confidentiality_rights" className='text-lg ml-4'>
                  Ja, jeg kender mine rettigheder i forhold til fortrolighed
                </label>
              </div>
              <div className="check-field flex items-center">
                <Checkbox
                  id="knows_confidentiality_rights"
                  value={knowsConfidentialityRights}
                  onChange={() => setKnowsConfidentialityRights(knowsConfidentialityRights)}
                  className="mt-2 mb-4"
                />
                <label htmlFor="knows_confidentiality_rights" className='text-lg ml-4'>
                  Nej, jeg kender ikke mine rettigheder i forhold til fortrolighed
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
      <CompletedModal isOpen={isOpen} closeModal={() => setIsOpen(false)} />
    </>
  )
}