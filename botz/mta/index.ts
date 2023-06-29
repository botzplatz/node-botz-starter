import { resolve } from "path"
import { load } from "ts-dotenv"

import { genBotzApp } from "./app"

const env = load({
  MTA_API_KEY: String,
  PORT: Number,
}, {
  path: resolve(__dirname, "./.env"),
})

const name = "MTA Bot"
const ACE_ENDPOINT = "https://api-endpoint.mta.info/Dataservice/mtagtfsfeeds/nyct%2Fgtfs-ace"

const getDepartureTime = (data: unknown[]) => (inputs: Record<string, string>) => {
  // TODO: write the algo to use the inputs to filter the data
  console.log("inputs...", JSON.stringify(inputs))
  const answer = String((data as any)[0].stopTimeUpdate[0].departure.time)
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
  name,
  apiEndpoint: ACE_ENDPOINT,
  apiKey: env.MTA_API_KEY,
  apiInputs: ["stopId", "routeId", "now"],
  genJsonResponseFromApiData: getDepartureTime
})

const port = Number(env.PORT) || 3002

start(port)
