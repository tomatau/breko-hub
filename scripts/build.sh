#!/usr/bin/env bash

webpack \
  --config './src/config/webpack.production.config.babel.js' \
  $@
