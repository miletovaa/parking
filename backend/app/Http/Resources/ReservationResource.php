<?php

namespace App\Http\Resources;

use Carbon\Carbon;
use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class ReservationResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @return array<string, mixed>
     */
    public function toArray(Request $request): array
    {
        return [
            'id' => $this->id,
            'datetime_from' => $this->datetime_from,
            'datetime_to' => $this->datetime_to,
            'status' => $this->status,
            'license_plate' => $this->license_plate,
            'price' => $this->price,
            'payment_method' => $this->payment_method,
            'note' => $this->note,
            'created_at' => Carbon::parse($this->created_at)->format('Y-m-d H:i:s'),
            'updated_at' => Carbon::parse($this->updated_at)->format('Y-m-d H:i:s'),
            'user' => new UserResource($this->whenLoaded('user')),
            'parking' => new ParkingResource($this->whenLoaded('parking')),
        ];
    }
}
