# User Management

## First Admin User
Upon installation, Sparkle prompts to create a first (default) admin user. 
If you're using the [Docker image](../guide/getting-started#using-docker), the admin user will be created automatically with these credentials:

```
Email: admin@sparkle.dev
Password: SparkleIsCool
```

<div class="danger custom-block" style="padding-top: 8px">
Make sure to change these credentials immediately after logging in for the first time!
</div>

## Changing First Admin Password
If you forgot the default admin’s password and are unable to log in, you can change it via the command line:

```bash
php artisan sparkle:admin:change-password
```

## Adding More Users

As an admin, you can add more users and manage their profiles under Manage → Users. 
If Sparkle has been [configured](../guide/getting-started#configure-a-mailer) with a mailer, you can also invite a user via email. 

:::tip Multi-library support
In the Community edition of Sparkle, all users share the same library (though playlists, favorites, and other stats are private).
[Sparkle Plus](..) offers multi-library support, where each user can have their own library with the ability to share and collaborate with others.
:::


