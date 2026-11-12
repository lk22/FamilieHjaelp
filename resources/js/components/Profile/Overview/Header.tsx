import {JSX} from 'react';
import { Link } from '@inertiajs/react';

interface ProfileOverviewHeaderProps {
    user: {
        name: string;
    };
    onHelpTopic?: string | null;
}

// Mock data - in real app this would come from props or API
const mockTopics = [
    { title: 'Dansk center for familier og sorg', link: 'https://familierogsorg.dk/', desc: 'Støtte og rådgivning til familier i sorg' },
    { title: 'Sorggrupper', link: 'https://www.sorgvejviser.dk/sorgtilbud/sorggrupper-for-foraeldre-der-har-mistet-et-barn/', desc: 'Sorggrupper for forældre, der har mistet et barn' },
];

export default function ProfileOverviewHeader({ user, onHelpTopic }: ProfileOverviewHeaderProps) {
    const isMobile = false; // Use useIsMobile() in real implementation
    
    return (
        <section className="mt-8 pl-8 py-8 bg-white rounded-lg shadow-md flex flex-row gap-8 border-t-2 border-blue-800 inset">
            {/* Left column - Help text */}
            <div className={`${isMobile ? 'w-full' : 'w-6/12'} max-w-md`}>
                <h1 className="text-4xl text-blue-800 font-bold mb-2">Hjælp til at komme videre</h1>
                <p className="mb-10 text-sm text-gray-700 leading-relaxed">
                    Vi er kede af jeres situation, det kan være svært at komme videre alene. 
                    Vi kan dirigere dig hurtigt videre til den nødvendige hjælp men vi skal bruge din hjælp.
                </p>
                {onHelpTopic ? (
                    <Link 
                        href={onHelpTopic} 
                        className="inline-flex items-center gap-2 px-5 py-3 bg-blue-900 rounded-lg text-white hover:bg-blue-800 transition-colors duration-200 font-medium"
                    >
                        Spørgsmål: {onHelpTopic}
                    </Link>
                ) : (
                    <Link 
                        href="#" 
                        className="inline-flex items-center gap-2 px-5 py-3 bg-blue-900 rounded-lg text-white hover:bg-blue-800 transition-colors duration-200 font-medium"
                    >
                        Se mere information
                    </Link>
                )}
            </div>
            
            {/* Right column - Quick access cards */}
            <div className={`flex flex-col gap-4 ${isMobile ? 'w-full' : 'w-6/12'}`}>
                {mockTopics.map((topic, index) => (
                    <a 
                        key={index} 
                        href={topic.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="group relative flex items-start gap-4 p-5 bg-[#2C6DB6] rounded-lg shadow-md text-white transition-all duration-300 ease-in-out hover:bg-[#1A4D8D] hover:shadow-xl"
                    >
                        {/* Icon placeholder - could add icon library here */}
                        <div className="flex-shrink-0 w-10 h-10 rounded-full bg-blue-900/50 flex items-center justify-center">
                            <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-6" />
                            </svg>
                        </div>
                        <div className="flex-1">
                            <h2 className="text-xl font-semibold mb-2 group-hover:text-blue-50 transition-colors">
                                {topic.title}
                            </h2>
                            <p className="text-sm text-blue-50 leading-relaxed opacity-90 group-hover:opacity-100">
                                {topic.desc}
                            </p>
                        </div>
                    </a>
                ))}
            </div>
        </section>
    );
}
