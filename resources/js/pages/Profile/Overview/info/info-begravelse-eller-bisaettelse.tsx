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
            <div className="bg-white rounded-lg p-8 shadow-md">
                <Heading level={2}>Begravelse eller bisættelse af dødfødt barn</Heading>
                <section className="mb-6">
                    <Paragraph>
                        Når et barn er dødfødt, kan forældrene vælge mellem begravelse eller bisættelse. Det er en svær beslutning, og det er vigtigt at få den rette støtte og information i denne svære tid.
                    </Paragraph>
                    <Paragraph>
                        Når man mister et barn der var levendefødt eller født fra graviditetsuge 22+0, har man som forældre lovmæssigt pligt til at sørge for begravelse eller bisættelse, Dette gælder også for dødfødte børn.
                    </Paragraph>
                    <Paragraph>
                        I kan selv arrangere begravelsen eller bisættelsen, eller i kan få hjælp fra en bedemand. Det er vigtigt at vælge en løsning, der føles rigtig for jer.
                    </Paragraph>
                    <Paragraph>
                        Hvis barnet er født før 22. svangerskabsuge, gælder særlige reglier som i skal have modtaget i en folder sammen med jeres dødsatest.
                    </Paragraph>
                    <Paragraph>
                        Hvis hospitalet har eget kapel, kan i vælge at få barnet bliver i kapellet indtil der er truffet en beslutning om begravelse eller bisættelse. I kan også vælge at få barnet hjem, hvis det er muligt.
                    </Paragraph>
                </section>
                <section className="mb-6">
                    <Heading level={3}>
                        Begravelses hjælp
                    </Heading>
                    <Paragraph>
                        Hvis I har brug for hjælp til begravelsen eller bisættelsen, kan I kontakte jeres lokale kommune. De kan give jer information om, hvilke muligheder der er for at få økonomisk støtte til begravelsen eller bisættelsen.
                    </Paragraph>
                    <Paragraph>
                        Begravelseshjælp skal søges digitalt på borger.dk eller via blanket "Søg begravelseshjælp" som kan findes på borger.dk.
                        <br />
                        <ExternalLink className="font-semibold text-blue-900 underline py-4" href="https://www.borger.dk/Handlingsside?selfserviceId=3d39a2ec-d5f8-4790-b04e-2d1b22c17c29">
                            Søg her
                        </ExternalLink>
                    </Paragraph>
                </section>
            </div>
        </ProfileOverviewLayout>
    );
}