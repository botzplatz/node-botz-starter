
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



export const genBotzApp = ({
  name = "", apiEndpoint, apiKey,
  genJsonResponseFromApiData = (data) => data
}: AppConfig) => {
  const app = express()
  app.get("/", (req, res) => {
    if (!apiKey) {
      return res.json({
        error: "API_KEY_MISSING",
      })
    }
    if (!apiEndpoint) {
      return res.json({
        error: "API_ENDPOINT_MISSING",
      })
    }
    fetchFeed({ apiKey, apiEndpoint }).then((feed) => {
      return res.json({
        data: genJsonResponseFromApiData(feed),
        error: null
      })
    }).catch(() => {
      return res.json({
        error: "ERROR",
      })
    })
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
