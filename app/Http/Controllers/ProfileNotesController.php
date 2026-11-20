<?php

namespace App\Http\Controllers;
use App\Models\Note;

use App\Repositories\FamilyMemberRepository;

use Illuminate\Http\Request;

class ProfileNotesController extends Controller
{

    public function __construct(private FamilyMemberRepository $familyMemberRepository) {}

    /**
     *
     * Display a listing of the profile notes.
     * @return \Inertia\Response
     */
    public function index(Request $request)
    {
        $familyMember = $this->familyMemberRepository->findByUserId($request->user()->id);
        $familyId = $familyMember->family_id;
        return inertia('Profile/Notes/Index', [
            'family' => $familyMember,
            'notes' => Note::where('family_id', $familyId)->get(),
        ]);
    }

    public function show(Note $note)
    {
        $note = $note;
        return inertia('Profile/Notes/Show', [
            'note' => $note,
            'familyMember' => $note->familyMember
        ]);
    }

    /**
     * Storing a new profile note
     *
     * @param Request $request
     * @return void
     */
    public function store(Request $request)
    {

    }

    /**
     * Updating a existing profile note
     *
     * @param Request $request
     * @return void
     */
    public function update(Request $request)
    {
        // Handle the update logic for the profile note here
    }

    /**
     * Archiving a existing profile note
     *
     * @return void
     */
    public function archive()
    {

    }

    public function destroy()
    {
        // Handle the destroy logic for the profile note here
    }
}
