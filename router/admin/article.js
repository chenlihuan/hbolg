//将文章集合的构造函数导入到当前文件中
const {
  Article
} = require("../../model/article");

const pagination = require("mongoose-sex-page");

module.exports = async (req, res) => {
  const page = req.query.page;
  //标识，标识表示当前访问的是文章管理界面
  req.app.locals.currentLink = "article";
  //查询所有文章数据
  let articles = await pagination(Article)
    .find()
    .page(page)
    .size(2)
    .display(3)
    .populate("author")
    .exec();
  //渲染文章列表页面模板
  //res.send(articles);
  res.render("admin/article", {
    articles: articles
  });
};