const mongoose = require('mongoose');
var schema = mongoose.Schema;

const stateSchema = new schema({
    state: {
        type: String,
        required: true
    }
}, { timestamps: true });

module.exports = mongoose.model('state', stateSchema)