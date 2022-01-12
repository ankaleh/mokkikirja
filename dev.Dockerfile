FROM node:16
  
WORKDIR /usr/src/app

COPY backend .
ADD package-lock.json ./
ADD package.json ./

RUN rm -rf node_modules && \
        npm install && \
            npm uninstall bcrypt && \
                npm install bcrypt

EXPOSE 4000
ENV DEBUG=playground:*
ENV MONGODB_URI=mongodb://the_username:the_password@mongo/my_app_database
ENV SECRET=devSecret

CMD ["npm", "run", "dev"]