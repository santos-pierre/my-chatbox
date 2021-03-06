<?php

/** @var \Illuminate\Database\Eloquent\Factory $factory */

use App\Chat;
use Faker\Generator as Faker;

$factory->define(Chat::class, function (Faker $faker) {
    return [
        'message' => $faker->text(50),
        'name' => $faker->name
    ];
});
