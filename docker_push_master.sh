#!/bin/bash

echo "$DOCKERHUB_TOKEN" | docker login -u "$DOCKERHUB_USERNAME" --password-stdin

# build and push
docker build . -t estuaryoss/viewer:latest
docker push estuaryoss/viewer:latest
