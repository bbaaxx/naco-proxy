NAco - Mocking API
==================
A service with an API to create mocks and quickly recreate scenarios, super useful to reproduce and troubleshoot issues when you don't have a representative environment.

[![code style: prettier](https://img.shields.io/badge/code_style-prettier-ff69b4.svg?style=flat-square)](https://github.com/prettier/prettier)
___

Getting started
---------------

### With NPM

* Clone and install dependencies
```bash
git clone https://github.com/bbaaxx/naco-proxy.git
cd naco-proxy
npm install
```
* [Generate a .env file](Creating an .env file) in the project root

* Bring up the server
```
npm start
```
* Go to the API docs to start using the service.

### With Docker
* Clone this repo
```bash
git clone https://github.com/bbaaxx/naco-proxy.git
cd naco-proxy
```
* Generate a .env file in the project root
* Bring up the server
```
npm start
```

### Creating an `.env` file
```bash
# NAco proxy environment configuration
# (this is a bash file so, mind the whitespace)
APP_ID=naco-proxy         # [Required] A name for your app
PORT=3838
NODE_ENV=development      # defaults to: development
NEDB_URI="nedb://.data"   # [Required] .data is a folder located at ./.data
DEBUG="naco-proxy"        # see node's debug
JWT_SECRET=supersecret    # [Required] A secret string to sign your tokens
JWT_TIMEOUT="2h"          # [Required] The timeout
```
An empty template ready to be filled/renamed is provided in `.env-template`.
