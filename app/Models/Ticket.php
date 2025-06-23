<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Ticket extends Model
{
    use HasFactory;

    protected $fillable = [
        'nama',
        'nisn',
        'asal_sekolah',
        'nomor_hp',
        'email',
        'tanggal_registrasi',
        'nomor_tiket',
    ];
}
