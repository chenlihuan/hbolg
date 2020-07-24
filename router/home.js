// 引入expess框架
const express = require("express");
// 创建路由
const home = express.Router();
// 博客前台首页的展示页面
home.get('/', require('./home/index'));
//博客前台文章详情展示页面
home.get('/article', require('./home/article'));
// 将路由作为对象导出去
module.exports = home;