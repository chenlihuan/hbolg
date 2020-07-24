module.exports = (req, res) => {
    req.sesssion.destroy(function () {
        res.clearCookie('connect.sid');
        res.redirect('/admin/login')
    })
}