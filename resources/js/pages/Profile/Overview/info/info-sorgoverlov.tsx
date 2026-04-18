import ProfileOverviewLayout from '@/layouts/profile/profile-layout';

import Paragraph from '@/components/Blocks/Paragraph';
import Heading from '@/components/Blocks/Heading';
import ExternalLink from '@/components/Blocks/ExternalLink';

export default function SorgoverlovInfoPage() {
    return (
        <ProfileOverviewLayout
            title="Familiehjælp - Sorgoverlov"
            headline="Praktisk information om sorgoverlov"
        >
            <div className="bg-white rounded-lg p-16 shadow-md">
                <Heading level={2}>
                    Når du har brug for tid til at bearbejde sorg
                </Heading>
                <section className="mb-6">
                    <Paragraph>
                        Som forælder kan du have ret til orlov med dagpenge, hvis dit barn er dødfødt eller dør inden det fylder 18 år, det kaldes sorgoverlov.
                    </Paragraph>
                    <Paragraph>
                        Det er en lægelig vurdering, om det er en abort eller dødfødsel. 
                    </Paragraph>
                    <Paragraph>
                        Som udgangspunkt er det en abort indtil fosteret er 22 uger gammelt. 
                    </Paragraph>
                    <Paragraph>
                        Hvis du er i tvivl om, hvorvidt du har ret til sorgoverlov, kan du kontakte din læge eller kommunen for at få vejledning.
                    </Paragraph>
                </section>
                <section className="mb-6">
                    <Heading level={3} className="text-2xl text-blue-700 font-semibold mb-1">
                        Hvordan kan du få sorgoverlov?
                    </Heading>
                    <Paragraph>
                        Hvis du er lønmodtager, skal du anmelde din sorgoverlov til din arbejdsgiver. Det kan du gøre ved at udfylde en formular, som du kan finde på<br></br> <ExternalLink className="font-bold" href="https://www.atp.dk/vores-opgaver/administration-af-velfaerdsydelser/udbetaling-danmark">Udbetaling Danmarks hjemmeside</ExternalLink>.
                    </Paragraph>
                    <Paragraph>
                        for at opfylde betingelserne for at få dagpenge under sorgoverlov, skal du opfylde følgende krav:
                    </Paragraph>
                    <ul className="ml-4 my-4 list-enter leading-7 font-bold text-blue-900">
                        <li className="marker:checked text-md">- Du skal have været ansat i mindst 160 timer inden for de seneste fire hele måneder før orloven.</li>
                        <li className="marker:checked text-md">- Du skal have arbejdet i mindst 40 timer om måneden i mindst tre af de fire måneder.</li>
                        <li className="marker:checked text-md">- Din arbejdsgiver skal indberette din orlov til Udbetaling Danmark.</li>
                    </ul>
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
                        Hvis du har spørgsmål om sorgoverlov, kan du kontakte Udbetaling Danmark på telefon <a href="tel:70128000" className="font-bold underline">70 12 80 00</a> eller sende en e-mail til <a className="font-bold underline" href="mailto:info@udbetalingdanmark.dk">info@udbetalingdanmark.dk</a>.
                    </Paragraph>
                </section>
                <section>
                    <Heading level={3}>
                        Yderligere ressourcer
                    </Heading>
                    <Paragraph>
                        Du kan finde mere information om sorgoverlov og andre relaterede emner på Udbetaling Danmarks hjemmeside. Her er nogle nyttige links:
                    </Paragraph>
                    <ul className="list-disc ml-6 text-gray-700 text-xl">
                        <li><a className="font-bold underline" href="https://www.atp.dk/vores-opgaver/administration-af-velfaerdsydelser/udbetaling-danmark" target="_blank">Sorgoverlov - Udbetaling Danmark</a></li>
                        <li><a className="font-bold underline" href="https://www.borger.dk/sundhed-og-sygdom/doedsfald--hospice-og-behandlingstestamente/sorgorlov" target="_blank">Sorgoverlov - Borger.dk</a></li>
                    </ul>
                </section>
            </div>
        </ProfileOverviewLayout>
    );
}