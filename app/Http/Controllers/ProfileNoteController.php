<?php

namespace App\Http\Controllers;

use App\Http\Requests\StoreProfileNoteRequest;
use App\Models\Note;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;

class ProfileNoteController extends Controller
{
    public function storeNote(StoreProfileNoteRequest $request)
    {
        $user = $request->user();

        $notesCount = $user->notes()->count();

        $user->update(['notes_count' => $notesCount + 1]);

        $user->notes()->create([
            'note_content' => $request->input('noteContent'),
            'child_id' => $request->input('child_id'),
            'created_at' => $request->input('created_at'),
        ]);

        return redirect()->back()->with('success', 'Din note er blevet oprettet');
    }

    /**
     * Delete a specific note.
     */
    public function destroy(Request $request, Note $note): RedirectResponse
    {
        $user = $request->user();

        if ($note->user_id !== $user->id) {
            return redirect()->back()->with('error', 'Du har ikke myndighed til at slette denne note.');
        }

        $note->delete();

        return redirect()->back()->with('success', 'Din note er nu fjernet');
    }
}
