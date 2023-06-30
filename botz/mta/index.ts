import { resolve } from "path"
import { load } from "ts-dotenv"

import { genBotzApp } from "./app"

const env = load({
  MTA_API_KEY: String,
  PORT: Number,
}, {
  path: resolve(__dirname, "./.env"),
})

const MTA_ACE_ENDPOINT = "https://api-endpoint.mta.info/Dataservice/mtagtfsfeeds/nyct%2Fgtfs-ace"

const getDepartureTime = (data: unknown[]) => (inputs: Record<string, string>) => {
  // TODO: write the algo to use the inputs to filter the data
  console.log("inputs...", JSON.stringify(inputs))
  const answer = (data as any)[0]
  return answer
}

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
  apiEndpoint: MTA_ACE_ENDPOINT,
  apiKey: env.MTA_API_KEY,
  apiInputs: ["stopId", "routeId", "now"],
  genJsonResponseFromApiData: getDepartureTime
})

const port = Number(env.PORT) || 3002

start(port)
