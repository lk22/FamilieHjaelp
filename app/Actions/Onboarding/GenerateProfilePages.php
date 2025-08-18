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

            if ( in_array($checks, ['some_other_check']) ) {
                return $this->generateOtherInformationPages();
            }
        }

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
                "title" => "Dødfødsel efter 23 svangerskabsuge",
                "slug" => "dødfødt-23-svangerskabsuge",
                "page_title" => "Praktisk information om dødfødt 23 svangerskabsuge",
                "description" => "Er dit barn dødfødt efter 23 svangerskabsuge?"
            ],
            [
                "title" => "Begravelses eller bisættelse",
                "slug" => "begravelse-eller-bisaettelse",
                "page_title" => "Begravelse eller bisættelse af dødfødt barn",
                "description" => "Skal du planlægge en begravelse eller bissætelse?"
            ]
        ];
    }
}