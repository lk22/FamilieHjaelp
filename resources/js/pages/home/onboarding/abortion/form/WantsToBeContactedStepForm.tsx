import { useState } from 'react';
import { router, useForm } from '@inertiajs/react';

// Contexts
import { useOnboarding } from '@/contexts/OnboardingContext';

// components
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import CompletedModal from '@/components/Onboarding/Modals/CompletedModal';

// utilities
import { logState } from '@/lib/utils'

type StepProps = {
  wantsToBeContacted: boolean;
  contactEmail?: string;
  phoneNumber?: string;
}

type WantsToBeContactedStepProps = {
  handleStepSubmit: (data: StepProps) => void;
}

export default function WantsToBeContactedStepForm({ handleStepSubmit }: WantsToBeContactedStepProps) {
  const [wantsToBeContacted, setWantsToBeContacted] = useState<boolean>(false);
  const [contactEmail, setContactEmail] = useState<string>('');
  const [phoneNumber, setPhoneNumber] = useState<string>('');
  const [submitted, setSubmitted] = useState<boolean>(false);
  const [isLoading, setLoading] = useState<boolean>(false);
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const {onboardingState} = useOnboarding();

  const {post,data,setData} = useForm<{
    data: {
      wantsToBeContacted: boolean;
      contactEmail?: string;
      phoneNumber?: string;
    }
  }>({
    data: {
      wantsToBeContacted: false,
      contactEmail: '',
      phoneNumber: '',
    }
  })

  logState('WantsToBeContactedStepForm', { onboardingState, wantsToBeContacted, contactEmail, phoneNumber });

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    setLoading(true);
    setSubmitted(true);

    console.log(data);

    try {
      handleStepSubmit({ wantsToBeContacted, contactEmail, phoneNumber });
      post(route('onboarding.scenario.step.submit', {
        scenario: onboardingState.currentScenario,
        step: 'eight',
        nextStep: 'eight'
      }), {
        onFinish: () => setLoading(false),
        onError: () => {
          setLoading(false);
          setSubmitted(false);
          console.log('Error submitting form:', data);
        },
        onSuccess: () => {
          setLoading(false);
          setIsOpen(true);
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
          submitted ? (
            <p className="text-center text-lg">Tak for dine svar! Vi opdaterer dine resultater...</p>
          ) : (
            <>
              <div className="flex flex-col space-y-4">
                <div className="flex items-start space-x-3">
                  <Checkbox
                    id="wantsToBeContacted"
                    checked={wantsToBeContacted}
                    onCheckedChange={(checked) => {
                      const isChecked = checked === true;
                      setWantsToBeContacted(isChecked);
                      setData('data', {
                        ...data.data,
                        wantsToBeContacted: isChecked
                      })
                    }}
                    className="mt-1"
                  />
                  <div className="min-h-6 flex-1">
                    <Label htmlFor="wantsToBeContacted" className="text-lg">
                      Ja, jeg ønsker at blive kontaktet af en rådgiver for yderligere støtte.
                    </Label>
                    <p className="text-sm text-gray-600 mt-1">
                      Hvis du vælger dette, vil en rådgiver kontakte dig for at tilbyde yderligere støtte og information. Det er helt frivilligt, og du kan altid sige nej.
                    </p>
                  </div>
                </div>

                {wantsToBeContacted && (
                  <div className="flex flex-col space-y-4 mt-4">
                    <div>
                      <Label htmlFor="contactEmail" className="text-sm font-medium">Din email *</Label>
                      <input
                        type="email"
                        id="contactEmail"
                        value={contactEmail}
                        onChange={(e) => {
                          setData('data', {
                            ...data.data,
                            contactEmail: e.target.value
                          })
                          setContactEmail(e.target.value)
                        }}
                        className="mt-1 pl-4 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
                        required
                      />
                    </div>
                    <div>
                      <Label htmlFor="phoneNumber" className="text-sm font-medium">Dit telefonnummer (valgfrit)</Label>
                      <input
                        type="text"
                        id="phoneNumber"
                        value={phoneNumber}
                        onChange={(e) => {
                          setData('data', {
                            ...data.data,
                            phoneNumber: e.target.value
                          })
                          setPhoneNumber(e.target.value)
                        }}
                        className="mt-1 pl-4 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
                      />
                    </div>
                  </div>
                )}
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
  );
}