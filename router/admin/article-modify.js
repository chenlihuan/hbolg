const {
    Article
} = require("../../model/article");
module.exports = async (req, res, next) => {
    const {
        title,
        author,
        publishDate,
        cover,
        content
    } = req.body;
    await Article.updateOne({
        _id: id
    }, {
        title: title,
        author: author,
        publishDate: publishDate,
        cover: cover,
        content: content
    })
}