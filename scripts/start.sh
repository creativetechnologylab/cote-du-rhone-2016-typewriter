#!/bin/bash

DIR="$( cd "$( dirname "${BASH_SOURCE[0]}" )" && pwd )"
# Restarts - may error if app isn't already started.
pm2 delete app
cd $DIR/../node-simple && pm2 start app.js

