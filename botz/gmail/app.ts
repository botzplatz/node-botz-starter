import { authenticate } from "@google-cloud/local-auth"
import express from "express"
import { google } from "googleapis"
import path from "path"

import { AppConfig } from "../shared/types"


// TODO: Can this be derived from emailInputs?
interface EmailInputs {
  fromEmail: string
  toEmail: string
  subject: string
  body: string
}

const genMessage = ({
  fromEmail, toEmail, subject, body
}: EmailInputs) => {
  const utf8Subject = `=?utf-8?B?${Buffer.from(subject).toString("base64")}?=`
  const messageParts = [
    `From: <${fromEmail}>`,
    `To: <${toEmail}>`,
    "Content-Type: text/html; charset=utf-8",
    "MIME-Version: 1.0",
    `Subject: ${utf8Subject}`,
    "",
    body
  ]
  return messageParts.join("\n")
}

const sendEmail = async (input: EmailInputs) => {
  const message = genMessage(input)
  const gmail = google.gmail("v1")

  const encodedMessage = Buffer.from(message)
    .toString("base64")
    .replace(/\+/g, "-")
    .replace(/\//g, "_")
    .replace(/=+$/, "")
  const res = await gmail.users.messages.send({
    userId: "me",
    requestBody: {
      raw: encodedMessage,
    }
  })
  return res
}

const authenticateGoogle = async () => {
  const auth = await authenticate({
    keyfilePath: path.join(__dirname, "./oauth2.keys.json"),
    scopes: [
      "https://mail.google.com/",
      "https://www.googleapis.com/auth/gmail.modify",
      "https://www.googleapis.com/auth/gmail.compose",
      "https://www.googleapis.com/auth/gmail.send",
    ],
  })
  google.options({ auth })
}
export const genBotzApp = ({ name = "", apiInputs }: AppConfig) => {
  const app = express()
  app.use(express.json())
  app.use(express.urlencoded())
  app.post("/", (req, res) => {
    const inputs = !apiInputs ? null : apiInputs.reduce((acc, inputName) => ({
      ...acc,
      [inputName]: req.body[inputName]
    }), {}) as EmailInputs
    if (!inputs) {
      return res.json({
        error: "API_INPUT_MISSING",
      })
    }
    sendEmail(inputs).then((data) => {
      return res.json({
        data,
        error: null
      })
    }).catch(() => {
      return res.json({
        error: "ERROR",
      })
    })
  })
  const start = (port: number) => {
    // Obtain user credentials to use for the request
    authenticateGoogle().then(() => {
      app.listen(port, () => {
        console.log(`[${name}]: Server is running at http://localhost:${port}`)
      })
    })
  }
  return {
    start,
  }
}
