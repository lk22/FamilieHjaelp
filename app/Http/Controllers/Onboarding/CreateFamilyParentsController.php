<?php

namespace App\Http\Controllers\Onboarding;

use App\Http\Controllers\Controller;

use Illuminate\Http\Request;

use App\Actions\Onboarding\CreateFamilyParents;
use App\Contracts\FamilyServiceContract;

use App\Http\Requests\CreateFamilyParentsRequest;

class CreateFamilyParentsController extends Controller
{

    public function __construct(private \App\Repositories\FamilyRepository $familyRepository) {}
    /**
     * Handle the incoming request.
     */
    public function __invoke(CreateFamilyParentsRequest $request)
    {
        $parent = $request->input('mainParent');
        $partner = $request->input('partner');
        $partnerNeedsUser = $request->input('partnerNeedsUser');
        $partnerUserEmail = $request->input('partnerUserEmail');
        $familyId = $request->input('familyId');

        if (!$parent || ! $partner || ! $familyId) {
            return response()->json(['error' => 'could not find parent, partner, or family ID'], 400);
        }

        if (! $parent ) {
            return response()->json(['error' => 'Parent is required'], 400);
        }

        if (! $partner ) {
            return response()->json(['error' => 'Partner is required'], 400);
        }

        if ($this->familyRepository->hasCreatedFamilyParents($familyId)) {
            return response()->json(['message' => 'Family already has members']);
        }

        // if ( ! $request->validated() ) {
        //     return response()->json(['error' => 'Validation failed'], 400);
        // }

        $action = new CreateFamilyParents(
            app(FamilyServiceContract::class)
        );

        $action->handle($familyId, [
            'parent' => $parent,
            'partner' => $partner,
        ]);

        return response()->json(['message' => 'Family associates created successfully'], 200);
    }
}
