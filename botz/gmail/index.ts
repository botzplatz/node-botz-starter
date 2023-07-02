import { resolve } from "path"
import path from "path"
import { load } from "ts-dotenv"

import { genBotzApp } from "../../botzapp"
import { genAuthenticate, sendEmail } from "./utils"

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

const authFilePath = path.join(__dirname, "./oauth2.keys.json")
console.log(authFilePath)
const { start } = genBotzApp({
  variant: "OAUTH",
  name,
  apiInputs: emailInputs,
  authenticate: genAuthenticate(authFilePath),
  interactWithThirdPartyApi: sendEmail
})

const port = Number(env.PORT) || 3003

start(port)
