<?php

namespace App\Mail;

use App\Models\FamilyMember;
use App\Models\Family;

use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Mail\Mailable;
use Illuminate\Mail\Mailables\Attachment;
use Illuminate\Mail\Mailables\Content;
use Illuminate\Mail\Mailables\Envelope;
use Illuminate\Queue\SerializesModels;

class WelcomeOnboardMail extends Mailable implements ShouldQueue
{
    use Queueable, SerializesModels;

    /**
     * Create a new message instance.
     */
    public function __construct(
        private Family $family,
        private FamilyMember $familyMember
    )
    {
        //
    }

    /**
     * Get the message envelope.
     */
    public function envelope(): Envelope
    {
        return new Envelope(
            subject: 'Velkommen til familiehjælp',
        );
    }

    /**
     * Get the message content definition.
     */
    public function content(): Content
    {
        $fullName = $this->familyMember->first_name . ' ' . $this->familyMember->middle_name . ' ' . $this->familyMember->last_name;
        return new Content(
            view: 'emails.welcome_onboard',
            with: [
                'fullname' => $fullName,
                'family' => $this->family,
                'primaryEmail' => $this->familyMember->email,
            ],
        );
    }

    /**
     * Get the attachments for the message.
     *
     * @return array<int, Attachment>
     */
    public function attachments(): array
    {
        return [];
    }
}
