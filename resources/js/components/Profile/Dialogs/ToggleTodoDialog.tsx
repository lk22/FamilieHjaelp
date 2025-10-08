import {
    Dialog,
    DialogHeader,
    DialogTitle,
    DialogContent,
    DialogFooter,
    DialogDescription,
} from "@/components/ui/dialog";

interface ToggleTodoDialogProps {
    isPromptOpen: boolean;
    setIsPromptOpen: (open: boolean) => void;
    handleCompleteToggle: () => void;
}

export function ToggleTodoDialog({
    isPromptOpen,
    setIsPromptOpen,
    handleCompleteToggle
}: ToggleTodoDialogProps) {
    return (
        <Dialog open={isPromptOpen} onOpenChange={setIsPromptOpen}>
            <DialogContent className="bg-slate-800 text-white">
                <DialogHeader>
                    <DialogTitle className="text-white font-semibold">Er du sikker?</DialogTitle>
                </DialogHeader>
                <DialogDescription>
                    Du har allerede markeret denne opgave som fuldført. Er du sikker på, at du vil ændre status?
                </DialogDescription>
                <DialogFooter>
                    <button 
                        type="button" 
                        className="text-white bg-gray-500 px-4 py-2 rounded hover:bg-gray-600 transition-colors duration-200 ease-in-out" 
                        onClick={() => setIsPromptOpen(false)}
                    >
                        Annuller
                    </button>
                    <button 
                        type="button" 
                        className="cursor-pointer text-white bg-blue-500 px-4 py-2 rounded hover:bg-blue-600 transition-colors duration-200 ease-in-out"
                        onClick={handleCompleteToggle}
                    >
                        Bekræft
                    </button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
}