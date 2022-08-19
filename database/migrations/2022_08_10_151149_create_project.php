<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateProject extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('projects', function (Blueprint $table) {
            $table->id();
            $table->string('name');
            $table->string('description');
            $table->string('judul_paragraf1');
            $table->text('isi_paragraf1');
            $table->string('judul_paragraf2');
            $table->text('isi_paragraf2');
            $table->string('gambar_utama');
            $table->string('gambar_kiri');
            $table->string('gambar_kanan');
            $table->text('gambar_lain')->nullable();
            $table->string('hashtag')->nullable();
            $table->string('link')->nullable();
            $table->boolean('spotlight')->default(0);
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('projects');
    }
}
