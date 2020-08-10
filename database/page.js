var mongoose = require("./connect");
var pageSchemas = new mongoose.Schema({
    title: String,
    autor: String,
    idTesis: String,
    numberpage: Number,
    md5fromcontent: String,
    content: String,
    tutor: String
});

var PAGE = mongoose.model("pages", pageSchemas);
module.exports = PAGE;