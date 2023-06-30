import { resolve } from "path"
import path from "path"
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
  variant: "GOOGLE_OAUTH",
  name,
  apiInputs: emailInputs,
  authFilepath: path.join(__dirname, "./oauth2.keys.json"),
})

const port = Number(env.PORT) || 3003

start(port)
