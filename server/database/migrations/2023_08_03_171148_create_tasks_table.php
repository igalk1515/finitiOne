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
        Schema::create('tasks', function (Blueprint $table) {
            $table->id();
            $table->string('title');
            $table->text('description');
            $table->date('due_date');
            $table->boolean('completed')->default(false);
            $table->timestamps();
        });
        DB::table('tasks')->insert([
            ['title' => 'Task 1', 'description' => 'Description for Task 1', 'due_date' => '2023-08-06', 'completed' => false],
            ['title' => 'Task 2', 'description' => 'Description for Task 2', 'due_date' => '2023-08-07', 'completed' => false],
            ['title' => 'Task 3', 'description' => 'Description for Task 3', 'due_date' => '2023-08-08', 'completed' => false],
            ['title' => 'Task 4', 'description' => 'Description for Task 4', 'due_date' => '2023-08-09', 'completed' => false],
            ['title' => 'Task 5', 'description' => 'Description for Task 5', 'due_date' => '2023-08-10', 'completed' => false],
            ['title' => 'Task 6', 'description' => 'Description for Task 6', 'due_date' => '2023-08-11', 'completed' => false],
        ]);
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('tasks');
    }
};
