#!/bin/bash

echo "Installing bower components..."
bower install -V

echo "Deleting old app components..."
rm -rf app/bower_components

echo "Coping new bower components to app..."
cp -r bower_components app/bower_components

echo "Compressing and mangling javascript..."
./node_modules/uglify-js/bin/uglifyjs app/js/services.js app/js/controllers.js app/js/app.js -o app/js/app.min.js --compress --mangle

echo "Compressing css..."
cat app/css/app.css | ./node_modules/clean-css/bin/cleancss -o app/css/app.min.css

echo "Done¡"