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
        $familyMembers = $this->familyMemberRepository->findAllFamilyMembers($familyId);
        return inertia('Profile/Notes/Index', [
            'family' => $familyMember,
            'familyMembers' => $familyMembers,
        ]);
    }

    public function show(Note $note)
    {
        $family = auth()->user ? auth()->user->family : null;
        return inertia('Profile/Notes/Show', [
            'family' => $family,
            'note' => $note,
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
