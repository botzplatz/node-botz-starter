import { genBotzApp } from "./app"

const name = "example botz app"
const { start } = genBotzApp({ name })

const port = Number(process.env.PORT) || 3001

start(port)
