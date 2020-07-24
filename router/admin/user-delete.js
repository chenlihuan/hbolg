const {
    User
} = require('../../model/use');
module.exports = async (req, res) => {
    // res.send('ok');
    //获取要删除的用户id
    //res.send(req.query.id);
    await User.findByIdAndDelete({
        _id: req.query.id
    })
    res.redirect('/admin/user');
}