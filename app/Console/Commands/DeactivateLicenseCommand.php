<?php

namespace App\Console\Commands;

use App\Services\License\Contracts\LicenseServiceInterface;
use Illuminate\Console\Command;
use Throwable;

class DeactivateLicenseCommand extends Command
{
    protected $signature = 'sparkle:license:deactivate';
    protected $description = 'Deactivate the currently active Sparkle Plus license';

    public function __construct(private readonly LicenseServiceInterface $licenseService)
    {
        parent::__construct();
    }

    public function handle(): int
    {
        $status = $this->licenseService->getStatus();

        if ($status->hasNoLicense()) {
            $this->components->warn('No active Plus license found.');

            return self::SUCCESS;
        }

        if (!$this->confirm('Are you sure you want to deactivate your Sparkle Plus license?')) {
            $this->output->warning('License deactivation aborted.');

            return self::SUCCESS;
        }

        $this->components->info('Deactivating your license…');

        try {
            $this->licenseService->deactivate($status->license);
            $this->components->info('Sparkle Plus has been deactivated. Plus features are now disabled.');

            return self::SUCCESS;
        } catch (Throwable $e) {
            $this->components->error('Failed to deactivate Sparkle Plus: ' . $e->getMessage());

            return self::FAILURE;
        }
    }
}
