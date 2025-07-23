import ProfileOverviewLayout from '@/layouts/profile/profile-layout';

export default function SorgoverlovInfoPage() {
    return (
        <ProfileOverviewLayout
            title="Familiehjælp - Sorgoverlov"
            headline="Sorgoverlov Information"
        >
            <div className="bg-white p-6 rounded-lg">
                <h2 className="text-xl font-semibold mb-4">Sorgoverlov</h2>
                <p className="text-gray-700 mb-4">
                    Har du mistet en nær pårørende? Få hjælp til at håndtere sorg og tab.
                </p>
            </div>
        </ProfileOverviewLayout>
    );
}