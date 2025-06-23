`<?php

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
        Schema::table('pin_periods', function (Blueprint $table) {
            $table->integer('max_ticket_per_day')->default(100);
        });
    }
    /**
     * Reverse the migrations.
     */
    public function down()
    {
        Schema::table('pin_periods', function (Blueprint $table) {
            $table->dropColumn('max_ticket_per_day');
        });
    }
};
