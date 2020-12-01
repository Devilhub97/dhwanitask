const mongoose = require('mongoose');
var schema = mongoose.Schema;

const childSchema = new schema({
    user_id: {
        type: schema.Types.ObjectId,
        ref: 'user'
    },
    childName: {
        type: String,
        required: true
    },
    sex: {
        type: String,
        required: true
    },
    dob: {
        type: Date
    },
    fatherName: {
        type: String,
        required: true
    },
    motherName: {
        type: String,
        required: true
    },
    district_id: {
        type: schema.Types.ObjectId,
        ref: 'district',
        required: true
    },
    photo: {
        type: String,
        required: true
    }

}, { timestamps: true });

module.exports = mongoose.model('child', childSchema)