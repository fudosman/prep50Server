const express = require("express");
const asyncHandler = require('express-async-handler');
const cors = require('cors'); // Import cors package
const { ping } = require("./configs");
const { handler, error404, homePageError } = require('./errors');
const order = require('./routes/order.route');
const app = express();

app.use(cors());

app.use(
  express.json({
    limit: "100mb",
    extended: true,
  })
)

app.use(
  express.urlencoded({
    limit: "100mb",
    extended: true,
  })
);

app.use((req, res, next) => {
  console.log(`${req.method} request hit the route ${req.url}`);
  next();
});

const pingInterval = 1 * 60 * 1000;
setInterval(ping, pingInterval);

app.get("/", homePageError);
app.use("/api", asyncHandler(order));

// error handling
app.use("*", asyncHandler(error404));
app.use(handler);

module.exports = app;
