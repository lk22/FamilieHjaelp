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
            return response()->json(['code' => 400, 'error' => 'could not find parent, partner, or family ID'], 400);
        }

        if (! $parent ) {
            return response()->json(['code' => 400, 'error' => 'Parent is required'], 400);
        }

        if (! $partner ) {
            return response()->json(['error' => 'Partner is required'], 400);
        }

        if ($this->familyRepository->hasCreatedFamilyParents($familyId)) {
            return response()->json(['code' => 200,'message' => 'Familien har allerede forældre tilknyttet'], 200);
        }

        $action = new CreateFamilyParents(
            app(FamilyServiceContract::class)
        );

        $action->handle($familyId, [
            'parent' => $parent,
            'partner' => $partner,
        ]);

        return response()->json(['code' => 200, 'message' => 'Family associates created successfully'], 200);
    }
}
