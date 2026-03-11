import ProfileOverviewLayout from '@/layouts/profile/profile-layout';

import Paragraph from '@/components/Blocks/Paragraph';
// import Heading from '@/components/Blocks/Heading';
// import ExternalLink from '@/components/Blocks/ExternalLink';
export default function InfoHowToTellOthersPage() {
    return (
        <ProfileOverviewLayout
            title="Familiehjææp - Hvorædan fortæller jeg det til andre?"
            headline="Hvordan fortæller jeg det til andre?"
        >
            <div className="bg-white rounded-lg p-16 shadow-md">
                <section className="mb-6">
                    <Paragraph>
                        Læs om hvordan du bedst muligt fortæller dit/jeres netværk om situation og hvordan du/i har det.
                    </Paragraph>
                </section>
            </div>
        </ProfileOverviewLayout>
    );
}