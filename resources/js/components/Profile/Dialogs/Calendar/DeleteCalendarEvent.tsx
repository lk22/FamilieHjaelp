import {
    Dialog,
    DialogHeader,
    DialogTitle,
    DialogContent,
    DialogFooter,
    DialogDescription
} from '@/components/ui/dialog';

interface DeleteCalendarEventProps {
  onDelete: () => void;
  isOpen: boolean;
  setDeleteDialogClose: () => void;
}

export default function DeleteCalendarEvent({ onDelete, isOpen, setDeleteDialogClose }: DeleteCalendarEventProps) {
  return (
    <Dialog open={isOpen} onClose={setDeleteDialogClose}>
      <DialogHeader>
        <DialogTitle>Delete Event</DialogTitle>
        <DialogDescription>
          Are you sure you want to delete this event?
        </DialogDescription>
      </DialogHeader>
      <DialogFooter>
        <button onClick={onDelete}>Delete</button>
      </DialogFooter>
    </Dialog>
  )
}