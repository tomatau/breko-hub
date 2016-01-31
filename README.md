**B**abel **Re**act **Ko**a - **H**ot **U**niversal **B**oilerplate
# Breko-hub

Another starter kit for Universal React applications.

# Why Another Starter Kit?

The goal here is to build on the existing starter kits, but using smaller files and simple solutions where possible to achieve similar results.

Also, this boilerplate doesn't include any existing applications - so you don't need to delete anything before getting started.

# Features

- Configurable async CSS files for improved page loads
- Babel 6
- React 0.14
- Redux 3.0
- Koa 1.0
- React-router 1.0
- SocketIO integrated with redux
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
- Universal tests

## Usage

**setup**

1. git clone
2. npm install
3. It's recommended to create a `.env` file for local development in the project root. An example `.env` file would be:

```
NODE_ENV=development
NPM_CONFIG_LOGLEVEL=warn
NPM_CONFIG_PRODUCTION=false
NODE_MODULES_CACHE=false
PORT=9001
DATABASE_URL=
TEST_DATABASE_URL=
DEBUG=*,-babel,-koa*,-css-modules*,-engine*,-socket.io*
```

Do not check-in this file. When in production, you would want to set the appropriate settings in the deployment environment as environmental variables. The `.env` file will never overwrite that which exists in your environment.

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

Using mocha and webpack middleware to start test server that will provide browser based testing environment. Loading tests from within `./src` where extension is `.test.js` or imported directly from within `./test/index.js`.

This allows tests to be placed next to the file they are testing as well as a nice developer experience developing tests in a browser. Most server code can also be tested this way.

***unit test single run***
```shell
npm test -- --run
```

Runs the test suite in node environment through mocha, once.

**lint**
```
npm run lint
```

No semi colons, lots of commas on multi-lines for easy duplication, single-quotes. You may not like it, but it works just fine.

## Coming Soon

- Some sort of example application. I'd rather not just make a counter or TodoList though!
- More tests, currently only two middleware are tested. Once an example is ready, the testing situation will be kicked around a lot more.
- Docs, I'd like to explain all the features in more detail.

## Description

**.env**

This project will be looking for various settings in your runtime environment, such as `PORT`, `NODE_ENV`, `DEBUG`. When developing, it's nice to use a `.env` file. The app will load an environment from your `.env`.

**ES Imports**

This project is ran through babel stage 0, also with the help of a plug-in named `babel-root-imports` which resolves modules according to the project route when the suffix `~` is used. 

Using absolute requires helps with module portability and clarity, no-one enjoys `../../../` and in a large application it's very appealing to give some hierarchy to units of code. Ideally it would be possible to use the `resolve.root` feature of webpack, but this isn't possible without compiling the server code through webpack... So, `babel-root-imports` is a universal solution for this.

**Head and Body Script Loading**

When concentrating on load time performance of an application, it's a large improvement to focus on the above-the-fold or asynchronous asset loading split. So, there are intentionally, 2 entry points for this application, `body` and `head`. This is to give the developer more control over where their scripts are injected into the page. The bodyStyles array will load in css asynchronously after DOMContentLoaded.

Unfortunately the CSS to JS correspondence in many projects are not perfect, as JS required in the body build could require a CSS file that is suitable for the `head.css` bundle. The developer can configure this in `src/server/middleware/renderRouteContext.es` by moving the available assets into the appropriate inclusion array.  Also the ExtractTextPlugin will grab CSS (that isn't modular) into the head bundle from the body build.

Whilst developing, to make the most of CSS hot reloading on the client, CSS-modules are not caught by ExtractTextPlugin -- this will be disabled in production but can be configured in the appropriate configurations.

**CSS Modules**

You can import any SCSS or CSS into a client JS file, if the file has the extension `/.module.s?css/`, then it will be imported as a CSS-module. This gives more clarity about what sort of CSS file is being dealt with as well as some flexibility when managing styles.

### Engine
- npm v3.3.x
- node v5.0.x

This project has been developed and tested using the above versions of npm and node. It's advised to use the same engine when using this boilerplate but it may still work with other configurations.

Also, it probably doesn't work on Windows... if you want to make PRs for that, please do! (But nothing too crazy, I'd rather people just stopped that whole windows development thing.)

## Thanks For Ideas!

This boilerplate is shamelessly reusing a bunch of ideas from:

- https://github.com/glenjamin/ultimate-hot-reloading-example
- https://github.com/erikras/react-redux-universal-hot-example
