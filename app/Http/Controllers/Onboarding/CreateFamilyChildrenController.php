<?php

namespace App\Http\Controllers\Onboarding;

use App\Http\Controllers\Controller;

use App\Http\Requests\CreateFamilyChildrenRequest;

use App\Actions\Onboarding\CreateFamilyChildren;
use App\Contracts\FamilyRepositoryContract;
use App\Contracts\FamilyServiceContract;

class CreateFamilyChildrenController extends Controller
{

    public function __construct(private FamilyRepositoryContract $familyRepository)
    {
    }

    /**
     * Handle the incoming request.
     */
    public function __invoke(CreateFamilyChildrenRequest $request)
    {
        if ( ! $request->json() ) {
            return response()->json(['message' => 'Invalid JSON request'], 400);
        }

        $familyId = $request->input('familyId');
        $children = $request->input('children');

        if (empty($children) || !is_array($children)) {
            return response()->json(['message' => 'Invalid children data'], 400);
        }

        // check if the family already has children
        // if the family already has children, return an response to let the onboarding flow know to continue without adding more children
        if ( $this->familyRepository->hasCreatedFamilyChildren($familyId) ) {
            return response()->json(['message' => 'Family already has children'], 400);
        }

        $action = new CreateFamilyChildren(
            app(FamilyServiceContract::class)
        );

        $action->handle($familyId, $children);

        // Process the children data here
        return response()->json(['message' => 'Children data processed successfully', 'children' => $children], 201);
    }
}
