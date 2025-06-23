<?php

namespace App\Http\Controllers;

use App\Models\PinPeriod;
use Illuminate\Http\Request;
use Inertia\Inertia;

class PinPeriodController extends Controller
{
    public function index()
    {
        $period = PinPeriod::latest()->first();
        return Inertia::render('AdminPinPeriod', ['period' => $period]);
    }

    public function store(Request $request)
    {
        $request->validate([
            'start_date' => 'required|date',
            'end_date' => 'required|date|after_or_equal:start_date',
            'max_ticket_per_day' => 'required|integer|min:1',
        ]);

        PinPeriod::create([
            'start_date' => $request->start_date,
            'end_date' => $request->end_date,
            'max_ticket_per_day' => $request->max_ticket_per_day,
        ]);

        return redirect()->route('admin.pin-period')->with('success', 'Periode pengambilan PIN berhasil disimpan.');
    }
}
