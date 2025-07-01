<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;
use Illuminate\Support\Carbon;
use Illuminate\Support\Facades\File;

class PostFactory extends Factory
{
    public function definition(): array
    {
        // Get all avatar image filenames
        $avatarPath = storage_path('app/public/avatars');
        $files = File::exists($avatarPath)
            ? collect(File::files($avatarPath))->map(fn ($file) => 'avatars/' . $file->getFilename())->toArray()
            : [];

        // Add null as a possible "no image" outcome
        $imageOptions = array_merge($files, [null]);

        return [
            'content' => $this->faker->paragraph(rand(1, 3)),
            'image' => $this->faker->randomElement($imageOptions),
            'created_at' => Carbon::now()->subDays(rand(0, 30)),
            'updated_at' => now(),
        ];
    }
}
