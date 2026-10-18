const express = require("express");
const ordersRouter = require("./routes/orders.routes.js");
const { notFoundMiddleware } = require("./middleware/not-found-middleware.js");
const { errorMiddleware } = require("./middleware/error-middleware.js");

const app = express();
const API_VERSION = "1.0";

app.disable("x-powered-by");
app.use(express.json({ limit: "32kb" }));

app.get("/health", (req, res) => {
  res.status(200).json({
    status: "ok",
    version: API_VERSION,
  });
});

app.use("/", ordersRouter);
app.use(notFoundMiddleware);
app.use(errorMiddleware);

module.exports = app;
