# Getting Started

## 0. Get the latest version

You can start by cloning the latest version of project on your local machine by running:

```
$ git clone https://github.com/mkupriichuk/webpack-template.git .
```

## 1. Select a branch

```
default master branch //pug
git checkout html // html
git checkout nunjucks // nunjucks
```

## 2. Run yarn install or npm install

This will install both run-time project dependencies and developer tools listed in package.json file.


## 3. Run yarn run dev or npm run dev

This command will start the app from the source files (/src).

```
http://localhost:3000/
```


## 4. Build

- Build the app:

```
$ yarn run build
```
Or:

```
$ npm run build
```

## 5.Purify-Css
  - Do not forget to configure [Purify](https://github.com/purifycss/purifycss) config on ./config/helpers/purify.js
  - Now:

```
$ yarn run purify
```
Or:

```
$ npm run purify
```

## 6. Server
- Run server:

```
$ yarn run server
```
Or:

```
$ npm run server
```

The server will be running on:

```
localhost:3000
```

You can modify the server.js in config/server/
