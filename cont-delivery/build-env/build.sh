#!/bin/bash
set -o errexit

function cleanup {
    # ensure that the files created by the container
    # can be cleaned up by once the
    # corresponding build has completed
    chown -R ${CD_USER}:${CD_GROUP} /app
}

trap cleanup EXIT

npm install
grunt test
grunt build
