<?php

namespace App\Contracts;

interface PageContentContract {
    /**
     * Handle method for the service
     *
     * @param $subject string
     * @param $context mixed
     *
     * @return void
     */
    public function handle(string $subject, mixed $context): void;
}