#!/usr/bin/env sh

mocha 'src/**/*.test.js' --compilers js:babel-register $@
