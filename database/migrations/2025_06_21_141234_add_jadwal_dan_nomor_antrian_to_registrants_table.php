<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up()
    {
        Schema::table('registrants', function (Blueprint $table) {
            $table->date('tanggal_pengambilan_pin')->nullable();
            $table->integer('nomor_antrian')->nullable();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down()
    {
        Schema::table('registrants', function (Blueprint $table) {
            $table->dropColumn(['tanggal_pengambilan_pin', 'nomor_antrian']);
        });
    }
};
