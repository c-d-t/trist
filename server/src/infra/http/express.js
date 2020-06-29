const config = require('../../config');
const express = require('express');
const cookieParser = require('cookie-parser');
const routes = require('./routes');

const app = express();

app.use(express.json());
app.use(cookieParser());

app.use('/', routes);

app.use((err, req, res, next) => {
  res.status(400).json({ data: "Something went wrong." });
  next();
});

const server = app.listen(config.PORT, () => {
  console.log(`Server started at http://localhost:${config.PORT}`);
});

module.exports = server;