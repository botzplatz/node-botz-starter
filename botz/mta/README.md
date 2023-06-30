## MTA BotzApp

A starter BotzApp to create a service endpoint to retrieve from the MTA

This demonstrates how you can build a node wrapper for a third party API endpoint such as the MTA Realtime Data feeds API <https://api.mta.info/#/landing>

Here's how you set up your BotzApp

```ts
const { start } = genBotzApp({
  name,
  apiEndpoint: MTA_ENDPOINT,
  apiKey: env.MTA_API_KEY,
  genJsonResponseFromApiData: (data) => data
})

const port = 3002

start(3002) // start the server on port 3002
```

`genJsonResponseFromApiData` is your custom function for how to process the response from making a direct API call. For example, you may want to filter down the response to show just the A train.

By default `genJsonResponseFromApiData` will just return the Api data. The MTA API Responses are based on the [GTFS Realtime specification](https://developers.google.com/transit/gtfs-realtime), which is based on Protocol Buffers, or “Google's language-neutral, platform-neutral, extensible mechanism for serializing structured data”.

Here we are using [gtfs-realtime-bindings npm module](https://www.npmjs.com/package/gtfs-realtime-bindings) for converting the protobuf to JSON. All of the heavy lifting of making the request to the third-party endpoint and converting it to JSON is done under the hood for you by BotzApp. You just have to pass your custom function for how to further process the JSON.

Without any processing, the response looks something like this

![Screenshot 2023-06-29 at 13 35 32](https://github.com/botzplatz/node-botz-starter/assets/5825343/ac0f02fd-97b8-42d2-adcb-7536f1b21e76)

## Passing input

You can pass optional inputs to your post

```ts
const { start } = genBotzApp({
  name,
  apiEndpoint: ACE_ENDPOINT,
  apiKey: env.MTA_API_KEY,
  apiInputs: ["stopId", "routeId", "now"],
  genJsonResponseFromApiData: getDepartureTime
})
```

<img width="493" alt="Screenshot 2023-06-29 at 15 42 00" src="https://github.com/botzplatz/node-botz-starter/assets/5825343/ba1d339c-0d84-4daf-b081-421a2b91d699">

The `getDepartureTime` is a custom function (**botWorker**) that creates the final output for the API endpoint.

## Infra Changes

- Created a shared types file
- Switched to using [ts-dotenv](https://github.com/LeoBakerHytch/ts-dotenv)

## API Key

You need to register for an account here to get free API Access
<https://api.mta.info/#/signup>

The MTA Realtime Data Feeds provided these endpoints
<img width="995" alt="Screenshot 2023-06-29 at 13 24 26" src="https://github.com/botzplatz/node-botz-starter/assets/5825343/b649ae1d-fce7-4863-bc46-fd4e360ad3de">

The subway Realtime Feeds have 8 separate endpoints

<img width="964" alt="Screenshot 2023-06-29 at 13 25 39" src="https://github.com/botzplatz/node-botz-starter/assets/5825343/ca7b4d7e-b7ad-42ad-a070-e94aa7ab418c">
