import {
    Dialog,
    DialogTitle,
    DialogContent,
    DialogFooter,
    DialogDescription,
    DialogClose
} from '@/components/ui/dialog';

interface LogoutDialogProps {
    isLoggingOut: boolean;
    handleLogout: (e: React.MouseEvent<HTMLButtonElement>) => void;
    setIsLoggingOutDialog?: (open: boolean) => void; // Optional for controlled dialog
}

export function LogoutDialog({ isLoggingOut, handleLogout, setIsLoggingOutDialog }: LogoutDialogProps) {
    return (
        <Dialog open={isLoggingOut} onOpenChange={() => setIsLoggingOutDialog ? setIsLoggingOutDialog(false) : undefined}>
            <DialogContent className="bg-slate-800 text-white">
                <DialogTitle className="text-white font-semibold">Er du sikker?</DialogTitle>
                <DialogDescription>
                    Du er ved at logge ud. Er du sikker på, at du vil fortsætte?
                </DialogDescription>
                <DialogFooter>
                    <DialogClose className="text-white bg-gray-500 px-4 py-2 rounded hover:bg-gray-600 transition-colors duration-200 ease-in-out">
                        Annuller
                    </DialogClose>
                    <button 
                        type="button" 
                        className="cursor-pointer text-white bg-blue-500 px-4 py-2 rounded hover:bg-blue-600 transition-colors duration-200 ease-in-out"
                        onClick={handleLogout}
                    >
                        Log ud
                    </button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
}