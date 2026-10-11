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

This repo uses `Husky` to run pre-commit checks. This currently includes format, lint, typechecking and test, see the [TODO.md](./TODO.md) for justification. A failure in the pre-commit hook will block the commit.

## API Endpoints

The documentation for the API can be found below in place of more structured documentation due to time constraints.

### POST /tracks

Send a valid "track" object as JSON, including the upstream ID.

```
curl -i \
  -H 'Content-Type: application/json' \
  -d @src/test/fixtures/example-track.json \
  http://127.0.0.1:3000/tracks
```

A successful POST request returns the created track as JSON as well as a location header to identify how it can be retrieved. Invalid track data or a malformed JSON object will return a "400 Bad Request". A duplicated track ID will return a "409 Conflict" error and leave the existing track unchanged.

### GET /tracks

Provide a valid id for a track.

```bash
curl -i http://127.0.0.1:3000/tracks/nznx3r
```

A successful GET request returns the requested track as JSON, or a "404 Not Found" error if the track does not exist.

## Project Plan

To see how this project was planned and implemented, including stack decisions and out-of-scope features, see the [TODO.md](./TODO.md)
