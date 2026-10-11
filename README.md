# AMBL Tracks REST API

This repo contains a REST API for creating and retrieving "tracks" by ID.

Note that currently this repo uses "in-memory" storage so track data will be lost on restart.

## Requirements

- Node v24
- pnpm v10.28.2

## Setup

If you use [Node Version Manager](https://www.nvmnode.com/) (nvm), you can install and select the projects Node version:

```
nvm install
nvm use
```

However, nvm is optional and instead you should ensure you use a node version matching the requirements above.

This repo uses [pnpm](https://pnpm.io/), to install dependencies run at root:

```
pnpm install
```

## Running locally

To run the local server, run

```
pnpm dev
```

to start the server listening on localhost at port `3000`. To change this port set the env var `PORT` to a different valid value.

## Project Plan

To see how this project was planned and implemented, including stack decisions and out-of-scope features, see the [TODO.md](./TODO.md)
