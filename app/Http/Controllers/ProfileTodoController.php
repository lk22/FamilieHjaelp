<?php

namespace App\Http\Controllers;

use Illuminate\Http\JsonResponse;
use Illuminate\Http\RedirectResponse;

use App\Http\Requests\ToggleTodoRequest;

use App\Models\Todo;

class ProfileTodoController extends Controller
{
    /**
     * Toggle the completion status of a todo item.
     *
     * @param  int  $id
     * @return \Illuminate\Http\JsonResponse
     */
    public function toggle(ToggleTodoRequest $request, $id): JsonResponse|RedirectResponse
    {
        $todo = Todo::findOrFail($id);

        if ( ! $request->validated() ) {
            return response()->json([
                'message' => 'Invalid request.',
            ], 422);
        }
        
        if ( ! $todo->count() ) {
            return response()->json([
                'message' => 'Todo not found.',
            ], 404);
        }
     
        $todo->is_completed = !$todo->is_completed;
        $todo->save();

        if ( $todo->is_completed ) {
            // is it the first completed todo?
            $completedTodosCount = Todo::where('user_id', $todo->user_id)
                ->where('is_completed', true)
                ->count();

                if ( $completedTodosCount === 1 ) {
                    // @TODO: dispatch first completed todo mail event
                }
        }

        return redirect()->route('profile.todos')->with([
            'message' => 'Todo status updated successfully.',
            'todo' => $todo
        ]);
    }
}