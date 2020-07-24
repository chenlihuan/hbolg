const express = require("express");
// const bcrypt = require("bcrypt");
//导入用户集合构造函数
// const {
//     User
// } = require("../model/use");
//创建路由展示页面
const admin = express.Router();
//渲染登录页面
admin.get("/login", require('./admin/loginPage'));

//实现登录功能
admin.post("/login", require('./admin/login'));

//创建用户列表路由
admin.get("/user", require('./admin/userPage'));

//实现退出功能
admin.get("/logout", require('./admin/loginout'));

//创建用户文章编辑列表页面路由
admin.get("/user-edit", require('./admin/user-edit'));
//创建实现用户添加功能路由
admin.post("/user-edit", require('./admin/user-edit-fn.js'))

// 用户修改功能路由
admin.post("/user-modify", require('./admin/user-modify.js'))
//删除用户功能路由
admin.get("/delete", require('./admin/user-delete'));

//文章列表页面路由
admin.get('/article', require("./admin/article"));
//文章编辑页面路由
admin.get('/article-edit', require("./admin/article-edit"))
//实现文章添加功能的路由
admin.post('/article-add', require('./admin/article-add'))
//实现文章修改功能
admin.post("/article-modify", require('./admin/article-modify.js'))
module.exports = admin;