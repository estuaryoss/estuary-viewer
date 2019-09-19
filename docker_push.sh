#!/bin/bash

TAG="latest"
echo "$DOCKER_PASSWORD" | docker login -u "$DOCKER_USERNAME" --password-stdin
if [[ -z "${TRAVIS_TAG}" ]]; then
  TAG="${TRAVIS_TAG}"
fi
docker push dinutac/estuary-viewer:"${TAG}"
