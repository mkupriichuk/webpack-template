# Getting Started

## 1. Clone repo

```
$ git clone https://github.com/mkupriichuk/webpack-template.git .
```

## 2. Select a branch

```
default master branch // react/typescript/scss with pre-configured mobx,axios,rr-dom
git checkout redux // react/typescript/scss with pre-configured REDUX,axios,rr-dom
git checkout redux-toolkit // react/typescript/scss with pre-configured redux-toolkit,axios,rr-dom
git checkout react // react-sass
git checkout react-css // react-css
git checkout react-ts // react css typescript
git checkout react-scss-ts // react scss typescript
git checkout html // simply html
git checkout pug // pug (deprecated, do not updated anymore)
git checkout nunjucks // nunjucks (deprecated, do not updated anymore)
```

## 3. Install packages

```
npm install
yarn install
```


## 4. Start dev

Server start at http://localhost:3000/

```
npm run dev
yarn run dev
```

## 5. Env files

If you want to use variables from env files, you can create the following files in the root directory:

```
// single env file
.env

// Different files for development and production mode.
.env.development
.env.production
/**
Please note if you are using .env.development when developing
you should also use .env.production in production
*/
```

### SVG usage:
#### You can use SVG as an asset. For this add ?url to the end of filename:
```
js\ts:
import twitter from './twitter.svg?url'
...
<img src={twitter} alt="twitter" />

or in css:
background-image: url('./twitter.svg')
```
#### Or inline (svgr)
```
js\ts:
import Twitter from './twitter.svg'
...
<Twitter />
```

## 6. Build

- Build the app:

```
$ yarn run build
```
Or:

```
$ npm run build
```

## 7.Purify-Css
  - Do not forget to configure [Purify](https://github.com/purifycss/purifycss) config on ./config/helpers/purify.js
  - Now:

```
$ yarn run purify
```
Or:

```
$ npm run purify
```

## 8. Server
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
