# Getting Started

## 1. Clone repo

```
$ git clone https://github.com/mkupriichuk/webpack-template.git .
```

## 2. Select a branch

```
default master branch //html
git checkout react // react-sass
git checkout react-css // react-css
git checkout pug // pug (deprecated, do not updated anymore)
git checkout nunjucks // nunjucks (deprecated, do not updated anymore)
```

## 3. Install packages

```
npm install
yarn install
```


## 4. Run yarn run dev or npm run dev

This command will start the app from the source files (/src).

```
http://localhost:3000/
```


## 5. Build

- Build the app:

```
$ yarn run build
```
Or:

```
$ npm run build
```

## 6.Purify-Css
  - Do not forget to configure [Purify](https://github.com/purifycss/purifycss) config on ./config/helpers/purify.js
  - Now:

```
$ yarn run purify
```
Or:

```
$ npm run purify
```

## 7. Server
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
