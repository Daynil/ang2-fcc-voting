'use strict';
let mongoose = require('mongoose');

let pollSchema = new mongoose.Schema({
    creator: String,
    question: String,
    choices: [{
        text: String,
        votes: Number
    }],
    voters: [String]
});

module.exports = mongoose.model('Poll', pollSchema);