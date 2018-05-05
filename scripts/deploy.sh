#!/usr/bin/env bash

set -e

export PATH=node_modules/.bin:$PATH

#write
functions deploy write --source ./dist/lib --entry-point write --trigger-http --region europe-west1-b

# setup
functions deploy setup --source ./dist/lib --entry-point setup --trigger-http --region europe-west1-b