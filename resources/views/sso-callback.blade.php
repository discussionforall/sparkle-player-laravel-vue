<!doctype html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>SSO Callback | Sparkle</title>
    <script>
        window.opener.postMessage(@json($token), '*')
        window.close()
    </script>
</head>
</html>
