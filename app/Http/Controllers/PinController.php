<?php
namespace App\Http\Controllers;

use App\Models\PinPeriod;
use App\Models\Registrant;
use App\Http\Requests\StoreRegistrantRequest;
use Inertia\Inertia;
use Illuminate\Http\Request;

class PinController extends Controller
{
    public function landing()
    {
        $pinPeriod = PinPeriod::latest()->first();

        return Inertia::render('LandingPage', [
            'pinPeriod' => $pinPeriod,
        ]);
    }

    public function ambilPin(StoreRegistrantRequest $request)
    {
        $period = PinPeriod::latest()->first();

        if (!$period || now()->lt($period->start_date) || now()->gt($period->end_date)) {
            return back()->withErrors(['periode' => 'Pengambilan PIN belum dibuka atau sudah ditutup.']);
        }

        $validated = $request->validated();
        $pin = $this->generateUniquePin();

        $registrant = Registrant::create([
            'nama' => $validated['nama'],
            'nisn' => $validated['nisn'],
            'asal_sekolah' => $validated['asal_sekolah'],
            'nomor_hp' => $validated['nomor_hp'],
            'email' => $validated['email'],
            'pin' => $pin,
            'tanggal_registrasi' => now(),
        ]);

        return Inertia::render('PinResult', ['pin' => $registrant->pin]);
    }


    public function cekPinPage()
    {
        return Inertia::render('CekPinPage');
    }

    public function cekPin(Request $request)
    {
        $request->validate(['nisn' => 'required']);

        $registrant = Registrant::where('nisn', $request->nisn)->first();

        if ($registrant) {
            return Inertia::render('PinResult', ['pin' => $registrant->pin]);
        } else {
            return back()->withErrors(['nisn' => 'NISN tidak ditemukan.']);
        }
    }

    private function generateUniquePin()
    {
        do {
            $pin = mt_rand(100000, 999999);
        } while (Registrant::where('pin', $pin)->exists());

        return $pin;
    }

}
