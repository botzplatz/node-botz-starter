import { genBotzApp } from "./app"

const { start } = genBotzApp({
  variant: "OPEN_API",
  name: "Simple Node App"
})

const port = Number(process.env.PORT) || 3001

start(port)
