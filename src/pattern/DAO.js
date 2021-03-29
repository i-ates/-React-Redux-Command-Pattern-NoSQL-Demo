import obj2xml from "../helper/obj2xml";

var FileSaver = require("file-saver");

export default class DAO {
  write(objects, type = "json") {
    localStorage.setItem("collections", JSON.stringify(objects));
  }
  save(type = "json") {
    let objects = JSON.parse(localStorage.getItem("collections"));
    let result = "";
    if (type === "xml") {
      result = obj2xml(objects, {
        rootName: "collections", // defaults to 'root'
        indentation: "4", // defaults to 0
        doctype: "auto", // defaults to undefined
      });
    } else {
      result = JSON.stringify(objects, null, 4);
    }
    var blob = new Blob([result], { type: "text/plain;charset=utf-8" });
    FileSaver.saveAs(blob, "output." + type);
  }
}

// https://esstudio.site/2018/08/14/json2xml.html
