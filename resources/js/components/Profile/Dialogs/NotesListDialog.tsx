import { Dialog, DialogHeader, DialogTitle, DialogContent, DialogFooter, DialogDescription } from "@/components/ui/dialog";

interface NotesListDialogProps {
    isNotesListOpen: boolean;
    setIsNotesListOpen: (open: boolean) => void;
}

interface NoteItem {
    id: number;
    title: string;
    date: string;
    description: string;
    wantsReminder: boolean;
    reminderDate: string | null;
}

export function NotesListDialog({ isNotesListOpen, setIsNotesListOpen }: NotesListDialogProps) {
    const notes: NoteItem[] = [
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
            id: 5,
            title: "Skal hentes tidligere",
            date: "2025-05-01",
            description: 'Husk at hente Emma tidligere fra skole',
            wantsReminder: true,
            reminderDate: "2025-04-30"
        },
        {
            id: 6,
            title: "Møde med lærere",
            date: "2025-05-01",
            description: "Husk møde med lærere for Emma",
            wantsReminder: false,
            reminderDate: null
        },
    ];
    
    const notesCount = notes.length ?? 0;

    return (
        <Dialog open={isNotesListOpen} onOpenChange={setIsNotesListOpen}>
            <DialogContent className="text-white sm:max-w-3xl bg-white text-blue-900 border border-gray-700 shadow-xl shadow-blue-900/50">
                <DialogHeader>
                    <DialogTitle className="text-blue-900 text-3xl font-semibold">Seneste noter</DialogTitle>
                </DialogHeader>
                <DialogDescription className="text-blue-900 text-2xl">
                    Du har {notesCount} noter. Her er de seneste noter:
                </DialogDescription>
                <div className="max-h-96 overflow-y-auto mt-4">
                    {notes.map((note) => (
                        <div key={note.id} className="border-b border-gray-700 py-4">
                            <h3 className="text-lg font-bold">{note.title}</h3>
                            <p className="text-sm text-gray-400">Dato: {note.date}</p>
                            <p className="mt-2">{note.description}</p>
                            {note.wantsReminder && note.reminderDate && (
                                <p className="text-sm text-blue-400 mt-1">Påmindelse sat til: {note.reminderDate}</p>
                            )}
                        </div>
                    ))}
                </div>
                <DialogFooter>
                    <button 
                        type="button" 
                        className="text-white bg-blue-900 px-4 py-2 rounded hover:bg-gray-600 transition-colors duration-200 ease-in-out" 
                        onClick={() => setIsNotesListOpen(false)}
                    >
                        Luk
                    </button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
}