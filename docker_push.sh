#!/bin/bash

docker build . -t dinutac/estuary-viewer:"${TRAVIS_TAG}"
docker build . -t dinutac/estuary-viewer:latest
echo "$DOCKER_PASSWORD" | docker login -u "$DOCKER_USERNAME" --password-stdin
docker push dinutac/estuary-viewer:"${TRAVIS_TAG}"
docker push dinutac/estuary-viewer:latest
