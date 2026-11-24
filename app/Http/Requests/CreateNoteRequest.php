<?php

namespace App\Http\Requests;

use Illuminate\Contracts\Validation\ValidationRule;
use Illuminate\Foundation\Http\FormRequest;

class CreateNoteRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        return auth()->check() ? true : false;
    }

    public function messages(): array
    {
        return [
            'title.required' => 'The title field is required.',
            'note_content.required' => 'The note content field is required.',
            'type.string' => 'The type field must be a string.',
            'is_important.boolean' => 'The is important field must be true or false.',
            'is_archived.boolean' => 'The is archived field must be true or false.',
        ];
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
        return [
            'title' => 'required|string|max:255',
            'note_content' => 'required|string',
            'type' => 'nullable|string|max:255',
            'is_important' => 'nullable|boolean',
            'is_archived' => 'nullable|boolean',
        ];
    }
}
