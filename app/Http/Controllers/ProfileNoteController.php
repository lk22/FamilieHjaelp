<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Http\RedirectResponse;

use App\Http\Requests\StoreProfileNoteRequest;
use App\Models\Note;

use Illuminate\Support\Facades\Log;

class ProfileNoteController extends Controller
{
    public function storeNote(StoreProfileNoteRequest $request)
    {
        Log::info('Raw request data:', $request->all());

        $validatedData = $request->validated();
        Log::info('Validated data:', $validatedData);

        $created = Note::create([
            'note_content' => $request->input('noteContent'),
            'user_id' => $request->input('user_id'),
            'child_id' => $request->input('child_id'),
            'created_at' => $request->input('created_at'),
        ]);

        Log::info('Created Note:', $created->toArray());
        return redirect()->back()->with('success', 'Din note er blevet oprettet');
    }

    /**
     * Delete a specific note.
     * 
     * @param  Request  $request
     * @param  Note  $note
     * @return \Illuminate\Http\RedirectResponse
     */
    public function destroy(Request $request, Note $note): RedirectResponse
    {
        $user = $request->user();

        if ($note->user_id !== $user->id) {
            return redirect()->back()->with('error', 'You are not authorized to delete this note.');
        }

        $note->delete();

        return redirect()->back()->with('success', 'Note deleted successfully!');
    }
}
