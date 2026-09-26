import { Head, Link, usePage } from '@inertiajs/react';

import { type SharedData } from '@/types';

export default function OnboardingCompleted() {
    const { auth } = usePage<SharedData>().props;

    return (
        <>
            <Head title="Onboarding fuldført" />

            <main className="bg-[#004EA7] py-16 text-white">
                <div className="mx-auto w-full max-w-3xl px-6 text-center">
                    <h1 className="text-3xl font-bold">Tak - din familie er oprettet</h1>
                    <p className="mt-4 text-lg">Vi har gemt dine onboarding-oplysninger.</p>

                    <div className="mt-8">
                        {auth?.user ? (
                            <Link className="inline-block rounded bg-white px-6 py-3 font-semibold text-[#004EA7]" href={route('profile.home')}>
                                Gå til overblik
                            </Link>
                        ) : (
                            <div className="flex flex-wrap justify-center gap-3">
                                <Link className="inline-block rounded bg-white px-6 py-3 font-semibold text-[#004EA7]" href={route('register')}>
                                    Opret bruger
                                </Link>
                                <Link className="inline-block rounded border border-white px-6 py-3 font-semibold text-white" href={route('login')}>
                                    Log ind
                                </Link>
                            </div>
                        )}
                    </div>
                </div>
            </main>
        </>
    );
}
