const jwt = require('jsonwebtoken');
const client = require('../config/redis.config');
const utils = require('../utils');

exports.generateAccessToken = function(user) {
    var userId = user.userId.toString();
    var token = jwt.sign(user, process.env.ACCESS_TOKEN_SECRET, { expiresIn: '4h' });

    client.SET(userId, token);
    return token;
};

exports.userAuthentication = function(req, res, next) {
    const authHeader = req.headers['authorization']
    const token = authHeader && authHeader.split(' ')[1]
    if (token == null) return utils.sendErrorResponse(req, res, 401, 'Unauthorized') // if there isn't any token

    jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, user) => {
        console.log(err)
        if (err) return utils.sendErrorResponse(req, res, 401, "Session expires, please login...") // return res.status(403).send({ message: "session expires, please login..." })
        req.user = user
        client.GET(req.user.userId.toString(), (err, result) => {
            if (err) {
                console.log(err)
                return utils.sendErrorResponse(req, res, 401, "Internal server error...")
            } else {
                if (token === result) {
                    next() // pass the execution off to whatever request the client intended
                } else {
                    return utils.sendErrorResponse(req, res, 401, "Unauthorized user...")
                }
            }
        })
    })
}