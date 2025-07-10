<?php

namespace App\Http\Controllers;

use App\Models\Parking;
use App\Http\Requests\StoreParkingRequest;
use App\Http\Requests\UpdateParkingRequest;

class ParkingController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        return response()->json(Parking::all(), 200);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreParkingRequest $request)
    {
        $validated = $request->validated();
        $record = Parking::create($validated);

        return response()->json($record, 201);
    }

    /**
     * Display the specified resource.
     */
    public function show(Parking $parking)
    {
        return response()->json($parking, 200);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateParkingRequest $request, string $id)
    {
        $validated = $request->validated();
        $parking = Parking::findOrFail($id);
        $parking->update($validated);

        return response()->json($parking, 200);
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
