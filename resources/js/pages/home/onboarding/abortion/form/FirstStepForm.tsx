import { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

interface FirstStepFormProps {
  handleStepSubmit: (data: {name: string}) => void;
}

export default function FirstStepForm({ handleStepSubmit }: FirstStepFormProps) {
  const [name, setName] = useState<string>('');
  const [submitted, setSubmitted] = useState<boolean>(false);

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    setName(name);

    // Proceed to the next step or perform other actions
    handleStepSubmit({ name });
    setSubmitted(true);
  };

  return (
    <>
      <form onSubmit={handleSubmit}>
        <Input
          id="name"
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />
        <Button type="submit" className="bg-blue-700 text-white hover:bg-blue-800 mt-4">Næste</Button>
        {submitted && (
          <>
            <p className="mt-4 text-green-600">Navn gemt: {name}</p>
            <Button>Go to Next Step</Button>
          </>
        )}
      </form>
    </>
  )
}