<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Reservation extends Model
{
    protected $fillable = [
        'parking_id',
        'user_id',
        'license_plate',
        'datetime_from',
        'datetime_to',
        'price',
        'payment_method',
        'status',
        'note',
    ];

    protected $with = ['user', 'parking'];

    public function parking()
    {
        return $this->belongsTo(Parking::class);
    }

    public function user()
    {
        return $this->belongsTo(User::class);
    }
}
