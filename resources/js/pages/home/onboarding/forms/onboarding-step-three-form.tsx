import { useForm } from "@inertiajs/react";
import {useState} from "react";

import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";

export default function OnboardingStepThreeForm() {
    const [step, setStep] = useState(3);

    const { data, setData, post, processing, errors } = useForm<{
        step: number;
        checks: string[];
        otherDescription?: string;
    }>({
        step: step,
        checks: [],
        otherDescription: ''
    });

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        console.log("Submitting step:", step, "with data:", data);
        localStorage.setItem('onboarding_step' + step, JSON.stringify(data));
        post(route('onboarding.step.submit', { _query: { step: step } }), {
            onSuccess: () => {
                setStep((prevStep) => prevStep + 1);
            },
            onError: () => {
                console.error("Error submitting step:", errors);
            },
        });
    };

    return (
        <form onSubmit={handleSubmit} className="flex flex-col gap-6">
            <div className="container max-w-[960px] px-4 py-8 mx-auto">
                <div className="grid gap-6">
                    <div className="grid gap-4">
                        <div className="flex pb-4 flex-col justify-end align-center">
                            <Label htmlFor="situtation_date" className="flex items-center">Angiv dato</Label>
                            <input 
                                type="datetime-local" 
                                name="date" 
                                id="situation_date"
                                className="p-3 border mt-4"
                            />
                        </div>
                    </div>
                </div>

                <Button type="submit" onClick={handleSubmit} disabled={processing} className="mt-4 bg-blue-600 hover:bg-blue-700 text-white cursor-pointer">
                    {processing ? "Indsender..." : "Fortsæt"}
                </Button>
            </div>
        </form>
    );
}
