---
outline: [2, 3]
---

# CLI Commands

Sparkle comes with a set of handy CLI commands to help you manage your installation.
These commands are available via Laravel’s `artisan` command line interface.

You can run `php artisan list` from your Sparkle installation directory and pipe the output to `grep` to filter out those under the `sparkle` namespace:

```bash
php artisan list | grep sparkle
 sparkle
  sparkle:admin:change-password  Change a user's password
  sparkle:doctor                 Check Sparkle setup
  sparkle:init                   Install or upgrade Sparkle
  sparkle:license:activate       Activate a Sparkle Plus license
  sparkle:license:deactivate     Deactivate the currently active Sparkle Plus license
  sparkle:license:status         Check the current Sparkle Plus license status
  sparkle:podcasts:sync          Synchronize podcasts.
  sparkle:prune                  Remove empty artists and albums
  ...
```

In order to get help on a specific command, run `php artisan <command> -h`.

## Available Commands

:::warning Warning
Always run commands as your web server user (e.g. `www-data` or `nginx`), **never** as `root`.
Otherwise, Sparkle might encounter issues with file permissions (e.g. with cache and storage files) and you might end up with a broken installation.

With the Docker installation, for example, run the command as the `www-data` user:

```bash
docker exec --user www-data <container_name_for_sparkle> php artisan <command>
```
:::

### `sparkle:admin:change-password`

Change a user's password.

#### Usage

```bash
php artisan sparkle:admin:change-password [<email>]
```

#### Arguments
| Name    | Description                                                  |
|---------|--------------------------------------------------------------|
| `email` | The user's email. If empty, will get the default admin user. |

### `sparkle:doctor`

Check Sparkle setup.

#### Usage

```bash
php artisan sparkle:doctor
```

### `sparkle:init`

Install or upgrade Sparkle.

Usage

```bash
php artisan sparkle:init [options]
```

#### Options
| Name             | Description                     |
|------------------|---------------------------------|
| `--no-assets`    | Do not compile front-end assets |
| `--no-scheduler` | Do not install scheduler        |

### `sparkle:license:activate`

Activate a Sparkle Plus license.

#### Usage

```bash
php artisan sparkle:license:activate <key>
```

#### Arguments

| Name  | Description                  |
|-------|------------------------------|
| `key` | The license key to activate. |

### `sparkle:license:deactivate`

Deactivate the currently active Sparkle Plus license.

#### Usage

```bash
php artisan sparkle:license:deactivate
```

### `sparkle:license:status`

Check the current Sparkle Plus license status.

#### Usage

```bash
php artisan sparkle:license:status
```

### `sparkle:podcasts:sync`

Synchronize podcasts.

#### Usage

```bash
php artisan sparkle:podcasts:sync
```

### `sparkle:prune`

Remove empty artists and albums.

#### Usage

```bash
php artisan sparkle:prune
```

### `sparkle:scan`

Scan for songs in the configured directory.

#### Usage

```bash
php artisan sparkle:scan [options]
php artisan sparkle:sync [options] # Alias, deprecated
```

#### Options:

| Name             | Description                                                                                                                                                                   |
|------------------|-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| `O`, `--owner=`  | The ID of the user who should own the newly scanned songs. Defaults to the first admin user.                                                                                  |
| `P`, `--private` | Whether to make the newly scanned songs private to the user.                                                                                                                  |
| `I`, `--ignore=` | The comma-separated tags to ignore (exclude) from scanning. Valid tags are `title`, `album`,`artist`, `albumartist`, `track`, `disc`, `year`, `genre`, `lyrics`, and `cover`. |
| `F`, `--force`   | Force re-scanning even unchanged files.                                                                                                                                       |

### `sparkle:scheduler:install`

Install the command scheduler. Refer to [Command Scheduling](#command-scheduling) for more information.

### `sparkle:search:import`

Import all searchable entities with Scout. Refer to [Instant Search](./usage/search) for more information.

#### Usage

```bash
php artisan sparkle:search:import
```

### `sparkle:storage`

Set up and configure Sparkle’s storage.

#### Usage

```bash
php artisan sparkle:storage
```

### `sparkle:storage:dropbox` <PlusBadge />

Set up Dropbox as the storage driver for Sparkle.

#### Usage

```bash
php artisan sparkle:storage:dropbox
```

### `sparkle:storage:local`

Set up the local storage for Sparkle. A "local storage" is simply a directory on the server where Sparkle is installed.

#### Usage

```bash
php artisan sparkle:storage:local
```

### `sparkle:storage:s3` <PlusBadge />

Set up Amazon S3 or a compatible service (DigitalOcean Spaces, Cloudflare R2, etc.) as the storage driver for Sparkle.

#### Usage

```bash
php artisan sparkle:storage:s3
```

:::tip
To set up the storage driver for Sparkle, simply use `sparkle:storage`. Internally, it calls `sparkle:storage:local`, `sparkle:storage:s3`, or `sparkle:storage:dropbox` based on your input.
:::

### `sparkle:tags:collect`

Collect additional tags from existing songs. This is a legacy command and is no longer needed for new installations.

#### Usage

```bash
php artisan sparkle:tags:collect
```

## Command Scheduling

Some of the commands, such as `sparkle:scan` and `sparkle:prune`, can be scheduled to run at regular intervals.
Instead of setting up individual cron jobs, you can use Sparkle’s built-in scheduler to automatically handle the commands for you.

To set up the scheduler, run the `sparkle:scheduler:install` command as the web server user (e.g. `www-data` or `nginx`):

```bash
php artisan sparkle:scheduler:install
```

Alternatively, you can manually add the following cron entry into the crontab of the webserver user (for example, if it's `www-data`, run `sudo crontab -u www-data -e`):

```bash
* * * * * cd /path-to-sparkle-installation && php artisan schedule:run >> /dev/null 2>&1
```

Either way, the scheduler will run every minute once installed, executing any scheduled commands as needed.
By default, `sparkle:scan`, `sparkle:prune`, and `sparkle:podcasts:sync` are set to run every day at midnight.

Though you can still manually set up cron jobs for individual commands, the scheduler is the recommended approach to do command scheduling in Sparkle,
as it will automatically cover any commands that may be added in the future.
