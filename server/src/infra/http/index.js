const config = require('../../config');
const express = require('express');
const Http = require('http');
const helmet = require('helmet');
const cookieParser = require('cookie-parser');
const routes = require('./routes');
const cronJobs = require('../cron_jobs');
const cors = require('cors');
const path = require('path');
require('../events');

function startServer()
{
  const app = express();
  const http = Http.createServer(app);

  global._eventEmitter.init(http);
  cronJobs.init();

  app.use(express.json());
  app.use(helmet());
  app.use(cors());
  app.use(cookieParser());
  
  app.use('*', express.static(path.join(__dirname, '../../../../client/build')));

  app.use('/api', routes);
  
  app.use((err, req, res, next) => {
    res.status(400).json({ data: "Something went wrong." });
    next();
  });
  http.listen(config.PORT, () => {
    console.log(`Server started at http://localhost:${config.PORT}`);
  });

}

module.exports = startServer;
