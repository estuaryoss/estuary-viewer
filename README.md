<h1 align="center"><img src="./docs/images/banner_estuary.png" alt="Testing as a service with Docker"></h1>

## Estuary viewer
View live the estuary stack:
-   active deployments on the deployers
-   registered eureka apps
-   active commands running on the agents

## Docker Hub
[viewer](https://hub.docker.com/r/estuaryoss/viewer) ![](https://img.shields.io/docker/pulls/estuaryoss/viewer.svg)

## Build
[![Build Status](https://travis-ci.org/estuaryoss/estuary-viewer.svg?branch=master)](https://travis-ci.org/estuaryoss/estuary-viewer)
[![Codacy Badge](https://app.codacy.com/project/badge/Grade/3fdca1ec029948da8f0650e4be74ec0d)](https://www.codacy.com/gh/estuaryoss/estuary-viewer?utm_source=github.com&amp;utm_medium=referral&amp;utm_content=estuaryoss/estuary-viewer&amp;utm_campaign=Badge_Grade)

Frontend copyright(MIT license): https://github.com/creativetimofficial/vue-light-bootstrap-dashboard.git

![image](https://user-images.githubusercontent.com/43060213/111429327-8ae65500-8701-11eb-98f4-273be82388a0.png)

## Docker run - wo auth token
Default token is 'None' for no HTTP auth
```shell script
docker run -p 8080:8080 -e ESTUARY_DISCOVERY=http(s)://estuary_discovery_ip:estuary_discovery_port -e HTTP_AUTH_TOKEN=None estuaryoss/viewer:latest
```

E.g.:
```shell script
docker run -p 8080:8080 -e ESTUARY_DISCOVERY=http://192.168.100.8:8080 -e HTTP_AUTH_TOKEN=None estuaryoss/viewer:latest
```

## Docker run - with auth token
```shell script
docker run -p 8080:8080 -e ESTUARY_DISCOVERY=http://192.168.100.8:8080 -e HTTP_AUTH_TOKEN=mysecrettoken estuaryoss/viewer:latest
```

## Docker run - aggregating multiple discovery(ies)
Viewer supports aggregating multiples discovery services. List the discovery services separated by a comma.
```shell script
docker run -p 8080:8080 -e ESTUARY_DISCOVERY=http://192.168.100.8:8080,http://192.168.100.9:8080 -e HTTP_AUTH_TOKEN=mysecrettoken estuaryoss/viewer:latest
```

## Estuary stack
[Estuary deployer](https://github.com/estuaryoss/estuary-deployer)   
[Estuary agent](https://github.com/estuaryoss/estuary-agent)  
[Estuary discovery](https://github.com/estuaryoss/estuary-discovery)  
[Estuary viewer](https://github.com/estuaryoss/estuary-viewer)  

Support project: <a href="https://paypal.me/catalindinuta?locale.x=en_US"><img src="https://lh3.googleusercontent.com/Y2_nyEd0zJftXnlhQrWoweEvAy4RzbpDah_65JGQDKo9zCcBxHVpajYgXWFZcXdKS_o=s180-rw" height="40" width="40" align="center"></a>
