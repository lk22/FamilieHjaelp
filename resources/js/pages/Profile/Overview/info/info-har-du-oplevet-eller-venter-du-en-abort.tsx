import ProfileOverviewLayout from '@/layouts/profile/profile-layout';

import Paragraph from '@/components/Blocks/Paragraph';
import Heading from '@/components/Blocks/Heading';
import ExternalLink from '@/components/Blocks/ExternalLink';

export default function InfoExperienceWithAbortion() {
    return (
        <ProfileOverviewLayout
            title="Familiehjælp - Har du oplevet eller venter du en abort"
            headline="Har du oplevet eller venter du en abort"
        >
            <div className="bg-white rounded-lg p-16 shadow-md">
                <Heading level={2}>Har du oplevet eller venter du en abort</Heading>
                <section className="mb-6">
                    <Paragraph>
                        I Danmark har alle over 15 år ret til at få foretaget en provokeret abort frem til udgangen af 18. graviditetsuge (17+6).
                    </Paragraph>
                </section>
                <section>
                    <Heading level={3} className="text-2xl text-bkue-700 font-semibold mb-1">
                        Regler for abort, hvis du er under 15 år
                    </Heading>
                    <Paragraph>
                        Er du 14 år eller yngre, og ønsker du en abort, kræver det, at dine forældre skriver under på, at du må få foretaget en abort. I særlige tilfælde kan du få dispensation fra denne regel ved at ansøge om abort uden forældresamtykke hos Abortnævnet.
                    </Paragraph>
                    <Paragraph>
                        Læs mere hos <ExternalLink href="https://abort.dk/rettigheder/hvis-du-er-under-18-aar/" className="font-semibold text-blue-900">Mødrehjælpen</ExternalLink>
                    </Paragraph>
                </section> 
                <section>
                    <Heading level={3}>
                        Regler for abort efter udgangen af 18. uge
                    </Heading>
                    <Paragraph>
                        Ønsker du en abort men er længere end 18 uger henne, kan det kun ske i særlige tilfølde og du skal søge om tilladelse hos abortnævnet.
                    </Paragraph>
                    <Paragraph>
                        Læs mere hos <ExternalLink href="https://abort.dk/rettigheder/abort-efter-12-uger/" className="font-semibold text-blue-900"> Mødrehjælpen</ExternalLink>
                    </Paragraph>
                </section>
            </div>
        </ProfileOverviewLayout>
    );
}