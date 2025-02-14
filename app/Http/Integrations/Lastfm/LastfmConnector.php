<?php

namespace App\Http\Integrations\Lastfm;

use App\Http\Integrations\Lastfm\Auth\LastfmAuthenticator;
use Saloon\Http\Connector;
use Saloon\Traits\Plugins\AcceptsJson;

class LastfmConnector extends Connector
{
    use AcceptsJson;

    public function resolveBaseUrl(): string
    {
        return config('sparkle.lastfm.endpoint');
    }

    protected function defaultAuth(): LastfmAuthenticator
    {
        return new LastfmAuthenticator(config('sparkle.lastfm.key'), config('sparkle.lastfm.secret'));
    }
}
