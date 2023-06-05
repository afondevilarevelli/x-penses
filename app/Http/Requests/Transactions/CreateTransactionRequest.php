<?php

namespace App\Http\Requests\Transactions;

use DebugBar\DebugBar;
use Illuminate\Foundation\Http\FormRequest;

class CreateTransactionRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        $account_id = request()['account_id'];
        if (!$account_id)
            return false;

        return $this->user()->accounts()->where('id', $account_id)->count() == 1;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, \Illuminate\Contracts\Validation\ValidationRule|array|string>
     */
    public function rules(): array
    {
        return [
            'amount' => ['numeric', 'between:-9999999999,9999999999', 'required'],
            'description' => ['string', 'max:100', 'nullable'],
            'type' => ['in:INCOME,EXPENSE', 'required'],
            'date' => ['date', 'required'],
            'notes' => ['string', 'max:100', 'nullable'],
            'currency' => ['string', 'max:15', 'required'],
            'account_id' => ['exists:accounts,id', 'required'],
            'category_id' => ['exists:categories,id', 'required'],
        ];
    }
}