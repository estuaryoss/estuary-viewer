#!/bin/bash

echo "$DOCKERHUB_TOKEN" | docker login -u "$DOCKERHUB_USERNAME" --password-stdin

# build and push
docker build . -t estuaryoss/viewer:"${TRAVIS_TAG}"
docker push estuaryoss/viewer:"${TRAVIS_TAG}"
