const userSchema = require('../models/user.model');
const utils = require('../utils');
const auth = require('../middleware/authentication');
const client = require('../config/redis.config');

// login api

exports.login = async(req, res) => {
    try {
        const userName = req.body.userName;
        const password = req.body.password;

        const userDetail = await userSchema.find({ username: userName });

        if (!userDetail.length) {
            return utils.sendErrorResponse(req, res, 500, { 'error': true, 'message': 'Username not found...' })
        } else {
            if (password == userDetail[0].password) {
                let user = { 'userId': userDetail[0]._id }
                token = auth.generateAccessToken(user)
                return utils.sendSuccessResponse(req, res, { 'error': false, 'messgae': 'Login successfully...', 'token': token })
            } else {
                return utils.sendErrorResponse(req, res, 500, { 'error': true, 'message': 'Wrong password...' })
            }
        }
    } catch (err) {
        return utils.sendErrorResponse(req, res, 500, { 'error': true, 'message': err.message })
    }
}

// user logout api

exports.logout = async(req, res) => {
    try {
        const userId = req.user.userId.toString();

        client.DEL(userId, (err, value) => {
            if (err) {
                console.log(err)
                return utils.sendErrorResponse(req, res, 500, { 'error': true, 'message': err.message });
            } else {
                if (value == 1) {
                    return utils.sendSuccessResponse(req, res, { 'error': false, 'message': 'Logout successfully...' })
                } else {
                    return utils.sendErrorResponse(req, res, 500, { 'error': true, 'message': 'Try after some time...' });
                }
            }
        })
    } catch (err) {
        return utils.sendErrorResponse(req, res, 500, { 'error': true, 'message': err.message });
    }
}