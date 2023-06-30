// See - https://github.com/googleapis/google-api-nodejs-client/blob/main/samples/gmail/send.js

// You can use UTF-8 encoding for the subject using the method below.
// You can also just use a plain string if you don't need anything fancy.

export const SUBJECT = "🤘 Hello from Botzplatz 🤘"
const utf8Subject = `=?utf-8?B?${Buffer.from(SUBJECT).toString("base64")}?=`
export const MESSAGE_PARTS = [
    "From: Xiaoyun Yang <yangx232@gmail.com>",
    "To: Xiaoyun Yang <yangx232@gmail.com>",
    "Content-Type: text/html; charset=utf-8",
    "MIME-Version: 1.0",
    `Subject: ${utf8Subject}`,
    "",
    "This is a message just to say hello.",
    "So... <b>Hello!</b>  🤘❤️😎",
]
