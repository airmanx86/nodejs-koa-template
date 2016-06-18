#!/bin/bash
set -o errexit

SCRIPT_DIRECTORY="$( cd "$( dirname "${BASH_SOURCE[0]}" )" && pwd )"

# run the build process from inside the build-env container
# this allows the build process to run on any docker and bash compliance build agent
# this way we can source control the build environment and avoid snow-flake build agent

docker build -t build-env ${SCRIPT_DIRECTORY}/build-env/

docker run \
    -t \
    --rm \
    -v ${SCRIPT_DIRECTORY}/../:/app:rw \
    -w /app \
    -e CD_USER=$(id -u) \
    -e CD_GROUP=$(id -g) \
    build-env cont-delivery/build-env/build.sh
