<?php
namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class StoreRegistrantRequest extends FormRequest
{
    public function authorize(): bool
    {
        return true;
    }

    public function rules(): array
    {
        return [
            'nama' => 'required',
            'nisn' => 'required|unique:registrants',
            'asal_sekolah' => 'required',
            'nomor_hp' => 'required',
            'email' => 'required|email|unique:registrants',
            'tanggal_registrasi' => 'required|date', 
        ];
    }
}
