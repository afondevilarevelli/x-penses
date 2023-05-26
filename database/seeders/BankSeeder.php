<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class BankSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $count = DB::table('banks')->count();
        if ($count > 0)
            return;

        $banks = [
            ["name" => "ICBC", "image" => "/banks/icbc.png"],
            ["name" => "HSBC", "image" => "/banks/hsbc.png"],
            ["name" => "Santander", "image" => "/banks/santander.png"],
            ["name" => "Itaú", "image" => "/banks/itau.png"],
            ["name" => "BBVA", "image" => "/banks/bbva.png"],
            ["name" => "Supervielle", "image" => "/banks/supervielle.png"],
            ["name" => "Patagonia", "image" => "/banks/patagonia.png"],
            ["name" => "Galicia", "image" => "/banks/galicia.png"],
            ["name" => "Hipotecario", "image" => "/banks/hipotecario.png"],
            ["name" => "Other", "image" => "/banks/other.png"],
        ];

        DB::table('banks')->insert($banks);
    }
}