# node-botz-starter

## Set up

```bash
nvm use
yarn
```

To install `nvm` follow the instructions [here](https://gist.github.com/xiaoyunyang/3e79356f6547a791192187ae777ed839).

## Develop

`yarn dev:all` will run all the botz concurrently. By default:

- localhost:3001 - Simple BotzApp - sends back text "Simple Node App"
- localhost:3002 - [MTA BotzApp](botz/mta/README.md) - makes a request to the MTA API
- localhost:3003 - [Gmail BotzApp](botz/gmail/README.md) - sends an email

Please read the README in each botz directory for more information.
