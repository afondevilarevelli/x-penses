<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class CreditCardTypeSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $count = DB::table('credit_card_types')->count();
        if ($count > 0)
            return;

        $credit_card_types = [
            ["name" => "VISA", "image" => "/credit_card_types/visa.png"],
            ["name" => "MasterCard", "image" => "/credit_card_types/mastercard.png"],
            ["name" => "American Express", "image" => "/credit_card_types/american_express.png"],
            ["name" => "Other", "image" => "/credit_card_types/other.png"],
        ];

        DB::table('credit_card_types')->insert($credit_card_types);
    }
}