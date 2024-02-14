const express = require("express");
require("dotenv").config();
const app = express();
const port = process.env.port || 4000;
const apiRoutes = require("./routes");
const cors = require("cors");
const DB = require("./DB");
const { globalErrorHandler } = require("./utils/errorhandler");

app.use(express.json());
app.use(cors());
app.use(apiRoutes);
app.use(globalErrorHandler);

const server = app.listen(port, () => {
  DB.startDB();
  console.log(`server running on localhost:${port}`);
});


// Server shutdown logic
process.on('SIGTERM', shutDown);
process.on('SIGINT', shutDown);

function shutDown() {
  console.log('Received kill signal, shutting down gracefully');
  server.close(() => {
    console.log('Closed out remaining connections');
    process.exit(0);
  });

  setTimeout(() => {
    console.error('Could not close connections in time, forcefully shutting down');
    process.exit(1);
  }, 10000);
}
