<?php

namespace App\Contracts;

interface AppServiceContract
{
    /**
     * Handle method for the service
     */
    public function handle(): void;
}
