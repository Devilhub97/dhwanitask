const mongoose = require('mongoose');
var schema = mongoose.Schema;

const districtSchema = new schema({
    state_id: {
        type: schema.Types.ObjectId,
        ref: 'state',
        required: true
    },
    district: {
        type: String,
        required: true
    }
}, { timestamps: true });

module.exports = mongoose.model('district', districtSchema)