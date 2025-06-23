<?php

namespace App\Http\Controllers;

use App\Models\PinPeriod;
use App\Models\Registrant;
use App\Http\Requests\StoreRegistrantRequest;
use Inertia\Inertia;
use Illuminate\Http\Request;
use Carbon\Carbon;
use Illuminate\Support\Str;

class TicketController extends Controller
{
    public function landing()
    {
        $pinPeriod = PinPeriod::latest()->first();

        $dates = [];
        if ($pinPeriod && $pinPeriod->max_ticket_per_day > 0) {
        $start = Carbon::parse($pinPeriod->start_date);
        $end = Carbon::parse($pinPeriod->end_date);

        while ($start->lte($end)) {
            $count = Registrant::where('tanggal_pengambilan_pin', $start->toDateString())->count();

            if ($count < $pinPeriod->max_ticket_per_day) {
                $dates[] = $start->toDateString();
            }

            $start->addDay();
        }
    }

    return Inertia::render('LandingPage', [
        'pinPeriod' => $pinPeriod,
        'availableDates' => $dates,
    ]);
    }

    public function ambilTiket(StoreRegistrantRequest $request)
    {
        $pinPeriod = PinPeriod::latest()->first();

        if (!$pinPeriod) {
            return back()->withErrors(['periode' => 'Periode pengambilan tiket belum diatur.']);
        }

        if (now()->lt($pinPeriod->start_date) || now()->gt($pinPeriod->end_date)) {
            return back()->withErrors(['periode' => 'Periode pengambilan tiket tidak berlaku.']);
        }

        // Validasi apakah tanggal dipilih
        if (!$request->tanggal_registrasi) {
            return back()->withErrors(['tanggal_registrasi' => 'Silakan pilih tanggal pengambilan.']);
        }

        // Cek apakah kuota tanggal tersebut penuh
        $jumlahTiketTanggal = Registrant::where('tanggal_pengambilan_pin', $request->tanggal_registrasi)->count();
        if ($jumlahTiketTanggal >= $pinPeriod->max_ticket_per_day) {
            return back()->withErrors(['tanggal_registrasi' => 'Kuota tiket pada tanggal ini sudah penuh.']);
        }

        // Cek apakah siswa sudah mendaftar
        $existing = Registrant::where('nisn', $request->nisn)->first();
        if ($existing) {
            return Inertia::render('TicketResult', ['registrant' => $existing]);
        }

        $nomorAntrian = $jumlahTiketTanggal + 1;

        $validated = $request->validated();

        $ticketCode = Str::random(8);

        $registrant = Registrant::create([
            'nama' => $validated['nama'],
            'nisn' => $validated['nisn'],
            'asal_sekolah' => $validated['asal_sekolah'],
            'nomor_hp' => $validated['nomor_hp'],
            'email' => $validated['email'],
            'ticket_code' => $ticketCode,
            'tanggal_pengambilan_pin' => $request->tanggal_registrasi,
            'nomor_antrian' => $nomorAntrian,
            'tanggal_registrasi' => now(),
        ]);

        $registrant->refresh();
        return Inertia::render('TicketResult', ['registrant' => $registrant]);
    }

    public function cekTiketPage()
    {
        return Inertia::render('CekTiketPage');
    }

    public function cekTiket(Request $request)
    {
        $request->validate(['nisn' => 'required']);
        $registrant = Registrant::where('nisn', $request->nisn)->first();

        if ($registrant) {
            $registrant->refresh();
            return Inertia::render('TicketResult', ['registrant' => $registrant]);
        } else {
            return back()->withErrors(['nisn' => 'NISN tidak ditemukan.']);
        }
    }

    public function ambilPinPage()
    {
        return Inertia::render('AmbilPinPage');
    }

    public function ambilPin(Request $request)
    {
        $request->validate(['ticket_code' => 'required']);

        $registrant = Registrant::where('ticket_code', $request->ticket_code)->first();

        if (!$registrant) {
            return back()->withErrors(['ticket_code' => 'Kode tiket tidak ditemukan.']);
        }

        // Jika PIN belum ada, generate PIN (atau bisa dikosongkan dulu)
        if (!$registrant->pin) {
            $registrant->pin = rand(100000, 999999); // Atau logika PIN sesuai kebutuhan
            $registrant->save();
        }

        $registrant->refresh();
        return Inertia::render('TicketResult', ['registrant' => $registrant]);
    }

}
