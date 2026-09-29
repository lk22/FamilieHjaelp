<?php

namespace App\Services;

abstract class PageContentService
{
    public string $context; // defines the scenario context

    public string $scenario;

    public function getContext()
    {
        return $this->context;
    }

    public function setContext($context)
    {
        $this->context = $context;
    }

    abstract public function buildContextData();

    abstract public function handle();
}
