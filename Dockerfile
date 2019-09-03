# specify the node base image with your desired version node:<version>
FROM node:12

COPY ./ /home/node/app/

RUN chmod 777 /home/node/app/start.sh

EXPOSE 8080

ENTRYPOINT ["/home/node/app/start.sh"]
