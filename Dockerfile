# specify the node base image with your desired version node:<version>
FROM node:12

COPY ./ /home/node/app/

RUN chmod 777 /home/node/app/*.sh

EXPOSE 8080

CMD ["/home/node/app/start.sh"]
