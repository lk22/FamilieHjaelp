<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Http\JsonResponse;

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
        // return response()->json($request['steps'][0]['progress']['isCompleted'] ?? true, 200);
        $user = $request->user();
        $steps = $request->input('steps', []);
        $completedSteps = $request->input('completed_steps', []);
        
        $pregnancy_week = $request->input('steps.4.data.stepFive.pregnancy_week_number', null);

        
        if ( ! $user ) {
            return response()->json([
                'message' => 'Unauthorized, please log in to complete onboarding.'
            ], 401);
        }
        
        foreach ($steps as $step) {
            $isCompleted = $step['progress']['isCompleted'] ?? false;
            $stepName = $step['name'] ?? 'unknown';
            
            // if the step is not completed and it is in the completed steps, return an error
            if ( in_array($stepName, $completedSteps) && ! $isCompleted ) {
                return response()->json([
                    'message' => 'Onboarding incomplete, please complete all steps.',
                    'missing_step' => $stepName
                ]);
            }
        }
        
        $prepareTodos = [];
        
        // if the user has completed step one and the pregnancy week is set, create todos relevant todos 
        if ( $request->input('steps.1.data.stepOne.checks', false) ) {
            $checks = $request->input('steps.1.data.stepOne.checks', []);
            
            if ( 
                (in_array('deathborn', $checks) || in_array('abort', $checks)) ||
                (in_array('deathborn', $checks) || in_array('abort', $checks)) && $pregnancy_week >= 22 
                ) {
                    $prepareTodos = [
                        [
                            'title' => 'Anmeldelse af dødfødsel',
                        'description' => 'Hvis du har mistet et barn, kan du anmelde dødfødsel til myndighederne. dette kan gøres online eller ved at henvende dig til kirkekontoret i dit kirkesogn.',
                        'is_completed' => false,
                        'completed_at' => null
                    ],
                    [
                        "title" => "Registrering af forældreskab",
                        "description" => "Hvis du ikke er gift med barnets anden forælder, skal du registrere forældreskabet. Dette kan gøres online eller ved at henvende dig til kommunen.",
                        "is_completed" => false,
                        "completed_at" => null
                        ]
                    ];
            }
        }

        // creating the todos for the user
        $user->todos()->createMany($prepareTodos);
        // return response()->json($user, 200);

        return response()->json([
            'message' => 'Onboarding completed successfully.'
        ]);
    }
}
