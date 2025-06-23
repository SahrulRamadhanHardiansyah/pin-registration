<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration {
    public function up(): void
    {
        Schema::create('tickets', function (Blueprint $table) {
            $table->id();
            $table->string('nama');
            $table->string('nisn')->unique();
            $table->string('asal_sekolah');
            $table->string('nomor_hp');
            $table->string('email');
            $table->date('tanggal_registrasi');
            $table->integer('nomor_tiket'); // nomor antrian
            $table->timestamps();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('tickets');
    }
};
