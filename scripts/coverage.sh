#!/usr/bin/env sh

babel-node \
  `npm bin`/babel-istanbul \
  cover \
  `npm bin`/_mocha -- 'src/**/*.test.js' 'test/functional/**/*.test.js' $@
