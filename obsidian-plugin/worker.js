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
  .preset-preview img { width: 100%; height: auto; display: block; }
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
    const norm = (s) => String(s || '').replace(/s+/g, ' ').trim();
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
    markPreset('');
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
      "zh": "\u58A8\u7EFF\u4E66\u658B",
      "en": "Ink Study"
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
    "css": "/* ============================================================\n   \u58A8\u7EFF\u4E66\u658B \u2014\u2014 \u4E66\u9875\u6C14\u8D28\uFF1A\u6696\u7EB8\u5E95 + \u677E\u58A8\u7EFF + \u5168\u886C\u7EBF + \u9996\u884C\u7F29\u8FDB\n   \u7248\u9762\u5DEE\u5F02\u4F53\u73B0\u5728\uFF1A\u4E09\u5217\u7EB8\u5361\u9996\u9875 + \u4E66\u810A\u5F0F\u6807\u9898\u88C5\u9970\uFF08\u5BBD\u5EA6\u4E0E\u9ED8\u8BA4\u4E3B\u9898\u4E00\u81F4\uFF09\n   \uFF08\u5927\u7EB2\u662F\u7AD9\u70B9\u7684\u60AC\u6D6E\u7EC4\u4EF6\uFF0C\u4EFB\u4F55\u4E3B\u9898\u90FD\u4E0D\u53BB\u52A8\u5B83\u7684\u4F4D\u7F6E\u4E0E\u4EA4\u4E92\uFF09\n   ============================================================ */\n\n:root {\n  --radius: 0.2rem;\n\n  --background: #f6f2e9;\n  --foreground: #22302a;\n\n  --card: #fffdf6;\n  --card-foreground: #22302a;\n  --popover: #fffdf6;\n  --popover-foreground: #22302a;\n\n  --primary: #2f6b4f;\n  --primary-foreground: #f6f2e9;\n\n  --secondary: #e9e3d3;\n  --secondary-foreground: #22302a;\n  --muted: #ece6d8;\n  --muted-foreground: #6d7c71;\n  --accent: #e2ece5;\n  --accent-foreground: #22302a;\n\n  --border: #dcd3c0;\n  --input: #dcd3c0;\n  --ring: rgba(47, 107, 79, 0.45);\n\n  --code-bg: #f1ecdf;\n  --code-head-bg: #e6dfcd;\n  --code-head-fg: #5d6b60;\n  --code-fg: #22302a;\n}\n\nhtml.dark {\n  --background: #141a17;\n  --foreground: #dfe7e0;\n\n  --card: #1b2320;\n  --card-foreground: #dfe7e0;\n  --popover: #1b2320;\n  --popover-foreground: #dfe7e0;\n\n  --primary: #6fc394;\n  --primary-foreground: #10201a;\n\n  --secondary: #232d28;\n  --secondary-foreground: #dfe7e0;\n  --muted: #232d28;\n  --muted-foreground: #93a79a;\n  --accent: #26332c;\n  --accent-foreground: #e6eee8;\n\n  --border: rgba(160, 190, 170, 0.2);\n  --input: rgba(160, 190, 170, 0.26);\n  --ring: rgba(111, 195, 148, 0.6);\n\n  --code-bg: #1a221e;\n  --code-head-bg: #232d28;\n  --code-head-fg: #9db3a4;\n  --code-fg: #dfe7e0;\n}\n\n/* \u6B63\u6587\u5168\u7528\u886C\u7EBF\uFF0C\u6807\u9898\u66F4\u91CD\u4E00\u4E9B\uFF0C\u8BFB\u8D77\u6765\u50CF\u4E00\u672C\u4E66 */\nbody,\n.markdown-body {\n  font-family: 'Songti SC', 'STSong', 'Noto Serif SC', 'Source Han Serif SC',\n    'SimSun', Georgia, 'Times New Roman', serif;\n}\n\n.markdown-body {\n  line-height: 1.95;\n  letter-spacing: 0.01em;\n}\n\n.markdown-body h1,\n.markdown-body h2,\n.markdown-body h3 {\n  letter-spacing: 0.02em;\n}\n\n/* \u6BB5\u843D\u9996\u884C\u7F29\u8FDB\u4E24\u5B57\uFF0C\u4E2D\u6587\u957F\u6587\u7684\u4F20\u7EDF\u6392\u7248 */\n.markdown-body p {\n  text-indent: 2em;\n  margin: 0.75em 0;\n}\n.markdown-body li p,\n.markdown-body blockquote p,\n.markdown-body td p,\n.markdown-body .callout p {\n  text-indent: 0;\n}\n\n/* \u4E8C\u7EA7\u6807\u9898\u505A\u6210\u300C\u5C0F\u8282\u300D\u7684\u6837\u5B50\uFF1A\u5DE6\u4FA7\u4E00\u9053\u7AD6\u7EBF\uFF0C\u4E0D\u8981\u4E0B\u5212\u7EBF */\n.markdown-body h2 {\n  border-bottom: none;\n  border-left: 3px solid var(--primary);\n  padding-left: 0.6em;\n  margin-top: 2.2em;\n}\n\n/* \u5F15\u7528\u5757\uFF1A\u7AD6\u7EBF + \u6781\u6D45\u5E95\u8272 */\n.markdown-body blockquote {\n  border-left: 3px solid var(--primary);\n  background: color-mix(in srgb, var(--primary) 6%, transparent);\n  font-style: normal;\n}\n\n/* \u9876\u680F\uFF1A\u53BB\u6389\u6BDB\u73BB\u7483\uFF0C\u6539\u6210\u4E00\u6761\u7EB8\u8FB9 */\nheader.sticky {\n  background: var(--background);\n  backdrop-filter: none;\n  border-bottom: 1px solid var(--border);\n}\n\n/* ============================================================\n   \u7248\u9762\uFF1A\u4E09\u5217\u7EB8\u5361\u9996\u9875\n   \u26A0\uFE0F \u5BBD\u5EA6\u7531\u7AD9\u70B9\u7EDF\u4E00\u63A7\u5236\uFF08globals.css \u7684 --content-w\uFF09\uFF0C\u4E3B\u9898\u91CC\u4E0D\u5199 max-width\uFF1A\n   \u6240\u6709\u4E3B\u9898\u7684\u9996\u9875\u4E0E\u6B63\u6587\u5BBD\u5EA6\u5FC5\u987B\u5B8C\u5168\u4E00\u81F4\uFF0C\u4E3B\u9898\u53EA\u8D1F\u8D23\u989C\u8272\u3001\u7D20\u6750\uFF0C\u4EE5\u53CA\n   \u300C\u975E\u6B63\u6587\u754C\u9762\u300D\u7684\u6392\u5E03\uFF08\u9996\u9875\u6587\u4EF6\u5939 / \u7B14\u8BB0\u5217\u8868 / \u6807\u7B7E\u600E\u4E48\u6446\uFF09\u3002\n   \u5927\u7EB2\u662F\u7AD9\u70B9\u7684\u60AC\u6D6E\u7EC4\u4EF6\uFF0C\u4EFB\u4F55\u4E3B\u9898\u90FD\u4E0D\u53BB\u52A8\u5B83\u7684\u4F4D\u7F6E\u4E0E\u4EA4\u4E92\u3002\n   ============================================================ */\n\n/* \u9996\u9875\u5361\u7247\uFF1A\u7EC6\u8FB9\u6846 + \u6781\u8F7B\u7684\u7EB8\u9634\u5F71\uFF0C\u56FA\u5B9A\u4E09\u5217 */\n[data-region='folders'] {\n  display: grid !important;\n  grid-template-columns: repeat(3, minmax(0, 1fr));\n  gap: 1rem !important;\n}\n[data-region='folders'] a,\n[data-region='folders'] > * {\n  box-shadow: 0 1px 0 var(--border);\n  transition: box-shadow 0.18s ease, transform 0.18s ease;\n}\n[data-region='folders'] a:hover,\n[data-region='folders'] > *:hover {\n  box-shadow: 0 3px 14px rgba(47, 107, 79, 0.12);\n  transform: translateY(-1px);\n}\n\n/* \u7B14\u8BB0\u5217\u8868\uFF1A\u884C\u60AC\u505C\u65F6\u6781\u6D45\u7684\u7EFF */\n[data-region='main'] li:hover {\n  background: color-mix(in srgb, var(--primary) 5%, transparent);\n}\n\n/* \u9875\u811A\u4F4E\u8C03 */\n[data-region='footer'] {\n  opacity: 0.75;\n  font-size: calc(0.72 * var(--fsu, 1rem));\n  letter-spacing: 0.05em;\n}\n\n/* \u7A84\u5C4F\uFF1A\u5355\u5217 */\n@media (max-width: 1023px) {\n  [data-region='folders'] {\n    grid-template-columns: minmax(0, 1fr);\n  }\n}\n"
  },
  {
    "id": "sakura",
    "name": {
      "zh": "\u6A31\u7EB8",
      "en": "Sakura Paper"
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
    "css": "/* ============================================================\n   \u6A31\u7EB8 \u2014\u2014 \u6742\u5FD7\u6C14\u8D28\uFF1A\u6781\u6D45\u7C89\u767D + \u73AB\u7EA2\u70B9\u7F00 + \u5927\u7559\u767D + \u5355\u5217\u5927\u5361\u7247\n   \u7248\u9762\u5DEE\u5F02\u4F53\u73B0\u5728\uFF1A\u9996\u9875\u5355\u5217\u5927\u5361\u7247\uFF08\u4E00\u884C\u4E00\u4E2A\uFF09+ \u6587\u7AE0\u6807\u9898\u5C45\u4E2D\u653E\u5927\uFF08\u5BBD\u5EA6\u4E0E\u9ED8\u8BA4\u4E3B\u9898\u4E00\u81F4\uFF09\n   \uFF08\u5927\u7EB2\u662F\u7AD9\u70B9\u7684\u60AC\u6D6E\u7EC4\u4EF6\uFF0C\u4EFB\u4F55\u4E3B\u9898\u90FD\u4E0D\u53BB\u52A8\u5B83\u7684\u4F4D\u7F6E\u4E0E\u4EA4\u4E92\uFF09\n   ============================================================ */\n\n:root {\n  --radius: 1.1rem;\n\n  --background: #fdf8f8;\n  --foreground: #3a2b30;\n\n  --card: #ffffff;\n  --card-foreground: #3a2b30;\n  --popover: #ffffff;\n  --popover-foreground: #3a2b30;\n\n  --primary: #c2456b;\n  --primary-foreground: #fff8fa;\n\n  --secondary: #fbeef1;\n  --secondary-foreground: #4a3239;\n  --muted: #f7ecef;\n  --muted-foreground: #8a6f78;\n  --accent: #fce4ea;\n  --accent-foreground: #3a2b30;\n\n  --border: #f0dfe4;\n  --input: #f0dfe4;\n  --ring: rgba(194, 69, 107, 0.4);\n\n  --code-bg: #fbf2f4;\n  --code-head-bg: #f6e7eb;\n  --code-head-fg: #8a6f78;\n  --code-fg: #3a2b30;\n}\n\nhtml.dark {\n  --background: #1a1417;\n  --foreground: #f0e2e6;\n\n  --card: #241b1f;\n  --card-foreground: #f0e2e6;\n  --popover: #241b1f;\n  --popover-foreground: #f0e2e6;\n\n  --primary: #f08bab;\n  --primary-foreground: #2a1219;\n\n  --secondary: #2d2227;\n  --secondary-foreground: #f0e2e6;\n  --muted: #2d2227;\n  --muted-foreground: #b394a0;\n  --accent: #35262c;\n  --accent-foreground: #f7eaee;\n\n  --border: rgba(230, 170, 190, 0.18);\n  --input: rgba(230, 170, 190, 0.24);\n  --ring: rgba(240, 139, 171, 0.55);\n\n  --code-bg: #211a1e;\n  --code-head-bg: #2d2227;\n  --code-head-fg: #b394a0;\n  --code-fg: #f0e2e6;\n}\n\n/* \u5B57\u91CD\u8F7B\u4E00\u70B9\u3001\u5B57\u8DDD\u677E\u4E00\u70B9\uFF0C\u7559\u767D\u624D\u663E\u5F97\u662F\u523B\u610F\u7684 */\nbody,\n.markdown-body {\n  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'PingFang SC',\n    'Hiragino Sans GB', 'Microsoft YaHei', system-ui, sans-serif;\n}\n\n.markdown-body {\n  line-height: 2.05;\n  letter-spacing: 0.015em;\n}\n\n/* \u6807\u9898\u7528\u886C\u7EBF + \u5927\u5B57\u53F7 + \u677E\u5B57\u8DDD\uFF0C\u6B63\u6587\u65E0\u886C\u7EBF\uFF0C\u62C9\u5F00\u5C42\u6B21 */\n.markdown-body h1,\n.markdown-body h2,\n.markdown-body h3 {\n  font-family: 'Songti SC', 'STSong', 'Noto Serif SC', Georgia, serif;\n  letter-spacing: 0.03em;\n  font-weight: 600;\n}\n.markdown-body h2 {\n  border-bottom: none;\n  font-size: 1.42em;\n  margin-top: 2.6em;\n}\n/* \u6807\u9898\u4E0A\u65B9\u52A0\u4E00\u4E2A\u5C0F\u5706\u70B9\u505A\u5206\u9694\uFF0C\u6742\u5FD7\u611F */\n.markdown-body h2::before {\n  content: '';\n  display: block;\n  width: 0.42em;\n  height: 0.42em;\n  border-radius: 50%;\n  background: var(--primary);\n  margin-bottom: 0.55em;\n}\n\n.markdown-body blockquote {\n  border-left: none;\n  border-radius: var(--radius);\n  background: color-mix(in srgb, var(--primary) 6%, transparent);\n  padding: 1em 1.4em;\n  font-style: normal;\n  color: var(--foreground);\n}\n\n/* \u9876\u680F\uFF1A\u4E0D\u8981\u8FB9\u754C\uFF0C\u53EA\u7559\u4E00\u6761\u6781\u6DE1\u7684\u7EBF */\nheader.sticky {\n  background: color-mix(in srgb, var(--background) 88%, transparent);\n  backdrop-filter: blur(10px);\n  border-bottom: 1px solid color-mix(in srgb, var(--border) 60%, transparent);\n}\n\n/* ============================================================\n   \u7248\u9762\uFF1A\u6742\u5FD7\u5F00\u672C \u2014\u2014 \u9996\u9875\u5355\u5217\u5927\u5361\u7247\uFF0C\u5927\u7559\u767D\n   \u26A0\uFE0F \u5BBD\u5EA6\u7531\u7AD9\u70B9\u7EDF\u4E00\u63A7\u5236\uFF08globals.css \u7684 --content-w\uFF09\uFF0C\u4E3B\u9898\u91CC\u4E0D\u5199 max-width\u3002\n   ============================================================ */\n\n/* \u9996\u9875\u6587\u4EF6\u5939\uFF1A\u5355\u5217\u5927\u5361\u7247\uFF0C\u4E00\u884C\u4E00\u4E2A\uFF0C\u50CF\u76EE\u5F55\u9875 */\n[data-region='folders'] {\n  display: flex !important;\n  flex-direction: column;\n  gap: 0.6rem !important;\n  margin-bottom: 3rem;\n}\n[data-region='folders'] > * {\n  width: 100%;\n  border-radius: var(--radius) !important;\n  padding: 1.15rem 1.5rem !important;\n  border-color: color-mix(in srgb, var(--border) 80%, transparent) !important;\n  box-shadow: none !important;\n  transition: background 0.2s ease, transform 0.2s ease;\n}\n[data-region='folders'] > *:hover {\n  background: color-mix(in srgb, var(--primary) 4%, transparent) !important;\n  transform: translateX(4px);\n}\n/* \u6587\u4EF6\u5939\u540D\u653E\u5927\uFF0C\u7BC7\u6570\u7F29\u5C0F\u9760\u53F3 */\n[data-region='folders'] > * .font-serif {\n  font-size: calc(1.12 * var(--fsu, 1rem)) !important;\n  letter-spacing: 0.02em;\n}\n\n/* \u7B14\u8BB0\u5217\u8868\uFF1A\u540C\u6837\u5355\u5217\uFF0C\u884C\u8DDD\u62C9\u5F00 */\n[data-region='list'] {\n  border: none !important;\n  background: transparent !important;\n  box-shadow: none !important;\n}\n[data-region='list'] > div:first-child {\n  border-bottom: 1px solid var(--border) !important;\n  background: transparent !important;\n  padding-left: 0 !important;\n  padding-right: 0 !important;\n}\n[data-region='list'] ul {\n  columns: 1 !important;\n  padding: 0.5rem 0 !important;\n}\n[data-region='list'] li > button {\n  padding-top: 0.55rem !important;\n  padding-bottom: 0.55rem !important;\n}\n\n/* \u6807\u7B7E\uFF1A\u7EC6\u7EBF\u5206\u9694\uFF0C\u4E0D\u7528\u80F6\u56CA */\n[data-region='tags'] {\n  gap: 0 !important;\n  margin-bottom: 3rem !important;\n}\n[data-region='tags'] > button {\n  border: none !important;\n  background: transparent !important;\n  border-radius: 0 !important;\n  padding: 0.2rem 0.85rem !important;\n  border-right: 1px solid var(--border) !important;\n  color: var(--muted-foreground) !important;\n  letter-spacing: 0.04em;\n}\n[data-region='tags'] > button:last-child {\n  border-right: none !important;\n}\n[data-region='tags'] > button:hover {\n  color: var(--primary) !important;\n}\n\n/* --- \u6587\u7AE0\u9875\uFF1A\u6807\u9898\u5C45\u4E2D\u653E\u5927 --- */\n[data-region='article'] {\n  width: 100%;\n}\n\n/* \u6587\u7AE0\u6807\u9898\u5C45\u4E2D\u3001\u5B57\u53F7\u5927\uFF0C\u50CF\u6742\u5FD7\u6807\u9898 */\n[data-region='article'] > header h1 {\n  text-align: center;\n  font-size: calc(2.1 * var(--fsu, 1rem)) !important;\n  letter-spacing: 0.04em;\n  margin-bottom: 0.4rem;\n}\n[data-region='article'] > header > div {\n  justify-content: center;\n}\n\n/* \u9875\u811A\u5C45\u4E2D */\n[data-region='footer'] {\n  justify-content: center !important;\n  opacity: 0.7;\n  letter-spacing: 0.06em;\n}\n\n/* \u7A84\u5C4F\uFF1A\u7559\u767D\u6536\u655B\uFF0C\u6807\u9898\u7565\u5C0F */\n@media (max-width: 767px) {\n  [data-region='article'] > header h1 {\n    font-size: calc(1.6 * var(--fsu, 1rem)) !important;\n  }\n}\n"
  },
  {
    "id": "terminal",
    "name": {
      "zh": "\u7EC8\u7AEF",
      "en": "Terminal"
    },
    "desc": {
      "zh": "\u9996\u9875\u662F ls \u5F0F\u547D\u4EE4\u884C\u8F93\u51FA\uFF0C\u5168\u7B49\u5BBD\u5B57\u4F53\u4E0E > \u524D\u7F00\u5217\u8868",
      "en": "ls-style command-line home, all-monospace with > prefixed lists"
    },
    "swatch": {
      "bg": "#fbfbf8",
      "fg": "#1b1f1b",
      "accent": "#16794a",
      "card": "#ffffff"
    },
    "css": "/* ============================================================\n   \u7EC8\u7AEF \u2014\u2014 \u547D\u4EE4\u884C\u6C14\u8D28\uFF1A\u5168\u7B49\u5BBD\u5B57\u4F53 + `ls` \u5F0F\u5217\u8868\n   \u7248\u9762\u5DEE\u5F02\u4F53\u73B0\u5728\uFF1A\u9996\u9875\u505A\u6210\u547D\u4EE4\u8F93\u51FA\u884C\u3001\u5217\u8868\u524D\u7F00 `>`\uFF08\u5BBD\u5EA6\u4E0E\u9ED8\u8BA4\u4E3B\u9898\u4E00\u81F4\uFF09\n   \uFF08\u5927\u7EB2\u662F\u7AD9\u70B9\u7684\u60AC\u6D6E\u7EC4\u4EF6\uFF0C\u4EFB\u4F55\u4E3B\u9898\u90FD\u4E0D\u53BB\u52A8\u5B83\u7684\u4F4D\u7F6E\u4E0E\u4EA4\u4E92\uFF09\n   ============================================================ */\n\n:root {\n  --radius: 0;\n\n  --background: #fbfbf8;\n  --foreground: #1b1f1b;\n\n  --card: #ffffff;\n  --card-foreground: #1b1f1b;\n  --popover: #ffffff;\n  --popover-foreground: #1b1f1b;\n\n  --primary: #16794a;\n  --primary-foreground: #f2fff7;\n\n  --secondary: #eef2ea;\n  --secondary-foreground: #1b1f1b;\n  --muted: #eef1ea;\n  --muted-foreground: #5c6b5f;\n  --accent: #e2f3e7;\n  --accent-foreground: #10251a;\n\n  --border: #cfd8cb;\n  --input: #cfd8cb;\n  --ring: rgba(22, 121, 74, 0.5);\n\n  --code-bg: #f2f5ef;\n  --code-head-bg: #e6ebe2;\n  --code-head-fg: #5c6b5f;\n  --code-fg: #1b1f1b;\n}\n\nhtml.dark {\n  --background: #05070a;\n  --foreground: #c8f7d4;\n\n  --card: #0b0f14;\n  --card-foreground: #c8f7d4;\n  --popover: #0b0f14;\n  --popover-foreground: #c8f7d4;\n\n  --primary: #39ff88;\n  --primary-foreground: #04140a;\n\n  --secondary: #0f151c;\n  --secondary-foreground: #c8f7d4;\n  --muted: #0f151c;\n  --muted-foreground: #6f8a7c;\n  --accent: #12251a;\n  --accent-foreground: #d8ffe4;\n\n  --border: rgba(57, 255, 136, 0.22);\n  --input: rgba(57, 255, 136, 0.28);\n  --ring: rgba(57, 255, 136, 0.6);\n\n  --code-bg: #080c10;\n  --code-head-bg: #0f151c;\n  --code-head-fg: #6f8a7c;\n  --code-fg: #c8f7d4;\n}\n\n/* \u5168\u7AD9\u7B49\u5BBD\uFF0C\u8FD9\u662F\u300C\u7EC8\u7AEF\u300D\u7684\u7ACB\u8EAB\u4E4B\u672C */\nbody,\n.markdown-body,\n.font-serif {\n  font-family: ui-monospace, SFMono-Regular, 'SF Mono', Menlo, Consolas,\n    'Liberation Mono', monospace !important;\n}\n\n.markdown-body {\n  line-height: 1.85;\n  letter-spacing: 0;\n}\n\n/* \u6807\u9898\uFF1A\u4E0D\u8981\u4E0B\u5212\u7EBF\uFF0C\u6539\u6210 `## ` \u524D\u7F00 */\n.markdown-body h2 {\n  border-bottom: none;\n  color: var(--primary);\n}\n.markdown-body h2::before {\n  content: '## ';\n  opacity: 0.55;\n}\n.markdown-body h3::before {\n  content: '### ';\n  opacity: 0.45;\n  font-size: 0.9em;\n}\n\n/* \u94FE\u63A5\uFF1A\u4E0B\u5212\u7EBF\u4E0D\u8981\uFF0C\u7528\u65B9\u62EC\u53F7\u5305\u88F9\u7684\u89C2\u611F */\n.markdown-body a.internal-link,\n.markdown-body a.external-link {\n  border-bottom: none;\n  text-decoration: underline;\n  text-decoration-style: dotted;\n  text-underline-offset: 3px;\n}\n\n/* \u5F15\u7528\uFF1A\u4E0D\u8981\u5706\u89D2\uFF0C\u76F4\u63A5 `> ` \u63D0\u793A */\n.markdown-body blockquote {\n  border-left: 2px solid var(--primary);\n  border-radius: 0;\n  background: transparent;\n  padding-left: 1em;\n  font-style: normal;\n}\n\n/* \u4EE3\u7801\u5757\uFF1A\u4E0D\u8981\u5706\u89D2\uFF0C\u8FB9\u6846\u5B9E\u7EBF */\n.markdown-body .code-block,\n.markdown-body code.inline-code {\n  border-radius: 0 !important;\n}\n\n/* \u9876\u680F\uFF1A\u4E00\u6761\u547D\u4EE4\u884C */\nheader.sticky {\n  background: var(--background);\n  backdrop-filter: none;\n  border-bottom: 1px solid var(--primary);\n}\n[data-region='header'] > button:first-child::before {\n  content: '~/';\n  opacity: 0.55;\n  margin-right: 0.15em;\n}\n\n/* ============================================================\n   \u7248\u9762\uFF1A\u547D\u4EE4\u884C\u8F93\u51FA\n   \u26A0\uFE0F \u5BBD\u5EA6\u7531\u7AD9\u70B9\u7EDF\u4E00\u63A7\u5236\uFF08globals.css \u7684 --content-w\uFF09\uFF0C\u4E3B\u9898\u91CC\u4E0D\u5199 max-width\u3002\n   ============================================================ */\n\n/* \u9996\u9875\uFF1A\u6587\u4EF6\u5939\u4E0D\u505A\u5361\u7247\uFF0C\u505A\u6210\u7EC8\u7AEF\u91CC `ls` \u7684\u4E00\u884C\u884C\u8F93\u51FA */\n[data-region='folders'] {\n  display: flex !important;\n  flex-direction: column;\n  gap: 0 !important;\n  border-top: 1px solid var(--border);\n  margin-bottom: 2rem;\n}\n[data-region='folders'] > * {\n  width: 100%;\n  border: none !important;\n  border-bottom: 1px solid color-mix(in srgb, var(--border) 55%, transparent) !important;\n  border-radius: 0 !important;\n  background: transparent !important;\n  box-shadow: none !important;\n  padding: 0.5rem 0.25rem !important;\n  gap: 0.75rem !important;\n  transition: background 0.12s ease;\n}\n[data-region='folders'] > *:hover {\n  background: color-mix(in srgb, var(--primary) 8%, transparent) !important;\n  transform: none !important;\n}\n[data-region='folders'] > * svg {\n  color: var(--primary) !important;\n  opacity: 0.9;\n}\n[data-region='folders'] > * .font-serif {\n  font-size: calc(0.92 * var(--fsu, 1rem)) !important;\n  font-weight: 400 !important;\n}\n/* \u7BC7\u6570\u53F3\u5BF9\u9F50\uFF0C\u7528\u70B9\u7EBF\u8FDE\u8FC7\u53BB */\n[data-region='folders'] > * > span > span:last-child {\n  font-size: calc(0.78 * var(--fsu, 1rem));\n  color: var(--muted-foreground);\n}\n\n/* \u7B14\u8BB0\u5217\u8868\uFF1A\u53BB\u6389\u5916\u6846\uFF0C\u884C\u524D\u9762\u52A0 `>` */\n[data-region='list'] {\n  border: none !important;\n  background: transparent !important;\n  box-shadow: none !important;\n}\n[data-region='list'] > div:first-child {\n  border-bottom: 1px solid var(--border) !important;\n  background: transparent !important;\n  padding-left: 0 !important;\n  padding-right: 0 !important;\n}\n[data-region='list'] ul {\n  columns: 1 !important;\n  padding: 0 !important;\n}\n[data-region='list'] li > button::before {\n  content: '>';\n  color: var(--primary);\n  margin-right: 0.5em;\n  opacity: 0.75;\n}\n[data-region='list'] li > button {\n  border-radius: 0 !important;\n  padding-left: 0.25rem !important;\n}\n\n/* \u6807\u7B7E\uFF1A\u65B9\u62EC\u53F7\u6837\u5F0F */\n[data-region='tags'] > button {\n  border-radius: 0 !important;\n  border-color: var(--border) !important;\n  font-size: calc(0.72 * var(--fsu, 1rem)) !important;\n  letter-spacing: 0.02em;\n}\n[data-region='tags'] > button::before {\n  content: '[';\n  opacity: 0.5;\n  margin-right: 0.1em;\n}\n[data-region='tags'] > button::after {\n  content: ']';\n  opacity: 0.5;\n  margin-left: 0.1em;\n}\n\n/* \u9875\u811A */\n[data-region='footer'] {\n  opacity: 0.7;\n  letter-spacing: 0.03em;\n}\n"
  },
  {
    "id": "mono",
    "name": {
      "zh": "\u6781\u7B80\u9ED1\u767D",
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
    "css": "/* ============================================================\n   \u6781\u7B80\u9ED1\u767D \u2014\u2014 \u6EE1\u5BBD\u7248\u5F0F\uFF1A\u6B63\u6587\u6EE1\u5BBD\u5C45\u4E2D\uFF0C\u9996\u9875\u662F\u7EAF\u6587\u5B57\u7D22\u5F15\u8868\n   \u7EAF\u767D / \u7EAF\u9ED1\uFF0C\u65E0\u5F69\u8272\uFF0C\u96F6\u5706\u89D2\uFF0C\u53EA\u9760\u5B57\u91CD\u4E0E\u7559\u767D\n   ============================================================ */\n\n:root {\n  --radius: 0;\n\n  --background: #ffffff;\n  --foreground: #111111;\n\n  --card: #ffffff;\n  --card-foreground: #111111;\n  --popover: #ffffff;\n  --popover-foreground: #111111;\n\n  --primary: #111111;\n  --primary-foreground: #ffffff;\n\n  --secondary: #f4f4f4;\n  --secondary-foreground: #111111;\n  --muted: #f4f4f4;\n  --muted-foreground: #767676;\n  --accent: #eeeeee;\n  --accent-foreground: #111111;\n\n  --border: #e0e0e0;\n  --input: #e0e0e0;\n  --ring: rgba(17, 17, 17, 0.35);\n\n  --code-bg: #f7f7f7;\n  --code-head-bg: #efefef;\n  --code-head-fg: #767676;\n  --code-fg: #111111;\n}\n\nhtml.dark {\n  --background: #000000;\n  --foreground: #ededed;\n\n  --card: #000000;\n  --card-foreground: #ededed;\n  --popover: #000000;\n  --popover-foreground: #ededed;\n\n  --primary: #ededed;\n  --primary-foreground: #000000;\n\n  --secondary: #121212;\n  --secondary-foreground: #ededed;\n  --muted: #121212;\n  --muted-foreground: #8a8a8a;\n  --accent: #1a1a1a;\n  --accent-foreground: #f5f5f5;\n\n  --border: #2a2a2a;\n  --input: #333333;\n  --ring: rgba(237, 237, 237, 0.4);\n\n  --code-bg: #0a0a0a;\n  --code-head-bg: #141414;\n  --code-head-fg: #8a8a8a;\n  --code-fg: #ededed;\n}\n\nbody,\n.markdown-body {\n  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'PingFang SC',\n    'Hiragino Sans GB', 'Microsoft YaHei', system-ui, sans-serif;\n}\n\n.markdown-body {\n  line-height: 1.9;\n  letter-spacing: 0.01em;\n}\n\n/* \u6807\u9898\uFF1A\u4E0D\u8981\u88C5\u9970\u7EBF\uFF0C\u53EA\u9760\u5B57\u53F7\u4E0E\u5B57\u91CD */\n.markdown-body h1,\n.markdown-body h2,\n.markdown-body h3 {\n  font-family: inherit;\n  letter-spacing: -0.01em;\n}\n.markdown-body h2 {\n  border-bottom: none;\n  margin-top: 2.4em;\n}\n/* \u7AE0\u8282\u524D\u4E00\u6761\u6781\u77ED\u7684\u5B9E\u7EBF\uFF0C\u4F5C\u4E3A\u552F\u4E00\u7684\u5206\u9694\u7B26 */\n.markdown-body h2::before {\n  content: '';\n  display: block;\n  width: 2rem;\n  height: 1px;\n  background: var(--foreground);\n  margin-bottom: 0.8em;\n  opacity: 0.8;\n}\n\n/* \u5F15\u7528\uFF1A\u4E0D\u8981\u5E95\u8272\uFF0C\u53EA\u8981\u7AD6\u7EBF */\n.markdown-body blockquote {\n  background: transparent;\n  border-left: 1px solid var(--foreground);\n  border-radius: 0;\n  padding-left: 1.1em;\n  font-style: normal;\n}\n\n/* \u9876\u680F\uFF1A\u4E00\u6761\u7EC6\u7EBF\uFF0C\u522B\u65E0\u4ED6\u7269 */\nheader.sticky {\n  background: var(--background);\n  backdrop-filter: none;\n  border-bottom: 1px solid var(--border);\n}\n\n/* ============================================================\n   \u7248\u9762\uFF1A\u6781\u7B80\u7D22\u5F15\u8868\n   \u26A0\uFE0F \u5BBD\u5EA6\u7531\u7AD9\u70B9\u7EDF\u4E00\u63A7\u5236\uFF08globals.css \u7684 --content-w\uFF09\uFF0C\u4E3B\u9898\u91CC\u4E0D\u5199 max-width\uFF1A\n   \u6240\u6709\u4E3B\u9898\u7684\u9996\u9875\u3001\u6B63\u6587\u5BBD\u5EA6\u5FC5\u987B\u5B8C\u5168\u4E00\u81F4\uFF0C\u4E3B\u9898\u53EA\u8D1F\u8D23\u989C\u8272\u3001\u7D20\u6750\u548C\n   \u300C\u975E\u6B63\u6587\u754C\u9762\u300D\u7684\u6392\u5E03\uFF08\u9996\u9875\u6587\u4EF6\u5939 / \u7B14\u8BB0\u5217\u8868 / \u6807\u7B7E\u600E\u4E48\u6446\uFF09\u3002\n   \u5927\u7EB2\u6D6E\u5C42\u662F\u7AD9\u70B9\u7684\u529F\u80FD\u7EC4\u4EF6\uFF08\u53EF\u62D6\u52A8\u3001\u53EF\u7F29\u653E\uFF09\uFF0C\u4E3B\u9898\u4E00\u5F8B\u4E0D\u78B0\u5B83\u7684\u4F4D\u7F6E\u3001\n   \u5C3A\u5BF8\u4E0E\u6392\u5E03\uFF0C\u6700\u591A\u6362\u6362\u6587\u5B57\u989C\u8272 \u2014\u2014 \u7528\u6237\u660E\u786E\u8981\u6C42\u300C\u6539\u7248\u9762\u662F\u6539\u5916\u89C2\uFF0C\u4E0D\u662F\u529F\u80FD\u300D\u3002\n   ============================================================ */\n\n/* \u5927\u7EB2\u6D6E\u5C42\uFF1A\u53EA\u628A\u5F3A\u8C03\u8272\u6362\u6210\u9ED1\u767D\uFF0C\u4F4D\u7F6E/\u5BBD\u9AD8/\u4EA4\u4E92\u5B8C\u5168\u4EA4\u7ED9\u7AD9\u70B9\u81EA\u5DF1\u7684\u5B9E\u73B0 */\n[data-region='toc-panel'] .toc-item.toc-active {\n  color: var(--foreground);\n  font-weight: 600;\n}\n\n/* \u6587\u7AE0\u6807\u9898\uFF1A\u5927\u5B57\u91CD\u3001\u7D27\u5B57\u8DDD */\n[data-region='article'] > header h1 {\n  font-size: calc(2.15 * var(--fsu, 1rem)) !important;\n  letter-spacing: -0.025em;\n  font-weight: 700;\n}\n\n/* \u9996\u9875\u6587\u4EF6\u5939\uFF1A\u5355\u5217\u7D22\u5F15\u8868\uFF0C\u4E00\u884C\u884C\u8BFB\u4E0B\u53BB */\n[data-region='folders'] {\n  display: flex !important;\n  flex-direction: column;\n  gap: 0 !important;\n  border-top: 1px solid var(--foreground);\n  margin-bottom: 2.5rem;\n}\n[data-region='folders'] > * {\n  width: 100%;\n  border: none !important;\n  border-bottom: 1px solid var(--border) !important;\n  border-radius: 0 !important;\n  background: transparent !important;\n  box-shadow: none !important;\n  padding: 0.7rem 0.2rem !important;\n  transition: padding-left 0.15s ease;\n}\n[data-region='folders'] > *:hover {\n  background: transparent !important;\n  transform: none !important;\n  padding-left: 0.7rem !important;\n}\n[data-region='folders'] > * svg {\n  display: none; /* \u7D22\u5F15\u8868\u4E0D\u8981\u56FE\u6807 */\n}\n[data-region='folders'] > * .font-serif {\n  font-size: calc(0.95 * var(--fsu, 1rem)) !important;\n  font-weight: 500 !important;\n  letter-spacing: 0.01em;\n}\n[data-region='folders'] > * > span > span:last-child {\n  font-size: calc(0.75 * var(--fsu, 1rem));\n  color: var(--muted-foreground);\n}\n\n/* \u7B14\u8BB0\u5217\u8868\uFF1A\u540C\u6837\u53BB\u6389\u5916\u6846 */\n[data-region='list'] {\n  border: none !important;\n  background: transparent !important;\n  box-shadow: none !important;\n}\n[data-region='list'] > div:first-child {\n  border-bottom: 1px solid var(--foreground) !important;\n  background: transparent !important;\n  padding-left: 0 !important;\n  padding-right: 0 !important;\n}\n[data-region='list'] ul {\n  columns: 1 !important;\n  padding: 0 !important;\n}\n[data-region='list'] li > button {\n  border-radius: 0 !important;\n  padding-left: 0.2rem !important;\n  padding-top: 0.55rem !important;\n  padding-bottom: 0.55rem !important;\n}\n[data-region='list'] li > button:hover {\n  background: transparent !important;\n  padding-left: 0.6rem !important;\n}\n\n/* \u6807\u7B7E\uFF1A\u4E0D\u8981\u80F6\u56CA\uFF0C\u6539\u6210\u4E0B\u5212\u7EBF\u6587\u5B57 */\n[data-region='tags'] {\n  gap: 0.15rem 1.4rem !important;\n  border-bottom: 1px solid var(--border);\n  padding-bottom: 1rem;\n  margin-bottom: 2.5rem !important;\n}\n[data-region='tags'] > button {\n  border: none !important;\n  background: transparent !important;\n  border-radius: 0 !important;\n  padding: 0.15rem 0 !important;\n  font-size: calc(0.75 * var(--fsu, 1rem)) !important;\n  letter-spacing: 0.03em;\n  border-bottom: 1px solid transparent !important;\n  color: var(--muted-foreground) !important;\n}\n[data-region='tags'] > button:hover,\n[data-region='tags'] > button[class*='bg-primary'] {\n  color: var(--foreground) !important;\n  border-bottom-color: var(--foreground) !important;\n}\n\n/* \u9875\u811A */\n[data-region='footer'] {\n  justify-content: center !important;\n  opacity: 0.6;\n  letter-spacing: 0.08em;\n  text-transform: uppercase;\n  font-size: calc(0.68 * var(--fsu, 1rem));\n}\n\n/* \u7A84\u5C4F */\n@media (max-width: 767px) {\n  [data-region='article'] > header h1 {\n    font-size: calc(1.65 * var(--fsu, 1rem)) !important;\n  }\n}\n"
  },
  {
    "id": "duo",
    "name": {
      "zh": "\u7D20\u7B3A\u53CC\u680F",
      "en": "Duo Column"
    },
    "desc": {
      "zh": "\u4E24\u5217\u5361\u7247\u9996\u9875\u3001\u7B14\u8BB0\u4E5F\u4E24\u5217\u5E76\u6392\uFF0C\u7070\u84DD\u7EB8\u611F",
      "en": "Two-column card home, notes side by side \u2014 grey-blue paper"
    },
    "swatch": {
      "bg": "#f7f8fa",
      "fg": "#1f2937",
      "accent": "#3b6ea5",
      "card": "#ffffff"
    },
    "css": "/* ============================================================\n   \u7D20\u7B3A\u53CC\u680F \u2014\u2014 \u4E24\u5217\u5361\u7247\uFF0C\u7070\u84DD\u7EB8\u611F\uFF0C\u7B49\u5BBD\u6570\u5B57\n   \u7248\u9762\u5DEE\u5F02\u4F53\u73B0\u5728\uFF1A\u9996\u9875\u6587\u4EF6\u5939\u56FA\u5B9A\u4E24\u5217\uFF08\u9ED8\u8BA4\u662F\u4E09\u5217\uFF09\uFF0C\u5217\u8868\u4E5F\u4E24\u5217\u5E76\u6392\n   \u26A0\uFE0F \u5BBD\u5EA6\u7531\u7AD9\u70B9\u7EDF\u4E00\u63A7\u5236\uFF08globals.css \u7684 --content-w\uFF09\uFF0C\u4E3B\u9898\u91CC\u4E0D\u5199 max-width\uFF1A\n   \u6240\u6709\u4E3B\u9898\u7684\u9996\u9875\u4E0E\u6B63\u6587\u5BBD\u5EA6\u5FC5\u987B\u5B8C\u5168\u4E00\u81F4\uFF0C\u4E3B\u9898\u53EA\u8D1F\u8D23\u989C\u8272\u3001\u7D20\u6750\uFF0C\u4EE5\u53CA\n   \u300C\u975E\u6B63\u6587\u754C\u9762\u300D\u7684\u6392\u5E03\uFF08\u9996\u9875\u6587\u4EF6\u5939 / \u7B14\u8BB0\u5217\u8868 / \u6807\u7B7E\u600E\u4E48\u6446\uFF09\u3002\n   \uFF08\u5927\u7EB2\u662F\u7AD9\u70B9\u7684\u60AC\u6D6E\u7EC4\u4EF6\uFF0C\u4EFB\u4F55\u4E3B\u9898\u90FD\u4E0D\u53BB\u52A8\u5B83\u7684\u4F4D\u7F6E\u4E0E\u4EA4\u4E92\uFF09\n   ============================================================ */\n\n:root {\n  --radius: 0.35rem;\n\n  --background: #f7f8fa;\n  --foreground: #1f2937;\n\n  --card: #ffffff;\n  --card-foreground: #1f2937;\n  --popover: #ffffff;\n  --popover-foreground: #1f2937;\n\n  --primary: #3b6ea5;\n  --primary-foreground: #ffffff;\n\n  --secondary: #eef1f5;\n  --secondary-foreground: #1f2937;\n  --muted: #eef1f5;\n  --muted-foreground: #6b7280;\n  --accent: #e6edf6;\n  --accent-foreground: #1f2937;\n\n  --border: #dde3ea;\n  --input: #dde3ea;\n  --ring: rgba(59, 110, 165, 0.4);\n\n  --code-bg: #f2f4f7;\n  --code-head-bg: #e8ecf1;\n  --code-head-fg: #6b7280;\n  --code-fg: #1f2937;\n}\n\nhtml.dark {\n  --background: #15181d;\n  --foreground: #dfe4ea;\n\n  --card: #1c2027;\n  --card-foreground: #dfe4ea;\n  --popover: #1c2027;\n  --popover-foreground: #dfe4ea;\n\n  --primary: #7aa9dc;\n  --primary-foreground: #10141a;\n\n  --secondary: #232830;\n  --secondary-foreground: #dfe4ea;\n  --muted: #232830;\n  --muted-foreground: #98a2b0;\n  --accent: #26303b;\n  --accent-foreground: #e8eef5;\n\n  --border: rgba(150, 170, 195, 0.2);\n  --input: rgba(150, 170, 195, 0.26);\n  --ring: rgba(122, 169, 220, 0.55);\n\n  --code-bg: #1a1e24;\n  --code-head-bg: #232830;\n  --code-head-fg: #9aa5b3;\n  --code-fg: #dfe4ea;\n}\n\nbody,\n.markdown-body {\n  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'PingFang SC',\n    'Hiragino Sans GB', 'Microsoft YaHei', system-ui, sans-serif;\n  font-variant-numeric: tabular-nums;\n}\n\n.markdown-body {\n  line-height: 1.85;\n}\n\n.markdown-body h2 {\n  border-bottom: 1px solid var(--border);\n  padding-bottom: 0.35em;\n}\n\n/* \u9876\u680F\uFF1A\u7EC6\u7EBF\uFF0C\u4E0D\u8981\u6BDB\u73BB\u7483 */\nheader.sticky {\n  background: var(--background);\n  backdrop-filter: none;\n  border-bottom: 1px solid var(--border);\n}\n\n/* ============================================================\n   \u7248\u9762\uFF1A\u4E24\u5217\u7D20\u7B3A\n   ============================================================ */\n\n/* \u9996\u9875\u6587\u4EF6\u5939\uFF1A\u56FA\u5B9A\u4E24\u5217\uFF08\u7A84\u5C4F\u4E00\u5217\uFF09 */\n[data-region='folders'] {\n  display: grid !important;\n  grid-template-columns: repeat(2, minmax(0, 1fr));\n  gap: 0.85rem !important;\n}\n[data-region='folders'] > * {\n  background: var(--card) !important;\n  border-color: var(--border) !important;\n  box-shadow: 0 1px 2px rgba(31, 41, 55, 0.05) !important;\n  transition: border-color 0.15s ease, box-shadow 0.15s ease;\n}\n[data-region='folders'] > *:hover {\n  border-color: color-mix(in srgb, var(--primary) 55%, transparent) !important;\n  box-shadow: 0 4px 16px rgba(59, 110, 165, 0.1) !important;\n  transform: none !important;\n}\n\n/* \u7B14\u8BB0\u5217\u8868\uFF1A\u4E24\u5217\u5E76\u6392\uFF0C\u5361\u7247\u5F0F */\n[data-region='list'] {\n  border: none !important;\n  background: transparent !important;\n  box-shadow: none !important;\n}\n[data-region='list'] > div:first-child {\n  background: transparent !important;\n  border-bottom: 1px solid var(--border) !important;\n  padding-left: 0 !important;\n  padding-right: 0 !important;\n}\n[data-region='list'] ul {\n  columns: 2 !important;\n  column-gap: 1rem !important;\n  padding: 0.5rem 0 !important;\n}\n[data-region='list'] li > button {\n  border: 1px solid var(--border) !important;\n  background: var(--card) !important;\n  border-radius: var(--radius) !important;\n  padding: 0.5rem 0.7rem !important;\n  margin-bottom: 0.6rem !important;\n  break-inside: avoid;\n}\n[data-region='list'] li > button:hover {\n  border-color: color-mix(in srgb, var(--primary) 55%, transparent) !important;\n  background: color-mix(in srgb, var(--primary) 4%, var(--card)) !important;\n}\n\n/* \u6807\u7B7E\uFF1A\u65B9\u89D2\u5C0F\u7B7E */\n[data-region='tags'] > button {\n  border-radius: 0.2rem !important;\n  font-size: calc(0.75 * var(--fsu, 1rem)) !important;\n}\n\n/* \u9875\u811A */\n[data-region='footer'] {\n  opacity: 0.72;\n  letter-spacing: 0.04em;\n}\n\n@media (max-width: 767px) {\n  [data-region='folders'] {\n    grid-template-columns: minmax(0, 1fr);\n  }\n  [data-region='list'] ul {\n    columns: 1 !important;\n  }\n}\n"
  },
  {
    "id": "tree",
    "name": {
      "zh": "\u9752\u82D4\u6811\u72B6",
      "en": "Moss Tree"
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
    "css": "/* ============================================================\n   \u9752\u82D4\u6811\u72B6 \u2014\u2014 \u6587\u4EF6\u6811\uFF1A\u7AD6\u7EBF + \u62D0\u89D2\u8FDE\u63A5\u7B26\uFF0C\u7EFF\u7070\u7EB8\u611F\n   \u7248\u9762\u5DEE\u5F02\u4F53\u73B0\u5728\uFF1A\u9996\u9875\u6587\u4EF6\u5939\u505A\u6210\u300C\u6811\u300D\u7684\u4E00\u884C\u884C\uFF0C\u5E26\u7F29\u8FDB\u5BFC\u8F68\u4E0E \u2514\u2500 \u62D0\u89D2\uFF1B\n   \u7B14\u8BB0\u5217\u8868\u4E5F\u7528\u7AD6\u7EBF\u6302\u7740\uFF0C\u8BFB\u8D77\u6765\u50CF\u8D44\u6E90\u7BA1\u7406\u5668\u7684\u76EE\u5F55\u6811\n   \u26A0\uFE0F \u5BBD\u5EA6\u7531\u7AD9\u70B9\u7EDF\u4E00\u63A7\u5236\uFF08globals.css \u7684 --content-w\uFF09\uFF0C\u4E3B\u9898\u91CC\u4E0D\u5199 max-width\uFF1A\n   \u6240\u6709\u4E3B\u9898\u7684\u9996\u9875\u4E0E\u6B63\u6587\u5BBD\u5EA6\u5FC5\u987B\u5B8C\u5168\u4E00\u81F4\uFF0C\u4E3B\u9898\u53EA\u8D1F\u8D23\u989C\u8272\u3001\u7D20\u6750\uFF0C\u4EE5\u53CA\n   \u300C\u975E\u6B63\u6587\u754C\u9762\u300D\u7684\u6392\u5E03\uFF08\u9996\u9875\u6587\u4EF6\u5939 / \u7B14\u8BB0\u5217\u8868 / \u6807\u7B7E\u600E\u4E48\u6446\uFF09\u3002\n   \uFF08\u5927\u7EB2\u662F\u7AD9\u70B9\u7684\u60AC\u6D6E\u7EC4\u4EF6\uFF0C\u4EFB\u4F55\u4E3B\u9898\u90FD\u4E0D\u53BB\u52A8\u5B83\u7684\u4F4D\u7F6E\u4E0E\u4EA4\u4E92\uFF09\n   ============================================================ */\n\n:root {\n  --radius: 0.3rem;\n\n  --background: #f4f6f3;\n  --foreground: #23302a;\n\n  --card: #fbfdfa;\n  --card-foreground: #23302a;\n  --popover: #fbfdfa;\n  --popover-foreground: #23302a;\n\n  --primary: #4a7c59;\n  --primary-foreground: #f4f6f3;\n\n  --secondary: #e8ede6;\n  --secondary-foreground: #23302a;\n  --muted: #e8ede6;\n  --muted-foreground: #6f7d73;\n  --accent: #dfeae0;\n  --accent-foreground: #23302a;\n\n  --border: #d5ddd3;\n  --input: #d5ddd3;\n  --ring: rgba(74, 124, 89, 0.4);\n\n  --code-bg: #eff3ec;\n  --code-head-bg: #e3e9e0;\n  --code-head-fg: #6f7d73;\n  --code-fg: #23302a;\n}\n\nhtml.dark {\n  --background: #121713;\n  --foreground: #dce5dd;\n\n  --card: #181f19;\n  --card-foreground: #dce5dd;\n  --popover: #181f19;\n  --popover-foreground: #dce5dd;\n\n  --primary: #7fbe8f;\n  --primary-foreground: #0f1511;\n\n  --secondary: #1f2721;\n  --secondary-foreground: #dce5dd;\n  --muted: #1f2721;\n  --muted-foreground: #94a397;\n  --accent: #223026;\n  --accent-foreground: #e4eee6;\n\n  --border: rgba(150, 185, 160, 0.18);\n  --input: rgba(150, 185, 160, 0.24);\n  --ring: rgba(127, 190, 143, 0.55);\n\n  --code-bg: #171e18;\n  --code-head-bg: #1f2721;\n  --code-head-fg: #9aab9d;\n  --code-fg: #dce5dd;\n}\n\nbody,\n.markdown-body {\n  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'PingFang SC',\n    'Hiragino Sans GB', 'Microsoft YaHei', system-ui, sans-serif;\n}\n\n.markdown-body {\n  line-height: 1.88;\n}\n\n.markdown-body h2 {\n  border-bottom: none;\n  border-left: 2px solid var(--primary);\n  padding-left: 0.55em;\n  margin-top: 2.2em;\n}\n\n.markdown-body blockquote {\n  border-left: 2px solid var(--border);\n  background: transparent;\n  font-style: normal;\n}\n\n/* \u9876\u680F\uFF1A\u4E00\u6761\u7EB8\u8FB9 */\nheader.sticky {\n  background: var(--background);\n  backdrop-filter: none;\n  border-bottom: 1px solid var(--border);\n}\n\n/* ============================================================\n   \u7248\u9762\uFF1A\u6587\u4EF6\u6811\n   ============================================================ */\n\n/* \u9996\u9875\u6587\u4EF6\u5939\uFF1A\u5355\u5217\u6811\u3002\u6BCF\u4E00\u884C\u5DE6\u4FA7\u6709\u7AD6\u5411\u5BFC\u8F68\uFF0C\u884C\u9996\u662F \u2514\u2500 \u62D0\u89D2 */\n[data-region='folders'] {\n  display: flex !important;\n  flex-direction: column;\n  gap: 0 !important;\n  margin-bottom: 2.25rem;\n  padding-left: 0.15rem;\n  border-left: 1px solid var(--border);\n}\n\n[data-region='folders'] > * {\n  position: relative;\n  width: 100%;\n  border: none !important;\n  border-radius: 0 !important;\n  background: transparent !important;\n  box-shadow: none !important;\n  padding: 0.32rem 0.4rem 0.32rem 2.15rem !important;\n  min-height: 0 !important;\n  gap: 0.4rem !important;\n  transition: background 0.12s ease, padding-left 0.12s ease;\n}\n\n/* \u62D0\u89D2\u8FDE\u63A5\u7B26\uFF1A\u4E00\u6761\u6A2A\u7EBF\u63A5\u5230\u7AD6\u8F68\u4E0A */\n[data-region='folders'] > *::before {\n  content: '';\n  position: absolute;\n  left: 0;\n  top: 50%;\n  width: 1.1rem;\n  height: 1px;\n  background: var(--border);\n}\n\n/* \u6811\u8282\u70B9\u7684\u5C0F\u4E09\u89D2\uFF0C\u843D\u5728\u62D0\u89D2\u672B\u7AEF */\n[data-region='folders'] > *::after {\n  content: '\u25B8';\n  position: absolute;\n  left: 1.25rem;\n  top: 50%;\n  transform: translateY(-50%);\n  color: var(--primary);\n  font-size: calc(0.66 * var(--fsu, 1rem));\n  opacity: 0.7;\n  line-height: 1;\n}\n\n/* \u7AD6\u8F68\u5728\u6700\u540E\u4E00\u884C\u6536\u5C3E\uFF0C\u4E0D\u753B\u5230\u5E95 */\n[data-region='folders'] > *:last-child {\n  border-bottom: none !important;\n}\n\n[data-region='folders'] > *:hover {\n  background: color-mix(in srgb, var(--primary) 5%, transparent) !important;\n  padding-left: 1.75rem !important;\n}\n\n/* \u6587\u4EF6\u5939\u56FE\u6807\u6362\u6210\u4E00\u4E2A\u5C0F\u4E09\u89D2\uFF0C\u50CF\u6811\u7684\u8282\u70B9 */\n[data-region='folders'] > * svg {\n  display: none;\n}\n\n/* \u540D\u5B57\u548C\u7BC7\u6570\u538B\u6210\u4E00\u884C\uFF1A\u540D\u5B57\u5728\u5DE6\uFF0C\u7BC7\u6570\u53F3\u5BF9\u9F50\uFF0C\u884C\u9AD8\u538B\u5230 1.5rem \u5DE6\u53F3\uFF0C\n   \u8FD9\u6837\u5341\u51E0\u884C\u6392\u4E0B\u6765\u624D\u50CF\u4E00\u68F5\u6811\uFF0C\u800C\u4E0D\u662F\u4E00\u5217\u5927\u5361\u7247 */\n[data-region='folders'] > * > span {\n  display: flex !important;\n  align-items: baseline;\n  gap: 0.6rem;\n  min-width: 0;\n}\n[data-region='folders'] > * .font-serif {\n  font-size: calc(0.97 * var(--fsu, 1rem)) !important;\n  font-weight: 500 !important;\n  flex: 0 1 auto;\n}\n[data-region='folders'] > * > span > span:last-child {\n  font-size: calc(0.74 * var(--fsu, 1rem));\n  color: var(--muted-foreground);\n  margin-top: 0 !important;\n  display: inline !important;\n  white-space: nowrap;\n}\n[data-region='folders'] > * > span > span:last-child::before {\n  content: '\xB7';\n  margin-right: 0.45em;\n  opacity: 0.5;\n}\n/* \u53F3\u4FA7\u7BAD\u5934\u4FDD\u7559\uFF0C\u4F46\u7F29\u5230\u5F88\u5C0F */\n[data-region='folders'] > * > svg:last-child {\n  display: block;\n  opacity: 0.35;\n  width: 0.85rem;\n  height: 0.85rem;\n}\n\n/* \u7B14\u8BB0\u5217\u8868\uFF1A\u4E5F\u7528\u7AD6\u8F68\u6302\u7740\uFF0C\u53BB\u6389\u5361\u7247\u5916\u6846 */\n[data-region='list'] {\n  border: none !important;\n  background: transparent !important;\n  box-shadow: none !important;\n}\n[data-region='list'] > div:first-child {\n  background: transparent !important;\n  border-bottom: 1px solid var(--border) !important;\n  padding-left: 0 !important;\n  padding-right: 0 !important;\n}\n[data-region='list'] ul {\n  columns: 1 !important;\n  padding: 0 0 0 0.15rem !important;\n  border-left: 1px solid var(--border);\n}\n[data-region='list'] li > button {\n  border-radius: 0 !important;\n  padding-left: 1.4rem !important;\n  padding-top: 0.45rem !important;\n  padding-bottom: 0.45rem !important;\n  position: relative;\n}\n[data-region='list'] li > button::before {\n  content: '\xB7';\n  position: absolute;\n  left: 0.6rem;\n  color: var(--primary);\n  opacity: 0.8;\n}\n[data-region='list'] li > button:hover {\n  background: color-mix(in srgb, var(--primary) 5%, transparent) !important;\n}\n\n/* \u6807\u7B7E\uFF1A\u65E0\u8FB9\u6846\uFF0C\u53EA\u7528\u7AD6\u7EBF\u5206\u9694 */\n[data-region='tags'] {\n  gap: 0.2rem 1.1rem !important;\n}\n[data-region='tags'] > button {\n  border: none !important;\n  background: transparent !important;\n  border-radius: 0 !important;\n  padding: 0.1rem 0 !important;\n  color: var(--muted-foreground) !important;\n  font-size: calc(0.76 * var(--fsu, 1rem)) !important;\n}\n[data-region='tags'] > button:hover,\n[data-region='tags'] > button[class*='bg-primary'] {\n  color: var(--primary) !important;\n}\n\n/* \u9875\u811A */\n[data-region='footer'] {\n  opacity: 0.7;\n  letter-spacing: 0.03em;\n}\n\n@media (max-width: 767px) {\n  [data-region='folders'] > * {\n    padding-left: 1.3rem !important;\n  }\n}\n"
  }
];

// ../scripts/theme-previews.mjs
var THEME_PREVIEWS = {
  "default": "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ZFfVyLO/Y1yZNcYys8+O1OXRwtSojPd/vD8+fgWcacZvPHh2z6g6yn7TP96/AfuddfvdJpldOlKXxwhTNO3Nmdk5cKaZvX9DozrGfoYbsF8D2M94jP2OFSaZtl0BzjgqlQb2ez/td7wwAQB/GhAmABAmAADCBADCBABAmABAmAAACBMACBMAAGECACBMACBMAACECQCECQCAMAGAMAEAECYAAMIEAMIEAECYAECYAAAIEwAIEwAAYQIAIEwAIEwAAIQJAIQJAIAwAYAwAQAQJgAAwgQAwgQAQJgAQJgAAAgTAAgTAABhAgAgTAAgTAAAhAkAhAkAgDABgDABABAmAADCBADCBABAmABAmAAACBMACBMAAGECACBMACBMAACECQCECQCAMAGAMAEAECYAAMIEAMIEAECYAECYAAAIEwAIEwAAYQIAIEwAIEwAAIQJAIQJAIAwAYAwAQAQJgAAwgQAwgQAQJgAQJgAAAgTAAgTAABhAgAgTAAgTAAAhAkAhAkAgDABgDABABAmAADCBADCBABAmABAmAAACBMACBMAAGECAGECACBMAACECQCECQCAMAGAMAEAECYAECYAAMIEAECYAECYAAAIEwAIEwAAYQIAYQIAIEwAAIQJAIQJAIAwAYAwAQAQJgAQJgAAwgQAQJgAQJgAAAgTAAgTAABhAgBhAgAgTAAAhAkAhAkAgDABgDABABAmABAmAADCBABAmABAmAAACBMACBMAAGECAGECACBMAACECQCECQCAMAGAMAEAECYAECYAAMIEAECYAECYAAAIEwAIEwAAYQIAYQIAIEwAAIQJAIQJAIAwAYAwAQAQJgAQJgAAwgQAQJgAQJgAAAgTAAgTAABhAgBhAgAgTAAAhAkAhAkAgDABgDABABAmABAmAADCBABAmABAmAAACBMACBMAAGECAGECACBMACBMAACECQCAMAGAMAEAECYAECYAAMIE4EPm/wGvearW/FyEzQAAAABJRU5ErkJggg==",
  "study": "iVBORw0KGgoAAAANSUhEUgAAA5gAAAHMCAMAAACHlvdHAAAB4FBMVEX///////z///r//vv///n//vn///f//vj//vf//vb//ff//fb9/vn9+/f///P//fT//PX+/PX//PP9/PT++/L8+fH++e/99+/5+PH79u359u759e759e339e/49u349e339e3+++X89uj69er69Ov49O349Oz49Ov49Or48+r39Oz39Ov38+v39Or38+r28+v68+X38un28ur28un48uj28uj68uL19u/18uv18un18ujz9e7l9/X48ej28en28ej18en18ej28Oj08en18ef08ef08eb08Of08Ob07+bz8Of27+D56tDx8Ojy7uby7uTy7uPx7ubx7ePx7OHx6+Lv7OPw7ODx69/w6+Dw69/w697v69/v6t/v6t3u6t3u6d3v6Nnt6+Hs59rt5tns5trs5tnr6uLr5tjm6+bV6+305Mrr5djr5Nfr48vq5Nfq49bq49Tp5Njn5Nro4tPn49Hq4M7m39Dl39Hl3tDl3s/l3s7u2bvh3tLe1sPf1cHd1Mfd1MHg1Lng0rrX3tjW1srB2t7hy6/OzMC+y87ByLzOv6q6vrbCsZisw8WstrKprqqoqZicsK6KrbCinY+PnJaWlIWVg2p2l413f3dPe3pYZl8va08mZUpdVkc4VFwxOToC0ciVAABIzklEQVR42u2diUMaZ9rAwVgi8SAIclhtAroalYCKeAQSnEAXUcihmzTtumviJhZIcyy27BchzQHDPdx3C/yr3zNcImrEdrtJ4/NLYrzeOZ55f/Oe8w5DiSDIJwcDQ4AgKCaCICgmgqCYCIJ8+mJqiTOPCjMY8qmJKbs0dOaZwgyGfGpibjlenXm+xyIT+bTElBv3Nr4942yuOzaxzEQ+LTFv7w1eGT/byIWO7THMYsgfJ6Ze1+jQob9aXap802ggGr+xsrrcKubUWa/HEUMoJvKHiFlTcHFASptJLCkn51aVKpFgDr5aFnH4E3Vhl3v5c8soJoqJ/IFiyuUKeYXZgb4R2szp91bpKrE0ODHzDwv/+tgzv1prWDSFIz6LUA86qgjDdJBSjxgIYolY+m1iEgc+IY74QTOqpd9wqsu/6UfV/S2jmMjHFlP+N/OcQQesioMp69yyatFUzFsFA9I3FoG3mFAPhMsJlrh3vljKlfw88Rwx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",
  "sakura": "iVBORw0KGgoAAAANSUhEUgAAA5gAAAHMCAMAAACHlvdHAAAB4FBMVEX///////7///T6/////v///v7+/v7//vz+/f3//Pz9/f3//fr//Pv+/Pv//Pn9/Pv/+/v/+/r++/r9+/z/+/n++vv/+vr++vr9+vv++vn/+fn++fr++fn9+fr9+fn++fj9+fj++Pj9+Pr9+Pn9+Pj++vL8+/z8+Pv8+Pn8+vj8+Pj8+fH0+/z99/f89/j89/f89/b89vf79/r79/j79/f79vn79vj79vb69vf79fb69ff69fb69Pb79fX/9PT79PX79PT69PT78/X68/X68/T+9ef78vX68vT68vP68PP98OL59PX58fP58fL48fP58PL48PP48PL57/L48O/57vH47vH47vD47un57fH47fD47e/47eT38/T37/L37/H37/D37vH37vD37fD38OX37e/37ej18PHp8fb37PD37O/37O746+/27O726+/26+727O326+377Nr6487z7O3x6+316Oz06Ovw6ejy5uXx1s3q5+no4eLj1tPP4vLS1d/QzdXgw7jRxMbKw8nIvMDQtrPCs7jNq6nLn5i6tb6pt9K6qa6qqbmzoKizm5uqm6SZnLO3lJfFg4unk5ulio+cjpqagoqOgop0hKKcbGR9bG5naHlfWmdnTElLRlhMOUE6JTClkbBwAABBQklEQVR42u29i0MaZ9r/fSNyMmm0MY36FDFZ0aQEJCZuNZu1abrx11Tb9Jftvt13n1q3SbPwppvt44GEwAwOAw7IgKDDQZDTv/peA3hKNGqjmKf5ftogp2FmbubDdd2HmZtZAADvHAxFAADEBABATAAgJgDgf5WY/e8VOKrA/wIxe7o6Oj54n+jo6OrBgQXebTG7LKNfPv7l+fvEr0+/vmXpxqEF3l0xe7rvv3jx68yde+8Tdx/+8vzFzNUuHFzgHRWzyzk7a7NYurvOv090qZnso+d3O3B0gRMWc8TWuGNT79hG6vfHtp6md4zaXlvq/N0XX7+vR2fHrRffwExwQmLeHG28y1QTko63LpJSV1vIxhjr2LKRMcurZnaPvnCef28Ltsvy/P55HF/gGMXs6qL/a5B66hP9vFdH0VH3UdeCi1nOc7zNMmJxyWHBpauHUJszHBrpGKEHO+2cvXMMR6bt2HbVdpyfc/CHdTuej+L4Asco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",
  "terminal": "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",
  "mono": "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",
  "duo": "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",
  "tree": "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ACAmAABiAgAxAQAQEwCICQCAmABATAAAxAQAQEwAICYAAGICADEBABATAIgJAICYAACICQDEBABATAAgJgAAYgIAMQEAEBMAADEBgJgAAIgJAMQEAEBMACAmAABiAgAxUQQAQEwAAMQEAGICACAmABATAAAxAYCYAACICQCAmABATAAAxAQAYgIAICYAEBMAADEBABATAIgJAICYAEBMAADEBABiAgAgJgAAYgIAMQEAEBMAiAkAgJgAQEwAAMQEAEBMACAmAABiAgAxAQAQEwCICQCAmAAAiAkAxAQAQEwAICYAAGICADEBABATAAAxAYCYAACICQDEBABATAAgJgAAYgIAICYAEBMAADEBgJgAAIgJAMQEAEBMAADEBABiAgAgJgAQEwAAMQGAmAAAiAkAgJgAQEwAAMQEAGICACAmABATAAAxAQAQEwCICQCAmABATAAAxAQAYgIAICYAAGICADEBABATAIgJAICYAEBMAADEBABioggAgJgAAIgJAMQEAEBMACAmAABiAgAxAQAQEwAAMQGAmAAAiAkAxAQAQEwAICYAAGICACAmABATAAAxAYCYAACICQDEBABATAAAxAQAYgIAICYAEBMAADEBgJgAAIgJAICYAEBMAADEBABiAgAgJgAQEwAAMQEAEBMAiAkAgJgAQEwAAMQEAGICACAmAABiAgAxAQAQEwCICQCAmABATAAAxAQAQEwAICYAAGICADEBABATAIgJAICYAACICQDEBABATAAgJgAAYgIAMQEAEBMAADEBgJgAAIgJAMQEAEBMACAmAABiAgAgJgCfKv8P8qaWjwRGHFoAAAAASUVORK5CYII="
};
var THEME_PREVIEW_VERSION = "35f731980f";

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
