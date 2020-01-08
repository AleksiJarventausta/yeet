To run this project, first:

npm install

then:

process.env.MONGO_URL has to be set, for example "mongodb://localhost:27017/lol"

process.env.secretOrKey has to be set as a string.


or, you can add those before start:

project also running in:
http://little-blog-app-josnyt.rahtiapp.fi/

MONGO_URL=foo secretOrKey=foo NODE_ENV=production npm start
