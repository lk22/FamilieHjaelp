<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Http\RedirectResponse;

use App\Http\Requests\StoreProfileNoteRequest;

use App\Models\Note;

class ProfileNoteController extends Controller
{
    public function storeNote(StoreProfileNoteRequest $request)
    {   
        Note::create([
            'note_content' => $request->input('noteContent'),
            'user_id' => $request->user()->id,
            'child_id' => $request->input('child_id'),
            'created_at' => $request->input('created_at'),
        ]);

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
            return redirect()->back()->with('error', 'Du har ikke myndighed til at slette denne note.');
        }

        $note->delete();

        return redirect()->back()->with('success', 'Din note er nu fjernet');
    }
}
