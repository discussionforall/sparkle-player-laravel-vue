<?php

namespace Tests;

use App\Facades\License;
use App\Services\License\CommunityLicenseService;
use DMS\PHPUnitExtensions\ArraySubset\ArraySubsetAsserts;
use Illuminate\Foundation\Testing\DatabaseTransactions;
use Illuminate\Foundation\Testing\TestCase as BaseTestCase;
use Illuminate\Support\Facades\File;
use Tests\Traits\CreatesApplication;
use Tests\Traits\MakesHttpRequests;

abstract class TestCase extends BaseTestCase
{
    use ArraySubsetAsserts;
    use CreatesApplication;
    use DatabaseTransactions;
    use MakesHttpRequests;

    public function setUp(): void
    {
        parent::setUp();

        License::swap($this->app->make(CommunityLicenseService::class));
        self::createSandbox();
    }

    protected function tearDown(): void
    {
        self::destroySandbox();

        parent::tearDown();
    }

    private static function createSandbox(): void
    {
        config([
            'sparkle.album_cover_dir' => 'sandbox/img/covers/',
            'sparkle.artist_image_dir' => 'sandbox/img/artists/',
            'sparkle.playlist_cover_dir' => 'sandbox/img/playlists/',
            'sparkle.user_avatar_dir' => 'sandbox/img/avatars/',
        ]);

        File::ensureDirectoryExists(public_path(config('sparkle.album_cover_dir')));
        File::ensureDirectoryExists(public_path(config('sparkle.artist_image_dir')));
        File::ensureDirectoryExists(public_path(config('sparkle.playlist_cover_dir')));
        File::ensureDirectoryExists(public_path(config('sparkle.user_avatar_dir')));
        File::ensureDirectoryExists(public_path('sandbox/media/'));
    }

    private static function destroySandbox(): void
    {
        File::deleteDirectory(public_path('sandbox'));
    }
}
