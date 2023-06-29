import { genBotzApp } from "./app"

const name = "Simple Node App"
const { start } = genBotzApp({ name })

const port = Number(process.env.PORT) || 3001

start(port)
