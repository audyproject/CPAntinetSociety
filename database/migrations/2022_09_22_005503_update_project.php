<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class UpdateProject extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::table('projects', function (Blueprint $table) {
            $table->string('judul_paragraf1')->nullable()->change();
            $table->text('isi_paragraf1')->nullable()->change();
            $table->string('judul_paragraf2')->nullable()->change();
            $table->text('isi_paragraf2')->nullable()->change();
            $table->string('gambar_utama')->nullable()->change();
            $table->string('gambar_kiri')->nullable()->change();
            $table->string('gambar_kanan')->nullable()->change();
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::table('projects', function (Blueprint $table) {
            // $table->string('judul_paragraf1')->nullable(false)->change();
            // $table->text('isi_paragraf1')->nullable(false)->change();
            // $table->string('judul_paragraf2')->nullable(false)->change();
            // $table->text('isi_paragraf2')->nullable(false)->change();
            // $table->string('gambar_utama')->nullable(false)->change();
            // $table->string('gambar_kiri')->nullable(false)->change();
            // $table->string('gambar_kanan')->nullable(false)->change(); gabisa
        });
    }
}
