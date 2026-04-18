<?php

namespace App\Notifications;

use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Notifications\Messages\MailMessage;
use Illuminate\Notifications\Notification;

use App\Models\Note;

class FirstNoteCreated extends Notification implements ShouldQueue
{
    use Queueable;

    /**
     * Create a new notification instance.
     */
    public function __construct(
        public Note $note,
        public int $totalNotesCount
    )
    {
        //
    }

    /**
     * Get the notification's delivery channels.
     *
     * @return array<int, string>
     */
    public function via(object $notifiable): array
    {
        return ['mail'];
    }

    /**
     * Get the mail representation of the notification.
     */
    public function toMail(object $notifiable): MailMessage
    {

        return (new MailMessage)
            ->subject('Dit første notat er oprettet!')
            ->greeting('Hej ' . $notifiable->name . '!')
            ->line('Tillykke med at have oprettet dit første notat på din profil.')
            ->line('Vi håber, at du finder denne funktion nyttig til at holde styr på vigtige oplysninger.')
            ->action('Gå til din profil', url('/profile'));
    }

    /**
     * Get the array representation of the notification.
     *
     * @return array<string, mixed>
     */
    public function toArray(object $notifiable): array
    {
        return [
            'note_id' => $this->note->id,
            'total_notes_count' => $this->totalNotesCount,
            'message' => 'Dit første notat er oprettet!',
        ];
    }
}
