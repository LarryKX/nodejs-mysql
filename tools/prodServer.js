import express from 'express';
import compression from 'compression';

/* eslint-disable no-console */

const server = require('./server');

const port = 3003;
const app = express();

app.use(compression());
app.use(express.static('dist'));

server.start(app, port);
