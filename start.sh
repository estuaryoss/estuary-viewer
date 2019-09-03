#!/bin/bash
cd /home/node/app
npm install
npm rebuild node-sass
npm run serve >> /tmp/output.txt
