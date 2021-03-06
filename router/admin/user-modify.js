const {
    User
} = require('../../model/use');
const bcrypt = require('bcrypt');
module.exports = async (req, res, next) => {
    // 接收客户端传递过来的请求参数
    const {
        username,
        email,
        role,
        state,
        password
    } = req.body;
    //即将要修改的用户id
    const id = req.query.id;
    //res.send(req.body.password)
    //根据id查询用户信息，进行对比密码
    let user = await User.findOne({
        _id: id
    });
    //console.log(user.password)
    // console.log(user.password);
    //密码对比
    const isValid = await bcrypt.compare(password, user.password);

    if (isValid) {
        //密码比对成功
        // res.send('密码对比成功');
        await User.updateOne({
            _id: id
        }, {
            username: username,
            email: email,
            role: role,
            state: state
        });
        //将页面重定向到用户列表页面
        res.redirect('/admin/user');
    } else {
        // 密码比对失败
        let obj = {
            path: '/admin/user-edit',
            message: '密码比对失败，不能进行用户信息的修改',
            id: id
        }
        next(JSON.stringify(obj)) //转换成字符串类型
    }
    //密码对比失败
    //res.send(user);
}