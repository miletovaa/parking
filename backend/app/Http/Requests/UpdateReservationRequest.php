<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class UpdateReservationRequest extends FormRequest
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
        return [
            'parking_id' => 'sometimes|required|exists:parkings,id',
            'user_id' => 'sometimes|required|exists:users,id',
            'license_plate' => 'sometimes|required|string|max:20',
            'datetime_from' => 'sometimes|required|date',
            'datetime_to' => 'sometimes|required|date|after:datetime_from',
            'price' => 'sometimes|required|numeric|min:0',
            'payment_method' => 'sometimes|required|in:cash,online,bank_transfer',
            'status' => 'sometimes|required|in:pending,confirmed,cancelled,finished',
            'note' => 'nullable|string|max:1000',
        ];
    }
}
