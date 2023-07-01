# node-botz-starter

## Set up

```bash
nvm use
yarn
```

To install `nvm` follow the instructions [here](https://gist.github.com/xiaoyunyang/3e79356f6547a791192187ae777ed839).

## Develop

`yarn dev:all` will run all the botz concurrently. By default:

- localhost:3001 - Hello World BotzApp - sends back text "Hello World". This is an example of `OPEN_API` variant of BotzApp.
- localhost:3002 - [MTA BotzApp](botz/mta/README.md) - makes a request to the MTA API. This is an example of `PUBLIC_API` variant of BotzApp.
- localhost:3003 - [Gmail BotzApp](botz/gmail/README.md) - sends an email. This is an example of `GOOGLE_OAUTH` variant of BotzApp.

Please read the README in each botz directory for more information.
