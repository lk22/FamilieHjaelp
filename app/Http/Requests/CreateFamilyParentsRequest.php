<?php

namespace App\Http\Requests;

use Illuminate\Contracts\Validation\ValidationRule;
use Illuminate\Foundation\Http\FormRequest;

class CreateFamilyParentsRequest extends FormRequest
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
            'mainParent.firstName.required' => 'Main parent first name is required',
            'mainParent.lastName.required' => 'Main parent last name is required',
            'mainParent.hasPartner.required' => 'Main parent has partner field is required',
            'mainParent.hasPartner.boolean' => 'Main parent has partner field must be a boolean',
            'partner.firstName.required' => 'Partner first name is required',
            'partner.lastName.required' => 'Partner last name is required',
            'partner.partnerNeedsUser.required' => 'Partner needs user field is required',
            'partner.partnerNeedsUser.boolean' => 'Partner needs user field must be a boolean',
            'partner.partnerUserEmail.required' => 'Partner user email is required',
            'partner.partnerUserEmail.email' => 'Partner user email must be a valid email',
            'familyId.required' => 'Family ID is required',
            'familyId.integer' => 'Family ID must be an integer',
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
            // 'familyId' => ['required', 'integer'],
            // 'mainParent.firstName' => ['required', 'string', 'max:255'],
            // 'mainParent.lastName' => ['required', 'string', 'max:255'],
            // 'mainParent.hasPartner' => ['required', 'boolean'],
            // 'partner.firstName' => ['required', 'string', 'max:255'],
            // 'partner.lastName' => ['required', 'string', 'max:255'],
            // 'partner.partnerNeedsUser' => ['required', 'boolean'],
            // 'partner.partnerUserEmail' => ['required', 'email']
        ];
    }
}
