const config = require('../../config');
const express = require('express');
const Http = require('http');
const helmet = require('helmet');
const cookieParser = require('cookie-parser');
const routes = require('./routes');
const Sockets = require('./socketio');

function startServer()
{
  const app = express();
  const http = Http.createServer(app);

  const sockets = new Sockets(http);
  app.use(sockets.middleware());

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
