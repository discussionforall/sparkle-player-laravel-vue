# Music Discovery

There are several ways for Sparkle to discover your media files. In the most common scenario, you will have a directory on your server where you store your music files.
You can let Sparkle know where this directory is (the "media path") via the [web interface](#scan-via-the-web-interface) or the [CLI](../cli-commands#sparkle-storage-local).

:::danger Keep media out of Sparkle’s directory
Do NOT place your media files inside Sparkle’s directory. Though technically possible, doing so will make upgrading, downgrading, and reinstalling Sparkle much more tedious.
:::

Once the media path is set, you can scan for songs (either manually or [using a cron job](../cli-commands#command-scheduling)), configure a watcher, or upload files directly via the web interface.

:::tip Cloud Storage
With [Sparkle Plus](..), you can also use cloud storage services like Amazon S3 or Dropbox to store your media files. Refer to [Storage Support](..) for more details.
:::

## Scan via the Web interface

:::warning Not for large libraries
Scanning via the web interface is vulnerable to HTTP timeouts and memory limit, so if you have a decent-sized library, opt for other methods instead.
:::

Upload your songs into a readable directory on your server and configure Sparkle to scan and sync it by setting a "media path" under Manage → Settings.

![Settings Screen](../assets/img/settings.webp)

Once set, click the "Scan" button to start the process. Sparkle will scan the directory and its subdirectories for audio files and add them to the database.
All popular audio formats (`.mp3`, `.ogg`, `.aac`, `.m4a`, `.opus`, and `.flac`) are supported.

## Scan Using the CLI

You can also scan from the CLI with the artisan `sparkle:scan` command. This method is faster, without a time or library-size limit, and provides useful feedbacks.

:::warning Warning
Always run `sparkle:scan` as well as any other commands as your web server user (e.g. `www-data` or `nginx`), **never** as `root`.
Otherwise, Sparkle might encounter issues with file permissions (e.g. with cache and storage files) and you might end up with a broken installation.

With the Docker installation, for example, run the command as the `www-data` user:

```bash
docker exec --user www-data <container_name_for_sparkle> php artisan sparkle:scan
```
:::

```bash
php artisan sparkle:scan

   INFO  Scanning /var/www/media

 1189/1189 [============================] 100%

   INFO  Scanning completed!

  ⇂ 1150 new or updated song(s)
  ⇂ 39 unchanged song(s)
  ⇂ 0 invalid file(s)
```

Suffix the command with a `-v` flag for more details e.g. scanning errors.

This command can be added as a cron job, for example to run every midnight:

```bash
0 0 * * * cd /home/user/webapps/sparkle/ && /usr/local/bin/php artisan sparkle:scan >/dev/null 2>&1
```

A better approach is to use Laravel’s built-in scheduler. See [Command Scheduling](../cli-commands#command-scheduling) for more details.

## Upload via the Web Interface
You can upload songs directly as an admin by clicking the "Upload" sidebar menu item or just drag and drop files and folders into the web interface.
Note that if you’re not using a cloud storage (available with Sparkle Plus), you will need to set the media path first,
as the files will be uploaded into the `%media_path%/__SPARKLE__UPLOADS__` directory.

Depending on how big your files are, you may want to set `upload_max_filesize` and `post_max_size` in your `php.ini` correspondingly, or uploading may fail with a `Payload too large` error.
This applies even if you’re using a cloud storage, as the files will be uploaded to your server first before being sent to the cloud.

## Watch the Media Directory

You can also watch your media directory and trigger _selective_ synchronization every time there's a change to it with the help of `inotifywait`.
In order to start using the feature, follow these steps:

### 1. Install `inotify` Tools

`inotify` is a Linux API that provides a mechanism for monitoring file system events and can be installed via your package manager.
For example, you can install it on Ubuntu with:

``` bash
sudo apt-get install inotify-tools
```

### 2. Set Up a Watcher Script

Now you need to set up a watcher script to run `inotifywait` and send the output to `sparkle:scan` artisan command. For example, you can create a sample `watch` file in Sparkle’s root directory with this content:

``` bash
#!/bin/bash

MEDIA_PATH=/var/www/media/
PHP_BIN=/usr/local/bin/php

inotifywait -rme move,close_write,delete --format "%e %w%f" $MEDIA_PATH | while read file; do
  $PHP_BIN artisan sparkle:sync "${file}"
done
```
### 3. Run the Watcher in the Background

Following the above example:

``` bash
chmod +x watch
./watch
[Ctrl+z]
bg
disown -h
```

You can now verify that it works by `tail -f storage/logs/laravel.log` while making changes to your media directory, for example by adding or removing applicable files via FTP.

## Integration with AWS Lambda

:::warning Deprecated
Though still functional, this method is deprecated in favor of configuring S3 as a [cloud storage](..).
:::

Starting from version v3.0.0, Sparkle can work seamlessly with Amazon S3 with the help of the [official Sparkle-AWS package](https://github.com/discussionforall/sparkle-player-laravel-vue-aws). This allows you to run Sparkle in your server and have all media files hosted on S3.

### How It Works

1. You upload media files to your S3 bucket
2. S3 sends events to a Lambda function
3. The Lambda function calls Sparkle’s API to sync the media into Sparkle’s database
4. You create a streaming request to Sparkle
5. Sparkle gets the media from S3 and streams it to you

<div style="height: 12px"></div>

<img loading="lazy" class="border-0" src="../assets/img/s3-flow.svg" alt="Amazon S3 flow" />

### Supports and Requirements

As of current, only `mp3`, `ogg`, `m4a`, and `flac` files are supported.

### Step-by-Step Installation

#### 1. Prepare S3 for Streaming

  1. Create an IAM user, e.g. `sparkle-user`
  2. Create a bucket, e.g. `sparkle-bucket`
  3. Make sure `sparkle-user` can read `sparkle-bucket`'s  content. You can simply attach the `AmazonS3ReadOnlyAccess` policy to `sparkle-user`.
  4. Allow CORS on `sparkle-bucket`
      ```xml
      <CORSConfiguration>
          <CORSRule>
              <AllowedOrigin>*</AllowedOrigin>
              <AllowedMethod>GET</AllowedMethod>
              <MaxAgeSeconds>3000</MaxAgeSeconds>
              <AllowedHeader>Authorization</AllowedHeader>
          </CORSRule>
      </CORSConfiguration>
      ```

#### 2. Configure Lambda for Syncing

1. Clone Sparkle-AWS's repository: `git clone /sparkle-aws`
2. Install necessary packages: `cd sparkle-aws && npm install --production`
3. Copy `.env.example` into `.env` and edit the variables there
4. Zip the whole directory's content into something like `archive.zip`
5. In AWS Lambda console, create a Lambda function with the following information:
    ```
    Name: sparkle-lambda
    Runtime: Node.js
    Code entry type: Upload a .ZIP file (you'll upload the zip file created in step 4 here)
    Handler: index.handler
    Role: S3 execution role (a new window will appear, where you can just click next next and next)
    Memory (MB): 128 should be fine
    Timeout: 0min 10sec
    VPC: "No VPC" should be fine
    ```
    :::info AWS region
    Make sure you're creating the function in the same region with `sparkle-bucket`.
    :::

#### 3. Configure S3 to send events to Lambda

Under `sparkle-bucket` "Events" section, create an event with the following details:

```
Name: <Just leave it blank>
Events: ObjectCreated(All), ObjectRemoved(All)
Prefix: <Empty>
Suffix: <Empty>
Send To: Lambda function
Lambda function: sparkle-lambda
```

#### 4. Configure Sparkle to Stream from S3

If everything works properly, you can now upload media files to the bucket, and they should appear in Sparkle. Now after you populate `sparkle-user`'s `AWS_ACCESS_KEY_ID`, `AWS_SECRET_ACCESS_KEY`, and `AWS_REGION` into your Sparkle's `.env` file, Sparkle will start streaming media from your S3.
