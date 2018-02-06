FROM node:boron

# install node
RUN apt-get update && apt-get install -y -qq ocaml git curl libelf-dev && apt-get clean

# Add our files
WORKDIR /src
ADD . .

# Then install npm deps
RUN npm install

# Expose server port
EXPOSE 3838

CMD ["npm", "start"]
