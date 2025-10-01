// Dependencies
import {Link} from '@inertiajs/react';
import { type ScheduledEvent } from "@/types/Profile/Parents/types";
import { HiOutlineCalendar } from "react-icons/hi";
import { LuPersonStanding } from "react-icons/lu";


export default function ScheduledEventsList() {
    const events: ScheduledEvent[] = [
        {
            id: 1,
            title: "Lægebesøg",
            date: "2025-05-01",
            description: 'Årligt tjek for Emma', 
            child: {
                id: 1,
                name: "Emma",
                age: 10,
                school: "Skole A"
            }
        },
        {
            id: 2,
            title: "Skolehjem samtale",
            date: "2025-05-01",
            description: "Skolehjem samtale med skole lærer for Emma",
            child: {
                id: 1,
                name: "Emma",
                age: 10,
                school: "Skole A"
            }
        }
    ];

    return (
        <>
            <div className="mb-8 mt-4">
            {
                events.map((event) => (
                    <div key={event.id} className="border rounded-lg p-4 mb-4">
                        <h3 className="text-xl font-bold mb-2">
                            <span className="icon">
                                <HiOutlineCalendar className="inline-block mr-2 text-blue-700" />
                            </span>
                            <span className="sr-only">Begivenhed:</span>
                            {event.title}
                        </h3>
                        <p className="text-gray-600">
                            <span className="icon">
                                <HiOutlineCalendar className="inline-block mr-2 text-blue-700" />
                            </span>
                            <span className="sr-only">Dato:</span>
                            Dato: {event.date}
                        </p>
                        <p className="text-gray-600">Beskrivelse: {event.description}</p>
                        <p className="text-gray-600">
                            <span className="icon">
                                <LuPersonStanding className="inline-block mr-2 text-blue-700" />
                            </span>
                            <span className="sr-only">Barn:</span>
                            Barn: {event.child.name}    
                        </p>
                    </div>
                ))
            }
            </div>
            <Link 
                href={route('profile.parents.events.index')}
                className="text-blue-700 text-center font-bold absolute bottom-8 left-8"    
            >
                Se planlagte
            </Link>
        </>
    );
}