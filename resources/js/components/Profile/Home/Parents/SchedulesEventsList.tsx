import { type ScheduledEvent } from "@/types/Profile/Parents/types";

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
            <div>
            <h2 className="text-2xl font-bold mb-4">Planlagte begivenheder</h2>
            {
                events.map((event) => (
                    <div key={event.id} className="border rounded-lg p-4 mb-4">
                        <h3 className="text-xl font-bold mb-2">{event.title}</h3>
                        <p className="text-gray-600">Dato: {event.date}</p>
                        <p className="text-gray-600">Beskrivelse: {event.description}</p>
                        <p className="text-gray-600">Barn: {event.child.name}</p>
                    </div>
                ))
            }
        </div>
        </>
    );
}