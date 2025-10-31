<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class StoreProfileNoteRequest extends FormRequest
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
            'note_content.required' => 'Du skal udfylde indholdet af noten.',
            'note_content.string' => 'Din note skal være en gyldig tekststreng.',
            'note_content.max' => 'Din note må maksimalt være 1000 tegn lang.',
        ];
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, \Illuminate\Contracts\Validation\ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
        return [
            "note_content" => ["required", "string", "max:1000"], // ← Fixed max length to match frontend
            "user_id" => ["nullable", "integer"],
            "child_id" => ["nullable", "integer"],
        ];
    }
}
