#!/bin/bash

bower install

rm -rf app/bower_components
cp -r bower_components app/bower_components