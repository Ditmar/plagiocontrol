var express = require("express");
const fs = require("fs");
var pdf2html = require("pdf2html");
var md5 = require("md5");
const md5File = require("md5-file");

const fileUpload = require("express-fileupload");
const options = { text: true };
var router = express.Router();
var TESIS = require("../../database/tesis");
var PAGES = require("../../database/page");
var path = "/Users/Ditmar/sistema/police/pdffiles/taha.pdf";
/* GET home page. */
router.use(fileUpload());
router.get("/search", (req, res) => {
  /*var criterio = 
  TESIS.find({pagecontent: //});*/
});
router.get("/detail", async (req, res) => {
  //check database
  var params = req.query;
  if (params.id == null) {
    let msn = { msn: "Error al ingresar a la vista" };
    res.status(200).json(msn);
    return;
  }
  obj = await TESIS.findOne({ _id: params.id });
  let content = obj.pages.map((data, i) => {
    let content = {};
    content["page"] = i + 1;
    content["content"] = data;
    return content;
  });
  obj["numberpage"] = content.length;
  obj["content"] = content;
  res.render("detail", obj);
});
router.get("/home", (req, res) => {
  res.render("home", { content: "Testing WORKS" });
});
router.get("/upload", (req, res) => {
  res.render("review", {});
});
router.get("/review", (req, res) => {
  res.render("reviewtesis", {});
});
function search(namefile) {
  return new Promise((resolve, refuse) => {
    var RESULTS = {};
    pdf2html.pages(namefile, options, async (err, htmlPages) => {
      var datasplit = htmlPages;
      RESULTS["numberpages"] = datasplit.length;
      RESULTS["totalLinesLen"] = 0;
      RESULTS["report"] = {};
      for (var i = 0; i < datasplit.length; i++) {
        var lines = datasplit[i]
          .replace(/\t/g, " ")
          .trim()
          .replace(/\n/g, "")
          .toLowerCase()
          .replace(/[\s]{2,}/g, " ")
          .match(/[\w\s\á\é\í\ó\ú\,\-\ñ\:\;\(\)\_\•\/]{60,}(\.|\:)\s*/g);
        if (lines != null) {
          RESULTS["totalLinesLen"] += lines.length;
          for (var j = 0; j < lines.length; j++) {
            if (lines[j] != "") {
              try {
                var linesdata = new RegExp(lines[j]);
                var result = await PAGES.findOne({ content: linesdata });
                if (result != null) {
                  if (RESULTS["report"][result.idTesis] == null) {
                    RESULTS["report"][result.idTesis] = {
                      title: result.title,
                      autor: result.autor,
                    };
                    RESULTS["report"][result.idTesis]["data"] = [];
                  }
                  RESULTS["report"][result.idTesis].data.push({
                    currentdoc: datasplit[i]
                      .toLowerCase()
                      .replace(
                        new RegExp(lines[j].replace(/\s/g, `(\\s|\n)+`), "g"),
                        `<span id="resaltar2">` + lines[j] + `</span>`
                      ),
                    currentpage: i + 1,
                    numberpage: result.numberpage,
                    linesmatch: linesdata.toString(),
                    currectdocpage: i,
                  });
                }
              } catch (error) {}
            }
          }
        }
      }
      resolve(RESULTS);
    });
  });
}
async function indexofData(results) {
  return new Promise(async (resolve, reject) => {
    //Union de paginas similares.

    var finalreport = {};
    finalreport["currentdoc"] = {};
    finalreport["comparativedocs"] = {};
    var keys = Object.keys(results);
    for (var i = 0; i < keys.length; i++) {
      var docs = await TESIS.findOne({ _id: keys[i] });
      if (docs != null) {
        var dbdata = docs.toJSON();
        for (var j = 0; j < results[keys[i]].data.length; j++) {
          var originalcontent =
            dbdata.pages[parseInt(results[keys[i]].data[j].numberpage)];
          var formatContent = originalcontent;
          formatContent = formatContent.toLowerCase().replace(/\//, "");
          var cad = results[keys[i]].data[j].linesmatch
            .replace(/\//g, "")
            .replace(/\s{2,}/g, " ");
          var expresion = cad.replace(/\s/g, `(\\s|\n)+`);
          var regx = new RegExp(expresion, "g");
          var matchdata = formatContent.match(regx);
          if (matchdata != null) {
            var init = regx.exec(formatContent).index;
            var final = matchdata[0].length;
            var formatDocument = formatContent.replace(
              regx,
              `<span id="resaltar">` + cad + `</span>`
            );
            results[keys[i]].data[j]["originaltxt"] = {
              original: originalcontent,
              matchtext: formatDocument,
              page: parseInt(results[keys[i]].data[j].numberpage + 1),
            };
          } else {
            results[keys[i]].data[j]["originaltxt"] = {
              original: originalcontent,
              matchtext: originalcontent,
              page: parseInt(results[keys[i]].data[j].numberpage + 1),
            };
          }
        }
      }
    }
    //Reformatear documento
    //currectdocpage
    //currectdocpage
    //originaltxt
    resolve(results);
  });
}
router.post("/uploadreview", (req, res) => {
  if (!req.files || Object.keys(req.files).length === 0) {
    return res.status(400).json({ msn: "No existen archivos para subir" });
  }
  var data = req.files;
  var rootpath = __dirname.replace(/routes\/server/g, "");
  var begintoken = new Date();
  begintoken = md5(begintoken.toString()).substr(0, 5);

  var name =
    begintoken +
    "_" +
    data.file.name.replace(/\s/g, "_").replace(/\([\w]+\)/g, "");
  var completename = rootpath + "pdfreview/" + name.toUpperCase();
  data.file.mv(completename, async (err) => {
    if (err) {
      res.status(200).json({ msn: "ERROR: " + err });
      return;
    }

    console.log("REVIEW ---------------------------___>");
    var result = await search(completename);
    await indexofData(result.report);

    var keys = Object.keys(result.report);
    if (keys.length == 0) {
      res.status(200).json({ msn: "No se han encontrado coincidencias" });
      return;
    }
    var renderdata = {
      pagetotal: result.totalLinesLen,
      numberpages: result.numberpages,
      filename: data.file.name,
      copy: [],
    };
    var reviewtotal = 0;

    for (var i = 0; i < keys.length; i++) {
      reviewtotal += result.report[keys[i]].data.length;
      renderdata.copy.push(result.report[keys[i]]);
    }
    renderdata["reviewtotal"] = reviewtotal;
    renderdata["graph"] = {
      review: Number(reviewtotal / renderdata.pagetotal),
      nonereview: Number(1 - reviewtotal / renderdata.pagetotal),
    };
    //console.log(renderdata.copy[0].data);

    res.render("reviewreport", renderdata);
  });
});
router.get("/listdatabase", (req, res) => {
  var query = req.query;
  var filter = {};
  if (query.searchkey != null) {
    filter["pages"] = new RegExp(query.searchkey, "g");
  }
  var sort = { _id: -1 };
  if (query.sort != null) {
    var name = query.sort;
    var key = name.split("_")[0];
    var param = name.split("_")[1];
    sort[key] = parseInt(param);
  }
  TESIS.find(filter)
    .limit(30)
    .sort(sort)
    .exec((err, docs) => {
      var c = 1;
      var newdocs = docs.map((item) => {
        item["number"] = c;
        item["numpage"] = item.pages.length;
        c++;
        return item;
      });
      res.render("listdatabase", { data: newdocs });
    });
});
router.post("/uploadphoto", (req, res) => {
  if (!req.files || Object.keys(req.files).length === 0) {
    return res.status(400).json({ msn: "No existen archivos para subir" });
  }
  var query = req.query;
  if (query.idTesis == null) {
    res.status(200).json({ msn: "No podemos actualizar la photografia" });
    return;
  }
  var data = req.files;
  var rootpath = __dirname.replace(/routes\/server/g, "");
  var begintoken = new Date();
  begintoken = md5(begintoken.toString()).substr(0, 5);
  var name =
    begintoken +
    "_" +
    data.file.name.replace(/\s/g, "_").replace(/\([\w]+\)/g, "");
  var completename = rootpath + "photo/" + name.toUpperCase();
  data.file.mv(completename, (err) => {
    //update the database with the new photo
    TESIS.update(
      { _id: query.idTesis },
      {
        $set: {
          photo: "/server/photo/?name=" + name,
          pathphoto: completename,
        },
      },
      (err, docs) => {
        res.status(200).json({ msn: "Foto Actualizada con éxito!" });
      }
    );
  });
});
router.get("/photo", (req, res) => {
  var query = req.query;
  if (query == null) {
    res.status(200).json({ msn: "Error" });
    return;
  }
  ///Users/Ditmar/sistema/police/pdffiles/CBD93_FINAL_ANTECEDENTES_JULIO.PDF
  var path = __dirname.replace(/routes\/server/g, "photo/");
  res.sendFile(path + query.name);
});
router.post("/upload", (req, res) => {
  //console.log(req.files);
  if (!req.files || Object.keys(req.files).length === 0) {
    return res.status(400).json({ msn: "No existen archivos para subir" });
  }

  var data = req.files;
  var rootpath = __dirname.replace(/routes\/server/g, "");
  //res.status(200).json({msn: "LOAD!"});
  var begintoken = new Date();
  begintoken = md5(begintoken.toString()).substr(0, 5);

  var name =
    begintoken +
    "_" +
    data.file.name.replace(/\s/g, "_").replace(/\([\w]+\)/g, "");
  var completename = rootpath + "pdffiles/" + name.toUpperCase();
  data.file.mv(completename, (err) => {
    if (err) {
      return res
        .status(500)
        .json({ msn: "ERROR AL ESCRIBIR EL ARCHIVO EN EL SERVIDOR" });
    }
    const dataop = { page: 1, imageType: "png", width: 160, height: 226 };
    pdf2html.thumbnail(completename, (err, thumbnailPath) => {
      if (err) {
        console.error("Conversion error: " + err);
      } else {
        var newpath = rootpath + "thumbail/" + name.replace(/\.pdf/g, ".png");
        fs.createReadStream(thumbnailPath).pipe(fs.createWriteStream(newpath));
        fs.unlinkSync(thumbnailPath);
        //let dataBuffer = fs.readFileSync("/opt/app/pdffiles/vue2.pdf");
        pdf2html.pages(completename, options, (err, htmlPages) => {
          var pagedata = [];
          for (var i = 0; i < htmlPages.length; i++) {
            var pagehtml = htmlPages[i].replace(/\t/g, " ");
            pagedata.push(pagehtml.trim());
          }
          var page0 = htmlPages[0];
          var results = page0.match(
            /(\"|\“[\w\.'ñ\sí',;áéíóúÑÁÉÍÓÚ]+(\"|\”){1,})/g
          );
          var autor = page0.match(/(autor|AUTOR)\:[\w\.'ñ\sí',;áéíóúÑÁÉÍÓÚ]+/g);
          var title = "";
          if (results != null && results.length == 2) {
            title = results[1];
          } else if (results != null && results[0].length > 35) {
            title = results[0];
          }
          var autorname = "";
          if (autor != null) {
            autorname = autor[0]
              .replace(/AUTOR\:/g, "")
              .replace(/LA PAZ/g, "")
              .replace(/POTOSÍ/g, "")
              .replace(/COCHABAMBA/g, "")
              .replace(/\n/g, "");
          }
          //abstrac
          var abstrac = "";
          for (var i = 0; i < htmlPages.length; i++) {
            if (htmlPages[i].match(/PLANTEAMIENTO DEL PROBLEMA/g) != null) {
              abstrac = htmlPages[i];
              break;
            }
          }
          md5File(completename).then(async (hash) => {
            var check = await TESIS.find({ md5: hash });
            if (check.length > 0) {
              res.json({ msn: "La tesis ya existe en la base de datos" });
              return;
            }
            var coverpageurl =
              "/thumbail/?name=" + name.replace(/\.pdf/g, ".png");
            var tesis = new TESIS({
              title: title,
              autor: autorname,
              coverpage: coverpageurl,
              realpathCover: newpath,
              photo: "/img/photo.jpg",
              pathphoto: "",
              abstract: "",
              modalidad: "Ninguno.",
              unidad: "Ninguno.",
              pages: pagedata,
              filepdf: completename,
              md5: hash,
            });
            tesis.save((err, docs) => {
              console.log("Se guardo");
              var countcheck = 0;
              for (var i = 0; i < pagedata.length; i++) {
                var page = new PAGES({
                  title: title,
                  autor: autorname,
                  idTesis: docs.id,
                  numberpage: i,
                  md5fromcontent: md5(pagedata[i]),
                  content: pagedata[i]
                    .toLowerCase()
                    .replace(/\n/g, " ")
                    .replace(/[\s]{2,}/g, " "),
                });
                page.save(() => {
                  countcheck++;
                  console.log("Paginas " + countcheck + " %");
                  if (countcheck == pagedata.length - 1) {
                    pagedata = pagedata.map((content, k) => {
                      var obj = {};
                      obj["page"] = k + 1;
                      obj["content"] = content;
                      return obj;
                    });
                    var obj = {
                      id: docs.id,
                      idTesis: docs.id,
                      photo: "/img/photo.jpg",
                      coverpage: coverpageurl,
                      title: title,
                      autor: autor,
                      numberpage: i + 1,
                      abstrac: abstrac,
                      content: pagedata,
                    };
                    console.log(obj);
                    res.render("detail", obj);
                  }
                });
              }
            });
          });
          //-------xxxxxxx------//
        });
      }
    });
  });
});
router.get("/thumbail", (req, res) => {
  var params = req.query;
  if (params.name == null) {
    res.status(200).json({
      msn: "Parametro necesario",
    });
    return;
  }
  var path = __dirname.replace(/routes\/server/g, "thumbail/");

  console.log(__dirname);
  if (!fs.existsSync(path + params.name)) {
    res.status(404).json({ msn: "No existe ese archivo" });
  }
  res.sendFile(path + params.name);
});
router.post("/updatebook", async (req, res) => {
  var body = req.body;
  console.log(body);
  var ok = await TESIS.update({ _id: body.id }, { $set: body });
  res.status(200).json({ msn: "GO MAN" });
});

module.exports = router;
