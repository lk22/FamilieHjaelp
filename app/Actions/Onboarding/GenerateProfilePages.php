<?php

namespace App\Actions\Onboarding;

use Lorisleiva\Actions\Concerns\AsAction;

class GenerateProfilePages
{
    use AsAction;

    /**
     * Generate the abort and deathborn pages for the user.
     *
     * @return array
     */
    public function handle(array $checks): array
    {  
        foreach($checks as $check) {
            if (in_array($check, ['abort', 'deathborn'])) {
                return $this->generateAbortionInformationPages();
            }

            if (in_array($check, ['abort']) || in_array($check, ['deathborn'])) {
                return $this->generateAbortionInformationPages();
            }

            if (in_array($checks, ['is_parents'])) {
                return $this->generateParentingInformationPages();
            }

            if ( in_array($checks, ['some_other_check']) ) {
                return $this->generateOtherInformationPages();
            }
        }

        return [];
    }

    private function generateParentingInformationPages(): array
    {
        return [];
    }

    private function generateOtherInformationPages(): array 
    {
        return [];
    }

    private function generateAbortionInformationPages(): array
    {
        return [
            [
                'title' => 'Sorgoverlov',
                'slug' => 'sorgoverlov',
                'page_title' => 'Sorgoverlov',
                'description' => 'Som forælder kan du have ret til orlov med dagpenge',
            ],
            [
                "title" => "Dødfødsel efter 22 svangerskabsuge",
                "slug" => "dødfødt-22-svangerskabsuge",
                "page_title" => "Praktisk information om dødfødt 22 svangerskabsuge",
                "description" => "Er dit barn dødfødt efter 22 svangerskabsuge?"
            ],
            [
                "title" => "Begravelses eller bisættelse",
                "slug" => "begravelse-eller-bisaettelse",
                "page_title" => "Begravelse eller bisættelse af dødfødt barn",
                "description" => "Skal du planlægge en begravelse eller bissætelse?"
            ],
            [
                "title" => "Har du oplevet eller venter du en abort?",
                "slug" => "har-du-oplevet-eller-venter-du-en-abort",
                "page_title" => "Abort i Danmark: Sådan er reglerne",
                "description" => "Få overblik over reglerne for abort i Danmark"
            ],
            [
                "title" => "Hvordan fortæller jeg det til andre?",
                "slug" => "hvordan-fortaeller-jeg-det-til-andre",
                "page_title" => "Hvordan fortæller jeg det til andre?",
                "description" => "Tips til at fortælle om din abort eller dødfødsel"
            ],
            [
                "title" => "Støtte og hjælp efter abort eller dødfødsel",
                "slug" => "stoette-og-hjaelp-efter-abort-eller-doedfoedsel",
                "page_title" => "Støtte og hjælp efter abort eller dødfødsel",
                "description" => "Find støtte og hjælp efter en abort eller dødfødsel"
            ],
            [
                "title" => "Hvordan håndterer jeg sorgen?",
                "slug" => "hvordan-haandterer-jeg-sorgen",
                "page_title" => "Hvordan håndterer jeg sorgen?",
                "description" => "Råd til at håndtere sorgen efter abort eller dødfødsel",
            ],
            [
                "title" => "Oplevet en dødfødsel?",
                "slug" => "oplevet-en-doedfoedsel",
                "page_title" => "Hvordan registrerer jeg mit barn?",
                "description" => "Få vejledning i at registrere dit barn efter dødfødsel",
            ],
            [
                "title" => "Registrering af forældreskab, hvordan gør jeg?",
                "slug" => "registrering-af-foraeldreskab",
                "page_title" => "Registrering af forældreskab, hvordan gør jeg?",
                "description" => "er du blevet forældre, er det vigtigt og vide hvordan du og din partner registrere jeres forældreskab til jeres barn"
            ]
        ];
    }
}