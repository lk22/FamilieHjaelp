<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

use App\Http\Requests\CreateFamilyChildrenRequest;

use App\Actions\Onboarding\CreateFamilyChildren;
use App\Contracts\FamilyServiceContract;

class CreateFamilyChildrenController extends Controller
{
    /**
     * Handle the incoming request.
     */
    public function __invoke(CreateFamilyChildrenRequest $request)
    {
        if ( ! $request->json() ) {
            return response()->json(['message' => 'Invalid JSON request'], 400);
        }

        $children = $request->input('children');

        if (empty($children) || !is_array($children)) {
            return response()->json(['message' => 'Invalid children data'], 400);
        }

        $action = new CreateFamilyChildren(
            app(FamilyServiceContract::class)
        );

        $action->handle($children);

        // Process the children data here
        return response()->json(['message' => 'Children data processed successfully', 'children' => $children], 200);
    }
}
