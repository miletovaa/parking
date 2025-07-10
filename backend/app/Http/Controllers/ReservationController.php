<?php

namespace App\Http\Controllers;

use App\Http\Requests\StoreReservationRequest;
use App\Http\Requests\UpdateReservationRequest;
use App\Http\Resources\ReservationResource;
use App\Models\Reservation;
use Illuminate\Http\Request;

class ReservationController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(?Request $request)
    {
        $perPage = $request->query('per_page', default: 20);
        return ReservationResource::collection(
            Reservation::paginate($perPage)
        )->response();
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreReservationRequest $request)
    {
        $validated = $request->validated();
        $record = Reservation::create($validated);

        return ReservationResource::make(
            $record->fresh()
        )->response()->setStatusCode(201);
    }

    /**
     * Display the specified resource.
     */
    public function show(Reservation $reservation)
    {
        return ReservationResource::make($reservation)->response();
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateReservationRequest $request, Reservation $reservation)
    {
        $validated = $request->validated();
        $reservation->update($validated);
        return ReservationResource::make(
            $reservation->fresh()
        )->response();
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Reservation $reservation)
    {
        $reservation->delete();
        return response()->json(null, 204);
    }
}
