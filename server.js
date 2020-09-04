/* Common JS Imports*/
const express = require('express');
const helmet = require('helmet');


const server = express()

/* Middleware */
server.use(express.json());

/* Third-Party Middleware */
server.use(helmet());

/* Custom Middleware */

// Routers



//Custom Middleware Functions


module.exports = server;