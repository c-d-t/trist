const config = require('../../config');
const express = require('express');
const Http = require('http');
const helmet = require('helmet');
const cookieParser = require('cookie-parser');
const routes = require('./routes');
const eventEmitter = require('../events');

function startServer()
{
  const app = express();
  const http = Http.createServer(app);

  eventEmitter.init(http);

  app.use(express.json());
  app.use(helmet());
  app.use(cookieParser());
  
  app.use('/', routes);
  
  app.use((err, req, res, next) => {
    console.error(err);
    res.status(400).json({ data: "Something went wrong." });
    next();
  });
  http.listen(config.PORT, () => {
    console.log(`Server started at http://localhost:${config.PORT}`);
  });

}

module.exports = startServer;
