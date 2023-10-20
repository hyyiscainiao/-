var createError = require("http-errors");
var express = require("express");
var path = require("path");
var cookieParser = require("cookie-parser");
var logger = require("morgan");

const cors = require("cors");
const { verifyToken } = require("./utils/JWT");
var router = require("./routes/index");
// var usersRouter = require("./routes/admin/UserRouter");

var app = express();
// view engine setup
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "jade");
app.use(cors()); //使用cors中间件

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

app.use(function (req, res, next) {
  // 封装返回数据
  res.cc = function (code, msg, data) {
    res.send({
      code: code || res.code, //1是success -1是fail
      msg: msg || res.message,
      data: data || msg,
    });
  };
  // token有效，next()
  // token无效，返回401
  if (req.url !== "/adminapi/users/login") {
    const token = req.headers["authorization"];
    if (token) {
      const result = verifyToken(token);
      if (result) {
        res.header("Authorization", result);

      } else {
        res.status(401).cc(-1, "token过期");
      }
    }
  }

  next();
});

// app.use("/", indexRouter);
// app.use("/adminapi", usersRouter);
router(app)

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
  res.render("error");
});

module.exports = app;
