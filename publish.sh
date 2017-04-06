#!/bin/sh

set -e;

rm -rf node_modules/post-robot node_modules/sync-browser-mocks node_modules/beaver-logger node_modules/cross-domain-safe-weakmap
npm install post-robot sync-browser-mocks beaver-logger cross-domain-safe-weakmap

gulp build;

git add dist;
git commit -m "Dist" || echo "Nothing to distribute";

npm version ${1-patch};

git push;
git push --tags;
npm publish;
