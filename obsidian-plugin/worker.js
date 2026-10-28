"use strict";
var __create = Object.create;
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getProtoOf = Object.getPrototypeOf;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __commonJS = (cb, mod) => function __require() {
  try {
    return mod || (0, cb[__getOwnPropNames(cb)[0]])((mod = { exports: {} }).exports, mod), mod.exports;
  } catch (e) {
    throw mod = 0, e;
  }
};
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toESM = (mod, isNodeMode, target) => (target = mod != null ? __create(__getProtoOf(mod)) : {}, __copyProps(
  // If the importer is in node compatibility mode or this is not an ESM
  // file that has been converted to a CommonJS file using a Babel-
  // compatible transform (i.e. "__esModule" has not been set), then set
  // "default" to the CommonJS "module.exports" for node compatibility.
  isNodeMode || !mod || !mod.__esModule ? __defProp(target, "default", { value: mod, enumerable: true }) : target,
  mod
));

// ../node_modules/kind-of/index.js
var require_kind_of = __commonJS({
  "../node_modules/kind-of/index.js"(exports2, module2) {
    var toString = Object.prototype.toString;
    module2.exports = function kindOf(val) {
      if (val === void 0) return "undefined";
      if (val === null) return "null";
      var type = typeof val;
      if (type === "boolean") return "boolean";
      if (type === "string") return "string";
      if (type === "number") return "number";
      if (type === "symbol") return "symbol";
      if (type === "function") {
        return isGeneratorFn(val) ? "generatorfunction" : "function";
      }
      if (isArray(val)) return "array";
      if (isBuffer(val)) return "buffer";
      if (isArguments(val)) return "arguments";
      if (isDate(val)) return "date";
      if (isError(val)) return "error";
      if (isRegexp(val)) return "regexp";
      switch (ctorName(val)) {
        case "Symbol":
          return "symbol";
        case "Promise":
          return "promise";
        // Set, Map, WeakSet, WeakMap
        case "WeakMap":
          return "weakmap";
        case "WeakSet":
          return "weakset";
        case "Map":
          return "map";
        case "Set":
          return "set";
        // 8-bit typed arrays
        case "Int8Array":
          return "int8array";
        case "Uint8Array":
          return "uint8array";
        case "Uint8ClampedArray":
          return "uint8clampedarray";
        // 16-bit typed arrays
        case "Int16Array":
          return "int16array";
        case "Uint16Array":
          return "uint16array";
        // 32-bit typed arrays
        case "Int32Array":
          return "int32array";
        case "Uint32Array":
          return "uint32array";
        case "Float32Array":
          return "float32array";
        case "Float64Array":
          return "float64array";
      }
      if (isGeneratorObj(val)) {
        return "generator";
      }
      type = toString.call(val);
      switch (type) {
        case "[object Object]":
          return "object";
        // iterators
        case "[object Map Iterator]":
          return "mapiterator";
        case "[object Set Iterator]":
          return "setiterator";
        case "[object String Iterator]":
          return "stringiterator";
        case "[object Array Iterator]":
          return "arrayiterator";
      }
      return type.slice(8, -1).toLowerCase().replace(/\s/g, "");
    };
    function ctorName(val) {
      return typeof val.constructor === "function" ? val.constructor.name : null;
    }
    function isArray(val) {
      if (Array.isArray) return Array.isArray(val);
      return val instanceof Array;
    }
    function isError(val) {
      return val instanceof Error || typeof val.message === "string" && val.constructor && typeof val.constructor.stackTraceLimit === "number";
    }
    function isDate(val) {
      if (val instanceof Date) return true;
      return typeof val.toDateString === "function" && typeof val.getDate === "function" && typeof val.setDate === "function";
    }
    function isRegexp(val) {
      if (val instanceof RegExp) return true;
      return typeof val.flags === "string" && typeof val.ignoreCase === "boolean" && typeof val.multiline === "boolean" && typeof val.global === "boolean";
    }
    function isGeneratorFn(name, val) {
      return ctorName(name) === "GeneratorFunction";
    }
    function isGeneratorObj(val) {
      return typeof val.throw === "function" && typeof val.return === "function" && typeof val.next === "function";
    }
    function isArguments(val) {
      try {
        if (typeof val.length === "number" && typeof val.callee === "function") {
          return true;
        }
      } catch (err) {
        if (err.message.indexOf("callee") !== -1) {
          return true;
        }
      }
      return false;
    }
    function isBuffer(val) {
      if (val.constructor && typeof val.constructor.isBuffer === "function") {
        return val.constructor.isBuffer(val);
      }
      return false;
    }
  }
});

// ../node_modules/is-extendable/index.js
var require_is_extendable = __commonJS({
  "../node_modules/is-extendable/index.js"(exports2, module2) {
    "use strict";
    module2.exports = function isExtendable(val) {
      return typeof val !== "undefined" && val !== null && (typeof val === "object" || typeof val === "function");
    };
  }
});

// ../node_modules/extend-shallow/index.js
var require_extend_shallow = __commonJS({
  "../node_modules/extend-shallow/index.js"(exports2, module2) {
    "use strict";
    var isObject = require_is_extendable();
    module2.exports = function extend(o) {
      if (!isObject(o)) {
        o = {};
      }
      var len = arguments.length;
      for (var i = 1; i < len; i++) {
        var obj = arguments[i];
        if (isObject(obj)) {
          assign(o, obj);
        }
      }
      return o;
    };
    function assign(a, b) {
      for (var key in b) {
        if (hasOwn(b, key)) {
          a[key] = b[key];
        }
      }
    }
    function hasOwn(obj, key) {
      return Object.prototype.hasOwnProperty.call(obj, key);
    }
  }
});

// ../node_modules/section-matter/index.js
var require_section_matter = __commonJS({
  "../node_modules/section-matter/index.js"(exports2, module2) {
    "use strict";
    var typeOf = require_kind_of();
    var extend = require_extend_shallow();
    module2.exports = function(input, options2) {
      if (typeof options2 === "function") {
        options2 = { parse: options2 };
      }
      var file = toObject(input);
      var defaults = { section_delimiter: "---", parse: identity };
      var opts = extend({}, defaults, options2);
      var delim = opts.section_delimiter;
      var lines = file.content.split(/\r?\n/);
      var sections = null;
      var section = createSection();
      var content = [];
      var stack = [];
      function initSections(val) {
        file.content = val;
        sections = [];
        content = [];
      }
      function closeSection(val) {
        if (stack.length) {
          section.key = getKey(stack[0], delim);
          section.content = val;
          opts.parse(section, sections);
          sections.push(section);
          section = createSection();
          content = [];
          stack = [];
        }
      }
      for (var i = 0; i < lines.length; i++) {
        var line = lines[i];
        var len = stack.length;
        var ln = line.trim();
        if (isDelimiter(ln, delim)) {
          if (ln.length === 3 && i !== 0) {
            if (len === 0 || len === 2) {
              content.push(line);
              continue;
            }
            stack.push(ln);
            section.data = content.join("\n");
            content = [];
            continue;
          }
          if (sections === null) {
            initSections(content.join("\n"));
          }
          if (len === 2) {
            closeSection(content.join("\n"));
          }
          stack.push(ln);
          continue;
        }
        content.push(line);
      }
      if (sections === null) {
        initSections(content.join("\n"));
      } else {
        closeSection(content.join("\n"));
      }
      file.sections = sections;
      return file;
    };
    function isDelimiter(line, delim) {
      if (line.slice(0, delim.length) !== delim) {
        return false;
      }
      if (line.charAt(delim.length + 1) === delim.slice(-1)) {
        return false;
      }
      return true;
    }
    function toObject(input) {
      if (typeOf(input) !== "object") {
        input = { content: input };
      }
      if (typeof input.content !== "string" && !isBuffer(input.content)) {
        throw new TypeError("expected a buffer or string");
      }
      input.content = input.content.toString();
      input.sections = [];
      return input;
    }
    function getKey(val, delim) {
      return val ? val.slice(delim.length).trim() : "";
    }
    function createSection() {
      return { key: "", data: "", content: "" };
    }
    function identity(val) {
      return val;
    }
    function isBuffer(val) {
      if (val && val.constructor && typeof val.constructor.isBuffer === "function") {
        return val.constructor.isBuffer(val);
      }
      return false;
    }
  }
});

// ../node_modules/js-yaml/lib/js-yaml/common.js
var require_common = __commonJS({
  "../node_modules/js-yaml/lib/js-yaml/common.js"(exports2, module2) {
    "use strict";
    function isNothing(subject) {
      return typeof subject === "undefined" || subject === null;
    }
    function isObject(subject) {
      return typeof subject === "object" && subject !== null;
    }
    function toArray(sequence) {
      if (Array.isArray(sequence)) return sequence;
      else if (isNothing(sequence)) return [];
      return [sequence];
    }
    function extend(target, source) {
      var index, length, key, sourceKeys;
      if (source) {
        sourceKeys = Object.keys(source);
        for (index = 0, length = sourceKeys.length; index < length; index += 1) {
          key = sourceKeys[index];
          target[key] = source[key];
        }
      }
      return target;
    }
    function repeat(string, count) {
      var result = "", cycle;
      for (cycle = 0; cycle < count; cycle += 1) {
        result += string;
      }
      return result;
    }
    function isNegativeZero(number) {
      return number === 0 && Number.NEGATIVE_INFINITY === 1 / number;
    }
    module2.exports.isNothing = isNothing;
    module2.exports.isObject = isObject;
    module2.exports.toArray = toArray;
    module2.exports.repeat = repeat;
    module2.exports.isNegativeZero = isNegativeZero;
    module2.exports.extend = extend;
  }
});

// ../node_modules/js-yaml/lib/js-yaml/exception.js
var require_exception = __commonJS({
  "../node_modules/js-yaml/lib/js-yaml/exception.js"(exports2, module2) {
    "use strict";
    function YAMLException(reason, mark) {
      Error.call(this);
      this.name = "YAMLException";
      this.reason = reason;
      this.mark = mark;
      this.message = (this.reason || "(unknown reason)") + (this.mark ? " " + this.mark.toString() : "");
      if (Error.captureStackTrace) {
        Error.captureStackTrace(this, this.constructor);
      } else {
        this.stack = new Error().stack || "";
      }
    }
    YAMLException.prototype = Object.create(Error.prototype);
    YAMLException.prototype.constructor = YAMLException;
    YAMLException.prototype.toString = function toString(compact) {
      var result = this.name + ": ";
      result += this.reason || "(unknown reason)";
      if (!compact && this.mark) {
        result += " " + this.mark.toString();
      }
      return result;
    };
    module2.exports = YAMLException;
  }
});

// ../node_modules/js-yaml/lib/js-yaml/mark.js
var require_mark = __commonJS({
  "../node_modules/js-yaml/lib/js-yaml/mark.js"(exports2, module2) {
    "use strict";
    var common = require_common();
    function Mark(name, buffer, position, line, column) {
      this.name = name;
      this.buffer = buffer;
      this.position = position;
      this.line = line;
      this.column = column;
    }
    Mark.prototype.getSnippet = function getSnippet(indent, maxLength) {
      var head, start, tail, end, snippet;
      if (!this.buffer) return null;
      indent = indent || 4;
      maxLength = maxLength || 75;
      head = "";
      start = this.position;
      while (start > 0 && "\0\r\n\x85\u2028\u2029".indexOf(this.buffer.charAt(start - 1)) === -1) {
        start -= 1;
        if (this.position - start > maxLength / 2 - 1) {
          head = " ... ";
          start += 5;
          break;
        }
      }
      tail = "";
      end = this.position;
      while (end < this.buffer.length && "\0\r\n\x85\u2028\u2029".indexOf(this.buffer.charAt(end)) === -1) {
        end += 1;
        if (end - this.position > maxLength / 2 - 1) {
          tail = " ... ";
          end -= 5;
          break;
        }
      }
      snippet = this.buffer.slice(start, end);
      return common.repeat(" ", indent) + head + snippet + tail + "\n" + common.repeat(" ", indent + this.position - start + head.length) + "^";
    };
    Mark.prototype.toString = function toString(compact) {
      var snippet, where = "";
      if (this.name) {
        where += 'in "' + this.name + '" ';
      }
      where += "at line " + (this.line + 1) + ", column " + (this.column + 1);
      if (!compact) {
        snippet = this.getSnippet();
        if (snippet) {
          where += ":\n" + snippet;
        }
      }
      return where;
    };
    module2.exports = Mark;
  }
});

// ../node_modules/js-yaml/lib/js-yaml/type.js
var require_type = __commonJS({
  "../node_modules/js-yaml/lib/js-yaml/type.js"(exports2, module2) {
    "use strict";
    var YAMLException = require_exception();
    var TYPE_CONSTRUCTOR_OPTIONS = [
      "kind",
      "resolve",
      "construct",
      "instanceOf",
      "predicate",
      "represent",
      "defaultStyle",
      "styleAliases"
    ];
    var YAML_NODE_KINDS = [
      "scalar",
      "sequence",
      "mapping"
    ];
    function compileStyleAliases(map) {
      var result = {};
      if (map !== null) {
        Object.keys(map).forEach(function(style) {
          map[style].forEach(function(alias) {
            result[String(alias)] = style;
          });
        });
      }
      return result;
    }
    function Type(tag, options2) {
      options2 = options2 || {};
      Object.keys(options2).forEach(function(name) {
        if (TYPE_CONSTRUCTOR_OPTIONS.indexOf(name) === -1) {
          throw new YAMLException('Unknown option "' + name + '" is met in definition of "' + tag + '" YAML type.');
        }
      });
      this.tag = tag;
      this.kind = options2["kind"] || null;
      this.resolve = options2["resolve"] || function() {
        return true;
      };
      this.construct = options2["construct"] || function(data) {
        return data;
      };
      this.instanceOf = options2["instanceOf"] || null;
      this.predicate = options2["predicate"] || null;
      this.represent = options2["represent"] || null;
      this.defaultStyle = options2["defaultStyle"] || null;
      this.styleAliases = compileStyleAliases(options2["styleAliases"] || null);
      if (YAML_NODE_KINDS.indexOf(this.kind) === -1) {
        throw new YAMLException('Unknown kind "' + this.kind + '" is specified for "' + tag + '" YAML type.');
      }
    }
    module2.exports = Type;
  }
});

// ../node_modules/js-yaml/lib/js-yaml/schema.js
var require_schema = __commonJS({
  "../node_modules/js-yaml/lib/js-yaml/schema.js"(exports2, module2) {
    "use strict";
    var common = require_common();
    var YAMLException = require_exception();
    var Type = require_type();
    function compileList(schema, name, result) {
      var exclude = [];
      schema.include.forEach(function(includedSchema) {
        result = compileList(includedSchema, name, result);
      });
      schema[name].forEach(function(currentType) {
        result.forEach(function(previousType, previousIndex) {
          if (previousType.tag === currentType.tag && previousType.kind === currentType.kind) {
            exclude.push(previousIndex);
          }
        });
        result.push(currentType);
      });
      return result.filter(function(type, index) {
        return exclude.indexOf(index) === -1;
      });
    }
    function compileMap() {
      var result = {
        scalar: {},
        sequence: {},
        mapping: {},
        fallback: {}
      }, index, length;
      function collectType(type) {
        result[type.kind][type.tag] = result["fallback"][type.tag] = type;
      }
      for (index = 0, length = arguments.length; index < length; index += 1) {
        arguments[index].forEach(collectType);
      }
      return result;
    }
    function Schema(definition) {
      this.include = definition.include || [];
      this.implicit = definition.implicit || [];
      this.explicit = definition.explicit || [];
      this.implicit.forEach(function(type) {
        if (type.loadKind && type.loadKind !== "scalar") {
          throw new YAMLException("There is a non-scalar type in the implicit list of a schema. Implicit resolving of such types is not supported.");
        }
      });
      this.compiledImplicit = compileList(this, "implicit", []);
      this.compiledExplicit = compileList(this, "explicit", []);
      this.compiledTypeMap = compileMap(this.compiledImplicit, this.compiledExplicit);
    }
    Schema.DEFAULT = null;
    Schema.create = function createSchema() {
      var schemas, types;
      switch (arguments.length) {
        case 1:
          schemas = Schema.DEFAULT;
          types = arguments[0];
          break;
        case 2:
          schemas = arguments[0];
          types = arguments[1];
          break;
        default:
          throw new YAMLException("Wrong number of arguments for Schema.create function");
      }
      schemas = common.toArray(schemas);
      types = common.toArray(types);
      if (!schemas.every(function(schema) {
        return schema instanceof Schema;
      })) {
        throw new YAMLException("Specified list of super schemas (or a single Schema object) contains a non-Schema object.");
      }
      if (!types.every(function(type) {
        return type instanceof Type;
      })) {
        throw new YAMLException("Specified list of YAML types (or a single Type object) contains a non-Type object.");
      }
      return new Schema({
        include: schemas,
        explicit: types
      });
    };
    module2.exports = Schema;
  }
});

// ../node_modules/js-yaml/lib/js-yaml/type/str.js
var require_str = __commonJS({
  "../node_modules/js-yaml/lib/js-yaml/type/str.js"(exports2, module2) {
    "use strict";
    var Type = require_type();
    module2.exports = new Type("tag:yaml.org,2002:str", {
      kind: "scalar",
      construct: function(data) {
        return data !== null ? data : "";
      }
    });
  }
});

// ../node_modules/js-yaml/lib/js-yaml/type/seq.js
var require_seq = __commonJS({
  "../node_modules/js-yaml/lib/js-yaml/type/seq.js"(exports2, module2) {
    "use strict";
    var Type = require_type();
    module2.exports = new Type("tag:yaml.org,2002:seq", {
      kind: "sequence",
      construct: function(data) {
        return data !== null ? data : [];
      }
    });
  }
});

// ../node_modules/js-yaml/lib/js-yaml/type/map.js
var require_map = __commonJS({
  "../node_modules/js-yaml/lib/js-yaml/type/map.js"(exports2, module2) {
    "use strict";
    var Type = require_type();
    module2.exports = new Type("tag:yaml.org,2002:map", {
      kind: "mapping",
      construct: function(data) {
        return data !== null ? data : {};
      }
    });
  }
});

// ../node_modules/js-yaml/lib/js-yaml/schema/failsafe.js
var require_failsafe = __commonJS({
  "../node_modules/js-yaml/lib/js-yaml/schema/failsafe.js"(exports2, module2) {
    "use strict";
    var Schema = require_schema();
    module2.exports = new Schema({
      explicit: [
        require_str(),
        require_seq(),
        require_map()
      ]
    });
  }
});

// ../node_modules/js-yaml/lib/js-yaml/type/null.js
var require_null = __commonJS({
  "../node_modules/js-yaml/lib/js-yaml/type/null.js"(exports2, module2) {
    "use strict";
    var Type = require_type();
    function resolveYamlNull(data) {
      if (data === null) return true;
      var max = data.length;
      return max === 1 && data === "~" || max === 4 && (data === "null" || data === "Null" || data === "NULL");
    }
    function constructYamlNull() {
      return null;
    }
    function isNull(object) {
      return object === null;
    }
    module2.exports = new Type("tag:yaml.org,2002:null", {
      kind: "scalar",
      resolve: resolveYamlNull,
      construct: constructYamlNull,
      predicate: isNull,
      represent: {
        canonical: function() {
          return "~";
        },
        lowercase: function() {
          return "null";
        },
        uppercase: function() {
          return "NULL";
        },
        camelcase: function() {
          return "Null";
        }
      },
      defaultStyle: "lowercase"
    });
  }
});

// ../node_modules/js-yaml/lib/js-yaml/type/bool.js
var require_bool = __commonJS({
  "../node_modules/js-yaml/lib/js-yaml/type/bool.js"(exports2, module2) {
    "use strict";
    var Type = require_type();
    function resolveYamlBoolean(data) {
      if (data === null) return false;
      var max = data.length;
      return max === 4 && (data === "true" || data === "True" || data === "TRUE") || max === 5 && (data === "false" || data === "False" || data === "FALSE");
    }
    function constructYamlBoolean(data) {
      return data === "true" || data === "True" || data === "TRUE";
    }
    function isBoolean(object) {
      return Object.prototype.toString.call(object) === "[object Boolean]";
    }
    module2.exports = new Type("tag:yaml.org,2002:bool", {
      kind: "scalar",
      resolve: resolveYamlBoolean,
      construct: constructYamlBoolean,
      predicate: isBoolean,
      represent: {
        lowercase: function(object) {
          return object ? "true" : "false";
        },
        uppercase: function(object) {
          return object ? "TRUE" : "FALSE";
        },
        camelcase: function(object) {
          return object ? "True" : "False";
        }
      },
      defaultStyle: "lowercase"
    });
  }
});

// ../node_modules/js-yaml/lib/js-yaml/type/int.js
var require_int = __commonJS({
  "../node_modules/js-yaml/lib/js-yaml/type/int.js"(exports2, module2) {
    "use strict";
    var common = require_common();
    var Type = require_type();
    function isHexCode(c) {
      return 48 <= c && c <= 57 || 65 <= c && c <= 70 || 97 <= c && c <= 102;
    }
    function isOctCode(c) {
      return 48 <= c && c <= 55;
    }
    function isDecCode(c) {
      return 48 <= c && c <= 57;
    }
    function resolveYamlInteger(data) {
      if (data === null) return false;
      var max = data.length, index = 0, hasDigits = false, ch;
      if (!max) return false;
      ch = data[index];
      if (ch === "-" || ch === "+") {
        ch = data[++index];
      }
      if (ch === "0") {
        if (index + 1 === max) return true;
        ch = data[++index];
        if (ch === "b") {
          index++;
          for (; index < max; index++) {
            ch = data[index];
            if (ch === "_") continue;
            if (ch !== "0" && ch !== "1") return false;
            hasDigits = true;
          }
          return hasDigits && ch !== "_";
        }
        if (ch === "x") {
          index++;
          for (; index < max; index++) {
            ch = data[index];
            if (ch === "_") continue;
            if (!isHexCode(data.charCodeAt(index))) return false;
            hasDigits = true;
          }
          return hasDigits && ch !== "_";
        }
        for (; index < max; index++) {
          ch = data[index];
          if (ch === "_") continue;
          if (!isOctCode(data.charCodeAt(index))) return false;
          hasDigits = true;
        }
        return hasDigits && ch !== "_";
      }
      if (ch === "_") return false;
      for (; index < max; index++) {
        ch = data[index];
        if (ch === "_") continue;
        if (ch === ":") break;
        if (!isDecCode(data.charCodeAt(index))) {
          return false;
        }
        hasDigits = true;
      }
      if (!hasDigits || ch === "_") return false;
      if (ch !== ":") return true;
      return /^(:[0-5]?[0-9])+$/.test(data.slice(index));
    }
    function constructYamlInteger(data) {
      var value = data, sign = 1, ch, base, digits = [];
      if (value.indexOf("_") !== -1) {
        value = value.replace(/_/g, "");
      }
      ch = value[0];
      if (ch === "-" || ch === "+") {
        if (ch === "-") sign = -1;
        value = value.slice(1);
        ch = value[0];
      }
      if (value === "0") return 0;
      if (ch === "0") {
        if (value[1] === "b") return sign * parseInt(value.slice(2), 2);
        if (value[1] === "x") return sign * parseInt(value, 16);
        return sign * parseInt(value, 8);
      }
      if (value.indexOf(":") !== -1) {
        value.split(":").forEach(function(v) {
          digits.unshift(parseInt(v, 10));
        });
        value = 0;
        base = 1;
        digits.forEach(function(d) {
          value += d * base;
          base *= 60;
        });
        return sign * value;
      }
      return sign * parseInt(value, 10);
    }
    function isInteger(object) {
      return Object.prototype.toString.call(object) === "[object Number]" && (object % 1 === 0 && !common.isNegativeZero(object));
    }
    module2.exports = new Type("tag:yaml.org,2002:int", {
      kind: "scalar",
      resolve: resolveYamlInteger,
      construct: constructYamlInteger,
      predicate: isInteger,
      represent: {
        binary: function(obj) {
          return obj >= 0 ? "0b" + obj.toString(2) : "-0b" + obj.toString(2).slice(1);
        },
        octal: function(obj) {
          return obj >= 0 ? "0" + obj.toString(8) : "-0" + obj.toString(8).slice(1);
        },
        decimal: function(obj) {
          return obj.toString(10);
        },
        /* eslint-disable max-len */
        hexadecimal: function(obj) {
          return obj >= 0 ? "0x" + obj.toString(16).toUpperCase() : "-0x" + obj.toString(16).toUpperCase().slice(1);
        }
      },
      defaultStyle: "decimal",
      styleAliases: {
        binary: [2, "bin"],
        octal: [8, "oct"],
        decimal: [10, "dec"],
        hexadecimal: [16, "hex"]
      }
    });
  }
});

// ../node_modules/js-yaml/lib/js-yaml/type/float.js
var require_float = __commonJS({
  "../node_modules/js-yaml/lib/js-yaml/type/float.js"(exports2, module2) {
    "use strict";
    var common = require_common();
    var Type = require_type();
    var YAML_FLOAT_PATTERN = new RegExp(
      // 2.5e4, 2.5 and integers
      "^(?:[-+]?(?:0|[1-9][0-9_]*)(?:\\.[0-9_]*)?(?:[eE][-+]?[0-9]+)?|\\.[0-9_]+(?:[eE][-+]?[0-9]+)?|[-+]?[0-9][0-9_]*(?::[0-5]?[0-9])+\\.[0-9_]*|[-+]?\\.(?:inf|Inf|INF)|\\.(?:nan|NaN|NAN))$"
    );
    function resolveYamlFloat(data) {
      if (data === null) return false;
      if (!YAML_FLOAT_PATTERN.test(data) || // Quick hack to not allow integers end with `_`
      // Probably should update regexp & check speed
      data[data.length - 1] === "_") {
        return false;
      }
      return true;
    }
    function constructYamlFloat(data) {
      var value, sign, base, digits;
      value = data.replace(/_/g, "").toLowerCase();
      sign = value[0] === "-" ? -1 : 1;
      digits = [];
      if ("+-".indexOf(value[0]) >= 0) {
        value = value.slice(1);
      }
      if (value === ".inf") {
        return sign === 1 ? Number.POSITIVE_INFINITY : Number.NEGATIVE_INFINITY;
      } else if (value === ".nan") {
        return NaN;
      } else if (value.indexOf(":") >= 0) {
        value.split(":").forEach(function(v) {
          digits.unshift(parseFloat(v, 10));
        });
        value = 0;
        base = 1;
        digits.forEach(function(d) {
          value += d * base;
          base *= 60;
        });
        return sign * value;
      }
      return sign * parseFloat(value, 10);
    }
    var SCIENTIFIC_WITHOUT_DOT = /^[-+]?[0-9]+e/;
    function representYamlFloat(object, style) {
      var res;
      if (isNaN(object)) {
        switch (style) {
          case "lowercase":
            return ".nan";
          case "uppercase":
            return ".NAN";
          case "camelcase":
            return ".NaN";
        }
      } else if (Number.POSITIVE_INFINITY === object) {
        switch (style) {
          case "lowercase":
            return ".inf";
          case "uppercase":
            return ".INF";
          case "camelcase":
            return ".Inf";
        }
      } else if (Number.NEGATIVE_INFINITY === object) {
        switch (style) {
          case "lowercase":
            return "-.inf";
          case "uppercase":
            return "-.INF";
          case "camelcase":
            return "-.Inf";
        }
      } else if (common.isNegativeZero(object)) {
        return "-0.0";
      }
      res = object.toString(10);
      return SCIENTIFIC_WITHOUT_DOT.test(res) ? res.replace("e", ".e") : res;
    }
    function isFloat(object) {
      return Object.prototype.toString.call(object) === "[object Number]" && (object % 1 !== 0 || common.isNegativeZero(object));
    }
    module2.exports = new Type("tag:yaml.org,2002:float", {
      kind: "scalar",
      resolve: resolveYamlFloat,
      construct: constructYamlFloat,
      predicate: isFloat,
      represent: representYamlFloat,
      defaultStyle: "lowercase"
    });
  }
});

// ../node_modules/js-yaml/lib/js-yaml/schema/json.js
var require_json = __commonJS({
  "../node_modules/js-yaml/lib/js-yaml/schema/json.js"(exports2, module2) {
    "use strict";
    var Schema = require_schema();
    module2.exports = new Schema({
      include: [
        require_failsafe()
      ],
      implicit: [
        require_null(),
        require_bool(),
        require_int(),
        require_float()
      ]
    });
  }
});

// ../node_modules/js-yaml/lib/js-yaml/schema/core.js
var require_core = __commonJS({
  "../node_modules/js-yaml/lib/js-yaml/schema/core.js"(exports2, module2) {
    "use strict";
    var Schema = require_schema();
    module2.exports = new Schema({
      include: [
        require_json()
      ]
    });
  }
});

// ../node_modules/js-yaml/lib/js-yaml/type/timestamp.js
var require_timestamp = __commonJS({
  "../node_modules/js-yaml/lib/js-yaml/type/timestamp.js"(exports2, module2) {
    "use strict";
    var Type = require_type();
    var YAML_DATE_REGEXP = new RegExp(
      "^([0-9][0-9][0-9][0-9])-([0-9][0-9])-([0-9][0-9])$"
    );
    var YAML_TIMESTAMP_REGEXP = new RegExp(
      "^([0-9][0-9][0-9][0-9])-([0-9][0-9]?)-([0-9][0-9]?)(?:[Tt]|[ \\t]+)([0-9][0-9]?):([0-9][0-9]):([0-9][0-9])(?:\\.([0-9]*))?(?:[ \\t]*(Z|([-+])([0-9][0-9]?)(?::([0-9][0-9]))?))?$"
    );
    function resolveYamlTimestamp(data) {
      if (data === null) return false;
      if (YAML_DATE_REGEXP.exec(data) !== null) return true;
      if (YAML_TIMESTAMP_REGEXP.exec(data) !== null) return true;
      return false;
    }
    function constructYamlTimestamp(data) {
      var match, year, month, day, hour, minute, second, fraction = 0, delta = null, tz_hour, tz_minute, date;
      match = YAML_DATE_REGEXP.exec(data);
      if (match === null) match = YAML_TIMESTAMP_REGEXP.exec(data);
      if (match === null) throw new Error("Date resolve error");
      year = +match[1];
      month = +match[2] - 1;
      day = +match[3];
      if (!match[4]) {
        return new Date(Date.UTC(year, month, day));
      }
      hour = +match[4];
      minute = +match[5];
      second = +match[6];
      if (match[7]) {
        fraction = match[7].slice(0, 3);
        while (fraction.length < 3) {
          fraction += "0";
        }
        fraction = +fraction;
      }
      if (match[9]) {
        tz_hour = +match[10];
        tz_minute = +(match[11] || 0);
        delta = (tz_hour * 60 + tz_minute) * 6e4;
        if (match[9] === "-") delta = -delta;
      }
      date = new Date(Date.UTC(year, month, day, hour, minute, second, fraction));
      if (delta) date.setTime(date.getTime() - delta);
      return date;
    }
    function representYamlTimestamp(object) {
      return object.toISOString();
    }
    module2.exports = new Type("tag:yaml.org,2002:timestamp", {
      kind: "scalar",
      resolve: resolveYamlTimestamp,
      construct: constructYamlTimestamp,
      instanceOf: Date,
      represent: representYamlTimestamp
    });
  }
});

// ../node_modules/js-yaml/lib/js-yaml/type/merge.js
var require_merge = __commonJS({
  "../node_modules/js-yaml/lib/js-yaml/type/merge.js"(exports2, module2) {
    "use strict";
    var Type = require_type();
    function resolveYamlMerge(data) {
      return data === "<<" || data === null;
    }
    module2.exports = new Type("tag:yaml.org,2002:merge", {
      kind: "scalar",
      resolve: resolveYamlMerge
    });
  }
});

// ../node_modules/js-yaml/lib/js-yaml/type/binary.js
var require_binary = __commonJS({
  "../node_modules/js-yaml/lib/js-yaml/type/binary.js"(exports2, module2) {
    "use strict";
    var NodeBuffer;
    try {
      _require = require;
      NodeBuffer = _require("buffer").Buffer;
    } catch (__) {
    }
    var _require;
    var Type = require_type();
    var BASE64_MAP = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=\n\r";
    function resolveYamlBinary(data) {
      if (data === null) return false;
      var code, idx, bitlen = 0, max = data.length, map = BASE64_MAP;
      for (idx = 0; idx < max; idx++) {
        code = map.indexOf(data.charAt(idx));
        if (code > 64) continue;
        if (code < 0) return false;
        bitlen += 6;
      }
      return bitlen % 8 === 0;
    }
    function constructYamlBinary(data) {
      var idx, tailbits, input = data.replace(/[\r\n=]/g, ""), max = input.length, map = BASE64_MAP, bits = 0, result = [];
      for (idx = 0; idx < max; idx++) {
        if (idx % 4 === 0 && idx) {
          result.push(bits >> 16 & 255);
          result.push(bits >> 8 & 255);
          result.push(bits & 255);
        }
        bits = bits << 6 | map.indexOf(input.charAt(idx));
      }
      tailbits = max % 4 * 6;
      if (tailbits === 0) {
        result.push(bits >> 16 & 255);
        result.push(bits >> 8 & 255);
        result.push(bits & 255);
      } else if (tailbits === 18) {
        result.push(bits >> 10 & 255);
        result.push(bits >> 2 & 255);
      } else if (tailbits === 12) {
        result.push(bits >> 4 & 255);
      }
      if (NodeBuffer) {
        return NodeBuffer.from ? NodeBuffer.from(result) : new NodeBuffer(result);
      }
      return result;
    }
    function representYamlBinary(object) {
      var result = "", bits = 0, idx, tail, max = object.length, map = BASE64_MAP;
      for (idx = 0; idx < max; idx++) {
        if (idx % 3 === 0 && idx) {
          result += map[bits >> 18 & 63];
          result += map[bits >> 12 & 63];
          result += map[bits >> 6 & 63];
          result += map[bits & 63];
        }
        bits = (bits << 8) + object[idx];
      }
      tail = max % 3;
      if (tail === 0) {
        result += map[bits >> 18 & 63];
        result += map[bits >> 12 & 63];
        result += map[bits >> 6 & 63];
        result += map[bits & 63];
      } else if (tail === 2) {
        result += map[bits >> 10 & 63];
        result += map[bits >> 4 & 63];
        result += map[bits << 2 & 63];
        result += map[64];
      } else if (tail === 1) {
        result += map[bits >> 2 & 63];
        result += map[bits << 4 & 63];
        result += map[64];
        result += map[64];
      }
      return result;
    }
    function isBinary(object) {
      return NodeBuffer && NodeBuffer.isBuffer(object);
    }
    module2.exports = new Type("tag:yaml.org,2002:binary", {
      kind: "scalar",
      resolve: resolveYamlBinary,
      construct: constructYamlBinary,
      predicate: isBinary,
      represent: representYamlBinary
    });
  }
});

// ../node_modules/js-yaml/lib/js-yaml/type/omap.js
var require_omap = __commonJS({
  "../node_modules/js-yaml/lib/js-yaml/type/omap.js"(exports2, module2) {
    "use strict";
    var Type = require_type();
    var _hasOwnProperty = Object.prototype.hasOwnProperty;
    var _toString = Object.prototype.toString;
    function resolveYamlOmap(data) {
      if (data === null) return true;
      var objectKeys = {}, index, length, pair, pairKey, pairHasKey, object = data;
      for (index = 0, length = object.length; index < length; index += 1) {
        pair = object[index];
        pairHasKey = false;
        if (_toString.call(pair) !== "[object Object]") return false;
        for (pairKey in pair) {
          if (_hasOwnProperty.call(pair, pairKey)) {
            if (!pairHasKey) pairHasKey = true;
            else return false;
          }
        }
        if (!pairHasKey) return false;
        if (_hasOwnProperty.call(objectKeys, pairKey)) return false;
        Object.defineProperty(objectKeys, pairKey, { value: true });
      }
      return true;
    }
    function constructYamlOmap(data) {
      return data !== null ? data : [];
    }
    module2.exports = new Type("tag:yaml.org,2002:omap", {
      kind: "sequence",
      resolve: resolveYamlOmap,
      construct: constructYamlOmap
    });
  }
});

// ../node_modules/js-yaml/lib/js-yaml/type/pairs.js
var require_pairs = __commonJS({
  "../node_modules/js-yaml/lib/js-yaml/type/pairs.js"(exports2, module2) {
    "use strict";
    var Type = require_type();
    var _toString = Object.prototype.toString;
    function resolveYamlPairs(data) {
      if (data === null) return true;
      var index, length, pair, keys, result, object = data;
      result = new Array(object.length);
      for (index = 0, length = object.length; index < length; index += 1) {
        pair = object[index];
        if (_toString.call(pair) !== "[object Object]") return false;
        keys = Object.keys(pair);
        if (keys.length !== 1) return false;
        result[index] = [keys[0], pair[keys[0]]];
      }
      return true;
    }
    function constructYamlPairs(data) {
      if (data === null) return [];
      var index, length, pair, keys, result, object = data;
      result = new Array(object.length);
      for (index = 0, length = object.length; index < length; index += 1) {
        pair = object[index];
        keys = Object.keys(pair);
        result[index] = [keys[0], pair[keys[0]]];
      }
      return result;
    }
    module2.exports = new Type("tag:yaml.org,2002:pairs", {
      kind: "sequence",
      resolve: resolveYamlPairs,
      construct: constructYamlPairs
    });
  }
});

// ../node_modules/js-yaml/lib/js-yaml/type/set.js
var require_set = __commonJS({
  "../node_modules/js-yaml/lib/js-yaml/type/set.js"(exports2, module2) {
    "use strict";
    var Type = require_type();
    var _hasOwnProperty = Object.prototype.hasOwnProperty;
    function resolveYamlSet(data) {
      if (data === null) return true;
      var key, object = data;
      for (key in object) {
        if (_hasOwnProperty.call(object, key)) {
          if (object[key] !== null) return false;
        }
      }
      return true;
    }
    function constructYamlSet(data) {
      return data !== null ? data : {};
    }
    module2.exports = new Type("tag:yaml.org,2002:set", {
      kind: "mapping",
      resolve: resolveYamlSet,
      construct: constructYamlSet
    });
  }
});

// ../node_modules/js-yaml/lib/js-yaml/schema/default_safe.js
var require_default_safe = __commonJS({
  "../node_modules/js-yaml/lib/js-yaml/schema/default_safe.js"(exports2, module2) {
    "use strict";
    var Schema = require_schema();
    module2.exports = new Schema({
      include: [
        require_core()
      ],
      implicit: [
        require_timestamp(),
        require_merge()
      ],
      explicit: [
        require_binary(),
        require_omap(),
        require_pairs(),
        require_set()
      ]
    });
  }
});

// ../node_modules/js-yaml/lib/js-yaml/type/js/undefined.js
var require_undefined = __commonJS({
  "../node_modules/js-yaml/lib/js-yaml/type/js/undefined.js"(exports2, module2) {
    "use strict";
    var Type = require_type();
    function resolveJavascriptUndefined() {
      return true;
    }
    function constructJavascriptUndefined() {
      return void 0;
    }
    function representJavascriptUndefined() {
      return "";
    }
    function isUndefined(object) {
      return typeof object === "undefined";
    }
    module2.exports = new Type("tag:yaml.org,2002:js/undefined", {
      kind: "scalar",
      resolve: resolveJavascriptUndefined,
      construct: constructJavascriptUndefined,
      predicate: isUndefined,
      represent: representJavascriptUndefined
    });
  }
});

// ../node_modules/js-yaml/lib/js-yaml/type/js/regexp.js
var require_regexp = __commonJS({
  "../node_modules/js-yaml/lib/js-yaml/type/js/regexp.js"(exports2, module2) {
    "use strict";
    var Type = require_type();
    function resolveJavascriptRegExp(data) {
      if (data === null) return false;
      if (data.length === 0) return false;
      var regexp = data, tail = /\/([gim]*)$/.exec(data), modifiers = "";
      if (regexp[0] === "/") {
        if (tail) modifiers = tail[1];
        if (modifiers.length > 3) return false;
        if (regexp[regexp.length - modifiers.length - 1] !== "/") return false;
      }
      return true;
    }
    function constructJavascriptRegExp(data) {
      var regexp = data, tail = /\/([gim]*)$/.exec(data), modifiers = "";
      if (regexp[0] === "/") {
        if (tail) modifiers = tail[1];
        regexp = regexp.slice(1, regexp.length - modifiers.length - 1);
      }
      return new RegExp(regexp, modifiers);
    }
    function representJavascriptRegExp(object) {
      var result = "/" + object.source + "/";
      if (object.global) result += "g";
      if (object.multiline) result += "m";
      if (object.ignoreCase) result += "i";
      return result;
    }
    function isRegExp(object) {
      return Object.prototype.toString.call(object) === "[object RegExp]";
    }
    module2.exports = new Type("tag:yaml.org,2002:js/regexp", {
      kind: "scalar",
      resolve: resolveJavascriptRegExp,
      construct: constructJavascriptRegExp,
      predicate: isRegExp,
      represent: representJavascriptRegExp
    });
  }
});

// ../node_modules/js-yaml/lib/js-yaml/type/js/function.js
var require_function = __commonJS({
  "../node_modules/js-yaml/lib/js-yaml/type/js/function.js"(exports2, module2) {
    "use strict";
    var esprima;
    try {
      _require = require;
      esprima = _require("esprima");
    } catch (_) {
      if (typeof window !== "undefined") esprima = window.esprima;
    }
    var _require;
    var Type = require_type();
    function resolveJavascriptFunction(data) {
      if (data === null) return false;
      try {
        var source = "(" + data + ")", ast = esprima.parse(source, { range: true });
        if (ast.type !== "Program" || ast.body.length !== 1 || ast.body[0].type !== "ExpressionStatement" || ast.body[0].expression.type !== "ArrowFunctionExpression" && ast.body[0].expression.type !== "FunctionExpression") {
          return false;
        }
        return true;
      } catch (err) {
        return false;
      }
    }
    function constructJavascriptFunction(data) {
      var source = "(" + data + ")", ast = esprima.parse(source, { range: true }), params = [], body;
      if (ast.type !== "Program" || ast.body.length !== 1 || ast.body[0].type !== "ExpressionStatement" || ast.body[0].expression.type !== "ArrowFunctionExpression" && ast.body[0].expression.type !== "FunctionExpression") {
        throw new Error("Failed to resolve function");
      }
      ast.body[0].expression.params.forEach(function(param) {
        params.push(param.name);
      });
      body = ast.body[0].expression.body.range;
      if (ast.body[0].expression.body.type === "BlockStatement") {
        return new Function(params, source.slice(body[0] + 1, body[1] - 1));
      }
      return new Function(params, "return " + source.slice(body[0], body[1]));
    }
    function representJavascriptFunction(object) {
      return object.toString();
    }
    function isFunction(object) {
      return Object.prototype.toString.call(object) === "[object Function]";
    }
    module2.exports = new Type("tag:yaml.org,2002:js/function", {
      kind: "scalar",
      resolve: resolveJavascriptFunction,
      construct: constructJavascriptFunction,
      predicate: isFunction,
      represent: representJavascriptFunction
    });
  }
});

// ../node_modules/js-yaml/lib/js-yaml/schema/default_full.js
var require_default_full = __commonJS({
  "../node_modules/js-yaml/lib/js-yaml/schema/default_full.js"(exports2, module2) {
    "use strict";
    var Schema = require_schema();
    module2.exports = Schema.DEFAULT = new Schema({
      include: [
        require_default_safe()
      ],
      explicit: [
        require_undefined(),
        require_regexp(),
        require_function()
      ]
    });
  }
});

// ../node_modules/js-yaml/lib/js-yaml/loader.js
var require_loader = __commonJS({
  "../node_modules/js-yaml/lib/js-yaml/loader.js"(exports2, module2) {
    "use strict";
    var common = require_common();
    var YAMLException = require_exception();
    var Mark = require_mark();
    var DEFAULT_SAFE_SCHEMA = require_default_safe();
    var DEFAULT_FULL_SCHEMA = require_default_full();
    var _hasOwnProperty = Object.prototype.hasOwnProperty;
    var CONTEXT_FLOW_IN = 1;
    var CONTEXT_FLOW_OUT = 2;
    var CONTEXT_BLOCK_IN = 3;
    var CONTEXT_BLOCK_OUT = 4;
    var CHOMPING_CLIP = 1;
    var CHOMPING_STRIP = 2;
    var CHOMPING_KEEP = 3;
    var PATTERN_NON_PRINTABLE = /[\x00-\x08\x0B\x0C\x0E-\x1F\x7F-\x84\x86-\x9F\uFFFE\uFFFF]|[\uD800-\uDBFF](?![\uDC00-\uDFFF])|(?:[^\uD800-\uDBFF]|^)[\uDC00-\uDFFF]/;
    var PATTERN_NON_ASCII_LINE_BREAKS = /[\x85\u2028\u2029]/;
    var PATTERN_FLOW_INDICATORS = /[,\[\]\{\}]/;
    var PATTERN_TAG_HANDLE = /^(?:!|!!|![a-z\-]+!)$/i;
    var PATTERN_TAG_URI = /^(?:!|[^,\[\]\{\}])(?:%[0-9a-f]{2}|[0-9a-z\-#;\/\?:@&=\+\$,_\.!~\*'\(\)\[\]])*$/i;
    function _class(obj) {
      return Object.prototype.toString.call(obj);
    }
    function is_EOL(c) {
      return c === 10 || c === 13;
    }
    function is_WHITE_SPACE(c) {
      return c === 9 || c === 32;
    }
    function is_WS_OR_EOL(c) {
      return c === 9 || c === 32 || c === 10 || c === 13;
    }
    function is_FLOW_INDICATOR(c) {
      return c === 44 || c === 91 || c === 93 || c === 123 || c === 125;
    }
    function fromHexCode(c) {
      var lc;
      if (48 <= c && c <= 57) {
        return c - 48;
      }
      lc = c | 32;
      if (97 <= lc && lc <= 102) {
        return lc - 97 + 10;
      }
      return -1;
    }
    function escapedHexLen(c) {
      if (c === 120) {
        return 2;
      }
      if (c === 117) {
        return 4;
      }
      if (c === 85) {
        return 8;
      }
      return 0;
    }
    function fromDecimalCode(c) {
      if (48 <= c && c <= 57) {
        return c - 48;
      }
      return -1;
    }
    function simpleEscapeSequence(c) {
      return c === 48 ? "\0" : c === 97 ? "\x07" : c === 98 ? "\b" : c === 116 ? "	" : c === 9 ? "	" : c === 110 ? "\n" : c === 118 ? "\v" : c === 102 ? "\f" : c === 114 ? "\r" : c === 101 ? "\x1B" : c === 32 ? " " : c === 34 ? '"' : c === 47 ? "/" : c === 92 ? "\\" : c === 78 ? "\x85" : c === 95 ? "\xA0" : c === 76 ? "\u2028" : c === 80 ? "\u2029" : "";
    }
    function charFromCodepoint(c) {
      if (c <= 65535) {
        return String.fromCharCode(c);
      }
      return String.fromCharCode(
        (c - 65536 >> 10) + 55296,
        (c - 65536 & 1023) + 56320
      );
    }
    function setProperty(object, key, value) {
      if (key === "__proto__") {
        Object.defineProperty(object, key, {
          configurable: true,
          enumerable: true,
          writable: true,
          value
        });
      } else {
        object[key] = value;
      }
    }
    var simpleEscapeCheck = new Array(256);
    var simpleEscapeMap = new Array(256);
    for (i = 0; i < 256; i++) {
      simpleEscapeCheck[i] = simpleEscapeSequence(i) ? 1 : 0;
      simpleEscapeMap[i] = simpleEscapeSequence(i);
    }
    var i;
    function State(input, options2) {
      this.input = input;
      this.filename = options2["filename"] || null;
      this.schema = options2["schema"] || DEFAULT_FULL_SCHEMA;
      this.onWarning = options2["onWarning"] || null;
      this.legacy = options2["legacy"] || false;
      this.json = options2["json"] || false;
      this.listener = options2["listener"] || null;
      this.maxTotalMergeKeys = typeof options2["maxTotalMergeKeys"] === "number" ? options2["maxTotalMergeKeys"] : 1e4;
      this.implicitTypes = this.schema.compiledImplicit;
      this.typeMap = this.schema.compiledTypeMap;
      this.length = input.length;
      this.position = 0;
      this.line = 0;
      this.lineStart = 0;
      this.lineIndent = 0;
      this.totalMergeKeys = 0;
      this.documents = [];
    }
    function generateError(state, message) {
      return new YAMLException(
        message,
        new Mark(state.filename, state.input, state.position, state.line, state.position - state.lineStart)
      );
    }
    function throwError(state, message) {
      throw generateError(state, message);
    }
    function throwWarning(state, message) {
      if (state.onWarning) {
        state.onWarning.call(null, generateError(state, message));
      }
    }
    var directiveHandlers = {
      YAML: function handleYamlDirective(state, name, args) {
        var match, major, minor;
        if (state.version !== null) {
          throwError(state, "duplication of %YAML directive");
        }
        if (args.length !== 1) {
          throwError(state, "YAML directive accepts exactly one argument");
        }
        match = /^([0-9]+)\.([0-9]+)$/.exec(args[0]);
        if (match === null) {
          throwError(state, "ill-formed argument of the YAML directive");
        }
        major = parseInt(match[1], 10);
        minor = parseInt(match[2], 10);
        if (major !== 1) {
          throwError(state, "unacceptable YAML version of the document");
        }
        state.version = args[0];
        state.checkLineBreaks = minor < 2;
        if (minor !== 1 && minor !== 2) {
          throwWarning(state, "unsupported YAML version of the document");
        }
      },
      TAG: function handleTagDirective(state, name, args) {
        var handle, prefix;
        if (args.length !== 2) {
          throwError(state, "TAG directive accepts exactly two arguments");
        }
        handle = args[0];
        prefix = args[1];
        if (!PATTERN_TAG_HANDLE.test(handle)) {
          throwError(state, "ill-formed tag handle (first argument) of the TAG directive");
        }
        if (_hasOwnProperty.call(state.tagMap, handle)) {
          throwError(state, 'there is a previously declared suffix for "' + handle + '" tag handle');
        }
        if (!PATTERN_TAG_URI.test(prefix)) {
          throwError(state, "ill-formed tag prefix (second argument) of the TAG directive");
        }
        state.tagMap[handle] = prefix;
      }
    };
    function captureSegment(state, start, end, checkJson) {
      var _position, _length, _character, _result;
      if (start < end) {
        _result = state.input.slice(start, end);
        if (checkJson) {
          for (_position = 0, _length = _result.length; _position < _length; _position += 1) {
            _character = _result.charCodeAt(_position);
            if (!(_character === 9 || 32 <= _character && _character <= 1114111)) {
              throwError(state, "expected valid JSON character");
            }
          }
        } else if (PATTERN_NON_PRINTABLE.test(_result)) {
          throwError(state, "the stream contains non-printable characters");
        }
        state.result += _result;
      }
    }
    function chargeMergeWork(state) {
      state.totalMergeKeys += 1;
      if (state.maxTotalMergeKeys !== -1 && state.totalMergeKeys > state.maxTotalMergeKeys) {
        throwError(state, "merge keys exceeded maxTotalMergeKeys (" + state.maxTotalMergeKeys + ")");
      }
    }
    function mergeMappings(state, destination, source, overridableKeys) {
      var sourceKeys, key, index, quantity;
      if (!common.isObject(source)) {
        throwError(state, "cannot merge mappings; the provided source object is unacceptable");
      }
      chargeMergeWork(state);
      sourceKeys = Object.keys(source);
      for (index = 0, quantity = sourceKeys.length; index < quantity; index += 1) {
        key = sourceKeys[index];
        chargeMergeWork(state);
        if (!_hasOwnProperty.call(destination, key)) {
          setProperty(destination, key, source[key]);
          overridableKeys[key] = true;
        }
      }
    }
    function storeMappingPair(state, _result, overridableKeys, keyTag, keyNode, valueNode, startLine, startPos) {
      var index, quantity;
      if (Array.isArray(keyNode)) {
        keyNode = Array.prototype.slice.call(keyNode);
        for (index = 0, quantity = keyNode.length; index < quantity; index += 1) {
          if (Array.isArray(keyNode[index])) {
            throwError(state, "nested arrays are not supported inside keys");
          }
          if (typeof keyNode === "object" && _class(keyNode[index]) === "[object Object]") {
            keyNode[index] = "[object Object]";
          }
        }
      }
      if (typeof keyNode === "object" && _class(keyNode) === "[object Object]") {
        keyNode = "[object Object]";
      }
      keyNode = String(keyNode);
      if (_result === null) {
        _result = {};
      }
      if (keyTag === "tag:yaml.org,2002:merge") {
        if (Array.isArray(valueNode)) {
          if (valueNode.length > 100) {
            throwError(state, "abnormal merge sequence size");
          }
          for (index = 0, quantity = valueNode.length; index < quantity; index += 1) {
            mergeMappings(state, _result, valueNode[index], overridableKeys);
          }
        } else {
          mergeMappings(state, _result, valueNode, overridableKeys);
        }
      } else {
        if (!state.json && !_hasOwnProperty.call(overridableKeys, keyNode) && _hasOwnProperty.call(_result, keyNode)) {
          state.line = startLine || state.line;
          state.position = startPos || state.position;
          throwError(state, "duplicated mapping key");
        }
        setProperty(_result, keyNode, valueNode);
        delete overridableKeys[keyNode];
      }
      return _result;
    }
    function readLineBreak(state) {
      var ch;
      ch = state.input.charCodeAt(state.position);
      if (ch === 10) {
        state.position++;
      } else if (ch === 13) {
        state.position++;
        if (state.input.charCodeAt(state.position) === 10) {
          state.position++;
        }
      } else {
        throwError(state, "a line break is expected");
      }
      state.line += 1;
      state.lineStart = state.position;
    }
    function skipSeparationSpace(state, allowComments, checkIndent) {
      var lineBreaks = 0, ch = state.input.charCodeAt(state.position);
      while (ch !== 0) {
        while (is_WHITE_SPACE(ch)) {
          ch = state.input.charCodeAt(++state.position);
        }
        if (allowComments && ch === 35) {
          do {
            ch = state.input.charCodeAt(++state.position);
          } while (ch !== 10 && ch !== 13 && ch !== 0);
        }
        if (is_EOL(ch)) {
          readLineBreak(state);
          ch = state.input.charCodeAt(state.position);
          lineBreaks++;
          state.lineIndent = 0;
          while (ch === 32) {
            state.lineIndent++;
            ch = state.input.charCodeAt(++state.position);
          }
        } else {
          break;
        }
      }
      if (checkIndent !== -1 && lineBreaks !== 0 && state.lineIndent < checkIndent) {
        throwWarning(state, "deficient indentation");
      }
      return lineBreaks;
    }
    function testDocumentSeparator(state) {
      var _position = state.position, ch;
      ch = state.input.charCodeAt(_position);
      if ((ch === 45 || ch === 46) && ch === state.input.charCodeAt(_position + 1) && ch === state.input.charCodeAt(_position + 2)) {
        _position += 3;
        ch = state.input.charCodeAt(_position);
        if (ch === 0 || is_WS_OR_EOL(ch)) {
          return true;
        }
      }
      return false;
    }
    function writeFoldedLines(state, count) {
      if (count === 1) {
        state.result += " ";
      } else if (count > 1) {
        state.result += common.repeat("\n", count - 1);
      }
    }
    function readPlainScalar(state, nodeIndent, withinFlowCollection) {
      var preceding, following, captureStart, captureEnd, hasPendingContent, _line, _lineStart, _lineIndent, _kind = state.kind, _result = state.result, ch;
      ch = state.input.charCodeAt(state.position);
      if (is_WS_OR_EOL(ch) || is_FLOW_INDICATOR(ch) || ch === 35 || ch === 38 || ch === 42 || ch === 33 || ch === 124 || ch === 62 || ch === 39 || ch === 34 || ch === 37 || ch === 64 || ch === 96) {
        return false;
      }
      if (ch === 63 || ch === 45) {
        following = state.input.charCodeAt(state.position + 1);
        if (is_WS_OR_EOL(following) || withinFlowCollection && is_FLOW_INDICATOR(following)) {
          return false;
        }
      }
      state.kind = "scalar";
      state.result = "";
      captureStart = captureEnd = state.position;
      hasPendingContent = false;
      while (ch !== 0) {
        if (ch === 58) {
          following = state.input.charCodeAt(state.position + 1);
          if (is_WS_OR_EOL(following) || withinFlowCollection && is_FLOW_INDICATOR(following)) {
            break;
          }
        } else if (ch === 35) {
          preceding = state.input.charCodeAt(state.position - 1);
          if (is_WS_OR_EOL(preceding)) {
            break;
          }
        } else if (state.position === state.lineStart && testDocumentSeparator(state) || withinFlowCollection && is_FLOW_INDICATOR(ch)) {
          break;
        } else if (is_EOL(ch)) {
          _line = state.line;
          _lineStart = state.lineStart;
          _lineIndent = state.lineIndent;
          skipSeparationSpace(state, false, -1);
          if (state.lineIndent >= nodeIndent) {
            hasPendingContent = true;
            ch = state.input.charCodeAt(state.position);
            continue;
          } else {
            state.position = captureEnd;
            state.line = _line;
            state.lineStart = _lineStart;
            state.lineIndent = _lineIndent;
            break;
          }
        }
        if (hasPendingContent) {
          captureSegment(state, captureStart, captureEnd, false);
          writeFoldedLines(state, state.line - _line);
          captureStart = captureEnd = state.position;
          hasPendingContent = false;
        }
        if (!is_WHITE_SPACE(ch)) {
          captureEnd = state.position + 1;
        }
        ch = state.input.charCodeAt(++state.position);
      }
      captureSegment(state, captureStart, captureEnd, false);
      if (state.result) {
        return true;
      }
      state.kind = _kind;
      state.result = _result;
      return false;
    }
    function readSingleQuotedScalar(state, nodeIndent) {
      var ch, captureStart, captureEnd;
      ch = state.input.charCodeAt(state.position);
      if (ch !== 39) {
        return false;
      }
      state.kind = "scalar";
      state.result = "";
      state.position++;
      captureStart = captureEnd = state.position;
      while ((ch = state.input.charCodeAt(state.position)) !== 0) {
        if (ch === 39) {
          captureSegment(state, captureStart, state.position, true);
          ch = state.input.charCodeAt(++state.position);
          if (ch === 39) {
            captureStart = state.position;
            state.position++;
            captureEnd = state.position;
          } else {
            return true;
          }
        } else if (is_EOL(ch)) {
          captureSegment(state, captureStart, captureEnd, true);
          writeFoldedLines(state, skipSeparationSpace(state, false, nodeIndent));
          captureStart = captureEnd = state.position;
        } else if (state.position === state.lineStart && testDocumentSeparator(state)) {
          throwError(state, "unexpected end of the document within a single quoted scalar");
        } else {
          state.position++;
          captureEnd = state.position;
        }
      }
      throwError(state, "unexpected end of the stream within a single quoted scalar");
    }
    function readDoubleQuotedScalar(state, nodeIndent) {
      var captureStart, captureEnd, hexLength, hexResult, tmp, ch;
      ch = state.input.charCodeAt(state.position);
      if (ch !== 34) {
        return false;
      }
      state.kind = "scalar";
      state.result = "";
      state.position++;
      captureStart = captureEnd = state.position;
      while ((ch = state.input.charCodeAt(state.position)) !== 0) {
        if (ch === 34) {
          captureSegment(state, captureStart, state.position, true);
          state.position++;
          return true;
        } else if (ch === 92) {
          captureSegment(state, captureStart, state.position, true);
          ch = state.input.charCodeAt(++state.position);
          if (is_EOL(ch)) {
            skipSeparationSpace(state, false, nodeIndent);
          } else if (ch < 256 && simpleEscapeCheck[ch]) {
            state.result += simpleEscapeMap[ch];
            state.position++;
          } else if ((tmp = escapedHexLen(ch)) > 0) {
            hexLength = tmp;
            hexResult = 0;
            for (; hexLength > 0; hexLength--) {
              ch = state.input.charCodeAt(++state.position);
              if ((tmp = fromHexCode(ch)) >= 0) {
                hexResult = (hexResult << 4) + tmp;
              } else {
                throwError(state, "expected hexadecimal character");
              }
            }
            state.result += charFromCodepoint(hexResult);
            state.position++;
          } else {
            throwError(state, "unknown escape sequence");
          }
          captureStart = captureEnd = state.position;
        } else if (is_EOL(ch)) {
          captureSegment(state, captureStart, captureEnd, true);
          writeFoldedLines(state, skipSeparationSpace(state, false, nodeIndent));
          captureStart = captureEnd = state.position;
        } else if (state.position === state.lineStart && testDocumentSeparator(state)) {
          throwError(state, "unexpected end of the document within a double quoted scalar");
        } else {
          state.position++;
          captureEnd = state.position;
        }
      }
      throwError(state, "unexpected end of the stream within a double quoted scalar");
    }
    function readFlowCollection(state, nodeIndent) {
      var readNext = true, _line, _tag = state.tag, _result, _anchor = state.anchor, following, terminator, isPair, isExplicitPair, isMapping, overridableKeys = {}, keyNode, keyTag, valueNode, ch;
      ch = state.input.charCodeAt(state.position);
      if (ch === 91) {
        terminator = 93;
        isMapping = false;
        _result = [];
      } else if (ch === 123) {
        terminator = 125;
        isMapping = true;
        _result = {};
      } else {
        return false;
      }
      if (state.anchor !== null) {
        state.anchorMap[state.anchor] = _result;
      }
      ch = state.input.charCodeAt(++state.position);
      while (ch !== 0) {
        skipSeparationSpace(state, true, nodeIndent);
        ch = state.input.charCodeAt(state.position);
        if (ch === terminator) {
          state.position++;
          state.tag = _tag;
          state.anchor = _anchor;
          state.kind = isMapping ? "mapping" : "sequence";
          state.result = _result;
          return true;
        } else if (!readNext) {
          throwError(state, "missed comma between flow collection entries");
        }
        keyTag = keyNode = valueNode = null;
        isPair = isExplicitPair = false;
        if (ch === 63) {
          following = state.input.charCodeAt(state.position + 1);
          if (is_WS_OR_EOL(following)) {
            isPair = isExplicitPair = true;
            state.position++;
            skipSeparationSpace(state, true, nodeIndent);
          }
        }
        _line = state.line;
        composeNode(state, nodeIndent, CONTEXT_FLOW_IN, false, true);
        keyTag = state.tag;
        keyNode = state.result;
        skipSeparationSpace(state, true, nodeIndent);
        ch = state.input.charCodeAt(state.position);
        if ((isExplicitPair || state.line === _line) && ch === 58) {
          isPair = true;
          ch = state.input.charCodeAt(++state.position);
          skipSeparationSpace(state, true, nodeIndent);
          composeNode(state, nodeIndent, CONTEXT_FLOW_IN, false, true);
          valueNode = state.result;
        }
        if (isMapping) {
          storeMappingPair(state, _result, overridableKeys, keyTag, keyNode, valueNode);
        } else if (isPair) {
          _result.push(storeMappingPair(state, null, overridableKeys, keyTag, keyNode, valueNode));
        } else {
          _result.push(keyNode);
        }
        skipSeparationSpace(state, true, nodeIndent);
        ch = state.input.charCodeAt(state.position);
        if (ch === 44) {
          readNext = true;
          ch = state.input.charCodeAt(++state.position);
        } else {
          readNext = false;
        }
      }
      throwError(state, "unexpected end of the stream within a flow collection");
    }
    function readBlockScalar(state, nodeIndent) {
      var captureStart, folding, chomping = CHOMPING_CLIP, didReadContent = false, detectedIndent = false, textIndent = nodeIndent, emptyLines = 0, atMoreIndented = false, tmp, ch;
      ch = state.input.charCodeAt(state.position);
      if (ch === 124) {
        folding = false;
      } else if (ch === 62) {
        folding = true;
      } else {
        return false;
      }
      state.kind = "scalar";
      state.result = "";
      while (ch !== 0) {
        ch = state.input.charCodeAt(++state.position);
        if (ch === 43 || ch === 45) {
          if (CHOMPING_CLIP === chomping) {
            chomping = ch === 43 ? CHOMPING_KEEP : CHOMPING_STRIP;
          } else {
            throwError(state, "repeat of a chomping mode identifier");
          }
        } else if ((tmp = fromDecimalCode(ch)) >= 0) {
          if (tmp === 0) {
            throwError(state, "bad explicit indentation width of a block scalar; it cannot be less than one");
          } else if (!detectedIndent) {
            textIndent = nodeIndent + tmp - 1;
            detectedIndent = true;
          } else {
            throwError(state, "repeat of an indentation width identifier");
          }
        } else {
          break;
        }
      }
      if (is_WHITE_SPACE(ch)) {
        do {
          ch = state.input.charCodeAt(++state.position);
        } while (is_WHITE_SPACE(ch));
        if (ch === 35) {
          do {
            ch = state.input.charCodeAt(++state.position);
          } while (!is_EOL(ch) && ch !== 0);
        }
      }
      while (ch !== 0) {
        readLineBreak(state);
        state.lineIndent = 0;
        ch = state.input.charCodeAt(state.position);
        while ((!detectedIndent || state.lineIndent < textIndent) && ch === 32) {
          state.lineIndent++;
          ch = state.input.charCodeAt(++state.position);
        }
        if (!detectedIndent && state.lineIndent > textIndent) {
          textIndent = state.lineIndent;
        }
        if (is_EOL(ch)) {
          emptyLines++;
          continue;
        }
        if (state.lineIndent < textIndent) {
          if (chomping === CHOMPING_KEEP) {
            state.result += common.repeat("\n", didReadContent ? 1 + emptyLines : emptyLines);
          } else if (chomping === CHOMPING_CLIP) {
            if (didReadContent) {
              state.result += "\n";
            }
          }
          break;
        }
        if (folding) {
          if (is_WHITE_SPACE(ch)) {
            atMoreIndented = true;
            state.result += common.repeat("\n", didReadContent ? 1 + emptyLines : emptyLines);
          } else if (atMoreIndented) {
            atMoreIndented = false;
            state.result += common.repeat("\n", emptyLines + 1);
          } else if (emptyLines === 0) {
            if (didReadContent) {
              state.result += " ";
            }
          } else {
            state.result += common.repeat("\n", emptyLines);
          }
        } else {
          state.result += common.repeat("\n", didReadContent ? 1 + emptyLines : emptyLines);
        }
        didReadContent = true;
        detectedIndent = true;
        emptyLines = 0;
        captureStart = state.position;
        while (!is_EOL(ch) && ch !== 0) {
          ch = state.input.charCodeAt(++state.position);
        }
        captureSegment(state, captureStart, state.position, false);
      }
      return true;
    }
    function readBlockSequence(state, nodeIndent) {
      var _line, _tag = state.tag, _anchor = state.anchor, _result = [], following, detected = false, ch;
      if (state.anchor !== null) {
        state.anchorMap[state.anchor] = _result;
      }
      ch = state.input.charCodeAt(state.position);
      while (ch !== 0) {
        if (ch !== 45) {
          break;
        }
        following = state.input.charCodeAt(state.position + 1);
        if (!is_WS_OR_EOL(following)) {
          break;
        }
        detected = true;
        state.position++;
        if (skipSeparationSpace(state, true, -1)) {
          if (state.lineIndent <= nodeIndent) {
            _result.push(null);
            ch = state.input.charCodeAt(state.position);
            continue;
          }
        }
        _line = state.line;
        composeNode(state, nodeIndent, CONTEXT_BLOCK_IN, false, true);
        _result.push(state.result);
        skipSeparationSpace(state, true, -1);
        ch = state.input.charCodeAt(state.position);
        if ((state.line === _line || state.lineIndent > nodeIndent) && ch !== 0) {
          throwError(state, "bad indentation of a sequence entry");
        } else if (state.lineIndent < nodeIndent) {
          break;
        }
      }
      if (detected) {
        state.tag = _tag;
        state.anchor = _anchor;
        state.kind = "sequence";
        state.result = _result;
        return true;
      }
      return false;
    }
    function readBlockMapping(state, nodeIndent, flowIndent) {
      var following, allowCompact, _line, _pos, _tag = state.tag, _anchor = state.anchor, _result = {}, overridableKeys = {}, keyTag = null, keyNode = null, valueNode = null, atExplicitKey = false, detected = false, ch;
      if (state.anchor !== null) {
        state.anchorMap[state.anchor] = _result;
      }
      ch = state.input.charCodeAt(state.position);
      while (ch !== 0) {
        following = state.input.charCodeAt(state.position + 1);
        _line = state.line;
        _pos = state.position;
        if ((ch === 63 || ch === 58) && is_WS_OR_EOL(following)) {
          if (ch === 63) {
            if (atExplicitKey) {
              storeMappingPair(state, _result, overridableKeys, keyTag, keyNode, null);
              keyTag = keyNode = valueNode = null;
            }
            detected = true;
            atExplicitKey = true;
            allowCompact = true;
          } else if (atExplicitKey) {
            atExplicitKey = false;
            allowCompact = true;
          } else {
            throwError(state, "incomplete explicit mapping pair; a key node is missed; or followed by a non-tabulated empty line");
          }
          state.position += 1;
          ch = following;
        } else if (composeNode(state, flowIndent, CONTEXT_FLOW_OUT, false, true)) {
          if (state.line === _line) {
            ch = state.input.charCodeAt(state.position);
            while (is_WHITE_SPACE(ch)) {
              ch = state.input.charCodeAt(++state.position);
            }
            if (ch === 58) {
              ch = state.input.charCodeAt(++state.position);
              if (!is_WS_OR_EOL(ch)) {
                throwError(state, "a whitespace character is expected after the key-value separator within a block mapping");
              }
              if (atExplicitKey) {
                storeMappingPair(state, _result, overridableKeys, keyTag, keyNode, null);
                keyTag = keyNode = valueNode = null;
              }
              detected = true;
              atExplicitKey = false;
              allowCompact = false;
              keyTag = state.tag;
              keyNode = state.result;
            } else if (detected) {
              throwError(state, "can not read an implicit mapping pair; a colon is missed");
            } else {
              state.tag = _tag;
              state.anchor = _anchor;
              return true;
            }
          } else if (detected) {
            throwError(state, "can not read a block mapping entry; a multiline key may not be an implicit key");
          } else {
            state.tag = _tag;
            state.anchor = _anchor;
            return true;
          }
        } else {
          break;
        }
        if (state.line === _line || state.lineIndent > nodeIndent) {
          if (composeNode(state, nodeIndent, CONTEXT_BLOCK_OUT, true, allowCompact)) {
            if (atExplicitKey) {
              keyNode = state.result;
            } else {
              valueNode = state.result;
            }
          }
          if (!atExplicitKey) {
            storeMappingPair(state, _result, overridableKeys, keyTag, keyNode, valueNode, _line, _pos);
            keyTag = keyNode = valueNode = null;
          }
          skipSeparationSpace(state, true, -1);
          ch = state.input.charCodeAt(state.position);
        }
        if (state.lineIndent > nodeIndent && ch !== 0) {
          throwError(state, "bad indentation of a mapping entry");
        } else if (state.lineIndent < nodeIndent) {
          break;
        }
      }
      if (atExplicitKey) {
        storeMappingPair(state, _result, overridableKeys, keyTag, keyNode, null);
      }
      if (detected) {
        state.tag = _tag;
        state.anchor = _anchor;
        state.kind = "mapping";
        state.result = _result;
      }
      return detected;
    }
    function readTagProperty(state) {
      var _position, isVerbatim = false, isNamed = false, tagHandle, tagName, ch;
      ch = state.input.charCodeAt(state.position);
      if (ch !== 33) return false;
      if (state.tag !== null) {
        throwError(state, "duplication of a tag property");
      }
      ch = state.input.charCodeAt(++state.position);
      if (ch === 60) {
        isVerbatim = true;
        ch = state.input.charCodeAt(++state.position);
      } else if (ch === 33) {
        isNamed = true;
        tagHandle = "!!";
        ch = state.input.charCodeAt(++state.position);
      } else {
        tagHandle = "!";
      }
      _position = state.position;
      if (isVerbatim) {
        do {
          ch = state.input.charCodeAt(++state.position);
        } while (ch !== 0 && ch !== 62);
        if (state.position < state.length) {
          tagName = state.input.slice(_position, state.position);
          ch = state.input.charCodeAt(++state.position);
        } else {
          throwError(state, "unexpected end of the stream within a verbatim tag");
        }
      } else {
        while (ch !== 0 && !is_WS_OR_EOL(ch)) {
          if (ch === 33) {
            if (!isNamed) {
              tagHandle = state.input.slice(_position - 1, state.position + 1);
              if (!PATTERN_TAG_HANDLE.test(tagHandle)) {
                throwError(state, "named tag handle cannot contain such characters");
              }
              isNamed = true;
              _position = state.position + 1;
            } else {
              throwError(state, "tag suffix cannot contain exclamation marks");
            }
          }
          ch = state.input.charCodeAt(++state.position);
        }
        tagName = state.input.slice(_position, state.position);
        if (PATTERN_FLOW_INDICATORS.test(tagName)) {
          throwError(state, "tag suffix cannot contain flow indicator characters");
        }
      }
      if (tagName && !PATTERN_TAG_URI.test(tagName)) {
        throwError(state, "tag name cannot contain such characters: " + tagName);
      }
      if (isVerbatim) {
        state.tag = tagName;
      } else if (_hasOwnProperty.call(state.tagMap, tagHandle)) {
        state.tag = state.tagMap[tagHandle] + tagName;
      } else if (tagHandle === "!") {
        state.tag = "!" + tagName;
      } else if (tagHandle === "!!") {
        state.tag = "tag:yaml.org,2002:" + tagName;
      } else {
        throwError(state, 'undeclared tag handle "' + tagHandle + '"');
      }
      return true;
    }
    function readAnchorProperty(state) {
      var _position, ch;
      ch = state.input.charCodeAt(state.position);
      if (ch !== 38) return false;
      if (state.anchor !== null) {
        throwError(state, "duplication of an anchor property");
      }
      ch = state.input.charCodeAt(++state.position);
      _position = state.position;
      while (ch !== 0 && !is_WS_OR_EOL(ch) && !is_FLOW_INDICATOR(ch)) {
        ch = state.input.charCodeAt(++state.position);
      }
      if (state.position === _position) {
        throwError(state, "name of an anchor node must contain at least one character");
      }
      state.anchor = state.input.slice(_position, state.position);
      return true;
    }
    function readAlias(state) {
      var _position, alias, ch;
      ch = state.input.charCodeAt(state.position);
      if (ch !== 42) return false;
      ch = state.input.charCodeAt(++state.position);
      _position = state.position;
      while (ch !== 0 && !is_WS_OR_EOL(ch) && !is_FLOW_INDICATOR(ch)) {
        ch = state.input.charCodeAt(++state.position);
      }
      if (state.position === _position) {
        throwError(state, "name of an alias node must contain at least one character");
      }
      alias = state.input.slice(_position, state.position);
      if (!_hasOwnProperty.call(state.anchorMap, alias)) {
        throwError(state, 'unidentified alias "' + alias + '"');
      }
      state.result = state.anchorMap[alias];
      skipSeparationSpace(state, true, -1);
      return true;
    }
    function composeNode(state, parentIndent, nodeContext, allowToSeek, allowCompact) {
      var allowBlockStyles, allowBlockScalars, allowBlockCollections, indentStatus = 1, atNewLine = false, hasContent = false, typeIndex, typeQuantity, type, flowIndent, blockIndent;
      if (state.listener !== null) {
        state.listener("open", state);
      }
      state.tag = null;
      state.anchor = null;
      state.kind = null;
      state.result = null;
      allowBlockStyles = allowBlockScalars = allowBlockCollections = CONTEXT_BLOCK_OUT === nodeContext || CONTEXT_BLOCK_IN === nodeContext;
      if (allowToSeek) {
        if (skipSeparationSpace(state, true, -1)) {
          atNewLine = true;
          if (state.lineIndent > parentIndent) {
            indentStatus = 1;
          } else if (state.lineIndent === parentIndent) {
            indentStatus = 0;
          } else if (state.lineIndent < parentIndent) {
            indentStatus = -1;
          }
        }
      }
      if (indentStatus === 1) {
        while (readTagProperty(state) || readAnchorProperty(state)) {
          if (skipSeparationSpace(state, true, -1)) {
            atNewLine = true;
            allowBlockCollections = allowBlockStyles;
            if (state.lineIndent > parentIndent) {
              indentStatus = 1;
            } else if (state.lineIndent === parentIndent) {
              indentStatus = 0;
            } else if (state.lineIndent < parentIndent) {
              indentStatus = -1;
            }
          } else {
            allowBlockCollections = false;
          }
        }
      }
      if (allowBlockCollections) {
        allowBlockCollections = atNewLine || allowCompact;
      }
      if (indentStatus === 1 || CONTEXT_BLOCK_OUT === nodeContext) {
        if (CONTEXT_FLOW_IN === nodeContext || CONTEXT_FLOW_OUT === nodeContext) {
          flowIndent = parentIndent;
        } else {
          flowIndent = parentIndent + 1;
        }
        blockIndent = state.position - state.lineStart;
        if (indentStatus === 1) {
          if (allowBlockCollections && (readBlockSequence(state, blockIndent) || readBlockMapping(state, blockIndent, flowIndent)) || readFlowCollection(state, flowIndent)) {
            hasContent = true;
          } else {
            if (allowBlockScalars && readBlockScalar(state, flowIndent) || readSingleQuotedScalar(state, flowIndent) || readDoubleQuotedScalar(state, flowIndent)) {
              hasContent = true;
            } else if (readAlias(state)) {
              hasContent = true;
              if (state.tag !== null || state.anchor !== null) {
                throwError(state, "alias node should not have any properties");
              }
            } else if (readPlainScalar(state, flowIndent, CONTEXT_FLOW_IN === nodeContext)) {
              hasContent = true;
              if (state.tag === null) {
                state.tag = "?";
              }
            }
            if (state.anchor !== null) {
              state.anchorMap[state.anchor] = state.result;
            }
          }
        } else if (indentStatus === 0) {
          hasContent = allowBlockCollections && readBlockSequence(state, blockIndent);
        }
      }
      if (state.tag !== null && state.tag !== "!") {
        if (state.tag === "?") {
          if (state.result !== null && state.kind !== "scalar") {
            throwError(state, 'unacceptable node kind for !<?> tag; it should be "scalar", not "' + state.kind + '"');
          }
          for (typeIndex = 0, typeQuantity = state.implicitTypes.length; typeIndex < typeQuantity; typeIndex += 1) {
            type = state.implicitTypes[typeIndex];
            if (type.resolve(state.result)) {
              state.result = type.construct(state.result);
              state.tag = type.tag;
              if (state.anchor !== null) {
                state.anchorMap[state.anchor] = state.result;
              }
              break;
            }
          }
        } else if (_hasOwnProperty.call(state.typeMap[state.kind || "fallback"], state.tag)) {
          type = state.typeMap[state.kind || "fallback"][state.tag];
          if (state.result !== null && type.kind !== state.kind) {
            throwError(state, "unacceptable node kind for !<" + state.tag + '> tag; it should be "' + type.kind + '", not "' + state.kind + '"');
          }
          if (!type.resolve(state.result)) {
            throwError(state, "cannot resolve a node with !<" + state.tag + "> explicit tag");
          } else {
            state.result = type.construct(state.result);
            if (state.anchor !== null) {
              state.anchorMap[state.anchor] = state.result;
            }
          }
        } else {
          throwError(state, "unknown tag !<" + state.tag + ">");
        }
      }
      if (state.listener !== null) {
        state.listener("close", state);
      }
      return state.tag !== null || state.anchor !== null || hasContent;
    }
    function readDocument(state) {
      var documentStart = state.position, _position, directiveName, directiveArgs, hasDirectives = false, ch;
      state.version = null;
      state.checkLineBreaks = state.legacy;
      state.tagMap = {};
      state.anchorMap = {};
      while ((ch = state.input.charCodeAt(state.position)) !== 0) {
        skipSeparationSpace(state, true, -1);
        ch = state.input.charCodeAt(state.position);
        if (state.lineIndent > 0 || ch !== 37) {
          break;
        }
        hasDirectives = true;
        ch = state.input.charCodeAt(++state.position);
        _position = state.position;
        while (ch !== 0 && !is_WS_OR_EOL(ch)) {
          ch = state.input.charCodeAt(++state.position);
        }
        directiveName = state.input.slice(_position, state.position);
        directiveArgs = [];
        if (directiveName.length < 1) {
          throwError(state, "directive name must not be less than one character in length");
        }
        while (ch !== 0) {
          while (is_WHITE_SPACE(ch)) {
            ch = state.input.charCodeAt(++state.position);
          }
          if (ch === 35) {
            do {
              ch = state.input.charCodeAt(++state.position);
            } while (ch !== 0 && !is_EOL(ch));
            break;
          }
          if (is_EOL(ch)) break;
          _position = state.position;
          while (ch !== 0 && !is_WS_OR_EOL(ch)) {
            ch = state.input.charCodeAt(++state.position);
          }
          directiveArgs.push(state.input.slice(_position, state.position));
        }
        if (ch !== 0) readLineBreak(state);
        if (_hasOwnProperty.call(directiveHandlers, directiveName)) {
          directiveHandlers[directiveName](state, directiveName, directiveArgs);
        } else {
          throwWarning(state, 'unknown document directive "' + directiveName + '"');
        }
      }
      skipSeparationSpace(state, true, -1);
      if (state.lineIndent === 0 && state.input.charCodeAt(state.position) === 45 && state.input.charCodeAt(state.position + 1) === 45 && state.input.charCodeAt(state.position + 2) === 45) {
        state.position += 3;
        skipSeparationSpace(state, true, -1);
      } else if (hasDirectives) {
        throwError(state, "directives end mark is expected");
      }
      composeNode(state, state.lineIndent - 1, CONTEXT_BLOCK_OUT, false, true);
      skipSeparationSpace(state, true, -1);
      if (state.checkLineBreaks && PATTERN_NON_ASCII_LINE_BREAKS.test(state.input.slice(documentStart, state.position))) {
        throwWarning(state, "non-ASCII line breaks are interpreted as content");
      }
      state.documents.push(state.result);
      if (state.position === state.lineStart && testDocumentSeparator(state)) {
        if (state.input.charCodeAt(state.position) === 46) {
          state.position += 3;
          skipSeparationSpace(state, true, -1);
        }
        return;
      }
      if (state.position < state.length - 1) {
        throwError(state, "end of the stream or a document separator is expected");
      } else {
        return;
      }
    }
    function loadDocuments(input, options2) {
      input = String(input);
      options2 = options2 || {};
      if (input.length !== 0) {
        if (input.charCodeAt(input.length - 1) !== 10 && input.charCodeAt(input.length - 1) !== 13) {
          input += "\n";
        }
        if (input.charCodeAt(0) === 65279) {
          input = input.slice(1);
        }
      }
      var state = new State(input, options2);
      var nullpos = input.indexOf("\0");
      if (nullpos !== -1) {
        state.position = nullpos;
        throwError(state, "null byte is not allowed in input");
      }
      state.input += "\0";
      while (state.input.charCodeAt(state.position) === 32) {
        state.lineIndent += 1;
        state.position += 1;
      }
      while (state.position < state.length - 1) {
        readDocument(state);
      }
      return state.documents;
    }
    function loadAll(input, iterator, options2) {
      if (iterator !== null && typeof iterator === "object" && typeof options2 === "undefined") {
        options2 = iterator;
        iterator = null;
      }
      var documents = loadDocuments(input, options2);
      if (typeof iterator !== "function") {
        return documents;
      }
      for (var index = 0, length = documents.length; index < length; index += 1) {
        iterator(documents[index]);
      }
    }
    function load(input, options2) {
      var documents = loadDocuments(input, options2);
      if (documents.length === 0) {
        return void 0;
      } else if (documents.length === 1) {
        return documents[0];
      }
      throw new YAMLException("expected a single document in the stream, but found more");
    }
    function safeLoadAll(input, iterator, options2) {
      if (typeof iterator === "object" && iterator !== null && typeof options2 === "undefined") {
        options2 = iterator;
        iterator = null;
      }
      return loadAll(input, iterator, common.extend({ schema: DEFAULT_SAFE_SCHEMA }, options2));
    }
    function safeLoad(input, options2) {
      return load(input, common.extend({ schema: DEFAULT_SAFE_SCHEMA }, options2));
    }
    module2.exports.loadAll = loadAll;
    module2.exports.load = load;
    module2.exports.safeLoadAll = safeLoadAll;
    module2.exports.safeLoad = safeLoad;
  }
});

// ../node_modules/js-yaml/lib/js-yaml/dumper.js
var require_dumper = __commonJS({
  "../node_modules/js-yaml/lib/js-yaml/dumper.js"(exports2, module2) {
    "use strict";
    var common = require_common();
    var YAMLException = require_exception();
    var DEFAULT_FULL_SCHEMA = require_default_full();
    var DEFAULT_SAFE_SCHEMA = require_default_safe();
    var _toString = Object.prototype.toString;
    var _hasOwnProperty = Object.prototype.hasOwnProperty;
    var CHAR_TAB = 9;
    var CHAR_LINE_FEED = 10;
    var CHAR_CARRIAGE_RETURN = 13;
    var CHAR_SPACE = 32;
    var CHAR_EXCLAMATION = 33;
    var CHAR_DOUBLE_QUOTE = 34;
    var CHAR_SHARP = 35;
    var CHAR_PERCENT = 37;
    var CHAR_AMPERSAND = 38;
    var CHAR_SINGLE_QUOTE = 39;
    var CHAR_ASTERISK = 42;
    var CHAR_COMMA = 44;
    var CHAR_MINUS = 45;
    var CHAR_COLON = 58;
    var CHAR_EQUALS = 61;
    var CHAR_GREATER_THAN = 62;
    var CHAR_QUESTION = 63;
    var CHAR_COMMERCIAL_AT = 64;
    var CHAR_LEFT_SQUARE_BRACKET = 91;
    var CHAR_RIGHT_SQUARE_BRACKET = 93;
    var CHAR_GRAVE_ACCENT = 96;
    var CHAR_LEFT_CURLY_BRACKET = 123;
    var CHAR_VERTICAL_LINE = 124;
    var CHAR_RIGHT_CURLY_BRACKET = 125;
    var ESCAPE_SEQUENCES = {};
    ESCAPE_SEQUENCES[0] = "\\0";
    ESCAPE_SEQUENCES[7] = "\\a";
    ESCAPE_SEQUENCES[8] = "\\b";
    ESCAPE_SEQUENCES[9] = "\\t";
    ESCAPE_SEQUENCES[10] = "\\n";
    ESCAPE_SEQUENCES[11] = "\\v";
    ESCAPE_SEQUENCES[12] = "\\f";
    ESCAPE_SEQUENCES[13] = "\\r";
    ESCAPE_SEQUENCES[27] = "\\e";
    ESCAPE_SEQUENCES[34] = '\\"';
    ESCAPE_SEQUENCES[92] = "\\\\";
    ESCAPE_SEQUENCES[133] = "\\N";
    ESCAPE_SEQUENCES[160] = "\\_";
    ESCAPE_SEQUENCES[8232] = "\\L";
    ESCAPE_SEQUENCES[8233] = "\\P";
    var DEPRECATED_BOOLEANS_SYNTAX = [
      "y",
      "Y",
      "yes",
      "Yes",
      "YES",
      "on",
      "On",
      "ON",
      "n",
      "N",
      "no",
      "No",
      "NO",
      "off",
      "Off",
      "OFF"
    ];
    function compileStyleMap(schema, map) {
      var result, keys, index, length, tag, style, type;
      if (map === null) return {};
      result = {};
      keys = Object.keys(map);
      for (index = 0, length = keys.length; index < length; index += 1) {
        tag = keys[index];
        style = String(map[tag]);
        if (tag.slice(0, 2) === "!!") {
          tag = "tag:yaml.org,2002:" + tag.slice(2);
        }
        type = schema.compiledTypeMap["fallback"][tag];
        if (type && _hasOwnProperty.call(type.styleAliases, style)) {
          style = type.styleAliases[style];
        }
        result[tag] = style;
      }
      return result;
    }
    function encodeHex(character) {
      var string, handle, length;
      string = character.toString(16).toUpperCase();
      if (character <= 255) {
        handle = "x";
        length = 2;
      } else if (character <= 65535) {
        handle = "u";
        length = 4;
      } else if (character <= 4294967295) {
        handle = "U";
        length = 8;
      } else {
        throw new YAMLException("code point within a string may not be greater than 0xFFFFFFFF");
      }
      return "\\" + handle + common.repeat("0", length - string.length) + string;
    }
    function State(options2) {
      this.schema = options2["schema"] || DEFAULT_FULL_SCHEMA;
      this.indent = Math.max(1, options2["indent"] || 2);
      this.noArrayIndent = options2["noArrayIndent"] || false;
      this.skipInvalid = options2["skipInvalid"] || false;
      this.flowLevel = common.isNothing(options2["flowLevel"]) ? -1 : options2["flowLevel"];
      this.styleMap = compileStyleMap(this.schema, options2["styles"] || null);
      this.sortKeys = options2["sortKeys"] || false;
      this.lineWidth = options2["lineWidth"] || 80;
      this.noRefs = options2["noRefs"] || false;
      this.noCompatMode = options2["noCompatMode"] || false;
      this.condenseFlow = options2["condenseFlow"] || false;
      this.implicitTypes = this.schema.compiledImplicit;
      this.explicitTypes = this.schema.compiledExplicit;
      this.tag = null;
      this.result = "";
      this.duplicates = [];
      this.usedDuplicates = null;
    }
    function indentString(string, spaces) {
      var ind = common.repeat(" ", spaces), position = 0, next = -1, result = "", line, length = string.length;
      while (position < length) {
        next = string.indexOf("\n", position);
        if (next === -1) {
          line = string.slice(position);
          position = length;
        } else {
          line = string.slice(position, next + 1);
          position = next + 1;
        }
        if (line.length && line !== "\n") result += ind;
        result += line;
      }
      return result;
    }
    function generateNextLine(state, level) {
      return "\n" + common.repeat(" ", state.indent * level);
    }
    function testImplicitResolving(state, str2) {
      var index, length, type;
      for (index = 0, length = state.implicitTypes.length; index < length; index += 1) {
        type = state.implicitTypes[index];
        if (type.resolve(str2)) {
          return true;
        }
      }
      return false;
    }
    function isWhitespace(c) {
      return c === CHAR_SPACE || c === CHAR_TAB;
    }
    function isPrintable(c) {
      return 32 <= c && c <= 126 || 161 <= c && c <= 55295 && c !== 8232 && c !== 8233 || 57344 <= c && c <= 65533 && c !== 65279 || 65536 <= c && c <= 1114111;
    }
    function isNsChar(c) {
      return isPrintable(c) && !isWhitespace(c) && c !== 65279 && c !== CHAR_CARRIAGE_RETURN && c !== CHAR_LINE_FEED;
    }
    function isPlainSafe(c, prev) {
      return isPrintable(c) && c !== 65279 && c !== CHAR_COMMA && c !== CHAR_LEFT_SQUARE_BRACKET && c !== CHAR_RIGHT_SQUARE_BRACKET && c !== CHAR_LEFT_CURLY_BRACKET && c !== CHAR_RIGHT_CURLY_BRACKET && c !== CHAR_COLON && (c !== CHAR_SHARP || prev && isNsChar(prev));
    }
    function isPlainSafeFirst(c) {
      return isPrintable(c) && c !== 65279 && !isWhitespace(c) && c !== CHAR_MINUS && c !== CHAR_QUESTION && c !== CHAR_COLON && c !== CHAR_COMMA && c !== CHAR_LEFT_SQUARE_BRACKET && c !== CHAR_RIGHT_SQUARE_BRACKET && c !== CHAR_LEFT_CURLY_BRACKET && c !== CHAR_RIGHT_CURLY_BRACKET && c !== CHAR_SHARP && c !== CHAR_AMPERSAND && c !== CHAR_ASTERISK && c !== CHAR_EXCLAMATION && c !== CHAR_VERTICAL_LINE && c !== CHAR_EQUALS && c !== CHAR_GREATER_THAN && c !== CHAR_SINGLE_QUOTE && c !== CHAR_DOUBLE_QUOTE && c !== CHAR_PERCENT && c !== CHAR_COMMERCIAL_AT && c !== CHAR_GRAVE_ACCENT;
    }
    function needIndentIndicator(string) {
      var leadingSpaceRe = /^\n* /;
      return leadingSpaceRe.test(string);
    }
    var STYLE_PLAIN = 1;
    var STYLE_SINGLE = 2;
    var STYLE_LITERAL = 3;
    var STYLE_FOLDED = 4;
    var STYLE_DOUBLE = 5;
    function chooseScalarStyle(string, singleLineOnly, indentPerLevel, lineWidth, testAmbiguousType) {
      var i;
      var char, prev_char;
      var hasLineBreak = false;
      var hasFoldableLine = false;
      var shouldTrackWidth = lineWidth !== -1;
      var previousLineBreak = -1;
      var plain = isPlainSafeFirst(string.charCodeAt(0)) && !isWhitespace(string.charCodeAt(string.length - 1));
      if (singleLineOnly) {
        for (i = 0; i < string.length; i++) {
          char = string.charCodeAt(i);
          if (!isPrintable(char)) {
            return STYLE_DOUBLE;
          }
          prev_char = i > 0 ? string.charCodeAt(i - 1) : null;
          plain = plain && isPlainSafe(char, prev_char);
        }
      } else {
        for (i = 0; i < string.length; i++) {
          char = string.charCodeAt(i);
          if (char === CHAR_LINE_FEED) {
            hasLineBreak = true;
            if (shouldTrackWidth) {
              hasFoldableLine = hasFoldableLine || // Foldable line = too long, and not more-indented.
              i - previousLineBreak - 1 > lineWidth && string[previousLineBreak + 1] !== " ";
              previousLineBreak = i;
            }
          } else if (!isPrintable(char)) {
            return STYLE_DOUBLE;
          }
          prev_char = i > 0 ? string.charCodeAt(i - 1) : null;
          plain = plain && isPlainSafe(char, prev_char);
        }
        hasFoldableLine = hasFoldableLine || shouldTrackWidth && (i - previousLineBreak - 1 > lineWidth && string[previousLineBreak + 1] !== " ");
      }
      if (!hasLineBreak && !hasFoldableLine) {
        return plain && !testAmbiguousType(string) ? STYLE_PLAIN : STYLE_SINGLE;
      }
      if (indentPerLevel > 9 && needIndentIndicator(string)) {
        return STYLE_DOUBLE;
      }
      return hasFoldableLine ? STYLE_FOLDED : STYLE_LITERAL;
    }
    function writeScalar(state, string, level, iskey) {
      state.dump = (function() {
        if (string.length === 0) {
          return "''";
        }
        if (!state.noCompatMode && DEPRECATED_BOOLEANS_SYNTAX.indexOf(string) !== -1) {
          return "'" + string + "'";
        }
        var indent = state.indent * Math.max(1, level);
        var lineWidth = state.lineWidth === -1 ? -1 : Math.max(Math.min(state.lineWidth, 40), state.lineWidth - indent);
        var singleLineOnly = iskey || state.flowLevel > -1 && level >= state.flowLevel;
        function testAmbiguity(string2) {
          return testImplicitResolving(state, string2);
        }
        switch (chooseScalarStyle(string, singleLineOnly, state.indent, lineWidth, testAmbiguity)) {
          case STYLE_PLAIN:
            return string;
          case STYLE_SINGLE:
            return "'" + string.replace(/'/g, "''") + "'";
          case STYLE_LITERAL:
            return "|" + blockHeader(string, state.indent) + dropEndingNewline(indentString(string, indent));
          case STYLE_FOLDED:
            return ">" + blockHeader(string, state.indent) + dropEndingNewline(indentString(foldString(string, lineWidth), indent));
          case STYLE_DOUBLE:
            return '"' + escapeString(string, lineWidth) + '"';
          default:
            throw new YAMLException("impossible error: invalid scalar style");
        }
      })();
    }
    function blockHeader(string, indentPerLevel) {
      var indentIndicator = needIndentIndicator(string) ? String(indentPerLevel) : "";
      var clip = string[string.length - 1] === "\n";
      var keep = clip && (string[string.length - 2] === "\n" || string === "\n");
      var chomp = keep ? "+" : clip ? "" : "-";
      return indentIndicator + chomp + "\n";
    }
    function dropEndingNewline(string) {
      return string[string.length - 1] === "\n" ? string.slice(0, -1) : string;
    }
    function foldString(string, width) {
      var lineRe = /(\n+)([^\n]*)/g;
      var result = (function() {
        var nextLF = string.indexOf("\n");
        nextLF = nextLF !== -1 ? nextLF : string.length;
        lineRe.lastIndex = nextLF;
        return foldLine(string.slice(0, nextLF), width);
      })();
      var prevMoreIndented = string[0] === "\n" || string[0] === " ";
      var moreIndented;
      var match;
      while (match = lineRe.exec(string)) {
        var prefix = match[1], line = match[2];
        moreIndented = line[0] === " ";
        result += prefix + (!prevMoreIndented && !moreIndented && line !== "" ? "\n" : "") + foldLine(line, width);
        prevMoreIndented = moreIndented;
      }
      return result;
    }
    function foldLine(line, width) {
      if (line === "" || line[0] === " ") return line;
      var breakRe = / [^ ]/g;
      var match;
      var start = 0, end, curr = 0, next = 0;
      var result = "";
      while (match = breakRe.exec(line)) {
        next = match.index;
        if (next - start > width) {
          end = curr > start ? curr : next;
          result += "\n" + line.slice(start, end);
          start = end + 1;
        }
        curr = next;
      }
      result += "\n";
      if (line.length - start > width && curr > start) {
        result += line.slice(start, curr) + "\n" + line.slice(curr + 1);
      } else {
        result += line.slice(start);
      }
      return result.slice(1);
    }
    function escapeString(string) {
      var result = "";
      var char, nextChar;
      var escapeSeq;
      for (var i = 0; i < string.length; i++) {
        char = string.charCodeAt(i);
        if (char >= 55296 && char <= 56319) {
          nextChar = string.charCodeAt(i + 1);
          if (nextChar >= 56320 && nextChar <= 57343) {
            result += encodeHex((char - 55296) * 1024 + nextChar - 56320 + 65536);
            i++;
            continue;
          }
        }
        escapeSeq = ESCAPE_SEQUENCES[char];
        result += !escapeSeq && isPrintable(char) ? string[i] : escapeSeq || encodeHex(char);
      }
      return result;
    }
    function writeFlowSequence(state, level, object) {
      var _result = "", _tag = state.tag, index, length;
      for (index = 0, length = object.length; index < length; index += 1) {
        if (writeNode(state, level, object[index], false, false)) {
          if (index !== 0) _result += "," + (!state.condenseFlow ? " " : "");
          _result += state.dump;
        }
      }
      state.tag = _tag;
      state.dump = "[" + _result + "]";
    }
    function writeBlockSequence(state, level, object, compact) {
      var _result = "", _tag = state.tag, index, length;
      for (index = 0, length = object.length; index < length; index += 1) {
        if (writeNode(state, level + 1, object[index], true, true)) {
          if (!compact || index !== 0) {
            _result += generateNextLine(state, level);
          }
          if (state.dump && CHAR_LINE_FEED === state.dump.charCodeAt(0)) {
            _result += "-";
          } else {
            _result += "- ";
          }
          _result += state.dump;
        }
      }
      state.tag = _tag;
      state.dump = _result || "[]";
    }
    function writeFlowMapping(state, level, object) {
      var _result = "", _tag = state.tag, objectKeyList = Object.keys(object), index, length, objectKey, objectValue, pairBuffer;
      for (index = 0, length = objectKeyList.length; index < length; index += 1) {
        pairBuffer = "";
        if (index !== 0) pairBuffer += ", ";
        if (state.condenseFlow) pairBuffer += '"';
        objectKey = objectKeyList[index];
        objectValue = object[objectKey];
        if (!writeNode(state, level, objectKey, false, false)) {
          continue;
        }
        if (state.dump.length > 1024) pairBuffer += "? ";
        pairBuffer += state.dump + (state.condenseFlow ? '"' : "") + ":" + (state.condenseFlow ? "" : " ");
        if (!writeNode(state, level, objectValue, false, false)) {
          continue;
        }
        pairBuffer += state.dump;
        _result += pairBuffer;
      }
      state.tag = _tag;
      state.dump = "{" + _result + "}";
    }
    function writeBlockMapping(state, level, object, compact) {
      var _result = "", _tag = state.tag, objectKeyList = Object.keys(object), index, length, objectKey, objectValue, explicitPair, pairBuffer;
      if (state.sortKeys === true) {
        objectKeyList.sort();
      } else if (typeof state.sortKeys === "function") {
        objectKeyList.sort(state.sortKeys);
      } else if (state.sortKeys) {
        throw new YAMLException("sortKeys must be a boolean or a function");
      }
      for (index = 0, length = objectKeyList.length; index < length; index += 1) {
        pairBuffer = "";
        if (!compact || index !== 0) {
          pairBuffer += generateNextLine(state, level);
        }
        objectKey = objectKeyList[index];
        objectValue = object[objectKey];
        if (!writeNode(state, level + 1, objectKey, true, true, true)) {
          continue;
        }
        explicitPair = state.tag !== null && state.tag !== "?" || state.dump && state.dump.length > 1024;
        if (explicitPair) {
          if (state.dump && CHAR_LINE_FEED === state.dump.charCodeAt(0)) {
            pairBuffer += "?";
          } else {
            pairBuffer += "? ";
          }
        }
        pairBuffer += state.dump;
        if (explicitPair) {
          pairBuffer += generateNextLine(state, level);
        }
        if (!writeNode(state, level + 1, objectValue, true, explicitPair)) {
          continue;
        }
        if (state.dump && CHAR_LINE_FEED === state.dump.charCodeAt(0)) {
          pairBuffer += ":";
        } else {
          pairBuffer += ": ";
        }
        pairBuffer += state.dump;
        _result += pairBuffer;
      }
      state.tag = _tag;
      state.dump = _result || "{}";
    }
    function detectType(state, object, explicit) {
      var _result, typeList, index, length, type, style;
      typeList = explicit ? state.explicitTypes : state.implicitTypes;
      for (index = 0, length = typeList.length; index < length; index += 1) {
        type = typeList[index];
        if ((type.instanceOf || type.predicate) && (!type.instanceOf || typeof object === "object" && object instanceof type.instanceOf) && (!type.predicate || type.predicate(object))) {
          state.tag = explicit ? type.tag : "?";
          if (type.represent) {
            style = state.styleMap[type.tag] || type.defaultStyle;
            if (_toString.call(type.represent) === "[object Function]") {
              _result = type.represent(object, style);
            } else if (_hasOwnProperty.call(type.represent, style)) {
              _result = type.represent[style](object, style);
            } else {
              throw new YAMLException("!<" + type.tag + '> tag resolver accepts not "' + style + '" style');
            }
            state.dump = _result;
          }
          return true;
        }
      }
      return false;
    }
    function writeNode(state, level, object, block, compact, iskey) {
      state.tag = null;
      state.dump = object;
      if (!detectType(state, object, false)) {
        detectType(state, object, true);
      }
      var type = _toString.call(state.dump);
      if (block) {
        block = state.flowLevel < 0 || state.flowLevel > level;
      }
      var objectOrArray = type === "[object Object]" || type === "[object Array]", duplicateIndex, duplicate;
      if (objectOrArray) {
        duplicateIndex = state.duplicates.indexOf(object);
        duplicate = duplicateIndex !== -1;
      }
      if (state.tag !== null && state.tag !== "?" || duplicate || state.indent !== 2 && level > 0) {
        compact = false;
      }
      if (duplicate && state.usedDuplicates[duplicateIndex]) {
        state.dump = "*ref_" + duplicateIndex;
      } else {
        if (objectOrArray && duplicate && !state.usedDuplicates[duplicateIndex]) {
          state.usedDuplicates[duplicateIndex] = true;
        }
        if (type === "[object Object]") {
          if (block && Object.keys(state.dump).length !== 0) {
            writeBlockMapping(state, level, state.dump, compact);
            if (duplicate) {
              state.dump = "&ref_" + duplicateIndex + state.dump;
            }
          } else {
            writeFlowMapping(state, level, state.dump);
            if (duplicate) {
              state.dump = "&ref_" + duplicateIndex + " " + state.dump;
            }
          }
        } else if (type === "[object Array]") {
          var arrayLevel = state.noArrayIndent && level > 0 ? level - 1 : level;
          if (block && state.dump.length !== 0) {
            writeBlockSequence(state, arrayLevel, state.dump, compact);
            if (duplicate) {
              state.dump = "&ref_" + duplicateIndex + state.dump;
            }
          } else {
            writeFlowSequence(state, arrayLevel, state.dump);
            if (duplicate) {
              state.dump = "&ref_" + duplicateIndex + " " + state.dump;
            }
          }
        } else if (type === "[object String]") {
          if (state.tag !== "?") {
            writeScalar(state, state.dump, level, iskey);
          }
        } else {
          if (state.skipInvalid) return false;
          throw new YAMLException("unacceptable kind of an object to dump " + type);
        }
        if (state.tag !== null && state.tag !== "?") {
          state.dump = "!<" + state.tag + "> " + state.dump;
        }
      }
      return true;
    }
    function getDuplicateReferences(object, state) {
      var objects = [], duplicatesIndexes = [], index, length;
      inspectNode(object, objects, duplicatesIndexes);
      for (index = 0, length = duplicatesIndexes.length; index < length; index += 1) {
        state.duplicates.push(objects[duplicatesIndexes[index]]);
      }
      state.usedDuplicates = new Array(length);
    }
    function inspectNode(object, objects, duplicatesIndexes) {
      var objectKeyList, index, length;
      if (object !== null && typeof object === "object") {
        index = objects.indexOf(object);
        if (index !== -1) {
          if (duplicatesIndexes.indexOf(index) === -1) {
            duplicatesIndexes.push(index);
          }
        } else {
          objects.push(object);
          if (Array.isArray(object)) {
            for (index = 0, length = object.length; index < length; index += 1) {
              inspectNode(object[index], objects, duplicatesIndexes);
            }
          } else {
            objectKeyList = Object.keys(object);
            for (index = 0, length = objectKeyList.length; index < length; index += 1) {
              inspectNode(object[objectKeyList[index]], objects, duplicatesIndexes);
            }
          }
        }
      }
    }
    function dump(input, options2) {
      options2 = options2 || {};
      var state = new State(options2);
      if (!state.noRefs) getDuplicateReferences(input, state);
      if (writeNode(state, 0, input, true, true)) return state.dump + "\n";
      return "";
    }
    function safeDump(input, options2) {
      return dump(input, common.extend({ schema: DEFAULT_SAFE_SCHEMA }, options2));
    }
    module2.exports.dump = dump;
    module2.exports.safeDump = safeDump;
  }
});

// ../node_modules/js-yaml/lib/js-yaml.js
var require_js_yaml = __commonJS({
  "../node_modules/js-yaml/lib/js-yaml.js"(exports2, module2) {
    "use strict";
    var loader = require_loader();
    var dumper = require_dumper();
    function deprecated(name) {
      return function() {
        throw new Error("Function " + name + " is deprecated and cannot be used.");
      };
    }
    module2.exports.Type = require_type();
    module2.exports.Schema = require_schema();
    module2.exports.FAILSAFE_SCHEMA = require_failsafe();
    module2.exports.JSON_SCHEMA = require_json();
    module2.exports.CORE_SCHEMA = require_core();
    module2.exports.DEFAULT_SAFE_SCHEMA = require_default_safe();
    module2.exports.DEFAULT_FULL_SCHEMA = require_default_full();
    module2.exports.load = loader.load;
    module2.exports.loadAll = loader.loadAll;
    module2.exports.safeLoad = loader.safeLoad;
    module2.exports.safeLoadAll = loader.safeLoadAll;
    module2.exports.dump = dumper.dump;
    module2.exports.safeDump = dumper.safeDump;
    module2.exports.YAMLException = require_exception();
    module2.exports.MINIMAL_SCHEMA = require_failsafe();
    module2.exports.SAFE_SCHEMA = require_default_safe();
    module2.exports.DEFAULT_SCHEMA = require_default_full();
    module2.exports.scan = deprecated("scan");
    module2.exports.parse = deprecated("parse");
    module2.exports.compose = deprecated("compose");
    module2.exports.addConstructor = deprecated("addConstructor");
  }
});

// ../node_modules/js-yaml/index.js
var require_js_yaml2 = __commonJS({
  "../node_modules/js-yaml/index.js"(exports2, module2) {
    "use strict";
    var yaml2 = require_js_yaml();
    module2.exports = yaml2;
  }
});

// ../node_modules/gray-matter/lib/engines.js
var require_engines = __commonJS({
  "../node_modules/gray-matter/lib/engines.js"(exports, module) {
    "use strict";
    var yaml = require_js_yaml2();
    var engines = exports = module.exports;
    engines.yaml = {
      parse: yaml.safeLoad.bind(yaml),
      stringify: yaml.safeDump.bind(yaml)
    };
    engines.json = {
      parse: JSON.parse.bind(JSON),
      stringify: function(obj, options2) {
        const opts = Object.assign({ replacer: null, space: 2 }, options2);
        return JSON.stringify(obj, opts.replacer, opts.space);
      }
    };
    engines.javascript = {
      parse: function parse(str, options, wrap) {
        try {
          if (wrap !== false) {
            str = "(function() {\nreturn " + str.trim() + ";\n}());";
          }
          return eval(str) || {};
        } catch (err) {
          if (wrap !== false && /(unexpected|identifier)/i.test(err.message)) {
            return parse(str, options, false);
          }
          throw new SyntaxError(err);
        }
      },
      stringify: function() {
        throw new Error("stringifying JavaScript is not supported");
      }
    };
  }
});

// ../node_modules/strip-bom-string/index.js
var require_strip_bom_string = __commonJS({
  "../node_modules/strip-bom-string/index.js"(exports2, module2) {
    "use strict";
    module2.exports = function(str2) {
      if (typeof str2 === "string" && str2.charAt(0) === "\uFEFF") {
        return str2.slice(1);
      }
      return str2;
    };
  }
});

// ../node_modules/gray-matter/lib/utils.js
var require_utils = __commonJS({
  "../node_modules/gray-matter/lib/utils.js"(exports2) {
    "use strict";
    var stripBom = require_strip_bom_string();
    var typeOf = require_kind_of();
    exports2.define = function(obj, key, val) {
      Reflect.defineProperty(obj, key, {
        enumerable: false,
        configurable: true,
        writable: true,
        value: val
      });
    };
    exports2.isBuffer = function(val) {
      return typeOf(val) === "buffer";
    };
    exports2.isObject = function(val) {
      return typeOf(val) === "object";
    };
    exports2.toBuffer = function(input) {
      return typeof input === "string" ? Buffer.from(input) : input;
    };
    exports2.toString = function(input) {
      if (exports2.isBuffer(input)) return stripBom(String(input));
      if (typeof input !== "string") {
        throw new TypeError("expected input to be a string or buffer");
      }
      return stripBom(input);
    };
    exports2.arrayify = function(val) {
      return val ? Array.isArray(val) ? val : [val] : [];
    };
    exports2.startsWith = function(str2, substr, len) {
      if (typeof len !== "number") len = substr.length;
      return str2.slice(0, len) === substr;
    };
  }
});

// ../node_modules/gray-matter/lib/defaults.js
var require_defaults = __commonJS({
  "../node_modules/gray-matter/lib/defaults.js"(exports2, module2) {
    "use strict";
    var engines2 = require_engines();
    var utils = require_utils();
    module2.exports = function(options2) {
      const opts = Object.assign({}, options2);
      opts.delimiters = utils.arrayify(opts.delims || opts.delimiters || "---");
      if (opts.delimiters.length === 1) {
        opts.delimiters.push(opts.delimiters[0]);
      }
      opts.language = (opts.language || opts.lang || "yaml").toLowerCase();
      opts.engines = Object.assign({}, engines2, opts.parsers, opts.engines);
      return opts;
    };
  }
});

// ../node_modules/gray-matter/lib/engine.js
var require_engine = __commonJS({
  "../node_modules/gray-matter/lib/engine.js"(exports2, module2) {
    "use strict";
    module2.exports = function(name, options2) {
      let engine = options2.engines[name] || options2.engines[aliase(name)];
      if (typeof engine === "undefined") {
        throw new Error('gray-matter engine "' + name + '" is not registered');
      }
      if (typeof engine === "function") {
        engine = { parse: engine };
      }
      return engine;
    };
    function aliase(name) {
      switch (name.toLowerCase()) {
        case "js":
        case "javascript":
          return "javascript";
        case "coffee":
        case "coffeescript":
        case "cson":
          return "coffee";
        case "yaml":
        case "yml":
          return "yaml";
        default: {
          return name;
        }
      }
    }
  }
});

// ../node_modules/gray-matter/lib/stringify.js
var require_stringify = __commonJS({
  "../node_modules/gray-matter/lib/stringify.js"(exports2, module2) {
    "use strict";
    var typeOf = require_kind_of();
    var getEngine = require_engine();
    var defaults = require_defaults();
    module2.exports = function(file, data, options2) {
      if (data == null && options2 == null) {
        switch (typeOf(file)) {
          case "object":
            data = file.data;
            options2 = {};
            break;
          case "string":
            return file;
          default: {
            throw new TypeError("expected file to be a string or object");
          }
        }
      }
      const str2 = file.content;
      const opts = defaults(options2);
      if (data == null) {
        if (!opts.data) return file;
        data = opts.data;
      }
      const language = file.language || opts.language;
      const engine = getEngine(language, opts);
      if (typeof engine.stringify !== "function") {
        throw new TypeError('expected "' + language + '.stringify" to be a function');
      }
      data = Object.assign({}, file.data, data);
      const open = opts.delimiters[0];
      const close = opts.delimiters[1];
      const matter2 = engine.stringify(data, options2).trim();
      let buf = "";
      if (matter2 !== "{}") {
        buf = newline(open) + newline(matter2) + newline(close);
      }
      if (typeof file.excerpt === "string" && file.excerpt !== "") {
        if (str2.indexOf(file.excerpt.trim()) === -1) {
          buf += newline(file.excerpt) + newline(close);
        }
      }
      return buf + newline(str2);
    };
    function newline(str2) {
      return str2.slice(-1) !== "\n" ? str2 + "\n" : str2;
    }
  }
});

// ../node_modules/gray-matter/lib/excerpt.js
var require_excerpt = __commonJS({
  "../node_modules/gray-matter/lib/excerpt.js"(exports2, module2) {
    "use strict";
    var defaults = require_defaults();
    module2.exports = function(file, options2) {
      const opts = defaults(options2);
      if (file.data == null) {
        file.data = {};
      }
      if (typeof opts.excerpt === "function") {
        return opts.excerpt(file, opts);
      }
      const sep = file.data.excerpt_separator || opts.excerpt_separator;
      if (sep == null && (opts.excerpt === false || opts.excerpt == null)) {
        return file;
      }
      const delimiter = typeof opts.excerpt === "string" ? opts.excerpt : sep || opts.delimiters[0];
      const idx = file.content.indexOf(delimiter);
      if (idx !== -1) {
        file.excerpt = file.content.slice(0, idx);
      }
      return file;
    };
  }
});

// ../node_modules/gray-matter/lib/to-file.js
var require_to_file = __commonJS({
  "../node_modules/gray-matter/lib/to-file.js"(exports2, module2) {
    "use strict";
    var typeOf = require_kind_of();
    var stringify = require_stringify();
    var utils = require_utils();
    module2.exports = function(file) {
      if (typeOf(file) !== "object") {
        file = { content: file };
      }
      if (typeOf(file.data) !== "object") {
        file.data = {};
      }
      if (file.contents && file.content == null) {
        file.content = file.contents;
      }
      utils.define(file, "orig", utils.toBuffer(file.content));
      utils.define(file, "language", file.language || "");
      utils.define(file, "matter", file.matter || "");
      utils.define(file, "stringify", function(data, options2) {
        if (options2 && options2.language) {
          file.language = options2.language;
        }
        return stringify(file, data, options2);
      });
      file.content = utils.toString(file.content);
      file.isEmpty = false;
      file.excerpt = "";
      return file;
    };
  }
});

// ../node_modules/gray-matter/lib/parse.js
var require_parse = __commonJS({
  "../node_modules/gray-matter/lib/parse.js"(exports2, module2) {
    "use strict";
    var getEngine = require_engine();
    var defaults = require_defaults();
    module2.exports = function(language, str2, options2) {
      const opts = defaults(options2);
      const engine = getEngine(language, opts);
      if (typeof engine.parse !== "function") {
        throw new TypeError('expected "' + language + '.parse" to be a function');
      }
      return engine.parse(str2, opts);
    };
  }
});

// ../node_modules/gray-matter/index.js
var require_gray_matter = __commonJS({
  "../node_modules/gray-matter/index.js"(exports2, module2) {
    "use strict";
    var fs = require("fs");
    var sections = require_section_matter();
    var defaults = require_defaults();
    var stringify = require_stringify();
    var excerpt = require_excerpt();
    var engines2 = require_engines();
    var toFile = require_to_file();
    var parse2 = require_parse();
    var utils = require_utils();
    function matter2(input, options2) {
      if (input === "") {
        return { data: {}, content: input, excerpt: "", orig: input };
      }
      let file = toFile(input);
      const cached = matter2.cache[file.content];
      if (!options2) {
        if (cached) {
          file = Object.assign({}, cached);
          file.orig = cached.orig;
          return file;
        }
        matter2.cache[file.content] = file;
      }
      return parseMatter(file, options2);
    }
    function parseMatter(file, options2) {
      const opts = defaults(options2);
      const open = opts.delimiters[0];
      const close = "\n" + opts.delimiters[1];
      let str2 = file.content;
      if (opts.language) {
        file.language = opts.language;
      }
      const openLen = open.length;
      if (!utils.startsWith(str2, open, openLen)) {
        excerpt(file, opts);
        return file;
      }
      if (str2.charAt(openLen) === open.slice(-1)) {
        return file;
      }
      str2 = str2.slice(openLen);
      const len = str2.length;
      const language = matter2.language(str2, opts);
      if (language.name) {
        file.language = language.name;
        str2 = str2.slice(language.raw.length);
      }
      let closeIndex = str2.indexOf(close);
      if (closeIndex === -1) {
        closeIndex = len;
      }
      file.matter = str2.slice(0, closeIndex);
      const block = file.matter.replace(/^\s*#[^\n]+/gm, "").trim();
      if (block === "") {
        file.isEmpty = true;
        file.empty = file.content;
        file.data = {};
      } else {
        file.data = parse2(file.language, file.matter, opts);
      }
      if (closeIndex === len) {
        file.content = "";
      } else {
        file.content = str2.slice(closeIndex + close.length);
        if (file.content[0] === "\r") {
          file.content = file.content.slice(1);
        }
        if (file.content[0] === "\n") {
          file.content = file.content.slice(1);
        }
      }
      excerpt(file, opts);
      if (opts.sections === true || typeof opts.section === "function") {
        sections(file, opts.section);
      }
      return file;
    }
    matter2.engines = engines2;
    matter2.stringify = function(file, data, options2) {
      if (typeof file === "string") file = matter2(file, options2);
      return stringify(file, data, options2);
    };
    matter2.read = function(filepath, options2) {
      const str2 = fs.readFileSync(filepath, "utf8");
      const file = matter2(str2, options2);
      file.path = filepath;
      return file;
    };
    matter2.test = function(str2, options2) {
      return utils.startsWith(str2, defaults(options2).delimiters[0]);
    };
    matter2.language = function(str2, options2) {
      const opts = defaults(options2);
      const open = opts.delimiters[0];
      if (matter2.test(str2)) {
        str2 = str2.slice(open.length);
      }
      const language = str2.slice(0, str2.search(/\r?\n/));
      return {
        raw: language,
        name: language ? language.trim() : ""
      };
    };
    matter2.cache = {};
    matter2.clearCache = function() {
      matter2.cache = {};
    };
    module2.exports = matter2;
  }
});

// ../scripts/manager-core.mjs
var import_node_fs = __toESM(require("node:fs"), 1);
var import_node_os = __toESM(require("node:os"), 1);
var import_node_path = __toESM(require("node:path"), 1);
var import_node_child_process = require("node:child_process");
var import_node_http = __toESM(require("node:http"), 1);
var import_gray_matter = __toESM(require_gray_matter(), 1);

// ../scripts/ui-template.mjs
var UI = `<!DOCTYPE html>
<html lang="zh-CN"><head><meta charset="utf-8"><title>Publish Manager</title>
<style>
  /* \u4E3B\u9898\u53D8\u91CF\uFF1A\u9ED8\u8BA4\u6D45\u8272\uFF0Cprefers-color-scheme: dark \u65F6\u5207\u84DD\u9ED1\uFF0C
     \u4E5F\u53EF\u4EE5\u7528 <html data-theme="dark|light"> \u624B\u52A8\u8986\u76D6\uFF08\u53F3\u4E0A\u89D2\u6309\u94AE\u5207\u6362\uFF09\u3002 */
  :root {
    --bg: #f6f7f9; --fg: #1f2937; --card: #fff; --border: #e5e7eb; --border-soft: #f0f0f0;
    --muted: #6b7280; --muted-2: #9ca3af; --field: #d1d5db;
    /* \u4E0E\u7AD9\u70B9\u540C\u4E00\u65CF\u84DD\uFF08\u7AD9\u70B9 --primary \u7EA6 #2570cc\uFF09\uFF0C\u7BA1\u7406\u5668\u6309\u94AE/\u9009\u4E2D\u6001\u5168\u90E8\u7528\u8FD9\u4E2A\u84DD */
    --accent: #2570cc; --accent-hover: #1d5fbb; --accent-soft: #eaeffa; --accent-soft-hover: #d8e4f8;
    --hover: #f9fafb; --chip: #e5e7eb; --chip-fg: #374151; --btn-ghost: #f3f4f6;
    --ok: #059669; --ok-bg: #10b981; --ok-bg-hover: #15803d; --bad: #dc2626; --warn-bg: #fffbeb; --warn-fg: #92400e; --warn-bd: #fde68a;
    --bar: rgba(246,247,249,.92);
    --shadow: rgba(0,0,0,.25);
    --busy-bg: #eef2ff; --busy-fg: #3730a3; --okbg: #ecfdf5; --okfg: #065f46; --errbg: #fef2f2; --errfg: #991b1b;
  }
  html[data-theme="dark"] {
    --bg: #0f1420; --fg: #e5e9f2; --card: #171d2b; --border: #2a3348; --border-soft: #222a3d;
    --muted: #97a3b8; --muted-2: #6f7c93; --field: #38425a;
    --accent: #5b9bf8; --accent-hover: #7bb0fb; --accent-soft: #1c2740; --accent-soft-hover: #24334f;
    --hover: #1e2637; --chip: #2a3348; --chip-fg: #cbd5e6; --btn-ghost: #232b3d;
    --ok: #34d399; --ok-bg: #10b981; --ok-bg-hover: #15803d; --bad: #f87171; --warn-bg: #3a2f14; --warn-fg: #fcd34d; --warn-bd: #6b5520;
    --bar: rgba(15,20,32,.92);
    --shadow: rgba(0,0,0,.55);
    --busy-bg: #1e2740; --busy-fg: #a5b8f5; --okbg: #12301f; --okfg: #6ee7b7; --errbg: #3a1a1c; --errfg: #fca5a5;
  }
  body { font-family: system-ui, 'Microsoft YaHei', sans-serif; background: var(--bg); margin: 0; padding: 20px; color: var(--fg); }
  .wrap { max-width: 1100px; margin: 0 auto; }
  h1 { font-size: 21px; margin: 0 0 4px; } .sub { color: var(--muted); font-size: 14.5px; margin-bottom: 14px; }
  .card { background: var(--card); border: 1px solid var(--border); border-radius: 10px; padding: 14px 16px; margin-bottom: 14px; }
  .row { display: flex; gap: 8px; align-items: center; flex-wrap: wrap; }
  input, select { padding: 8px 10px; border: 1px solid var(--field); border-radius: 8px; font-size: 15.5px;
                  background: var(--card); color: var(--fg); }
  input#q { flex: 1; min-width: 160px; }
  button { padding: 8px 14px; border: 0; border-radius: 8px; background: var(--accent); color: #fff; font-size: 15px; cursor: pointer; }
  button.mini { padding: 3px 9px; font-size: 13.5px; background: var(--chip); color: var(--chip-fg); }
  button.mini.green { background: var(--accent); color: #fff; }
  button:disabled { opacity: .55; cursor: default; }
  /* \u6587\u4EF6\u5939\u533A\u7528\u300C\u5217\u5BB9\u5668\u300D\u5E03\u5C40\uFF1A\u6BCF\u4E2A .grid-col \u662F\u4E00\u6761\u72EC\u7ACB\u7684\u7EB5\u5411\u6D41\u3002
     \u8FD9\u6837\u5C55\u5F00\u67D0\u4E2A\u6587\u4EF6\u5939\u53EA\u4F1A\u628A\u5B83\u81EA\u5DF1\u90A3\u4E00\u5217\u6491\u9AD8\uFF0C\u5176\u5B83\u5217\u65E2\u4E0D\u4F1A\u88AB\u884C\u9AD8\u5E26\u7740\u4E0B\u79FB\uFF0C\u4E5F\u4E0D\u4F1A\u7559\u4E0B\u5927\u7247\u7A7A\u767D\u3002 */
  .grid { display: flex; align-items: flex-start; gap: 12px; }
  .grid-col { flex: 1 1 0; min-width: 0; display: flex; flex-direction: column; gap: 12px; }
  .box { background: var(--card); border: 1px solid var(--border); border-radius: 10px; overflow: hidden; }
  .box-head { display: flex; align-items: center; gap: 8px; padding: 10px 12px; border-bottom: 1px solid var(--border-soft); cursor: pointer; }
  .box-head:hover { background: var(--hover); }
  .box-head .name { font-weight: 600; font-size: 16.5px; flex: 1; min-width: 0; overflow: hidden; text-overflow: ellipsis; white-space: nowrap; }
  /* \u6587\u4EF6\u5939\u6807\u9898\u4E0A\u7684\u6279\u91CF\u6309\u94AE\uFF1A\u4E0D\u8BB8\u88AB\u538B\u7F29\u3001\u4E0D\u8BB8\u6362\u884C\uFF0C\u7A84\u5217\u91CC\u4F18\u5148\u4FDD\u4F4F\u6587\u4EF6\u5939\u540D */
  .box-head button.mini { flex-shrink: 0; white-space: nowrap; padding: 3px 7px; }
  .box-head .cnt { flex-shrink: 0; }
  .box-head { gap: 6px; }
  .cnt { font-size: 13.5px; color: var(--muted-2); }
  .chev { transition: transform .15s; color: var(--muted-2); }
  .chev.open { transform: rotate(90deg); }
  ul { list-style: none; margin: 0; padding: 6px; }
  li { display: flex; align-items: center; gap: 8px; padding: 5px 8px; border-radius: 6px; }
  li:hover { background: var(--hover); }
  .t { flex: 1; min-width: 0; overflow: hidden; text-overflow: ellipsis; white-space: nowrap; font-size: 15.5px; }
  .pub { color: var(--accent); font-size: 13.5px; } .pri { color: var(--muted-2); font-size: 13.5px; }
  .sw { position: relative; width: 32px; height: 18px; border-radius: 999px; background: var(--field); border: 0; cursor: pointer; transition: .15s; flex-shrink: 0; }
  .sw.on { background: var(--accent); } .sw::after { content: ''; position: absolute; top: 2px; left: 2px; width: 14px; height: 14px; border-radius: 50%; background: #fff; transition: .15s; }
  .sw.on::after { left: 16px; }
  /* ---- \u53D8\u66F4\u5206\u7C7B\uFF1A\u65B0\u589E / \u4FEE\u6539 / \u5220\u9664 ---- */
  .chg { font-size: 12.5px; font-weight: 600; padding: 1px 6px; border-radius: 999px; flex-shrink: 0;
         border: 1px solid transparent; white-space: nowrap; }
  .chg.add { color: var(--ok); background: color-mix(in srgb, var(--ok) 12%, transparent); border-color: color-mix(in srgb, var(--ok) 35%, transparent); }
  .chg.mod { color: var(--warn-fg); background: var(--warn-bg); border-color: var(--warn-bd); }
  .chg.del { color: var(--bad); background: color-mix(in srgb, var(--bad) 12%, transparent); border-color: color-mix(in srgb, var(--bad) 35%, transparent); }
  .box-head .sum { display: flex; gap: 4px; flex-shrink: 0; }
  li.gone .t { text-decoration: line-through; color: var(--muted-2); }
  /* ---- \u81EA\u52A8\u540C\u6B65\u8BBE\u7F6E\u6761 ---- */
  /* \u53D8\u66F4\u4E09\u680F\uFF1A\u65B0\u589E / \u4FEE\u6539 / \u5220\u9664\uFF0C\u5728\u6240\u6709\u6587\u4EF6\u5939\u4E0A\u65B9\u4E00\u6B21\u5217\u5168 */
  /* align-items:start \u2014\u2014 \u6BCF\u680F\u6309\u81EA\u5DF1\u7684\u6761\u76EE\u6570\u51B3\u5B9A\u9AD8\u5EA6\u3002\u9ED8\u8BA4\u7684 stretch \u4F1A\u628A\u4E09\u680F\u62C9\u6210\u4E00\u6837\u9AD8\uFF0C
     \u67D0\u4E00\u680F\u6761\u76EE\u591A\u7684\u65F6\u5019\u53E6\u5916\u4E24\u680F\u5C31\u53EA\u5269\u4E00\u5927\u7247\u7A7A\u767D\u3002 */
  .chgcols { display: grid; grid-template-columns: repeat(3, minmax(0, 1fr)); gap: 10px; align-items: start; }
  /* \u6CA1\u6709\u6539\u52A8\u65F6\u628A\u300C\u53D8\u66F4\u300D\u8FD9\u5F20\u5361\u538B\u6241\uFF1A\u53EA\u7559\u6807\u9898\u884C + \u4E00\u884C\u63D0\u793A\uFF0C\u522B\u5360\u534A\u5C4F */
  #chgCard.is-empty .chgcols { display: block; }
  #chgCard.is-empty .row { margin-bottom: 0; }
  .chgnone { display: flex; align-items: center; gap: 7px; padding: 2px 0 2px 2px;
             font-size: 14px; color: var(--muted-2); }
  .chgnone .dot { width: 7px; height: 7px; border-radius: 50%; background: var(--ok); flex-shrink: 0; }
  .chgcol { border: 1px solid var(--border-soft); border-radius: 9px; overflow: hidden; display: flex; flex-direction: column; }
  .chgcol .ch { display: flex; align-items: center; gap: 6px; padding: 7px 10px; font-size: 14px; font-weight: 600; border-bottom: 1px solid var(--border-soft); }
  .chgcol .ch .n { margin-left: auto; font-size: 13.5px; color: var(--muted); }
  .chgcol ul { list-style: none; margin: 0; padding: 4px 0; max-height: 190px; overflow: auto; }
  .chgcol li { display: flex; align-items: center; gap: 6px; padding: 4px 10px; font-size: 14.5px; cursor: pointer; }
  .chgcol li:hover { background: var(--hover); }
  .chgcol li .t { flex: 1; min-width: 0; overflow: hidden; text-overflow: ellipsis; white-space: nowrap; }
  .chgcol li .p { font-size: 13px; color: var(--muted-2); max-width: 46%; overflow: hidden; text-overflow: ellipsis; white-space: nowrap; }
  .chgcol .empty { padding: 10px; font-size: 14px; color: var(--muted-2); }
  /* \u672A\u5206\u7EC4\u5757\uFF1A\u6709\u5185\u5BB9\u65F6\u548C\u4E0B\u9762\u7684\u6587\u4EF6\u5939\u7F51\u683C\u7559\u51FA\u95F4\u9694\uFF0C\u7A7A\u7684\u65F6\u5019\u4E0D\u5360\u4F4D */
  #ungrouped:not(:empty) { margin-bottom: 12px; }
  #ungrouped .box { border-color: var(--border); }
  /* \u672A\u5206\u7EC4\u91CC\u53EF\u80FD\u585E\u4E86\u4E0A\u767E\u7BC7\u7B14\u8BB0\uFF0C\u4E00\u6761\u957F\u9F99\u4E0D\u597D\u7FFB\uFF1A\u6309\u5217\u6392\uFF0C\u5BBD\u5EA6\u591F\u5C31\u81EA\u52A8\u591A\u5217 */
  #ungrouped ul { column-width: 300px; column-gap: 10px; }
  #ungrouped li { break-inside: avoid; }
  #folders li.flash { background: var(--accent-soft); }
  .autosync { display: flex; align-items: center; gap: 16px; flex-wrap: wrap;
    padding: 8px 11px; margin-top: 12px; border: 1px dashed var(--border); border-radius: 8px; }
  .autosync > .lbl { font-size: 14px; font-weight: 600; color: var(--muted); }
  .autosync label { display: flex; align-items: center; gap: 5px; font-size: 14px; cursor: pointer; color: var(--fg); }
  .autosync .hint { font-size: 13.5px; color: var(--muted-2); margin-left: auto; }
  /* ---- \u81EA\u52A8\u540C\u6B65\u6D41\u6C34\uFF1A\u65F6\u95F4 + \u52A8\u4E86\u54EA\u4E9B\u6587\u4EF6 + \u63A8\u6CA1\u63A8\u4E0A\u53BB + \u6709\u6CA1\u6709\u4E0A\u7EBF ---- */
  .autolog-head { display: flex; align-items: center; gap: 8px; margin-top: 8px; }
  .autolog-head .t { font-size: 13.5px; font-weight: 600; color: var(--muted); }
  .autolog-head .mini { margin-left: auto; padding: 2px 8px; font-size: 13px; }
  /* \u6D41\u6C34\u4E0D\u9650\u9AD8\u5EA6\uFF1A\u6761\u76EE\u591A\u4E86\u5C31\u6574\u9875\u5F80\u4E0B\u957F\uFF08\u539F\u6765\u5361 4 \u884C\u8981\u6EDA\u52A8\uFF0C\u7FFB\u5386\u53F2\u5F88\u522B\u626D\uFF09 */
  .autolog { margin-top: 4px; font-size: 13.5px; color: var(--muted-2);
    display: flex; flex-direction: column; gap: 5px; }
  .autolog .al { display: flex; flex-direction: column; gap: 1px; }
  .autolog .al-top { display: flex; align-items: baseline; gap: 8px; flex-wrap: wrap; }
  .autolog .tm { font-variant-numeric: tabular-nums; color: var(--muted); }
  .autolog .st { font-weight: 600; }
  .autolog .st.ok { color: var(--accent); } .autolog .st.bad { color: var(--bad); }
  .autolog .st.wait { color: var(--muted); } .autolog .st.skip { color: var(--muted-2); }
  .autolog .cs { color: var(--muted-2); }
  .autolog .took { color: var(--muted-2); }
  .autolog .sha { font-family: ui-monospace, Menlo, Consolas, monospace; color: var(--muted-2); }
  /* \u7B2C\u4E8C\u884C\uFF1A\u8FD9\u6B21\u52A8\u4E86\u54EA\u4E9B\u6587\u4EF6 \u2014\u2014 \u4E09\u680F\u91CC\u4E0D\u518D\u91CD\u590D\u5217\u8FD9\u4E9B\uFF0C\u6539\u7531\u6D41\u6C34\u8BF4\u660E */
  .autolog .al-files { display: flex; gap: 10px; flex-wrap: wrap; padding-left: 2px; font-size: 13px; }
  .autolog .fs { overflow: hidden; text-overflow: ellipsis; white-space: nowrap; max-width: 100%; }
  .autolog .fs.add { color: var(--ok); } .autolog .fs.mod { color: var(--warn-fg); }
  .autolog .fs.del { color: var(--bad); }
  .hidden { display: none; }
  label { font-size: 14.5px; color: var(--muted); }
  .vault-ok { color: var(--accent); } .vault-bad { color: var(--bad); }
  /* ---- \u9876\u90E8\u72B6\u6001\u680F\uFF08\u53D1\u5E03\u53CD\u9988\u51FA\u73B0\u5728\u8FD9\u91CC\uFF0C\u4E0D\u7528\u6EDA\u5230\u5E95\u90E8\uFF09---- */
  .statusbar { position: sticky; top: 0; z-index: 30; margin: -20px -20px 14px; padding: 12px 20px;
               background: var(--bar); backdrop-filter: blur(8px); border-bottom: 1px solid var(--border); }
  .statusbar .inner { max-width: 1100px; margin: 0 auto; display: flex; align-items: center; gap: 12px; flex-wrap: wrap; }
  .statusbar .title { font-size: 19px; font-weight: 700; white-space: nowrap; }
  .statusbar .spacer { flex: 1; }
  /* \u4E3B\u64CD\u4F5C\u6309\u94AE\u7528\u84DD\u8272\uFF08\u4E0E\u7AD9\u70B9\u4E3B\u8272\u4E00\u81F4\uFF09\uFF1B\u7EFF\u8272\u53EA\u7559\u7ED9\u300C\u5DF2\u516C\u5F00\u300D\u72B6\u6001\u672C\u8EAB */
  .btn-publish { background: var(--accent); padding: 9px 18px; font-size: 15.5px; font-weight: 600;
                 box-shadow: 0 1px 2px rgba(37,112,204,.3); white-space: nowrap; }
  .btn-publish:hover:not(:disabled) { background: var(--accent-hover); }
  /* \u9876\u680F\u91CC\u539F\u6765\u7684\u300C\u7ED3\u679C\u5C0F\u80F6\u56CA\u300D\u5DF2\u6309\u7528\u6237\u8981\u6C42\u5220\u9664\uFF1A\u6240\u6709\u64CD\u4F5C\u7ED3\u679C\u7EDF\u4E00\u8D70\u53F3\u4E0A\u89D2\u5F39\u7A97\uFF0C
     \u9876\u680F\u4E0D\u518D\u6709\u4EFB\u4F55\u4F1A\u81EA\u5DF1\u53D8\u5316\u7684\u5C0F\u5757\u3002 */
  /* \u975E\u5173\u952E\u7684\u300C\u987A\u5E26\u6210\u529F\u300D\u65E5\u5FD7\uFF08\u7AD9\u540D\u53D8\u91CF\u540C\u6B65\u7B49\uFF09\u6DE1\u4E00\u6863\uFF1A
     \u5B83\u4EEC\u548C\u6210\u8D25\u6DF7\u5728\u540C\u4E00\u89C6\u89C9\u5C42\u7EA7\u65F6\uFF0C\u4F1A\u8BA9\u4EBA\u628A\u6574\u6B21\u53D1\u5E03\u8BEF\u5224\u6210\u6210\u529F\uFF08\u771F\u5B9E\u8E29\u8FC7\uFF09\u3002 */
  .toast .tb pre .dim { opacity: .6; }

  /* ---- \u53F3\u4E0A\u89D2\u64CD\u4F5C\u63D0\u793A\uFF1A\u6BCF\u6B21\u300C\u53D1\u5E03 / \u66F4\u65B0\u6E90\u7801 / \u4FDD\u5B58\u5916\u89C2\u300D\u90FD\u8981\u6709\u4E00\u6761
     \u4ECE\u300C\u8FDB\u884C\u4E2D\u300D\u8D70\u5230\u300C\u6210\u529F / \u5931\u8D25\u300D\u7684\u63D0\u793A\u3002\u7528\u6237\u53CD\u9988\u53EA\u770B\u9876\u90E8\u5C0F\u80F6\u56CA\u5206\u4E0D\u6E05
     \u300C\u8FD8\u6CA1\u63A8\u9001\u4E0A\u53BB\u300D\u548C\u300C\u6B63\u5728\u8DD1\u300D\uFF0C\u6240\u4EE5\u505A\u6210\u72EC\u7ACB\u6D6E\u5C42\uFF0C\u5E26\u8F6C\u5708\u548C\u8017\u65F6\u3002
     top \u503C\u8BA9\u51FA\u9876\u680F\u9AD8\u5EA6\uFF1A\u9876\u680F\u662F sticky \u4E14\u8981\u80FD\u70B9\uFF08\u53D1\u5E03 / \u5916\u89C2\u6309\u94AE\u5C31\u5728\u90A3\u513F\uFF09\uFF0C
     \u8D34 top:14px \u4F1A\u628A\u6309\u94AE\u76D6\u4F4F \u2014\u2014 \u5B9E\u6D4B\u622A\u56FE\u786E\u8BA4\u8FC7\uFF0C\u6240\u4EE5\u5F80\u4E0B\u632A\u5230\u9876\u680F\u4E4B\u4E0B\u3002 ---- */
  .toasts { position: fixed; top: 76px; right: 14px; z-index: 90; display: flex; flex-direction: column;
            gap: 8px; width: min(370px, calc(100vw - 28px)); pointer-events: none; }
  .toast { pointer-events: auto; cursor: pointer; background: var(--card); border: 1px solid var(--border); border-radius: 11px;
           padding: 10px 12px; box-shadow: 0 10px 30px var(--shadow); font-size: 14px;
           animation: tin .18s ease-out; }
  @keyframes tin { from { opacity: 0; transform: translateY(-6px); } to { opacity: 1; transform: none; } }
  .toast .th { display: flex; align-items: center; gap: 7px; font-weight: 600; font-size: 14.5px; }
  .toast .th .tt { flex: 1; min-width: 0; }
  /* \u6CA1\u6709\u5173\u95ED\u5C0F \xD7\uFF1A\u70B9\u5361\u7247\u4EFB\u610F\u4F4D\u7F6E\u5373\u5173\u95ED\uFF08\u89C1 toastOpen \u91CC\u7684 click \u76D1\u542C\uFF09\u3002
     \u53EA\u63D0\u793A\u4E00\u4E0B\u53EF\u70B9\uFF0C\u4E0D\u7ED9\u6309\u94AE\u3002 */
  .toast:hover { border-color: var(--accent); }
  .toast .tb { margin-top: 5px; color: var(--muted); font-size: 13.5px; line-height: 1.55; word-break: break-word; }
  .toast .spin { width: 13px; height: 13px; border-radius: 50%; border: 2px solid var(--accent);
                 border-top-color: transparent; animation: tspin .8s linear infinite; flex-shrink: 0; }
  @keyframes tspin { to { transform: rotate(360deg); } }
  .toast .ic { width: 15px; height: 15px; border-radius: 50%; flex-shrink: 0; display: inline-flex;
               align-items: center; justify-content: center; font-size: 11px; font-weight: 700; color: #fff; }
  .toast .ic.ok { background: var(--ok); } .toast .ic.bad { background: var(--bad); }
  .toast.busy { border-left: 3px solid var(--accent); }
  .toast.ok   { border-left: 3px solid var(--ok); }
  .toast.bad  { border-left: 3px solid var(--bad); }
  .toast .tb details { margin-top: 5px; }
  .toast .tb pre { margin: 5px 0 0; white-space: pre-wrap; font: 11.5px/1.6 Consolas, monospace;
                   color: var(--muted-2); max-height: 170px; overflow: auto; }
  .toast .tb a { color: var(--accent); }

  /* ---- \u5355\u5E93\u4FE1\u606F\u6761\uFF1A\u4E00\u884C\u641E\u5B9A\uFF0C\u4E0D\u518D\u7528\u5361\u7247 ---- */
  .vbar { display: flex; align-items: baseline; gap: 10px; flex-wrap: wrap;
          padding: 0 2px 12px; font-size: 14px; }
  .vbar .vname { font-weight: 600; font-size: 15px; color: var(--fg); }
  .vbar .vrepo { color: var(--muted); font-size: 13.5px; }
  .vbar .vmeta { color: var(--muted-2); font-size: 13.5px; }
  .vbar .vmeta b { color: var(--accent); font-weight: 600; }
  .vbar .vspacer { flex: 1; }
  /* \u300C\u6709 N \u5904\u6539\u52A8\u8FD8\u6CA1\u53D1\u5E03\u300D\u7684\u5E38\u9A7B\u63D0\u9192\uFF1A\u5B83\u662F\u6301\u7EED\u72B6\u6001\uFF0C\u4E0D\u662F\u4E00\u6B21\u6027\u7ED3\u679C\uFF0C
     \u6240\u4EE5\u7559\u5728\u4FE1\u606F\u6761\u4E0A\uFF08\u9876\u680F\u5C0F\u80F6\u56CA\u5220\u6389\u540E\u4ECE\u90A3\u91CC\u632A\u8FC7\u6765\u7684\uFF09\u3002 */
  .vbar .pending { font-size: 13.5px; color: var(--warn-fg); background: var(--warn-bg);
                   border: 1px solid var(--warn-bd); padding: 2px 9px; border-radius: 999px; font-weight: 500; }
  .vbar .pending.hidden { display: none; }
  .vbar .vlink { display: inline-flex; align-items: center; gap: 3px; text-decoration: none;
                 font-size: 13.5px; color: var(--accent); padding: 2px 8px; border-radius: 6px;
                 background: var(--accent-soft); font-weight: 500; }
  .vbar .vlink:hover { background: var(--accent-soft-hover); text-decoration: underline; }
  .vbar .vlink.hidden { display: none; }
  /* \u591A\u8FDE\u63A5\u65F6\uFF08\u53EA\u6709\u547D\u4EE4\u884C\u7248\u4F1A\u9047\u5230\uFF09\u7684\u7D27\u51D1\u4E0B\u62C9 */
  .vbar select { padding: 2px 6px; font-size: 13px; border-radius: 6px; }

  /* ---- \u65B0\u5EFA\u8FDE\u63A5\uFF1A\u4E00\u6B65\u4E00\u4E2A\u5E93 + \u4E00\u4E2A\u4ED3\u5E93 ---- */
  .dialog { position: fixed; inset: 0; z-index: 50; background: rgba(17,24,39,.45);
            display: flex; align-items: center; justify-content: center; padding: 20px; }
  .dialog .panel { background: var(--card); border-radius: 14px; width: 100%; max-width: 520px;
                   padding: 20px 22px; box-shadow: 0 20px 50px var(--shadow);
                   max-height: calc(100vh - 40px); overflow-y: auto; }
  .dialog h2 { margin: 0 0 4px; font-size: 18.5px; }
  .dialog .hint { font-size: 14.5px; color: var(--muted); margin-bottom: 16px; }
  .field { margin-bottom: 14px; }
  .field > label { display: block; margin-bottom: 5px; font-size: 14.5px; color: var(--chip-fg); font-weight: 500; }
  .field input { width: 100%; box-sizing: border-box; }
  .pickrow { display: flex; gap: 8px; }
  .pickrow input { flex: 1; }
  .picker { font-size: 13.5px; color: var(--muted-2); margin-top: 5px; min-height: 16px; }
  .picker.ok { color: var(--accent); font-weight: 500; } .picker.bad { color: var(--bad); }
  .dialog .actions { display: flex; gap: 8px; justify-content: flex-end; margin-top: 20px; }
  .tabs { display: flex; gap: 6px; margin-bottom: 8px; }
  .tab { background: var(--btn-ghost); color: var(--chip-fg); border: 0; cursor: pointer; font-size: 14.5px;
         padding: 5px 11px; border-radius: 8px; }
  .tab:hover { background: var(--chip); }
  .tab.on { background: var(--accent); color: #fff; }
  button.ghost { background: var(--btn-ghost); color: var(--chip-fg); }
  .warnbox { background: var(--warn-bg); color: var(--warn-fg); border: 1px solid var(--warn-bd); border-radius: 8px;
             padding: 9px 12px; font-size: 14.5px; margin-bottom: 12px; }
  /* \u672A\u6388\u6743\u63D0\u793A\u6761\uFF1A\u65B0\u673A\u5668\u4E0A\u300C\u4E00\u952E\u8FDE\u63A5 / \u53D1\u5E03\u300D\u90FD\u9700\u8981 GitHub \u6388\u6743\uFF0C
     \u4E0D\u628A\u8FD9\u6761\u6446\u5230\u773C\u524D\uFF0C\u7528\u6237\u53EA\u4F1A\u5F97\u5230\u4E00\u4E2A\u770B\u4E0D\u61C2\u7684\u5931\u8D25\u3002 */
  .authbar { display: flex; align-items: center; gap: 10px; margin: -6px 0 14px; padding: 9px 13px;
             background: var(--warn-bg); color: var(--warn-fg); border: 1px solid var(--warn-bd);
             border-radius: 10px; font-size: 14.5px; }
  .authbar.hidden { display: none; }
  .authbar .mini { margin-left: auto; }
  .tokenrow { display: flex; gap: 8px; align-items: flex-start; }
  .tokenrow input { flex: 1; font-family: ui-monospace, Consolas, monospace; font-size: 14px; }
  /* ---- \u81EA\u5B9A\u4E49\u5916\u89C2\uFF1A\u4E00\u5927\u5757\u7B49\u5BBD\u6587\u672C\u6846 ---- */
  .dialog .panel.wide { max-width: 780px; }
  .theme-editor { width: 100%; box-sizing: border-box; min-height: 240px; resize: vertical;
                  font-family: ui-monospace, Consolas, "Cascadia Mono", monospace; font-size: 13px;
                  line-height: 1.55; tab-size: 2; padding: 11px 12px; border-radius: 9px;
                  background: var(--field); color: var(--fg); border: 1px solid var(--border-soft); }
  .theme-editor:focus { outline: 2px solid var(--accent); outline-offset: -1px; }
  .theme-bar { display: flex; align-items: center; gap: 8px; margin-top: 8px; flex-wrap: wrap; }
  .theme-bar .cnt { margin-left: auto; font-size: 13px; color: var(--muted-2); }
  .theme-bar .cnt.over { color: var(--bad); font-weight: 600; }
  .theme-tip { font-size: 13.5px; color: var(--muted); margin: 2px 0 10px; line-height: 1.6; }
  .theme-tip code { font-family: ui-monospace, Consolas, monospace; font-size: 12.5px;
                    background: var(--chip); padding: 1px 5px; border-radius: 5px; }
  .theme-msg { font-size: 13.5px; margin-top: 8px; min-height: 16px; }
  .theme-msg.ok { color: var(--accent); }
  .theme-msg.bad { color: var(--bad); }
  /* ---- \u9884\u8BBE\u5916\u89C2\uFF1A\u4E00\u4E2A\u4E0B\u62C9\u6846 ----
     \u7528\u6237\u8981\u6C42\u300C\u4E00\u4E2A\u6846\uFF0C\u70B9\u51FB\u53EF\u4EE5\u6ED1\u52A8\u9009\u62E9\uFF0C\u9F20\u6807\u60AC\u6D6E\u6709\u4E3B\u9898\u7B80\u4ECB\u300D\uFF1A
     \u6536\u8D77\u65F6\u53EA\u662F\u4E00\u4E2A\u663E\u793A\u5F53\u524D\u6837\u5F0F\u7684\u6846\uFF1B\u70B9\u5F00\u662F\u4E00\u4E2A\u53EF\u6EDA\u52A8\u7684\u540D\u5B57\u5217\u8868\uFF0C
     \u9F20\u6807\u505C\u5728\u67D0\u4E2A\u540D\u5B57\u4E0A\uFF0C\u6846\u5E95\u90A3\u884C\u7B80\u4ECB\u8DDF\u7740\u53D8\u3002 */
  .preset-box { position: relative; margin: 4px 0 14px; }
  .preset-current {
    width: 100%; display: flex; align-items: center; gap: 8px; text-align: left;
    border: 1px solid var(--border); border-radius: 9px; padding: 7px 11px;
    background: var(--card); color: var(--fg); font: inherit; font-size: 13px; cursor: pointer;
    transition: border-color .15s ease;
  }
  .preset-current:hover, .preset-box.open .preset-current { border-color: var(--accent); }
  .preset-current .nm { flex: 1 1 auto; font-weight: 600; }
  .preset-current .caret {
    flex: 0 0 auto; color: var(--muted-2); font-size: 10px;
    transition: transform .15s ease;
  }
  .preset-box.open .preset-current .caret { transform: rotate(180deg); }
  .preset-menu {
    position: absolute; left: 0; right: 0; top: calc(100% + 4px); z-index: 30;
    border: 1px solid var(--border); border-radius: 9px; background: var(--card);
    box-shadow: 0 12px 28px -12px var(--shadow); overflow: hidden;
  }
  .preset-menu[hidden] { display: none; }
  .preset-list { max-height: 186px; overflow-y: auto; padding: 4px; scrollbar-width: thin; }
  .preset-list::-webkit-scrollbar { width: 7px; }
  .preset-list::-webkit-scrollbar-thumb { background: var(--border); border-radius: 4px; }
  .preset {
    display: block; width: 100%; text-align: left; cursor: pointer;
    border: 0; border-radius: 6px; padding: 5px 8px; margin: 1px 0;
    background: transparent; color: var(--fg); font: inherit; font-size: 12.5px;
    white-space: nowrap; overflow: hidden; text-overflow: ellipsis;
  }
  .preset:hover { background: var(--accent-soft-hover); color: var(--accent); }
  .preset.on { color: var(--accent); font-weight: 600; }
  .preset.on::after { content: '\u2713'; margin-left: 6px; }
  .preset-desc {
    border-top: 1px solid var(--border); padding: 6px 10px; font-size: 11.5px;
    color: var(--muted-2); line-height: 1.45; min-height: 30px;
    display: flex; align-items: center; gap: 6px; background: var(--bg);
  }
  .preset-desc b { color: var(--fg); font-weight: 600; flex: 0 0 auto; }
  /* ---- \u4E3B\u9898\u9884\u89C8\u56FE ----
     \u9009\u4E2D\u67D0\u5957\u9884\u8BBE\u65F6\u663E\u793A\u5B83\u957F\u4EC0\u4E48\u6837\u3002\u56FE\u662F\u901A\u7528\u793A\u4F8B\u5185\u5BB9\uFF08\u7AD9\u540D\u300C\u793A\u4F8B\u535A\u5BA2\u300D\uFF09\uFF0C
     \u4E0D\u542B\u4EFB\u4F55\u771F\u5B9E\u4E2A\u4EBA\u4FE1\u606F\u3002\u7528\u6237\u81EA\u5DF1\u5199\u7684 CSS \u6CA1\u6709\u56FE\u53EF\u663E\u793A\uFF0C\u90A3\u65F6\u6362\u6210\u4E00\u884C\u8BF4\u660E\u3002 */
  .preset-preview {
    margin: -6px 0 12px; border: 1px solid var(--border); border-radius: 9px;
    overflow: hidden; background: var(--bg); line-height: 0;
  }
  .preset-preview[hidden] { display: none; }
  .preset-preview img { width: 100%; height: auto; max-height: 216px; object-fit: cover;
                        object-position: top left; display: block; }
  .preset-preview-empty {
    margin: -6px 0 12px; padding: 8px 11px; border: 1px dashed var(--border);
    border-radius: 9px; font-size: 12.5px; color: var(--muted-2);
  }
  .preset-preview-empty[hidden] { display: none; }
  /* ---- \u5199\u4F5C\u6307\u5357\u5F39\u7A97 ---- */
  .guide-panel { max-width: 720px; }
  .guide-sec { margin-bottom: 12px; }
  .guide-sec .gt { font-size: 13px; color: var(--muted); margin-bottom: 5px; }
  .guide-code {
    margin: 0; font-family: ui-monospace, Consolas, "Cascadia Mono", monospace;
    font-size: 12px; line-height: 1.6; padding: 10px 12px; border-radius: 9px;
    background: var(--field); color: var(--fg); border: 1px solid var(--border-soft);
    overflow-x: auto; white-space: pre; tab-size: 2;
  }
  .guide-note {
    font-size: 12.5px; color: var(--muted-2); line-height: 1.6;
    padding: 8px 11px; border-radius: 8px; background: var(--chip);
  }
  /* \u63D2\u4EF6\u7528 iframe \u5D4C\u5165\uFF08?embed=1\uFF09\uFF1AObsidian \u5DE6\u4FA7\u5DF2\u7ECF\u662F\u6587\u4EF6\u6811\uFF0C
     \u8FD9\u91CC\u7684\u300C\u641C\u7D22 + \u6587\u4EF6\u5939\u7F51\u683C\u300D\u91CD\u590D\u4E14\u6324\uFF0C\u6574\u5757\u9690\u85CF\uFF0C\u53EA\u7559\u8FDE\u63A5 / \u53D8\u66F4 / \u6D41\u6C34 / \u53D1\u5E03\u3002 */
  body.embed-mode #mainCard { display: none; }
</style></head><body>

<div class="statusbar"><div class="inner">
  <span class="title" data-i18n="appTitle">\u53D1\u5E03\u7BA1\u7406\u5668</span>
  <span class="spacer"></span>
  <button class="mini" id="authBtn" onclick="openAuthDialog()" data-i18n="authBtn">GitHub \u6388\u6743</button>
  <button class="mini" id="srcBtn" onclick="doUpdateSource()" data-i18n="srcBtn">\u2B06 \u66F4\u65B0\u6E90\u7801</button>
  <button class="btn-publish" id="pubBtn" onclick="doPublish()" data-i18n="publishBtn">\u27F3 \u53D1\u5E03\u5230 GitHub</button>
</div></div>

<!-- \u53F3\u4E0A\u89D2\u64CD\u4F5C\u63D0\u793A\uFF1A\u53D1\u5E03 / \u66F4\u65B0\u6E90\u7801 / \u4FDD\u5B58\u5916\u89C2\u90FD\u4F1A\u5728\u8FD9\u91CC\u51FA\u73B0\u4E00\u6761
     \u4ECE\u300C\u8FDB\u884C\u4E2D\u300D\u5230\u300C\u5DF2\u4E0A\u7EBF\u300D\u6216\u300C\u5931\u8D25\u300D\u7684\u63D0\u793A\u6761\uFF0C\u5931\u8D25\u65F6\u53EF\u76F4\u63A5\u5C55\u5F00\u770B\u65E5\u5FD7\u3002 -->
<div class="toasts" id="toasts"></div>

<div class="authbar hidden" id="authBar">
  <span data-i18n="authBarText"></span>
  <button class="mini" onclick="openAuthDialog()" data-i18n="authBarBtn">\u73B0\u5728\u6388\u6743</button>
</div>

<div class="wrap">

<!-- \u5355\u5E93\u4FE1\u606F\u6761\uFF1A\u53EA\u5360\u4E00\u884C\u3002\u5E93\u540D / \u4ED3\u5E93 / \u7BC7\u6570 / \u6253\u5F00\u7F51\u9875 / \u8BBE\u7F6E\uFF0C
     \u5168\u585E\u5728\u72B6\u6001\u680F\u4E0B\u9762\u8FD9\u4E00\u6761\u91CC\uFF0C\u4E0D\u518D\u5355\u72EC\u5360\u4E00\u5F20\u5361\u7247\uFF08\u90A3\u4F1A\u767D\u5360\u6389\u9996\u5C4F\u6700\u503C\u94B1\u7684\u4F4D\u7F6E\uFF09\u3002 -->
<div class="vbar" id="vbar">
  <span class="vname" id="vbName"></span>
  <span class="vrepo" id="vbRepo"></span>
  <span class="vmeta" id="vbMeta"></span>
  <!-- \u300C\u6709 N \u5904\u6539\u52A8\u8FD8\u6CA1\u53D1\u5E03\u300D\u7684\u5E38\u9A7B\u63D0\u9192\u3002\u539F\u6765\u662F\u9876\u680F\u5C0F\u80F6\u56CA\u91CC\u7684\u4E00\u53E5\u8BDD\uFF0C
       \u5C0F\u80F6\u56CA\u6574\u4F53\u5220\u6389\u540E\uFF08\u7528\u6237\u8981\u6C42\u53EA\u4FDD\u7559\u5F39\u7A97\uFF09\u8FD9\u53E5\u8BDD\u632A\u5230\u8FD9\u91CC \u2014\u2014
       \u5B83\u662F\u6301\u7EED\u72B6\u6001\uFF0C\u4E0D\u8BE5\u505A\u6210\u9700\u8981\u70B9\u6389\u7684\u5F39\u7A97\u3002 -->
  <span class="pending hidden" id="pendingHint"></span>
  <span class="vspacer"></span>
  <a class="vlink hidden" id="vbLink" target="_blank" rel="noopener" data-i18n="openSite">\u2197 \u6253\u5F00\u7F51\u9875</a>
  <button class="mini" id="themeBtn" onclick="openTheme()" data-i18n="themeBtn">\u5916\u89C2</button>
  <button class="mini" id="setupBtn" onclick="openActiveSetup()" data-i18n="vaultSettings">\u8BBE\u7F6E</button>
</div>

<div class="card" id="chgCard">
  <div class="row" style="margin-bottom:10px">
    <label style="font-size: 15px;font-weight:600;" data-i18n="chgTitle">\u53D8\u66F4</label>
    <span class="cnt" id="chgHint"></span>
  </div>
  <div class="chgcols" id="chgcols"></div>
  <div class="autosync" id="autosync">
    <span class="lbl" data-i18n="autoSyncTitle">\u81EA\u52A8\u540C\u6B65</span>
    <label title="\u65B0\u589E\u7684\u7B14\u8BB0\u81EA\u52A8\u8BBE\u4E3A\u516C\u5F00\u5E76\u53D1\u5E03" data-i18n-title="autoSyncTipAdded">
      <input type="checkbox" id="as-added" onchange="setAutoSync('added', this.checked)">
      <span data-i18n="autoSyncAdded">\u65B0\u589E</span>
    </label>
    <label title="\u5DF2\u516C\u5F00\u7B14\u8BB0\u7684\u6539\u52A8\u81EA\u52A8\u53D1\u5E03" data-i18n-title="autoSyncTipModified">
      <input type="checkbox" id="as-modified" onchange="setAutoSync('modified', this.checked)">
      <span data-i18n="autoSyncModified">\u4FEE\u6539</span>
    </label>
    <label title="\u672C\u5730\u5220\u9664\u6216\u8F6C\u79C1\u5BC6\u540E\uFF0C\u7EBF\u4E0A\u4E5F\u8DDF\u7740\u5220\u6389" data-i18n-title="autoSyncTipDeleted">
      <input type="checkbox" id="as-deleted" onchange="setAutoSync('deleted', this.checked)">
      <span data-i18n="autoSyncDeleted">\u5220\u9664</span>
    </label>
    <span class="hint" data-i18n="autoSyncHint">\u52FE\u9009\u540E\u8FD9\u7C7B\u6539\u52A8\u4F1A\u81EA\u52A8\u53D1\u5E03\uFF0C\u4E0D\u7528\u70B9\u53F3\u4E0A\u89D2\u300C\u53D1\u5E03\u300D</span>
  </div>
  <div class="autolog-head" id="autologHead" style="display:none">
    <span class="t" data-i18n="autoLogTitle">\u81EA\u52A8\u540C\u6B65\u6D41\u6C34</span>
    <button class="mini" id="alClear" onclick="clearAutoLogUI()" data-i18n="autoLogClear">\u6E05\u7A7A</button>
  </div>
  <div class="autolog" id="autolog"></div>
</div>

<div class="card" id="mainCard">
  <div class="row" style="margin-bottom:12px">
    <input id="q" placeholder="\u641C\u7D22\u7B14\u8BB0\u6807\u9898 / \u8DEF\u5F84\u2026" data-i18n-ph="searchPh">
    <button class="mini" onclick="expandAllFolders()" data-i18n="expandAll">\u4E00\u952E\u5C55\u5F00</button>
    <button class="mini" onclick="collapseAllFolders()" data-i18n="collapseAll">\u4E00\u952E\u6536\u8D77</button>
    <button class="mini" onclick="toggleAll(true)" data-i18n="pubAll">\u5168\u90E8\u516C\u5F00</button>
    <button class="mini" onclick="toggleAll(false)" data-i18n="privAll">\u5168\u90E8\u79C1\u5BC6</button>
  </div>
  <!-- \u672A\u5206\u7EC4\uFF08\u5E93\u6839\u76EE\u5F55\u4E0B\u7684\u7B14\u8BB0\uFF09\u5355\u72EC\u4E00\u5757\uFF0C\u4E0D\u6DF7\u8FDB\u6587\u4EF6\u5939\u7F51\u683C -->
  <div id="ungrouped"></div>
  <div class="grid" id="folders"></div>
  <div id="log"></div>
</div>
</div>

<script>
let S = { connections: [], active: null, vaultPath: '', vaultOk: false, notes: [], collapsed: new Set() };

// ---- \u754C\u9762\u8BED\u8A00 ----
// \u53EA\u7FFB\u754C\u9762\u6587\u6848\uFF1B\u7B14\u8BB0\u6807\u9898 / \u8DEF\u5F84 / \u4ED3\u5E93\u540D / \u7AD9\u540D\u4E00\u5F8B\u539F\u6837\u663E\u793A\u3002
// \u9996\u6B21\u8BBF\u95EE\u8DDF\u968F\u6D4F\u89C8\u5668\u8BED\u8A00\uFF0C\u624B\u52A8\u5207\u8FC7\u4E4B\u540E\u8BB0\u5728 localStorage\uFF0C\u4E0D\u518D\u8DDF\u968F\u3002
// \u6CE8\u610F\uFF1A\u8FD9\u4E00\u6BB5\u5728\u670D\u52A1\u7AEF UI \u6A21\u677F\u5B57\u9762\u91CF\u91CC\uFF0C\u6240\u4EE5\u5168\u7A0B\u53EA\u7528\u5355\u5F15\u53F7\u62FC\u63A5\uFF0C\u4E0D\u80FD\u51FA\u73B0\u53CD\u5F15\u53F7\u4E0E\u7F8E\u5143\u82B1\u62EC\u53F7\u3002
const DICT = {
  zh: {
    appTitle: '\u53D1\u5E03\u7BA1\u7406\u5668',
    publishBtn: '\u27F3 \u53D1\u5E03\u5230 GitHub',
    srcBtn: '\u2B06 \u66F4\u65B0\u6E90\u7801',
    updatingSrc: '\u6B63\u5728\u66F4\u65B0\u6E90\u7801\u2026',
    srcSynced: '\u7AD9\u70B9\u6E90\u7801\u5DF2\u66F4\u65B0',
    srcUpdateFail: '\u66F4\u65B0\u6E90\u7801\u5931\u8D25\uFF1A',
    publishing: '\u53D1\u5E03\u4E2D\u2026',
    publishDone: '\u5B8C\u6210',
    // \u63A8\u9001\u6210\u529F \u2260 \u7F51\u9875\u5DF2\u66F4\u65B0\uFF1AGitHub \u8FD8\u8981\u8DD1\u4E00\u6B21\u6784\u5EFA\u518D\u90E8\u7F72\uFF0C\u901A\u5E38 40~90 \u79D2\u3002
    // \u8FD9\u51E0\u6761\u628A\u90A3\u6BB5\u7B49\u5F85\u663E\u793A\u6210\u8FDB\u5EA6\uFF0C\u907F\u514D\u7528\u6237\u53CD\u590D\u5237\u65B0\u53BB\u731C\u3002
    liveBuilding: function (s) { return '\u5DF2\u63A8\u9001\uFF0CGitHub \u6B63\u5728\u6784\u5EFA\u90E8\u7F72\u2026\u5DF2\u7B49 ' + s + ' \u79D2' },
    liveOk: function (s) { return '\u5DF2\u4E0A\u7EBF\uFF08\u7528\u65F6 ' + s + ' \u79D2\uFF09' },
    liveTimeout: '\u7B49\u4E86 4 \u5206\u949F\u8FD8\u6CA1\u4E0A\u7EBF\uFF0C\u6784\u5EFA\u53EF\u80FD\u5931\u8D25\u4E86\uFF0C\u8BF7\u5230 GitHub \u4ED3\u5E93\u7684 Actions \u9875\u9762\u770B\u4E00\u773C',
    liveOpen: '\u6253\u5F00\u7EBF\u4E0A\u9875\u9762',
    toastResultTitle: '\u64CD\u4F5C\u7ED3\u679C',
    toastClose: '\u5173\u95ED\u63D0\u793A',
    toastDetail: '\u67E5\u770B\u8BE6\u60C5',
    toastPublishTitle: '\u53D1\u5E03\u5230 GitHub',
    toastSourceTitle: '\u66F4\u65B0\u7AD9\u70B9\u6E90\u7801',
    toastThemeTitle: '\u4FDD\u5B58\u81EA\u5B9A\u4E49\u5916\u89C2',
    toastStarting: '\u6B63\u5728\u51C6\u5907\u2026',
    toastPushed: '\u5DF2\u63A8\u9001\uFF0C\u6B63\u5728\u7B49 GitHub \u6784\u5EFA\u4E0A\u7EBF',
    toastNothingToPush: '\u6CA1\u6709\u65B0\u7684\u6539\u52A8\u53EF\u63A8\u9001\uFF08\u7EBF\u4E0A\u5DF2\u662F\u6700\u65B0\uFF09',
    toastDone: '\u5B8C\u6210',
    toastFailed: '\u5931\u8D25',
    toastPublishOk: '\u53D1\u5E03\u6210\u529F',
    toastSourceOk: '\u6E90\u7801\u5DF2\u66F4\u65B0',
    toastThemeOk: '\u5916\u89C2\u5DF2\u4FDD\u5B58\u5E76\u63A8\u9001',
    toastThemeSavedOnly: '\u5916\u89C2\u5DF2\u4FDD\u5B58\u5230\u4ED3\u5E93\uFF08\u5C1A\u672A\u63A8\u9001\uFF09',
    vaultSettings: '\u8BBE\u7F6E',
    themeBtn: '\u5916\u89C2',
    themeTitle: '\u81EA\u5B9A\u4E49\u5916\u89C2',
    // \u9762\u677F\u91CC\u7684\u8BF4\u660E\u6587\u5B57\u603B\u91CF\u5FC5\u987B \u226450 \u5B57\uFF08\u7528\u6237\u8981\u6C42\uFF09\uFF0C\u7EC6\u8282\u5168\u653E\u8FDB\u300C\u5199\u4F5C\u6307\u5357\u300D\u5F39\u7A97
    themeIntro: '\u7C98\u8D34 CSS \u6539\u989C\u8272\u548C\u9996\u9875\u6392\u7248\uFF0C\u7559\u7A7A\u5373\u9ED8\u8BA4\u3002',
    themeDefault: '\u9ED8\u8BA4',
    themeDefaultDesc: '\u7AD9\u70B9\u81EA\u5E26\uFF1A\u84DD\u767D\u914D\u8272 + \u4E09\u5217\u5361\u7247\u9996\u9875',
    themePresetCustom: '\u81EA\u5B9A\u4E49',
    themePresetApplied: function (name) { return '\u5DF2\u586B\u5165\u300C' + name + '\u300D\uFF0C\u6539\u5B8C\u8BB0\u5F97\u70B9\u4FDD\u5B58' },
    themeGuideBtn: '\u5199\u4F5C\u6307\u5357',
    themeGuideTitle: '\u600E\u4E48\u5199\u81EA\u5B9A\u4E49\u5916\u89C2',
    themeGuideIntro: '\u4E0B\u9762\u662F\u53EF\u4EE5\u8986\u76D6\u7684\u53D8\u91CF\u548C\u53EF\u4EE5\u5B9A\u4F4D\u7684\u533A\u57DF\uFF0C\u590D\u5236\u8FC7\u53BB\u6539\u6570\u5B57\u5C31\u884C\u3002',
    themeGuideVars: '\u989C\u8272\u4E0E\u5706\u89D2\uFF1A\u8986\u76D6 :root \u91CC\u7684\u53D8\u91CF\uFF0C\u6DF1\u8272\u6A21\u5F0F\u5199\u5728 html.dark \u4E0B\u3002',
    themeGuideHook: '\u7248\u9762\uFF1A\u8FD9\u4E9B\u533A\u57DF\u90FD\u5E26 data-region\uFF0C\u53EF\u6539\u6392\u5E03\u3001\u95F4\u8DDD\u3001\u989C\u8272\u3002',
    themeGuideNote: '\u5168\u7AD9\u5BBD\u5EA6\u7531\u7AD9\u70B9\u7EDF\u4E00\u63A7\u5236\uFF08--content-w\uFF09\uFF0C\u4E3B\u9898\u91CC\u4E0D\u8981\u5199 max-width\uFF1B\u5927\u7EB2\u662F\u60AC\u6D6E\u7EC4\u4EF6\uFF0C\u4E0D\u8981\u53BB\u52A8\u5B83\u7684\u4F4D\u7F6E\u3002',
    themeGuideFont: '\u5B57\u53F7\u8981\u8DDF\u7740\u53F3\u4E0A\u89D2\u7684\u5B57\u53F7\u6ED1\u5757\u8D70\uFF0C\u5C31\u7528 var(--fsu)\u3002',
    themeGuideInsert: '\u63D2\u5165\u5230\u7F16\u8F91\u5668',
    themePlaceholder: '/* \u4F8B\uFF1A\u628A\u5F3A\u8C03\u8272\u6362\u6210\u58A8\u7EFF\uFF0C\u6B63\u6587\u7528\u5B8B\u4F53 */\\n:root {\\n  --primary: oklch(0.48 0.11 155);\\n}\\n\\n[data-region="article"] {\\n  font-family: "Songti SC", serif;\\n}',
    themeEmpty: '\u8FD8\u6CA1\u6709\u81EA\u5B9A\u4E49\u5916\u89C2\uFF08\u7528\u9ED8\u8BA4\u4E3B\u9898\uFF09',
    themeChars: function (n, max) { return n + ' / ' + max + ' \u5B57\u7B26' },
    themeSave: '\u4FDD\u5B58',
    themeSavePublish: '\u4FDD\u5B58\u5E76\u53D1\u5E03',
    themeSaving: '\u4FDD\u5B58\u4E2D\u2026',
    themePublishing: '\u4FDD\u5B58\u5E76\u63A8\u9001\u4E2D\u2026',
    themeSaved: '\u5DF2\u4FDD\u5B58\u5230\u4ED3\u5E93\uFF08\u8FD8\u6CA1\u4E0A\u7EBF\uFF0C\u70B9\u300C\u4FDD\u5B58\u5E76\u53D1\u5E03\u300D\u6216\u300C\u66F4\u65B0\u6E90\u7801\u300D\u624D\u4F1A\u751F\u6548\uFF09',
    themeSaveFail: '\u4FDD\u5B58\u5931\u8D25\uFF1A',
    themePublishFail: '\u53D1\u5E03\u5931\u8D25\uFF1A',
    themeCleared: '\u5DF2\u6E05\u7A7A\u81EA\u5B9A\u4E49\u5916\u89C2\uFF08\u6062\u590D\u9ED8\u8BA4\u4E3B\u9898\uFF09',
    themeLoading: '\u6B63\u5728\u8BFB\u53D6\u2026',
    themeLoadFail: '\u8BFB\u53D6\u5931\u8D25\uFF1A',
    themeClear: '\u6E05\u7A7A',

    searchPh: '\u641C\u7D22\u7B14\u8BB0\u6807\u9898 / \u8DEF\u5F84\u2026',
    expandAll: '\u4E00\u952E\u5C55\u5F00',
    collapseAll: '\u4E00\u952E\u6536\u8D77',
    pubAll: '\u5168\u90E8\u516C\u5F00',
    privAll: '\u5168\u90E8\u79C1\u5BC6',
    // \u6587\u4EF6\u5939\u6807\u9898\u4E0A\u7684\u6279\u91CF\u6309\u94AE\uFF1A\u4F4D\u7F6E\u7A84\uFF0C\u82F1\u6587\u7528\u77ED\u8BCD\uFF0C\u522B\u628A\u6587\u4EF6\u5939\u540D\u6324\u6389
    pubAllMini: '\u516C\u5F00',
    privAllMini: '\u79C1\u5BC6',
    noConn: '\u8FD8\u6CA1\u6709\u8FDE\u63A5\uFF0C\u70B9\u53F3\u8FB9\u65B0\u5EFA\u4E00\u4E2A',
    current: '\u5F53\u524D',
    noVault: '\u672A\u8BBE\u7F6E\u672C\u5730\u5E93',
    vaultMeta: function (n, p) { return n + ' \u7BC7 \xB7 ' + p + ' \u7BC7\u516C\u5F00' },
    // \u5361\u7247\u4E0A\u7684\u516C\u5F00\u6570\u8981\u52A0\u7C97\uFF1A\u4E0E\u5176\u5728\u5916\u9762\u6309\u5B50\u4E32\u5339\u914D\uFF08\u6362\u8BED\u8A00\u5C31\u5931\u6548\uFF09\uFF0C\u4E0D\u5982\u76F4\u63A5\u7ED9\u5E26\u6807\u8BB0\u7684\u6574\u4E32
    vaultMetaHtml: function (n, p) { return n + ' \u7BC7 \xB7 <b>' + p + ' \u7BC7\u516C\u5F00</b>' },
    openSite: '\u2197 \u6253\u5F00\u7F51\u9875',
    remove: '\u79FB\u9664',
    removeTip: '\u53EA\u4ECE\u6E05\u5355\u79FB\u9664\uFF0C\u4E0D\u5F71\u54CD GitHub \u4ED3\u5E93\u548C\u672C\u5730\u5E93',
    removeConfirm: function (name) { return '\u79FB\u9664\u300C' + name + '\u300D\u8FD9\u6761\u8FDE\u63A5\uFF1F\\n\\n\xB7 \u4E0D\u4F1A\u5220\u9664 GitHub \u4ED3\u5E93\\n\xB7 \u4E0D\u4F1A\u6539\u52A8\u672C\u5730 Obsidian \u5E93\\n\xB7 \u4E0B\u6B21\u53EF\u4EE5\u91CD\u65B0\u6DFB\u52A0' },
    removeFail: '\u79FB\u9664\u5931\u8D25\uFF1A',
    switchFail: '\u5207\u6362\u5931\u8D25\uFF1A',
    uncategorized: '\u672A\u5206\u7EC4',
    countNotes: function (n) { return n + ' \u7BC7' },
    pub: '\u516C\u5F00',
    pri: '\u79C1\u5BC6',
    toggleFail: '\u5207\u6362\u5931\u8D25\uFF1A',
    pendingPrompt: function (n) { return '\u6709 ' + n + ' \u5904\u6539\u52A8\u8FD8\u6CA1\u53D1\u5E03\uFF0C\u70B9\u53F3\u4E0A\u89D2\u300C\u53D1\u5E03\u300D' },
    chgAdded: '\u65B0\u589E',
    chgModified: '\u4FEE\u6539',
    chgDeleted: '\u5220\u9664',
    chgTitle: '\u53D8\u66F4',
    chgNone: '\u6CA1\u6709\u5F85\u5904\u7406\u7684\u6539\u52A8',
    chgCount: function (n) { return n + ' \u5904\u5F85\u5904\u7406' },
    chgJumpTip: '\u70B9\u4E00\u4E0B\u8DF3\u5230\u4E0B\u9762\u6587\u4EF6\u5939\u91CC\u7684\u8FD9\u4E00\u7BC7',
    chgTipAdded: '\u65B0\u589E\uFF1A\u8FD8\u6CA1\u53D1\u5E03\u51FA\u53BB\u7684\u65B0\u7B14\u8BB0\u3002\u81EA\u52A8\u540C\u6B65\u5F00\u7740\u7684\u8BDD\uFF0C\u8FD9\u7C7B\u6539\u5B8C\u4F1A\u81EA\u5DF1\u53D1\u4E0A\u53BB\u5E76\u4ECE\u8FD9\u4E00\u680F\u6D88\u5931',
    chgTipModified: '\u4FEE\u6539\uFF1A\u8FD8\u6CA1\u53D1\u51FA\u53BB\u7684\u6539\u52A8\u3002\u81EA\u52A8\u540C\u6B65\u5F00\u7740\u7684\u8BDD\u4F1A\u81EA\u5DF1\u53D1\u4E0A\u53BB\u5E76\u4ECE\u8FD9\u4E00\u680F\u6D88\u5931',
    chgTipDeleted: '\u5220\u9664\uFF1A\u8FD8\u6CA1\u540C\u6B65\u5230\u7EBF\u4E0A\u7684\u5220\u9664/\u8F6C\u79C1\u5BC6\u3002\u81EA\u52A8\u540C\u6B65\u5F00\u7740\u7684\u8BDD\u4F1A\u81EA\u5DF1\u53D1\u4E0A\u53BB\u5E76\u4ECE\u8FD9\u4E00\u680F\u6D88\u5931',
    autoSyncTitle: '\u81EA\u52A8\u540C\u6B65',
    autoSyncAdded: '\u65B0\u589E',
    autoSyncModified: '\u4FEE\u6539',
    autoSyncDeleted: '\u5220\u9664',
    autoSyncHint: '\u52FE\u9009\u540E\u8FD9\u7C7B\u6539\u52A8\u4F1A\u81EA\u52A8\u53D1\u5E03\uFF0C\u4E0D\u7528\u70B9\u53F3\u4E0A\u89D2\u300C\u53D1\u5E03\u300D',
    autoSyncTipAdded: '\u65B0\u589E\u7684\u7B14\u8BB0\u81EA\u52A8\u8BBE\u4E3A\u516C\u5F00\u5E76\u53D1\u5E03',
    autoSyncTipModified: '\u5DF2\u516C\u5F00\u7B14\u8BB0\u7684\u6539\u52A8\u81EA\u52A8\u53D1\u5E03\uFF08\u516C\u5F00\u7684\u4ECD\u516C\u5F00\uFF0C\u79C1\u5BC6\u7684\u4ECD\u79C1\u5BC6\uFF09',
    autoSyncTipDeleted: '\u672C\u5730\u5220\u9664\u6216\u8F6C\u79C1\u5BC6\u540E\uFF0C\u7EBF\u4E0A\u4E5F\u8DDF\u7740\u5220\u6389',
    autoSyncSaved: '\u81EA\u52A8\u540C\u6B65\u8BBE\u7F6E\u5DF2\u4FDD\u5B58',
    autoSyncFail: '\u4FDD\u5B58\u5931\u8D25\uFF1A',
    autoLogTitle: '\u81EA\u52A8\u540C\u6B65\u6D41\u6C34',
    autoLogClear: '\u6E05\u7A7A',
    autoLogStartTip: '\u5F00\u59CB\u63A8\u9001\u7684\u65F6\u95F4',
    autoLogPushing: '\u5F00\u59CB\u63A8\u9001',
    autoLogPushed: '\u5DF2\u63A8\u9001\uFF0C\u7B49\u6784\u5EFA',
    autoLogPushedAt: function (s) { return '\u5DF2\u63A8\u9001 ' + s + '\uFF0C\u7B49\u6784\u5EFA' },
    autoLogLive: function (s) { return '\u5DF2\u66F4\u65B0 ' + s },
    autoLogTook: function (s) { return '\uFF08' + s + '\uFF09' },
    autoLogFailed: '\u63A8\u9001\u5931\u8D25',
    autoLogInterrupted: '\u63A8\u9001\u4E2D\u65AD\uFF08\u7BA1\u7406\u5668\u9000\u51FA\uFF09\uFF0C\u7ED3\u679C\u672A\u77E5',
    autoLogFresh: '\u8DD1\u5B8C\uFF0C\u65E0\u6539\u52A8\u53EF\u63A8',
    autoLogBuildFailed: '\u6784\u5EFA\u5931\u8D25',
    autoLogTimeout: '\u6784\u5EFA\u8D85\u65F6',
    autoLogOpenActions: '\u70B9\u8FD9\u4E00\u884C\u53BB GitHub Actions \u770B\u770B',
    autoLogMore: function (n) { return ' \u7B49 ' + n + ' \u4E2A' },
    autoLogFileAdded: '\u65B0\u589E',
    autoLogFileModified: '\u4FEE\u6539',
    autoLogFileDeleted: '\u5220\u9664',
    noChanges: '\u6682\u65E0\u5F85\u540C\u6B65\u6539\u52A8',
    pending: function (n) { return n + ' \u9879\u5F85\u540C\u6B65' },
    emptyNoConn: '\u8FD8\u6CA1\u6709\u535A\u5BA2\u8FDE\u63A5\uFF0C\u70B9\u4E0A\u65B9\u300C\uFF0B \u65B0\u5EFA\u535A\u5BA2\u300D\u5F00\u59CB\u3002',
    emptyNoNotes: '\u8FD9\u4E2A\u5E93\u91CC\u8FD8\u6CA1\u6709\u7B14\u8BB0\uFF0C\u6216\u8005\u672C\u5730\u5E93\u8DEF\u5F84\u4E0D\u5BF9\u3002\u70B9\u4E0A\u65B9\u5F53\u524D\u535A\u5BA2\u5361\u7247\u53EF\u4EE5\u6539\u3002',
    loadFail: '\u52A0\u8F7D\u5931\u8D25\uFF1A',
    detail: '\u8BE6\u60C5',
    save: '\u4FDD\u5B58\u4FEE\u6539',
    create: '\u521B\u5EFA\u5E76\u5F00\u59CB',
    cancel: '\u53D6\u6D88',
    vaultTip: '\u672C\u5730\u5E93\uFF1A',
    vaultNone: '\uFF08\u672A\u8BBE\u7F6E\uFF09',
    setupTitleEdit: '\u8FD9\u4E2A\u535A\u5BA2\u7684\u8BBE\u7F6E',
    setupTitleNew: '\u65B0\u5EFA\u535A\u5BA2',
    setupHint: '\u4E00\u4E2A\u672C\u5730\u5E93\u5BF9\u5E94\u4E00\u4E2A GitHub \u4ED3\u5E93\u3002\u9009\u597D\u672C\u5730\u5E93\uFF0C\u4E0B\u9762\u4E00\u952E\u641E\u5B9A GitHub \u90A3\u8FB9\u7684\u4E8B\u3002',
    step1: '\u2460 \u672C\u5730\u5E93\u6587\u4EF6\u5939',
    chooseFolder: '\u9009\u62E9\u6587\u4EF6\u5939\u2026',
    pickPlaceholder: '\u70B9\u53F3\u8FB9\u6309\u94AE\u9009\u62E9\u6587\u4EF6\u5939',
    step2: '\u2461 \u540D\u5B57\uFF08\u7BA1\u7406\u5668\u91CC\u663E\u793A\uFF0C\u4E5F\u662F\u7F51\u9875\u5DE6\u4E0A\u89D2\u6807\u9898\uFF09',
    namePlaceholder: '\u4F8B\u5982\uFF1A\u6211\u7684\u535A\u5BA2',
    step3: '\u2462 GitHub \u4ED3\u5E93\uFF08\u7F51\u9875\u5C31\u653E\u5728\u8FD9\u4E2A\u4ED3\u5E93\u91CC\uFF09',
    repoLocked: '\u4ED3\u5E93\u5730\u5740\u5EFA\u597D\u540E\u4E0D\u518D\u6539\u52A8\uFF08\u8981\u6362\u4ED3\u5E93\u8BF7\u79FB\u9664\u8FD9\u6761\u8FDE\u63A5\u91CD\u65B0\u65B0\u5EFA\uFF09',
    tabAuto: '\u5E2E\u6211\u65B0\u5EFA\u4E00\u4E2A\u4ED3\u5E93',
    tabManual: '\u6211\u5DF2\u7ECF\u6709\u4ED3\u5E93\u4E86',
    repoPlaceholder: 'https://github.com/\u4F60\u7684\u7528\u6237\u540D/\u4ED3\u5E93\u540D.git',
    repoTip: '\u586B\u4ED3\u5E93\u5730\u5740\u5373\u53EF\uFF0C\u5EFA\u8BAE\u7528\u7A7A\u4ED3\u5E93\uFF08\u5982\u5DF2\u5728 GitHub \u5EFA\u597D\u4F46\u8FD8\u6CA1\u653E\u8FC7\u4E1C\u897F\uFF09',
    repoNamePlaceholder: '\u4ED3\u5E93\u540D\uFF08\u82F1\u6587\uFF09\uFF0C\u4F8B\u5982 my-blog',
    createOnGitHub: '\u5728 GitHub \u4E0A\u521B\u5EFA',
    goAuthorize: '\u53BB GitHub \u6388\u6743\u2026',
    needRepoName: '\u5148\u586B\u4E00\u4E2A\u4ED3\u5E93\u540D',
    creating: '\u521B\u5EFA\u4E2D\u2026',
    createOk: '\u5DF2\u5728 GitHub \u5EFA\u597D\u4ED3\u5E93\uFF1A',
    createFail: '\u521B\u5EFA\u5931\u8D25\uFF1A',
    tokenReady: '\u2713 \u5DF2\u68C0\u6D4B\u5230 GitHub \u6388\u6743\uFF0C\u53EF\u76F4\u63A5\u521B\u5EFA',
    tokenMissing: '\u8FD8\u6CA1\u6709 GitHub \u6388\u6743\u3002\u70B9\u300C\u53BB GitHub \u6388\u6743\u2026\u300D\u770B\u4E00\u6B65\u5230\u4F4D\u7684\u505A\u6CD5\uFF08\u53EA\u9700\u4E00\u6B21\uFF09\u3002',
    pickOk: '\u2713 \u5DF2\u9009\u62E9\uFF1A',
    pickWait: '\u8BF7\u5728\u5F39\u7A97\u4E2D\u9009\u62E9\u2026',
    pickTimeout: '\u6CA1\u6709\u9009\u62E9\u6587\u4EF6\u5939\u3002\u5982\u679C\u5F39\u7A97\u88AB\u6D4F\u89C8\u5668\u6321\u4F4F\u4E86\uFF0C\u5148\u5173\u6389/\u6700\u5C0F\u5316\u6D4F\u89C8\u5668\u7A97\u53E3\uFF0C\u6216\u7528 Alt+Tab \u627E\u5230\u5B83\uFF0C\u518D\u8BD5\u4E00\u6B21\u3002',
    pickFail: '\u9009\u62E9\u5931\u8D25\uFF1A',
    mustPickVault: '\u8BF7\u5148\u9009\u62E9\u672C\u5730\u5E93\u6587\u4EF6\u5939',
    mustFillRepo: '\u8BF7\u586B\u5199 GitHub \u4ED3\u5E93\u5730\u5740',
    mustCreateRepo: '\u8BF7\u5148\u5728\u300C\u5E2E\u6211\u65B0\u5EFA\u4E00\u4E2A\u4ED3\u5E93\u300D\u91CC\u521B\u5EFA\uFF0C\u6216\u5207\u5230\u300C\u6211\u5DF2\u7ECF\u6709\u4ED3\u5E93\u4E86\u300D\u586B\u5730\u5740',
    saved: '\u5DF2\u4FDD\u5B58',
    created: '\u5DF2\u521B\u5EFA\uFF0C\u70B9\u53F3\u4E0A\u89D2\u300C\u53D1\u5E03\u5230 GitHub\u300D\u5373\u53EF\u4E0A\u7EBF',
    authTitle: '\u8FDE\u63A5 GitHub',
    authHint: '\u4E00\u4E2A\u4EE4\u724C\u5C31\u591F\uFF1A\u65B0\u5EFA\u4ED3\u5E93\u3001\u8FDE\u63A5\u5DF2\u6709\u4ED3\u5E93\u3001\u53D1\u5E03\u4E0A\u7EBF\uFF0C\u5168\u90FD\u7528\u5B83\u3002',
    authClose: '\u5173\u95ED',
    authRetry: '\u91CD\u65B0\u68C0\u6D4B',
    authBtn: 'GitHub \u6388\u6743',
    authBarText: '\u8FD8\u6CA1\u8FDE\u4E0A GitHub\uFF1A\u65B0\u5EFA\u4ED3\u5E93\u3001\u8FDE\u63A5\u5DF2\u6709\u4ED3\u5E93\u3001\u53D1\u5E03\u4E0A\u7EBF\u90FD\u9700\u8981\u4E00\u6B21\u6388\u6743\u3002',
    authBarBtn: '\u73B0\u5728\u6388\u6743',
    authOk: function (login) { return login ? '\u5DF2\u6388\u6743\uFF1A' + login : '\u5DF2\u6388\u6743' },
    authUnknown: '\u672C\u673A\u5B58\u7740\u4EE4\u724C\uFF0C\u4F46\u73B0\u5728\u8FDE\u4E0D\u4E0A GitHub \u9A8C\u8BC1\uFF08\u68C0\u67E5\u7F51\u7EDC / \u52A0\u901F\u5668\uFF09\u3002',
    tokenLabel: '\u7C98\u8D34 GitHub \u4EE4\u724C\uFF08personal access token\uFF09\uFF0C\u53EA\u5B58\u5728\u672C\u673A',
    tokenPh: '\u7C98\u8D34\u4EE4\u724C\uFF0C\u4F8B\u5982 ghp_\u2026',
    tokenSave: '\u4FDD\u5B58\u5E76\u9A8C\u8BC1',
    tokenWhere: '\u83B7\u53D6\u6B65\u9AA4\uFF1Agithub.com \u2192 \u53F3\u4E0A\u89D2\u5934\u50CF \u2192 <b>Settings</b> \u2192 \u5DE6\u4FA7\u6700\u4E0B <b>Developer settings</b> \u2192 <b>Personal access tokens</b> \u2192 \u9009 <b>Tokens (classic)</b> \u2192 <b>Generate new token (classic)</b> \u2192 \u52FE\u9009 <b>repo</b> \u548C <b>workflow</b> \u2192 \u751F\u6210\u540E\u590D\u5236\u7C98\u8D34\u5230\u8FD9\u91CC\u3002<br><b>repo</b> \u8D1F\u8D23\u514B\u9686\u3001\u63A8\u9001\u3001\u5EFA\u4ED3\u5E93\u3001\u540C\u6B65\u7AD9\u540D\uFF1B<b>workflow</b> \u9996\u6B21\u5EFA\u7AD9\u65F6\u9700\u8981\u5F80\u4ED3\u5E93\u5199\u5165 .github/workflows/deploy.yml\uFF0C\u4E0D\u52FE\u4F1A\u88AB GitHub \u62D2\u7EDD\u63A8\u9001\u3002<br>\u26A0\uFE0F <b>\u6709\u6548\u671F\u8BF7\u9009\u300CNo expiration\u300D\uFF08\u6C38\u4E45\uFF09</b>\uFF1A\u4EE4\u724C\u4E00\u5230\u671F\uFF0C\u53D1\u5E03\u3001\u5EFA\u4ED3\u5E93\u3001\u81EA\u52A8\u5EFA\u7AD9\u90FD\u4F1A\u5931\u8D25\uFF0C\u8FD8\u5F97\u91CD\u65B0\u751F\u6210\u4E00\u4E2A\u518D\u6765\u7C98\u8D34\u3002\u9009\u6C38\u4E45\u7684\u5C31\u4E0D\u7528\u7BA1\u4E86\uFF08\u4EE4\u724C\u53EA\u5B58\u8FD9\u53F0\u7535\u8111\uFF0C\u4E0D\u4F1A\u4E0A\u4F20\uFF09\u3002',
    tokenClear: '\u6E05\u9664\u672C\u673A\u4FDD\u5B58\u7684\u4EE4\u724C',
    tokenCleared: '\u5DF2\u6E05\u9664\u672C\u673A\u4FDD\u5B58\u7684\u4EE4\u724C',
    checking: '\u68C0\u6D4B\u4E2D\u2026',
    authFound: '\u5DF2\u68C0\u6D4B\u5230 GitHub \u6388\u6743',
    authNotFound: '\u8FD8\u6CA1\u68C0\u6D4B\u5230\u6388\u6743',
    checkFail: '\u68C0\u6D4B\u5931\u8D25\uFF1A',
    publishFail: '\u53D1\u5E03\u5931\u8D25\uFF1A',
    publishErr: '\u6709\u6B65\u9AA4\u5931\u8D25',
    pushNetworkFail: '\u6CA1\u80FD\u63A8\u9001\u5230 GitHub\uFF08\u591A\u534A\u662F\u52A0\u901F\u5668\u6CA1\u5F00\u6216\u6389\u4E86\uFF09\u3002\u7B14\u8BB0\u5DF2\u5B89\u5168\u4FDD\u5B58\u5728\u672C\u5730\uFF0C\u5F00\u597D\u52A0\u901F\u5668\u540E\u91CD\u65B0\u70B9\u4E00\u6B21\u300C\u53D1\u5E03\u300D\u5373\u53EF\u3002',
    pushed: ' \xB7 \u5DF2\u63A8\u9001\uFF0C1~2 \u5206\u949F\u540E\u4E0A\u7EBF',
    logPublic: function (n, c, r) { return '\u516C\u5F00\u7B14\u8BB0 ' + n + ' \u7BC7\uFF1A\u65B0\u589E/\u66F4\u65B0 ' + c + '\uFF0C\u79FB\u9664\u8FC7\u671F ' + r },
    logSiteName: function (prev, want) { return '\u5DF2\u66F4\u65B0\u7F51\u9875\u6807\u9898\u7684\u7AD9\u540D\uFF1A' + (prev ? '\u300C' + prev + '\u300D\u2192 ' : '') + '\u300C' + want + '\u300D' },
    logFresh: '\u7EBF\u4E0A\u5DF2\u662F\u6700\u65B0\uFF0C\u65E0\u9700\u63A8\u9001',
    logPushed: '\u5DF2\u63A8\u9001 GitHub\uFF0CActions \u6784\u5EFA\u4E2D\uFF081~2 \u5206\u949F\u540E\u7F51\u7AD9\u81EA\u52A8\u66F4\u65B0\uFF09',
    logGitFail: 'git \u64CD\u4F5C\u5931\u8D25\uFF1A',
    logVarOk: function (name) { return '\u5DF2\u628A\u7AD9\u540D\u300C' + name + '\u300D\u5199\u5165\u4ED3\u5E93\u53D8\u91CF SITE_NAME\uFF08\u4E0B\u6B21\u6784\u5EFA\u751F\u6548\uFF09' },
    logVarNoToken: '\u7AD9\u540D\u540C\u6B65\u8DF3\u8FC7\uFF1A\u9700\u8981 GitHub \u6388\u6743\u624D\u80FD\u6539\u4ED3\u5E93\u53D8\u91CF\u3002\u53EF\u8BBE\u73AF\u5883\u53D8\u91CF GITHUB_TOKEN \u540E\u91CD\u8BD5\uFF0C\u6216\u7528 gh \u767B\u5F55\u3002',
    logVarBadRepo: '\u7AD9\u540D\u540C\u6B65\u8DF3\u8FC7\uFF1A\u4ED3\u5E93\u5730\u5740\u4E0D\u662F GitHub \u4ED3\u5E93',
    logVarFail: function (reason, detail) { return '\u7AD9\u540D\u540C\u6B65\u5931\u8D25\uFF08' + reason + '\uFF09\uFF1A' + (detail || '') },
    errNeedNameRepo: '\u540D\u79F0\u4E0E\u4ED3\u5E93\u5730\u5740\u5FC5\u586B',
    errNoConn: '\u8FDE\u63A5\u4E0D\u5B58\u5728',
    errNeedRepo: '\u8BF7\u586B\u5199 GitHub \u4ED3\u5E93\u5730\u5740',
    errBadVault: '\u8BF7\u9009\u62E9\u4E00\u4E2A\u6709\u6548\u7684\u5E93\uFF08\u9700\u5305\u542B .obsidian \u76EE\u5F55\uFF09',
    errPrepFail: '\u8FDE\u63A5\u5DF2\u4FDD\u5B58\uFF0C\u4F46\u4ED3\u5E93\u51C6\u5907\u5931\u8D25\uFF1A',
    errFirstConn: '\u8BF7\u5148\u521B\u5EFA\u4E00\u4E2A\u8FDE\u63A5\uFF0C\u518D\u8BBE\u7F6E\u672C\u5730\u5E93',
    errBadPath: '\u8DEF\u5F84\u65E0\u6548\uFF1A\u9700\u8981\u5305\u542B .obsidian \u76EE\u5F55\u7684\u5E93\u7EDD\u5BF9\u8DEF\u5F84',
    errEmptyName: '\u540D\u5B57\u4E0D\u80FD\u4E3A\u7A7A',
    errNoVault: '\u672C\u5730\u5E93\u672A\u914D\u7F6E',
    errBadVaultPath: '\u672C\u5730\u5E93\u8DEF\u5F84\u65E0\u6548',
    errWorkdirFail: '\u5DE5\u4F5C\u526F\u672C\u51C6\u5907\u5931\u8D25\uFF1A',
    errRepoUnreachable: '\u8FDE\u4E0D\u4E0A\u8FD9\u4E2A\u4ED3\u5E93\uFF08\u591A\u534A\u662F\u8FD8\u6CA1\u6388\u6743\u3001\u4ED3\u5E93\u4E0D\u5B58\u5728\uFF0C\u6216\u672C\u673A\u8FDE\u4E0D\u4E0A GitHub\uFF09\u3002',
    errCloneFail: '\u514B\u9686\u4ED3\u5E93\u5931\u8D25\uFF1A',
    errTokenShort: '\u4EE4\u724C\u592A\u77ED\uFF0C\u8BF7\u786E\u8BA4\u7C98\u8D34\u5B8C\u6574\uFF08\u4E0D\u542B\u7A7A\u683C\uFF09\u3002',
    errTokenRejected: 'GitHub \u62D2\u7EDD\u4E86\u8FD9\u4E2A\u4EE4\u724C\uFF08\u65E0\u6548\u3001\u5DF2\u64A4\u9500\u6216\u6743\u9650\u4E0D\u8DB3\uFF09\u3002',
    errTokenNetwork: '\u65E0\u6CD5\u8FDE\u5230 GitHub \u9A8C\u8BC1\u4EE4\u724C\uFF08\u68C0\u67E5\u672C\u673A\u7F51\u7EDC/\u52A0\u901F\u5668\uFF09\u3002',
    errNoActive: '\u6CA1\u6709\u6D3B\u52A8\u8FDE\u63A5',
    errNeedRepoName: '\u8BF7\u586B\u5199\u4ED3\u5E93\u540D',
    errBadRepoName: '\u4ED3\u5E93\u540D\u53EA\u80FD\u7528\u82F1\u6587\u5B57\u6BCD\u3001\u6570\u5B57\u3001\u70B9\u3001\u4E0B\u5212\u7EBF\u3001\u8FDE\u5B57\u7B26',
    errNoAuth: '\u8FD8\u6CA1\u6709 GitHub \u6388\u6743\u3002\u8BF7\u5148\u6309\u5F39\u7A97\u91CC\u7684\u8BF4\u660E\u5B8C\u6210\u6388\u6743\u3002',
    errRepoExists: function (name) { return '\u4ED3\u5E93\u300C' + name + '\u300D\u5DF2\u7ECF\u5B58\u5728\u4E86\u3002\u8BF7\u6362\u4E00\u4E2A\u540D\u5B57\uFF0C\u6216\u5207\u5230\u300C\u6211\u5DF2\u7ECF\u6709\u4ED3\u5E93\u4E86\u300D\u76F4\u63A5\u586B\u5B83\u7684\u5730\u5740\u3002' },
    errCreateRejected: 'GitHub \u62D2\u7EDD\u4E86\u8FD9\u6B21\u521B\u5EFA\uFF1A',
    errCheckScope: '\u8BF7\u68C0\u67E5\u4EE4\u724C\u662F\u5426\u6709 repo \u6743\u9650',
    errBadAuth: 'GitHub \u6388\u6743\u65E0\u6548\u6216\u6743\u9650\u4E0D\u8DB3\uFF08\u9700\u8981 repo \u6743\u9650\uFF09\u3002\u8BF7\u91CD\u65B0\u6388\u6743\u540E\u91CD\u8BD5\u3002',
    errCreateFail: function (status) { return '\u521B\u5EFA\u5931\u8D25\uFF08HTTP ' + status + '\uFF09\uFF1A' },
    errConnectFail: '\u8FDE\u63A5 GitHub \u5931\u8D25\uFF1A',
    errNoDir: '\u76EE\u5F55\u5DF2\u5B58\u5728\u4E14\u4E0D\u662F git \u4ED3\u5E93\uFF1A',
    errGitFail: function (cmd) { return 'git ' + cmd + ' \u5931\u8D25' },
    errPathEscaped: '\u8DEF\u5F84\u8D8A\u754C',
    errForbidden: '\u62D2\u7EDD\u8BBF\u95EE\uFF1A\u53EA\u63A5\u53D7\u672C\u673A\u9875\u9762\u7684\u8BF7\u6C42',
    errPublishing: '\u6B63\u5728\u53D1\u5E03\u4E2D\uFF0C\u8BF7\u7B49\u8FD9\u6B21\u7ED3\u675F\u518D\u8BD5',
    ok: '\u5B8C\u6210',
  },
  en: {
    appTitle: 'Publish Manager',
    publishBtn: '\u27F3 Publish to GitHub',
    srcBtn: '\u2B06 Update source',
    updatingSrc: 'Updating source\u2026',
    srcSynced: 'Site source updated',
    srcUpdateFail: 'Failed to update source: ',
    publishing: 'Publishing\u2026',
    publishDone: 'Done',
    liveBuilding: function (s) { return 'Pushed. GitHub is building and deploying\u2026 ' + s + 's elapsed' },
    liveOk: function (s) { return 'Live (took ' + s + 's)' },
    liveTimeout: 'Still not live after 4 minutes \u2014 the build may have failed. Check the Actions tab of the GitHub repo.',
    liveOpen: 'Open live site',
    toastResultTitle: 'Result',
    toastClose: 'Dismiss',
    toastDetail: 'Details',
    toastPublishTitle: 'Publish to GitHub',
    toastSourceTitle: 'Update site source',
    toastThemeTitle: 'Save custom appearance',
    toastStarting: 'Preparing\u2026',
    toastPushed: 'Pushed \u2014 waiting for the GitHub build to go live',
    toastNothingToPush: 'Nothing new to push (the site is already up to date)',
    toastDone: 'Done',
    toastFailed: 'Failed',
    toastPublishOk: 'Published',
    toastSourceOk: 'Source updated',
    toastThemeOk: 'Appearance saved and pushed',
    toastThemeSavedOnly: 'Appearance saved to the repo (not pushed yet)',
    vaultSettings: 'Settings',
    themeBtn: 'Appearance',
    themeTitle: 'Custom appearance',
    // \u226450 characters in total for the panel copy; details live in the guide dialog
    themeIntro: 'Paste CSS: colors & layout; empty = default.',
    themeDefault: 'Default',
    themeDefaultDesc: 'Built-in: blue on white, three-column card home',
    themePresetCustom: 'Custom',
    themePresetApplied: function (name) { return 'Filled in \u201C' + name + '\u201D \u2014 remember to save' },
    themeGuideBtn: 'How to write',
    themeGuideTitle: 'How to write a custom theme',
    themeGuideIntro: 'These are the variables you can override and the regions you can target \u2014 copy, then change the numbers.',
    themeGuideVars: 'Colors and radius: override the variables under :root; dark mode goes under html.dark.',
    themeGuideHook: 'Layout: these regions all carry data-region \u2014 reshape columns, spacing, colors.',
    themeGuideNote: 'Site width is controlled centrally (--content-w) \u2014 do not set max-width in a theme; the outline panel is a floating widget, leave its position alone.',
    themeGuideFont: 'To follow the font-size slider, size text with var(--fsu).',
    themeGuideInsert: 'Insert into editor',
    themePlaceholder: '/* e.g. switch the accent to forest green and use a serif body font */\\n:root {\\n  --primary: oklch(0.48 0.11 155);\\n}\\n\\n[data-region="article"] {\\n  font-family: Georgia, serif;\\n}',
    themeEmpty: 'No custom appearance yet (using the default theme)',
    themeChars: function (n, max) { return n + ' / ' + max + ' characters' },
    themeSave: 'Save',
    themeSavePublish: 'Save and publish',
    themeSaving: 'Saving\u2026',
    themePublishing: 'Saving and pushing\u2026',
    themeSaved: 'Saved to the repo (not live yet \u2014 use \u201CSave and publish\u201D or \u201CUpdate source\u201D to apply it)',
    themeSaveFail: 'Save failed: ',
    themePublishFail: 'Publish failed: ',
    themeCleared: 'Custom appearance cleared (back to the default theme)',
    themeLoading: 'Loading\u2026',
    themeLoadFail: 'Load failed: ',
    themeClear: 'Clear',
    searchPh: 'Search note title / path\u2026',
    expandAll: 'Expand all',
    collapseAll: 'Collapse all',
    pubAll: 'Publish all',
    privAll: 'Make all private',
    pubAllMini: 'Public',
    privAllMini: 'Private',
    noConn: 'No connections yet \u2014 create one on the right',
    current: 'Current',
    noVault: 'No local vault',
    vaultMeta: function (n, p) { return n + (n === 1 ? ' note \xB7 ' : ' notes \xB7 ') + p + ' public' },
    vaultMetaHtml: function (n, p) { return n + (n === 1 ? ' note \xB7 ' : ' notes \xB7 ') + '<b>' + p + ' public</b>' },
    openSite: '\u2197 Open site',
    remove: 'Remove',
    removeTip: 'Removes from this list only \u2014 your GitHub repo and local vault are untouched',
    removeConfirm: function (name) { return 'Remove the connection "' + name + '"?\\n\\n\xB7 The GitHub repo is NOT deleted\\n\xB7 Your local Obsidian vault is NOT modified\\n\xB7 You can add it again later' },
    removeFail: 'Remove failed: ',
    switchFail: 'Switch failed: ',
    uncategorized: 'Ungrouped',
    countNotes: function (n) { return n + (n === 1 ? ' note' : ' notes') },
    pub: 'Public',
    pri: 'Private',
    toggleFail: 'Toggle failed: ',
    pendingPrompt: function (n) { return n + (n === 1 ? ' change' : ' changes') + ' not published yet \u2014 click Publish' },
    chgAdded: 'New',
    chgModified: 'Modified',
    chgDeleted: 'Deleted',
    chgTitle: 'Changes',
    chgNone: 'No pending changes',
    chgCount: function (n) { return n + ' pending' },
    chgJumpTip: 'Click to jump to this note in the folders below',
    chgTipAdded: 'New: not published yet. With auto-sync on, these are published and leave this column by themselves',
    chgTipModified: 'Modified: not published yet. With auto-sync on, these are published and leave this column by themselves',
    chgTipDeleted: 'Deleted: not synced to the site yet. With auto-sync on, these are synced and leave this column by themselves',
    autoSyncTitle: 'Auto-sync',
    autoSyncAdded: 'New',
    autoSyncModified: 'Modified',
    autoSyncDeleted: 'Deleted',
    autoSyncHint: 'Checked types are published automatically \u2014 no need to click Publish.',
    autoSyncTipAdded: 'New notes are made public and published automatically',
    autoSyncTipModified: 'Edits to published notes go live automatically (public stays public, private stays private)',
    autoSyncTipDeleted: 'Local deletes or unpublishing also remove them from the site',
    autoSyncSaved: 'Auto-sync settings saved',
    autoSyncFail: 'Save failed: ',
    autoLogTitle: 'Auto-sync log',
    autoLogClear: 'Clear',
    autoLogStartTip: 'When the push started',
    autoLogPushing: 'Pushing',
    autoLogPushed: 'Pushed, building',
    autoLogPushedAt: function (s) { return 'Pushed ' + s + ', building' },
    autoLogLive: function (s) { return 'Updated ' + s },
    autoLogTook: function (s) { return ' (' + s + ')' },
    autoLogFailed: 'Push failed',
    autoLogInterrupted: 'Push interrupted (manager exited) \u2014 result unknown',
    autoLogFresh: 'Ran, nothing to push',
    autoLogBuildFailed: 'Build failed',
    autoLogTimeout: 'Build timed out',
    autoLogOpenActions: 'Click to open GitHub Actions',
    autoLogMore: function (n) { return ' +' + n + ' more' },
    autoLogFileAdded: 'added',
    autoLogFileModified: 'modified',
    autoLogFileDeleted: 'deleted',
    noChanges: 'Nothing to sync',
    pending: function (n) { return n + (n === 1 ? ' change pending' : ' changes pending') },
    emptyNoConn: 'No blog connections yet \u2014 click \u201C\uFF0B New blog\u201D above.',
    emptyNoNotes: 'No notes in this vault, or the local vault path is wrong. Click the current blog card above to change it.',
    loadFail: 'Load failed: ',
    detail: 'Details',
    save: 'Save',
    create: 'Create & start',
    cancel: 'Cancel',
    vaultTip: 'Vault: ',
    vaultNone: '(not set)',
    setupTitleEdit: 'Blog settings',
    setupTitleNew: 'New blog',
    setupHint: 'One local vault maps to one GitHub repo. Pick the vault, then finish GitHub below in one click.',
    step1: '\u2460 Local vault folder',
    chooseFolder: 'Choose folder\u2026',
    pickPlaceholder: 'Click the button to choose a folder',
    step2: '\u2461 Name (shown here, and as the site title)',
    namePlaceholder: 'e.g. My Blog',
    step3: '\u2462 GitHub repo (the site is published from here)',
    repoLocked: 'The repo URL is fixed once set \u2014 remove this connection and create a new one to switch repos.',
    tabAuto: 'Create a repo for me',
    tabManual: 'I already have a repo',
    repoPlaceholder: 'https://github.com/your-username/repo-name.git',
    repoTip: 'Just paste the repo URL. An empty repo works best (created on GitHub, nothing in it yet).',
    repoNamePlaceholder: 'Repo name (letters/numbers), e.g. my-blog',
    createOnGitHub: 'Create on GitHub',
    goAuthorize: 'Authorize GitHub\u2026',
    needRepoName: 'Enter a repo name first',
    creating: 'Creating\u2026',
    createOk: 'Repo created on GitHub: ',
    createFail: 'Create failed: ',
    tokenReady: '\u2713 GitHub authorization detected \u2014 you can create directly',
    tokenMissing: 'No GitHub authorization yet. Click \u201CAuthorize GitHub\u2026\u201D for the one-time setup.',
    pickOk: '\u2713 Selected: ',
    pickWait: 'Choose a folder in the dialog\u2026',
    pickTimeout: 'No folder was chosen. If the dialog is hidden behind the browser, close the browser window or press Alt+Tab to find it, then try again.',
    pickFail: 'Pick failed: ',
    mustPickVault: 'Choose a local vault folder first',
    mustFillRepo: 'Enter the GitHub repo URL',
    mustCreateRepo: 'Create it under \u201CCreate a repo for me\u201D first, or switch to \u201CI already have a repo\u201D',
    saved: 'Saved',
    created: 'Created \u2014 click \u201CPublish to GitHub\u201D in the top-right to go live',
    authTitle: 'Connect to GitHub',
    authHint: 'One token is enough: creating a repo, connecting an existing one, and publishing all use it.',
    authClose: 'Close',
    authRetry: 'Check again',
    authBtn: 'GitHub access',
    authBarText: 'Not connected to GitHub yet: creating a repo, connecting one, and publishing all need a one-time authorization.',
    authBarBtn: 'Authorize now',
    authOk: function (login) { return login ? 'Authorized: ' + login : 'Authorized' },
    authUnknown: 'A token is saved here, but GitHub can\u2019t be reached to verify it right now (check network / accelerator).',
    tokenLabel: 'Paste a GitHub personal access token \u2014 it is stored on this machine only',
    tokenPh: 'Paste token, e.g. ghp_\u2026',
    tokenSave: 'Save & verify',
    tokenWhere: 'Steps: github.com \u2192 avatar (top right) \u2192 <b>Settings</b> \u2192 <b>Developer settings</b> (bottom of the left sidebar) \u2192 <b>Personal access tokens</b> \u2192 choose <b>Tokens (classic)</b> \u2192 <b>Generate new token (classic)</b> \u2192 check <b>repo</b> and <b>workflow</b> \u2192 copy the token and paste it here.<br><b>repo</b> covers cloning, pushing, creating repos and syncing the site name; <b>workflow</b> is needed when setting up a new site, because the first push writes .github/workflows/deploy.yml and GitHub rejects it without that scope.<br>\u26A0\uFE0F Set <b>Expiration to \u201CNo expiration\u201D</b>: once the token expires, publishing, creating repos and automatic site setup all fail until you generate a new one and paste it here again. Choose no expiration and you never have to think about it (the token is stored on this machine only and is never uploaded).',
    tokenClear: 'Clear the saved token',
    tokenCleared: 'Cleared the saved token',
    checking: 'Checking\u2026',
    authFound: 'GitHub authorization detected',
    authNotFound: 'No authorization detected',
    checkFail: 'Check failed: ',
    publishFail: 'Publish failed: ',
    publishErr: 'Some steps failed',
    pushNetworkFail: "Couldn't reach GitHub (the accelerator is probably off or dropped). Your notes are safe on this machine \u2014 turn the accelerator back on and hit Publish again.",
    pushed: ' \xB7 Pushed \u2014 live in 1~2 minutes',
    logPublic: function (n, c, r) { return n + (n === 1 ? ' public note: ' : ' public notes: ') + c + ' added/updated, ' + r + ' stale removed' },
    logSiteName: function (prev, want) { return 'Site title updated: ' + (prev ? '"' + prev + '" \u2192 ' : '') + '"' + want + '"' },
    logFresh: 'Already up to date \u2014 nothing to push',
    logPushed: 'Pushed to GitHub \u2014 Actions is building (the site updates in 1~2 minutes)',
    logGitFail: 'git failed: ',
    logVarOk: function (name) { return 'Set the site title "' + name + '" as the repo variable SITE_NAME (applies on next build)' },
    logVarNoToken: 'Site title sync skipped: changing repo variables needs GitHub authorization. Set GITHUB_TOKEN and retry, or log in with gh.',
    logVarBadRepo: 'Site title sync skipped: this repo is not on GitHub',
    logVarFail: function (reason, detail) { return 'Site title sync failed (' + reason + '): ' + (detail || '') },
    errNeedNameRepo: 'Name and repo URL are required',
    errNoConn: 'Connection not found',
    errNeedRepo: 'Enter the GitHub repo URL',
    errBadVault: 'Pick a valid vault (it must contain a .obsidian folder)',
    errPrepFail: 'Connection saved, but preparing the repo failed: ',
    errFirstConn: 'Create a connection before setting a vault',
    errBadPath: 'Invalid path: needs an absolute vault path containing a .obsidian folder',
    errEmptyName: 'Name cannot be empty',
    errNoVault: 'No local vault configured',
    errBadVaultPath: 'Invalid local vault path',
    errWorkdirFail: 'Failed to prepare the working copy: ',
    errRepoUnreachable: 'Cannot reach that repo \u2014 most likely GitHub is not authorized yet, the repo does not exist, or this machine cannot reach GitHub.',
    errCloneFail: 'Cloning the repo failed: ',
    errTokenShort: 'The token looks too short. Paste it in full, without spaces.',
    errTokenRejected: 'GitHub rejected this token (invalid, revoked, or missing scope).',
    errTokenNetwork: 'Could not reach GitHub to verify the token (check your network / accelerator).',
    errNoActive: 'No active connection',
    errNeedRepoName: 'Enter a repo name',
    errBadRepoName: 'Repo names allow only letters, digits, dot, underscore and hyphen',
    errNoAuth: 'No GitHub authorization yet. Follow the instructions in the dialog first.',
    errRepoExists: function (name) { return 'The repo "' + name + '" already exists. Pick another name, or paste its URL under \u201CI already have a repo\u201D.' },
    errCreateRejected: 'GitHub rejected the request: ',
    errCheckScope: 'Check that your token has the repo scope',
    errBadAuth: 'GitHub authorization is invalid or lacks the repo scope. Re-authorize and retry.',
    errCreateFail: function (status) { return 'Create failed (HTTP ' + status + '): ' },
    errConnectFail: 'Could not reach GitHub: ',
    errNoDir: 'Directory exists but is not a git repo: ',
    errGitFail: function (cmd) { return 'git ' + cmd + ' failed' },
    errPathEscaped: 'Path escapes the vault',
    errForbidden: 'Forbidden: only local pages may send requests',
    errPublishing: 'A publish is already running. Please wait for it to finish.',
    ok: 'Done',
  },
};
function guessLang() {
  const nav = (navigator.languages && navigator.languages[0]) || navigator.language || 'zh';
  return /^zh/i.test(nav) ? 'zh' : 'en';
}
/**
 * \u754C\u9762\u8BED\u8A00\u3002
 *
 * \u63D2\u4EF6\u91CC\uFF08?embed=1\uFF09\u7531 Obsidian \u51B3\u5B9A\uFF1A\u5BBF\u4E3B\u628A\u8BED\u8A00\u5F53\u67E5\u8BE2\u53C2\u6570\u4F20\u8FDB\u6765\uFF0C
 * \u4E4B\u540E\u4E3B\u9898/\u8BED\u8A00\u4E00\u53D8\u8FD8\u4F1A postMessage \u901A\u77E5\uFF0C\u6240\u4EE5**\u4E0D\u518D\u6709\u8BED\u8A00\u5207\u6362\u6309\u94AE**\u3002
 * \u547D\u4EE4\u884C\u7248\uFF08\u76F4\u63A5\u7528\u6D4F\u89C8\u5668\u5F00 127.0.0.1:3457\uFF09\u6CA1\u6709\u5BBF\u4E3B\uFF0C\u53EA\u80FD\u6309\u6D4F\u89C8\u5668\u8BED\u8A00\u731C\u4E00\u6B21\u3002
 *
 * \u7528\u6237\u7684\u8981\u6C42\uFF1A\u53EA\u6709\u4E2D\u82F1\u4E24\u79CD\u3002Obsidian \u662F\u7B80\u4F53/\u7E41\u4F53\u4E2D\u6587 \u2192 \u7BA1\u7406\u5668\u7528\u4E2D\u6587\uFF0C
 * \u5176\u5B83\u8BED\u8A00\u4E00\u5F8B\u7528\u82F1\u6587\u3002
 */
function langFromParam() {
  try {
    const v = (new URLSearchParams(location.search).get('lang') || '').toLowerCase();
    if (!v) return null;
    return /^zh/.test(v) ? 'zh' : 'en';
  } catch (e) { return null; }
}
function currentLang() {
  const fromHost = langFromParam();
  if (fromHost) return fromHost;
  try { return localStorage.getItem('manager-lang') || guessLang(); } catch (e) { return guessLang(); }
}
let LANG = currentLang();
function t(key) {
  const d = DICT[LANG] || DICT.zh;
  const v = d[key];
  return typeof v === 'function' ? v : (v || (DICT.zh[key] && typeof DICT.zh[key] === 'function' ? key : v) || key);
}
// tf \u53EA\u652F\u6301\u4E24\u4E2A\u53C2\u6570\uFF0C\u65E9\u671F\u591F\u7528\uFF1B\u540E\u6765 logPublic \u9700\u8981\u4E09\u4E2A\uFF08\u516C\u5F00\u6570/\u65B0\u589E\u6570/\u79FB\u9664\u6570\uFF09\uFF0C
// \u591A\u4F20\u7684\u90A3\u4E2A\u53C2\u6570\u88AB\u9759\u9ED8\u4E22\u6389\uFF0C\u65E5\u5FD7\u91CC\u51FA\u73B0 "undefined stale removed"\u3002\u6539\u6210\u53D8\u957F\u53C2\u6570\u3002
function tf(key, ...args) {
  const d = DICT[LANG] || DICT.zh;
  const v = d[key];
  return typeof v === 'function' ? v(...args) : v;
}
function applyLang() {
  document.title = t('appTitle');
  document.documentElement.setAttribute('lang', LANG === 'zh' ? 'zh-CN' : 'en');
  document.querySelectorAll('[data-i18n]').forEach(function (el) { el.textContent = t(el.getAttribute('data-i18n')); });
  document.querySelectorAll('[data-i18n-title]').forEach(function (el) { el.title = t(el.getAttribute('data-i18n-title')); });
  document.querySelectorAll('[data-i18n-aria]').forEach(function (el) { el.setAttribute('aria-label', t(el.getAttribute('data-i18n-aria'))); });
  document.querySelectorAll('[data-i18n-ph]').forEach(function (el) { el.placeholder = t(el.getAttribute('data-i18n-ph')); });
  // \u5E26 HTML \u6807\u7B7E\u7684\u6587\u6848\uFF08\u6388\u6743\u6307\u5F15\u91CC\u6709 b / br\uFF09\uFF0C\u53EA\u80FD\u8D70 innerHTML
  document.querySelectorAll('[data-i18n-html]').forEach(function (el) { el.innerHTML = t(el.getAttribute('data-i18n-html')); });
}
/**
 * \u5BBF\u4E3B\uFF08Obsidian \u63D2\u4EF6\uFF09\u6539\u4E86\u8BED\u8A00/\u4E3B\u9898\u65F6\u8C03\u8FD9\u91CC\u3002
 *
 * \u63D2\u4EF6\u90A3\u8FB9\u628A lang / theme \u7528 postMessage \u9001\u8FDB\u6765\uFF0C\u907F\u514D\u5237\u65B0\u6574\u4E2A iframe
 * \uFF08\u5237\u65B0\u4F1A\u4E22\u6389\u6B63\u5728\u8F93\u5165\u7684\u5185\u5BB9\u3001\u6B63\u5728\u6EDA\u52A8\u7684\u6D41\u6C34\u4F4D\u7F6E\uFF09\u3002
 * \u6CE8\u610F\uFF1A\u672C\u6587\u4EF6\u6574\u4F53\u662F\u4E00\u4E2A\u6A21\u677F\u5B57\u9762\u91CF\uFF0C\u6CE8\u91CA\u91CC\u4E0D\u80FD\u51FA\u73B0\u53CD\u5F15\u53F7\u3002
 */
function applyHostSettings(msg) {
  let changed = false;
  if (msg && typeof msg.lang === 'string') {
    const next = /^zh/i.test(msg.lang) ? 'zh' : 'en';
    if (next !== LANG) { LANG = next; applyLang(); changed = true; }
  }
  if (msg && typeof msg.theme === 'string') applyTheme(msg.theme === 'dark' ? 'dark' : 'light');
  if (changed) {
    try { renderVaults(); renderChanges(); renderFolders(); syncAutoSyncUI(); } catch (e) { /* \u8FD8\u6CA1\u52A0\u8F7D\u5B8C\u5C31\u8DF3\u8FC7 */ }
    try { refreshDlgsAfterLang(); } catch (e) { /* \u6CA1\u5F39\u7A97\u5C31\u7B97\u4E86 */ }
  }
}
window.addEventListener('message', function (ev) {
  // \u53EA\u8BA4\u540C\u6E90\u6D88\u606F\uFF1Aiframe \u91CC origin \u662F 127.0.0.1\uFF0C\u522B\u7684\u9875\u9762\u53D1\u4E0D\u8FDB\u6765
  if (ev && ev.data && typeof ev.data === 'object' && ev.data.__blogPublisher === true) {
    applyHostSettings(ev.data);
  }
});

// \u8BED\u8A00\u5207\u6362\u540E\u628A\u5DF2\u6253\u5F00\u7684\u5F39\u7A97\u539F\u6837\u91CD\u5F00\uFF08\u5185\u5BB9\u662F\u95ED\u5305\uFF0C\u5916\u90E8\u62FF\u4E0D\u5230\uFF0C\u53EA\u80FD\u91CD\u5EFA\uFF09
function refreshDlgsAfterLang() {
  const sd = document.getElementById('setupDlg');
  if (sd) {
    const nm = document.getElementById('sName') ? document.getElementById('sName').value : '';
    const rv = document.getElementById('sRepo') ? document.getElementById('sRepo').value
      : (document.getElementById('sRepoName') ? document.getElementById('sRepoName').value : '');
    openSetup(setupConn, true);
    if (document.getElementById('sName') && nm) document.getElementById('sName').value = nm;
    if (document.getElementById('sRepo') && rv) {
      document.getElementById('sRepo').value = rv;
      document.getElementById('sRepo').dispatchEvent(new Event('input'));
    }
    if (document.getElementById('sRepoName') && rv) document.getElementById('sRepoName').value = rv;
    if (setupShowPick) setupShowPick(setupPicked);
  }
  const ad = document.getElementById('authDlg');
  if (ad) { ad.remove(); if (authHelpReopen) authHelpReopen(); }
  const ad2 = document.getElementById('authMainDlg');
  if (ad2) {
    const tv = ad2.querySelector('#tokenIn') ? ad2.querySelector('#tokenIn').value : '';
    ad2.remove();
    if (authDialogReopen) {
      authDialogReopen();
      const ni = document.getElementById('authMainDlg');
      if (ni && tv) ni.querySelector('#tokenIn').value = tv;
    }
  }
  // \u5916\u89C2\u5F39\u7A97\uFF1A\u91CD\u5F00\u4F1A\u628A\u300C\u6B63\u5728\u7F16\u8F91\u4F46\u8FD8\u6CA1\u4FDD\u5B58\u7684 CSS\u300D\u4E22\u6389\uFF0C\u8FD9\u91CC\u5148\u5B58\u4E0B\u6765\u518D\u586B\u56DE\u53BB\u3002
  // \u4E0D\u8FD9\u4E48\u505A\u7684\u8BDD\uFF0C\u5207\u4E00\u6B21\u754C\u9762\u8BED\u8A00\u5C31\u7B49\u4E8E\u628A\u7528\u6237\u7C98\u7684\u4E00\u5927\u6BB5\u6837\u5F0F\u6E05\u7A7A \u2014\u2014 \u5F88\u96BE\u53D7\u3002
  const td = document.getElementById('themeDlg');
  if (td) {
    const tcss = td.querySelector('#themeCss') ? td.querySelector('#themeCss').value : '';
    td.remove();
    if (themeReopen) {
      themeReopen(true);
      const ni = document.getElementById('themeCss');
      if (ni && tcss) { ni.value = tcss; ni.dispatchEvent(new Event('input')); }
    }
  }
  // \u5199\u4F5C\u6307\u5357\u662F\u53EA\u8BFB\u7684\u8BF4\u660E\u5F39\u7A97\uFF0C\u5207\u8BED\u8A00\u65F6\u76F4\u63A5\u5173\u6389\u5373\u53EF \u2014\u2014 \u7528\u6237\u518D\u70B9\u4E00\u6B21\u6309\u94AE
  // \u5C31\u662F\u65B0\u8BED\u8A00\u7684\u5185\u5BB9\uFF0C\u6CA1\u5FC5\u8981\u8D39\u52B2\u4FDD\u4F4F\u5B83\u7684\u6EDA\u52A8\u4F4D\u7F6E\u3002
  const gd = document.getElementById('themeGuideDlg');
  if (gd) gd.remove();
}

// ---- \u660E\u6697\u4E3B\u9898 ----
// \u63D2\u4EF6\u91CC\u7531 Obsidian \u51B3\u5B9A\uFF08\u5BBF\u4E3B postMessage \u9001 dark/light\uFF09\uFF0C\u6CA1\u6709\u5207\u6362\u6309\u94AE\u3002
// \u547D\u4EE4\u884C\u7248\u6CA1\u6709\u5BBF\u4E3B\uFF0C\u9000\u56DE\u8DDF\u968F\u7CFB\u7EDF\uFF08prefers-color-scheme\uFF09\u3002
// data-theme \u5FC5\u987B\u5728\u9996\u5E27\u524D\u8BBE\u597D\uFF0C\u5426\u5219\u4F1A\u4EAE\u2192\u6697\u95EA\u4E00\u4E0B\u3002
function applyTheme(mode) {
  const root = document.documentElement;
  if (mode === 'dark' || mode === 'light') root.setAttribute('data-theme', mode);
  else root.removeAttribute('data-theme');
}
function themeFromParam() {
  try {
    const v = (new URLSearchParams(location.search).get('theme') || '').toLowerCase();
    return v === 'dark' || v === 'light' ? v : null;
  } catch (e) { return null; }
}
applyTheme(themeFromParam());

// \u7EDF\u4E00\u8BF7\u6C42\uFF1A\u6709 body \u8D70 POST\uFF0C\u65E0 body \u8D70 GET\u3002
// \u26A0\uFE0F \u4F46\u670D\u52A1\u7AEF\u591A\u6570\u5199\u63A5\u53E3\uFF08/api/publish\u3001/api/toggle\u2026\uFF09**\u53EA\u8BA4 POST**\uFF0C
// \u56E0\u6B64\u8FD9\u91CC\u663E\u5F0F\u4F20 method\uFF0C\u907F\u514D"\u65E0 body \u5C31\u9000\u5316\u6210 GET \u2192 404"\u3002
async function api(path, body, method) {
  const m = method || (body !== undefined ? 'POST' : 'GET');
  const init = { method: m, headers: { 'x-lang': LANG } };
  if (body !== undefined) {
    init.headers['content-type'] = 'application/json';
    init.body = JSON.stringify(body);
  }
  const r = await fetch(path, init);
  if (!r.ok) {
    const j = await r.json().catch(() => ({}));
    const err = new Error(j.error || r.status);
    // \u670D\u52A1\u7AEF\u7528\u7ED3\u6784\u5316\u5B57\u6BB5\u6807\u6CE8\u300C\u8FD9\u662F\u6388\u6743\u95EE\u9898\u300D\uFF0C\u5BA2\u6237\u7AEF\u636E\u6B64\u5F39\u6388\u6743\u7A97\uFF0C
    // \u800C\u4E0D\u662F\u9760\u9519\u8BEF\u6587\u6848\u91CC\u6709\u6CA1\u6709\u300C\u6388\u6743\u300D\u4E24\u4E2A\u5B57\uFF08\u6362\u8BED\u8A00\u5C31\u5931\u6548\uFF09\u3002
    err.needAuth = !!j.needAuth;
    throw err;
  }
  return r.json();
}

// ---- GitHub \u6388\u6743\uFF08\u5168\u5C40\u5165\u53E3\uFF0C\u4E0D\u85CF\u5728\u67D0\u4E2A\u5F39\u7A97\u91CC\uFF09----
// \u65B0\u673A\u5668\u4E0A\u6CA1\u6709 GitHub \u6388\u6743\u65F6\uFF0Cclone/push \u4F1A\u5931\u8D25\uFF1B\u4EE5\u524D\u53EA\u80FD\u5728\u5EFA\u4ED3\u5E93\u5F39\u7A97\u91CC\u770B\u5230\u6307\u5F15\uFF0C
// \u7528\u6237\u6839\u672C\u4E0D\u77E5\u9053\u90A3\u6B21\u5931\u8D25\u8DDF\u6388\u6743\u6709\u5173\u3002\u8FD9\u91CC\u7ED9\u4E00\u4E2A\u5E38\u9A7B\u6309\u94AE + \u63D0\u793A\u6761 + \u4EE4\u724C\u8F93\u5165\u6846\u3002
let AUTH = { token: false, login: null, reachable: null };
async function refreshAuth() {
  try {
    const r = await api('/api/auth/status');
    AUTH = { token: !!r.token, login: r.login || null, reachable: r.reachable };
  } catch (e) {
    AUTH = { token: false, login: null, reachable: false };
  }
  updateAuthBar();
  return AUTH;
}
function updateAuthBar() {
  const bar = document.getElementById('authBar');
  if (!bar) return;
  // \u5DF2\u6709\u53EF\u7528\u6388\u6743\u5C31\u6536\u8D77\u63D0\u793A\u6761\uFF1B\u8FDE\u4E0D\u4E0A GitHub\uFF08reachable===false\uFF09\u4E5F\u63D0\u793A\uFF0C
  // \u56E0\u4E3A\u90A3\u6B63\u662F\u7528\u6237\u6700\u9700\u8981\u77E5\u9053\u7684\u72B6\u6001\uFF08\u591A\u534A\u662F\u52A0\u901F\u5668\u6CA1\u5F00\uFF09\u3002
  const ok = AUTH.token && AUTH.reachable !== false;
  bar.classList.toggle('hidden', ok);
}
function openAuthDialog() {
  authDialogReopen = openAuthDialog;
  const old = document.getElementById('authMainDlg');
  if (old) old.remove();
  const d = document.createElement('div');
  d.className = 'dialog'; d.id = 'authMainDlg';
  d.innerHTML =
    '<div class="panel">' +
      '<h2 data-i18n="authTitle"></h2>' +
      '<div class="hint" id="authState"></div>' +
      '<div class="field">' +
        '<label data-i18n="tokenLabel"></label>' +
        '<div class="tokenrow">' +
          '<input id="tokenIn" type="password" autocomplete="off" spellcheck="false" data-i18n-ph="tokenPh">' +
          '<button id="tokenSave" data-i18n="tokenSave"></button>' +
        '</div>' +
        '<div class="hint" style="margin:8px 0 0" data-i18n-html="tokenWhere"></div>' +
        '<div id="tokenMsg"></div>' +
      '</div>' +
      '<div class="actions">' +
        (AUTH.token ? '<button class="ghost" id="authClear" data-i18n="tokenClear"></button>' : '') +
        '<button class="ghost" id="authClose" data-i18n="authClose"></button>' +
        '<button id="authRetry" data-i18n="authRetry"></button>' +
      '</div>' +
    '</div>';
  document.body.appendChild(d);
  applyLang();
  paintAuthState(d);
  d.querySelector('#authClose').onclick = () => d.remove();
  d.onclick = (e) => { if (e.target === d) d.remove(); };
  const clearBtn = d.querySelector('#authClear');
  if (clearBtn) clearBtn.onclick = async () => {
    try {
      await api('/api/auth/token', { token: '' }, 'POST');
      AUTH = { token: false, login: null, reachable: null };
      d.remove();
      await refreshAuth();
      openAuthDialog();
    } catch (e) { showTokenMsg(d, 'err', e.message); }
  };
  d.querySelector('#tokenSave').onclick = async () => {
    const inp = d.querySelector('#tokenIn');
    const val = (inp.value || '').trim();
    if (!val) { showTokenMsg(d, 'err', t('errTokenShort')); return; }
    const btn = d.querySelector('#tokenSave');
    btn.disabled = true; const oldLabel = btn.textContent; btn.textContent = t('checking');
    try {
      const r = await api('/api/auth/token', { token: val }, 'POST');
      inp.value = '';
      await refreshAuth();
      d.remove();
      setResult('ok', tf('authOk', r.login));
      openAuthDialog();
    } catch (e) {
      showTokenMsg(d, 'err', e.message);
    } finally {
      const b2 = d.querySelector('#tokenSave');
      if (b2) { b2.disabled = false; b2.textContent = oldLabel; }
    }
  };
  d.querySelector('#authRetry').onclick = async () => {
    const b = d.querySelector('#authRetry');
    b.disabled = true; b.textContent = t('checking');
    await refreshAuth();
    b.disabled = false; b.textContent = t('authRetry');
    paintAuthState(d);
  };
}
function paintAuthState(d) {
  const el = d.querySelector('#authState');
  if (!el) return;
  if (AUTH.token && AUTH.reachable !== false) el.textContent = tf('authOk', AUTH.login);
  else if (AUTH.token) el.textContent = t('authUnknown');
  else el.textContent = t('authNotFound');
}
function showTokenMsg(d, kind, text) {
  const box = d.querySelector('#tokenMsg');
  if (!box) return;
  box.className = 'warnbox';
  box.style.marginTop = '8px';
  box.textContent = text;
}
let authDialogReopen = null;
// \u5168\u5C40\u6388\u6743\u5F39\u7A97\u4E0E\u300C\u5EFA\u4ED3\u5E93\u300D\u5F39\u7A97\u91CC\u7684\u6307\u5F15\u5171\u7528 id \u4F1A\u4E92\u76F8\u5E72\u6270\uFF08\u5207\u6362\u8BED\u8A00\u65F6\u9760 id \u627E\u5F39\u7A97\u91CD\u5F00\uFF09\uFF0C
// \u6240\u4EE5\u5168\u5C40\u8FD9\u4E2A\u7528\u72EC\u7ACB id\u3002

// ---- \u64CD\u4F5C\u7ED3\u679C\u63D0\u793A\uFF08\u5F39\u7A97\uFF09----
// \u5386\u53F2\uFF1A\u8FD9\u91CC\u539F\u6765\u662F\u9876\u680F\u7684\u4E00\u4E2A\u5C0F\u80F6\u56CA\uFF0C\u53EA\u663E\u793A\u6700\u65B0\u4E00\u53E5\u8BDD\u3002\u7528\u6237\u8981\u6C42\u300C\u4FDD\u7559\u5F39\u7A97\uFF0C
// \u4E0D\u8981\u6700\u4E0A\u9762 github \u6388\u6743\u65C1\u8FB9\u7684\u5C0F\u5757\u300D\uFF0C\u5E76\u4E14\u300C\u5F39\u7A97\u8981\u4EBA\u70B9\u51FB\u624D\u6D88\u5931\u300D\u2014\u2014
// \u81EA\u52A8\u6D88\u5931\u4F1A\u8BA9\u4EBA\u9519\u8FC7\u5931\u8D25\u539F\u56E0\uFF0C\u4E5F\u5206\u4E0D\u6E05\u300C\u6CA1\u63A8\u9001\u4E0A\u53BB\u300D\u548C\u300C\u6B63\u5728\u66F4\u65B0\u300D\u3002
// \u6240\u4EE5\uFF1A\u5168\u5C40\u53EA\u7528\u4E00\u5F20\u300C\u6700\u8FD1\u7ED3\u679C\u300D\u5F39\u7A97\uFF0C\u65B0\u7ED3\u679C\u8986\u76D6\u65E7\u5185\u5BB9\uFF0C\u6210\u8D25\u90FD\u7559\u7740\u7B49\u7528\u6237\u70B9\u5173\u95ED\u3002
let RESULT_TID = 0;
function ensureResultToast() {
  if (!RESULT_TID || !TOAST_LIVE.has(RESULT_TID)) RESULT_TID = toastOpen(t('toastResultTitle'), '');
  return RESULT_TID;
}
function setResult(kind, text, detail) {
  if (!text) return;
  const map = { ok: 'ok', busy: 'busy', err: 'bad', alert: 'bad' };
  const k = map[kind] || 'bad';
  const id = ensureResultToast();
  // detail \u6709\u65F6\u5C31\u662F\u4E00\u53E5\u7F51\u5740\uFF08\u300C\u7EBF\u4E0A\u5730\u5740\u300D\uFF09\u3002\u6574\u4E32\u90FD\u662F URL \u65F6\u6539\u6210\u53EF\u70B9\u7684\u94FE\u63A5\uFF0C
  // \u4E0D\u585E\u8FDB\u7B49\u5BBD\u65E5\u5FD7\u5757\u91CC\u3002\u7528 indexOf \u5224\u65AD\u800C\u4E0D\u5199\u6B63\u5219\uFF1A\u672C\u6587\u4EF6\u5728\u6A21\u677F\u5B57\u9762\u91CF\u5185\uFF0C
  // \u6B63\u5219\u91CC\u7684\u53CD\u659C\u6760\u4F1A\u5148\u88AB\u6A21\u677F\u5403\u6389\u4E00\u5C42\uFF08\u89C1 shortRepo \u7684\u6CE8\u91CA\uFF09\u3002
  let url = '';
  let rest = detail ? String(detail) : '';
  if (rest.indexOf('http://') === 0 || rest.indexOf('https://') === 0) { url = rest; rest = ''; }
  toastSet(id, k, text, '', rest, url);
}
function clearResult() {
  if (RESULT_TID) { toastDrop(RESULT_TID); RESULT_TID = 0; }
}
// ---- \u53F3\u4E0A\u89D2\u64CD\u4F5C\u63D0\u793A\uFF08toast\uFF09----
// \u4E3A\u4EC0\u4E48\u8981\u5355\u72EC\u4E00\u5957\uFF1A\u9876\u90E8\u90A3\u6761\u5C0F\u80F6\u56CA\u53EA\u663E\u793A\u6700\u65B0\u4E00\u53E5\u8BDD\uFF0C\u7528\u6237\u770B\u4E0D\u51FA
// \u300C\u70B9\u4E86\u6CA1\u53CD\u5E94 / \u6B63\u5728\u8DD1 / \u5DF2\u7ECF\u63A8\u4E0A\u53BB\u7B49\u6784\u5EFA / \u5F7B\u5E95\u5931\u8D25\u300D\u8FD9\u56DB\u79CD\u72B6\u6001\u7684\u533A\u522B\uFF0C
// \u53CD\u9988\u91CC\u8BF4\u7684\u5C31\u662F\u300C\u4E0D\u77E5\u9053\u662F\u6CA1\u63A8\u9001\u6210\u529F\u8FD8\u662F\u6B63\u5728\u66F4\u65B0\u300D\u3002
// \u8FD9\u91CC\u6BCF\u6761\u64CD\u4F5C\u7ED9\u4E00\u5F20\u5361\u7247\uFF0C\u4ECE\u8F6C\u5708\u5F00\u59CB\uFF0C\u6700\u540E\u5B9A\u683C\u6210 \u2713 \u6216 \u2717\uFF0C\u5931\u8D25\u53EF\u5C55\u5F00\u65E5\u5FD7\u3002
// \u751F\u547D\u5468\u671F\uFF1Abusy \u5361\u7247\u4E0D\u81EA\u52A8\u6D88\u5931\uFF08\u8BA9\u4EBA\u968F\u65F6\u80FD\u770B\u89C1\u8FD8\u5728\u8DD1\uFF09\uFF1B\u6210\u529F\u548C\u5931\u8D25\u4E5F\u90FD\u7559\u7740\u4E0D\u81EA\u52A8\u6536\uFF0C
// \u5FC5\u987B\u7528\u6237\u70B9\u5361\u7247\u53F3\u4E0A\u89D2\u7684 \xD7 \u624D\u6D88\u5931 \u2014\u2014 \u8981\u6C42\u300C\u5F39\u7A97\u8981\u4EBA\u70B9\u51FB\u624D\u6D88\u5931\u300D\u3002
let toastSeq = 0;
const TOAST_LIVE = new Map(); // id -> { el, titleEl, bodyEl, spinEl, icEl, timer }
function toastOpen(title, body) {
  const box = document.getElementById('toasts');
  if (!box) return 0;
  // \u9876\u680F\u662F sticky\u3001\u9AD8\u5EA6\u4F1A\u968F\u7A97\u53E3\u5BBD\u5EA6\u6362\u884C\u53D8\u5316\uFF0C\u5199\u6B7B top \u4F1A\u5728\u7A84\u7A97\u53E3\u91CC\u76D6\u4F4F\u300C\u53D1\u5E03\u300D\u6309\u94AE\u3002
  // \u6BCF\u6B21\u5F00\u65B0\u63D0\u793A\u65F6\u6309\u300C\u9876\u680F + \u4FE1\u606F\u6761\u300D\u7684\u771F\u5B9E\u5E95\u8FB9\u91CD\u7B97\u4E00\u6B21\uFF0C\u6C38\u8FDC\u8D34\u5728\u5B83\u4EEC\u4E0B\u9762 \u2014\u2014
  // \u53EA\u8BA9\u51FA\u9876\u680F\u662F\u4E0D\u591F\u7684\uFF1A\u4FE1\u606F\u6761\u53F3\u4FA7\u5C31\u662F\u300C\u5916\u89C2 / \u8BBE\u7F6E\u300D\u6309\u94AE\uFF0C\u63D0\u793A\u6761\u538B\u4E0A\u53BB\u5C31\u70B9\u4E0D\u5230\u4E86\u3002
  try {
    let bottom = 0;
    const bar = document.querySelector('.statusbar');
    if (bar) bottom = bar.getBoundingClientRect().bottom;
    const vb = document.getElementById('vbar');
    if (vb && vb.offsetParent !== null) {
      const r2 = vb.getBoundingClientRect();
      if (r2.height > 0 && r2.bottom > bottom) bottom = r2.bottom;
    }
    if (bottom > 0) box.style.top = Math.round(bottom + 10) + 'px';
  } catch (e) { /* \u53D6\u4E0D\u5230\u5C31\u7528 CSS \u91CC\u7684\u515C\u5E95\u503C */ }
  const id = ++toastSeq;
  const el = document.createElement('div');
  el.className = 'toast busy';
  el.title = t('toastClose');
  const th = document.createElement('div'); th.className = 'th';
  const spin = document.createElement('span'); spin.className = 'spin';
  const ic = document.createElement('span'); ic.className = 'ic'; ic.style.display = 'none';
  const tt = document.createElement('span'); tt.className = 'tt'; tt.textContent = title;
  th.appendChild(spin); th.appendChild(ic); th.appendChild(tt);
  const tb = document.createElement('div'); tb.className = 'tb';
  if (body) tb.textContent = body;
  el.appendChild(th); el.appendChild(tb);
  // \u5173\u95ED\u65B9\u5F0F\uFF1A\u70B9\u5361\u7247\u4EFB\u610F\u4F4D\u7F6E\uFF08\u7528\u6237\u8981\u6C42\u300C\u4E0D\u8981\u5C0F x\uFF0C\u70B9\u4EFB\u4F55\u4F4D\u7F6E\u90FD\u53EF\u4EE5\u5220\u9664\u300D\uFF09\u3002
  // \u4F46\u5361\u7247\u91CC\u6709\u53EF\u4EA4\u4E92\u5185\u5BB9 \u2014\u2014 \u300C\u67E5\u770B\u8BE6\u60C5\u300D\u7684\u6298\u53E0\u3001\u7EBF\u4E0A\u5730\u5740\u5916\u94FE \u2014\u2014 \u70B9\u5B83\u4EEC\u4E0D\u8BE5\u5173\u6389\u5361\u7247\uFF0C
  // \u5426\u5219\u60F3\u770B\u65E5\u5FD7\u7684\u4EBA\u4E00\u70B9\u5C31\u6CA1\u4E86\u3002\u6240\u4EE5\u8FD9\u4E9B\u533A\u57DF\u5185\u7684\u70B9\u51FB\u653E\u884C\uFF0C\u5176\u4F59\u4F4D\u7F6E\u4E00\u5F8B\u5173\u95ED\u3002
  el.addEventListener('click', (ev) => {
    const hit = ev.target;
    if (hit && hit.closest && hit.closest('details, a, summary')) return;
    toastDrop(id);
  });
  box.appendChild(el);
  TOAST_LIVE.set(id, { el, tt, tb, spin, ic, timer: 0 });
  return id;
}
/** \u628A\u4E00\u6761\u63D0\u793A\u6539\u6210\u7EC8\u6001\uFF1Akind = 'ok' | 'bad' | 'busy' */
function toastSet(id, kind, title, body, detail, linkUrl) {
  const rec = TOAST_LIVE.get(id);
  if (!rec) return;
  const { el, tt, tb, spin, ic } = rec;
  if (rec.timer) { clearTimeout(rec.timer); rec.timer = 0; }
  el.className = 'toast ' + (kind || 'busy');
  if (kind === 'ok' || kind === 'bad') {
    spin.style.display = 'none';
    ic.style.display = '';
    ic.className = 'ic ' + kind;
    ic.textContent = kind === 'ok' ? '\u2713' : '!';
  } else {
    spin.style.display = '';
    ic.style.display = 'none';
  }
  if (title) tt.textContent = title;
  tb.innerHTML = '';
  if (body) {
    const s = document.createElement('div'); s.textContent = body; tb.appendChild(s);
  }
  if (linkUrl) {
    const a = document.createElement('a');
    a.href = linkUrl; a.target = '_blank'; a.rel = 'noopener';
    a.textContent = t('liveOpen');
    a.style.display = 'inline-block'; a.style.marginTop = '4px';
    tb.appendChild(a);
  }
  if (detail) {
    const d = document.createElement('details');
    const sm = document.createElement('summary'); sm.textContent = t('toastDetail');
    const pre = document.createElement('pre');
    // \u65E5\u5FD7\u6309\u300C\u662F\u4E0D\u662F\u5173\u952E\u6210\u8D25\u300D\u5206\u6863\uFF1A\u975E\u5173\u952E\u884C\uFF08\u7AD9\u540D\u53D8\u91CF\u540C\u6B65\u4E4B\u7C7B\u987A\u5E26\u6210\u529F\u7684\u8BDD\uFF09
    // \u6DE1\u4E00\u6863\u663E\u793A\u3002\u5931\u8D25\u884C\u4FDD\u6301\u6B63\u5E38\u4EAE\u5EA6\uFF0C\u65B9\u4FBF\u5C55\u5F00\u540E\u4E00\u773C\u5B9A\u4F4D\u3002
    for (const line of String(detail).split(String.fromCharCode(10))) {
      const s = document.createElement('span');
      s.textContent = line + String.fromCharCode(10);
      if (!isCriticalLog(line)) s.className = 'dim';
      pre.appendChild(s);
    }
    d.appendChild(sm); d.appendChild(pre); tb.appendChild(d);
  }
  // \u4E0D\u81EA\u52A8\u6D88\u5931\uFF1A\u6210\u529F\u3001\u5931\u8D25\u3001\u8FDB\u884C\u4E2D\u90FD\u7559\u7740\uFF0C\u5FC5\u987B\u7528\u6237\u70B9\u4E00\u4E0B\u5361\u7247\u624D\u6536\u8D77\u3002
  // \u81EA\u52A8\u6536\u8D77\u4F1A\u8BA9\u4EBA\u6B63\u597D\u8D70\u5F00\u5C31\u9519\u8FC7\u7ED3\u679C\uFF0C\u53CD\u800C\u66F4\u5206\u4E0D\u6E05\u300C\u63A8\u4E0A\u53BB\u4E86\u6CA1\u6709\u300D\u3002
}
function toastDrop(id) {
  const rec = TOAST_LIVE.get(id);
  if (!rec) return;
  if (rec.timer) clearTimeout(rec.timer);
  TOAST_LIVE.delete(id);
  try { rec.el.remove(); } catch (e) { /* \u5DF2\u7ECF\u4E0D\u5728 DOM \u91CC */ }
}
// \u5224\u65AD\u4E00\u884C\u53D1\u5E03\u65E5\u5FD7\u662F\u5426\u5C5E\u4E8E\u300C\u5173\u952E\u6210\u8D25\u300D\u3002\u975E\u5173\u952E\u7684\u4E00\u822C\u662F\u987A\u5E26\u6210\u529F\u7684\u8BF4\u660E
// \uFF08\u7AD9\u540D\u53D8\u91CF\u5DF2\u5199\u5165\u4E4B\u7C7B\uFF09\uFF0C\u5B83\u4EEC\u6210\u529F\u4E0E\u5426\u90FD\u4E0D\u5F71\u54CD\u5185\u5BB9\u6709\u6CA1\u6709\u4E0A\u7EBF\u3002
function isCriticalLog(line) {
  const s = String(line || '');
  // \u7AD9\u540D\u53D8\u91CF\u540C\u6B65\u662F\u987A\u5E26\u52A8\u4F5C\uFF0C\u6210\u529F\u5931\u8D25\u90FD\u4E0D\u5F71\u54CD\u5185\u5BB9\u6709\u6CA1\u6709\u4E0A\u7EBF\uFF0C\u4E00\u5F8B\u6DE1\u663E\u3002
  if (s.indexOf('SITE_NAME') >= 0) return false;
  // \u26A0\uFE0F \u5173\u952E\u8BCD\u5FC5\u987B\u4E2D\u82F1\u6587\u5404\u5199\u4E00\u4EFD\uFF1A\u539F\u6765\u53EA\u5199\u4E86\u4E2D\u6587\uFF0C\u82F1\u6587\u6A21\u5F0F\u4E0B
  // "Already up to date \u2014 nothing to push" \u4E00\u4E2A\u90FD\u4E0D\u547D\u4E2D\uFF0C\u88AB\u5224\u6210\u975E\u5173\u952E\u800C\u6DE1\u663E\uFF0C
  // \u540C\u4E00\u6761\u65E5\u5FD7\u4E24\u79CD\u8BED\u8A00\u5206\u6863\u4E0D\u540C\uFF08\u771F\u5B9E\u8E29\u8FC7\uFF09\u3002
  const keys = [
    'git ', 'GitHub',
    '\u63A8\u9001', 'push',
    '\u516C\u5F00\u7B14\u8BB0', 'public note',
    '\u5931\u8D25', 'failed',
    '\u65E0\u6CD5', 'Could not', "couldn't",
  ];
  for (const k of keys) if (s.indexOf(k) >= 0) return true;
  return false;
}
// \u63D0\u793A\uFF1A\u672C\u6BB5\u5904\u5728\u670D\u52A1\u7AEF UI \u6A21\u677F\u5B57\u9762\u91CF\u5185\uFF0C\u6B63\u5219\u91CC\u7684\u53CD\u659C\u6760\u4F1A\u88AB\u6A21\u677F\u5B57\u9762\u91CF\u5148\u5403\u6389\u4E00\u5C42\uFF0C
// \u6781\u6613\u5199\u51FA\u300C\u770B\u7740\u5BF9\u3001\u5230\u6D4F\u89C8\u5668\u5C31\u5E9F\u300D\u7684\u8868\u8FBE\u5F0F\u3002\u8FD9\u91CC\u6539\u7528 RegExp \u5B57\u7B26\u4E32 + \u5B57\u7B26\u7C7B\uFF0C
// \u4E0D\u5199\u4EFB\u4F55\u53CD\u659C\u6760\uFF0C\u5F7B\u5E95\u907F\u5F00\u8FD9\u5C42\u8F6C\u4E49\u3002
function shortRepo(repo) {
  return String(repo || '')
    .replace(new RegExp('^https?://github[.]com/', 'i'), '')
    .replace(new RegExp('[.]git$', 'i'), '');
}

async function loadState() {
  const next = await api('/api/state');
  // \u6CE8\u610F\uFF1A\u4E0D\u80FD\u6574\u4F53\u66FF\u6362 S\uFF08S = next\uFF09\u3002\u670D\u52A1\u7AEF\u4E0D\u8FD4\u56DE collapsed\uFF08\u90A3\u662F\u7EAF\u524D\u7AEF\u7684\u5C55\u793A\u72B6\u6001\uFF09\uFF0C
  // \u6574\u4F53\u66FF\u6362\u4F1A\u628A S.collapsed \u62B9\u6389\uFF0C\u4E0B\u4E00\u884C renderFolders() \u8BFB S.collapsed.has \u5C31\u629B
  // "Cannot read properties of undefined"\u3002\u8FD9\u91CC\u53EA\u5408\u5E76\u670D\u52A1\u7AEF\u5B57\u6BB5\uFF0C\u4FDD\u7559\u672C\u5730\u6298\u53E0\u72B6\u6001\u3002
  S = { ...next, collapsed: S.collapsed ?? new Set() };
  renderVaults(); renderChanges(); renderFolders(); syncAutoSyncUI();
}

// ---- \u53D8\u66F4\u4E09\u680F\uFF08\u65B0\u589E / \u4FEE\u6539 / \u5220\u9664\uFF09\uFF0C\u5217\u5728\u6240\u6709\u6587\u4EF6\u5939\u4E0A\u65B9 ----
// \u9700\u6C42\uFF1A\u8FD9\u4E09\u7C7B\u8981\u5728\u6587\u4EF6\u5939\u5916\u9762\u5355\u72EC\u5217\u51FA\u6765\uFF0C\u4E14\u300C\u53D1\u5E03\u300D\u4E4B\u540E\u6E05\u7A7A\uFF08\u90A3\u4E9B\u7B97\u65E7\u7684\u6539\u52A8\uFF09\u3002
// \u6E05\u7A7A\u4E0D\u662F\u524D\u7AEF\u64E6\u4E00\u4E0B \u2014\u2014 \u670D\u52A1\u7AEF\u53D1\u5E03\u6210\u529F\u540E\u4F1A\u63A8\u8FDB\u6C34\u4F4D\uFF0C\u4E0B\u6B21\u62C9\u72B6\u6001\u5B83\u4EEC\u81EA\u7136\u5C31\u4E0D\u5728\u4E86\uFF0C
// \u6240\u4EE5\u8FD9\u91CC\u53EA\u7BA1\u7167\u7740 S.changes \u753B\u3002
function renderChanges() {
  const box = document.getElementById('chgcols');
  const hint = document.getElementById('chgHint');
  if (!box) return;
  const CH = manualChanges();
  const titleOf = (p) => {
    const n = S.notes.find((x) => x.path === p);
    return n ? n.title : p.replace(/.(md|markdown)$/i, '').split('/').pop();
  };
  const total = CH.added.length + CH.modified.length + CH.deleted.length;
  if (hint) hint.textContent = total ? tf('chgCount', total) : '';
  box.innerHTML = '';
  // \u6CA1\u6709\u6539\u52A8\u65F6\u4E0D\u8981\u628A\u4E09\u680F\u7A7A\u58F3\u6446\u5728\u90A3\u513F\u5360\u6389\u534A\u5C4F\uFF0C\u6536\u6210\u4E00\u884C
  const card = document.getElementById('chgCard');
  if (card) card.classList.toggle('is-empty', total === 0);
  if (total === 0) {
    const ok = document.createElement('div');
    ok.className = 'chgnone';
    ok.innerHTML = '<span class="dot"></span>' + esc(t('chgNone'));
    box.appendChild(ok);
    return;
  }
  const cols = [
    { key: 'add', label: t('chgAdded'), list: CH.added, tip: t('chgTipAdded') },
    { key: 'mod', label: t('chgModified'), list: CH.modified, tip: t('chgTipModified') },
    { key: 'del', label: t('chgDeleted'), list: CH.deleted, tip: t('chgTipDeleted') },
  ];
  for (const c of cols) {
    const col = document.createElement('div');
    col.className = 'chgcol';
    const head = document.createElement('div');
    head.className = 'ch';
    head.title = c.tip;
    head.innerHTML = '<span class="chg ' + c.key + '">' + esc(c.label) + '</span><span class="n">' + c.list.length + '</span>';
    col.appendChild(head);
    if (!c.list.length) {
      const e = document.createElement('div');
      e.className = 'empty';
      e.textContent = '\u2014';
      col.appendChild(e);
    } else {
      const ul = document.createElement('ul');
      for (const p of c.list) {
        const li = document.createElement('li');
        li.title = p + '\\n' + t('chgJumpTip');
        const ts = document.createElement('span');
        ts.className = 't';
        ts.textContent = titleOf(p);
        const ps = document.createElement('span');
        ps.className = 'p';
        ps.textContent = p;
        li.appendChild(ts);
        li.appendChild(ps);
        // \u65B0\u589E\u7684\u7B14\u8BB0\uFF1A\u8FD9\u91CC\u4E5F\u7ED9\u4E00\u4E2A\u516C\u5F00\u5F00\u5173\uFF0C\u548C\u4E0B\u9762\u6587\u4EF6\u5939\u91CC\u7684\u90A3\u4E2A\u662F\u540C\u4E00\u4EF6\u4E8B
        if (c.key === 'add') {
          const n = S.notes.find((x) => x.path === p);
          if (n) {
            const sw = document.createElement('button');
            sw.className = 'sw' + (n.isPublic ? ' on' : '');
            sw.title = n.isPublic ? t('pri') : t('pub');
            sw.onclick = async (e) => {
              e.stopPropagation();
              try { await api('/api/toggle', { path: p, pub: !n.isPublic }); }
              catch (err) { setResult('err', t('toggleFail') + err.message); return; }
              n.isPublic = !n.isPublic;
              await refreshChanges();
              promptPending();
            };
            li.appendChild(sw);
          }
        }
        li.onclick = () => focusNote(p);
        ul.appendChild(li);
      }
      col.appendChild(ul);
    }
    box.appendChild(col);
  }
}

// \u70B9\u53D8\u66F4\u6761\u76EE\uFF1A\u5C55\u5F00\u5B83\u6240\u5728\u7684\u6587\u4EF6\u5939\u5E76\u6EDA\u8FC7\u53BB\uFF0C\u9AD8\u4EAE\u4E00\u4E0B\uFF08\u5426\u5219\u300C\u5220\u9664\u4E86\u67D0\u7BC7\u300D\u8FD9\u79CD
// \u5728\u957F\u5217\u8868\u91CC\u6839\u672C\u627E\u4E0D\u5230\uFF09
function focusNote(p) {
  const f = p.includes('/') ? p.split('/').slice(0, -1).join('/') : '';
  S.collapsed.delete(f);
  renderFolders();
  const rows = [...document.querySelectorAll('#folders li, #ungrouped li')];
  const el = rows.find((li) => { const t0 = li.querySelector('.t'); return t0 && t0.title === p; });
  if (!el) return;
  el.scrollIntoView({ block: 'center', behavior: 'smooth' });
  el.classList.add('flash');
  setTimeout(() => el.classList.remove('flash'), 1400);
}

// \u81EA\u52A8\u540C\u6B65\u7684\u4E09\u4E2A\u5F00\u5173\uFF1A\u670D\u52A1\u7AEF\u662F\u552F\u4E00\u771F\u76F8\uFF0C\u8FD9\u91CC\u53EA\u8D1F\u8D23\u628A\u754C\u9762\u52FE\u9009\u72B6\u6001\u5BF9\u9F50\u8FC7\u53BB\u3002
function syncAutoSyncUI() {
  const a = S.autoSync || { added: false, modified: true, deleted: false };
  const put = (id, v) => { const el = document.getElementById(id); if (el) el.checked = !!v; };
  put('as-added', a.added); put('as-modified', a.modified); put('as-deleted', a.deleted);
  renderAutoLog();
}
// \u81EA\u52A8\u540C\u6B65\u6D41\u6C34\uFF1A\u628A\u300C\u540E\u53F0\u4EC0\u4E48\u65F6\u5019\u5F00\u59CB\u63A8\u3001\u52A8\u4E86\u54EA\u4E9B\u6587\u4EF6\u3001\u63A8\u6CA1\u63A8\u4E0A\u53BB\u3001\u6709\u6CA1\u6709\u66F4\u65B0\u6210\u529F\u300D\u663E\u793A\u51FA\u6765\u3002
// \u81EA\u52A8\u540C\u6B65\u5E38\u5728\u6CA1\u4EBA\u76EF\u7740\u5C4F\u5E55\u7684\u65F6\u5019\u53D1\u751F\uFF0C\u6CA1\u6709\u8FD9\u6761\u8BB0\u5F55\u5C31\u53EA\u80FD\u9760\u731C\u3002
function renderAutoLog() {
  const box = document.getElementById('autolog');
  const head = document.getElementById('autologHead');
  if (!box) return;
  // \u8001\u7248\u672C\u8BB0\u8FC7\u300C\u6709\u6539\u52A8\u4F46\u5F00\u5173\u6CA1\u5F00\u300D\u8FD9\u79CD\u6761\u76EE\uFF0C\u7528\u6237\u660E\u786E\u8BF4\u4E0D\u9700\u8981\uFF0C\u8FD9\u91CC\u76F4\u63A5\u4E0D\u753B
  const log = (Array.isArray(S.autoLog) ? S.autoLog : []).filter((e) => e && e.kind !== 'skip');
  // \u754C\u9762\u6BCF 8 \u79D2\u8F6E\u8BE2\u4E00\u6B21\u5C31\u4F1A\u91CD\u753B\uFF1B\u4E0D\u8BB0\u4F4F\u6EDA\u52A8\u4F4D\u7F6E\u7684\u8BDD\uFF0C\u7528\u6237\u521A\u5F80\u4E0B\u6EDA\u5C31\u53C8\u8DF3\u56DE\u9876\u90E8
  const keepTop = box.scrollTop;
  box.innerHTML = '';
  if (head) head.style.display = log.length ? '' : 'none';
  if (!log.length) return;
  const pad = (n) => (n < 10 ? '0' + n : '' + n);
  const hhmm = (ms) => { const d = new Date(ms); return pad(d.getHours()) + ':' + pad(d.getMinutes()) + ':' + pad(d.getSeconds()); };
  // \u63A8\u9001 \u2192 \u4E0A\u7EBF\u4E4B\u95F4\u7684\u8017\u65F6\uFF0C\u7528\u300C3 \u5206 12 \u79D2\u300D\u8FD9\u79CD\u8BF4\u6CD5\uFF0C\u6BD4\u79D2\u6570\u597D\u8BFB
  const dur = (sec) => {
    sec = Math.max(0, Math.round(sec));
    const en = LANG === 'en';
    if (sec < 60) return sec + (en ? 's' : ' \u79D2');
    const m = Math.floor(sec / 60);
    const s = sec % 60;
    if (!s) return m + (en ? 'm' : ' \u5206');
    return m + (en ? 'm ' : ' \u5206 ') + s + (en ? 's' : ' \u79D2');
  };
  const baseOf = (p) => p.replace(/.(md|markdown)$/i, '').split('/').pop();
  for (const e of log) {
    const row = document.createElement('div');
    row.className = 'al';
    const top = document.createElement('div');
    top.className = 'al-top';
    const tm = document.createElement('span');
    tm.className = 'tm';
    tm.textContent = hhmm(e.at);
    tm.title = t('autoLogStartTip');
    top.appendChild(tm);
    const st = document.createElement('span');
    const c = e.counts || {};
    const cs = document.createElement('span');
    cs.className = 'cs';
    cs.textContent = [
      c.added ? '+' + c.added : '',
      c.modified ? '~' + c.modified : '',
      c.deleted ? '-' + c.deleted : '',
    ].filter(Boolean).join(' ');
    const pushedAt = Number(e.pushedAt) || 0;
    // \u72B6\u6001\u6309\u300C\u7ED3\u8BBA\u4F18\u5148\u300D\u6392\u5217\uFF1A\u5931\u8D25 > \u6784\u5EFA\u5931\u8D25 > \u8D85\u65F6 > \u5DF2\u66F4\u65B0 > \u6CA1\u4E1C\u897F\u53EF\u63A8 > \u5DF2\u63A8\u9001 > \u5F00\u59CB\u63A8\u9001
    if (e.failed) {
      st.className = 'st bad';
      st.textContent = t(e.interrupted ? 'autoLogInterrupted' : 'autoLogFailed');
      st.title = String(e.error || e.failKind || '');
    } else if (e.buildFailed) {
      st.className = 'st bad'; st.textContent = t('autoLogBuildFailed');
      st.title = String(e.buildConclusion || '');
    } else if (e.liveTimeout) {
      st.className = 'st bad'; st.textContent = t('autoLogTimeout');
      st.title = String(e.buildStatus || '');
    } else if (e.live) {
      st.className = 'st ok'; st.textContent = tf('autoLogLive', hhmm(e.liveAt));
    } else if (e.pushed === false) {
      // \u53D1\u5E03\u6D41\u7A0B\u8DD1\u5B8C\u4F46\u6CA1\u4E1C\u897F\u53EF\u63A8\uFF08\u4ED3\u5E93\u662F\u65B0\u9C9C\u7684\uFF09\uFF0C\u4E0D\u7B97\u5931\u8D25\uFF0C\u4F46\u4E5F\u8BE5\u8BA9\u4EBA\u770B\u89C1
      st.className = 'st skip'; st.textContent = t('autoLogFresh');
    } else if (pushedAt) {
      st.className = 'st wait'; st.textContent = tf('autoLogPushedAt', hhmm(pushedAt));
    } else {
      st.className = 'st wait'; st.textContent = t('autoLogPushing');
    }
    top.appendChild(st);
    if (cs.textContent.trim()) top.appendChild(cs);
    // \u4ECE\u300C\u5F00\u59CB\u63A8\u9001\u300D\u5230\u300C\u786E\u8BA4\u66F4\u65B0\u300D\u4E00\u5171\u82B1\u4E86\u591A\u4E45
    if (e.live && e.liveAt > e.at) {
      const took = document.createElement('span');
      took.className = 'took';
      took.textContent = tf('autoLogTook', dur((e.liveAt - e.at) / 1000));
      top.appendChild(took);
    }
    if (e.commit) {
      const sh = document.createElement('span');
      sh.className = 'sha'; sh.textContent = e.commit.slice(0, 7);
      top.appendChild(sh);
    }
    // \u6784\u5EFA\u5931\u8D25 / \u8D85\u65F6\uFF1A\u70B9\u8FD9\u4E00\u884C\u76F4\u63A5\u53BB GitHub Actions \u770B\u770B\u5230\u5E95\u600E\u4E48\u4E86
    if ((e.buildFailed || e.liveTimeout) && e.buildUrl) {
      top.style.cursor = 'pointer';
      top.title = t('autoLogOpenActions') + '\\n' + e.buildUrl;
      top.onclick = () => window.open(e.buildUrl, '_blank');
    }
    row.appendChild(top);
    // \u7B2C\u4E8C\u884C\uFF1A\u8FD9\u6B21\u5230\u5E95\u52A8\u4E86\u54EA\u4E9B\u6587\u4EF6\uFF08\u4E09\u680F\u91CC\u4E0D\u518D\u91CD\u590D\u5217\uFF0C\u6539\u7531\u8FD9\u91CC\u8BF4\u660E\uFF09
    const f = e.files || {};
    const segs = [];
    const pushSeg = (arr, cls, label) => {
      if (!Array.isArray(arr) || !arr.length) return;
      const names = arr.slice(0, 3).map(baseOf);
      let txt = label + ' ' + names.join('\u3001');
      if (arr.length > names.length) txt += tf('autoLogMore', arr.length - names.length);
      const sp = document.createElement('span');
      sp.className = 'fs ' + cls;
      sp.textContent = txt;
      sp.title = arr.join('\\n');
      segs.push(sp);
    };
    pushSeg(f.added, 'add', t('autoLogFileAdded'));
    pushSeg(f.modified, 'mod', t('autoLogFileModified'));
    pushSeg(f.deleted, 'del', t('autoLogFileDeleted'));
    if (segs.length) {
      const fl = document.createElement('div');
      fl.className = 'al-files';
      for (const sp of segs) fl.appendChild(sp);
      row.appendChild(fl);
    }
    box.appendChild(row);
  }
  if (keepTop) box.scrollTop = keepTop;
}

// \u300C\u9700\u8981\u4F60\u5904\u7406\u7684\u300D\u6539\u52A8\uFF1A\u81EA\u52A8\u540C\u6B65\u5F00\u5173\u5173\u7740\u7684\u90A3\u51E0\u7C7B\u3002
// \u5F00\u5173\u5F00\u7740\u7684\u7C7B\u7531\u540E\u53F0\u81EA\u5DF1\u53D1\uFF0C\u53EA\u5728\u6D41\u6C34\u91CC\u8BF4\u660E\uFF0C\u4E0D\u653E\u8FDB\u4E09\u680F\uFF08\u7528\u6237\u660E\u786E\u8981\u6C42\uFF09\u3002
// \u4F8B\u5916\uFF1A\u6700\u8FD1\u4E00\u6B21\u81EA\u52A8\u540C\u6B65\u63A8\u9001\u5931\u8D25\u4E86\uFF0C\u5C31\u628A\u5BF9\u5E94\u90A3\u51E0\u7C7B\u653E\u56DE\u680F\u91CC\u63D0\u9192 \u2014\u2014
// \u5426\u5219\u4E00\u6B21\u5931\u8D25\u7684\u63A8\u9001\u4F1A\u8BA9\u6539\u52A8\uFF08\u5C24\u5176\u300C\u8F6C\u79C1\u5BC6\u300D\u8FD9\u79CD\uFF09\u6084\u6084\u7559\u5728\u7EBF\u4E0A\u3002
function manualChanges() {
  const CH = S.changes || {};
  const AS = S.autoSync || {};
  const last = (Array.isArray(S.autoLog) ? S.autoLog : []).find((e) => e && e.kind !== 'skip') || null;
  const fc = last && last.failed ? (last.counts || {}) : null;
  const keep = (k) => (AS[k] ? !!(fc && fc[k] > 0) : true);
  return {
    added: keep('added') ? (CH.added || []) : [],
    modified: keep('modified') ? (CH.modified || []) : [],
    deleted: keep('deleted') ? (CH.deleted || []) : [],
  };
}

// \u9876\u680F\u63D0\u793A\uFF1A\u53EA\u8BF4\u300C\u8FD8\u6709\u51E0\u5904\u8981\u53D1\u5E03\u300D\uFF0C\u4E0D\u518D\u9010\u6761\u62A5\u300C\u67D0\u67D0\u5DF2\u8BBE\u4E3A\u79C1\u5BC6\uFF0C\u8BB0\u5F97\u53D1\u5E03\u300D\u3002
// \u81EA\u52A8\u540C\u6B65\u80FD\u5904\u7406\u7684\u6539\u52A8\u4E0D\u63D0\u793A\uFF08\u5B83\u4EEC\u4E5F\u4E0D\u4F1A\u51FA\u73B0\u5728\u4E09\u680F\u91CC\uFF09\u3002
// \u4F4D\u7F6E\uFF1Avbar \u4E0A\u7684\u5E38\u9A7B\u5C0F\u5B57\uFF08\u9876\u680F\u5C0F\u80F6\u56CA\u5DF2\u6309\u7528\u6237\u8981\u6C42\u5220\u6389\uFF09\u3002
let _pendingPrompt = '';
function promptPending() {
  const m = manualChanges();
  const n = m.added.length + m.modified.length + m.deleted.length;
  const el = document.getElementById('pendingHint');
  if (!el) return;
  if (!n) { el.classList.add('hidden'); el.textContent = ''; _pendingPrompt = ''; return; }
  const msg = tf('pendingPrompt', n);
  if (msg === _pendingPrompt) return;
  _pendingPrompt = msg;
  el.textContent = msg;
  el.classList.remove('hidden');
}

// \u6E05\u7A7A\u81EA\u52A8\u540C\u6B65\u6D41\u6C34\uFF08\u670D\u52A1\u7AEF\u843D\u76D8\uFF0C\u91CD\u542F\u4E5F\u4E0D\u4F1A\u56DE\u6765\uFF09
async function clearAutoLogUI() {
  try {
    await api('/api/autolog/clear', {});
  } catch (e) {
    setResult('err', t('autoSyncFail') + e.message);
    return;
  }
  S.autoLog = [];
  renderAutoLog();
  renderChanges();
  promptPending();
}
async function setAutoSync(type, value) {
  try {
    const r = await api('/api/autosync', { type, value });
    S.autoSync = r.autoSync;
    setResult('ok', t('autoSyncSaved'));
  } catch (e) {
    setResult('err', t('autoSyncFail') + e.message);
  }
  // \u65E0\u8BBA\u6210\u8D25\u90FD\u4EE5\u670D\u52A1\u7AEF\u8FD4\u56DE\u4E3A\u51C6\u91CD\u65B0\u5BF9\u9F50\uFF08\u5931\u8D25\u65F6\u628A\u52FE\u9009\u56DE\u6EDA\uFF09
  syncAutoSyncUI();
  // \u5F00\u5173\u4E00\u53D8\uFF0C\u300C\u54EA\u4E9B\u7B97\u5F85\u5904\u7406\u300D\u5C31\u53D8\u4E86\uFF1A\u4E09\u680F\u3001\u6587\u4EF6\u5939\u5FBD\u6807\u3001\u9876\u90E8\u63D0\u793A\u90FD\u8981\u8DDF\u7740\u91CD\u7B97\uFF0C
  // \u5426\u5219\u4F1A\u6B8B\u7559\u300C\u6709 N \u5904\u6539\u52A8\u8FD8\u6CA1\u53D1\u5E03\u300D\u800C\u4E09\u680F\u5DF2\u7ECF\u662F 0\u3002
  renderChanges(); renderFolders(); promptPending();
}

// ---- \u5355\u5E93\u4FE1\u606F\u6761 ----
// \u53EA\u663E\u793A\u5F53\u524D\u8FD9\u4E00\u4E2A\u5E93\uFF1A\u5E93\u540D \xB7 \u4ED3\u5E93 \xB7 \u7BC7\u6570 \xB7 \u6253\u5F00\u7F51\u9875 \xB7 \u8BBE\u7F6E\u3002
// \u4E0D\u94FA\u5361\u7247\u3001\u4E0D\u5360\u4E00\u6574\u5F20\u5361\u7684\u9AD8\u5EA6 \u2014\u2014 \u8FD9\u4E9B\u4FE1\u606F\u4E00\u773C\u5C31\u80FD\u770B\u5B8C\uFF0C\u5360\u4E00\u5927\u5757\u5730\u65B9\u7EAF\u5C5E\u6D6A\u8D39\u9996\u5C4F\u3002
// \uFF08\u547D\u4EE4\u884C\u7248\u5982\u679C\u914D\u7F6E\u8FC7\u591A\u4E2A\u8FDE\u63A5\uFF0C\u8FD9\u91CC\u7ED9\u4E00\u4E2A\u6781\u7A84\u7684\u4E0B\u62C9\u505A\u5207\u6362\u3002\uFF09
function renderVaults() {
  const bar = document.getElementById('vbar');
  if (!bar) return;
  const nameEl = document.getElementById('vbName');
  const repoEl = document.getElementById('vbRepo');
  const metaEl = document.getElementById('vbMeta');
  const linkEl = document.getElementById('vbLink');
  const cur = S.connections.find((c) => c.id === S.active) || null;
  const oldSel = bar.querySelector('select.vswitch');
  if (oldSel) oldSel.remove();

  if (!cur) {
    if (nameEl) nameEl.textContent = t('noConn');
    if (repoEl) repoEl.textContent = '';
    if (metaEl) metaEl.textContent = '';
    if (linkEl) linkEl.classList.add('hidden');
    return;
  }

  if (nameEl) nameEl.textContent = cur.name;
  if (repoEl) {
    repoEl.textContent = shortRepo(cur.repo) + ' \xB7 ' + cur.branch;
    repoEl.title = cur.repo;
  }
  if (metaEl) {
    metaEl.innerHTML = cur.vaultOk
      ? tf('vaultMetaHtml', cur.noteCount, cur.publicCount)
      : '<span class="vault-bad">' + t('noVault') + '</span>';
    metaEl.title = t('vaultTip') + (cur.vaultPath || t('vaultNone'));
  }
  if (linkEl) {
    if (cur.siteUrl) {
      linkEl.href = cur.siteUrl;
      linkEl.title = cur.siteUrl;
      linkEl.classList.remove('hidden');
    } else {
      linkEl.classList.add('hidden');
    }
  }

  // \u591A\u4E2A\u8FDE\u63A5\u65F6\uFF08\u53EA\u6709\u547D\u4EE4\u884C\u7248\u4F1A\u9047\u5230\uFF09\u7ED9\u4E00\u4E2A\u7D27\u51D1\u7684\u4E0B\u62C9
  if (S.connections.length > 1) {
    const sel = document.createElement('select');
    sel.className = 'vswitch';
    for (const c of S.connections) {
      const o = document.createElement('option');
      o.value = c.id;
      o.textContent = c.name;
      if (c.id === S.active) o.selected = true;
      sel.appendChild(o);
    }
    sel.onchange = async () => {
      try { await api('/api/connection/switch', { id: sel.value }); clearResult(); await loadState(); }
      catch (e) { setResult('err', t('switchFail') + e.message); sel.value = S.active; }
    };
    if (nameEl) nameEl.insertAdjacentElement('afterend', sel);
  }
}

// ---- \u65B0\u5EFA/\u4FEE\u6539\u8FDE\u63A5\uFF1A\u4E00\u4E2A\u5E93 + \u4E00\u4E2A\u4ED3\u5E93\uFF0C\u4E00\u6B65\u5B8C\u6210 ----
let setupConn = null, setupPicked = '';
// ---- \u81EA\u5B9A\u4E49\u5916\u89C2 ----
// \u5E93\u4E3B\u4EBA\u5728\u8FD9\u4E2A\u6846\u91CC\u7C98\u8D34 CSS\uFF0C\u4FDD\u5B58\u540E\u5199\u8FDB\u4ED3\u5E93\u7684 public/theme.css\uFF0C
// \u7531 layout.tsx \u4EE5 <link> \u5F15\u5165\uFF08\u89C1 build-content.mjs \u91CC\u7684 theme.generated.ts\uFF09\u3002
//
// \u4E3A\u4EC0\u4E48\u53EA\u7ED9 CSS\u3001\u4E0D\u7ED9\u6574\u9875\u6A21\u677F\uFF1A
//   \u7AD9\u70B9\u662F Next \u9759\u6001\u5BFC\u51FA\uFF0C\u9875\u9762\u7ED3\u6784\u5728 React \u91CC\u7F16\u8BD1\u597D\u4E86\uFF1B\u8981\u8BA9\u7528\u6237\u6539 HTML
//   \u5C31\u7B49\u4E8E\u628A\u6A21\u677F\u5F15\u64CE\u66B4\u9732\u51FA\u53BB\uFF0C\u5B89\u5168\u4E0E\u5347\u7EA7\u6210\u672C\u90FD\u4E0D\u662F\u8FD9\u4E2A\u9879\u76EE\u8BE5\u627F\u62C5\u7684\u3002
//   \u800C CSS \u8DB3\u4EE5\u6539\u989C\u8272\u3001\u5B57\u4F53\u3001\u95F4\u8DDD\u3001\u663E\u9690\u3001\u4F4D\u7F6E\uFF08flex/grid \u90FD\u53EF\u8986\u76D6\uFF09\uFF0C
//   \u53C8\u80FD\u4FDD\u8BC1\u7528\u6237\u5199\u7684\u4E1C\u897F\u6C38\u8FDC\u4E0D\u4F1A\u88AB\u5F53\u6210 HTML/JS \u6267\u884C\u3002
// \u5185\u7F6E\u9884\u8BBE\u5916\u89C2\u3002\u8FD9\u91CC\u662F\u4E00\u679A\u5360\u4F4D\u4E32\uFF0C\u7531 manager-core \u5728\u53D1\u51FA\u9875\u9762\u65F6\u66FF\u6362\u6210\u771F\u5B9E\u6570\u636E
// \uFF08\u672C\u6587\u4EF6\u6574\u4F53\u662F\u6A21\u677F\u5B57\u9762\u91CF\uFF0C\u4E0D\u80FD\u76F4\u63A5\u63D2\u503C\uFF1B\u9884\u8BBE\u5728 scripts/theme-presets.mjs \u91CC\uFF09\u3002
let PRESETS = "__THEME_PRESETS__";
if (typeof PRESETS === 'string') PRESETS = [];
// \u9884\u89C8\u56FE\u7684 id \u96C6\u5408\u3002\u8FD9\u91CC\u53EA\u9700\u8981\u77E5\u9053\u300C\u6709\u6CA1\u6709\u56FE\u300D\uFF0C\u56FE\u7247\u672C\u8EAB\u8D70
// /preset-preview/<id>.png \u73B0\u53D6\uFF08\u5185\u5D4C base64\uFF0C\u4E0D\u4F9D\u8D56\u78C1\u76D8\u4E0A\u7684\u56FE\u7247\u76EE\u5F55\uFF09\u3002
let PREVIEW_IDS = "__THEME_PREVIEW_IDS__";
if (!Array.isArray(PREVIEW_IDS)) PREVIEW_IDS = [];
// \u56FE\u7247\u5185\u5BB9\u54C8\u5E0C\u3002\u670D\u52A1\u5668\u7ED9\u9884\u89C8\u56FE\u8BBE\u4E86 86400 \u79D2\u7F13\u5B58\uFF0C\u6362\u4E86\u56FE\u4F46 URL \u4E0D\u53D8\u7684\u8BDD
// \u7528\u6237\u4F1A\u4E00\u76F4\u770B\u5230\u65E7\u56FE \u2014\u2014 \u62FC\u4E2A ?v= \u4E0A\u53BB\uFF0C\u56FE\u4E00\u6539 URL \u5C31\u53D8\u3002
let PREVIEW_VER = "__THEME_PREVIEW_VER__";
// \u6CA1\u88AB\u670D\u52A1\u7AEF\u66FF\u6362\u65F6\uFF08\u5360\u4F4D\u7B26\u539F\u6837\u7559\u7740\uFF09\u5C31\u5F53\u6CA1\u6709\u7248\u672C\u53F7\uFF0C\u522B\u628A __THEME_PREVIEW_VER__
// \u62FC\u8FDB URL \u91CC\u53D1\u4E00\u4E2A\u5FC5\u7136 404 \u7684\u8BF7\u6C42\u3002
if (typeof PREVIEW_VER !== 'string' || PREVIEW_VER.indexOf('__') >= 0) PREVIEW_VER = '';

// \u5199\u4F5C\u6307\u5357\u5F39\u7A97\uFF1A\u9762\u677F\u91CC\u585E\u4E0D\u4E0B\u4E5F\u4E0D\u8BE5\u585E\uFF08\u7528\u6237\u8981\u6C42\u9762\u677F\u6587\u5B57 \u226450 \u5B57\uFF09\uFF0C
// \u6240\u4EE5\u300C\u600E\u4E48\u5199\u300D\u5168\u90E8\u653E\u8FD9\u91CC\uFF0C\u70B9\u4E86\u6309\u94AE\u624D\u51FA\u73B0\uFF0C\u770B\u5B8C\u53EF\u4EE5\u4E00\u952E\u63D2\u8FDB\u7F16\u8F91\u5668\u3002
function openThemeGuide(onInsert) {
  const old = document.getElementById('themeGuideDlg');
  if (old) old.remove();
  const d = document.createElement('div');
  d.className = 'dialog'; d.id = 'themeGuideDlg';
  d.innerHTML =
    '<div class="panel wide guide-panel">' +
      '<h2 data-i18n="themeGuideTitle"></h2>' +
      '<div class="hint" data-i18n="themeGuideIntro"></div>' +
      '<div class="guide-sec">' +
        '<div class="gt" data-i18n="themeGuideVars"></div>' +
        '<pre class="guide-code">' +
          ':root {\\n' +
          '  --background: oklch(0.99 0.004 250);      /* \u9875\u9762\u5E95\u8272 */\\n' +
          '  --foreground: oklch(0.19 0.021 257);      /* \u6B63\u6587\u989C\u8272 */\\n' +
          '  --card: oklch(1 0 0);                     /* \u5361\u7247\u5E95\u8272 */\\n' +
          '  --primary: oklch(0.55 0.16 256);          /* \u5F3A\u8C03\u8272\uFF1A\u94FE\u63A5\u3001\u6309\u94AE */\\n' +
          '  --muted-foreground: oklch(0.53 0.019 255);/* \u6B21\u8981\u6587\u5B57 */\\n' +
          '  --border: oklch(0.916 0.008 253);         /* \u63CF\u8FB9 */\\n' +
          '  --radius: 0.625rem;                       /* \u5706\u89D2 */\\n' +
          '}\\n' +
          'html.dark {\\n' +
          '  --background: oklch(0.17 0.022 256);\\n' +
          '  --primary: oklch(0.72 0.155 252);\\n' +
          '}' +
        '</pre>' +
      '</div>' +
      '<div class="guide-sec">' +
        '<div class="gt" data-i18n="themeGuideHook"></div>' +
        '<pre class="guide-code">' +
          '[data-region="header"]  { /* \u9876\u680F */ }\\n' +
          '[data-region="folders"] { /* \u9996\u9875\u6587\u4EF6\u5939\u533A\uFF1A\u51E0\u5217 / \u5361\u7247\u8FD8\u662F\u5217\u8868 */ }\\n' +
          '[data-region="list"]    { /* \u7B14\u8BB0\u5217\u8868 */ }\\n' +
          '[data-region="tags"]    { /* \u6807\u7B7E\u680F */ }\\n' +
          '[data-region="article"] { /* \u6B63\u6587 */ }\\n' +
          '[data-region="footer"]  { /* \u9875\u811A */ }' +
        '</pre>' +
      '</div>' +
      '<div class="guide-sec">' +
        '<div class="gt" data-i18n="themeGuideFont"></div>' +
        '<pre class="guide-code">' +
          'body { font-family: "Songti SC", serif; }\\n' +
          '[data-region="article"] { font-size: calc(1.05 * var(--fsu)); }' +
        '</pre>' +
      '</div>' +
      '<div class="guide-note" data-i18n="themeGuideNote"></div>' +
      '<div class="actions">' +
        '<button class="ghost" id="guideClose" data-i18n="cancel"></button>' +
        '<button id="guideInsert" data-i18n="themeGuideInsert"></button>' +
      '</div>' +
    '</div>';
  document.body.appendChild(d);
  applyLang();
  const close = () => d.remove();
  d.querySelector('#guideClose').onclick = close;
  d.onclick = (e) => { if (e.target === d) close(); };
  d.querySelector('#guideInsert').onclick = () => {
    // \u53EA\u63D2\u5165\u300C\u989C\u8272\u300D\u8FD9\u4E00\u5757\uFF1A\u5B83\u662F\u5927\u591A\u6570\u4EBA\u771F\u6B63\u8981\u6539\u7684\u4E1C\u897F\u3002
    // \u7248\u9762\u9009\u62E9\u5668\u5757\u63D2\u8FDB\u53BB\u662F\u7A7A\u89C4\u5219\uFF0C\u63D2\u4E86\u53CD\u800C\u8981\u7528\u6237\u81EA\u5DF1\u5220\u3002
    const code = [
      '/* \u989C\u8272 / \u5706\u89D2\uFF1A\u8986\u76D6 :root \u91CC\u7684\u53D8\u91CF\u5373\u53EF\uFF0C\u6DF1\u8272\u6A21\u5F0F\u5199\u5728 html.dark \u4E0B */',
      ':root {',
      '  --background: oklch(0.99 0.004 250);',
      '  --foreground: oklch(0.19 0.021 257);',
      '  --primary: oklch(0.55 0.16 256);',
      '  --border: oklch(0.916 0.008 253);',
      '  --radius: 0.625rem;',
      '}',
    ].join('\\n');
    close();
    if (onInsert) onInsert(code);
  };
}

let themeReopen = null;
// keep=true\uFF1A\u5207\u8BED\u8A00\u540E\u91CD\u5F00\uFF0C\u7F16\u8F91\u5668\u91CC\u7684\u672A\u4FDD\u5B58\u5185\u5BB9\u8981\u4FDD\u4F4F\uFF0C\u522B\u88AB\u670D\u52A1\u5668\u7684\u65E7\u503C\u76D6\u6389
function openTheme(keep) {
  themeReopen = openTheme;
  const old = document.getElementById('themeDlg');
  if (old) old.remove();
  const d = document.createElement('div');
  d.className = 'dialog'; d.id = 'themeDlg';
  // \u8FD9\u6BB5 HTML \u5728\u670D\u52A1\u7AEF\u6A21\u677F\u5B57\u9762\u91CF\u91CC\uFF0C\u53EA\u80FD\u7528\u5355\u5F15\u53F7\u62FC\u63A5\uFF08\u4E0D\u80FD\u7528\u53CD\u5F15\u53F7/\u6A21\u677F\u5360\u4F4D\uFF09
  d.innerHTML =
    '<div class="panel wide">' +
      '<h2 data-i18n="themeTitle"></h2>' +
      '<div class="hint" data-i18n="themeIntro"></div>' +
      '<div class="preset-box" id="presetBox">' +
        '<button type="button" class="preset-current" id="presetCurrent" aria-haspopup="listbox" aria-expanded="false">' +
          '<span class="nm" id="presetCurrentName"></span>' +
          '<span class="caret">\u25BC</span>' +
        '</button>' +
        '<div class="preset-menu" id="presetMenu" hidden>' +
          '<div class="preset-list" id="presetRow" role="listbox"></div>' +
          '<div class="preset-desc" id="presetDesc"></div>' +
        '</div>' +
      '</div>' +
      // \u9884\u89C8\uFF1A\u9009\u4E2D\u7684\u90A3\u5957\u5230\u5E95\u957F\u4EC0\u4E48\u6837\u3002\u81EA\u5B9A\u4E49 CSS \u6CA1\u6CD5\u9884\u6E32\u67D3\uFF08\u7528\u6237\u5199\u4EC0\u4E48\u5C31\u662F\u4EC0\u4E48\uFF09\uFF0C
      // \u6240\u4EE5\u300C\u81EA\u5B9A\u4E49\u300D\u65F6\u4E0D\u663E\u793A\u56FE\uFF0C\u53EA\u7559\u4E00\u884C\u8BF4\u660E \u2014\u2014 \u7528\u6237\u660E\u786E\u8981\u6C42\u300C\u81EA\u5B9A\u4E49\u4E0D\u7528\u9884\u89C8\u300D\u3002
      '<div class="preset-preview" id="presetPreview">' +
        '<img id="presetPreviewImg" alt="">' +
      '</div>' +
      '<div class="preset-preview-empty" id="presetPreviewEmpty" data-i18n="themePresetCustom"></div>' +
      '<textarea class="theme-editor" id="themeCss" spellcheck="false" data-i18n-ph="themePlaceholder"></textarea>' +
      '<div class="theme-bar">' +
        '<button class="mini" id="themeGuide" data-i18n="themeGuideBtn"></button>' +
        '<button class="mini" id="themeClear" data-i18n="themeClear"></button>' +
        '<span class="cnt" id="themeCnt"></span>' +
      '</div>' +
      '<div class="theme-msg" id="themeMsg"></div>' +
      '<div class="actions">' +
        '<button class="ghost" id="themeClose" data-i18n="cancel"></button>' +
        '<button class="ghost" id="themeSave" data-i18n="themeSave"></button>' +
        '<button id="themePub" data-i18n="themeSavePublish"></button>' +
      '</div>' +
    '</div>';
  document.body.appendChild(d);
  applyLang();

  const $ = (id) => d.querySelector('#' + id);
  const ta = $('themeCss');
  const msg = $('themeMsg');
  const cnt = $('themeCnt');
  let maxBytes = 200 * 1024;

  const say = (kind, text) => { msg.className = 'theme-msg ' + kind; msg.textContent = text; };
  const clearMsg = () => { msg.className = 'theme-msg'; msg.textContent = ''; };

  // \u8BA1\u6570\u6309**\u5B57\u8282**\u7B97\uFF0C\u4E0E\u670D\u52A1\u7AEF\u7684 200KB \u4E0A\u9650\u4E00\u81F4\uFF1A
  // \u4E2D\u6587\u6CE8\u91CA\u4E00\u4E2A\u5B57\u7B26\u5360 3 \u5B57\u8282\uFF0C\u6309\u5B57\u7B26\u6570\u663E\u793A\u4F1A\u8BA9\u7528\u6237\u4EE5\u4E3A\u8FD8\u6709\u7A7A\u95F4\u5374\u88AB\u62D2\u7EDD\u3002
  const updateCount = () => {
    const bytes = new Blob([ta.value]).size;
    const over = bytes > maxBytes;
    cnt.className = 'cnt' + (over ? ' over' : '');
    // \u7528 KB \u663E\u793A\u66F4\u8D34\u8FD1\u4E0A\u9650\u7684\u8BED\u4E49\uFF08200KB \u7684\u4E0A\u9650\u6309\u5B57\u7B26\u6570\u8BF4\u6CA1\u6709\u610F\u4E49\uFF09
    cnt.textContent = (bytes / 1024).toFixed(1) + ' / ' + Math.round(maxBytes / 1024) + ' KB';
    $('themePub').disabled = over;
    $('themeSave').disabled = over;
  };

  ta.addEventListener('input', () => { updateCount(); clearMsg(); markPreset(matchPreset(ta.value)); });

  $('themeClose').onclick = () => d.remove();
  d.onclick = (e) => { if (e.target === d) d.remove(); };

  // \u9884\u8BBE\uFF1A\u4E00\u4E2A\u4E0B\u62C9\u6846\u3002\u6536\u8D77\u65F6\u53EA\u663E\u793A\u5F53\u524D\u8FD9\u5957\u7684\u540D\u5B57\uFF1B\u70B9\u5F00\u662F\u53EF\u6EDA\u52A8\u7684\u540D\u5B57\u5217\u8868\uFF0C
  // \u9F20\u6807\u505C\u5728\u67D0\u4E2A\u540D\u5B57\u4E0A\uFF0C\u6846\u5E95\u90A3\u884C\u7B80\u4ECB\u8DDF\u7740\u53D8\u3002\u9009\u4E2D\u540E\u628A\u6574\u5957 CSS \u586B\u8FDB\u7F16\u8F91\u5668
  // \uFF08\u4E0D\u76F4\u63A5\u4FDD\u5B58 \u2014\u2014 \u8BA9\u7528\u6237\u5148\u770B\u4E00\u773C\u3001\u6539\u4E24\u7B14\u518D\u4FDD\u5B58\uFF0C\u907F\u514D\u8BEF\u70B9\u5C31\u628A\u7EBF\u4E0A\u76AE\u80A4\u6362\u6389\uFF09\u3002
  const row = $('presetRow');
  const descEl = $('presetDesc');
  const boxEl = $('presetBox');
  const menuEl = $('presetMenu');
  const curEl = $('presetCurrent');
  const curNameEl = $('presetCurrentName');
  const pvBox = $('presetPreview');
  const pvImg = $('presetPreviewImg');
  const pvEmpty = $('presetPreviewEmpty');
  // \u300C\u9ED8\u8BA4\u300D\u4E5F\u5F53\u6210\u4E00\u5957\u53EF\u9009\u7684\u5916\u89C2\uFF1A\u5B83\u7684 CSS \u5C31\u662F\u7A7A\u4E32\uFF08\u6E05\u7A7A = \u56DE\u5230\u7AD9\u70B9\u81EA\u5E26\u4E3B\u9898\uFF09\u3002
  // \u5355\u72EC\u653E\u8FDB\u5217\u8868\u800C\u4E0D\u662F\u9760\u300C\u6CA1\u5339\u914D\u5230\u300D\u6765\u8868\u793A\uFF0C\u7528\u6237\u624D\u80FD\u5728\u6846\u91CC\u660E\u786E\u9009\u4E2D\u5B83\u3001\u770B\u5230\u5B83\u7684\u9884\u89C8\u3002
  const DEFAULT_PRESET = {
    id: 'default',
    name: { zh: '\u9ED8\u8BA4', en: 'Default' },
    desc: { zh: '\u7AD9\u70B9\u81EA\u5E26\uFF1A\u84DD\u767D\u914D\u8272 + \u4E09\u5217\u5361\u7247\u9996\u9875', en: 'Built-in: blue on white, three-column card home' },
    css: '',
  };
  const allPresets = () => [DEFAULT_PRESET].concat(PRESETS);
  const descOf = (p) => (p.desc && (p.desc[LANG] || p.desc.zh)) || '';
  const nameOf = (p) => (p.name && (p.name[LANG] || p.name.zh)) || p.id;
  const presetById = (id) => allPresets().find((p) => p.id === id) || null;
  // \u9884\u89C8\u56FE\uFF1A\u6709\u622A\u56FE\u5C31\u663E\u793A\uFF0C\u6CA1\u6709\uFF08\u7528\u6237\u81EA\u5DF1\u5199\u7684 CSS\uFF09\u5C31\u53EA\u7559\u4E00\u884C\u300C\u81EA\u5B9A\u4E49\u300D\u8BF4\u660E\u3002
  // \u7528\u6237\u660E\u786E\u8981\u6C42\u300C\u81EA\u5B9A\u4E49\u4E0D\u7528\u9884\u89C8\u300D\u2014\u2014 \u4ED6\u5199\u4EC0\u4E48\u5C31\u662F\u4EC0\u4E48\uFF0C\u6CA1\u6CD5\u9884\u6E32\u67D3\u3002
  const updatePreview = (id) => {
    if (!pvBox) return;
    const has = !!id && PREVIEW_IDS.indexOf(id) >= 0;
    pvBox.hidden = !has;
    pvEmpty.hidden = has;
    if (has) {
      pvImg.src = '/preset-preview/' + id + '.png' + (PREVIEW_VER ? '?v=' + PREVIEW_VER : '');
      pvImg.alt = nameOf(presetById(id) || DEFAULT_PRESET);
    } else {
      pvImg.removeAttribute('src');
    }
  };
  const showDesc = (p) => {
    if (!descEl) return;
    descEl.innerHTML = '';
    if (!p) {
      const s = document.createElement('span');
      s.textContent = t('themePresetCustom');
      descEl.appendChild(s);
      return;
    }
    const b = document.createElement('b');
    b.textContent = nameOf(p);
    const s = document.createElement('span');
    s.textContent = descOf(p);
    descEl.appendChild(b);
    descEl.appendChild(s);
  };
  // \u6536\u8D77\u65F6\u6309\u94AE\u4E0A\u663E\u793A\u4EC0\u4E48\uFF1A\u9009\u4E2D\u4E86\u67D0\u5957\u5C31\u663E\u793A\u5B83\uFF0C\u5426\u5219\u8BF4\u660E\u8FD9\u662F\u7528\u6237\u81EA\u5DF1\u6539\u8FC7\u7684
  const setCurrentName = (id) => {
    if (!curNameEl) return;
    const p = presetById(id);
    curNameEl.textContent = p ? nameOf(p) : t('themePresetCustom');
  };
  const openMenu = (on) => {
    if (!menuEl || !curEl || !boxEl) return;
    menuEl.hidden = !on;
    boxEl.classList.toggle('open', on);
    curEl.setAttribute('aria-expanded', on ? 'true' : 'false');
    if (on) {
      const p = presetById(matchPreset(ta.value));
      showDesc(p);
      if (p) updatePreview(p.id);
    }
  };
  const renderPresets = () => {
    if (!row) return;
    if (!PRESETS.length) { if (boxEl) boxEl.style.display = 'none'; return; }
    row.innerHTML = '';
    allPresets().forEach((p) => {
      const b = document.createElement('button');
      b.type = 'button';
      b.className = 'preset';
      b.dataset.id = p.id;
      b.setAttribute('role', 'option');
      b.textContent = nameOf(p);
      // title \u7559\u4E00\u4EFD\uFF0C\u65B9\u4FBF\u7528\u952E\u76D8/\u8BFB\u5C4F\u7684\u4EBA\u4E5F\u80FD\u62FF\u5230\u7B80\u4ECB
      b.title = descOf(p) ? nameOf(p) + '\uFF1A' + descOf(p) : nameOf(p);
      b.onmouseenter = () => { showDesc(p); updatePreview(p.id); };
      b.onfocus = () => { showDesc(p); updatePreview(p.id); };
      b.onclick = () => {
        ta.value = p.css;
        updateCount();
        clearMsg();
        markPreset(p.id);
        say('ok', p.id === 'default' ? t('themeCleared') : tf('themePresetApplied', nameOf(p)));
        openMenu(false);
        ta.focus();
      };
      row.appendChild(b);
    });
    markPreset(matchPreset(ta.value));
  };
  const markPreset = (id) => {
    if (!row) return;
    [...row.children].forEach((el) => el.classList.toggle('on', !!id && el.dataset.id === id));
    setCurrentName(id);
    const p = presetById(id);
    showDesc(p);
    updatePreview(id);
  };
  // \u7F16\u8F91\u5668\u91CC\u7684\u5185\u5BB9\u6B63\u597D\u7B49\u4E8E\u67D0\u5957\u9884\u8BBE\uFF08\u6216\u4E3A\u7A7A = \u9ED8\u8BA4\uFF09\u65F6\uFF0C\u4E0B\u62C9\u6846\u91CC\u628A\u5B83\u70B9\u4EAE\uFF0C
  // \u7528\u6237\u80FD\u4E00\u773C\u770B\u51FA\u300C\u6211\u73B0\u5728\u662F\u8FD9\u5957\u300D\u3002\u81EA\u5DF1\u6539\u8FC7\u7684\u5185\u5BB9\u5219\u663E\u793A\u300C\u81EA\u5B9A\u4E49\u300D\u3002
  const matchPreset = (css) => {
    // \u6CE8\u610F\uFF1A\u8FD9\u91CC\u662F\u6A21\u677F\u5B57\u9762\u91CF\uFF0Cs \u5FC5\u987B\u5199\u6210 \\s\uFF0C\u5426\u5219\u8F93\u51FA\u5230\u6D4F\u89C8\u5668\u5C31\u6210\u4E86 /s+/\uFF08\u5339\u914D\u5B57\u9762\u91CF s\uFF09\uFF0C
    // \u9884\u8BBE\u6BD4\u5BF9\u6C38\u8FDC\u4E0D\u7B49\uFF0C\u4E0B\u62C9\u6846\u4F1A\u4E00\u76F4\u663E\u793A\u300C\u81EA\u5B9A\u4E49\u300D\u3002
    const norm = (s) => String(s || '').replace(/\\s+/g, ' ').trim();
    const v = norm(css);
    if (!v) return 'default';
    const hit = PRESETS.find((p) => norm(p.css) === v);
    return hit ? hit.id : '';
  };

  // \u4E0B\u62C9\u6846\u7684\u5F00\u5408\uFF1A\u70B9\u6309\u94AE\u5207\u6362\uFF1B\u70B9\u522B\u5904\u3001\u6309 Esc \u6536\u8D77
  if (curEl) curEl.onclick = (e) => { e.stopPropagation(); openMenu(menuEl.hidden); };
  d.addEventListener('click', (e) => {
    if (boxEl && !boxEl.contains(e.target) && !menuEl.hidden) openMenu(false);
  });
  d.addEventListener('keydown', (e) => { if (e.key === 'Escape' && !menuEl.hidden) openMenu(false); });

  // \u8F7D\u5165\u5F53\u524D\u503C\uFF1A\u8BFB\u63A5\u53E3\u4E0D clone\u3001\u4E0D\u626B\u5E93\uFF0C\u5DE5\u4F5C\u526F\u672C\u6CA1\u51C6\u5907\u597D\u65F6\u8FD4\u56DE\u7A7A\u4E32\u3002
  // keep=true \u7528\u4E8E\u300C\u5207\u8BED\u8A00\u540E\u91CD\u5F00\u300D\uFF1A\u6B64\u65F6\u7F16\u8F91\u5668\u91CC\u5DF2\u7ECF\u6709\u7528\u6237\u6CA1\u4FDD\u5B58\u7684\u5185\u5BB9\uFF0C
  // \u4E0D\u80FD\u62FF\u670D\u52A1\u5668\u4E0A\u7684\u65E7\u503C\u628A\u5B83\u76D6\u6389\uFF0C\u53EA\u8865\u4E0A maxBytes \u4E0E\u9884\u8BBE\u5217\u8868\u3002
  say('', t('themeLoading'));
  api('/api/theme').then((r) => {
    maxBytes = r.maxBytes || maxBytes;
    if (keep) {
      updateCount();
      renderPresets();
      return;
    }
    ta.value = r.css || '';
    updateCount();
    renderPresets();
    if (!r.css) say('', t('themeEmpty'));
    else clearMsg();
  }).catch((e) => say('bad', t('themeLoadFail') + e.message));

  $('themeClear').onclick = () => {
    ta.value = '';
    updateCount();
    clearMsg();
    // \u6E05\u7A7A = \u56DE\u5230\u9ED8\u8BA4\u4E3B\u9898\uFF0C\u4E0B\u62C9\u6846\u8981\u663E\u793A\u300C\u9ED8\u8BA4\u300D\u800C\u4E0D\u662F\u300C\u81EA\u5B9A\u4E49\u300D
    markPreset('default');
    say('', t('themeCleared'));
    ta.focus();
  };

  // \u5199\u4F5C\u6307\u5357\uFF1A\u9762\u677F\u91CC\u53EA\u7559\u4E00\u884C\u8BF4\u660E\uFF08\u7528\u6237\u8981\u6C42\u9762\u677F\u6587\u5B57 \u226450 \u5B57\uFF09\uFF0C
  // \u5177\u4F53\u600E\u4E48\u5199\u653E\u8FDB\u8FD9\u4E2A\u6309\u94AE\uFF0C\u70B9\u4E86\u624D\u5C55\u5F00\uFF0C\u4E0D\u5360\u9762\u677F\u5730\u65B9\u3002
  $('themeGuide').onclick = () => openThemeGuide((code) => {
    ta.value = ta.value.trim() ? ta.value.replace(/\\s*$/, '\\n\\n') + code : code;
    updateCount();
    clearMsg();
    markPreset(matchPreset(ta.value));
    ta.focus();
  });

  const save = async (alsoPublish) => {
    const css = ta.value;
    const btn = alsoPublish ? $('themePub') : $('themeSave');
    const other = alsoPublish ? $('themeSave') : $('themePub');
    const old = btn.textContent;
    btn.disabled = true; other.disabled = true;
    btn.textContent = alsoPublish ? t('themePublishing') : t('themeSaving');
    clearMsg();
    // \u5F39\u7A97\u91CC\u7684\u63D0\u793A\u4F1A\u88AB\u300C\u4FDD\u5B58\u6210\u529F\u540E\u81EA\u52A8\u5173\u7A97\u300D\u541E\u6389\uFF0C\u6240\u4EE5\u540C\u65F6\u5728\u53F3\u4E0A\u89D2\u7559\u4E00\u6761\uFF1A
    // \u5173\u7A97\u4E4B\u540E\u7528\u6237\u8FD8\u80FD\u770B\u89C1\u300C\u5916\u89C2\u5DF2\u4FDD\u5B58\u5E76\u63A8\u9001 / \u5931\u8D25\u539F\u56E0\u300D\u3002
    const tid = alsoPublish ? toastOpen(t('toastThemeTitle'), t('toastStarting')) : 0;
    try {
      const r = alsoPublish
        ? await api('/api/theme/publish', { css })
        : await api('/api/theme', { css });
      if (alsoPublish) {
        if (r.failed) {
          // \u6587\u4EF6\u5DF2\u7ECF\u5199\u8FDB\u5DE5\u4F5C\u526F\u672C\uFF0C\u53EA\u662F\u6CA1\u63A8\u4E0A\u53BB \u2014\u2014 \u8FD9\u4E00\u70B9\u5FC5\u987B\u8BF4\u6E05\uFF0C
          // \u5426\u5219\u7528\u6237\u4F1A\u4EE5\u4E3A\u8FDE\u4FDD\u5B58\u90FD\u5931\u8D25\u4E86\uFF0C\u91CD\u5F00\u5F39\u7A97\u53D1\u73B0\u5185\u5BB9\u8FD8\u5728\uFF0C\u53CD\u800C\u66F4\u56F0\u60D1\u3002
          const msg = t('themePublishFail') + ((r.log && r.log[r.log.length - 1]) || '');
          say('bad', msg);
          toastSet(tid, 'bad', t('toastFailed'), msg);
        } else if (r.pushed) {
          const msg = (r.log && r.log[0]) || t('themeSaved');
          say('ok', msg);
          toastSet(tid, 'busy', t('toastThemeTitle'), t('toastPushed'), (r.log || []).join('\\n'));
          // \u5916\u89C2\u63A8\u9001\u4E5F\u8981\u7B49 Pages \u6784\u5EFA\uFF0C\u540C\u6837\u628A\u4E0A\u7EBF\u8FDB\u5EA6\u663E\u793A\u5230\u5E95
          if (r.commit) {
            let since = Date.now();
            try { const b = await api('/api/live'); if (b && b.generatedAt) since = b.generatedAt; } catch { /* \u53D6\u4E0D\u5230\u5C31\u9000\u56DE\u5F00\u59CB\u65F6\u523B */ }
            void waitUntilLive(since, r.commit, '', tid, 'theme');
          } else {
            toastSet(tid, 'ok', t('toastThemeOk'), msg);
          }
          setTimeout(() => { const x = document.getElementById('themeDlg'); if (x) x.remove(); }, 1600);
        } else {
          const msg = (r.log && r.log[0]) || t('themeSaved');
          say('ok', msg);
          toastSet(tid, 'ok', t('toastThemeSavedOnly'), msg);
        }
      } else {
        say('ok', t('themeSaved'));
        // \u300C\u53EA\u4FDD\u5B58\u300D\u4E5F\u8981\u63D0\u793A\uFF1A\u8FD9\u6761\u660E\u786E\u5199\u7740\u300C\u8FD8\u6CA1\u4E0A\u7EBF\u300D\uFF0C\u907F\u514D\u7528\u6237\u4EE5\u4E3A\u5DF2\u7ECF\u751F\u6548
        toastSet(tid, 'ok', t('toastThemeSavedOnly'), t('themeSaved'));
      }
      try { await loadState(); } catch (e) { /* \u72B6\u6001\u5237\u65B0\u5931\u8D25\u4E0D\u5F71\u54CD\u4FDD\u5B58\u7ED3\u679C */ }
    } catch (e) {
      const msg = (alsoPublish ? t('themePublishFail') : t('themeSaveFail')) + e.message;
      say('bad', msg);
      if (tid) toastSet(tid, 'bad', t('toastFailed'), msg);
    } finally {
      btn.disabled = false; other.disabled = false;
      btn.textContent = old;
      updateCount();
    }
  };

  $('themeSave').onclick = () => save(false);
  $('themePub').onclick = () => save(true);
}

// \u9876\u90E8\u300C\u8BBE\u7F6E\u300D\u6309\u94AE\uFF1A\u6CA1\u6709\u8FDE\u63A5\u65F6\u662F\u300C\u65B0\u5EFA\u300D\uFF0C\u6709\u8FDE\u63A5\u65F6\u7F16\u8F91\u5F53\u524D\u8FD9\u4E2A
function openActiveSetup() {
  const cur = S.connections.find((c) => c.id === S.active) || null;
  openSetup(cur, false);
}
// \u8FD9\u4E24\u4E2A\u53E5\u67C4\u4F9B\u5207\u8BED\u8A00\u65F6\u539F\u6837\u91CD\u5F00\u5F39\u7A97\u7528\uFF08\u5F39\u7A97\u5185\u5BB9\u662F\u51FD\u6570\u5185\u95ED\u5305\uFF0C\u5916\u90E8\u62FF\u4E0D\u5230\uFF09
let setupShowPick = null, authHelpReopen = null;
function openSetup(conn, keepPicked) {
  setupConn = conn || null;
  // keepPicked\uFF1A\u5207\u8BED\u8A00\u65F6\u91CD\u5F00\u5F39\u7A97\u8981\u7559\u4F4F\u7528\u6237\u5DF2\u7ECF\u9009\u597D\u7684\u6587\u4EF6\u5939
  if (!keepPicked) setupPicked = conn ? conn.vaultPath || '' : '';
  const old = document.getElementById('setupDlg');
  if (old) old.remove();

  const dlg = document.createElement('div');
  dlg.className = 'dialog'; dlg.id = 'setupDlg';
  // \u6CE8\u610F\uFF1A\u8FD9\u6BB5 HTML \u5904\u5728\u670D\u52A1\u7AEF UI \u6A21\u677F\u5B57\u9762\u91CF\u5185\u90E8\uFF0C\u56E0\u6B64\u4E0D\u80FD\u7528\u53CD\u5F15\u53F7\u4E0E\u6A21\u677F\u5360\u4F4D\u7B26\uFF0C
  // \u53EA\u80FD\u62FC\u63A5\u5B57\u7B26\u4E32\uFF08\u5426\u5219\u53CD\u5F15\u53F7\u4F1A\u63D0\u524D\u95ED\u5408\u5916\u5C42\u6A21\u677F\uFF09\u3002\u5360\u4F4D\u7B26\u7531\u4E0B\u9762\u7684 textContent \u586B\u3002
  dlg.innerHTML =
    '<div class="panel">' +
      '<h2 id="sTitle"></h2>' +
      '<div class="hint" data-i18n="setupHint"></div>' +
      '<div class="field">' +
        '<label data-i18n="step1"></label>' +
        '<div class="pickrow">' +
          '<input id="sVault" readonly data-i18n-ph="pickPlaceholder">' +
          '<button class="ghost" id="sPick" data-i18n="chooseFolder"></button>' +
        '</div>' +
        '<div class="picker" id="sPickMsg"></div>' +
      '</div>' +
      '<div class="field">' +
        '<label data-i18n="step2"></label>' +
        '<input id="sName" data-i18n-ph="namePlaceholder">' +
      '</div>' +
      '<div class="field">' +
        '<label data-i18n="step3"></label>' +
        '<div id="sRepoArea"></div>' +
      '</div>' +
      '<div id="sWarn"></div>' +
      '<div class="actions">' +
        '<button class="ghost" id="sCancel" data-i18n="cancel"></button>' +
        '<button id="sSave"></button>' +
      '</div>' +
    '</div>';
  document.body.appendChild(dlg);
  applyLang();   // \u586B\u4E0A\u9762\u90A3\u6279 data-i18n / data-i18n-ph

  const $ = (id) => dlg.querySelector('#' + id);
  $('sTitle').textContent = conn ? t('setupTitleEdit') : t('setupTitleNew');
  $('sSave').textContent = conn ? t('save') : t('create');
  $('sVault').value = setupPicked;
  $('sName').value = conn ? conn.name : '';

  // ---- \u2462 GitHub \u4ED3\u5E93\u533A\uFF1A\u5206\u300C\u5DF2\u6709\u8FDE\u63A5\uFF08\u53EA\u8BFB\uFF09\u300D\u4E0E\u300C\u65B0\u5EFA\uFF08\u4E09\u9009\u4E00\uFF09\u300D ----
  // \u7528\u6237\u4E4B\u524D\u7684\u56F0\u60D1\uFF1A\u300C\u8FDE\u63A5 GitHub\u300D\u88AB\u62C6\u6210\u4E24\u4E2A\u6309\u94AE\u3001\u4E0D\u77E5\u9053\u53BB\u54EA\u5EFA\u4ED3\u5E93\u3001\u4E0D\u77E5\u9053\u8981\u6388\u6743\u3002
  // \u73B0\u5728\u6536\u6210\u4E00\u5757\uFF1A\u9ED8\u8BA4\u4E00\u952E\u65B0\u5EFA\uFF0C\u9009\u300C\u6211\u5DF2\u5EFA\u597D\u300D\u624D\u51FA\u73B0\u5730\u5740\u8F93\u5165\u6846\u3002
  const repoArea = $('sRepoArea');
  let repoMode = 'auto';           // auto = \u4E00\u952E\u65B0\u5EFA\uFF1Bmanual = \u6211\u5DF2\u6709\u4ED3\u5E93
  let tokenOk = false;             // \u672C\u673A\u662F\u5426\u5DF2\u6709 GitHub \u6388\u6743
  let repoVal = conn ? conn.repo : '';

  const renderRepoArea = () => {
    repoArea.innerHTML = '';
    if (conn) {
      const ro = document.createElement('input');
      ro.value = conn.repo; ro.readOnly = true;
      repoArea.appendChild(ro);
      const tip = document.createElement('div');
      tip.className = 'picker';
      tip.textContent = t('repoLocked');
      repoArea.appendChild(tip);
      return;
    }

    const tabs = document.createElement('div');
    tabs.className = 'tabs';
    const mkTab = (key, label) => {
      const b = document.createElement('button');
      b.type = 'button';
      b.className = 'tab' + (repoMode === key ? ' on' : '');
      b.textContent = label;
      b.onclick = () => { repoMode = key; renderRepoArea(); };
      return b;
    };
    tabs.appendChild(mkTab('auto', t('tabAuto')));
    tabs.appendChild(mkTab('manual', t('tabManual')));
    repoArea.appendChild(tabs);

    if (repoMode === 'manual') {
      const inp = document.createElement('input');
      inp.id = 'sRepo'; inp.value = repoVal;
      inp.placeholder = t('repoPlaceholder');
      inp.oninput = () => { repoVal = inp.value; };
      repoArea.appendChild(inp);
      const tip = document.createElement('div');
      tip.className = 'picker';
      tip.textContent = t('repoTip');
      repoArea.appendChild(tip);
    } else {
      // \u4E00\u952E\u65B0\u5EFA\uFF1A\u53EA\u9700\u4E00\u4E2A\u4ED3\u5E93\u540D
      const row = document.createElement('div');
      row.className = 'pickrow';
      const inp = document.createElement('input');
      inp.id = 'sRepoName';
      inp.placeholder = t('repoNamePlaceholder');
      inp.value = repoVal ? (repoVal.split('/').pop() || '').replace(/.git$/, '') : '';
      row.appendChild(inp);
      const btn = document.createElement('button');
      btn.type = 'button'; btn.className = 'ghost';
      btn.id = 'sCreateRepo';
      btn.textContent = tokenOk ? t('createOnGitHub') : t('goAuthorize');
      btn.onclick = async () => {
        const rn = (inp.value || '').trim();
        if (!rn) { alert(t('needRepoName')); return; }
        if (!tokenOk) { showAuthHelp(); return; }
        btn.disabled = true; btn.textContent = t('creating');
        try {
          const r = await api('/api/repo/create', { repoName: rn, private: false }, 'POST');
          repoVal = r.repo;
          setResult('ok', t('createOk') + r.repo);
          renderRepoArea();
        } catch (e) {
          repoArea.appendChild(warnLine(t('createFail') + e.message));
        } finally {
          const b2 = document.getElementById('sCreateRepo');
          if (b2) { b2.disabled = false; b2.textContent = t('createOnGitHub'); }
        }
      };
      row.appendChild(btn);
      repoArea.appendChild(row);

      const tip = document.createElement('div');
      tip.className = 'picker' + (tokenOk ? ' ok' : '');
      tip.textContent = tokenOk ? t('tokenReady') : t('tokenMissing');
      repoArea.appendChild(tip);
    }
  };

  const warnLine = (text) => {
    const d = document.createElement('div');
    d.className = 'warnbox'; d.style.marginTop = '8px';
    d.textContent = text;
    return d;
  };

  // \u6388\u6743\u6307\u5F15\uFF1A\u4E0D\u5047\u88C5\u80FD\u66FF\u7528\u6237\u8F93\u5BC6\u7801\uFF0C\u76F4\u63A5\u7ED9\u51FA\u6700\u77ED\u53EF\u884C\u8DEF\u5F84
  const showAuthHelp = () => {
    authHelpReopen = showAuthHelp;
    const old2 = document.getElementById('authDlg');
    if (old2) old2.remove();
    const d2 = document.createElement('div');
    d2.className = 'dialog'; d2.id = 'authDlg';
    d2.innerHTML =
      '<div class="panel">' +
        '<h2 data-i18n="authTitle"></h2>' +
        '<div class="hint" data-i18n="authHint"></div>' +
        '<div class="warnbox" data-i18n-html="tokenWhere"></div>' +
        '<div class="actions">' +
          '<button class="ghost" id="authClose" data-i18n="authClose"></button>' +
          '<button id="authRetry" data-i18n="authRetry"></button>' +
        '</div>' +
      '</div>';
    document.body.appendChild(d2);
    applyLang();
    d2.querySelector('#authClose').onclick = () => d2.remove();
    d2.onclick = (e) => { if (e.target === d2) d2.remove(); };
    d2.querySelector('#authRetry').onclick = async () => {
      const b = d2.querySelector('#authRetry');
      b.disabled = true; b.textContent = t('checking');
      try {
        const r = await api('/api/auth/status');
        tokenOk = !!r.token;
        if (tokenOk) { d2.remove(); setResult('ok', t('authFound')); renderRepoArea(); }
        else { b.disabled = false; b.textContent = t('authRetry'); setResult('err', t('authNotFound')); }
      } catch (e) {
        b.disabled = false; b.textContent = t('authRetry');
        setResult('err', t('checkFail') + e.message);
      }
    };
  };

  renderRepoArea();
  // \u540E\u53F0\u95EE\u4E00\u6B21\u6709\u6CA1\u6709\u6388\u6743\uFF08\u4E0D\u963B\u585E\u754C\u9762\uFF09
  api('/api/auth/status').then((r) => {
    tokenOk = !!r.token;
    if (!conn) renderRepoArea();
  }).catch(() => {});

  const showPick = (p) => {
    setupShowPick = showPick;
    const m = $('sPickMsg');
    if (!p) { m.className = 'picker'; m.textContent = ''; return; }
    // \u5E93\u91CC\u5FC5\u987B\u6709 .obsidian \u624D\u662F\u5408\u6CD5 Obsidian \u5E93\uFF1B\u6CA1\u6709\u4E5F\u8BA9\u7528\u6237\u770B\u5230\u81EA\u5DF1\u9009\u4E86\u4EC0\u4E48
    m.className = 'picker ok';
    m.textContent = t('pickOk') + p;
    if (!conn && !$('sName').value) {
      // UI \u6A21\u677F\u91CC\u7684\u53CD\u659C\u6760\u8981\u6309\u300C\u6D4F\u89C8\u5668\u6700\u7EC8\u770B\u5230\u7684\u6E90\u7801\u300D\u7B97\u5C42\u6570\uFF0C\u8FD9\u91CC\u5E72\u8106\u4E0D\u7528\u6B63\u5219\uFF1A
      // \u6587\u4EF6\u91CC\u5199\u56DB\u4E2A\u53CD\u659C\u6760 = \u6A21\u677F\u6C42\u503C\u540E\u4E24\u4E2A = \u5B57\u7B26\u4E32\u5B57\u9762\u91CF\u4E00\u4E2A\u53CD\u659C\u6760
      const sep = p.indexOf('\\\\') >= 0 ? '\\\\' : '/'
      const parts = p.split(sep)
      const base = parts.filter(Boolean).pop() || ''
      if (base) $('sName').value = base;
    }
  };
  showPick(setupPicked);

  $('sPick').onclick = async () => {
    $('sPick').disabled = true; $('sPick').textContent = t('pickWait');
    // \u539F\u751F\u6587\u4EF6\u5939\u5BF9\u8BDD\u6846\u662F\u6A21\u6001\u7684\uFF0C\u670D\u52A1\u7AEF\u4F1A\u4E00\u76F4\u7B49\u7528\u6237\u70B9\u5B8C\uFF08\u6700\u957F 5 \u5206\u949F\uFF09\u3002
    // \u4E07\u4E00\u5BF9\u8BDD\u6846\u88AB\u6D4F\u89C8\u5668\u6321\u4F4F\u3001\u7528\u6237\u4EE5\u4E3A\u5361\u6B7B\u4E86\uFF0C\u8FD9\u91CC\u7ED9\u4E00\u4E2A\u66F4\u77ED\u7684\u515C\u5E95\uFF1A
    // \u5230\u70B9\u540E\u89E3\u9501\u6309\u94AE\u5E76\u63D0\u793A\u600E\u4E48\u627E\u56DE\u5F39\u7A97\uFF0C\u907F\u514D\u754C\u9762\u6C38\u8FDC\u505C\u5728\u300C\u8BF7\u5728\u5F39\u7A97\u4E2D\u9009\u62E9\u2026\u300D\u3002
    let timedOut = false;
    const guard = setTimeout(() => {
      timedOut = true;
      $('sPick').disabled = false; $('sPick').textContent = t('chooseFolder');
      $('sPickMsg').className = 'picker bad';
      $('sPickMsg').textContent = t('pickTimeout');
    }, 200000);
    try {
      const r = await api('/api/browse', {}, 'POST');
      if (timedOut) return;
      if (r.path) { setupPicked = r.path; $('sVault').value = r.path; showPick(r.path); }
    } catch (e) {
      if (!timedOut) { $('sPickMsg').className = 'picker bad'; $('sPickMsg').textContent = t('pickFail') + e.message; }
    }
    finally { clearTimeout(guard); if (!timedOut) { $('sPick').disabled = false; $('sPick').textContent = t('chooseFolder'); } }
  };

  const close = () => dlg.remove();
  $('sCancel').onclick = close;
  dlg.onclick = (e) => { if (e.target === dlg) close(); };

  $('sSave').onclick = async () => {
    const warn = $('sWarn');
    warn.innerHTML = '';
    const name = $('sName').value.trim();
    if (!setupPicked) { warn.innerHTML = '<div class="warnbox">' + t('mustPickVault') + '</div>'; return; }
    if (!repoVal) {
      warn.innerHTML = '<div class="warnbox">' + (conn ? t('mustFillRepo') : t('mustCreateRepo')) + '</div>';
      return;
    }
    $('sSave').disabled = true;
    try {
      if (conn) {
        // \u5DF2\u6709\u8FDE\u63A5\uFF1A\u53EA\u66F4\u65B0\u672C\u5730\u5E93\u8DEF\u5F84\u4E0E\u663E\u793A\u540D
        const r = await api('/api/connection/vault', { vaultPath: setupPicked, id: conn.id });
        if (name && name !== conn.name) await api('/api/connection/rename', { id: conn.id, name });
        if (r && r.warn) warn.innerHTML = '<div class="warnbox">' + esc(r.warn) + '</div>';
      } else {
        const r = await api('/api/connection/setup', {
          name, repo: repoVal, branch: 'main', vaultPath: setupPicked, initFromTemplate: true,
        });
        if (r && r.warn) { warn.innerHTML = '<div class="warnbox">' + esc(r.warn) + '</div>'; $('sSave').disabled = false; return; }
      }
      close();
      setResult('ok', conn ? t('saved') : t('created'));
      await loadState();
    } catch (e) {
      warn.innerHTML = '<div class="warnbox">' + esc(e.message) + '</div>';
      $('sSave').disabled = false;
      // \u5EFA\u8FDE\u63A5\u65F6\u56E0\u4E3A\u300C\u6CA1\u6709 GitHub \u6388\u6743\u300D\u5931\u8D25\uFF0C\u662F\u6700\u5E38\u89C1\u7684\u5361\u70B9\uFF1A
      // \u5F53\u573A\u628A\u6388\u6743\u5F39\u7A97\u6253\u5F00\uFF0C\u7528\u6237\u4E0D\u7528\u81EA\u5DF1\u53BB\u627E\u5165\u53E3\u3002
      if (e.needAuth) openAuthDialog();
    }
  };
}

// HTML \u8F6C\u4E49\uFF1A\u62FC innerHTML \u65F6\u5FC5\u987B\u8FC7\u4E00\u904D\uFF08\u6587\u4EF6\u5939\u540D\u3001\u7B14\u8BB0\u8DEF\u5F84\u3001\u670D\u52A1\u7AEF\u9519\u8BEF\u6587\u6848\u90FD\u53EF\u80FD\u5E26 < > "\uFF09\u3002
// \u540C\u4E00\u4EFD UI \u91CC setResult \u7528 textContent\uFF0C\u8FD9\u91CC\u5374\u62FC\u5B57\u7B26\u4E32\uFF0C\u8F6C\u4E49\u7EAA\u5F8B\u4E0D\u4E00\u81F4\u66FE\u662F XSS \u7F3A\u53E3\u3002
function esc(s) {
  return String(s == null ? '' : s).replace(/[&<>"']/g, function (c) {
    return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c];
  });
}

function renderFolders() {
  const q = document.getElementById('q').value.trim().toLowerCase();
  const grid = document.getElementById('folders');
  grid.innerHTML = '';
  // \u4E0E\u4E0A\u9762\u4E09\u680F\u7528\u540C\u4E00\u4EFD\u53E3\u5F84\uFF1A\u81EA\u52A8\u540C\u6B65\u5F00\u5173\u5F00\u7740\u7684\u7C7B\u522B\u7531\u540E\u53F0\u81EA\u5DF1\u53D1\uFF0C\u4E0D\u7B97\u300C\u5F85\u5904\u7406\u300D\uFF0C
  // \u5426\u5219\u6587\u4EF6\u5939\u91CC\u4F1A\u4E00\u76F4\u6302\u7740 ~ / - \u5FBD\u6807\uFF0C\u8DDF\u4E09\u680F\u663E\u793A\u7684 0 \u5BF9\u4E0D\u4E0A\u3002
  const CH = manualChanges();
  // path -> 'add' | 'mod' | 'del'\uFF0C\u7528\u4E8E\u7ED9\u6BCF\u4E00\u884C\u6253\u6807\u7B7E
  const chgOf = new Map();
  for (const p of CH.added) chgOf.set(p, 'add');
  for (const p of CH.modified) chgOf.set(p, 'mod');
  for (const p of CH.deleted) chgOf.set(p, 'del');

  const folders = new Map();
  const push = (n) => {
    const f = n.path.includes('/') ? n.path.split('/').slice(0, -1).join('/') : '';
    if (!folders.has(f)) folders.set(f, []);
    folders.get(f).push(n);
  };
  for (const n of S.notes) {
    if (q && !(n.title + n.path).toLowerCase().includes(q)) continue;
    push(n);
  }
  // \u7EBF\u4E0A\u6709\u3001\u672C\u5730\u5DF2\u7ECF\u6CA1\u6709\u7684\u7B14\u8BB0\uFF1A\u4E5F\u6302\u8FDB\u6240\u5C5E\u6587\u4EF6\u5939\uFF0C\u7528\u5220\u9664\u6837\u5F0F\u663E\u793A\uFF0C
  // \u5426\u5219\u7528\u6237\u53EA\u4F1A\u770B\u5230\u300C\u7EBF\u4E0A\u591A\u51FA\u6765\u4E00\u7BC7\u300D\u5374\u5728\u8FD9\u4E2A\u5217\u8868\u91CC\u627E\u4E0D\u5230\u5B83\u3002
  // \u6CE8\u610F\uFF1A\u672C\u5730\u8FD8\u5728\u3001\u53EA\u662F\u5173\u4E86 public \u7684\u7B14\u8BB0\u5DF2\u7ECF\u5728 S.notes \u91CC\uFF08\u4F1A\u88AB\u6253\u4E0A\u300C\u5220\u9664\u300D\u6807\u7B7E\uFF09\uFF0C
  // \u8FD9\u91CC\u5FC5\u987B\u8DF3\u8FC7\uFF0C\u5426\u5219\u540C\u4E00\u7BC7\u4F1A\u5728\u5217\u8868\u91CC\u51FA\u73B0\u4E24\u6B21\u3002
  const localPaths = new Set(S.notes.map((n) => n.path));
  for (const p of CH.deleted) {
    if (localPaths.has(p)) continue;
    if (q && !p.toLowerCase().includes(q)) continue;
    push({ path: p, title: p.replace(/.(md|markdown)$/i, '').split('/').pop(), isPublic: true, gone: true });
  }
  const keys = [...folders.keys()].sort((a, b) => (a === '' ? -1 : b === '' ? 1 : a < b ? -1 : 1));
  const ungroupedEl = document.getElementById('ungrouped');
  if (ungroupedEl) ungroupedEl.innerHTML = '';
  const rest = [];   // \u6709\u6587\u4EF6\u5939\u7684\u76D2\u5B50\uFF0C\u7A0D\u540E\u6309\u5217\u5206\u914D
  for (const f of keys) {
    const items = folders.get(f);
    // \u6761\u76EE\u6570\u6309\u5217\u8868\u91CC\u5B9E\u9645\u663E\u793A\u7684\u884C\u7B97\uFF08\u5DF2\u5220\u9664\u7684\u4E5F\u7B97\u4E00\u884C\uFF0C\u5426\u5219\u53EA\u5269\u300C\u5220\u9664\u300D\u9879\u7684\u6587\u4EF6\u5939\u4F1A\u663E\u793A 0 \u7BC7\uFF09
    const realCount = items.length;
    // \u6709\u6539\u52A8\u7684\u6392\u524D\u9762\uFF1A\u65B0\u589E \u2192 \u4FEE\u6539 \u2192 \u5220\u9664 \u2192 \u672A\u53D8
    const rank = (n) => { const c = n.gone ? 'del' : chgOf.get(n.path); return c === 'add' ? 0 : c === 'mod' ? 1 : c === 'del' ? 2 : 3; };
    items.sort((a, b) => rank(a) - rank(b));
    const cntAdd = items.filter((n) => !n.gone && chgOf.get(n.path) === 'add').length;
    const cntMod = items.filter((n) => !n.gone && chgOf.get(n.path) === 'mod').length;
    const cntDel = items.filter((n) => n.gone || chgOf.get(n.path) === 'del').length;
    const collapsed = S.collapsed.has(f);   // \u6536\u8D77\u72B6\u6001\u8BB0\u5728 S.collapsed \u91CC\uFF0C\u8DE8\u91CD\u6E32\u67D3\u4FDD\u7559
    const box = document.createElement('div'); box.className = 'box';
    const head = document.createElement('div'); head.className = 'box-head';
    head.innerHTML = '<span class="chev' + (collapsed ? '' : ' open') + '">\u25B6</span><span class="name">' + esc(f || t('uncategorized')) + '</span>';
    // \u6587\u4EF6\u5939\u4E0A\u7684\u53D8\u66F4\u6458\u8981\uFF1A+\u65B0\u589E ~\u4FEE\u6539 -\u5220\u9664
    const sum = document.createElement('span'); sum.className = 'sum';
    const chip = (cls, label, tip) => { const s = document.createElement('span'); s.className = 'chg ' + cls; s.textContent = label; s.title = tip; sum.appendChild(s); };
    if (cntAdd) chip('add', '+' + cntAdd, t('chgTipAdded'));
    if (cntMod) chip('mod', '~' + cntMod, t('chgTipModified'));
    if (cntDel) chip('del', '-' + cntDel, t('chgTipDeleted'));
    if (sum.children.length) head.appendChild(sum);
    const cnt = document.createElement('span'); cnt.className = 'cnt'; cnt.textContent = tf('countNotes', realCount);
    head.appendChild(cnt);
    const mk = (label, cls, pub) => { const b = document.createElement('button'); b.className = 'mini ' + cls; b.textContent = label; b.onclick = (e) => { e.stopPropagation(); toggleBatch(f, pub); }; return b; };
    head.appendChild(mk(t('pubAllMini'), 'green', true));
    head.appendChild(mk(t('privAllMini'), '', false));
    head.onclick = () => {
      const nowCollapsed = !S.collapsed.has(f);
      if (nowCollapsed) S.collapsed.add(f); else S.collapsed.delete(f);
      const list = box.querySelector('ul');
      list.style.display = nowCollapsed ? 'none' : '';
      head.querySelector('.chev').classList.toggle('open', !nowCollapsed);
    };
    box.appendChild(head);
    const ul = document.createElement('ul');
    if (collapsed) ul.style.display = 'none';
    for (const n of items) {
      const chg = n.gone ? 'del' : chgOf.get(n.path) || null;
      const li = document.createElement('li');
      if (n.gone) li.className = 'gone';
      // \u53D8\u66F4\u6807\u7B7E\uFF1A\u65B0\u589E/\u4FEE\u6539/\u5220\u9664
      if (chg) {
        const b = document.createElement('span');
        b.className = 'chg ' + chg;
        b.textContent = t(chg === 'add' ? 'chgAdded' : chg === 'mod' ? 'chgModified' : 'chgDeleted');
        b.title = t(chg === 'add' ? 'chgTipAdded' : chg === 'mod' ? 'chgTipModified' : 'chgTipDeleted');
        li.appendChild(b);
      }
      const ts = document.createElement('span'); ts.className = 't'; ts.title = n.path; ts.textContent = n.title;
      li.appendChild(ts);
      // \u5DF2\u5220\u9664\u7684\u6761\u76EE\uFF08\u7EBF\u4E0A\u6709\u3001\u672C\u5730\u6CA1\u4E86\uFF09\u4E0D\u518D\u663E\u793A\u516C\u5F00/\u79C1\u5BC6\u6807\u7B7E\uFF0C\u5B83\u5DF2\u7ECF\u4E0D\u5B58\u5728\u4E86
      if (!n.gone) {
        const tag = document.createElement('span');
        tag.className = n.isPublic ? 'pub' : 'pri';
        tag.textContent = n.isPublic ? t('pub') : t('pri');
        li.appendChild(tag);
      }
      if (!n.gone) {
        // \u516C\u5F00\u5F00\u5173\uFF1A\u65B0\u589E\u7684\u7B14\u8BB0\u4E5F\u8D70\u540C\u4E00\u4E2A\u5F00\u5173\uFF0C\u548C\u6587\u4EF6\u5939\u4E0A\u7684\u300C\u5168\u90E8\u516C\u5F00/\u5168\u90E8\u79C1\u5BC6\u300D\u8054\u52A8
        const sw = document.createElement('button'); sw.className = 'sw' + (n.isPublic ? ' on' : '');
        sw.onclick = async () => {
          try { await api('/api/toggle', { path: n.path, pub: !n.isPublic }); }
          catch (e) { setResult('err', t('toggleFail') + e.message); return; }
          n.isPublic = !n.isPublic;
          // \u516C\u5F00\u72B6\u6001\u4E00\u53D8\uFF0C\u53D8\u66F4\u5206\u7C7B\uFF08\u65B0\u589E/\u5220\u9664\uFF09\u4E5F\u8DDF\u7740\u53D8\uFF0C\u91CD\u65B0\u62C9\u4E00\u6B21\u72B6\u6001
          await refreshChanges();
          promptPending();
        };
        li.appendChild(sw);
      }
      ul.appendChild(li);
    }
    box.appendChild(ul);
    // \u5E93\u6839\u76EE\u5F55\u4E0B\u7684\u7B14\u8BB0\uFF08\u6CA1\u6709\u6587\u4EF6\u5939\uFF09\u5355\u72EC\u4E00\u5757\uFF0C\u4E0D\u6DF7\u8FDB\u6587\u4EF6\u5939\u5217
    if (f === '' && ungroupedEl) ungroupedEl.appendChild(box);
    else rest.push(box);
  }
  // \u6587\u4EF6\u5939\u6309\u5217\u5206\u914D\uFF1A\u7B2C i \u4E2A\u6587\u4EF6\u5939\u56FA\u5B9A\u843D\u5728\u7B2C i % N \u5217\u3002
  // \u5C55\u5F00/\u6536\u8D77\u65F6\u53EA\u6709\u5B83\u81EA\u5DF1\u90A3\u4E00\u5217\u53D8\u9AD8\uFF0C\u5176\u5B83\u5217\u7EB9\u4E1D\u4E0D\u52A8\uFF0C\u4E5F\u4E0D\u4F1A\u56E0\u4E3A\u884C\u9AD8\u5BF9\u9F50\u7559\u4E0B\u7A7A\u767D\u3002
  if (rest.length) {
    const nCols = Math.max(1, Math.min(3, Math.floor(((grid.clientWidth || window.innerWidth) + 12) / 332)));
    const cols = [];
    for (let i = 0; i < nCols; i++) {
      const col = document.createElement('div');
      col.className = 'grid-col';
      grid.appendChild(col);
      cols.push(col);
    }
    rest.forEach((box, i) => cols[i % nCols].appendChild(box));
  } else if (!(ungroupedEl && ungroupedEl.children.length) && S.notes.length === 0 && CH.deleted.length === 0) {
    const card = document.createElement('div');
    card.className = 'card';
    card.style.flex = '1 1 0';
    card.textContent = S.connections.length === 0 ? t('emptyNoConn') : t('emptyNoNotes');
    grid.appendChild(card);
  }
}

// \u7A97\u53E3\u5BBD\u5EA6\u53D8\u5316\u65F6\u91CD\u65B0\u5206\u5217\uFF08\u5217\u6570\u53D8\u4E86\u8981\u91CD\u65B0\u5206\u914D\u6587\u4EF6\u5939\uFF09\uFF0C\u9632\u6296 150ms
let _gridResizeT = 0;
window.addEventListener('resize', () => {
  clearTimeout(_gridResizeT);
  _gridResizeT = setTimeout(() => { if (S.notes) renderFolders(); }, 150);
});

// \u53EA\u5237\u65B0\u300C\u53D8\u66F4\u5206\u7C7B + \u7B14\u8BB0\u5217\u8868\u300D\uFF0C\u7528\u4E8E\u516C\u5F00\u5F00\u5173\u5207\u6362\u540E\u540C\u6B65\u6807\u7B7E\uFF08\u4E0D\u6574\u9875\u91CD\u8F7D\uFF09
async function refreshChanges() {
  try {
    const next = await api('/api/state');
    S.notes = next.notes;
    S.changes = next.changes;
    S.autoSync = next.autoSync;
    if (Array.isArray(next.autoLog)) S.autoLog = next.autoLog;
    renderChanges(); renderFolders(); updateVaultCounts(); renderAutoLog();
  } catch {
    /* \u5237\u65B0\u5931\u8D25\u4E0D\u5F71\u54CD\u4E3B\u6D41\u7A0B\uFF0C\u4E0B\u6B21 loadState \u4F1A\u7EA0\u6B63 */
  }
}
// \u5207\u516C\u5F00\u72B6\u6001\u540E\uFF0C\u53EA\u66F4\u65B0\u4FE1\u606F\u6761\u4E0A\u7684\u8BA1\u6570\uFF0C\u4E0D\u6574\u9875\u91CD\u6E32\u67D3\uFF08\u907F\u514D\u6EDA\u52A8\u4F4D\u7F6E\u4E22\u5931\uFF09
function updateVaultCounts() {
  const cur = S.connections.find((c) => c.id === S.active);
  if (!cur) return;
  cur.publicCount = S.notes.filter((n) => n.isPublic).length;
  const metaEl = document.getElementById('vbMeta');
  if (metaEl) metaEl.innerHTML = tf('vaultMetaHtml', cur.noteCount, cur.publicCount);
}
async function toggleBatch(folder, pub) {
  for (const n of S.notes) {
    const f = n.path.includes('/') ? n.path.split('/').slice(0, -1).join('/') : '';
    if (f === folder && n.isPublic !== pub) { await api('/api/toggle', { path: n.path, pub }); n.isPublic = pub; }
  }
  await refreshChanges(); updateVaultCounts(); promptPending();
}
// \u4E00\u952E\u6536\u8D77 / \u4E00\u952E\u5C55\u5F00\uFF1A\u53EA\u6539 S.collapsed\uFF0C\u518D\u91CD\u6E32\u67D3\uFF08\u91CD\u6E32\u67D3\u4F1A\u8BFB\u53D6\u8BE5\u96C6\u5408\uFF09
function collapseAllFolders() {
  for (const n of S.notes) {
    const f = n.path.includes('/') ? n.path.split('/').slice(0, -1).join('/') : '';
    S.collapsed.add(f);
  }
  renderFolders();
}
function expandAllFolders() {
  S.collapsed.clear();
  renderFolders();
}
async function toggleAll(pub) {
  for (const n of S.notes) if (n.isPublic !== pub) { await api('/api/toggle', { path: n.path, pub }); n.isPublic = pub; }
  await refreshChanges(); updateVaultCounts(); promptPending();
}

// \u53D1\u5E03\uFF1A\u9876\u90E8\u72B6\u6001\u680F\u4FDD\u7559\u4E00\u53E5\u8BDD\u7ED3\u8BBA\uFF0C\u53F3\u4E0A\u89D2\u53E6\u5F00\u4E00\u6761\u8FDB\u5EA6\u63D0\u793A\uFF08\u4ECE\u8F6C\u5708\u8D70\u5230 \u2713/\u2717\uFF09\u3002
async function doPublish() {
  const btn = document.getElementById('pubBtn');
  btn.disabled = true;
  const old = btn.textContent; btn.textContent = t('publishing');
  const tid = toastOpen(t('toastPublishTitle'), t('toastStarting'));
  // \u57FA\u7EBF\u5FC5\u987B\u5728**\u63A8\u9001\u5B8C\u6210\u4E4B\u540E**\u53D6\u3002\u63A8\u9001\u524D\u53D6\u7684\u8BDD\uFF0C\u4E0A\u4E00\u7B14\u63D0\u4EA4\u7684\u6784\u5EFA\u5982\u679C\u6B63\u597D\u5728\u8FD9\u51E0\u79D2\u5185
  // \u843D\u5730\uFF0C\u5C31\u4F1A\u88AB\u8BEF\u5224\u6210\u300C\u672C\u6B21\u5DF2\u4E0A\u7EBF\u300D\u2014\u2014\u5B9E\u6D4B\u8E29\u5230\u8FC7\uFF1A\u72B6\u6001\u680F\u663E\u793A\u300C\u5DF2\u4E0A\u7EBF\uFF08\u7528\u65F6 5 \u79D2\uFF09\u300D\uFF0C
  // \u4F46\u5B9E\u9645\u90E8\u7F72\u7684\u662F\u4E0A\u4E00\u7248\u3002\u63A8\u9001\u540E\u518D\u53D6\uFF0C\u57FA\u7EBF\u91CC\u5DF2\u7ECF\u5305\u542B\u4EFB\u4F55\u66F4\u65E9\u5B8C\u6210\u7684\u6784\u5EFA\uFF0C
  // \u672C\u6B21\u6784\u5EFA\u7684 generatedAt \u5FC5\u7136\u66F4\u5927\u3002
  const publishStart = Date.now();
  try {
    const r = await api('/api/publish', undefined, 'POST');
    const lines = r.log || [];
    // \u6210\u8D25\u7531\u670D\u52A1\u7AEF\u7ED9\u7684\u7ED3\u6784\u5316\u5B57\u6BB5\u5224\u65AD\uFF0C\u4E0D\u80FD\u9760\u65E5\u5FD7\u91CC\u6709\u6CA1\u6709\u300C\u5931\u8D25\u300D\u4E24\u4E2A\u5B57\uFF08\u6362\u8BED\u8A00\u5C31\u5931\u6548\uFF09
    const summary = lines[0] || t('publishDone');
    if (r.failed) {
      // \u63A8\u9001\u5931\u8D25\u65F6\uFF0C\u754C\u9762\u4E0A\u5FC5\u987B\u4E00\u773C\u770B\u51FA\u300C\u6CA1\u4E0A\u7EBF\u300D\u2014\u2014\u771F\u5B9E\u8E29\u8FC7\u5751\uFF1A\u5931\u8D25\u90A3\u884C\u5939\u5728
      // \u51E0\u6761\u6210\u529F\u65E5\u5FD7\uFF08\u672C\u5730\u5199\u5165 / \u7AD9\u540D\u53D8\u91CF\u540C\u6B65\uFF09\u4E2D\u95F4\uFF0C\u7528\u6237\u4EE5\u4E3A\u5DF2\u7ECF\u53D1\u5E03\u4E86\u3002
      // \u7F51\u7EDC\u7C7B\u5931\u8D25\u5355\u72EC\u7ED9\u4E00\u53E5\u4EBA\u8BDD\uFF08\u591A\u534A\u662F\u52A0\u901F\u5668\uFF09\uFF0C\u5177\u4F53\u62A5\u9519\u964D\u5230\u6700\u540E\u4E00\u884C\u3002
      if (r.failKind === 'network') {
        toastSet(tid, 'bad', t('toastFailed'), t('pushNetworkFail'), lines.join('\\n'));
      } else {
        toastSet(tid, 'bad', t('toastFailed'), summary === t('publishDone') ? t('publishErr') : summary, lines.join('\\n'));
      }
    } else {
      // \u63A8\u4E0A\u53BB\u53EA\u662F\u7B2C\u4E00\u6B65\uFF1APages \u8FD8\u8981\u6784\u5EFA + \u90E8\u7F72\uFF08\u5B9E\u6D4B 40~90 \u79D2\uFF09\u3002
      // \u8FD9\u91CC\u4E0D\u963B\u585E\u6309\u94AE\uFF0C\u540E\u53F0\u8F6E\u8BE2\u628A\u300C\u8FD8\u8981\u7B49\u591A\u4E45 / \u5DF2\u7ECF\u4E0A\u7EBF\u300D\u663E\u793A\u51FA\u6765\u3002
      if (r.pushed) {
        toastSet(tid, 'busy', t('toastPublishTitle'), t('toastPushed'), lines.join('\\n'));
        let since = publishStart;
        try { const b = await api('/api/live'); if (b && b.generatedAt) since = b.generatedAt; } catch { /* \u53D6\u4E0D\u5230\u5C31\u9000\u56DE\u5F00\u59CB\u65F6\u523B */ }
        void waitUntilLive(since, r.commit, r.siteUrl, tid, 'publish');
      } else {
        // \u6CA1\u4E1C\u897F\u53EF\u63A8\u4E5F\u662F\u4E00\u79CD\u660E\u786E\u7684\u300C\u5B8C\u6210\u300D\uFF0C\u522B\u8BA9\u5B83\u505C\u5728\u8F6C\u5708\u4E0A\u8BA9\u4EBA\u4EE5\u4E3A\u8FD8\u5728\u8DD1
        toastSet(tid, 'ok', t('toastDone'), t('toastNothingToPush'), lines.join('\\n'));
      }
    }
  } catch (e) {
    toastSet(tid, 'bad', t('toastFailed'), t('publishFail') + e.message);
    // \u6388\u6743\u95EE\u9898\u5BFC\u81F4\u7684\u5931\u8D25\uFF1A\u76F4\u63A5\u628A\u6388\u6743\u7A97\u5F39\u51FA\u6765\uFF0C\u7701\u5F97\u7528\u6237\u53BB\u627E\u90A3\u4E2A\u6309\u94AE
    if (e.needAuth) openAuthDialog();
  } finally {
    btn.disabled = false; btn.textContent = old;
    try { await loadState(); } catch { /* \u72B6\u6001\u5237\u65B0\u5931\u8D25\u4E0D\u5F71\u54CD\u53D1\u5E03\u7ED3\u679C */ }
    refreshAuth();
  }
}

// \u8F6E\u8BE2\u300C\u7EBF\u4E0A\u662F\u5426\u5DF2\u7ECF\u662F\u521A\u63A8\u7684\u90A3\u4E00\u7248\u300D\u3002
// \u5224\u5B9A\u4F18\u5148\u7528\u63D0\u4EA4 SHA\uFF08\u7EBF\u4E0A\u4EA7\u7269\u91CC\u5E26 GITHUB_SHA\uFF09\uFF0C\u62FF\u4E0D\u5230\u518D\u9000\u56DE\u6BD4\u6784\u5EFA\u65F6\u95F4\u3002
// \u8FDE\u7EED\u70B9\u4E24\u6B21\u53D1\u5E03\u65F6\uFF0C\u9760 liveSeq \u8BA9\u4E0A\u4E00\u8F6E\u4F5C\u5E9F\uFF0C\u514D\u5F97\u65E7\u8F6E\u8BE2\u628A\u65B0\u7ED3\u679C\u8986\u76D6\u6389\u3002
let liveSeq = 0;
async function waitUntilLive(baselineAt, sha, siteUrl, toastId, kind) {
  const seq = ++liveSeq;
  const t0 = Date.now();
  const LIMIT = 4 * 60 * 1000;
  const q = (sha ? 'sha=' + encodeURIComponent(sha) : 'since=' + encodeURIComponent(String(baselineAt)));
  const okTitle = kind === 'source' ? t('toastSourceOk')
    : kind === 'theme' ? t('toastThemeOk')
    : t('toastPublishOk');
  const busyTitle = kind === 'source' ? t('toastSourceTitle')
    : kind === 'theme' ? t('toastThemeTitle')
    : t('toastPublishTitle');
  while (Date.now() - t0 < LIMIT) {
    if (seq !== liveSeq) return;
    const secs = Math.round((Date.now() - t0) / 1000);
    // \u63D0\u793A\u6761\u540C\u6B65\u663E\u793A\u5DF2\u7ECF\u7B49\u4E86\u591A\u4E45\uFF0C\u907F\u514D\u7528\u6237\u4EE5\u4E3A\u5361\u6B7B
    if (toastId) toastSet(toastId, 'busy', busyTitle, tf('liveBuilding', secs));
    let r = null;
    try { r = await api('/api/live?' + q); } catch { /* \u7F51\u7EDC\u6296\u4E00\u4E0B\u5C31\u7EE7\u7EED\u7B49 */ }
    if (seq !== liveSeq) return;
    if (r && r.live) {
      const took = Math.round((Date.now() - t0) / 1000);
      if (toastId) toastSet(toastId, 'ok', okTitle, tf('liveOk', took), '', r.siteUrl || siteUrl || '');
      return;
    }
    await new Promise((res) => setTimeout(res, 3000));
  }
  if (seq === liveSeq) {
    if (toastId) toastSet(toastId, 'bad', t('toastFailed'), t('liveTimeout'));
  }
}

// \u300C\u66F4\u65B0\u6E90\u7801\u300D\uFF1A\u628A\u5DE5\u5177\u76EE\u5F55\u91CC\u7684\u7AD9\u70B9\u6E90\u7801\uFF08src/\u3001scripts/\u3001.github/ \u4E0E\u9876\u5C42\u914D\u7F6E\uFF09
// \u5168\u91CF\u8986\u76D6\u8FDB\u5DE5\u4F5C\u526F\u672C\u5E76\u63A8\u9001\uFF0C\u8BA9 GitHub Actions \u91CD\u65B0\u6784\u5EFA\u3002
// \u4E0E\u300C\u53D1\u5E03\u300D\u7684\u5206\u5DE5\uFF1A\u53D1\u5E03\u540C\u6B65\u7B14\u8BB0\uFF08content/\uFF09\uFF0C\u8FD9\u91CC\u540C\u6B65\u7AD9\u70B9\u672C\u8EAB\u3002
// \u6539\u5B8C blog-static/src/ \u540E\u5FC5\u987B\u70B9\u8FD9\u4E2A\uFF0C\u53EA\u70B9\u300C\u53D1\u5E03\u300D\u7EBF\u4E0A\u4E0D\u4F1A\u53D8\u3002
async function doUpdateSource() {
  const btn = document.getElementById('srcBtn');
  btn.disabled = true;
  const old = btn.textContent; btn.textContent = t('updatingSrc');
  const tid = toastOpen(t('toastSourceTitle'), t('toastStarting'));
  // \u4E0E\u53D1\u5E03\u4E00\u6837\uFF1A\u6E90\u7801\u63A8\u4E0A\u53BB\u4E5F\u8981\u7B49 Pages \u6784\u5EFA\uFF0C\u987A\u624B\u628A\u4E0A\u7EBF\u8FDB\u5EA6\u663E\u793A\u51FA\u6765\u3002
  // \u57FA\u7EBF\u540C\u6837\u5728\u63A8\u9001\u5B8C\u6210\u4E4B\u540E\u53D6\uFF08\u539F\u56E0\u89C1 doPublish \u91CC\u7684\u6CE8\u91CA\uFF09\u3002
  const srcStart = Date.now();
  try {
    const r = await api('/api/update-source', undefined, 'POST');
    const lines = r.log || [];
    if (r.failed) {
      if (r.failKind === 'network') {
        toastSet(tid, 'bad', t('toastFailed'), t('pushNetworkFail'), lines.join('\\n'));
      } else {
        toastSet(tid, 'bad', t('toastFailed'), lines[0] || t('publishErr'), lines.join('\\n'));
      }
    } else {
      if (r.pushed) {
        toastSet(tid, 'busy', t('toastSourceTitle'), t('toastPushed'), lines.join('\\n'));
        let since = srcStart;
        try { const b = await api('/api/live'); if (b && b.generatedAt) since = b.generatedAt; } catch { /* \u53D6\u4E0D\u5230\u5C31\u9000\u56DE\u5F00\u59CB\u65F6\u523B */ }
        void waitUntilLive(since, r.commit, '', tid, 'source');
      } else {
        toastSet(tid, 'ok', t('toastDone'), t('toastNothingToPush'), lines.join('\\n'));
      }
    }
  } catch (e) {
    toastSet(tid, 'bad', t('toastFailed'), t('srcUpdateFail') + e.message);
    if (e.needAuth) openAuthDialog();
  } finally {
    btn.disabled = false; btn.textContent = old;
    try { await loadState(); } catch { /* \u72B6\u6001\u5237\u65B0\u5931\u8D25\u4E0D\u5F71\u54CD\u66F4\u65B0\u7ED3\u679C */ }
    refreshAuth();
  }
}
document.getElementById('q').oninput = renderFolders;
// \u63D2\u4EF6\u7528 iframe \u5D4C\u5165\u65F6\u5E26 ?embed=1\uFF1AObsidian \u81EA\u5DF1\u7684\u6587\u4EF6\u6811\u5DF2\u7ECF\u627F\u62C5\u4E86\u300C\u6D4F\u89C8 + \u6298\u53E0\u300D\uFF0C
// \u8FD9\u91CC\u7684\u6587\u4EF6\u5939\u7F51\u683C\u662F\u91CD\u590D\u7684\u4E00\u5957\uFF0C\u85CF\u6389\u5B83\uFF0C\u754C\u9762\u53EA\u7559\u53D1\u5E03\u76F8\u5173\u7684\u4E1C\u897F\u3002
if (new URLSearchParams(location.search).get('embed') === '1') {
  document.body.classList.add('embed-mode');
}
applyLang();
loadState().catch((e) => setResult('err', t('loadFail') + e.message));
// \u6388\u6743\u72B6\u6001\u67E5\u4E00\u6B21\u518D\u51B3\u5B9A\u63D0\u793A\u6761\u662F\u5426\u663E\u793A\uFF1A\u5DF2\u6388\u6743\u7684\u673A\u5668\u4E0A\u4E0D\u8BE5\u51FA\u73B0\u8FD9\u6761
refreshAuth();
// \u72B6\u6001\u540C\u6B65\uFF1A\u5148\u95EE\u6781\u8F7B\u7684 /api/rev\uFF08\u53EA\u56DE\u4E00\u4E2A\u6570\u5B57\uFF09\uFF0C\u7248\u672C\u53F7\u53D8\u4E86\u624D\u62C9\u5168\u91CF /api/state\u3002
// \u8FD9\u6837\u5728 Obsidian \u6587\u4EF6\u6811\u91CC\u70B9\u4E86\u5F00\u5173\uFF0C\u8FD9\u8FB9 1 \u79D2\u5185\u5C31\u4F1A\u8DDF\u7740\u53D8\uFF1B
// \u5168\u91CF\u90A3\u4EFD\u8981\u626B 117 \u4E2A\u6587\u4EF6\uFF0C\u4E0D\u80FD\u6309\u8FD9\u4E2A\u9891\u7387\u786C\u62C9\u3002
let lastRev = 0;
setInterval(async () => {
  try {
    const r = await api('/api/rev');
    const rev = Number(r && r.rev) || 0;
    if (!rev || rev === lastRev) return;
    lastRev = rev;
    await loadState();
  } catch (e) { /* \u670D\u52A1\u6CA1\u8D77\u6765\u5C31\u4E0B\u6B21\u518D\u8BD5 */ }
}, 1000);
// \u515C\u5E95\uFF1A\u5E93\u88AB\u5916\u90E8\u6539\u52A8\uFF08\u540C\u6B65\u3001\u522B\u7684\u7F16\u8F91\u5668\uFF09\u65F6\u7248\u672C\u53F7\u4E0D\u4F1A\u53D8\uFF0C\u4ECD\u7136\u6BCF 8 \u79D2\u5168\u91CF\u5BF9\u4E00\u6B21
setInterval(() => { loadState().catch(() => {}); }, 8000);
</script></body></html>`;

// ../scripts/theme-presets.mjs
var THEME_PRESETS = [
  {
    "id": "study",
    "name": {
      "zh": "\u58A8\u7EFF",
      "en": "Ink"
    },
    "desc": {
      "zh": "\u4E09\u5217\u7EB8\u5361\u9996\u9875\uFF0C\u6696\u7EB8\u5E95\u5168\u886C\u7EBF\uFF0C\u9002\u5408\u957F\u6587\u9605\u8BFB",
      "en": "Three-column card home \u2014 warm paper, full serif"
    },
    "swatch": {
      "bg": "#f6f2e9",
      "fg": "#22302a",
      "accent": "#2f6b4f",
      "card": "#fffdf6"
    },
    "css": "/* ============================================================\n   \u58A8\u7EFF \u2014\u2014 \u4E66\u9875\u6C14\u8D28\uFF1A\u6696\u7EB8\u5E95 + \u677E\u58A8\u7EFF + \u5168\u886C\u7EBF + \u9996\u884C\u7F29\u8FDB\n   \u7248\u9762\u5DEE\u5F02\u4F53\u73B0\u5728\uFF1A\u4E09\u5217\u7EB8\u5361\u9996\u9875 + \u4E66\u810A\u5F0F\u6807\u9898\u88C5\u9970\uFF08\u5BBD\u5EA6\u4E0E\u9ED8\u8BA4\u4E3B\u9898\u4E00\u81F4\uFF09\n   \uFF08\u5927\u7EB2\u662F\u7AD9\u70B9\u7684\u60AC\u6D6E\u7EC4\u4EF6\uFF0C\u4EFB\u4F55\u4E3B\u9898\u90FD\u4E0D\u53BB\u52A8\u5B83\u7684\u4F4D\u7F6E\u4E0E\u4EA4\u4E92\uFF09\n   ============================================================ */\n\n:root {\n  --radius: 0.2rem;\n\n  --background: #f6f2e9;\n  --foreground: #22302a;\n\n  --card: #fffdf6;\n  --card-foreground: #22302a;\n  --popover: #fffdf6;\n  --popover-foreground: #22302a;\n\n  --primary: #2f6b4f;\n  --primary-foreground: #f6f2e9;\n\n  --secondary: #e9e3d3;\n  --secondary-foreground: #22302a;\n  --muted: #ece6d8;\n  --muted-foreground: #6d7c71;\n  --accent: #e2ece5;\n  --accent-foreground: #22302a;\n\n  --border: #dcd3c0;\n  --input: #dcd3c0;\n  --ring: rgba(47, 107, 79, 0.45);\n\n  --code-bg: #f1ecdf;\n  --code-head-bg: #e6dfcd;\n  --code-head-fg: #5d6b60;\n  --code-fg: #22302a;\n}\n\nhtml.dark {\n  --background: #141a17;\n  --foreground: #dfe7e0;\n\n  --card: #1b2320;\n  --card-foreground: #dfe7e0;\n  --popover: #1b2320;\n  --popover-foreground: #dfe7e0;\n\n  --primary: #6fc394;\n  --primary-foreground: #10201a;\n\n  --secondary: #232d28;\n  --secondary-foreground: #dfe7e0;\n  --muted: #232d28;\n  --muted-foreground: #93a79a;\n  --accent: #26332c;\n  --accent-foreground: #e6eee8;\n\n  --border: rgba(160, 190, 170, 0.2);\n  --input: rgba(160, 190, 170, 0.26);\n  --ring: rgba(111, 195, 148, 0.6);\n\n  --code-bg: #1a221e;\n  --code-head-bg: #232d28;\n  --code-head-fg: #9db3a4;\n  --code-fg: #dfe7e0;\n}\n\n/* \u6B63\u6587\u5168\u7528\u886C\u7EBF\uFF0C\u6807\u9898\u66F4\u91CD\u4E00\u4E9B\uFF0C\u8BFB\u8D77\u6765\u50CF\u4E00\u672C\u4E66 */\nbody,\n.markdown-body {\n  font-family: 'Songti SC', 'STSong', 'Noto Serif SC', 'Source Han Serif SC',\n    'SimSun', Georgia, 'Times New Roman', serif;\n}\n\n.markdown-body {\n  line-height: 1.95;\n  letter-spacing: 0.01em;\n}\n\n.markdown-body h1,\n.markdown-body h2,\n.markdown-body h3 {\n  letter-spacing: 0.02em;\n}\n\n/* \u6BB5\u843D\u9996\u884C\u7F29\u8FDB\u4E24\u5B57\uFF0C\u4E2D\u6587\u957F\u6587\u7684\u4F20\u7EDF\u6392\u7248 */\n.markdown-body p {\n  text-indent: 2em;\n  margin: 0.75em 0;\n}\n.markdown-body li p,\n.markdown-body blockquote p,\n.markdown-body td p,\n.markdown-body .callout p {\n  text-indent: 0;\n}\n\n/* \u4E8C\u7EA7\u6807\u9898\u505A\u6210\u300C\u5C0F\u8282\u300D\u7684\u6837\u5B50\uFF1A\u5DE6\u4FA7\u4E00\u9053\u7AD6\u7EBF\uFF0C\u4E0D\u8981\u4E0B\u5212\u7EBF */\n.markdown-body h2 {\n  border-bottom: none;\n  border-left: 3px solid var(--primary);\n  padding-left: 0.6em;\n  margin-top: 2.2em;\n}\n\n/* \u5F15\u7528\u5757\uFF1A\u7AD6\u7EBF + \u6781\u6D45\u5E95\u8272 */\n.markdown-body blockquote {\n  border-left: 3px solid var(--primary);\n  background: color-mix(in srgb, var(--primary) 6%, transparent);\n  font-style: normal;\n}\n\n/* \u9876\u680F\uFF1A\u53BB\u6389\u6BDB\u73BB\u7483\uFF0C\u6539\u6210\u4E00\u6761\u7EB8\u8FB9 */\nheader.sticky {\n  background: var(--background);\n  backdrop-filter: none;\n  border-bottom: 1px solid var(--border);\n}\n\n/* ============================================================\n   \u7248\u9762\uFF1A\u4E09\u5217\u7EB8\u5361\u9996\u9875\n   \u26A0\uFE0F \u5BBD\u5EA6\u7531\u7AD9\u70B9\u7EDF\u4E00\u63A7\u5236\uFF08globals.css \u7684 --content-w\uFF09\uFF0C\u4E3B\u9898\u91CC\u4E0D\u5199 max-width\uFF1A\n   \u6240\u6709\u4E3B\u9898\u7684\u9996\u9875\u4E0E\u6B63\u6587\u5BBD\u5EA6\u5FC5\u987B\u5B8C\u5168\u4E00\u81F4\uFF0C\u4E3B\u9898\u53EA\u8D1F\u8D23\u989C\u8272\u3001\u7D20\u6750\uFF0C\u4EE5\u53CA\n   \u300C\u975E\u6B63\u6587\u754C\u9762\u300D\u7684\u6392\u5E03\uFF08\u9996\u9875\u6587\u4EF6\u5939 / \u7B14\u8BB0\u5217\u8868 / \u6807\u7B7E\u600E\u4E48\u6446\uFF09\u3002\n   \u5927\u7EB2\u662F\u7AD9\u70B9\u7684\u60AC\u6D6E\u7EC4\u4EF6\uFF0C\u4EFB\u4F55\u4E3B\u9898\u90FD\u4E0D\u53BB\u52A8\u5B83\u7684\u4F4D\u7F6E\u4E0E\u4EA4\u4E92\u3002\n   ============================================================ */\n\n/* \u9996\u9875\u5361\u7247\uFF1A\u7EC6\u8FB9\u6846 + \u6781\u8F7B\u7684\u7EB8\u9634\u5F71\uFF0C\u56FA\u5B9A\u4E09\u5217 */\n[data-region='folders'] {\n  display: grid !important;\n  grid-template-columns: repeat(3, minmax(0, 1fr));\n  gap: 1rem !important;\n}\n[data-region='folders'] a,\n[data-region='folders'] > * {\n  box-shadow: 0 1px 0 var(--border);\n  transition: box-shadow 0.18s ease, transform 0.18s ease;\n}\n[data-region='folders'] a:hover,\n[data-region='folders'] > *:hover {\n  box-shadow: 0 3px 14px rgba(47, 107, 79, 0.12);\n  transform: translateY(-1px);\n}\n\n/* \u7B14\u8BB0\u5217\u8868\uFF1A\u884C\u60AC\u505C\u65F6\u6781\u6D45\u7684\u7EFF */\n[data-region='main'] li:hover {\n  background: color-mix(in srgb, var(--primary) 5%, transparent);\n}\n\n/* \u9875\u811A\u4F4E\u8C03 */\n[data-region='footer'] {\n  opacity: 0.75;\n  font-size: calc(0.72 * var(--fsu, 1rem));\n  letter-spacing: 0.05em;\n}\n\n/* \u7A84\u5C4F\uFF1A\u5355\u5217 */\n@media (max-width: 1023px) {\n  [data-region='folders'] {\n    grid-template-columns: minmax(0, 1fr);\n  }\n}\n"
  },
  {
    "id": "sakura",
    "name": {
      "zh": "\u6A31\u7C89",
      "en": "Blossom"
    },
    "desc": {
      "zh": "\u5355\u5217\u5927\u5361\u7247\u9996\u9875\u3001\u6807\u9898\u5C45\u4E2D\u653E\u5927\uFF0C\u6781\u6D45\u7C89\u767D\u914D\u73AB\u7EA2",
      "en": "Single-column index home with centered titles \u2014 pale pink and rose"
    },
    "swatch": {
      "bg": "#fdf8f8",
      "fg": "#3a2b30",
      "accent": "#c2456b",
      "card": "#ffffff"
    },
    "css": "/* ============================================================\n   \u6A31\u7C89 \u2014\u2014 \u6742\u5FD7\u6C14\u8D28\uFF1A\u6781\u6D45\u7C89\u767D + \u73AB\u7EA2\u70B9\u7F00 + \u5927\u7559\u767D + \u5355\u5217\u5927\u5361\u7247\n   \u7248\u9762\u5DEE\u5F02\u4F53\u73B0\u5728\uFF1A\u9996\u9875\u5355\u5217\u5927\u5361\u7247\uFF08\u4E00\u884C\u4E00\u4E2A\uFF09+ \u6587\u7AE0\u6807\u9898\u5C45\u4E2D\u653E\u5927\uFF08\u5BBD\u5EA6\u4E0E\u9ED8\u8BA4\u4E3B\u9898\u4E00\u81F4\uFF09\n   \uFF08\u5927\u7EB2\u662F\u7AD9\u70B9\u7684\u60AC\u6D6E\u7EC4\u4EF6\uFF0C\u4EFB\u4F55\u4E3B\u9898\u90FD\u4E0D\u53BB\u52A8\u5B83\u7684\u4F4D\u7F6E\u4E0E\u4EA4\u4E92\uFF09\n   ============================================================ */\n\n:root {\n  --radius: 1.1rem;\n\n  --background: #fdf8f8;\n  --foreground: #3a2b30;\n\n  --card: #ffffff;\n  --card-foreground: #3a2b30;\n  --popover: #ffffff;\n  --popover-foreground: #3a2b30;\n\n  --primary: #c2456b;\n  --primary-foreground: #fff8fa;\n\n  --secondary: #fbeef1;\n  --secondary-foreground: #4a3239;\n  --muted: #f7ecef;\n  --muted-foreground: #8a6f78;\n  --accent: #fce4ea;\n  --accent-foreground: #3a2b30;\n\n  --border: #f0dfe4;\n  --input: #f0dfe4;\n  --ring: rgba(194, 69, 107, 0.4);\n\n  --code-bg: #fbf2f4;\n  --code-head-bg: #f6e7eb;\n  --code-head-fg: #8a6f78;\n  --code-fg: #3a2b30;\n}\n\nhtml.dark {\n  --background: #1a1417;\n  --foreground: #f0e2e6;\n\n  --card: #241b1f;\n  --card-foreground: #f0e2e6;\n  --popover: #241b1f;\n  --popover-foreground: #f0e2e6;\n\n  --primary: #f08bab;\n  --primary-foreground: #2a1219;\n\n  --secondary: #2d2227;\n  --secondary-foreground: #f0e2e6;\n  --muted: #2d2227;\n  --muted-foreground: #b394a0;\n  --accent: #35262c;\n  --accent-foreground: #f7eaee;\n\n  --border: rgba(230, 170, 190, 0.18);\n  --input: rgba(230, 170, 190, 0.24);\n  --ring: rgba(240, 139, 171, 0.55);\n\n  --code-bg: #211a1e;\n  --code-head-bg: #2d2227;\n  --code-head-fg: #b394a0;\n  --code-fg: #f0e2e6;\n}\n\n/* \u5B57\u91CD\u8F7B\u4E00\u70B9\u3001\u5B57\u8DDD\u677E\u4E00\u70B9\uFF0C\u7559\u767D\u624D\u663E\u5F97\u662F\u523B\u610F\u7684 */\nbody,\n.markdown-body {\n  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'PingFang SC',\n    'Hiragino Sans GB', 'Microsoft YaHei', system-ui, sans-serif;\n}\n\n.markdown-body {\n  line-height: 2.05;\n  letter-spacing: 0.015em;\n}\n\n/* \u6807\u9898\u7528\u886C\u7EBF + \u5927\u5B57\u53F7 + \u677E\u5B57\u8DDD\uFF0C\u6B63\u6587\u65E0\u886C\u7EBF\uFF0C\u62C9\u5F00\u5C42\u6B21 */\n.markdown-body h1,\n.markdown-body h2,\n.markdown-body h3 {\n  font-family: 'Songti SC', 'STSong', 'Noto Serif SC', Georgia, serif;\n  letter-spacing: 0.03em;\n  font-weight: 600;\n}\n.markdown-body h2 {\n  border-bottom: none;\n  font-size: 1.42em;\n  margin-top: 2.6em;\n}\n/* \u6807\u9898\u4E0A\u65B9\u52A0\u4E00\u4E2A\u5C0F\u5706\u70B9\u505A\u5206\u9694\uFF0C\u6742\u5FD7\u611F */\n.markdown-body h2::before {\n  content: '';\n  display: block;\n  width: 0.42em;\n  height: 0.42em;\n  border-radius: 50%;\n  background: var(--primary);\n  margin-bottom: 0.55em;\n}\n\n.markdown-body blockquote {\n  border-left: none;\n  border-radius: var(--radius);\n  background: color-mix(in srgb, var(--primary) 6%, transparent);\n  padding: 1em 1.4em;\n  font-style: normal;\n  color: var(--foreground);\n}\n\n/* \u9876\u680F\uFF1A\u4E0D\u8981\u8FB9\u754C\uFF0C\u53EA\u7559\u4E00\u6761\u6781\u6DE1\u7684\u7EBF */\nheader.sticky {\n  background: color-mix(in srgb, var(--background) 88%, transparent);\n  backdrop-filter: blur(10px);\n  border-bottom: 1px solid color-mix(in srgb, var(--border) 60%, transparent);\n}\n\n/* ============================================================\n   \u7248\u9762\uFF1A\u6742\u5FD7\u5F00\u672C \u2014\u2014 \u9996\u9875\u5355\u5217\u5927\u5361\u7247\uFF0C\u5927\u7559\u767D\n   \u26A0\uFE0F \u5BBD\u5EA6\u7531\u7AD9\u70B9\u7EDF\u4E00\u63A7\u5236\uFF08globals.css \u7684 --content-w\uFF09\uFF0C\u4E3B\u9898\u91CC\u4E0D\u5199 max-width\u3002\n   ============================================================ */\n\n/* \u9996\u9875\u6587\u4EF6\u5939\uFF1A\u5355\u5217\u5927\u5361\u7247\uFF0C\u4E00\u884C\u4E00\u4E2A\uFF0C\u50CF\u76EE\u5F55\u9875 */\n[data-region='folders'] {\n  display: flex !important;\n  flex-direction: column;\n  gap: 0.6rem !important;\n  margin-bottom: 3rem;\n}\n[data-region='folders'] > * {\n  width: 100%;\n  border-radius: var(--radius) !important;\n  padding: 1.15rem 1.5rem !important;\n  border-color: color-mix(in srgb, var(--border) 80%, transparent) !important;\n  box-shadow: none !important;\n  transition: background 0.2s ease, transform 0.2s ease;\n}\n[data-region='folders'] > *:hover {\n  background: color-mix(in srgb, var(--primary) 4%, transparent) !important;\n  transform: translateX(4px);\n}\n/* \u6587\u4EF6\u5939\u540D\u653E\u5927\uFF0C\u7BC7\u6570\u7F29\u5C0F\u9760\u53F3 */\n[data-region='folders'] > * .font-serif {\n  font-size: calc(1.12 * var(--fsu, 1rem)) !important;\n  letter-spacing: 0.02em;\n}\n\n/* \u7B14\u8BB0\u5217\u8868\uFF1A\u540C\u6837\u5355\u5217\uFF0C\u884C\u8DDD\u62C9\u5F00 */\n[data-region='list'] {\n  border: none !important;\n  background: transparent !important;\n  box-shadow: none !important;\n}\n[data-region='list'] > div:first-child {\n  border-bottom: 1px solid var(--border) !important;\n  background: transparent !important;\n  padding-left: 0 !important;\n  padding-right: 0 !important;\n}\n[data-region='list'] ul {\n  columns: 1 !important;\n  padding: 0.5rem 0 !important;\n}\n[data-region='list'] li > button {\n  padding-top: 0.55rem !important;\n  padding-bottom: 0.55rem !important;\n}\n\n/* \u6807\u7B7E\uFF1A\u7EC6\u7EBF\u5206\u9694\uFF0C\u4E0D\u7528\u80F6\u56CA */\n[data-region='tags'] {\n  gap: 0 !important;\n  margin-bottom: 3rem !important;\n}\n[data-region='tags'] > button {\n  border: none !important;\n  background: transparent !important;\n  border-radius: 0 !important;\n  padding: 0.2rem 0.85rem !important;\n  border-right: 1px solid var(--border) !important;\n  color: var(--muted-foreground) !important;\n  letter-spacing: 0.04em;\n}\n[data-region='tags'] > button:last-child {\n  border-right: none !important;\n}\n[data-region='tags'] > button:hover {\n  color: var(--primary) !important;\n}\n\n/* --- \u6587\u7AE0\u9875\uFF1A\u6807\u9898\u5C45\u4E2D\u653E\u5927 --- */\n[data-region='article'] {\n  width: 100%;\n}\n\n/* \u6587\u7AE0\u6807\u9898\u5C45\u4E2D\u3001\u5B57\u53F7\u5927\uFF0C\u50CF\u6742\u5FD7\u6807\u9898 */\n[data-region='article'] > header h1 {\n  text-align: center;\n  font-size: calc(2.1 * var(--fsu, 1rem)) !important;\n  letter-spacing: 0.04em;\n  margin-bottom: 0.4rem;\n}\n[data-region='article'] > header > div {\n  justify-content: center;\n}\n\n/* \u9875\u811A\u5C45\u4E2D */\n[data-region='footer'] {\n  justify-content: center !important;\n  opacity: 0.7;\n  letter-spacing: 0.06em;\n}\n\n/* \u7A84\u5C4F\uFF1A\u7559\u767D\u6536\u655B\uFF0C\u6807\u9898\u7565\u5C0F */\n@media (max-width: 767px) {\n  [data-region='article'] > header h1 {\n    font-size: calc(1.6 * var(--fsu, 1rem)) !important;\n  }\n}\n"
  },
  {
    "id": "mono",
    "name": {
      "zh": "\u9ED1\u767D",
      "en": "Mono"
    },
    "desc": {
      "zh": "\u5355\u5217\u7EAF\u6587\u5B57\u7D22\u5F15\u8868\uFF0C\u7EAF\u767D\u7EAF\u9ED1\u96F6\u5706\u89D2",
      "en": "Single-column index-style home \u2014 pure black and white, no rounded corners"
    },
    "swatch": {
      "bg": "#ffffff",
      "fg": "#111111",
      "accent": "#111111",
      "card": "#ffffff"
    },
    "css": "/* ============================================================\n   \u9ED1\u767D \u2014\u2014 \u6EE1\u5BBD\u7248\u5F0F\uFF1A\u6B63\u6587\u6EE1\u5BBD\u5C45\u4E2D\uFF0C\u9996\u9875\u662F\u7EAF\u6587\u5B57\u7D22\u5F15\u8868\n   \u7EAF\u767D / \u7EAF\u9ED1\uFF0C\u65E0\u5F69\u8272\uFF0C\u96F6\u5706\u89D2\uFF0C\u53EA\u9760\u5B57\u91CD\u4E0E\u7559\u767D\n   ============================================================ */\n\n:root {\n  --radius: 0;\n\n  --background: #ffffff;\n  --foreground: #111111;\n\n  --card: #ffffff;\n  --card-foreground: #111111;\n  --popover: #ffffff;\n  --popover-foreground: #111111;\n\n  --primary: #111111;\n  --primary-foreground: #ffffff;\n\n  --secondary: #f4f4f4;\n  --secondary-foreground: #111111;\n  --muted: #f4f4f4;\n  --muted-foreground: #767676;\n  --accent: #eeeeee;\n  --accent-foreground: #111111;\n\n  --border: #e0e0e0;\n  --input: #e0e0e0;\n  --ring: rgba(17, 17, 17, 0.35);\n\n  --code-bg: #f7f7f7;\n  --code-head-bg: #efefef;\n  --code-head-fg: #767676;\n  --code-fg: #111111;\n}\n\nhtml.dark {\n  --background: #000000;\n  --foreground: #ededed;\n\n  --card: #000000;\n  --card-foreground: #ededed;\n  --popover: #000000;\n  --popover-foreground: #ededed;\n\n  --primary: #ededed;\n  --primary-foreground: #000000;\n\n  --secondary: #121212;\n  --secondary-foreground: #ededed;\n  --muted: #121212;\n  --muted-foreground: #8a8a8a;\n  --accent: #1a1a1a;\n  --accent-foreground: #f5f5f5;\n\n  --border: #2a2a2a;\n  --input: #333333;\n  --ring: rgba(237, 237, 237, 0.4);\n\n  --code-bg: #0a0a0a;\n  --code-head-bg: #141414;\n  --code-head-fg: #8a8a8a;\n  --code-fg: #ededed;\n}\n\nbody,\n.markdown-body {\n  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'PingFang SC',\n    'Hiragino Sans GB', 'Microsoft YaHei', system-ui, sans-serif;\n}\n\n.markdown-body {\n  line-height: 1.9;\n  letter-spacing: 0.01em;\n}\n\n/* \u6807\u9898\uFF1A\u4E0D\u8981\u88C5\u9970\u7EBF\uFF0C\u53EA\u9760\u5B57\u53F7\u4E0E\u5B57\u91CD */\n.markdown-body h1,\n.markdown-body h2,\n.markdown-body h3 {\n  font-family: inherit;\n  letter-spacing: -0.01em;\n}\n.markdown-body h2 {\n  border-bottom: none;\n  margin-top: 2.4em;\n}\n/* \u7AE0\u8282\u524D\u4E00\u6761\u6781\u77ED\u7684\u5B9E\u7EBF\uFF0C\u4F5C\u4E3A\u552F\u4E00\u7684\u5206\u9694\u7B26 */\n.markdown-body h2::before {\n  content: '';\n  display: block;\n  width: 2rem;\n  height: 1px;\n  background: var(--foreground);\n  margin-bottom: 0.8em;\n  opacity: 0.8;\n}\n\n/* \u5F15\u7528\uFF1A\u4E0D\u8981\u5E95\u8272\uFF0C\u53EA\u8981\u7AD6\u7EBF */\n.markdown-body blockquote {\n  background: transparent;\n  border-left: 1px solid var(--foreground);\n  border-radius: 0;\n  padding-left: 1.1em;\n  font-style: normal;\n}\n\n/* \u9876\u680F\uFF1A\u4E00\u6761\u7EC6\u7EBF\uFF0C\u522B\u65E0\u4ED6\u7269 */\nheader.sticky {\n  background: var(--background);\n  backdrop-filter: none;\n  border-bottom: 1px solid var(--border);\n}\n\n/* ============================================================\n   \u7248\u9762\uFF1A\u6781\u7B80\u7D22\u5F15\u8868\n   \u26A0\uFE0F \u5BBD\u5EA6\u7531\u7AD9\u70B9\u7EDF\u4E00\u63A7\u5236\uFF08globals.css \u7684 --content-w\uFF09\uFF0C\u4E3B\u9898\u91CC\u4E0D\u5199 max-width\uFF1A\n   \u6240\u6709\u4E3B\u9898\u7684\u9996\u9875\u3001\u6B63\u6587\u5BBD\u5EA6\u5FC5\u987B\u5B8C\u5168\u4E00\u81F4\uFF0C\u4E3B\u9898\u53EA\u8D1F\u8D23\u989C\u8272\u3001\u7D20\u6750\u548C\n   \u300C\u975E\u6B63\u6587\u754C\u9762\u300D\u7684\u6392\u5E03\uFF08\u9996\u9875\u6587\u4EF6\u5939 / \u7B14\u8BB0\u5217\u8868 / \u6807\u7B7E\u600E\u4E48\u6446\uFF09\u3002\n   \u5927\u7EB2\u6D6E\u5C42\u662F\u7AD9\u70B9\u7684\u529F\u80FD\u7EC4\u4EF6\uFF08\u53EF\u62D6\u52A8\u3001\u53EF\u7F29\u653E\uFF09\uFF0C\u4E3B\u9898\u4E00\u5F8B\u4E0D\u78B0\u5B83\u7684\u4F4D\u7F6E\u3001\n   \u5C3A\u5BF8\u4E0E\u6392\u5E03\uFF0C\u6700\u591A\u6362\u6362\u6587\u5B57\u989C\u8272 \u2014\u2014 \u7528\u6237\u660E\u786E\u8981\u6C42\u300C\u6539\u7248\u9762\u662F\u6539\u5916\u89C2\uFF0C\u4E0D\u662F\u529F\u80FD\u300D\u3002\n   ============================================================ */\n\n/* \u5927\u7EB2\u6D6E\u5C42\uFF1A\u53EA\u628A\u5F3A\u8C03\u8272\u6362\u6210\u9ED1\u767D\uFF0C\u4F4D\u7F6E/\u5BBD\u9AD8/\u4EA4\u4E92\u5B8C\u5168\u4EA4\u7ED9\u7AD9\u70B9\u81EA\u5DF1\u7684\u5B9E\u73B0 */\n[data-region='toc-panel'] .toc-item.toc-active {\n  color: var(--foreground);\n  font-weight: 600;\n}\n\n/* \u6587\u7AE0\u6807\u9898\uFF1A\u5927\u5B57\u91CD\u3001\u7D27\u5B57\u8DDD */\n[data-region='article'] > header h1 {\n  font-size: calc(2.15 * var(--fsu, 1rem)) !important;\n  letter-spacing: -0.025em;\n  font-weight: 700;\n}\n\n/* \u9996\u9875\u6587\u4EF6\u5939\uFF1A\u5355\u5217\u7D22\u5F15\u8868\uFF0C\u4E00\u884C\u884C\u8BFB\u4E0B\u53BB */\n[data-region='folders'] {\n  display: flex !important;\n  flex-direction: column;\n  gap: 0 !important;\n  border-top: 1px solid var(--foreground);\n  margin-bottom: 2.5rem;\n}\n[data-region='folders'] > * {\n  width: 100%;\n  border: none !important;\n  border-bottom: 1px solid var(--border) !important;\n  border-radius: 0 !important;\n  background: transparent !important;\n  box-shadow: none !important;\n  padding: 0.7rem 0.2rem !important;\n  transition: padding-left 0.15s ease;\n}\n[data-region='folders'] > *:hover {\n  background: transparent !important;\n  transform: none !important;\n  padding-left: 0.7rem !important;\n}\n[data-region='folders'] > * svg {\n  display: none; /* \u7D22\u5F15\u8868\u4E0D\u8981\u56FE\u6807 */\n}\n[data-region='folders'] > * .font-serif {\n  font-size: calc(0.95 * var(--fsu, 1rem)) !important;\n  font-weight: 500 !important;\n  letter-spacing: 0.01em;\n}\n[data-region='folders'] > * > span > span:last-child {\n  font-size: calc(0.75 * var(--fsu, 1rem));\n  color: var(--muted-foreground);\n}\n\n/* \u7B14\u8BB0\u5217\u8868\uFF1A\u540C\u6837\u53BB\u6389\u5916\u6846 */\n[data-region='list'] {\n  border: none !important;\n  background: transparent !important;\n  box-shadow: none !important;\n}\n[data-region='list'] > div:first-child {\n  border-bottom: 1px solid var(--foreground) !important;\n  background: transparent !important;\n  padding-left: 0 !important;\n  padding-right: 0 !important;\n}\n[data-region='list'] ul {\n  columns: 1 !important;\n  padding: 0 !important;\n}\n[data-region='list'] li > button {\n  border-radius: 0 !important;\n  padding-left: 0.2rem !important;\n  padding-top: 0.55rem !important;\n  padding-bottom: 0.55rem !important;\n}\n[data-region='list'] li > button:hover {\n  background: transparent !important;\n  padding-left: 0.6rem !important;\n}\n\n/* \u6807\u7B7E\uFF1A\u4E0D\u8981\u80F6\u56CA\uFF0C\u6539\u6210\u4E0B\u5212\u7EBF\u6587\u5B57 */\n[data-region='tags'] {\n  gap: 0.15rem 1.4rem !important;\n  border-bottom: 1px solid var(--border);\n  padding-bottom: 1rem;\n  margin-bottom: 2.5rem !important;\n}\n[data-region='tags'] > button {\n  border: none !important;\n  background: transparent !important;\n  border-radius: 0 !important;\n  padding: 0.15rem 0 !important;\n  font-size: calc(0.75 * var(--fsu, 1rem)) !important;\n  letter-spacing: 0.03em;\n  border-bottom: 1px solid transparent !important;\n  color: var(--muted-foreground) !important;\n}\n[data-region='tags'] > button:hover,\n[data-region='tags'] > button[class*='bg-primary'] {\n  color: var(--foreground) !important;\n  border-bottom-color: var(--foreground) !important;\n}\n\n/* \u9875\u811A */\n[data-region='footer'] {\n  justify-content: center !important;\n  opacity: 0.6;\n  letter-spacing: 0.08em;\n  text-transform: uppercase;\n  font-size: calc(0.68 * var(--fsu, 1rem));\n}\n\n/* \u7A84\u5C4F */\n@media (max-width: 767px) {\n  [data-region='article'] > header h1 {\n    font-size: calc(1.65 * var(--fsu, 1rem)) !important;\n  }\n}\n"
  },
  {
    "id": "tree",
    "name": {
      "zh": "\u6811\u5F62",
      "en": "Tree"
    },
    "desc": {
      "zh": "\u6587\u4EF6\u6811\u9996\u9875\uFF0C\u7AD6\u7EBF\u5BFC\u8F68 + \u62D0\u89D2\u8FDE\u63A5\u7B26\uFF0C\u7EFF\u7070\u7EB8\u611F",
      "en": "File-tree home with guide rails and elbow connectors \u2014 mossy green-grey"
    },
    "swatch": {
      "bg": "#f4f6f3",
      "fg": "#23302a",
      "accent": "#4a7c59",
      "card": "#fbfdfa"
    },
    "css": "/* ============================================================\n   \u6811\u5F62 \u2014\u2014 \u6587\u4EF6\u6811\uFF1A\u7AD6\u7EBF + \u62D0\u89D2\u8FDE\u63A5\u7B26\uFF0C\u7EFF\u7070\u7EB8\u611F\n   \u7248\u9762\u5DEE\u5F02\u4F53\u73B0\u5728\uFF1A\u9996\u9875\u6587\u4EF6\u5939\u505A\u6210\u300C\u6811\u300D\u7684\u4E00\u884C\u884C\uFF0C\u5E26\u7F29\u8FDB\u5BFC\u8F68\u4E0E \u2514\u2500 \u62D0\u89D2\uFF1B\n   \u7B14\u8BB0\u5217\u8868\u4E5F\u7528\u7AD6\u7EBF\u6302\u7740\uFF0C\u8BFB\u8D77\u6765\u50CF\u8D44\u6E90\u7BA1\u7406\u5668\u7684\u76EE\u5F55\u6811\n   \u26A0\uFE0F \u5BBD\u5EA6\u7531\u7AD9\u70B9\u7EDF\u4E00\u63A7\u5236\uFF08globals.css \u7684 --content-w\uFF09\uFF0C\u4E3B\u9898\u91CC\u4E0D\u5199 max-width\uFF1A\n   \u6240\u6709\u4E3B\u9898\u7684\u9996\u9875\u4E0E\u6B63\u6587\u5BBD\u5EA6\u5FC5\u987B\u5B8C\u5168\u4E00\u81F4\uFF0C\u4E3B\u9898\u53EA\u8D1F\u8D23\u989C\u8272\u3001\u7D20\u6750\uFF0C\u4EE5\u53CA\n   \u300C\u975E\u6B63\u6587\u754C\u9762\u300D\u7684\u6392\u5E03\uFF08\u9996\u9875\u6587\u4EF6\u5939 / \u7B14\u8BB0\u5217\u8868 / \u6807\u7B7E\u600E\u4E48\u6446\uFF09\u3002\n   \uFF08\u5927\u7EB2\u662F\u7AD9\u70B9\u7684\u60AC\u6D6E\u7EC4\u4EF6\uFF0C\u4EFB\u4F55\u4E3B\u9898\u90FD\u4E0D\u53BB\u52A8\u5B83\u7684\u4F4D\u7F6E\u4E0E\u4EA4\u4E92\uFF09\n   ============================================================ */\n\n:root {\n  --radius: 0.3rem;\n\n  --background: #f4f6f3;\n  --foreground: #23302a;\n\n  --card: #fbfdfa;\n  --card-foreground: #23302a;\n  --popover: #fbfdfa;\n  --popover-foreground: #23302a;\n\n  --primary: #4a7c59;\n  --primary-foreground: #f4f6f3;\n\n  --secondary: #e8ede6;\n  --secondary-foreground: #23302a;\n  --muted: #e8ede6;\n  --muted-foreground: #6f7d73;\n  --accent: #dfeae0;\n  --accent-foreground: #23302a;\n\n  --border: #d5ddd3;\n  --input: #d5ddd3;\n  --ring: rgba(74, 124, 89, 0.4);\n\n  --code-bg: #eff3ec;\n  --code-head-bg: #e3e9e0;\n  --code-head-fg: #6f7d73;\n  --code-fg: #23302a;\n}\n\nhtml.dark {\n  --background: #121713;\n  --foreground: #dce5dd;\n\n  --card: #181f19;\n  --card-foreground: #dce5dd;\n  --popover: #181f19;\n  --popover-foreground: #dce5dd;\n\n  --primary: #7fbe8f;\n  --primary-foreground: #0f1511;\n\n  --secondary: #1f2721;\n  --secondary-foreground: #dce5dd;\n  --muted: #1f2721;\n  --muted-foreground: #94a397;\n  --accent: #223026;\n  --accent-foreground: #e4eee6;\n\n  --border: rgba(150, 185, 160, 0.18);\n  --input: rgba(150, 185, 160, 0.24);\n  --ring: rgba(127, 190, 143, 0.55);\n\n  --code-bg: #171e18;\n  --code-head-bg: #1f2721;\n  --code-head-fg: #9aab9d;\n  --code-fg: #dce5dd;\n}\n\nbody,\n.markdown-body {\n  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'PingFang SC',\n    'Hiragino Sans GB', 'Microsoft YaHei', system-ui, sans-serif;\n}\n\n.markdown-body {\n  line-height: 1.88;\n}\n\n.markdown-body h2 {\n  border-bottom: none;\n  border-left: 2px solid var(--primary);\n  padding-left: 0.55em;\n  margin-top: 2.2em;\n}\n\n.markdown-body blockquote {\n  border-left: 2px solid var(--border);\n  background: transparent;\n  font-style: normal;\n}\n\n/* \u9876\u680F\uFF1A\u4E00\u6761\u7EB8\u8FB9 */\nheader.sticky {\n  background: var(--background);\n  backdrop-filter: none;\n  border-bottom: 1px solid var(--border);\n}\n\n/* ============================================================\n   \u7248\u9762\uFF1A\u6587\u4EF6\u6811\n   ============================================================ */\n\n/* \u9996\u9875\u6587\u4EF6\u5939\uFF1A\u5355\u5217\u6811\u3002\u6BCF\u4E00\u884C\u5DE6\u4FA7\u6709\u7AD6\u5411\u5BFC\u8F68\uFF0C\u884C\u9996\u662F \u2514\u2500 \u62D0\u89D2 */\n[data-region='folders'] {\n  display: flex !important;\n  flex-direction: column;\n  gap: 0 !important;\n  margin-bottom: 2.25rem;\n  padding-left: 0.15rem;\n  border-left: 1px solid var(--border);\n}\n\n[data-region='folders'] > * {\n  position: relative;\n  width: 100%;\n  border: none !important;\n  border-radius: 0 !important;\n  background: transparent !important;\n  box-shadow: none !important;\n  padding: 0.45rem 0.4rem 0.45rem 2.15rem !important;\n  min-height: 0 !important;\n  gap: 0.4rem !important;\n  transition: background 0.12s ease, padding-left 0.12s ease;\n}\n\n/* \u62D0\u89D2\u8FDE\u63A5\u7B26\uFF1A\u4E00\u6761\u6A2A\u7EBF\u63A5\u5230\u7AD6\u8F68\u4E0A */\n[data-region='folders'] > *::before {\n  content: '';\n  position: absolute;\n  left: 0;\n  top: 50%;\n  width: 1.1rem;\n  height: 1px;\n  background: var(--border);\n}\n\n/* \u6811\u8282\u70B9\u7684\u5C0F\u4E09\u89D2\uFF0C\u843D\u5728\u62D0\u89D2\u672B\u7AEF */\n[data-region='folders'] > *::after {\n  content: '\u25B8';\n  position: absolute;\n  left: 1.25rem;\n  top: 50%;\n  transform: translateY(-50%);\n  color: var(--primary);\n  font-size: calc(0.66 * var(--fsu, 1rem));\n  opacity: 0.7;\n  line-height: 1;\n}\n\n/* \u7AD6\u8F68\u5728\u6700\u540E\u4E00\u884C\u6536\u5C3E\uFF0C\u4E0D\u753B\u5230\u5E95 */\n[data-region='folders'] > *:last-child {\n  border-bottom: none !important;\n}\n\n[data-region='folders'] > *:hover {\n  background: color-mix(in srgb, var(--primary) 5%, transparent) !important;\n  padding-left: 1.75rem !important;\n}\n\n/* \u6587\u4EF6\u5939\u56FE\u6807\u6362\u6210\u4E00\u4E2A\u5C0F\u4E09\u89D2\uFF0C\u50CF\u6811\u7684\u8282\u70B9 */\n[data-region='folders'] > * svg {\n  display: none;\n}\n\n/* \u540D\u5B57\u548C\u7BC7\u6570\u538B\u6210\u4E00\u884C\uFF1A\u540D\u5B57\u5728\u5DE6\uFF0C\u7BC7\u6570\u53F3\u5BF9\u9F50\uFF0C\u884C\u9AD8\u538B\u5230 1.5rem \u5DE6\u53F3\uFF0C\n   \u8FD9\u6837\u5341\u51E0\u884C\u6392\u4E0B\u6765\u624D\u50CF\u4E00\u68F5\u6811\uFF0C\u800C\u4E0D\u662F\u4E00\u5217\u5927\u5361\u7247 */\n[data-region='folders'] > * > span {\n  display: flex !important;\n  align-items: baseline;\n  gap: 0.6rem;\n  min-width: 0;\n}\n[data-region='folders'] > * .font-serif {\n  /* \u6811\u72B6\u662F\u5355\u5217\u7D27\u51D1\u884C\uFF0C\u5B57\u53F7\u5FC5\u987B\u660E\u663E\u5927\u4E8E\u7B14\u8BB0\u5217\u8868\u7684\u6807\u9898\uFF080.875rem\uFF09\uFF0C\n     \u5426\u5219\u4E00\u5217\u5C0F\u5B57\u6392\u5728\u6B63\u6587\u65C1\u8FB9\u770B\u7740\u6BD4\u6587\u7AE0\u6807\u9898\u8FD8\u5C0F */\n  font-size: calc(1.05 * var(--fsu, 1rem)) !important;\n  font-weight: 500 !important;\n  flex: 0 1 auto;\n}\n[data-region='folders'] > * > span > span:last-child {\n  font-size: calc(0.82 * var(--fsu, 1rem));\n  color: var(--muted-foreground);\n  margin-top: 0 !important;\n  display: inline !important;\n  white-space: nowrap;\n}\n[data-region='folders'] > * > span > span:last-child::before {\n  content: '\xB7';\n  margin-right: 0.45em;\n  opacity: 0.5;\n}\n/* \u53F3\u4FA7\u7BAD\u5934\u4FDD\u7559\uFF0C\u4F46\u7F29\u5230\u5F88\u5C0F */\n[data-region='folders'] > * > svg:last-child {\n  display: block;\n  opacity: 0.35;\n  width: 0.85rem;\n  height: 0.85rem;\n}\n\n/* \u7B14\u8BB0\u5217\u8868\uFF1A\u4E5F\u7528\u7AD6\u8F68\u6302\u7740\uFF0C\u53BB\u6389\u5361\u7247\u5916\u6846 */\n[data-region='list'] {\n  border: none !important;\n  background: transparent !important;\n  box-shadow: none !important;\n}\n[data-region='list'] > div:first-child {\n  background: transparent !important;\n  border-bottom: 1px solid var(--border) !important;\n  padding-left: 0 !important;\n  padding-right: 0 !important;\n}\n[data-region='list'] ul {\n  columns: 1 !important;\n  padding: 0 0 0 0.15rem !important;\n  border-left: 1px solid var(--border);\n}\n[data-region='list'] li > button {\n  border-radius: 0 !important;\n  padding-left: 1.4rem !important;\n  padding-top: 0.45rem !important;\n  padding-bottom: 0.45rem !important;\n  position: relative;\n}\n[data-region='list'] li > button::before {\n  content: '\xB7';\n  position: absolute;\n  left: 0.6rem;\n  color: var(--primary);\n  opacity: 0.8;\n}\n[data-region='list'] li > button:hover {\n  background: color-mix(in srgb, var(--primary) 5%, transparent) !important;\n}\n\n/* \u6807\u7B7E\uFF1A\u65E0\u8FB9\u6846\uFF0C\u53EA\u7528\u7AD6\u7EBF\u5206\u9694 */\n[data-region='tags'] {\n  gap: 0.2rem 1.1rem !important;\n}\n[data-region='tags'] > button {\n  border: none !important;\n  background: transparent !important;\n  border-radius: 0 !important;\n  padding: 0.1rem 0 !important;\n  color: var(--muted-foreground) !important;\n  font-size: calc(0.76 * var(--fsu, 1rem)) !important;\n}\n[data-region='tags'] > button:hover,\n[data-region='tags'] > button[class*='bg-primary'] {\n  color: var(--primary) !important;\n}\n\n/* \u9875\u811A */\n[data-region='footer'] {\n  opacity: 0.7;\n  letter-spacing: 0.03em;\n}\n\n@media (max-width: 767px) {\n  [data-region='folders'] > * {\n    padding-left: 1.3rem !important;\n  }\n}\n"
  },
  {
    "id": "bento",
    "name": {
      "zh": "\u65B9\u683C",
      "en": "Grid"
    },
    "desc": {
      "zh": "\u5927\u5C0F\u65B9\u5757\u62FC\u8D34\u9996\u9875\uFF0C\u7B2C\u4E00\u5757\u5360\u4E3B\u4F4D\uFF0C\u516D\u8272\u5FAA\u73AF\u53D1\u8272",
      "en": "Mosaic tile home \u2014 one hero tile plus a six-colour rotation"
    },
    "swatch": {
      "bg": "#f1f2f5",
      "fg": "#1b1e24",
      "accent": "#4b63e0",
      "card": "#ffffff"
    },
    "css": "/* ============================================================\n   \u65B9\u683C \u2014\u2014 \u9996\u9875\u505A\u6210\u5927\u5C0F\u4E0D\u4E00\u7684\u65B9\u5757\u62FC\u8D34\uFF08bento\uFF09\uFF0C\u50CF\u4E00\u5757\u4EEA\u8868\u76D8\n   \u7B2C\u4E00\u5757\u5360 2\xD72 \u5F53\u4E3B\u4F4D\uFF0C\u5176\u4F59\u6309 4 \u5217\u81EA\u52A8\u94FA\uFF1B\u6BCF\u5757\u4E00\u4E2A\u4F4E\u9971\u548C\u8272\u5E95\uFF0C\n   \u8272\u5757\u987A\u5E8F\u56FA\u5B9A\uFF08\u7B2C 1~6 \u5757\u5404\u4E00\u8272\uFF0C\u7B2C 7 \u5757\u8D77\u5FAA\u73AF\uFF09\uFF0C\u6240\u4EE5\u4F4D\u7F6E\u7A33\u5B9A\u4E0D\u8DF3\u8272\n   \u26A0\uFE0F \u5BBD\u5EA6\u7531\u7AD9\u70B9\u7EDF\u4E00\u63A7\u5236\uFF08globals.css \u7684 --content-w\uFF09\uFF0C\u4E3B\u9898\u91CC\u4E0D\u5199 max-width\uFF1A\n   \u6240\u6709\u4E3B\u9898\u7684\u9996\u9875\u4E0E\u6B63\u6587\u5BBD\u5EA6\u5FC5\u987B\u5B8C\u5168\u4E00\u81F4\uFF0C\u4E3B\u9898\u53EA\u8D1F\u8D23\u989C\u8272\u3001\u7D20\u6750\uFF0C\u4EE5\u53CA\n   \u300C\u975E\u6B63\u6587\u754C\u9762\u300D\u7684\u6392\u5E03\uFF08\u9996\u9875\u6587\u4EF6\u5939 / \u7B14\u8BB0\u5217\u8868 / \u6807\u7B7E\u600E\u4E48\u6446\uFF09\u3002\n   \uFF08\u5927\u7EB2\u662F\u7AD9\u70B9\u7684\u60AC\u6D6E\u7EC4\u4EF6\uFF0C\u4EFB\u4F55\u4E3B\u9898\u90FD\u4E0D\u53BB\u52A8\u5B83\u7684\u4F4D\u7F6E\u4E0E\u4EA4\u4E92\uFF09\n   ============================================================ */\n\n:root {\n  --radius: 1.15rem;\n\n  --background: #f1f2f5;\n  --foreground: #1b1e24;\n\n  --card: #ffffff;\n  --card-foreground: #1b1e24;\n  --popover: #ffffff;\n  --popover-foreground: #1b1e24;\n\n  --primary: #4b63e0;\n  --primary-foreground: #ffffff;\n\n  --secondary: #e6e8ee;\n  --secondary-foreground: #1b1e24;\n  --muted: #e9ebf0;\n  --muted-foreground: #6b7280;\n  --accent: #e2e6f7;\n  --accent-foreground: #1b1e24;\n\n  --border: #dcdfe7;\n  --input: #dcdfe7;\n  --ring: rgba(75, 99, 224, 0.4);\n\n  --code-bg: #f4f5f8;\n  --code-head-bg: #e8eaf0;\n  --code-head-fg: #6b7280;\n  --code-fg: #1b1e24;\n\n  /* \u65B9\u683C\u7684\u516D\u4E2A\u8272\u5E95\uFF08\u65E5\u95F4\uFF1A\u4F4E\u9971\u548C\u6D45\u8272\uFF09 */\n  --bento-1: #dfe4fd;\n  --bento-2: #dcefe4;\n  --bento-3: #fbe6d8;\n  --bento-4: #f3e0f2;\n  --bento-5: #e3e6ea;\n  --bento-6: #fdf0d3;\n}\n\nhtml.dark {\n  --background: #14161b;\n  --foreground: #e6e8ee;\n\n  --card: #1c1f26;\n  --card-foreground: #e6e8ee;\n  --popover: #1c1f26;\n  --popover-foreground: #e6e8ee;\n\n  --primary: #8b9bff;\n  --primary-foreground: #101218;\n\n  --secondary: #232730;\n  --secondary-foreground: #e6e8ee;\n  --muted: #232730;\n  --muted-foreground: #9aa1ae;\n  --accent: #262b36;\n  --accent-foreground: #eef0f5;\n\n  --border: #2b303a;\n  --input: #333947;\n  --ring: rgba(139, 155, 255, 0.5);\n\n  --code-bg: #171a20;\n  --code-head-bg: #1f232b;\n  --code-head-fg: #9aa1ae;\n  --code-fg: #e6e8ee;\n\n  /* \u591C\u95F4\uFF1A\u540C\u8272\u76F8\u7684\u6DF1\u8272\u7248\uFF0C\u4FDD\u8BC1\u5BF9\u6BD4\u5EA6\u591F */\n  --bento-1: #1e2547;\n  --bento-2: #163226;\n  --bento-3: #3a2718;\n  --bento-4: #35203a;\n  --bento-5: #23272f;\n  --bento-6: #3a3018;\n}\n\nbody,\n.markdown-body {\n  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'PingFang SC',\n    'Hiragino Sans GB', 'Microsoft YaHei', system-ui, sans-serif;\n}\n\n.markdown-body {\n  line-height: 1.85;\n}\n\n.markdown-body h2 {\n  border-bottom: none;\n  margin-top: 2.4em;\n  letter-spacing: -0.01em;\n}\n.markdown-body h2::before {\n  content: '';\n  display: inline-block;\n  width: 0.42em;\n  height: 0.42em;\n  margin-right: 0.5em;\n  border-radius: 0.1em;\n  background: var(--primary);\n  vertical-align: 0.18em;\n}\n\n.markdown-body blockquote {\n  background: var(--muted);\n  border-left: none;\n  border-radius: 0.85rem;\n  font-style: normal;\n  padding: 0.85em 1.1em;\n}\n\n/* \u9876\u680F\uFF1A\u65E0\u8FB9\u6846\uFF0C\u9760\u4E00\u5C42\u6D45\u5E95\u533A\u5206 */\nheader.sticky {\n  background: var(--background);\n  backdrop-filter: none;\n  border-bottom: none;\n  box-shadow: 0 1px 0 var(--border);\n}\n\n/* ============================================================\n   \u7248\u9762\uFF1A\u65B9\u683C\n   ============================================================ */\n\n/* \u9996\u9875\u6587\u4EF6\u5939\uFF1A4 \u5217\u65B9\u5757\uFF0C\u7B2C\u4E00\u5757\u5360 2\xD72 */\n[data-region='folders'] {\n  display: grid !important;\n  grid-template-columns: repeat(4, minmax(0, 1fr)) !important;\n  /* \u884C\u9AD8\u7528 minmax(\u57FA\u51C6, auto)\uFF1A\u5B57\u53F7\u653E\u5927\u65F6\u65B9\u5757\u8DDF\u7740\u957F\u9AD8\uFF0C\u6587\u5B57\u4E0D\u4F1A\u88AB\u884C\u9AD8\u5207\u6389\n     \uFF08\u5199\u6B7B 4.6rem \u65F6 160% \u5B57\u53F7\u4E0B\u540D\u5B57\u548C\u7BC7\u6570\u4F1A\u88AB\u88C1\u6389\u4E00\u622A\uFF0C\u770B\u8D77\u6765\u50CF\u7A7F\u6A21\uFF09 */\n  grid-auto-rows: minmax(4.6rem, auto);\n  gap: 0.7rem !important;\n  margin-bottom: 1.6rem !important;\n}\n\n/* \u8272\u5E95\u6309\u987A\u5E8F\u53D1\uFF0C\u4E00\u5FAA\u73AF\u516D\u8272\uFF1B\u4F4D\u7F6E\u53EA\u7531 DOM \u987A\u5E8F\u51B3\u5B9A\uFF0C\u6240\u4EE5\u4E0D\u4F1A\u8DF3 */\n[data-region='folders'] > *:nth-child(6n + 1) { background: var(--bento-1) !important; }\n[data-region='folders'] > *:nth-child(6n + 2) { background: var(--bento-2) !important; }\n[data-region='folders'] > *:nth-child(6n + 3) { background: var(--bento-3) !important; }\n[data-region='folders'] > *:nth-child(6n + 4) { background: var(--bento-4) !important; }\n[data-region='folders'] > *:nth-child(6n + 5) { background: var(--bento-5) !important; }\n[data-region='folders'] > *:nth-child(6n + 6) { background: var(--bento-6) !important; }\n\n[data-region='folders'] > * {\n  height: 100%;\n  border: none !important;\n  border-radius: var(--radius) !important;\n  box-shadow: none !important;\n  padding: 0.85rem 0.95rem !important;\n  align-items: flex-start !important;\n  gap: 0.55rem !important;\n  transition: transform 0.16s ease, box-shadow 0.16s ease;\n}\n\n[data-region='folders'] > *:hover {\n  transform: translateY(-2px);\n  box-shadow: 0 8px 22px -12px rgba(20, 24, 34, 0.55) !important;\n}\n\n/* \u4E3B\u4F4D\u7816\u53EA\u5728\u6587\u4EF6\u5939\u591F\u591A\u65F6\u624D\u542F\u7528\uFF1A\u5C11\u4E8E 5 \u4E2A\u65F6\u5F3A\u884C\u5360 2\xD72 \u4F1A\u5728\u53F3\u4E0B\u89D2\n   \u7559\u4E0B\u4E00\u4E2A\u586B\u4E0D\u6EE1\u7684\u7A7A\u6D1E\uFF0C\u53CD\u800C\u4E0D\u50CF\u300C\u65B9\u683C\u300D\u30024 \u4E2A\u4EE5\u5185\u5C31\u56DB\u5757\u7B49\u5206\u3002 */\n[data-region='folders']:has(> *:nth-child(5)) > *:first-child {\n  grid-column: span 2;\n  grid-row: span 2;\n  padding: 1.15rem 1.2rem !important;\n  flex-direction: column !important;\n  justify-content: flex-end;\n}\n[data-region='folders']:has(> *:nth-child(5)) > *:first-child > span {\n  width: 100%;\n}\n[data-region='folders']:has(> *:nth-child(5)) > *:first-child .font-serif {\n  font-size: calc(1.5 * var(--fsu, 1rem)) !important;\n  line-height: 1.25;\n  white-space: normal !important;\n  overflow: visible !important;\n}\n\n/* \u65B9\u5757\u5185\u90E8\uFF1A\u540D\u5B57\u5728\u4E0A\u3001\u7BC7\u6570\u5728\u4E0B\uFF0C\u56FE\u6807\u7F29\u6210\u5C0F\u89D2\u6807 */\n[data-region='folders'] > * > span {\n  display: flex !important;\n  flex-direction: column;\n  gap: 0.1rem;\n  min-width: 0;\n}\n[data-region='folders'] > * .font-serif {\n  font-size: calc(0.95 * var(--fsu, 1rem)) !important;\n  font-weight: 600 !important;\n  letter-spacing: -0.01em;\n}\n[data-region='folders'] > * > span > span:last-child {\n  font-size: calc(0.7 * var(--fsu, 1rem));\n  color: var(--muted-foreground);\n  margin-top: 0 !important;\n  white-space: normal !important;\n}\n/* \u56FE\u6807\u7F29\u5C0F\u3001\u989C\u8272\u8DDF\u7740\u6587\u5B57\u8D70 */\n[data-region='folders'] > * > svg:first-child {\n  width: 1rem !important;\n  height: 1rem !important;\n  opacity: 0.55;\n}\n/* \u53F3\u4FA7\u7BAD\u5934\u53BB\u6389\uFF0C\u65B9\u5757\u4E0D\u9700\u8981\u6307\u793A\u65B9\u5411 */\n[data-region='folders'] > * > svg:last-child {\n  display: none;\n}\n\n/* \u7B14\u8BB0\u5217\u8868\uFF1A\u4E00\u5757\u767D\u5E95\u5927\u5361\uFF0C\u5185\u90E8\u4E24\u680F */\n[data-region='list'] {\n  border: none !important;\n  border-radius: var(--radius) !important;\n  background: var(--card) !important;\n  box-shadow: 0 1px 0 var(--border) !important;\n  overflow: visible !important;\n}\n[data-region='list'] > div:first-child {\n  border-bottom: 1px solid var(--border) !important;\n  background: transparent !important;\n  padding: 0.7rem 1rem !important;\n}\n[data-region='list'] ul {\n  columns: 1 !important;\n  padding: 0.4rem !important;\n}\n[data-region='list'] li > button {\n  border-radius: 0.7rem !important;\n  padding: 0.42rem 0.7rem !important;\n}\n[data-region='list'] li > button:hover {\n  background: var(--muted) !important;\n}\n\n/* \u6807\u7B7E\uFF1A\u5C0F\u65B9\u7CD6\uFF0C\u65E0\u8FB9\u6846 */\n[data-region='tags'] {\n  gap: 0.4rem !important;\n  margin-bottom: 1.1rem !important;\n}\n[data-region='tags'] > button {\n  border: none !important;\n  border-radius: 0.6rem !important;\n  background: var(--card) !important;\n  padding: 0.3rem 0.6rem !important;\n  font-size: calc(0.72 * var(--fsu, 1rem)) !important;\n  color: var(--muted-foreground) !important;\n  box-shadow: 0 1px 0 var(--border);\n}\n[data-region='tags'] > button:hover {\n  color: var(--foreground) !important;\n}\n[data-region='tags'] > button[class*='bg-primary'] {\n  background: var(--primary) !important;\n  color: var(--primary-foreground) !important;\n}\n\n/* \u6587\u7AE0\u6807\u9898\uFF1A\u65B9\u4E00\u70B9\u3001\u7D27\u4E00\u70B9 */\n[data-region='article'] > header h1 {\n  font-size: calc(2.05 * var(--fsu, 1rem)) !important;\n  letter-spacing: -0.02em;\n}\n\n/* \u9875\u811A */\n[data-region='footer'] {\n  justify-content: center !important;\n  opacity: 0.55;\n  font-size: calc(0.72 * var(--fsu, 1rem));\n}\n\n/* \u5BBD\u5C4F\u624D\u94FA 4 \u5217\uFF1B\u7A84\u5C4F\u81EA\u7136\u964D\u5217\u6570\uFF0C\u907F\u514D\u65B9\u5757\u6324\u6210\u4E00\u6761 */\n@media (max-width: 1023px) {\n  [data-region='folders'] {\n    grid-template-columns: repeat(2, minmax(0, 1fr)) !important;\n  }\n}\n@media (max-width: 639px) {\n  [data-region='folders'] {\n    grid-template-columns: minmax(0, 1fr) !important;\n  }\n  [data-region='folders']:has(> *:nth-child(5)) > *:first-child {\n    grid-column: span 1;\n    grid-row: span 1;\n  }\n  [data-region='article'] > header h1 {\n    font-size: calc(1.6 * var(--fsu, 1rem)) !important;\n  }\n}\n"
  },
  {
    "id": "neon",
    "name": {
      "zh": "\u9713\u8679",
      "en": "Neon"
    },
    "desc": {
      "zh": "\u8FD1\u9ED1\u5E95 + \u9752/\u54C1\u7EA2\u63CF\u8FB9\uFF0C\u7B49\u5BBD\u5B57\u4F53\uFF0C\u7F16\u53F7\u76EE\u5F55\u884C",
      "en": "Near-black canvas, cyan and magenta outlines, monospace numbered rows"
    },
    "swatch": {
      "bg": "",
      "fg": "",
      "accent": "",
      "card": ""
    },
    "css": "/* ============================================================\n   \u9713\u8679 \u2014\u2014 \u8FD1\u9ED1\u5E95 + \u9752/\u54C1\u7EA2\u53CC\u8272\u63CF\u8FB9\uFF0C\u7B49\u5BBD\u5B57\uFF0C\u9ED8\u8BA4\u5C31\u662F\u6697\u8272\n   \u7248\u9762\u5DEE\u5F02\u4F53\u73B0\u5728\uFF1A\u9996\u9875\u6587\u4EF6\u5939\u505A\u6210\u300C\u7F16\u53F7\u76EE\u5F55\u884C\u300D\uFF0C\u884C\u9996 [01] \u8BA1\u6570\u5668\uFF0C\n   \u60AC\u505C\u6574\u884C\u8367\u5149\u63CF\u8FB9\uFF1B\u6807\u7B7E\u505A\u6210\u7EC8\u7AEF\u5F0F\u7684 #[tag] \u524D\u7F00\n   \u26A0\uFE0F \u5BBD\u5EA6\u7531\u7AD9\u70B9\u7EDF\u4E00\u63A7\u5236\uFF08globals.css \u7684 --content-w\uFF09\uFF0C\u4E3B\u9898\u91CC\u4E0D\u5199 max-width\uFF1A\n   \u6240\u6709\u4E3B\u9898\u7684\u9996\u9875\u4E0E\u6B63\u6587\u5BBD\u5EA6\u5FC5\u987B\u5B8C\u5168\u4E00\u81F4\uFF0C\u4E3B\u9898\u53EA\u8D1F\u8D23\u989C\u8272\u3001\u7D20\u6750\uFF0C\u4EE5\u53CA\n   \u300C\u975E\u6B63\u6587\u754C\u9762\u300D\u7684\u6392\u5E03\uFF08\u9996\u9875\u6587\u4EF6\u5939 / \u7B14\u8BB0\u5217\u8868 / \u6807\u7B7E\u600E\u4E48\u6446\uFF09\u3002\n   \uFF08\u5927\u7EB2\u662F\u7AD9\u70B9\u7684\u60AC\u6D6E\u7EC4\u4EF6\uFF0C\u4EFB\u4F55\u4E3B\u9898\u90FD\u4E0D\u53BB\u52A8\u5B83\u7684\u4F4D\u7F6E\u4E0E\u4EA4\u4E92\uFF09\n   ============================================================ */\n\n/* \u6CE8\u610F\uFF1A\u8FD9\u5957\u300C\u65E5\u95F4\u6A21\u5F0F\u300D\u4E5F\u662F\u6697\u7684 \u2014\u2014 \u9713\u8679\u53EA\u6709\u6697\u5E95\u624D\u6210\u7ACB\u3002\n   html.dark \u518D\u538B\u6DF1\u4E00\u6863\uFF0C\u4E24\u6863\u90FD\u4E0D\u4F1A\u767D\u5E95\u523A\u773C\u3002 */\n:root {\n  --radius: 0.25rem;\n\n  --background: #101319;\n  --foreground: #d9e2ec;\n\n  --card: #161b23;\n  --card-foreground: #d9e2ec;\n  --popover: #161b23;\n  --popover-foreground: #d9e2ec;\n\n  --primary: #22d3ee;\n  --primary-foreground: #06131a;\n\n  --secondary: #1b2230;\n  --secondary-foreground: #d9e2ec;\n  --muted: #181e28;\n  --muted-foreground: #7f8ea3;\n  --accent: #1d2734;\n  --accent-foreground: #e5eef8;\n\n  --border: #263140;\n  --input: #2c3a4b;\n  --ring: rgba(34, 211, 238, 0.45);\n\n  --code-bg: #121821;\n  --code-head-bg: #1a222e;\n  --code-head-fg: #7f8ea3;\n  --code-fg: #d9e2ec;\n\n  /* \u53CC\u8272\u63CF\u8FB9\uFF1A\u9752\u505A\u4E3B\u52A8\u4F5C\uFF0C\u54C1\u7EA2\u53EA\u505A\u70B9\u7F00\uFF08\u60AC\u505C/\u5F3A\u8C03\uFF09\uFF0C\u4E0D\u8981\u4E24\u8272\u5206\u91CF\u76F8\u7B49 */\n  --neon-a: #22d3ee;\n  --neon-b: #f472b6;\n  --grid-line: rgba(120, 160, 200, 0.05);\n}\n\nhtml.dark {\n  --background: #080a0e;\n  --foreground: #dde6f0;\n\n  --card: #0e1218;\n  --card-foreground: #dde6f0;\n  --popover: #0e1218;\n  --popover-foreground: #dde6f0;\n\n  --primary: #38e1f5;\n  --primary-foreground: #04101a;\n\n  --secondary: #121822;\n  --secondary-foreground: #dde6f0;\n  --muted: #101620;\n  --muted-foreground: #8797ac;\n  --accent: #141c28;\n  --accent-foreground: #eaf3fc;\n\n  --border: #1c2735;\n  --input: #23303f;\n  --ring: rgba(56, 225, 245, 0.5);\n\n  --code-bg: #0a0e13;\n  --code-head-bg: #111823;\n  --code-head-fg: #8797ac;\n  --code-fg: #dde6f0;\n\n  --neon-a: #38e1f5;\n  --neon-b: #fb7cc0;\n  --grid-line: rgba(110, 150, 190, 0.045);\n}\n\n/* \u5168\u7AD9\u7B49\u5BBD\uFF1A\u8FD9\u5957\u4E3B\u9898\u7684\u6C14\u8D28\u5168\u5728\u7B49\u5BBD\u5B57\u4E0A */\nbody,\n.markdown-body,\n[data-region='folders'] > *,\n[data-region='tags'] > button {\n  font-family: 'JetBrains Mono', 'SFMono-Regular', Consolas, 'Cascadia Mono',\n    'Liberation Mono', Menlo, monospace;\n}\n\n/* \u80CC\u666F\u4E00\u5C42\u6781\u6DE1\u7684\u7F51\u683C\uFF0C\u53EA\u5728\u6697\u5E95\u4E0B\u770B\u5F97\u51FA\u6765 */\nbody {\n  background-image: linear-gradient(var(--grid-line) 1px, transparent 1px),\n    linear-gradient(90deg, var(--grid-line) 1px, transparent 1px);\n  background-size: 2.5rem 2.5rem;\n  background-attachment: fixed;\n}\n\n.markdown-body {\n  line-height: 1.85;\n}\n\n.markdown-body h2 {\n  border-bottom: none;\n  margin-top: 2.4em;\n  color: var(--foreground);\n  font-weight: 600;\n  letter-spacing: -0.01em;\n}\n/* \u4E8C\u7EA7\u6807\u9898\u524D\u7684\u865A\u62DF\u63D0\u793A\u7B26 */\n.markdown-body h2::before {\n  content: '#';\n  margin-right: 0.5em;\n  color: var(--neon-a);\n  opacity: 0.75;\n}\n\n.markdown-body blockquote {\n  border-left: 2px solid var(--neon-b);\n  background: rgba(244, 114, 182, 0.05);\n  font-style: normal;\n  border-radius: 0;\n}\n\n.markdown-body code {\n  background: var(--code-bg);\n  border: 1px solid var(--border);\n  color: var(--neon-a);\n}\n\n/* \u9876\u680F\uFF1A\u5E95\u90E8\u4E00\u6761\u8367\u5149\u7EC6\u7EBF */\nheader.sticky {\n  background: color-mix(in srgb, var(--background) 88%, transparent);\n  backdrop-filter: blur(8px);\n  border-bottom: 1px solid var(--border);\n  box-shadow: 0 1px 0 0 rgba(34, 211, 238, 0.12);\n}\n\n/* \u7AD9\u540D\uFF1A\u9752\u8272\u5B57 + \u6DE1\u5149\u6655\uFF0C\u50CF\u4E00\u4E2A\u7EC8\u7AEF\u63D0\u793A\u7B26 */\n[data-region='header'] > button:first-child {\n  color: var(--neon-a) !important;\n  text-shadow: 0 0 14px rgba(34, 211, 238, 0.35);\n  letter-spacing: -0.02em;\n}\n[data-region='header'] > button:first-child::after {\n  content: '_';\n  margin-left: 0.12em;\n  color: var(--neon-b);\n  animation: neon-caret 1.15s steps(1) infinite;\n}\n@keyframes neon-caret {\n  0%,\n  50% {\n    opacity: 1;\n  }\n  50.01%,\n  100% {\n    opacity: 0;\n  }\n}\n\n/* ============================================================\n   \u7248\u9762\uFF1A\u7F16\u53F7\u76EE\u5F55\u884C\n   ============================================================ */\n[data-region='folders'] {\n  display: flex !important;\n  flex-direction: column;\n  gap: 0 !important;\n  margin-bottom: 1.6rem !important;\n  padding: 0 !important;\n  border-top: 1px solid var(--border);\n  counter-reset: neon-row;\n}\n\n[data-region='folders'] > * {\n  counter-increment: neon-row;\n  position: relative;\n  width: 100%;\n  min-height: 0 !important;\n  padding: 0.55rem 0.5rem 0.55rem 3.6rem !important;\n  gap: 0.55rem !important;\n  border: none !important;\n  border-bottom: 1px solid var(--border) !important;\n  border-radius: 0 !important;\n  background: transparent !important;\n  box-shadow: none !important;\n  transition: background 0.12s ease, box-shadow 0.12s ease;\n}\n\n/* \u884C\u9996 [01] \u8BA1\u6570\u5668 */\n[data-region='folders'] > *::before {\n  content: '[' counter(neon-row, decimal-leading-zero) ']';\n  position: absolute;\n  left: 0;\n  top: 50%;\n  transform: translateY(-50%);\n  width: 2.9rem;\n  text-align: right;\n  color: var(--muted-foreground);\n  font-size: calc(0.72 * var(--fsu, 1rem));\n  letter-spacing: -0.02em;\n  opacity: 0.8;\n  pointer-events: none;\n}\n\n/* \u60AC\u505C\uFF1A\u6574\u884C\u8367\u5149\u63CF\u8FB9\uFF08\u7528 inset \u9634\u5F71\u800C\u4E0D\u662F border\uFF0C\u907F\u514D\u884C\u9AD8\u8DF3\u52A8\uFF09 */\n[data-region='folders'] > *:hover {\n  background: rgba(34, 211, 238, 0.06) !important;\n  box-shadow: inset 0 0 0 1px var(--neon-a) !important;\n}\n[data-region='folders'] > *:hover::before {\n  color: var(--neon-b);\n  opacity: 1;\n  text-shadow: 0 0 10px rgba(244, 114, 182, 0.5);\n}\n\n/* \u540D\u5B57\uFF1A\u9752\u8272\uFF0C\u7565\u7D27 */\n[data-region='folders'] > * > span {\n  display: flex !important;\n  align-items: baseline;\n  gap: 0.7rem;\n  min-width: 0;\n}\n[data-region='folders'] > * .font-serif {\n  font-family: inherit !important;\n  font-size: calc(0.92 * var(--fsu, 1rem)) !important;\n  font-weight: 500 !important;\n  color: var(--foreground);\n  flex: 0 1 auto;\n}\n[data-region='folders'] > * > span > span:last-child {\n  margin-top: 0 !important;\n  display: inline !important;\n  font-size: calc(0.72 * var(--fsu, 1rem)) !important;\n  color: var(--muted-foreground);\n  white-space: nowrap;\n}\n/* \u7BC7\u6570\u524D\u52A0\u4E00\u4E2A\u659C\u6760\uFF0C\u50CF ls -l \u7684\u5B57\u6BB5\u5206\u9694 */\n[data-region='folders'] > * > span > span:last-child::before {\n  content: '/';\n  margin-right: 0.5em;\n  opacity: 0.45;\n}\n\n/* \u56FE\u6807\uFF1A\u7F29\u5230\u5F88\u5C0F\uFF0C\u9752\u8272 */\n[data-region='folders'] > * > svg:first-child {\n  width: 0.9rem !important;\n  height: 0.9rem !important;\n  color: var(--neon-a) !important;\n  opacity: 0.65;\n}\n/* \u53F3\u4FA7\u7BAD\u5934\u6362\u6210 \u25B8\uFF0C\u60AC\u505C\u53D8\u54C1\u7EA2 */\n[data-region='folders'] > * > svg:last-child {\n  display: none;\n}\n[data-region='folders'] > *:hover > span > span:last-child::after {\n  content: ' \u25B8';\n  color: var(--neon-b);\n}\n\n/* \u7B14\u8BB0\u5217\u8868\uFF1A\u7EC8\u7AEF\u9762\u677F\u5F0F\uFF0C\u6807\u9898\u884C\u50CF\u7A97\u53E3\u6807\u9898\u680F */\n[data-region='list'] {\n  border: 1px solid var(--border) !important;\n  border-radius: var(--radius) !important;\n  background: var(--card) !important;\n  box-shadow: none !important;\n}\n[data-region='list'] > div:first-child {\n  background: var(--code-head-bg) !important;\n  border-bottom: 1px solid var(--border) !important;\n  padding: 0.5rem 0.8rem !important;\n}\n[data-region='list'] > div:first-child > span:nth-child(2) {\n  font-family: inherit !important;\n  color: var(--neon-a) !important;\n  font-size: calc(0.8 * var(--fsu, 1rem)) !important;\n  letter-spacing: 0.02em;\n}\n[data-region='list'] ul {\n  columns: 1 !important;\n  padding: 0.3rem !important;\n}\n[data-region='list'] li > button {\n  border-radius: 0 !important;\n  padding: 0.3rem 0.55rem !important;\n  border-left: 1px solid transparent !important;\n}\n[data-region='list'] li > button:hover {\n  background: rgba(34, 211, 238, 0.07) !important;\n  border-left-color: var(--neon-a) !important;\n}\n/* \u5217\u8868\u91CC\u7684\u65E5\u671F\u7528\u6697\u4E00\u70B9\u7684\u54C1\u7EA2\uFF0C\u50CF\u65F6\u95F4\u6233 */\n[data-region='list'] li > button > span:last-child {\n  color: var(--neon-b) !important;\n  opacity: 0.6;\n  font-size: calc(0.68 * var(--fsu, 1rem)) !important;\n}\n\n/* \u6807\u7B7E\uFF1A\u7EC8\u7AEF\u5F0F #[tag] */\n[data-region='tags'] {\n  gap: 0.35rem !important;\n  margin-bottom: 1.1rem !important;\n}\n[data-region='tags'] > button {\n  border: 1px solid var(--border) !important;\n  border-radius: 0 !important;\n  background: transparent !important;\n  color: var(--muted-foreground) !important;\n  font-size: calc(0.7 * var(--fsu, 1rem)) !important;\n  padding: 0.24rem 0.5rem !important;\n}\n[data-region='tags'] > button:hover {\n  border-color: var(--neon-a) !important;\n  color: var(--neon-a) !important;\n}\n[data-region='tags'] > button[class*='bg-primary'] {\n  background: rgba(34, 211, 238, 0.12) !important;\n  border-color: var(--neon-a) !important;\n  color: var(--neon-a) !important;\n}\n\n/* \u9762\u5305\u5C51\uFF1A\u7EC8\u7AEF\u8DEF\u5F84\u611F\uFF0C\u5206\u9694\u7B26\u6539 / */\n[data-region='crumbs'] nav button {\n  font-family: inherit;\n  font-size: calc(0.78 * var(--fsu, 1rem)) !important;\n  color: var(--muted-foreground);\n}\n[data-region='crumbs'] nav button:hover {\n  color: var(--neon-a);\n}\n\n/* \u6587\u7AE0\u6807\u9898\uFF1A\u9752\u8272\uFF0C\u6807\u9898\u4E0B\u4E00\u6761\u8367\u5149\u7EBF */\n[data-region='article'] > header h1 {\n  font-family: inherit !important;\n  font-size: calc(1.85 * var(--fsu, 1rem)) !important;\n  letter-spacing: -0.02em;\n  padding-bottom: 0.5rem;\n  border-bottom: 1px solid var(--border);\n}\n\n/* \u9875\u811A */\n[data-region='footer'] {\n  font-family: inherit !important;\n  font-size: calc(0.72 * var(--fsu, 1rem));\n  opacity: 0.5;\n  letter-spacing: 0.02em;\n}\n/* \u6CE8\u610F\uFF1A\u522B\u5728 [data-region='footer'] \u4E0A\u52A0 ::before \u2014\u2014 \u7AD9\u70B9\u7ED9\u8FD9\u4E2A\u5BB9\u5668\u8BBE\u4E86\n   justify-between\uFF0C\u4F2A\u5143\u7D20\u4F1A\u53D8\u6210\u4E00\u4E2A flex \u9879\u88AB\u63A8\u5230\u6700\u5DE6\uFF0C\u6B63\u6587\u88AB\u6324\u5230\u6700\u53F3\u8FD8\u88AB\u88C1\u6389\u3002\n   \u88C5\u9970\u70B9\u6302\u5728\u884C\u5185 span \u4E0A\u5C31\u4E0D\u4F1A\u53C2\u4E0E\u5E03\u5C40\u5206\u914D\u3002 */\n[data-region='footer'] > span::before {\n  content: '\u25CF';\n  color: var(--neon-a);\n  margin-right: 0.55em;\n  opacity: 0.7;\n}\n"
  }
];

// ../scripts/theme-previews.mjs
var THEME_PREVIEWS = {
  "default": "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",
  "study": "iVBORw0KGgoAAAANSUhEUgAAA5gAAAHMCAMAAACHlvdHAAAB4FBMVEX///////z///r//vv///n//vn///j///b//vj//vf//vb//ff//fb9/vn9/Pf///P//fX//PX+/PX//PP9/PT++/P8+/T++fD8+fP8+fH8+e/6+vL79+/79u/49vD+++f89un79e359e349e339e369er59Ov49O749Oz49Ov48+v39O339Ov38+v28+v59Or39Or38+r28+r68+X38un28ur28un48uj28uj68uH19u/18uv18un18ujy9u/k9/b48ej28en28ej28Oj18en18ej18Oj08en18ef08ef08eb08Of08Obz8Ofz7+b07+Xy7+Xy7uXy7uT07OT47Nfw7ubw7OPx7OHw7OHw7ODw6+Hw7tvw69/v69/w69vv6t7u6uHu6t3u6d7u6d3u6N7v6Njt6d/s59nt5tns5trs5tnr5tnr5tjr5tfr5djn6uTW6u3r5Nfq5Njq49bz48np5Njn49jo4tPn49Hq4M7m39Hl39Dl3tDl3s/l3s7u2bvj3tHh38Ph2snf1sve1sPj1r3i1Mbd1cTd1MHi1LjW29PB2d7jzK7QzcDBy8bQwKq7wLjEs5quwL+rrqSes7CMr7Gkn4+RnpiYjnp8joZfh4lsaFg+aWQsaU5MVFExOTtMqJ/hAABbyklEQVR42u2di0MaV9r/B0PEG4IokqgVNTHVeCteEC+BhDqBrrc3FuM2TZvszyZb091AKy9u7EZMsm3iDAzDDDBcLPyrv+cMFxEhwTb7JtXn02q8nTkzz5zveZ7znDNnKDOCIB8dFJoAQVCYCIKgMBEEhYkgyMcvTDt97rFgA0M+NmGOXOk79wxjA0M+NmFu/vv5uecHdJnIxyVM0+rexv1zzoO13QfoM5GPS5hrL/vGBs83pq7d7wawiSH/PWE6HYWEDvlueV7+4coiXfiLpZWFUmEOn/c4ju5DYSL/FWE6V2QJzl3uIcqk581D08tmS7dhGr5b6NQaxvKCXWhunV5AYaIwkf+iME2mcZPM1CXNGFHmxBtPzzI93zU2+a279ebAC27OfnvOFRY4d68T5Gihb0+EBOvYIk3P0/O/T5j0sS/oMr8oxjL/Oy514Xf9KlvfAgoT+dDCNG2sTy86gOWesOSZXrDMuVKHHsPlnlfujkA6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",
  "sakura": "iVBORw0KGgoAAAANSUhEUgAAA5gAAAHMCAMAAACHlvdHAAAB4FBMVEX///////7///X6//7//v///v7+/v7//vz+/f7//fz//Pz9/f3//fr//Pv+/Pv//Pn9/Pv/+/v/+/r++/r9+/z/+/n/+vr++vv++vr9+vv++vn++fr/+fn++fn/+fj9+fv9+fn9+fj++Pj9+Pr9+Pn9+Pj++vL8+/v8+Pz8+Pn8+Pj8+Pb2+vz+9/f99/j99/f89/j89/f79/r79/j79/f69/j99vf79vr79vj79vf69vj89ff69ff69Pf89vb79vb69vb89PX79Pb79PX69PX78/b79PT78/T68/T99ef78vX68vT68vP68PP98OH49PX58fP58fL48fL48u358PL48PP48PL38PT48PD47/H37/L37/H37+/57vL47vH47vD37vH37vD47uf57fH47fD47e/37fD37e/47ef18fHo8ff37PD37O/37O746+/27O726+/26+737O326+367N764s316Ozy7O306Ovv6ejw5ubw18vn5Ofl3uDi1dHY2eDWzM7E1efhwrXRxMbJwsnHu8DQta7Cs7fMp6S6tsG6qa6nudipqr20oam0nJyina24lZjFhY2olJynjJGekZ2ehY2ThI94haChb2mAbXBoanxkW2RoTUpNRlVMNz86JjFLGVFIAABHSElEQVR42u29jUMaV77/fwjyqHkwmhTpYjANmlASpDXuptur7tXNxm+z0pr82mbb722T371J4Zdet6uGIAwMzzg86fAk8vSv/j6DqJhg1EYxm7xfbVAQZoYz5zWfzzlzZg4zAgDeORiKAACICQCAmABATADAv5WY1z4oUKvAv4GYel1v77kPid5enR4VC7zbYuqMk189/fXFh8Rvz7+eNA6gaoF3V0z9wP2XL397NH3vQ2Lm219fvHx0Q4fKBd5RMXW2xUWz0Tig6/uQ0EmZ7OMXM72oXeCExRwzN38xS7+Yx7Z+n9p5md4xaX7tU30zL7/+UGtn7+TLb2AmOCExP7/TfJe2ISTVNx1JqWh8yMwY692xkTHjq2YOTL78tO+DLVid8cX9PtQvcIxi6nT0fwNST3rhms+toOiouKxzOZixj/OZjWNGhxDhHYqtEGq2RUJjvWP0pNXOxeljqJnmY/uq5uNczsELG7C+uIP6BY5RTIdd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",
  "mono": "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",
  "tree": "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",
  "bento": "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",
  "neon": "iVBORw0KGgoAAAANSUhEUgAAA5gAAAHMCAMAAACHlvdHAAAB4FBMVEW4xcE8wdeZnZwwmK18foZodIRgbX4rdYxgYWVUXmtPWmZLU19GU2JCSVUbW3AmSFxFPTw4PUYyOkUvMzopNUciLTopLjcjKzchMUghKTYgKTYgKTUgKTMTOEobLlQaLjkcLjcRLjgSKzYnJikfKDUfKDQfKDMfJS4eJzQeJzMeJjMeJjIeJjEeIiodJUkdJjEdJTEdJDEdJjAdJTAdJDAdIioSJD0cJS4cIy4RJi4VHy4bIiwbISwRJSwYHywaICgaHiUYHioYHicYHiYQICcfGRoXHSYXHCUXHCMXGiAWHCQWGyQWGyMWGSAVGysVHCIVGiIVGSIVGyEVGSEVGB4UGiIUGB8UFx8TFx8UFh8TFx0TFRkRGSQRFx0SFh0RFh0RFR0SFhwSFRsRFRsRFBsSFRoSFBoRFBoRFBgNGioOGSAPFx4QFRsOFRsQFRoQFBoPFBoPFBgSExgQExsQExoQExkQExgNEx4PExkOExkMExkOExgbDREQEhoQEhgQEhcQEBQPEhsPEhgPERgPEhcPERcPEhYPERYPERQPCxAOERgOEhYOERYOEBYOERUOEBUOEBMOCQ4JDSUKDxgMDxUNEBQNDxQMDxQLDRQKDRMJDBAICg8HCA0FBgoCBAkBAAP2yTQbAABTF0lEQVR42u29jUPb5rn37xhJtiTLtqTGZJuhD/E2741sz2+F02zLwWcHb2QLe3pOWdIZmtayUzlAjlNqEZJScDwYwQcvARuMXiz9q7/rloyxgQSTdtnaXp8kxDaWrLevr+u+7lv316chCPIvhw8PAYKgMBEE+QqFWXHpfdZ+rXLq1wiC/AOE2SW7NYD8v+JSWakSVrrpeo7yRJB/mDA7MmzLztXdQxd4/hj+VB92gKePOy8cyfPsj1KRIl5wyGsKs0eWoEvQ3eNjGT5+6D55/HDR5eED79nxO16hzOcH33pqeMEhryVMT5XdQgQePH7g6fDBMQsuDxY6Lyy2pepq8yxlrvzs8reeX2/gFYe8hjA7ujxS2YOHPULsZn5+nvzsee1Imadjplr7+S/++PtvOX/80a/3VbzmkIsLs1uWiz2SnCdCnH8ZC+R3HWmeoUz14PL7BzvfbqrN337nAIWJXFiYni5BWyciYxdzc/Pzk5OT5MGc+//R65NznkJBm64yTwvzvc1v+bEuPZ/4LgoTubAwSSJLdNmlR09t8w8eTBI5EiGSH0+8Jw8ee/+7j3cWJolo3aCJwkRhIl+hMNvxcrETJZ/sL4A25+aHhrwwOXmVPBiKXJ28MXk9EI4MdYQZDo+0I+iCm8x+eWGqJx6r/VzSbqfE0YPjZ2f32pz1Sb3vO3vdr/pcFCbyVQsTAiZpXy4sXJ88UmY44MrtxsClIXgpMjQfuRS4Oh++NEC0OHBp4FLgOvwW5LgQvnRp6PHC4uT84jxJZk+FzBPCVHOnBaNtHL2WyyrZ7E5GySrk2UalWFPXKvp+CZ7AL1QNfq2e1f+qNgxAJ79rGkZjx9B1Qz/5Np28xf1Ran/w/plHBtbQhA/PZt1nRW3HXeaM4k1lo1h1P9fd9Eo2q2ye3WGJwvzGocI1qvYXM3pRshcQphswFxYeDw1c6hAgYXAIHgwMwKsjQ5cGrk6GLwWGgIFLoMZL4euTgYFAIAwyDQQCAwMj7VbmK4Wp1PTmiUCVM2Xeznjv1VutFp+x4WdFy7Z42UzxgjAxWoXftVpOnHcs+5RAsi1BbI3KsZgc3ylplaQsj6bkWFwePBGnKzE5Jg+6P6qamlUyG2ySKF05KbdRWU5WFLZlkT1RjRg3BSsfHKud0FzOlPhWinxubJnIGRZweNlSUJjfAhRNt3RNObxo/7Sq6mblwsKcnx8KRzyGhkYgIs4HLhFVguzCEaJUEKYnXfJzAMRKHoAsB8jLYSjQnifMijEhD1aavdeowbMZ9yW1KfO8wFECz/OZimKzksPERYFnWlltWeAFlhZ4bvSUQGxedESGZRlBz6tNmuXoGMNQLN/7MWqNY1mWpuF9IV2pWZZl32Icw7LM3tXldZphKc2ieGGGdD5anCTAyv2ynut9Y7Elck4MfsVyFS2ny5TAyQLdxIj5bdClUZUFuWrFRqunUqQKDJl72XK5hi6L2ZV+hUlKstC+XKw9Pjh4XtuqVjdg2A8kqpMjly5dH4IcdiRwCf7cIMIMHEXUATdywjsCkUg4HL4UJnntwsOH1erxKPcTwlSrtzmapplYl2RUzWClUeZOUyGxj+ElkZJFIFOZNljRZmOikGGsbKkpiRLPwK8yxokrfFrnBL3lEGqa2qA5njZsLuZYJ95XslqmI4iO1bKUZpwhUOQHW+sV8D5jO0xNECQqqRfVJie2dNvhk63MWs/qljP7ImeY7ufqatFmWFriefFOBYX5zdelKfoIIgWX5qmgeHPqprq8cdZ1oDam/D6fYGYvJMwPrw91MzAwNEnajwEvQobd2HkULuHxwA3ylgEveoJMF9zK7AMyorYzsP2EMD/XGGZ0+pZADXaUmSsa/KDjZLnsQQaEyYrJUXowHh+sbugcQ0HsZASBhYhZGRscHBWZFKSooz3fRzmDZ2iKlSVZlqSxWnaTCgmUxVIsNXEyzcjslExe0KdnFK1yZ1SmM8mJCZm+mew9hKpOSzItCaIoN9WcKUhJ1qpwlHyrN2LmDJEGYUuSHJOkeO2vvNiSRDbpKBgxvwXxUvBRsZRM+XwkmetpV5k8CNYv+vytoC/eOHHOK4rfz/lEXek7lSWZ7GJ3C9NtZY6A/OBfwBNmIAzhcgCekL+k+nN1cp78aogkvBFokc7NLzwgw2e77jnpEaaqi/Tf9epGS2CaR+WXpsVzIchceTZr5rMWS/MUCyknE2/mlh1OdtiUJFQZa9phaI6lOPI72lS6G91qo0HHVIajKQioeqUFebDgMPIYmzyRVap6LEayXsOE0FfRK1zSXLGgebpz4m37Ak0Lm7bATBgkyNu83GIlk2VneiOrtmGxgg2bSnGMYCUFy0iyo2yqqaIwv+lsZn1Bp6GrIEyqXR3pCNPifDHbjkFcDPpiJ4SpWJTfEXwVVVH7FibpKXlww4uVlwbC7v9XIWAOkGosCZAgzEmoypLc1YuYgesj1yGMDpES7cD1+Rs3XGE+OBpm2xnV3hUxa6wAkb9UmaInqiUv7Eh0bBTajqKcYkLGnRYzPSEqEklK1cp0ixdEgWagyWfqUGdphUSnIjiC3AAx6l3CjPnpfMuRecdu6jFoQ7KMyPMcFwdhdpeAlRbPOwLJXm9XSNossY5aoXW3jZDvel/WEQWnwoMWk0qxarJ0jE46TWeKVZd7qnCFaT81ajvTrGObSsMpDjITS0lmehOF+U0vyJqCz8qqlRkIASe1l7V4nzBxM+bzU6eECQ0on2Qlfaxj6bVK/8IkQ+s2oEU5QsLi0ANSkoVaqxshA64wr18nVdljYV4dGRi4et0t0A6N3Kj+r5vKuvecdCmzS5iVz1nRJFE8Rx8F+cr0qGE7McFxrFRqEyKmQMdCtCwO1go5y2LozKDEQGbZqEzVRmmG8dNj+hjobWdssLNjyxtsiON4SeYFuVKZSe5zvG4wQogd1LW8Uct2CVMQHJ6fGR1zP1vRBUFn4268zBvN4y8+NSUwcYmLyTIN3yOcyKiiLMuiPEYKQ3rnfRmbFThW4KdYQaxUpiWWlUDzcg0j5jc+k7VoypyGixdKD+KJkiARJsTRmI/y+08JE1qmyX0j6KMFKli7iDC9LsohNwxGJm8MhY+akOGOMMNDl7zUFoo910fCI25niVujDQSuk4FCDx4c3yzmKrM7leU4S1GzRoz+n5VOmXaUhUYiz8rmBmljyoL7TLKyh1CejTmSnxf8gqFUNd2B32nTMiT18D7/0Y7lDQirosjelPgKbWcq1ZhI81KM5Xm1AgE5aau9whTtzUZbgJbAJg3FXYcc77xPrTECzdssw1Mpo5GUmkwLtoTh2FRDMeSY035fDoK4yMvs4ARj043qTTZpm2JT1yvYxvzGU01O2RYpO5o+9kTxhwgz7kAqG4Q896Qw9ZgvrisGR1qhFxPmAhlBcB3qOpCwwtieBdLAbDc0iTBvuBEzcH1ggJSCwjeuht3ekrCnTLcsS3LZE/eBHQuzOUjFTMPI0HzX90xKkDhGFuIVGD5gsrJuxlh7+c6E2pSSvGhYsihJrTxsI8v4/SxD+6H1qdaScqWTyco2hEvWETlIfa1MkxEZKSaIt9lkTd0fZdhOEfeOGQJhCsZMNpt3S0FrUES1MvBrdWeCYfT2+9QKhEDHgDoOO9jMNcwU06iR1q4FeezOFMu0Q6LajDUlPss4ccYWObNo59iqxBhTyhoK8xtfk2V8fv9MdtqMnWpGZlucT0hOyL6g6DvdxjT9QXtmppE1/YytXECYC6DHkXlIZd0xPldv3ABBjkBpJzxJpBi4cSPcUxwaaGe1pFw7cGP+czeVdW/QdO81ad8HpnV1l+gSzYsCFHF2No9kYNqOm8rChZ+1oXADbUq3E+O2ZjhQc7nd4liLtACrKdGRmJmYKJk52Pvjbxy1CYIUciBMRxIsNckxkjMIzdSmAJ0nRobi23UzVXcgYrrdJTaINdNqsjFY0mlkye9WKLb9PsViRVq2XGFCd4k2zbQMGDgAi5HPatBHdTi1YYm8MNEaZewxzsxUnBjn8Js8tjG/8WRbFNRdHdu56fOf7LuDgq0fEP38Hb9/9ES7RjFEHyxn24xvtKn03V0C92/BALyHC1DruU7G4oXnb1wdGIAuk4EbN4ZgMIE3wGCIFHyG3CFAgTB59cn8wt/DlyILbjcmEeaTzh3UrjK15vEAA9UYE1hOzjKs4g3/yesC9M/TUG5lea02zcahz3CQdWBQHChR4kTLItHQhIagzkE7j3VATFnICST+uM8k04L89K+QzbZW9BmHiUH9luOhBCTA95UCAxq8YwcHBUYX8DRNKruSrkJpOGbdtaA5SeJxTr8ltd+nS36O51sklU02i7AZDOTFJJXlyfY2M9JRaM1a8F2gSzJj5Q3IUkh5FkpLNUxlv/ltTGhA+qGzzOfXTg0lUA9BeFajpWstu3pWrKUg6/N5tZa+Rv5AlHsYuBR5DEN+iDBJARZGrg9AVRaG4l2NjLRH/sCLEEG93z6YnyM125GRq+Qldxg7EebiBx4fnxamlq9ZhqU3UtyYN7JOrUEvoNsFKcla9VbSzGQPZdaaURStWBN4fZCWTFOmZd2Afg6Znfi7wcZAGDB0r/sLDFLemsze2shnDTmkVyQPGQboQZba1pHaGIQajvdRYtyM00LSzK7AWCOWIQmHumkcvS8pxR0TylAxxhXmFDshuovJXqLb+Y4kQ/Ksz5Nscl/Nl2pjovseOYMDDL7xVVmD4w+hYeXnjerpk6pmAZWM686epWmRaHrUUC4wJG9xLhx5OE+y1QFyq9dVGCo7Qp7ACKCrA+7g2XnSZzI55DYpw5M3blyfjByltWF3fMGDBx/Vo34PHzX9oHhSmDD2N6/k1I39485Fy4Rmpwk/IF1tkhZaqb2z1VpuPwv9gjl9KrO8NtNU9GwzV624V34u2zsAESJqluirktE2SqaLZRS9QfPHn2QYlvtRVlPLpXRdgSGueUuZ8sZBKJ3U2NQzCvTkWO2jrjQtdwsNred93ueqenbf6/10V20YWPz5NlR/tKqlVw3z4mPYFcOsHVoN5QJjZR8uLBxU5+ceQ0R081K41Wv+KkloQaTz7hggL4zemHwyQp6593qBUmE8XgS6VxbcXswHi08SwTbRv5yOmG26xheq+a57sbz97JRP1tTKjlubgasdbkBRoT6kai+bia/iLlxxOyUJ+ZMH7fiTyK9q7YOaq5xMOLz7XyodRVeOFjz9ocudz9VKL30TCvObGDXJhZh7jVOaVyvn3JPiO32fNJkoZG5h8vqDzvQEV8njOZDo45GR+cm560PubdPeM/IAXvj84cONGyOT7Tz24WLdtNoR68FLhanhjdII0v+N0u78Bd5sW+0JDBbaMxlMklfn5j3JTk568xzA7x54An3g6ZJ0Xi7eue2RcWcaWdFwBgMUJvJVzvlDOlBcmS68ajauo0m5yC1f7kSziy/rx0RhIsjrCNPTFEjseBLZs6avPJvFRVClO0f0aWGufcvnYc9voTCR156+smv+Sm9UXXs6Z697snvG5wcnJ4D2hAh3cXZ5KHQNydO/5fOwNwwUJvJlZmJfOZ6J/XGvRcLxA1eER88fd6Ljw47L0AnPhM0/4kTsly/fxqnYkdf1Lum18npMZNbrIdQl1fbz3uhY7VnF0b3SO5k/f+u5u4NXHPIlTIU6rnuVXo8hz/2r24ev/fRYlWSyn95ljmYXqda+9WziBYd8KePaHqfLyvn0SrB3GTzICPIPtHo/IbHup2dqEFWJIG9AmAiCvDFhFhEE+ZfD9xxBkH85fL9BEORfDt/bCIL8y+F7jCDIvxxYlUUQ7C5BEASFiSAoTARBUJgIgsJEEASFiSAoTARBUJgIgqAwEQSFiSAIChNBUJgIgqAwEQSFiSAIChNBEBQmgqAwEQRBYSIIChNBEBQmgqAwEQRBYSII8pUI89iUj7iV53KnPcvV9r+XQn5ZUrufwc9cPpeDf2iBjiD9CbNHK4riPa3cylYyasWw9FPKbaqa2nyFN6vazGfytVommyfrU5tV8pphGZYF/3RUJoL0IcySVjvWimrEWGeG6MkYFSxbz8hibOOELmfiO/lacvqllpilzaRh66mU3QIRqsZ+8lZVUxsxURZF+BdvoDIR5Fxh5mvV0cZmWyzqsh5iR40skZ9AMezgBMVTO71KMkYZW3GYQTPffuHeJgmJW41q+31Zh2bYWzFKYCUjuy+0mJih5nSRoXiOpxhZV/BsIMg5wsw1Z1ia1WquyrKawUoZJmnc0SrTQgzCW5J16F5dbtyRmZlkhpEya158LOgfzHxR2J8bndkvuuLWBYFlBGGCFkb3s5/TmQlWz1UUB1ZlOEzOwoCJIOcJU9UnaO4Wy0xDu1FTLJOLO7bFjTrqWlPYd8TkBDPBVnuaoKZIUwzDULRguKFvqX6NDm6XrzEMnagXYI2HcWGKY2heFtjWfzsQNQ02ZmXVhsyaU00miabwCHKeMNXaIAisqXN0sqrmDIHlWYDn2ExToCmW4iWeTRo9MS5vpBhn02GTVtZdw8Ewywa3q1cSdiC4vUheKTo0Kwg8z9KGkWSnjUITlKm2oPGqtpiUicpEkHOEWVEZoaXMaFaIaWjq/mCskBSYibFpqVSLxcfiY7EYqzA9SlL37RTrNECYzr4r2Oq/l8PB7dx2rQ7CfEBeuWsyDM9xoHErzmq3WV3dZ+My3Q60dLyJySyCvFKY1WlmKsVxXCbJuHmtlZR4RpZ0Q9N0UkTVkoxN9+pyTOApURApTkh69dUNE4S5eHd3GFJZ9wXFYngB4GWDnzZF3ilVKny2IrN6ap9JKihLBDlfmCmJGaNjcSJMLVONcSzNCxt3tMYEJQi0MMW0eoXZSHIkTQXlcUehrxUO7i7ujtOJlvc8YzN+kYJWJm3qmk6bQlLPGQVjkLXvWMxYE88FgpwvzFsS67AxL2IaLdsZ4x3HammNMSarCkKWYmL7PTGu4kwIjukIccdLcdfmxgJ0YvYaxY8mZldcXYo8zdI0zTBGpiUMOjNcVs/mdSZVyZrMWAPPBYKcJ8wZJimyBiPL0JJUmxIkoCxN0lBlPwXdmJSQos0VrbcqG2PvKNmsysqW4paPxlmWCY4OM/AzXYWybDXDyozOhFidMXYYGtJejpouWjJr5BQUJoL0012yIbIMzYEGxZ2Sqktu29AV5s60bNupeEZu5nq7VwbZDRgppFah1OqVa5/BSDurut2yWuZj8nx/NNakTTme5GlrGtJegRcZ3pFYfU1DYSJIX8JcrkyMjsGfiYqXygIW+bFW2tAzmWqzYpyo1dRS065U1f3MRM19pZQFtEX4obTrQ0YmpekNIz6xUbHI2uzKzf2JLBn4V0kpa3guEOT8IXmNJvmz7z7OKUeQJ6AxVctpJ3s+q95QPHWz9pL6qprTalpeVfR9MiQeyGo76r57r4pWQ10iSD/CLKoq/C19tZ/mjc1TX/ILBEHwRmkEQWEiCILCRBAUJoIgKEwEQWEiCILCRBAEhYkgKEwEQVCYCILCRBAEhYkgKEwEQVCYCIKcIcziwrlormvXhSm1byf7Kii+5jZ0oXn3oL2pvXjNjyt+iYNdes2j8rrnQ329zfxyl8TF1lD62gqzWG6dg7NL3rf5/MK4RmDPvyJecxu+/Bq2yHK1iy9H5oJYe3ObSQ721mt83NrrnSMya0Xl+ett5s6XOo0XW8Pm11WYxRfXB84jsAzzFPz2xz/76YX42Q//k3gUvfOTn34VvEPmSvjdD3/2+mv4ZXFZ3fzDDy66Fz+e2CxqlV9f9NN+9uPbG2ol85OLbvBP3B39zx9eeDN/u6luTlz0HMFymYpW/OXFj+a7a8WN//rRhT/uh7/bVDd+8+PXP4vuVbXR7462r8GvozAXd4cuDYVfSeTS/Kb6/PsTt9+7ELd/86Pn6lru8vvvfQW8f/luRX3+k1/fft0V3Hr/cgbW8LN3L7iG93/73RqkbZdvXfDj7vxw4rm68/vv3L510R3NranPf/Sbix7sie8/z9e++9v3L7qZ3/3dzlrm8vu3Lno8LxdLz3/z0zsXXO72r3/yPL81+Ls/v/aFQK6q/M53+txR9xr82gpzYPvG5KuYH5gDYf74zvPNC/H89k+JML9/wcXO5K8HPyDC/MV/HbzuGioHPyLC/OWtC66h9vEPiTC/f+GPm3CF+W8Haxc8at8nwvzp7Yse7Ds/BmH+8OPaRTfz10SYPzqoXHD/at8nwpy46HIH//ULEOYP8rXXvhLIVZXf+YFS6/8a/PoKc2Hk6qu44Qnz/ZPpujudbL7naTeb77nC/O6pLD+vkr+9i5AXFK/uoWjFU86Zpa3vucL845Z2esYv739FO1orWfGpNn9x53uuMH+/07t41kM5tTttKh/8gAjzu6cOJLzVe3deJdtwwrq++PzXrjB/eeK6cDfX21H4vNM7qm1+1xXmeyePWvHosCha9452FnufCPMHH1TOOEcdcqcWKz5/hwjzezvFs49q19npZe27rjCfF884LJ3PhsOa7V1y649EmHAuzziLee9DYS9hweLRp57YEveqypNz2dfV7l6DX19hftgR5uTV620xjlwdGXmlMNWMoWQztf2Mdwa0ilHqT5hZvZnRXbuTklFRPFGozaaqGq5lNUyUuXFyrsyXC1Nt6soyOZ1VPZPVwVWeCDyb0XPZbF/C3GzP02lpmqm6m9GnMLMNPeO+O6/vVHVF0XuXfIkw1Zp+J1c01Ax8Fnze6R19mTAVzch6U4iayvIZm/kyYRpqVoEvH/gSySp3mpVMVulHmLCZqka+r4oaHEj1jM97mTA7b1WyRffI9k6h+BJhks9T9Sbxc1RUM2e2rEp7Ve6WfOuFef1q+M/uw7mrEe36/PzkK4Sp1mzZsOyxUTuvWeTCzspVL+IV1VcKU20NJu1YkkwWvSHPGC2YJRrOQTzebMjTNeJgLTem5SNjk2Lx1cIs6slBKwcnqTYVc+z4hGM1QOCWLetEal7Hw6uEWb0peHNbi4WqqKvNZMeC7GgvXiJMpZUctOPxRl7V5dSUbBqD8Waxa/q/lwizloo5+o7ctGu5mtio3JJrud7NfIkw80ZWsu6Qd6uioTTjbR+n49kGXyZMqdEyGq2WrtRaphOftq32YVFfKcz9sVhzE85MaycHUww34PP09mYWzhGmnox7SoJlyaHlvUmHi68W5s5ErLE/GIc5/VVzRzREXpjeUJuDyaZagy1Re3b0TGGW3H6f4lEnVc+7v/bCHLk6GRgIz8PjyfClSwNDUI29cZYwSyXoHIKZ2BmKZTma4v66yTIMZ0zRBjkcy8+bjZUzhal6V8MXUkiQOdHZVFdsel9kYCUbWYcTLJ2O14ol/TZtJ2k94y613mxWzxamJ/9qRU2x8Z1MrdhMUmAtRrFMrKkL4OnAMKxKzl2p3KwWzhRmEdagGjIlgwGEIFA3DYFv2DzvzLixfPmgvRcnhenthdoUwcSMF5yqoieZJPF8mSaxobjVbJwtTHc5VY9RLO+ADWGyuS/wzijjtCekf9HwNvOkMN2DDb5pksTGRHi32uSFJhyt9mYW9qtnChM+reR+ezIxmo8xjNhKwhGhaJZhyUkqrjcqZwqzvXcW+NgMMmQzLYFhZIfnrYz762e1lTOF2T63WsYSuFaeJNAsMyiKcGRTcLxLS43qmcJsL5ZriaztcGCiYegiI7cogUrqdxxeMO/AzP1Ohqyhs6O9wix6a/ibbujFwgvDcH3mij3v/toLc34SZDkQrt24eiM8NBIODwxdmjxLmNWdHTjYG9NJMDcB04OpvJJh2Vlw/RIkM7f89D+So7OPzxJmrbIPlflanHjg8txYsjkVo8dYRhQotRkTUq5nZsycEGmDAS8iFvxwl+eSyZvVs4RZ3anugKxiIEAwLaKp/A6XAvexFBO/WTCZWJWJq/QtsuTf/9Rew0lhbu5Ua0SYfAG+XxiHuVV1plrg2SLCxa+V1p++296Lk8KsbcJeqLWkJLBxgZ2IG4PgK0GuYXq6Cn3Cc8nUX1fOEOZKbWMfVqZwYJ7GcgLbVAxrEKQWj5FEfHnnV4mZ6lnCrFbJwa7cESVGStKjMfBymrLJlwJxJS2t1ydurp0lzGq1ViW6TDIsz4xKdKqqiEleyEqyDK+XXjwanVk7S5i1DfeLogYmbSLbTKVmbEbiebDOoAVT0ZYac6mls4RZqVVrrp8NuByD04bRVA2BaWocPzFBvq3Knc08IUw4B6T5sjMqpMZGwX9KMC2WvZOE0wE25UkwTgajR2anAF+vxzvaK0xvR1fmviMnyk//PSan9x/C5z3qfvfXXZg3wgOR7cmtwEDk+lw4PBIIB4bOjJjVsXgyuU+SFZrjwaDPzlQroRR8iYd40cotPboiCnK5eFqYldhYbLqSg69EPwMu037JijOUCK62tKDtUAKXcpjplmJILMXxo8kUA1ZFG+OiIKQfnxZmdWIwGd/P64OiY9l2yxJAc3Zs2mjKZjUL2yWChSBFrvStcaG9hhPCrKYGk4P7qiHxEgtfKQ4zpQsxmW82eA4SKO3JW4IQLX92Wphb8dHYVFUxRBb2IsT5BSsuyvCVIAwKU1Vt/T4kb4naaWFW7sYmZJCgYguMwLGMrejSNPkuYjkSUWpvwxpmH54WJjnY8f1cM875KfA8pJhmVRiUQsYKx0E2u7xwJSSsPjwtzJ1kMp6saYohUDTDgpuTNWNCZgCC5lINtbT1qwgnHxRPCbOyFpuI3alolSmJlweJqVTKZmNCfIIZnSKJeuXtEJ9+clqY1Wk4t2Svs5YgODHGETUjxlmwcywlG7n1+bdCUW8ze4VZSyYHR2tatgVXUixExRxjpsUxkjQNcXJf5Wl6UKAZamw/tzx/vKM9wtxx13DvMELBZbQXgG+FRP3e+hx8nrt73whhXg8HvNEEQ3PhAUhlLwUGhs4QploTScqhqpWWK0zRyegy5GdwCZCToC29MK9Fyw9PCzMTirFTcDjXwEdM4+JsK9NwGINjiDC1JC1XGJoRjRmHZ5K6wCtEmNozY09wr4ReYao1iWzDPbVqcZCh0aJ9T21J7NTMFJ3JlhoyGHqGBNG91H6VNiOJeuGkMNXnYMcrGFlILTm4cFmGug3f8Uluw6oIow117dG/bd+HTy6cFKZaFGJcsgqprMBRKh9ndWXficGqqDGHpN73E63haPmUMNWN0VCMA68XxYKvMp6l9WxzkJ22pxinlgG9Pv5Vuh7x7H57hNne0bxiSgIVFyU+rus8E+ealiJM7Kvr88nhs4Sp7oiSIEFbL2ewkNcLFCWaM7Yk03w2CYkICPMXEfnwtDDXZuAczZDc0mbh3ZCKSg4rsA6TZGTIYZef/tu4kK6eEqa6ExMkHio3WUsUHGFCZOiGIbPPGUdweMnMr88lh71LoleYn20KMg9NyGJ1AvJ7W4AorVscLUtwTqsbOxYlsryc4iCVdddwhjDVTUEKyU0QZtABX9ZA1AE388X1uUTkGyTMq/OLI5GBGyPb16+OkGEFgYGrA6dS2RJUSyBzY+VadSJG8YJIs8lck2aS9JTMxFPVYrE83o4ZPcJUDwZ5hqP5sYohjMK1BhdnrZKSqRDETloG3z9GTsHlHYcXab88KlRiRJjr85FQdPZUKrtx29uGqlq1tem8xLas3E4M4gF8vdKyLdAs66aXkHxpW832tdQjzEqGrIGRlw2ZuRmHJHGMvqWDSugZWBmpq6w9O4Rr6emJiAluve5eJKsGxC3ilc3e2ZyRBgenGHFQUpcht9zfiyRqpRPCVHck2F5GmNmAkMLAYnRTyZtjkIJDGs6bUP/ZOhz3AnuPMKvT7R3VY8KYIEgsJ+t6krVpReTsHVjxsnmGMNVqyl0stp9psRBoaU1mp7XNJB9i2RCf+Zw0vOtnCFM9iHGwd8LEjqbAgaQEB2TlQMIOzUyKIqlscXc8dIYwNZGF1oBUUqu3BBJoZUGuQCpi0Rad4SRTLa2ZZwhT3ZkQGPheHmyo+3FanGApSZpSW6wQm6aytGzsiH5a4kSWa0F9fe14R4+F2dnRv4MwV/eYaCD4FhM9LJaWzW+SMK+PBAIQJgPhGyMfQty8FA48PKONWclOcCIvTUN9kWJAAlBv0fUY57AhL5WFqLHdlkJPxNyYiXESl7xdakKuKlqcwNRqSZayOT/P0VqN5wSZgqNsNSWZseFiElgiq7UXcAXVPzkhzOVMihdD4n+D3TwXglDN8yEoVgqCbBQZQ2lxkuMwqpMhwiy8uC8kGqfbmNn/DMEapqGNyTl8XLpjM1NGHNzsWXaG1Oy1wuE12An1ZCq7MROHvRi8remkZKTDJXunloKrkqI5llXgWll/FImWH59OZafh0/hUdjnrgDB5joHwulkTHXApVEgfiLeZhZPCrHg7Og1fCALFTSRZTjL0GAupCqvqpJxbPDgrYlYyY7CV0kwFUllapCFPF8yMJSfhi0uOTZAi59KjsyJmZVom5why2YzDxZJwXCnZYW6K4GDMTtk50lg8U5j5KVLXnsoTa0YO2qMcx1eNOJWkYf9Y0YK2cGM4un0qYlZmkvBx8nRF0aHZHYdUSWxN2/DTYCbYqdqMJIgiO8O4wiwdHK2hO2JWMqPuGj71hCkHaDa6u+geluj2Nydi3oAwORAJD02OzA8MlQfClwbCN86KmFDa4+SdZhzCHs3yogBNPajBQPTgRfjyL96ePUOY6kEcvo2Z0GhtP0ZL1NRtRjaVFYeVeEYxwLLairFQfpPZ1h3rFmPJIiO5qexHM3NehtcbMWfagQS+McUYw0uiqCkO1G0Em/k80wrB1pCiEKyhtDUekj/LfHEqYt4RyRqkCmRcmwLLpBTmlpFkLCrppEhoKDwd5tMfz2pnREwa9iJZqyYpiY5vwWWnVG3LESQw3yYBcy8Snc0saacipuxFzEoFKhxEyAx0y7CQcmsS8zm5XsdDiafuZp4ZMSEBYeDwOjyna1ANN6kJJ0k2U1vUhoX0/5wRMWEruVgDqsCsQNsSx5hQBoJoSNbmptZzkej6qYjZIBGTgYipGHEOzExjkjzd4ijuNmT6NFRjtGIBhFk8JcwiKa2z0HRQDFtwuOmk7KgKJ6ZIV9TYLdiRzz4bFpb+54yI6W0mdHDdYsYclpsSWnFKsFsSk7GVvAO1WV6cYokwP4MdXf2fkxFzp72jbsSMBP8CqWz9HrmmS5HokvqNiZiRcCR8aQiUeXV+AJqY4YHOYIPuNmYOfKL5UQW6/CBGQcQEUehxboKXII+Equz6/YgguobSvRFzbQ0ipjCjaNVRiBkZXuSSO5UkzUpgBU9pTYbLxPxQCmllqxO0sQ/XHQ8X3sYVQUhsnK7KKnBR88lcQd1pGRNQzYfOOWi88dDYo/chWRSnbtGxqRhnKMXaMPSlySSN6o2YigZriCsKqeuyRMbU7WbKDwEDvila2dLSfARiQGKzeCJifqElYblpsBOEhpQww4s8XFbZmRhctjNw+SxCRIHvB2J0f6KN2YDVSQoEnYk4I9+mBidmLEFOkU4dCj5Pq3qbWTzZxswp7o6qEMtYNkWS51oz6Y9xsswxdrYEVRVS26qebGPmpmGxCeJAegeyGh4OcryRSSZnGOFWcgy27W+/Ij23S8WTbcyqzEtCBobu6KRzlxmLyVM2I1aayQwtkRT48RVyVNwhA93CVGrw9RzLqeoGfK5CxZqs2MylWkkh1JI48nV1393Mysk2JnR1yTwYpSomx6Ri0C5i2JbODN4RyXFdybSg72pa51iyo3OdNfS0MXNTZEdzWmOYoYPpvVC0liV9QXANCtGZ6jelKktqP+Rf5MaN8MgiqHRu5MwBBvKErG2CMCFt4TmO5Wtq1Wjo+7otk77l5eeNdqdVb/GnNhFLDh4s56C70BZlyUmKui6xYktomGJOg1Efo5IzJhlKdVpsZpoi545y2Woc1M7qx9yQx2SFZJrqHY6dqMAVDz2EshVjhBoZC7RjiDASx+3ofqbvN87qLtmBNWSrsBeSvWNYuiXebqREKwN1REmHULR8cNherrf4U52SR2ONCqnKQjFFtCdEkvny7Gi7w3+92WjUTneXQH9QPDYBKXXekuOWIc7oFbXR1ExdNzMiSUrLR5t5oipbgYOtkoPNZJKSqOqC0hiTWjdhM2V3M583273GPcL8XIG9q5BvtLw4yCWlFgfVukbVkpLm/r67mQfNZu1Ud0lxPxmLxw9IkikYxgREQXbUElO6UrXEWzp5xxZ83BltzAN5FAaHQOCTZSfGTjcaAlR2m6DLTEsadK+Jo83sEWYlA5u56Y3xge9Va4WVG4Y0lmRu2SLXUAx5sAkpxskd7RZmJdve0bJh6NXCdrtTuPfdX/tUdu7DhYX5DxcWIX+dvD4yeWPyJWNlG5WaGwRs725Nq+R2FKu5rDcqrTP64mR3SW2DLJc3WxlDNzL7UNg1bFMxVcVwx5vWjMwOUSMMPFsDS+tc+/bkM0f+FPcrtS+8c9Bq7Xj3+uq6otuW6tpxqkZF9cbSkMEgZw4wgDWQS2Jfz6qKkldggSpoDFyvjc5yZw0wgL5Ydy8Mdy+yVZMMDW3ZRwPPSke3Hp9oY6o7O9VNN7rozRzZOnczlVxe8cbZdTbzZD+m93Hqvq3VDAN0vQzHSanYLVvv3cwT/ZjeOSJD8pqtfWh3G2Qzc8b+0UV6vJk9/ZjV2qa7XMXM5XaIBXhNMciu5Q23vd0eYHNKmEVYrOKdg6xuQzev5Y5SsBT4Bmuq3Zt5oh9zv72ZqpqHdxdbMDDP2Nm3K1mjBSfRvZ5aJ3e0tx+zvaPFHBkHnC+c2L1vyJC8EY/zBrG3h2t0Df8+e4z0S0b+gK+0ouaW3WHLGUVTjgZaqzAGtDNKO5d99VjZo5EmUMY5Giat5pfVjPKSAfWnhXm0F8rxAgpZ24nBpC8Z+UM2MAfLeotns2eMDu8dYAC3/JeOR+v3Dk5/1VjZo83MwP55hwo+sgibmXvlWNnO8YGBsrBA+93nD2I/Wk5pn1/48vBOWvGVY2WPFnPPwdHh9+zIXzmI/fg0uu+GIb3weWqmRC6S9iD27KsHsXet4Rs9iP1Cd5f0M4D4rLtLXoOX313SLy8ZxH4uL7275JyPe8ndJecftZfcXXLeYi8ZK3vuZp59d8m5vPTuklfzsrtLLnZVfWsGsc+NvJLrnjDfW7vY3Cxrtzxhrn0FM/7k1z1h/mH9ddeQ2/CE+buNC06Jc9sT5kU/bqstzK3cBY+aJ8xbFz3Y77nCvK1ddDM9YW7kLjpTkCvM31x079b/4ArzA+21rwRyVYEw+9xR9xr82gozsDv34SuYr3nCzBxcbG6Wg4x3o/TBVzDhT619o/T7r72yHd27Ufq/9AvuRd4V5vcv/HHejdLvGhech+fAu1H64gfbFWb+4KKb6d0orV90Gp4D90bp3150uYP3iTDj2utfE+SqAmGqB/1fg1/fqUUC58z5c2kRrpUffuedX1yId75DDsri5f/7i6+Ady5Dg+75Lwbfed0V/Pydy9llEOZF1/DL75GpRSqXf3bBj3v38m9BmLcuv3vBBf/v5UXY0Z9e/GD/kEwt8r1fXngz/7CjZS+/8/MLHs6fXYY0eOLyuxdc7p1BEObO4A9++foXwneIML/z/V9e4Br8es6St7YwdC7QI7aW+eOFuUuG+L//x6+E98mm3r31ZdeQvehSt/6YIXtx+8Ifd4sUQtX3XnNHL757sJlwji58gN5TX+sc/eE2qexc/HTcgmti+YMvdSWQNfS/o3fXtK/rvLJru+ex7VZBdrYuyI7bQN/Y+krwZjf4EivY8QY6bO283l7svNbHwd1lr7ejr3ewX2Oxzdfbyh2ymcsXPphbW5UveRrbO3qxs/c1nYl98Vw0BEHQIgFBUJgIgqAwEQRBYSIIChNBEBQmgqAwEQRBYSLIt12YRQRB3ih9Dcl7jiDIG2XtfGFW7r7zLoIgb5B3Tt8qfkqYy7mJ3yII8gaZyC2fn8ouP68hCPIGeb7cT/GnhCDIGwW7SxAE+zERBEFhIggKE0GQr48wF5UOMEF9qXDG5OIIgrxhYRa3Ld0wTPB0Mawn2vI+mFkWn1lP8DgjyJsU5omZuRQr7PP7KZ/P5/f5o/X8b9L17O6wP3p4/mSerqsFxlYE6VOYpVc8X9ve3V4rljqDcO+2Av7VYV/U3jbCvvSDw4A//dgM+KLEBfrV5PV9Ra2YShFPCYL0IcytZoM0E5V2Y3H5oO2ISJ5vzg1Fhj7aLpfLa8fCdAZ8foqKDvtX51fHfUH7mo+iVh/12HUtt0cGlnLKkQuVKcWt5rRgVSp4ThDkXGEWf5dMrS2WLfOxli8bK0tPfzN6c+nodwfhQCQcvn7j+o0P1zrCHPL7owO+BAiz6djzaXsApEo5RlfMXF6c8ZZft1qNe95rLRbswycomuaNHJ4VBIV5TrycY4Pi0rNfiVL68fav5Jm/7UUYfvVpO5Ethkd2F8MBILywfiRMOhph/FEHhDnOBIOrkNvW93z+RFcBqHZFXif252VwUE8cusqscbIEfuKOJGzgOUGQ84RZvs+lzcJ9NhoSVodYJlGfbQ0fC3MxPLRd3F78UJsMXN0utoWZ2A34/LueMP0+1s8GV61xn2/1STvQltbvS2mSDi/VQ2yITteJbfS0HGNomuE4Kou5LIL0IczEo+0I74wzCfEym6jfOzghTFKW3VwIHwsz4vMFGV8UIuUTJ+yn05DKQvnnp+nHnYA5Lpcfkoz20cTuHh01Seqac1hGEgAqg8JEkH6EWX8UiQ6zTLR1nQjz8KQwi8XFtfljYfr8wbA/GPD7SfEn7F+FBmbYR01YDzotzEdvJepuzWep+mKchlXCw6zFMyGegKcEQfoVZlBIhKLG+Glhjuwub22tlz/qiphO/TASdFPZ+d2w/z4NPZoJu5Y/WmPp2bjkBkxoZD7bY4Iv3I7QuzZPCxzPoTARpF9hboPQ9thE6z6bNrNdwvxiLTykzQHzN7ramE4EhhgkjoRJUwP+3e2hYLpe8BYqVq8kGgWvKLvHBh3d7RdVa4JfoBlKxFQWQfoUZnmc5UPRL94K0Xyi2tXGLB4MhdtEPlo+SmUpimZ8Pqj7EGFCGQj6Spwh6kiYpfJ9Me1pr/Ao4If1kvCpWhLHsjRNc7SyjCcFQfqpyuZe3Jfk8qMrkiwlNqxjYYLK5qATE7ixvllsd5f4gsEgE+SCtG/10fawP22SQXo+X1T3hhIUqlfkrVLbu/oK1HvkJRBmJcumGJsXWYeewf4SBDlfmEx0dGmxbBoPCzA23Tx89G4k2BGmVtwqe7QnR1BaAYiPjmPbzjV6O1+orzxaehqX5VgifTRB3xeZzlCDNcO0Wrrb3lQmWmzqzq2qQFfxnCDIecJcX4jw4tLDYg5Kp/lcLlfYi4SiS09PTQ59fHeJnskSMgUDFFeAP5/C7SaGXu8sUlnpPMzDzWHtMXk1RdcqlcqOjqcEQc4fkrdmWMZK1/OCYXkx7iXk7x2luUcPNJVw/pa4b1HzeEoQpI9B7Dml516sUi57D48aguDUIgiCwkQQBIWJIAgKE0FQmAiCoDAR5JstzI0KgiBvkI1+hKne/gBBkDfIbbUPR+nM936AIMgb5HuZChrXIsjX07i2iCDIGwWrsgiC3SUIgqAwEQSFiSDI10uYXXdsZsn067lM53nXQwRB3qQwC616tj3pQc4E99q8aRc78x84aGKLIP9wYZ6q9IKz3pNI1JwhVu/LuW1p9cnT3beC5RqZY2vtb/VhmGC2H6c9tf0PQVCYrwFMkNerzE9NG2Z8Tjgty6p/DP6YVD2xd8lv/id49y1/nNob8KX/e/bjc1e7UcsoWiOXzeIJQlCY2tlz/vRGrnzX87X1yeuTz8HuffFInf+z9xa46fn8Ii+KiRWYZdZzfidOJvqwz+d6wPso696pWbh6qExP2aY2ZrZaOC07gsLUzpwlzzgEd/fNCkwcu1ktkckoDx92jGuHAuHA0C5Q9l75eHcYZmJ3gTmebbB7D/vTVHTcHzUzJjgM2TDt7J4/aM52fcJyY6Vtz1dd8TSqGkkKvDJpVuDRMAFBYZ7B+nyIFZY+rf55pvZp7c8zW5/uRdjjeWXBu2RxBFxrw+BhQlgs37/kpyA8UrQfnIQmqWg9Eg0HnXAwbT8xwm64hL9BvUuYm3Ox9BNin/Di0dRsrR0wQxzDyqJAS3dQmAgK86yZ2Fn5/Vmw+2KihxGWjZY//kuk1+2rPDc0NDIUuOG2NdfmkqOyLP9/YMYXLc/cS7UggPK8cMkX5dPmMJXeG/Cv3mdW612+7zvXXLdMMAFjGPDkg1cUU5CTDEvLg0zMUvAUISjMs02FXgwHV8fZ9FtgEZ14sn3SH3OzXN4utW34CtuODQYJAX/asVvGx9v3/RTjprUUlahztPeICoIxdZdbpus3VHxxLWoHgq6LrWJBKsvznECLKEwEhfkyYUI+uhdhEsTyvcftyxOm1jGuLc3uEQchv8+t9viCq1CEjY4HHQdalna9DiUhwe+PilCZfXQkzGJ5XFpf8cwV6tvh4DZxy1SbcTrEcRxPSwYKE0FhvkSYexGeFUJRMKTllx4evMpR+umfksnk6BVf9D8SyWT6Pk35o/VL/u0Byro5W/dRbWH6Vx8stddfAHtpr2Gpfbg9DKksaW2q+iAtEt934eYmdmYiKMyXCBMcotN7oUQrwq7WcycdpYnX1/ZiW5jas8PDxu44FGSfHzaM4eA1PynNJgKUnSnUSRrr/esIswhumbOP3Yfq9jgdtVx7aXV/yk/cMnlMZREU5iuMa4fZxDC7Ctns729qXcIsbkM5NjIEf8PhyaOBBotl574vSjpEFl84IEz9TwmHCFN7LKfdpNa571piuizVr8S8BaH4Qwf/PDq74kZMjqNBmCwlmShMBIX5EmHeqw2zHMRMLsRGG8+7jGvXFofaTNaKRzHweoj1hKl9PAvCrB9c4/xEmJr55Capyv65bHTswrbAXrrqZqvFFxGGYYKk50RtyhwY2rJMUsCIiaAwX9JdkgAv6BeG8WQJbC6Nxj2zS5jaWnnbM67dPHplsTwCRu9pt0Pks2fXfNF6fZjyBS0Qai4/C8Lcflo8Hvfz1z+NltsqLb6wTNMgQ9wVXTQEYVmOjVESChNBYZ7B1hwbFJYeLhIvPmIzC8a1jLD6cuNaL5VNHLraK326F0s/VnftwfTjts/7jxLrpe71/63ReQqf0Xb8yxv7qZSuG7flGRxfgKAwz6SU6bmFsvTBeQPLi5lyvR0TSwUSAj+e1Y/u9Sq8OCz1rv3MqmtOrdVUVakYqEsEhfkSTtyl1cdNW8WO2kp571awgtZxl+5vs4olDW/8QlCYCIKgMBEEQWEiCAoTQRAUJoKgMBEE+WcJEy1eEORfz1QIbfgQ5F/Phg+NaxHkX9G4Fq3eEeRfz+odZluuIAjyBtnAqiyCYHcJgiAoTARBYSIIgsJEEBTmlyB3r9IoZVXXDxOMSZ7e23xY0NZrK3ikEeSfJ8x7Zn1momA3/9/MEmhxbf5Z/f+V66WFmQIeaQT5pwlTPZRWI76E8BMftfuhtrg9TK2C01cLTBHqs+ct6plIl/CUIEgfwsyfNK7NdT0vbW5tdg/AvdsK+2l/wB+GmWVfNJ4WTJhH1keBI+azboMvmKTr9Mc09EZFNWrNfTwnCHKuMJe3TX2FTC1ZINNXFrRPDbP+8NjccmFuoUwcpRfbOp26RgwwEwP+RPq7iaX5FCh0gAr4E2OpJ126XG/blRSz2fZ8epmWIE5lM0wmOVHFk4Ig5whzbfGyJC+RyZifFAzLqhceXZEShaM5mssj4XBg5NhROme8RWy+iN+X6/Y1RFy/XHz+1YfHupxLLXnLt2zdjb/qzg5LUUKMoWjByOFZQVCY2jkzsTO8vLR/jefT9bdCfOLF3ltssDPh82Y4MjlEDKXDQ2tueAW7EvCNpt7yR/fATkgf8O86DnHMHKai6U7ILFSvyFuQAKvl62ww6s4NXdHYZIzneWdQMLBOhCB9eJekrWfjrBzhVn8VG2bTn7eu9bp9vbgBpkIRz1G6VNgO+IMQHweCw2CO8PH/iXhemb7gktnRZal8X0qTfHXpUUiIgKEtKLNy+6ZIMwzLshROvo4gfZkKPdmORJ1hJmE499n0k+cn/DE/Km8fbK94Nnz3zLDfCfjtSISC2mxd261/kJnevub383bXdO41MHf3HL7gDYGoayKdczjGtcSkMihMBOnTuDYaYdnoHph9HeReZVxb2Av4wf7SH/wT5fevPtGKn1RWtsP+qGNLqSM7MG19TkrXvYc516uWtDKzFnjjAiERdYkg/Vq9M9GZUHQv/n2wlT5TmHNt49rNP0kD/j/5KGvAF9z+32tQ8yFFWjefXW3nsqUX4+2AqRWIV63u1noyNk8JDMvwTH4ZTwqC9CPM7Uhwd5xNmy07FG0cnHSU3t4uH6WyEA5thmL8q3bAF7XcIQWqNUC1MqVaJxB++vStRNUt8BSfgy6dujukoHoThEkztEBlMWQiSF9tzML9UBAy2QjHCqsPu9qYpRdQjnWJtB2ll7Zbe5cglWUgo008IX0iH+wO+LsbmMXyuLjkjpwtLT0K+FkmSgwyVUvkOYFhaJHGNiaC9FeVzZUfvTtafvofydGlaqGrKqttzg1FPK66A4CWHl0O+KjViN+fsCkflX40+ygAvSfdwiw8vZzY8sbdLS/+9jfxQbdLszLD6XRLkEIGdWcDTwqC9NWPubh00CguPW82HhZ6+jG1zXKbrU4MTFjjVHC3vmQMkVbl4u4QfdyD6RV/qscTZTZ0vdFeky5MNVRLYHHgD4L0OfJH88aWl0ql5e6RP12TQ7fHni+1nLryzLFhhN4nBw8012DafvLStZfUYytN1ayommK08JQgSL9jZY/pHSt7io9mlsCD2jWd9obPaouZpf62xLV5z2XxlCDIl727BEEQnFoEQVCYCIKgMBEEQWEiCAoTQZAvLcwSgiBvFDSuRZCvp3Htcm7itwiCvEEmcsvnO0rffeddBEHeIO/c7cNReu05giBvlLV+ij9FBEHeKNhdgiDYj4kgCAoTQVCYCIKgMBEEhfklUAtkxpDOECNSbqoAmjeTyKm3r+EZQJB/vDBV/clS9VPz7wfe1LHrzSeb1TuZGeU5mfjnmVkhc3F95r5za+dTbc2bFwhBkK9WmEfOmEe6bMTAUTod+w9wlF7QPtoFe4Sw6yoETiZZKxQ8eL98BdyGZj7J78J8eo09v78xk7mn9TEbkIoTmiAozG5IHlrydEHmtKt0Dx7a3N7eXls87iG92wrAROwBH/jV6rPVxd2wbzXs2663IqDG2b1L/rLtDMM87XZdbQX8q9aQLwEmfeY5mlONzYraMNRNzHsRFOYRpUxGK64bh2RqvHJDK31wPI9dcWsyEo7M74I6N71XVmbvE5vaBKiu8MHMB6uuMNM3W/CjfhDxr973PG390aez8BaYDZq8O2ger7K00Z5XNp/Nto0yswZ/K2vKgjWl4OlCUJheS3CODQpLf5u7nCg/LlT/fXR9L8IIRxM+F5+DRUI4PALMrZMXcrtv+dqO0uAkFHTdMcnDAUhln9qB6LgvmOB80bfkT9xfUf7od2Q3mHaZTd+seA64rVbVjaSKnqEpKilQFCMZeTxhCArTnYmdTejgXcKz0XJ5nAkWtN0uU6EimAptRgKBcCA8v+k5XjpDPl/wiusobd0De2kHHDPDvkR01xR81CVwmB73rzr2k2VnAJw0g7EnrWvdwlx+5DkOLW6/HeLTDVCmuj/GTgkCLzqCjCbwCAqz1+3LGWfS9RDHzz48ZcO3XV4rt/0xS/eg3EMRR+kocZT+ANqYfs+ID+wyB8BoKB12QyiVfrwH+qXf9lGt4S5hguOQXHb/v88KTHDpMTxsJCcEmqZZlmEsnA0aQWF2+2NGx0NMYjh4jTtDmIul4ub8kaM0tCMDlBkKUVDXqW/fD/iCAWo17J/9w+hsa5xO7w3OLOkf376ZIZKFXNcXBWGm60dztRcgYNbcNS/cdODtxN9WrbboEPG0ZZkWChNBYR4L81EkyMkhMZQe58pPX+EoXSKO0gwExOifKMq/ejgMwdGm/UG/j2ISu0OkURlkKCBatsAVLBqlo4HoNV/6ydJRwPyV1HYgWvtUjzDpqtfIZLgQD0hN7DJBUJi9xrV7YF/JsYyQPjxhXAuGX1vlxbZxbW2ch4qOz78LjtKr/zsUDfvH/Zd8QYH2JaAyG+QS5AfrC7aGaNoPXZmszxc4FuZS/Urs+ZHZ9DAVbbhCzLZohmdZjhOwjYmgMLuEWR5noxF+dS49HExrXRFT24TOkhuTkzcmrwauv3AV9cKhg2HXUTphzryAyk/EH6AcZxzy1cOWsycG/I7jUNG9UBS6SyBqyv4Bf0eY63MQMN1OksLBNTrh1N1ezMoUQ4kUAy7wmMoiKMwuYeZejAvCavWLF7+Sl4pdVdnii5Fwm8iiO5vQ8uZunThKh0i1x5qEiDkQhM5Kyu9L6DGG8lO0+yS6V7ZBmIZtWlCyXW0Ls/hiXPYC5mJ5nKZCrFugzTisyPA0A/Eaiz8ICrPTXSLfXiqWLZNUSMu69vFfIscRs1hemHSZK6+749YfTYWh5AqdlFEbGpZp6L+kIKvlSSoLQVSIggx5PuSLWjPgAL86P7NDQ8V2+3/clZU+JX0l3sOtuUFZkkgbU9Vj/CgD4hSnMGIiKMw26/MhVlh6uKi4o26KSmEvwkaXOo7SxXVoYBJD6WLHUTq6vUdRq/VyPZJ4snCTS1hhSGWHgqtPPizbJrRWW7bJROvKdphafbCUWwr503W142N7NOiutKUbpummspXM5i3+IJPdZ3gT25gICrNd4DGMw+7nn+re6LwTE3e1ny7t2vrjQst68om6tFvX1mtm/d6u9WG2DAF3Y0W5l982P87OWvWCVtxtkTtLNk37bG/3vHo0bL2iVQwVhgOZBhZlERTmEbmTxrXKq/SRyxRgdK0bXt235Za0RUhAi0dJ6CK5lcQdBbvovZTP9LGRbqRUMF4iKEwEQVCYCIKgMBEEhYkgCAoTQVCYCIKgMBHk2ytM9F5CkH85t69KZvC7CIK8QQYzfRjXamsIgrxRsI2JIFj8QRAEhYkgKEwEQVCYCILCRBDkmyZM99bnTJcBUDEzi8cZQf65jtLZbedxVrVNd/6R/D0y5Z1Tx0lBEORNCvPkaCL1hX2FTttNJroNjrYFw3yc377ORBul8xWtHk1HgiBIH3P+9NhSlnLZbgfo8na5W5lZi4mGfBF/xEeZ/52Z3QtQ5Sy4IUTPD5lqs5LJbzQzWTTBRJB+ZsmzjBWwklaJnzT8LBiW3pklb027PnK9pi124ubHu3swoTMFEz07lmMvbA/7guZ98EhYPW9G2GItqTj6dNJumRg1EeTceWUXIry4pB00DmrFcnO/9re9SKgzr2zxYAisMSPbZYibXnQ1rriuexRM4xykgqsGWCE4Af9fLkXtT7rXutmesnJxqbbSDrUOR7Ny1s+xgo6z4SHIuTOxM9HR2fowyyaMCDj7pB+9Gwl2TIW08NDz6wFCxA2Z6sG/CQIYX4Z8FPxN/CUWA5d3f7Q15AsaD46jY/lHsfUV1xPhye9nPWXqogCaFFIsn9zBkIkg53uXpPUXw2x6mF2NRBdnPilYJ9y+thavjlwdClwnbc3lj3b3Bogx7SXiKG0PQ/AU/cFoGkww/asdZa4TF0x4d3FzLkwl6iSWVqZDKbCnZSWRqeE5QZC+TIUakag1zCQiUeOgqh6e9MdcO7bhy21f9QcFasjPBoeg4lMAty8qOuDfHab4YNv4kjQnx2XiFV1a3wvxtCdMksoyYE7Lh6jTd6YhCArzLGHuRaIhnotCKiuc4Sit9RjXUqlLvkTyGqSy6foCeEknnAFq3OdLOJ2AuQwB03W+XF+4udcRpsXTPMdxPJNfxpOCIP1ZvTOJeihRvwe1nMPTwtQ6Vu+FesRPqj/+1QEftfroo92wvxkZ8EFWW797ZOeubYFt9GP30RcvxjvCbPEs8XMPSRgwEaRPR+nh4Co0Mx+AJ1+00S3MIrQx14ij9IdtR+nCtjMQJM1L0nc5Q4QJDpm+hDUebTvSktLPFbnhPS5t7zEJ3RVmpiX4BZqhBExlEaQ/YT755FEkyCbAgI+Vy4tdwixuR8IRl3B4znXiW/nzahy6StLzYPXu2I92wyR4EkdpKl1vi3H9vut7SXj662E6miKhVDVjHMPQUP6hFUxlEaSfqqy1uLT/eJ1US9f3HxZaXVbva9rIkMdczesvce4zPvB691GXfX4+bUV8JHiC4nxRvd0LUrsml79wHy09ijAsEy2T8QpVTmZyrMA4zPQGnhQEOUeYW3NsUFx6eDTsrgjGtcyxMMmQPI+1I+NaHxXdo/1Rs3XFH5z9dC9ZX/8TyzDBYHSnXfp5+h831zpumi2r5Y4jqtyRHHo6mUyKlIYRE0HOHZJX/F0y1TWH1/LT34zeXOr69aJHW2lP35Zb5pyUsD/MGlbriVZoflJ65gC23hlS+/zYqTaXzbZH3laM/JSi7xsTo9jERJA+BrFvNRvdT5cPGtVXvHvbXFTWzToMjVU+yZEh75r2WYZwfEtmUTvbm3ZnTVWV/QaeEgTp57av0jnPewOse/NW4fW3B8fjIQhOLYIgKEwEQVCYCILCRBAEhYkg3zphqgiCvFH6Eeba/nMEQd4g+2t9GNfe/fkvEQR5g/z87vnGtcu53/0eQZA3yO9yy+ensss7CIK8UZaxKosg2F2CIAgKE0FQmAiCoDARBIX5pSiqZ40jwkONIP9MYZbK+pPjZ+AOZtXhn46HGkH+icIsbU7G0h/MkNliP8vMZOfeEsX0ZVGUcS4fBPkKhVk8MVFI8WRSemIOn8XdgG/VsWEaWZiGy27ZYb8Ldaj2YSldwpwXQfoS5gsd5sdadG2lyc/lA73Lj2trCyyFyCx5HXWW/rwd8IEQE/WZ8rjfz/opMACLwjR53YIrnVafWtGNHUXXDR2ViSDnT1/574OJtcWyZT7RyM/qo5/HU0sdo8ur4XD4+i5Qbivu2ThY7/kTA770E/Pz+zFwSpDlsC8oiomuVLa0dTQX3qLSDscZWxCS01l6TI7XinhWEBSmdp5xLUz4/GxcENOPX5CfMOFzx7hWq4XDI5EA8Ui4utnW3F0we4+C/d7qA3H1gTPsS++BXSY4DUWPI2GpPDfqabv4wvLqROr+DEfRvMxSDDpKI0h/FgnPxlnw4Vsd56Jy+tPWtV7j2oORMGHS9S4p7lh7A/5VyGbTb/vTj1bDvsS4L3olvedPHAuz8PRKzAuLu8NswvU0qeTYCRlc+Kw4bxbwpCBIH6ZCj7YjvDNOjGtHbx7mT9rwfUQcElY8t6/Szu9iVNC57wtCkPRH60SYe75owHetS5ilcttWqPA0wrQdpbWZDfD6YliWpWawfIsgfdnwPYoQ01qR5UKM3Hhx0h+z2DGu1e62Ij4fTYGnEE1RwcSj3WHf6jAI0z/eHTGrV2TiC098v/6dOfLHtF1H6ZBAZVGYCNKncW1QSIQELmFH+PKpiAk12S/mPGEWy5MCH+QZH8VxTDCxBzZ8YGMbDYCn9LEw1+ckz/a9tL473uUojca1CHIx49pIcHePTZwlzJHdMnCUyoIyDSj8xMCDNu3Yh9f8vmDimi864L8KKWtbmKUX427ABD4rjNNRT5gZm/cLDMPwDPpjIkh/wly6z/Kh6PYwC0Gz+vxYmKVyOHx1hDAUuOGKbfnTFukc8SfAji9Rnw+mrRf3o+N+yh9tLbSXKTx6K1FtF3h29+iE+YlblU3xFE8zNE+hMBGkr6qsmSvffytW/vTpZSnRmG11C/NGJOwx5GWgi19Az2Vr2Jew74OX9Kf2o9ltZ+8S5QR8wXYqWyyPi0srWtu4lqZo17hWNQWeFRmWjtFo9Y4g/fRjRuNLi2VDf1gq6Gb9k0ffDx33Yxa3tooumjvAoDRbD/gTe7TPl4a6D72dy8zWr7E+yppxAn5DbfeVvJ3YahuGPfxjavq3N0mErMxwFm2KspChMugojSDnCXNt4S2BOEq7Q1hhIGth7y1BXnqodcbJrrkst0frFLbt+mwrHDXv5Z9Z8FqhPuyP2oufFfYSne7JZ8f+mlu16pGNrd4Ub+kbLTFUxXOCIOcOyVszLGNF67mN6/Dhy9+ezxZK2V3z3or2meK+fdchLralZ/XSq/01VdWo5ItZo4WnBEH6GMSec8evdz//5LxFPupaIj/jekl/du/cLVE883c8JQiCU4sgCAoTQRAUJoKgMBEEQWEiCAoTQZB/ujA3EQR5o/QjTPW99xEEeYO8p/bhKJ35wY8RBHmD/CBzvqO0tvYcQZA3ylo/bUy1iCDIG0TFqiyCYHcJgiAoTARBYSIIgsJEEBTml6GUJXZ6SpdlX/HuLB5nBPmnCrO43qpnlWfmg3tZtfjceEDmxWvV0VoPQd6kMGEa9p7nhYNfgdmXfY1ZNZz69tv86qPppRF/sDpzbtDMqUfTiyAIcq4w8yc8ntV81/O17d3tHkvpvAUTy4bARih4LShv37/kX7Ud8EdwHPOcoJnXa1l108jmMLgiyPnCBAfphlZael4tLtVqtWqFPD+aJa+4uTAUGXpY3iqX20OKPivvwbTr8Bechaio2RphJOIxRKZib3Qrrj0ysJRT2q/mDGm0pU+LLb2JvrUIcp4wN+dDrLC0/GjiZnnhP1Opm7N7ETa61J7wuXgQDsCfSWDRU6b6ggaTWvhL+Xyrdji4aweCAoRPgU90zRe7XMq226OmVfemz1NtlqLFFEXTvIHGtQhy7kzsbOJRYS8SZKL3Q2DhFT38pMtUqBge2l0IB4Dwh0SZud0IFfEFGTpI+4LlWfDJHKdW3VS2Ve/yo629La+vkKrQo7fE0UM3ZjZ4SeQFwRYF9C5BkD7dvoaDu+NMWt/dCyUa271uX9va9sLchzcCV1+QFHTxhT3smmOCMK0MGAzRQXt3CKxMmnonYoIv5lvpKrx7qQ6um3SaSLYyLQ2yNM3wPI3CRJB+/TGj9yNM4lEZNPnw4JRx7Zq2tdC24dOU8tvQoqSgXRk0c0/Tw/4BktiCSaa/7bdHAib48JFm6vKjd1b36KhJUtecwzISMcik0FQIQfoT5l6E56DUauxx8mHu8KQwtWNHaSiuvnjbF4xQQUhodz985oSppdSTAfAYgtbpkdHCMvjweR2bS40XYJB5eM8zrmVCHA/gKUGQ/oR5GAmu7nEJcziYfqIenjCuhSmC1sqdiLlsDUOIZCBIRq0X1yhf9HAbvN6HEnbhSJel8rjUdiUqFfYCwbLbEZpt8YxAdCngKUGQ/oRZHmYTEW71PhvV7/UIUwsPPZ9fWJhfnAwQYZZm9wI+gt/9F1wNQNmnTkcdsPyyjoo/xdqVRKPgNTb32GBLdwWdawp+kWYoEVNZBOlTmMr+MMenm+NC+rHWLczi9lD4iIU1L5V9b3fcF9wO+FfnZ2ZaEV9iCATKBCkf3zauLZXvi2mvEFQAN01BkNeJca0lcSxD0zSLxR8E6a+7pK4WX1jmE7VsPNZ6hAm/nrzqcl3bbI8LOBiGss9uwLf6ZE2DLJZ4voPggpR/13tDoXpFLpc63ptCyHXbrCjsGNPiBdahp9G4FkHOE+bWHBlg8HCRePEVFdIqjDDCsTCLMOjHxRuXt1geH/BH9cXdgH8Xaq1LT349e5BsOcD99NF0Q09vz64de2+2Wrrb3lSSNpuaTikCjca1CNLHkLzayolX1rulczSbUOeF0gtzsaCVD1dci9qDx5quZID1eucdGyvd3pttt81KU9nXqtWaVsNTgiB9DGIvXXCFJbVzIyYkvu5f8kLhnMWKbswtaThSFkFwBgMEQWEiCILCRBAUJoIgKEwEQWEiCPLPF2YJQZA3Sl/C3EIQ5I2i9WNc+53vIQjyBvlOP8a1pbsIgrxRSv2kshUEQd4oWJVFEOwuQRAEhYkgKEwEQVCYCILCRBAEhYkgCAoTQVCYCIKgMBEEhYkgCAoTQVCYCIKgMBEEQWEiCAoTQRAUJoKgMBEEQWEiCAoTQRAUJoIgKEwEQWEiCILCRBAUJoIgKEwEQWEiCILCRBAEhYkgKEwEQVCYCILCRBAEhYkgKEwEQVCYCIKgMBEEhYkgCAoTQVCYCIKgMBEEhYkgCAoTQRAUJoKgMBEEQWEiCAoTQRAUJoKgMBEEQWEiCAoTQRAUJoIgKEwEQWEiCILCRBAUJoIgKEwEQWEiCILCRBAEhYkgKEwEQVCYCILCRBAEhYkgKEwEQVCYCIKgMBEEhYkgCAoTQVCYCIKgMBEEhYkgCAoTQRAUJoKgMBEEQWEiCAoTQRAUJoKgMBEEQWEiCILCRBAUJoIgKEwEQWEiCILCRBAUJoIgKEwEQVCYCILCRBAEhYkgKEwEQf5x/P9U4B2OlFIEngAAAABJRU5ErkJggg=="
};
var THEME_PREVIEW_VERSION = "36a1110e18";

// ../scripts/manager-core.mjs
function createManager(opts) {
  const TOOL_ROOT = import_node_path.default.resolve(opts.toolRoot);
  const DATA_DIR = import_node_path.default.resolve(opts.dataDir);
  const PORT = Number.isFinite(opts.port) ? opts.port : 3457;
  const log = typeof opts.log === "function" ? opts.log : (m) => console.log(m);
  const __dirname = import_node_path.default.join(TOOL_ROOT, "scripts");
  function migrateDataToUserDir() {
    const moves = [
      ["connections.json", "connections.json"],
      ["local.json", "local.json"],
      ["repos", "repos"],
      ["content", "content"]
    ];
    let moved = 0;
    for (const [from, to] of moves) {
      const src = import_node_path.default.join(TOOL_ROOT, from);
      const dst = import_node_path.default.join(DATA_DIR, to);
      if (!import_node_fs.default.existsSync(src) || import_node_fs.default.existsSync(dst)) continue;
      try {
        import_node_fs.default.mkdirSync(import_node_path.default.dirname(dst), { recursive: true });
        import_node_fs.default.renameSync(src, dst);
        moved += 1;
        console.log(`[manager] \u5DF2\u628A ${from} \u79FB\u5230\u7528\u6237\u6570\u636E\u76EE\u5F55\uFF1A${dst}`);
      } catch (e) {
        console.warn(`[manager] ${from} \u672A\u80FD\u79FB\u5230\u7528\u6237\u6570\u636E\u76EE\u5F55\uFF08\u5C06\u7EE7\u7EED\u4F7F\u7528\u6E90\u76EE\u5F55\u91CC\u7684\u90A3\u4EFD\uFF09\uFF1A${e.message}`);
      }
    }
    if (moved === 0) return;
    const envSrc = import_node_path.default.join(TOOL_ROOT, ".env");
    if (import_node_fs.default.existsSync(envSrc) && !import_node_fs.default.existsSync(import_node_path.default.join(DATA_DIR, ".env"))) {
      try {
        import_node_fs.default.renameSync(envSrc, import_node_path.default.join(DATA_DIR, ".env"));
        console.log(`[manager] \u5DF2\u628A .env \u79FB\u5230\u7528\u6237\u6570\u636E\u76EE\u5F55`);
      } catch {
      }
    }
  }
  const SKIP = [".obsidian", ".trash", ".smart-env", ".git", "node_modules", ".next", "out"];
  const ASSET_EXTS = /* @__PURE__ */ new Set([".png", ".jpg", ".jpeg", ".gif", ".svg", ".webp", ".bmp", ".ico", ".avif", ".pdf", ".mp3", ".wav", ".ogg", ".m4a", ".mp4", ".webm"]);
  const readJson = (file, def) => {
    try {
      return JSON.parse(import_node_fs.default.readFileSync(file, "utf8"));
    } catch {
      try {
        return JSON.parse(import_node_fs.default.readFileSync(file + ".bak", "utf8"));
      } catch {
        return def;
      }
    }
  };
  const writeJson = (file, obj) => {
    import_node_fs.default.mkdirSync(import_node_path.default.dirname(file), { recursive: true });
    const tmp = file + ".tmp";
    import_node_fs.default.writeFileSync(tmp, JSON.stringify(obj, null, 2));
    try {
      if (import_node_fs.default.existsSync(file)) import_node_fs.default.copyFileSync(file, file + ".bak");
    } catch {
    }
    import_node_fs.default.renameSync(tmp, file);
    return obj;
  };
  const normalize = (p) => p.replace(/\\/g, "/").replace(/^\.\//, "").replace(/^\/+/, "");
  const isMarkdown = (p) => /\.(md|markdown)$/i.test(p);
  const assetOf = (p) => {
    const ext = import_node_path.default.extname(p).toLowerCase();
    return ASSET_EXTS.has(ext) ? ext : null;
  };
  function validVault(p) {
    if (!p || !import_node_path.default.isAbsolute(p)) return false;
    try {
      return import_node_fs.default.statSync(import_node_path.default.join(p, ".obsidian")).isDirectory();
    } catch {
      return false;
    }
  }
  function walkFiles(dir, baseDir, out = []) {
    let entries;
    try {
      entries = import_node_fs.default.readdirSync(dir, { withFileTypes: true });
    } catch {
      return out;
    }
    for (const e of entries) {
      const abs = import_node_path.default.join(dir, e.name);
      if (e.isDirectory()) {
        if (SKIP.some((d) => e.name === d || e.name.startsWith(d + "/"))) continue;
        walkFiles(abs, baseDir, out);
      } else if (e.isFile()) {
        out.push({ rel: import_node_path.default.relative(baseDir, abs).replace(/\\/g, "/"), abs });
      }
    }
    return out;
  }
  migrateDataToUserDir();
  const CONNECTIONS_FILE = import_node_path.default.join(DATA_DIR, "connections.json");
  const LOCAL_FILE = import_node_path.default.join(DATA_DIR, "local.json");
  function loadConnections() {
    const j = readJson(CONNECTIONS_FILE, { connections: [] });
    return Array.isArray(j.connections) ? j.connections : [];
  }
  function saveConnections(list) {
    writeJson(CONNECTIONS_FILE, { connections: list });
  }
  function loadLocal() {
    return readJson(LOCAL_FILE, { active: null, vaultPaths: {} });
  }
  function saveLocal(local) {
    writeJson(LOCAL_FILE, local);
  }
  function loadPublishMark(connId) {
    if (!connId) return null;
    const local = loadLocal();
    const all = local.publishMarks;
    const m = all && typeof all === "object" ? all[connId] : null;
    return m && typeof m === "object" ? m : null;
  }
  function savePublishMark(connId, mark) {
    if (!connId) return;
    const local = loadLocal();
    if (!local.publishMarks || typeof local.publishMarks !== "object") local.publishMarks = {};
    local.publishMarks[connId] = mark;
    saveLocal(local);
  }
  const CHANGE_KEYS = ["added", "modified", "deleted"];
  function emptyChanges() {
    return { added: [], modified: [], deleted: [] };
  }
  function loadChangeLog(connId) {
    if (!connId) return emptyChanges();
    const local = loadLocal();
    const all = local.changeLog;
    const raw = all && typeof all === "object" ? all[connId] : null;
    const out = emptyChanges();
    for (const k of CHANGE_KEYS) {
      const v = raw && raw[k];
      out[k] = Array.isArray(v) ? v.filter((x) => typeof x === "string" && x) : [];
    }
    return out;
  }
  function saveChangeLog(connId, next) {
    if (!connId) return;
    const local = loadLocal();
    if (!local.changeLog || typeof local.changeLog !== "object") local.changeLog = {};
    const out = emptyChanges();
    for (const k of CHANGE_KEYS) out[k] = next && next[k] || [];
    local.changeLog[connId] = out;
    saveLocal(local);
  }
  function clearChangeLog(connId) {
    saveChangeLog(connId, emptyChanges());
  }
  const AUTO_LOG_MAX = 20;
  function loadAutoLog(connId) {
    if (!connId) return [];
    const local = loadLocal();
    const all = local.autoLog;
    const raw = all && typeof all === "object" ? all[connId] : null;
    if (!Array.isArray(raw)) return [];
    return raw.filter((e) => e && typeof e === "object" && Number.isFinite(e.at)).slice(0, AUTO_LOG_MAX);
  }
  function pushAutoLog(connId, entry) {
    if (!connId || !entry) return;
    const cur = loadAutoLog(connId);
    cur.unshift(entry);
    const local = loadLocal();
    if (!local.autoLog || typeof local.autoLog !== "object") local.autoLog = {};
    local.autoLog[connId] = cur.slice(0, AUTO_LOG_MAX);
    try {
      saveLocal(local);
    } catch {
    }
  }
  function patchAutoLog(connId, at, patch) {
    if (!connId) return;
    const local = loadLocal();
    const all = local.autoLog && typeof local.autoLog === "object" ? local.autoLog : null;
    const list = all && all[connId];
    if (!Array.isArray(list)) return;
    const hit = list.find((e) => e && e.at === at);
    if (!hit) return;
    Object.assign(hit, patch);
    try {
      saveLocal(local);
    } catch {
    }
  }
  function clearAutoLog(connId) {
    if (!connId) return;
    const local = loadLocal();
    if (!local.autoLog || typeof local.autoLog !== "object") local.autoLog = {};
    local.autoLog[connId] = [];
    saveLocal(local);
  }
  async function probeLiveSite(target, since, wantSha) {
    const t0 = Date.now();
    try {
      const r = await fetch(`${target}data/index.json?fresh=${t0}`, {
        cache: "no-store",
        headers: { "cache-control": "no-cache", pragma: "no-cache", "user-agent": "obsidian-blog-manager" },
        signal: AbortSignal.timeout(15e3)
      });
      if (!r.ok) return { live: false, httpStatus: r.status, ms: Date.now() - t0 };
      const data = await r.json();
      const at = Date.parse(String(data && data.generatedAt || "")) || 0;
      const commit = String(data && data.commit || "");
      return {
        live: wantSha && commit ? commit === wantSha : at > since,
        commit,
        generatedAt: at,
        notes: Array.isArray(data && data.notes) ? data.notes.length : 0,
        ms: Date.now() - t0
      };
    } catch (e) {
      return { live: false, error: String(e && e.message || e), ms: Date.now() - t0 };
    }
  }
  function repoParts(repo) {
    const s = String(repo || "").trim();
    if (!s) return null;
    let m = s.match(/^https?:\/\/github\.com\/([^/]+)\/([^/]+?)(?:\.git)?\/?$/i);
    if (!m) m = s.match(/^git@github\.com:([^/]+)\/([^/]+?)(?:\.git)?$/i);
    if (!m) return null;
    return { owner: m[1], name: m[2] };
  }
  async function probeBuildStatus(repo, sha) {
    if (!sha) return null;
    const parts = repoParts(repo);
    if (!parts) return null;
    const token = loadLocal().githubToken;
    if (!token) return null;
    try {
      const u = `https://api.github.com/repos/${parts.owner}/${parts.name}/actions/runs?head_sha=${encodeURIComponent(sha)}&per_page=5`;
      const r = await fetch(u, {
        headers: {
          accept: "application/vnd.github+json",
          authorization: `Bearer ${token}`,
          "user-agent": "obsidian-blog-manager"
        },
        signal: AbortSignal.timeout(15e3)
      });
      if (!r.ok) return { httpStatus: r.status };
      const data = await r.json();
      const runs = Array.isArray(data && data.workflow_runs) ? data.workflow_runs : [];
      const hit = runs.find((x) => String(x.head_sha || "") === sha) || runs[0];
      if (!hit) return { found: false };
      return {
        found: true,
        id: hit.id,
        status: String(hit.status || ""),
        conclusion: String(hit.conclusion || ""),
        startedAt: Date.parse(String(hit.run_started_at || "")) || 0,
        updatedAt: Date.parse(String(hit.updated_at || "")) || 0,
        url: String(hit.html_url || "")
      };
    } catch (e) {
      return { error: String(e && e.message || e) };
    }
  }
  function recordChanges(connId, diff) {
    const cur = loadChangeLog(connId);
    let dirty = false;
    for (const k of CHANGE_KEYS) {
      for (const p of diff && diff[k] || []) {
        const rel = normalize(p);
        for (const k2 of CHANGE_KEYS) {
          if (k2 === k) continue;
          const i = cur[k2].indexOf(rel);
          if (i >= 0) {
            cur[k2].splice(i, 1);
            dirty = true;
          }
        }
        if (!cur[k].includes(rel)) {
          cur[k].push(rel);
          dirty = true;
        }
      }
    }
    if (dirty) {
      try {
        saveChangeLog(connId, cur);
      } catch {
      }
    }
    return cur;
  }
  function dropChanges(connId, parts) {
    if (!connId) return;
    const cur = loadChangeLog(connId);
    let dirty = false;
    for (const k of CHANGE_KEYS) {
      const list = parts && parts[k] || [];
      if (!list.length) continue;
      const gone = new Set(list.map((p) => normalize(p)));
      const next = cur[k].filter((p) => !gone.has(normalize(p)));
      if (next.length !== cur[k].length) {
        cur[k] = next;
        dirty = true;
      }
    }
    if (!dirty) return;
    try {
      saveChangeLog(connId, cur);
    } catch {
    }
  }
  function activeConfig() {
    const local = loadLocal();
    const connections = loadConnections();
    const conn = connections.find((c) => c.id === local.active) ?? null;
    const vaultPath = conn ? local.vaultPaths?.[conn.id] ?? "" : "";
    const workdir = conn ? import_node_path.default.join(DATA_DIR, "repos", conn.id) : "";
    return { local, connections, conn, vaultPath, workdir };
  }
  const TEMPLATE_ITEMS = ["package.json", "package-lock.json", "next.config.ts", "postcss.config.mjs", "components.json", "tsconfig.json", "src", "scripts/build-content.mjs", ".github"];
  const THEME_REL = import_node_path.default.join("public", "theme.css");
  const THEME_MAX_BYTES = 200 * 1024;
  function readThemeCss(workdir) {
    if (!workdir) return "";
    try {
      return import_node_fs.default.readFileSync(import_node_path.default.join(workdir, THEME_REL), "utf8");
    } catch {
      return "";
    }
  }
  function writeThemeCss(workdir, css) {
    const file = import_node_path.default.join(workdir, THEME_REL);
    if (!css.trim()) {
      try {
        import_node_fs.default.rmSync(file, { force: true });
      } catch {
      }
      return { bytes: 0, removed: true };
    }
    import_node_fs.default.mkdirSync(import_node_path.default.dirname(file), { recursive: true });
    import_node_fs.default.writeFileSync(file, css.replace(/\r\n?/g, "\n"), "utf8");
    return { bytes: Buffer.byteLength(css, "utf8"), removed: false };
  }
  function initTemplate(workdir, overwrite = true) {
    import_node_fs.default.mkdirSync(workdir, { recursive: true });
    for (const item of TEMPLATE_ITEMS) {
      const src = import_node_path.default.join(TOOL_ROOT, item);
      const dst = import_node_path.default.join(workdir, item);
      if (!import_node_fs.default.existsSync(src)) continue;
      if (!overwrite && import_node_fs.default.existsSync(dst)) {
        if (import_node_fs.default.statSync(src).isDirectory()) pruneMissing(src, dst);
        continue;
      }
      if (import_node_fs.default.statSync(src).isDirectory() && import_node_fs.default.existsSync(dst)) {
        pruneMissing(src, dst);
      }
      import_node_fs.default.cpSync(src, dst, { recursive: true });
    }
    const gi = import_node_path.default.join(workdir, ".gitignore");
    if (overwrite || !import_node_fs.default.existsSync(gi)) {
      import_node_fs.default.writeFileSync(gi, "node_modules\n.next\nout\n.env\n.sync-manifest.json\n*.log\nlocal.json\nrepos/\npublic/data\npublic/assets\n");
    }
  }
  function pruneMissing(src, dst) {
    let entries;
    try {
      entries = import_node_fs.default.readdirSync(dst, { withFileTypes: true });
    } catch {
      return;
    }
    for (const e of entries) {
      if (e.name === ".git" || e.name === "node_modules" || e.name === ".next" || e.name === "out") continue;
      const s = import_node_path.default.join(src, e.name);
      const d = import_node_path.default.join(dst, e.name);
      if (!import_node_fs.default.existsSync(s)) {
        import_node_fs.default.rmSync(d, { recursive: true, force: true });
        continue;
      }
      if (e.isDirectory() && import_node_fs.default.statSync(s).isDirectory()) pruneMissing(s, d);
    }
  }
  function remoteHasBranch(repo, branch) {
    try {
      const out = git(["ls-remote", "--heads", repo, branch]);
      return { reachable: true, has: out.trim().length > 0 };
    } catch (e) {
      return { reachable: false, has: false, error: String(e && e.message || e).slice(0, 200) };
    }
  }
  function prepareWorkdir(conn, wantTemplate) {
    const workdir = import_node_path.default.join(DATA_DIR, "repos", conn.id);
    const branch = conn.branch || "main";
    const remote = remoteHasBranch(conn.repo, branch);
    if (!remote.reachable) {
      return { workdir, cloned: false, errKey: "errRepoUnreachable", errArg: remote.error || "" };
    }
    if (remote.has) {
      try {
        git(["clone", "--branch", branch, conn.repo, workdir]);
        if (wantTemplate) initTemplate(workdir, false);
        return { workdir, cloned: true };
      } catch {
        import_node_fs.default.rmSync(workdir, { recursive: true, force: true });
        return { workdir, cloned: false, errKey: "errCloneFail", errArg: "" };
      }
    }
    import_node_fs.default.rmSync(workdir, { recursive: true, force: true });
    initTemplate(workdir, true);
    git(["init", "-b", branch], workdir);
    try {
      git(["remote", "add", "origin", conn.repo], workdir);
    } catch {
    }
    return { workdir, cloned: false, initialized: true };
  }
  function ensureWorkdir(conn) {
    const workdir = import_node_path.default.join(DATA_DIR, "repos", conn.id);
    if (import_node_fs.default.existsSync(import_node_path.default.join(workdir, ".git"))) return { workdir, cloned: true };
    if (import_node_fs.default.existsSync(workdir) && import_node_fs.default.readdirSync(workdir).length > 0) {
      return { workdir, cloned: false, errKey: "errNoDir", errArg: workdir };
    }
    try {
      return prepareWorkdir(conn, true);
    } catch (e) {
      return { workdir, cloned: false, error: String(e.message || e).slice(0, 200) };
    }
  }
  const githubWorkdirCache = /* @__PURE__ */ new Map();
  function isGithubWorkdir(cwd) {
    if (!cwd) return false;
    if (githubWorkdirCache.has(cwd)) return githubWorkdirCache.get(cwd);
    let yes = false;
    try {
      yes = /github[.]com/i.test(import_node_fs.default.readFileSync(import_node_path.default.join(cwd, ".git", "config"), "utf8"));
    } catch {
      yes = false;
    }
    githubWorkdirCache.set(cwd, yes);
    return yes;
  }
  function git(args, cwd) {
    const token = readGithubToken();
    const pre = ["-c", "credential.interactive=false"];
    const looksGithub = /github[.]com/i.test(args.join(" ")) || !!cwd && isGithubWorkdir(cwd);
    if (token && looksGithub) {
      const basic = Buffer.from("x-access-token:" + token).toString("base64");
      pre.push("-c", "http.extraHeader=Authorization: Basic " + basic);
    }
    const r = (0, import_node_child_process.spawnSync)("git", [...pre, ...args], {
      cwd,
      encoding: "utf8",
      stdio: ["ignore", "pipe", "pipe"],
      timeout: 12e4,
      windowsHide: true,
      // 见函数上方注释 ③：有令牌且目标是 GitHub 时，跳过 MITM 证书的吊销检查
      env: {
        ...process.env,
        GIT_TERMINAL_PROMPT: "0",
        ...token && looksGithub ? { GIT_SSL_NO_VERIFY: "1" } : null
      }
    });
    if (r.error) throw new Error(r.error.message);
    if (r.status !== 0) {
      throw new Error(((r.stderr || "") + (r.stdout || "")).trim().slice(0, 300) || "git " + args.join(" ") + " failed");
    }
    return (r.stdout || "").trim();
  }
  function siteUrlOf(repo) {
    const s = String(repo || "").trim();
    if (!s) return null;
    let m = s.match(/^https?:\/\/github\.com\/([^/]+)\/([^/]+?)(?:\.git)?\/?$/i);
    if (!m) m = s.match(/^git@github\.com:([^/]+)\/([^/]+?)(?:\.git)?$/i);
    if (!m) return null;
    const user = m[1];
    const name = m[2];
    if (name.toLowerCase() === `${user.toLowerCase()}.github.io`) {
      return `https://${user.toLowerCase()}.github.io/`;
    }
    return `https://${user.toLowerCase()}.github.io/${name}/`;
  }
  function repoSlugOf(repo) {
    const s = String(repo || "").trim();
    let m = s.match(/^https?:\/\/github\.com\/([^/]+)\/([^/]+?)(?:\.git)?\/?$/i);
    if (!m) m = s.match(/^git@github\.com:([^/]+)\/([^/]+?)(?:\.git)?$/i);
    return m ? `${m[1]}/${m[2]}` : null;
  }
  function readGithubToken() {
    const fromEnv = (process.env.GITHUB_TOKEN || process.env.GH_TOKEN || "").trim();
    if (fromEnv) return fromEnv;
    try {
      const saved = (loadLocal().githubToken || "").trim();
      if (saved) return saved;
    } catch {
    }
    try {
      const r = (0, import_node_child_process.spawnSync)("git", ["credential", "fill"], {
        input: "protocol=https\nhost=github.com\n\n",
        encoding: "utf8",
        stdio: ["pipe", "pipe", "pipe"],
        timeout: 15e3,
        windowsHide: true,
        env: { ...process.env, GIT_TERMINAL_PROMPT: "0", GCM_INTERACTIVE: "never" }
      });
      if (r.status === 0 && r.stdout) {
        const m = r.stdout.match(/^password=(.+)$/m);
        if (m && m[1].trim()) return m[1].trim();
      }
    } catch {
    }
    return null;
  }
  function saveGithubToken(token) {
    const local = loadLocal();
    const t = String(token || "").trim();
    if (t) local.githubToken = t;
    else delete local.githubToken;
    saveLocal(local);
    return !!t;
  }
  function systemCurlPath() {
    const candidates = [
      import_node_path.default.join(process.env.SystemRoot || "C:\\Windows", "System32", "curl.exe"),
      "curl.exe"
    ];
    for (const c of candidates) {
      try {
        const r = (0, import_node_child_process.spawnSync)(c, ["--version"], { encoding: "utf8", stdio: ["ignore", "pipe", "pipe"], timeout: 1e4, windowsHide: true });
        if (r.status === 0) return c;
      } catch {
      }
    }
    return null;
  }
  async function ghApi(url, opts2 = {}) {
    const method = (opts2.method || "GET").toUpperCase();
    const token = opts2.token || "";
    const accept = opts2.accept || "application/vnd.github+json";
    const curl = systemCurlPath();
    if (curl) {
      const outFile = import_node_path.default.join(import_node_os.default.tmpdir(), "gh-" + process.pid + "-" + Date.now() + "-" + Math.random().toString(36).slice(2, 8) + ".json");
      const args = [
        "-s",
        "-S",
        "-L",
        // Windows 版 curl 用系统 Schannel 做 TLS，默认要联网查证书吊销状态；
        // 在部分网络（代理/加速器/受限网络）下这一步会失败并整条请求报
        // CRYPT_E_NO_REVOCATION_CHECK (0x80092012)，表现为「连不上 GitHub」。
        // 跳过吊销检查即可正常握手（GitHub 证书本身仍然照常校验）。
        "--ssl-no-revoke",
        "--max-time",
        "60",
        "-o",
        outFile,
        "-w",
        "%{http_code}",
        "-H",
        "Accept: " + accept,
        "-H",
        "User-Agent: obsidian-blog-manager"
      ];
      if (token) args.push("-H", "Authorization: Bearer " + String(token).replace(/[\r\n]/g, ""));
      if (opts2.body != null) {
        args.push("-H", "Content-Type: application/json");
        args.push("--data-binary", "@-");
      }
      args.push("-X", method, url);
      const r = (0, import_node_child_process.spawnSync)(curl, args, {
        input: opts2.body != null ? String(opts2.body) : void 0,
        encoding: "utf8",
        stdio: ["pipe", "pipe", "pipe"],
        timeout: 9e4,
        windowsHide: true
      });
      let text2 = "";
      try {
        text2 = import_node_fs.default.readFileSync(outFile, "utf8");
      } catch {
      }
      try {
        import_node_fs.default.rmSync(outFile, { force: true });
      } catch {
      }
      const status = parseInt(String(r.stdout || "").trim(), 10);
      if (!Number.isNaN(status) && status > 0) {
        return { ok: status >= 200 && status < 300, status, text: text2, via: "system-curl" };
      }
    }
    const res = await fetch(url, {
      method,
      headers: {
        Accept: accept,
        "User-Agent": "obsidian-blog-manager",
        ...token ? { Authorization: `Bearer ${token}` } : {},
        ...opts2.body != null ? { "Content-Type": "application/json" } : {}
      },
      ...opts2.body != null ? { body: String(opts2.body) } : {}
    });
    const text = await res.text().catch(() => "");
    return { ok: res.ok, status: res.status, text, via: "node-fetch" };
  }
  async function syncSiteNameVariable(repo, name) {
    const slug = repoSlugOf(repo);
    if (!slug) return { ok: false, reason: "bad-repo" };
    const token = readGithubToken();
    if (!token) return { ok: false, reason: "no-token" };
    try {
      const head = await ghApi(`https://api.github.com/repos/${slug}/actions/variables/SITE_NAME`, { token });
      if (head.ok) {
        try {
          const cur = JSON.parse(head.text);
          if (String(cur.value || "") === String(name)) return { ok: true, unchanged: true, via: head.via };
        } catch {
        }
      }
      const body = JSON.stringify({ name: "SITE_NAME", value: String(name) });
      let res = await ghApi(`https://api.github.com/repos/${slug}/actions/variables/SITE_NAME`, { method: "PATCH", token, body });
      if (res.status === 404) {
        res = await ghApi(`https://api.github.com/repos/${slug}/actions/variables`, { method: "POST", token, body });
      }
      if (res.ok || res.status === 201 || res.status === 204) return { ok: true, via: res.via };
      return { ok: false, reason: "http-" + res.status, detail: String(res.text || "").slice(0, 200) };
    } catch (e) {
      return { ok: false, reason: "network", detail: String(e.message || e).slice(0, 200) };
    }
  }
  async function ensurePages(repo) {
    const slug = repoSlugOf(repo);
    if (!slug) return { ok: false, reason: "bad-repo" };
    const token = readGithubToken();
    if (!token) return { ok: false, reason: "no-token" };
    try {
      const head = await ghApi(`https://api.github.com/repos/${slug}/pages`, { token });
      if (head.ok) return { ok: true, already: true };
      if (head.status !== 404) {
        return { ok: false, reason: "http-" + head.status, detail: String(head.text || "").slice(0, 200) };
      }
      const body = JSON.stringify({ build_type: "workflow" });
      const res = await ghApi(`https://api.github.com/repos/${slug}/pages`, { method: "POST", token, body });
      if (res.ok || res.status === 201) return { ok: true, created: true, via: res.via };
      if (res.status === 409) return { ok: true, already: true };
      return { ok: false, reason: "http-" + res.status, detail: String(res.text || "").slice(0, 200) };
    } catch (e) {
      return { ok: false, reason: "network", detail: String(e.message || e).slice(0, 200) };
    }
  }
  function pickFolder(langOfReq = "zh") {
    const ps = import_node_path.default.join(process.env.WINDIR || "C:\\Windows", "System32", "WindowsPowerShell", "v1.0", "powershell.exe");
    if (!import_node_fs.default.existsSync(ps)) return null;
    const outFile = import_node_path.default.join(import_node_os.default.tmpdir(), `mgr-picked-${process.pid}-${Date.now()}.txt`);
    const script = [
      // ① 控制台输出改 UTF-8，避免中文路径被 GBK 破坏
      "[Console]::OutputEncoding = [System.Text.Encoding]::UTF8",
      "Add-Type -AssemblyName System.Windows.Forms | Out-Null",
      "$d = New-Object System.Windows.Forms.FolderBrowserDialog",
      `$d.Description = ${JSON.stringify(sm(langOfReq, "pickDesc"))}`,
      "$d.ShowNewFolderButton = $false",
      // ⚠️ 只给「托底窗体」$f 设 TopMost 是**没用的**：ShowDialog($f) 弹出的文件夹对话框
      // 是另一个顶层窗口（类名 #32770，属于 shell），不继承 $f 的 TopMost。
      // Edge 全屏时会把对话框整个盖住 —— 对话框其实已创建、Win32 层面 IsWindowVisible
      // 也是 true，但用户完全看不见，界面表现为「点了选择文件夹就卡死」，HTTP 请求一直挂着。
      //
      // 而且要拿到它的句柄也不容易（实测都不可用）：
      //   [System.Diagnostics.Process]::GetCurrentProcess().MainWindowHandle → 0
      //   (Get-Process -Id $PID).MainWindowHandle                          → 0
      //   $d.Handle                                                         → 空
      // 唯一可行：EnumWindows 按「本进程 + 可见 + 类名 #32770」找出来，再 SetWindowPos 置顶。
      "$f = New-Object System.Windows.Forms.Form",
      "$f.TopMost = $true",
      "$f.ShowInTaskbar = $false",
      'Add-Type @"',
      "using System; using System.Text; using System.Runtime.InteropServices;",
      "public class PickWin {",
      '  [DllImport("user32.dll")] public static extern bool EnumWindows(Cb cb, IntPtr p);',
      '  [DllImport("user32.dll", CharSet=CharSet.Auto)] public static extern int GetClassName(IntPtr h, StringBuilder s, int n);',
      '  [DllImport("user32.dll")] public static extern bool IsWindowVisible(IntPtr h);',
      '  [DllImport("user32.dll")] public static extern uint GetWindowThreadProcessId(IntPtr h, out uint pid);',
      '  [DllImport("user32.dll", SetLastError=true)] public static extern bool SetWindowPos(IntPtr h, IntPtr a, int x,int y,int cx,int cy, uint f);',
      '  [DllImport("user32.dll")] public static extern bool SetForegroundWindow(IntPtr h);',
      '  [DllImport("user32.dll")] public static extern bool BringWindowToTop(IntPtr h);',
      "  public delegate bool Cb(IntPtr h, IntPtr p);",
      "  public static bool Raise(uint myPid) {",
      "    bool done = false;",
      "    EnumWindows((h, p) => {",
      "      uint pid; GetWindowThreadProcessId(h, out pid);",
      "      if (pid != myPid || !IsWindowVisible(h)) return true;",
      "      var c = new StringBuilder(64); GetClassName(h, c, 64);",
      '      if (c.ToString() != "#32770") return true;',
      "      SetWindowPos(h, (IntPtr)(-1), 0, 0, 0, 0, 0x0003);",
      "      BringWindowToTop(h);",
      "      SetForegroundWindow(h);",
      "      done = true;",
      "      return true;",
      "    }, IntPtr.Zero);",
      "    return done;",
      "  }",
      "}",
      '"@',
      // ShowDialog 是模态阻塞的，只能在它弹出后用定时器把对话框顶到最前；
      // 重试几次是因为 shell 对话框的创建比 ShowDialog 返回要早一点。
      "$timer = New-Object System.Windows.Forms.Timer",
      "$timer.Interval = 200",
      "$tries = 0",
      "$timer.Add_Tick({",
      "  $tries++",
      "  if ($tries -gt 15) { $timer.Stop(); return }",
      "  try {",
      "    if ([PickWin]::Raise([uint32]$PID)) { $timer.Stop() }",
      "  } catch { }",
      "})",
      "$timer.Start()",
      "$ok = ($d.ShowDialog($f) -eq [System.Windows.Forms.DialogResult]::OK)",
      "$timer.Stop()",
      "$timer.Dispose()",
      "if ($ok) {",
      "  $p = $d.SelectedPath",
      `  [System.IO.File]::WriteAllText(${JSON.stringify(outFile)}, $p, (New-Object System.Text.UTF8Encoding($false)))`,
      "  [Console]::Out.Write($p)",
      "}",
      "$f.Dispose()"
    ].join("\n");
    try {
      const r = (0, import_node_child_process.spawnSync)(ps, ["-NoProfile", "-STA", "-Command", script], {
        encoding: "utf8",
        stdio: ["ignore", "pipe", "pipe"],
        timeout: 3e5,
        windowsHide: true
      });
      if (r.error) {
        console.log(`[manager] pick folder failed: ${r.error.message}`);
        return null;
      }
      if (import_node_fs.default.existsSync(outFile)) {
        const fromFile = import_node_fs.default.readFileSync(outFile, "utf8").trim();
        if (fromFile) return normalizePickedPath(fromFile);
      }
      const picked = (r.stdout || "").trim();
      return picked ? normalizePickedPath(picked) : null;
    } finally {
      try {
        if (import_node_fs.default.existsSync(outFile)) import_node_fs.default.unlinkSync(outFile);
      } catch {
      }
    }
  }
  function normalizePickedPath(p) {
    let s = String(p).trim().replace(/^"(.*)"$/, "$1").replace(/\//g, "\\");
    if (s.length > 3 && s.endsWith("\\")) s = s.replace(/\\+$/, "");
    return s;
  }
  function vaultState(vaultPath) {
    const files = walkFiles(vaultPath, vaultPath);
    const notes = [];
    const assetIndex = /* @__PURE__ */ new Map();
    for (const { rel, abs } of files) {
      if (isMarkdown(rel)) {
        const raw = import_node_fs.default.readFileSync(abs, "utf8");
        let title = basenameTitle(rel);
        let pub = false;
        try {
          const m = (0, import_gray_matter.default)(raw);
          if (typeof m.data.title === "string" && m.data.title.trim()) title = m.data.title.trim();
          pub = m.data.public === true;
        } catch {
        }
        notes.push({ path: rel, title, isPublic: pub });
      } else if (assetOf(rel)) {
        assetIndex.set(rel, abs);
        const base = rel.split("/").pop();
        if (!assetIndex.has(base)) assetIndex.set(base, rel);
      }
    }
    notes.sort((a, b) => a.path < b.path ? -1 : 1);
    return { notes, assetIndex };
  }
  const basenameTitle = (rel) => rel.replace(/\.(md|markdown)$/i, "").split("/").pop();
  function setPublic(vaultPath, rel, pub) {
    const base = import_node_path.default.resolve(vaultPath);
    const abs = import_node_path.default.resolve(base, rel);
    if (abs !== base && !abs.startsWith(base + import_node_path.default.sep)) throw new Error("errPathEscaped");
    const raw = import_node_fs.default.readFileSync(abs, "utf8");
    let parsed;
    try {
      parsed = (0, import_gray_matter.default)(raw);
    } catch {
      parsed = { data: {}, content: raw };
    }
    const hadFrontmatter = Object.keys(parsed.data).length > 0;
    const data = { ...parsed.data };
    if (pub) data.public = true;
    else delete data.public;
    if (!pub && !hadFrontmatter) return;
    const next = import_gray_matter.default.stringify(parsed.content, data);
    if (next !== raw) import_node_fs.default.writeFileSync(abs, next);
  }
  function watermarkOf(workdir, mark) {
    if (mark && Number.isFinite(mark.at)) return mark.at;
    try {
      return import_node_fs.default.statSync(import_node_path.default.join(workdir, "content", ".blog-meta.json")).mtimeMs;
    } catch {
      return 0;
    }
  }
  function diffVault(vaultPath, workdir, mark) {
    const added = [];
    const modified = [];
    const deleted = [];
    if (!workdir) return { added, modified, deleted };
    const contentDir = import_node_path.default.join(workdir, "content");
    const published = /* @__PURE__ */ new Map();
    if (import_node_fs.default.existsSync(contentDir)) {
      for (const { rel, abs } of walkFiles(contentDir, contentDir)) {
        if (!isMarkdown(rel)) continue;
        try {
          published.set(normalize(rel), import_node_fs.default.readFileSync(abs, "utf8"));
        } catch {
        }
      }
    }
    const since = watermarkOf(workdir, mark);
    const acked = new Set((mark && mark.ackedDeleted || []).map((r) => normalize(String(r))));
    const everPublished = new Set((mark && mark.paths || []).map((r) => normalize(String(r))));
    if (everPublished.size === 0) {
      try {
        const meta = JSON.parse(import_node_fs.default.readFileSync(import_node_path.default.join(contentDir, ".blog-meta.json"), "utf8"));
        const keys = meta && meta.notes && typeof meta.notes === "object" ? Object.keys(meta.notes) : [];
        for (const k of keys) everPublished.add(normalize(k));
      } catch {
      }
    }
    const localRels = /* @__PURE__ */ new Set();
    for (const n of vaultState(vaultPath).notes) {
      const rel = normalize(n.path);
      localRels.add(rel);
      if (!published.has(rel)) {
        if (!n.isPublic && everPublished.has(rel)) continue;
        let mt = 0;
        try {
          mt = import_node_fs.default.statSync(import_node_path.default.join(vaultPath, n.path)).mtimeMs;
        } catch {
          mt = 0;
        }
        if (since > 0) {
          if (mt <= since) continue;
        } else if (!n.isPublic) {
          continue;
        }
        added.push(n.path);
        continue;
      }
      if (!n.isPublic) {
        if (!acked.has(rel)) deleted.push(n.path);
        continue;
      }
      let cur = "";
      try {
        cur = import_node_fs.default.readFileSync(import_node_path.default.join(vaultPath, n.path), "utf8");
      } catch {
        continue;
      }
      if (published.get(rel) !== cur) modified.push(n.path);
    }
    for (const rel of published.keys()) if (!localRels.has(rel) && !acked.has(rel)) deleted.push(rel);
    return { added, modified, deleted };
  }
  const AUTO_SYNC_DEFAULT = { added: false, modified: true, deleted: false };
  function loadAutoSync() {
    const local = loadLocal();
    const a = local.autoSync && typeof local.autoSync === "object" ? local.autoSync : {};
    return {
      added: a.added === true,
      modified: a.modified === void 0 ? AUTO_SYNC_DEFAULT.modified : a.modified === true,
      deleted: a.deleted === true
    };
  }
  function saveAutoSync(next) {
    const local = loadLocal();
    local.autoSync = { added: next.added === true, modified: next.modified === true, deleted: next.deleted === true };
    saveLocal(local);
    return local.autoSync;
  }
  function preflightRemote(repo) {
    if (!repo) return { ok: true };
    const token = readGithubToken();
    const looksGithub = /github[.]com/i.test(repo);
    const pre = ["-c", "credential.interactive=false"];
    if (token && looksGithub) {
      const basic = Buffer.from("x-access-token:" + token).toString("base64");
      pre.push("-c", "http.extraHeader=Authorization: Basic " + basic);
    }
    const started = Date.now();
    const r = (0, import_node_child_process.spawnSync)("git", [...pre, "ls-remote", "--heads", repo], {
      encoding: "utf8",
      stdio: ["ignore", "pipe", "pipe"],
      timeout: 12e3,
      windowsHide: true,
      // 同 git()：加速器的 MITM 证书会卡在吊销检查，有令牌时跳过（见 git() 注释 ③）
      env: {
        ...process.env,
        GIT_TERMINAL_PROMPT: "0",
        ...token && looksGithub ? { GIT_SSL_NO_VERIFY: "1" } : null
      }
    });
    if (r.status === 0) return { ok: true };
    const detail = ((r.stderr || "") + (r.stdout || "")).trim().slice(0, 300);
    const networkish = /Could not connect|Failed to connect|unable to access|Connection was reset|timed out|Could not resolve|SSL|TLS/i.test(detail);
    return { ok: false, network: networkish, elapsed: Date.now() - started, detail };
  }
  async function publish(conn, vaultPath, workdir, lang = "zh", opts2 = {}) {
    const msg2 = (key, ...args) => sm(lang, key, ...args);
    const log2 = [];
    const startedAt = Date.now();
    let failed = false;
    let pushed = false;
    let failKind = null;
    const content = import_node_path.default.join(workdir, "content");
    import_node_fs.default.mkdirSync(content, { recursive: true });
    const { notes, assetIndex } = vaultState(vaultPath);
    const publicNotes = notes.filter((n) => n.isPublic);
    const keep = /* @__PURE__ */ new Set();
    const noteTimes = {};
    let copied = 0;
    let updated = 0;
    for (const n of publicNotes) {
      const src = import_node_path.default.join(vaultPath, n.path);
      const dst = import_node_path.default.join(content, n.path);
      import_node_fs.default.mkdirSync(import_node_path.default.dirname(dst), { recursive: true });
      const same = import_node_fs.default.existsSync(dst) && import_node_fs.default.readFileSync(dst, "utf8") === import_node_fs.default.readFileSync(src, "utf8");
      import_node_fs.default.copyFileSync(src, dst);
      try {
        const st = import_node_fs.default.statSync(src);
        noteTimes[normalize(n.path)] = {
          mtime: st.mtime.toISOString(),
          btime: st.birthtime && st.birthtime.getTime() > 0 ? st.birthtime.toISOString() : null
        };
      } catch {
      }
      keep.add(normalize(n.path));
      if (!same) updated++;
      const raw = import_node_fs.default.readFileSync(src, "utf8");
      for (const m of raw.matchAll(/\[\[([^\]|]+?\.(?:png|jpg|jpeg|gif|svg|webp|mp3|mp4|pdf))\]\]/gi)) {
        const ref = m[1].trim();
        const rel = assetIndex.get(ref) || assetIndex.get(ref.split("/").pop()) || null;
        if (rel) keep.add(normalize(rel));
      }
      for (const m of raw.matchAll(/!\[[^\]]*\]\(([^)\s]+)\)/g)) {
        try {
          const ref = normalize(decodeURIComponent(m[1]));
          if (assetIndex.has(ref)) keep.add(ref);
        } catch {
        }
      }
    }
    for (const rel of keep) {
      if (isMarkdown(rel)) continue;
      const src = import_node_path.default.join(vaultPath, rel);
      const dst = import_node_path.default.join(content, rel);
      if (!import_node_fs.default.existsSync(src)) continue;
      import_node_fs.default.mkdirSync(import_node_path.default.dirname(dst), { recursive: true });
      const same = import_node_fs.default.existsSync(dst) && Buffer.compare(import_node_fs.default.readFileSync(dst), import_node_fs.default.readFileSync(src)) === 0;
      import_node_fs.default.copyFileSync(src, dst);
      if (!same) copied++;
    }
    let removed = 0;
    function walkContent(dir) {
      let out = [];
      let entries;
      try {
        entries = import_node_fs.default.readdirSync(dir, { withFileTypes: true });
      } catch {
        return out;
      }
      for (const e of entries) {
        const abs = import_node_path.default.join(dir, e.name);
        if (e.isDirectory()) out.push(...walkContent(abs));
        else out.push({ abs, rel: import_node_path.default.relative(content, abs).replace(/\\/g, "/") });
      }
      return out;
    }
    for (const { abs, rel } of walkContent(content)) {
      if (keep.has(rel)) continue;
      if (rel === ".blog-meta.json") continue;
      if (opts2.skipDelete) continue;
      import_node_fs.default.rmSync(abs);
      removed++;
    }
    function pruneEmpty(dir) {
      for (const e of import_node_fs.default.readdirSync(dir, { withFileTypes: true })) {
        const abs = import_node_path.default.join(dir, e.name);
        if (e.isDirectory()) {
          pruneEmpty(abs);
          try {
            import_node_fs.default.rmdirSync(abs);
          } catch {
          }
        }
      }
    }
    pruneEmpty(content);
    try {
      let merged = noteTimes;
      const metaFile = import_node_path.default.join(content, ".blog-meta.json");
      if (opts2.skipDelete && import_node_fs.default.existsSync(metaFile)) {
        try {
          const prev = JSON.parse(import_node_fs.default.readFileSync(metaFile, "utf8"));
          const prevNotes = prev && prev.notes && typeof prev.notes === "object" ? prev.notes : {};
          merged = { ...prevNotes, ...noteTimes };
          for (const rel of Object.keys(merged)) {
            if (!import_node_fs.default.existsSync(import_node_path.default.join(content, rel))) delete merged[rel];
          }
        } catch {
        }
      }
      import_node_fs.default.writeFileSync(
        metaFile,
        JSON.stringify({ version: 1, generatedAt: (/* @__PURE__ */ new Date()).toISOString(), notes: merged }, null, 2),
        "utf8"
      );
    } catch (e) {
      log2.push(`[meta] \u65F6\u95F4\u6E05\u5355\u5199\u5165\u5931\u8D25\uFF1A${e.message}`);
    }
    log2.push(msg2("logPublic", publicNotes.length, updated + copied, removed));
    const siteNameFile = import_node_path.default.join(workdir, "site-name.txt");
    const wantName = String(conn.name || "").trim();
    const prevName = import_node_fs.default.existsSync(siteNameFile) ? import_node_fs.default.readFileSync(siteNameFile, "utf8").trim() : "";
    if (wantName && prevName !== wantName) {
      import_node_fs.default.writeFileSync(siteNameFile, wantName + "\n", "utf8");
      log2.push(msg2("logSiteName", prevName, wantName));
    }
    const gitRes = await gitCommitPush(conn, workdir, lang, msg2("commitMsg") + (/* @__PURE__ */ new Date()).toISOString().slice(0, 16).replace("T", " "), log2);
    failed = gitRes.failed;
    pushed = gitRes.pushed;
    failKind = gitRes.failKind;
    if (!failed) {
      let ackedDeleted = [];
      try {
        ackedDeleted = diffVault(vaultPath, workdir, null).deleted.map((r) => normalize(r));
      } catch {
        ackedDeleted = [];
      }
      let paths = [];
      try {
        const prev = loadPublishMark(conn.id);
        const set = new Set((prev && prev.paths || []).map((r) => normalize(String(r))));
        for (const n of publicNotes) set.add(normalize(n.path));
        paths = [...set];
      } catch {
        paths = publicNotes.map((n) => normalize(n.path));
      }
      try {
        savePublishMark(conn.id, { at: startedAt, ackedDeleted, paths });
      } catch {
      }
    }
    return { log: log2, failed, pushed, failKind, commit: gitRes.commit || "" };
  }
  async function gitCommitPush(conn, workdir, lang, commitMsg, log2) {
    const msg2 = (key, ...args) => sm(lang, key, ...args);
    let failed = false;
    let pushed = false;
    let failKind = null;
    try {
      try {
        git(["config", "user.email"], workdir);
      } catch {
        git(["config", "user.email", "manager@local"], workdir);
        git(["config", "user.name", msg2("gitUserName")], workdir);
      }
      git(["add", "-A"], workdir);
      const status = git(["status", "--porcelain"], workdir);
      if (!status) {
        log2.push(msg2("logFresh"));
      } else {
        git(["commit", "-m", commitMsg], workdir);
        const pre = preflightRemote(conn.repo);
        if (!pre.ok) {
          if (pre.network) failKind = "network";
          const le = new Error(localizeRaw(lang, pre.detail || "unreachable"));
          le.localized = true;
          throw le;
        }
        const branch = conn.branch || "main";
        try {
          git(["pull", "--rebase", "--autostash", "--allow-unrelated-histories", "origin", branch], workdir);
        } catch (pullErr) {
          try {
            git(["rebase", "--abort"], workdir);
          } catch {
          }
          let remoteHas = "";
          try {
            remoteHas = git(["ls-remote", "--heads", "origin", branch], workdir);
          } catch {
            remoteHas = "unknown";
          }
          if (remoteHas.trim()) {
            const le = new Error(localizeRaw(lang, String(pullErr && pullErr.message || pullErr).slice(0, 300)));
            le.localized = true;
            throw le;
          }
        }
        try {
          git(["push", "origin", "HEAD"], workdir);
        } catch (e) {
          const text = String(e && e.message || e);
          if (/Could not connect|Failed to connect|unable to access|Connection was reset|timed out|SSL/i.test(text)) {
            failKind = "network";
          }
          throw e;
        }
        pushed = true;
        log2.push(msg2("logPushed"));
      }
      if (pushed) {
        const pg = await ensurePages(conn.repo);
        if (pg.ok && pg.created) log2.push(msg2("logPagesOn"));
        else if (!pg.ok) log2.push(msg2("logPagesFail") + localizeReason(lang, pg.reason || "") + (lang === "zh" ? "\uFF09" : ")"));
      }
    } catch (e) {
      failed = true;
      const rawMsg = String(e && e.message || e);
      log2.push(msg2("logGitFail") + (e && e.localized ? rawMsg : localizeRaw(lang, rawMsg.slice(0, 300))));
    }
    let commit = "";
    try {
      commit = git(["rev-parse", "HEAD"], workdir).trim();
    } catch {
    }
    return { failed, pushed, failKind, commit };
  }
  async function publishThemeOnly(conn, workdir, lang, bytes) {
    const msg2 = (key, ...args) => sm(lang, key, ...args);
    const log2 = [];
    const rel = "public/theme.css";
    let failed = false;
    let pushed = false;
    let failKind = null;
    try {
      try {
        git(["config", "user.email"], workdir);
      } catch {
        git(["config", "user.email", "manager@local"], workdir);
        git(["config", "user.name", msg2("gitUserName")], workdir);
      }
      const dirty = git(["status", "--porcelain"], workdir).split("\n").map((l) => l.slice(3).trim()).filter(Boolean).filter((p) => p !== rel && !p.startsWith("public/theme.css"));
      if (dirty.length > 0) {
        log2.push(msg2("logThemeOtherDirty", dirty.length));
      }
      git(["add", "--", rel], workdir);
      const staged = git(["diff", "--cached", "--name-only"], workdir).trim();
      if (!staged) {
        log2.push(msg2("logThemeNoChange"));
      } else {
        git(["commit", "-m", msg2("commitThemeMsg")], workdir);
        const pre = preflightRemote(conn.repo);
        if (!pre.ok) {
          if (pre.network) failKind = "network";
          const le = new Error(localizeRaw(lang, pre.detail || "unreachable"));
          le.localized = true;
          throw le;
        }
        const branch = conn.branch || "main";
        try {
          git(["pull", "--rebase", "--autostash", "--allow-unrelated-histories", "origin", branch], workdir);
        } catch (pullErr) {
          try {
            git(["rebase", "--abort"], workdir);
          } catch {
          }
          let remoteHas = "";
          try {
            remoteHas = git(["ls-remote", "--heads", "origin", branch], workdir);
          } catch {
            remoteHas = "unknown";
          }
          if (remoteHas.trim()) {
            const le = new Error(localizeRaw(lang, String(pullErr && pullErr.message || pullErr).slice(0, 300)));
            le.localized = true;
            throw le;
          }
        }
        try {
          git(["push", "origin", "HEAD"], workdir);
        } catch (e) {
          const text = String(e && e.message || e);
          if (/Could not connect|Failed to connect|unable to access|Connection was reset|timed out|SSL/i.test(text)) {
            failKind = "network";
          }
          throw e;
        }
        pushed = true;
        log2.push(msg2("logThemePushed", bytes));
      }
      if (pushed) {
        const pg = await ensurePages(conn.repo);
        if (pg.ok && pg.created) log2.push(msg2("logPagesOn"));
        else if (!pg.ok) log2.push(msg2("logPagesFail") + localizeReason(lang, pg.reason || "") + (lang === "zh" ? "\uFF09" : ")"));
      }
    } catch (e) {
      failed = true;
      const rawMsg = String(e && e.message || e);
      log2.push(msg2("logGitFail") + (e && e.localized ? rawMsg : localizeRaw(lang, rawMsg.slice(0, 300))));
    }
    let commit = "";
    try {
      commit = git(["rev-parse", "HEAD"], workdir).trim();
    } catch {
    }
    return { failed, pushed, failKind, commit, log: log2 };
  }
  async function updateSource(conn, workdir, lang) {
    const msg2 = (key, ...args) => sm(lang, key, ...args);
    const log2 = [];
    initTemplate(workdir, true);
    log2.push(msg2("logSrcSynced"));
    const r = await gitCommitPush(conn, workdir, lang, msg2("commitSrcMsg") + (/* @__PURE__ */ new Date()).toISOString().slice(0, 16).replace("T", " "), log2);
    return { log: log2, failed: r.failed, pushed: r.pushed, failKind: r.failKind, commit: r.commit || "" };
  }
  const SMSG = {
    zh: {
      errNeedNameRepo: "\u540D\u79F0\u4E0E\u4ED3\u5E93\u5730\u5740\u5FC5\u586B",
      errNoConn: "\u8FDE\u63A5\u4E0D\u5B58\u5728",
      errNeedRepo: "\u8BF7\u586B\u5199 GitHub \u4ED3\u5E93\u5730\u5740",
      errBadVault: "\u8BF7\u9009\u62E9\u4E00\u4E2A\u6709\u6548\u7684\u5E93\uFF08\u9700\u5305\u542B .obsidian \u76EE\u5F55\uFF09",
      errPrepFail: "\u8FDE\u63A5\u5DF2\u4FDD\u5B58\uFF0C\u4F46\u4ED3\u5E93\u51C6\u5907\u5931\u8D25\uFF1A",
      errFirstConn: "\u8BF7\u5148\u521B\u5EFA\u4E00\u4E2A\u8FDE\u63A5\uFF0C\u518D\u8BBE\u7F6E\u672C\u5730\u5E93",
      errBadPath: "\u8DEF\u5F84\u65E0\u6548\uFF1A\u9700\u8981\u5305\u542B .obsidian \u76EE\u5F55\u7684\u5E93\u7EDD\u5BF9\u8DEF\u5F84",
      errEmptyName: "\u540D\u5B57\u4E0D\u80FD\u4E3A\u7A7A",
      errNoVault: "\u672C\u5730\u5E93\u672A\u914D\u7F6E",
      errBadVaultPath: "\u672C\u5730\u5E93\u8DEF\u5F84\u65E0\u6548",
      errWorkdirFail: "\u5DE5\u4F5C\u526F\u672C\u51C6\u5907\u5931\u8D25\uFF1A",
      errRepoUnreachable: "\u8FDE\u4E0D\u4E0A\u8FD9\u4E2A\u4ED3\u5E93\uFF08\u591A\u534A\u662F\u8FD8\u6CA1\u6388\u6743\u3001\u4ED3\u5E93\u4E0D\u5B58\u5728\uFF0C\u6216\u672C\u673A\u8FDE\u4E0D\u4E0A GitHub\uFF09\u3002",
      errCloneFail: "\u514B\u9686\u4ED3\u5E93\u5931\u8D25\uFF1A",
      errTokenShort: "\u4EE4\u724C\u592A\u77ED\uFF0C\u8BF7\u786E\u8BA4\u7C98\u8D34\u5B8C\u6574\uFF08\u4E0D\u542B\u7A7A\u683C\uFF09\u3002",
      errTokenRejected: "GitHub \u62D2\u7EDD\u4E86\u8FD9\u4E2A\u4EE4\u724C\uFF08\u65E0\u6548\u3001\u5DF2\u64A4\u9500\u6216\u6743\u9650\u4E0D\u8DB3\uFF09\u3002",
      errTokenNetwork: "\u65E0\u6CD5\u8FDE\u5230 GitHub \u9A8C\u8BC1\u4EE4\u724C\uFF08\u68C0\u67E5\u672C\u673A\u7F51\u7EDC/\u52A0\u901F\u5668\uFF09\u3002",
      errNoActive: "\u6CA1\u6709\u6D3B\u52A8\u8FDE\u63A5",
      errNeedRepoName: "\u8BF7\u586B\u5199\u4ED3\u5E93\u540D",
      errBadRepoName: "\u4ED3\u5E93\u540D\u53EA\u80FD\u7528\u82F1\u6587\u5B57\u6BCD\u3001\u6570\u5B57\u3001\u70B9\u3001\u4E0B\u5212\u7EBF\u3001\u8FDE\u5B57\u7B26",
      errNoAuth: "\u8FD8\u6CA1\u6709 GitHub \u6388\u6743\u3002\u8BF7\u5148\u6309\u5F39\u7A97\u91CC\u7684\u8BF4\u660E\u5B8C\u6210\u6388\u6743\u3002",
      errRepoExists: (name) => `\u4ED3\u5E93\u300C${name}\u300D\u5DF2\u7ECF\u5B58\u5728\u4E86\u3002\u8BF7\u6362\u4E00\u4E2A\u540D\u5B57\uFF0C\u6216\u5207\u5230\u300C\u6211\u5DF2\u7ECF\u6709\u4ED3\u5E93\u4E86\u300D\u76F4\u63A5\u586B\u5B83\u7684\u5730\u5740\u3002`,
      errCreateRejected: "GitHub \u62D2\u7EDD\u4E86\u8FD9\u6B21\u521B\u5EFA\uFF1A",
      errCheckScope: "\u8BF7\u68C0\u67E5\u4EE4\u724C\u662F\u5426\u6709 repo \u6743\u9650",
      errBadAuth: "GitHub \u6388\u6743\u65E0\u6548\u6216\u6743\u9650\u4E0D\u8DB3\uFF08\u9700\u8981 repo \u6743\u9650\uFF09\u3002\u8BF7\u91CD\u65B0\u6388\u6743\u540E\u91CD\u8BD5\u3002",
      errCreateFail: (status) => `\u521B\u5EFA\u5931\u8D25\uFF08HTTP ${status}\uFF09\uFF1A`,
      errConnectFail: "\u8FDE\u63A5 GitHub \u5931\u8D25\uFF1A",
      errNoDir: "\u76EE\u5F55\u5DF2\u5B58\u5728\u4E14\u4E0D\u662F git \u4ED3\u5E93\uFF1A",
      errGitFail: (cmd) => `git ${cmd} \u5931\u8D25`,
      errPathEscaped: "\u8DEF\u5F84\u8D8A\u754C",
      errForbidden: "\u62D2\u7EDD\u8BBF\u95EE\uFF1A\u53EA\u63A5\u53D7\u672C\u673A\u9875\u9762\u7684\u8BF7\u6C42",
      errPublishing: "\u6B63\u5728\u53D1\u5E03\u4E2D\uFF0C\u8BF7\u7B49\u8FD9\u6B21\u7ED3\u675F\u518D\u8BD5",
      logPublic: (n, c, r) => `\u516C\u5F00\u7B14\u8BB0 ${n} \u7BC7\uFF1A\u65B0\u589E/\u66F4\u65B0 ${c}\uFF0C\u79FB\u9664\u8FC7\u671F ${r}`,
      logSiteName: (prev, want) => `\u5DF2\u66F4\u65B0\u7F51\u9875\u6807\u9898\u7684\u7AD9\u540D\uFF1A${prev ? "\u300C" + prev + "\u300D\u2192 " : ""}\u300C${want}\u300D`,
      logFresh: "\u7EBF\u4E0A\u5DF2\u662F\u6700\u65B0\uFF0C\u65E0\u9700\u63A8\u9001",
      logPushed: "\u5DF2\u63A8\u9001 GitHub\uFF0CActions \u6784\u5EFA\u4E2D\uFF081~2 \u5206\u949F\u540E\u7F51\u7AD9\u81EA\u52A8\u66F4\u65B0\uFF09",
      logGitFail: "git \u64CD\u4F5C\u5931\u8D25\uFF1A",
      logVarOk: (name) => `\u5DF2\u628A\u7AD9\u540D\u300C${name}\u300D\u5199\u5165\u4ED3\u5E93\u53D8\u91CF SITE_NAME\uFF08\u4E0B\u6B21\u6784\u5EFA\u751F\u6548\uFF09`,
      logVarNoToken: "\u7AD9\u540D\u540C\u6B65\u8DF3\u8FC7\uFF1A\u9700\u8981 GitHub \u6388\u6743\u624D\u80FD\u6539\u4ED3\u5E93\u53D8\u91CF\u3002\u53EF\u8BBE\u73AF\u5883\u53D8\u91CF GITHUB_TOKEN \u540E\u91CD\u8BD5\uFF0C\u6216\u7528 gh \u767B\u5F55\u3002",
      logVarBadRepo: "\u7AD9\u540D\u540C\u6B65\u8DF3\u8FC7\uFF1A\u4ED3\u5E93\u5730\u5740\u4E0D\u662F GitHub \u4ED3\u5E93\u3002",
      logVarFail: (reason, detail) => `\u7AD9\u540D\u540C\u6B65\u5931\u8D25\uFF08${reason}\uFF09\uFF1A${detail || ""}`,
      logPagesOn: "\u5DF2\u4E3A\u8FD9\u4E2A\u4ED3\u5E93\u542F\u7528 GitHub Pages",
      // 注意：这条后面会拼 localizeReason(lang, reason)，所以结尾的「）」由调用方那侧闭合。
      // 写成 '（xxx）' 的整句会让 reason 插到括号外面，句子读不通。
      logPagesFail: "\u672A\u80FD\u81EA\u52A8\u542F\u7528 GitHub Pages\uFF08",
      commitMsg: "\u53D1\u5E03\u66F4\u65B0 ",
      commitSrcMsg: "\u66F4\u65B0\u7AD9\u70B9\u6E90\u7801 ",
      logSrcSynced: "\u7AD9\u70B9\u6E90\u7801\u5DF2\u540C\u6B65\u5230\u5DE5\u4F5C\u526F\u672C",
      // ---- 自定义外观 ----
      errThemeType: "\u5916\u89C2\u5185\u5BB9\u5FC5\u987B\u662F\u6587\u672C\uFF08CSS\uFF09",
      errThemeTooBig: (bytes, max) => `\u5916\u89C2\u592A\u5927\uFF08${Math.round(bytes / 1024)}KB\uFF09\uFF0C\u4E0A\u9650 ${Math.round(max / 1024)}KB\u3002\u8BF7\u7CBE\u7B80\u540E\u518D\u4FDD\u5B58\u3002`,
      logThemeNoChange: "\u5916\u89C2\u6CA1\u6709\u53D8\u5316\uFF0C\u65E0\u9700\u63A8\u9001",
      logThemePushed: (bytes) => `\u81EA\u5B9A\u4E49\u5916\u89C2\u5DF2\u63A8\u9001\uFF08${Math.round(bytes / 1024) || 1}KB\uFF09\uFF0CGitHub Actions \u6784\u5EFA\u4E2D\uFF081~2 \u5206\u949F\u540E\u7F51\u7AD9\u81EA\u52A8\u66F4\u65B0\uFF09`,
      logThemeOtherDirty: (n) => `\u6CE8\u610F\uFF1A\u5DE5\u4F5C\u526F\u672C\u91CC\u8FD8\u6709 ${n} \u5904\u5176\u5B83\u6539\u52A8\u6CA1\u6709\u63D0\u4EA4\uFF0C\u672C\u6B21\u53EA\u63A8\u9001\u4E86\u5916\u89C2\u3002\u8981\u4E00\u5E76\u4E0A\u7EBF\u8BF7\u70B9\u300C\u53D1\u5E03\u300D\u6216\u300C\u66F4\u65B0\u6E90\u7801\u300D\u3002`,
      commitThemeMsg: "\u66F4\u65B0\u81EA\u5B9A\u4E49\u5916\u89C2 ",
      gitUserName: "\u53D1\u5E03\u7BA1\u7406\u5668",
      pickDesc: "\u9009\u62E9\u4F60\u7684 Obsidian \u5E93\u6587\u4EF6\u5939\uFF08\u91CC\u9762\u5E94\u6709 .obsidian \u76EE\u5F55\uFF09",
      // ---- 原始错误的本地化分类（git / 网络 / GitHub 响应本身都是英文的）----
      rawNetwork: "\u8FDE\u4E0D\u4E0A GitHub\uFF08\u591A\u534A\u662F\u52A0\u901F\u5668\u6CA1\u5F00\u6216\u6389\u4E86\uFF0C\u6216\u672C\u673A\u7F51\u7EDC\u4E0D\u901A\uFF09",
      rawAuth: "GitHub \u62D2\u7EDD\u4E86\u8FD9\u6B21\u8FDE\u63A5\uFF08\u4EE4\u724C\u65E0\u6548\u3001\u5DF2\u8FC7\u671F\u6216\u6743\u9650\u4E0D\u8DB3\uFF09",
      rawRepoNotFound: "GitHub \u4E0A\u627E\u4E0D\u5230\u8FD9\u4E2A\u4ED3\u5E93\uFF08\u5730\u5740\u5199\u9519\u3001\u4ED3\u5E93\u5DF2\u5220\u9664\uFF0C\u6216\u4EE4\u724C\u65E0\u6743\u8BBF\u95EE\uFF09",
      rawRejected: "\u8FDC\u7AEF\u62D2\u7EDD\u4E86\u8FD9\u6B21\u63A8\u9001\uFF08\u8FDC\u7AEF\u6709\u672C\u673A\u6CA1\u6709\u7684\u63D0\u4EA4\uFF0C\u5E38\u89C1\u4E8E\u6362\u53F0\u7535\u8111\u6539\u8FC7\uFF09",
      rawFileFail: "\u672C\u673A\u6587\u4EF6\u8BFB\u5199\u5931\u8D25\uFF08\u6587\u4EF6\u88AB\u5360\u7528\u3001\u8DEF\u5F84\u4E0D\u5B58\u5728\u6216\u6CA1\u6709\u6743\u9650\uFF09",
      rawGitFail: "git \u547D\u4EE4\u6267\u884C\u5931\u8D25",
      rawUnknown: "\u64CD\u4F5C\u5931\u8D25\uFF08\u8BE6\u7EC6\u4FE1\u606F\u5DF2\u5199\u5165\u7BA1\u7406\u5668\u63A7\u5236\u53F0\uFF09",
      reasonBadRepo: "\u4ED3\u5E93\u5730\u5740\u4E0D\u662F GitHub \u4ED3\u5E93",
      reasonNoToken: "\u7F3A\u5C11 GitHub \u6388\u6743",
      reasonHttp: (status) => `GitHub \u8FD4\u56DE HTTP ${status}`,
      reasonNetwork: "\u8FDE\u4E0D\u4E0A GitHub"
    },
    en: {
      errNeedNameRepo: "Name and repo URL are required",
      errNoConn: "Connection not found",
      errNeedRepo: "Enter the GitHub repo URL",
      errBadVault: "Pick a valid vault (it must contain a .obsidian folder)",
      errPrepFail: "Connection saved, but preparing the repo failed: ",
      errFirstConn: "Create a connection before setting a vault",
      errBadPath: "Invalid path: needs an absolute vault path containing a .obsidian folder",
      errEmptyName: "Name cannot be empty",
      errNoVault: "No local vault configured",
      errBadVaultPath: "Invalid local vault path",
      errWorkdirFail: "Failed to prepare the working copy: ",
      errRepoUnreachable: "Cannot reach that repo \u2014 most likely GitHub is not authorized yet, the repo does not exist, or this machine cannot reach GitHub.",
      errCloneFail: "Cloning the repo failed: ",
      errTokenShort: "The token looks too short. Paste it in full, without spaces.",
      errTokenRejected: "GitHub rejected this token (invalid, revoked, or missing scope).",
      errTokenNetwork: "Could not reach GitHub to verify the token (check your network / accelerator).",
      errNoActive: "No active connection",
      errNeedRepoName: "Enter a repo name",
      errBadRepoName: "Repo names allow only letters, digits, dot, underscore and hyphen",
      errNoAuth: "No GitHub authorization yet. Follow the instructions in the dialog first.",
      errRepoExists: (name) => `The repo "${name}" already exists. Pick another name, or paste its URL under \u201CI already have a repo\u201D.`,
      errCreateRejected: "GitHub rejected the request: ",
      errCheckScope: "Check that your token has the repo scope",
      errBadAuth: "GitHub authorization is invalid or lacks the repo scope. Re-authorize and retry.",
      errCreateFail: (status) => `Create failed (HTTP ${status}): `,
      errConnectFail: "Could not reach GitHub: ",
      errNoDir: "Directory exists but is not a git repo: ",
      errGitFail: (cmd) => `git ${cmd} failed`,
      errPathEscaped: "Path escapes the vault",
      errForbidden: "Forbidden: only local pages may send requests",
      errPublishing: "A publish is already running. Please wait for it to finish.",
      logPublic: (n, c, r) => `${n} public ${n === 1 ? "note" : "notes"}: ${c} added/updated, ${r} stale removed`,
      logSiteName: (prev, want) => `Site title updated: ${prev ? '"' + prev + '" \u2192 ' : ""}"${want}"`,
      logFresh: "Already up to date \u2014 nothing to push",
      logPushed: "Pushed to GitHub \u2014 Actions is building (the site updates in 1~2 minutes)",
      logGitFail: "git failed: ",
      logVarOk: (name) => `Set the site title "${name}" as the repo variable SITE_NAME (applies on next build)`,
      logVarNoToken: "Site title sync skipped: changing repo variables needs GitHub authorization. Set GITHUB_TOKEN and retry, or log in with gh.",
      logVarBadRepo: "Site title sync skipped: this repo is not on GitHub.",
      logVarFail: (reason, detail) => `Site title sync failed (${reason}): ${detail || ""}`,
      logPagesOn: "Enabled GitHub Pages for this repo",
      logPagesFail: "Could not enable GitHub Pages automatically (",
      commitMsg: "Publish update ",
      commitSrcMsg: "Update site source ",
      logSrcSynced: "Site source synced to the working copy",
      // ---- Custom appearance ----
      errThemeType: "Appearance must be text (CSS)",
      errThemeTooBig: (bytes, max) => `Appearance is too large (${Math.round(bytes / 1024)}KB); the limit is ${Math.round(max / 1024)}KB. Trim it and save again.`,
      logThemeNoChange: "Appearance unchanged \u2014 nothing to push",
      logThemePushed: (bytes) => `Custom appearance pushed (${Math.round(bytes / 1024) || 1}KB). GitHub Actions is building \u2014 the site updates in 1\u20132 minutes.`,
      logThemeOtherDirty: (n) => `Note: ${n} other change(s) in the working copy were not committed. Only the appearance was pushed. Use Publish or Update source to ship them.`,
      commitThemeMsg: "Update custom appearance ",
      gitUserName: "Publish Manager",
      pickDesc: "Choose your Obsidian vault folder (it should contain a .obsidian folder)",
      // ---- Localized buckets for raw errors (git / network / GitHub replies are English) ----
      rawNetwork: "Couldn't reach GitHub (the accelerator is probably off or dropped, or this machine has no network)",
      rawAuth: "GitHub refused this connection (token invalid, expired, or missing scope)",
      rawRepoNotFound: "That repo is not on GitHub (wrong URL, deleted, or your token cannot see it)",
      rawRejected: "The remote rejected this push (it has commits this machine does not \u2014 common after working on another computer)",
      rawFileFail: "Could not read or write a file on this machine (it is in use, missing, or you lack permission)",
      rawGitFail: "A git command failed",
      rawUnknown: "The operation failed (details are in the manager console)",
      reasonBadRepo: "The repo URL is not a GitHub repo",
      reasonNoToken: "Missing GitHub authorization",
      reasonHttp: (status) => `GitHub returned HTTP ${status}`,
      reasonNetwork: "Couldn't reach GitHub"
    }
  };
  const langOf = (req) => String(req.headers["x-lang"] || "").toLowerCase().startsWith("en") ? "en" : "zh";
  function sm(lang, key, ...args) {
    const d = SMSG[lang] || SMSG.zh;
    const v = d[key] !== void 0 ? d[key] : SMSG.zh[key];
    return typeof v === "function" ? v(...args) : v;
  }
  function localizeRaw(lang, raw) {
    const s = String(raw || "").trim();
    if (!s) return "";
    if (/[\u4e00-\u9fff]/.test(s)) return s;
    const key = (() => {
      if (/Could not connect|Failed to connect|unable to access|Connection was reset|Could not resolve|timed out|SSL|TLS/i.test(s)) return "rawNetwork";
      if (/Authentication failed|could not read Username|Permission denied|Permission to|denied to|403|401/i.test(s)) return "rawAuth";
      if (/Repository not found|does not exist|not found/i.test(s)) return "rawRepoNotFound";
      if (/non-fast-forward|rejected|fetch first/i.test(s)) return "rawRejected";
      if (/^E[A-Z]{3,}:/i.test(s)) return "rawFileFail";
      if (/^git |git failed|fatal:/i.test(s)) return "rawGitFail";
      return "rawUnknown";
    })();
    console.error("[manager][raw] " + s);
    return sm(lang, key);
  }
  function localizeReason(lang, reason) {
    const r = String(reason || "");
    if (r === "no-token") return sm(lang, "reasonNoToken");
    if (r === "bad-repo") return sm(lang, "reasonBadRepo");
    if (r === "network") return sm(lang, "reasonNetwork");
    const m = r.match(/^http-(\d+)$/);
    if (m) return sm(lang, "reasonHttp", m[1]);
    return r;
  }
  const LOOPBACK = /^(127\.0\.0\.1|localhost|\[::1\])(:\d+)?$/i;
  let PUBLISHING = false;
  let STATE_REV = 1;
  const bumpRev = () => {
    STATE_REV += 1;
    return STATE_REV;
  };
  function localWriteAllowed(req) {
    if (!LOOPBACK.test(String(req.headers.host || ""))) return false;
    const origin = String(req.headers.origin || "");
    if (origin) {
      let ok = false;
      try {
        ok = LOOPBACK.test(new URL(origin).host);
      } catch {
        ok = false;
      }
      if (!ok) return false;
    }
    const ct = String(req.headers["content-type"] || "");
    if (ct && !/^application\/json\b/i.test(ct)) return false;
    return true;
  }
  function json(res, code, body) {
    res.writeHead(code, { "content-type": "application/json; charset=utf-8" });
    res.end(JSON.stringify(body));
  }
  const server = import_node_http.default.createServer(async (req, res) => {
    const url = req.url.split("?")[0];
    let body = "";
    if (req.method === "POST") for await (const c of req) body += c;
    if (req.method === "POST" && !localWriteAllowed(req)) {
      json(res, 403, { error: sm(langOf(req), "errForbidden") });
      return;
    }
    try {
      if (req.method === "GET" && (url === "/" || url.startsWith("/?"))) {
        res.writeHead(200, { "content-type": "text/html; charset=utf-8" });
        res.end(
          UI.replace('"__THEME_PRESETS__"', () => JSON.stringify(THEME_PRESETS)).replace('"__THEME_PREVIEW_IDS__"', () => JSON.stringify(Object.keys(THEME_PREVIEWS))).replace('"__THEME_PREVIEW_VER__"', () => JSON.stringify(THEME_PREVIEW_VERSION))
        );
        return;
      }
      const mPv = /^\/preset-preview\/([\w-]+)\.png$/.exec(url);
      if (req.method === "GET" && mPv) {
        const b64 = THEME_PREVIEWS[mPv[1]];
        if (!b64) {
          res.writeHead(404);
          res.end();
          return;
        }
        const buf = Buffer.from(b64, "base64");
        res.writeHead(200, {
          "content-type": "image/png",
          "content-length": buf.length,
          // 预览图跟着插件版本走，一个版本内不会变，可以放心让浏览器缓存
          "cache-control": "public, max-age=86400"
        });
        res.end(buf);
        return;
      }
      const { connections, conn, vaultPath, workdir, local } = activeConfig();
      if (req.method === "GET" && url === "/api/rev") {
        res.writeHead(200, {
          "content-type": "application/json; charset=utf-8",
          "cache-control": "no-store"
        });
        res.end(JSON.stringify({ rev: STATE_REV }));
        return;
      }
      if (req.method === "GET" && url === "/api/state") {
        let vaultOk = false;
        let notes = [];
        let changes = { added: [], modified: [], deleted: [] };
        if (conn && validVault(vaultPath)) {
          vaultOk = true;
          notes = vaultState(vaultPath).notes;
          if (workdir && import_node_fs.default.existsSync(import_node_path.default.join(workdir, "content"))) {
            changes = recordChanges(conn.id, diffVault(vaultPath, workdir, loadPublishMark(conn.id)));
          }
        }
        const list = connections.map((c) => {
          const vp = local.vaultPaths?.[c.id] ?? "";
          const ok = validVault(vp);
          return {
            id: c.id,
            name: c.name,
            repo: c.repo,
            branch: c.branch,
            siteUrl: siteUrlOf(c.repo),
            vaultPath: vp,
            vaultOk: ok,
            noteCount: ok ? vaultState(vp).notes.length : 0,
            publicCount: ok ? vaultState(vp).notes.filter((n) => n.isPublic).length : 0
          };
        });
        json(res, 200, {
          rev: STATE_REV,
          connections: list,
          active: conn ? conn.id : null,
          vaultPath,
          vaultOk,
          notes,
          changes,
          autoSync: loadAutoSync(),
          autoLog: conn ? loadAutoLog(conn.id) : []
        });
        return;
      }
      if (req.method === "POST" && url === "/api/autosync") {
        const { type, value } = JSON.parse(body);
        if (!["added", "modified", "deleted"].includes(type)) return json(res, 400, { error: "badType" });
        const cur = loadAutoSync();
        cur[type] = value === true;
        const saved = saveAutoSync(cur);
        restartWatcher();
        bumpRev();
        json(res, 200, { autoSync: saved });
        return;
      }
      if (req.method === "POST" && url === "/api/autolog/clear") {
        const c = activeConfig().conn;
        if (!c) return json(res, 400, { error: "noConn" });
        try {
          clearAutoLog(c.id);
        } catch (e) {
          return json(res, 500, { error: String(e && e.message || e) });
        }
        json(res, 200, { ok: true, autoLog: [] });
        return;
      }
      if (req.method === "POST" && url === "/api/connection/create") {
        const { name, repo, branch, initFromTemplate } = JSON.parse(body);
        const cleanName = String(name ?? "").trim();
        const cleanRepo = String(repo ?? "").trim();
        if (!cleanName || !cleanRepo) return json(res, 400, { error: sm(langOf(req), "errNeedNameRepo") });
        const id = "c" + Date.now().toString(36);
        const conn2 = { id, name: cleanName, repo: cleanRepo, branch: (branch || "main").trim() || "main" };
        connections.push(conn2);
        saveConnections(connections);
        const local2 = loadLocal();
        local2.active = id;
        saveLocal(local2);
        if (initFromTemplate) {
          const prep = prepareWorkdir(conn2, true);
          if (prep && (prep.errKey || prep.error)) {
            return json(res, 400, {
              ok: false,
              error: sm(langOf(req), prep.errKey || "errCloneFail"),
              needAuth: prep.errKey === "errRepoUnreachable"
            });
          }
        }
        json(res, 200, { ok: true, id });
        return;
      }
      if (req.method === "POST" && url === "/api/connection/switch") {
        const { id } = JSON.parse(body);
        const local2 = loadLocal();
        if (!connections.find((c) => c.id === id)) return json(res, 404, { error: sm(langOf(req), "errNoConn") });
        local2.active = id;
        saveLocal(local2);
        json(res, 200, { ok: true });
        return;
      }
      if (req.method === "POST" && url === "/api/browse") {
        const picked = pickFolder(langOf(req));
        json(res, 200, { path: picked });
        return;
      }
      if (req.method === "POST" && url === "/api/connection/setup") {
        const { name, repo, branch, vaultPath: vp, initFromTemplate } = JSON.parse(body);
        if (!repo || !String(repo).trim()) return json(res, 400, { error: sm(langOf(req), "errNeedRepo") });
        if (!validVault(vp)) return json(res, 400, { error: sm(langOf(req), "errBadVault") });
        const b = (branch || "main").trim() || "main";
        const id = "c" + Date.now().toString(36);
        const c = { id, name: (name || import_node_path.default.basename(vp) || "\u6211\u7684\u535A\u5BA2").trim(), repo: String(repo).trim(), branch: b };
        let prep = null;
        if (initFromTemplate) {
          prep = prepareWorkdir(c, true);
          if (prep.errKey) {
            const extra = prep.errArg && prep.errKey === "errNoDir" ? String(prep.errArg).slice(0, 160) : "";
            console.error("[manager][raw] " + String(prep.errArg || ""));
            return json(res, 400, {
              error: sm(langOf(req), prep.errKey) + extra,
              needAuth: prep.errKey === "errRepoUnreachable"
            });
          }
        }
        connections.push(c);
        saveConnections(connections);
        const loc = loadLocal();
        loc.vaultPaths = loc.vaultPaths || {};
        loc.vaultPaths[id] = import_node_path.default.normalize(vp);
        loc.active = id;
        saveLocal(loc);
        let warn = null;
        if (prep && prep.initialized) {
          warn = null;
        }
        json(res, 200, { ok: true, id, warn });
        return;
      }
      if (req.method === "POST" && url === "/api/connection/remove") {
        const { id } = JSON.parse(body);
        const idx = connections.findIndex((c) => c.id === id);
        if (idx < 0) return json(res, 404, { error: sm(langOf(req), "errNoConn") });
        const [removedConn] = connections.splice(idx, 1);
        saveConnections(connections);
        const loc = loadLocal();
        if (loc.vaultPaths) delete loc.vaultPaths[id];
        if (loc.active === id) loc.active = connections[0]?.id ?? null;
        saveLocal(loc);
        try {
          import_node_fs.default.rmSync(import_node_path.default.join(DATA_DIR, "repos", id), { recursive: true, force: true });
        } catch {
        }
        json(res, 200, { ok: true, removed: removedConn.name });
        return;
      }
      if (req.method === "POST" && url === "/api/connection/vault") {
        const { vaultPath: vp, id } = JSON.parse(body);
        const target = id ? connections.find((c) => c.id === id) : conn;
        if (!target) return json(res, 400, { error: sm(langOf(req), "errFirstConn") });
        if (!validVault(vp)) return json(res, 400, { error: sm(langOf(req), "errBadPath") });
        const local2 = loadLocal();
        local2.vaultPaths = local2.vaultPaths || {};
        local2.vaultPaths[target.id] = import_node_path.default.normalize(vp);
        saveLocal(local2);
        json(res, 200, { ok: true });
        return;
      }
      if (req.method === "POST" && url === "/api/connection/rename") {
        const { id, name } = JSON.parse(body);
        const target = connections.find((c) => c.id === id);
        if (!target) return json(res, 404, { error: sm(langOf(req), "errNoConn") });
        if (!name || !String(name).trim()) return json(res, 400, { error: sm(langOf(req), "errEmptyName") });
        target.name = String(name).trim();
        saveConnections(connections);
        json(res, 200, { ok: true });
        return;
      }
      if (req.method === "POST" && url === "/api/toggle") {
        const { path: p, pub } = JSON.parse(body);
        if (!validVault(vaultPath)) return json(res, 400, { error: sm(langOf(req), "errNoVault") });
        setPublic(vaultPath, p, !!pub);
        bumpRev();
        json(res, 200, { ok: true, rev: STATE_REV });
        return;
      }
      if (req.method === "POST" && url === "/api/publish") {
        if (!conn) return json(res, 400, { error: sm(langOf(req), "errNoActive") });
        if (!validVault(vaultPath)) return json(res, 400, { error: sm(langOf(req), "errBadVaultPath") });
        if (PUBLISHING) {
          return json(res, 409, { error: sm(langOf(req), "errPublishing"), busy: true });
        }
        PUBLISHING = true;
        try {
          const wd = ensureWorkdir(conn);
          if (wd.error) {
            return json(res, 500, { error: sm(langOf(req), "errWorkdirFail") + localizeRaw(langOf(req), wd.error) });
          }
          if (wd.errKey) {
            return json(res, 500, {
              error: sm(langOf(req), "errWorkdirFail") + sm(langOf(req), wd.errKey, localizeRaw(langOf(req), wd.errArg)),
              needAuth: wd.errKey === "errRepoUnreachable"
            });
          }
          const r = await publish(conn, vaultPath, wd.workdir, langOf(req));
          const log2 = r.log;
          const publishFailed = r.failed;
          const publishPushed = r.pushed;
          if (!publishFailed) {
            try {
              clearChangeLog(conn.id);
            } catch {
            }
          }
          bumpRev();
          const sn = await syncSiteNameVariable(conn.repo, conn.name);
          if (sn.ok) {
            if (!sn.unchanged) log2.push(sm(langOf(req), "logVarOk", conn.name));
          } else if (sn.reason === "no-token") {
            log2.push(sm(langOf(req), "logVarNoToken"));
          } else if (sn.reason === "bad-repo") {
            log2.push(sm(langOf(req), "logVarBadRepo"));
          } else {
            log2.push(sm(langOf(req), "logVarFail", localizeReason(langOf(req), sn.reason), localizeRaw(langOf(req), sn.detail)));
          }
          json(res, 200, {
            log: log2,
            siteUrl: siteUrlOf(conn.repo),
            failed: publishFailed,
            pushed: publishPushed,
            // 本次推送的提交 SHA，界面用它判断线上是否已经是这一版
            commit: r.commit || "",
            // 失败归类：'network' 表示没连上 GitHub（用户自己开加速器就能解决）。
            // 界面据此把「没推上去」说成人话，而不是丢一段 fatal: unable to access... 给用户猜。
            failKind: r.failKind || null
          });
        } finally {
          PUBLISHING = false;
        }
        return;
      }
      if (req.method === "GET" && url === "/api/live") {
        const target = conn ? siteUrlOf(conn.repo) : null;
        if (!target) return json(res, 400, { error: "noSite" });
        const q = new URL(req.url, "http://127.0.0.1").searchParams;
        const since = Number(q.get("since") || 0) || 0;
        const wantSha = String(q.get("sha") || "").trim();
        json(res, 200, { siteUrl: target, ...await probeLiveSite(target, since, wantSha) });
        return;
      }
      if (req.method === "POST" && url === "/api/update-source") {
        if (!conn) return json(res, 400, { error: sm(langOf(req), "errNoActive") });
        const wd = ensureWorkdir(conn);
        if (wd.error) {
          return json(res, 500, { error: sm(langOf(req), "errWorkdirFail") + localizeRaw(langOf(req), wd.error) });
        }
        if (wd.errKey) {
          return json(res, 500, {
            error: sm(langOf(req), "errWorkdirFail") + sm(langOf(req), wd.errKey, localizeRaw(langOf(req), wd.errArg)),
            needAuth: wd.errKey === "errRepoUnreachable"
          });
        }
        const r = await updateSource(conn, wd.workdir, langOf(req));
        json(res, 200, { log: r.log, failed: r.failed, pushed: r.pushed, failKind: r.failKind || null, commit: r.commit || "" });
        return;
      }
      if (req.method === "GET" && url === "/api/theme") {
        const css = readThemeCss(workdir);
        json(res, 200, {
          css,
          bytes: Buffer.byteLength(css, "utf8"),
          maxBytes: THEME_MAX_BYTES,
          hasWorkdir: !!workdir && import_node_fs.default.existsSync(workdir)
        });
        return;
      }
      if (req.method === "POST" && url === "/api/theme") {
        if (!conn) return json(res, 400, { error: sm(langOf(req), "errNoActive") });
        const { css } = JSON.parse(body);
        if (typeof css !== "string") return json(res, 400, { error: sm(langOf(req), "errThemeType") });
        const bytes = Buffer.byteLength(css, "utf8");
        if (bytes > THEME_MAX_BYTES) {
          return json(res, 400, { error: sm(langOf(req), "errThemeTooBig", bytes, THEME_MAX_BYTES) });
        }
        const wd = ensureWorkdir(conn);
        if (wd.error) {
          return json(res, 500, { error: sm(langOf(req), "errWorkdirFail") + localizeRaw(langOf(req), wd.error) });
        }
        if (wd.errKey) {
          return json(res, 500, {
            error: sm(langOf(req), "errWorkdirFail") + sm(langOf(req), wd.errKey, localizeRaw(langOf(req), wd.errArg)),
            needAuth: wd.errKey === "errRepoUnreachable"
          });
        }
        const r = writeThemeCss(wd.workdir, css);
        bumpRev();
        json(res, 200, { ok: true, bytes: r.bytes, removed: r.removed });
        return;
      }
      if (req.method === "POST" && url === "/api/theme/publish") {
        if (!conn) return json(res, 400, { error: sm(langOf(req), "errNoActive") });
        const { css } = JSON.parse(body);
        if (typeof css !== "string") return json(res, 400, { error: sm(langOf(req), "errThemeType") });
        const bytes = Buffer.byteLength(css, "utf8");
        if (bytes > THEME_MAX_BYTES) {
          return json(res, 400, { error: sm(langOf(req), "errThemeTooBig", bytes, THEME_MAX_BYTES) });
        }
        const wd = ensureWorkdir(conn);
        if (wd.error) {
          return json(res, 500, { error: sm(langOf(req), "errWorkdirFail") + localizeRaw(langOf(req), wd.error) });
        }
        if (wd.errKey) {
          return json(res, 500, {
            error: sm(langOf(req), "errWorkdirFail") + sm(langOf(req), wd.errKey, localizeRaw(langOf(req), wd.errArg)),
            needAuth: wd.errKey === "errRepoUnreachable"
          });
        }
        const w = writeThemeCss(wd.workdir, css);
        bumpRev();
        const r = await publishThemeOnly(conn, wd.workdir, langOf(req), w.bytes);
        json(res, 200, {
          ok: !r.failed,
          bytes: w.bytes,
          removed: w.removed,
          failed: r.failed,
          pushed: r.pushed,
          failKind: r.failKind || null,
          commit: r.commit || "",
          log: r.log
        });
        return;
      }
      if (req.method === "POST" && url === "/api/repo/create") {
        const { repoName, private: wantPrivate } = JSON.parse(body);
        const name = String(repoName || "").trim();
        if (!name) return json(res, 400, { error: sm(langOf(req), "errNeedRepoName") });
        if (!/^[A-Za-z0-9._-]+$/.test(name)) {
          return json(res, 400, { error: sm(langOf(req), "errBadRepoName") });
        }
        const token = readGithubToken();
        if (!token) return json(res, 401, { error: sm(langOf(req), "errNoAuth") });
        try {
          const r = await ghApi("https://api.github.com/user/repos", {
            method: "POST",
            token,
            body: JSON.stringify({
              name,
              private: !!wantPrivate,
              auto_init: false,
              // 仓库描述是写给 GitHub 仓库页面看的（不是界面文案），保持简洁英文
              description: "A static blog generated from Obsidian notes"
            })
          });
          let data = {};
          try {
            data = JSON.parse(r.text);
          } catch {
          }
          if (r.status === 201 && data.clone_url) {
            let pagesUrl = null;
            try {
              const pg = await ensurePages(data.clone_url);
              if (pg.ok) pagesUrl = `https://${data.owner.login}.github.io/${data.name}/`;
            } catch {
            }
            return json(res, 200, { repo: data.clone_url, htmlUrl: data.html_url, name: data.name, pagesUrl });
          }
          if (r.status === 422) {
            const msg2 = String(data.message || "");
            if (/already exists/i.test(msg2)) {
              return json(res, 409, { error: sm(langOf(req), "errRepoExists", name) });
            }
            return json(res, 400, { error: sm(langOf(req), "errCreateRejected") + (msg2 ? localizeRaw(langOf(req), msg2) : sm(langOf(req), "errCheckScope")) });
          }
          if (r.status === 401 || r.status === 403) {
            return json(res, 401, { error: sm(langOf(req), "errBadAuth") });
          }
          return json(res, 500, { error: sm(langOf(req), "errCreateFail", r.status) + localizeRaw(langOf(req), String(data.message || "").slice(0, 200)) });
        } catch (e) {
          return json(res, 500, { error: sm(langOf(req), "errConnectFail") + localizeRaw(langOf(req), String(e.message || e).slice(0, 200)) });
        }
      }
      if (req.method === "POST" && url === "/api/sync-site-name") {
        if (!conn) return json(res, 400, { error: sm(langOf(req), "errNoActive") });
        const sn = await syncSiteNameVariable(conn.repo, conn.name);
        if (sn.ok) return json(res, 200, { ok: true, unchanged: !!sn.unchanged, name: conn.name });
        return json(res, 200, { ok: false, reason: sn.reason, detail: sn.detail || "", name: conn.name });
      }
      if (req.method === "POST" && url === "/api/auth/token") {
        const { token } = JSON.parse(body);
        const t = String(token || "").trim();
        if (!t) {
          saveGithubToken("");
          return json(res, 200, { ok: true, cleared: true });
        }
        if (t.length < 20) return json(res, 400, { error: sm(langOf(req), "errTokenShort") });
        const r = await ghApi("https://api.github.com/user", { token: t });
        if (!r.ok) {
          if (r.status === 401 || r.status === 403) return json(res, 401, { error: sm(langOf(req), "errTokenRejected") });
          return json(res, 502, { error: sm(langOf(req), "errTokenNetwork") });
        }
        let login = null;
        try {
          login = JSON.parse(r.text).login || null;
        } catch {
        }
        saveGithubToken(t);
        return json(res, 200, { ok: true, login });
      }
      if (req.method === "GET" && url === "/api/auth/status") {
        const token = readGithubToken();
        let login = null;
        let reachable = null;
        if (token) {
          try {
            const r = await ghApi("https://api.github.com/user", { token });
            if (r.ok) {
              login = JSON.parse(r.text).login || null;
              reachable = true;
            } else {
              reachable = r.status !== 0;
            }
          } catch {
            reachable = false;
          }
        }
        return json(res, 200, { token: !!token, login, reachable });
      }
      res.writeHead(404);
      res.end();
    } catch (e) {
      const raw = String(e.message || e).slice(0, 300);
      const known = SMSG.zh[raw];
      json(res, 500, { error: known !== void 0 ? sm(langOf(req), raw) : localizeRaw(langOf(req), raw) });
    }
  });
  let watchHandle = null;
  let watchTimer = null;
  let autoBusy = false;
  let autoSuppressUntil = 0;
  let watchPending = /* @__PURE__ */ new Set();
  function stopWatcher() {
    if (watchHandle) {
      try {
        watchHandle.close();
      } catch {
      }
      watchHandle = null;
    }
    if (watchTimer) {
      clearTimeout(watchTimer);
      watchTimer = null;
    }
    watchPending.clear();
  }
  function restartWatcher() {
    stopWatcher();
    const { conn, vaultPath } = activeConfig();
    if (!conn || !validVault(vaultPath)) return;
    try {
      watchHandle = import_node_fs.default.watch(vaultPath, { recursive: true }, (_ev, file) => {
        if (file) watchPending.add(normalize(String(file)));
        scheduleAutoSync();
      });
    } catch {
      watchHandle = null;
    }
  }
  function scheduleAutoSync() {
    if (watchTimer) clearTimeout(watchTimer);
    watchTimer = setTimeout(() => {
      watchTimer = null;
      const touched = new Set(watchPending);
      watchPending.clear();
      autoSyncTick(touched).catch(() => {
      });
    }, 2500);
  }
  function requeueAutoSync(touched) {
    for (const p of touched) if (p) watchPending.add(p);
    if (watchTimer) clearTimeout(watchTimer);
    const wait = Math.max(800, autoSuppressUntil - Date.now() + 200);
    watchTimer = setTimeout(() => {
      watchTimer = null;
      const next = new Set(watchPending);
      watchPending.clear();
      autoSyncTick(next).catch(() => {
      });
    }, wait);
  }
  async function autoSyncTick(touched = /* @__PURE__ */ new Set()) {
    if (autoBusy || Date.now() < autoSuppressUntil) {
      requeueAutoSync(touched);
      return;
    }
    const { conn, vaultPath, workdir } = activeConfig();
    if (!conn || !validVault(vaultPath) || !workdir) return;
    if (!import_node_fs.default.existsSync(import_node_path.default.join(workdir, "content"))) return;
    const flags = loadAutoSync();
    const before = diffVault(vaultPath, workdir, loadPublishMark(conn.id));
    try {
      recordChanges(conn.id, before);
    } catch {
    }
    const addCandidates = before.added.filter((p) => touched.has(normalize(p)));
    const wantAdd = flags.added && addCandidates.length > 0;
    const wantMod = flags.modified && before.modified.length > 0;
    const wantDel = flags.deleted && before.deleted.length > 0;
    const counts = { added: before.added.length, modified: before.modified.length, deleted: before.deleted.length };
    const handled = {
      added: wantAdd ? addCandidates.slice() : [],
      modified: wantMod ? before.modified.slice() : [],
      deleted: wantDel ? before.deleted.slice() : []
    };
    const filesOf = (src) => ({
      added: (src.added || []).slice(0, 12),
      modified: (src.modified || []).slice(0, 12),
      deleted: (src.deleted || []).slice(0, 12)
    });
    const startedAt = Date.now();
    if (!wantAdd && !wantMod && !wantDel) {
      return;
    }
    autoBusy = true;
    const entry = { at: startedAt, kind: "run", counts, files: filesOf(handled), stage: "pushing" };
    pushAutoLog(conn.id, entry);
    bumpRev();
    try {
      if (wantAdd) {
        for (const rel of addCandidates) {
          try {
            setPublic(vaultPath, rel, true);
          } catch {
          }
        }
      }
      const lang = "zh";
      const r = await publish(conn, vaultPath, workdir, lang, { skipDelete: !flags.deleted });
      entry.pushed = r.pushed === true;
      entry.failed = r.failed === true;
      entry.stage = entry.failed ? "failed" : "pushed";
      entry.pushedAt = Date.now();
      if (r.failKind) entry.failKind = r.failKind;
      if (r.commit) entry.commit = r.commit;
      if (!entry.failed) {
        try {
          dropChanges(conn.id, handled);
        } catch {
        }
      }
      if (r.pushed) watchAutoLive(conn, entry);
    } catch (e) {
      entry.failed = true;
      entry.stage = "failed";
      entry.error = String(e && e.message || e).slice(0, 200);
    } finally {
      patchAutoLog(conn.id, entry.at, {
        stage: entry.stage,
        pushed: entry.pushed,
        pushedAt: entry.pushedAt,
        failed: entry.failed,
        failKind: entry.failKind,
        commit: entry.commit,
        error: entry.error,
        files: entry.files
      });
      autoBusy = false;
      autoSuppressUntil = Date.now() + 5e3;
      bumpRev();
    }
  }
  const AUTO_LIVE_DEADLINE = 10 * 60 * 1e3;
  function watchAutoLive(conn, entry) {
    const target = conn ? siteUrlOf(conn.repo) : null;
    if (!target) return;
    const repo = conn.repo;
    const deadline = Date.now() + AUTO_LIVE_DEADLINE;
    const tick = async () => {
      const r = await probeLiveSite(target, entry.at, entry.commit || "");
      if (r.live) {
        patchAutoLog(conn.id, entry.at, { live: true, liveAt: Date.now() });
        bumpRev();
        return;
      }
      const b = await probeBuildStatus(repo, entry.commit || "");
      if (b && b.found && b.status === "completed" && b.conclusion && b.conclusion !== "success") {
        patchAutoLog(conn.id, entry.at, {
          live: false,
          buildFailed: true,
          buildConclusion: b.conclusion,
          buildUrl: b.url || ""
        });
        bumpRev();
        return;
      }
      if (Date.now() > deadline) {
        patchAutoLog(conn.id, entry.at, {
          liveTimeout: true,
          buildStatus: b && b.status || "",
          buildUrl: b && b.url || ""
        });
        bumpRev();
        return;
      }
      setTimeout(tick, 2e4);
    };
    setTimeout(tick, 15e3);
  }
  function resumeAutoLiveWatch() {
    const { conn } = activeConfig();
    if (!conn) return;
    if (!siteUrlOf(conn.repo)) return;
    const now = Date.now();
    for (const e of loadAutoLog(conn.id)) {
      if (e.kind !== "run") continue;
      if (!e.failed && !e.pushed && e.stage === "pushing" && now - e.at > 2 * 60 * 1e3) {
        try {
          patchAutoLog(conn.id, e.at, { stage: "failed", failed: true, interrupted: true });
        } catch {
        }
        continue;
      }
      if (e.failed || !e.pushed || e.live || e.liveTimeout || e.buildFailed) continue;
      if (!e.commit) continue;
      if (now - e.at > 30 * 60 * 1e3) continue;
      watchAutoLive(conn, e);
    }
  }
  function start() {
    return new Promise((resolve, reject) => {
      const onError = (e) => {
        server.removeListener("listening", onListening);
        if (e && e.code === "EADDRINUSE") {
          reject(new Error(`\u7AEF\u53E3 ${PORT} \u5DF2\u88AB\u5360\u7528\uFF1A\u53EF\u80FD\u5DF2\u7ECF\u6709\u4E00\u4E2A\u7BA1\u7406\u5668\u5728\u8FD0\u884C\u3002`));
        } else {
          reject(new Error("\u670D\u52A1\u542F\u52A8\u5931\u8D25\uFF1A" + String(e && e.message || e)));
        }
      };
      const onListening = () => {
        server.removeListener("error", onError);
        const actualPort = server.address() ? server.address().port : PORT;
        const { conn, vaultPath } = activeConfig();
        log(`[manager] Publish manager: http://localhost:${actualPort}`);
        log(`[manager] Active connection: ${conn ? conn.name : "(none)"}; vault path: ${vaultPath || "(not set)"}`);
        log(`[manager] Source directory: ${TOOL_ROOT}`);
        log(`[manager] Data directory:   ${DATA_DIR}`);
        restartWatcher();
        try {
          resumeAutoLiveWatch();
        } catch {
        }
        resolve(actualPort);
      };
      server.once("error", onError);
      server.once("listening", onListening);
      server.listen(PORT, "127.0.0.1");
    });
  }
  function stop() {
    try {
      stopWatcher();
    } catch {
    }
    return new Promise((resolve) => {
      try {
        server.close(() => resolve());
      } catch {
        resolve();
      }
    });
  }
  return {
    start,
    stop,
    server,
    get port() {
      return server.address() ? server.address().port : PORT;
    },
    get toolRoot() {
      return TOOL_ROOT;
    },
    get dataDir() {
      return DATA_DIR;
    },
    // 给宿主做状态展示用
    state() {
      const { conn, vaultPath } = activeConfig();
      return { conn: conn ? { id: conn.id, name: conn.name, repo: conn.repo, branch: conn.branch } : null, vaultPath };
    }
  };
}

// src/worker-entry.ts
function getPort() {
  const p = process;
  if (p.parentPort) return p.parentPort;
  if (typeof process.send === "function") {
    return {
      postMessage: (m) => process.send(m),
      on: (_ev, cb) => process.on("message", cb)
    };
  }
  return null;
}
function readStartMsg() {
  const fromEnv = process.env.BLOG_PUBLISHER_START;
  if (fromEnv) {
    try {
      return JSON.parse(fromEnv);
    } catch {
      return null;
    }
  }
  return null;
}
var port = getPort();
function send(m) {
  try {
    port?.postMessage(m);
  } catch {
  }
}
var msg = readStartMsg();
if (!msg) {
  send({ type: "error", error: "\u7F3A\u5C11\u542F\u52A8\u53C2\u6570\uFF08BLOG_PUBLISHER_START\uFF09" });
  process.exit(1);
} else {
  const mgr = createManager({
    toolRoot: msg.toolRoot,
    dataDir: msg.dataDir,
    port: msg.port,
    // 子进程没有控制台可看，日志通过消息发回主进程
    log: (m) => send({ type: "log", text: String(m) })
  });
  mgr.start().then((actualPort) => {
    send({ type: "ready", port: actualPort });
  }).catch((e) => {
    send({ type: "error", error: String(e?.message || e) });
  });
  port?.on("message", (m) => {
    if (m && m.type === "stop") {
      mgr.stop().catch(() => void 0).finally(() => process.exit(0));
    }
  });
}
/*! Bundled license information:

is-extendable/index.js:
  (*!
   * is-extendable <https://github.com/jonschlinkert/is-extendable>
   *
   * Copyright (c) 2015, Jon Schlinkert.
   * Licensed under the MIT License.
   *)

strip-bom-string/index.js:
  (*!
   * strip-bom-string <https://github.com/jonschlinkert/strip-bom-string>
   *
   * Copyright (c) 2015, 2017, Jon Schlinkert.
   * Released under the MIT License.
   *)
*/
