FROM node:boron

# install node
RUN apt-get update && apt-get install -y -qq ocaml libelf-dev && apt-get clean

# Add our files
WORKDIR /src
ADD . .

# Then install npm deps
RUN yarn

# Expose server port
EXPOSE 3010

CMD ["yarn", "start"]
