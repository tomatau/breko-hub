![Github workflow status](https://github.com/tomatau/breko-hub/workflows/Pull%20request%20and%20Push%20master%20workflow/badge.svg)

**B**abel **Re**act **Ko**a - **H**ot **U**niversal **B**oilerplate

## Breko Hub

[![Greenkeeper badge](https://badges.greenkeeper.io/tomatau/breko-hub.svg)](https://greenkeeper.io/)

Breko hub is a github repository that helps anyone create new JavaScript applications. Giving you a technically sound and well tested starting point for your application.

## Why?

Create-React-App, Razzle, NextJS, etc... are fantastic alternatives!

The reason for Breko-hub is that it comes with some extras:
- test setup for integration on client and server
- test setup with additional helpers
- config management
- accessibility features on routing
- code splitting configuration
- configuration for linting
- it's not a framework, tool or library -- so everything is transparent!

## Why not?

- The community around the alternatives are much bigger!
- There's more exposed configuration
- The documentation is lacking because
- tomatau: "I might stop supporting it one day, although I don't intend to!"
- The alternatives have some very nice features!

### Documentation

[https://tomatao.gitbooks.io/breko-hub/content/](https://tomatao.gitbooks.io/breko-hub/content/) (outdated)

### Features

- Quick setup universal SPAs
- Universal redux architecture
- Hot reloading of CSS-modules
- Fast server side hot updates
- Babel 7 codebase everywhere
- A comprehensive integration and unit test suite
- A lucid code-base
- Great debugging tools!

### Prerequsits

Breko-hub will only work on node version 6 and above as it is making use of Koa v2 along with polyfills for async/await syntax. To make it work on a lower version of node, the runtime compilation would need to be applied to koa and other node_modules.

### Quick Start

Use the following commands to get started on your new app using breko-hub.

```bash
git clone --depth=1 git@github.com:tomatau/breko-hub.git <directory-name>
cd <directory-name>
rm -rf .git
git init
npm i
mv example.env .env
npm start
```

With the default `.env` file, this will start your application in development mode on port 9001. It also provides a configuration for running the debugger with a useful console output.

Open a browser window at `localhost:9001`.

You'll see example routes that demonstrate API calls and flash messages after redirects.

You can remove the example code for a cleaner starting point by running:

```bash
npm run remove-examples
```

This is a one time operation that can't be undone, it's also advised to run this before you start making any changes as it will hard replace some `./src` files.

### Blog

There is also a new [blog](https://tomatao-blog.herokuapp.com/) that documents some of the techniques used in breko-hub. The blog was also created using breko-hub as a starting point.

### Libraries

Breko hub uses the following libraries at its core:

##### Build tools
- [webpack](https://webpack.github.io/) - A module bundler.
- [babel](http://babeljs.io/) - A JavaScript compiler.
- [webpack-isomorphic-tools](https://www.npmjs.com/package/webpack-isomorphic-tools) - Library for isomorphic rendering.

##### Server
- [koa](http://koajs.com/) - A lightweight server framework.
- [koa-router](https://github.com/alexmingoia/koa-router) - Router middleware for koa.
- [socket.io](http://socket.io/) - A node engine for WebSocket communication.
- [redux-via-socket.io](https://www.npmjs.com/package/redux-via-socket.io) - An adapter for sharing redux actions over WebSockets.

##### Universal Application
- [react](http://facebook.github.io/react/) - A library for building interfaces.
- [redux](http://redux.js.org/) - A library for state management.
- [react-router](https://github.com/reactjs/react-router) - A routing library for React.
- [connected-react-router](https://github.com/supasate/connected-react-router) - Binding between react-router and redux.
- [redux-saga](https://github.com/yelouafi/redux-saga) - Side effect management for redux.
- [reselect](https://github.com/reactjs/reselect) - A library for creating state selectors.
- [redux-promise-middleware](https://github.com/pburtchaell/redux-promise-middleware) - A redux middleware for creating asynchronous actions.

##### Utility
- [lodash](http://lodash.com/) - A popular modular utility library.
- [ramda](http://ramdajs.com/) - A modular utility library focused on functional programming.

##### Styling
- [SCSS](http://sass-lang.com/guide) - A popular CSS preprocessor.
- [PostCSS](http://postcss.org/) - CSS transformations with JavaScript.
- [css-modules](https://github.com/css-modules/css-modules) - A build step for modular, local scoped CSS management.

### Commands

**Developing**

```bash
npm run start [-- --open]
```

Builds and serves app with hot reloading and debugging support.

**Build client-side app**

Change your NODE_ENV to "production", you can do this is `.env` file or your hosted environment.

```bash
npm run build
```

Creates bundles and assets into `./src/static` directory. Reads `.env` but always uses production Webpack configuration.

**Start the server in production**

Set the NODE_ENV flag to production in your `.env` file.

```bash
npm start
```

Expects bundles and assets to exist in the `./src/static` directory. Runs the server in production mode.

**Unit test single run**

```
npm run test:unit
```

Runs the test suite in a node environment through mocha, once.

**integration tests run**

```
npm run test:int
```

Runs integration tests inside `./test/integration` directory.

**Lint**

```
npm run lint:js
npm run lint:styles
```

Reads `.eslintrc` and `sass-lint.yml` for linting configurations.

**Coverage**

```
npm run coverage
npm run coverage:check
```

Reads `.istanbul.yml` for thresholds in check.

**Unit test development server (BROKEN)**

```bash
npm run test:server
```

Start a test server using Mocha and Webpack-middleware. Provides a browser based testing environment. Loading tests from within `./src` where extension is `.test.js`.


### Configuration

Change anything you want! It's all exposed and for you! \<3

## Docker

There's a starting docker images you can use to get going. You'll probably wanr to modify the Dockerfile to your needs.

```bash
# production image built with assets
$ docker build --compress -t your-username/your-app-name .
# runs `npm start` with port at 9001
$ docker run -p 9001:9001 your-username/your-app-name
```
