const express = require("express");
require("dotenv").config();

const app = express();
const port = process.env.port || 4000;
const apiRoutes = require("./routes");
const DB = require("./DB");
const { globalErrorHandler } = require("./utils/errorhandler");

app.use(express.urlencoded({ extended: false }));
app.use(express.json());

app.use(apiRoutes);
app.use(globalErrorHandler);

app.listen(port, () => {
  DB.startDB();
  console.log(`server running on localhost:${port}`);
});
