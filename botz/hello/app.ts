import express from "express"

import { AppConfig } from "../shared/types"

export const genBotzApp = ({ name = "" }: AppConfig) => {
  const app = express()
  app.get("/", (req, res) => {
    res.send(name)
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
