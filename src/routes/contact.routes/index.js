const express = require('express');
const contactRoute = require('./contact.routes');

const contactRoutes = express.Router();

contactRoutes.use(contactRoute);
contactRoutes.use('*', (req, res) => {
    res.status(404).send('Route Not Found');
});

module.exports = contactRoutes;