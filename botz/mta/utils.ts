import GtfsRealtimeBindings from "gtfs-realtime-bindings"
import fetch from "node-fetch"

export const fetchFeed = ({ apiKey, apiEndpoint }: { apiKey: string, apiEndpoint: string }) => async () => {
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

export const getDepartureTime = (data: unknown[]) => (inputs: Record<string, string>) => {
  // TODO: write the algo to use the inputs to filter the data
  console.log("inputs...", JSON.stringify(inputs))
  const answer = (data as any)[0]
  return answer
}
