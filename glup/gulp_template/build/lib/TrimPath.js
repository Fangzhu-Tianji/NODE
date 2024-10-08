
var TrimPath;
!function () {
    null == TrimPath && (TrimPath = new Object), null == TrimPath.evalEx && (TrimPath.evalEx = function (src) {
        return eval(src);
    });
    var UNDEFINED;
    null == Array.prototype.pop && (Array.prototype.pop = function () {
        return 0 === this.length ? UNDEFINED : this[--this.length];
    }), null == Array.prototype.push && (Array.prototype.push = function () {
        for (var a = 0; a < arguments.length; ++a) { this[this.length] = arguments[a]; }
        return this.length;
    }), TrimPath.parseTemplate = function (a, b, c) {
        null == c && (c = TrimPath.parseTemplate_etc);
        var d = parse(a, b, c),
            e = TrimPath.evalEx(d, b, 1);
        return null != e ? new c.Template(b, a, d, e, c) : null;
    };
    try {
        String.prototype.process = function (a, b) {
            var c = TrimPath.parseTemplate(this, null);
            return null != c ? c.process(a, b) : this;
        };
    } catch (e) { }
    TrimPath.parseTemplate_etc = {}, TrimPath.parseTemplate_etc.statementTag = "forelse|for|if|elseif|else|var|macro", TrimPath.parseTemplate_etc.statementDef = {
        "if": {
            delta: 1,
            prefix: "if (",
            suffix: ") {",
            paramMin: 1
        },
        "else": {
            delta: 0,
            prefix: "} else {"
        },
        elseif: {
            delta: 0,
            prefix: "} else if (",
            suffix: ") {",
            paramDefault: "true"
        },
        "/if": {
            delta: -1,
            prefix: "}"
        },
        "for": {
            delta: 1,
            paramMin: 3,
            prefixFunc: function (a, b, c, d) {
                if ("in" != a[2]) throw new d.ParseError(c, b.line, "bad for loop statement: " + a.join(" "));
                var e = a[1],
                    f = "__LIST__" + e;
                return ["var ", f, " = ", a[3], ";", "var __LENGTH_STACK__;", "if (typeof(__LENGTH_STACK__) == 'undefined' || !__LENGTH_STACK__.length) __LENGTH_STACK__ = new Array();", "__LENGTH_STACK__[__LENGTH_STACK__.length] = 0;", "if ((", f, ") != null) { ", "var ", e, "_ct = 0;", "for (var ", e, "_index in ", f, ") { ", e, "_ct++;", "if (typeof(", f, "[", e, "_index]) == 'function') {continue;}", "__LENGTH_STACK__[__LENGTH_STACK__.length - 1]++;", "var ", e, " = ", f, "[", e, "_index];"].join("");
            }
        },
        forelse: {
            delta: 0,
            prefix: "} } if (__LENGTH_STACK__[__LENGTH_STACK__.length - 1] == 0) { if (",
            suffix: ") {",
            paramDefault: "true"
        },
        "/for": {
            delta: -1,
            prefix: "} }; delete __LENGTH_STACK__[__LENGTH_STACK__.length - 1];"
        },
        "var": {
            delta: 0,
            prefix: "var ",
            suffix: ";"
        },
        macro: {
            delta: 1,
            prefixFunc: function (a) {
                var b = a[1].split("(")[0];
                return ["var ", b, " = function", a.slice(1).join(" ").substring(b.length), "{ var _OUT_arr = []; var _OUT = { write: function(m) { if (m) _OUT_arr.push(m); } }; "].join("");
            }
        },
        "/macro": {
            delta: -1,
            prefix: " return _OUT_arr.join(''); };"
        }
    }, TrimPath.parseTemplate_etc.modifierDef = {
        eat: function () {
            return "";
        },
        escape: function (a) {
            return String(a).replace(/&/g, "&").replace(/</g, "<").replace(/>/g, ">");
        },
        capitalize: function (a) {
            return String(a).toUpperCase();
        },
        "default": function (a, b) {
            return null != a ? a : b;
        }
    }, TrimPath.parseTemplate_etc.modifierDef.h = TrimPath.parseTemplate_etc.modifierDef.escape, TrimPath.parseTemplate_etc.Template = function (a, b, c, d, e) {
        this.process = function (a, b) {
            null == a && (a = {}), null == a._MODIFIERS && (a._MODIFIERS = {}), null == a.defined && (a.defined = function (b) {
                return void 0 != a[b];
            });
            for (var c in e.modifierDef) null == a._MODIFIERS[c] && (a._MODIFIERS[c] = e.modifierDef[c]);
            null == b && (b = {});
            var f = [],
                g = {
                    write: function (a) {
                        f.push(a);
                    }
                };
            try {
                d(g, a, b);
            } catch (h) {
                if (1 == b.throwExceptions) throw h;
                var i = new String(f.join("") + "[ERROR: " + h.toString() + (h.message ? "; " + h.message : "") + "]");
                return i.exception = h, i;
            }
            return f.join("")
        }, this.name = a, this.source = b, this.sourceFunc = c, this.toString = function () {
            return "TrimPath.Template [" + a + "]";
        };
    }, TrimPath.parseTemplate_etc.ParseError = function (a, b, c) {
        this.name = a, this.line = b, this.message = c;
    }, TrimPath.parseTemplate_etc.ParseError.prototype.toString = function () {
        return "TrimPath template ParseError in " + this.name + ": line " + this.line + ", " + this.message;
    };
    var parse = function (a, b, c) {
        a = cleanWhiteSpace(a);
        for (var d = ["var TrimPath_Template_TEMP = function(_OUT, _CONTEXT, _FLAGS) { with (_CONTEXT) {"], e = {
            stack: [],
            line: 1
        }, f = -1; f + 1 < a.length; ) {
            var g = f;
            for (g = a.indexOf("{", g + 1); g >= 0; ) {
                var h = a.indexOf("}", g + 1),
                    i = a.substring(g, h),
                    j = i.match(/^\{(cdata|minify|eval)/);
                if (j) {
                    var k = j[1],
                        l = g + k.length + 1,
                        m = a.indexOf("}", l);
                    if (m >= 0) {
                        var n;
                        n = 0 >= m - l ? "{/" + k + "}" : a.substring(l + 1, m);
                        var o = a.indexOf(n, m + 1);
                        if (o >= 0) {
                            emitSectionText(a.substring(f + 1, g), d);
                            var p = a.substring(m + 1, o);
                            "cdata" == k ? emitText(p, d) : "minify" == k ? emitText(scrubWhiteSpace(p), d) : "eval" == k && null != p && p.length > 0 && d.push("_OUT.write( (function() { " + p + " })() );"), g = f = o + n.length - 1
                        }
                    }
                } else if ("$" != a.charAt(g - 1) && "\\" != a.charAt(g - 1)) {
                    var q = "/" == a.charAt(g + 1) ? 2 : 1;
                    if (0 == a.substring(g + q, g + 10 + q).search(TrimPath.parseTemplate_etc.statementTag)) break
                }
                g = a.indexOf("{", g + 1)
            }
            if (0 > g) break;
            var h = a.indexOf("}", g + 1);
            if (0 > h) break;
            emitSectionText(a.substring(f + 1, g), d), emitStatement(a.substring(g, h + 1), e, d, b, c), f = h
        }
        if (emitSectionText(a.substring(f + 1), d), 0 != e.stack.length) throw new c.ParseError(b, e.line, "unclosed, unmatched statement(s): " + e.stack.join(","));
        return d.push("}}; TrimPath_Template_TEMP"), d.join("")
    }, emitStatement = function (a, b, c, d, e) {
        var f = a.slice(1, -1).split(" "),
            g = e.statementDef[f[0]];
        if (null == g) return emitSectionText(a, c), void 0;
        if (g.delta < 0) {
            if (b.stack.length <= 0) throw new e.ParseError(d, b.line, "close tag does not match any previous statement: " + a);
            b.stack.pop()
        }
        if (g.delta > 0 && b.stack.push(a), null != g.paramMin && g.paramMin >= f.length) throw new e.ParseError(d, b.line, "statement needs more parameters: " + a);
        if (null != g.prefixFunc ? c.push(g.prefixFunc(f, b, d, e)) : c.push(g.prefix), null != g.suffix) {
            if (f.length <= 1) null != g.paramDefault && c.push(g.paramDefault);
            else for (var h = 1; h < f.length; h++) h > 1 && c.push(" "), c.push(f[h]);
            c.push(g.suffix)
        }
    }, emitSectionText = function (a, b) {
        if (!(a.length <= 0)) {
            for (var c = 0, d = a.length - 1; c < a.length && "\n" == a.charAt(c); ) c++;
            for (; d >= 0 && (" " == a.charAt(d) || "	" == a.charAt(d)); ) d--;
            if (c > d && (d = c), c > 0) {
                b.push('if (_FLAGS.keepWhitespace == true) _OUT.write("');
                var e = a.substring(0, c).replace("\n", "\\n");
                "\n" == e.charAt(e.length - 1) && (e = e.substring(0, e.length - 1)), b.push(e), b.push('");')
            }
            for (var f = a.substring(c, d + 1).split("\n"), g = 0; g < f.length; g++) emitSectionTextLine(f[g], b), g < f.length - 1 && b.push('_OUT.write("\\n");\n');
            if (d + 1 < a.length) {
                b.push('if (_FLAGS.keepWhitespace == true) _OUT.write("');
                var e = a.substring(d + 1).replace("\n", "\\n");
                "\n" == e.charAt(e.length - 1) && (e = e.substring(0, e.length - 1)), b.push(e), b.push('");')
            }
        }
    }, emitSectionTextLine = function (a, b) {
        for (var c = "}", d = -1; d + c.length < a.length; ) {
            var e = "${",
                f = "}",
                g = a.indexOf(e, d + c.length);
            if (0 > g) break;
            "%" == a.charAt(g + 2) && (e = "${%", f = "%}");
            var h = a.indexOf(f, g + e.length);
            if (0 > h) break;
            emitText(a.substring(d + c.length, g), b);
            var i = a.substring(g + e.length, h).replace(/\|\|/g, "#@@#").split("|");
            for (var j in i) i[j].replace && (i[j] = i[j].replace(/#@@#/g, "||"));
            b.push("_OUT.write("), emitExpression(i, i.length - 1, b), b.push(");"), d = h, c = f
        }
        emitText(a.substring(d + c.length), b)
    }, emitText = function (a, b) {
        null == a || a.length <= 0 || (a = a.replace(/\\/g, "\\\\"), a = a.replace(/\n/g, "\\n"), a = a.replace(/"/g, '\\"'), b.push('_OUT.write("'), b.push(a), b.push('");'))
    }, emitExpression = function (a, b, c) {
        var d = a[b];
        if (0 >= b) return c.push(d), void 0;
        var e = d.split(":");
        c.push('_MODIFIERS["'), c.push(e[0]), c.push('"]('), emitExpression(a, b - 1, c), e.length > 1 && (c.push(","), c.push(e[1])), c.push(")");
    }, cleanWhiteSpace = function (a) {
        return a = a.replace(/\t/g, "    "), a = a.replace(/\r\n/g, "\n"), a = a.replace(/\r/g, "\n"), a = a.replace(/^(\s*\S*(\s+\S+)*)\s*$/, "$1");
    }, scrubWhiteSpace = function (a) {
        return a = a.replace(/^\s+/g, ""), a = a.replace(/\s+$/g, ""), a = a.replace(/\s+/g, " "), a = a.replace(/^(\s*\S*(\s+\S+)*)\s*$/, "$1");
    };
    TrimPath.parseDOMTemplate = function (a, b, c) {
        null == b && (b = document);
        var d = b.getElementById(a),
            e = d.value;
        return null == e && (e = d.innerHTML), e = e.replace(/</g, "<").replace(/>/g, ">"), TrimPath.parseTemplate(e, a, c);
    },
    TrimPath.processDOMTemplate = function (a, b, c, d, e) {
        return TrimPath.parseDOMTemplate(a, d, e).process(b, c);
    };
    if (window["jQuery"]) {
        TrimPath.data = {};
        TrimPath.processDOMTemplateAjaxGetTem = function (a) {
            if (TrimPath.data[a] == undefined || !TrimPath.data[a]) {
                G.util.jsonpost({ mod: "Jsonp", act: "getText", fileName: a }, function (res) {
                    if (res.errno == 0) {
                        TrimPath.data[a] = res.data.toString().replace(/&amp;nbsp;/g, "&nbsp;").replace(/&amp;yen;/g, "&yen;");
                        return TrimPath.data[a];
                    } else {
                        alert(res.errmsg);
                    }
                });
            }
            else {
                alert('请检查参数是否有误');
            }
        };
        TrimPath.processDOMTemplateAjaxData = function (a, b) {
            if (TrimPath.data[a] == undefined || !TrimPath.data[a]) {
                G.util.jsonpost({ mod: "Jsonp", act: "getText", fileName: a }, function (res) {
                    if (res.errno == 0) {
                        TrimPath.data[a] = res.data.toString().replace(/&amp;nbsp;/g, "&nbsp;").replace(/&amp;yen;/g, "&yen;");
                        b && b(TrimPath.data[a]);
                    } else {
                        alert(res.errmsg);
                    }
                });
            } else {
                b && b(TrimPath.data[a]);
            }
        };
        TrimPath.processDOMTemplateAjaxJsonp = function (a, b, c) {
            if (TrimPath.data[a] == undefined || !TrimPath.data[a]) {
                if (window["G"]) {
                    G.util.jsonpost({ mod: "Jsonp", act: "getText", fileName: a }, function (res) {
                        if (res.errno == 0) {
                            TrimPath.data[a] = res.data.toString().replace(/&amp;nbsp;/g, "&nbsp;").replace(/&amp;yen;/g, "&yen;");

                            c && c(TrimPath.parseTemplate(TrimPath.data[a], a, null).process(b, null));
                        } else {
                            alert(res.errmsg);
                        }
                    });
                } else {
                    alert("不支持JSONP数据");
                }
            } else {
                c && c(TrimPath.parseTemplate(TrimPath.data[a], a, null).process(b, null));
            }
        };

        TrimPath.processDOMTemplateAjax = function (a, b, c) {
            if (TrimPath.data[a] == undefined || !TrimPath.data[a]) {
                var url = "http://" + location.hostname + "/" + a + "?r=" + Math.random();
                window["jQuery"].ajax({
                    async: false,
                    contentType: "text",
                    url: url,
                    success: function (res) {
                        TrimPath.data[a] = res.replace(/&amp;nbsp;/g, "&nbsp;").replace(/&amp;yen;/g, "&yen;");
                        c && c(TrimPath.parseTemplate(TrimPath.data[a], a, null).process(b, null));
                    },
                    error: function (res) {
                        alert(res);
                    }
                });
            } else {
                c && c(TrimPath.parseTemplate(TrimPath.data[a], a, null).process(b, null));
            }
        };
    }
} ();