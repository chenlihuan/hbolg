//导入用户集合构造函数
const {
    User
} = require('../../model/use');
module.exports = async (req, res) => {

    //标识，标识表示当前访问的是用户管理界面
    req.app.locals.currentLink = 'user';


    //获取地址栏中的id参数    
    const {
        message,
        id
    } = req.query;
    //如果当前传递了id参数
    if (id) {
        //修改操作
        let user = await User.findOne({
            _id: id
        });
        // res.send(user);
        // return;
        //渲染用户编辑页面，就是修改页面
        res.render("admin/user-edit", {
            message: message,
            user: user,
            link: '/admin/user-modify?id=' + id,
            button: '修改'
        });
    } else {
        //添加操作
        res.render("admin/user-edit", {
            message: message,
            link: '/admin/user-edit',
            button: '添加'
        });
    }
}