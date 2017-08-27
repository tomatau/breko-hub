#!/usr/bin/env bash

babel-node \
  `npm bin`/babel-istanbul cover \
    `npm bin`/_mocha -- \
      'src/**/*.spec.js' \
      'test/functional/**/*.test.js' \
      $@
