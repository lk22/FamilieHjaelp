<?php

namespace App\Contracts;

interface AppServiceContract {
    /**
     * Handle method for the service
     * 
     * @return void
     */
    public function handle(): void;
}