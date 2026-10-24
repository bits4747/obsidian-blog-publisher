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
  .result { display: flex; align-items: center; gap: 7px; font-size: 15px; padding: 6px 12px;
            border-radius: 999px; max-width: 620px; }
  .result.busy { background: var(--accent-soft); color: var(--accent); }
  .result.ok   { background: var(--okbg); color: var(--okfg); }
  .result.err  { background: var(--errbg); color: var(--errfg); }
  .result .txt { overflow: hidden; text-overflow: ellipsis; white-space: nowrap; }
  .result details { font-weight: 400; } .result summary { cursor: pointer; opacity: .75; }
  .result pre { margin: 6px 0 0; white-space: pre-wrap; font: 11.5px/1.6 Consolas, monospace; }
  /* \u63A8\u9001\u5931\u8D25\uFF08\u591A\u534A\u662F\u52A0\u901F\u5668\uFF09\u65F6\u7684\u9AD8\u4EAE\u6761\uFF1A\u5706\u89D2\u80F6\u56CA\u5F62\u6491\u4E0D\u4E0B\u6574\u53E5\u8BDD\uFF0C\u800C\u4E14\u5931\u8D25\u63D0\u793A
     \u5FC5\u987B\u4E00\u773C\u770B\u5230\u2014\u2014\u5355\u72EC\u7528\u4E00\u5F20\u5B9E\u5FC3\u7EA2\u6761\uFF0C\u4E0D\u8DDF\u5176\u5B83\u65E5\u5FD7\u6DF7\u5728\u4E00\u8D77\u3002 */
  .result.alert { color: #fff; background: var(--bad); font-weight: 600; border-radius: 10px; }
  .result.alert .txt { white-space: normal; overflow: visible; }
  /* \u975E\u5173\u952E\u7684\u300C\u987A\u5E26\u6210\u529F\u300D\u65E5\u5FD7\uFF08\u7AD9\u540D\u53D8\u91CF\u540C\u6B65\u7B49\uFF09\u6DE1\u4E00\u6863\uFF1A
     \u5B83\u4EEC\u548C\u6210\u8D25\u6DF7\u5728\u540C\u4E00\u89C6\u89C9\u5C42\u7EA7\u65F6\uFF0C\u4F1A\u8BA9\u4EBA\u628A\u6574\u6B21\u53D1\u5E03\u8BEF\u5224\u6210\u6210\u529F\uFF08\u771F\u5B9E\u8E29\u8FC7\uFF09\u3002 */
  .result pre .dim { opacity: .6; }

  /* ---- \u591A\u5E93\u5207\u6362\uFF1A\u5361\u7247\u5F0F\u9009\u62E9\u5668 ---- */
  .vaults { display: flex; gap: 10px; overflow-x: auto; padding: 2px 2px 10px; }
  .vault { position: relative; flex: 0 0 auto; width: 230px; text-align: left; cursor: pointer;
           background: var(--card); border: 1.5px solid var(--border); border-radius: 12px; padding: 12px 13px 11px;
           font: inherit; color: inherit; transition: border-color .15s, box-shadow .15s, transform .12s; }
  .vault.has-del { padding-bottom: 34px; }
  .vault:hover { border-color: var(--accent); transform: translateY(-1px); }
  .vault.on { border-color: var(--accent); box-shadow: 0 0 0 3px rgba(37,112,204,.14); }
  .vault .vname { font-weight: 600; font-size: 16px; margin-bottom: 3px; overflow: hidden;
                  text-overflow: ellipsis; white-space: nowrap; }
  .vault .vrepo { font-size: 13.5px; color: var(--muted); overflow: hidden; text-overflow: ellipsis; white-space: nowrap; }
  .vault .vmeta { font-size: 13.5px; color: var(--muted-2); margin-top: 6px; }
  .vault .vmeta b { color: var(--accent); font-weight: 600; }
  .vault .badge { position: absolute; top: 10px; right: 10px; font-size: 12px; padding: 2px 7px;
                  border-radius: 999px; background: var(--accent); color: #fff; }
  .vault.new { display: flex; align-items: center; justify-content: center; gap: 6px; width: 170px;
               border-style: dashed; color: var(--muted); font-size: 15px; }
  .vault.new:hover { border-color: var(--accent); color: var(--accent); background: var(--accent-soft); }
  .vault .del { position: absolute; bottom: 8px; right: 8px; font-size: 12.5px; padding: 1px 7px;
                border-radius: 6px; background: var(--btn-ghost); color: var(--muted-2); border: 0; cursor: pointer; }
  .vault .del:hover { background: #fee2e2; color: var(--bad); }
  .vault .vlink { display: inline-flex; align-items: center; gap: 3px; margin-top: 7px; text-decoration: none;
                  font-size: 13.5px; color: var(--accent); padding: 2px 7px 2px 5px; border-radius: 6px;
                  background: var(--accent-soft); font-weight: 500; }
  .vault .vlink:hover { background: var(--accent-soft-hover); text-decoration: underline; }

  /* ---- \u65B0\u5EFA\u8FDE\u63A5\uFF1A\u4E00\u6B65\u4E00\u4E2A\u5E93 + \u4E00\u4E2A\u4ED3\u5E93 ---- */
  .dialog { position: fixed; inset: 0; z-index: 50; background: rgba(17,24,39,.45);
            display: flex; align-items: center; justify-content: center; padding: 20px; }
  .dialog .panel { background: var(--card); border-radius: 14px; width: 100%; max-width: 520px;
                   padding: 20px 22px; box-shadow: 0 20px 50px var(--shadow); }
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
  /* \u63D2\u4EF6\u7528 iframe \u5D4C\u5165\uFF08?embed=1\uFF09\uFF1AObsidian \u5DE6\u4FA7\u5DF2\u7ECF\u662F\u6587\u4EF6\u6811\uFF0C
     \u8FD9\u91CC\u7684\u300C\u641C\u7D22 + \u6587\u4EF6\u5939\u7F51\u683C\u300D\u91CD\u590D\u4E14\u6324\uFF0C\u6574\u5757\u9690\u85CF\uFF0C\u53EA\u7559\u8FDE\u63A5 / \u53D8\u66F4 / \u6D41\u6C34 / \u53D1\u5E03\u3002 */
  body.embed-mode #mainCard { display: none; }
</style></head><body>

<div class="statusbar"><div class="inner">
  <span class="title" data-i18n="appTitle">\u53D1\u5E03\u7BA1\u7406\u5668</span>
  <span class="spacer"></span>
  <span id="result" class="result hidden"><span class="txt"></span></span>
  <button class="mini" id="authBtn" onclick="openAuthDialog()" data-i18n="authBtn">GitHub \u6388\u6743</button>
  <button class="mini" id="srcBtn" onclick="doUpdateSource()" data-i18n="srcBtn">\u2B06 \u66F4\u65B0\u6E90\u7801</button>
  <button class="btn-publish" id="pubBtn" onclick="doPublish()" data-i18n="publishBtn">\u27F3 \u53D1\u5E03\u5230 GitHub</button>
</div></div>

<div class="authbar hidden" id="authBar">
  <span data-i18n="authBarText"></span>
  <button class="mini" onclick="openAuthDialog()" data-i18n="authBarBtn">\u73B0\u5728\u6388\u6743</button>
</div>

<div class="wrap">

<div class="card">
  <div class="row" style="margin-bottom:9px">
    <label style="font-size: 16px;font-weight:600;" data-i18n="myBlog">\u6211\u7684\u535A\u5BA2</label>
    <span class="cnt" id="vaultHint"></span>
    <span id="vaultHead"></span>
    <button class="mini" id="setupBtn" onclick="openSetup(setupConn, false)" data-i18n="vaultSettings" style="margin-left:auto">\u8BBE\u7F6E</button>
  </div>
  <div class="vaults" id="vaults"></div>
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
    myBlog: '\u6211\u7684\u535A\u5BA2',
    vaultSettings: '\u8BBE\u7F6E',
    searchPh: '\u641C\u7D22\u7B14\u8BB0\u6807\u9898 / \u8DEF\u5F84\u2026',
    expandAll: '\u4E00\u952E\u5C55\u5F00',
    collapseAll: '\u4E00\u952E\u6536\u8D77',
    pubAll: '\u5168\u90E8\u516C\u5F00',
    privAll: '\u5168\u90E8\u79C1\u5BC6',
    noConn: '\u8FD8\u6CA1\u6709\u8FDE\u63A5\uFF0C\u70B9\u53F3\u8FB9\u65B0\u5EFA\u4E00\u4E2A',
    notesHint: function (n, p) { return n + ' \u7BC7\u7B14\u8BB0 \xB7 ' + p + ' \u7BC7\u5DF2\u516C\u5F00' },
    pickVault: '\u8BF7\u5148\u4E3A\u8FD9\u4E2A\u535A\u5BA2\u9009\u62E9\u672C\u5730\u5E93\u6587\u4EF6\u5939',
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
    newBlog: '\uFF0B \u65B0\u5EFA\u535A\u5BA2',
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
    myBlog: 'My blog',
    vaultSettings: 'Settings',
    searchPh: 'Search note title / path\u2026',
    expandAll: 'Expand all',
    collapseAll: 'Collapse all',
    pubAll: 'Publish all',
    privAll: 'Make all private',
    noConn: 'No connections yet \u2014 create one on the right',
    notesHint: function (n, p) { return n + (n === 1 ? ' note \xB7 ' : ' notes \xB7 ') + p + ' public' },
    pickVault: 'Pick a local vault folder for this blog',
    current: 'Current',
    noVault: 'No local vault',
    vaultMeta: function (n, p) { return n + (n === 1 ? ' note \xB7 ' : ' notes \xB7 ') + p + ' public' },
    vaultMetaHtml: function (n, p) { return n + (n === 1 ? ' note \xB7 ' : ' notes \xB7 ') + '<b>' + p + ' public</b>' },
    openSite: '\u2197 Open site',
    remove: 'Remove',
    removeTip: 'Removes from this list only \u2014 your GitHub repo and local vault are untouched',
    removeConfirm: function (name) { return 'Remove the connection "' + name + '"?\\n\\n\xB7 The GitHub repo is NOT deleted\\n\xB7 Your local Obsidian vault is NOT modified\\n\xB7 You can add it again later' },
    removeFail: 'Remove failed: ',
    newBlog: '\uFF0B New blog',
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

// ---- \u9876\u90E8\u7ED3\u679C\u53CD\u9988 ----
function setResult(kind, text, detail) {  const el = document.getElementById('result');
  el.className = 'result ' + kind;
  el.innerHTML = '';
  // \u26A0\uFE0F \u5C40\u90E8\u53D8\u91CF\u4E0D\u80FD\u53EB t\uFF1A\u4F1A\u906E\u853D\u5168\u5C40\u7684\u7FFB\u8BD1\u51FD\u6570 t(key)\uFF0C\u4E0B\u9762 t('detail') \u5C31\u4F1A\u62A5
  // "t is not a function"\uFF08\u8FD9\u4E2A bug \u771F\u5B9E\u53D1\u751F\u8FC7\uFF0C\u8868\u73B0\u4E3A\u53D1\u5E03\u540E\u9876\u90E8\u663E\u793A Publish failed\uFF09\u3002
  const span = document.createElement('span'); span.className = 'txt'; span.textContent = text;
  el.appendChild(span);
  if (detail) {
    const d = document.createElement('details');
    const sm = document.createElement('summary'); sm.textContent = t('detail');
    // \u65E5\u5FD7\u6309\u300C\u662F\u4E0D\u662F\u5173\u952E\u6210\u8D25\u300D\u5206\u6863\uFF1A\u975E\u5173\u952E\u884C\uFF08\u7AD9\u540D\u53D8\u91CF\u540C\u6B65\u4E4B\u7C7B\u987A\u5E26\u6210\u529F\u7684\u8BDD\uFF09
    // \u6DE1\u4E00\u6863\u663E\u793A\u3002\u5931\u8D25\u884C\u4FDD\u6301\u6B63\u5E38\u4EAE\u5EA6\uFF0C\u65B9\u4FBF\u5728\u5C55\u5F00\u540E\u4E00\u773C\u5B9A\u4F4D\u3002
    const pre = document.createElement('pre');
    for (const line of String(detail).split(String.fromCharCode(10))) {
      const s = document.createElement('span');
      s.textContent = line + String.fromCharCode(10);
      if (!isCriticalLog(line)) s.className = 'dim';
      pre.appendChild(s);
    }
    d.appendChild(sm); d.appendChild(pre); el.appendChild(d);
  }
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
function clearResult() { document.getElementById('result').className = 'result hidden'; }
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
let _pendingPrompt = '';
function promptPending() {
  const m = manualChanges();
  const n = m.added.length + m.modified.length + m.deleted.length;
  const el = document.getElementById('result');
  if (!n) {
    // \u53EA\u64A4\u6389\u81EA\u5DF1\u4E0A\u4E00\u6761\u63D0\u793A\uFF0C\u522B\u628A\u300C\u53D1\u5E03\u6210\u529F\u300D\u8FD9\u7C7B\u7ED3\u679C\u64E6\u6389
    if (_pendingPrompt && el && el.textContent.trim() === _pendingPrompt) {
      el.className = 'result';
      el.innerHTML = '';
    }
    _pendingPrompt = '';
    return;
  }
  const msg = tf('pendingPrompt', n);
  if (msg === _pendingPrompt) return;
  _pendingPrompt = msg;
  setResult('ok', msg);
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

// ---- \u5355\u5E93\u4FE1\u606F\u5361 ----
// \u63D2\u4EF6\u5F62\u6001\u4E0B Obsidian \u91CC\u53EA\u6709\u5F53\u524D\u8FD9\u4E00\u4E2A\u5E93\uFF0C\u591A\u5E93\u5361\u7247\u5217\u8868\u662F\u591A\u4F59\u7684\uFF1A
// \u8FD9\u91CC\u53EA\u753B\u300C\u5F53\u524D\u5E93\u300D\u4E00\u5F20\u5361\uFF0C\u5404\u9879\u8BBE\u7F6E\u8D70\u53F3\u4E0A\u89D2\u7684\u300C\u8BBE\u7F6E\u300D\u6309\u94AE\u3002
// \uFF08\u547D\u4EE4\u884C\u7248\u5982\u679C\u914D\u7F6E\u8FC7\u591A\u4E2A\u8FDE\u63A5\uFF0C\u9876\u4E0A\u7ED9\u4E00\u4E2A\u6781\u7A84\u7684\u4E0B\u62C9\u505A\u5207\u6362\uFF0C\u4E0D\u518D\u94FA\u4E00\u6392\u5361\u7247\u3002\uFF09
function renderVaults() {
  const wrap = document.getElementById('vaults');
  const head = document.getElementById('vaultHead');
  if (!wrap) return;
  wrap.innerHTML = '';
  if (head) head.innerHTML = '';
  const hint = document.getElementById('vaultHint');
  const cur = S.connections.find((c) => c.id === S.active) || null;

  if (!cur) {
    if (hint) hint.textContent = t('noConn');
    const add = document.createElement('button');
    add.className = 'vault new';
    add.innerHTML = '<span style="font-size: 18px">\uFF0B</span> ' + t('newBlog').replace('\uFF0B ', '');
    add.onclick = () => openSetup(null);
    wrap.appendChild(add);
    return;
  }

  if (hint) {
    hint.textContent = cur.vaultOk ? tf('notesHint', cur.noteCount, cur.publicCount) : t('pickVault');
  }

  // \u591A\u4E2A\u8FDE\u63A5\u65F6\uFF08\u53EA\u6709\u547D\u4EE4\u884C\u7248\u4F1A\u9047\u5230\uFF09\u7ED9\u4E00\u4E2A\u7D27\u51D1\u7684\u4E0B\u62C9\uFF0C\u4E0D\u518D\u94FA\u5361\u7247
  if (head && S.connections.length > 1) {
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
    head.appendChild(sel);
  }

  const b = document.createElement('div');
  b.className = 'vault on';
  const meta = !cur.vaultOk
    ? '<span class="vault-bad">' + t('noVault') + '</span>'
    : tf('vaultMetaHtml', cur.noteCount, cur.publicCount);
  b.innerHTML =
    '<div class="vname"></div>' +
    '<div class="vrepo"></div>' +
    '<div class="vmeta">' + meta + '</div>';
  b.querySelector('.vname').textContent = cur.name;
  b.querySelector('.vrepo').textContent = shortRepo(cur.repo) + ' \xB7 ' + cur.branch;
  b.title = cur.repo + '\\n' + t('vaultTip') + (cur.vaultPath || t('vaultNone'));

  const url = cur.siteUrl;
  if (url) {
    const a = document.createElement('a');
    a.className = 'vlink';
    a.href = url;
    a.target = '_blank';
    a.rel = 'noopener';
    a.textContent = t('openSite');
    a.title = url;
    a.onclick = (ev) => { ev.stopPropagation(); };
    b.appendChild(a);
  }
  b.onclick = () => openSetup(cur);
  b.style.cursor = 'pointer';
  wrap.appendChild(b);
}

// ---- \u65B0\u5EFA/\u4FEE\u6539\u8FDE\u63A5\uFF1A\u4E00\u4E2A\u5E93 + \u4E00\u4E2A\u4ED3\u5E93\uFF0C\u4E00\u6B65\u5B8C\u6210 ----
let setupConn = null, setupPicked = '';
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
    head.appendChild(mk(t('pubAll'), 'green', true));
    head.appendChild(mk(t('privAll'), '', false));
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
// \u5207\u516C\u5F00\u72B6\u6001\u540E\uFF0C\u53EA\u66F4\u65B0\u5361\u7247\u4E0A\u7684\u8BA1\u6570\uFF0C\u4E0D\u6574\u9875\u91CD\u6E32\u67D3\uFF08\u907F\u514D\u6EDA\u52A8\u4F4D\u7F6E\u4E22\u5931\uFF09
function updateVaultCounts() {
  const cur = S.connections.find((c) => c.id === S.active);
  if (!cur) return;
  cur.publicCount = S.notes.filter((n) => n.isPublic).length;
  document.getElementById('vaultHint').textContent = tf('notesHint', cur.noteCount, cur.publicCount);
  const card = document.querySelector('.vault.on .vmeta');
  if (card) card.innerHTML = tf('vaultMetaHtml', cur.noteCount, cur.publicCount);
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

// \u53D1\u5E03\uFF1A\u53CD\u9988\u76F4\u63A5\u51FA\u73B0\u5728\u53F3\u4E0A\u89D2\u72B6\u6001\u680F\uFF0C\u4E0D\u9700\u8981\u6EDA\u5230\u5E95\u90E8
async function doPublish() {
  const btn = document.getElementById('pubBtn');
  btn.disabled = true;
  const old = btn.textContent; btn.textContent = t('publishing');
  setResult('busy', t('publishing'));
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
      if (r.failKind === 'network') setResult('alert', t('pushNetworkFail'), lines.join('\\n'));
      else setResult('err', summary === t('publishDone') ? t('publishErr') : summary, lines.join('\\n'));
    } else {
      setResult('ok', summary + (r.pushed ? t('pushed') : ''), lines.join('\\n'));
      // \u63A8\u4E0A\u53BB\u53EA\u662F\u7B2C\u4E00\u6B65\uFF1APages \u8FD8\u8981\u6784\u5EFA + \u90E8\u7F72\uFF08\u5B9E\u6D4B 40~90 \u79D2\uFF09\u3002
      // \u8FD9\u91CC\u4E0D\u963B\u585E\u6309\u94AE\uFF0C\u540E\u53F0\u8F6E\u8BE2\u628A\u300C\u8FD8\u8981\u7B49\u591A\u4E45 / \u5DF2\u7ECF\u4E0A\u7EBF\u300D\u663E\u793A\u51FA\u6765\u3002
      if (r.pushed) {
        let since = publishStart;
        try { const b = await api('/api/live'); if (b && b.generatedAt) since = b.generatedAt; } catch { /* \u53D6\u4E0D\u5230\u5C31\u9000\u56DE\u5F00\u59CB\u65F6\u523B */ }
        void waitUntilLive(since, r.commit, r.siteUrl);
      }
    }
  } catch (e) {
    setResult('err', t('publishFail') + e.message);
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
async function waitUntilLive(baselineAt, sha, siteUrl) {
  const seq = ++liveSeq;
  const t0 = Date.now();
  const LIMIT = 4 * 60 * 1000;
  const q = (sha ? 'sha=' + encodeURIComponent(sha) : 'since=' + encodeURIComponent(String(baselineAt)));
  while (Date.now() - t0 < LIMIT) {
    if (seq !== liveSeq) return;
    setResult('busy', tf('liveBuilding', Math.round((Date.now() - t0) / 1000)));
    let r = null;
    try { r = await api('/api/live?' + q); } catch { /* \u7F51\u7EDC\u6296\u4E00\u4E0B\u5C31\u7EE7\u7EED\u7B49 */ }
    if (seq !== liveSeq) return;
    if (r && r.live) {
      setResult('ok', tf('liveOk', Math.round((Date.now() - t0) / 1000)), (r.siteUrl || siteUrl || '') + '?fresh=' + Date.now());
      return;
    }
    await new Promise((res) => setTimeout(res, 3000));
  }
  if (seq === liveSeq) setResult('alert', t('liveTimeout'), siteUrl || '');
}

// \u300C\u66F4\u65B0\u6E90\u7801\u300D\uFF1A\u628A\u5DE5\u5177\u76EE\u5F55\u91CC\u7684\u7AD9\u70B9\u6E90\u7801\uFF08src/\u3001scripts/\u3001.github/ \u4E0E\u9876\u5C42\u914D\u7F6E\uFF09
// \u5168\u91CF\u8986\u76D6\u8FDB\u5DE5\u4F5C\u526F\u672C\u5E76\u63A8\u9001\uFF0C\u8BA9 GitHub Actions \u91CD\u65B0\u6784\u5EFA\u3002
// \u4E0E\u300C\u53D1\u5E03\u300D\u7684\u5206\u5DE5\uFF1A\u53D1\u5E03\u540C\u6B65\u7B14\u8BB0\uFF08content/\uFF09\uFF0C\u8FD9\u91CC\u540C\u6B65\u7AD9\u70B9\u672C\u8EAB\u3002
// \u6539\u5B8C blog-static/src/ \u540E\u5FC5\u987B\u70B9\u8FD9\u4E2A\uFF0C\u53EA\u70B9\u300C\u53D1\u5E03\u300D\u7EBF\u4E0A\u4E0D\u4F1A\u53D8\u3002
async function doUpdateSource() {
  const btn = document.getElementById('srcBtn');
  btn.disabled = true;
  const old = btn.textContent; btn.textContent = t('updatingSrc');
  setResult('busy', t('updatingSrc'));
  // \u4E0E\u53D1\u5E03\u4E00\u6837\uFF1A\u6E90\u7801\u63A8\u4E0A\u53BB\u4E5F\u8981\u7B49 Pages \u6784\u5EFA\uFF0C\u987A\u624B\u628A\u4E0A\u7EBF\u8FDB\u5EA6\u663E\u793A\u51FA\u6765\u3002
  // \u57FA\u7EBF\u540C\u6837\u5728\u63A8\u9001\u5B8C\u6210\u4E4B\u540E\u53D6\uFF08\u539F\u56E0\u89C1 doPublish \u91CC\u7684\u6CE8\u91CA\uFF09\u3002
  const srcStart = Date.now();
  try {
    const r = await api('/api/update-source', undefined, 'POST');
    const lines = r.log || [];
    if (r.failed) {
      if (r.failKind === 'network') setResult('alert', t('pushNetworkFail'), lines.join('\\n'));
      else setResult('err', lines[0] || t('publishErr'), lines.join('\\n'));
    } else {
      setResult('ok', (lines[0] || t('srcSynced')) + (r.pushed ? t('pushed') : ''), lines.join('\\n'));
      if (r.pushed) {
        let since = srcStart;
        try { const b = await api('/api/live'); if (b && b.generatedAt) since = b.generatedAt; } catch { /* \u53D6\u4E0D\u5230\u5C31\u9000\u56DE\u5F00\u59CB\u65F6\u523B */ }
        void waitUntilLive(since, r.commit, '');
      }
    }
  } catch (e) {
    setResult('err', t('srcUpdateFail') + e.message);
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
    const localRels = /* @__PURE__ */ new Set();
    for (const n of vaultState(vaultPath).notes) {
      const rel = normalize(n.path);
      localRels.add(rel);
      if (!published.has(rel)) {
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
      try {
        savePublishMark(conn.id, { at: startedAt, ackedDeleted });
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
        res.end(UI);
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
