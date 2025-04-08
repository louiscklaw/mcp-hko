#!/usr/bin/env bash

set -ex

if [ -z "$(git status --porcelain)" ]; then
  echo "No changes to commit"
  exit 0
fi

git add .
git commit -m"$1"
git push

echo "done"
