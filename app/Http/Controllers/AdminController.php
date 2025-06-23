<?php

namespace App\Http\Controllers;

use App\Models\Registrant;
use Illuminate\Support\Facades\Response;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Barryvdh\DomPDF\Facade\Pdf;

class AdminController extends Controller
{
    public function index(Request $request)
    {
        $search = $request->input('search');

        $registrants = Registrant::query()
            ->when($search, function ($query, $search) {
                $query->where('nama', 'like', "%{$search}%")
                      ->orWhere('nisn', 'like', "%{$search}%")
                      ->orWhere('email', 'like', "%{$search}%");
            })
            ->orderBy('created_at', 'desc')
            ->get();

        return Inertia::render('AdminDashboard', [
            'registrants' => $registrants,
            'search' => $search
        ]);
    }
    
    public function exportCSV()
    {
        $registrants = Registrant::all();

        $csvHeader = ['Nama', 'NISN', 'Asal Sekolah', 'Nomor HP', 'Email', 'Jadwal Pengambilan', 'Nomor Antrian'];

        $csvData = $registrants->map(function ($r) {
            return [
                $r->nama,
                $r->nisn,
                $r->asal_sekolah,
                $r->nomor_hp,
                $r->email,
                $r->tanggal_pengambilan_pin,
                $r->nomor_antrian,
            ];
        });

        $handle = fopen('php://temp', 'r+');
        fputcsv($handle, $csvHeader);

        foreach ($csvData as $row) {
            fputcsv($handle, $row);
        }

        rewind($handle);
        $content = stream_get_contents($handle);
        fclose($handle);

        $filename = 'registrants_' . now()->format('Ymd_His') . '.csv';

        return Response::make($content, 200, [
            'Content-Type' => 'text/csv',
            'Content-Disposition' => "attachment; filename={$filename}",
        ]);
    }

    public function exportPDF()
    {
        $registrants = Registrant::all();
        $pdf = \Barryvdh\DomPDF\Facade\Pdf::loadView('exports.tickets', compact('registrants'));
        return $pdf->download('tickets.pdf');
    }

    public function updateTicket(Request $request, $id)
        {
            $request->validate([
            'tanggal_pengambilan_pin' => 'required|date',
        ]);

        $registrant = Registrant::findOrFail($id);
        $registrant->tanggal_pengambilan_pin = $request->tanggal_pengambilan_pin;
        $registrant->save();

        return redirect()->back()->with('success', 'Tanggal pengambilan berhasil diperbarui.');
    }

    public function deleteTicket($id)
    {
        $registrant = Registrant::findOrFail($id);
        $registrant->delete();

        return redirect()->route('admin.dashboard')->with('success', 'Tiket berhasil dihapus.');
    }
}
