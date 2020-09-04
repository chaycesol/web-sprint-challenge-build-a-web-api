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

// Routers
server.use('/api/projects', projectsRouter);
server.use('/api/actions', actionsRouter)

server.get('/', (req,res) => {
    res.status(200).json({message: "Grab your data from the projects or actions endpoints"})
})

//Custom Middleware Functions


module.exports = server;