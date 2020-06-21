var mongoose = require("./connect");

var tesisSchema = new mongoose.Schema({
    title: {
        type: String,
        default: ""
    },
    autor: {
        type: String,
        default: ""
    },
    coverpage: {
        type: String,
        default: ""
    },
    realpathCover: {
        type: String,
        default: ""
    },
    photo: String,
    pathphoto: String,
    abstract: String,
    modalidad: String,
    unidad: String,
    pages: Array,
    filepdf: String,
    md5: String
});

var TESIS = mongoose.model("tesis", tesisSchema);
module.exports = TESIS;