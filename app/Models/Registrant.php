<?php
namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Registrant extends Model
{
    use HasFactory;

    protected $fillable = [
        'nama',
        'nisn',
        'asal_sekolah',
        'nomor_hp',
        'email',
        'ticket_code',
        'tanggal_pengambilan_pin',
        'nomor_antrian',
        'tanggal_registrasi',
    ];

}
