<?php

namespace App\Http\Controllers;
use App\Models\Note;

use App\Repositories\FamilyMemberRepository;
use App\Services\NoteService;

use Illuminate\Http\Request;
use App\Http\Requests\UpdateNoteRequest;
use App\Http\Requests\CreateNoteRequest;

use App\Dto\UpdateNoteDto;
use App\Dto\CreateNoteDto;

use App\Repositories\NoteRepository;

class ProfileNotesController extends Controller
{

    public function __construct(
        private FamilyMemberRepository $familyMemberRepository,
        private NoteService $noteService,
        private NoteRepository $noteRepository
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

    public function create()
    {
        return inertia('Profile/Notes/Create');
    }


    /**
     * Storing a new profile note
     *
     * @param CreateNoteRequest $request
     * @return void
     */
    public function store(CreateNoteRequest $request)
    {
        dd($request);
        $createNoteDto = new CreateNoteDto(
            title: $request->input('title'),
            note_content: $request->input('note_content'),
            created_at: now(),
            updated_at: now(),
            type: $request->input('type') ?? null,
            locale: $request->input('locale') ?? env('APP_LOCALE'),
            is_important: $request->input('is_important') ?? false,
            is_archived: $request->input('is_archived') ?? false,
        );

        if (! $this->noteService->createNote($createNoteDto)) {
            return response()->json(['error' => 'Failed to create note']);
        }

        return redirect()->route('profile.notes.index');
    }

    public function update(UpdateNoteRequest $request, Note $note): \Illuminate\Http\RedirectResponse | \Illuminate\Http\JsonResponse
    {
        if (! $request->validated()) {
            return response()->json(['error' => 'Validation failed']);
        }

        $updateNoteDto = new UpdateNoteDto(
            id: $note->id,
            title: $request->input('title'),
            note_content: $request->input('note_content'),
            slug: $request->input('slug'),
            updated_at: now(),
            created_at: now()
        );

        if ( ! $this->noteService->updateNote($updateNoteDto) ) {
            return response()->json(['error' => 'Failed to update note']);
        }

        return redirect()->route('profile.notes.show', $note->slug);
    }

    /**
     * Archiving an existing profile note
     *
     * @param Note $note
     * @return \Illuminate\Http\RedirectResponse|\Illuminate\Http\JsonResponse
     */
    public function archive(Note $note): \Illuminate\Http\RedirectResponse | \Illuminate\Http\JsonResponse
    {
        if (!$this->noteService->archiveNote($note->id)) {
            return response()->json(['error' => 'Failed to archive note']);
        }

        return redirect()->route('profile.notes.index'); // Redirect to index as per requirement
    }

    /**
     * Deleting an existing profile note
     *
     * @param Note $note
     * @return \Illuminate\Http\RedirectResponse|\Illuminate\Http\JsonResponse
     */
    public function destroy(Note $note): \Illuminate\Http\RedirectResponse | \Illuminate\Http\JsonResponse
    {
        if (!$this->noteService->deleteNote($note->id)) {
            return response()->json(['error' => 'Failed to delete note']);
        }

        return redirect()->route('profile.notes.index'); // Redirect to index as per requirement
    }
}