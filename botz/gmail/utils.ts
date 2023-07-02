import { authenticate as authenticateWithGoogle } from "@google-cloud/local-auth"
import { google } from "googleapis"

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

export const sendEmail = async (input: EmailInputs) => {
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

export const genAuthenticate = (authFilePath: string) => async () => {
  const auth = await authenticateWithGoogle({
    keyfilePath: authFilePath,
    scopes: [
      "https://mail.google.com/",
      "https://www.googleapis.com/auth/gmail.modify",
      "https://www.googleapis.com/auth/gmail.compose",
      "https://www.googleapis.com/auth/gmail.send",
    ],
  })
  google.options({ auth })
}
