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

        // TODO: add dispatching event for sending notificiation to user if todo is the first completed todo

        return redirect()->route('profile.todos')->with([
            'message' => 'Todo status updated successfully.',
            'todo' => $todo
        ]);
    }
}
