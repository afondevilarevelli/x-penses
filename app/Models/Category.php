<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasOne;
use Illuminate\Support\Facades\DB;

class Category extends Model
{
    protected $fillable = [
        "name",
        "color",
        "icon",
        "user_id"
    ];

    public static function CreateDefaults(User $user)
    {
        $default_categories = [
            ["name" => "Education", "color" => "violet", "icon" => "FaBookReader", "user_id" => $user->id],
            ["name" => "Food", "color" => "red", "icon" => "FaAppleAlt", "user_id" => $user->id],
            ["name" => "Sports", "color" => "lime", "icon" => "FaDumbbell", "user_id" => $user->id],
            ["name" => "Pets", "color" => "blue", "icon" => "FaDog", "user_id" => $user->id],
            ["name" => "Health", "color" => "green", "icon" => "FaClinicMedical", "user_id" => $user->id],
            ["name" => "Supermarket", "color" => "orange", "icon" => "FaShoppingCart", "user_id" => $user->id],
            ["name" => "Clothes", "color" => "pink", "icon" => "FaTshirt", "user_id" => $user->id],
            ["name" => "Services", "color" => "gray", "icon" => "FaListAlt", "user_id" => $user->id],
            ["name" => "Other", "color" => "yellow", "icon" => "FaEllipsisH", "user_id" => $user->id],
        ];


        DB::table('categories')->insert($default_categories);
    }
}