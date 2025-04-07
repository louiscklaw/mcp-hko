#!/usr/bin/env bash

set -ex

npx nodemon \
  --ext ts \
  --watch src \
  --watch __tests__ \
  --exec "npm run clean && npm run build && npm run test"

# --ext ts,mjs \
