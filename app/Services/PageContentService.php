<?php 

namespace App\Services;

use App\Contracts\PageContentContract;

abstract class PageContentService {
    public string $context; // defines the scenario context 
    public string $scenario;

    public function getContext() {
        return $this->context;
    }
    
    public function setContext($context) {
        $this->context = $context;
    }
    
    abstract function buildContextData();
    abstract function handle();
}