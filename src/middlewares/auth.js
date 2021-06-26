
function authMiddleware(req, res, next) {
    if (req.session.userId == undefined) {
        req.session.redirectTo = req.originalUrl
        return res.redirect('/users/login')
    }
    next()
}

module.exports = authMiddleware