**B**abel **Re**act **Ko**a - **H**ot **U**niversal **B**oilerplate
# Breko-hub

Yes, another starter-kit, boilerplate for React Universal applications.

[TOC]

## Goals

I'm creating this because I want a universal starting kit for react applications that is easy to understand, use and customise.

To achieve this, I've focused on smaller units of code that are consistent in their code style between both client and server.

## Features

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

### production build [TODO]
assumes environmental variables
```shell
npm build
```

### start the server [TODO]
assumes environmental variables
```shell
npm start [TODO]
```

### build and serve
with babel-hmr, reads from `./.env` file
```shell
npm run dev
```

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







