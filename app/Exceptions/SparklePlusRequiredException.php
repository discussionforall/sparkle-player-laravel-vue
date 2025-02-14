<?php

namespace App\Exceptions;

use Exception;

class SparklePlusRequiredException extends Exception
{
    public function __construct(string $message = 'This feature is only available in Sparkle Plus.')
    {
        parent::__construct($message);
    }
}
