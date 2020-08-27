const jwt = require('jsonwebtoken')
// improvment: send user instead of just id and save to database in here?
const generateAuthToken = async function (id) {
    const payload = {
        user: id
    }

    return jwt.sign(payload, process.env.JWT_SECRET);

    // try to get tokens to users in database and make func to clear
    // user.tokens = user.tokens.concat({ token })
}

module.exports = generateAuthToken