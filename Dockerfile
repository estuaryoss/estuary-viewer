# specify the node base image with your desired version node:<version>
FROM node:14.5.0

ENV APP_DIR /home/node/app
WORKDIR $APP_DIR

COPY ./ $APP_DIR

RUN rm -rf $APP_DIR/node_modules
RUN npm install
RUN npm run build

RUN chmod 744 $APP_DIR/start.sh

EXPOSE 8080

ENTRYPOINT ["/home/node/app/start.sh"]
