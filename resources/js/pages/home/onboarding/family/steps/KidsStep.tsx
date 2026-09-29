import { Link, useForm } from '@inertiajs/react';
import React, { useState } from 'react';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

import Field from './Field';

import { type Kid, type KidsStepProps } from '@/types/onboarding';

export default function KidsStep({ defaultData }: KidsStepProps) {
  const normalizedKids = defaultData.kids.map((kid) => ({
    gender: kid.gender,
    name: kid.name,
    ageYears: String(kid.ageYears ?? ''),
    ageMonths: String(kid.ageMonths ?? ''),
    ageWeeks: String(kid.ageWeeks ?? ''),
  }));

  const defaultKids: Kid[] =
    normalizedKids.length > 0
      ? normalizedKids
      : [
            {
                gender: 'female',
                name: '',
                ageYears: '',
                ageMonths: '',
                ageWeeks: '',
            },
        ];

  const { data, setData, post, processing, errors } = useForm<{ data: { kids: Kid[] } }>({
    data: {
      kids: defaultKids,
    },
  });
  const [kidKeys, setKidKeys] = useState<string[]>(() => defaultKids.map(() => crypto.randomUUID()));
  const [openKidKeys, setOpenKidKeys] = useState<Set<string>>(() => new Set([kidKeys[0]]));

  const updateKid = (index: number, kidData: Partial<Kid>) => {
    const updatedKids = [...data.data.kids];
    updatedKids[index] = { ...updatedKids[index], ...kidData };

    setData('data', {
      kids: updatedKids,
    });
  };

  const addKid = () => {
    const newKidKey = crypto.randomUUID();

    setKidKeys((previousKeys) => [...previousKeys, newKidKey]);
    setOpenKidKeys((previousKeys) => new Set(previousKeys).add(newKidKey));
    setData('data', {
      kids: [
        ...data.data.kids,
        {
          gender: 'female',
          name: '',
          ageYears: '',
          ageMonths: '',
          ageWeeks: '',
        },
      ],
    });
  };

  const removeKid = (index: number) => {
    if (data.data.kids.length === 1) {
      return;
    }

    const removedKidKey = kidKeys[index];

    setKidKeys((previousKeys) => previousKeys.filter((_, keyIndex) => keyIndex !== index));
    setOpenKidKeys((previousKeys) => {
      const nextKeys = new Set(previousKeys);
      nextKeys.delete(removedKidKey);

      return nextKeys;
    });
    setData('data', {
      kids: data.data.kids.filter((_, kidIndex) => kidIndex !== index),
    });
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    post(route('onboarding.scenario.step.submit', { scenario: 'family', step: 'three', nextStep: 'complete' }));
  };

  return (
    <form className="space-y-4" onSubmit={handleSubmit}>
        <h2 className="text-2xl font-semibold">Tilføj børn</h2>
        <p className="text-sm text-gray-600">Du kan tilføje et eller flere børn.</p>

        {data.data.kids.map((kid, index) => (
            <details
                className="group rounded border"
                key={kidKeys[index]}
                open={openKidKeys.has(kidKeys[index])}
                onToggle={(event) => {
                    const key = kidKeys[index];
                    const isOpen = event.currentTarget.open;

                    setOpenKidKeys((previousKeys) => {
                        const nextKeys = new Set(previousKeys);

                        if (isOpen) {
                            nextKeys.add(key);
                        } else {
                            nextKeys.delete(key);
                        }

                        return nextKeys;
                    });
                }}
            >
                <summary className="flex cursor-pointer list-none items-center justify-between p-4 font-semibold [&::-webkit-details-marker]:hidden">
                    <span>{kid.name || `Barn ${index + 1}`}</span>
                    <span aria-hidden="true" className="text-xl leading-none transition-transform group-open:rotate-180">
                        ↓
                    </span>
                </summary>

                <div className="space-y-3 border-t p-4">
                    <div className="grid gap-4 md:grid-cols-1">
                        <Field label="Køn" inputId={`kid-${index}-gender`} error={errors[`data.kids.${index}.gender`]}>
                            <select
                                id={`kid-${index}-gender`}
                                className="h-6 w-full rounded-md border border-input bg-white px-3 py-2 text-sm text-black"
                                value={kid.gender}
                                onChange={(event) => updateKid(index, { gender: event.target.value as Kid['gender'] })}
                            >
                                <option value="female">Pige</option>
                                <option value="male">Dreng</option>
                                <option value="other">Andet</option>
                            </select>
                        </Field>

                        <Field label="Navn" inputId={`kid-${index}-name`} error={errors[`data.kids.${index}.name`]}>
                            <Input
                                id={`kid-${index}-name`}
                                value={kid.name}
                                onChange={(event) => updateKid(index, { name: event.target.value })}
                            />
                        </Field>

                        <Field label="Alder (år)" inputId={`kid-${index}-ageYears`} error={errors[`data.kids.${index}.ageYears`]}>
                            <Input
                                id={`kid-${index}-ageYears`}
                                type="number"
                                value={kid.ageYears}
                                onChange={(event) => updateKid(index, { ageYears: event.target.value })}
                            />
                        </Field>

                        <Field label="Alder (måneder)" inputId={`kid-${index}-ageMonths`} error={errors[`data.kids.${index}.ageMonths`]}>
                            <Input
                                id={`kid-${index}-ageMonths`}
                                type="number"
                                value={kid.ageMonths}
                                onChange={(event) => updateKid(index, { ageMonths: event.target.value })}
                            />
                        </Field>
                        <Field label="Alder (uger)" inputId={`kid-${index}-ageWeeks`} error={errors[`data.kids.${index}.ageWeeks`]}>
                            <Input
                                id={`kid-${index}-ageWeeks`}
                                type="number"
                                value={kid.ageWeeks}
                                onChange={(event) => updateKid(index, { ageWeeks: event.target.value })}
                            />
                        </Field>
                    </div>

                    <Button
                        aria-label={`Fjern barn ${index + 1}`}
                        disabled={data.data.kids.length === 1}
                        onClick={() => removeKid(index)}
                        type="button"
                        variant="outline"
                    >
                        Fjern
                    </Button>
                </div>
            </details>
        ))}

        {errors['data.kids'] ? <p className="text-sm text-red-600">{errors['data.kids']}</p> : null}

        <div className="flex flex-wrap gap-3">
            <Button onClick={addKid} type="button" variant="outline" className="bg-blue-900 text-white hover:bg-blue-800 hover:text-white">
                Tilføj barn
            </Button>

            <Button asChild type="button" variant="outline" className="bg-blue-900 text-white hover:bg-blue-800 hover:text-white">
                <Link href={route('onboarding.scenario.step', { scenario: 'family', step: 'two' })}>Tilbage</Link>
            </Button>

            <Button disabled={processing} type="submit" className="bg-blue-900 text-white hover:bg-blue-800 hover:text-white">
                Gennemse svar
            </Button>
        </div>
    </form>
  );
}
