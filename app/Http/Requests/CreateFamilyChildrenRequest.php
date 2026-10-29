<?php

namespace App\Http\Requests;

use Illuminate\Contracts\Validation\ValidationRule;
use Illuminate\Foundation\Http\FormRequest;

class CreateFamilyChildrenRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
        return [
            'familyId' => ['required', 'integer'],
            'children' => ['required', 'array'],
            'children.*.gender' => ['required'],
            'children.*.firstName' => ['required', 'string'],
            'children.*.middleName' => ['nullable', 'string'],
            'children.*.lastName' => ['required', 'string'],
            'children.*.ageYears' => ['required', 'integer', 'min:0'],
            'children.*.ageMonths' => ['nullable', 'integer', 'min:0'],
            'children.*.ageWeeks' => ['nullable', 'integer', 'min:0'],
            'children.*.needsUserLogin' => ['nullable', 'boolean'],
            'children.*.userEmail' => ['nullable', 'email'],
        ];
    }
}
