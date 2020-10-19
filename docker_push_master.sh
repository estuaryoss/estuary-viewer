#!/bin/bash

echo "$DOCKERHUB_TOKEN" | docker login -u "$DOCKERHUB_USERNAME" --password-stdin

# build and push
docker build . -t dinutac/estuary-viewer:latest
docker push dinutac/estuary-viewer:latest
