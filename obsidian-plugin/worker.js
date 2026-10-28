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

// node_modules/kind-of/index.js
var require_kind_of = __commonJS({
  "node_modules/kind-of/index.js"(exports2, module2) {
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

// node_modules/is-extendable/index.js
var require_is_extendable = __commonJS({
  "node_modules/is-extendable/index.js"(exports2, module2) {
    "use strict";
    module2.exports = function isExtendable(val) {
      return typeof val !== "undefined" && val !== null && (typeof val === "object" || typeof val === "function");
    };
  }
});

// node_modules/extend-shallow/index.js
var require_extend_shallow = __commonJS({
  "node_modules/extend-shallow/index.js"(exports2, module2) {
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

// node_modules/section-matter/index.js
var require_section_matter = __commonJS({
  "node_modules/section-matter/index.js"(exports2, module2) {
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

// node_modules/js-yaml/lib/js-yaml/common.js
var require_common = __commonJS({
  "node_modules/js-yaml/lib/js-yaml/common.js"(exports2, module2) {
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

// node_modules/js-yaml/lib/js-yaml/exception.js
var require_exception = __commonJS({
  "node_modules/js-yaml/lib/js-yaml/exception.js"(exports2, module2) {
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

// node_modules/js-yaml/lib/js-yaml/mark.js
var require_mark = __commonJS({
  "node_modules/js-yaml/lib/js-yaml/mark.js"(exports2, module2) {
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

// node_modules/js-yaml/lib/js-yaml/type.js
var require_type = __commonJS({
  "node_modules/js-yaml/lib/js-yaml/type.js"(exports2, module2) {
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

// node_modules/js-yaml/lib/js-yaml/schema.js
var require_schema = __commonJS({
  "node_modules/js-yaml/lib/js-yaml/schema.js"(exports2, module2) {
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

// node_modules/js-yaml/lib/js-yaml/type/str.js
var require_str = __commonJS({
  "node_modules/js-yaml/lib/js-yaml/type/str.js"(exports2, module2) {
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

// node_modules/js-yaml/lib/js-yaml/type/seq.js
var require_seq = __commonJS({
  "node_modules/js-yaml/lib/js-yaml/type/seq.js"(exports2, module2) {
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

// node_modules/js-yaml/lib/js-yaml/type/map.js
var require_map = __commonJS({
  "node_modules/js-yaml/lib/js-yaml/type/map.js"(exports2, module2) {
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

// node_modules/js-yaml/lib/js-yaml/schema/failsafe.js
var require_failsafe = __commonJS({
  "node_modules/js-yaml/lib/js-yaml/schema/failsafe.js"(exports2, module2) {
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

// node_modules/js-yaml/lib/js-yaml/type/null.js
var require_null = __commonJS({
  "node_modules/js-yaml/lib/js-yaml/type/null.js"(exports2, module2) {
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

// node_modules/js-yaml/lib/js-yaml/type/bool.js
var require_bool = __commonJS({
  "node_modules/js-yaml/lib/js-yaml/type/bool.js"(exports2, module2) {
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

// node_modules/js-yaml/lib/js-yaml/type/int.js
var require_int = __commonJS({
  "node_modules/js-yaml/lib/js-yaml/type/int.js"(exports2, module2) {
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

// node_modules/js-yaml/lib/js-yaml/type/float.js
var require_float = __commonJS({
  "node_modules/js-yaml/lib/js-yaml/type/float.js"(exports2, module2) {
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

// node_modules/js-yaml/lib/js-yaml/schema/json.js
var require_json = __commonJS({
  "node_modules/js-yaml/lib/js-yaml/schema/json.js"(exports2, module2) {
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

// node_modules/js-yaml/lib/js-yaml/schema/core.js
var require_core = __commonJS({
  "node_modules/js-yaml/lib/js-yaml/schema/core.js"(exports2, module2) {
    "use strict";
    var Schema = require_schema();
    module2.exports = new Schema({
      include: [
        require_json()
      ]
    });
  }
});

// node_modules/js-yaml/lib/js-yaml/type/timestamp.js
var require_timestamp = __commonJS({
  "node_modules/js-yaml/lib/js-yaml/type/timestamp.js"(exports2, module2) {
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

// node_modules/js-yaml/lib/js-yaml/type/merge.js
var require_merge = __commonJS({
  "node_modules/js-yaml/lib/js-yaml/type/merge.js"(exports2, module2) {
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

// node_modules/js-yaml/lib/js-yaml/type/binary.js
var require_binary = __commonJS({
  "node_modules/js-yaml/lib/js-yaml/type/binary.js"(exports2, module2) {
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

// node_modules/js-yaml/lib/js-yaml/type/omap.js
var require_omap = __commonJS({
  "node_modules/js-yaml/lib/js-yaml/type/omap.js"(exports2, module2) {
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

// node_modules/js-yaml/lib/js-yaml/type/pairs.js
var require_pairs = __commonJS({
  "node_modules/js-yaml/lib/js-yaml/type/pairs.js"(exports2, module2) {
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

// node_modules/js-yaml/lib/js-yaml/type/set.js
var require_set = __commonJS({
  "node_modules/js-yaml/lib/js-yaml/type/set.js"(exports2, module2) {
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

// node_modules/js-yaml/lib/js-yaml/schema/default_safe.js
var require_default_safe = __commonJS({
  "node_modules/js-yaml/lib/js-yaml/schema/default_safe.js"(exports2, module2) {
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

// node_modules/js-yaml/lib/js-yaml/type/js/undefined.js
var require_undefined = __commonJS({
  "node_modules/js-yaml/lib/js-yaml/type/js/undefined.js"(exports2, module2) {
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

// node_modules/js-yaml/lib/js-yaml/type/js/regexp.js
var require_regexp = __commonJS({
  "node_modules/js-yaml/lib/js-yaml/type/js/regexp.js"(exports2, module2) {
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

// node_modules/js-yaml/lib/js-yaml/type/js/function.js
var require_function = __commonJS({
  "node_modules/js-yaml/lib/js-yaml/type/js/function.js"(exports2, module2) {
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

// node_modules/js-yaml/lib/js-yaml/schema/default_full.js
var require_default_full = __commonJS({
  "node_modules/js-yaml/lib/js-yaml/schema/default_full.js"(exports2, module2) {
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

// node_modules/js-yaml/lib/js-yaml/loader.js
var require_loader = __commonJS({
  "node_modules/js-yaml/lib/js-yaml/loader.js"(exports2, module2) {
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

// node_modules/js-yaml/lib/js-yaml/dumper.js
var require_dumper = __commonJS({
  "node_modules/js-yaml/lib/js-yaml/dumper.js"(exports2, module2) {
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

// node_modules/js-yaml/lib/js-yaml.js
var require_js_yaml = __commonJS({
  "node_modules/js-yaml/lib/js-yaml.js"(exports2, module2) {
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

// node_modules/js-yaml/index.js
var require_js_yaml2 = __commonJS({
  "node_modules/js-yaml/index.js"(exports2, module2) {
    "use strict";
    var yaml2 = require_js_yaml();
    module2.exports = yaml2;
  }
});

// node_modules/gray-matter/lib/engines.js
var require_engines = __commonJS({
  "node_modules/gray-matter/lib/engines.js"(exports, module) {
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

// node_modules/strip-bom-string/index.js
var require_strip_bom_string = __commonJS({
  "node_modules/strip-bom-string/index.js"(exports2, module2) {
    "use strict";
    module2.exports = function(str2) {
      if (typeof str2 === "string" && str2.charAt(0) === "\uFEFF") {
        return str2.slice(1);
      }
      return str2;
    };
  }
});

// node_modules/gray-matter/lib/utils.js
var require_utils = __commonJS({
  "node_modules/gray-matter/lib/utils.js"(exports2) {
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

// node_modules/gray-matter/lib/defaults.js
var require_defaults = __commonJS({
  "node_modules/gray-matter/lib/defaults.js"(exports2, module2) {
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

// node_modules/gray-matter/lib/engine.js
var require_engine = __commonJS({
  "node_modules/gray-matter/lib/engine.js"(exports2, module2) {
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

// node_modules/gray-matter/lib/stringify.js
var require_stringify = __commonJS({
  "node_modules/gray-matter/lib/stringify.js"(exports2, module2) {
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

// node_modules/gray-matter/lib/excerpt.js
var require_excerpt = __commonJS({
  "node_modules/gray-matter/lib/excerpt.js"(exports2, module2) {
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

// node_modules/gray-matter/lib/to-file.js
var require_to_file = __commonJS({
  "node_modules/gray-matter/lib/to-file.js"(exports2, module2) {
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

// node_modules/gray-matter/lib/parse.js
var require_parse = __commonJS({
  "node_modules/gray-matter/lib/parse.js"(exports2, module2) {
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

// node_modules/gray-matter/index.js
var require_gray_matter = __commonJS({
  "node_modules/gray-matter/index.js"(exports2, module2) {
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

// scripts/manager-core.mjs
var import_node_fs = __toESM(require("node:fs"), 1);
var import_node_os = __toESM(require("node:os"), 1);
var import_node_path = __toESM(require("node:path"), 1);
var import_node_child_process = require("node:child_process");
var import_node_http = __toESM(require("node:http"), 1);
var import_gray_matter = __toESM(require_gray_matter(), 1);

// scripts/ui-template.mjs
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
  /* \u591A\u8FDE\u63A5\u65F6\u7684\u7D27\u51D1\u4E0B\u62C9\uFF08\u672C\u5730\u8C03\u8BD5\u5165\u53E3\u624D\u4F1A\u9047\u5230\uFF09 */
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
  <span class="title" data-i18n="appTitle">\u535A\u5BA2\u53D1\u5E03\u5668</span>
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
    appTitle: '\u535A\u5BA2\u53D1\u5E03\u5668',
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
    toastAutoTitle: '\u81EA\u52A8\u540C\u6B65',
    toastAutoFailed: '\u81EA\u52A8\u540C\u6B65\u63A8\u9001\u5931\u8D25\uFF0C\u6539\u52A8\u8FD8\u6CA1\u4E0A\u7EBF',
    toastAutoBuildFailed: '\u63A8\u4E0A\u53BB\u4E86\uFF0C\u4F46 GitHub \u6784\u5EFA\u5931\u8D25\uFF0C\u7EBF\u4E0A\u8FD8\u662F\u65E7\u7248',
    toastAutoTimeout: '\u63A8\u4E0A\u53BB\u4E86\uFF0C\u4F46\u7B49\u4E86 10 \u5206\u949F\u8FD8\u6CA1\u4E0A\u7EBF\uFF0C\u53EF\u80FD\u6784\u5EFA\u5361\u4F4F\u4E86',
    toastAutoLive: function (c) { return c ? '\u5DF2\u81EA\u52A8\u540C\u6B65\u5E76\u4E0A\u7EBF\uFF08' + c + '\uFF09' : '\u5DF2\u81EA\u52A8\u540C\u6B65\u5E76\u4E0A\u7EBF' },
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
    appTitle: 'Blog Publisher',
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
    toastAutoTitle: 'Auto sync',
    toastAutoFailed: 'Auto sync failed to push \u2014 the change is not online yet',
    toastAutoBuildFailed: 'Pushed, but the GitHub build failed \u2014 the site is still the old version',
    toastAutoTimeout: 'Pushed, but it is still not live after 10 minutes \u2014 the build may be stuck',
    toastAutoLive: function (c) { return c ? 'Auto-synced and live (' + c + ')' : 'Auto-synced and live' },
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
 * \u76F4\u63A5\u7528\u6D4F\u89C8\u5668\u5F00 127.0.0.1:3457 \u65F6\u6CA1\u6709\u5BBF\u4E3B\uFF0C\u53EA\u80FD\u6309\u6D4F\u89C8\u5668\u8BED\u8A00\u731C\u4E00\u6B21\u3002
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
// \u6CA1\u6709\u5BBF\u4E3B\u65F6\u9000\u56DE\u8DDF\u968F\u7CFB\u7EDF\uFF08prefers-color-scheme\uFF09\u3002
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
  // \u63D2\u4EF6\u91CC\u6CA1\u6709\u300C\u5207\u6362\u5E93\u300D\u7684\u4E0B\u62C9\uFF0C\u6539\u4E3A\u6309\u5F53\u524D\u6253\u5F00\u7684\u5E93\u81EA\u52A8\u5BF9\u9F50\u6D3B\u52A8\u8FDE\u63A5
  syncActiveByVault();
}

// ---- \u63D2\u4EF6\u91CC\u6309\u300C\u5F53\u524D\u6253\u5F00\u7684\u5E93\u300D\u81EA\u52A8\u9009\u4E2D\u8FDE\u63A5 ----
// Obsidian \u4E00\u6B21\u53EA\u6253\u5F00\u4E00\u4E2A\u5E93\uFF0C\u5E93\u4E0E\u8FDE\u63A5\u662F\u4E00\u5BF9\u4E00\u7684\uFF1A\u7528\u6237\u4E0D\u8BE5\u5728\u754C\u9762\u91CC\u9009\u5E93\u3002
// \u5BBF\u4E3B\u628A\u5E93\u7684\u7EDD\u5BF9\u8DEF\u5F84\u5F53 vault \u53C2\u6570\u4F20\u8FDB\u6765\uFF08\u89C1 obsidian-plugin/src/main.ts\uFF09\uFF0C
// \u8FD9\u91CC\u62FF\u5B83\u548C\u6BCF\u6761\u8FDE\u63A5\u7684 vaultPath \u6BD4\u4E00\u4E0B\uFF0C\u4E0D\u4E00\u81F4\u5C31\u6084\u6084\u5207\u8FC7\u53BB\uFF08\u53EA\u5207\u4E00\u6B21\uFF09\u3002
let EMBED_VAULT = '';
let embedSynced = false;
function syncActiveByVault() {
  if (!EMBED_VAULT || embedSynced) return;
  // \u6CE8\u610F\uFF1A\u6574\u6BB5\u754C\u9762\u5904\u5728\u5916\u5C42\u6A21\u677F\u5B57\u9762\u91CF\u91CC\uFF0C\u6B63\u5219\u91CC\u7684\u53CD\u659C\u6760\u4F1A\u88AB\u5403\u6389\u4E00\u5C42\uFF0C
  // \u7ED3\u5C3E\u90A3\u534A\u4E2A\u4F1A\u88AB\u5F53\u6210\u6CE8\u91CA\u5F00\u5934\u3002\u6240\u4EE5\u8FD9\u91CC\u4E0D\u7528\u6B63\u5219\uFF0C\u6539\u7528 split/join\u3002
  const BS = String.fromCharCode(92);
  const norm = (p) => {
    let s = String(p || '').split(BS).join('/');
    while (s.length > 1 && s.charAt(s.length - 1) === '/') s = s.slice(0, -1);
    return s.toLowerCase();
  };
  const want = S.connections.find((c) => norm(c.vaultPath) === norm(EMBED_VAULT));
  // \u5F53\u524D\u6253\u5F00\u7684\u5E93\u8FD8\u6CA1\u5EFA\u8FC7\u8FDE\u63A5\uFF1A\u4FDD\u6301\u539F\u6837\uFF0C\u8BA9\u7528\u6237\u5728\u300C\u8BBE\u7F6E\u300D\u91CC\u5EFA\u4E00\u6761
  if (!want || want.id === S.active) { embedSynced = true; return; }
  embedSynced = true;
  api('/api/connection/switch', { id: want.id })
    .then(() => loadState())
    .catch(() => { embedSynced = false; });   // \u5931\u8D25\u4E86\u4E0B\u6B21\u8F6E\u8BE2\u518D\u8BD5
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
  notifyAutoLog(log);
}

// \u81EA\u52A8\u540C\u6B65\u662F\u540E\u53F0\u81EA\u5DF1\u8DD1\u5B8C\u7684\uFF1A\u6CA1\u6709\u5F39\u7A97\u7684\u8BDD\uFF0C\u7528\u6237\u53EA\u6709\u4E3B\u52A8\u53BB\u770B\u6D41\u6C34\u624D\u77E5\u9053\u6210\u6CA1\u6210\u3002
// \u7528\u6237\u660E\u786E\u8981\u6C42\u300C\u66F4\u65B0\u5B8C\u6210\u5FC5\u987B\u8981\u6709\u5F39\u7A97\u63D0\u793A\uFF0C\u4E0D\u7136\u90FD\u4E0D\u77E5\u9053\u662F\u6CA1\u63A8\u9001\u6210\u529F\u8FD8\u662F\u6B63\u5728\u66F4\u65B0\u300D\u3002
// \u505A\u6CD5\uFF1A\u628A\u300C\u5DF2\u7ECF\u63D0\u793A\u5230\u54EA\u4E00\u6761\u300D\u8BB0\u5728 localStorage\uFF08\u6309\u8FDE\u63A5\u5206\u5F00\uFF09\uFF0C\u53EA\u5BF9\u66F4\u65B0\u7684\u7ED3\u8BBA\u5F39\u4E00\u6B21\u3002
// \u7528 localStorage \u800C\u4E0D\u662F\u5185\u5B58\u53D8\u91CF\uFF0C\u662F\u56E0\u4E3A\u540C\u6B65\u5E38\u5E38\u5728\u754C\u9762\u5173\u7740\u7684\u65F6\u5019\u8DD1\u5B8C \u2014\u2014
// \u4E0B\u6B21\u6253\u5F00\u754C\u9762\u5E94\u8BE5\u8865\u4E0A\u90A3\u6761\u7ED3\u679C\uFF0C\u800C\u4E0D\u662F\u5F53\u5386\u53F2\u9759\u97F3\u6389\u3002
const AUTO_SEEN_KEY = 'autolog-seen-';
let _autoToastSeenAt = 0;
let _autoToastKey = '';
function notifyAutoLog(log) {
  if (!Array.isArray(log) || !log.length) return;
  const key = AUTO_SEEN_KEY + (S.active || '');
  if (key !== _autoToastKey) {
    _autoToastKey = key;
    let v = 0;
    try { v = Number(localStorage.getItem(key) || 0) || 0; } catch (e) { v = 0; }
    if (!v) {
      // \u8FD9\u4E2A\u8FDE\u63A5\u7B2C\u4E00\u6B21\u89C1\uFF1A\u628A\u73B0\u6709\u5386\u53F2\u6574\u4F53\u5F53\u5DF2\u8BFB\uFF0C\u514D\u5F97\u4E00\u8FDB\u754C\u9762\u8FDE\u5F39\u4E00\u5806\u65E7\u8BB0\u5F55
      const newest = log.reduce((a, e) => (Number(e.at) > Number(a.at) ? e : a), log[0]);
      v = Number(newest.at) || 0;
      try { localStorage.setItem(key, String(v)); } catch (e) { /* \u5B58\u4E0D\u4E86\u5C31\u6BCF\u6B21\u91CD\u6765 */ }
    }
    _autoToastSeenAt = v;
  }
  // \u53EA\u770B\u7ED3\u8BBA\u5DF2\u5B9A\u7684\u6761\u76EE\uFF1A\u8FD8\u5728 pushing \u7684\u4E0D\u5F39\uFF0C\u7B49\u5B83\u51FA\u7ED3\u679C\uFF08\u4E0B\u4E00\u8F6E\u8F6E\u8BE2\u4F1A\u518D\u8FDB\u6765\uFF09\u3002
  const done = log.filter((e) => {
    const at = Number(e.at) || 0;
    if (at <= _autoToastSeenAt) return false;
    return !!(e.failed || e.buildFailed || e.liveTimeout || e.live || e.pushed === false);
  });
  if (!done.length) return;
  const e = done.reduce((a, x) => (Number(x.at) > Number(a.at) ? x : a), done[0]);
  _autoToastSeenAt = Number(e.at) || 0;
  try { localStorage.setItem(key, String(_autoToastSeenAt)); } catch (err) { /* \u540C\u4E0A */ }
  const c = e.counts || {};
  const counts = [c.added ? '+' + c.added : '', c.modified ? '~' + c.modified : '', c.deleted ? '-' + c.deleted : '']
    .filter(Boolean).join(' ');
  const files = e.files || {};
  const detail = []
    .concat((files.added || []).map((p) => '+ ' + p))
    .concat((files.modified || []).map((p) => '~ ' + p))
    .concat((files.deleted || []).map((p) => '- ' + p))
    .join('\\n');
  const tid = toastOpen(t('toastAutoTitle'), '');
  if (e.failed) {
    toastSet(tid, 'bad', t('toastFailed'), t('toastAutoFailed'), detail || String(e.error || ''));
  } else if (e.buildFailed) {
    toastSet(tid, 'bad', t('toastFailed'), t('toastAutoBuildFailed'), detail || String(e.buildConclusion || ''));
  } else if (e.liveTimeout) {
    toastSet(tid, 'bad', t('toastFailed'), t('toastAutoTimeout'), detail);
  } else if (e.live) {
    toastSet(tid, 'ok', t('toastDone'), tf('toastAutoLive', counts), detail);
  } else {
    // pushed === false\uFF1A\u8FD9\u6B21\u6CA1\u6709\u4E1C\u897F\u53EF\u63A8\uFF08\u65B0\u5EFA\u4ED3\u5E93\u9996\u6B21\u8DD1\u7684\u60C5\u51B5\uFF09\uFF0C\u4E0D\u7B97\u5931\u8D25
    toastSet(tid, 'ok', t('toastDone'), t('toastNothingToPush'), detail);
  }
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
// \uFF08\u672C\u5730\u8C03\u8BD5\u5165\u53E3\u914D\u7F6E\u8FC7\u591A\u4E2A\u8FDE\u63A5\u65F6\uFF0C\u8FD9\u91CC\u7ED9\u4E00\u4E2A\u6781\u7A84\u7684\u4E0B\u62C9\u505A\u5207\u6362\u3002\uFF09
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

  // \u591A\u4E2A\u8FDE\u63A5\u65F6\u7ED9\u4E00\u4E2A\u7D27\u51D1\u7684\u4E0B\u62C9\u3002
  // \u4F46\u63D2\u4EF6\u91CC\uFF08embed=1\uFF09**\u4E0D\u7ED9**\uFF1AObsidian \u4E00\u6B21\u53EA\u6253\u5F00\u4E00\u4E2A\u5E93\uFF0C\u5E93\u548C\u8FDE\u63A5\u662F\u4E00\u5BF9\u4E00\u7684\uFF0C
  // \u6446\u4E00\u4E2A\u300C\u9009\u54EA\u4E2A\u5E93\u300D\u7684\u4E0B\u62C9\u53EA\u4F1A\u8BA9\u4EBA\u4EE5\u4E3A\u8981\u5728\u8FD9\u91CC\u5207\u5E93\uFF08\u7528\u6237\u539F\u8BDD\uFF1A\u300C\u8FD9\u4E2A\u9009\u62E9\u6CA1\u5FC5\u8981\u5427\uFF1F\u300D\uFF09\u3002
  // \u63D2\u4EF6\u6A21\u5F0F\u4E0B\u6539\u4E3A\u6309\u5F53\u524D\u6253\u5F00\u7684\u5E93\u81EA\u52A8\u9009\u4E2D\u5BF9\u5E94\u8FDE\u63A5\uFF0C\u89C1\u4E0B\u9762\u7684 autoPickByVault\u3002
  const embedded = document.body.classList.contains('embed-mode');
  if (S.connections.length > 1 && !embedded) {
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
// vault\uFF1A\u5BBF\u4E3B\u628A\u5F53\u524D\u6253\u5F00\u7684\u5E93\u7684\u7EDD\u5BF9\u8DEF\u5F84\u4E00\u8D77\u4F20\u8FDB\u6765\uFF0C\u7528\u6765\u5728\u63D2\u4EF6\u91CC\u81EA\u52A8\u9009\u4E2D\u5BF9\u5E94\u8FDE\u63A5
// \uFF08\u63D2\u4EF6\u91CC\u6CA1\u6709\u300C\u5207\u6362\u5E93\u300D\u7684\u4E0B\u62C9 \u2014\u2014 Obsidian \u4E00\u6B21\u53EA\u5F00\u4E00\u4E2A\u5E93\uFF0C\u5E93\u548C\u8FDE\u63A5\u662F\u4E00\u5BF9\u4E00\u7684\uFF09\u3002
if (new URLSearchParams(location.search).get('embed') === '1') {
  document.body.classList.add('embed-mode');
  EMBED_VAULT = new URLSearchParams(location.search).get('vault') || '';
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

// scripts/theme-presets.mjs
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

// scripts/theme-previews.mjs
var THEME_PREVIEWS = {
  "default": "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",
  "study": "iVBORw0KGgoAAAANSUhEUgAAA5gAAAHMCAMAAACHlvdHAAAB4FBMVEX///////z///r//vv///n//vn///j///f//vj//vf//vb//ff//fb9/vn9/Pf///P//fX//PX+/PX//PP9/PT++/P++fD8+fP8+fH8+e/6+vL79+/79u/49vD+++f89un79e359e349e339e369er59Ov49O349Oz49Ov48+v39O339Ov38+v28+v58+r39Or38+r28+r68+X38un28ur28un48uj28uj68uH19u/18uv18un18ujy9e/k9/b38ej28en28ej18en18ej08en08On18ef08ef08eb08Of08Obz8Ofz7+b07+Xy7+Xy7uXy7uT579r369bw7ubw7OPx7OHw7ODw6+Hw7tvw69/v69/w69vv6t/v6d3u6t3u6d3u6N3v6Nrt6d/s59nt5trs5trs5tnr5tns5tjr5tjr5tfm6+XV6+7u5Nnr5djr5Nfp5Nn148bq5Nbq49bp49Tn49no4tPn49Ho4NLm39Ht3cPl39Dl3tDl3s/l3s7l28nj39Hh38Ph2snf1sve1sPj1r3h1cfd1cTd1MHh1LrW29TC2t/jza/RzsDCzMbRwaq8wbnFtJyvwcGsr6WevL+fqaGMr7Kkn4+RnpmZjnp8joZfh4lWaF4saU5MVFExOTuItlDFAABcRElEQVR42u2di0MaV/bHB0PEF4IIGDWCJmZ1fQUfiI9CoqP05+sX0Vib1mysm2S7C01KE1xjqrHJpmlmYBiYAYZH4F/9nRkeIo8E2+wvqZ5Pq/F153Hmfu8599w79xJmBEE+Owg0AYKgMBEEQWEiCAoTQZDPX5gz5LnHghUM+dyEOXCl69zTjxUM+dyEeffng3PPP9BlIp+XME0rhxt3zjlbq8/uos9EPi9hrr7o6j3nmNqfbfdgFUP+e8K0z+USOuJ3S9PSD5cXyNxfLC7PFgqz/7zHcWTXcxQm8t8Qpn1ZkuDUJaOoTHLa3De+ZLZ06Mfhu9k2tX4oK9jZxubxWRQmChP5LwrTZBo2SYy1qIZEZY785jIukdPtQ6N3nc03el4w1hvzU2uBIOPstIMcLeT8iD9o7V4gyWly+vcJkzzxBVniF/lYpn/Hrc7+rl+lzzeLwkQ+tTBNG+vjC3PAkjEguMZnLVNrybhLf8n4ytnqTYan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",
  "sakura": "iVBORw0KGgoAAAANSUhEUgAAA5gAAAHMCAMAAACHlvdHAAAB4FBMVEX///////7///X6//7//v///v7+/v7//vz+/f7//fz//Pz9/f3//fr//Pv+/Pv//Pr9/Pv/+/v/+/r++/r9+/z/+/n/+vr++vv++vr9+vv++vn++fv/+fn++fn/+fj9+fv9+fn9+fj++Pj9+Pr9+Pn9+Pj++vL8+/v8+Pz8+Pn8+Pj8+Pb2+vz+9/f99/j99/f89/j89/f79/r79/j79/f69/j99vf79vr79vj79vf69vn89ff69ff69Pf89vb79vb69vb89PX79Pb79PX69PX78/b79PT78/T68/T99ef78vX68vT68vP68PP98OH49PX58fP58fL48fL58PL48PP48PL48PH38PL47/H37/L37/H37vH48PD47vD37vD48ej57fH47fD47e/37fD37e/47ej18PHp8ff37PD37O/37O746+/27O726+/26+737O326+367N/54s316Ozy7O306Ovv6ejw5ubw1svn5Ofl3t/h2Nji0MnY2eDWzM3H3fLCzd7iwrXRxMbJwsnHu8DQta7Cs7jMp6S5t8S6qq+luNepqry0oam0nJyqnKeZnbS4lZjEhY2olJynjJGekJudhI2ThI94haCib2uBbW9oanxkW2RoTUpNRlVMNz86JjHmSE57AABHdElEQVR42u2di0MaZ9bwH0SumovRpEhfDKaCCSVBGuLWbhfdV9eNX1NJzddNtk2Td9+k8KWb7SpBrjowXAYHEGS4y+1f/c4AKiYYNVHMJufXBm8wMzzMb855zvPMDFEjCPLBQbAJEATFRBAExUQQFBNBkP8oMcc+KXCvQv4DxFQqBgbOf0oMDCiUuGMhH7aYCvX0d89+e/Up8fuL+9PqYdy1kA9XTOXwvdXV3x/N3v2UmPvxt1erj24ocOdCPlAxFcblZZ1aPawY/JRQ8Jnsk1dzA7h3IacspknX+kbHf6MzNb+f2f01PGNa98arBudW73+qe+fA9OoPaCZySmLenmo9S94QEvY3BUgparxIRwgZ2LWREPXrZg5Pr345+Mk2rEL96t4g7l/ICYqpUMD/DUA9/hdjPqcIoqPoisJhJepBr0+nNqmtbJiyipohVGcMB00DJvih3c7l2RPYM3Un9lZ1J7mcwxc2bHg1hfsXcoJiWi0K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",
  "mono": "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",
  "tree": "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",
  "bento": "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",
  "neon": "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"
};
var THEME_PREVIEW_VERSION = "4dd7d5841b";

// scripts/manager-core.mjs
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
  const LOCK_DIR = import_node_path.default.join(DATA_DIR, "locks");
  const LOCK_STALE_MS = 10 * 60 * 1e3;
  function lockFileOf(key) {
    return import_node_path.default.join(LOCK_DIR, String(key || "publish").replace(/[^\w.-]/g, "_") + ".lock");
  }
  function readLockFile(file) {
    try {
      const j = JSON.parse(import_node_fs.default.readFileSync(file, "utf8"));
      return j && typeof j === "object" ? j : null;
    } catch {
      return null;
    }
  }
  function pidAlive(pid) {
    if (!Number.isFinite(pid) || pid <= 0) return false;
    try {
      process.kill(pid, 0);
      return true;
    } catch (e) {
      return !!e && e.code === "EPERM";
    }
  }
  function acquireLock(key) {
    const file = lockFileOf(key);
    try {
      import_node_fs.default.mkdirSync(LOCK_DIR, { recursive: true });
    } catch {
      return { ok: true, release() {
      }, degraded: true };
    }
    const me = { pid: process.pid, at: Date.now(), host: import_node_os.default.hostname() };
    for (let i = 0; i < 3; i++) {
      try {
        const fd = import_node_fs.default.openSync(file, "wx");
        try {
          import_node_fs.default.writeFileSync(fd, JSON.stringify(me));
        } finally {
          import_node_fs.default.closeSync(fd);
        }
        let released = false;
        return {
          ok: true,
          release() {
            if (released) return;
            released = true;
            try {
              const cur = readLockFile(file);
              if (!cur || cur.pid === process.pid) import_node_fs.default.rmSync(file, { force: true });
            } catch {
            }
          }
        };
      } catch (e) {
        if (!e || e.code !== "EEXIST") return { ok: true, release() {
        }, degraded: true };
        const cur = readLockFile(file);
        const stale = !cur || !pidAlive(cur.pid) || Date.now() - (Number(cur.at) || 0) > LOCK_STALE_MS;
        if (!stale) return { ok: false, holder: cur };
        try {
          import_node_fs.default.rmSync(file, { force: true });
        } catch {
        }
      }
    }
    return { ok: false, holder: readLockFile(file) };
  }
  async function withPublishLock(key, fn) {
    const lk = acquireLock(key);
    if (!lk.ok) return { busy: true, holder: lk.holder };
    try {
      return await fn();
    } finally {
      lk.release();
    }
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
  async function remoteHasHead(conn, workdir) {
    try {
      const head = git(["rev-parse", "HEAD"], workdir).trim();
      if (!head) return false;
      let branch = "";
      try {
        branch = git(["rev-parse", "--abbrev-ref", "HEAD"], workdir).trim();
      } catch {
        return false;
      }
      if (!branch || branch === "HEAD") return false;
      const out = git(["ls-remote", "origin", "refs/heads/" + branch], workdir);
      const remoteSha = (out.split(/\s+/)[0] || "").trim();
      return !!remoteSha && remoteSha === head;
    } catch {
      return false;
    }
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
        let alreadyPushed = false;
        if (await remoteHasHead(conn, workdir)) {
          alreadyPushed = true;
          pushed = true;
          log2.push(msg2("logPushedAlready"));
        }
        if (!alreadyPushed) {
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
        }
        if (!alreadyPushed) {
          try {
            git(["push", "origin", "HEAD"], workdir);
            pushed = true;
            log2.push(msg2("logPushed"));
          } catch (e) {
            const text = String(e && e.message || e);
            if (/Could not connect|Failed to connect|unable to access|Connection was reset|timed out|SSL/i.test(text)) {
              failKind = "network";
            }
            if (await remoteHasHead(conn, workdir)) {
              pushed = true;
              failKind = null;
              log2.push(msg2("logPushedAlready"));
            } else {
              throw e;
            }
          }
        }
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
      errPublishingOther: "\u53E6\u4E00\u4E2A\u53D1\u5E03\u8FDB\u7A0B\uFF08\u53E6\u4E00\u7A97\u53E3\u7684\u53D1\u5E03\u5668\uFF0C\u6216\u672C\u5730\u8C03\u8BD5\u5165\u53E3\uFF09\u6B63\u5728\u63A8\u9001\uFF0C\u8BF7\u7B49\u5B83\u7ED3\u675F\u518D\u8BD5",
      logPublic: (n, c, r) => `\u516C\u5F00\u7B14\u8BB0 ${n} \u7BC7\uFF1A\u65B0\u589E/\u66F4\u65B0 ${c}\uFF0C\u79FB\u9664\u8FC7\u671F ${r}`,
      logSiteName: (prev, want) => `\u5DF2\u66F4\u65B0\u7F51\u9875\u6807\u9898\u7684\u7AD9\u540D\uFF1A${prev ? "\u300C" + prev + "\u300D\u2192 " : ""}\u300C${want}\u300D`,
      logFresh: "\u7EBF\u4E0A\u5DF2\u662F\u6700\u65B0\uFF0C\u65E0\u9700\u63A8\u9001",
      logPushed: "\u5DF2\u63A8\u9001 GitHub\uFF0CActions \u6784\u5EFA\u4E2D\uFF081~2 \u5206\u949F\u540E\u7F51\u7AD9\u81EA\u52A8\u66F4\u65B0\uFF09",
      logPushedAlready: "\u8FDC\u7AEF\u5DF2\u6709\u8FD9\u4E2A\u63D0\u4EA4\uFF08\u53EF\u80FD\u662F\u53E6\u4E00\u4E2A\u7BA1\u7406\u5668\u6216\u4E0A\u4E00\u6B21\u63A8\u9001\u5DF2\u7ECF\u6210\u529F\uFF09\uFF0C\u5185\u5BB9\u5DF2\u7ECF\u5728\u7EBF\u4E0A\u4E86",
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
      gitUserName: "\u535A\u5BA2\u53D1\u5E03\u5668",
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
      errPublishingOther: "Another publisher (another window, or the local dev server) is pushing right now. Wait for it to finish.",
      logPublic: (n, c, r) => `${n} public ${n === 1 ? "note" : "notes"}: ${c} added/updated, ${r} stale removed`,
      logSiteName: (prev, want) => `Site title updated: ${prev ? '"' + prev + '" \u2192 ' : ""}"${want}"`,
      logFresh: "Already up to date \u2014 nothing to push",
      logPushed: "Pushed to GitHub \u2014 Actions is building (the site updates in 1~2 minutes)",
      logPushedAlready: "The remote already has this commit (another manager, or an earlier push that did go through) \u2014 the content is already online",
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
        const lk = acquireLock("publish-" + conn.id);
        if (!lk.ok) {
          return json(res, 409, { error: sm(langOf(req), "errPublishingOther"), busy: true });
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
          lk.release();
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
        const lkSrc = acquireLock("publish-" + conn.id);
        if (!lkSrc.ok) {
          return json(res, 409, { error: sm(langOf(req), "errPublishingOther"), busy: true });
        }
        let r;
        try {
          r = await updateSource(conn, wd.workdir, langOf(req));
        } finally {
          lkSrc.release();
        }
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
        const lkT = acquireLock("publish-" + conn.id);
        if (!lkT.ok) {
          return json(res, 409, { error: sm(langOf(req), "errPublishingOther"), busy: true, bytes: w.bytes });
        }
        let r;
        try {
          r = await publishThemeOnly(conn, wd.workdir, langOf(req), w.bytes);
        } finally {
          lkT.release();
        }
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
    const lk = acquireLock("publish-" + conn.id);
    if (!lk.ok) {
      requeueAutoSync(touched);
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
      lk.release();
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
        log(`[manager] Dev server: http://localhost:${actualPort}`);
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

// obsidian-plugin/src/worker-entry.ts
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
