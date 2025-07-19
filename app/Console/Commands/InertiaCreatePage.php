<?php

namespace App\Console\Commands;

use Illuminate\Console\Command;

use Illuminate\Support\Str;

class InertiaCreatePage extends Command
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'inertia:create
                            {name : The name of the Inertia.js page}
                            {--framework=react : The framework to use for the page, defaults to "react"}
                            {--template=page : The template type for the page, e.g., "page", "component", "hook", "context"}
                            {--arg=* : Additional arguments for the page, e.g., props or context}';
    
    /**
     * The console command description.
    *
    * @var string
    */
    protected $description = 'Create a new Inertia.js page with a specified template and arguments';

    /**
     * Usage information for the command
     *
     * @var string
     */
    protected $usage = 'inertia:create --name=PageName --template=page --args={arg1: string, arg2: number}';

    /**
     * definition of supported templates and their paths
     *
     * @var array<string, string>
     * This allows for different templates like 'layout', 'component', hooks, etc.
     * The keys are the template names, and the values are the corresponding folder paths.
     */
    protected $templatePaths = [
        'page' => 'Pages',
        'component' => 'components',
        'hook' => 'hooks',
        'context' => 'contexts',
        'layout' => 'layouts'
    ];

    /**
     * Execute the console command.
     */
    public function handle()
    {
        $name = $this->argument('name');
        $template = $this->option('template');
        $args = $this->option('arg');
        $framework = $this->option('framework');

        $parsedArgs = [];
        foreach ($args as $arg) {
            if (strpos($arg, ':') !== false) {
                [$key, $type] = explode(':', $arg);
                $parsedArgs[trim($key)] = trim($type);
            }
        }

        $templateFolder = $this->templatePaths[$template] ?? 'Pages';

        // determine the file name based on the template type
        $fileName = $name . '.tsx';
        
        if ( $template === "hook" ) {
            $fileName = 'use' . $this->splitCapitalizedWords($name) . '.ts';
        }

        if ( ! $template === "hook" ) {
            $this->info("Creating Inertia.js {$template}: {$name} at {$fileName}" . PHP_EOL);
        } else {
            $this->info("Creating Inertia.js hook: use{$name} at {$fileName}" . PHP_EOL);
        }

        if ( empty($name) ) {
            $this->error("You must provide a name for the {$template}." . PHP_EOL . "Usage: " . $this->usage);
            return;
        }

        if (!array_key_exists($template, $this->templatePaths)) {
            $this->error("Unsupported template type: {$template}. Supported types are: " . implode(', ', array_keys($this->templatePaths)));
            return;
        }
        // Create the new Inertia.js page

        $folderPath = resource_path("js/{$templateFolder}");

        // if the page already exists, we will not overwrite it
        if (!is_dir($folderPath)) {
            mkdir($folderPath, 0755, true);
        }

        $completePath = $folderPath . "/{$fileName}";

        if ( file_exists($completePath) ) {
            if ( ! $template === "hook" ) {
                $this->error($template . " already exists: {$name}, see full path: {$completePath}" . PHP_EOL);
            } else {
                $this->error("Hook already exists: use{$name}, see full path: {$completePath}" . PHP_EOL);
            }
            return;
        }

        $this->info("Creating Inertia.js {$template}: {$name} at {$completePath}, Full path: {$completePath}" . PHP_EOL);

        // Create the new page file
        file_put_contents($completePath, $this->getReactTemplateStub($name, $template, $parsedArgs));

        if ( $framework === 'react' ) {
            $this->info("React Inertia.js {$template} created: {$name}");
        } else {
            $this->error("Unsupported framework: {$framework}. Only 'react' is supported at this time.");
            return;
        }

        $this->info("Inertia.js {$template} created: {$name}");
    }

    /**
     * Split the name into words based on capital letters and convert to lowercase with hyphens
     *
     * @param  string $name
     * @return string
     */
    private function splitCapitalizedWords(string $name): string
    {
        // Split the name into words based on capital letters
        $words = preg_split('/(?=[A-Z])/', $name);
        // Join the words with a hyphen and convert to lowercase
        return strtolower(implode('-', $words));
    }

    /**
     * Definition of the stub for a page template
     *
     * @param string $name
     * @param array ...$args
     * @return string
     */
    protected function getReactPageStub(string $name, array $args): string
    {
        $componentArguments = $this->buildPropertyParametersString($name, $args);
        $interfaceDefinition = $this->buildPropertyParametersInterface($name, $args);

        $stub = "
import { type SharedData } from '@/types';
import { Head, Link, usePage } from '@inertiajs/react';

{$interfaceDefinition['interfaceDefinition']}

export default function {$name}({$componentArguments}: " . $interfaceDefinition['interfaceName'] . ") {
    const { props } = usePage();

    return (
        <div>
            <Head title=\"{$name}\" />
            <h1>{$name} Page</h1>
            <p>Shared Data: {JSON.stringify(props)}</p>
            <p>Component Props: {JSON.stringify({$componentArguments})}</p>
            <Link href=\"/\">Go to Home</Link>
        </div>
    );
}";

        return $stub;
    }

    /**
     * getting component stub template
     *
     * @param string $name
     * @param array $args): string
     * @return string
     */
    protected function getReactComponentStub(string $name, array $args): stringtring
    {
        $componentArguments = $this->buildPropertyParametersString($name, $args);
        $interfaceDefinition = $this->buildPropertyParametersInterface($name, $args);

        $stub = "
/**
 * Inertia.js component for {$name}
 *
 * @param {$componentArguments} - The component props
 * @returns {JSX.Element} - The rendered component
 */
import React from 'react';

". $interfaceDefinition['interfaceDefinition'] . "

export default function {$name}({$componentArguments}): {$interfaceDefinition['interfaceName']} {
    return (
        <div>
            <h2>{$name} Component</h2>
        </div>
    );
}";

        return $stub;
    }

    /**
     * Getting the stub template for a custom hook
     *
     * @param string $name
     * @param array $args): string
     * @return string
     */
    protected function getReactHookStub(string $name, array $args): string
    {

        $stub = "

import { useState, useEffect, useCallback } from 'react';

export default function use{$name}() {
    const [data, setData] = useState(null);

    useEffect(() => {
        // Fetch or compute data here
    }, []);

    return data;
}";

        return $stub;
    }

    /**
     * getting the stub template for a context provider
     *
     * @param string $name
     * @param array $args): string
     * @return string
     */
    protected function getReactContextStub(string $name, array $args): string
    {
        $contextArguments = $this->buildPropertyParametersString($name, $args) ?? '';
        $interfaceDefinition = $this->buildPropertyParametersInterface($name, $args) ?? '';

        $stub = "
/**
 * Context for {$name}
 *
 * @param {$contextArguments} - The context arguments
 * @returns {JSX.Element} - The context provider
 */
import React, { createContext, useContext } from 'react';

". $interfaceDefinition . "

const {$name}Context = createContext({} as {$interfaceDefinition});

export const {$name}Provider: React.FC<{children: React.ReactNode}> = ({ children }) => {
    return (
        <{$name}Context.Provider value={{{$contextArguments}}}>
            {children}
        </{$name}Context.Provider>
    );
};

export function use{$name}() {
    return useContext({$name}Context);
}";

        return $stub;
    }

        /**
     * getting a stub template for the specified Inertia.js page
     *
     * @param string $name
     * @param string $template
     * @param array $args): string
     * @return string
     */
    protected function getReactTemplateStub(string $name, string $template, array $args): string
    {
        return match($template) {
            'page' => $this->getReactPageStub($name, $args),
            'component' => $this->getReactComponentStub($name, $args),
            'hook' => $this->getReactHookStub($name, $args),
            'context' => $this->getReactContextStub($name, $args),
            'layout' => $this->getReactLayoutStub($name, $args),
            default => $this->error("Unsupported template type: {$template}"),
        };
    }

    /**
     * Building property parameters string for the stub template to include in the function parameters
     *
     * @param string $name
     * @param array $args
     * @return string
     */
    private function buildPropertyParametersString(string $name, array $args): string
    {
        if (count($args) === 0) {
            return '';
        }
        
        // get the keys of the args array
        $params = array_keys($args); 
        
        return (isset($args)) 
            ? '{' . implode(', ', $params) . ' }'
            : '';
    }

    /**
     * Building property parameters interface for the stub template
     *
     * @param string $name
     * @param array $args
     * @return string
     */
    private function buildPropertyParametersInterface(string $name, ?array $args = []): array
    {
        if (count($args) === 0) {
            return [];
        }
        
        $params = [];

        // format the interface in TypeScript style
        /**
         * interface ProfileOverviewTwoProps { 
         *     propOne: string;
         *     propTwo: number;
         * }
         */
        foreach($args as $akey => $arg) {
            $isType = $this->mapToTypeScriptType($arg);
            $params[] = PHP_EOL . "  {$akey}: {$isType}";
        }

        $returnArguments = (isset($args)) ? [
            'interfaceName' => "{$name}Props",
            'interfaceDefinition' => "interface {$name}Props { " . implode('; ', $params) . "; " . PHP_EOL ."}"
        ] : [];

        return $returnArguments;
    }

    /**
     * Mapping property types to TypeScript types
     *
     * @param  string $type
     * @return string
     */
    private function mapToTypeScriptType(string $type): string
    {
        return match($type) {
            'string' => 'string',
            'number' => 'number',
            'boolean' => 'boolean',
            'array' => 'any[]', // or specify a more specific type if needed
            'object' => 'Record<string, unknown>', // or specify a more specific type if needed
            'date' => 'Date',
            default => 'any', // Default to any for unsupported types
        };
    }
}
