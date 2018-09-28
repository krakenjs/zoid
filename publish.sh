#!/bin/sh

set -e;

if ! git diff-files --quiet; then
    echo "Can not publish with unstaged uncommited changes";
    exit 1;
fi;

if ! git diff-index --quiet --cached HEAD; then
    echo "Can not publish with staged uncommited changes";
    exit 1;
fi;

rm -rf node_modules/post-robot node_modules/zalgo-promise node_modules/beaver-logger node_modules/cross-domain-safe-weakmap node_modules/cross-domain-utils node_modules/belter;
npm install post-robot zalgo-promise beaver-logger cross-domain-safe-weakmap cross-domain-utils belter;

git checkout dist;
rm -rf dist/*;
npm run build;

git add dist;
git commit -m "Dist" || echo "Nothing to distribute";

npm version ${1-patch};

git push;
git push --tags;
npm publish;
