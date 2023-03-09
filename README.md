# @antoinebell/metamask-tenderly

This repository demonstrates how to integrate Tenderly in every transactionr request on Metamask. This is similar to the feature available on Gnosis Safe.

It is built on top of MetaMask Snaps.

## MetaMask Snaps

To interact with the Snaps, you will need to install [MetaMask Flask](https://metamask.io/flask/), a canary distribution for developers that provides access to upcoming features.

## Getting Started

```shell
yarn install && yarn start
```

You'll also need to configure Tenderly. To access the values required, it is recommended to install their command line. The following commands can be run after executing `tenderly login`.

There is a config file in `packages/snap/src/config.ts`. It requires four parameters:

- `TENDERLY_KEY`: Must be generated in the Tenderly account settings.
- `TENDERLY_ID`: `tenderly whoami`, "ID"
- `TENDERLY_PROJECT`: In Tenderly, check the slug of your active project. (default: project)
- `TENDERLY_USERNAME`: `tenderly whoami`, "Username"

## How to use

1. You should be able to connect to `localhost:8000` and install the Snap inside MetaMask Flask.
2. Try and make any transaction and check the new "Tenderly" tab next to "Details", "Data" and "Hex".

## How does it work?

It leverages [Tenderly Simulation API](https://docs.tenderly.co/simulations-and-forks/simulation-api/using-simulation-api). When MetaMask receives a transaction and you open the tab, it makes a request to the API passing the transaction details (from address, to contract, data, chain id) and checks what results it gets.

It's then able to display the simulated transaction status and the link to see the details,

## Future improvements

For the moment, there is no secure way to store the credentials inside a Snap. This is a blocker to release this Snap more widely unless somebody wants to give their Tenderly account for the simulations.
