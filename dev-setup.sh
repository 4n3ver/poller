#!/usr/bin/env bash
npm install --global gulp
npm install --global webpack
npm install --global nodemon
npm install
cd semantic/
gulp build
cd ..
nodemon build/app-server.js &
webpack --progress --colors --watch &
echo "uncheck File > Settings... > System Settings > Use safe write (save
changes to a temporary file first)."
