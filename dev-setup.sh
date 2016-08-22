#!/usr/bin/env bash
npm install --global webpack nodemon
npm install
nodemon build/app-server.js &
webpack --progress --colors --watch &
echo "uncheck File > Settings... > System Settings > Use safe write (save
changes to a temporary file first)."
