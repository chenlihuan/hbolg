//引入用户集合构造函数
const {
    User,
    validateUser
} = require('../../model/use');
//引入密码加密处理
const bcrypt = require("bcrypt");
module.exports = async (req, res, next) => {
    // //服务器端接受到了客户端的请求参数，并且做了一系列的验证
    // const schema = {
    //     //创建验证规则
    //     username: joi.string().min(2).max(12).required().error(new Error('用户名输入错误')),
    //     email: joi.string().email().required().error(new Error('邮箱格式不符合要求')),
    //     password: joi.string().regex(/^[a-zA-Z0-9]{3,30}$/).required().error(new Error('密码格式错误')),
    //     role: joi.string().valid('normal', 'admin').required().error(new Error('角色值非法')),
    //     state: joi.number().valid(0, 1).required().error(new Error('状态值非法'))
    // };
    //实施验证
    try {
        // await joi.validate(req.body, schema);
        await validateUser(req.body)
    } catch (e) {
        // return res.redirect(`/admin/user-edit?message=${e.message}`);
        //如何将对象数据类型转换成字符串数据类型

        return next(JSON.stringify({
            path: '/admin/user-edit',
            message: e.message
        }));
    }

    //res.send(req.body);
    //根据邮箱地址查询用户是否存在
    let user = await User.findOne({
        email: req.body.email
    });
    //如果用户已经存在，邮箱地址已经被别人占用
    if (user) {
        //return res.redirect(`/admin/user-edit?message=邮箱地址已经被占用了`);
        return next(JSON.stringify({
            path: '/admin/user-edit',
            message: '邮箱地址已经被占用了'
        }))
    }
    //对密码进行加密处理
    // 生产随机字符串
    const salt = await bcrypt.genSalt(10);
    //加密
    const password = await bcrypt.hash(req.body.password, salt);
    req.body.password = password;
    //将用户信息添加到数据库中
    await User.create(req.body);
    //将页面重定向到用户界面
    res.redirect('/admin/user');

}