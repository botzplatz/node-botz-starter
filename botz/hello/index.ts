import { genBotzApp } from "./app"

const { start } = genBotzApp({
  variant: "OPEN_API",
  name: "Hello World"
})

const port = Number(process.env.PORT) || 3001

start(port)
