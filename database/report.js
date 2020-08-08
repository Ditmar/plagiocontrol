var mongoose = require("./connect");
var reportSchema = new mongoose.Schema({
    pagetotal: Number,
    numberpages: Number,
    filename: String,
    affectedpages: {
            pages: [
                {
                    content: String,
                    number: Number
                }
            ]
    },
    copy: [
        {
            title: String,
            autor: String,
            style: String,
            data: [
                {
                    currentdoc: String,
                    currentPage: Number,
                    numberpage: Number,
                    linesmatch: String,
                    currentdocpage: Number,
                    originaltxt: {
                        original: String,
                        matchtext: String,
                        md5: String,
                        page: Number
                    },
                    modal_id: String,

                }
            ]
        }
    ],
    md5: String,
    reviewtotal: Number,
    graph: {
        review: Number,
        nonereview: Number
    }
});
var REPORT = mongoose.model("report", reportSchema);
module.exports = REPORT;