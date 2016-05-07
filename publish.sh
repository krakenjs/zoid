#!/bin/sh

set -e;

gulp build;

git add dist;
git commit -m "Dist" || echo "Nothing to distribute";

mversion patch -m '%s';

git push;
git push --tags;
npm publish;
