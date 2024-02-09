const express = require("express");
const asyncHandler = require('express-async-handler');
const cors = require('cors'); // Import cors package
const treblle = require("@treblle/express");
const { TRB_API_KEY, TRB_PROJ_ID } = require("./configs").env;
const { handler, error404, homePageError } = require('./errors');
const order = require('./routes/order.route');
const app = express();

// Enable CORS for all routes
app.use(cors());

//let us call some inbuilt express wares
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

app.use(
  treblle({
    apiKey: TRB_API_KEY,
    projectId: TRB_PROJ_ID,
  })
);

// handlers
app.get("/", homePageError);
app.use("/api", asyncHandler(order));

// error handling
app.use("*", asyncHandler(error404));
app.use(handler);

module.exports = app;
