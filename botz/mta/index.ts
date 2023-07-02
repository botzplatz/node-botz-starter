import GtfsRealtimeBindings from "gtfs-realtime-bindings"
import fetch from "node-fetch"
import { resolve } from "path"
import { load } from "ts-dotenv"

import { genBotzApp } from "../../botzapp"

const env = load({
  MTA_API_KEY: String,
  PORT: Number,
}, {
  path: resolve(__dirname, "./.env"),
})

const MTA_ACE_ENDPOINT = "https://api-endpoint.mta.info/Dataservice/mtagtfsfeeds/nyct%2Fgtfs-ace"


const fetchFeed = ({ apiKey, apiEndpoint }: { apiKey: string, apiEndpoint: string }) => async () => {
  const response = await fetch(apiEndpoint, {
    headers: {
      "x-api-key": apiKey,
    },
  })
  if (response.ok) {
    const buffer = await response.arrayBuffer()
    const feed = GtfsRealtimeBindings.transit_realtime.FeedMessage.decode(
      new Uint8Array(buffer)
    )
    const tripUpdate: any = []
    feed.entity.forEach((entity) => {
      if (entity.tripUpdate) {
        tripUpdate.push(entity.tripUpdate)
      }
    })
    return tripUpdate
  }
  return null
}

const getDepartureTime = (data: unknown[]) => (inputs: Record<string, string>) => {
  // TODO: write the algo to use the inputs to filter the data
  console.log("inputs...", JSON.stringify(inputs))
  const answer = (data as any)[0]
  return answer
}


const fetchDataFromPublicApi = fetchFeed({
  apiKey: env.MTA_API_KEY,
  apiEndpoint: MTA_ACE_ENDPOINT
})

// The response of this API call is
/*
Success case
{
  data: Answer
  error: null
}
Error case
{
  data: null
  error: ERROR_CODE
}
*/
const { start } = genBotzApp({
  variant: "PUBLIC_API",
  name: "MTA Bot",
  apiInputs: ["stopId", "routeId", "now"],
  fetchDataFromPublicApi,
  genSuccessResponse: getDepartureTime
})

const port = Number(env.PORT) || 3002

start(port)
