#!/usr/bin/env sh

mocha 'test/functional/**/*.test.js' --compilers js:babel-register $@
