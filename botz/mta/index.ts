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

const { start } = genBotzApp({
  name,
  apiEndpoint: ACE_ENDPOINT,
  apiKey: env.MTA_API_KEY,
  genJsonResponseFromApiData: (data) => data
})

const port = Number(env.PORT) || 3002

start(port)
