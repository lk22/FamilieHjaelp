<?php

use Illuminate\Foundation\Inspiring;
use Illuminate\Support\Facades\Artisan;

Artisan::command('inspire', function () {
    $this->comment(Inspiring::quote());
})->purpose('Display an inspiring quote');

Artisan::command('session:clear', function() {

    $this->comment('Clearing sessions...'); 
    $sessions = \DB::table('sessions')->get();

    foreach ($sessions as $session) {
        echo "Clearing session ID: {$session->id}\n";
        \DB::table('sessions')->where('id', $session->id)->delete();
    }

    session()->flush();
    $this->info('Session cleared successfully.');
});
