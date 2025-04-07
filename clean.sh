#!/usr/bin/env bash

find . -iname "*bak" -exec rm -rf {} +
find . -iname "*Zone.Identifier" -exec rm -rf {} +
# find . -iname ".pnpm" -exec rm -rf {} +
# find . -iname ".next" -exec rm -rf {} +
find . -iname "build" -exec rm -rf {} +
find . -iname "node_modules" -exec rm -rf {} +

echo "clean done"
