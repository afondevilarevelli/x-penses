<?php

namespace App\Http\Requests\Transactions;

use Illuminate\Foundation\Http\FormRequest;

class EditTransactionRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        $transaction = $this->route('transaction');
        debug($transaction->account()->pluck('user_id')->firstOrFail());

        return $transaction &&
            $this->user()->id == $transaction->account()->pluck('user_id')->firstOrFail();
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