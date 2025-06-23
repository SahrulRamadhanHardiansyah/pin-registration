<?php

// database/migrations/xxxx_xx_xx_create_registrants_table.php
use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration {
    public function up(): void
    {
        Schema::create('registrants', function (Blueprint $table) {
            $table->id();
            $table->string('nama');
            $table->string('nisn')->unique();
            $table->string('asal_sekolah');
            $table->string('nomor_hp');
            $table->string('email')->unique();
            $table->string('pin')->unique();
            $table->timestamps();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('registrants');
    }
};
