## Simple Hello World Bot

`genBotzApp` is the SDK that generates a bot that you can configure.

In this simple example, we are creating a bot that will respond with "Hello World" when it's called.

```ts
const { start } = genBotzApp({
  variant: "OPEN_API",
  name: "Hello World"
})
```

The `OPEN_API` variant means that the bot will be exposed via an open endpoint that requires no API key.

To run this bot on port 3001, call the `start` function that is returned from `genBotzApp`.

```ts
start(3001)
```

`gen-botz` is a CLI tool that generates a bot template for you to start with.
