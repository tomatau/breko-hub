#!/usr/bin/env bash

nyc \
  mocha -- \
    'src/**/*.spec.js' \
    'test/integration/**/*.test.js' \
    $@
