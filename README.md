<h1 align="center"><img src="./docs/images/banner_estuary.png" alt="Testing as a service with Docker"></h1>

Support project: <a href="https://paypal.me/catalindinuta?locale.x=en_US"><img src="https://lh3.googleusercontent.com/Y2_nyEd0zJftXnlhQrWoweEvAy4RzbpDah_65JGQDKo9zCcBxHVpajYgXWFZcXdKS_o=s180-rw" height="40" width="40" align="center"></a>

# Testing as a Service
## Estuary viewer
View live the estuary stack:
- deployments
- registered eureka apps
- test sessions

## Docker Hub

[viewer](https://hub.docker.com/r/dinutac/estuary-viewer) ![](https://img.shields.io/docker/pulls/dinutac/estuary-viewer.svg)

## Build
[![Build Status](https://travis-ci.org/dinuta/estuary-viewer.svg?branch=master)](https://travis-ci.org/dinuta/estuary-viewer)
[![Codacy Badge](https://api.codacy.com/project/badge/Grade/00539cc6a6104c03b5f7939bd85cd080)](https://www.codacy.com/manual/dinuta/estuary-viewer?utm_source=github.com&amp;utm_medium=referral&amp;utm_content=dinuta/estuary-viewer&amp;utm_campaign=Badge_Grade)

Frontend copyright(MIT license): https://github.com/creativetimofficial/vue-light-bootstrap-dashboard.git

<h1 align="center"><img src="./docs/images/dash_viewer.png" alt="Testing as a service with Docker"></h1>

## Docker run - wo auth token
Default token is 'None' for no http auth
```shell script
docker run -p 8080:8080 dinutac/estuary-viewer:latest \
bash -c "echo VUE_APP_ESTUARY_DISCOVERY=estuary_discovery_ip:http(s)://estuary_discovery_port > /home/node/app/.env; echo VUE_APP_HTTP_AUTH_TOKEN=None >> /home/node/app/.env;/home/node/app/start.sh"

```

E.g.:
```shell script
docker run -p 8080:8080 dinutac/estuary-viewer:latest bash -c "echo VUE_APP_ESTUARY_DISCOVERY=http://192.168.100.8:8080 > /home/node/app/.env; echo VUE_APP_HTTP_AUTH_TOKEN=None >> /home/node/app/.env; /home/node/app/start.sh"
```

## Docker run - with auth token
```shell script
docker run -p 8080:8080 dinutac/estuary-viewer:latest bash -c "echo VUE_APP_ESTUARY_DISCOVERY=http://192.168.100.8:8080 > /home/node/app/.env; echo VUE_APP_HTTP_AUTH_TOKEN=mysecrettoken >> /home/node/app/.env; /home/node/app/start.sh"
```

## Estuary stack
[Estuary deployer](https://github.com/dinuta/estuary-deployer)
[Estuary agent](https://github.com/dinuta/estuary-agent)
[Estuary discovery](https://github.com/dinuta/estuary-discovery)
[Estuary viewer](https://github.com/dinuta/estuary-viewer)
