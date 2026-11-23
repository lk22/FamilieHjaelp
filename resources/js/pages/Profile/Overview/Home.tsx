// Libraries
// import { usePage, Link, Deferred } from '@inertiajs/react';
// import { type SharedData } from '@/types';
import {Link, Deferred} from '@inertiajs/react';
import 'swiper/swiper-bundle.css';

// Contexts & Providers
import { OnboardingProvider } from '@/contexts/OnboardingContext';

// utilities
// import { HandleSwiperSlidesPerView } from '@/lib/SwiperSlidesPerViewUtil';

// Layout
import ProfileOverviewLayout from '@/layouts/profile/profile-layout';

interface Todo {
    id: number;
    title: string;
    description: string;
    completed: boolean;
    due_date?: string;
}

interface IFamily {
    name: string;
    family_size: number;
    children_count: number;
    members: IFamilyMember[];
    children: IFamilyChildren[];
    notes: { id: number; title: string; content: string }[];
}

interface IFamilyMember {
    id: number;
    name: string;
    email: string;
    family_role: string;
    age: number;
    attached_email: string;
}

interface IFamilyChildren {
    name: string;
    age_years: number;
    age_months: number;
    age_weeks: number;
    needs_user_access: boolean;
    use_attached_parent_email: boolean;
    child_email: string;
}

interface Note {
    id: number;
    title: string;
    content: string;
}

interface ProfileOverviewHomeProps {
    todos: Todo[];
    notes: Note[];
    family: IFamily;
}

