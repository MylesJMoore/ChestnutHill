<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;
use Illuminate\Support\Str;

class UserFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array
     */
    public function definition(): array
    {
        // Sample avatar filenames — you'll store these in storage/app/public/avatars/
        $avatars = ['tobyfox.png', 'susie.png', 'ralsei.png', 'kris.png', 'lancer.png', 'myles.png'];
        $avatar = $this->faker->randomElement($avatars);

        return [
            'name' => $this->faker->name(),
            'email' => $this->faker->unique()->safeEmail(),
            'email_verified_at' => now(),
            'password' => bcrypt('password'), // All seeded users use the same password
            'remember_token' => Str::random(10),
            'avatar_path' => $avatar,
        ];
    }

    /**
     * Indicate that the model's email address should be unverified.
     *
     * @return \Illuminate\Database\Eloquent\Factories\Factory
     */
    public function unverified()
    {
        return $this->state(function (array $attributes) {
            return [
                'email_verified_at' => null,
            ];
        });
    }
}
