<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class SubmitStepRequest extends FormRequest
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
     * @return array<string, \Illuminate\Contracts\Validation\ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
        $scenario = (string) $this->route('scenario');
        $step = (string) $this->route('step');

        return [
            'data' => ['required', 'array'],
            ...$this->stepRules($scenario, $step)
        ];
    }

    public function messages(): array
    {
        return [
            "data.*" => "Please provide valid input for all fields.",
            "data.*.required" => "The :attribute field is required.",
            "data.*.string" => "The :attribute field must be a string.",
            "data.*.required_if" => "The :attribute field is required when :other is :value.",
            "data.*.email" => "The :attribute field must be a valid email address"
        ];
    }

    protected function stepRules(string $scenario, string $step): array
    {
        return match("{$scenario}") {
            'family' => $this->familyRules($step),
            'parenting' => $this->parentingRules($step),
            default => []
        };
    }

    private function familyRules(string $step): array
    {
        return match ($step) {
            'one' => [
                'data.familyName' => 'required|string|max:255',
            ],
            'two' => [
                'data.name' => 'required|string|max:255',
                'data.age' => 'required|integer|min:0|max:120',
                'data.familyTitle' => 'required|string|max:255',
                'data.hasPartner' => 'required|boolean',
                'data.partnerName' => 'required_if:data.hasPartner,true|nullable|string|max:255',
                'data.partnerAge' => 'required_if:data.hasPartner,true|nullable|integer|min:0|max:120',
                'data.partnerFamilyTitle' => 'required_if:data.hasPartner,true|nullable|string|max:255',
                'data.partnerNeedsUser' => 'exclude_unless:data.hasPartner,true|nullable|boolean',
                'data.partnerUserName' => 'exclude_unless:data.hasPartner,true|required_if:data.partnerNeedsUser,true|nullable|string|max:255',
                'data.partnerUserEmail' => 'exclude_unless:data.hasPartner,true|required_if:data.partnerNeedsUser,true|nullable|email|max:255',
            ],
            'three' => [
                'data.kids' => 'required|array|min:1',
                'data.kids.*.gender' => 'required|string|in:male,female,other',
                'data.kids.*.name' => 'required|string|max:255',
                'data.kids.*.ageYears' => 'required|integer|min:0|max:25',
                'data.kids.*.ageMonths' => 'required|integer|min:0|max:11',
            ],
            default => [],
        };
    }

    private function parentingRules(string $step): array
    {
        return match($step) {
            "one" => [
                "data.birthDate" => "required|date",
            ],
            "two" => [
                "data.hasReturnedHome" => "required|boolean",
            ],
            "three" => [
                "data.isFirstChild" => "required|boolean",
            ],
            "fourth" => [
                "data.contactedByMidwifeOrHealthVisitor" => "required|boolean",
            ],
            "five" => [
                "data.childTestProcessPlanned" => "required|boolean",
            ],
            "six" => [
                "data.needsInfoOnParentalLeave" => "required|boolean",
            ],
            "seven" => [
                "data.knowsChildBenefitsAndCheckups" => "required|boolean",
            ],
            "eight" => [
                "data.wellbeingChallenges" => "required|boolean",
            ],
            "nine" => [
                "data.needsSupportForPostpartumIssues" => "required|boolean",
            ],
            "ten" => [
                "data.wantsToJoinParentGroups" => "required|boolean",
            ],
            "eleven" => [
                "data.hasPlannedDaycare" => "required|boolean",
            ],
            "twelve" => [
                "data.knowsHealthVisitorSchedule" => "required|boolean",
            ],
            "thirteen" => [
                "data.hasHealthConcerns" => "required|boolean",
            ],
            default => []
        };
    }
}