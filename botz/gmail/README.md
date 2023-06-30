# Gmail BotzApp

## Demo

<https://youtu.be/RuXD0yZ6LvE>

## Obtain OAuth2 Credentials

You need to put `oauth2.keys.json` in this directory.

1. Navigate to the Cloud Console and [Create a new OAuth2 Client Id](https://console.cloud.google.com/apis/credentials/oauthclient)
2. Select `Web Application` for the application type
3. Add an authorized redirect URI with the value `http://localhost:3000/oauth2callback` (or applicable value for your scenario)
4. Click `Create`, and `Ok` on the following screen
5. Click the `Download` icon next to your newly created OAuth2 Client Id

See <https://developers.google.com/gmail/api/auth/about-auth> for more information.
