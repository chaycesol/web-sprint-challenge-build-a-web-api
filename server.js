/* Common JS Imports*/
const express = require('express');
const helmet = require('helmet');

const projectsRouter = require('./routers/projectsRouter');
const actionsRouter = require('./routers/actionsRouter');

const server = express()

/* Middleware */
server.use(express.json());

/* Third-Party Middleware */
server.use(helmet());

/* Custom Middleware */
server.use(logger());

// Routers
server.use('/api/projects', projectsRouter);
server.use('/api/actions', actionsRouter)


server.get('/', (req,res) => {
    res.send(`<h2>Grab your data from the projects or actions endpoints type /docs/projects for docs</h2>`)
})

server.use('/docs/:endpoint', (req, res) => {
    const apiEndpoint = process.env.APIENDPOINT || 'Error';
    res.status(200).send(`<p>use api/${apiEndpoint} to access ${apiEndpoint}</p>`)
})

//Custom Middleware Functions
function logger(req, res, next) {
    return function (req, res, next) {
      console.log(`a ${req.method} request was made to ${req.url} at ${new Date()}`);
      next();
    }
  }

module.exports = server;