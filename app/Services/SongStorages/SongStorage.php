<?php

namespace App\Services\SongStorages;

use App\Enums\SongStorageType;
use App\Exceptions\SparklePlusRequiredException;
use App\Models\Song;
use App\Models\User;
use Illuminate\Http\UploadedFile;

abstract class SongStorage
{
    abstract public function getStorageType(): SongStorageType;

    abstract public function storeUploadedFile(UploadedFile $file, User $uploader): Song;

    abstract public function delete(Song $song, bool $backup = false): void;

    abstract public function testSetup(): void;

    protected function assertSupported(): void
    {
        throw_unless(
            $this->getStorageType()->supported(),
            new SparklePlusRequiredException('The storage driver is only supported in Sparkle Plus.')
        );
    }
}
