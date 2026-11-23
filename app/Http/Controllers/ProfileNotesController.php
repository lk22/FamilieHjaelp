<?php

namespace App\Http\Controllers;
use App\Models\Note;

use App\Repositories\FamilyMemberRepository;
use App\Services\NoteService;

use Illuminate\Http\Request;
use App\Http\Requests\UpdateNoteRequest;

use App\Dto\UpdateNoteDto;

class ProfileNotesController extends Controller
{

    public function __construct(
        private FamilyMemberRepository $familyMemberRepository,
        private NoteService $noteService
    ) {}

    /**
     *
     * Display a listing of the profile notes.
     * @return \Inertia\Response
     */
    public function index(Request $request)
    {
        $familyMember = $this->familyMemberRepository->findByUserId($request->user()->id);
        $familyId = $familyMember->family_id;
        $notes = Note::where('family_id', $familyId)->get();
        return inertia('Profile/Notes/Index', [
            'family' => $familyMember,
            'notes' => $notes,
        ]);
    }

    public function show(Note $note)
    {
        $note = $note;
        return inertia('Profile/Notes/Show', [
            'note' => [
                "id" => $note->id,
                "title" => $note->title,
                "slug" => $note->slug,
                "note_content" => $note->note_content,
                "created_at" => \Carbon\Carbon::parse($note->created_at)->format('d/m-Y'),
                "formattedCreatedAt" => \Carbon\Carbon::parse($note->created_at)->diffForHumans(),
                "formattedUpdatedAt" => \Carbon\Carbon::parse($note->updated_at)->diffForHumans(),
                "family_member_id" => $note->family_member_id,
                "user_id" => $note->user_id,
                "created_by_member" => $note->member->name ?? null,
            ],
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
     * @param UpdateNoteRequest $request
     * @return \Illuminate\Http\JsonResponse
     */
    public function update(UpdateNoteRequest $request): \Illuminate\Http\JsonResponse
    {
        if (!$request->validated()) {
            return response()->json(['error' => 'Validation failed']);
        }

        $id = intval($request->input('id'));
        $title = htmlspecialchars($request->input('title'));
        $slug = htmlspecialchars($request->input('slug'));
        $noteContent = $request->input('note_content');
        // dd($noteContent);
        $updatedAt = htmlspecialchars($request->input('updated_at'));
        $createdAt = htmlspecialchars($request->input('created_at'));

        $updateNoteDto = new UpdateNoteDto(
            $id,
            $title,
            $slug,
            $noteContent,
            $updatedAt,
            $createdAt,
        );

        if ( ! $this->noteService->updateNote($updateNoteDto) ) {
            return response()->json(['error' => 'Failed to create note']);
        }

        return response()->json(['message' => 'Note updated successfully']);
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
