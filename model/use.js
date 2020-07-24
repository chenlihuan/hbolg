//创建用户集合规则
const mongoose = require("mongoose");
//密码进行加密处理
const bcrypt = require("bcrypt");
//引入joi模块，验证参数
const joi = require("joi");
//创建用户集合规则
const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        minlength: 2,
        maxlength: 20
    },
    email: {
        type: String,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    //admin normal
    role: {
        type: String,
        required: true
    },
    // 0 启用状态
    // 1 禁用状态
    state: {
        type: Number,
        default: 0
    }
});

const User = mongoose.model("User", userSchema);
async function createUser() {
    const salt = await bcrypt.genSalt(10);
    const pass = await bcrypt.hash("123456", salt);
    const user = await User.create({
        username: "iteheima",
        email: "ada@qq.com",
        password: pass,
        role: "admin",
        state: 0
    });
}
// 验证用户信息
const validateUser = user => {
    //服务器端接受到了客户端的请求参数，并且做了一系列的验证
    const schema = {
        //创建验证规则
        username: joi.string().min(2).max(12).required().error(new Error('用户名输入错误')),
        email: joi.string().email().required().error(new Error('邮箱格式不符合要求')),
        password: joi.string().regex(/^[a-zA-Z0-9]{3,30}$/).required().error(new Error('密码格式错误')),
        role: joi.string().valid('normal', 'admin').required().error(new Error('角色值非法')),
        state: joi.number().valid(0, 1).required().error(new Error('状态值非法'))
    };
    return joi.validate(user, schema);
}
//createUser();
//将用户集合做为模块成员进行导出
module.exports = {
    User,
    validateUser
};