#!/usr/bin/env bash
set -e

npm run test:unit -- --reporter=nyan
npm run test:int
