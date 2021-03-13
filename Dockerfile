# specify the node base image with your desired version node:<version>
FROM node:14.5.0

ENV APP_DIR /home/node/app

COPY ./ $APP_DIR
WORKDIR $APP_DIR

RUN npm install

RUN chmod 744 $APP_DIR/*.sh

EXPOSE 8080

CMD ["/home/node/app/start.sh"]
