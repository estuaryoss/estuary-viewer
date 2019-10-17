<h1 align="center"><img src="./docs/images/banner_estuary.png" alt="Testing as a service with Docker"></h1>  

Support project: <a href="https://paypal.me/catalindinuta?locale.x=en_US"><img src="https://pbs.twimg.com/profile_images/1145724063106519040/b1L98qh9_400x400.jpg" height="40" width="40" align="center"></a>  

# Testing as a Service
## Estuary viewer
View your deployments and tests. 

## Docker Hub
[![](https://images.microbadger.com/badges/image/dinutac/estuary-viewer.svg)](https://microbadger.com/images/dinutac/estuary-viewer "Get your own image badge on microbadger.com") [![](https://images.microbadger.com/badges/version/dinutac/estuary-viewer.svg)](https://microbadger.com/images/dinutac/estuary-viewer "Get your own version badge on microbadger.com") ![](https://img.shields.io/docker/pulls/dinutac/estuary-viewer.svg)

## Build
[![Build Status](https://travis-ci.org/dinuta/estuary-viewer.svg?branch=master)](https://travis-ci.org/dinuta/estuary-viewer)  

Frontend copyright(MIT license): https://github.com/creativetimofficial/vue-light-bootstrap-dashboard.git

<h1 align="center"><img src="./docs/images/dash_viewer.png" alt="Testing as a service with Docker"></h1>  

## Docker run
    docker run -p 8080:8080 dinutac/estuary-viewer:latest \
    bash -c "echo VUE_APP_ESTUARY_DISCOVERY=estuary_discovery_ip:estuary_discovery_port > /home/node/app/.env; /home/node/app/start.sh"

    E.g.:
    docker run -p 8080:8080 dinutac/estuary-viewer:latest \
    bash -c "echo VUE_APP_ESTUARY_DISCOVERY=192.168.100.8:8080 > /home/node/app/.env; /home/node/app/start.sh"

## Estuary stack
[Estuary deployer](https://github.com/dinuta/estuary-deployer)  
[Estuary testrunner](https://github.com/dinuta/estuary-testrunner)  
[Estuary discovery](https://github.com/dinuta/estuary-discovery)  
[Estuary viewer](https://github.com/dinuta/estuary-viewer)  
