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
git checkout react-ts // react css typescript
git checkout react-scss-ts // react scss typescript
git checkout standart // react with typescript,mobx,axios,scss
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

### SVG usage:
#### Svgs which stores in public folder used by default webpack file loader:
```
js\ts:
import twitter from 'public/twitter.svg'
...
<img src={twitter} alt="twitter" />

or in css:
background-image: url('public/twitter.svg')
```

#### Svgs which stores in src/components folder used by @svgr/webpack, but still can be usage on css like a background: 
```
js\ts:
import Twitter from 'components/Header'
...
<Twitter/>

or in css:
background-image: url('./twitter.svg')
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
