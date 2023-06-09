<?php

namespace App\Http\Requests\Accounts;

use Illuminate\Foundation\Http\FormRequest;

class CreateAccountRequest extends FormRequest
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
     * @return array<string, \Illuminate\Contracts\Validation\ValidationRule|array|string>
     */
    public function rules(): array
    {
        return [
            'name' => ['string', 'max:50', 'required'],
            'color' => ['string', 'max:30', 'required'],
            'bank_id' => ['exists:banks,id', 'required'],
            'amount' => ['numeric', 'between:-9999999999,9999999999', 'required']
        ];
    }
}