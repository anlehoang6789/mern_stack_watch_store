var createError = require("http-errors");
var express = require("express");
var path = require("path");
var cookieParser = require("cookie-parser");
var logger = require("morgan");
const cors = require("cors");

const mongoose = require("mongoose");

//import routes
const brandViewRouter = require("./routes/brandViewRouter");
const watchesViewRouter = require("./routes/watchesViewRouter");
const memberViewRouter = require("./routes/memberViewRouter");

// Middleware xử lý xác thực
const { authenticate } = require("./middleware/authenticated");
require("dotenv").config();
const methodOverride = require("method-override");

var app = express();

const corsOptions = {
  origin: "http://localhost:5173",
  methods: ["GET", "POST", "PUT", "DELETE"],
  allowedHeaders: ["Content-Type", "Authorization"],
  credentials: true,
};

//connect to database
const url = "mongodb://127.0.0.1:27017/assignment_final_MERN_stack_db";
const connect = mongoose.connect(url);

connect
  .then((db) => {
    console.log("connect successfully");
  })
  .catch((err) => {
    console.error("MongoDB connection error:", err);
    process.exit(1); // Exit the application if connection fails
  });

//Middleware setup
app.use(cors(corsOptions));
app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

app.use(methodOverride("_method"));

app.use(authenticate);

//Routes setup
app.use("/api/watches", watchesViewRouter);
app.use("/brands", brandViewRouter);
app.use("/members", memberViewRouter);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.json({ error: err.message });
});

module.exports = app;
