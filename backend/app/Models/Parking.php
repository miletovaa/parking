<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Parking extends Model
{
    protected $fillable = [
        'user_id',
        'name',
        'location',
        'description',
        'capacity',
        'is_active',
    ];

    protected $with = ['user', 'reservations'];

    public function user()
    {
        return $this->belongsTo(User::class);
    }

    public function reservations()
    {
        return $this->hasMany(Reservation::class);
    }
}
