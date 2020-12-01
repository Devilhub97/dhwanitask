const stateSchema = require('../models/state.model');
const utils = require('../utils');
const districtSchema = require('../models/district.model');
const ObjectId = require('mongoose').Types.ObjectId;
const childSchema = require('../models/child.model');
const multer = require('multer');
const normalize = require('normalize-path');

// for child photo storage

var Storage = multer.diskStorage({
    destination: function(req, file, cb) {
        cb(null, './images/photo/')
    },
    filename: function(req, file, cb) {
        cb(null, file.originalname)
    }
})

const file_filter = (req, file, cb) => {
    if (file.mimetype === 'image/png' || file.mimetype === 'image/jpeg' || file.mimetype === 'image/jpg') {
        cb(null, true)
    } else {
        cb(null, false)
    }
}

const upload = multer({
    storage: Storage,
    fileFilter: file_filter
}).single('image');

// create state api

exports.createState = async(req, res) => {
    try {
        const state = new stateSchema({
            state: req.body.stateName
        });

        const stateDetail = await state.save();

        return utils.sendSuccessResponse(req, res, { 'error': false, 'message': 'State added successfully...' })
    } catch (err) {
        return utils.sendErrorResponse(req, res, 500, { 'error': true, 'message': err.message })
    }
}

// get state list api

exports.getStateList = async(req, res) => {
    try {
        const stateData = await stateSchema.find();

        if (!stateData.length) {
            return utils.sendErrorResponse(req, res, 500, { 'error': true, 'message': 'State not found...' })
        } else {
            return utils.sendSuccessResponse(req, res, { 'error': false, 'stateList': stateData })
        }
    } catch (err) {
        return utils.sendErrorResponse(req, res, 500, { 'error': true, 'message': err.message })
    }
}

// create district api

exports.createDistrict = async(req, res) => {
    try {
        const district = new districtSchema({
            state_id: req.body.stateId,
            district: req.body.districtName
        });

        const districtDetail = await district.save();

        return utils.sendSuccessResponse(req, res, { 'error': false, 'message': 'District added successfully...' })
    } catch (err) {
        return utils.sendErrorResponse(req, res, 500, { 'error': true, 'message': err.message })
    }
}

// get district api

exports.getDistrict = async(req, res) => {
    try {
        const districtData = await districtSchema.find({ state_id: ObjectId(req.params.stateid) });

        if (!districtData.length) {
            return utils.sendErrorResponse(req, res, 500, { 'error': true, 'message': 'State not found...' })
        } else {
            return utils.sendSuccessResponse(req, res, { 'error': false, 'districtList': districtData })
        }
    } catch (err) {
        return utils.sendErrorResponse(req, res, 500, { 'error': true, 'message': err.message })
    }
}

// create child profile api

exports.createChildProfile = async(req, res) => {
    try {
        upload(req, res, async(err) => {
            try {
                if (err) {
                    return utils.sendSuccessResponse(req, res, { 'error': true, 'message': err.message });
                } else {
                    const childData = new childSchema({
                        user_id: req.user.userId,
                        childName: req.body.childName,
                        sex: req.body.sex,
                        dob: req.body.dob,
                        fatherName: req.body.fatherName,
                        motherName: req.body.motherName,
                        district_id: req.body.districtId,
                        photo: '/' + normalize(req.file.path)
                    });

                    const childDetail = await childData.save();
                    return utils.sendSuccessResponse(req, res, { 'error': false, 'message': 'Child added successfully...' })
                }
            } catch (err) {
                return utils.sendErrorResponse(req, res, 500, { 'error': true, 'message': err.message });
            }
        })
    } catch (err) {
        return utils.sendErrorResponse(req, res, 500, { 'error': true, 'message': err.message })
    }
}

// get child profile

exports.getChildProfile = async(req, res) => {
    try {
        const childDetail = await childSchema.find({ user_id: ObjectId(req.user.userId) }).populate({ path: 'district_id', populate: { path: 'state_id', model: stateSchema } })
        return utils.sendSuccessResponse(req, res, { 'error': false, 'message': childDetail })
    } catch (err) {
        return utils.sendErrorResponse(req, res, 500, { 'error': true, 'message': err.message })
    }
}