import ProfileOverviewLayout from '@/layouts/profile/profile-layout';

import Paragraph from '@/components/Blocks/Paragraph';
// import Heading from '@/components/Blocks/Heading';
// import ExternalLink from '@/components/Blocks/ExternalLink';
export default function InfoHowToHandleSorrowPage() {
    return (
        <ProfileOverviewLayout
            title="Familiehjææp - Hvordan håndtere jeg sorgen?"
            headline="Hvordan håndtere jeg sorgen?"
        >
            <div className="bg-white rounded-lg p-16 shadow-md">
                <section className="mb-6">
                    <Paragraph>
                        Læs om hvordan du bedst håndtere sorgen og hvad du har af rettigheder og muligheder i din sorge process.
                    </Paragraph>
                </section>
            </div>
        </ProfileOverviewLayout>
    );
}