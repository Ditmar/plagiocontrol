var express = require("express");
var http = require("http").createServer(express());
var mongoose = require("../../database/connect");
var Schema = mongoose.Schema;
var io = require("socket.io")(http);
var REPORT = require('../../database/report');
//var thingSchema = new Schema({}, { strict: false });
http.listen(3000, () => {
  console.log("SOCKET ON " + 3000);
});
io.on("connection", (socket) => {
  console.log("usuario Conectado");
  socket.on("disconnect", () => {
    console.log("user disconnected");
  });
});
const fs = require("fs");
var pdf2html = require("pdf2html");
var md5 = require("md5");
const md5File = require("md5-file");

const fileUpload = require("express-fileupload");
const options = { text: true };
var router = express.Router();
var TESIS = require("../../database/tesis");
var PAGES = require("../../database/page");
const PAGE = require("../../database/page");
/* GET home page. */
router.use(fileUpload());
function puttagObjects(objs, key, expresion, cad) {
  var newobjs = objs.map((item) => {
    item[key] = item[key].replace(expresion, "<b>" + cad + "</b>");
    return item;
  });
  return newobjs;
}
router.post("/search", async (req, res) => {
  var data = req.body;
  console.log(data);
  if (data.searchcriterion == null) {
    res.render("searchview", {
      result: "Es necesario un criterio de busqueda",
    });
    return;
  }
  var criteria = data.searchcriterion.toUpperCase();
  //search by name
  var searchcriterion = new RegExp(data.searchcriterion.toUpperCase(), "g");

  var results = await TESIS.find({ autor: searchcriterion });
  if (results.length == 0) {
    var results = await TESIS.find({ title: searchcriterion });
    if (results.length == 0) {
      var searchcriterion = new RegExp(data.searchcriterion.toLowerCase(), "g");

      var results = await TESIS.find({ abstract: searchcriterion });
      results = puttagObjects(results, "abstract", searchcriterion, criteria);
      res.render("searchview", {
        search: data.searchcriterion,
        result: results,
        cant: results.length,
      });
      return;
    }
    results = puttagObjects(results, "title", searchcriterion, criteria);
    res.render("searchview", {
      search: data.searchcriterion,
      result: results,
      cant: results.length,
    });

    return;
  }
  results = puttagObjects(results, "autor", searchcriterion, criteria);
  res.render("searchview", {
    search: data.searchcriterion,
    result: results,
    cant: results.length,
  });

  return;
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
router.get("/home", async (req, res) => {
  let tesis = await TESIS.find({})
    .limit(20)
    .sort({ id: -1 })
    .select("title autor photo coverpage md5");
  res.render("home", { tesis: tesis });
});
router.get("/upload", (req, res) => {
  res.render("review", {});
});
router.get("/review", (req, res) => {
  res.render("reviewtesis", {});
});
function checkIsDuplicate(array, cad) {
  for (var i = 0; i < array.length; i++) {
    if (array[i].content == cad) {
      return false;
    }
  }
  return true;
}
function search(namefile) {
  return new Promise((resolve, refuse) => {
    var RESULTS = {};
    pdf2html.pages(namefile, options, async (err, htmlPages) => {
      var matchlines = 0;
      if (htmlPages == null) {
        resolve(false);
        return;
      }
      var datasplit = htmlPages;
      RESULTS["numberpages"] = datasplit.length;
      RESULTS["totalLinesLen"] = 0;
      RESULTS["affectedpages"] = {};
      RESULTS["affectedpages"]["pages"] = [];
      RESULTS["report"] = {};
      var modaltags = [
        "resaltar2",
        "resaltar3",
        "resaltar4",
        "resaltar5",
        "resaltar6",
        "resaltar7",
        "resaltar8",
        "resaltar9",
        "resaltar10",
        "resaltar11",
        "resaltar12",
        "resaltar13",
        "resaltar14",
        "resaltar15",
        "resaltar16",
        "resaltar17"
      ];
      var tagcolor = 0;
      for (var i = 0; i < datasplit.length; i++) {
        io.emit("msn", { msn: "Páginas procesadas " + i });
        var lines = datasplit[i]
          .replace(/\t/g, " ")
          .trim()
          .toLowerCase()
          .replace(/\n/g, " ")
          .replace(/ /g, " ")
          .replace(/[\s]{2,}/g, " ")
          .match(
            ///[\w\s\á\é\í\ó\ú\,\-\ñ\:\;\(\)\_\•\/\ü\?“”\–\¡\!]{60,}?(\.|\:|\,|\n)\s*/g
            /[\w\s\á\é\í\ó\ú\,\-\ñ\:\;\(\)\_\•\/\ü\?\“\”\–\¡\!\●]{60,}?(\.|\:|\,|\n)\s*/g
          );
          
        if (lines != null) {
          RESULTS["totalLinesLen"] += lines.length;
          for (var j = 0; j < lines.length; j++) {
            if (lines[j] != "") {
              try {
                lines[j] = lines[j].replace(/\(/g, "\\(").replace(/\)/g, "\\)");
                var linesdata = new RegExp(lines[j]);
                var result = await PAGES.findOne({ content: linesdata });
                if (result != null) {
                  
                  if (RESULTS["report"][result.idTesis] == null) {
                    
                    RESULTS["report"][result.idTesis] = {
                      title: result.title,
                      autor: result.autor,
                      style: modaltags[tagcolor % modaltags.length]
                    };
                    tagcolor++;
                    RESULTS["report"][result.idTesis]["data"] = [];
                  }
                  if (
                    checkIsDuplicate(
                      RESULTS["affectedpages"].pages,
                      datasplit[i].toLowerCase()
                    )
                  ) {
                    RESULTS["affectedpages"].pages.push({
                      content: datasplit[i].toLowerCase(),
                      number: i + 1,
                    });
                  }
                  try {
                    if (lines[j][0] == " ") {
                      lines[j] = lines[j].substr(1, lines[j].length);
                    }
                    
                    RESULTS["report"][result.idTesis].data.push({
                      currentdoc: datasplit[i]
                        .toLowerCase().toLowerCase()
                        .replace(/\n/g, " ")
                        .replace(/[\s]{2,}/g, " ")
                        .replace(
                          new RegExp(lines[j].replace(/\s/g, `(\\s|\n)+`), "g"),
                          `<span id="resaltar2">` + lines[j] + `</span>`
                        ),
                      currentpage: i + 1,
                      numberpage: result.numberpage,
                      linesmatch: linesdata.toString(),
                      currectdocpage: i,
                    });
                  } catch(error) {
                    console.log("ERROR ALGO PASO ");
                    console.log(error);
                  }
                  
                  
                  matchlines++;
                  
                  if (matchlines > 999) {
                    resolve(RESULTS);
                    return;
                  }
                }
              } catch (error) {
                break;
              }
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
    //var total = 
    for (var i = 0; i < keys.length; i++) {
      io.emit("msn", {msn: "Creando reporte " + i });
      var docs = await TESIS.findOne({ _id: keys[i] });
      if (docs != null) {
        var dbdata = docs.toJSON();
        for (var j = 0; j < results[keys[i]].data.length; j++) {
          var originalcontent =
            dbdata.pages[parseInt(results[keys[i]].data[j].numberpage)];
          var formatContent = originalcontent;
          formatContent = formatContent.toLowerCase().replace(/\//, "");
          var cad = results[keys[i]].data[j].linesmatch.substring(1, results[keys[i]].data[j].linesmatch.length - 1);
          if (cad[0] == " ") {
            cad = cad.substr(1, cad.length);
          }
          var cad = cad
            .replace(/\s{2,}/g, " ");
          var expresion = cad.replace(/\s/g, `(\\s|\\n)+`);
          try {
            
            formatContent = formatContent.replace(/\n/g, " ").replace(/\s+/g, " ");
            var regx = new RegExp(expresion, "g");
            var matchdata = formatContent.match(regx);
            if (matchdata != null) {
              var init = regx.exec(formatContent).index;
              var final = matchdata[0].length;
              var formatDocument = formatContent.replace(
                regx,
                `<span id="resaltar">` + cad + `</span>`
              );
              results[keys[i]]["md5"] = dbdata.md5;
              results[keys[i]].data[j]["originaltxt"] = {
                original: originalcontent,
                matchtext: formatDocument,
                md5: dbdata.md5,
                page: parseInt(results[keys[i]].data[j].numberpage + 1),
              };
            } else {
              results[keys[i]].data[j]["originaltxt"] = {
                original: originalcontent,
                matchtext: originalcontent,
                page: parseInt(results[keys[i]].data[j].numberpage + 1),
              };
            }
          }catch (e) {
            console.log(regx)
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
  io.emit("msn", { msn: "Comenzando revisión" });
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
    io.emit("msn", { msn: "Obteniendo Hash" });
    md5File(completename).then(async (hash) => {
     
      var check = await REPORT.findOne({md5: hash});
      if (check != null) {
        //console.log(check.toJSON());
        res.render("reviewreport", check.toJSON());
        return;
      }
      io.emit("msn", { msn: "Iniciando Revisión" });
      var result = await search(completename);
      
      if (result == false) {
        res.render("error", {msn: "No se ha podido procesar el documento, puede que sea demasiado grande o este protegido"});
        return;
      }
      io.emit("msn", {msn: "Creando Reporte"});
      await indexofData(result.report);
      io.emit("msn", { msn: "Revisión Culminada" });
      var keys = Object.keys(result.report);
      console.log("Pasa el Object key");
      if (keys.length == 0) {
        io.emit("msn", { msn: "Cerrando" });
        res.render("goodfile", {
          filename: name,
          msn:
            "Felicidades no se han encontrado similitudes en la base de datos.",
        });
        //res.status(200).json({ msn: "No se han encontrado coincidencias" });
        return;
      }
      var renderdata = {
        pagetotal: result.totalLinesLen,
        numberpages: result.numberpages,
        filename: data.file.name,
        affectedpages: {},
        copy: [],
      };
      io.emit("msn", { msn: "Resaltando colores" });
      renderdata["md5"] = hash;
      var reviewtotal = 0;
      for (var i = 0; i < result.affectedpages.pages.length; i++) {
        for (var j = 0; j < keys.length; j++) {
          for (var k = 0; k < result.report[keys[j]].data.length; k++) {
            result.report[keys[j]].data[k]["modal_id"] = `modal_${j}_${k}`;
            var cad = result.report[keys[j]].data[k].linesmatch.substring(1, result.report[keys[j]].data[k].linesmatch.length - 1);
            var cad = cad
              .replace(/\s{2,}/g, " ");
            var expresion = cad.replace(/\s/g, `(\\s|\n)+`);
            var regx = new RegExp(expresion, "g");
            result.affectedpages.pages[i].content = result.affectedpages.pages[i].content.replace(/\n/g, " ").replace(/\s+/," ")
            if (result.affectedpages.pages[i].content.match(regx) != null) {
              result.affectedpages.pages[
                i
              ].content = result.affectedpages.pages[i].content
                .replace(/\//, "")
                .replace(
                  regx,
                  `<span id="${
                    result.report[keys[j]]["style"]
                  }" data-target="#modal_${j}_${k}">` +
                    cad +
                    `</span>`
                );
            }
          }
        }
      }
      for (var i = 0; i < result.affectedpages.pages.length; i++) {
        result.affectedpages.pages[i].content = result.affectedpages.pages[
          i
        ].content.replace(/<span>/g, "</span>");
      }
      for (var i = 0; i < keys.length; i++) {
        reviewtotal += result.report[keys[i]].data.length;
        renderdata.copy.push(result.report[keys[i]]);
      }
      renderdata["reviewtotal"] = reviewtotal;
      renderdata.affectedpages = result.affectedpages;
      renderdata["graph"] = {
        review: Number(reviewtotal / renderdata.pagetotal),
        nonereview: Number(1 - reviewtotal / renderdata.pagetotal),
      };
      for (var i = 0; i < renderdata.copy.length; i++) {
        renderdata.copy[i]["porcentaje"] = Math.round(
          (renderdata.copy[i].data.length / reviewtotal) * 100
        );
      }
      var report = new REPORT(renderdata);
      console.log(renderdata);
      io.emit("msn", { msn: "Almacenando Reporte en la Base de Datos" });
      report.save().then(() => {
        io.emit("msn", { msn: "Terminado" });
        res.render("reviewreport", renderdata);
      });
    });
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
router.post("/listdatabase", (req, res) => {
  var body = req.body;
  var filter = {};
  var limit = 20;
  //console.log(body);
  if (body.modalidad != null && body.modalidad != "Todo.") {
    filter["modalidad"] = body.modalidad;
  }
  if (body.unidad != null && body.unidad != "Todo.") {
    filter["unidad"] = body.unidad;
  }
  if (body.search != null && body.search != "") {
    filter["pages"] = new RegExp(body.search, "g");
  }
  var sort = { _id: -1 };
  if (body.sort != null) {
    var name = query.sort;
    var key = name.split("_")[0];
    var param = name.split("_")[1];
    sort[key] = parseInt(param);
  }
  console.log(filter);
  TESIS.find(filter)
    .limit(30)
    .sort(sort)
    .limit(limit)
    .exec((err, docs) => {
      var c = 1;
      var newdocs = docs.map((item) => {
        item["number"] = c;
        item["numpage"] = item.pages.length;
        c++;
        return item;
      });
      res.render("listdatabase", { data: newdocs, form: body });
    });
});
router.post("/uploadphoto", (req, res) => {
  if (!req.files || Object.keys(req.files).length === 0) {
    return res.status(400).json({ msn: "No existen archivos para subir" });
  }
  var query = req.query;
  if (query.idTesis == null) {
    res.status(200).json({ msn: "No podemos actualizar la fotografia" });
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
          photo: "/server/photo/?name=" + name.toUpperCase(),
          pathphoto: completename,
        },
      },
      (err, docs) => {
        res.status(200).json({ msn: "/server/photo/?name=" + name.toUpperCase() });
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
  console.log("La ruta es " + path);
  res.sendFile(path + query.name);
});
router.post("/upload", (req, res) => {
  if (!req.files || Object.keys(req.files).length === 0) {
    return res.status(400).json({ msn: "No existen archivos para subir" });
  }
  io.emit("msn", { msn: "Archivo enviado al servidor con éxito!" });
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
    io.emit("msn", { msn: "Parseando archivos" });
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
          if (htmlPages == null) {
            res.render("error", {msn: "No se ha podido procesar el documento, puede que sea demasiado grande o este protegido"})
            return;
          }
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
            io.emit("msn", { msn: "Enviado a la base de datos" });
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
                  io.emit("msn", { msn: "Páginas parseadas " + countcheck });
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

  if (!fs.existsSync(path + params.name)) {
    res.status(404).json({ msn: "No existe ese archivo" });
  }
  res.sendFile(path + params.name);
});
router.get("/viewdoc/:id", async (req, res) => {
  var params = req.params;
  if (params.id == null) {
    res.status(200).json({
      msn: "Parametro necesario",
    });
    return;
  }
  var docs = await TESIS.find({ md5: params.id });
  if (docs.length == 1) {
    res.sendFile(docs[0].filepdf);
    return;
  }
  res.status(200).json({ msn: "El archivo no se encuenta" });
});
router.post("/updatebook", async (req, res) => {
  var body = req.body;
  var ok = await TESIS.update({ _id: body.id }, { $set: body });
  await PAGES.update(
    { idTesis: body.id },
    { $set: { title: body.title, autor: body.autor } },
    { multi: true }
  );
  res.status(200).json({ msn: "GO MAN" });
});
router.get("/seereport", async (req, res) => {
  var params = req.query;
  if (params.id == null) {
    res.status(300).json({msn: "Error es necesario un ID"});
    return;
  }
  var report = await REPORT.findOne({_id: params.id});
  console.log(report);
  //res.status(200).json({});
  res.render("reviewreport", report.toJSON());
});
router.get("/report",  (req, res) => {
  var filter = {};
  REPORT.find(filter).select("filename pagetotal numberpages graph md5").
  sort({_id: -1}).
  limit(20).exec((err, docs) => {
    var count = 1;
    var newdocs = docs.map((item) => {
      var newitem = item.toJSON();
      newitem["number"] = count;
      count++;
      return newitem;
    });
    res.render("generalreport", {results: newdocs});
  });
});
router.post("/deletedocs/:id", async(req, res) => {
  console.log(req.params);
  if (req.params == null) {
    res.status(300).json({msn: "Error es necesario un parámetro para proceder la acción"})
    return;
  }
  var resulttesis = await TESIS.remove({_id: req.params.id});
  var resultpages = await PAGE.remove({idTesis: req.params.id});
  console.log(resulttesis);
  console.log(resultpages);
  var sum = Number(resulttesis.deletedCount + resultpages.deletedCount);
  res.render("deletedoc", {sum: sum});
});
router.get("/inicio", (req, res) => {
  res.render("inicio");
});

module.exports = router;