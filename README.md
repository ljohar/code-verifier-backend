# code-verifier-backend

Node express project

## Scripts

- build: run webpack in mode development, the transpiled and packed code is saved in dist folder.

- build:prod: run webpack in mode production

- start: run index.js (result from transpiling)

- dev: run concurrently tsc--watch(listen permanently to any changes and transpile in the process) and index.js

- test: run Jest.

- serve:coverage: run test, redirect to coverage location and serve.

## Installed dependencies

### Production

- dotenv: accesses to environment variables from .env files

- express: web framework with node

- cors(Cross-Origin Resource Sharing): allow (from  different domains) or restrict requested resources on a web server

- helmet: help secure Express

- tsoa: create documentation with annotations (JSON swagger), works with TS.

- mongoose: allows to create querys to DB and schemas

- body-parser: allows to read BODY from requests

### Dev

- concurrently: run commands concurrently. It makes easier to run multiple commands. 

- eslint: allows to stablish rules for a cleaning code

Note: use npx tsc --init to configure eslint. It will call additional dependencides: eslint-config-standard (or the selected template in the config process), eslint-plugin-import, eslint-plugin-node and eslint-plugin-promise

- jest: JS unit testing

- nodemon: Watch for js, mjs and json files changes, relaunching every time

- serve: serve the coverage in the web

- supertest: testing HTTP servers

- ts-node: required to run the unit tests. TS execution environment and REPL for node.js(https://www.npmjs.com/search?q=ts-node).

- typescript. 

Note: use npx tsc --init to create a tsconfig file.

- @types/express, @types/jest and @types/node: TS types of these tools

- webpack: packs modules making the solution lighter

- webpack-cli: init webpack

- webpack-shell-plugin: allows webpack config

On pa
