**B**abel **Re**act **Ko**a - **H**ot **U**niversal **B**oilerplate
# Breko-hub

Yes, another starter-kit/boilerplate for React Universal applications!

[TOC]

## Goals

This has been created because of a want for a universal starting kit that is easy to understand, use and customise.

To achieve this, focused has been on composing smaller units of code that are consistent in their code style between both client and server.

Another large focus is on Developer Experience, using hot reloading on both client and server for ES7 files and SCSS-modules.

## Features

### Engine
- npm v3.3.x
- node v5.0.x

This project has been developed and tested using the above versions of npm and node. It's advised to use the same engine when using this boilerplate but it may still work with other configurations.

### Development
- Hot reloading client JS (redux-reducer chain, etc...)
- Hot reloading client CSS modules
- Hot reloading server
- Hot reloading client build within server
- Loading environment through `.env` or environment
- No global npm module requirements
- No concurrent npm script requirements
- Sorry, probably doesn't work on windows and isn't supposed to.
- Minimal application setup for Koa including session, favicon, compression, etc...
- Redux-devtools beta-3 with dock and log monitors
- ES7 Mocha Unit-tests runnable in browser with hot-reloading

### Production
- Webpack babel compile for all client code
- Babel runtime compile for all server code
- React v14
- Redux
- Koa JS
- Optional CSS-modules or Extract to CSS file
- SCSS preprocessing for CSS-modules or Extracted CSS
- Head and/or body scripts for optimising JS and CSS first time page load
- Universal React-router integration

## Usage

### production build
```shell
npm run build
```

Building creates bundles and assets through webpack and saves them into the untracked `src/static` folder.

### start the server
```shell
npm start
```

This will run the application and serve any assets built to the configured public directory.

### build and serve
```shell
npm run dev
```

Using webpack-middleware to build the assets into tmp and serving with hot reloading.

### unit test development server
```shell
npm test
```

Using mocha and webpack middleware to start test server that will provide browser based testing environment. Loading tests from within `./src` where extension is `.test.es` or imported directly from within `./test/index.es`.

This allows tests to be placed next to the file they are testing as well as a nice developer experience developing tests in a browser (including most server code).

### unit test single run in node
```shell
npm test -- --run
```

### one time run functional tests [TODO -- waiting for cypressIO]
```shell
npm test -- functional
```

### lint
```
npm run lint
```

No semi colons, lots of commas on multi-lines for easy duplication, single-quotes, etc...

## Todo

- [x] include directories into CSS and SCSS imports for both modules and non-modules
- [x] Setup redux on client
- [x] Setup redux on server with initialState
- [x] Setup Log and Dock Monitors for redux state
- [x] Create build config and bundle CSS-modules (no hot loading required)
- [x] Create start script to fire up server without building
- [x] Integrate koa-router
- [x] Session middleware, favicon, compression and logging
- [x] Flash messages middleware to server generated InitialState
- [x] Socket integration 
- [x] Sockets through redux reducer chain
- [ ] Upgrade babel to v6
- [ ] Example application
- [x] Upgrade React 0.14.2
- [x] Upgrade React-Router 1
- [x] Unit Test Runner in browser
- [x] Unit Test Runner in node
- [x] Linting
- [x] Unit tests for server compose middleware
- [x] React router state in store with redux-simple-router
- [ ] Unit tests for client reducers
- [x] Universal route data fetching

## Details

**Environment**

This project will be looking for various settings in your runtime environment, such as `PORT`, `NODE_ENV`, `LOG_LEVEL or NPM_CONFIG_LOG_LEVEL`. When developing, it's nice to use a `.env` file, so the configuration will look for `process.env.ENVIRONMENT` and if this is a falsey value -- it will load an environment from your `.env`. Therefore, in production, it is worth setting `ENVIRONMENT=true` to prevent the `.env` file from being used.

**ES Imports**

This project is ran through babel stage 0, also with the help of a plug-in named `babel-root-imports` which resolves modules according to the project route when the suffix `~` is used. 

Using absolute requires helps with module portability and clarity, no-one enjoys `../../../` and in a large application it's very appealing to give some hierarchy to units of code. Ideally it would be possible to use the `resolve.root` feature of webpack, but this isn't possible without compiling the server code through webpack... So, `babel-root-imports` is a universal solution for this.

**Head and Body Script Loading**

When concentrating on load time performance of an application, it's a large improvement to focus on the above-the-fold or asynchronous asset loading split. So, there are intentionally, 2 entry points for this application, `body` and `head`. This is to give the developer more control over where their scripts are injected into the page. The bodyStyles array will load in css asynchronously after DOMContentLoaded.

Unfortunately the CSS to JS correspondence in many projects are not perfect, as JS required in the body build could require a CSS file that is suitable for the `head.css` bundle. The developer can configure this in `src/server/middleware/renderRouteContext.es` by moving the available assets into the appropriate inclusion array.  Also the ExtractTextPlugin will grab CSS (that isn't modular) into the head bundle from the body build.

Whilst developing, to make the most of CSS hot reloading on the client, CSS-modules are not caught by ExtractTextPlugin -- this will be disabled in production but can be configured in the appropriate configurations.

**CSS Modules**

You can import any SCSS or CSS into a client JS file, if the file has the extension `/.module.s?css/`, then it will be imported as a CSS-module. This gives more clarity about what sort of CSS file is being dealt with as well as some flexibility when managing styles.

## Thanks For Ideas!

This repo is shamelessly reusing the ideas taken from:

- https://github.com/glenjamin/ultimate-hot-reloading-example
- https://github.com/erikras/react-redux-universal-hot-example
