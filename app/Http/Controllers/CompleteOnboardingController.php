<?php

namespace App\Http\Controllers;

use Illuminate\Http\JsonResponse;

use Illuminate\Http\Request;
use App\Http\Requests\CompleteOnboardingRequest;

class CompleteOnboardingController extends Controller
{
    /**
     * Handle the incoming request.
     * @param  \App\Http\Requests\CompleteOnboardingRequest  $request
     * @return \Illuminate\Http\JsonResponse
     */
    public function __invoke(CompleteOnboardingRequest $request): JsonResponse
    {
        $user = $request->user();
        $steps = $request->input('steps', []);
        $completedSteps = $request->input('completed_steps', []);
        $pregnancy_week = $request->input('steps.4.data.stepFive.pregnancy_week_number', null);
        $situation_date = $request->input('steps.3.data.stepFour.situation_date');

        if ( ! $user ) {
            return response()->json([
                'message' => 'Unauthorized, please log in to complete onboarding.'
            ], 401);
        }
        
        foreach ($steps as $step) {
            $isCompleted = $step['progress']['completed'] ?? false;
            $stepName = $step['name'] ?? 'unknown';
            
            // if the step is not completed and it is in the completed steps, return an error
            if ( in_array($stepName, $completedSteps) && ! $isCompleted ) {
                return response()->json([
                    'message' => 'Onboarding incomplete, please complete all steps.',
                    'missing_step' => $stepName
                ]);
            }
        }
        
        $preparedTodos = [];

        $todos = $user->todos()->get();

        if ( ! $todos->isEmpty() ) {
            return response()->json([
                'message' => 'Onboarding already completed.',
                'todos' => $todos
            ]);
        }
        
        if ( $request->get('steps')[1]['data']['stepTwo']['checks'] ) {
            $checks = $request->get('steps')[1]['data']['stepTwo']['checks'];
            $preparingTodos = $this->initializeTodos($checks, $situation_date, $pregnancy_week);

            $preparedTodos = array_merge($preparedTodos, $preparingTodos);
            $user->todos()->createMany($preparedTodos);
        }

        return response()->json([
            'message' => 'Onboarding completed successfully.'
        ]);
    }
    /**
     * Check if the user is authenticated.
     *
     * @param Request $request
     * @return JsonResponse
     */
    public function checkAuthenticated(Request $request): JsonResponse
    {
        if ( ! $request->user() ) {
            return response()->json([
                'message' => 'Not authenticated',
                'status' => false
            ], 401);
        }

        return response()->json([
            'message' => 'Authenticated',
            "status" => true
        ], 200);
    }

    /**
     * Store todos for the user.
     *
     * @param Request $request
     * @return JsonResponse
     */
    public function storeTodos(Request $request): JsonResponse
    {
        $user = $request->user();
        $steps = $request->input('steps', []);
        $pregnancy_week = $request->input('steps.4.data.stepFive.pregnancy_week_number', null);
        $situation_date = $request->input('steps.3.data.stepFour.situation_date');

        $existingTodos = $request->user()->todos()->get(); // returns null ?

        dd($user);

        if ( ! $existingTodos->isEmpty() ) {
            return response()->json([
                'message' => 'Todos already exist for this user.',
                'todos' => $existingTodos
            ])->setStatusCode(200, 'Todos already exist.')->withHeaders([
                'Content-Type' => 'application/json',
                'Cache-Control' => 'no-cache, no-store, must-revalidate',
            ]);
        }

        $preparedTodos = $this->initializeTodos(
            $steps[1]['data']['stepTwo']['checks'] ?? [],
            $situation_date,
            $pregnancy_week
        );

        $user->todos()->createMany($preparedTodos);

        return response()->json([
            'message' => 'Todos initialized successfully.',
            'todos' => $user->todos()->get()
        ])->setStatusCode(201, 'Todos created successfully.')->withHeaders([
            'Content-Type' => 'application/json',
            'Cache-Control' => 'no-cache, no-store, must-revalidate',
        ]);
    }

    /**
     * Store pages for the user.
     *
     * @param Request $request
     * @return JsonResponse
     */
    public function storePages(Request $request): JsonResponse
    {
        $user = $request->user();

        $existingPages = $user->pages()->get();

        if ( $existingPages->isNotEmpty() ) {
            return response()->json([
                'message' => 'Pages already exist for this user.',
                'pages' => $existingPages
            ])->setStatusCode(200, 'Pages already exist.')->withHeaders([
                'Content-Type' => 'application/json',
                'Cache-Control' => 'no-cache, no-store, must-revalidate',
            ]);
        }
    
        // default pages to be created
        return response()->json([
            'message' => 'Pages stored successfully.',
            'pages' => $user->pages()->get()
        ])->setStatusCode(201, 'Pages created successfully.')->withHeaders([
            'Content-Type' => 'application/json',
            'Cache-Control' => 'no-cache, no-store, must-revalidate',
        ]);
    }

    /**
     * Initialize todos based on the answers provided.
     *
     * @param array $answers
     * @return array
     */
    private function initializeTodos(
        array $answers = [], 
        ?string $situation_date = "", 
        ?int $pregnancy_week = null
    ): array
    {
        if ( ! $answers ) {
            return [];
        }

        if ( ! $situation_date ) {
            return [];
        }

        if ( in_array('deathborn', $answers) || in_array('abort', $answers) && $pregnancy_week >= 22 ) {
            return [
                [
                    'title' => 'Anmeldelse af dødfødsel',
                    'description' => 'Hvis du har mistet et barn, kan du anmelde dødfødsel til myndighederne. Dette kan gøres online eller ved at henvende dig til kirkekontoret i dit kirkesogn.',
                    'is_completed' => false,
                    'link' => 'https://www.borger.dk/borger/boern-og-unge/boern-og-unge/boern-og-unge/boern-og-unge/dodfodsel',
                    'completed_at' => null
                ],
                [
                    'title' => 'Registrering af forældreskab',
                    'description' => 'Hvis du ikke er gift med barnets anden forælder, skal du registrere forældreskabet. Dette kan gøres online eller ved at henvende dig til kommunen.',
                    'is_completed' => false,
                    'link' => 'https://www.borger.dk/borger/boern-og-unge/boern-og-unge/boern-og-unge/boern-og-unge/forældreskab',
                    'completed_at' => null
                ]
            ];
        }

        return [];
    }
}
