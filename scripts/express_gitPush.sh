#!/usr/bin/env bash

set -ex

git add .
git commit -m"$1"
git push

echo "done"
