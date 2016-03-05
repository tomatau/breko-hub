[![Circle CI](https://circleci.com/gh/tomatau/breko-hub.svg?style=svg)](https://circleci.com/gh/tomatau/breko-hub)

**B**abel **Re**act **Ko**a - **H**ot **U**niversal **B**oilerplate
### Breko-hub

Another starter kit for Universal React applications.

The goal here is to build on the existing starter kits, but using smaller files and simple solutions where possible to achieve similar results.

This boilerplate doesn't include any existing applications - so you don't need to delete too much before getting started.

## What's in the box?

There's a FooRoute component showing how to wire up data on pre-render of both server and client, as well as just client only data.

There's a BarRoute component showing how to prefetch route data with a promise-action.

A tiny trivial API to support the BarRoute's data needs.

There's a Private route doing a redirect on both client and server with a flash message.

FlashMessage component gives an example of action -> reducer flow, as well as a saga to remove messages after a delay. This also shows some BEM utility for managing class names from css-modules in SCSS.

A commented out dispatch call in `src/app/entry.js` to show how to broadcast actions over a socket. And a small socket server hosted within the app (on the same port) to wire up the said broadcast actions.

## Features

- Configurable async CSS files for improved page loads
- Babel 6
- React 0.14
- Redux 3
- Koa 1
- React-router 2
- SocketIO integrated with redux
- Redux sagas for side effects
- Router integrated with redux
- Server side data fetching through redux
- No global dependencies
- Consistent code style
  + ES6 features throughout
  + Minimal `require` statements
- Asset file imports
- (S)CSS Modules
- PostCSS
- Hot loading
  + Components
  + Reducers
  + Server API and routing
  + (S)CSS modules
- Simple configurations
  + .Env file integration
  + Minimal isomorphic setup
  + Seperate webpack configs for development and production
- Lots of logging and debugging support
  + Redux-devtools
  + debug on both client and server
  + Server request logging
  + Redux logging both client and server dispatches
- Universal Unit tests (all through babel)
  + Mocha
  + skin-deep for simple shallow component tests
  + enzyme on both server and client tests too... for more involved component tests
  + chai and some helper libs
- Functional/Integration Tests (all through babel)
  + Mocha
  + Client render, routing logic
  + Server render, route matching logic, headers and assets
  + Server API routes
- Lots of utilities
  + lodash and ramda both with babel optimisation plugins
  + more

## Usage

**setup**

1. git clone
2. npm install
3. It's recommended to create a `.env` file for local development in the project root. An example `.env` file has been provided.

Do not check-in your `.env`. When in production, you would want to set the appropriate settings in the deployment environment as environmental variables. The `.env` file will never overwrite that which exists in your environment.

Breko Hub will attempt to use a `.env` file. If no .env exists, the app will default to development mode with a port 9001.

**developing**
```shell
npm run dev [-- --open]
```

Builds and serves app with hot reloading and debugging support.

**production build**
```shell
npm run build
```

Creates bundles and assets into `src/static`.

**start the server**
```shell
npm start
```

Expects bundles and assets, runs the server in production mode.

***unit test development server***
```shell
npm test
```

Using mocha and webpack middleware to start test server that will provide browser based testing environment. Loading tests from within `./src` where extension is `.test.js`.

This allows tests to be placed next to the file they are testing as well as a nice developer experience developing tests in a browser. Most server code can also be tested this way.

***unit test single run***
```shell
npm test -- --run
```

Runs the test suite in node environment through mocha, once.

***functional/integration tests run***
```shell
npm test -- --functional
```

The purpose of the functional (integration) tests is to sit between unit tests and acceptance tests. They are for testing groups of units and how they communicate without being too closely coupled to implementation.

Functional tests can only be ran in Node context (not the browser) as they contain tests for the server logic. The functional tests are faster than *Acceptance* tests as they stub out IO. The server render tests stub out all client render logic.

It would be possible here to create specific tests for connections to IO if it's desired to test wiring between a DB or external API also. But as Breko-hub doesn't use either of these, the contracts between client and server code are tested instead.

**lint**
```
npm run lint
npm run lint:styles
```

No semi colons, lots of commas on multi-lines for easy duplication, single-quotes. You may not like it, but it works just fine.

Style linting is all default except for some rules which are not important for css modules.

## Coming Soon

- Example applications. I'd rather not just make a counter or TodoList though!
- More tests.
- Better documentation.

## Description

**.env**

This project will be looking for various settings in your runtime environment, such as `PORT`, `NODE_ENV`, `DEBUG`. When developing, it's nice to use a `.env` file. The app will load an environment from your `.env`.

**ES Imports**

`babel` has been configured to treat `src/` as the default import root. 

Using absolute requires helps with module portability and clarity, no-one enjoys `../../../` and in a large application it's very appealing to give some hierarchy to units of code.

`babel-root-imports` is also included which resolves modules according to the project route when the suffix `~` is used -- this is handy if you need to require something from above `src/`.


**Head and Body Script Loading**

When concentrating on load time performance of an application, it's a large improvement to focus on the above-the-fold or asynchronous asset loading split. So, there are intentionally, 2 entry points for this application, `body` and `head`. This is to give the developer more control over where their scripts are injected into the page. The bodyStyles array will load in css asynchronously after DOMContentLoaded.

Unfortunately the CSS to JS correspondence in many projects are not perfect, as JS required in the body build could require a CSS file that is suitable for the `head.css` bundle. The developer can configure this in `src/server/middleware/renderRouteContext.es` by moving the available assets into the appropriate inclusion array.  Also the ExtractTextPlugin will grab CSS (that isn't modular) into the head bundle from the body build.

Whilst developing, to make the most of CSS hot reloading on the client, CSS-modules are not caught by ExtractTextPlugin -- this will be disabled in production but can be configured in the appropriate configurations.

**CSS Modules**

You can import any SCSS or CSS into a client JS file, if the file has the extension `/.module.s?css/`, then it will be imported as a CSS-module. This gives more clarity about what sort of CSS file is being dealt with as well as some flexibility when managing styles.

### Engine
- npm v3.x
- node v5.x

This project has been developed and tested using the above versions of npm and node. It's advised to use the same engine when using this boilerplate but it may still work with other configurations.

Also, it probably doesn't work to develop, build, test or serve on Windows... if you want to make PRs for that, please do! (But nothing too ugly, I'd rather people just stopped that whole windows development thing.)

## Thanks For Ideas!

This boilerplate is shamelessly reusing some ideas from:

- https://github.com/glenjamin/ultimate-hot-reloading-example
- https://github.com/erikras/react-redux-universal-hot-example
- https://github.com/davezuko/react-redux-starter-kit
