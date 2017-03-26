#!/bin/sh

set -e;

gulp build;

git add dist;
git commit -m "Dist" || echo "Nothing to distribute";

npm version ${1-patch};

git push;
git push --tags;
npm publish;
