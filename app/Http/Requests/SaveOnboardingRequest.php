<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class SaveOnboardingRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        return true;
    }

    public function messages(): array
    {
        return [
            "step.one.name.required" => "Dit navn er påkrævet",
            "step.two.situation.required" => "du skal angive en situation du er i",
            "step.two.otherDescription.required" => "Beskriv den situation du er i",
            "step.three.situation_date.required" => "Dato for situationen er påkrævet"
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
            "step" => [
                "one" => ["name" => "required"],
                "thwo" => [
                    "situation" => "required",
                    "otherDescription" => "required_if:situation,other"
                ],
                "three" => [
                    "situation_date" => "required"
                ],
            ],
        ];
    }
}
