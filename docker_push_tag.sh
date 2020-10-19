#!/bin/bash

echo "$DOCKERHUB_TOKEN" | docker login -u "$DOCKERHUB_USERNAME" --password-stdin

# build and push
docker build . -t dinutac/estuary-viewer:"${TRAVIS_TAG}"
docker push dinutac/estuary-viewer:"${TRAVIS_TAG}"
