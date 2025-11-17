import React from 'react';
import { Link } from '@inertiajs/react';

import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogDescription
} from '@/components/ui/dialog';

interface GettingStartedModalProps {
    isOpen: boolean;
}

export default function GettingStartedModal({ isOpen }: GettingStartedModalProps) {

    return (
        <Dialog open={isOpen} modal={true}>
            <DialogContent className="sm:max-w-2xl">
                <DialogHeader>
                    <DialogTitle className="text-4xl font-semibold mb-4 text-white">Kom i gang med Familiehjælp</DialogTitle>
                    <DialogDescription className="mb-6">
                        Velkommen til Familiehjælp! Følg trinene nedenfor for at komme i gang med at bruge platformen.
                    </DialogDescription>
                </DialogHeader>
                <div className="space-y-4">
                    <ol className="list-decimal list-inside space-y-2 text-white">
                        <li>
                            Fortæl os om din familie: Gå til din profil og udfyld oplysninger om dine familiemedlemmer, deres behov og præferencer.
                        </li>
                    </ol>
                    <div className="mt-6">
                        <Link href={route('getting-started')} className="inline-block rounded-sm border border-white px-5 py-1.5 text-xl leading-normal bg-white text-blue-500 hover:border-white">
                            Lad os komme i gang!
                        </Link>
                    </div>
                </div>
            </DialogContent>
        </Dialog>
    );
}