import ProfileOverviewLayout from '@/layouts/profile/profile-layout';

export default function SorgoverlovInfoPage() {
    return (
        <ProfileOverviewLayout
            title="Familiehjælp - Sorgoverlov"
            headline="Praktisk information om sorgoverlov"
        >
            <div className="bg-white rounded-lg">
                <h2 className="text-3xl font-semibold mb-4 text-blue-700">Når du har brug for tid til at bearbejde sorg</h2>
                <section className="mb-6">
                    <p className="text-gray-700 text-xl">
                        Som forælder kan du have ret til orlov med dagpenge, hvis dit barn er dødfødt eller dør inden det fylder 18 år, det kaldes sorgoverlov.
                    </p>
                    <p className="text-gray-700 mb-4 text-xl">
                        Det er en lægelig vurdering, om det er en abort eller dødfødsel. 
                    </p>
                    <p className="text-gray-700 mb-4 text-xl">
                        Som udgangspunkt er det en abort indtil fosteret er 22 uger gammelt. 
                    </p>
                    <p className="text-gray-700 mb-4 text-xl">
                        Hvis du er i tvivl om, hvorvidt du har ret til sorgoverlov, kan du kontakte din læge eller kommunen for at få vejledning.
                    </p>
                </section>
                <section className="mb-6">
                    <h3 className="text-2xl text-blue-700 font-semibold mb-1">
                        Hvordan kan du få sorgoverlov?
                    </h3>
                    <p className="text-gray-700 text-xl">
                        Hvis du er lønmodtager, skal du anmelde din sorgoverlov til din arbejdsgiver. Det kan du gøre ved at udfylde en formular, som du kan finde på<br></br> <a className="font-bold" target="_blank" href="https://www.atp.dk/vores-opgaver/administration-af-velfaerdsydelser/udbetaling-danmark">Udbetaling Danmarks hjemmeside</a>.
                    </p>
                    <p className="text-xl my-4">
                        for at opfylde betingelserne for at få dagpenge under sorgoverlov, skal du opfylde følgende krav:
                        <ul className="ml-4 mt-4 list-enter leading-7 font-bold text-blue-700">
                            <li className="marker:checked text-md">- Du skal have været ansat i mindst 160 timer inden for de seneste fire hele måneder før orloven.</li>
                            <li className="marker:checked text-md">- Du skal have arbejdet i mindst 40 timer om måneden i mindst tre af de fire måneder.</li>
                            <li className="marker:checked text-md">- Din arbejdsgiver skal indberette din orlov til Udbetaling Danmark.</li>
                        </ul>
                    </p>
                    <p>
                        <strong>Udbetaling Danmark får automatisk oplysningerne om din ansættelse og timer, når din arbejdsgiver indberetter orloven.</strong>
                    </p>
                </section>
                <section className="leading-7 mb-6">
                    <h3 className="text-2xl text-blue-700 font-semibold mb-1">
                        Hvor længe kan jeg holde orlov med dagpenge?
                    </h3>
                    <p className="text-gray-700 text-xl mb-4">
                        Som forælder kan du holde sorgorlov med dagpenge i 26 uger, dvs. 6 måneder, hvis du opfylder betingelserne. Sorgorloven starter dagen efter, du har mistet barnet. Du har mulighed for at arbejde helt eller delvist under orloven, og du kan også veksle mellem arbejde og orlov i 26 ugers perioden.
                    </p>
                    <p className="text-gray-700 text-xl">
                        Hvis du har spørgsmål om sorgoverlov, kan du kontakte Udbetaling Danmark på telefon <a href="tel:70128000" className="font-bold underline">70 12 80 00</a> eller sende en e-mail til <a className="font-bold underline" href="mailto:info@udbetalingdanmark.dk">info@udbetalingdanmark.dk</a>.
                    </p>
                </section>
                <section>
                    <h3 className="text-2xl text-blue-700 font-semibold mb-1">
                        Yderligere ressourcer
                    </h3>
                    <p className="text-gray-700 text-xl mb-4">
                        Du kan finde mere information om sorgoverlov og andre relaterede emner på Udbetaling Danmarks hjemmeside. Her er nogle nyttige links:
                    </p>
                    <ul className="list-disc ml-6 text-gray-700 text-xl">
                        <li><a className="font-bold underline" href="https://www.atp.dk/vores-opgaver/administration-af-velfaerdsydelser/udbetaling-danmark" target="_blank">Sorgoverlov - Udbetaling Danmark</a></li>
                        <li><a className="font-bold underline" href="https://www.borger.dk/sundhed-og-sygdom/doedsfald--hospice-og-behandlingstestamente/sorgorlov" target="_blank">Sorgoverlov - Borger.dk</a></li>
                    </ul>
                </section>
            </div>
        </ProfileOverviewLayout>
    );
}