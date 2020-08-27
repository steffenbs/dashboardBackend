const jwt = require('jsonwebtoken')

const auth = async (req, res, next) => {
    try {
        const jwtToken = req.header('Authorization').replace('Bearer ', '')

        if(!jwtToken) {
            return res.status(403).json('Not authorize')
        }

        const payload = jwt.verify(jwtToken, process.env.JWT_SECRET)

        req.user = payload.user
        next()
    } catch (e) {
        console.error(e.message)
        return res.status(403).json('Not authorize')
    }
}

module.exports = auth