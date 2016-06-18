# nodejs-koa-template

[![Build Status](https://travis-ci.org/airmanx86/nodejs-koa-template.svg?branch=master)](https://travis-ci.org/airmanx86/nodejs-koa-template)

A NodeJS template using koa as the web framework.
Also come with logging, task runner and QA tools.
This project is based on [base-template](https://github.com/airmanx86/base-template).

## How to use the template
1. Make a new git repository base on master branch of `nodejs-koa-template`.
```
mkdir your-service
cd your-service
git init
git fetch https://github.com/airmanx86/nodejs-koa-template.git
git reset --hard FETCH_HEAD
```
2. Create your remote repository and obtain the URL
```
git remote add origin https://github.com/your-name/your-service.git
git remote -v
git push origin master
```

## Run the app
This project is configured using environment variables. We use [dotenv](https://github.com/motdotla/dotenv) to configure these environment variables during development.

Create `.env` file in `app` folder with the following values
```
HTTP_PORT=3000
PROTOCOL=http
USE_TRUST_PROXY=false
```
If you want HTTPS add these too
```
HTTPS_PORT=3443
HTTPS_KEY_PATH=/your-path-to/private/server_key.pem
HTTPS_CERT_PATH=/your-path-to/certs/server_crt.pem
PROTOCOL=https
```
Install npm packages with
```
npm install
```
Then run `node app/server` or use `grunt dev` which would detect change and auto restart the app.

## Test
Run `grunt test`

## Contributing
Please read `CONTRIBUTING.md` to understand how best to contribute to this repo.
