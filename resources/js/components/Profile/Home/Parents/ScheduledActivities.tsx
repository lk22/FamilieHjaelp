// Dependencies
import {Link} from '@inertiajs/react';
import { type ScheduledActivity } from "@/types/Profile/Parents/types";
import { HiOutlineCalendar } from "react-icons/hi";


export default function ScheduledActivitiesList() {
    const activities: ScheduledActivity[] = [
        {
            id: 1,
            title: "Lægebesøg",
            date: "2025-05-01",
            description: 'Årligt tjek for Emma'
        },
        {
            id: 2,
            title: "Skolehjem samtale",
            date: "2025-05-01",
            description: "Skolehjem samtale med skole lærer for Emma"
        }
    ];

    return (
        <>
            <div className="mb-8 mt-4">
            {
                activities.map((activity) => (
                    <div key={activity.id} className="border rounded-lg p-4 mb-4">
                        <h3 className="text-xl font-bold mb-2">
                            <span className="icon">
                                <HiOutlineCalendar className="inline-block mr-2 text-blue-700" />
                            </span>
                            <span className="sr-only">Begivenhed:</span>
                            {activity.title}
                        </h3>
                        <p className="text-gray-600">
                            <span className="icon">
                                <HiOutlineCalendar className="inline-block mr-2 text-blue-700" />
                            </span>
                            <span className="sr-only">Dato:</span>
                                Dato: {activity.date}
                            </p>
                        <p className="text-gray-600">Beskrivelse: {activity.description}</p>
                    </div>
                ))
            }
            </div>
            <Link 
                href={route('profile.parents.activities.index')}
                className="text-blue-700 font-bold text-center absolute bottom-8 left-8"    
            >
                Se aktiviteter
            </Link>
        </>
    );
}