const ProfileOverviewHomeContent = ({
    todos,
    notes,
    family,
}: ProfileOverviewHomeProps) => {
    const FamilyMembers = Array.isArray(family.members) ? family.members : [];
    const todosCount = Array.isArray(todos) ? todos.length : 0;
    const notesCount = Array.isArray(notes) ? notes.length : 0;

    // TODO: when selecting a member update the state or perform an action based on the selected member
    const handleChangeFamilyMember = (e: React.ChangeEvent<HTMLSelectElement>) => {
        const selectedMemberId = parseInt(e.target.value, 10);
        const selectedMember = FamilyMembers.find(member => member.id === selectedMemberId);
        console.log(selectedMember);
    };

    return (
        <ProfileOverviewLayout title="Familiehjælp - Hjem">
            <div className="space-y-6">
                {/* Hero Section */}
                <section className="bg-white rounded-xl h-85 shadow-md px-10 py-8 md:px-16 md:py-12 flex flex-col md:flex-col gap-4 pb-20 border-1 border-blue-200">
                    <h1 className="text-3xl text-blue-800 font-bold mb-2 md:mb-0">Familien {family.name}</h1>
                    <p className="text-base md:text-lg leading-relaxed max-w-2xl text-gray-700">
                        Her kan du få et hurtigt overblik over og informationer.
                    </p>
                    <p className="text-base md:text-lg leading-relaxed max-w-2xl text-gray-700">
                        Familie: {family.name} ({family.family_size} medlemmer, {family.children_count} børn)
                    </p>
                    <form action={route('profile.home')}>
                        <select name="familyMember" className="border border-gray-300 rounded-md p-4 w-6/12" id="familyMember" onChange={handleChangeFamilyMember}>
                            {FamilyMembers.map((member) => (
                                <option key={member.id} value={member.id}>
                                    {member.name}
                                </option>
                            ))}
                        </select>
                    </form>
                </section>

                {/* Quick Access Cards */}
                <section className="relative bottom-25 h-25 mx-8">
                    <div className="grid grid-cols-1 md:grid-cols-4 gap-4 px-8">
                        {/* Notes Card */}
                        <a
                            href={route('profile.notes.index')}
                            className="group block bg-gradient-to-br from-pink-500 to-rose-300 rounded-xl shadow-md transition-colors duration-200 hover:from-pink-600 hover:to-rose-400"
                        >
                            <div className="p-6 flex flex-col justify-between h-full">
                                <div className="mb-4">
                                    <h2 className="text-xl font-semibold mb-2 text-white">Der er oprettet {notesCount} noter</h2>
                                    <p className="mb-4 text-sm leading-relaxed text-white/90 group-hover:text-white transition-colors">
                                        Se alle oprettet noter
                                    </p>
                                </div>
                                <div className="mb-0">
                                    <span className="inline-flex items-center px-3 py-1.5 bg-white/20 backdrop-blur-sm rounded-md font-semibold text-white text-sm group-hover:bg-white/30 transition-colors">
                                        Se noter →
                                    </span>
                                </div>
                            </div>
                        </a>

                        {/* Important Agreements Card */}
                        <a
                            href="https://familierogsorg.dk/"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="group block bg-gradient-to-br from-blue-700 to-blue-500 rounded-xl shadow-md transition-colors duration-200 hover:from-blue-800 hover:to-blue-600"
                        >
                            <div className="p-6 flex flex-col justify-between h-full">
                                <div className="mb-4">
                                    <h2 className="text-xl font-semibold mb-2 text-white">Du har 4 aftaler idag</h2>
                                    <p className="mb-4 text-sm leading-relaxed text-white/90 group-hover:text-white transition-colors">
                                        Se dine kommende aftaler og vigtige datoer.
                                    </p>
                                </div>
                                <div className="mb-0">
                                    <span className="inline-flex items-center px-3 py-1.5 bg-white/20 backdrop-blur-sm rounded-md font-semibold text-white text-sm group-hover:bg-white/30 transition-colors">
                                        Se aftaler →
                                    </span>
                                </div>
                            </div>
                        </a>

                        {/* Calendar Card */}
                        <a
                            href="https://familierogsorg.dk/"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="group block bg-gradient-to-br from-indigo-600 to-indigo-800 rounded-xl shadow-md transition-colors duration-200 hover:from-indigo-700 hover:to-indigo-900"
                        >
                            <div className="p-6 flex flex-col justify-between h-full">
                                <div className="mb-4">
                                    <h2 className="text-xl font-semibold mb-2 text-white">Du har {todosCount ?? '15'} aftaler i kalenderen</h2>
                                    <p className="mb-4 text-sm leading-relaxed text-white/90 group-hover:text-white transition-colors">
                                        Følg dine kommende aftaler i kalenderen.
                                    </p>
                                </div>
                                <div className="mb-0">
                                    <span className="inline-flex items-center px-3 py-1.5 bg-white/20 backdrop-blur-sm rounded-md font-semibold text-white text-sm group-hover:bg-white/30 transition-colors">
                                        Se kalender →
                                    </span>
                                </div>
                            </div>
                        </a>

                        {/* Tips & Tricks Card */}
                        <a
                            href={route('profile.todos')}
                            className="group block bg-gradient-to-br from-emerald-300 to-teal-200 rounded-xl shadow-md transition-colors duration-200 hover:from-emerald-400 hover:to-teal-300"
                        >
                            <div className="p-6 h-full flex flex-col justify-between">
                                <div className="mb-4">
                                    <h2 className="text-xl font-semibold mb-2 text-blue-950">Du har 10 opgaver</h2>
                                    <p className="mb-4 text-sm leading-relaxed text-blue-900/80 group-hover:text-blue-900 transition-colors">
                                        Få styr over alle familiens opgaver
                                    </p>
                                </div>
                                <div className="mb-0">
                                    <span className="inline-flex items-center px-3 py-1.5 bg-white/20 backdrop-blur-sm rounded-md font-semibold text-blue-900 text-sm group-hover:bg-white/30 transition-colors">
                                        Se opgaver →
                                    </span>
                                </div>
                            </div>
                        </a>
                    </div>
                </section>

                {/* Todo List Section */}
                {/* <TodoListSection todos={Todos} /> */}
                {/* Today's Schedule */}
                <section className="rounded-xl py-12 px-12 mb-4">
                    <div className="flex justify-between">
                        <div className="w-6/12">
                            <h2 className="text-xl text-blue-800 font-bold">15/11-2026</h2>
                            <p className="mb-6 text-md font-semibold text-blue-800 leading-relaxed">
                                Dagens vigtige aftaler:
                            </p>
                        </div>
                        <div className="w-6/12 flex items-center justify-end">
                            <Link href="#" className="ms-8 inline-flex items-center px-3 py-1.5 bg-blue-900 backdrop-blur-sm rounded-md font-semibold text-white text-sm group-hover:bg-blue-950 transition-colors duration-200 float-right">
                                Se kalender →
                            </Link>
                        </div>
                    </div>
                    <Deferred
                        data="pages"
                        fallback={<PagesFallbackComponent />}
                    >
                        <div className="grid grid-cols-1 gap-4 mb-4">
                            <div className="rounded-xl mb-3 shadow-md p-6 bg-gradient-to-br from-blue-800 to-blue-950 group hover:from-gray-900 hover:to-blue-950 transition-colors duration-200">
                                <h3 className="text-xl font-semibold text-white mb-3 group-hover:text-blue-100 transition-colors">Læge aftale</h3>
                                <div className="divider mt-6">
                                    <span className="text-gray-300">Detaljer</span>
                                </div>
                                <p className="mt-2 text-gray-200">Tid: 10:00 - 11:00</p>
                                <p className="text-gray-200">Sted: Lægeklinikken</p>
                            </div>
                            <div className="rounded-xl mb-3 shadow-md p-6 bg-gradient-to-br from-blue-800 to-blue-950 group hover:from-gray-900 hover:to-blue-950 transition-colors duration-200">
                                <h3 className="text-xl font-semibold text-white mb-3 group-hover:text-blue-100 transition-colors">Læge aftale</h3>
                                <div className="divider mt-6">
                                    <span className="text-gray-300">Detaljer</span>
                                </div>
                                <p className="mt-2 text-gray-200">Tid: 10:00 - 11:00</p>
                                <p className="text-gray-200">Sted: Lægeklinikken</p>
                            </div>
                            <div className="rounded-xl mb-3 shadow-md p-6 bg-gradient-to-br from-blue-800 to-blue-950 group hover:from-gray-900 hover:to-blue-950 transition-colors duration-200">
                                <h3 className="text-xl font-semibold text-white mb-3 group-hover:text-blue-100 transition-colors">Læge aftale</h3>
                                <div className="divider mt-6">
                                    <span className="text-gray-300">Detaljer</span>
                                </div>
                                <p className="mt-2 text-gray-200">Tid: 10:00 - 11:00</p>
                                <p className="text-gray-200">Sted: Lægeklinikken</p>
                            </div>
                            <div className="rounded-xl mb-3 shadow-md p-6 bg-gradient-to-br from-blue-800 to-blue-950 group hover:from-gray-900 hover:to-blue-950 transition-colors duration-200">
                                <h3 className="text-xl font-semibold text-white mb-3 group-hover:text-blue-100 transition-colors">Læge aftale</h3>
                                <div className="divider mt-6">
                                    <span className="text-gray-300">Detaljer</span>
                                </div>
                                <p className="mt-2 text-gray-200">Tid: 10:00 - 11:00</p>
                                <p className="text-gray-200">Sted: Lægeklinikken</p>
                            </div>
                        </div>
                    </Deferred>
                </section>


            </div>
        </ProfileOverviewLayout>
    );
}

const PagesFallbackComponent = () => {
    return (
        <div className="text-center text-white">Indlæser sider...</div>
    )
}

export default function ProfileOverviewHome({
    family,
    todos,
    notes,
}: ProfileOverviewHomeProps) {
    return (
        <OnboardingProvider>
            <ProfileOverviewHomeContent
                family={family}
                todos={todos}
                notes={notes}
            />
        </OnboardingProvider>
    );
}
