const mongoose = require('mongoose');
const shortId = require('shortid');

const UrlSchema  =  new mongoose.Schema({
    fullUrl : String,
    shortUrl: {
        type: String,
        default : shortId.generate
    },
    clicks :{
        type: Number,
        default: 0
    },
    created :{
        type: Date,
        default: new Date()
    }
});

module.exports = mongoose.model('ShortUrl',UrlSchema);