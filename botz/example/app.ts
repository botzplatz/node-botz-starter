import express from "express"

export interface AppConfig {
  name: string
}
export interface BotzApp {
  name: string
  corsEnabled: boolean
}

export const genBotzApp = ({ name = "" }: { name: string }) => {
  const app = express()
  app.get("/", (req, res) => {
    res.send("Express + TypeScript Server 124")
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
