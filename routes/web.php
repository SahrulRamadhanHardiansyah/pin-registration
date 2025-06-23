<?php

use App\Http\Controllers\ProfileController;
use App\Http\Controllers\AdminController;
use App\Http\Controllers\PinController;
use App\Http\Controllers\Auth\AuthenticatedSessionController;
use App\Http\Controllers\PinPeriodController;
use App\Http\Controllers\TicketController;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

// Landing Page
Route::get('/', [TicketController::class, 'landing'])->name('landing');

// Ambil Tiket
Route::post('/ambil-tiket', [TicketController::class, 'ambilTiket'])->name('ambil.tiket');

// Cek Tiket
Route::get('/cek-tiket', [TicketController::class, 'cekTiketPage'])->name('cek.tiket.page');
Route::post('/cek-tiket', [TicketController::class, 'cekTiket'])->name('cek.tiket');

// PIN
Route::get('/ambil-pin-page', [TicketController::class, 'ambilPinPage']);
Route::post('/ambil-pin', [TicketController::class, 'ambilPin']);


// Admin Route (login, dashboard, export)
Route::middleware(['auth'])->group(function () {
    Route::get('/admin', [AdminController::class, 'index'])->name('admin.dashboard');
    Route::get('/admin/export-csv', [AdminController::class, 'exportCSV'])->name('admin.export.csv');
    Route::get('/admin/export-pdf', [AdminController::class, 'exportPDF'])->name('admin.export.pdf');
    Route::get('/admin/pin-period', [PinPeriodController::class, 'index'])->name('admin.pin-period');
    Route::post('/admin/pin-period', [PinPeriodController::class, 'store'])->name('admin.pin-period.store');
    Route::put('/admin/ticket/{id}', [AdminController::class, 'updateTicket'])->name('admin.ticket.update');
    Route::delete('/admin/ticket/{id}', [AdminController::class, 'deleteTicket'])->name('admin.ticket.delete');
    Route::post('/logout', [AuthenticatedSessionController::class, 'destroy'])->name('logout');
});


// Autentikasi (login admin)
require __DIR__.'/auth.php';
