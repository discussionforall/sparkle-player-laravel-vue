<?php

namespace App\Services;

use GuzzleHttp\Client;
use Illuminate\Support\Facades\Cache;

class ApplicationInformationService
{
    public function __construct(private readonly Client $client)
    {
    }

    /**
     * Get the latest version number of Sparkle from GitHub.
     */
    public function getLatestVersionNumber(): string
    {
        return rescue(function () {
            return Cache::remember('latestSparkleVersion', now()->addDay(), function (): string {
                return json_decode($this->client->get('')->getBody())[0]
                    ->name;
            });
        }) ?? sparkle_version();
    }
}
