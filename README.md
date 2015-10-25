**B**abel **Re**act **Ko**a - **H**ot **U**niversal **B**oilerplate
# Breko-hub

Yes, another starter-kit, boilerplate for React Universal applications.

[TOC]

## Goals

I'm creating this because I want a universal starting kit for react applications that is easy to understand, use and customise.

To achieve this, I've focused on smaller units of code that are consistent in their code style between both client and server.

## Features

### Engine
- npm v3.3.x
- node v4.1.x

### Development
- Hot reloading client JS
- Hot reloading client CSS modules
- Hot reloading server
- Hot reloading client build within server
- Loading environment through .env
- No global npm module requirements
- No concurrent npm script requirements
- Sorry, probably doesn't work on windows and isn't supposed to.

### Production
- Webpack babel compile for all client code
- Babel runtime compile for all server code
- React v14
- Koa JS integration
- Optional CSS-modules or import to CSS file
- SCSS preprocessing CSS-modules
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
npm start [TODO]
```

This will run the application and serve any assets built to the configured public directory.

### build and serve
```shell
npm run dev
```

Using webpack-middleware to build the assets into tmp and serving with hot reloading.

### one time run mocha unit tests [TODO]
```shell
npm test
```

### one time run functional tests [TODO]
```shell
npm test -- ci
```

## Todo

- [x] include directories into css and scss imports for both modules and non-modules
- [ ] Setup redux on client
- [ ] Setup redux on server with initialState
- [ ] Setup Log and Dock Monitors for redux state
- [ ] Create build config and bundle CSS-modules (no hot loading required)
- [ ] Create start script to fire up server without building
- [ ] Improve routing of private/public routes through react-router
- [ ] Wire up react-router state to webpack (redux react router?)


## Details

**Environment**

This project will be looking for various settings in your runtime environment, such as `PORT`, `NODE_ENV`, `LOG_LEVEL or NPM_CONFIG_LOG_LEVEL`. When developing, it's nice to use a `.env` file, so the configuration will look for `process.env.ENVIRONMENT` and if this is a falsey value -- it will load an environment from your `.env`. Therefore, in production, it is worth setting `ENVIRONMENT=true` to prevent the `.env` file from being used.

**ES6 Imports**

This project is ran through babel stage 0, also with the help of a plugin named `babel-root-imports` which resolves modules according to the project route when the suffix `~` is used. 

Using absolute requires helps with module portability and clarity, noone enjoys `../../../` and in a large application it's very appealing to give some hierarchy to units of code. Ideally it would be possible to use the `resolve.root` feature of webpack, but this isn't possible without compiling the server code through webpack... So, `babel-root-imports` is a universal solution for this.

**Head and Body Script Loading**

When concentrating on load time performance of an application, it's a large improvement to focus on the above-the-fold or asynchronous asset loading split. So, there are intentionally, 2 entry points for this application, `body` and `head`. This is to give the developer more control over where their scripts are injected into the page. The bodyStyles array will load in css asynchronously after DOMContentLoaded.

Unfortunately the CSS to JS correspondence in many projects are not perfect, as JS required in the body build could require a CSS file that is suitable for the `head.css` bundle. The developer can configure this in `src/server/middleware/renderRouteContext.es6` by moving the available assets into the appropriate inclusion array.  Also the ExtractTextPlugin will grab CSS (that isn't modular) into the head bundle from the body build.

Whilst developing, to make the most of CSS hot reloading on the client, CSS-modules are not caught by ExtractTextPlugin -- this will be disabled in production but can be configured in the appropriate configurations.

**CSS Modules**

You can import any SCSS or CSS into a client JS file, if the file has the extension `/.module.s?css/`, then it will be imported as a CSS-module. This gives more clarity about what sort of CSS file is being dealt with as well as some flexibility when managing styles.
