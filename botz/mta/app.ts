
import express from "express"
import GtfsRealtimeBindings from "gtfs-realtime-bindings"
import fetch from "node-fetch"

import { AppConfig } from "../shared/types"

const fetchFeed = async ({ apiKey, apiEndpoint }: { apiKey: string, apiEndpoint: string }) => {
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

export const genBotzApp = (config: AppConfig) => {
  const {
    name,
    variant,
    apiInputs,
    genJsonResponseFromApiData = (data) => () => data
  } = config

  const app = express()
  if (apiInputs) {
    app.use(express.urlencoded())
    app.use(express.json())
  }

  app.post("/", (req, res) => {
    if (variant === "PUBLIC_API") {
      const { apiEndpoint, apiKey, apiInputs } = config

        const inputs = apiInputs?.reduce((acc, inputName) => ({
          ...acc,
          [inputName]: req.body[inputName]
        }), {})

      console.log("INPUTS", JSON.stringify(inputs, null, 2))
      fetchFeed({ apiKey, apiEndpoint }).then((feed) => {
        return res.json({
          data: genJsonResponseFromApiData(feed)(inputs),
          error: null
        })
      }).catch((e) => {
        console.log("error....", e)
        return res.json({
          error: "ERROR",
        })
      })
    }
  })

  const start = (port: number) => {
    app.listen(port, () => {
      console.log(`[${name}]: Server is running at http://localhost:${port}`)
    })
  }
  return {
    start,
  }
}
