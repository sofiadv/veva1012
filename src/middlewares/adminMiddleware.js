
function adminMiddleware(req, res, next) {
    if (req.session.category != 1) {
        return res.redirect('/products')
    }
    next()
}

module.exports = adminMiddleware