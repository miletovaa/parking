<?php

namespace App\Http\Controllers;

use App\Models\Parking;
use App\Http\Resources\ParkingResource;
use App\Http\Requests\StoreParkingRequest;
use App\Http\Requests\UpdateParkingRequest;

class ParkingController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        return ParkingResource::collection(
            Parking::with(['reservations'])->paginate(20)
        )->response();
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreParkingRequest $request)
    {
        $validated = $request->validated();
        $parking = Parking::create($validated)->refresh();

        return ParkingResource::make(
            $parking->fresh()
        )->response()->setStatusCode(201);
    }

    /**
     * Display the specified resource.
     */
    public function show(Parking $parking)
    {
        return ParkingResource::make(
            $parking->load(['reservations'])
        )->response();
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateParkingRequest $request, Parking $parking)
    {
        $validated = $request->validated();
        $parking->update($validated);
        return ParkingResource::make(
            $parking->fresh()->load(['reservations'])
        )->response();
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Parking $parking)
    {
        $parking->delete();
        return response()->json(null, 204);
    }
}
