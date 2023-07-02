
import { resolve } from "path"
import { load } from "ts-dotenv"

import { genBotzApp } from "../../botzapp"
import { fetchFeed, getDepartureTime } from "./utils"

const env = load({
  MTA_API_KEY: String,
  PORT: Number,
}, {
  path: resolve(__dirname, "./.env"),
})

const MTA_ACE_ENDPOINT = "https://api-endpoint.mta.info/Dataservice/mtagtfsfeeds/nyct%2Fgtfs-ace"

const interactWithThirdPartyApi = fetchFeed({
  apiKey: env.MTA_API_KEY,
  apiEndpoint: MTA_ACE_ENDPOINT
})

const { start } = genBotzApp({
  variant: "PUBLIC_API",
  name: "MTA Bot",
  apiInputs: ["stopId", "routeId", "now"],
  interactWithThirdPartyApi,
  genSuccessResponse: getDepartureTime
})

const port = Number(env.PORT) || 3002

start(port)
