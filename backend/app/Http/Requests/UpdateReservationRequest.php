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
        $parking_id = $this->input('parking_id');
        $reservation_id = $this->route('id');
        $is_user_attached = $this->user()->parkings->contains($parking_id);
        $is_client_attached = $this->user()->reservations->contains($reservation_id);

        return $this->user()->isSuperAdmin()
            || ($this->user()->hasRole('admin') && $is_user_attached)
            || ($this->user()->hasRole('moderator') && $is_user_attached)
            || ($this->user()->hasRole('client') && $is_client_attached);
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
