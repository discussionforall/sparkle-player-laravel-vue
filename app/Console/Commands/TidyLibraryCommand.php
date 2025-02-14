<?php

namespace App\Console\Commands;

use Illuminate\Console\Command;

class TidyLibraryCommand extends Command
{
    protected $signature = 'sparkle:tidy';
    protected $hidden = true;

    public function handle(): int
    {
        $this->warn('sparkle:tidy has been renamed. Use sparkle:prune instead.');

        return self::SUCCESS;
    }
}
