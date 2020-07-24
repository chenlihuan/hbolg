// 引入express框架
const express = require("express");
//处理路径
const path = require("path");
//引入body-parser模块，用来处理post请求参数
const bodyparser = require("body-parser");
//导入express-session模块
const session = require("express-session");
//导入art-tempate模板引擎
const template = require("art-template");
//导入dateFormat第三方的模板
const dateFormat = require("dateformat");
// 创建服务器
const app = express();
app.engine("art", require("express-art-template"));
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "art");
// 向模板内部导入dataFormate变量
template.defaults.imports.dateFormat = dateFormat;

//数据库连接
require("./model/connect");
// require('./model/use');
//处理post请求参数用 app。use拦截请求
app.use(
  bodyparser.urlencoded({
    extended: false
  })
);
// 配置session
app.use(
  session({
    secret: "secret key",
    saveUninitialized: false,
    cookie: {
      maxAge: 24 * 60 * 60 * 1000
    }
  })
);
//开放静态资源文件
app.use(express.static(path.join(__dirname, "public")));
//创建路由
const home = require("./router/home");
const admin = require("./router/admin");
//拦截请求，判断用户登录状态
app.use("/admin", require("./middleware/loginGuard"));
//为路由匹配请求路径
app.use("/home", home);
app.use("/admin", admin);

//错误处理中间件
app.use((err, req, res, next) => {
  //res.redirect(`/admin/user-edit?message=${e.message}`);
  //将字符串对象转换为对象类型JSON.parse();
  const result = JSON.parse(err);
  let params = [];
  for (let attr in result) {
    if (attr != "path") {
      params.push(attr + "=" + result[attr]);
    }
  }
  res.redirect(`${result.path}?${params.join("&")}`);
});

app.listen(30);
console.log("网站服务器启动成功、请访问localhost");
