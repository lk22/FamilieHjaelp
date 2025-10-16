// import { type LatestParentNote } from "@/types/Profile/Parents/types";

interface LatestParentNotes {
    id: number;
    title: string;
    date: string;
    description: string;
    wantsReminder: boolean;
    reminderDate: string | null;
}

export default function LatestParentNotes() {
    const notes: LatestParentNotes[] = [
        {
            id: 1,
            title: "Skal hentes tidligere",
            date: "2025-05-01",
            description: 'Husk at hente Emma tidligere fra skole',
            wantsReminder: true,
            reminderDate: "2025-04-30"
        },
        {
            id: 2,
            title: "Møde med lærere",
            date: "2025-05-01",
            description: "Husk møde med lærere for Emma",
            wantsReminder: false,
            reminderDate: null
        },
        {
            id: 3,
            title: "Skal hentes tidligere",
            date: "2025-05-01",
            description: 'Husk at hente Emma tidligere fra skole',
            wantsReminder: true,
            reminderDate: "2025-04-30"
        },
        {
            id: 4,
            title: "Møde med lærere",
            date: "2025-05-01",
            description: "Husk møde med lærere for Emma",
            wantsReminder: false,
            reminderDate: null
        },
        {
            id: 1,
            title: "Skal hentes tidligere",
            date: "2025-05-01",
            description: 'Husk at hente Emma tidligere fra skole',
            wantsReminder: true,
            reminderDate: "2025-04-30"
        },
        {
            id: 2,
            title: "Møde med lærere",
            date: "2025-05-01",
            description: "Husk møde med lærere for Emma",
            wantsReminder: false,
            reminderDate: null
        },
        {
            id: 3,
            title: "Skal hentes tidligere",
            date: "2025-05-01",
            description: 'Husk at hente Emma tidligere fra skole',
            wantsReminder: true,
            reminderDate: "2025-04-30"
        },
        {
            id: 4,
            title: "Møde med lærere",
            date: "2025-05-01",
            description: "Husk møde med lærere for Emma",
            wantsReminder: false,
            reminderDate: null
        },
    ];

    return (
        <>
            <div className="mb-8 mt-4 h-full">
                {
                    notes.map((note) => (
                        <div key={note.id} className="border rounded-lg p-4 mb-4">
                            <h3 className="text-xl font-bold mb-2">{note.title}</h3>
                            <p className="text-gray-600">Dato: {note.date}</p>
                        </div>
                    ))
                }
            </div>
        </>
    );
}