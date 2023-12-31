import express from "express"

import { AppConfig } from "./types"

export const genBotzApp = (config: AppConfig) => {
  const {
    name,
    apiInputs,
    variant,
    genSuccessResponse = (data) => () => data
  } = config

  const app = express()
  if (apiInputs) {
    app.use(express.urlencoded())
    app.use(express.json())
  }

  app.post("/", (req, res) => {

    const inputs = !apiInputs ? null : apiInputs.reduce((acc, inputName) => ({
      ...acc,
      [inputName]: req.body[inputName]
    }), {})

    console.log("INPUTS", JSON.stringify(inputs, null, 2))

    switch (variant) {
      case "OAUTH":
      case "PUBLIC_API": {
        const {
          interactWithThirdPartyApi
        } = config

        // botz creator specify how to fetch the data from the public api
        // The args for fetchDataFromPublicApi is the inputs from the user
        // calling the bot
        interactWithThirdPartyApi(inputs).then((data) => {
          return res.json({
            data: genSuccessResponse(data)(inputs),
            error: null
          })
        }).catch((e) => {
          return res.json({
            error: "ERROR",
          })
        })

        break
      }
      default:
        res.send(name)
    }
  })
  const start = (port: number) => {
    if (variant === "OAUTH") {
      config.authenticate().then(() => {
        app.listen(port, () => {
          console.log(`[${name}]: Server is running at http://localhost:${port}`)
        })
      })
    } else {
      app.listen(port, () => {
        console.log(`[${name}]: Server is running at http://localhost:${port}`)
      })
    }
  }
  return {
    start,
  }
}
