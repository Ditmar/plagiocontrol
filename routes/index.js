var express = require("express");
const fs = require("fs");
var pdf2html = require("pdf2html");
var md5 = require("md5");
const md5File = require("md5-file");
const options = { text: true };
var router = express.Router();
var TESIS = require("../database/tesis");
var PAGES = require("../database/page");
var path = "/Users/Ditmar/sistema/police/pdffiles/taha.pdf"
/* GET home page. */

router.get("/search", (req, res) => {
  /*var criterio = 
  TESIS.find({pagecontent: //});*/
});
router.get("/insert", (req, res, next) => {
  console.log(pdf2html);
  //let dataBuffer = fs.readFileSync("/opt/app/pdffiles/vue2.pdf");
  pdf2html.pages(
    path,
    options,
    (err, htmlPages) => {
      var pagedata = [];
      for (var i = 0; i < htmlPages.length; i++) {
        var pagehtml = htmlPages[i].replace(/\t/g, " ");
        pagedata.push(pagehtml.trim());
      }
      //console.log("--> " + pagedata[100]);
      md5File(path).then((hash) => {
        //console.log(`The MD5 sum of LICENSE.md is: ${hash}`)
        var tesis = new TESIS({
          title: "Tesis 1",
          autor: "Test 1",
          coverpage: "",
          photo: "",
          abstract: "",
          pages: pagedata,
          filepdf: path,
          md5: hash,
        });
        tesis.save((err, docs) => {
          console.log("Se guardo");
          //guardamos las paginas por separado
          //Tesis guardada.
          var countcheck = 0;
          for (var i = 0; i < pagedata.length; i++) {
            var page = new PAGES({
              title: "Tesis 1",
              autor: "Test 1",
              idTesis: docs.id,
              numberpage: i,
              md5fromcontent: md5(pagedata[i]),
              content: pagedata[i].toLowerCase().replace(/\n/g, " ").replace(/[\s]{2,}/g, " "),
            });
            page.save(() => {
              countcheck++;
              console.log("Paginas " + countcheck + " %");
              if (countcheck == pagedata.length - 1) {
                res.render("index", { title: "Parseo de la tesis completo" });
              }
            });
          }
        });
      });
    }
  );
});

module.exports = router;
