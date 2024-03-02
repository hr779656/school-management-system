const express = require("express");
const { contactControllers } = require("../../controllers");

const contactRoute = express.Router();

contactRoute.post("/contact-us", contactControllers.userCotacts);
contactRoute.post("/sendmail", contactControllers.AdminSendMail);
contactRoute.get("/contacts", contactControllers.allContacts);

module.exports = contactRoute;