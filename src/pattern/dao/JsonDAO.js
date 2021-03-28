var FileSaver = require("file-saver");

export default class JsonDAO {
  obj2xml = function (obj, opt) {
    var endScopeObj = {};
    if (!opt) opt = {};
    var rootName = opt.rootName || "root";
    var declaration =
      opt.declaration === "auto"
        ? '<?xml version="1.0" encoding="utf-8"?>'
        : opt.declaration;
    var indentation = opt.indentation || 0;
    var generateDtd =
      (opt.doctype === "auto" || opt.doctype === "generate") && declaration;
    var useAttributes = opt.attributes === false ? false : true;
    var scope_indent = 0;
    if (generateDtd) {
      var dtdAttr = {};
      var dtdElem = {};
    }
    var ret = [];
    var tagContent,
      isArr,
      curs,
      _t,
      _ti,
      key,
      innerKey,
      name,
      queue = [obj, rootName];
    while (queue.length > 0) {
      name = queue.pop();
      curs = queue.pop();
      if (generateDtd) dtdElem[name] = dtdElem[name] || {};
      if (curs === endScopeObj) {
        scope_indent--;
        if (indentation > 0)
          ret.push("\n", " ".repeat(indentation * scope_indent));
        ret.push("</", name, ">");
        continue;
      }
      if (typeof curs === "object") {
        queue.push(endScopeObj);
        queue.push(name);
        tagContent = [name];
        isArr = Array.isArray(curs);
        if (isArr && generateDtd) {
          dtdElem[name][name + "Item*"] = true;
        }
        for (key in curs) {
          if (curs.hasOwnProperty(key)) {
            if (isArr) {
              queue.push(curs[key]);
              queue.push(name + "Item");
            } else if (
              typeof curs[key] == "object" ||
              useAttributes === false
            ) {
              queue.push(curs[key]);
              queue.push(key);
              if (generateDtd) dtdElem[name][key] = true;
            } else {
              if (generateDtd) {
                dtdAttr[name] = dtdAttr[name] || {};
                dtdAttr[name][key] = true;
              }
              tagContent.push(key + "=" + '"' + curs[key] + '"');
            }
          }
        }
        if (indentation > 0)
          ret.push("\n", " ".repeat(indentation * scope_indent));
        ret.push("<", tagContent.join(" "), ">");
        scope_indent++;
      } else {
        if (generateDtd) dtdElem[name]["#PCDATA"] = true;
        if (indentation > 0)
          ret.push("\n", " ".repeat(indentation * scope_indent));
        ret.push("<");
        ret.push(name);
        ret.push(">");
        ret.push(curs);
        ret.push("</");
        ret.push(name);
        ret.push(">");
      }
    }
    if (generateDtd) {
      var dtd = ["<!DOCTYPE ", rootName, " ["];
      for (key in dtdAttr) {
        if (dtdAttr.hasOwnProperty(key)) {
          for (innerKey in dtdAttr[key]) {
            if (dtdAttr[key].hasOwnProperty(innerKey)) {
              if (indentation > 0) dtd.push("\n");
              dtd.push("<!ATTLIST ", key, " ", innerKey, " CDATA #IMPLIED>");
            }
          }
        }
      }
      for (key in dtdElem) {
        if (dtdElem.hasOwnProperty(key)) {
          innerKey = null;
          _t = ["<!ELEMENT ", key, " ("];
          _ti = [];
          for (innerKey in dtdElem[key]) {
            if (dtdElem[key].hasOwnProperty(innerKey)) {
              _ti.push(innerKey);
            }
          }
          if (indentation > 0) dtd.push("\n");
          if (innerKey === null)
            // no children
            dtd.push("<!ELEMENT ", key, " EMPTY>");
          else {
            _t.push(_ti.join(", "));
            _t.push(")>");
            dtd.push.apply(dtd, _t);
          }
        }
      }
      dtd.push("]>");
      ret.unshift.apply(ret, dtd);
    } else if (declaration)
      ret.unshift(opt.doctype ? opt.doctype : "<!DOCTYPE " + rootName + ">");
    if (declaration) ret.unshift(declaration);
    return ret.join("");
  };

  write(objects, type = "json") {
    localStorage.setItem("collections", JSON.stringify(objects));
  }
  save(type = "json") {
    let objects = JSON.parse(localStorage.getItem("collections"));
    let result = "";
    if (type === "xml") {
      result = this.obj2xml(objects, {
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
