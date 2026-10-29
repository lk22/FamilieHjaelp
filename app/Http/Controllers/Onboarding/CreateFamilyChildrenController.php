<?php

namespace App\Http\Controllers\Onboarding;

use App\Http\Controllers\Controller;

use App\Http\Requests\CreateFamilyChildrenRequest;
use Illuminate\Http\JsonResponse;
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
     * @param CreateFamilyChildrenRequest $request
     * @return JsonResponse
     */
    public function __invoke(CreateFamilyChildrenRequest $request): JsonResponse
    {
        $familyId = $request->input('familyId');
        $children = $request->input('children');

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
