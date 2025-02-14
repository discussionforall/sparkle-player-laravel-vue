<?php

namespace App\Console\Commands;

use App\Enums\LicenseStatus;
use App\Models\License;
use App\Services\License\Contracts\LicenseServiceInterface;
use Illuminate\Console\Command;
use Throwable;

class CheckLicenseStatusCommand extends Command
{
    protected $signature = 'sparkle:license:status';
    protected $description = 'Check the current Sparkle Plus license status';

    public function __construct(private readonly LicenseServiceInterface $licenseService)
    {
        parent::__construct();
    }

    public function handle(): int
    {
        $this->components->info('Checking your Sparkle Plus license status…');

        if (License::count() > 1) {
            $this->components->warn('Multiple licenses found. This can cause unexpected behaviors.');
        }

        try {
            $status = $this->licenseService->getStatus(checkCache: false);

            switch ($status->status) {
                case LicenseStatus::VALID:
                    $this->output->success('You have a valid Sparkle Plus license. All Plus features are enabled.');
                    $this->components->twoColumnDetail('License Key', $status->license->short_key);

                    $this->components->twoColumnDetail(
                        'Registered To',
                        "{$status->license->meta->customerName} <{$status->license->meta->customerEmail}>"
                    );

                    $this->components->twoColumnDetail('Expires On', 'Never ever');
                    $this->newLine();
                    break;

                case LicenseStatus::NO_LICENSE:
                    $this->components->info(
                        'No license found. You can purchase one at https://store.sparkle.dev'
                        . config('lemonsqueezy.plus_product_id')
                    );
                    break;

                case LicenseStatus::INVALID:
                    $this->components->error('Your license is invalid. Plus features will not be available.');
                    break;

                default:
                    $this->components->warn('Your license status is unknown. Please try again later.');
            }
        } catch (Throwable $e) {
            $this->output->error($e->getMessage());
        }

        return self::SUCCESS;
    }
}
