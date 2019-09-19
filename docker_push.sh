#!/bin/bash

echo "$DOCKER_PASSWORD" | docker login -u "$DOCKER_USERNAME" --password-stdin
docker push dinutac/estuary-viewer:"${TRAVIS_TAG}"
