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
            'abortion' => $this->abortionRules($step),
            'stillbirth' => $this->stillbirthRules($step),
            'parenting' => $this->parentingRules($step),
            default => []
        };
    }

    private function abortionRules(string $step): array
    {
        return match($step) {
            "one" => [
                "data.name" => "required|string",
                "data.age" => "required|integer",
                "data.ageOfPartner" => "nullable|integer",
                "data.gender" => "required|string"
            ],
            "two" => [
                "data.abortionWeeks" => "required|integer",
                "data.abortionMethod" => "required|string",
                "data.hasBeenConsultedByDoctor" => "required|boolean",
                "data.hasDoctorsPermit" => "required|boolean"
            ],
            "three" => [
                "data.needsInterpreter" => "required|boolean",
            ],
            "four" => [
                "data.wantsSupportConversation" => "required|boolean",
            ],
            "five" => [
                "data.knowsConfidentialityRights" => "required|boolean",
            ],
            "six" => [
                "data.wantsContraceptionInfo" => "required|boolean",
            ],
            "seven" => [
                "data.needsPostpartumSupportInfo" => "required|boolean",
            ],
            "eight" => [
                "data.wantsToBeContacted" => "required|boolean",
                "data.contactEmail" => "required_if:data.wantsToBeContacted,true|email",
            ],
            default => []
        };
    }

    private function stillbirthRules(string $step): array
    {
        return match($step) {
            "one" => [
                "data.name" => "required|string",
                "data.age" => "required|integer",
                "data.ageOfPartner" => "nullable|integer",
                "data.gender" => "required|string"
            ],
            "two" => [
                "data.weekNumber" => "required|integer",
                "data.hasDoctorsPermit" => "required|boolean",
                "data.hasBeenConsultedByDoctor" => "required|boolean",
            ],
            "three" => [
                "data.needsToPlanFuneral" => "required|boolean",
            ],
            "four" => [
                "data.hasReceivedDeathCertificate" => "required|boolean",
            ],
            "five" => [
                "data.hasReceivedDeathCertificate" => "required|boolean",
            ],
            "six" => [
                "data.wantsInformationAboutAutopsy" => "required|boolean",
            ],
            "seven" => [
                "data.hasOtherChildrenAtHome" => "required|boolean",
            ],
            "eight" => [
                "data.knowsSupportOptions" => "required|boolean",
            ],
            "nine" => [
                "data.informedAboutBereavementLeave" => "required|boolean",
            ],
            "ten" => [
                "data.needsHelpApplyingForBereavementLeave" => "required|boolean",
            ],
            default => []
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