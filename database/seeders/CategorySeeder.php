<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class CategorySeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $count = DB::table('categories')->count();
        if ($count > 0)
            return;

        $categories = [
            ["name" => "Education", "color" => "violet", "icon" => "FaBookReader"],
            ["name" => "Food", "color" => "red", "icon" => "FaAppleAlt"],
            ["name" => "Sports", "color" => "lime", "icon" => "FaDumbbell"],
            ["name" => "Pets", "color" => "blue", "icon" => "FaDog"],
            ["name" => "Health", "color" => "green", "icon" => "FaClinicMedical"],
            ["name" => "Supermarket", "color" => "orange", "icon" => "FaShoppingCart"],
            ["name" => "Clothes", "color" => "pink", "icon" => "FaTshirt"],
            ["name" => "Services", "color" => "gray", "icon" => "FaListAlt"],
            ["name" => "Other", "color" => "yellow", "icon" => "FaEllipsisH"],
        ];

        DB::table('categories')->insert($categories);
    }
}