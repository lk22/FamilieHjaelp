import {Head} from '@inertiajs/react';

interface MetaProps {
  title: string;
}

export default function Meta({ title }: MetaProps) {
    return (
        <Head title={title}>
            <link rel="preconnect" href="https://fonts.bunny.net" />
            <link href="https://fonts.bunny.net/css?family=instrument-sans:400,500,600" rel="stylesheet" />
        </Head>
    );
}