<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Http\JsonResponse;

use Illuminate\Auth\Access\Gate;

use App\Models\Todo;

class TodoApiController extends Controller
{
    /**
     * Toggle the completion status of a todo item.
     *
     * @param  int  $id
     * @return \Illuminate\Http\JsonResponse
     */
    public function toggle($id): JsonResponse
    {
        Gate::authorize('update', Todo::class);

        $todo = Todo::find($id);     
        $todo->completed = !$todo->completed;
        $todo->save();

        if ( ! $todo->count() ) {
            return response()->json([
                'message' => 'Todo not found.',
            ], 404);
        }

        return response()->json([
            'message' => 'Todo status updated successfully.',
            'todo' => $todo
        ], 200);
    }
}
