module.exports = options => {
    return async(req, res, next) => {
        const jwt = require('jsonwebtoken')
        const AdminUser = require('../models/AdminUser')
        const token = String(req.headers.authorization || ' ').split(' ').pop()
        if (!token) {
            return res.status(401).send({
                message: '请先登录1'
            })
        }
        const {
            id
        } = jwt.verify(token, req.app.get('secret'))
        if (!id) {
            return res.status(401).send({
                message: '请先登录2'
            })
        }
        req.user = await AdminUser.findById(id)
        if (!req.user) {
            return res.status(401).send({
                message: '请先登录3'
            })
        }
        await next()
    }
}