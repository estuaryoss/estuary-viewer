#!/bin/bash

docker build . -t dinutac/estuary-viewer:"${TRAVIS_TAG}"
docker build . -t dinutac/estuary-viewer:latest
echo "$DOCKERHUB_TOKEN" | docker login -u "$DOCKERHUB_USERNAME" --password-stdin
docker push dinutac/estuary-viewer:"${TRAVIS_TAG}"
docker push dinutac/estuary-viewer:latest
