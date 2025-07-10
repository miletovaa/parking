<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class StoreReservationRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        $parking_id = $this->input('parking_id');
        $is_user_attached = $this->user()->parkings->contains($parking_id);

        return $this->user()->isSuperAdmin()
            || ($this->user()->hasRole('admin') && $is_user_attached)
            || ($this->user()->hasRole('moderator') && $is_user_attached)
            || $this->user()->hasRole('client');
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, \Illuminate\Contracts\Validation\ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
        return [
            'parking_id' => 'required|exists:parkings,id',
            'user_id' => 'required|exists:users,id',
            'license_plate' => 'required|string|max:20',
            'datetime_from' => 'required|date',
            'datetime_to' => 'required|date|after:datetime_from',
            'price' => 'required|numeric|min:0',
            'payment_method' => 'required|in:cash,online,bank_transfer',
            'status' => 'required|in:pending,confirmed,cancelled,finished',
            'note' => 'nullable|string|max:1000',
        ];
    }
}
