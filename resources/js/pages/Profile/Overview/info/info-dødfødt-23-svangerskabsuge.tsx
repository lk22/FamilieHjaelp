import ProfileOverviewLayout from '@/layouts/profile/profile-layout';

// UI Block compoenents
import Paragraph from '@/components/Blocks/Paragraph';
import Heading from '@/components/Blocks/Heading';
import ExternalLink from '@/components/Blocks/ExternalLink';

export default function DødfødtInfoPage() {
    return (
        <ProfileOverviewLayout
            title="Familiehjælp - Dødfødt 23 Svangerskabsuge"
            headline="Praktisk information om dødfødt 23 svangerskabsuge"
        >
            <div className="bg-white rounded-lg p-8 shadow-md">
                <Heading level={2}>Praktisk information om dødfødt 23 svangerskabsuge</Heading>
                <section className="mb-6">
                    <Paragraph>
                        Når du har brug for tid til at bearbejde sorg, er det vigtigt at få den rette støtte og information. Som forælder kan du have ret til orlov med dagpenge, hvis dit barn er dødfødt i 23. svangerskabsuge eller senere.
                    </Paragraph>
                </section>
                <section className="mb-6">
                    <Paragraph>
                        Hvis du er lønmodtager, skal du anmelde din sorgoverlov til din arbejdsgiver. Det kan du gøre ved at udfylde en formular, som du kan finde på <ExternalLink href="https://www.atp.dk/vores-opgaver/administration-af-velfaerdsydelser/udbetaling-danmark">Udbetaling Danmarks hjemmeside</ExternalLink>.
                    </Paragraph>
                    <Paragraph className="text-xl my-4">
                        for at opfylde betingelserne for at få dagpenge under sorgoverlov, skal du opfylde følgende krav:
                        <ul className="ml-4 mt-4 list-enter leading-7 font-bold text-blue-900">
                            <li className="marker:checked text-md">- Du skal have været ansat i mindst 160 timer inden for de seneste fire hele måneder før orloven.</li>
                            <li className="marker:checked text-md">- Du skal have arbejdet i mindst 40 timer om måneden i mindst tre af de fire måneder.</li>
                            <li className="marker:checked text-md">- Din arbejdsgiver skal indberette din orlov til Udbetaling Danmark.</li>
                        </ul>
                    </Paragraph>
                    <Paragraph>
                        <strong>Udbetaling Danmark får automatisk oplysningerne om din ansættelse og timer, når din arbejdsgiver indberetter orloven.</strong>
                    </Paragraph>
                </section>
                <section className="leading-7 mb-6">
                    <Heading level={3}>
                        Hvor længe kan jeg holde orlov med dagpenge?
                    </Heading>
                    <Paragraph>
                        Som forælder kan du holde sorgorlov med dagpenge i 26 uger, dvs. 6 måneder, hvis du opfylder betingelserne. Sorgorloven starter dagen efter, du har mistet barnet. Du har mulighed for at arbejde helt eller delvist under orloven, og du kan også veksle mellem arbejde og orlov i 26 ugers perioden.
                    </Paragraph>
                    <Paragraph>
                        Hvis du har spørgsmål om sorgoverlov, kan du kontakte Udbetaling Danmark på telefon <ExternalLink href="tel:70128000" className="font-bold underline">70 12 80 00 </ExternalLink> eller sende en e-mail til <ExternalLink href="mailto:info@udbetalingdanmark.dk" className="font-bold underline">info@udbetalingdanmark.dk</ExternalLink>.
                    </Paragraph>
                </section>
                <section>
                    <Heading level={3}>
                        Yderligere ressourcer
                    </Heading>
                    <p className="text-gray-700 text-xl mb-4">
                        Du kan finde mere information om sorgoverlov og andre relaterede emner på Udbetaling Danmarks hjemmeside. Her er nogle nyttige links:
                    </p>
                    <Paragraph>
                        Du kan finde mere information om sorgorlov og andre relaterede emner på Udbetaling Danmarks hjemmeside. Her er nogle nyttige links:
                    </Paragraph>
                    <ul className="list-disc ml-6 text-gray-700 text-xl">
                        <li>
                            <ExternalLink className="font-bold underline" href="https://www.atp.dk/vores-opgaver/administration-af-velfaerdsydelser/udbetaling-danmark">
                                Sorgoverlov - Udbetaling Danmark
                            </ExternalLink>
                        </li>
                        <li>
                            <ExternalLink className="font-bold underline" href="https://www.borger.dk/sundhed-og-sygdom/doedsfald--hospice-og-behandlingstestamente/sorgorlov">
                                Sorgoverlov - Borger.dk
                            </ExternalLink>
                        </li>
                    </ul>

                </section>
            </div>
        </ProfileOverviewLayout>
    );
}