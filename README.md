# Estuary viewer
View your deployments and tests. 

Frontend copyright(MIT license): https://github.com/creativetimofficial/vue-light-bootstrap-dashboard.git

## Project setup
```
npm install
```

### Compiles and hot-reloads for development
```
npm run serve
```

### Compiles and minifies for production
```
npm run build
```

### Run your tests
```
npm run test
```

### Lints and fixes files
```
npm run lint
```

### Customize configuration
See [Configuration Reference](https://cli.vuejs.org/config/).

### Docker run
- via docker-compose
- via docker run
```
docker build -t dinutac/estuary-viewer:latest .  
docker run -it --name estuary-viewer dinutac/estuary-viewer:latest
```

### 1. Run viewer tests inside Docker world through Docker compose (UI Testing)
This is good for automation and ci/cd.
```
docker-compose -f docker-compose-test.yml up  

docker exec -ti estuary-viewer /bin/bash -c "cd /home/node/app; npm test"
 ```

### 2. Run viewer tests on your local machine without docker(UI Testing)
This is good for development.  
You must tweak con.index.js and pages/Page.js to be destined for container run on host run
```
webdriver-manager update
webdriver-manager start
npm run serve

npm test
```

### 3. Run viewer tests on your local machine with docker help (hybrid) - (UI Testing)
This is also good for development.  
You must tweak conf/index.js to be destined for container run or host run

```
docker-compose -f docker-compose-test-hybrid.yml up  
npm run serve

npm test
```
