import { resolve } from "path"
import { load } from "ts-dotenv"

import { genBotzApp } from "./app"

const name = "Send Email"

const env = load({
  PORT: Number,
}, {
  path: resolve(__dirname, "./.env"),
})

const emailInputs = [
  "fromEmail",
  "toEmail",
  "subject",
  "body",
]

const { start } = genBotzApp({
  name,
  apiInputs: emailInputs,
})

const port = Number(env.PORT) || 3001

start(port)
