import {Head} from '@inertiajs/react';

interface MetaProps {
  title: string;
  description: string;
}

export default function Meta({ title, description }: MetaProps) {
    return (
        <Head title={title}>
            <meta name="description" content={description} />
            <link rel="preconnect" href="https://fonts.bunny.net" />
            <link href="https://fonts.bunny.net/css?family=instrument-sans:400,500,600" rel="stylesheet" />
            <meta name="viewport" content="width=device-width, initial-scale=1" />

            {/* CSR rules */}
            {/* <meta
                http-equiv="Content-Security-Policy"
                content="default-src 'self'; script-src 'self' 'unsafe-inline'; style-src 'self' 'unsafe-inline'; img-src 'self' data:; font-src 'self'; connect-src 'self';"
            /> */}
        </Head>
    );
}