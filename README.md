# Getting Started

## 1. Get the latest version

You can start by cloning the latest version of project on your local machine by running:

```
$ git clone https://github.com/maksymkpr/webpack-template.git
```

## 2. Run yarn install or npm install

This will install both run-time project dependencies and developer tools listed in package.json file.


## 3. Run yarn run dev or npm run dev

This command will start the app from the source files (/src).

```
http://localhost:3000/
```

You can change the port, for this go to ./config/devserver.js


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
  - Do not forget to configure Purify config on ./config/helpers/purify.js
  - Now:

```
$ yarn run purify
```
Or:

```
$ npm run purify
```
## 6. Creating icon font
1. Put ur svg icons to src/icons/icon_font/icons
2. Go to ./config/helpers/iconfont.js and configure fontName, fontFormats, etc
3. Run webfont generator
```
$ yarn run iconfont
```
Or:

```
$ npm run iconfont
```
- .Font files will be created in the src/fonts/{FONT_NAME}/
- _{FONT_NAME}.sass will be created on the src/sass/_helpers/
- add the font to the sass file: +font-face("{FONT_NAME}", "{FONT_NAME}/{FONT_NAME}")
- Now u can add twitter or some icon on ur pug files like this: i.icon.icon-twitter or span.icon.icon-twitter...

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
