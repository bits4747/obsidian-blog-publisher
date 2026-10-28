/*
博客发布器 —— Obsidian 插件
把 Obsidian 笔记发布成静态博客。

本文件由 esbuild 从 src/ 与 ../scripts/ 打包生成，不要手改。
*/
"use strict";
var __create = Object.create;
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getProtoOf = Object.getPrototypeOf;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
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
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);

// src/main.ts
var main_exports = {};
__export(main_exports, {
  default: () => BlogPublisherPlugin
});
module.exports = __toCommonJS(main_exports);
var import_obsidian2 = require("obsidian");
var nodeFs = __toESM(require("node:fs"));
var nodePath = __toESM(require("node:path"));
var nodeOs = __toESM(require("node:os"));

// src/_template-files.js
var TEMPLATE_REV = "62a350e9b834bf42";
var TEMPLATE_FILES = { "package.json": { "t": "utf8", "v": '{\n  "name": "blog-static",\n  "version": "1.0.0",\n  "private": true,\n  "scripts": {\n    "predev": "node scripts/build-content.mjs",\n    "dev": "next dev -p 3010",\n    "postdev": "node scripts/build-content.mjs --finalize",\n    "build": "node scripts/build-content.mjs && next build && node scripts/build-content.mjs --finalize",\n    "preview": "node scripts/serve.mjs",\n    "manage": "node scripts/manager.mjs",\n    "test": "bash scripts/e2e-run.sh"\n  },\n  "dependencies": {\n    "@radix-ui/react-dialog": "^1.1.6",\n    "@radix-ui/react-slot": "^1.1.2",\n    "@radix-ui/react-switch": "^1.1.2",\n    "@radix-ui/react-tabs": "^1.1.3",\n    "@tanstack/react-query": "^5.104.0",\n    "class-variance-authority": "^0.7.1",\n    "clsx": "^2.1.1",\n    "gray-matter": "^4.0.3",\n    "katex": "^0.16.22",\n    "lucide-react": "0.544.0",\n    "next": "16.3.7",\n    "next-themes": "^0.4.6",\n    "react": "19.3.0",\n    "react-dom": "19.3.0",\n    "react-markdown": "10.1.0",\n    "rehype-highlight": "^7.0.2",\n    "rehype-katex": "^7.0.1",\n    "rehype-raw": "^7.0.0",\n    "remark-gfm": "^4.0.1",\n    "remark-math": "^6.0.0",\n    "sonner": "2.0.8",\n    "tailwind-merge": "^3.3.1",\n    "unist-util-visit": "^5.0.0",\n    "zustand": "^5.0.8"\n  },\n  "devDependencies": {\n    "@tailwindcss/postcss": "^4.3.3",\n    "@types/mdast": "^4.0.4",\n    "@types/node": "^22.15.0",\n    "@types/react": "19.3.0",\n    "@types/react-dom": "19.1.0",\n    "tailwindcss": "^4.3.3",\n    "tw-animate-css": "^1.4.0",\n    "typescript": "^5.9.2"\n  }\n}\n' }, "package-lock.json": { "t": "utf8", "v": '{\n  "name": "blog-static",\n  "version": "1.0.0",\n  "lockfileVersion": 3,\n  "requires": true,\n  "packages": {\n    "": {\n      "name": "blog-static",\n      "version": "1.0.0",\n      "dependencies": {\n        "@radix-ui/react-dialog": "^1.1.6",\n        "@radix-ui/react-slot": "^1.1.2",\n        "@radix-ui/react-switch": "^1.1.2",\n        "@radix-ui/react-tabs": "^1.1.3",\n        "@tanstack/react-query": "^5.104.0",\n        "class-variance-authority": "^0.7.1",\n        "clsx": "^2.1.1",\n        "gray-matter": "^4.0.3",\n        "katex": "^0.16.22",\n        "lucide-react": "0.544.0",\n        "next": "16.3.7",\n        "next-themes": "^0.4.6",\n        "react": "19.3.0",\n        "react-dom": "19.3.0",\n        "react-markdown": "10.1.0",\n        "rehype-highlight": "^7.0.2",\n        "rehype-katex": "^7.0.1",\n        "rehype-raw": "^7.0.0",\n        "remark-gfm": "^4.0.1",\n        "remark-math": "^6.0.0",\n        "sonner": "2.0.8",\n        "tailwind-merge": "^3.3.1",\n        "unist-util-visit": "^5.0.0",\n        "zustand": "^5.0.8"\n      },\n      "devDependencies": {\n        "@tailwindcss/postcss": "^4.3.3",\n        "@types/mdast": "^4.0.4",\n        "@types/node": "^22.15.0",\n        "@types/react": "19.3.0",\n        "@types/react-dom": "19.1.0",\n        "tailwindcss": "^4.3.3",\n        "tw-animate-css": "^1.4.0",\n        "typescript": "^5.9.2"\n      }\n    },\n    "node_modules/@alloc/quick-lru": {\n      "version": "5.3.0",\n      "resolved": "https://registry.npmmirror.com/@alloc/quick-lru/-/quick-lru-5.3.0.tgz",\n      "integrity": "sha512-U4+70Pc5ZS9osnCBCE5Jha/ciHM+Yp+CNMNC/7HvYbNRk1Ldd+f7qO65W5qfhu/TCv+/ozljlXXe9Nj8419DMA==",\n      "dev": true,\n      "license": "MIT",\n      "engines": {\n        "node": ">=10"\n      },\n      "funding": {\n        "url": "https://github.com/sponsors/sindresorhus"\n      }\n    },\n    "node_modules/@emnapi/runtime": {\n      "version": "1.11.3",\n      "resolved": "https://registry.npmmirror.com/@emnapi/runtime/-/runtime-1.11.3.tgz",\n      "integrity": "sha512-Xz4Tpyki7XyrpbUK1jR1AhdAdaXyhhY4lZ3neLodmhpuWfy2PAQN5B46sAiU4liOXGLkHypn/qU+jvfWSCYYLA==",\n      "license": "MIT",\n      "optional": true,\n      "dependencies": {\n        "tslib": "^2.4.0"\n      }\n    },\n    "node_modules/@img/colour": {\n      "version": "1.1.0",\n      "resolved": "https://registry.npmmirror.com/@img/colour/-/colour-1.1.0.tgz",\n      "integrity": "sha512-Td76q7j57o/tLVdgS746cYARfSyxk8iEfRxewL9h4OMzYhbW4TAcppl0mT4eyqXddh6L/jwoM75mo7ixa/pCeQ==",\n      "license": "MIT",\n      "optional": true,\n      "engines": {\n        "node": ">=18"\n      }\n    },\n    "node_modules/@img/sharp-darwin-arm64": {\n      "version": "0.35.5",\n      "resolved": "https://registry.npmmirror.com/@img/sharp-darwin-arm64/-/sharp-darwin-arm64-0.35.5.tgz",\n      "integrity": "sha512-QRUlFQ0WxvdWyqqG/WtI3iupfD5rBzmCHXSdPsY91sAtVtTo7Q4cb6zOccZ3gqEqkr0f1As1ehLqmEpDsRf+lg==",\n      "cpu": [\n        "arm64"\n      ],\n      "license": "Apache-2.0",\n      "optional": true,\n      "os": [\n        "darwin"\n      ],\n      "engines": {\n        "node": ">=20.9.0"\n      },\n      "funding": {\n        "url": "https://opencollective.com/libvips"\n      },\n      "optionalDependencies": {\n        "@img/sharp-libvips-darwin-arm64": "1.3.4"\n      }\n    },\n    "node_modules/@img/sharp-darwin-x64": {\n      "version": "0.35.5",\n      "resolved": "https://registry.npmmirror.com/@img/sharp-darwin-x64/-/sharp-darwin-x64-0.35.5.tgz",\n      "integrity": "sha512-+BR255RhDlpygUpOc/Jdt1nT6DQ3XG/ERo5wbcdOf5Q320dKtPCKPLR1LJs9VGXRaMa8l1uUa0tkCNOXiAxZUw==",\n      "cpu": [\n        "x64"\n      ],\n      "license": "Apache-2.0",\n      "optional": true,\n      "os": [\n        "darwin"\n      ],\n      "engines": {\n        "node": ">=20.9.0"\n      },\n      "funding": {\n        "url": "https://opencollective.com/libvips"\n      },\n      "optionalDependencies": {\n        "@img/sharp-libvips-darwin-x64": "1.3.4"\n      }\n    },\n    "node_modules/@img/sharp-freebsd-wasm32": {\n      "version": "0.35.5",\n      "resolved": "https://registry.npmmirror.com/@img/sharp-freebsd-wasm32/-/sharp-freebsd-wasm32-0.35.5.tgz",\n      "integrity": "sha512-Y/z91nEZ4uIBX5X3nfTovjU9lHNKFYbL2lpHCLVNmXQK03VIZvXBBt0KxbPGp2SdGSF+2mQU4e+hQaWOt86iAw==",\n      "license": "Apache-2.0",\n      "optional": true,\n      "os": [\n        "freebsd"\n      ],\n      "dependencies": {\n        "@img/sharp-wasm32": "0.35.5"\n      },\n      "engines": {\n        "node": ">=20.9.0"\n      },\n      "funding": {\n        "url": "https://opencollective.com/libvips"\n      }\n    },\n    "node_modules/@img/sharp-libvips-darwin-arm64": {\n      "version": "1.3.4",\n      "resolved": "https://registry.npmmirror.com/@img/sharp-libvips-darwin-arm64/-/sharp-libvips-darwin-arm64-1.3.4.tgz",\n      "integrity": "sha512-5R89nBYiRdUlSWJxPhO+GVtaXzXSxKnRu/xqMn3KTA3L9EB9Oy/P+Nn2f2vlhPuUdy/Zusb2DarbyTpGCfEDuw==",\n      "cpu": [\n        "arm64"\n      ],\n      "license": "LGPL-3.0-or-later",\n      "optional": true,\n      "os": [\n        "darwin"\n      ],\n      "funding": {\n        "url": "https://opencollective.com/libvips"\n      }\n    },\n    "node_modules/@img/sharp-libvips-darwin-x64": {\n      "version": "1.3.4",\n      "resolved": "https://registry.npmmirror.com/@img/sharp-libvips-darwin-x64/-/sharp-libvips-darwin-x64-1.3.4.tgz",\n      "integrity": "sha512-iR2OKH80yi0U+dUplyh3/xdpFvps6YkCwsXenIJxqxR1v9o+xtKTGbS9H7cps+2Vxjc8B1j96p75NmTGjIhtpQ==",\n      "cpu": [\n        "x64"\n      ],\n      "license": "LGPL-3.0-or-later",\n      "optional": true,\n      "os": [\n        "darwin"\n      ],\n      "funding": {\n        "url": "https://opencollective.com/libvips"\n      }\n    },\n    "node_modules/@img/sharp-libvips-linux-arm": {\n      "version": "1.3.4",\n      "resolved": "https://registry.npmmirror.com/@img/sharp-libvips-linux-arm/-/sharp-libvips-linux-arm-1.3.4.tgz",\n      "integrity": "sha512-LmRtTsOHuvM2+wlO2Db37dx5MiZhB0FvSunciw48YjdOkZz9KAiRbm8ujeMOA1INqmei5NapFxYEK1D1ZSidmw==",\n      "cpu": [\n        "arm"\n      ],\n      "libc": [\n        "glibc"\n      ],\n      "license": "LGPL-3.0-or-later",\n      "optional": true,\n      "os": [\n        "linux"\n      ],\n      "funding": {\n        "url": "https://opencollective.com/libvips"\n      }\n    },\n    "node_modules/@img/sharp-libvips-linux-arm64": {\n      "version": "1.3.4",\n      "resolved": "https://registry.npmmirror.com/@img/sharp-libvips-linux-arm64/-/sharp-libvips-linux-arm64-1.3.4.tgz",\n      "integrity": "sha512-Y3dgX/6lE2QhQb+Gxy0WZxfg9MEm/JBjamZpS2IklP7xIQoKN4hzAm7KcMVGtaVDt3neE9OKBC7vAfonA/Lr1A==",\n      "cpu": [\n        "arm64"\n      ],\n      "libc": [\n        "glibc"\n      ],\n      "license": "LGPL-3.0-or-later",\n      "optional": true,\n      "os": [\n        "linux"\n      ],\n      "funding": {\n        "url": "https://opencollective.com/libvips"\n      }\n    },\n    "node_modules/@img/sharp-libvips-linux-ppc64": {\n      "version": "1.3.4",\n      "resolved": "https://registry.npmmirror.com/@img/sharp-libvips-linux-ppc64/-/sharp-libvips-linux-ppc64-1.3.4.tgz",\n      "integrity": "sha512-Le6boB8Tai0Nis+gIxIpKx68UDVVIqdR8Tin5Yf1z2LJJQLDJvCDRqRu+jC2qCoD+eIomonmOwB4smBRxfVpYQ==",\n      "cpu": [\n        "ppc64"\n      ],\n      "libc": [\n        "glibc"\n      ],\n      "license": "LGPL-3.0-or-later",\n      "optional": true,\n      "os": [\n        "linux"\n      ],\n      "funding": {\n        "url": "https://opencollective.com/libvips"\n      }\n    },\n    "node_modules/@img/sharp-libvips-linux-riscv64": {\n      "version": "1.3.4",\n      "resolved": "https://registry.npmmirror.com/@img/sharp-libvips-linux-riscv64/-/sharp-libvips-linux-riscv64-1.3.4.tgz",\n      "integrity": "sha512-aHkkIEHPRdQEegJN20MLmGtxYD9R2wQr3Cwpddnu5+YKMt6Uzax7S9h5gpZTo8wyrGuZSlfQ63OevL5mTyOC7Q==",\n      "cpu": [\n        "riscv64"\n      ],\n      "libc": [\n        "glibc"\n      ],\n      "license": "LGPL-3.0-or-later",\n      "optional": true,\n      "os": [\n        "linux"\n      ],\n      "funding": {\n        "url": "https://opencollective.com/libvips"\n      }\n    },\n    "node_modules/@img/sharp-libvips-linux-s390x": {\n      "version": "1.3.4",\n      "resolved": "https://registry.npmmirror.com/@img/sharp-libvips-linux-s390x/-/sharp-libvips-linux-s390x-1.3.4.tgz",\n      "integrity": "sha512-ra/mB6MikESDUO7Yg+Mi95bFBb9GsObURuhnOv3OqknjGe9sZrG8tCe9q0xSIGrtLgvgw0gKnFWcK4blSgQOuQ==",\n      "cpu": [\n        "s390x"\n      ],\n      "libc": [\n        "glibc"\n      ],\n      "license": "LGPL-3.0-or-later",\n      "optional": true,\n      "os": [\n        "linux"\n      ],\n      "funding": {\n        "url": "https://opencollective.com/libvips"\n      }\n    },\n    "node_modules/@img/sharp-libvips-linux-x64": {\n      "version": "1.3.4",\n      "resolved": "https://registry.npmmirror.com/@img/sharp-libvips-linux-x64/-/sharp-libvips-linux-x64-1.3.4.tgz",\n      "integrity": "sha512-GJ//SSXbnwSDes02umB3nDJLFcQzw8a18V8fyhqr6tV515tOEMdImjjxj1AoafMRz56F3PHgftnj1QEKSU1zkw==",\n      "cpu": [\n        "x64"\n      ],\n      "libc": [\n        "glibc"\n      ],\n      "license": "LGPL-3.0-or-later",\n      "optional": true,\n      "os": [\n        "linux"\n      ],\n      "funding": {\n        "url": "https://opencollective.com/libvips"\n      }\n    },\n    "node_modules/@img/sharp-libvips-linuxmusl-arm64": {\n      "version": "1.3.4",\n      "resolved": "https://registry.npmmirror.com/@img/sharp-libvips-linuxmusl-arm64/-/sharp-libvips-linuxmusl-arm64-1.3.4.tgz",\n      "integrity": "sha512-hvulFwtjUcagsis6BBxHwGFwWoNZjgYmULGVrZcyfNbjA8hKILbRxGg15/7w5HDyXHXUos/j6baAWqnCyQ2DWA==",\n      "cpu": [\n        "arm64"\n      ],\n      "libc": [\n        "musl"\n      ],\n      "license": "LGPL-3.0-or-later",\n      "optional": true,\n      "os": [\n        "linux"\n      ],\n      "funding": {\n        "url": "https://opencollective.com/libvips"\n      }\n    },\n    "node_modules/@img/sharp-libvips-linuxmusl-x64": {\n      "version": "1.3.4",\n      "resolved": "https://registry.npmmirror.com/@img/sharp-libvips-linuxmusl-x64/-/sharp-libvips-linuxmusl-x64-1.3.4.tgz",\n      "integrity": "sha512-6zXKeE/p39I1AmA3cJG35eyBGNqNddLnUXjhwBnsGjFPWqf5VKkDBEqaEkPDoTEtkxwi2vv8Tcr2mDyP4So7Fg==",\n      "cpu": [\n        "x64"\n      ],\n      "libc": [\n        "musl"\n      ],\n      "license": "LGPL-3.0-or-later",\n      "optional": true,\n      "os": [\n        "linux"\n      ],\n      "funding": {\n        "url": "https://opencollective.com/libvips"\n      }\n    },\n    "node_modules/@img/sharp-linux-arm": {\n      "version": "0.35.5",\n      "resolved": "https://registry.npmmirror.com/@img/sharp-linux-arm/-/sharp-linux-arm-0.35.5.tgz",\n      "integrity": "sha512-LEaXK2WdXVK5ykcw0buWyPMsmLLL2vpHLD6yrNSW+JGEL3BZPA4tpKN6iaMc4AxTTAoaX/sU1rOL51lcIz48ZQ==",\n      "cpu": [\n        "arm"\n      ],\n      "libc": [\n        "glibc"\n      ],\n      "license": "Apache-2.0",\n      "optional": true,\n      "os": [\n        "linux"\n      ],\n      "engines": {\n        "node": ">=20.9.0"\n      },\n      "funding": {\n        "url": "https://opencollective.com/libvips"\n      },\n      "optionalDependencies": {\n        "@img/sharp-libvips-linux-arm": "1.3.4"\n      }\n    },\n    "node_modules/@img/sharp-linux-arm64": {\n      "version": "0.35.5",\n      "resolved": "https://registry.npmmirror.com/@img/sharp-linux-arm64/-/sharp-linux-arm64-0.35.5.tgz",\n      "integrity": "sha512-LYVx5JTsOM2CBzmxreh+nl64/3H6Xb09iSLknqH47z2T2DFFxDeFLP5y4dJwe6H7uGQlHPyEEtIqyo3DYsRwdQ==",\n      "cpu": [\n        "arm64"\n      ],\n      "libc": [\n        "glibc"\n      ],\n      "license": "Apache-2.0",\n      "optional": true,\n      "os": [\n        "linux"\n      ],\n      "engines": {\n        "node": ">=20.9.0"\n      },\n      "funding": {\n        "url": "https://opencollective.com/libvips"\n      },\n      "optionalDependencies": {\n        "@img/sharp-libvips-linux-arm64": "1.3.4"\n      }\n    },\n    "node_modules/@img/sharp-linux-ppc64": {\n      "version": "0.35.5",\n      "resolved": "https://registry.npmmirror.com/@img/sharp-linux-ppc64/-/sharp-linux-ppc64-0.35.5.tgz",\n      "integrity": "sha512-QVxAAq8evVRI9ia2vqgwrmWucn5Dfv+JdWzj75pD8omHLPSP7f8p20O8jxzjCcuCEQEOtYOZUmX1hkiZ0kdevA==",\n      "cpu": [\n        "ppc64"\n      ],\n      "libc": [\n        "glibc"\n      ],\n      "license": "Apache-2.0",\n      "optional": true,\n      "os": [\n        "linux"\n      ],\n      "engines": {\n        "node": ">=20.9.0"\n      },\n      "funding": {\n        "url": "https://opencollective.com/libvips"\n      },\n      "optionalDependencies": {\n        "@img/sharp-libvips-linux-ppc64": "1.3.4"\n      }\n    },\n    "node_modules/@img/sharp-linux-riscv64": {\n      "version": "0.35.5",\n      "resolved": "https://registry.npmmirror.com/@img/sharp-linux-riscv64/-/sharp-linux-riscv64-0.35.5.tgz",\n      "integrity": "sha512-LtdreXguaavKODPIfzJ4kffx7UNt1omwtK0rch4EBbbSTXPnxWmYSayXdLJw0fJzQ97kHt1gL/yh4tvU+nCyRQ==",\n      "cpu": [\n        "riscv64"\n      ],\n      "libc": [\n        "glibc"\n      ],\n      "license": "Apache-2.0",\n      "optional": true,\n      "os": [\n        "linux"\n      ],\n      "engines": {\n        "node": ">=20.9.0"\n      },\n      "funding": {\n        "url": "https://opencollective.com/libvips"\n      },\n      "optionalDependencies": {\n        "@img/sharp-libvips-linux-riscv64": "1.3.4"\n      }\n    },\n    "node_modules/@img/sharp-linux-s390x": {\n      "version": "0.35.5",\n      "resolved": "https://registry.npmmirror.com/@img/sharp-linux-s390x/-/sharp-linux-s390x-0.35.5.tgz",\n      "integrity": "sha512-UZasTOFiYzotTsGOCu42BfUzP6Tu6Do/947iRm1RsLKvlllxwGcn4RN27LibGWceix4Y+Pmw3jsnTcCQIgWjqA==",\n      "cpu": [\n        "s390x"\n      ],\n      "libc": [\n        "glibc"\n      ],\n      "license": "Apache-2.0",\n      "optional": true,\n      "os": [\n        "linux"\n      ],\n      "engines": {\n        "node": ">=20.9.0"\n      },\n      "funding": {\n        "url": "https://opencollective.com/libvips"\n      },\n      "optionalDependencies": {\n        "@img/sharp-libvips-linux-s390x": "1.3.4"\n      }\n    },\n    "node_modules/@img/sharp-linux-x64": {\n      "version": "0.35.5",\n      "resolved": "https://registry.npmmirror.com/@img/sharp-linux-x64/-/sharp-linux-x64-0.35.5.tgz",\n      "integrity": "sha512-SxFtLTeJInhAA9Q836kux2vZNeOBQEx658qvbboZScr0wIARym3IcGmW7KpVD5sbVg0Ojy+udFQdayYIZyoNog==",\n      "cpu": [\n        "x64"\n      ],\n      "libc": [\n        "glibc"\n      ],\n      "license": "Apache-2.0",\n      "optional": true,\n      "os": [\n        "linux"\n      ],\n      "engines": {\n        "node": ">=20.9.0"\n      },\n      "funding": {\n        "url": "https://opencollective.com/libvips"\n      },\n      "optionalDependencies": {\n        "@img/sharp-libvips-linux-x64": "1.3.4"\n      }\n    },\n    "node_modules/@img/sharp-linuxmusl-arm64": {\n      "version": "0.35.5",\n      "resolved": "https://registry.npmmirror.com/@img/sharp-linuxmusl-arm64/-/sharp-linuxmusl-arm64-0.35.5.tgz",\n      "integrity": "sha512-9HbMclmI1zlNkFRs3z9/eBtDjfD0sGlrX1z6b1qwmiFY5ElDLh4BC0LPBdVp7z1DXFiKlIcznf+ZlsuZzLxQqg==",\n      "cpu": [\n        "arm64"\n      ],\n      "libc": [\n        "musl"\n      ],\n      "license": "Apache-2.0",\n      "optional": true,\n      "os": [\n        "linux"\n      ],\n      "engines": {\n        "node": ">=20.9.0"\n      },\n      "funding": {\n        "url": "https://opencollective.com/libvips"\n      },\n      "optionalDependencies": {\n        "@img/sharp-libvips-linuxmusl-arm64": "1.3.4"\n      }\n    },\n    "node_modules/@img/sharp-linuxmusl-x64": {\n      "version": "0.35.5",\n      "resolved": "https://registry.npmmirror.com/@img/sharp-linuxmusl-x64/-/sharp-linuxmusl-x64-0.35.5.tgz",\n      "integrity": "sha512-4KOphqB035HrVdqLZfCgMzzERrQkkzOwRhl4OAkRO1YCldbaFjySXMaK534Mo0V+LndnlJk+sbUyLeU0ULyD1A==",\n      "cpu": [\n        "x64"\n      ],\n      "libc": [\n        "musl"\n      ],\n      "license": "Apache-2.0",\n      "optional": true,\n      "os": [\n        "linux"\n      ],\n      "engines": {\n        "node": ">=20.9.0"\n      },\n      "funding": {\n        "url": "https://opencollective.com/libvips"\n      },\n      "optionalDependencies": {\n        "@img/sharp-libvips-linuxmusl-x64": "1.3.4"\n      }\n    },\n    "node_modules/@img/sharp-wasm32": {\n      "version": "0.35.5",\n      "resolved": "https://registry.npmmirror.com/@img/sharp-wasm32/-/sharp-wasm32-0.35.5.tgz",\n      "integrity": "sha512-Ptsga1su4tQx+LLF1ECS9U6nz5kmrXKo6XVbtR48Ke3ZRxxgaWBu7IDtEe1quo8hiupwm6WFqxVlXaSf7IINGQ==",\n      "license": "Apache-2.0 AND LGPL-3.0-or-later AND MIT",\n      "optional": true,\n      "dependencies": {\n        "@emnapi/runtime": "^1.11.3"\n      },\n      "engines": {\n        "node": ">=20.9.0"\n      },\n      "funding": {\n        "url": "https://opencollective.com/libvips"\n      }\n    },\n    "node_modules/@img/sharp-webcontainers-wasm32": {\n      "version": "0.35.5",\n      "resolved": "https://registry.npmmirror.com/@img/sharp-webcontainers-wasm32/-/sharp-webcontainers-wasm32-0.35.5.tgz",\n      "integrity": "sha512-hfhF/FmoQyTUkA0bIKFOtw536BQSeBMe6BF6QyWlrPxT754+TFLaZ7sKKTfvvM0yJgKgaYTwnFCIZ/GuDw5SUA==",\n      "cpu": [\n        "wasm32"\n      ],\n      "license": "Apache-2.0",\n      "optional": true,\n      "dependencies": {\n        "@img/sharp-wasm32": "0.35.5"\n      },\n      "engines": {\n        "node": ">=20.9.0"\n      },\n      "funding": {\n        "url": "https://opencollective.com/libvips"\n      }\n    },\n    "node_modules/@img/sharp-win32-arm64": {\n      "version": "0.35.5",\n      "resolved": "https://registry.npmmirror.com/@img/sharp-win32-arm64/-/sharp-win32-arm64-0.35.5.tgz",\n      "integrity": "sha512-X4t7g+7ZA5DKblCBEXGjUqqemj4vczING/5viFwAL8h4N3qYeyjwdCvRLHi4EdOUI+2Z7UFlp1VM+p/AuEtm6Q==",\n      "cpu": [\n        "arm64"\n      ],\n      "license": "Apache-2.0 AND LGPL-3.0-or-later",\n      "optional": true,\n      "os": [\n        "win32"\n      ],\n      "engines": {\n        "node": ">=20.9.0"\n      },\n      "funding": {\n        "url": "https://opencollective.com/libvips"\n      }\n    },\n    "node_modules/@img/sharp-win32-ia32": {\n      "version": "0.35.5",\n      "resolved": "https://registry.npmmirror.com/@img/sharp-win32-ia32/-/sharp-win32-ia32-0.35.5.tgz",\n      "integrity": "sha512-5Zm82LoBc43nhwNybZlG7Y1KO//Zhsn306fQl29ZOuStHLGTo3BWL83q3cznX0poxSAMuYL1On/BHBxkBeKr6A==",\n      "cpu": [\n        "ia32"\n      ],\n      "license": "Apache-2.0 AND LGPL-3.0-or-later",\n      "optional": true,\n      "os": [\n        "win32"\n      ],\n      "engines": {\n        "node": "^20.9.0"\n      },\n      "funding": {\n        "url": "https://opencollective.com/libvips"\n      }\n    },\n    "node_modules/@img/sharp-win32-x64": {\n      "version": "0.35.5",\n      "resolved": "https://registry.npmmirror.com/@img/sharp-win32-x64/-/sharp-win32-x64-0.35.5.tgz",\n      "integrity": "sha512-x76eH0vEiHlcMQu8Y8IenntaACtddpT6W0wmXtWrnKcnKI7ME5DdgqhAD6SEWOEl1v2zDvkZDhFA9KnURwpfqg==",\n      "cpu": [\n        "x64"\n      ],\n      "license": "Apache-2.0 AND LGPL-3.0-or-later",\n      "optional": true,\n      "os": [\n        "win32"\n      ],\n      "engines": {\n        "node": ">=20.9.0"\n      },\n      "funding": {\n        "url": "https://opencollective.com/libvips"\n      }\n    },\n    "node_modules/@jridgewell/gen-mapping": {\n      "version": "0.3.13",\n      "resolved": "https://registry.npmmirror.com/@jridgewell/gen-mapping/-/gen-mapping-0.3.13.tgz",\n      "integrity": "sha512-2kkt/7niJ6MgEPxF0bYdQ6etZaA+fQvDcLKckhy1yIQOzaoKjBBjSj63/aLVjYE3qhRt5dvM+uUyfCg6UKCBbA==",\n      "dev": true,\n      "license": "MIT",\n      "dependencies": {\n        "@jridgewell/sourcemap-codec": "^1.5.0",\n        "@jridgewell/trace-mapping": "^0.3.24"\n      }\n    },\n    "node_modules/@jridgewell/remapping": {\n      "version": "2.3.5",\n      "resolved": "https://registry.npmmirror.com/@jridgewell/remapping/-/remapping-2.3.5.tgz",\n      "integrity": "sha512-LI9u/+laYG4Ds1TDKSJW2YPrIlcVYOwi2fUC6xB43lueCjgxV4lffOCZCtYFiH6TNOX+tQKXx97T4IKHbhyHEQ==",\n      "dev": true,\n      "license": "MIT",\n      "dependencies": {\n        "@jridgewell/gen-mapping": "^0.3.5",\n        "@jridgewell/trace-mapping": "^0.3.24"\n      }\n    },\n    "node_modules/@jridgewell/resolve-uri": {\n      "version": "3.1.2",\n      "resolved": "https://registry.npmmirror.com/@jridgewell/resolve-uri/-/resolve-uri-3.1.2.tgz",\n      "integrity": "sha512-bRISgCIjP20/tbWSPWMEi54QVPRZExkuD9lJL+UIxUKtwVJA8wW1Trb1jMs1RFXo1CBTNZ/5hpC9QvmKWdopKw==",\n      "dev": true,\n      "license": "MIT",\n      "engines": {\n        "node": ">=6.0.0"\n      }\n    },\n    "node_modules/@jridgewell/sourcemap-codec": {\n      "version": "1.6.0",\n      "resolved": "https://registry.npmmirror.com/@jridgewell/sourcemap-codec/-/sourcemap-codec-1.6.0.tgz",\n      "integrity": "sha512-T7jf+5zgsZHwNJ4lvQ7/aezbyk0nNX+zJVWpmHA7VYsEx7a7qr5Rg5IbtJFqkgze5Y2sruq1RUY8Q837Od7iFw==",\n      "dev": true,\n      "license": "MIT"\n    },\n    "node_modules/@jridgewell/trace-mapping": {\n      "version": "0.3.31",\n      "resolved": "https://registry.npmmirror.com/@jridgewell/trace-mapping/-/trace-mapping-0.3.31.tgz",\n      "integrity": "sha512-zzNR+SdQSDJzc8joaeP8QQoCQr8NuYx2dIIytl1QeBEZHJ9uW6hebsrYgbz8hJwUQao3TWCMtmfV8Nu1twOLAw==",\n      "dev": true,\n      "license": "MIT",\n      "dependencies": {\n        "@jridgewell/resolve-uri": "^3.1.0",\n        "@jridgewell/sourcemap-codec": "^1.4.14"\n      }\n    },\n    "node_modules/@next/env": {\n      "version": "16.3.7",\n      "resolved": "https://registry.npmmirror.com/@next/env/-/env-16.3.7.tgz",\n      "integrity": "sha512-/HuhBN1CorqNTmewTIh81yXOQri6B8Ye/c9D7+830XqwVaf8qMnJNrgNxDn6dLtihq8YzBbI6NSAuMKvpr+DvQ==",\n      "license": "MIT"\n    },\n    "node_modules/@next/swc-darwin-arm64": {\n      "version": "16.3.7",\n      "resolved": "https://registry.npmmirror.com/@next/swc-darwin-arm64/-/swc-darwin-arm64-16.3.7.tgz",\n      "integrity": "sha512-MDAd3woxfJOVFtfG2VAuaz5zyyVZTMVUPJAknotCNgeEPrPlRBlcV9YSd8S620P6TiSc2MWpfwO/UAHl9EWRug==",\n      "cpu": [\n        "arm64"\n      ],\n      "license": "MIT",\n      "optional": true,\n      "os": [\n        "darwin"\n      ],\n      "engines": {\n        "node": ">= 10"\n      }\n    },\n    "node_modules/@next/swc-darwin-x64": {\n      "version": "16.3.7",\n      "resolved": "https://registry.npmmirror.com/@next/swc-darwin-x64/-/swc-darwin-x64-16.3.7.tgz",\n      "integrity": "sha512-Usd86QilBWl2G7JxfWskV9NLAxacVRrDDQ3WQIoPKRB0MXiVuVSdyu3wt5EA8SyjQpaVk/7VOzSkRB4LgJltyA==",\n      "cpu": [\n        "x64"\n      ],\n      "license": "MIT",\n      "optional": true,\n      "os": [\n        "darwin"\n      ],\n      "engines": {\n        "node": ">= 10"\n      }\n    },\n    "node_modules/@next/swc-linux-arm64-gnu": {\n      "version": "16.3.7",\n      "resolved": "https://registry.npmmirror.com/@next/swc-linux-arm64-gnu/-/swc-linux-arm64-gnu-16.3.7.tgz",\n      "integrity": "sha512-pVauSs1WomgtBgfJj/Q+846nBix4CdohLUIDafyJGdAvNw5kOusLawoX+rpc2P4U3Kd7tLwqFXsnHeSkLZrqyw==",\n      "cpu": [\n        "arm64"\n      ],\n      "libc": [\n        "glibc"\n      ],\n      "license": "MIT",\n      "optional": true,\n      "os": [\n        "linux"\n      ],\n      "engines": {\n        "node": ">= 10"\n      }\n    },\n    "node_modules/@next/swc-linux-arm64-musl": {\n      "version": "16.3.7",\n      "resolved": "https://registry.npmmirror.com/@next/swc-linux-arm64-musl/-/swc-linux-arm64-musl-16.3.7.tgz",\n      "integrity": "sha512-vY+iamd6cOfk29bGTgxeS/OXlrlfOfyFgyd34cibC7e25bXRMxuqNUfs2Z9Fxb/VHpV5dopffMSWnCeR2tc8rA==",\n      "cpu": [\n        "arm64"\n      ],\n      "libc": [\n        "musl"\n      ],\n      "license": "MIT",\n      "optional": true,\n      "os": [\n        "linux"\n      ],\n      "engines": {\n        "node": ">= 10"\n      }\n    },\n    "node_modules/@next/swc-linux-x64-gnu": {\n      "version": "16.3.7",\n      "resolved": "https://registry.npmmirror.com/@next/swc-linux-x64-gnu/-/swc-linux-x64-gnu-16.3.7.tgz",\n      "integrity": "sha512-NWx0LRZ9IO9rTDXLc+Hi/bNcTKblT86du4OLMRm5Z62C2T5/+mNEhK2XeQxwoSmVFvU2rjMSjJMK4ttZAk88+w==",\n      "cpu": [\n        "x64"\n      ],\n      "libc": [\n        "glibc"\n      ],\n      "license": "MIT",\n      "optional": true,\n      "os": [\n        "linux"\n      ],\n      "engines": {\n        "node": ">= 10"\n      }\n    },\n    "node_modules/@next/swc-linux-x64-musl": {\n      "version": "16.3.7",\n      "resolved": "https://registry.npmmirror.com/@next/swc-linux-x64-musl/-/swc-linux-x64-musl-16.3.7.tgz",\n      "integrity": "sha512-v5Dk/iMB4JyQZwQ+UWOZGGAqA4HjkBewKwaCkXi5DqL1Dy1TjXpRmAh8N7VOuID0hLmouICSXozJrMBBG1Xeyw==",\n      "cpu": [\n        "x64"\n      ],\n      "libc": [\n        "musl"\n      ],\n      "license": "MIT",\n      "optional": true,\n      "os": [\n        "linux"\n      ],\n      "engines": {\n        "node": ">= 10"\n      }\n    },\n    "node_modules/@next/swc-win32-arm64-msvc": {\n      "version": "16.3.7",\n      "resolved": "https://registry.npmmirror.com/@next/swc-win32-arm64-msvc/-/swc-win32-arm64-msvc-16.3.7.tgz",\n      "integrity": "sha512-G4BkB7AhfKJnaoIpIkoA66l5pXPGJXD3EF1EsuYj/sgM4rHA41dsa3CIIqjR4FQFZEjU+zGQRbIEPYZIOi5EoA==",\n      "cpu": [\n        "arm64"\n      ],\n      "license": "MIT",\n      "optional": true,\n      "os": [\n        "win32"\n      ],\n      "engines": {\n        "node": ">= 10"\n      }\n    },\n    "node_modules/@next/swc-win32-x64-msvc": {\n      "version": "16.3.7",\n      "resolved": "https://registry.npmmirror.com/@next/swc-win32-x64-msvc/-/swc-win32-x64-msvc-16.3.7.tgz",\n      "integrity": "sha512-DuvRhf50tGU7leT9Ow0cs/9lo81X5lHdNoxSRk4ckSk2Ihn2dsM+BEe5j7ANpEFhD25p//SmV8ajdRtuaBIg3g==",\n      "cpu": [\n        "x64"\n      ],\n      "license": "MIT",\n      "optional": true,\n      "os": [\n        "win32"\n      ],\n      "engines": {\n        "node": ">= 10"\n      }\n    },\n    "node_modules/@radix-ui/primitive": {\n      "version": "1.1.7",\n      "resolved": "https://registry.npmmirror.com/@radix-ui/primitive/-/primitive-1.1.7.tgz",\n      "integrity": "sha512-rqWnm76nYT8HoNNqEjpgJ7Pw/DrBj5iBTrmEPo6HTX5+VJyBNOqTdv4g89G63HuR5g0AaENoAcH7Is5fF2kZ8Q==",\n      "license": "MIT"\n    },\n    "node_modules/@radix-ui/react-collection": {\n      "version": "1.1.16",\n      "resolved": "https://registry.npmmirror.com/@radix-ui/react-collection/-/react-collection-1.1.16.tgz",\n      "integrity": "sha512-yEQrjfI5eBbeYEJXOASpm+gs9eNHY8+UjkZ81GzcuwdLrSMOlEM8jnGoGdeGo92oiBMkuwZUhHTsnsrDiJLcyA==",\n      "license": "MIT",\n      "dependencies": {\n        "@radix-ui/react-compose-refs": "1.1.5",\n        "@radix-ui/react-context": "1.2.2",\n        "@radix-ui/react-primitive": "2.1.11",\n        "@radix-ui/react-slot": "1.4.0"\n      },\n      "peerDependencies": {\n        "@types/react": "*",\n        "@types/react-dom": "*",\n        "react": "^16.8 || ^17.0 || ^18.0 || ^19.0 || ^19.0.0-rc",\n        "react-dom": "^16.8 || ^17.0 || ^18.0 || ^19.0 || ^19.0.0-rc"\n      },\n      "peerDependenciesMeta": {\n        "@types/react": {\n          "optional": true\n        },\n        "@types/react-dom": {\n          "optional": true\n        }\n      }\n    },\n    "node_modules/@radix-ui/react-compose-refs": {\n      "version": "1.1.5",\n      "resolved": "https://registry.npmmirror.com/@radix-ui/react-compose-refs/-/react-compose-refs-1.1.5.tgz",\n      "integrity": "sha512-+48PbAAbq3didjJxa+OaWY2ZwgAKsNiRGyeHKszblZMQ+kcpd9pAaT11cMkGEie0vsOi3QdeTE6d5Fe3Gn61kA==",\n      "license": "MIT",\n      "peerDependencies": {\n        "@types/react": "*",\n        "react": "^16.8 || ^17.0 || ^18.0 || ^19.0 || ^19.0.0-rc"\n      },\n      "peerDependenciesMeta": {\n        "@types/react": {\n          "optional": true\n        }\n      }\n    },\n    "node_modules/@radix-ui/react-context": {\n      "version": "1.2.2",\n      "resolved": "https://registry.npmmirror.com/@radix-ui/react-context/-/react-context-1.2.2.tgz",\n      "integrity": "sha512-RHCUGwKHDr0hDGg4X7ma4JG4/+12qxw8rkh5QKdDldlCvtja6nUx1Ef/8HVrJze81lEsgLQlqjzjGNHantgnQA==",\n      "license": "MIT",\n      "peerDependencies": {\n        "@types/react": "*",\n        "react": "^16.8 || ^17.0 || ^18.0 || ^19.0 || ^19.0.0-rc"\n      },\n      "peerDependenciesMeta": {\n        "@types/react": {\n          "optional": true\n        }\n      }\n    },\n    "node_modules/@radix-ui/react-dialog": {\n      "version": "1.2.0",\n      "resolved": "https://registry.npmmirror.com/@radix-ui/react-dialog/-/react-dialog-1.2.0.tgz",\n      "integrity": "sha512-l5CX8HdNL+9cc4s7HkNyplumSA3FIx68sg9dttBHKr286fRBwq1MBniDVTeI/tkof92/APntMQvC1YG1Khb0Cg==",\n      "license": "MIT",\n      "dependencies": {\n        "@radix-ui/primitive": "1.1.7",\n        "@radix-ui/react-compose-refs": "1.1.5",\n        "@radix-ui/react-context": "1.2.2",\n        "@radix-ui/react-dismissable-layer": "1.1.20",\n        "@radix-ui/react-focus-guards": "1.1.6",\n        "@radix-ui/react-focus-scope": "1.2.0",\n        "@radix-ui/react-id": "1.1.4",\n        "@radix-ui/react-portal": "1.1.18",\n        "@radix-ui/react-presence": "1.1.11",\n        "@radix-ui/react-primitive": "2.1.11",\n        "@radix-ui/react-slot": "1.4.0",\n        "@radix-ui/react-use-controllable-state": "1.2.6",\n        "@radix-ui/react-use-layout-effect": "1.1.4",\n        "aria-hidden": "^1.2.4",\n        "react-remove-scroll": "^2.7.2"\n      },\n      "peerDependencies": {\n        "@types/react": "*",\n        "@types/react-dom": "*",\n        "react": "^16.8 || ^17.0 || ^18.0 || ^19.0 || ^19.0.0-rc",\n        "react-dom": "^16.8 || ^17.0 || ^18.0 || ^19.0 || ^19.0.0-rc"\n      },\n      "peerDependenciesMeta": {\n        "@types/react": {\n          "optional": true\n        },\n        "@types/react-dom": {\n          "optional": true\n        }\n      }\n    },\n    "node_modules/@radix-ui/react-direction": {\n      "version": "1.1.5",\n      "resolved": "https://registry.npmmirror.com/@radix-ui/react-direction/-/react-direction-1.1.5.tgz",\n      "integrity": "sha512-/NlO/rOqQabmg+GGr86vCmbJVhqTv85NfM9g6Gknf/JVygXeZ6e6HM/RW1omerW9HsFtecwNqgEAKV6UqDsvpA==",\n      "license": "MIT",\n      "peerDependencies": {\n        "@types/react": "*",\n        "react": "^16.8 || ^17.0 || ^18.0 || ^19.0 || ^19.0.0-rc"\n      },\n      "peerDependenciesMeta": {\n        "@types/react": {\n          "optional": true\n        }\n      }\n    },\n    "node_modules/@radix-ui/react-dismissable-layer": {\n      "version": "1.1.20",\n      "resolved": "https://registry.npmmirror.com/@radix-ui/react-dismissable-layer/-/react-dismissable-layer-1.1.20.tgz",\n      "integrity": "sha512-35WHRrycfnj2m4LvPiKMKHGLM3Y2WvUA744CkRdxjs1BGDX1c8PVMfmiSGTUwnHRbqdtIoxveYTXvcJSt7VfgQ==",\n      "license": "MIT",\n      "dependencies": {\n        "@radix-ui/primitive": "1.1.7",\n        "@radix-ui/react-compose-refs": "1.1.5",\n        "@radix-ui/react-primitive": "2.1.11",\n        "@radix-ui/react-use-callback-ref": "1.1.4",\n        "@radix-ui/react-use-effect-event": "0.0.5"\n      },\n      "peerDependencies": {\n        "@types/react": "*",\n        "@types/react-dom": "*",\n        "react": "^16.8 || ^17.0 || ^18.0 || ^19.0 || ^19.0.0-rc",\n        "react-dom": "^16.8 || ^17.0 || ^18.0 || ^19.0 || ^19.0.0-rc"\n      },\n      "peerDependenciesMeta": {\n        "@types/react": {\n          "optional": true\n        },\n        "@types/react-dom": {\n          "optional": true\n        }\n      }\n    },\n    "node_modules/@radix-ui/react-focus-guards": {\n      "version": "1.1.6",\n      "resolved": "https://registry.npmmirror.com/@radix-ui/react-focus-guards/-/react-focus-guards-1.1.6.tgz",\n      "integrity": "sha512-RNOJjfZMTyBM6xYmV3IVGXkPjIhcBAuv48POevAXwrGJhkWZ9p1rFoIS1JFooPuT193AZmRsCPhpoVJxx6OPoQ==",\n      "license": "MIT",\n      "peerDependencies": {\n        "@types/react": "*",\n        "react": "^16.8 || ^17.0 || ^18.0 || ^19.0 || ^19.0.0-rc"\n      },\n      "peerDependenciesMeta": {\n        "@types/react": {\n          "optional": true\n        }\n      }\n    },\n    "node_modules/@radix-ui/react-focus-scope": {\n      "version": "1.2.0",\n      "resolved": "https://registry.npmmirror.com/@radix-ui/react-focus-scope/-/react-focus-scope-1.2.0.tgz",\n      "integrity": "sha512-I5S7vsAOozx2lWSBAyuXjWIJ/A8qx4fjbv6115WoaRYQSb1yZDaeNHonUAQzXyE8oD+0whJHbQRl4HIE2gQ0Xw==",\n      "license": "MIT",\n      "dependencies": {\n        "@radix-ui/react-compose-refs": "1.1.5",\n        "@radix-ui/react-primitive": "2.1.11",\n        "@radix-ui/react-use-callback-ref": "1.1.4"\n      },\n      "peerDependencies": {\n        "@types/react": "*",\n        "@types/react-dom": "*",\n        "react": "^16.8 || ^17.0 || ^18.0 || ^19.0 || ^19.0.0-rc",\n        "react-dom": "^16.8 || ^17.0 || ^18.0 || ^19.0 || ^19.0.0-rc"\n      },\n      "peerDependenciesMeta": {\n        "@types/react": {\n          "optional": true\n        },\n        "@types/react-dom": {\n          "optional": true\n        }\n      }\n    },\n    "node_modules/@radix-ui/react-id": {\n      "version": "1.1.4",\n      "resolved": "https://registry.npmmirror.com/@radix-ui/react-id/-/react-id-1.1.4.tgz",\n      "integrity": "sha512-TMQp2llA+RYn7JcjnrMnz7wN4pcVttPZnRZo52PLQsoLVKzNlVwUeHmfePgTgRluXFvlD3GD5g5MOVVTJCO0qA==",\n      "license": "MIT",\n      "dependencies": {\n        "@radix-ui/react-use-layout-effect": "1.1.4"\n      },\n      "peerDependencies": {\n        "@types/react": "*",\n        "react": "^16.8 || ^17.0 || ^18.0 || ^19.0 || ^19.0.0-rc"\n      },\n      "peerDependenciesMeta": {\n        "@types/react": {\n          "optional": true\n        }\n      }\n    },\n    "node_modules/@radix-ui/react-portal": {\n      "version": "1.1.18",\n      "resolved": "https://registry.npmmirror.com/@radix-ui/react-portal/-/react-portal-1.1.18.tgz",\n      "integrity": "sha512-ygFIJ+QXNKf72AAq8x3hd22+ws7pYpmc1S0E4kW0Je+qD4qEb3FvxeKVQRGrVDMOkQaYfsB+Qs+KDh81a1gAOw==",\n      "license": "MIT",\n      "dependencies": {\n        "@radix-ui/react-primitive": "2.1.11",\n        "@radix-ui/react-use-layout-effect": "1.1.4"\n      },\n      "peerDependencies": {\n        "@types/react": "*",\n        "@types/react-dom": "*",\n        "react": "^16.8 || ^17.0 || ^18.0 || ^19.0 || ^19.0.0-rc",\n        "react-dom": "^16.8 || ^17.0 || ^18.0 || ^19.0 || ^19.0.0-rc"\n      },\n      "peerDependenciesMeta": {\n        "@types/react": {\n          "optional": true\n        },\n        "@types/react-dom": {\n          "optional": true\n        }\n      }\n    },\n    "node_modules/@radix-ui/react-presence": {\n      "version": "1.1.11",\n      "resolved": "https://registry.npmmirror.com/@radix-ui/react-presence/-/react-presence-1.1.11.tgz",\n      "integrity": "sha512-Z7/atlkab36Z8hm+V8zYc79r0W+tiOB1o0tun1By94JyadkekLQmtEAnBSP9XKXBNQsStoStS4+gX10JpS5akA==",\n      "license": "MIT",\n      "dependencies": {\n        "@radix-ui/react-use-layout-effect": "1.1.4"\n      },\n      "peerDependencies": {\n        "@types/react": "*",\n        "@types/react-dom": "*",\n        "react": "^16.8 || ^17.0 || ^18.0 || ^19.0 || ^19.0.0-rc",\n        "react-dom": "^16.8 || ^17.0 || ^18.0 || ^19.0 || ^19.0.0-rc"\n      },\n      "peerDependenciesMeta": {\n        "@types/react": {\n          "optional": true\n        },\n        "@types/react-dom": {\n          "optional": true\n        }\n      }\n    },\n    "node_modules/@radix-ui/react-primitive": {\n      "version": "2.1.11",\n      "resolved": "https://registry.npmmirror.com/@radix-ui/react-primitive/-/react-primitive-2.1.11.tgz",\n      "integrity": "sha512-RzcaSw5aKl0OPhBJ1wbolKSF6nVvN+0o/QLeIVq+09npiPdnCkPggy2k6gI6yetxl4ZyrlBPYFgCB8BQJZwXcQ==",\n      "license": "MIT",\n      "dependencies": {\n        "@radix-ui/react-slot": "1.4.0"\n      },\n      "peerDependencies": {\n        "@types/react": "*",\n        "@types/react-dom": "*",\n        "react": "^16.8 || ^17.0 || ^18.0 || ^19.0 || ^19.0.0-rc",\n        "react-dom": "^16.8 || ^17.0 || ^18.0 || ^19.0 || ^19.0.0-rc"\n      },\n      "peerDependenciesMeta": {\n        "@types/react": {\n          "optional": true\n        },\n        "@types/react-dom": {\n          "optional": true\n        }\n      }\n    },\n    "node_modules/@radix-ui/react-roving-focus": {\n      "version": "1.1.20",\n      "resolved": "https://registry.npmmirror.com/@radix-ui/react-roving-focus/-/react-roving-focus-1.1.20.tgz",\n      "integrity": "sha512-+ZjbkU21fTSJdn4nq/IFKUdKS+JSZHORBZ8ma1f6YpOMNzRt0xf3sVAWVK/+ktHCajPy4HYDsyHXZIZmOMxzIA==",\n      "license": "MIT",\n      "dependencies": {\n        "@radix-ui/primitive": "1.1.7",\n        "@radix-ui/react-collection": "1.1.16",\n        "@radix-ui/react-compose-refs": "1.1.5",\n        "@radix-ui/react-context": "1.2.2",\n        "@radix-ui/react-direction": "1.1.5",\n        "@radix-ui/react-id": "1.1.4",\n        "@radix-ui/react-primitive": "2.1.11",\n        "@radix-ui/react-use-callback-ref": "1.1.4",\n        "@radix-ui/react-use-controllable-state": "1.2.6",\n        "@radix-ui/react-use-is-hydrated": "0.1.3",\n        "@radix-ui/react-use-layout-effect": "1.1.4"\n      },\n      "peerDependencies": {\n        "@types/react": "*",\n        "@types/react-dom": "*",\n        "react": "^16.8 || ^17.0 || ^18.0 || ^19.0 || ^19.0.0-rc",\n        "react-dom": "^16.8 || ^17.0 || ^18.0 || ^19.0 || ^19.0.0-rc"\n      },\n      "peerDependenciesMeta": {\n        "@types/react": {\n          "optional": true\n        },\n        "@types/react-dom": {\n          "optional": true\n        }\n      }\n    },\n    "node_modules/@radix-ui/react-slot": {\n      "version": "1.4.0",\n      "resolved": "https://registry.npmmirror.com/@radix-ui/react-slot/-/react-slot-1.4.0.tgz",\n      "integrity": "sha512-IuMVHZ+Ah5fkctu3X3qeFrV/ZrBcuWuDTFUUPfS/L5hvoTjzhp/HdWGE14CsQombPdEidsa33HVlYZXi49PZ1Q==",\n      "license": "MIT",\n      "dependencies": {\n        "@radix-ui/react-compose-refs": "1.1.5"\n      },\n      "peerDependencies": {\n        "@types/react": "*",\n        "react": "^16.8 || ^17.0 || ^18.0 || ^19.0 || ^19.0.0-rc"\n      },\n      "peerDependenciesMeta": {\n        "@types/react": {\n          "optional": true\n        }\n      }\n    },\n    "node_modules/@radix-ui/react-switch": {\n      "version": "1.3.8",\n      "resolved": "https://registry.npmmirror.com/@radix-ui/react-switch/-/react-switch-1.3.8.tgz",\n      "integrity": "sha512-rr+zuoAeHWK3m6H4HgjOUiu3VsrQ/9JkjwY/uMnTgHJGPe9WNzDP/MOuIV7S+65p42DIxjGL0hAHktqBq82+2A==",\n      "license": "MIT",\n      "dependencies": {\n        "@radix-ui/primitive": "1.1.7",\n        "@radix-ui/react-compose-refs": "1.1.5",\n        "@radix-ui/react-context": "1.2.2",\n        "@radix-ui/react-primitive": "2.1.11",\n        "@radix-ui/react-use-controllable-state": "1.2.6",\n        "@radix-ui/react-use-size": "1.1.5"\n      },\n      "peerDependencies": {\n        "@types/react": "*",\n        "@types/react-dom": "*",\n        "react": "^16.8 || ^17.0 || ^18.0 || ^19.0 || ^19.0.0-rc",\n        "react-dom": "^16.8 || ^17.0 || ^18.0 || ^19.0 || ^19.0.0-rc"\n      },\n      "peerDependenciesMeta": {\n        "@types/react": {\n          "optional": true\n        },\n        "@types/react-dom": {\n          "optional": true\n        }\n      }\n    },\n    "node_modules/@radix-ui/react-tabs": {\n      "version": "1.1.22",\n      "resolved": "https://registry.npmmirror.com/@radix-ui/react-tabs/-/react-tabs-1.1.22.tgz",\n      "integrity": "sha512-GmVH+P3wx1ZPMuH7WajQzygZIbqgnsb5h8z4Ow3sQMuDqgcqISSBNom6MLVNJvfrkuJTtqfXc3ZolHjX+w0CHg==",\n      "license": "MIT",\n      "dependencies": {\n        "@radix-ui/primitive": "1.1.7",\n        "@radix-ui/react-context": "1.2.2",\n        "@radix-ui/react-direction": "1.1.5",\n        "@radix-ui/react-id": "1.1.4",\n        "@radix-ui/react-presence": "1.1.11",\n        "@radix-ui/react-primitive": "2.1.11",\n        "@radix-ui/react-roving-focus": "1.1.20",\n        "@radix-ui/react-use-controllable-state": "1.2.6"\n      },\n      "peerDependencies": {\n        "@types/react": "*",\n        "@types/react-dom": "*",\n        "react": "^16.8 || ^17.0 || ^18.0 || ^19.0 || ^19.0.0-rc",\n        "react-dom": "^16.8 || ^17.0 || ^18.0 || ^19.0 || ^19.0.0-rc"\n      },\n      "peerDependenciesMeta": {\n        "@types/react": {\n          "optional": true\n        },\n        "@types/react-dom": {\n          "optional": true\n        }\n      }\n    },\n    "node_modules/@radix-ui/react-use-callback-ref": {\n      "version": "1.1.4",\n      "resolved": "https://registry.npmmirror.com/@radix-ui/react-use-callback-ref/-/react-use-callback-ref-1.1.4.tgz",\n      "integrity": "sha512-R6OUY2e2fA6Yn6s+VSx5KBV6Nx8LQEhu+cz7LCej18rQ1HLyg9PSC9jP/ZNx0o6FAIK9c0F1kHylzSxKsdlkrQ==",\n      "license": "MIT",\n      "peerDependencies": {\n        "@types/react": "*",\n        "react": "^16.8 || ^17.0 || ^18.0 || ^19.0 || ^19.0.0-rc"\n      },\n      "peerDependenciesMeta": {\n        "@types/react": {\n          "optional": true\n        }\n      }\n    },\n    "node_modules/@radix-ui/react-use-controllable-state": {\n      "version": "1.2.6",\n      "resolved": "https://registry.npmmirror.com/@radix-ui/react-use-controllable-state/-/react-use-controllable-state-1.2.6.tgz",\n      "integrity": "sha512-uEQJGT97ZA/TgP/Hydw47lHu+/vQj6z/0jA+WeTbK1o9Rx45GImjpD0tc3W5ad3D6XTSR6e1yEO0FvGq6WQfVQ==",\n      "license": "MIT",\n      "dependencies": {\n        "@radix-ui/primitive": "1.1.7",\n        "@radix-ui/react-use-effect-event": "0.0.5",\n        "@radix-ui/react-use-layout-effect": "1.1.4"\n      },\n      "peerDependencies": {\n        "@types/react": "*",\n        "react": "^16.8 || ^17.0 || ^18.0 || ^19.0 || ^19.0.0-rc"\n      },\n      "peerDependenciesMeta": {\n        "@types/react": {\n          "optional": true\n        }\n      }\n    },\n    "node_modules/@radix-ui/react-use-effect-event": {\n      "version": "0.0.5",\n      "resolved": "https://registry.npmmirror.com/@radix-ui/react-use-effect-event/-/react-use-effect-event-0.0.5.tgz",\n      "integrity": "sha512-7cshFL8HGS/7HEiHH+9kL9HBwp2sa9yX18Knwek6KYWmXwM7pegMgta2AXMQKI+rq3JnfSj9x8wYqFMTdG1Jgg==",\n      "license": "MIT",\n      "dependencies": {\n        "@radix-ui/react-use-layout-effect": "1.1.4"\n      },\n      "peerDependencies": {\n        "@types/react": "*",\n        "react": "^16.8 || ^17.0 || ^18.0 || ^19.0 || ^19.0.0-rc"\n      },\n      "peerDependenciesMeta": {\n        "@types/react": {\n          "optional": true\n        }\n      }\n    },\n    "node_modules/@radix-ui/react-use-is-hydrated": {\n      "version": "0.1.3",\n      "resolved": "https://registry.npmmirror.com/@radix-ui/react-use-is-hydrated/-/react-use-is-hydrated-0.1.3.tgz",\n      "integrity": "sha512-umO/aJ+82CpOnhDZUTbILCQf7kU/g0iv+oGs/Q8jw7IkhWBzaEP4sA268PhFAJTFetbwp3ICc6ktpI4TqtxcIw==",\n      "license": "MIT",\n      "peerDependencies": {\n        "@types/react": "*",\n        "react": "^16.8 || ^17.0 || ^18.0 || ^19.0 || ^19.0.0-rc"\n      },\n      "peerDependenciesMeta": {\n        "@types/react": {\n          "optional": true\n        }\n      }\n    },\n    "node_modules/@radix-ui/react-use-layout-effect": {\n      "version": "1.1.4",\n      "resolved": "https://registry.npmmirror.com/@radix-ui/react-use-layout-effect/-/react-use-layout-effect-1.1.4.tgz",\n      "integrity": "sha512-K20DkRkUwDnxEYMBPcg3Y6voLkEy5p5QQmszZgLngKKiC7dzBR/aEuK3w1qlx2JWDUNH6FluahYdgR3BP+QbYw==",\n      "license": "MIT",\n      "peerDependencies": {\n        "@types/react": "*",\n        "react": "^16.8 || ^17.0 || ^18.0 || ^19.0 || ^19.0.0-rc"\n      },\n      "peerDependenciesMeta": {\n        "@types/react": {\n          "optional": true\n        }\n      }\n    },\n    "node_modules/@radix-ui/react-use-size": {\n      "version": "1.1.5",\n      "resolved": "https://registry.npmmirror.com/@radix-ui/react-use-size/-/react-use-size-1.1.5.tgz",\n      "integrity": "sha512-V1McDQkMGzgivwqdu7u96APs7oi0Jvj9LTzgq3WWrDZqxWdAqU9yZnZQqk5OizGFR8badUQwZsrlao7MOlWYOA==",\n      "license": "MIT",\n      "dependencies": {\n        "@radix-ui/react-use-layout-effect": "1.1.4"\n      },\n      "peerDependencies": {\n        "@types/react": "*",\n        "react": "^16.8 || ^17.0 || ^18.0 || ^19.0 || ^19.0.0-rc"\n      },\n      "peerDependenciesMeta": {\n        "@types/react": {\n          "optional": true\n        }\n      }\n    },\n    "node_modules/@swc/helpers": {\n      "version": "0.5.23",\n      "resolved": "https://registry.npmmirror.com/@swc/helpers/-/helpers-0.5.23.tgz",\n      "integrity": "sha512-5lSsMOTXURePglDfvuAQUqkGek9Hg2kksOYay2m0+XR++b2NWYL/4sWyuvVBIs8oKnJaxkdi9whaL/sqN13afw==",\n      "license": "Apache-2.0",\n      "dependencies": {\n        "tslib": "^2.8.0"\n      }\n    },\n    "node_modules/@tailwindcss/node": {\n      "version": "4.3.3",\n      "resolved": "https://registry.npmmirror.com/@tailwindcss/node/-/node-4.3.3.tgz",\n      "integrity": "sha512-/T8IKEsf9VTU6tLjgC7+sv2mOPtQxzE2jMw7u4Tt40Tx+QSZxpzh95/H6cMKoja9XuW7iMdLJYBB0o9G1CaAgg==",\n      "dev": true,\n      "license": "MIT",\n      "dependencies": {\n        "@jridgewell/remapping": "^2.3.5",\n        "enhanced-resolve": "^5.24.1",\n        "jiti": "^2.7.0",\n        "lightningcss": "1.32.0",\n        "magic-string": "^0.30.21",\n        "source-map-js": "^1.2.1",\n        "tailwindcss": "4.3.3"\n      }\n    },\n    "node_modules/@tailwindcss/oxide": {\n      "version": "4.3.3",\n      "resolved": "https://registry.npmmirror.com/@tailwindcss/oxide/-/oxide-4.3.3.tgz",\n      "integrity": "sha512-krXjAikiaFSPaK/FkAQT5UTx3VormQaiZ5hBFlJZ9UFQGB/rwg1MZIhHAG9smMQRTdyJxP6Qt5MwMtdyU5FWrA==",\n      "dev": true,\n      "license": "MIT",\n      "engines": {\n        "node": ">= 20"\n      },\n      "optionalDependencies": {\n        "@tailwindcss/oxide-android-arm64": "4.3.3",\n        "@tailwindcss/oxide-darwin-arm64": "4.3.3",\n        "@tailwindcss/oxide-darwin-x64": "4.3.3",\n        "@tailwindcss/oxide-freebsd-x64": "4.3.3",\n        "@tailwindcss/oxide-linux-arm-gnueabihf": "4.3.3",\n        "@tailwindcss/oxide-linux-arm64-gnu": "4.3.3",\n        "@tailwindcss/oxide-linux-arm64-musl": "4.3.3",\n        "@tailwindcss/oxide-linux-x64-gnu": "4.3.3",\n        "@tailwindcss/oxide-linux-x64-musl": "4.3.3",\n        "@tailwindcss/oxide-wasm32-wasi": "4.3.3",\n        "@tailwindcss/oxide-win32-arm64-msvc": "4.3.3",\n        "@tailwindcss/oxide-win32-x64-msvc": "4.3.3"\n      }\n    },\n    "node_modules/@tailwindcss/oxide-android-arm64": {\n      "version": "4.3.3",\n      "resolved": "https://registry.npmmirror.com/@tailwindcss/oxide-android-arm64/-/oxide-android-arm64-4.3.3.tgz",\n      "integrity": "sha512-Y85A2gmPSkl5Ve5qR86GL4HT509cFqQh1aes9p3sSkyTPwt0Pppf3GkwGe4JPACcRYjgJIEhQgM6dBClnr0NYw==",\n      "cpu": [\n        "arm64"\n      ],\n      "dev": true,\n      "license": "MIT",\n      "optional": true,\n      "os": [\n        "android"\n      ],\n      "engines": {\n        "node": ">= 20"\n      }\n    },\n    "node_modules/@tailwindcss/oxide-darwin-arm64": {\n      "version": "4.3.3",\n      "resolved": "https://registry.npmmirror.com/@tailwindcss/oxide-darwin-arm64/-/oxide-darwin-arm64-4.3.3.tgz",\n      "integrity": "sha512-BiaWatpBcERQFDlOjRDpIVXuFK5PJez5SA4JMg6VYZdBYU+qKfV/vqjcIs+IYmtitf1xYQZTwXvU/8y4lfZUGw==",\n      "cpu": [\n        "arm64"\n      ],\n      "dev": true,\n      "license": "MIT",\n      "optional": true,\n      "os": [\n        "darwin"\n      ],\n      "engines": {\n        "node": ">= 20"\n      }\n    },\n    "node_modules/@tailwindcss/oxide-darwin-x64": {\n      "version": "4.3.3",\n      "resolved": "https://registry.npmmirror.com/@tailwindcss/oxide-darwin-x64/-/oxide-darwin-x64-4.3.3.tgz",\n      "integrity": "sha512-fAeUqfV5ndhxRwai8cXGzdLvul9utWOmeTkv69unv4ZXixjn61Z+p9lCWdwOwA3TYboG3BwdVuN/RDjhBRl0mw==",\n      "cpu": [\n        "x64"\n      ],\n      "dev": true,\n      "license": "MIT",\n      "optional": true,\n      "os": [\n        "darwin"\n      ],\n      "engines": {\n        "node": ">= 20"\n      }\n    },\n    "node_modules/@tailwindcss/oxide-freebsd-x64": {\n      "version": "4.3.3",\n      "resolved": "https://registry.npmmirror.com/@tailwindcss/oxide-freebsd-x64/-/oxide-freebsd-x64-4.3.3.tgz",\n      "integrity": "sha512-iyf5bV6+wnAlflVeEy7R25dupxTNECZN5QMI0qNT6eT+EgaGdZcKhGkr5SdoaWiLJ3spLqIY9VCeSGrwmtg4kw==",\n      "cpu": [\n        "x64"\n      ],\n      "dev": true,\n      "license": "MIT",\n      "optional": true,\n      "os": [\n        "freebsd"\n      ],\n      "engines": {\n        "node": ">= 20"\n      }\n    },\n    "node_modules/@tailwindcss/oxide-linux-arm-gnueabihf": {\n      "version": "4.3.3",\n      "resolved": "https://registry.npmmirror.com/@tailwindcss/oxide-linux-arm-gnueabihf/-/oxide-linux-arm-gnueabihf-4.3.3.tgz",\n      "integrity": "sha512-aAYUprJAJQWWbRrPvtjdroZ56Md+JM8pMiopS6xGEwDfLhqj+2ver2p4nU4Mb3CRqcMmNBjo8KkUgcxhkzVQGQ==",\n      "cpu": [\n        "arm"\n      ],\n      "dev": true,\n      "license": "MIT",\n      "optional": true,\n      "os": [\n        "linux"\n      ],\n      "engines": {\n        "node": ">= 20"\n      }\n    },\n    "node_modules/@tailwindcss/oxide-linux-arm64-gnu": {\n      "version": "4.3.3",\n      "resolved": "https://registry.npmmirror.com/@tailwindcss/oxide-linux-arm64-gnu/-/oxide-linux-arm64-gnu-4.3.3.tgz",\n      "integrity": "sha512-nDxldcEENOxZRzC2uu9jrutZdAAQtb+8WWDCSnWL1zvBk1+FN+x6MtDViPB5AJMfttVCUhehGWus3XBPgatM/w==",\n      "cpu": [\n        "arm64"\n      ],\n      "dev": true,\n      "libc": [\n        "glibc"\n      ],\n      "license": "MIT",\n      "optional": true,\n      "os": [\n        "linux"\n      ],\n      "engines": {\n        "node": ">= 20"\n      }\n    },\n    "node_modules/@tailwindcss/oxide-linux-arm64-musl": {\n      "version": "4.3.3",\n      "resolved": "https://registry.npmmirror.com/@tailwindcss/oxide-linux-arm64-musl/-/oxide-linux-arm64-musl-4.3.3.tgz",\n      "integrity": "sha512-Md44bD6veX/PC5iyF8cDVnw4HBIANZepRZZ7a8DQOvkfo5WUBwcp6iAuCUz23u+4SUkhJlD3eL7hNdW8ezd/kA==",\n      "cpu": [\n        "arm64"\n      ],\n      "dev": true,\n      "libc": [\n        "musl"\n      ],\n      "license": "MIT",\n      "optional": true,\n      "os": [\n        "linux"\n      ],\n      "engines": {\n        "node": ">= 20"\n      }\n    },\n    "node_modules/@tailwindcss/oxide-linux-x64-gnu": {\n      "version": "4.3.3",\n      "resolved": "https://registry.npmmirror.com/@tailwindcss/oxide-linux-x64-gnu/-/oxide-linux-x64-gnu-4.3.3.tgz",\n      "integrity": "sha512-tx7us1muwOKAKWao2v/GaafFeQboE6aj88vC6ziN2NCGcRm8gWUhwjzg+YdVB1e4boAtdtma4L43onunI6NS4w==",\n      "cpu": [\n        "x64"\n      ],\n      "dev": true,\n      "libc": [\n        "glibc"\n      ],\n      "license": "MIT",\n      "optional": true,\n      "os": [\n        "linux"\n      ],\n      "engines": {\n        "node": ">= 20"\n      }\n    },\n    "node_modules/@tailwindcss/oxide-linux-x64-musl": {\n      "version": "4.3.3",\n      "resolved": "https://registry.npmmirror.com/@tailwindcss/oxide-linux-x64-musl/-/oxide-linux-x64-musl-4.3.3.tgz",\n      "integrity": "sha512-SJxX60smvHgasZoBy11dX6YRjXJFovwWBoedhbQPOBzgFWBHGB+TVPWB9BxzR7TTxU8FQZAI2AyiNCMzFm8Img==",\n      "cpu": [\n        "x64"\n      ],\n      "dev": true,\n      "libc": [\n        "musl"\n      ],\n      "license": "MIT",\n      "optional": true,\n      "os": [\n        "linux"\n      ],\n      "engines": {\n        "node": ">= 20"\n      }\n    },\n    "node_modules/@tailwindcss/oxide-wasm32-wasi": {\n      "version": "4.3.3",\n      "resolved": "https://registry.npmmirror.com/@tailwindcss/oxide-wasm32-wasi/-/oxide-wasm32-wasi-4.3.3.tgz",\n      "integrity": "sha512-jx1+rPhY/5Ympkktd656HBWEBLxP7dH06losBLjjf5vgCODXvi9KhtftWcMIwTFIDqBr7cRnQkdLnAG+IOlGvQ==",\n      "bundleDependencies": [\n        "@napi-rs/wasm-runtime",\n        "@emnapi/core",\n        "@emnapi/runtime",\n        "@tybys/wasm-util",\n        "@emnapi/wasi-threads",\n        "tslib"\n      ],\n      "cpu": [\n        "wasm32"\n      ],\n      "dev": true,\n      "license": "MIT",\n      "optional": true,\n      "dependencies": {\n        "@emnapi/core": "^1.11.1",\n        "@emnapi/runtime": "^1.11.1",\n        "@emnapi/wasi-threads": "^1.2.2",\n        "@napi-rs/wasm-runtime": "^1.1.4",\n        "@tybys/wasm-util": "^0.10.2",\n        "tslib": "^2.8.1"\n      },\n      "engines": {\n        "node": ">=14.0.0"\n      }\n    },\n    "node_modules/@tailwindcss/oxide-wasm32-wasi/node_modules/@emnapi/core": {\n      "version": "1.11.1",\n      "dev": true,\n      "inBundle": true,\n      "license": "MIT",\n      "optional": true,\n      "dependencies": {\n        "@emnapi/wasi-threads": "1.2.2",\n        "tslib": "^2.4.0"\n      }\n    },\n    "node_modules/@tailwindcss/oxide-wasm32-wasi/node_modules/@emnapi/runtime": {\n      "version": "1.11.1",\n      "dev": true,\n      "inBundle": true,\n      "license": "MIT",\n      "optional": true,\n      "dependencies": {\n        "tslib": "^2.4.0"\n      }\n    },\n    "node_modules/@tailwindcss/oxide-wasm32-wasi/node_modules/@emnapi/wasi-threads": {\n      "version": "1.2.2",\n      "dev": true,\n      "inBundle": true,\n      "license": "MIT",\n      "optional": true,\n      "dependencies": {\n        "tslib": "^2.4.0"\n      }\n    },\n    "node_modules/@tailwindcss/oxide-wasm32-wasi/node_modules/@napi-rs/wasm-runtime": {\n      "version": "1.1.4",\n      "dev": true,\n      "inBundle": true,\n      "license": "MIT",\n      "optional": true,\n      "dependencies": {\n        "@tybys/wasm-util": "^0.10.1"\n      },\n      "funding": {\n        "type": "github",\n        "url": "https://github.com/sponsors/Brooooooklyn"\n      },\n      "peerDependencies": {\n        "@emnapi/core": "^1.7.1",\n        "@emnapi/runtime": "^1.7.1"\n      }\n    },\n    "node_modules/@tailwindcss/oxide-wasm32-wasi/node_modules/@tybys/wasm-util": {\n      "version": "0.10.2",\n      "dev": true,\n      "inBundle": true,\n      "license": "MIT",\n      "optional": true,\n      "dependencies": {\n        "tslib": "^2.4.0"\n      }\n    },\n    "node_modules/@tailwindcss/oxide-wasm32-wasi/node_modules/tslib": {\n      "version": "2.8.1",\n      "dev": true,\n      "inBundle": true,\n      "license": "0BSD",\n      "optional": true\n    },\n    "node_modules/@tailwindcss/oxide-win32-arm64-msvc": {\n      "version": "4.3.3",\n      "resolved": "https://registry.npmmirror.com/@tailwindcss/oxide-win32-arm64-msvc/-/oxide-win32-arm64-msvc-4.3.3.tgz",\n      "integrity": "sha512-3rc292Ca2ceK6Ulcc/bAVnTs/3nDtoPhyEKlgPv+yQJQi/JS/AMJlqzxvlDacL1nekbrcf6bTqp/jV4qgnPxNQ==",\n      "cpu": [\n        "arm64"\n      ],\n      "dev": true,\n      "license": "MIT",\n      "optional": true,\n      "os": [\n        "win32"\n      ],\n      "engines": {\n        "node": ">= 20"\n      }\n    },\n    "node_modules/@tailwindcss/oxide-win32-x64-msvc": {\n      "version": "4.3.3",\n      "resolved": "https://registry.npmmirror.com/@tailwindcss/oxide-win32-x64-msvc/-/oxide-win32-x64-msvc-4.3.3.tgz",\n      "integrity": "sha512-yJ0pwIVc/nYeGoV02WtsN8KYyLQv7kyI2wDnkezyJlGGjkd4QLwDGAwl47YpPJeuI0M0ObaXGSPjvWDPeTPggw==",\n      "cpu": [\n        "x64"\n      ],\n      "dev": true,\n      "license": "MIT",\n      "optional": true,\n      "os": [\n        "win32"\n      ],\n      "engines": {\n        "node": ">= 20"\n      }\n    },\n    "node_modules/@tailwindcss/postcss": {\n      "version": "4.3.3",\n      "resolved": "https://registry.npmmirror.com/@tailwindcss/postcss/-/postcss-4.3.3.tgz",\n      "integrity": "sha512-JTSZZGQi1AyKirbLN3azmjVzef92tcX7h+iSqPdaeStyFpGpDlKvvpxeOE8njhbUanbRwr3z8DyzhICWnMtQeg==",\n      "dev": true,\n      "license": "MIT",\n      "dependencies": {\n        "@alloc/quick-lru": "^5.2.0",\n        "@tailwindcss/node": "4.3.3",\n        "@tailwindcss/oxide": "4.3.3",\n        "postcss": "^8.5.16",\n        "tailwindcss": "4.3.3"\n      }\n    },\n    "node_modules/@tanstack/query-core": {\n      "version": "5.104.0",\n      "resolved": "https://registry.npmmirror.com/@tanstack/query-core/-/query-core-5.104.0.tgz",\n      "integrity": "sha512-JrC2r/JQlXt7khBSdUpsgxNvybzOg+aITa+ARRMlP2AFo93Y8vIqz077rp+e61mJetSZ0T6AJbwW1JHer1vrPQ==",\n      "license": "MIT",\n      "funding": {\n        "type": "github",\n        "url": "https://github.com/sponsors/tannerlinsley"\n      }\n    },\n    "node_modules/@tanstack/react-query": {\n      "version": "5.104.0",\n      "resolved": "https://registry.npmmirror.com/@tanstack/react-query/-/react-query-5.104.0.tgz",\n      "integrity": "sha512-e1TZmDCQnWIfiDVryIHeA6Idj+Lfx1hORLOhXS/l5wcgvtVD4yYqbTDl378sGQKIi2cSgb0TEMC9cKK8GGoJEw==",\n      "license": "MIT",\n      "dependencies": {\n        "@tanstack/query-core": "5.104.0"\n      },\n      "funding": {\n        "type": "github",\n        "url": "https://github.com/sponsors/tannerlinsley"\n      },\n      "peerDependencies": {\n        "react": "^18 || ^19"\n      }\n    },\n    "node_modules/@types/debug": {\n      "version": "4.1.13",\n      "resolved": "https://registry.npmmirror.com/@types/debug/-/debug-4.1.13.tgz",\n      "integrity": "sha512-KSVgmQmzMwPlmtljOomayoR89W4FynCAi3E8PPs7vmDVPe84hT+vGPKkJfThkmXs0x0jAaa9U8uW8bbfyS2fWw==",\n      "license": "MIT",\n      "dependencies": {\n        "@types/ms": "*"\n      }\n    },\n    "node_modules/@types/estree": {\n      "version": "1.0.9",\n      "resolved": "https://registry.npmmirror.com/@types/estree/-/estree-1.0.9.tgz",\n      "integrity": "sha512-GhdPgy1el4/ImP05X05Uw4cw2/M93BCUmnEvWZNStlCzEKME4Fkk+YpoA5OiHNQmoS7Cafb8Xa3Pya8m1Qrzeg==",\n      "license": "MIT"\n    },\n    "node_modules/@types/estree-jsx": {\n      "version": "1.0.5",\n      "resolved": "https://registry.npmmirror.com/@types/estree-jsx/-/estree-jsx-1.0.5.tgz",\n      "integrity": "sha512-52CcUVNFyfb1A2ALocQw/Dd1BQFNmSdkuC3BkZ6iqhdMfQz7JWOFRuJFloOzjk+6WijU56m9oKXFAXc7o3Towg==",\n      "license": "MIT",\n      "dependencies": {\n        "@types/estree": "*"\n      }\n    },\n    "node_modules/@types/hast": {\n      "version": "3.0.5",\n      "resolved": "https://registry.npmmirror.com/@types/hast/-/hast-3.0.5.tgz",\n      "integrity": "sha512-rp/ezSWaD1m44dPKICGhiskI13nVr7qTloFwDa/IYkhhf5nzwP+zIQcIJh3WIFSBOy/H1PzB40jPjMDksN4F+g==",\n      "license": "MIT",\n      "dependencies": {\n        "@types/unist": "*"\n      }\n    },\n    "node_modules/@types/katex": {\n      "version": "0.16.8",\n      "resolved": "https://registry.npmmirror.com/@types/katex/-/katex-0.16.8.tgz",\n      "integrity": "sha512-trgaNyfU+Xh2Tc+ABIb44a5AYUpicB3uwirOioeOkNPPbmgRNtcWyDeeFRzjPZENO9Vq8gvVqfhaaXWLlevVwg==",\n      "license": "MIT"\n    },\n    "node_modules/@types/mdast": {\n      "version": "4.0.4",\n      "resolved": "https://registry.npmmirror.com/@types/mdast/-/mdast-4.0.4.tgz",\n      "integrity": "sha512-kGaNbPh1k7AFzgpud/gMdvIm5xuECykRR+JnWKQno9TAXVa6WIVCGTPvYGekIDL4uwCZQSYbUxNBSb1aUo79oA==",\n      "license": "MIT",\n      "dependencies": {\n        "@types/unist": "*"\n      }\n    },\n    "node_modules/@types/ms": {\n      "version": "2.1.0",\n      "resolved": "https://registry.npmmirror.com/@types/ms/-/ms-2.1.0.tgz",\n      "integrity": "sha512-GsCCIZDE/p3i96vtEqx+7dBUGXrc7zeSK3wwPHIaRThS+9OhWIXRqzs4d6k1SVU8g91DrNRWxWUGhp5KXQb2VA==",\n      "license": "MIT"\n    },\n    "node_modules/@types/node": {\n      "version": "22.20.5",\n      "resolved": "https://registry.npmmirror.com/@types/node/-/node-22.20.5.tgz",\n      "integrity": "sha512-U2+DNr+wSjpsTS/wZGYHq7GcwfuSmKiKvoPvK22zwTlRhU91yOniN4qRR5KhIjvif7ysw/dz/hKmfDH0Ris4aA==",\n      "dev": true,\n      "license": "MIT",\n      "dependencies": {\n        "undici-types": "~6.21.0"\n      }\n    },\n    "node_modules/@types/react": {\n      "version": "19.3.0",\n      "resolved": "https://registry.npmmirror.com/@types/react/-/react-19.3.0.tgz",\n      "integrity": "sha512-N0rFCuH9YoxG9/m61l9MfpJKfmLOVU0em7ipIz6TRgSSkvReLB9vL85GB+yr8Bs5leqpvg96JSwF4ZS1s4viQg==",\n      "license": "MIT",\n      "dependencies": {\n        "csstype": "^3.2.2"\n      }\n    },\n    "node_modules/@types/react-dom": {\n      "version": "19.1.0",\n      "resolved": "https://registry.npmmirror.com/@types/react-dom/-/react-dom-19.1.0.tgz",\n      "integrity": "sha512-21E2zejNNRtjG4hKIyJz4aWswGEcNFTgttA0bZIRGjj1HA/tbSUxIJnIcYbn98pwJck0cS1bsQhn6eaKqbcFWw==",\n      "devOptional": true,\n      "license": "MIT",\n      "peerDependencies": {\n        "@types/react": "^19.0.0"\n      }\n    },\n    "node_modules/@types/unist": {\n      "version": "3.0.3",\n      "resolved": "https://registry.npmmirror.com/@types/unist/-/unist-3.0.3.tgz",\n      "integrity": "sha512-ko/gIFJRv177XgZsZcBwnqJN5x/Gien8qNOn0D5bQU/zAzVf9Zt3BlcUiLqhV9y4ARk0GbT3tnUiPNgnTXzc/Q==",\n      "license": "MIT"\n    },\n    "node_modules/@ungap/structured-clone": {\n      "version": "1.4.0",\n      "resolved": "https://registry.npmmirror.com/@ungap/structured-clone/-/structured-clone-1.4.0.tgz",\n      "integrity": "sha512-1mEZtMKPM09vDmQt5y7YvmN2+DFTP7Tg0EWXdic8/C6VRnpb33e4ghisCIE3WZjsE2N8mf+QV1Zqh7ZFYLWInQ==",\n      "license": "ISC"\n    },\n    "node_modules/argparse": {\n      "version": "1.0.10",\n      "resolved": "https://registry.npmmirror.com/argparse/-/argparse-1.0.10.tgz",\n      "integrity": "sha512-o5Roy6tNG4SL/FOkCAN6RzjiakZS25RLYFrcMttJqbdd8BWrnA+fGz57iN5Pb06pvBGvl5gQ0B48dJlslXvoTg==",\n      "license": "MIT",\n      "dependencies": {\n        "sprintf-js": "~1.0.2"\n      }\n    },\n    "node_modules/aria-hidden": {\n      "version": "1.2.6",\n      "resolved": "https://registry.npmmirror.com/aria-hidden/-/aria-hidden-1.2.6.tgz",\n      "integrity": "sha512-ik3ZgC9dY/lYVVM++OISsaYDeg1tb0VtP5uL3ouh1koGOaUMDPpbFIei4JkFimWUFPn90sbMNMXQAIVOlnYKJA==",\n      "license": "MIT",\n      "dependencies": {\n        "tslib": "^2.0.0"\n      },\n      "engines": {\n        "node": ">=10"\n      }\n    },\n    "node_modules/bail": {\n      "version": "2.0.2",\n      "resolved": "https://registry.npmmirror.com/bail/-/bail-2.0.2.tgz",\n      "integrity": "sha512-0xO6mYd7JB2YesxDKplafRpsiOzPt9V02ddPCLbY1xYGPOX24NTyN50qnUxgCPcSoYMhKpAuBTjQoRZCAkUDRw==",\n      "license": "MIT",\n      "funding": {\n        "type": "github",\n        "url": "https://github.com/sponsors/wooorm"\n      }\n    },\n    "node_modules/baseline-browser-mapping": {\n      "version": "2.11.27",\n      "resolved": "https://registry.npmmirror.com/baseline-browser-mapping/-/baseline-browser-mapping-2.11.27.tgz",\n      "integrity": "sha512-ElY12DaROGuan+lMmZ8Cvo/ZUbXPe7Enc/9VU/b1T3Kp4dwytRcNdR8DoSJN5SNJT/CuvcCA0DHDVmMOCePdRQ==",\n      "license": "Apache-2.0",\n      "bin": {\n        "baseline-browser-mapping": "dist/cli.cjs"\n      },\n      "engines": {\n        "node": ">=6.0.0"\n      }\n    },\n    "node_modules/caniuse-lite": {\n      "version": "1.0.30001814",\n      "resolved": "https://registry.npmmirror.com/caniuse-lite/-/caniuse-lite-1.0.30001814.tgz",\n      "integrity": "sha512-/Uaf1lAzr59XcMpW0o96WoEfr+VXK2OX4U9AgFoiSHsVJ4HppnIFUjtYzsyDH2+tgANaQb2/oxYGwCPapN1FpA==",\n      "funding": [\n        {\n          "type": "opencollective",\n          "url": "https://opencollective.com/browserslist"\n        },\n        {\n          "type": "tidelift",\n          "url": "https://tidelift.com/funding/github/npm/caniuse-lite"\n        },\n        {\n          "type": "github",\n          "url": "https://github.com/sponsors/ai"\n        }\n      ],\n      "license": "CC-BY-4.0"\n    },\n    "node_modules/ccount": {\n      "version": "2.0.1",\n      "resolved": "https://registry.npmmirror.com/ccount/-/ccount-2.0.1.tgz",\n      "integrity": "sha512-eyrF0jiFpY+3drT6383f1qhkbGsLSifNAjA61IUjZjmLCWjItY6LB9ft9YhoDgwfmclB2zhu51Lc7+95b8NRAg==",\n      "license": "MIT",\n      "funding": {\n        "type": "github",\n        "url": "https://github.com/sponsors/wooorm"\n      }\n    },\n    "node_modules/character-entities": {\n      "version": "2.0.2",\n      "resolved": "https://registry.npmmirror.com/character-entities/-/character-entities-2.0.2.tgz",\n      "integrity": "sha512-shx7oQ0Awen/BRIdkjkvz54PnEEI/EjwXDSIZp86/KKdbafHh1Df/RYGBhn4hbe2+uKC9FnT5UCEdyPz3ai9hQ==",\n      "license": "MIT",\n      "funding": {\n        "type": "github",\n        "url": "https://github.com/sponsors/wooorm"\n      }\n    },\n    "node_modules/character-entities-html4": {\n      "version": "2.1.0",\n      "resolved": "https://registry.npmmirror.com/character-entities-html4/-/character-entities-html4-2.1.0.tgz",\n      "integrity": "sha512-1v7fgQRj6hnSwFpq1Eu0ynr/CDEw0rXo2B61qXrLNdHZmPKgb7fqS1a2JwF0rISo9q77jDI8VMEHoApn8qDoZA==",\n      "license": "MIT",\n      "funding": {\n        "type": "github",\n        "url": "https://github.com/sponsors/wooorm"\n      }\n    },\n    "node_modules/character-entities-legacy": {\n      "version": "3.0.0",\n      "resolved": "https://registry.npmmirror.com/character-entities-legacy/-/character-entities-legacy-3.0.0.tgz",\n      "integrity": "sha512-RpPp0asT/6ufRm//AJVwpViZbGM/MkjQFxJccQRHmISF/22NBtsHqAWmL+/pmkPWoIUJdWyeVleTl1wydHATVQ==",\n      "license": "MIT",\n      "funding": {\n        "type": "github",\n        "url": "https://github.com/sponsors/wooorm"\n      }\n    },\n    "node_modules/character-reference-invalid": {\n      "version": "2.0.1",\n      "resolved": "https://registry.npmmirror.com/character-reference-invalid/-/character-reference-invalid-2.0.1.tgz",\n      "integrity": "sha512-iBZ4F4wRbyORVsu0jPV7gXkOsGYjGHPmAyv+HiHG8gi5PtC9KI2j1+v8/tlibRvjoWX027ypmG/n0HtO5t7unw==",\n      "license": "MIT",\n      "funding": {\n        "type": "github",\n        "url": "https://github.com/sponsors/wooorm"\n      }\n    },\n    "node_modules/class-variance-authority": {\n      "version": "0.7.1",\n      "resolved": "https://registry.npmmirror.com/class-variance-authority/-/class-variance-authority-0.7.1.tgz",\n      "integrity": "sha512-Ka+9Trutv7G8M6WT6SeiRWz792K5qEqIGEGzXKhAE6xOWAY6pPH8U+9IY3oCMv6kqTmLsv7Xh/2w2RigkePMsg==",\n      "license": "Apache-2.0",\n      "dependencies": {\n        "clsx": "^2.1.1"\n      },\n      "funding": {\n        "url": "https://polar.sh/cva"\n      }\n    },\n    "node_modules/client-only": {\n      "version": "0.0.1",\n      "resolved": "https://registry.npmmirror.com/client-only/-/client-only-0.0.1.tgz",\n      "integrity": "sha512-IV3Ou0jSMzZrd3pZ48nLkT9DA7Ag1pnPzaiQhpW7c3RbcqqzvzzVu+L8gfqMp/8IM2MQtSiqaCxrrcfu8I8rMA==",\n      "license": "MIT"\n    },\n    "node_modules/clsx": {\n      "version": "2.1.1",\n      "resolved": "https://registry.npmmirror.com/clsx/-/clsx-2.1.1.tgz",\n      "integrity": "sha512-eYm0QWBtUrBWZWG0d386OGAw16Z995PiOVo2B7bjWSbHedGl5e0ZWaq65kOGgUSNesEIDkB9ISbTg/JK9dhCZA==",\n      "license": "MIT",\n      "engines": {\n        "node": ">=6"\n      }\n    },\n    "node_modules/comma-separated-tokens": {\n      "version": "2.0.3",\n      "resolved": "https://registry.npmmirror.com/comma-separated-tokens/-/comma-separated-tokens-2.0.3.tgz",\n      "integrity": "sha512-Fu4hJdvzeylCfQPp9SGWidpzrMs7tTrlu6Vb8XGaRGck8QSNZJJp538Wrb60Lax4fPwR64ViY468OIUTbRlGZg==",\n      "license": "MIT",\n      "funding": {\n        "type": "github",\n        "url": "https://github.com/sponsors/wooorm"\n      }\n    },\n    "node_modules/commander": {\n      "version": "8.3.0",\n      "resolved": "https://registry.npmmirror.com/commander/-/commander-8.3.0.tgz",\n      "integrity": "sha512-OkTL9umf+He2DZkUq8f8J9of7yL6RJKI24dVITBmNfZBmri9zYZQrKkuXiKhyfPSu8tUhnVBB1iKXevvnlR4Ww==",\n      "license": "MIT",\n      "engines": {\n        "node": ">= 12"\n      }\n    },\n    "node_modules/csstype": {\n      "version": "3.2.3",\n      "resolved": "https://registry.npmmirror.com/csstype/-/csstype-3.2.3.tgz",\n      "integrity": "sha512-z1HGKcYy2xA8AGQfwrn0PAy+PB7X/GSj3UVJW9qKyn43xWa+gl5nXmU4qqLMRzWVLFC8KusUX8T/0kCiOYpAIQ==",\n      "license": "MIT"\n    },\n    "node_modules/debug": {\n      "version": "4.4.3",\n      "resolved": "https://registry.npmmirror.com/debug/-/debug-4.4.3.tgz",\n      "integrity": "sha512-RGwwWnwQvkVfavKVt22FGLw+xYSdzARwm0ru6DhTVA3umU5hZc28V3kO4stgYryrTlLpuvgI9GiijltAjNbcqA==",\n      "license": "MIT",\n      "dependencies": {\n        "ms": "^2.1.3"\n      },\n      "engines": {\n        "node": ">=6.0"\n      },\n      "peerDependenciesMeta": {\n        "supports-color": {\n          "optional": true\n        }\n      }\n    },\n    "node_modules/decode-named-character-reference": {\n      "version": "1.3.0",\n      "resolved": "https://registry.npmmirror.com/decode-named-character-reference/-/decode-named-character-reference-1.3.0.tgz",\n      "integrity": "sha512-GtpQYB283KrPp6nRw50q3U9/VfOutZOe103qlN7BPP6Ad27xYnOIWv4lPzo8HCAL+mMZofJ9KEy30fq6MfaK6Q==",\n      "license": "MIT",\n      "dependencies": {\n        "character-entities": "^2.0.0"\n      },\n      "funding": {\n        "type": "github",\n        "url": "https://github.com/sponsors/wooorm"\n      }\n    },\n    "node_modules/dequal": {\n      "version": "2.0.3",\n      "resolved": "https://registry.npmmirror.com/dequal/-/dequal-2.0.3.tgz",\n      "integrity": "sha512-0je+qPKHEMohvfRTCEo3CrPG6cAzAYgmzKyxRiYSSDkS6eGJdyVJm7WaYA5ECaAD9wLB2T4EEeymA5aFVcYXCA==",\n      "license": "MIT",\n      "engines": {\n        "node": ">=6"\n      }\n    },\n    "node_modules/detect-libc": {\n      "version": "2.1.2",\n      "resolved": "https://registry.npmmirror.com/detect-libc/-/detect-libc-2.1.2.tgz",\n      "integrity": "sha512-Btj2BOOO83o3WyH59e8MgXsxEQVcarkUOpEYrubB0urwnN10yQ364rsiByU11nZlqWYZm05i/of7io4mzihBtQ==",\n      "devOptional": true,\n      "license": "Apache-2.0",\n      "engines": {\n        "node": ">=8"\n      }\n    },\n    "node_modules/detect-node-es": {\n      "version": "1.1.0",\n      "resolved": "https://registry.npmmirror.com/detect-node-es/-/detect-node-es-1.1.0.tgz",\n      "integrity": "sha512-ypdmJU/TbBby2Dxibuv7ZLW3Bs1QEmM7nHjEANfohJLvE0XVujisn1qPJcZxg+qDucsr+bP6fLD1rPS3AhJ7EQ==",\n      "license": "MIT"\n    },\n    "node_modules/devlop": {\n      "version": "1.1.0",\n      "resolved": "https://registry.npmmirror.com/devlop/-/devlop-1.1.0.tgz",\n      "integrity": "sha512-RWmIqhcFf1lRYBvNmr7qTNuyCt/7/ns2jbpp1+PalgE/rDQcBT0fioSMUpJ93irlUhC5hrg4cYqe6U+0ImW0rA==",\n      "license": "MIT",\n      "dependencies": {\n        "dequal": "^2.0.0"\n      },\n      "funding": {\n        "type": "github",\n        "url": "https://github.com/sponsors/wooorm"\n      }\n    },\n    "node_modules/enhanced-resolve": {\n      "version": "5.26.0",\n      "resolved": "https://registry.npmmirror.com/enhanced-resolve/-/enhanced-resolve-5.26.0.tgz",\n      "integrity": "sha512-9vhedylFonb2YGogzUKX6+Ja72gOJbN1QHAqdrvqLwhdl/QWbKopzoUC9EbQNVsAns/bx/4uyqalrQAoy1IByw==",\n      "dev": true,\n      "license": "MIT",\n      "dependencies": {\n        "graceful-fs": "^4.2.4",\n        "tapable": "^2.3.3"\n      },\n      "engines": {\n        "node": ">=10.13.0"\n      }\n    },\n    "node_modules/entities": {\n      "version": "6.0.1",\n      "resolved": "https://registry.npmmirror.com/entities/-/entities-6.0.1.tgz",\n      "integrity": "sha512-aN97NXWF6AWBTahfVOIrB/NShkzi5H7F9r1s9mD3cDj4Ko5f2qhhVoYMibXF7GlLveb/D2ioWay8lxI97Ven3g==",\n      "license": "BSD-2-Clause",\n      "engines": {\n        "node": ">=0.12"\n      },\n      "funding": {\n        "url": "https://github.com/fb55/entities?sponsor=1"\n      }\n    },\n    "node_modules/escape-string-regexp": {\n      "version": "5.0.0",\n      "resolved": "https://registry.npmmirror.com/escape-string-regexp/-/escape-string-regexp-5.0.0.tgz",\n      "integrity": "sha512-/veY75JbMK4j1yjvuUxuVsiS/hr/4iHs9FTT6cgTexxdE0Ly/glccBAkloH/DofkjRbZU3bnoj38mOmhkZ0lHw==",\n      "license": "MIT",\n      "engines": {\n        "node": ">=12"\n      },\n      "funding": {\n        "url": "https://github.com/sponsors/sindresorhus"\n      }\n    },\n    "node_modules/esprima": {\n      "version": "4.0.1",\n      "resolved": "https://registry.npmmirror.com/esprima/-/esprima-4.0.1.tgz",\n      "integrity": "sha512-eGuFFw7Upda+g4p+QHvnW0RyTX/SVeJBDM/gCtMARO0cLuT2HcEKnTPvhjV6aGeqrCB/sbNop0Kszm0jsaWU4A==",\n      "license": "BSD-2-Clause",\n      "bin": {\n        "esparse": "bin/esparse.js",\n        "esvalidate": "bin/esvalidate.js"\n      },\n      "engines": {\n        "node": ">=4"\n      }\n    },\n    "node_modules/estree-util-is-identifier-name": {\n      "version": "3.0.0",\n      "resolved": "https://registry.npmmirror.com/estree-util-is-identifier-name/-/estree-util-is-identifier-name-3.0.0.tgz",\n      "integrity": "sha512-hFtqIDZTIUZ9BXLb8y4pYGyk6+wekIivNVTcmvk8NoOh+VeRn5y6cEHzbURrWbfp1fIqdVipilzj+lfaadNZmg==",\n      "license": "MIT",\n      "funding": {\n        "type": "opencollective",\n        "url": "https://opencollective.com/unified"\n      }\n    },\n    "node_modules/extend": {\n      "version": "3.0.2",\n      "resolved": "https://registry.npmmirror.com/extend/-/extend-3.0.2.tgz",\n      "integrity": "sha512-fjquC59cD7CyW6urNXK0FBufkZcoiGG80wTuPujX590cB5Ttln20E2UB4S/WARVqhXffZl2LNgS+gQdPIIim/g==",\n      "license": "MIT"\n    },\n    "node_modules/extend-shallow": {\n      "version": "2.0.1",\n      "resolved": "https://registry.npmmirror.com/extend-shallow/-/extend-shallow-2.0.1.tgz",\n      "integrity": "sha512-zCnTtlxNoAiDc3gqY2aYAWFx7XWWiasuF2K8Me5WbN8otHKTUKBwjPtNpRs/rbUZm7KxWAaNj7P1a/p52GbVug==",\n      "license": "MIT",\n      "dependencies": {\n        "is-extendable": "^0.1.0"\n      },\n      "engines": {\n        "node": ">=0.10.0"\n      }\n    },\n    "node_modules/get-nonce": {\n      "version": "1.0.1",\n      "resolved": "https://registry.npmmirror.com/get-nonce/-/get-nonce-1.0.1.tgz",\n      "integrity": "sha512-FJhYRoDaiatfEkUK8HKlicmu/3SGFD51q3itKDGoSTysQJBnfOcxU5GxnhE1E6soB76MbT0MBtnKJuXyAx+96Q==",\n      "license": "MIT",\n      "engines": {\n        "node": ">=6"\n      }\n    },\n    "node_modules/graceful-fs": {\n      "version": "4.2.11",\n      "resolved": "https://registry.npmmirror.com/graceful-fs/-/graceful-fs-4.2.11.tgz",\n      "integrity": "sha512-RbJ5/jmFcNNCcDV5o9eTnBLJ/HszWV0P73bc+Ff4nS/rJj+YaS6IGyiOL0VoBYX+l1Wrl3k63h/KrH+nhJ0XvQ==",\n      "dev": true,\n      "license": "ISC"\n    },\n    "node_modules/gray-matter": {\n      "version": "4.0.3",\n      "resolved": "https://registry.npmmirror.com/gray-matter/-/gray-matter-4.0.3.tgz",\n      "integrity": "sha512-5v6yZd4JK3eMI3FqqCouswVqwugaA9r4dNZB1wwcmrD02QkV5H0y7XBQW8QwQqEaZY1pM9aqORSORhJRdNK44Q==",\n      "license": "MIT",\n      "dependencies": {\n        "js-yaml": "^3.13.1",\n        "kind-of": "^6.0.2",\n        "section-matter": "^1.0.0",\n        "strip-bom-string": "^1.0.0"\n      },\n      "engines": {\n        "node": ">=6.0"\n      }\n    },\n    "node_modules/hast-util-from-dom": {\n      "version": "5.0.1",\n      "resolved": "https://registry.npmmirror.com/hast-util-from-dom/-/hast-util-from-dom-5.0.1.tgz",\n      "integrity": "sha512-N+LqofjR2zuzTjCPzyDUdSshy4Ma6li7p/c3pA78uTwzFgENbgbUrm2ugwsOdcjI1muO+o6Dgzp9p8WHtn/39Q==",\n      "license": "ISC",\n      "dependencies": {\n        "@types/hast": "^3.0.0",\n        "hastscript": "^9.0.0",\n        "web-namespaces": "^2.0.0"\n      },\n      "funding": {\n        "type": "opencollective",\n        "url": "https://opencollective.com/unified"\n      }\n    },\n    "node_modules/hast-util-from-html": {\n      "version": "2.0.3",\n      "resolved": "https://registry.npmmirror.com/hast-util-from-html/-/hast-util-from-html-2.0.3.tgz",\n      "integrity": "sha512-CUSRHXyKjzHov8yKsQjGOElXy/3EKpyX56ELnkHH34vDVw1N1XSQ1ZcAvTyAPtGqLTuKP/uxM+aLkSPqF/EtMw==",\n      "license": "MIT",\n      "dependencies": {\n        "@types/hast": "^3.0.0",\n        "devlop": "^1.1.0",\n        "hast-util-from-parse5": "^8.0.0",\n        "parse5": "^7.0.0",\n        "vfile": "^6.0.0",\n        "vfile-message": "^4.0.0"\n      },\n      "funding": {\n        "type": "opencollective",\n        "url": "https://opencollective.com/unified"\n      }\n    },\n    "node_modules/hast-util-from-html-isomorphic": {\n      "version": "2.0.0",\n      "resolved": "https://registry.npmmirror.com/hast-util-from-html-isomorphic/-/hast-util-from-html-isomorphic-2.0.0.tgz",\n      "integrity": "sha512-zJfpXq44yff2hmE0XmwEOzdWin5xwH+QIhMLOScpX91e/NSGPsAzNCvLQDIEPyO2TXi+lBmU6hjLIhV8MwP2kw==",\n      "license": "MIT",\n      "dependencies": {\n        "@types/hast": "^3.0.0",\n        "hast-util-from-dom": "^5.0.0",\n        "hast-util-from-html": "^2.0.0",\n        "unist-util-remove-position": "^5.0.0"\n      },\n      "funding": {\n        "type": "opencollective",\n        "url": "https://opencollective.com/unified"\n      }\n    },\n    "node_modules/hast-util-from-parse5": {\n      "version": "8.0.3",\n      "resolved": "https://registry.npmmirror.com/hast-util-from-parse5/-/hast-util-from-parse5-8.0.3.tgz",\n      "integrity": "sha512-3kxEVkEKt0zvcZ3hCRYI8rqrgwtlIOFMWkbclACvjlDw8Li9S2hk/d51OI0nr/gIpdMHNepwgOKqZ/sy0Clpyg==",\n      "license": "MIT",\n      "dependencies": {\n        "@types/hast": "^3.0.0",\n        "@types/unist": "^3.0.0",\n        "devlop": "^1.0.0",\n        "hastscript": "^9.0.0",\n        "property-information": "^7.0.0",\n        "vfile": "^6.0.0",\n        "vfile-location": "^5.0.0",\n        "web-namespaces": "^2.0.0"\n      },\n      "funding": {\n        "type": "opencollective",\n        "url": "https://opencollective.com/unified"\n      }\n    },\n    "node_modules/hast-util-is-element": {\n      "version": "3.0.0",\n      "resolved": "https://registry.npmmirror.com/hast-util-is-element/-/hast-util-is-element-3.0.0.tgz",\n      "integrity": "sha512-Val9mnv2IWpLbNPqc/pUem+a7Ipj2aHacCwgNfTiK0vJKl0LF+4Ba4+v1oPHFpf3bLYmreq0/l3Gud9S5OH42g==",\n      "license": "MIT",\n      "dependencies": {\n        "@types/hast": "^3.0.0"\n      },\n      "funding": {\n        "type": "opencollective",\n        "url": "https://opencollective.com/unified"\n      }\n    },\n    "node_modules/hast-util-parse-selector": {\n      "version": "4.0.0",\n      "resolved": "https://registry.npmmirror.com/hast-util-parse-selector/-/hast-util-parse-selector-4.0.0.tgz",\n      "integrity": "sha512-wkQCkSYoOGCRKERFWcxMVMOcYE2K1AaNLU8DXS9arxnLOUEWbOXKXiJUNzEpqZ3JOKpnha3jkFrumEjVliDe7A==",\n      "license": "MIT",\n      "dependencies": {\n        "@types/hast": "^3.0.0"\n      },\n      "funding": {\n        "type": "opencollective",\n        "url": "https://opencollective.com/unified"\n      }\n    },\n    "node_modules/hast-util-raw": {\n      "version": "9.1.0",\n      "resolved": "https://registry.npmmirror.com/hast-util-raw/-/hast-util-raw-9.1.0.tgz",\n      "integrity": "sha512-Y8/SBAHkZGoNkpzqqfCldijcuUKh7/su31kEBp67cFY09Wy0mTRgtsLYsiIxMJxlu0f6AA5SUTbDR8K0rxnbUw==",\n      "license": "MIT",\n      "dependencies": {\n        "@types/hast": "^3.0.0",\n        "@types/unist": "^3.0.0",\n        "@ungap/structured-clone": "^1.0.0",\n        "hast-util-from-parse5": "^8.0.0",\n        "hast-util-to-parse5": "^8.0.0",\n        "html-void-elements": "^3.0.0",\n        "mdast-util-to-hast": "^13.0.0",\n        "parse5": "^7.0.0",\n        "unist-util-position": "^5.0.0",\n        "unist-util-visit": "^5.0.0",\n        "vfile": "^6.0.0",\n        "web-namespaces": "^2.0.0",\n        "zwitch": "^2.0.0"\n      },\n      "funding": {\n        "type": "opencollective",\n        "url": "https://opencollective.com/unified"\n      }\n    },\n    "node_modules/hast-util-to-jsx-runtime": {\n      "version": "2.3.6",\n      "resolved": "https://registry.npmmirror.com/hast-util-to-jsx-runtime/-/hast-util-to-jsx-runtime-2.3.6.tgz",\n      "integrity": "sha512-zl6s8LwNyo1P9uw+XJGvZtdFF1GdAkOg8ujOw+4Pyb76874fLps4ueHXDhXWdk6YHQ6OgUtinliG7RsYvCbbBg==",\n      "license": "MIT",\n      "dependencies": {\n        "@types/estree": "^1.0.0",\n        "@types/hast": "^3.0.0",\n        "@types/unist": "^3.0.0",\n        "comma-separated-tokens": "^2.0.0",\n        "devlop": "^1.0.0",\n        "estree-util-is-identifier-name": "^3.0.0",\n        "hast-util-whitespace": "^3.0.0",\n        "mdast-util-mdx-expression": "^2.0.0",\n        "mdast-util-mdx-jsx": "^3.0.0",\n        "mdast-util-mdxjs-esm": "^2.0.0",\n        "property-information": "^7.0.0",\n        "space-separated-tokens": "^2.0.0",\n        "style-to-js": "^1.0.0",\n        "unist-util-position": "^5.0.0",\n        "vfile-message": "^4.0.0"\n      },\n      "funding": {\n        "type": "opencollective",\n        "url": "https://opencollective.com/unified"\n      }\n    },\n    "node_modules/hast-util-to-parse5": {\n      "version": "8.0.1",\n      "resolved": "https://registry.npmmirror.com/hast-util-to-parse5/-/hast-util-to-parse5-8.0.1.tgz",\n      "integrity": "sha512-MlWT6Pjt4CG9lFCjiz4BH7l9wmrMkfkJYCxFwKQic8+RTZgWPuWxwAfjJElsXkex7DJjfSJsQIt931ilUgmwdA==",\n      "license": "MIT",\n      "dependencies": {\n        "@types/hast": "^3.0.0",\n        "comma-separated-tokens": "^2.0.0",\n        "devlop": "^1.0.0",\n        "property-information": "^7.0.0",\n        "space-separated-tokens": "^2.0.0",\n        "web-namespaces": "^2.0.0",\n        "zwitch": "^2.0.0"\n      },\n      "funding": {\n        "type": "opencollective",\n        "url": "https://opencollective.com/unified"\n      }\n    },\n    "node_modules/hast-util-to-text": {\n      "version": "4.0.2",\n      "resolved": "https://registry.npmmirror.com/hast-util-to-text/-/hast-util-to-text-4.0.2.tgz",\n      "integrity": "sha512-KK6y/BN8lbaq654j7JgBydev7wuNMcID54lkRav1P0CaE1e47P72AWWPiGKXTJU271ooYzcvTAn/Zt0REnvc7A==",\n      "license": "MIT",\n      "dependencies": {\n        "@types/hast": "^3.0.0",\n        "@types/unist": "^3.0.0",\n        "hast-util-is-element": "^3.0.0",\n        "unist-util-find-after": "^5.0.0"\n      },\n      "funding": {\n        "type": "opencollective",\n        "url": "https://opencollective.com/unified"\n      }\n    },\n    "node_modules/hast-util-whitespace": {\n      "version": "3.0.0",\n      "resolved": "https://registry.npmmirror.com/hast-util-whitespace/-/hast-util-whitespace-3.0.0.tgz",\n      "integrity": "sha512-88JUN06ipLwsnv+dVn+OIYOvAuvBMy/Qoi6O7mQHxdPXpjy+Cd6xRkWwux7DKO+4sYILtLBRIKgsdpS2gQc7qw==",\n      "license": "MIT",\n      "dependencies": {\n        "@types/hast": "^3.0.0"\n      },\n      "funding": {\n        "type": "opencollective",\n        "url": "https://opencollective.com/unified"\n      }\n    },\n    "node_modules/hastscript": {\n      "version": "9.0.1",\n      "resolved": "https://registry.npmmirror.com/hastscript/-/hastscript-9.0.1.tgz",\n      "integrity": "sha512-g7df9rMFX/SPi34tyGCyUBREQoKkapwdY/T04Qn9TDWfHhAYt4/I0gMVirzK5wEzeUqIjEB+LXC/ypb7Aqno5w==",\n      "license": "MIT",\n      "dependencies": {\n        "@types/hast": "^3.0.0",\n        "comma-separated-tokens": "^2.0.0",\n        "hast-util-parse-selector": "^4.0.0",\n        "property-information": "^7.0.0",\n        "space-separated-tokens": "^2.0.0"\n      },\n      "funding": {\n        "type": "opencollective",\n        "url": "https://opencollective.com/unified"\n      }\n    },\n    "node_modules/highlight.js": {\n      "version": "11.11.2",\n      "resolved": "https://registry.npmmirror.com/highlight.js/-/highlight.js-11.11.2.tgz",\n      "integrity": "sha512-oaXMACAU0kzOMXBjWpNcX+vlwSBCIAiZ9BHa7gA15NOTtT2L/l8OSZDuqS2XppOhZBPJ7hm4o8ep2kyuip2uEQ==",\n      "license": "BSD-3-Clause",\n      "engines": {\n        "node": ">=12.0.0"\n      }\n    },\n    "node_modules/html-url-attributes": {\n      "version": "3.0.1",\n      "resolved": "https://registry.npmmirror.com/html-url-attributes/-/html-url-attributes-3.0.1.tgz",\n      "integrity": "sha512-ol6UPyBWqsrO6EJySPz2O7ZSr856WDrEzM5zMqp+FJJLGMW35cLYmmZnl0vztAZxRUoNZJFTCohfjuIJ8I4QBQ==",\n      "license": "MIT",\n      "funding": {\n        "type": "opencollective",\n        "url": "https://opencollective.com/unified"\n      }\n    },\n    "node_modules/html-void-elements": {\n      "version": "3.0.0",\n      "resolved": "https://registry.npmmirror.com/html-void-elements/-/html-void-elements-3.0.0.tgz",\n      "integrity": "sha512-bEqo66MRXsUGxWHV5IP0PUiAWwoEjba4VCzg0LjFJBpchPaTfyfCKTG6bc5F8ucKec3q5y6qOdGyYTSBEvhCrg==",\n      "license": "MIT",\n      "funding": {\n        "type": "github",\n        "url": "https://github.com/sponsors/wooorm"\n      }\n    },\n    "node_modules/inline-style-parser": {\n      "version": "0.2.7",\n      "resolved": "https://registry.npmmirror.com/inline-style-parser/-/inline-style-parser-0.2.7.tgz",\n      "integrity": "sha512-Nb2ctOyNR8DqQoR0OwRG95uNWIC0C1lCgf5Naz5H6Ji72KZ8OcFZLz2P5sNgwlyoJ8Yif11oMuYs5pBQa86csA==",\n      "license": "MIT"\n    },\n    "node_modules/is-alphabetical": {\n      "version": "2.0.1",\n      "resolved": "https://registry.npmmirror.com/is-alphabetical/-/is-alphabetical-2.0.1.tgz",\n      "integrity": "sha512-FWyyY60MeTNyeSRpkM2Iry0G9hpr7/9kD40mD/cGQEuilcZYS4okz8SN2Q6rLCJ8gbCt6fN+rC+6tMGS99LaxQ==",\n      "license": "MIT",\n      "funding": {\n        "type": "github",\n        "url": "https://github.com/sponsors/wooorm"\n      }\n    },\n    "node_modules/is-alphanumerical": {\n      "version": "2.0.1",\n      "resolved": "https://registry.npmmirror.com/is-alphanumerical/-/is-alphanumerical-2.0.1.tgz",\n      "integrity": "sha512-hmbYhX/9MUMF5uh7tOXyK/n0ZvWpad5caBA17GsC6vyuCqaWliRG5K1qS9inmUhEMaOBIW7/whAnSwveW/LtZw==",\n      "license": "MIT",\n      "dependencies": {\n        "is-alphabetical": "^2.0.0",\n        "is-decimal": "^2.0.0"\n      },\n      "funding": {\n        "type": "github",\n        "url": "https://github.com/sponsors/wooorm"\n      }\n    },\n    "node_modules/is-decimal": {\n      "version": "2.0.1",\n      "resolved": "https://registry.npmmirror.com/is-decimal/-/is-decimal-2.0.1.tgz",\n      "integrity": "sha512-AAB9hiomQs5DXWcRB1rqsxGUstbRroFOPPVAomNk/3XHR5JyEZChOyTWe2oayKnsSsr/kcGqF+z6yuH6HHpN0A==",\n      "license": "MIT",\n      "funding": {\n        "type": "github",\n        "url": "https://github.com/sponsors/wooorm"\n      }\n    },\n    "node_modules/is-extendable": {\n      "version": "0.1.1",\n      "resolved": "https://registry.npmmirror.com/is-extendable/-/is-extendable-0.1.1.tgz",\n      "integrity": "sha512-5BMULNob1vgFX6EjQw5izWDxrecWK9AM72rugNr0TFldMOi0fj6Jk+zeKIt0xGj4cEfQIJth4w3OKWOJ4f+AFw==",\n      "license": "MIT",\n      "engines": {\n        "node": ">=0.10.0"\n      }\n    },\n    "node_modules/is-hexadecimal": {\n      "version": "2.0.1",\n      "resolved": "https://registry.npmmirror.com/is-hexadecimal/-/is-hexadecimal-2.0.1.tgz",\n      "integrity": "sha512-DgZQp241c8oO6cA1SbTEWiXeoxV42vlcJxgH+B3hi1AiqqKruZR3ZGF8In3fj4+/y/7rHvlOZLZtgJ/4ttYGZg==",\n      "license": "MIT",\n      "funding": {\n        "type": "github",\n        "url": "https://github.com/sponsors/wooorm"\n      }\n    },\n    "node_modules/is-plain-obj": {\n      "version": "4.1.0",\n      "resolved": "https://registry.npmmirror.com/is-plain-obj/-/is-plain-obj-4.1.0.tgz",\n      "integrity": "sha512-+Pgi+vMuUNkJyExiMBt5IlFoMyKnr5zhJ4Uspz58WOhBF5QoIZkFyNHIbBAtHwzVAgk5RtndVNsDRN61/mmDqg==",\n      "license": "MIT",\n      "engines": {\n        "node": ">=12"\n      },\n      "funding": {\n        "url": "https://github.com/sponsors/sindresorhus"\n      }\n    },\n    "node_modules/jiti": {\n      "version": "2.7.0",\n      "resolved": "https://registry.npmmirror.com/jiti/-/jiti-2.7.0.tgz",\n      "integrity": "sha512-AC/7JofJvZGrrneWNaEnJeOLUx+JlGt7tNa0wZiRPT4MY1wmfKjt2+6O2p2uz2+skll8OZZmJMNqeke7kKbNgQ==",\n      "dev": true,\n      "license": "MIT",\n      "bin": {\n        "jiti": "lib/jiti-cli.mjs"\n      }\n    },\n    "node_modules/js-yaml": {\n      "version": "3.15.2",\n      "resolved": "https://registry.npmmirror.com/js-yaml/-/js-yaml-3.15.2.tgz",\n      "integrity": "sha512-6EuL879VkRA+1Cz578mKMiKvjPNEuk6+r1JaFzoSWejZmtf7xWbIyw1e3KkxlkzTIt9Taw6JBhEppG7utc1P+w==",\n      "license": "MIT",\n      "dependencies": {\n        "argparse": "^1.0.7",\n        "esprima": "^4.0.0"\n      },\n      "bin": {\n        "js-yaml": "bin/js-yaml.js"\n      }\n    },\n    "node_modules/katex": {\n      "version": "0.16.47",\n      "resolved": "https://registry.npmmirror.com/katex/-/katex-0.16.47.tgz",\n      "integrity": "sha512-Eeo8Ys1doU1z+x8AZsPpQu+p/QcZBI5PeOo7QGQdy2x2m0MU/hYagBbGOmXwr5KVbEfVuWv9LpnQWeehogurjg==",\n      "funding": [\n        "https://opencollective.com/katex",\n        "https://github.com/sponsors/katex"\n      ],\n      "license": "MIT",\n      "dependencies": {\n        "commander": "^8.3.0"\n      },\n      "bin": {\n        "katex": "cli.js"\n      }\n    },\n    "node_modules/kind-of": {\n      "version": "6.0.3",\n      "resolved": "https://registry.npmmirror.com/kind-of/-/kind-of-6.0.3.tgz",\n      "integrity": "sha512-dcS1ul+9tmeD95T+x28/ehLgd9mENa3LsvDTtzm3vyBEO7RPptvAD+t44WVXaUjTBRcrpFeFlC8WCruUR456hw==",\n      "license": "MIT",\n      "engines": {\n        "node": ">=0.10.0"\n      }\n    },\n    "node_modules/lightningcss": {\n      "version": "1.32.0",\n      "resolved": "https://registry.npmmirror.com/lightningcss/-/lightningcss-1.32.0.tgz",\n      "integrity": "sha512-NXYBzinNrblfraPGyrbPoD19C1h9lfI/1mzgWYvXUTe414Gz/X1FD2XBZSZM7rRTrMA8JL3OtAaGifrIKhQ5yQ==",\n      "dev": true,\n      "license": "MPL-2.0",\n      "dependencies": {\n        "detect-libc": "^2.0.3"\n      },\n      "engines": {\n        "node": ">= 12.0.0"\n      },\n      "funding": {\n        "type": "opencollective",\n        "url": "https://opencollective.com/parcel"\n      },\n      "optionalDependencies": {\n        "lightningcss-android-arm64": "1.32.0",\n        "lightningcss-darwin-arm64": "1.32.0",\n        "lightningcss-darwin-x64": "1.32.0",\n        "lightningcss-freebsd-x64": "1.32.0",\n        "lightningcss-linux-arm-gnueabihf": "1.32.0",\n        "lightningcss-linux-arm64-gnu": "1.32.0",\n        "lightningcss-linux-arm64-musl": "1.32.0",\n        "lightningcss-linux-x64-gnu": "1.32.0",\n        "lightningcss-linux-x64-musl": "1.32.0",\n        "lightningcss-win32-arm64-msvc": "1.32.0",\n        "lightningcss-win32-x64-msvc": "1.32.0"\n      }\n    },\n    "node_modules/lightningcss-android-arm64": {\n      "version": "1.32.0",\n      "resolved": "https://registry.npmmirror.com/lightningcss-android-arm64/-/lightningcss-android-arm64-1.32.0.tgz",\n      "integrity": "sha512-YK7/ClTt4kAK0vo6w3X+Pnm0D2cf2vPHbhOXdoNti1Ga0al1P4TBZhwjATvjNwLEBCnKvjJc2jQgHXH0NEwlAg==",\n      "cpu": [\n        "arm64"\n      ],\n      "dev": true,\n      "license": "MPL-2.0",\n      "optional": true,\n      "os": [\n        "android"\n      ],\n      "engines": {\n        "node": ">= 12.0.0"\n      },\n      "funding": {\n        "type": "opencollective",\n        "url": "https://opencollective.com/parcel"\n      }\n    },\n    "node_modules/lightningcss-darwin-arm64": {\n      "version": "1.32.0",\n      "resolved": "https://registry.npmmirror.com/lightningcss-darwin-arm64/-/lightningcss-darwin-arm64-1.32.0.tgz",\n      "integrity": "sha512-RzeG9Ju5bag2Bv1/lwlVJvBE3q6TtXskdZLLCyfg5pt+HLz9BqlICO7LZM7VHNTTn/5PRhHFBSjk5lc4cmscPQ==",\n      "cpu": [\n        "arm64"\n      ],\n      "dev": true,\n      "license": "MPL-2.0",\n      "optional": true,\n      "os": [\n        "darwin"\n      ],\n      "engines": {\n        "node": ">= 12.0.0"\n      },\n      "funding": {\n        "type": "opencollective",\n        "url": "https://opencollective.com/parcel"\n      }\n    },\n    "node_modules/lightningcss-darwin-x64": {\n      "version": "1.32.0",\n      "resolved": "https://registry.npmmirror.com/lightningcss-darwin-x64/-/lightningcss-darwin-x64-1.32.0.tgz",\n      "integrity": "sha512-U+QsBp2m/s2wqpUYT/6wnlagdZbtZdndSmut/NJqlCcMLTWp5muCrID+K5UJ6jqD2BFshejCYXniPDbNh73V8w==",\n      "cpu": [\n        "x64"\n      ],\n      "dev": true,\n      "license": "MPL-2.0",\n      "optional": true,\n      "os": [\n        "darwin"\n      ],\n      "engines": {\n        "node": ">= 12.0.0"\n      },\n      "funding": {\n        "type": "opencollective",\n        "url": "https://opencollective.com/parcel"\n      }\n    },\n    "node_modules/lightningcss-freebsd-x64": {\n      "version": "1.32.0",\n      "resolved": "https://registry.npmmirror.com/lightningcss-freebsd-x64/-/lightningcss-freebsd-x64-1.32.0.tgz",\n      "integrity": "sha512-JCTigedEksZk3tHTTthnMdVfGf61Fky8Ji2E4YjUTEQX14xiy/lTzXnu1vwiZe3bYe0q+SpsSH/CTeDXK6WHig==",\n      "cpu": [\n        "x64"\n      ],\n      "dev": true,\n      "license": "MPL-2.0",\n      "optional": true,\n      "os": [\n        "freebsd"\n      ],\n      "engines": {\n        "node": ">= 12.0.0"\n      },\n      "funding": {\n        "type": "opencollective",\n        "url": "https://opencollective.com/parcel"\n      }\n    },\n    "node_modules/lightningcss-linux-arm-gnueabihf": {\n      "version": "1.32.0",\n      "resolved": "https://registry.npmmirror.com/lightningcss-linux-arm-gnueabihf/-/lightningcss-linux-arm-gnueabihf-1.32.0.tgz",\n      "integrity": "sha512-x6rnnpRa2GL0zQOkt6rts3YDPzduLpWvwAF6EMhXFVZXD4tPrBkEFqzGowzCsIWsPjqSK+tyNEODUBXeeVHSkw==",\n      "cpu": [\n        "arm"\n      ],\n      "dev": true,\n      "license": "MPL-2.0",\n      "optional": true,\n      "os": [\n        "linux"\n      ],\n      "engines": {\n        "node": ">= 12.0.0"\n      },\n      "funding": {\n        "type": "opencollective",\n        "url": "https://opencollective.com/parcel"\n      }\n    },\n    "node_modules/lightningcss-linux-arm64-gnu": {\n      "version": "1.32.0",\n      "resolved": "https://registry.npmmirror.com/lightningcss-linux-arm64-gnu/-/lightningcss-linux-arm64-gnu-1.32.0.tgz",\n      "integrity": "sha512-0nnMyoyOLRJXfbMOilaSRcLH3Jw5z9HDNGfT/gwCPgaDjnx0i8w7vBzFLFR1f6CMLKF8gVbebmkUN3fa/kQJpQ==",\n      "cpu": [\n        "arm64"\n      ],\n      "dev": true,\n      "libc": [\n        "glibc"\n      ],\n      "license": "MPL-2.0",\n      "optional": true,\n      "os": [\n        "linux"\n      ],\n      "engines": {\n        "node": ">= 12.0.0"\n      },\n      "funding": {\n        "type": "opencollective",\n        "url": "https://opencollective.com/parcel"\n      }\n    },\n    "node_modules/lightningcss-linux-arm64-musl": {\n      "version": "1.32.0",\n      "resolved": "https://registry.npmmirror.com/lightningcss-linux-arm64-musl/-/lightningcss-linux-arm64-musl-1.32.0.tgz",\n      "integrity": "sha512-UpQkoenr4UJEzgVIYpI80lDFvRmPVg6oqboNHfoH4CQIfNA+HOrZ7Mo7KZP02dC6LjghPQJeBsvXhJod/wnIBg==",\n      "cpu": [\n        "arm64"\n      ],\n      "dev": true,\n      "libc": [\n        "musl"\n      ],\n      "license": "MPL-2.0",\n      "optional": true,\n      "os": [\n        "linux"\n      ],\n      "engines": {\n        "node": ">= 12.0.0"\n      },\n      "funding": {\n        "type": "opencollective",\n        "url": "https://opencollective.com/parcel"\n      }\n    },\n    "node_modules/lightningcss-linux-x64-gnu": {\n      "version": "1.32.0",\n      "resolved": "https://registry.npmmirror.com/lightningcss-linux-x64-gnu/-/lightningcss-linux-x64-gnu-1.32.0.tgz",\n      "integrity": "sha512-V7Qr52IhZmdKPVr+Vtw8o+WLsQJYCTd8loIfpDaMRWGUZfBOYEJeyJIkqGIDMZPwPx24pUMfwSxxI8phr/MbOA==",\n      "cpu": [\n        "x64"\n      ],\n      "dev": true,\n      "libc": [\n        "glibc"\n      ],\n      "license": "MPL-2.0",\n      "optional": true,\n      "os": [\n        "linux"\n      ],\n      "engines": {\n        "node": ">= 12.0.0"\n      },\n      "funding": {\n        "type": "opencollective",\n        "url": "https://opencollective.com/parcel"\n      }\n    },\n    "node_modules/lightningcss-linux-x64-musl": {\n      "version": "1.32.0",\n      "resolved": "https://registry.npmmirror.com/lightningcss-linux-x64-musl/-/lightningcss-linux-x64-musl-1.32.0.tgz",\n      "integrity": "sha512-bYcLp+Vb0awsiXg/80uCRezCYHNg1/l3mt0gzHnWV9XP1W5sKa5/TCdGWaR/zBM2PeF/HbsQv/j2URNOiVuxWg==",\n      "cpu": [\n        "x64"\n      ],\n      "dev": true,\n      "libc": [\n        "musl"\n      ],\n      "license": "MPL-2.0",\n      "optional": true,\n      "os": [\n        "linux"\n      ],\n      "engines": {\n        "node": ">= 12.0.0"\n      },\n      "funding": {\n        "type": "opencollective",\n        "url": "https://opencollective.com/parcel"\n      }\n    },\n    "node_modules/lightningcss-win32-arm64-msvc": {\n      "version": "1.32.0",\n      "resolved": "https://registry.npmmirror.com/lightningcss-win32-arm64-msvc/-/lightningcss-win32-arm64-msvc-1.32.0.tgz",\n      "integrity": "sha512-8SbC8BR40pS6baCM8sbtYDSwEVQd4JlFTOlaD3gWGHfThTcABnNDBda6eTZeqbofalIJhFx0qKzgHJmcPTnGdw==",\n      "cpu": [\n        "arm64"\n      ],\n      "dev": true,\n      "license": "MPL-2.0",\n      "optional": true,\n      "os": [\n        "win32"\n      ],\n      "engines": {\n        "node": ">= 12.0.0"\n      },\n      "funding": {\n        "type": "opencollective",\n        "url": "https://opencollective.com/parcel"\n      }\n    },\n    "node_modules/lightningcss-win32-x64-msvc": {\n      "version": "1.32.0",\n      "resolved": "https://registry.npmmirror.com/lightningcss-win32-x64-msvc/-/lightningcss-win32-x64-msvc-1.32.0.tgz",\n      "integrity": "sha512-Amq9B/SoZYdDi1kFrojnoqPLxYhQ4Wo5XiL8EVJrVsB8ARoC1PWW6VGtT0WKCemjy8aC+louJnjS7U18x3b06Q==",\n      "cpu": [\n        "x64"\n      ],\n      "dev": true,\n      "license": "MPL-2.0",\n      "optional": true,\n      "os": [\n        "win32"\n      ],\n      "engines": {\n        "node": ">= 12.0.0"\n      },\n      "funding": {\n        "type": "opencollective",\n        "url": "https://opencollective.com/parcel"\n      }\n    },\n    "node_modules/longest-streak": {\n      "version": "3.1.0",\n      "resolved": "https://registry.npmmirror.com/longest-streak/-/longest-streak-3.1.0.tgz",\n      "integrity": "sha512-9Ri+o0JYgehTaVBBDoMqIl8GXtbWg711O3srftcHhZ0dqnETqLaoIK0x17fUw9rFSlK/0NlsKe0Ahhyl5pXE2g==",\n      "license": "MIT",\n      "funding": {\n        "type": "github",\n        "url": "https://github.com/sponsors/wooorm"\n      }\n    },\n    "node_modules/lowlight": {\n      "version": "3.3.0",\n      "resolved": "https://registry.npmmirror.com/lowlight/-/lowlight-3.3.0.tgz",\n      "integrity": "sha512-0JNhgFoPvP6U6lE/UdVsSq99tn6DhjjpAj5MxG49ewd2mOBVtwWYIT8ClyABhq198aXXODMU6Ox8DrGy/CpTZQ==",\n      "license": "MIT",\n      "dependencies": {\n        "@types/hast": "^3.0.0",\n        "devlop": "^1.0.0",\n        "highlight.js": "~11.11.0"\n      },\n      "funding": {\n        "type": "github",\n        "url": "https://github.com/sponsors/wooorm"\n      }\n    },\n    "node_modules/lucide-react": {\n      "version": "0.544.0",\n      "resolved": "https://registry.npmmirror.com/lucide-react/-/lucide-react-0.544.0.tgz",\n      "integrity": "sha512-t5tS44bqd825zAW45UQxpG2CvcC4urOwn2TrwSH8u+MjeE+1NnWl6QqeQ/6NdjMqdOygyiT9p3Ev0p1NJykxjw==",\n      "license": "ISC",\n      "peerDependencies": {\n        "react": "^16.5.1 || ^17.0.0 || ^18.0.0 || ^19.0.0"\n      }\n    },\n    "node_modules/magic-string": {\n      "version": "0.30.21",\n      "resolved": "https://registry.npmmirror.com/magic-string/-/magic-string-0.30.21.tgz",\n      "integrity": "sha512-vd2F4YUyEXKGcLHoq+TEyCjxueSeHnFxyyjNp80yg0XV4vUhnDer/lvvlqM/arB5bXQN5K2/3oinyCRyx8T2CQ==",\n      "dev": true,\n      "license": "MIT",\n      "dependencies": {\n        "@jridgewell/sourcemap-codec": "^1.5.5"\n      }\n    },\n    "node_modules/markdown-table": {\n      "version": "3.0.4",\n      "resolved": "https://registry.npmmirror.com/markdown-table/-/markdown-table-3.0.4.tgz",\n      "integrity": "sha512-wiYz4+JrLyb/DqW2hkFJxP7Vd7JuTDm77fvbM8VfEQdmSMqcImWeeRbHwZjBjIFki/VaMK2BhFi7oUUZeM5bqw==",\n      "license": "MIT",\n      "funding": {\n        "type": "github",\n        "url": "https://github.com/sponsors/wooorm"\n      }\n    },\n    "node_modules/mdast-util-find-and-replace": {\n      "version": "3.0.3",\n      "resolved": "https://registry.npmmirror.com/mdast-util-find-and-replace/-/mdast-util-find-and-replace-3.0.3.tgz",\n      "integrity": "sha512-xPgpDNl0/OXHsI7TlaIs22lWnH3KlpvZdXG1ET/m/YT2Hhdkx8lJV4kLphE6l9simyM4KPDFBwas08BgEob6Jw==",\n      "license": "MIT",\n      "dependencies": {\n        "@types/mdast": "^4.0.0",\n        "escape-string-regexp": "^5.0.0",\n        "unist-util-is": "^6.0.0",\n        "unist-util-visit-parents": "^6.0.0"\n      },\n      "funding": {\n        "type": "opencollective",\n        "url": "https://opencollective.com/unified"\n      }\n    },\n    "node_modules/mdast-util-from-markdown": {\n      "version": "2.1.0",\n      "resolved": "https://registry.npmmirror.com/mdast-util-from-markdown/-/mdast-util-from-markdown-2.1.0.tgz",\n      "integrity": "sha512-KRLgmPaP2H1ul2bpoJkOS+9pAcDAAj9Nu1mqLnh8NLeJG5tlvj42TH80PIGBpROWlRXLk0lDrWNuZCFy/tsB4A==",\n      "license": "MIT",\n      "dependencies": {\n        "@types/mdast": "^4.0.0",\n        "@types/unist": "^3.0.0",\n        "decode-named-character-reference": "^1.0.0",\n        "devlop": "^1.0.0",\n        "mdast-util-to-string": "^4.0.0",\n        "micromark": "^4.0.0",\n        "micromark-util-decode-numeric-character-reference": "^2.0.0",\n        "micromark-util-decode-string": "^2.0.0",\n        "micromark-util-normalize-identifier": "^2.0.0",\n        "micromark-util-symbol": "^2.0.0",\n        "micromark-util-types": "^2.0.0",\n        "unist-util-stringify-position": "^4.0.0"\n      },\n      "funding": {\n        "type": "opencollective",\n        "url": "https://opencollective.com/unified"\n      }\n    },\n    "node_modules/mdast-util-gfm": {\n      "version": "3.1.0",\n      "resolved": "https://registry.npmmirror.com/mdast-util-gfm/-/mdast-util-gfm-3.1.0.tgz",\n      "integrity": "sha512-0ulfdQOM3ysHhCJ1p06l0b0VKlhU0wuQs3thxZQagjcjPrlFRqY215uZGHHJan9GEAXd9MbfPjFJz+qMkVR6zQ==",\n      "license": "MIT",\n      "dependencies": {\n        "mdast-util-from-markdown": "^2.0.0",\n        "mdast-util-gfm-autolink-literal": "^2.0.0",\n        "mdast-util-gfm-footnote": "^2.0.0",\n        "mdast-util-gfm-strikethrough": "^2.0.0",\n        "mdast-util-gfm-table": "^2.0.0",\n        "mdast-util-gfm-task-list-item": "^2.0.0",\n        "mdast-util-to-markdown": "^2.0.0"\n      },\n      "funding": {\n        "type": "opencollective",\n        "url": "https://opencollective.com/unified"\n      }\n    },\n    "node_modules/mdast-util-gfm-autolink-literal": {\n      "version": "2.0.1",\n      "resolved": "https://registry.npmmirror.com/mdast-util-gfm-autolink-literal/-/mdast-util-gfm-autolink-literal-2.0.1.tgz",\n      "integrity": "sha512-5HVP2MKaP6L+G6YaxPNjuL0BPrq9orG3TsrZ9YXbA3vDw/ACI4MEsnoDpn6ZNm7GnZgtAcONJyPhOP8tNJQavQ==",\n      "license": "MIT",\n      "dependencies": {\n        "@types/mdast": "^4.0.0",\n        "ccount": "^2.0.0",\n        "devlop": "^1.0.0",\n        "mdast-util-find-and-replace": "^3.0.0",\n        "micromark-util-character": "^2.0.0"\n      },\n      "funding": {\n        "type": "opencollective",\n        "url": "https://opencollective.com/unified"\n      }\n    },\n    "node_modules/mdast-util-gfm-footnote": {\n      "version": "2.1.0",\n      "resolved": "https://registry.npmmirror.com/mdast-util-gfm-footnote/-/mdast-util-gfm-footnote-2.1.0.tgz",\n      "integrity": "sha512-sqpDWlsHn7Ac9GNZQMeUzPQSMzR6Wv0WKRNvQRg0KqHh02fpTz69Qc1QSseNX29bhz1ROIyNyxExfawVKTm1GQ==",\n      "license": "MIT",\n      "dependencies": {\n        "@types/mdast": "^4.0.0",\n        "devlop": "^1.1.0",\n        "mdast-util-from-markdown": "^2.0.0",\n        "mdast-util-to-markdown": "^2.0.0",\n        "micromark-util-normalize-identifier": "^2.0.0"\n      },\n      "funding": {\n        "type": "opencollective",\n        "url": "https://opencollective.com/unified"\n      }\n    },\n    "node_modules/mdast-util-gfm-strikethrough": {\n      "version": "2.0.1",\n      "resolved": "https://registry.npmmirror.com/mdast-util-gfm-strikethrough/-/mdast-util-gfm-strikethrough-2.0.1.tgz",\n      "integrity": "sha512-OuJHqvr455pwu2OaOrir7dbzqs4jlWKOtlu9L6GjcIjjQwNyw02VntQsr/Ek6/A13vgnXfUhBekWRUP1OkNivw==",\n      "license": "MIT",\n      "dependencies": {\n        "@types/mdast": "^4.0.0",\n        "mdast-util-from-markdown": "^2.0.0",\n        "mdast-util-to-markdown": "^2.0.0"\n      },\n      "funding": {\n        "type": "opencollective",\n        "url": "https://opencollective.com/unified"\n      }\n    },\n    "node_modules/mdast-util-gfm-table": {\n      "version": "2.0.0",\n      "resolved": "https://registry.npmmirror.com/mdast-util-gfm-table/-/mdast-util-gfm-table-2.0.0.tgz",\n      "integrity": "sha512-78UEvebzz/rJIxLvE7ZtDd/vIQ0RHv+3Mh5DR96p7cS7HsBhYIICDBCu8csTNWNO6tBWfqXPWekRuj2FNOGOZg==",\n      "license": "MIT",\n      "dependencies": {\n        "@types/mdast": "^4.0.0",\n        "devlop": "^1.0.0",\n        "markdown-table": "^3.0.0",\n        "mdast-util-from-markdown": "^2.0.0",\n        "mdast-util-to-markdown": "^2.0.0"\n      },\n      "funding": {\n        "type": "opencollective",\n        "url": "https://opencollective.com/unified"\n      }\n    },\n    "node_modules/mdast-util-gfm-task-list-item": {\n      "version": "2.0.0",\n      "resolved": "https://registry.npmmirror.com/mdast-util-gfm-task-list-item/-/mdast-util-gfm-task-list-item-2.0.0.tgz",\n      "integrity": "sha512-IrtvNvjxC1o06taBAVJznEnkiHxLFTzgonUdy8hzFVeDun0uTjxxrRGVaNFqkU1wJR3RBPEfsxmU6jDWPofrTQ==",\n      "license": "MIT",\n      "dependencies": {\n        "@types/mdast": "^4.0.0",\n        "devlop": "^1.0.0",\n        "mdast-util-from-markdown": "^2.0.0",\n        "mdast-util-to-markdown": "^2.0.0"\n      },\n      "funding": {\n        "type": "opencollective",\n        "url": "https://opencollective.com/unified"\n      }\n    },\n    "node_modules/mdast-util-math": {\n      "version": "3.0.0",\n      "resolved": "https://registry.npmmirror.com/mdast-util-math/-/mdast-util-math-3.0.0.tgz",\n      "integrity": "sha512-Tl9GBNeG/AhJnQM221bJR2HPvLOSnLE/T9cJI9tlc6zwQk2nPk/4f0cHkOdEixQPC/j8UtKDdITswvLAy1OZ1w==",\n      "license": "MIT",\n      "dependencies": {\n        "@types/hast": "^3.0.0",\n        "@types/mdast": "^4.0.0",\n        "devlop": "^1.0.0",\n        "longest-streak": "^3.0.0",\n        "mdast-util-from-markdown": "^2.0.0",\n        "mdast-util-to-markdown": "^2.1.0",\n        "unist-util-remove-position": "^5.0.0"\n      },\n      "funding": {\n        "type": "opencollective",\n        "url": "https://opencollective.com/unified"\n      }\n    },\n    "node_modules/mdast-util-mdx-expression": {\n      "version": "2.0.1",\n      "resolved": "https://registry.npmmirror.com/mdast-util-mdx-expression/-/mdast-util-mdx-expression-2.0.1.tgz",\n      "integrity": "sha512-J6f+9hUp+ldTZqKRSg7Vw5V6MqjATc+3E4gf3CFNcuZNWD8XdyI6zQ8GqH7f8169MM6P7hMBRDVGnn7oHB9kXQ==",\n      "license": "MIT",\n      "dependencies": {\n        "@types/estree-jsx": "^1.0.0",\n        "@types/hast": "^3.0.0",\n        "@types/mdast": "^4.0.0",\n        "devlop": "^1.0.0",\n        "mdast-util-from-markdown": "^2.0.0",\n        "mdast-util-to-markdown": "^2.0.0"\n      },\n      "funding": {\n        "type": "opencollective",\n        "url": "https://opencollective.com/unified"\n      }\n    },\n    "node_modules/mdast-util-mdx-jsx": {\n      "version": "3.2.0",\n      "resolved": "https://registry.npmmirror.com/mdast-util-mdx-jsx/-/mdast-util-mdx-jsx-3.2.0.tgz",\n      "integrity": "sha512-lj/z8v0r6ZtsN/cGNNtemmmfoLAFZnjMbNyLzBafjzikOM+glrjNHPlf6lQDOTccj9n5b0PPihEBbhneMyGs1Q==",\n      "license": "MIT",\n      "dependencies": {\n        "@types/estree-jsx": "^1.0.0",\n        "@types/hast": "^3.0.0",\n        "@types/mdast": "^4.0.0",\n        "@types/unist": "^3.0.0",\n        "ccount": "^2.0.0",\n        "devlop": "^1.1.0",\n        "mdast-util-from-markdown": "^2.0.0",\n        "mdast-util-to-markdown": "^2.0.0",\n        "parse-entities": "^4.0.0",\n        "stringify-entities": "^4.0.0",\n        "unist-util-stringify-position": "^4.0.0",\n        "vfile-message": "^4.0.0"\n      },\n      "funding": {\n        "type": "opencollective",\n        "url": "https://opencollective.com/unified"\n      }\n    },\n    "node_modules/mdast-util-mdxjs-esm": {\n      "version": "2.0.1",\n      "resolved": "https://registry.npmmirror.com/mdast-util-mdxjs-esm/-/mdast-util-mdxjs-esm-2.0.1.tgz",\n      "integrity": "sha512-EcmOpxsZ96CvlP03NghtH1EsLtr0n9Tm4lPUJUBccV9RwUOneqSycg19n5HGzCf+10LozMRSObtVr3ee1WoHtg==",\n      "license": "MIT",\n      "dependencies": {\n        "@types/estree-jsx": "^1.0.0",\n        "@types/hast": "^3.0.0",\n        "@types/mdast": "^4.0.0",\n        "devlop": "^1.0.0",\n        "mdast-util-from-markdown": "^2.0.0",\n        "mdast-util-to-markdown": "^2.0.0"\n      },\n      "funding": {\n        "type": "opencollective",\n        "url": "https://opencollective.com/unified"\n      }\n    },\n    "node_modules/mdast-util-phrasing": {\n      "version": "4.1.0",\n      "resolved": "https://registry.npmmirror.com/mdast-util-phrasing/-/mdast-util-phrasing-4.1.0.tgz",\n      "integrity": "sha512-TqICwyvJJpBwvGAMZjj4J2n0X8QWp21b9l0o7eXyVJ25YNWYbJDVIyD1bZXE6WtV6RmKJVYmQAKWa0zWOABz2w==",\n      "license": "MIT",\n      "dependencies": {\n        "@types/mdast": "^4.0.0",\n        "unist-util-is": "^6.0.0"\n      },\n      "funding": {\n        "type": "opencollective",\n        "url": "https://opencollective.com/unified"\n      }\n    },\n    "node_modules/mdast-util-to-hast": {\n      "version": "13.2.1",\n      "resolved": "https://registry.npmmirror.com/mdast-util-to-hast/-/mdast-util-to-hast-13.2.1.tgz",\n      "integrity": "sha512-cctsq2wp5vTsLIcaymblUriiTcZd0CwWtCbLvrOzYCDZoWyMNV8sZ7krj09FSnsiJi3WVsHLM4k6Dq/yaPyCXA==",\n      "license": "MIT",\n      "dependencies": {\n        "@types/hast": "^3.0.0",\n        "@types/mdast": "^4.0.0",\n        "@ungap/structured-clone": "^1.0.0",\n        "devlop": "^1.0.0",\n        "micromark-util-sanitize-uri": "^2.0.0",\n        "trim-lines": "^3.0.0",\n        "unist-util-position": "^5.0.0",\n        "unist-util-visit": "^5.0.0",\n        "vfile": "^6.0.0"\n      },\n      "funding": {\n        "type": "opencollective",\n        "url": "https://opencollective.com/unified"\n      }\n    },\n    "node_modules/mdast-util-to-markdown": {\n      "version": "2.2.0",\n      "resolved": "https://registry.npmmirror.com/mdast-util-to-markdown/-/mdast-util-to-markdown-2.2.0.tgz",\n      "integrity": "sha512-2Jn/ADrHFFyyniBMi0bncTbJqU78K3/TEYvzvwrWWzD9MYPUa/Gm4r3nOeKFQg/PDM5BsbDYdc8ackW4NTY6NA==",\n      "license": "MIT",\n      "dependencies": {\n        "@types/mdast": "^4.0.0",\n        "@types/unist": "^3.0.0",\n        "longest-streak": "^3.0.0",\n        "mdast-util-phrasing": "^4.0.0",\n        "mdast-util-to-string": "^4.0.0",\n        "micromark-util-character": "^2.0.0",\n        "micromark-util-classify-character": "^2.0.0",\n        "micromark-util-decode-string": "^2.0.0",\n        "micromark-util-html-tag-name": "^2.0.0",\n        "unist-util-visit": "^5.0.0",\n        "zwitch": "^2.0.0"\n      },\n      "funding": {\n        "type": "opencollective",\n        "url": "https://opencollective.com/unified"\n      }\n    },\n    "node_modules/mdast-util-to-string": {\n      "version": "4.0.0",\n      "resolved": "https://registry.npmmirror.com/mdast-util-to-string/-/mdast-util-to-string-4.0.0.tgz",\n      "integrity": "sha512-0H44vDimn51F0YwvxSJSm0eCDOJTRlmN0R1yBh4HLj9wiV1Dn0QoXGbvFAWj2hSItVTlCmBF1hqKlIyUBVFLPg==",\n      "license": "MIT",\n      "dependencies": {\n        "@types/mdast": "^4.0.0"\n      },\n      "funding": {\n        "type": "opencollective",\n        "url": "https://opencollective.com/unified"\n      }\n    },\n    "node_modules/micromark": {\n      "version": "4.0.3",\n      "resolved": "https://registry.npmmirror.com/micromark/-/micromark-4.0.3.tgz",\n      "integrity": "sha512-oGYfQzHSG5dOMovQcJ3fyTmZlWAWpi0XA0sJwJs+i6OT88o1+Jtw/8z0CmdowSLxGhhFK89rQ/oXph/wN02PNw==",\n      "funding": [\n        {\n          "type": "GitHub Sponsors",\n          "url": "https://github.com/sponsors/unifiedjs"\n        },\n        {\n          "type": "OpenCollective",\n          "url": "https://opencollective.com/unified"\n        }\n      ],\n      "license": "MIT",\n      "dependencies": {\n        "@types/debug": "^4.0.0",\n        "debug": "^4.0.0",\n        "decode-named-character-reference": "^1.0.0",\n        "devlop": "^1.0.0",\n        "micromark-core-commonmark": "^2.0.0",\n        "micromark-factory-space": "^2.0.0",\n        "micromark-util-character": "^2.0.0",\n        "micromark-util-chunked": "^2.0.0",\n        "micromark-util-combine-extensions": "^2.0.0",\n        "micromark-util-decode-numeric-character-reference": "^2.0.0",\n        "micromark-util-edit-map": "^1.0.0",\n        "micromark-util-encode": "^2.0.0",\n        "micromark-util-normalize-identifier": "^2.0.0",\n        "micromark-util-resolve-all": "^2.0.0",\n        "micromark-util-sanitize-uri": "^2.0.0",\n        "micromark-util-subtokenize": "^2.0.0",\n        "micromark-util-symbol": "^2.0.0",\n        "micromark-util-types": "^2.0.0"\n      }\n    },\n    "node_modules/micromark-core-commonmark": {\n      "version": "2.0.4",\n      "resolved": "https://registry.npmmirror.com/micromark-core-commonmark/-/micromark-core-commonmark-2.0.4.tgz",\n      "integrity": "sha512-wxEeE8v8XVvOrxn1TZj74qYhAtTQsSqufHVS3uNVyT1MupXxhyaHk8/9xDNPh9BmL77QNDgWTkZ3RsYHB2ry7w==",\n      "funding": [\n        {\n          "type": "GitHub Sponsors",\n          "url": "https://github.com/sponsors/unifiedjs"\n        },\n        {\n          "type": "OpenCollective",\n          "url": "https://opencollective.com/unified"\n        }\n      ],\n      "license": "MIT",\n      "dependencies": {\n        "decode-named-character-reference": "^1.0.0",\n        "devlop": "^1.0.0",\n        "micromark-factory-destination": "^2.0.0",\n        "micromark-factory-label": "^2.0.0",\n        "micromark-factory-space": "^2.1.0",\n        "micromark-factory-title": "^2.0.0",\n        "micromark-factory-whitespace": "^2.0.0",\n        "micromark-util-character": "^2.0.0",\n        "micromark-util-chunked": "^2.0.0",\n        "micromark-util-classify-character": "^2.0.0",\n        "micromark-util-edit-map": "^1.0.0",\n        "micromark-util-html-tag-name": "^2.0.0",\n        "micromark-util-normalize-identifier": "^2.0.0",\n        "micromark-util-resolve-all": "^2.0.0",\n        "micromark-util-subtokenize": "^2.0.0",\n        "micromark-util-symbol": "^2.0.0",\n        "micromark-util-types": "^2.0.3"\n      }\n    },\n    "node_modules/micromark-extension-gfm": {\n      "version": "3.0.0",\n      "resolved": "https://registry.npmmirror.com/micromark-extension-gfm/-/micromark-extension-gfm-3.0.0.tgz",\n      "integrity": "sha512-vsKArQsicm7t0z2GugkCKtZehqUm31oeGBV/KVSorWSy8ZlNAv7ytjFhvaryUiCUJYqs+NoE6AFhpQvBTM6Q4w==",\n      "license": "MIT",\n      "dependencies": {\n        "micromark-extension-gfm-autolink-literal": "^2.0.0",\n        "micromark-extension-gfm-footnote": "^2.0.0",\n        "micromark-extension-gfm-strikethrough": "^2.0.0",\n        "micromark-extension-gfm-table": "^2.0.0",\n        "micromark-extension-gfm-tagfilter": "^2.0.0",\n        "micromark-extension-gfm-task-list-item": "^2.0.0",\n        "micromark-util-combine-extensions": "^2.0.0",\n        "micromark-util-types": "^2.0.0"\n      },\n      "funding": {\n        "type": "opencollective",\n        "url": "https://opencollective.com/unified"\n      }\n    },\n    "node_modules/micromark-extension-gfm-autolink-literal": {\n      "version": "2.1.0",\n      "resolved": "https://registry.npmmirror.com/micromark-extension-gfm-autolink-literal/-/micromark-extension-gfm-autolink-literal-2.1.0.tgz",\n      "integrity": "sha512-oOg7knzhicgQ3t4QCjCWgTmfNhvQbDDnJeVu9v81r7NltNCVmhPy1fJRX27pISafdjL+SVc4d3l48Gb6pbRypw==",\n      "license": "MIT",\n      "dependencies": {\n        "micromark-util-character": "^2.0.0",\n        "micromark-util-sanitize-uri": "^2.0.0",\n        "micromark-util-symbol": "^2.0.0",\n        "micromark-util-types": "^2.0.0"\n      },\n      "funding": {\n        "type": "opencollective",\n        "url": "https://opencollective.com/unified"\n      }\n    },\n    "node_modules/micromark-extension-gfm-footnote": {\n      "version": "2.1.0",\n      "resolved": "https://registry.npmmirror.com/micromark-extension-gfm-footnote/-/micromark-extension-gfm-footnote-2.1.0.tgz",\n      "integrity": "sha512-/yPhxI1ntnDNsiHtzLKYnE3vf9JZ6cAisqVDauhp4CEHxlb4uoOTxOCJ+9s51bIB8U1N1FJ1RXOKTIlD5B/gqw==",\n      "license": "MIT",\n      "dependencies": {\n        "devlop": "^1.0.0",\n        "micromark-core-commonmark": "^2.0.0",\n        "micromark-factory-space": "^2.0.0",\n        "micromark-util-character": "^2.0.0",\n        "micromark-util-normalize-identifier": "^2.0.0",\n        "micromark-util-sanitize-uri": "^2.0.0",\n        "micromark-util-symbol": "^2.0.0",\n        "micromark-util-types": "^2.0.0"\n      },\n      "funding": {\n        "type": "opencollective",\n        "url": "https://opencollective.com/unified"\n      }\n    },\n    "node_modules/micromark-extension-gfm-strikethrough": {\n      "version": "2.1.0",\n      "resolved": "https://registry.npmmirror.com/micromark-extension-gfm-strikethrough/-/micromark-extension-gfm-strikethrough-2.1.0.tgz",\n      "integrity": "sha512-ADVjpOOkjz1hhkZLlBiYA9cR2Anf8F4HqZUO6e5eDcPQd0Txw5fxLzzxnEkSkfnD0wziSGiv7sYhk/ktvbf1uw==",\n      "license": "MIT",\n      "dependencies": {\n        "devlop": "^1.0.0",\n        "micromark-util-chunked": "^2.0.0",\n        "micromark-util-classify-character": "^2.0.0",\n        "micromark-util-resolve-all": "^2.0.0",\n        "micromark-util-symbol": "^2.0.0",\n        "micromark-util-types": "^2.0.0"\n      },\n      "funding": {\n        "type": "opencollective",\n        "url": "https://opencollective.com/unified"\n      }\n    },\n    "node_modules/micromark-extension-gfm-table": {\n      "version": "2.1.2",\n      "resolved": "https://registry.npmmirror.com/micromark-extension-gfm-table/-/micromark-extension-gfm-table-2.1.2.tgz",\n      "integrity": "sha512-pRzm4kDTu0MjlmBkxmS9yYhw60nncfcEwu9NNdPFSQEFXS95ZKyIIyTSHu/o3ReBUrLKYEq+7YaXCRn/bPB4MA==",\n      "license": "MIT",\n      "dependencies": {\n        "devlop": "^1.0.0",\n        "micromark-factory-space": "^2.0.0",\n        "micromark-util-character": "^2.0.0",\n        "micromark-util-symbol": "^2.0.0",\n        "micromark-util-types": "^2.0.0"\n      },\n      "funding": {\n        "type": "opencollective",\n        "url": "https://opencollective.com/unified"\n      }\n    },\n    "node_modules/micromark-extension-gfm-tagfilter": {\n      "version": "2.0.0",\n      "resolved": "https://registry.npmmirror.com/micromark-extension-gfm-tagfilter/-/micromark-extension-gfm-tagfilter-2.0.0.tgz",\n      "integrity": "sha512-xHlTOmuCSotIA8TW1mDIM6X2O1SiX5P9IuDtqGonFhEK0qgRI4yeC6vMxEV2dgyr2TiD+2PQ10o+cOhdVAcwfg==",\n      "license": "MIT",\n      "dependencies": {\n        "micromark-util-types": "^2.0.0"\n      },\n      "funding": {\n        "type": "opencollective",\n        "url": "https://opencollective.com/unified"\n      }\n    },\n    "node_modules/micromark-extension-gfm-task-list-item": {\n      "version": "2.1.0",\n      "resolved": "https://registry.npmmirror.com/micromark-extension-gfm-task-list-item/-/micromark-extension-gfm-task-list-item-2.1.0.tgz",\n      "integrity": "sha512-qIBZhqxqI6fjLDYFTBIa4eivDMnP+OZqsNwmQ3xNLE4Cxwc+zfQEfbs6tzAo2Hjq+bh6q5F+Z8/cksrLFYWQQw==",\n      "license": "MIT",\n      "dependencies": {\n        "devlop": "^1.0.0",\n        "micromark-factory-space": "^2.0.0",\n        "micromark-util-character": "^2.0.0",\n        "micromark-util-symbol": "^2.0.0",\n        "micromark-util-types": "^2.0.0"\n      },\n      "funding": {\n        "type": "opencollective",\n        "url": "https://opencollective.com/unified"\n      }\n    },\n    "node_modules/micromark-extension-math": {\n      "version": "3.1.0",\n      "resolved": "https://registry.npmmirror.com/micromark-extension-math/-/micromark-extension-math-3.1.0.tgz",\n      "integrity": "sha512-lvEqd+fHjATVs+2v/8kg9i5Q0AP2k85H0WUOwpIVvUML8BapsMvh1XAogmQjOCsLpoKRCVQqEkQBB3NhVBcsOg==",\n      "license": "MIT",\n      "dependencies": {\n        "@types/katex": "^0.16.0",\n        "devlop": "^1.0.0",\n        "katex": "^0.16.0",\n        "micromark-factory-space": "^2.0.0",\n        "micromark-util-character": "^2.0.0",\n        "micromark-util-symbol": "^2.0.0",\n        "micromark-util-types": "^2.0.0"\n      },\n      "funding": {\n        "type": "opencollective",\n        "url": "https://opencollective.com/unified"\n      }\n    },\n    "node_modules/micromark-factory-destination": {\n      "version": "2.0.1",\n      "resolved": "https://registry.npmmirror.com/micromark-factory-destination/-/micromark-factory-destination-2.0.1.tgz",\n      "integrity": "sha512-Xe6rDdJlkmbFRExpTOmRj9N3MaWmbAgdpSrBQvCFqhezUn4AHqJHbaEnfbVYYiexVSs//tqOdY/DxhjdCiJnIA==",\n      "funding": [\n        {\n          "type": "GitHub Sponsors",\n          "url": "https://github.com/sponsors/unifiedjs"\n        },\n        {\n          "type": "OpenCollective",\n          "url": "https://opencollective.com/unified"\n        }\n      ],\n      "license": "MIT",\n      "dependencies": {\n        "micromark-util-character": "^2.0.0",\n        "micromark-util-symbol": "^2.0.0",\n        "micromark-util-types": "^2.0.0"\n      }\n    },\n    "node_modules/micromark-factory-label": {\n      "version": "2.0.1",\n      "resolved": "https://registry.npmmirror.com/micromark-factory-label/-/micromark-factory-label-2.0.1.tgz",\n      "integrity": "sha512-VFMekyQExqIW7xIChcXn4ok29YE3rnuyveW3wZQWWqF4Nv9Wk5rgJ99KzPvHjkmPXF93FXIbBp6YdW3t71/7Vg==",\n      "funding": [\n        {\n          "type": "GitHub Sponsors",\n          "url": "https://github.com/sponsors/unifiedjs"\n        },\n        {\n          "type": "OpenCollective",\n          "url": "https://opencollective.com/unified"\n        }\n      ],\n      "license": "MIT",\n      "dependencies": {\n        "devlop": "^1.0.0",\n        "micromark-util-character": "^2.0.0",\n        "micromark-util-symbol": "^2.0.0",\n        "micromark-util-types": "^2.0.0"\n      }\n    },\n    "node_modules/micromark-factory-space": {\n      "version": "2.1.0",\n      "resolved": "https://registry.npmmirror.com/micromark-factory-space/-/micromark-factory-space-2.1.0.tgz",\n      "integrity": "sha512-fS8hnLIjnjvdQIj39Geug8wWsR0HrYZ43KShKxNfwT7t2LOHo/LbWZEzEaSOjwtjdCsjoE6syHhonEzW0zv0+Q==",\n      "funding": [\n        {\n          "type": "GitHub Sponsors",\n          "url": "https://github.com/sponsors/unifiedjs"\n        },\n        {\n          "type": "OpenCollective",\n          "url": "https://opencollective.com/unified"\n        }\n      ],\n      "license": "MIT",\n      "dependencies": {\n        "micromark-util-character": "^2.0.0",\n        "micromark-util-types": "^2.0.0"\n      }\n    },\n    "node_modules/micromark-factory-title": {\n      "version": "2.0.1",\n      "resolved": "https://registry.npmmirror.com/micromark-factory-title/-/micromark-factory-title-2.0.1.tgz",\n      "integrity": "sha512-5bZ+3CjhAd9eChYTHsjy6TGxpOFSKgKKJPJxr293jTbfry2KDoWkhBb6TcPVB4NmzaPhMs1Frm9AZH7OD4Cjzw==",\n      "funding": [\n        {\n          "type": "GitHub Sponsors",\n          "url": "https://github.com/sponsors/unifiedjs"\n        },\n        {\n          "type": "OpenCollective",\n          "url": "https://opencollective.com/unified"\n        }\n      ],\n      "license": "MIT",\n      "dependencies": {\n        "micromark-factory-space": "^2.0.0",\n        "micromark-util-character": "^2.0.0",\n        "micromark-util-symbol": "^2.0.0",\n        "micromark-util-types": "^2.0.0"\n      }\n    },\n    "node_modules/micromark-factory-whitespace": {\n      "version": "2.0.1",\n      "resolved": "https://registry.npmmirror.com/micromark-factory-whitespace/-/micromark-factory-whitespace-2.0.1.tgz",\n      "integrity": "sha512-Ob0nuZ3PKt/n0hORHyvoD9uZhr+Za8sFoP+OnMcnWK5lngSzALgQYKMr9RJVOWLqQYuyn6ulqGWSXdwf6F80lQ==",\n      "funding": [\n        {\n          "type": "GitHub Sponsors",\n          "url": "https://github.com/sponsors/unifiedjs"\n        },\n        {\n          "type": "OpenCollective",\n          "url": "https://opencollective.com/unified"\n        }\n      ],\n      "license": "MIT",\n      "dependencies": {\n        "micromark-factory-space": "^2.0.0",\n        "micromark-util-character": "^2.0.0",\n        "micromark-util-symbol": "^2.0.0",\n        "micromark-util-types": "^2.0.0"\n      }\n    },\n    "node_modules/micromark-util-character": {\n      "version": "2.1.1",\n      "resolved": "https://registry.npmmirror.com/micromark-util-character/-/micromark-util-character-2.1.1.tgz",\n      "integrity": "sha512-wv8tdUTJ3thSFFFJKtpYKOYiGP2+v96Hvk4Tu8KpCAsTMs6yi+nVmGh1syvSCsaxz45J6Jbw+9DD6g97+NV67Q==",\n      "funding": [\n        {\n          "type": "GitHub Sponsors",\n          "url": "https://github.com/sponsors/unifiedjs"\n        },\n        {\n          "type": "OpenCollective",\n          "url": "https://opencollective.com/unified"\n        }\n      ],\n      "license": "MIT",\n      "dependencies": {\n        "micromark-util-symbol": "^2.0.0",\n        "micromark-util-types": "^2.0.0"\n      }\n    },\n    "node_modules/micromark-util-chunked": {\n      "version": "2.0.1",\n      "resolved": "https://registry.npmmirror.com/micromark-util-chunked/-/micromark-util-chunked-2.0.1.tgz",\n      "integrity": "sha512-QUNFEOPELfmvv+4xiNg2sRYeS/P84pTW0TCgP5zc9FpXetHY0ab7SxKyAQCNCc1eK0459uoLI1y5oO5Vc1dbhA==",\n      "funding": [\n        {\n          "type": "GitHub Sponsors",\n          "url": "https://github.com/sponsors/unifiedjs"\n        },\n        {\n          "type": "OpenCollective",\n          "url": "https://opencollective.com/unified"\n        }\n      ],\n      "license": "MIT",\n      "dependencies": {\n        "micromark-util-symbol": "^2.0.0"\n      }\n    },\n    "node_modules/micromark-util-classify-character": {\n      "version": "2.0.1",\n      "resolved": "https://registry.npmmirror.com/micromark-util-classify-character/-/micromark-util-classify-character-2.0.1.tgz",\n      "integrity": "sha512-K0kHzM6afW/MbeWYWLjoHQv1sgg2Q9EccHEDzSkxiP/EaagNzCm7T/WMKZ3rjMbvIpvBiZgwR3dKMygtA4mG1Q==",\n      "funding": [\n        {\n          "type": "GitHub Sponsors",\n          "url": "https://github.com/sponsors/unifiedjs"\n        },\n        {\n          "type": "OpenCollective",\n          "url": "https://opencollective.com/unified"\n        }\n      ],\n      "license": "MIT",\n      "dependencies": {\n        "micromark-util-character": "^2.0.0",\n        "micromark-util-symbol": "^2.0.0",\n        "micromark-util-types": "^2.0.0"\n      }\n    },\n    "node_modules/micromark-util-combine-extensions": {\n      "version": "2.0.1",\n      "resolved": "https://registry.npmmirror.com/micromark-util-combine-extensions/-/micromark-util-combine-extensions-2.0.1.tgz",\n      "integrity": "sha512-OnAnH8Ujmy59JcyZw8JSbK9cGpdVY44NKgSM7E9Eh7DiLS2E9RNQf0dONaGDzEG9yjEl5hcqeIsj4hfRkLH/Bg==",\n      "funding": [\n        {\n          "type": "GitHub Sponsors",\n          "url": "https://github.com/sponsors/unifiedjs"\n        },\n        {\n          "type": "OpenCollective",\n          "url": "https://opencollective.com/unified"\n        }\n      ],\n      "license": "MIT",\n      "dependencies": {\n        "micromark-util-chunked": "^2.0.0",\n        "micromark-util-types": "^2.0.0"\n      }\n    },\n    "node_modules/micromark-util-decode-numeric-character-reference": {\n      "version": "2.0.2",\n      "resolved": "https://registry.npmmirror.com/micromark-util-decode-numeric-character-reference/-/micromark-util-decode-numeric-character-reference-2.0.2.tgz",\n      "integrity": "sha512-ccUbYk6CwVdkmCQMyr64dXz42EfHGkPQlBj5p7YVGzq8I7CtjXZJrubAYezf7Rp+bjPseiROqe7G6foFd+lEuw==",\n      "funding": [\n        {\n          "type": "GitHub Sponsors",\n          "url": "https://github.com/sponsors/unifiedjs"\n        },\n        {\n          "type": "OpenCollective",\n          "url": "https://opencollective.com/unified"\n        }\n      ],\n      "license": "MIT",\n      "dependencies": {\n        "micromark-util-symbol": "^2.0.0"\n      }\n    },\n    "node_modules/micromark-util-decode-string": {\n      "version": "2.0.1",\n      "resolved": "https://registry.npmmirror.com/micromark-util-decode-string/-/micromark-util-decode-string-2.0.1.tgz",\n      "integrity": "sha512-nDV/77Fj6eH1ynwscYTOsbK7rR//Uj0bZXBwJZRfaLEJ1iGBR6kIfNmlNqaqJf649EP0F3NWNdeJi03elllNUQ==",\n      "funding": [\n        {\n          "type": "GitHub Sponsors",\n          "url": "https://github.com/sponsors/unifiedjs"\n        },\n        {\n          "type": "OpenCollective",\n          "url": "https://opencollective.com/unified"\n        }\n      ],\n      "license": "MIT",\n      "dependencies": {\n        "decode-named-character-reference": "^1.0.0",\n        "micromark-util-character": "^2.0.0",\n        "micromark-util-decode-numeric-character-reference": "^2.0.0",\n        "micromark-util-symbol": "^2.0.0"\n      }\n    },\n    "node_modules/micromark-util-edit-map": {\n      "version": "1.0.0",\n      "resolved": "https://registry.npmmirror.com/micromark-util-edit-map/-/micromark-util-edit-map-1.0.0.tgz",\n      "integrity": "sha512-Pa2ljlsEL6sVwFaYeyrOLSYbQt73JvGbPOYFq+9AElXiSnfI5Q4465RRZ1sHv7lDjDOnGRDDaqPXqClqWK/q1Q==",\n      "funding": [\n        {\n          "type": "GitHub Sponsors",\n          "url": "https://github.com/sponsors/unifiedjs"\n        },\n        {\n          "type": "OpenCollective",\n          "url": "https://opencollective.com/unified"\n        }\n      ],\n      "license": "MIT",\n      "dependencies": {\n        "micromark-util-types": "^2.0.0"\n      }\n    },\n    "node_modules/micromark-util-encode": {\n      "version": "2.0.1",\n      "resolved": "https://registry.npmmirror.com/micromark-util-encode/-/micromark-util-encode-2.0.1.tgz",\n      "integrity": "sha512-c3cVx2y4KqUnwopcO9b/SCdo2O67LwJJ/UyqGfbigahfegL9myoEFoDYZgkT7f36T0bLrM9hZTAaAyH+PCAXjw==",\n      "funding": [\n        {\n          "type": "GitHub Sponsors",\n          "url": "https://github.com/sponsors/unifiedjs"\n        },\n        {\n          "type": "OpenCollective",\n          "url": "https://opencollective.com/unified"\n        }\n      ],\n      "license": "MIT"\n    },\n    "node_modules/micromark-util-html-tag-name": {\n      "version": "2.0.1",\n      "resolved": "https://registry.npmmirror.com/micromark-util-html-tag-name/-/micromark-util-html-tag-name-2.0.1.tgz",\n      "integrity": "sha512-2cNEiYDhCWKI+Gs9T0Tiysk136SnR13hhO8yW6BGNyhOC4qYFnwF1nKfD3HFAIXA5c45RrIG1ub11GiXeYd1xA==",\n      "funding": [\n        {\n          "type": "GitHub Sponsors",\n          "url": "https://github.com/sponsors/unifiedjs"\n        },\n        {\n          "type": "OpenCollective",\n          "url": "https://opencollective.com/unified"\n        }\n      ],\n      "license": "MIT"\n    },\n    "node_modules/micromark-util-normalize-identifier": {\n      "version": "2.0.1",\n      "resolved": "https://registry.npmmirror.com/micromark-util-normalize-identifier/-/micromark-util-normalize-identifier-2.0.1.tgz",\n      "integrity": "sha512-sxPqmo70LyARJs0w2UclACPUUEqltCkJ6PhKdMIDuJ3gSf/Q+/GIe3WKl0Ijb/GyH9lOpUkRAO2wp0GVkLvS9Q==",\n      "funding": [\n        {\n          "type": "GitHub Sponsors",\n          "url": "https://github.com/sponsors/unifiedjs"\n        },\n        {\n          "type": "OpenCollective",\n          "url": "https://opencollective.com/unified"\n        }\n      ],\n      "license": "MIT",\n      "dependencies": {\n        "micromark-util-symbol": "^2.0.0"\n      }\n    },\n    "node_modules/micromark-util-resolve-all": {\n      "version": "2.0.1",\n      "resolved": "https://registry.npmmirror.com/micromark-util-resolve-all/-/micromark-util-resolve-all-2.0.1.tgz",\n      "integrity": "sha512-VdQyxFWFT2/FGJgwQnJYbe1jjQoNTS4RjglmSjTUlpUMa95Htx9NHeYW4rGDJzbjvCsl9eLjMQwGeElsqmzcHg==",\n      "funding": [\n        {\n          "type": "GitHub Sponsors",\n          "url": "https://github.com/sponsors/unifiedjs"\n        },\n        {\n          "type": "OpenCollective",\n          "url": "https://opencollective.com/unified"\n        }\n      ],\n      "license": "MIT",\n      "dependencies": {\n        "micromark-util-types": "^2.0.0"\n      }\n    },\n    "node_modules/micromark-util-sanitize-uri": {\n      "version": "2.0.1",\n      "resolved": "https://registry.npmmirror.com/micromark-util-sanitize-uri/-/micromark-util-sanitize-uri-2.0.1.tgz",\n      "integrity": "sha512-9N9IomZ/YuGGZZmQec1MbgxtlgougxTodVwDzzEouPKo3qFWvymFHWcnDi2vzV1ff6kas9ucW+o3yzJK9YB1AQ==",\n      "funding": [\n        {\n          "type": "GitHub Sponsors",\n          "url": "https://github.com/sponsors/unifiedjs"\n        },\n        {\n          "type": "OpenCollective",\n          "url": "https://opencollective.com/unified"\n        }\n      ],\n      "license": "MIT",\n      "dependencies": {\n        "micromark-util-character": "^2.0.0",\n        "micromark-util-encode": "^2.0.0",\n        "micromark-util-symbol": "^2.0.0"\n      }\n    },\n    "node_modules/micromark-util-subtokenize": {\n      "version": "2.1.0",\n      "resolved": "https://registry.npmmirror.com/micromark-util-subtokenize/-/micromark-util-subtokenize-2.1.0.tgz",\n      "integrity": "sha512-XQLu552iSctvnEcgXw6+Sx75GflAPNED1qx7eBJ+wydBb2KCbRZe+NwvIEEMM83uml1+2WSXpBAcp9IUCgCYWA==",\n      "funding": [\n        {\n          "type": "GitHub Sponsors",\n          "url": "https://github.com/sponsors/unifiedjs"\n        },\n        {\n          "type": "OpenCollective",\n          "url": "https://opencollective.com/unified"\n        }\n      ],\n      "license": "MIT",\n      "dependencies": {\n        "devlop": "^1.0.0",\n        "micromark-util-chunked": "^2.0.0",\n        "micromark-util-symbol": "^2.0.0",\n        "micromark-util-types": "^2.0.0"\n      }\n    },\n    "node_modules/micromark-util-symbol": {\n      "version": "2.0.1",\n      "resolved": "https://registry.npmmirror.com/micromark-util-symbol/-/micromark-util-symbol-2.0.1.tgz",\n      "integrity": "sha512-vs5t8Apaud9N28kgCrRUdEed4UJ+wWNvicHLPxCa9ENlYuAY31M0ETy5y1vA33YoNPDFTghEbnh6efaE8h4x0Q==",\n      "funding": [\n        {\n          "type": "GitHub Sponsors",\n          "url": "https://github.com/sponsors/unifiedjs"\n        },\n        {\n          "type": "OpenCollective",\n          "url": "https://opencollective.com/unified"\n        }\n      ],\n      "license": "MIT"\n    },\n    "node_modules/micromark-util-types": {\n      "version": "2.0.3",\n      "resolved": "https://registry.npmmirror.com/micromark-util-types/-/micromark-util-types-2.0.3.tgz",\n      "integrity": "sha512-oxB2Ik03hI0gv+VNn9tnh1t1YEe9MDPptViAEgfdf3YQHsn0pzGTgCdlSCJXcwhqm8phaEuM7zeEu3QQzVBrPg==",\n      "funding": [\n        {\n          "type": "GitHub Sponsors",\n          "url": "https://github.com/sponsors/unifiedjs"\n        },\n        {\n          "type": "OpenCollective",\n          "url": "https://opencollective.com/unified"\n        }\n      ],\n      "license": "MIT"\n    },\n    "node_modules/ms": {\n      "version": "2.1.3",\n      "resolved": "https://registry.npmmirror.com/ms/-/ms-2.1.3.tgz",\n      "integrity": "sha512-6FlzubTLZG3J2a/NVCAleEhjzq5oxgHyaCU9yYXvcLsvoVaHJq/s5xXI6/XXP6tz7R9xAOtHnSO/tXtF3WRTlA==",\n      "license": "MIT"\n    },\n    "node_modules/nanoid": {\n      "version": "3.3.20",\n      "resolved": "https://registry.npmmirror.com/nanoid/-/nanoid-3.3.20.tgz",\n      "integrity": "sha512-uKdg2G3GNCKQn9byYOpxbGqrT2fGO5KRt5J/8b3pok8rT6qxGWF6hxMyJiEYtAf+FVyYuD9hRaDqX5uPFYJ4ZQ==",\n      "funding": [\n        {\n          "type": "github",\n          "url": "https://github.com/sponsors/ai"\n        }\n      ],\n      "license": "MIT",\n      "bin": {\n        "nanoid": "bin/nanoid.cjs"\n      },\n      "engines": {\n        "node": "^10 || ^12 || ^13.7 || ^14 || >=15.0.1"\n      }\n    },\n    "node_modules/next": {\n      "version": "16.3.7",\n      "resolved": "https://registry.npmmirror.com/next/-/next-16.3.7.tgz",\n      "integrity": "sha512-S4AlB0KMYcvVyEVjfD2Ze/3JsX9PWjpD3hJPcEJTVvkAQsMTYVs9DB1NtaBbs41ZZ18NxYwkmM8ljqtrFrmLsQ==",\n      "license": "MIT",\n      "dependencies": {\n        "@next/env": "16.3.7",\n        "@swc/helpers": "0.5.23",\n        "baseline-browser-mapping": "^2.9.19",\n        "caniuse-lite": "^1.0.30001579",\n        "postcss": "8.5.23",\n        "styled-jsx": "5.1.6"\n      },\n      "bin": {\n        "next": "dist/bin/next"\n      },\n      "engines": {\n        "node": ">=20.9.0"\n      },\n      "optionalDependencies": {\n        "@next/swc-darwin-arm64": "16.3.7",\n        "@next/swc-darwin-x64": "16.3.7",\n        "@next/swc-linux-arm64-gnu": "16.3.7",\n        "@next/swc-linux-arm64-musl": "16.3.7",\n        "@next/swc-linux-x64-gnu": "16.3.7",\n        "@next/swc-linux-x64-musl": "16.3.7",\n        "@next/swc-win32-arm64-msvc": "16.3.7",\n        "@next/swc-win32-x64-msvc": "16.3.7",\n        "sharp": "^0.35.4"\n      },\n      "peerDependencies": {\n        "@opentelemetry/api": "^1.1.0",\n        "@playwright/test": "^1.51.1",\n        "babel-plugin-react-compiler": "*",\n        "react": "^18.2.0 || 19.0.0-rc-de68d2f4-20241204 || ^19.0.0",\n        "react-dom": "^18.2.0 || 19.0.0-rc-de68d2f4-20241204 || ^19.0.0",\n        "sass": "^1.3.0"\n      },\n      "peerDependenciesMeta": {\n        "@opentelemetry/api": {\n          "optional": true\n        },\n        "@playwright/test": {\n          "optional": true\n        },\n        "babel-plugin-react-compiler": {\n          "optional": true\n        },\n        "sass": {\n          "optional": true\n        }\n      }\n    },\n    "node_modules/next-themes": {\n      "version": "0.4.6",\n      "resolved": "https://registry.npmmirror.com/next-themes/-/next-themes-0.4.6.tgz",\n      "integrity": "sha512-pZvgD5L0IEvX5/9GWyHMf3m8BKiVQwsCMHfoFosXtXBMnaS0ZnIJ9ST4b4NqLVKDEm8QBxoNNGNaBv2JNF6XNA==",\n      "license": "MIT",\n      "peerDependencies": {\n        "react": "^16.8 || ^17 || ^18 || ^19 || ^19.0.0-rc",\n        "react-dom": "^16.8 || ^17 || ^18 || ^19 || ^19.0.0-rc"\n      }\n    },\n    "node_modules/next/node_modules/postcss": {\n      "version": "8.5.23",\n      "resolved": "https://registry.npmmirror.com/postcss/-/postcss-8.5.23.tgz",\n      "integrity": "sha512-g50586zr4bZmwFiTlflMu8E0bDTb5I5gertgwAKmsdUlTQIhZtunzUlD1WSzwcVWPoAVpsrA6vlfCD7oXvRwgg==",\n      "funding": [\n        {\n          "type": "opencollective",\n          "url": "https://opencollective.com/postcss/"\n        },\n        {\n          "type": "tidelift",\n          "url": "https://tidelift.com/funding/github/npm/postcss"\n        },\n        {\n          "type": "github",\n          "url": "https://github.com/sponsors/ai"\n        }\n      ],\n      "license": "MIT",\n      "dependencies": {\n        "nanoid": "^3.3.16",\n        "picocolors": "^1.1.1",\n        "source-map-js": "^1.2.1"\n      },\n      "engines": {\n        "node": "^10 || ^12 || >=14"\n      }\n    },\n    "node_modules/parse-entities": {\n      "version": "4.0.2",\n      "resolved": "https://registry.npmmirror.com/parse-entities/-/parse-entities-4.0.2.tgz",\n      "integrity": "sha512-GG2AQYWoLgL877gQIKeRPGO1xF9+eG1ujIb5soS5gPvLQ1y2o8FL90w2QWNdf9I361Mpp7726c+lj3U0qK1uGw==",\n      "license": "MIT",\n      "dependencies": {\n        "@types/unist": "^2.0.0",\n        "character-entities-legacy": "^3.0.0",\n        "character-reference-invalid": "^2.0.0",\n        "decode-named-character-reference": "^1.0.0",\n        "is-alphanumerical": "^2.0.0",\n        "is-decimal": "^2.0.0",\n        "is-hexadecimal": "^2.0.0"\n      },\n      "funding": {\n        "type": "github",\n        "url": "https://github.com/sponsors/wooorm"\n      }\n    },\n    "node_modules/parse-entities/node_modules/@types/unist": {\n      "version": "2.0.11",\n      "resolved": "https://registry.npmmirror.com/@types/unist/-/unist-2.0.11.tgz",\n      "integrity": "sha512-CmBKiL6NNo/OqgmMn95Fk9Whlp2mtvIv+KNpQKN2F4SjvrEesubTRWGYSg+BnWZOnlCaSTU1sMpsBOzgbYhnsA==",\n      "license": "MIT"\n    },\n    "node_modules/parse5": {\n      "version": "7.3.0",\n      "resolved": "https://registry.npmmirror.com/parse5/-/parse5-7.3.0.tgz",\n      "integrity": "sha512-IInvU7fabl34qmi9gY8XOVxhYyMyuH2xUNpb2q8/Y+7552KlejkRvqvD19nMoUW/uQGGbqNpA6Tufu5FL5BZgw==",\n      "license": "MIT",\n      "dependencies": {\n        "entities": "^6.0.0"\n      },\n      "funding": {\n        "url": "https://github.com/inikulin/parse5?sponsor=1"\n      }\n    },\n    "node_modules/picocolors": {\n      "version": "1.1.1",\n      "resolved": "https://registry.npmmirror.com/picocolors/-/picocolors-1.1.1.tgz",\n      "integrity": "sha512-xceH2snhtb5M9liqDsmEw56le376mTZkEX/jEb/RxNFyegNul7eNslCXP9FDj/Lcu0X8KEyMceP2ntpaHrDEVA==",\n      "license": "ISC"\n    },\n    "node_modules/postcss": {\n      "version": "8.5.29",\n      "resolved": "https://registry.npmmirror.com/postcss/-/postcss-8.5.29.tgz",\n      "integrity": "sha512-49cGhUbXj8Qenv0iTMxA1cFBzxXoctpC9Ujd77t1WcbJIr6nF/eI7g/8MgxrYldFRuAXvja7xQRwavoW7kgrxQ==",\n      "dev": true,\n      "funding": [\n        {\n          "type": "opencollective",\n          "url": "https://opencollective.com/postcss/"\n        },\n        {\n          "type": "tidelift",\n          "url": "https://tidelift.com/funding/github/npm/postcss"\n        },\n        {\n          "type": "github",\n          "url": "https://github.com/sponsors/ai"\n        }\n      ],\n      "license": "MIT",\n      "dependencies": {\n        "nanoid": "^3.3.19",\n        "picocolors": "^1.1.1",\n        "source-map-js": "^1.2.2"\n      },\n      "engines": {\n        "node": "^10 || ^12 || >=14"\n      }\n    },\n    "node_modules/property-information": {\n      "version": "7.2.0",\n      "resolved": "https://registry.npmmirror.com/property-information/-/property-information-7.2.0.tgz",\n      "integrity": "sha512-IAtzIB6sUiWaJYrX9smp3V46pBGbBeLFRGdh25kg1334VcBlD8HzhPeNIWQH9zhGmo2itIe25EHt9dQP7G5hmg==",\n      "license": "MIT",\n      "funding": {\n        "type": "github",\n        "url": "https://github.com/sponsors/wooorm"\n      }\n    },\n    "node_modules/react": {\n      "version": "19.3.0",\n      "resolved": "https://registry.npmmirror.com/react/-/react-19.3.0.tgz",\n      "integrity": "sha512-E8LUcbtBWt20bbl2YoHfx4ZDBdxVTfOKtCZn9cDSJ4l6/nuoApcpIBcj47t2wZoVX8g2ZHuMHbiShgCR1T5Sog==",\n      "license": "MIT",\n      "engines": {\n        "node": ">=0.10.0"\n      }\n    },\n    "node_modules/react-dom": {\n      "version": "19.3.0",\n      "resolved": "https://registry.npmmirror.com/react-dom/-/react-dom-19.3.0.tgz",\n      "integrity": "sha512-JDk8dgif51OjFoDE70+OT9ICyYr+69HlmihNwp1+Nsfbna3t5sIiCa9ZJktDmQ4/1b/rn26hIAR2uYXDMr5r0Q==",\n      "license": "MIT",\n      "dependencies": {\n        "scheduler": "^0.28.0"\n      },\n      "peerDependencies": {\n        "react": "^19.3.0"\n      }\n    },\n    "node_modules/react-markdown": {\n      "version": "10.1.0",\n      "resolved": "https://registry.npmmirror.com/react-markdown/-/react-markdown-10.1.0.tgz",\n      "integrity": "sha512-qKxVopLT/TyA6BX3Ue5NwabOsAzm0Q7kAPwq6L+wWDwisYs7R8vZ0nRXqq6rkueboxpkjvLGU9fWifiX/ZZFxQ==",\n      "license": "MIT",\n      "dependencies": {\n        "@types/hast": "^3.0.0",\n        "@types/mdast": "^4.0.0",\n        "devlop": "^1.0.0",\n        "hast-util-to-jsx-runtime": "^2.0.0",\n        "html-url-attributes": "^3.0.0",\n        "mdast-util-to-hast": "^13.0.0",\n        "remark-parse": "^11.0.0",\n        "remark-rehype": "^11.0.0",\n        "unified": "^11.0.0",\n        "unist-util-visit": "^5.0.0",\n        "vfile": "^6.0.0"\n      },\n      "funding": {\n        "type": "opencollective",\n        "url": "https://opencollective.com/unified"\n      },\n      "peerDependencies": {\n        "@types/react": ">=18",\n        "react": ">=18"\n      }\n    },\n    "node_modules/react-remove-scroll": {\n      "version": "2.7.2",\n      "resolved": "https://registry.npmmirror.com/react-remove-scroll/-/react-remove-scroll-2.7.2.tgz",\n      "integrity": "sha512-Iqb9NjCCTt6Hf+vOdNIZGdTiH1QSqr27H/Ek9sv/a97gfueI/5h1s3yRi1nngzMUaOOToin5dI1dXKdXiF+u0Q==",\n      "license": "MIT",\n      "dependencies": {\n        "react-remove-scroll-bar": "^2.3.7",\n        "react-style-singleton": "^2.2.3",\n        "tslib": "^2.1.0",\n        "use-callback-ref": "^1.3.3",\n        "use-sidecar": "^1.1.3"\n      },\n      "engines": {\n        "node": ">=10"\n      },\n      "peerDependencies": {\n        "@types/react": "*",\n        "react": "^16.8.0 || ^17.0.0 || ^18.0.0 || ^19.0.0 || ^19.0.0-rc"\n      },\n      "peerDependenciesMeta": {\n        "@types/react": {\n          "optional": true\n        }\n      }\n    },\n    "node_modules/react-remove-scroll-bar": {\n      "version": "2.3.8",\n      "resolved": "https://registry.npmmirror.com/react-remove-scroll-bar/-/react-remove-scroll-bar-2.3.8.tgz",\n      "integrity": "sha512-9r+yi9+mgU33AKcj6IbT9oRCO78WriSj6t/cF8DWBZJ9aOGPOTEDvdUDz1FwKim7QXWwmHqtdHnRJfhAxEG46Q==",\n      "license": "MIT",\n      "dependencies": {\n        "react-style-singleton": "^2.2.2",\n        "tslib": "^2.0.0"\n      },\n      "engines": {\n        "node": ">=10"\n      },\n      "peerDependencies": {\n        "@types/react": "*",\n        "react": "^16.8.0 || ^17.0.0 || ^18.0.0 || ^19.0.0"\n      },\n      "peerDependenciesMeta": {\n        "@types/react": {\n          "optional": true\n        }\n      }\n    },\n    "node_modules/react-style-singleton": {\n      "version": "2.2.3",\n      "resolved": "https://registry.npmmirror.com/react-style-singleton/-/react-style-singleton-2.2.3.tgz",\n      "integrity": "sha512-b6jSvxvVnyptAiLjbkWLE/lOnR4lfTtDAl+eUC7RZy+QQWc6wRzIV2CE6xBuMmDxc2qIihtDCZD5NPOFl7fRBQ==",\n      "license": "MIT",\n      "dependencies": {\n        "get-nonce": "^1.0.0",\n        "tslib": "^2.0.0"\n      },\n      "engines": {\n        "node": ">=10"\n      },\n      "peerDependencies": {\n        "@types/react": "*",\n        "react": "^16.8.0 || ^17.0.0 || ^18.0.0 || ^19.0.0 || ^19.0.0-rc"\n      },\n      "peerDependenciesMeta": {\n        "@types/react": {\n          "optional": true\n        }\n      }\n    },\n    "node_modules/rehype-highlight": {\n      "version": "7.0.2",\n      "resolved": "https://registry.npmmirror.com/rehype-highlight/-/rehype-highlight-7.0.2.tgz",\n      "integrity": "sha512-k158pK7wdC2qL3M5NcZROZ2tR/l7zOzjxXd5VGdcfIyoijjQqpHd3JKtYSBDpDZ38UI2WJWuFAtkMDxmx5kstA==",\n      "license": "MIT",\n      "dependencies": {\n        "@types/hast": "^3.0.0",\n        "hast-util-to-text": "^4.0.0",\n        "lowlight": "^3.0.0",\n        "unist-util-visit": "^5.0.0",\n        "vfile": "^6.0.0"\n      },\n      "funding": {\n        "type": "opencollective",\n        "url": "https://opencollective.com/unified"\n      }\n    },\n    "node_modules/rehype-katex": {\n      "version": "7.0.1",\n      "resolved": "https://registry.npmmirror.com/rehype-katex/-/rehype-katex-7.0.1.tgz",\n      "integrity": "sha512-OiM2wrZ/wuhKkigASodFoo8wimG3H12LWQaH8qSPVJn9apWKFSH3YOCtbKpBorTVw/eI7cuT21XBbvwEswbIOA==",\n      "license": "MIT",\n      "dependencies": {\n        "@types/hast": "^3.0.0",\n        "@types/katex": "^0.16.0",\n        "hast-util-from-html-isomorphic": "^2.0.0",\n        "hast-util-to-text": "^4.0.0",\n        "katex": "^0.16.0",\n        "unist-util-visit-parents": "^6.0.0",\n        "vfile": "^6.0.0"\n      },\n      "funding": {\n        "type": "opencollective",\n        "url": "https://opencollective.com/unified"\n      }\n    },\n    "node_modules/rehype-raw": {\n      "version": "7.0.0",\n      "resolved": "https://registry.npmmirror.com/rehype-raw/-/rehype-raw-7.0.0.tgz",\n      "integrity": "sha512-/aE8hCfKlQeA8LmyeyQvQF3eBiLRGNlfBJEvWH7ivp9sBqs7TNqBL5X3v157rM4IFETqDnIOO+z5M/biZbo9Ww==",\n      "license": "MIT",\n      "dependencies": {\n        "@types/hast": "^3.0.0",\n        "hast-util-raw": "^9.0.0",\n        "vfile": "^6.0.0"\n      },\n      "funding": {\n        "type": "opencollective",\n        "url": "https://opencollective.com/unified"\n      }\n    },\n    "node_modules/remark-gfm": {\n      "version": "4.0.1",\n      "resolved": "https://registry.npmmirror.com/remark-gfm/-/remark-gfm-4.0.1.tgz",\n      "integrity": "sha512-1quofZ2RQ9EWdeN34S79+KExV1764+wCUGop5CPL1WGdD0ocPpu91lzPGbwWMECpEpd42kJGQwzRfyov9j4yNg==",\n      "license": "MIT",\n      "dependencies": {\n        "@types/mdast": "^4.0.0",\n        "mdast-util-gfm": "^3.0.0",\n        "micromark-extension-gfm": "^3.0.0",\n        "remark-parse": "^11.0.0",\n        "remark-stringify": "^11.0.0",\n        "unified": "^11.0.0"\n      },\n      "funding": {\n        "type": "opencollective",\n        "url": "https://opencollective.com/unified"\n      }\n    },\n    "node_modules/remark-math": {\n      "version": "6.0.0",\n      "resolved": "https://registry.npmmirror.com/remark-math/-/remark-math-6.0.0.tgz",\n      "integrity": "sha512-MMqgnP74Igy+S3WwnhQ7kqGlEerTETXMvJhrUzDikVZ2/uogJCb+WHUg97hK9/jcfc0dkD73s3LN8zU49cTEtA==",\n      "license": "MIT",\n      "dependencies": {\n        "@types/mdast": "^4.0.0",\n        "mdast-util-math": "^3.0.0",\n        "micromark-extension-math": "^3.0.0",\n        "unified": "^11.0.0"\n      },\n      "funding": {\n        "type": "opencollective",\n        "url": "https://opencollective.com/unified"\n      }\n    },\n    "node_modules/remark-parse": {\n      "version": "11.0.0",\n      "resolved": "https://registry.npmmirror.com/remark-parse/-/remark-parse-11.0.0.tgz",\n      "integrity": "sha512-FCxlKLNGknS5ba/1lmpYijMUzX2esxW5xQqjWxw2eHFfS2MSdaHVINFmhjo+qN1WhZhNimq0dZATN9pH0IDrpA==",\n      "license": "MIT",\n      "dependencies": {\n        "@types/mdast": "^4.0.0",\n        "mdast-util-from-markdown": "^2.0.0",\n        "micromark-util-types": "^2.0.0",\n        "unified": "^11.0.0"\n      },\n      "funding": {\n        "type": "opencollective",\n        "url": "https://opencollective.com/unified"\n      }\n    },\n    "node_modules/remark-rehype": {\n      "version": "11.1.2",\n      "resolved": "https://registry.npmmirror.com/remark-rehype/-/remark-rehype-11.1.2.tgz",\n      "integrity": "sha512-Dh7l57ianaEoIpzbp0PC9UKAdCSVklD8E5Rpw7ETfbTl3FqcOOgq5q2LVDhgGCkaBv7p24JXikPdvhhmHvKMsw==",\n      "license": "MIT",\n      "dependencies": {\n        "@types/hast": "^3.0.0",\n        "@types/mdast": "^4.0.0",\n        "mdast-util-to-hast": "^13.0.0",\n        "unified": "^11.0.0",\n        "vfile": "^6.0.0"\n      },\n      "funding": {\n        "type": "opencollective",\n        "url": "https://opencollective.com/unified"\n      }\n    },\n    "node_modules/remark-stringify": {\n      "version": "11.0.0",\n      "resolved": "https://registry.npmmirror.com/remark-stringify/-/remark-stringify-11.0.0.tgz",\n      "integrity": "sha512-1OSmLd3awB/t8qdoEOMazZkNsfVTeY4fTsgzcQFdXNq8ToTN4ZGwrMnlda4K6smTFKD+GRV6O48i6Z4iKgPPpw==",\n      "license": "MIT",\n      "dependencies": {\n        "@types/mdast": "^4.0.0",\n        "mdast-util-to-markdown": "^2.0.0",\n        "unified": "^11.0.0"\n      },\n      "funding": {\n        "type": "opencollective",\n        "url": "https://opencollective.com/unified"\n      }\n    },\n    "node_modules/scheduler": {\n      "version": "0.28.0",\n      "resolved": "https://registry.npmmirror.com/scheduler/-/scheduler-0.28.0.tgz",\n      "integrity": "sha512-juorfCmIkIw8tT+p5BXSm6PJjQF/ycEYmKyzURCIt/RaZIhL+PulbQ9Yu2z1HdOJDdqDTlxA1+xKBmHXJsczAw==",\n      "license": "MIT"\n    },\n    "node_modules/section-matter": {\n      "version": "1.0.0",\n      "resolved": "https://registry.npmmirror.com/section-matter/-/section-matter-1.0.0.tgz",\n      "integrity": "sha512-vfD3pmTzGpufjScBh50YHKzEu2lxBWhVEHsNGoEXmCmn2hKGfeNLYMzCJpe8cD7gqX7TJluOVpBkAequ6dgMmA==",\n      "license": "MIT",\n      "dependencies": {\n        "extend-shallow": "^2.0.1",\n        "kind-of": "^6.0.0"\n      },\n      "engines": {\n        "node": ">=4"\n      }\n    },\n    "node_modules/semver": {\n      "version": "7.8.5",\n      "resolved": "https://registry.npmmirror.com/semver/-/semver-7.8.5.tgz",\n      "integrity": "sha512-Y7/KDsb8LjooZpwaqGyulO6DQlksgCncchHGk+sZIY4SBvUocMBEFH5Ur1fI4dV+Jvl0w6cjvucaIi40puRioA==",\n      "license": "ISC",\n      "optional": true,\n      "bin": {\n        "semver": "bin/semver.js"\n      },\n      "engines": {\n        "node": ">=10"\n      }\n    },\n    "node_modules/sharp": {\n      "version": "0.35.5",\n      "resolved": "https://registry.npmmirror.com/sharp/-/sharp-0.35.5.tgz",\n      "integrity": "sha512-Ywn4OnzGukp7CDMrp08RQ50YKmuwG47brZgIVPTvBaaAfQlRlygrRqSrxdCiL9M+LlzLBiJ68IR1QqvzHyjC7g==",\n      "license": "Apache-2.0",\n      "optional": true,\n      "dependencies": {\n        "@img/colour": "^1.1.0",\n        "detect-libc": "^2.1.2",\n        "semver": "^7.8.5"\n      },\n      "engines": {\n        "node": ">=20.9.0"\n      },\n      "funding": {\n        "url": "https://opencollective.com/libvips"\n      },\n      "optionalDependencies": {\n        "@img/sharp-darwin-arm64": "0.35.5",\n        "@img/sharp-darwin-x64": "0.35.5",\n        "@img/sharp-freebsd-wasm32": "0.35.5",\n        "@img/sharp-libvips-darwin-arm64": "1.3.4",\n        "@img/sharp-libvips-darwin-x64": "1.3.4",\n        "@img/sharp-libvips-linux-arm": "1.3.4",\n        "@img/sharp-libvips-linux-arm64": "1.3.4",\n        "@img/sharp-libvips-linux-ppc64": "1.3.4",\n        "@img/sharp-libvips-linux-riscv64": "1.3.4",\n        "@img/sharp-libvips-linux-s390x": "1.3.4",\n        "@img/sharp-libvips-linux-x64": "1.3.4",\n        "@img/sharp-libvips-linuxmusl-arm64": "1.3.4",\n        "@img/sharp-libvips-linuxmusl-x64": "1.3.4",\n        "@img/sharp-linux-arm": "0.35.5",\n        "@img/sharp-linux-arm64": "0.35.5",\n        "@img/sharp-linux-ppc64": "0.35.5",\n        "@img/sharp-linux-riscv64": "0.35.5",\n        "@img/sharp-linux-s390x": "0.35.5",\n        "@img/sharp-linux-x64": "0.35.5",\n        "@img/sharp-linuxmusl-arm64": "0.35.5",\n        "@img/sharp-linuxmusl-x64": "0.35.5",\n        "@img/sharp-webcontainers-wasm32": "0.35.5",\n        "@img/sharp-win32-arm64": "0.35.5",\n        "@img/sharp-win32-ia32": "0.35.5",\n        "@img/sharp-win32-x64": "0.35.5"\n      },\n      "peerDependenciesMeta": {\n        "@types/node": {\n          "optional": true\n        }\n      }\n    },\n    "node_modules/sonner": {\n      "version": "2.0.8",\n      "resolved": "https://registry.npmmirror.com/sonner/-/sonner-2.0.8.tgz",\n      "integrity": "sha512-UM/ByIoFra8yzV75n1o0Puu0bw5U/9UNnDacrJNspekBewIfsQ3D6ez1nvlWpt7aTsO6rujQtifBpycwIivqlg==",\n      "license": "MIT",\n      "peerDependencies": {\n        "@types/react": "^18.0.0 || ^19.0.0",\n        "react": "^18.0.0 || ^19.0.0 || ^19.0.0-rc",\n        "react-dom": "^18.0.0 || ^19.0.0 || ^19.0.0-rc"\n      },\n      "peerDependenciesMeta": {\n        "@types/react": {\n          "optional": true\n        }\n      }\n    },\n    "node_modules/source-map-js": {\n      "version": "1.2.2",\n      "resolved": "https://registry.npmmirror.com/source-map-js/-/source-map-js-1.2.2.tgz",\n      "integrity": "sha512-KGj/8Y43x35aZVDtt+J4mK1hoLGHULMYfSkODJNQjNDC3oW1PqPoxMwo0pLUsWM/UEGzON/NxeHywEfNXNP3Vw==",\n      "license": "BSD-3-Clause",\n      "engines": {\n        "node": ">=0.10.0"\n      }\n    },\n    "node_modules/space-separated-tokens": {\n      "version": "2.0.2",\n      "resolved": "https://registry.npmmirror.com/space-separated-tokens/-/space-separated-tokens-2.0.2.tgz",\n      "integrity": "sha512-PEGlAwrG8yXGXRjW32fGbg66JAlOAwbObuqVoJpv/mRgoWDQfgH1wDPvtzWyUSNAXBGSk8h755YDbbcEy3SH2Q==",\n      "license": "MIT",\n      "funding": {\n        "type": "github",\n        "url": "https://github.com/sponsors/wooorm"\n      }\n    },\n    "node_modules/sprintf-js": {\n      "version": "1.0.3",\n      "resolved": "https://registry.npmmirror.com/sprintf-js/-/sprintf-js-1.0.3.tgz",\n      "integrity": "sha512-D9cPgkvLlV3t3IzL0D0YLvGA9Ahk4PcvVwUbN0dSGr1aP0Nrt4AEnTUbuGvquEC0mA64Gqt1fzirlRs5ibXx8g==",\n      "license": "BSD-3-Clause"\n    },\n    "node_modules/stringify-entities": {\n      "version": "4.0.4",\n      "resolved": "https://registry.npmmirror.com/stringify-entities/-/stringify-entities-4.0.4.tgz",\n      "integrity": "sha512-IwfBptatlO+QCJUo19AqvrPNqlVMpW9YEL2LIVY+Rpv2qsjCGxaDLNRgeGsQWJhfItebuJhsGSLjaBbNSQ+ieg==",\n      "license": "MIT",\n      "dependencies": {\n        "character-entities-html4": "^2.0.0",\n        "character-entities-legacy": "^3.0.0"\n      },\n      "funding": {\n        "type": "github",\n        "url": "https://github.com/sponsors/wooorm"\n      }\n    },\n    "node_modules/strip-bom-string": {\n      "version": "1.0.0",\n      "resolved": "https://registry.npmmirror.com/strip-bom-string/-/strip-bom-string-1.0.0.tgz",\n      "integrity": "sha512-uCC2VHvQRYu+lMh4My/sFNmF2klFymLX1wHJeXnbEJERpV/ZsVuonzerjfrGpIGF7LBVa1O7i9kjiWvJiFck8g==",\n      "license": "MIT",\n      "engines": {\n        "node": ">=0.10.0"\n      }\n    },\n    "node_modules/style-to-js": {\n      "version": "1.1.21",\n      "resolved": "https://registry.npmmirror.com/style-to-js/-/style-to-js-1.1.21.tgz",\n      "integrity": "sha512-RjQetxJrrUJLQPHbLku6U/ocGtzyjbJMP9lCNK7Ag0CNh690nSH8woqWH9u16nMjYBAok+i7JO1NP2pOy8IsPQ==",\n      "license": "MIT",\n      "dependencies": {\n        "style-to-object": "1.0.14"\n      }\n    },\n    "node_modules/style-to-object": {\n      "version": "1.0.14",\n      "resolved": "https://registry.npmmirror.com/style-to-object/-/style-to-object-1.0.14.tgz",\n      "integrity": "sha512-LIN7rULI0jBscWQYaSswptyderlarFkjQ+t79nzty8tcIAceVomEVlLzH5VP4Cmsv6MtKhs7qaAiwlcp+Mgaxw==",\n      "license": "MIT",\n      "dependencies": {\n        "inline-style-parser": "0.2.7"\n      }\n    },\n    "node_modules/styled-jsx": {\n      "version": "5.1.6",\n      "resolved": "https://registry.npmmirror.com/styled-jsx/-/styled-jsx-5.1.6.tgz",\n      "integrity": "sha512-qSVyDTeMotdvQYoHWLNGwRFJHC+i+ZvdBRYosOFgC+Wg1vx4frN2/RG/NA7SYqqvKNLf39P2LSRA2pu6n0XYZA==",\n      "license": "MIT",\n      "dependencies": {\n        "client-only": "0.0.1"\n      },\n      "engines": {\n        "node": ">= 12.0.0"\n      },\n      "peerDependencies": {\n        "react": ">= 16.8.0 || 17.x.x || ^18.0.0-0 || ^19.0.0-0"\n      },\n      "peerDependenciesMeta": {\n        "@babel/core": {\n          "optional": true\n        },\n        "babel-plugin-macros": {\n          "optional": true\n        }\n      }\n    },\n    "node_modules/tailwind-merge": {\n      "version": "3.7.0",\n      "resolved": "https://registry.npmmirror.com/tailwind-merge/-/tailwind-merge-3.7.0.tgz",\n      "integrity": "sha512-XPPUyAc+cvspz3lHTcR/QgPfW2A0lv/xQNIjX3HGhLR+Nq2lHaLq5MtTesHn8GUr3W3DguT2KT5x3NVgRtYwmA==",\n      "license": "MIT",\n      "funding": {\n        "type": "github",\n        "url": "https://github.com/sponsors/dcastil"\n      }\n    },\n    "node_modules/tailwindcss": {\n      "version": "4.3.3",\n      "resolved": "https://registry.npmmirror.com/tailwindcss/-/tailwindcss-4.3.3.tgz",\n      "integrity": "sha512-gOhV3P7ufE62QDGg1zVaTgCR+EtPv92k2nIhVcVKcLmxT1sUBsQGhnZj175j+MqRt4zLF7ic+sCYjfhxMxj7YQ==",\n      "dev": true,\n      "license": "MIT"\n    },\n    "node_modules/tapable": {\n      "version": "2.3.3",\n      "resolved": "https://registry.npmmirror.com/tapable/-/tapable-2.3.3.tgz",\n      "integrity": "sha512-uxc/zpqFg6x7C8vOE7lh6Lbda8eEL9zmVm/PLeTPBRhh1xCgdWaQ+J1CUieGpIfm2HdtsUpRv+HshiasBMcc6A==",\n      "dev": true,\n      "license": "MIT",\n      "engines": {\n        "node": ">=6"\n      },\n      "funding": {\n        "type": "opencollective",\n        "url": "https://opencollective.com/webpack"\n      }\n    },\n    "node_modules/trim-lines": {\n      "version": "3.0.1",\n      "resolved": "https://registry.npmmirror.com/trim-lines/-/trim-lines-3.0.1.tgz",\n      "integrity": "sha512-kRj8B+YHZCc9kQYdWfJB2/oUl9rA99qbowYYBtr4ui4mZyAQ2JpvVBd/6U2YloATfqBhBTSMhTpgBHtU0Mf3Rg==",\n      "license": "MIT",\n      "funding": {\n        "type": "github",\n        "url": "https://github.com/sponsors/wooorm"\n      }\n    },\n    "node_modules/trough": {\n      "version": "2.2.0",\n      "resolved": "https://registry.npmmirror.com/trough/-/trough-2.2.0.tgz",\n      "integrity": "sha512-tmMpK00BjZiUyVyvrBK7knerNgmgvcV/KLVyuma/SC+TQN167GrMRciANTz09+k3zW8L8t60jWO1GpfkZdjTaw==",\n      "license": "MIT",\n      "funding": {\n        "type": "github",\n        "url": "https://github.com/sponsors/wooorm"\n      }\n    },\n    "node_modules/tslib": {\n      "version": "2.8.1",\n      "resolved": "https://registry.npmmirror.com/tslib/-/tslib-2.8.1.tgz",\n      "integrity": "sha512-oJFu94HQb+KVduSUQL7wnpmqnfmLsOA/nAh6b6EH0wCEoK0/mPeXU6c3wKDV83MkOuHPRHtSXKKU99IBazS/2w==",\n      "license": "0BSD"\n    },\n    "node_modules/tw-animate-css": {\n      "version": "1.4.0",\n      "resolved": "https://registry.npmmirror.com/tw-animate-css/-/tw-animate-css-1.4.0.tgz",\n      "integrity": "sha512-7bziOlRqH0hJx80h/3mbicLW7o8qLsH5+RaLR2t+OHM3D0JlWGODQKQ4cxbK7WlvmUxpcj6Kgu6EKqjrGFe3QQ==",\n      "dev": true,\n      "license": "MIT",\n      "funding": {\n        "url": "https://github.com/sponsors/Wombosvideo"\n      }\n    },\n    "node_modules/typescript": {\n      "version": "5.9.3",\n      "resolved": "https://registry.npmmirror.com/typescript/-/typescript-5.9.3.tgz",\n      "integrity": "sha512-jl1vZzPDinLr9eUt3J/t7V6FgNEw9QjvBPdysz9KfQDD41fQrC2Y4vKQdiaUpFT4bXlb1RHhLpp8wtm6M5TgSw==",\n      "dev": true,\n      "license": "Apache-2.0",\n      "bin": {\n        "tsc": "bin/tsc",\n        "tsserver": "bin/tsserver"\n      },\n      "engines": {\n        "node": ">=14.17"\n      }\n    },\n    "node_modules/undici-types": {\n      "version": "6.21.0",\n      "resolved": "https://registry.npmmirror.com/undici-types/-/undici-types-6.21.0.tgz",\n      "integrity": "sha512-iwDZqg0QAGrg9Rav5H4n0M64c3mkR59cJ6wQp+7C4nI0gsmExaedaYLNO44eT4AtBBwjbTiGPMlt2Md0T9H9JQ==",\n      "dev": true,\n      "license": "MIT"\n    },\n    "node_modules/unified": {\n      "version": "11.0.5",\n      "resolved": "https://registry.npmmirror.com/unified/-/unified-11.0.5.tgz",\n      "integrity": "sha512-xKvGhPWw3k84Qjh8bI3ZeJjqnyadK+GEFtazSfZv/rKeTkTjOJho6mFqh2SM96iIcZokxiOpg78GazTSg8+KHA==",\n      "license": "MIT",\n      "dependencies": {\n        "@types/unist": "^3.0.0",\n        "bail": "^2.0.0",\n        "devlop": "^1.0.0",\n        "extend": "^3.0.0",\n        "is-plain-obj": "^4.0.0",\n        "trough": "^2.0.0",\n        "vfile": "^6.0.0"\n      },\n      "funding": {\n        "type": "opencollective",\n        "url": "https://opencollective.com/unified"\n      }\n    },\n    "node_modules/unist-util-find-after": {\n      "version": "5.0.0",\n      "resolved": "https://registry.npmmirror.com/unist-util-find-after/-/unist-util-find-after-5.0.0.tgz",\n      "integrity": "sha512-amQa0Ep2m6hE2g72AugUItjbuM8X8cGQnFoHk0pGfrFeT9GZhzN5SW8nRsiGKK7Aif4CrACPENkA6P/Lw6fHGQ==",\n      "license": "MIT",\n      "dependencies": {\n        "@types/unist": "^3.0.0",\n        "unist-util-is": "^6.0.0"\n      },\n      "funding": {\n        "type": "opencollective",\n        "url": "https://opencollective.com/unified"\n      }\n    },\n    "node_modules/unist-util-is": {\n      "version": "6.0.1",\n      "resolved": "https://registry.npmmirror.com/unist-util-is/-/unist-util-is-6.0.1.tgz",\n      "integrity": "sha512-LsiILbtBETkDz8I9p1dQ0uyRUWuaQzd/cuEeS1hoRSyW5E5XGmTzlwY1OrNzzakGowI9Dr/I8HVaw4hTtnxy8g==",\n      "license": "MIT",\n      "dependencies": {\n        "@types/unist": "^3.0.0"\n      },\n      "funding": {\n        "type": "opencollective",\n        "url": "https://opencollective.com/unified"\n      }\n    },\n    "node_modules/unist-util-position": {\n      "version": "5.0.0",\n      "resolved": "https://registry.npmmirror.com/unist-util-position/-/unist-util-position-5.0.0.tgz",\n      "integrity": "sha512-fucsC7HjXvkB5R3kTCO7kUjRdrS0BJt3M/FPxmHMBOm8JQi2BsHAHFsy27E0EolP8rp0NzXsJ+jNPyDWvOJZPA==",\n      "license": "MIT",\n      "dependencies": {\n        "@types/unist": "^3.0.0"\n      },\n      "funding": {\n        "type": "opencollective",\n        "url": "https://opencollective.com/unified"\n      }\n    },\n    "node_modules/unist-util-remove-position": {\n      "version": "5.0.0",\n      "resolved": "https://registry.npmmirror.com/unist-util-remove-position/-/unist-util-remove-position-5.0.0.tgz",\n      "integrity": "sha512-Hp5Kh3wLxv0PHj9m2yZhhLt58KzPtEYKQQ4yxfYFEO7EvHwzyDYnduhHnY1mDxoqr7VUwVuHXk9RXKIiYS1N8Q==",\n      "license": "MIT",\n      "dependencies": {\n        "@types/unist": "^3.0.0",\n        "unist-util-visit": "^5.0.0"\n      },\n      "funding": {\n        "type": "opencollective",\n        "url": "https://opencollective.com/unified"\n      }\n    },\n    "node_modules/unist-util-stringify-position": {\n      "version": "4.0.0",\n      "resolved": "https://registry.npmmirror.com/unist-util-stringify-position/-/unist-util-stringify-position-4.0.0.tgz",\n      "integrity": "sha512-0ASV06AAoKCDkS2+xw5RXJywruurpbC4JZSm7nr7MOt1ojAzvyyaO+UxZf18j8FCF6kmzCZKcAgN/yu2gm2XgQ==",\n      "license": "MIT",\n      "dependencies": {\n        "@types/unist": "^3.0.0"\n      },\n      "funding": {\n        "type": "opencollective",\n        "url": "https://opencollective.com/unified"\n      }\n    },\n    "node_modules/unist-util-visit": {\n      "version": "5.1.0",\n      "resolved": "https://registry.npmmirror.com/unist-util-visit/-/unist-util-visit-5.1.0.tgz",\n      "integrity": "sha512-m+vIdyeCOpdr/QeQCu2EzxX/ohgS8KbnPDgFni4dQsfSCtpz8UqDyY5GjRru8PDKuYn7Fq19j1CQ+nJSsGKOzg==",\n      "license": "MIT",\n      "dependencies": {\n        "@types/unist": "^3.0.0",\n        "unist-util-is": "^6.0.0",\n        "unist-util-visit-parents": "^6.0.0"\n      },\n      "funding": {\n        "type": "opencollective",\n        "url": "https://opencollective.com/unified"\n      }\n    },\n    "node_modules/unist-util-visit-parents": {\n      "version": "6.0.2",\n      "resolved": "https://registry.npmmirror.com/unist-util-visit-parents/-/unist-util-visit-parents-6.0.2.tgz",\n      "integrity": "sha512-goh1s1TBrqSqukSc8wrjwWhL0hiJxgA8m4kFxGlQ+8FYQ3C/m11FcTs4YYem7V664AhHVvgoQLk890Ssdsr2IQ==",\n      "license": "MIT",\n      "dependencies": {\n        "@types/unist": "^3.0.0",\n        "unist-util-is": "^6.0.0"\n      },\n      "funding": {\n        "type": "opencollective",\n        "url": "https://opencollective.com/unified"\n      }\n    },\n    "node_modules/use-callback-ref": {\n      "version": "1.3.3",\n      "resolved": "https://registry.npmmirror.com/use-callback-ref/-/use-callback-ref-1.3.3.tgz",\n      "integrity": "sha512-jQL3lRnocaFtu3V00JToYz/4QkNWswxijDaCVNZRiRTO3HQDLsdu1ZtmIUvV4yPp+rvWm5j0y0TG/S61cuijTg==",\n      "license": "MIT",\n      "dependencies": {\n        "tslib": "^2.0.0"\n      },\n      "engines": {\n        "node": ">=10"\n      },\n      "peerDependencies": {\n        "@types/react": "*",\n        "react": "^16.8.0 || ^17.0.0 || ^18.0.0 || ^19.0.0 || ^19.0.0-rc"\n      },\n      "peerDependenciesMeta": {\n        "@types/react": {\n          "optional": true\n        }\n      }\n    },\n    "node_modules/use-sidecar": {\n      "version": "1.1.3",\n      "resolved": "https://registry.npmmirror.com/use-sidecar/-/use-sidecar-1.1.3.tgz",\n      "integrity": "sha512-Fedw0aZvkhynoPYlA5WXrMCAMm+nSWdZt6lzJQ7Ok8S6Q+VsHmHpRWndVRJ8Be0ZbkfPc5LRYH+5XrzXcEeLRQ==",\n      "license": "MIT",\n      "dependencies": {\n        "detect-node-es": "^1.1.0",\n        "tslib": "^2.0.0"\n      },\n      "engines": {\n        "node": ">=10"\n      },\n      "peerDependencies": {\n        "@types/react": "*",\n        "react": "^16.8.0 || ^17.0.0 || ^18.0.0 || ^19.0.0 || ^19.0.0-rc"\n      },\n      "peerDependenciesMeta": {\n        "@types/react": {\n          "optional": true\n        }\n      }\n    },\n    "node_modules/vfile": {\n      "version": "6.0.3",\n      "resolved": "https://registry.npmmirror.com/vfile/-/vfile-6.0.3.tgz",\n      "integrity": "sha512-KzIbH/9tXat2u30jf+smMwFCsno4wHVdNmzFyL+T/L3UGqqk6JKfVqOFOZEpZSHADH1k40ab6NUIXZq422ov3Q==",\n      "license": "MIT",\n      "dependencies": {\n        "@types/unist": "^3.0.0",\n        "vfile-message": "^4.0.0"\n      },\n      "funding": {\n        "type": "opencollective",\n        "url": "https://opencollective.com/unified"\n      }\n    },\n    "node_modules/vfile-location": {\n      "version": "5.0.3",\n      "resolved": "https://registry.npmmirror.com/vfile-location/-/vfile-location-5.0.3.tgz",\n      "integrity": "sha512-5yXvWDEgqeiYiBe1lbxYF7UMAIm/IcopxMHrMQDq3nvKcjPKIhZklUKL+AE7J7uApI4kwe2snsK+eI6UTj9EHg==",\n      "license": "MIT",\n      "dependencies": {\n        "@types/unist": "^3.0.0",\n        "vfile": "^6.0.0"\n      },\n      "funding": {\n        "type": "opencollective",\n        "url": "https://opencollective.com/unified"\n      }\n    },\n    "node_modules/vfile-message": {\n      "version": "4.0.3",\n      "resolved": "https://registry.npmmirror.com/vfile-message/-/vfile-message-4.0.3.tgz",\n      "integrity": "sha512-QTHzsGd1EhbZs4AsQ20JX1rC3cOlt/IWJruk893DfLRr57lcnOeMaWG4K0JrRta4mIJZKth2Au3mM3u03/JWKw==",\n      "license": "MIT",\n      "dependencies": {\n        "@types/unist": "^3.0.0",\n        "unist-util-stringify-position": "^4.0.0"\n      },\n      "funding": {\n        "type": "opencollective",\n        "url": "https://opencollective.com/unified"\n      }\n    },\n    "node_modules/web-namespaces": {\n      "version": "2.0.1",\n      "resolved": "https://registry.npmmirror.com/web-namespaces/-/web-namespaces-2.0.1.tgz",\n      "integrity": "sha512-bKr1DkiNa2krS7qxNtdrtHAmzuYGFQLiQ13TsorsdT6ULTkPLKuu5+GsFpDlg6JFjUTwX2DyhMPG2be8uPrqsQ==",\n      "license": "MIT",\n      "funding": {\n        "type": "github",\n        "url": "https://github.com/sponsors/wooorm"\n      }\n    },\n    "node_modules/zustand": {\n      "version": "5.0.15",\n      "resolved": "https://registry.npmmirror.com/zustand/-/zustand-5.0.15.tgz",\n      "integrity": "sha512-MpSEjRiBkA9crSYeOUH32rJC7SVqAbm0Fqcqge/bUi2PPoLcBWKOsG+C8mevmpr8TwXHBVkChbbJiyvkE+i/3A==",\n      "license": "MIT",\n      "engines": {\n        "node": ">=12.20.0"\n      },\n      "peerDependencies": {\n        "@types/react": ">=18.0.0",\n        "immer": ">=9.0.6",\n        "react": ">=18.0.0",\n        "use-sync-external-store": ">=1.2.0"\n      },\n      "peerDependenciesMeta": {\n        "@types/react": {\n          "optional": true\n        },\n        "immer": {\n          "optional": true\n        },\n        "react": {\n          "optional": true\n        },\n        "use-sync-external-store": {\n          "optional": true\n        }\n      }\n    },\n    "node_modules/zwitch": {\n      "version": "2.0.4",\n      "resolved": "https://registry.npmmirror.com/zwitch/-/zwitch-2.0.4.tgz",\n      "integrity": "sha512-bXE4cR/kVZhKZX/RjPEflHaKVhUVl85noU3v6b8apfQEc1x4A+zBxjZ4lN8LqGd6WZ3dl98pY4o717VFmoPp+A==",\n      "license": "MIT",\n      "funding": {\n        "type": "github",\n        "url": "https://github.com/sponsors/wooorm"\n      }\n    }\n  }\n}\n' }, "next.config.ts": { "t": "utf8", "v": `import type { NextConfig } from 'next'

// GitHub Pages \u9879\u76EE\u7AD9\u90E8\u7F72\u65F6\uFF0C\u6784\u5EFA\u524D\u8BBE\u7F6E NEXT_PUBLIC_BASE_PATH=/<\u4ED3\u5E93\u540D>
const basePath = process.env.NEXT_PUBLIC_BASE_PATH || ''

const nextConfig: NextConfig = {
  output: 'export',
  basePath,
  images: { unoptimized: true },
  trailingSlash: false,
  // \u5173\u95ED\u5F00\u53D1\u73AF\u5883\u5DE6\u4E0B\u89D2\u7684 Next.js \u5706\u6807\uFF08\u70B9\u51FB Hide \u540E\u5B83\u4F1A\u6D88\u5931\u4E14\u65E0\u6CD5\u627E\u56DE\uFF0C\u9020\u6210"\u5361\u6B7B"\u9519\u89C9\uFF09
  devIndicators: false,
}

export default nextConfig
` }, "postcss.config.mjs": { "t": "utf8", "v": "const config = {\n  plugins: ['@tailwindcss/postcss'],\n}\n\nexport default config\n" }, "components.json": { "t": "utf8", "v": '{\n  "$schema": "https://ui.shadcn.com/schema.json",\n  "style": "new-york",\n  "rsc": true,\n  "tsx": true,\n  "tailwind": {\n    "config": "",\n    "css": "src/app/globals.css",\n    "baseColor": "neutral",\n    "cssVariables": true,\n    "prefix": ""\n  },\n  "aliases": {\n    "components": "@/components",\n    "utils": "@/lib/utils",\n    "ui": "@/components/ui",\n    "lib": "@/lib",\n    "hooks": "@/hooks"\n  },\n  "iconLibrary": "lucide"\n}\n' }, "tsconfig.json": { "t": "utf8", "v": '{\n  "compilerOptions": {\n    "target": "ES2022",\n    "lib": [\n      "dom",\n      "dom.iterable",\n      "esnext"\n    ],\n    "allowJs": true,\n    "skipLibCheck": true,\n    "strict": true,\n    "noEmit": true,\n    "esModuleInterop": true,\n    "module": "esnext",\n    "moduleResolution": "bundler",\n    "resolveJsonModule": true,\n    "isolatedModules": true,\n    "jsx": "react-jsx",\n    "incremental": true,\n    "plugins": [\n      {\n        "name": "next"\n      }\n    ],\n    "paths": {\n      "@/*": [\n        "./src/*"\n      ]\n    }\n  },\n  "include": [\n    "next-env.d.ts",\n    "**/*.ts",\n    "**/*.tsx",\n    ".next/types/**/*.ts",\n    ".next/dev/types/**/*.ts"\n  ],\n  "exclude": [\n    "node_modules",\n    "repos"\n  ]\n}\n' }, "src/app/globals.css": { "t": "utf8", "v": `@import "tailwindcss";
@import "tw-animate-css";

@custom-variant dark (&:is(.dark *));

@theme inline {
  --color-background: var(--background);
  --color-foreground: var(--foreground);
  --font-sans: var(--font-geist-sans);
  --font-mono: var(--font-geist-mono);
  --color-sidebar-ring: var(--sidebar-ring);
  --color-sidebar-border: var(--sidebar-border);
  --color-sidebar-accent-foreground: var(--sidebar-accent-foreground);
  --color-sidebar-accent: var(--sidebar-accent);
  --color-sidebar-primary-foreground: var(--sidebar-primary-foreground);
  --color-sidebar-primary: var(--sidebar-primary);
  --color-sidebar-foreground: var(--sidebar-foreground);
  --color-sidebar: var(--sidebar);
  --color-chart-5: var(--chart-5);
  --color-chart-4: var(--chart-4);
  --color-chart-3: var(--chart-3);
  --color-chart-2: var(--chart-2);
  --color-chart-1: var(--chart-1);
  --color-ring: var(--ring);
  --color-input: var(--input);
  --color-border: var(--border);
  --color-destructive: var(--destructive);
  --color-accent-foreground: var(--accent-foreground);
  --color-accent: var(--accent);
  --color-muted-foreground: var(--muted-foreground);
  --color-muted: var(--muted);
  --color-secondary-foreground: var(--secondary-foreground);
  --color-secondary: var(--secondary);
  --color-primary-foreground: var(--primary-foreground);
  --color-primary: var(--primary);
  --color-popover-foreground: var(--popover-foreground);
  --color-popover: var(--popover);
  --color-card-foreground: var(--card-foreground);
  --color-card: var(--card);
  --radius-sm: calc(var(--radius) - 4px);
  --radius-md: calc(var(--radius) - 2px);
  --radius-lg: var(--radius);
  --radius-xl: calc(var(--radius) + 4px);
}

:root {
  /* \u5185\u5BB9\u533A\u5BBD\u5EA6\uFF1A\u9876\u680F / \u6B63\u6587 / \u9875\u811A / \u9996\u9875\u5168\u90E8\u8BFB\u8FD9\u4E00\u4E2A\u503C\u3002
     \u7528\u6237\u8981\u6C42\u300C\u6240\u6709\u4E3B\u9898\uFF08\u542B\u9ED8\u8BA4\uFF09\u7EDF\u4E00\u6210\u540C\u4E00\u4E2A\u5BBD\u5EA6\uFF0C\u4E3B\u9898\u53EA\u6539\u989C\u8272\u3001\u7D20\u6750\u548C\u975E\u6B63\u6587\u754C\u9762\u7684\u6392\u5E03\u300D\uFF0C
     \u6240\u4EE5\u5BBD\u5EA6\u653E\u5728\u7AD9\u70B9\u4FA7\u7EDF\u4E00\u63A7\u5236\uFF0C\u4E3B\u9898\u6587\u4EF6\u91CC\u4E0D\u518D\u51FA\u73B0 max-width\u3002
     \u6539\u52A8\u8FD9\u4E00\u4E2A\u503C\u5C31\u80FD\u6574\u4F53\u52A0\u5BBD/\u6536\u7A84\uFF0C\u4E0D\u7528\u78B0\u7EC4\u4EF6\u3002 */
  --content-w: 78rem;

  /* \u6D45\u8272\u4E3B\u9898\u540C\u6837\u8D70\u84DD\u8272\u7CFB\uFF0C\u4E0E\u6DF1\u8272\uFF08\u84DD\u9ED1\uFF09\u548C\u7BA1\u7406\u5668\u4FDD\u6301\u540C\u4E00\u5957\u89C6\u89C9\u8BED\u8A00 */
  --radius: 0.625rem;
  --background: oklch(0.99 0.004 250);
  --foreground: oklch(0.19 0.021 257);
  --card: oklch(1 0 0);
  --card-foreground: oklch(0.19 0.021 257);
  --popover: oklch(1 0 0);
  --popover-foreground: oklch(0.19 0.021 257);
  --primary: oklch(0.55 0.16 256);
  --primary-foreground: oklch(0.985 0 0);
  --secondary: oklch(0.968 0.007 250);
  --secondary-foreground: oklch(0.24 0.024 257);
  --muted: oklch(0.968 0.007 250);
  --muted-foreground: oklch(0.53 0.019 255);
  --accent: oklch(0.955 0.014 252);
  --accent-foreground: oklch(0.24 0.024 257);
  --destructive: oklch(0.577 0.245 27.325);
  --border: oklch(0.916 0.008 253);
  --input: oklch(0.916 0.008 253);
  --ring: oklch(0.55 0.16 256 / 55%);
  --chart-1: oklch(0.58 0.17 256);
  --chart-2: oklch(0.62 0.13 200);
  --chart-3: oklch(0.52 0.15 275);
  --chart-4: oklch(0.68 0.15 230);
  --chart-5: oklch(0.56 0.17 300);
  --sidebar: oklch(0.975 0.006 250);
  --sidebar-foreground: oklch(0.19 0.021 257);
  --sidebar-primary: oklch(0.55 0.16 256);
  --sidebar-primary-foreground: oklch(0.985 0 0);
  --sidebar-accent: oklch(0.955 0.014 252);
  --sidebar-accent-foreground: oklch(0.24 0.024 257);
  --sidebar-border: oklch(0.916 0.008 253);
  --sidebar-ring: oklch(0.55 0.16 256 / 55%);
}

.dark {
  /* \u84DD\u9ED1\u914D\u8272\uFF1A\u5E95\u8272\u504F\u51B7\u84DD\uFF08hue 250-260\uFF09\uFF0C\u5C42\u6B21\u9760\u660E\u5EA6\u9012\u8FDB\uFF0C\u5F3A\u8C03\u8272\u7528\u4EAE\u84DD */
  --background: oklch(0.17 0.022 256);
  --foreground: oklch(0.93 0.012 250);
  --card: oklch(0.216 0.026 256);
  --card-foreground: oklch(0.93 0.012 250);
  --popover: oklch(0.216 0.026 256);
  --popover-foreground: oklch(0.93 0.012 250);
  --primary: oklch(0.72 0.155 252);
  --primary-foreground: oklch(0.16 0.03 256);
  --secondary: oklch(0.272 0.028 256);
  --secondary-foreground: oklch(0.93 0.012 250);
  --muted: oklch(0.272 0.028 256);
  --muted-foreground: oklch(0.70 0.022 252);
  --accent: oklch(0.30 0.035 256);
  --accent-foreground: oklch(0.95 0.01 250);
  --destructive: oklch(0.70 0.17 22);
  --border: oklch(0.62 0.05 254 / 18%);
  --input: oklch(0.62 0.05 254 / 24%);
  --ring: oklch(0.66 0.12 252 / 70%);
  --chart-1: oklch(0.68 0.16 252);
  --chart-2: oklch(0.70 0.13 200);
  --chart-3: oklch(0.66 0.14 275);
  --chart-4: oklch(0.74 0.15 230);
  --chart-5: oklch(0.64 0.17 300);
  --sidebar: oklch(0.20 0.024 256);
  --sidebar-foreground: oklch(0.93 0.012 250);
  --sidebar-primary: oklch(0.72 0.155 252);
  --sidebar-primary-foreground: oklch(0.16 0.03 256);
  --sidebar-accent: oklch(0.272 0.028 256);
  --sidebar-accent-foreground: oklch(0.93 0.012 250);
  --sidebar-border: oklch(0.62 0.05 254 / 18%);
  --sidebar-ring: oklch(0.66 0.12 252 / 70%);
}

@layer base {
  * {
    @apply border-border outline-ring/50;
  }
  body {
    @apply bg-background text-foreground;
  }
}

/* ===== \u6570\u5B57\u82B1\u56ED \xB7 Obsidian \u535A\u5BA2\u81EA\u5B9A\u4E49\u6837\u5F0F ===== */

/* ---------- \u9605\u8BFB\u5B57\u53F7\uFF1A\u53EA\u7F29\u653E\u6587\u5B57\uFF0C\u4E0D\u52A8\u7248\u9762 ----------
   --site-fs \u7531\u53F3\u4E0B\u89D2\u5B57\u53F7\u63A7\u4EF6\u5199\u5165 <html>\uFF08\u89C1 src/lib/font-scale.ts\uFF09\u3002

   \u26A0\uFE0F \u8FD9\u91CC\u7EDD\u5BF9\u4E0D\u80FD\u6539\u6839\u5B57\u53F7\uFF08font-size on html\uFF09\u3002
   \u6839\u5B57\u53F7\u662F rem \u7684\u57FA\u51C6\uFF0C\u4E00\u6539\u5168\u7AD9\u6240\u6709 rem \u4E00\u8D77\u7F29\u653E\uFF1ATailwind \u7684 p-* / gap-* /
   max-w-[68rem] \u90FD\u662F rem\uFF0C\u4E8E\u662F\u300C\u8C03\u5B57\u53F7\u300D\u4F1A\u987A\u5E26\u628A\u535A\u5BA2\u53D8\u5BBD\u3001\u628A\u5B57\u53F7\u63A7\u4EF6\u81EA\u5DF1\u6491\u5927\u3001
   \u628A\u6B63\u6587\u680F\u95F4\u8DDD\u62C9\u5F00 \u2014\u2014 \u7528\u6237\u660E\u786E\u8981\u6C42\u300C\u8C03\u5927\u5C0F\u7684\u90A3\u90E8\u5206\u5927\u5C0F\u4E0D\u80FD\u6539\uFF0C\u535A\u5BA2\u5BBD\u5EA6\u4E0D\u80FD\u6539\uFF0C
   \u53EA\u80FD\u6539\u5B57\u4F53\u5927\u5C0F\u300D\uFF0C\u6240\u4EE5\u7F29\u653E\u53EA\u843D\u5728\u5B57\u53F7\u53D8\u91CF\u4E0A\u3002

   \u505A\u6CD5\uFF1A\u8986\u5199 Tailwind \u7684\u5B57\u53F7\u53D8\u91CF\uFF08text-xs / text-sm / \u2026 \u5168\u90E8\u8BFB\u8FD9\u4E9B\u53D8\u91CF\uFF0C
   \u89C1 .next \u4EA7\u7269\u91CC \`.text-sm{font-size:var(--text-sm)}\`\uFF09\u3002
   \u884C\u9AD8\u53D8\u91CF --text-*--line-height \u662F\u65E0\u5355\u4F4D\u500D\u6570\uFF0C\u4F1A\u968F\u5B57\u53F7\u540C\u6BD4\u653E\u5927\uFF0C\u4E0D\u7528\u5355\u72EC\u5904\u7406\u3002
   \u8FD9\u4E9B\u58F0\u660E\u4E0D\u80FD\u653E\u8FDB @layer\uFF1ATailwind \u7684\u9ED8\u8BA4\u503C\u5728 @layer theme \u91CC\uFF0C
   \u5C42\u5916\u7684\u666E\u901A\u58F0\u660E\u4F18\u5148\u7EA7\u66F4\u9AD8\uFF0C\u624D\u80FD\u8986\u76D6\u4F4F\u3002

   --fs-boost \u662F\u300C\u57FA\u51C6\u5B57\u53F7\u62AC\u9AD8\u300D\u7684\u5E38\u6570\uFF1A\u7528\u6237\u53CD\u9988\u6574\u4F53\u504F\u5C0F\uFF0C\u8981\u6C42
   \u300C\u73B0\u5728\u7684 120% \u53D8\u6210 100%\u300D\u2014\u2014 \u6240\u4EE5\u6240\u6709\u5B57\u53F7\u7EDF\u4E00\u518D\u4E58 1.2\uFF0C\u6ED1\u5757\u4E0A\u7684 100%
   \u5C31\u7B49\u4E8E\u539F\u6765\u7684 120%\u3002\u4EE5\u540E\u8981\u518D\u6574\u4F53\u8C03\u5927/\u8C03\u5C0F\uFF0C\u53EA\u6539\u8FD9\u4E00\u4E2A\u6570\u3002 */
:root {
  --fs-boost: 1.2;
  /* --fsu = \u300C\u8DDF\u968F\u9605\u8BFB\u5B57\u53F7\u7684 1rem\u300D\u3002\u4E3B\u9898\u6587\u4EF6\u91CC\u60F3\u5199\u5B57\u53F7\u65F6\u7528\u5B83\uFF0C
     \u5199\u6B7B rem \u4E0D\u4F1A\u8DDF\u7740\u6ED1\u5757\u53D8\uFF08rem \u53EA\u8DDF\u6839\u5B57\u53F7\uFF0C\u800C\u6839\u5B57\u53F7\u662F\u6545\u610F\u4E0D\u52A8\u7684\uFF09\u3002 */
  --fsu: calc(1rem * var(--site-fs, 1) * var(--fs-boost));
  --text-xs: calc(0.75rem * var(--site-fs, 1) * var(--fs-boost));
  --text-sm: calc(0.875rem * var(--site-fs, 1) * var(--fs-boost));
  --text-base: calc(1rem * var(--site-fs, 1) * var(--fs-boost));
  --text-lg: calc(1.125rem * var(--site-fs, 1) * var(--fs-boost));
  --text-xl: calc(1.25rem * var(--site-fs, 1) * var(--fs-boost));
  --text-2xl: calc(1.5rem * var(--site-fs, 1) * var(--fs-boost));
  --text-3xl: calc(1.875rem * var(--site-fs, 1) * var(--fs-boost));
  --text-4xl: calc(2.25rem * var(--site-fs, 1) * var(--fs-boost));
  --text-5xl: calc(3rem * var(--site-fs, 1) * var(--fs-boost));
  --text-6xl: calc(3.75rem * var(--site-fs, 1) * var(--fs-boost));
  --text-7xl: calc(4.5rem * var(--site-fs, 1) * var(--fs-boost));
  --text-8xl: calc(6rem * var(--site-fs, 1) * var(--fs-boost));
  --text-9xl: calc(8rem * var(--site-fs, 1) * var(--fs-boost));
}

/* \u5C11\u6570\u51E0\u5904\u5199\u6B7B px \u7684\u5C0F\u5B57\uFF08\u9996\u9875\u6458\u8981/\u65E5\u671F\u3001\u5927\u7EB2\u6807\u9898\u8BA1\u6570\uFF09\u3002
   \u5B83\u4EEC\u4E0D\u8D70 Tailwind \u7684\u5B57\u53F7\u53D8\u91CF\uFF0C\u4E5F\u4E0D\u8BE5\u4E3A\u4E86\u7F29\u653E\u6539\u6210 rem\uFF08\u4F1A\u8FDE\u5E26\u6539\u884C\u9AD8\u4E0E\u5BF9\u9F50\uFF09\uFF0C
   \u7ED9\u4E24\u4E2A\u8BED\u4E49\u7C7B\uFF0C\u53EA\u628A font-size \u4E58\u4E0A\u500D\u7387\u3002 */
.fs-small { font-size: calc(0.6875rem * var(--site-fs, 1) * var(--fs-boost)); } /* \u539F 11px */
.fs-tiny  { font-size: calc(0.625rem * var(--site-fs, 1) * var(--fs-boost)); }  /* \u539F 10px */

/* \u4E2D\u6587\u5B57\u4F53\u6808 */
body,
.markdown-body {
  font-family:
    -apple-system, BlinkMacSystemFont, 'Segoe UI', 'PingFang SC', 'Hiragino Sans GB',
    'Microsoft YaHei', 'Helvetica Neue', Helvetica, Arial, sans-serif;
}
.font-serif,
h1, h2, h3, .markdown-body h1, .markdown-body h2, .markdown-body h3,
.markdown-body h4, .markdown-body h5, .markdown-body h6 {
  font-family: 'Songti SC', 'STSong', 'Noto Serif SC', 'SimSun', Georgia, 'Times New Roman', serif;
}

/* ---------- \u94FE\u63A5\u60AC\u6D6E\u9884\u89C8\uFF08Obsidian \u9875\u9762\u9884\u89C8\u98CE\u683C\uFF09 ---------- */
.note-preview .markdown-body {
  font-size: calc(0.88rem * var(--site-fs, 1) * var(--fs-boost));
}
.note-preview .markdown-body > *:first-child { margin-top: 0; }
.note-preview .markdown-body h1:first-child,
.note-preview .markdown-body h2:first-child,
.note-preview .markdown-body h3:first-child { margin-top: 0.2em; }

/* ---------- \u641C\u7D22\u547D\u4E2D\u6B63\u6587\u65F6\u7684\u5B9A\u4F4D\u9AD8\u4EAE ---------- */
/* \u7528 CSS Custom Highlight API \u7ED9 Range \u4E0A\u8272\uFF0C\u4E0D\u5F80\u6B63\u6587\u91CC\u63D2 <mark> \u8282\u70B9\uFF1A
   \u6B63\u6587\u662F React \u6E32\u67D3\u7684\uFF0C\u624B\u52A8\u63D2\u5165\u7684\u8282\u70B9\u4F1A\u548C\u5B83\u62A2\u6240\u6709\u6743\u3002\u6D4F\u89C8\u5668\u4E0D\u652F\u6301\u65F6
   \u53EA\u662F\u5C11\u4E86\u5E95\u8272\uFF0C\u8DF3\u8F6C\u672C\u8EAB\u7167\u65E7\uFF08\u89C1 src/lib/find-text.ts\uFF09\u3002 */
::highlight(blog-search-hit) {
  background-color: color-mix(in srgb, var(--primary) 30%, transparent);
  color: inherit;
}

/* ---------- Markdown \u6B63\u6587\u6392\u7248 ---------- */
/* \u6B63\u6587\u5B57\u53F7 = 1rem \xD7 --site-fs \xD7 --fs-boost\uFF08\u89C1\u4E0A\u65B9\u300C\u53EA\u7F29\u653E\u6587\u5B57\u300D\u90A3\u6BB5\uFF09\uFF1A
   \u7528 calc \u800C\u4E0D\u662F\u6539\u6839\u5B57\u53F7\uFF0C\u6B63\u6587\u4F1A\u8DDF\u7740\u5B57\u53F7\u63A7\u4EF6\u53D8\uFF0C\u4F46\u6B63\u6587\u680F\u5BBD\u5EA6\u3001\u884C\u8DDD\u57FA\u51C6\u3001
   \u5927\u7EB2\u6D6E\u5C42\u4F4D\u7F6E\u5168\u90FD\u4E0D\u52A8\u3002 */
.markdown-body {
  line-height: 1.8;
  word-break: break-word;
  font-size: calc(1rem * var(--site-fs, 1) * var(--fs-boost));
}
.markdown-body > *:first-child { margin-top: 0; }
.markdown-body h1, .markdown-body h2, .markdown-body h3, .markdown-body h4,
.markdown-body h5, .markdown-body h6 {
  font-weight: 700;
  line-height: 1.35;
  margin-top: 1.8em;
  margin-bottom: 0.7em;
  scroll-margin-top: 5rem;
}
.markdown-body h1 { font-size: 1.75em; }
.markdown-body h2 { font-size: 1.5em; border-bottom: 1px solid var(--border); padding-bottom: 0.3em; }
.markdown-body h3 { font-size: 1.25em; }
.markdown-body h4 { font-size: 1.1em; }
.markdown-body p { margin: 0.9em 0; }
.markdown-body ul, .markdown-body ol { margin: 0.9em 0; padding-left: 1.6em; }
.markdown-body ul { list-style: disc; }
.markdown-body ol { list-style: decimal; }
.markdown-body li { margin: 0.3em 0; }
.markdown-body li::marker { color: var(--muted-foreground); }
.markdown-body li > ul, .markdown-body li > ol { margin: 0.2em 0; }
.markdown-body blockquote {
  border-left: 3px solid var(--border);
  padding: 0.1em 1em;
  margin: 1em 0;
  color: var(--muted-foreground);
  background: color-mix(in srgb, var(--muted) 35%, transparent);
  border-radius: 0 0.5rem 0.5rem 0;
}
.markdown-body hr { border: none; border-top: 1px solid var(--border); margin: 2em 0; }
.markdown-body a.internal-link {
  color: var(--primary);
  text-decoration: none;
  border-bottom: 1px solid color-mix(in srgb, var(--primary) 35%, transparent);
  transition: all 0.15s;
  cursor: pointer;
}
.markdown-body a.internal-link:hover {
  border-bottom-color: var(--primary);
  background: color-mix(in srgb, var(--primary) 8%, transparent);
}
.markdown-body a.internal-link.private-link { color: var(--muted-foreground); border-bottom-style: dotted; }
.markdown-body .unresolved-link {
  color: color-mix(in srgb, var(--muted-foreground) 80%, transparent);
  border-bottom: 1px dashed color-mix(in srgb, var(--muted-foreground) 60%, transparent);
  cursor: default;
}
.markdown-body a.external-link { color: var(--primary); }
.markdown-body a.inline-tag {
  color: var(--primary);
  font-size: 0.86em;
  background: color-mix(in srgb, var(--primary) 8%, transparent);
  border-radius: 999px;
  padding: 0.1em 0.6em;
  text-decoration: none;
  margin: 0 0.1em;
  white-space: nowrap;
  cursor: pointer;
}
.markdown-body a.inline-tag:hover { background: color-mix(in srgb, var(--primary) 16%, transparent); }
.markdown-body mark.obsidian-highlight {
  background: hsl(60 90% 60% / 0.45);
  color: inherit;
  padding: 0.05em 0.15em;
  border-radius: 0.2em;
}
.dark .markdown-body mark.obsidian-highlight {
  background: hsl(60 90% 50% / 0.3);
  color: inherit;
}
.markdown-body img.obsidian-image {
  max-width: 100%;
  border-radius: 0.6rem;
  margin: 1em 0;
  cursor: zoom-in;
  border: 1px solid var(--border);
  display: block;
}

/* ---------- \u4EFB\u52A1\u5217\u8868 ---------- */
.markdown-body li:has(> input.task-checkbox) { list-style: none; }
.markdown-body input.task-checkbox {
  accent-color: var(--primary);
  margin-right: 0.4em;
  width: 1em;
  height: 1em;
  vertical-align: -0.12em;
}

/* ---------- \u8868\u683C ---------- */
.markdown-body .table-wrap { overflow-x: auto; margin: 1em 0; }
.markdown-body table {
  border-collapse: collapse;
  width: 100%;
  font-size: 0.92em;
  border: 1px solid var(--border);
  border-radius: 0.5rem;
  overflow: hidden;
}
.markdown-body th, .markdown-body td {
  border: 1px solid var(--border);
  padding: 0.5em 0.8em;
  text-align: left;
}
.markdown-body th { background: color-mix(in srgb, var(--muted) 50%, transparent); font-weight: 600; }
.markdown-body tbody tr:nth-child(even) { background: color-mix(in srgb, var(--muted) 25%, transparent); }

/* ---------- \u4EE3\u7801\u5757\u914D\u8272\uFF08\u65E5\u95F4\u6D45\u8272 / \u591C\u95F4\u6DF1\u8272\uFF09 ---------- */
:root {
  --code-bg: #f6f8fa;
  --code-head-bg: #eaeef2;
  --code-head-fg: #59636e;
  --code-fg: #1f2328;
}
.dark {
  --code-bg: oklch(0.22 0.01 260);
  --code-head-bg: oklch(0.28 0.01 260);
  --code-head-fg: oklch(0.75 0.01 260);
  --code-fg: oklch(0.92 0.01 260);
}

/* ---------- \u884C\u5185\u4EE3\u7801 / \u4EE3\u7801\u5757 ---------- */
.markdown-body code.inline-code {
  background: var(--muted);
  border: 1px solid var(--border);
  border-radius: 0.35em;
  padding: 0.1em 0.4em;
  font-size: 0.88em;
  font-family: ui-monospace, SFMono-Regular, 'SF Mono', Menlo, Consolas, monospace;
}
.markdown-body .code-block {
  margin: 1.1em 0;
  border-radius: 0.75rem;
  overflow: hidden;
  border: 1px solid var(--code-border, var(--border));
  background: var(--code-bg);
}
.markdown-body .code-block-head {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0.4rem 0.9rem;
  font-size: 0.75em;
  color: var(--code-head-fg);
  background: var(--code-head-bg);
  font-family: ui-monospace, SFMono-Regular, Menlo, Consolas, monospace;
}
.markdown-body .code-copy {
  display: inline-flex;
  align-items: center;
  gap: 0.3rem;
  color: var(--code-head-fg);
  font-size: 0.72em;
  padding: 0.15rem 0.5rem;
  border-radius: 0.4rem;
  transition: all 0.15s;
}
.markdown-body .code-copy:hover { color: var(--foreground); background: color-mix(in srgb, var(--code-head-fg) 18%, transparent); }
.markdown-body .code-block-body {
  margin: 0;
  padding: 0.9rem 1rem;
  overflow-x: auto;
  color: var(--code-fg);
  font-size: 0.86em;
  line-height: 1.65;
  font-family: ui-monospace, SFMono-Regular, Menlo, Consolas, monospace;
}
.markdown-body .code-block-body code { background: none; border: none; padding: 0; }

/* ---------- \u539F\u59CB HTML\uFF08Obsidian \u5E38\u7528 <font color> / <center> \u7B49\uFF09 ---------- */
.markdown-body font[size] { line-height: 1.6; }
.markdown-body center { display: block; text-align: center; margin: 0.8em 0; }
.markdown-body u { text-decoration: underline; text-underline-offset: 2px; }
.markdown-body kbd {
  display: inline-block;
  padding: 0.1em 0.45em;
  border: 1px solid var(--border);
  border-bottom-width: 2px;
  border-radius: 0.3em;
  font-size: 0.85em;
  font-family: ui-monospace, Menlo, Consolas, monospace;
  background: var(--muted);
}
.markdown-body sub, .markdown-body sup { line-height: 0; }

/* ---------- \u5927\u7EB2\u4FA7\u8FB9\u680F ---------- */
.toc {
  border-left: 2px solid var(--border);
  padding-left: 0.75rem;
}
.toc .toc-item {
  color: var(--muted-foreground);
  transition: color 0.15s;
  border-left: 2px solid transparent;
  margin-left: -0.875rem;
  padding-left: 0.75rem;
}
.toc .toc-item:hover { color: var(--foreground); }
.toc .toc-item.toc-active {
  color: var(--primary);
  border-left-color: var(--primary);
  font-weight: 500;
}
/* \u5927\u7EB2\u91CC\u7684\u884C\u5185\u6392\u7248\uFF1A\u9AD8\u4EAE / \u884C\u5185\u4EE3\u7801\uFF0C\u6DF1\u8272\u6D45\u8272\u90FD\u8981\u770B\u5F97\u6E05 */
.toc .toc-hl {
  background: color-mix(in oklab, var(--primary) 22%, transparent);
  color: inherit;
  border-radius: 0.2rem;
  padding: 0 0.15rem;
}
.toc .toc-code {
  font-family: var(--font-mono, ui-monospace, SFMono-Regular, Menlo, monospace);
  font-size: 0.95em;
  background: color-mix(in oklab, currentColor 12%, transparent);
  border-radius: 0.2rem;
  padding: 0 0.2rem;
}
.toc .toc-math { white-space: nowrap; }

/* ---------- \u4EE3\u7801\u8BED\u6CD5\u9AD8\u4EAE\uFF08\u65E5\u95F4 github-light / \u591C\u95F4 github-dark\uFF09 ---------- */
.markdown-body .hljs { color: var(--code-fg); }
.markdown-body .hljs-doctag, .markdown-body .hljs-keyword, .markdown-body .hljs-meta .hljs-keyword,
.markdown-body .hljs-template-tag, .markdown-body .hljs-type,
.markdown-body .hljs-variable.language_, .markdown-body .hljs-selector-tag { color: #cf222e; }
.markdown-body .hljs-title, .markdown-body .hljs-title.class_, .markdown-body .hljs-title.function_ { color: #8250df; }
.markdown-body .hljs-attr, .markdown-body .hljs-attribute, .markdown-body .hljs-literal,
.markdown-body .hljs-meta, .markdown-body .hljs-number, .markdown-body .hljs-operator,
.markdown-body .hljs-selector-attr, .markdown-body .hljs-selector-class,
.markdown-body .hljs-selector-id, .markdown-body .hljs-variable { color: #0550ae; }
.markdown-body .hljs-regexp, .markdown-body .hljs-string,
.markdown-body .hljs-meta .hljs-string { color: #0a3069; }
.markdown-body .hljs-built_in, .markdown-body .hljs-symbol { color: #e16f24; }
.markdown-body .hljs-comment, .markdown-body .hljs-code, .markdown-body .hljs-formula { color: #6e7781; }
.markdown-body .hljs-name, .markdown-body .hljs-quote,
.markdown-body .hljs-selector-pseudo, .markdown-body .hljs-section,
.markdown-body .hljs-template-variable, .markdown-body .hljs-meta .hljs-section { color: #116329; }
.markdown-body .hljs-bullet { color: #0550ae; }
.markdown-body .hljs-emphasis { font-style: italic; }
.markdown-body .hljs-strong { font-weight: 700; }
.markdown-body .hljs-addition { color: #116329; background-color: rgba(31, 111, 35, 0.15); }
.markdown-body .hljs-deletion { color: #82071e; background-color: rgba(228, 26, 28, 0.15); }

.dark .markdown-body .hljs { color: #c9d1d9; }
.dark .markdown-body .hljs-doctag, .dark .markdown-body .hljs-keyword, .dark .markdown-body .hljs-meta .hljs-keyword,
.dark .markdown-body .hljs-template-tag, .dark .markdown-body .hljs-type,
.dark .markdown-body .hljs-variable.language_, .dark .markdown-body .hljs-selector-tag { color: #ff7b72; }
.dark .markdown-body .hljs-title, .dark .markdown-body .hljs-title.class_, .dark .markdown-body .hljs-title.function_ { color: #d2a8ff; }
.dark .markdown-body .hljs-attr, .dark .markdown-body .hljs-attribute, .dark .markdown-body .hljs-literal,
.dark .markdown-body .hljs-meta, .dark .markdown-body .hljs-number, .dark .markdown-body .hljs-operator,
.dark .markdown-body .hljs-selector-attr, .dark .markdown-body .hljs-selector-class,
.dark .markdown-body .hljs-selector-id, .dark .markdown-body .hljs-variable { color: #79c0ff; }
.dark .markdown-body .hljs-regexp, .dark .markdown-body .hljs-string,
.dark .markdown-body .hljs-meta .hljs-string { color: #a5d6ff; }
.dark .markdown-body .hljs-built_in, .dark .markdown-body .hljs-symbol { color: #ffa657; }
.dark .markdown-body .hljs-comment, .dark .markdown-body .hljs-code, .dark .markdown-body .hljs-formula { color: #8b949e; }
.dark .markdown-body .hljs-name, .dark .markdown-body .hljs-quote,
.dark .markdown-body .hljs-selector-pseudo, .dark .markdown-body .hljs-section,
.dark .markdown-body .hljs-template-variable, .dark .markdown-body .hljs-meta .hljs-section { color: #7ee787; }
.dark .markdown-body .hljs-bullet { color: #79c0ff; }
.dark .markdown-body .hljs-addition { color: #aff5b4; background-color: rgba(63, 185, 80, 0.15); }
.dark .markdown-body .hljs-deletion { color: #ffdcd7; background-color: rgba(248, 81, 73, 0.15); }

/* ---------- Obsidian Callout ---------- */
.markdown-body .callout {
  margin: 1.1em 0;
  border-radius: 0.6rem;
  padding: 0.2rem 0.9rem 0.4rem;
  border: 1px solid;
  border-left: 4px solid;
}
.markdown-body .callout-title {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  font-weight: 600;
  padding-top: 0.5rem;
  padding-bottom: 0.2rem;
  margin: 0;
}
.markdown-body details.callout > *:not(:first-child) { padding-top: 0.3rem; }
.markdown-body .callout > *:not(.callout-title) { margin: 0.3em 0; }

.callout-note      { border-color: oklch(0.75 0.03 250 / 0.6);  border-left-color: oklch(0.55 0.08 250);  background: oklch(0.96 0.015 250); }
.callout-note .callout-title      { color: oklch(0.48 0.09 250); }
.callout-info      { border-color: oklch(0.78 0.06 195 / 0.6);  border-left-color: oklch(0.58 0.11 195);  background: oklch(0.96 0.02 195); }
.callout-info .callout-title      { color: oklch(0.50 0.11 195); }
.callout-todo      { border-color: oklch(0.80 0.06 150 / 0.6);  border-left-color: oklch(0.60 0.11 150);  background: oklch(0.96 0.02 150); }
.callout-todo .callout-title      { color: oklch(0.50 0.11 150); }
.callout-abstract  { border-color: oklch(0.80 0.06 165 / 0.6);  border-left-color: oklch(0.60 0.11 165);  background: oklch(0.96 0.02 165); }
.callout-abstract .callout-title  { color: oklch(0.50 0.11 165); }
.callout-tip       { border-color: oklch(0.80 0.09 150 / 0.55); border-left-color: oklch(0.62 0.14 150);  background: oklch(0.96 0.03 150); }
.callout-tip .callout-title       { color: oklch(0.52 0.13 150); }
.callout-success   { border-color: oklch(0.80 0.09 150 / 0.55); border-left-color: oklch(0.62 0.14 150);  background: oklch(0.96 0.03 150); }
.callout-success .callout-title   { color: oklch(0.52 0.13 150); }
.callout-question  { border-color: oklch(0.82 0.09 75 / 0.55);  border-left-color: oklch(0.66 0.14 75);   background: oklch(0.97 0.03 75); }
.callout-question .callout-title  { color: oklch(0.55 0.12 75); }
.callout-warning   { border-color: oklch(0.82 0.10 75 / 0.55);  border-left-color: oklch(0.66 0.15 75);   background: oklch(0.97 0.035 75); }
.callout-warning .callout-title   { color: oklch(0.55 0.13 75); }
.callout-failure   { border-color: oklch(0.80 0.09 25 / 0.55);  border-left-color: oklch(0.60 0.16 25);   background: oklch(0.96 0.025 25); }
.callout-failure .callout-title   { color: oklch(0.52 0.14 25); }
.callout-danger    { border-color: oklch(0.78 0.13 25 / 0.6);   border-left-color: oklch(0.58 0.20 25);   background: oklch(0.95 0.03 25); }
.callout-danger .callout-title    { color: oklch(0.50 0.17 25); }
.callout-bug       { border-color: oklch(0.78 0.13 25 / 0.6);   border-left-color: oklch(0.58 0.20 25);   background: oklch(0.95 0.03 25); }
.callout-bug .callout-title       { color: oklch(0.50 0.17 25); }
.callout-example   { border-color: oklch(0.75 0.05 300 / 0.4);  border-left-color: oklch(0.55 0.08 300);  background: oklch(0.96 0.015 300); }
.callout-example .callout-title   { color: oklch(0.48 0.09 300); }
.callout-quote     { border-color: oklch(0.85 0 0 / 0.7);       border-left-color: oklch(0.45 0 0);       background: oklch(0.97 0 0); }
.callout-quote .callout-title     { color: oklch(0.40 0 0); }

.dark .callout-note      { background: oklch(0.26 0.035 256); border-color: oklch(0.40 0.07 256 / 0.75); }
.dark .callout-info      { background: oklch(0.26 0.04 235); border-color: oklch(0.40 0.08 235 / 0.75); }
.dark .callout-todo      { background: oklch(0.26 0.035 252); border-color: oklch(0.40 0.07 252 / 0.75); }
.dark .callout-abstract  { background: oklch(0.26 0.035 265); border-color: oklch(0.40 0.07 265 / 0.75); }
.dark .callout-tip       { background: oklch(0.26 0.04 195); border-color: oklch(0.40 0.08 195 / 0.75); }
.dark .callout-success   { background: oklch(0.26 0.04 165); border-color: oklch(0.40 0.08 165 / 0.75); }
.dark .callout-question  { background: oklch(0.28 0.04 75);  border-color: oklch(0.42 0.06 75 / 0.75); }
.dark .callout-warning   { background: oklch(0.28 0.04 75);  border-color: oklch(0.42 0.06 75 / 0.75); }
.dark .callout-failure   { background: oklch(0.27 0.05 25);  border-color: oklch(0.41 0.08 25 / 0.75); }
.dark .callout-danger    { background: oklch(0.26 0.055 22); border-color: oklch(0.42 0.10 22 / 0.8); }
.dark .callout-bug       { background: oklch(0.26 0.055 22); border-color: oklch(0.42 0.10 22 / 0.8); }
.dark .callout-example   { background: oklch(0.26 0.035 292); border-color: oklch(0.40 0.07 292 / 0.75); }
.dark .callout-quote     { background: oklch(0.25 0.025 256); border-color: oklch(0.40 0.05 256 / 0.8); }
.dark .markdown-body .callout .callout-title { color: inherit; opacity: 0.95; }

/* ---------- \u7B14\u8BB0\u5D4C\u5165\u5361\u7247 ---------- */
.markdown-body .note-embed {
  margin: 1em 0;
  padding: 0.75rem 1rem;
  border: 1px solid var(--border);
  border-left: 3px solid color-mix(in srgb, var(--primary) 60%, transparent);
  border-radius: 0.5rem;
  background: color-mix(in srgb, var(--muted) 30%, transparent);
  font-size: 0.92em;
  position: relative;
}
.markdown-body .note-embed::before {
  content: '\u21AA \u5D4C\u5165\u7B14\u8BB0';
  display: block;
  font-size: 0.68em;
  letter-spacing: 0.08em;
  color: var(--muted-foreground);
  margin-bottom: 0.2rem;
}
/* \u8FD9\u6761\u89D2\u6807\u7531 CSS ::before \u6E32\u67D3\uFF0C\u8BFB\u4E0D\u5230 i18n \u5B57\u5178\uFF1B
   blog-app.tsx \u4F1A\u628A\u5F53\u524D\u8BED\u8A00\u5199\u5230 <html data-lang>\uFF0C\u8FD9\u91CC\u6309\u8BED\u8A00\u8986\u76D6 content\u3002 */
html[data-lang='en'] .markdown-body .note-embed::before {
  content: '\u21AA Embedded note';
}
.markdown-body .note-embed a.embed-title {
  font-weight: 600;
  font-family: 'Songti SC', 'Noto Serif SC', serif;
}

/* ---------- \u53CC\u8BED\u5E76\u5217\u6E32\u67D3\uFF08\u907F\u514D\u8BED\u8A00\u95EA\u70C1\uFF09 ----------
   \u6BCF\u4E2A\u53EF\u89C1\u6587\u6848\u90FD\u540C\u65F6\u8F93\u51FA\u4E2D\u82F1\u4E24\u4EFD\uFF0C\u7531 <html data-lang> \u51B3\u5B9A\u663E\u793A\u54EA\u4E00\u4EFD\u3002
   data-lang \u7531 layout \u7684\u9884\u7ED8\u5236\u811A\u672C\u5728\u9996\u5E27\u524D\u8BBE\u597D\uFF0C\u6240\u4EE5\u4E0D\u4F1A\u51FA\u73B0"\u95EA\u4E00\u4E0B\u6362\u8BED\u8A00"\u3002 */
.i18n-en { display: none; }
html[data-lang='en'] .i18n-zh { display: none; }
html[data-lang='en'] .i18n-en { display: inline; }

/* ---------- \u7B14\u8BB0\u5D4C\u5165\uFF08transclusion\uFF09 ---------- */
.markdown-body .note-embed.note-embed-note {
  margin: 1em 0;
  padding: 0;
  border: 1px solid var(--border);
  border-left: 3px solid color-mix(in srgb, var(--primary) 55%, transparent);
  border-radius: 0.5rem;
  background: color-mix(in srgb, var(--muted) 22%, transparent);
  overflow: hidden;
}
/* \u5D4C\u5165\u5361\u7247\u4E0D\u518D\u7528 ::before \u89D2\u6807\uFF08\u90A3\u662F\u7ED9\u65E7\u6458\u8981\u5361\u7247\u7528\u7684\uFF09\uFF0C\u6539\u6210\u771F\u5B9E\u6807\u9898\u680F */
.markdown-body .note-embed.note-embed-note::before { content: none; }
.markdown-body .note-embed-head {
  padding: 0.4rem 0.85rem;
  border-bottom: 1px solid color-mix(in srgb, var(--border) 70%, transparent);
  background: color-mix(in srgb, var(--muted) 35%, transparent);
  font-size: 0.8em;
}
.markdown-body .note-embed-body { padding: 0.2rem 0.9rem 0.6rem; }
.markdown-body .note-embed-body .markdown-body { font-size: 1em; }
.markdown-body .note-embed .embed-title {
  font-weight: 600;
  font-family: 'Songti SC', 'Noto Serif SC', serif;
  color: var(--primary);
  text-align: left;
}
.markdown-body .note-embed .embed-title:hover { text-decoration: underline; }
.markdown-body .note-embed-hint { color: var(--muted-foreground); font-size: 0.8em; }
.markdown-body .note-embed-loading { color: var(--muted-foreground); font-size: 0.85em; padding: 0.6rem 0.9rem; }

/* ---------- KaTeX ---------- */
.markdown-body .katex-display { overflow-x: auto; overflow-y: hidden; padding: 0.3em 0; }

/* ---------- \u81EA\u5B9A\u4E49\u6EDA\u52A8\u6761\uFF08\u957F\u5217\u8868\uFF09 ---------- */
.scroll-area::-webkit-scrollbar, .max-h-96::-webkit-scrollbar { width: 8px; height: 8px; }
.scroll-area::-webkit-scrollbar-track, .max-h-96::-webkit-scrollbar-track { background: transparent; }
.scroll-area::-webkit-scrollbar-thumb, .max-h-96::-webkit-scrollbar-thumb {
  background: color-mix(in srgb, var(--muted-foreground) 30%, transparent);
  border-radius: 999px;
}
.scroll-area::-webkit-scrollbar-thumb:hover, .max-h-96::-webkit-scrollbar-thumb:hover {
  background: color-mix(in srgb, var(--muted-foreground) 50%, transparent);
}
` }, "src/app/layout.tsx": { "t": "utf8", "v": "import type { Metadata } from 'next'\nimport 'katex/dist/katex.min.css'\nimport './globals.css'\nimport { Toaster } from '@/components/ui/sonner'\nimport { ThemeProvider } from 'next-themes'\nimport { SITE_NAME, withBase } from '@/lib/site'\nimport { THEME_EXISTS, THEME_VERSION } from '@/lib/theme.generated'\nimport { DEFAULT_LANG, LANG_STORAGE_KEY } from '@/lib/lang'\n\n// \u7AD9\u540D = \u53D1\u5E03\u7BA1\u7406\u5668\u91CC\u7ED9\u8FD9\u4E2A\u5E93\u8D77\u7684\u300C\u540D\u5B57\u300D\uFF0C\u539F\u6837\u663E\u793A\uFF0C\u4E0D\u81EA\u52A8\u8865\u300C\u7684\u535A\u5BA2\u300D\u2014\u2014\n// \u7528\u6237\u8D77\u540D\u300Caaa\u7684\u535A\u5BA2\u300D\u5C31\u663E\u793A\u300Caaa\u7684\u535A\u5BA2\u300D\uFF0C\u8D77\u540D\u300Caaa\u300D\u5C31\u663E\u793A\u300Caaa\u300D\u3002\n// \u540D\u5B57\u6765\u6E90\u89C1 src/lib/site.ts\uFF08\u4ED3\u5E93\u91CC\u7684 site-name.txt \u4F18\u5148\uFF0C\u7531\u7BA1\u7406\u5668\u5728\u53D1\u5E03\u65F6\u5199\u5165\uFF09\u3002\n\nexport const metadata: Metadata = {\n  title: SITE_NAME,\n  description: `${SITE_NAME}\uFF1A\u7531 Obsidian \u7B14\u8BB0\u751F\u6210\u7684\u9759\u6001\u535A\u5BA2\uFF0C\u516C\u5F00\u7B14\u8BB0\u81EA\u52A8\u53D1\u5E03\u3002`,\n}\n\n/**\n * \u9884\u7ED8\u5236\u811A\u672C\uFF1A\u5728\u9996\u5E27\u4E4B\u524D\u628A <html data-lang> / lang \u8BBE\u597D\u3002\n *\n * \u754C\u9762\u6587\u6848\u662F\u300C\u4E2D\u82F1\u4E24\u4EFD\u90FD\u6E32\u67D3\u3001CSS \u6309 data-lang \u53EA\u663E\u793A\u4E00\u4EFD\u300D\uFF08\u89C1 components/blog/t-text.tsx\uFF09\u3002\n * \u53EA\u8981 data-lang \u5728\u7B2C\u4E00\u5E27\u524D\u662F\u5BF9\u7684\uFF0C\u7528\u6237\u5C31\u6C38\u8FDC\u4E0D\u4F1A\u770B\u5230\u6587\u5B57\u95EA\u4E00\u4E0B\u6362\u8BED\u8A00\u3002\n * \u5FC5\u987B\u5728 <head> \u91CC\u540C\u6B65\u6267\u884C\uFF0C\u4E0D\u80FD\u7B49 React \u6C34\u5408\u3002\n */\nconst LANG_BOOT = `(function(){try{var d=${JSON.stringify(DEFAULT_LANG)};var l=d;var s=localStorage.getItem(${JSON.stringify(LANG_STORAGE_KEY)});if(s){var p=JSON.parse(s);if(p&&p.state&&p.state.picked&&(p.state.lang==='zh'||p.state.lang==='en'))l=p.state.lang;}var h=document.documentElement;h.dataset.lang=l;h.lang=(l==='en'?'en':'zh-CN');}catch(e){try{document.documentElement.dataset.lang=${JSON.stringify(DEFAULT_LANG)};}catch(_){}}})()`\n\n/**\n * \u9884\u7ED8\u5236\u811A\u672C\uFF1A\u9996\u5E27\u524D\u628A\u5DF2\u4FDD\u5B58\u7684\u9605\u8BFB\u5B57\u53F7\uFF08--site-fs\uFF09\u5199\u5230 <html>\u3002\n *\n * \u548C LANG_BOOT \u540C\u7406 \u2014\u2014 \u5B57\u53F7\u5B58\u5728 localStorage\uFF0C\u7B49 React \u6C34\u5408\u518D\u5E94\u7528\u7684\u8BDD\uFF0C\n * \u7528\u6237\u6BCF\u6B21\u6253\u5F00\u90FD\u4F1A\u5148\u770B\u5230\u9ED8\u8BA4\u5B57\u53F7\u518D\u300C\u8DF3\u300D\u4E00\u4E0B\u3002\u8FD9\u91CC\u5728 <head> \u91CC\u540C\u6B65\u8BBE\u597D\uFF0C\n * \u7B2C\u4E00\u5E27\u5C31\u662F\u7528\u6237\u4E0A\u6B21\u9009\u7684\u500D\u7387\u3002\u8BFB\u53D6\u5931\u8D25\u4E00\u5F8B\u56DE\u843D\u5230 1\uFF08\u9ED8\u8BA4\uFF09\u3002\n */\nconst FONT_BOOT = `(function(){try{var v=Number(localStorage.getItem('font-scale'));if(!(v>=0.8&&v<=1.6))v=1;document.documentElement.style.setProperty('--site-fs',String(Math.round(v*100)/100));}catch(e){}})()`\n\nexport default function RootLayout({\n  children,\n}: Readonly<{\n  children: React.ReactNode\n}>) {\n  return (\n    <html lang={DEFAULT_LANG === 'en' ? 'en' : 'zh-CN'} data-lang={DEFAULT_LANG} suppressHydrationWarning>\n      <head>\n        <script dangerouslySetInnerHTML={{ __html: LANG_BOOT }} />\n        <script dangerouslySetInnerHTML={{ __html: FONT_BOOT }} />\n        {/*\n          \u5E93\u4E3B\u4EBA\u81EA\u5DF1\u7C98\u8D34\u7684\u5916\u89C2 CSS\uFF08\u53D1\u5E03\u7BA1\u7406\u5668\u300C\u5916\u89C2\u300D\u9762\u677F\u91CC\u4FDD\u5B58\uFF09\u3002\n          \u6587\u4EF6\u662F public/theme.css\uFF0C\u968F\u4ED3\u5E93\u63D0\u4EA4\uFF0C\u7531 Next \u7684 output:'export' \u62F7\u8FDB out/\u3002\n\n          \u4E3A\u4EC0\u4E48\u662F\u5916\u94FE <link> \u800C\u4E0D\u662F\u628A\u5185\u5BB9\u5185\u8054\u8FDB <style>\uFF1A\n            \u5916\u94FE\u7684 CSS \u7531\u6D4F\u89C8\u5668\u6309 CSS \u89E3\u6790\uFF0C\u6C38\u8FDC\u4E0D\u4F1A\u88AB\u5F53\u6210 HTML \u6267\u884C\uFF0C\n            \u6240\u4EE5\u7528\u6237\u5199\u4EC0\u4E48\u90FD\u65E0\u6CD5\u9003\u51FA\u6837\u5F0F\u8868\uFF08\u5185\u8054\u7684\u8BDD\u4E00\u4E2A </style> \u5C31\u80FD\u8DF3\u51FA\uFF09\u3002\n          \u4E3A\u4EC0\u4E48\u5E26 ?v=\uFF1A\u6587\u4EF6\u540D\u4E0D\u53D8\uFF0C\u800C GitHub Pages \u5BF9\u9759\u6001\u8D44\u6E90\u6709 max-age=600\uFF0C\n            \u4E0D\u6362 URL \u7684\u8BDD\u6539\u5B8C CSS \u8981\u7B49\u5341\u5206\u949F\u624D\u751F\u6548\uFF0C\u7528\u6237\u4F1A\u4EE5\u4E3A\u6CA1\u4FDD\u5B58\u4E0A\u3002\n\n          THEME_EXISTS \u7531 scripts/build-content.mjs \u5728\u6784\u5EFA\u65F6\u7B97\u51FA\uFF1A\n          \u6CA1\u6709 theme.css\uFF08\u6216\u5185\u5BB9\u5168\u662F\u7A7A\u767D/\u6CE8\u91CA\uFF09\u65F6\u4E0D\u8F93\u51FA\u8FD9\u4E2A <link>\uFF0C\u907F\u514D\u6BCF\u6B21\u8BBF\u95EE\u7559\u4E00\u4E2A 404\u3002\n        */}\n        {THEME_EXISTS && (\n          <link\n            rel=\"stylesheet\"\n            href={withBase('/theme.css') + (THEME_VERSION ? '?v=' + THEME_VERSION : '')}\n          />\n        )}\n      </head>\n      <body className=\"antialiased bg-background text-foreground\">\n        <ThemeProvider\n          attribute=\"class\"\n          defaultTheme=\"light\"\n          enableSystem={false}\n          disableTransitionOnChange\n        >\n          {children}\n          <Toaster position=\"top-center\" richColors />\n        </ThemeProvider>\n      </body>\n    </html>\n  )\n}\n" }, "src/app/page.tsx": { "t": "utf8", "v": "import { BlogApp } from '@/components/blog/blog-app'\n\nexport default function Page() {\n  return <BlogApp />\n}\n" }, "src/components/blog/blog-app.tsx": { "t": "utf8", "v": `'use client'

import { useEffect, useState, useSyncExternalStore } from 'react'
import { QueryClient, QueryClientProvider, useQuery } from '@tanstack/react-query'
import { Moon, RefreshCw, Search, Sun, X } from 'lucide-react'
import { useTheme } from 'next-themes'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { fetchSiteInfo } from '@/lib/api'
import { useBlog } from '@/lib/store'
import { HomeView } from '@/components/blog/home-view'
import { NoteView } from '@/components/blog/note-view'
import { FontControl } from '@/components/blog/font-control'
import { useLang, useT } from '@/lib/i18n'
import { T } from '@/components/blog/t-text'

const emptySubscribe = () => () => {}

/** popstate\uFF08\u6D4F\u89C8\u5668\u524D\u8FDB/\u540E\u9000\uFF09\u6807\u5FD7\uFF1A\u6A21\u5757\u7EA7\u5171\u4EAB\uFF0C\u5B50\u7EC4\u4EF6\u4E0E\u7236\u7EC4\u4EF6\u7684 effect \u90FD\u8981\u8BFB\u5230 */
let isPopstateNavigation = false

/** SSR \u5B89\u5168\u7684 mounted \u68C0\u6D4B */
function useMounted() {
  return useSyncExternalStore(
    emptySubscribe,
    () => true,
    () => false
  )
}

function ThemeToggle() {
  const { theme, setTheme, resolvedTheme } = useTheme()
  const mounted = useMounted()
  const t = useT()
  const current = mounted ? (resolvedTheme ?? theme) : 'light'
  return (
    <Button
      variant="ghost"
      size="icon"
      aria-label={t.toggleTheme}
      title={t.toggleTheme}
      onClick={() => setTheme(current === 'dark' ? 'light' : 'dark')}
    >
      {mounted && current === 'dark' ? (
        <Sun className="size-4" aria-hidden />
      ) : (
        <Moon className="size-4" aria-hidden />
      )}
    </Button>
  )
}

/**
 * \u8BED\u8A00\u5207\u6362\u3002\u53EA\u6362\u754C\u9762\u6587\u6848\uFF0C\u535A\u5BA2\u5185\u5BB9\uFF08\u6807\u9898\u3001\u6B63\u6587\u3001\u6587\u4EF6\u5939\u540D\uFF09\u4FDD\u6301\u539F\u6837\u3002
 * \u9ED8\u8BA4\u8DDF\u968F\u6D4F\u89C8\u5668\u8BED\u8A00\uFF0C\u624B\u52A8\u5207\u8FC7\u4E4B\u540E\u8BB0\u5728 localStorage \u91CC\u3002
 */
function LangToggle() {
  const lang = useLang((s) => s.lang)
  const setLang = useLang((s) => s.setLang)
  const t = useT()
  const mounted = useMounted()
  return (
    <Button
      variant="ghost"
      size="sm"
      className="px-2 text-xs font-medium"
      aria-label={t.switchLang}
      title={t.switchLang}
      onClick={() => setLang(lang === 'zh' ? 'en' : 'zh')}
    >
      {/* \u672A\u6302\u8F7D\u524D\u4E0D\u6E32\u67D3\u6587\u5B57\uFF0C\u907F\u514D SSR/CSR \u4E0D\u4E00\u81F4 */}
      {mounted ? (lang === 'zh' ? 'EN' : '\u4E2D') : '\u3000'}
    </Button>
  )
}

/**
 * \u300C\u68C0\u67E5\u66F4\u65B0\u300D\u6309\u94AE \u2014\u2014 \u8BA9\u8BBF\u5BA2\u4E0D\u5FC5\u7B49 GitHub Pages \u7684 10 \u5206\u949F\u7F13\u5B58\uFF0C\u4E5F\u4E0D\u5FC5\u81EA\u5DF1\u6E05\u7F13\u5B58\u3002
 *
 * \u80CC\u666F\uFF1AGitHub Pages \u7ED9 HTML \u4E0E /data/*.json \u90FD\u53D1 \`Cache-Control: max-age=600\`\uFF0C
 * \u4E14\u4E0D\u652F\u6301\u81EA\u5B9A\u4E49\u54CD\u5E94\u5934\uFF08\u65E0 _headers \u652F\u6301\uFF09\u3002\u53D1\u5E03\u540E\u6700\u591A 10 \u5206\u949F\u5185\uFF0C\u6D4F\u89C8\u5668\u4F1A\u76F4\u63A5
 * \u7528\u672C\u5730\u7F13\u5B58\uFF0C**\u8FDE revalidate \u90FD\u4E0D\u505A**\uFF0C\u8868\u73B0\u4E3A\u300C\u5DF2\u7ECF\u53D1\u5E03/\u53D6\u6D88\u516C\u5F00\u4E86\uFF0C\u7F51\u9875\u8FD8\u662F\u65E7\u7684\u300D\u3002
 *
 * \u8FD9\u91CC\u7528\u4E24\u5C42\u5F3A\u5237\uFF1A
 *   1. \`location.reload()\`\uFF1A\u4E3B\u6587\u6863\u91CD\u65B0\u6821\u9A8C\uFF0C\u62FF\u5230\u65B0 HTML \u4E0E\u65B0 JS\uFF08\u5185\u542B\u65B0 RELEASE_TAG\uFF09\u3002
 *   2. \`?fresh=<\u65F6\u95F4\u6233>\`\uFF1A\u65B0 JS \u91CC\u7684 dataFetch \u4F1A\u628A\u8FD9\u4E2A\u53C2\u6570\u62FC\u5230 /data/*.json \u4E0A\uFF0C
 *      \u6362\u6765\u4E00\u4E2A CDN \u4ECE\u672A\u89C1\u8FC7\u7684 URL\uFF0C\u5F7B\u5E95\u7ED5\u5F00\u65E7\u7F13\u5B58\u3002
 *
 * \u914D\u5408\u4E0B\u9762 reload-on-focus \u7684\u81EA\u52A8\u903B\u8F91\uFF0C\u901A\u5E38\u8BBF\u5BA2\u4EC0\u4E48\u90FD\u4E0D\u7528\u70B9\u5C31\u5DF2\u7ECF\u662F\u6700\u65B0\u7684\u4E86\u3002
 */
function ReopenButton() {
  const [busy, setBusy] = useState(false)
  const t = useT()
  const onClick = () => {
    if (busy) return
    setBusy(true)
    // \u62FC\u4E0A\u4E00\u6B21\u6027\u53C2\u6570\uFF0C\u8BA9\u65B0\u9875\u9762\u91CC\u7684\u6570\u636E\u8BF7\u6C42\u5168\u90E8\u7ED5\u5F00 CDN / \u6D4F\u89C8\u5668\u7F13\u5B58
    const url = new URL(window.location.href)
    url.searchParams.set('fresh', String(Date.now()))
    window.location.replace(url.toString())
  }
  return (
    <Button
      variant="ghost"
      size="icon"
      aria-label={busy ? t.fetching : t.checkUpdate}
      title={t.checkUpdateTip}
      onClick={onClick}
      disabled={busy}
    >
      <RefreshCw className={\`size-4 \${busy ? 'animate-spin' : ''}\`} aria-hidden />
    </Button>
  )
}

function Header() {
  const view = useBlog((s) => s.view)
  const goHome = useBlog((s) => s.goHome)
  const search = useBlog((s) => s.search)
  const setSearch = useBlog((s) => s.setSearch)
  const t = useT()
  const { data: site } = useQuery({
    queryKey: ['site'],
    queryFn: fetchSiteInfo,
    staleTime: Infinity,
  })
  const siteName = site?.name ?? t.siteFallback

  // \u5168\u5E93\u641C\u7D22\uFF1A\u8F93\u5165\u5373\u751F\u6548\uFF0C\u975E\u9996\u9875\u65F6\u81EA\u52A8\u8DF3\u56DE\u9996\u9875\u770B\u7ED3\u679C
  const onSearchChange = (v: string) => {
    setSearch(v)
    if (v.trim() && view !== 'home') goHome()
  }

  return (
    <header className="sticky top-0 z-40 border-b bg-background/80 backdrop-blur">
      <div className="mx-auto flex h-14 max-w-[var(--content-w)] items-center gap-3 px-4 sm:px-6" data-region="header">
        <button
          type="button"
          onClick={() => goHome()}
          className="flex shrink-0 items-center gap-2 font-serif text-lg font-bold tracking-tight"
          aria-label={t.backHome}
        >
          {siteName}
        </button>
        <div className="relative min-w-0 flex-1 sm:max-w-[22rem]">
          <Search className="absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" aria-hidden />
          <Input
            value={search}
            onChange={(e) => onSearchChange(e.target.value)}
            placeholder={t.searchPlaceholder}
            className="h-9 pl-9 pr-8"
            aria-label={t.search}
          />
          {search && (
            <button
              type="button"
              onClick={() => setSearch('')}
              className="absolute right-2 top-1/2 size-6 -translate-y-1/2 rounded p-0.5 text-muted-foreground transition-colors hover:text-foreground"
              aria-label={t.clearSearch}
            >
              <X className="size-4" aria-hidden />
            </button>
          )}
        </div>
        <div className="ml-auto flex shrink-0 items-center gap-1">
          <ReopenButton />
          <LangToggle />
          <ThemeToggle />
        </div>
      </div>
    </header>
  )
}
function Views() {
  const view = useBlog((s) => s.view)
  const slug = useBlog((s) => s.slug)
  useEffect(() => {
    // \u6D4F\u89C8\u5668\u524D\u8FDB/\u540E\u9000\u65F6\u8BA9\u6D4F\u89C8\u5668\u81EA\u5DF1\u6062\u590D\u6EDA\u52A8\u4F4D\u7F6E\uFF0C\u4E0D\u5F3A\u5236\u56DE\u9876
    if (isPopstateNavigation) return
    window.scrollTo({ top: 0 })
  }, [view, slug])
  return (
    <main className="mx-auto w-full max-w-[var(--content-w)] flex-1 px-4 py-8 sm:px-6" data-region="main">
      {view === 'home' && <HomeView />}
      {view === 'note' && slug && <NoteView slug={slug} />}
        </main>
  )
}

function FooterLine() {
  const { data: site } = useQuery({
    queryKey: ['site'],
    queryFn: fetchSiteInfo,
    staleTime: Infinity,
  })
  return (
    <span>
      {site?.name ?? <T k="siteFallback" />} \xB7 <T k="vaultDriven" />
    </span>
  )
}

/** \u5F53\u524D\u89C6\u56FE\u5BF9\u5E94\u7684 URL \u67E5\u8BE2\u4E32 */
function queryOf(view: string, slug: string | null, activeTag: string | null, folder: string): string {
  const params = new URLSearchParams()
  if (view === 'note' && slug) params.set('note', slug)
  else if (activeTag) params.set('tag', activeTag)
  // \u6587\u4EF6\u5939\u7528 ?folder= \u6DF1\u94FE\uFF0C\u5237\u65B0/\u5206\u4EAB/\u524D\u8FDB\u540E\u9000\u90FD\u80FD\u56DE\u5230\u540C\u4E00\u5C42\u3002
  // \u7B14\u8BB0\u9875\u4E5F\u5E26\u4E0A\uFF1A\u4ECE\u300C\u6BD4\u8D5B/NF\u300D\u6253\u5F00\u4E00\u7BC7\u518D\u70B9\u8FD4\u56DE\uFF0C\u8981\u56DE\u5230 NF \u800C\u4E0D\u662F\u6839\u76EE\u5F55\u3002
  if (folder) params.set('folder', folder)
  return params.toString()
}

export function BlogApp() {
  const [client] = useState(
    () =>
      new QueryClient({
        defaultOptions: {
          queries: {
            retry: 1,
            staleTime: 30_000,
            // \u9ED8\u8BA4\u7684 networkMode: 'online' \u4F1A\u5728\u6D4F\u89C8\u5668\u5224\u5B9A\u79BB\u7EBF\u65F6\u628A\u67E5\u8BE2**\u6302\u8D77**\uFF1A
            // \u8BF7\u6C42\u4E0D\u53D1\u3001\u4E5F\u4E0D\u62A5\u9519\uFF0CisError \u6C38\u8FDC\u662F false\u3001data \u6C38\u8FDC\u7A7A\uFF0C\u754C\u9762\u5C31\u5361\u5728
            // \u300C\u52A0\u8F7D\u4E2D\u300D\u6216\uFF08\u6539\u7248\u524D\uFF09\u8BEF\u62A5\u300C\u7B14\u8BB0\u4E0D\u5B58\u5728\u300D\u3002\u6539\u6210 always\uFF1A\u7167\u5E38\u53D1\u8BF7\u6C42\uFF0C
            // \u5931\u8D25\u4E86\u5C31\u662F error\uFF0C\u7EC4\u4EF6\u80FD\u7ED9\u51FA\u300C\u52A0\u8F7D\u5931\u8D25 + \u91CD\u8BD5\u300D\u3002
            networkMode: 'always',
          },
        },
      })
  )
  const view = useBlog((s) => s.view)
  const slug = useBlog((s) => s.slug)
  const activeTag = useBlog((s) => s.activeTag)
  const folder = useBlog((s) => s.folder)
  // \u6709\u51E0\u5904\u6587\u6848\u53EA\u80FD\u9760 CSS ::before \u6E32\u67D3\uFF08\u5982\u7B14\u8BB0\u5D4C\u5165\u5361\u7247\u7684\u89D2\u6807\uFF09\uFF0CCSS \u8BFB\u4E0D\u5230 JS \u72B6\u6001\uFF0C
  // \u6240\u4EE5\u628A\u5F53\u524D\u8BED\u8A00\u5199\u5230 <html data-lang>\uFF0C\u8BA9 globals.css \u80FD\u6309\u8BED\u8A00\u6362 content\u3002
  const lang = useLang((s) => s.lang)
  useEffect(() => {
    document.documentElement.dataset.lang = lang
  }, [lang])
  // \u9996\u5E27\u5BF9\u9F50\u7528\uFF1A\u521D\u59CB\u89C6\u56FE\u5DF2\u4ECE URL \u6062\u590D\uFF0C\u7B2C\u4E00\u8F6E\u540C\u6B65\u53EA replaceState \u4E0D\u65B0\u589E\u5386\u53F2
  const firstSyncRef = useState(() => ({ v: true }))[0]

  // \u6D4F\u89C8\u5668\u524D\u8FDB/\u540E\u9000\uFF1A\u6309 URL \u6062\u590D\u89C6\u56FE
  useEffect(() => {
    const onPop = () => {
      isPopstateNavigation = true
      const params = new URLSearchParams(window.location.search)
      const note = params.get('note')
      const tag = params.get('tag')
      const dir = params.get('folder') || ''
      const s = useBlog.getState()
      if (note) {
        // \u5148\u5BF9\u9F50\u6765\u6E90\u6587\u4EF6\u5939\uFF0C\u518D\u8FDB\u7B14\u8BB0\uFF1A\u8FD4\u56DE\u65F6\u624D\u80FD\u56DE\u5230\u6B63\u786E\u7684\u5C42\u7EA7
        if (dir !== s.folder) s.openFolder(dir)
        s.navigateToNote(note)
      } else if (tag) s.goHome(tag)
      else s.openFolder(dir)
    }
    window.addEventListener('popstate', onPop)
    return () => window.removeEventListener('popstate', onPop)
  }, [])

  // \u89C6\u56FE\u53D8\u5316 \u2192 \u5199\u5165\u5386\u53F2\u8BB0\u5F55\uFF08\u524D\u8FDB/\u540E\u9000\u53EF\u7528\uFF09\uFF1Bpopstate \u5F15\u8D77\u7684\u53D8\u66F4\u4E0D\u91CD\u590D\u5165\u6808
  useEffect(() => {
    const qs = queryOf(view, slug, activeTag, folder)
    if (isPopstateNavigation) {
      isPopstateNavigation = false
      return
    }
    if (firstSyncRef.v) {
      firstSyncRef.v = false
      window.history.replaceState(null, '', qs ? '?' + qs : window.location.pathname)
      return
    }
    window.history.pushState(null, '', qs ? '?' + qs : window.location.pathname)
  }, [view, slug, activeTag, folder, firstSyncRef])

  return (
    <QueryClientProvider client={client}>
      <div
        className="flex min-h-screen flex-col bg-background text-foreground"
        data-view={view}
      >
        <Header />
        <Views />
        {/* \u5B57\u53F7\u63A7\u4EF6\u6302\u5728\u6839\u4E0A\uFF1A\u9996\u9875\u4E0E\u6587\u7AE0\u9875\u90FD\u80FD\u8C03\uFF0C\u4E14\u5168\u7AD9\u751F\u6548 */}
        <FontControl />
        <footer className="mt-auto border-t bg-muted/30">
          <div className="mx-auto flex max-w-[var(--content-w)] flex-wrap items-center justify-between gap-2 px-4 py-4 text-xs text-muted-foreground sm:px-6" data-region="footer">
            <FooterLine />
          </div>
        </footer>
      </div>
    </QueryClientProvider>
  )
}
` }, "src/components/blog/font-control.tsx": { "t": "utf8", "v": `'use client'

/**
 * \u9605\u8BFB\u5B57\u53F7\u63A7\u4EF6\uFF08\u5168\u7AD9\uFF09\u3002
 *
 * \u4E4B\u524D\u5B83\u53EA\u957F\u5728\u6587\u7AE0\u9875\u53F3\u4E0B\u89D2\uFF0C\u800C\u4E14\u53EA\u7F29\u653E\u6B63\u6587\uFF08--note-fs\uFF09\uFF0C\u6240\u4EE5\u9996\u9875/\u9876\u680F/\u5927\u7EB2
 * \u90FD\u4E0D\u52A8 \u2014\u2014 \u7528\u6237\u53CD\u9988\u300C\u5B57\u4F53\u8C03\u8282\u65F6\u4E0D\u6B62\u535A\u5BA2\u6B63\u6587\u8981\u8C03\u8282\uFF0C\u6240\u6709\u5B57\u4F53\u90FD\u8981\u300D\u3002
 *
 * \u73B0\u5728\uFF1A
 *   1. \u63A7\u4EF6\u6302\u5728\u5E94\u7528\u6839\u8282\u70B9\uFF0C\u9996\u9875\u548C\u6587\u7AE0\u9875\u90FD\u80FD\u8C03\uFF1B
 *   2. \u7F29\u653E\u4F5C\u7528\u5728 <html> \u7684 --site-fs \u4E0A\uFF0C\u53EA\u6539\u5B57\u53F7\u53D8\u91CF\uFF08\u89C1 lib/font-scale.ts
 *      \u4E0E globals.css \u91CC\u7684\u8BF4\u660E\uFF09\uFF0C\u7248\u9762\u5BBD\u5EA6\u3001\u63A7\u4EF6\u5C3A\u5BF8\u90FD\u4E0D\u8DDF\u7740\u53D8\u3002
 *
 * \u26A0\uFE0F \u63A7\u4EF6\u81EA\u5DF1\u7684\u5B57\u53F7\u5FC5\u987B\u5199\u6B7B px\uFF0C\u4E0D\u80FD\u7528 text-xs / text-sm\uFF1A
 * \u90A3\u4E9B\u7C7B\u8BFB\u7684\u662F --text-* \u53D8\u91CF\uFF0C\u4F1A\u968F --site-fs \u4E00\u8D77\u53D8\uFF0C\u7ED3\u679C\u5C31\u662F\u300C\u62D6\u7740\u6ED1\u5757\uFF0C
 * \u6ED1\u5757\u81EA\u5DF1\u4E5F\u5728\u957F\u5927\u300D\uFF0C\u7528\u6237\u660E\u786E\u8981\u6C42\u300C\u8C03\u5927\u5C0F\u7684\u90A3\u90E8\u5206\u5927\u5C0F\u4E0D\u80FD\u6539\u300D\u3002
 */
import { useEffect, useState } from 'react'
import { FONT_MAX, FONT_MIN, FONT_STEP, applyScale, readScale, saveScale } from '@/lib/font-scale'
import { useT } from '@/lib/i18n'

/** \u63A7\u4EF6\u5185\u90E8\u56FA\u5B9A\u5C3A\u5BF8\uFF1A\u4E0D\u53C2\u4E0E --site-fs \u7F29\u653E */
const FIXED = { fontSize: 12, lineHeight: '20px' } as const

export function FontControl() {
  const t = useT()
  // \u521D\u59CB\u5316\u5668\u91CC\u76F4\u63A5\u8BFB localStorage\uFF1A\u907F\u514D effect \u6062\u590D\u4E0E\u6301\u4E45\u5316\u4E92\u76F8\u8986\u76D6
  const [scale, setScale] = useState<number>(() => readScale())

  // \u9996\u5E27\u5BF9\u9F50\uFF1Alayout.tsx \u7684 FONT_BOOT \u5DF2\u7ECF\u8BBE\u8FC7\u4E00\u6B21\uFF0C\u8FD9\u91CC\u518D\u540C\u6B65\u4E00\u6B21\uFF0C
  // \u8986\u76D6\u300C\u6D4F\u89C8\u5668 bfcache \u6062\u590D / \u591A\u6807\u7B7E\u9875\u6539\u4E86\u8BBE\u7F6E\u300D\u8FD9\u7C7B\u60C5\u51B5\u3002
  useEffect(() => {
    applyScale(scale)
  }, [scale])

  const commit = (v: number) => {
    const next = Math.min(FONT_MAX, Math.max(FONT_MIN, Math.round(v * 100) / 100))
    setScale(saveScale(next))
  }

  return (
    <div
      className="fixed bottom-5 right-5 z-40 flex items-center gap-2 rounded-full border border-border bg-background/95 py-1.5 pl-2.5 pr-3 shadow-lg backdrop-blur"
      data-region="font-control"
    >
      <button
        type="button"
        className="cursor-pointer rounded-full px-1.5 font-semibold text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
        style={{ ...FIXED, fontSize: 11 }}
        onClick={() => commit(scale - FONT_STEP)}
        aria-label={t.fontSmaller}
      >
        A\u2212
      </button>
      <input
        type="range"
        min={FONT_MIN}
        max={FONT_MAX}
        step={0.01}
        value={scale}
        onChange={(e) => commit(Number(e.target.value))}
        className="w-28 accent-[var(--primary)]"
        style={FIXED}
        aria-label={t.fontReset}
      />
      <span
        className="min-w-11 text-center tabular-nums text-muted-foreground"
        style={FIXED}
      >
        {Math.round(scale * 100)}%
      </span>
      <button
        type="button"
        className="cursor-pointer rounded-full px-1.5 font-semibold text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
        style={{ ...FIXED, fontSize: 13 }}
        onClick={() => commit(scale + FONT_STEP)}
        aria-label={t.fontLarger}
      >
        A+
      </button>
    </div>
  )
}
` }, "src/components/blog/home-view.tsx": { "t": "utf8", "v": `'use client'

import { memo, useEffect, useMemo } from 'react'
import { useQuery } from '@tanstack/react-query'
import { ChevronRight, FileText, Folder, FolderOpen, Hash, Home, Lock } from 'lucide-react'
import { Skeleton } from '@/components/ui/skeleton'
import { fetchFolders, fetchNotes, fetchSearchIndex, type FolderNode, type NoteListItem } from '@/lib/api'
import { useBlog } from '@/lib/store'
import { useT } from '@/lib/i18n'
import { T } from '@/components/blog/t-text'

/** \u7D27\u51D1\u5217\u8868\u884C\uFF1A\u6807\u9898 + \u65E5\u671F/\u72B6\u6001\uFF0C\u4E00\u884C\u641E\u5B9A */
const NoteRow = memo(function NoteRow({
  note,
  snippet,
  hitText,
}: {
  note: NoteListItem
  snippet?: string
  /** \u547D\u4E2D\u7684\u662F\u6B63\u6587\u65F6\u5E26\u4E0A\u641C\u7D22\u8BCD\uFF1A\u6253\u5F00\u540E\u76F4\u63A5\u6EDA\u5230\u90A3\u53E5\u8BDD\uFF0C\u800C\u4E0D\u662F\u4ECE\u5934\u8BFB */
  hitText?: string
}) {
  const navigateToNote = useBlog((s) => s.navigateToNote)
  const t = useT()
  return (
    <li className="break-inside-avoid">
      <button
        type="button"
        onClick={() => navigateToNote(note.slug, undefined, hitText)}
        className="group flex w-full items-start gap-2 rounded-md px-2.5 py-1.5 text-left transition-colors hover:bg-muted/70"
        aria-label={t.openNote(note.title)}
      >
        <span className="min-w-0 flex-1">
          <span className="block truncate text-sm text-foreground transition-colors group-hover:text-primary">
            {note.title}
          </span>
          {snippet && (
            <span className="fs-small mt-0.5 block truncate leading-tight text-muted-foreground/80">
              {snippet}
            </span>
          )}
        </span>
        {!note.isPublic && <Lock className="mt-0.5 size-3 shrink-0 text-muted-foreground/70" aria-hidden />}
        <span className="fs-small mt-0.5 shrink-0 tabular-nums text-muted-foreground/80">
          {(note.noteDate ?? note.updatedAt).slice(0, 10)}
        </span>
      </button>
    </li>
  )
})

/** \u9762\u5305\u5C51\uFF1A\u5168\u90E8 \u203A \u7236 \u203A \u5F53\u524D\u3002\u70B9\u4EFB\u610F\u4E00\u6BB5\u56DE\u5230\u90A3\u4E00\u5C42\u3002 */
function Crumbs({ path }: { path: string }) {
  const openFolder = useBlog((s) => s.openFolder)
  const t = useT()
  const parts = path ? path.split('/') : []
  const segs = parts.map((name, i) => ({ name, path: parts.slice(0, i + 1).join('/') }))
  return (
    <nav aria-label={t.crumbRoot} className="flex flex-wrap items-center gap-1 text-sm">
      <button
        type="button"
        onClick={() => openFolder('')}
        className={
          'inline-flex items-center gap-1 rounded px-1.5 py-0.5 transition-colors hover:bg-muted hover:text-foreground ' +
          (segs.length === 0 ? 'font-medium text-foreground' : 'text-muted-foreground')
        }
      >
        <Home className="size-3.5" aria-hidden />
        <T k="crumbRoot" />
      </button>
      {segs.map((s, i) => {
        const last = i === segs.length - 1
        return (
          <span key={s.path} className="inline-flex items-center gap-1">
            <ChevronRight className="size-3.5 shrink-0 text-muted-foreground/50" aria-hidden />
            {last ? (
              <span className="rounded px-1.5 py-0.5 font-medium text-foreground">{s.name}</span>
            ) : (
              <button
                type="button"
                onClick={() => openFolder(s.path)}
                className="rounded px-1.5 py-0.5 text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
              >
                {s.name}
              </button>
            )}
          </span>
        )
      })}
    </nav>
  )
}

/** \u5B50\u6587\u4EF6\u5939\u5361\u7247\uFF1A\u70B9\u6574\u5F20\u5361\u8FDB\u5165\u4E0B\u4E00\u5C42 */
function FolderCard({ node }: { node: FolderNode }) {
  const openFolder = useBlog((s) => s.openFolder)
  const t = useT()
  const subs = node.children.length
  return (
    <button
      type="button"
      onClick={() => openFolder(node.path)}
      aria-label={t.openFolder(node.name)}
      className="group flex w-full items-center gap-3 rounded-xl border border-border/70 bg-card px-4 py-3 text-left transition-colors hover:border-primary/50 hover:bg-muted/50"
    >
      <Folder className="size-5 shrink-0 text-primary/80" aria-hidden />
      <span className="min-w-0 flex-1">
        <span className="block truncate font-serif text-base font-semibold text-foreground">{node.name}</span>
        <span className="mt-0.5 block text-xs text-muted-foreground">
          <T k="folderCount" args={[node.totalCount]} />
          {subs > 0 && (
            <>
              <span className="px-1 opacity-50">\xB7</span>
              <T k="subfolderCount" args={[subs]} />
            </>
          )}
        </span>
      </span>
      <ChevronRight
        className="size-4 shrink-0 text-muted-foreground/60 transition-transform group-hover:translate-x-0.5"
        aria-hidden
      />
    </button>
  )
}

export function HomeView() {
  const search = useBlog((s) => s.search)
  const activeTag = useBlog((s) => s.activeTag)
  const setTag = useBlog((s) => s.setTag)
  const folder = useBlog((s) => s.folder)
  const t = useT()
  const q = search.trim().toLowerCase()

  const { data: notes, isLoading, isError } = useQuery({
    queryKey: ['notes'],
    queryFn: () => fetchNotes(false),
  })

  // \u76EE\u5F55\u6811\u7531\u6784\u5EFA\u65F6\u751F\u6210\uFF08index.json \u7684 folders \u5B57\u6BB5\uFF09\uFF0C\u6BD4\u6BCF\u6B21\u904D\u5386\u5168\u90E8\u7B14\u8BB0\u73B0\u7B97\u66F4\u7701\uFF0C
  // \u4E5F\u80FD\u8868\u8FBE\u300C\u81EA\u5DF1\u6CA1\u7B14\u8BB0\u3001\u53EA\u6709\u5B50\u76EE\u5F55\u300D\u7684\u5BB9\u5668\u76EE\u5F55\u3002
  const { data: tree } = useQuery({
    queryKey: ['folders'],
    queryFn: fetchFolders,
    staleTime: 60_000,
  })

  // \u5168\u6587\u7D22\u5F15\uFF1A\u53EA\u5728\u771F\u7684\u8F93\u5165\u4E86\u641C\u7D22\u8BCD\u65F6\u624D\u62C9\uFF08\u51E0\u5341 KB\uFF0C\u522B\u62D6\u6162\u9996\u5C4F\uFF09\u3002
  const { data: bodyIndex } = useQuery({
    queryKey: ['search-index'],
    queryFn: fetchSearchIndex,
    enabled: q.length > 0,
    staleTime: 5 * 60_000,
  })

  const { visible, snippets } = useMemo(() => {
    let list = notes ?? []
    const snips = new Map<string, string>()
    if (q) {
      list = list.filter((n) => {
        const meta = [n.title, n.path, n.tags.join(' '), n.excerpt].join('\\n').toLowerCase()
        if (meta.includes(q)) return true
        const body = bodyIndex?.[n.slug]
        if (!body) return false
        const i = body.toLowerCase().indexOf(q)
        if (i < 0) return false
        const start = Math.max(0, i - 24)
        const end = Math.min(body.length, i + q.length + 70)
        snips.set(
          n.slug,
          (start > 0 ? '\u2026' : '') +
            body.slice(start, end).replace(/\\s+/g, ' ').trim() +
            (end < body.length ? '\u2026' : '')
        )
        return true
      })
    }
    if (activeTag) list = list.filter((n) => n.tags.includes(activeTag))
    return { visible: list, snippets: snips }
  }, [notes, q, activeTag, bodyIndex])

  // \u547D\u4E2D\u6B63\u6587\uFF08\u6709 snippet\uFF09\u624D\u5E26\u8DF3\u8F6C\u8BCD\uFF1A\u53EA\u547D\u4E2D\u6807\u9898 / \u8DEF\u5F84\u65F6\u6B63\u6587\u91CC\u6CA1\u6709\u53EF\u8DF3\u7684\u4F4D\u7F6E
  const hitOf = (slug: string) => (q && snippets.has(slug) ? search.trim() : undefined)

  const tagCounts = useMemo(() => {
    const m = new Map<string, number>()
    for (const n of notes ?? []) for (const t of n.tags) m.set(t, (m.get(t) ?? 0) + 1)
    return [...m.entries()].sort((a, b) => b[1] - a[1]).slice(0, 24)
  }, [notes])

  /** \u5F53\u524D\u5C42\u7684\u5B50\u6587\u4EF6\u5939\uFF08\u641C\u7D22 / \u6807\u7B7E\u7B5B\u9009\u65F6\u4E0D\u505A\u76EE\u5F55\u9650\u5B9A\uFF0C\u76F4\u63A5\u5E73\u94FA\u7ED3\u679C\uFF09 */
  const browsing = !q && !activeTag
  // \u65E7\u7D22\u5F15\u6CA1\u6709 folders \u5B57\u6BB5\u65F6\uFF0C\u6309 notes[].folder \u73B0\u63A8\u4E00\u68F5\u6700\u5C0F\u6811\uFF0C\u4FDD\u8BC1\u8001\u7AD9\u70B9\u4E0D\u4F1A\u53D8\u6210\u7A7A\u767D
  const effectiveTree = useMemo(() => {
    if (tree && tree.length > 0) return tree
    if (!notes) return []
    const root: FolderNode = { path: '', name: '', directCount: 0, totalCount: 0, children: [] }
    const map = new Map<string, FolderNode>()
    for (const n of notes) {
      const f = n.folder || ''
      if (!f) continue
      const parts = f.split('/')
      let cur = root
      for (let i = 0; i < parts.length; i += 1) {
        const p = parts.slice(0, i + 1).join('/')
        let node = map.get(p)
        if (!node) {
          node = { path: p, name: parts[i], directCount: 0, totalCount: 0, children: [] }
          map.set(p, node)
          cur.children.push(node)
        }
        node.totalCount += 1
        cur = node
      }
      cur.directCount += 1
    }
    return root.children
  }, [tree, notes])

  const current = useMemo(() => {
    if (!browsing) return null
    if (!folder) return { path: '', name: '', directCount: 0, totalCount: 0, children: effectiveTree } as FolderNode
    const walk = (nodes: FolderNode[]): FolderNode | null => {
      for (const n of nodes) {
        if (n.path === folder) return n
        const hit = walk(n.children)
        if (hit) return hit
      }
      return null
    }
    return walk(effectiveTree)
  }, [browsing, effectiveTree, folder])

  // \u641C\u7D22/\u7B5B\u9009\u65F6\u5C55\u793A\u5168\u5E93\u7ED3\u679C\uFF1B\u6B63\u5E38\u6D4F\u89C8\u65F6\u53EA\u5C55\u793A\u5F53\u524D\u6587\u4EF6\u5939\u76F4\u5C5E\u7684\u7B14\u8BB0
  const shown = useMemo(() => {
    if (!browsing) return visible
    return visible.filter((n) => (n.folder || '') === folder)
  }, [browsing, visible, folder])

  const subFolders = current?.children ?? []
  // \u6DF1\u94FE\u91CC\u7684\u6587\u4EF6\u5939\u4E0D\u5B58\u5728\uFF08\u6539\u540D/\u5220\u9664/\u624B\u6539 URL\uFF09\uFF1A\u9000\u56DE\u6839\u76EE\u5F55\uFF0C\u800C\u4E0D\u662F\u7559\u4E00\u4E2A\u7A7A\u9875\u9762
  const nothingHere = browsing && !isLoading && effectiveTree.length > 0 && !current
  const openFolder = useBlog((s) => s.openFolder)
  useEffect(() => {
    if (nothingHere && folder) openFolder('')
  }, [nothingHere, folder, openFolder])

  return (
    <div>
      {/* \u6807\u9898\u884C\uFF1A\u9762\u5305\u5C51 + \u6570\u91CF\u7EDF\u8BA1\uFF08\u641C\u7D22/\u7B5B\u9009\u65F6\u7ED3\u679C\u6765\u81EA\u5168\u5E93\uFF0C\u9762\u5305\u5C51\u9000\u56DE\u6839\uFF09 */}
      <div className="mb-5 flex flex-wrap items-center gap-x-3 gap-y-2" data-region="crumbs">
        <Crumbs path={browsing ? folder : ''} />
        {notes && (
          <span className="text-xs text-muted-foreground">
            {/* \u5728\u6587\u4EF6\u5939\u91CC\u65F6\u7ED9\u5F53\u524D\u5C42\u7684\u7BC7\u6570\uFF0C\u800C\u4E0D\u662F\u5168\u5E93\u516C\u5F00\u6570 \u2014\u2014 \u5426\u5219\u8FDB\u300C\u6BD4\u8D5B\u300D
                \u8FD8\u5199\u7740\u300C\u5171 116 \u7BC7\u516C\u5F00\u300D\uFF0C\u548C\u4E0B\u9762\u53EA\u6709 19 \u7BC7\u7684\u5185\u5BB9\u5BF9\u4E0D\u4E0A */}
            {browsing && current && current.path ? (
              <T k="folderPublicCount" args={[current.totalCount]} />
            ) : (
              <T k="publicCount" args={[notes.filter((n) => n.isPublic).length]} />
            )}
            {search.trim() && <T k="filteredCount" args={[visible.length]} />}
          </span>
        )}
      </div>

      {activeTag && (
        <div className="mb-4 flex items-center gap-2">
          <span className="inline-flex items-center gap-1 rounded-full border border-primary/60 bg-primary/10 px-3 py-1 text-xs text-primary">
            <Hash className="size-2.5" aria-hidden />
            <T k="tagFilter" /> {activeTag}
            <span className="text-muted-foreground">
              <T k="noteCountSuffix" args={[visible.length]} />
            </span>
          </span>
          <button
            type="button"
            onClick={() => setTag(null)}
            className="rounded-full border border-border px-2 py-1 text-xs text-muted-foreground transition-colors hover:border-primary/50 hover:text-foreground"
          >
            <T k="clearFilter" />
          </button>
        </div>
      )}

      {tagCounts.length > 0 && (
        <div className="mb-8 flex flex-wrap gap-2" data-region="tags">
          <button
            type="button"
            onClick={() => setTag(null)}
            className={'rounded-full border px-3 py-1 text-xs transition-colors ' + (activeTag === null ? 'border-primary bg-primary text-primary-foreground' : 'border-border text-muted-foreground hover:border-primary/50 hover:text-foreground')}
          >
            <T k="all" />
          </button>
          {tagCounts.map(([tag, count]) => (
            <button
              key={tag}
              type="button"
              onClick={() => setTag(activeTag === tag ? null : tag)}
              className={
                'rounded-full border px-3 py-1 text-xs transition-colors ' +
                (activeTag === tag
                  ? 'border-primary bg-primary text-primary-foreground'
                  : 'border-border text-muted-foreground hover:border-primary/50 hover:text-foreground')
              }
            >
              <Hash className="mr-0.5 inline size-2.5" aria-hidden />
              {tag}
              <span className="ml-1 opacity-60">{count}</span>
            </button>
          ))}
        </div>
      )}

      {isLoading && (
        <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
          {Array.from({ length: 6 }).map((_, i) => (
            <Skeleton key={i} className="h-16 rounded-xl" />
          ))}
        </div>
      )}

      {isError && (
        <p className="text-center text-sm text-destructive">
          <T k="loadFailed" />
        </p>
      )}

      {/* \u5B50\u6587\u4EF6\u5939\uFF1A\u5F53\u524D\u5C42\u7684\u4E0B\u4E00\u7EA7\uFF0C\u7F51\u683C\u6392\u5E03\uFF08\u540C\u4E00\u7236\u7EA7\u7684\u5144\u5F1F\u5FC5\u7136\u76F8\u90BB\uFF0C\u4E0D\u518D\u88AB\u5217\u6253\u6563\uFF09 */}
      {!isLoading && subFolders.length > 0 && (
        <div className="mb-6 grid gap-4 sm:grid-cols-2 xl:grid-cols-3" data-region="folders">
          {subFolders.map((node) => (
            <FolderCard key={node.path} node={node} />
          ))}
        </div>
      )}

      {/* \u5F53\u524D\u6587\u4EF6\u5939\u7684\u76F4\u5C5E\u7B14\u8BB0\uFF08\u6839\u76EE\u5F55\u65F6\u5373\u300C\u672A\u5206\u7EC4\u300D\uFF1B\u641C\u7D22/\u7B5B\u9009\u65F6\u662F\u5168\u5E93\u7ED3\u679C\uFF09 */}
      {!isLoading && shown.length > 0 && (
        <section className="overflow-hidden rounded-xl border border-border/70 bg-card" data-region="list">
          <div className="flex items-center gap-2 border-b border-border/60 px-4 py-2.5">
            <FolderOpen className="size-4 shrink-0 text-primary/80" aria-hidden />
            <span className="min-w-0 flex-1 truncate font-serif text-sm font-semibold text-foreground">
              {!browsing ? (
                <T k="searchResults" />
              ) : folder ? (
                folder.split('/').pop()
              ) : (
                <T k="uncategorized" />
              )}
            </span>
            <span className="shrink-0 text-xs tabular-nums text-muted-foreground">
              <T k="folderCount" args={[shown.length]} />
            </span>
          </div>
          <ul className="columns-1 gap-x-2 px-1.5 py-1.5 sm:columns-2 xl:columns-3">
            {shown.map((n) => (
              <NoteRow key={n.slug} note={n} snippet={snippets.get(n.slug)} hitText={hitOf(n.slug)} />
            ))}
          </ul>
        </section>
      )}

      {!isLoading && notes && visible.length === 0 && (
        <div className="rounded-xl border border-dashed p-12 text-center">
          <FileText className="mx-auto size-10 text-muted-foreground/50" aria-hidden />
          <p className="mt-3 font-medium">
            <T k={notes.length === 0 ? 'emptyVault' : browsing && folder ? 'emptyFolder' : 'noMatch'} />
          </p>
          <p className="mt-1 text-sm text-muted-foreground">
            <T
              k={
                notes.length === 0
                  ? 'emptyVaultHint'
                  : browsing && folder
                    ? 'emptyFolderHint'
                    : 'emptyHint'
              }
            />
          </p>
        </div>
      )}

      {nothingHere && (
        <p className="text-center text-sm text-muted-foreground">
          <T k="emptyFolder" />
        </p>
      )}    </div>
  )
}
` }, "src/components/blog/markdown.tsx": { "t": "utf8", "v": `'use client'

import { isValidElement, useEffect, useMemo, useRef, useState, type MouseEvent as ReactMouseEvent, type ReactNode } from 'react'
import { createPortal } from 'react-dom'
import ReactMarkdown, { defaultUrlTransform, type Components } from 'react-markdown'
import type { Pluggable } from 'unified'
import rehypeHighlight from 'rehype-highlight'
import rehypeRaw from 'rehype-raw'
import remarkGfm from 'remark-gfm'
import remarkMath from 'remark-math'
import rehypeKatex from 'rehype-katex'
import {
  AlertTriangle,
  Bug,
  CheckCircle2,
  Copy,
  ExternalLink,
  HelpCircle,
  Info,
  Lightbulb,
  List,
  ListChecks,
  Lock,
  Pencil,
  Quote,
  XCircle,
  Zap,
} from 'lucide-react'
import { Dialog, DialogContent } from '@/components/ui/dialog'
import { parseNote, resolveEmbedPath } from '@/lib/obsidian'
import { headingId, remarkMathMetaFix, remarkObsidian, type LinkIndex } from '@/lib/remark-obsidian'
import { rehypeSafety } from '@/lib/rehype-safety'
import { useBlog } from '@/lib/store'
import { useT } from '@/lib/i18n'
import { withBase } from '@/lib/site'
import { NotePreviewPopup, useInsidePreview } from '@/components/blog/note-preview'
import { Transclusion } from '@/components/blog/transclusion'

/** vault \u76F8\u5BF9\u8DEF\u5F84 \u2192 \u9759\u6001\u9644\u4EF6\u5730\u5740\uFF08\u6784\u5EFA\u65F6\u9644\u4EF6\u5DF2\u62F7\u8D1D\u5230 /assets/<\u539F\u8DEF\u5F84>\uFF09 */
function assetUrl(p: string): string {
  return withBase('/assets/') + p.split('/').map((s) => encodeURIComponent(s)).join('/')
}

const CALLOUT_ICONS: Record<string, typeof Pencil> = {
  note: Pencil,
  abstract: ListChecks,
  info: Info,
  todo: CheckCircle2,
  tip: Lightbulb,
  success: CheckCircle2,
  question: HelpCircle,
  warning: AlertTriangle,
  failure: XCircle,
  danger: Zap,
  bug: Bug,
  example: List,
  quote: Quote,
}

function textOf(node: ReactNode): string {
  if (node == null || typeof node === 'boolean') return ''
  if (typeof node === 'string' || typeof node === 'number') return String(node)
  if (Array.isArray(node)) return node.map(textOf).join('')
  if (isValidElement(node)) {
    const props = node.props as { children?: ReactNode }
    return textOf(props.children)
  }
  return ''
}

/** \u5185\u90E8\u94FE\u63A5\uFF1Aobsidian-note: / obsidian-tag: / obsidian-unresolved: / \u951A\u70B9 / \u5916\u94FE */
function MdLink({
  href,
  className,
  children,
}: {
  href?: string
  className?: string
  children?: ReactNode
}) {
  const navigateToNote = useBlog((s) => s.navigateToNote)
  const setTag = useBlog((s) => s.setTag)
  const setSearch = useBlog((s) => s.setSearch)
  const goHome = useBlog((s) => s.goHome)
  const t = useT()
  const inPreview = useInsidePreview()
  // Obsidian \u5F0F\u60AC\u505C\u9884\u89C8\uFF1A\u5EF6\u65F6\u5F39\u51FA\u6D6E\u7A97\uFF0C\u79FB\u51FA\u94FE\u63A5/\u6D6E\u7A97\u540E\u5173\u95ED
  const [previewOpen, setPreviewOpen] = useState(false)
  const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null)
  const enterTimer = useRef<number | null>(null)
  const leaveTimer = useRef<number | null>(null)
  const clearTimers = () => {
    if (enterTimer.current !== null) window.clearTimeout(enterTimer.current)
    if (leaveTimer.current !== null) window.clearTimeout(leaveTimer.current)
    enterTimer.current = null
    leaveTimer.current = null
  }
  useEffect(() => clearTimers, [])
  const onEnter = (e: ReactMouseEvent<HTMLAnchorElement>) => {
    if (inPreview) return
    clearTimers()
    setAnchorEl(e.currentTarget)
    enterTimer.current = window.setTimeout(() => setPreviewOpen(true), 350)
  }
  const onLeave = () => {
    clearTimers()
    leaveTimer.current = window.setTimeout(() => setPreviewOpen(false), 250)
  }
  const cn = String(className || '')
  const kids = (
    <>
      {cn.includes('private-link') && <Lock className="inline-block size-3 align-[-1px] mr-0.5" aria-hidden />}
      {children}
    </>
  )

  if (href?.startsWith('obsidian-note:')) {
    const rest = href.slice('obsidian-note:'.length)
    const qi = rest.indexOf('?h=')
    const slug = qi >= 0 ? decodeURIComponent(rest.slice(0, qi)) : decodeURIComponent(rest)
    const heading = qi >= 0 ? decodeURIComponent(rest.slice(qi + 3)) : undefined
    return (
      <a
        href={'?note=' + encodeURIComponent(slug)}
        className={cn}
        title={cn.includes('private-link') ? t.notPublic : undefined}
        onMouseEnter={onEnter}
        onMouseLeave={onLeave}
        onClick={(e) => {
          e.preventDefault()
          clearTimers()
          setPreviewOpen(false)
          navigateToNote(slug, heading && !heading.startsWith('^') ? heading : undefined)
        }}
      >
        {kids}
        {previewOpen &&
          anchorEl &&
          createPortal(
            <NotePreviewPopup
              slug={slug}
              heading={heading}
              anchor={anchorEl}
              onClose={() => setPreviewOpen(false)}
              onKeepOpen={clearTimers}
            />,
            document.body
          )}
      </a>
    )
  }
  if (href?.startsWith('obsidian-unresolved:')) {
    const q = decodeURIComponent(href.slice('obsidian-unresolved:'.length).split('#')[0].split('|')[0])
    return (
      <a
        href={'?search=' + encodeURIComponent(q)}
        className={cn || 'internal-link unresolved-link'}
        title={t.unresolvedTip}
        onClick={(e) => {
          e.preventDefault()
          setSearch(q)
          goHome()
        }}
      >
        {children}
      </a>
    )
  }
  if (href?.startsWith('obsidian-tag:')) {
    const tag = decodeURIComponent(href.slice('obsidian-tag:'.length))
    return (
      <a
        href={'?tag=' + encodeURIComponent(tag)}
        className={cn}
        onClick={(e) => {
          e.preventDefault()
          setTag(tag)
        }}
      >
        {children}
      </a>
    )
  }
  if (href?.startsWith('#')) {
    return (
      <a href={href} className={cn}>
        {children}
      </a>
    )
  }
  return (
    <a href={href} className={(cn ? cn + ' ' : '') + 'external-link'} target="_blank" rel="noopener noreferrer">
      {children}
      <ExternalLink className="inline-block size-3 align-[-1px] ml-0.5 opacity-60" aria-hidden />
    </a>
  )
}

/**
 * \u56FE\u7247\uFF1Avault \u76F8\u5BF9\u8DEF\u5F84 \u2192 \u9644\u4EF6\u63A5\u53E3\u3002
 * \u5148\u5728\u9644\u4EF6\u7D22\u5F15\u91CC\u89E3\u6790\u771F\u5B9E\u8DEF\u5F84\uFF08\u652F\u6301\u6587\u4EF6\u540D\u5F15\u7528\u3001\u4EFB\u610F\u5B50\u76EE\u5F55\u3001\u5927\u5C0F\u5199\u5DEE\u5F02\uFF09\uFF0C
 * \u89E3\u6790\u4E0D\u5230\u65F6\u9000\u56DE\u539F\u6837\uFF08\u4EA4\u7ED9\u670D\u52A1\u5668\u6309 basename \u515C\u5E95\u5339\u914D\uFF09\u3002
 * \u8986\u76D6\u8BED\u6CD5\uFF1A![[\u56FE\u7247.png]] / ![](\u8DEF\u5F84) / \u539F\u59CB HTML <img src="">
 */
function MdImage({
  src,
  alt,
  assetSet,
}: {
  src?: string
  alt?: string
  assetSet?: Set<string>
}) {
  if (!src) return null
  const isExternal = /^(https?:|\\/\\/)/i.test(src)
  let url: string | undefined = src
  if (src.startsWith('/api/asset?path=')) {
    // \u6784\u5EFA\u7BA1\u7EBF\u751F\u6210\u7684 vault \u9644\u4EF6\u8DEF\u5F84 \u2192 \u9759\u6001\u9644\u4EF6\u5730\u5740
    url = assetUrl(decodeURIComponentSafe(src.slice('/api/asset?path='.length)))
  } else if (!isExternal && !/^(data:|#)/i.test(src) && !src.startsWith('/api/')) {
    const cleaned = decodeURIComponentSafe(src.replace(/^\\.\\//, ''))
    const resolved = assetSet ? resolveEmbedPath(cleaned, assetSet) : null
    url = assetUrl(resolved ?? cleaned)
  }
  if (!url) return null
  const finalUrl = url
  return (
    <img
      src={finalUrl}
      alt={alt || ''}
      className="obsidian-image"
      loading="lazy"
      referrerPolicy="no-referrer"
      onError={(e) => {
        // \u9759\u6001\u7AD9\u662F\u7EAF\u9759\u6001\u5BFC\u51FA\uFF08next.config.ts \u91CC output: 'export'\uFF09\uFF0C
        // **\u6CA1\u6709\u670D\u52A1\u7AEF\u8DEF\u7531**\uFF0C\u6240\u4EE5\u4E0D\u5B58\u5728 /api/proxy \u8FD9\u7C7B\u56FE\u7247\u4EE3\u7406 \u2014\u2014 \u5916\u94FE\u56FE\u5E8A
        // \uFF08CSDN \u7B49\uFF09\u9632\u76D7\u94FE\u5931\u8D25\u65F6\u4E0D\u53EF\u80FD\u9760\u670D\u52A1\u7AEF\u8F6C\u53D1\u6551\u56DE\u6765\u3002
        // \u8FD9\u91CC\u53EA\u5BF9**\u672C\u7AD9\u9759\u6001\u9644\u4EF6**\u505A\u4E00\u6B21\u5E26\u7F13\u5B58\u51FB\u7A7F\u53C2\u6570\u7684\u91CD\u8BD5\uFF08\u5E94\u5BF9 CDN \u8FB9\u7F18\u77AC\u65F6\u5931\u8D25\uFF09\uFF0C
        // \u5916\u94FE\u5931\u8D25\u5C31\u76F4\u63A5\u653E\u5F03\uFF0C\u4E0D\u518D\u62FC\u4E00\u4E2A\u5FC5\u7136 404 \u7684 /api/proxy \u5730\u5740\u3002
        if (isExternal) return
        const img = e.currentTarget
        const step = Number(img.dataset.retried ?? '0')
        if (step >= 2) return
        img.dataset.retried = String(step + 1)
        window.setTimeout(
          () => {
            // \u53EA\u6709\u672C\u7AD9\u9759\u6001\u9644\u4EF6\u624D\u91CD\u8BD5\uFF08\u52A0\u4E2A\u67E5\u8BE2\u53C2\u6570\u7ED5\u8FC7 CDN \u8FB9\u7F18\u7F13\u5B58\uFF09
            img.src = finalUrl + (finalUrl.includes('?') ? '&' : '?') + 'r=' + (step + 1)
          },
          700 * (step + 1)
        )
      }}
    />
  )
}

function decodeURIComponentSafe(s: string): string {
  try {
    return decodeURIComponent(s)
  } catch {
    return s
  }
}

/** callout \u6807\u9898\uFF08\u5E26\u56FE\u6807\uFF09 */
function CalloutTitle({ type, children }: { type: string; children?: ReactNode }) {
  const Icon = CALLOUT_ICONS[type] ?? Pencil
  return (
    <div className={'callout-title callout-title-' + type}>
      <Icon className="size-4 shrink-0" aria-hidden />
      <span>{children}</span>
    </div>
  )
}

function MdDiv({
  className,
  children,
  ...rest
}: { className?: string; children?: ReactNode } & Record<string, unknown>) {
  const cn = String(className || '')
  if (cn.includes('callout-title')) {
    const type = String(rest['data-callout-type'] || 'note')
    return <CalloutTitle type={type}>{children}</CalloutTitle>
  }
  if (cn.includes('note-embed')) {
    const slug = rest['data-embed-slug']
    if (typeof slug === 'string' && slug) {
      const heading = rest['data-embed-heading']
      return <Transclusion slug={slug} heading={typeof heading === 'string' && heading ? heading : undefined} />
    }
    return <div className="note-embed">{children}</div>
  }
  return <div className={className}>{children}</div>
}

/** \u4EE3\u7801\u5757\uFF1A\u8BED\u8A00\u6807\u7B7E + \u590D\u5236\u6309\u94AE + \u8BED\u6CD5\u9AD8\u4EAE\uFF08rehype-highlight\uFF09 */
function CodeBlock({ children }: { children?: ReactNode }) {
  const t = useT()
  const [copied, setCopied] = useState(false)
  let lang = 'text'
  let text = ''
  if (isValidElement(children)) {
    const props = children.props as { className?: string; children?: ReactNode }
    const m = String(props.className || '').match(/language-([\\w-]+)/)
    lang = m ? m[1] : 'text'
    text = textOf(props.children)
  } else {
    text = textOf(children)
  }
  const onCopy = async () => {
    try {
      await navigator.clipboard.writeText(text)
      setCopied(true)
      setTimeout(() => setCopied(false), 1600)
    } catch {
      /* \u5FFD\u7565 */
    }
  }
  return (
    <div className="code-block">
      <div className="code-block-head">
        <span>{lang}</span>
        <button type="button" onClick={onCopy} className="code-copy" aria-label={t.copyCode}>
          <Copy className="size-3.5" aria-hidden />
          {copied ? t.copied : t.copy}
        </button>
      </div>
      <pre className="code-block-body">{children}</pre>
    </div>
  )
}

/** \u7EC4\u4EF6\u6620\u5C04\uFF1A\u4F9D\u8D56\u9644\u4EF6\u7D22\u5F15\uFF08assetSet\uFF09\uFF0C\u968F linkIndex \u53D8\u5316\u91CD\u5EFA */
function buildComponents(assetSet: Set<string>): Components {
  return {
    a: MdLink as Components['a'],
    img: ((props: { src?: string; alt?: string }) => (
      <MdImage {...props} assetSet={assetSet} />
    )) as Components['img'],
    div: MdDiv as Components['div'],
  details: ({ className, children }) => (
    <details className={className}>{children}</details>
  ),
  summary: ({ className, children, ...rest }) => {
    const cn = String(className || '')
    if (cn.includes('callout-title')) {
      const type = String((rest as Record<string, unknown>)['data-callout-type'] || 'note')
      return <CalloutTitle type={type}>{children}</CalloutTitle>
    }
    return <summary className={className}>{children}</summary>
  },
  mark: ({ children }) => <mark className="obsidian-highlight">{children}</mark>,
  pre: ({ children }) => <CodeBlock>{children}</CodeBlock>,
  code: ({ className, children }) => {
    if (String(className || '').includes('language-')) {
      return <code className={className}>{children}</code>
    }
    return <code className="inline-code">{children}</code>
  },
  table: ({ children }) => (
    <div className="table-wrap">
      <table>{children}</table>
    </div>
  ),
  input: ({ checked, type }) =>
    type === 'checkbox' ? (
      <input type="checkbox" checked={!!checked} readOnly className="task-checkbox" />
    ) : null,
  h1: ({ node, children }) => <h1 id={headingIdOfNode(node, children)}>{children}</h1>,
  h2: ({ node, children }) => <h2 id={headingIdOfNode(node, children)}>{children}</h2>,
  h3: ({ node, children }) => <h3 id={headingIdOfNode(node, children)}>{children}</h3>,
  h4: ({ node, children }) => <h4 id={headingIdOfNode(node, children)}>{children}</h4>,
  h5: ({ node, children }) => <h5 id={headingIdOfNode(node, children)}>{children}</h5>,
  h6: ({ node, children }) => <h6 id={headingIdOfNode(node, children)}>{children}</h6>,
  }
}

/**
 * \u6807\u9898\u951A\u70B9 id\uFF1A\u4F18\u5148\u7528 remark \u9636\u6BB5\u7B97\u597D\u7684\uFF08remark-obsidian.ts \u5728 mdast \u4E0A\u6253 id\uFF09\uFF0C
 * \u56E0\u4E3A\u90A3\u91CC\u516C\u5F0F\u8FD8\u662F inlineMath\uFF08TeX \u539F\u6587\uFF09\uFF0C\u4E0E\u5927\u7EB2\u4FA7 id \u4E00\u81F4\u3002
 * \u62FF\u4E0D\u5230\uFF08\u4F8B\u5982\u6CA1\u8D70\u63D2\u4EF6\u7684\u964D\u7EA7\u8DEF\u5F84\uFF09\u624D\u9000\u56DE children \u53D6\u6587\u672C\u3002
 */
function headingIdOfNode(node: unknown, children: ReactNode): string {
  const id = (node as { properties?: { id?: unknown } } | undefined)?.properties?.id
  if (typeof id === 'string' && id) return id
  return headingId(textOf(children))
}

export interface MarkdownRendererProps {
  raw: string
  linkIndex: LinkIndex | null
  /** \u5F53\u524D\u7B14\u8BB0 slug\uFF1A\u6E32\u67D3 [[#^\u5757id]] \u7EAF\u5757\u5F15\u7528\u94FE\u63A5\u65F6\u9700\u8981 */
  currentSlug?: string
}

/** Obsidian Markdown \u6E32\u67D3\u5668\uFF08\u542B wikilink / callout / \u9AD8\u4EAE / \u516C\u5F0F / \u539F\u59CB HTML\uFF09 */
export function MarkdownRenderer({ raw, linkIndex, currentSlug }: MarkdownRendererProps) {
  const [lightbox, setLightbox] = useState<string | null>(null)
  const content = useMemo(() => parseNote(raw).content, [raw])
  // callout \u9ED8\u8BA4\u6807\u9898/\u5757\u5F15\u7528\u515C\u5E95\u6587\u6848\u662F\u754C\u9762\u6587\u6848\uFF0C\u8DDF\u7740\u5F53\u524D\u8BED\u8A00\u8D70
  const t = useT()
  const remarkPlugins = useMemo(
    () =>
      [
        remarkGfm,
        remarkMath,
        // \u7D27\u8DDF remarkMath\uFF1A\u628A\u300C\`$$\` \u4E0E\u516C\u5F0F\u540C\u884C\u300D\u65F6\u88AB\u8BEF\u5F53\u6210 meta \u7684\u9996\u884C\u5E76\u56DE\u516C\u5F0F\u4F53
        remarkMathMetaFix,
        [
          remarkObsidian,
          {
            notes: linkIndex?.notes ?? [],
            assets: linkIndex?.assets ?? [],
            currentSlug,
            currentRaw: content,
            labels: t.calloutLabel as unknown as Record<string, string>,
            blockRefLabel: t.blockRef,
          },
        ],
      ] as Pluggable[],
    [linkIndex, currentSlug, content, t]
  )
  const components = useMemo(
    () =>
      buildComponents(
        new Set((linkIndex?.assets ?? []).map((a) => a.path.replace(/\\\\/g, '/').replace(/^\\.\\//, '')))
      ),
    [linkIndex]
  )
  return (
    <div
      className="markdown-body"
      onClick={(e) => {
        const t = e.target as HTMLElement
        if (t instanceof HTMLImageElement && t.src) {
          e.preventDefault()
          e.stopPropagation()
          setLightbox(t.src)
        }
      }}
    >
      <ReactMarkdown
        remarkPlugins={remarkPlugins}
        rehypePlugins={[rehypeRaw, rehypeSafety, rehypeHighlight, rehypeKatex]}
        components={components}
        urlTransform={(url) =>
          // react-markdown \u9ED8\u8BA4\u4F1A\u5265\u6389\u4E0D\u8BA4\u8BC6\u7684\u534F\u8BAE\uFF0C\u5BFC\u81F4 obsidian-note:/obsidian-tag: \u94FE\u63A5
          // \u53D8\u6210 href=""\uFF08\u70B9\u51FB\u7B49\u4E8E\u5237\u65B0\u5F53\u524D\u9875\uFF09\uFF1B\u8FD9\u91CC\u653E\u884C\u6E32\u67D3\u7BA1\u7EBF\u81EA\u5DF1\u7684\u4E09\u4E2A\u534F\u8BAE\uFF0C
          // \u5176\u4F59\u4ECD\u8D70\u9ED8\u8BA4\u51C0\u5316\uFF08\u5371\u9669\u534F\u8BAE\u53E6\u6709 rehypeSafety \u515C\u5E95\uFF09
          /^(obsidian-note:|obsidian-tag:|obsidian-unresolved:)/i.test(url)
            ? url
            : defaultUrlTransform(url)
        }
      >
        {content}
      </ReactMarkdown>
      <Dialog open={!!lightbox} onOpenChange={(o) => !o && setLightbox(null)}>
        <DialogContent
          className="max-w-4xl border-0 bg-transparent p-2 [&>button]:bg-background/80 [&>button]:rounded-full"
          closeLabel={t.close}
        >
          {lightbox && (
            <img
              src={lightbox}
              alt={t.attachmentPreview}
              className="mx-auto max-h-[82vh] w-auto rounded-lg shadow-2xl"
            />
          )}
        </DialogContent>
      </Dialog>
    </div>
  )
}
` }, "src/components/blog/note-preview.tsx": { "t": "utf8", "v": `'use client'

import { createContext, useContext, useEffect, useRef, type ReactNode } from 'react'
import { createPortal } from 'react-dom'
import { useQuery } from '@tanstack/react-query'
import { Lock } from 'lucide-react'
import { fetchLinkIndex, fetchNoteDetail } from '@/lib/api'
import { extractBlockText, extractHeadingSection, headingIdFromText } from '@/lib/obsidian'
import { useBlog } from '@/lib/store'
import { useT } from '@/lib/i18n'
import { MarkdownRenderer } from '@/components/blog/markdown'

/** \u662F\u5426\u5904\u4E8E\u60AC\u6D6E\u9884\u89C8\u5185\u90E8\uFF08\u9884\u89C8\u91CC\u7684\u94FE\u63A5\u4E0D\u518D\u5D4C\u5957\u5F39\u7A97\uFF09 */
const PreviewDepth = createContext(false)
export function useInsidePreview(): boolean {
  return useContext(PreviewDepth)
}

interface NotePreviewPopupProps {
  slug: string
  /** \u6BB5\u843D\u6807\u9898\uFF08headingLabel \u4E4B\u540E\u7684\u5F62\u5F0F\uFF09\u6216\u5757 ID\uFF08^xxx\uFF09 */
  heading?: string
  anchor: HTMLElement
  onClose: () => void
  onKeepOpen: () => void
}

/** Obsidian \u98CE\u683C\u7684\u94FE\u63A5\u60AC\u6D6E\u9884\u89C8\u6D6E\u7A97 */
export function NotePreviewPopup({ slug, heading, anchor, onClose, onKeepOpen }: NotePreviewPopupProps) {
  const t = useT()
  // \u9759\u6001\u7AD9\u7EAF\u53EA\u8BFB\uFF1A\u65E0\u7BA1\u7406\u89C6\u56FE
  const isAdmin = false
  const cardRef = useRef<HTMLDivElement | null>(null)

  // \u4E0E\u6B63\u6587\u9875\u5171\u7528 react-query \u7F13\u5B58\uFF08\u540C\u6837\u7684 key\uFF0C\u4E0D\u91CD\u590D\u8BF7\u6C42\uFF09
  const { data, isLoading } = useQuery({
    queryKey: ['note', slug, isAdmin],
    queryFn: () => fetchNoteDetail(slug),
    staleTime: 60_000,
  })
  const { data: linkIndex } = useQuery({
    queryKey: ['link-index', isAdmin],
    queryFn: () => fetchLinkIndex(),
    staleTime: 30_000,
  })

  // \u5B9A\u4F4D\uFF1A\u5BBD=\u539F\u6587\u5BBD\u5EA6\uFF0C\u9AD8=\u89C6\u53E3\u7684 80%\uFF1B\u8D34\u7740\u94FE\u63A5\u4E0B\u65B9\u5C55\u5F00\uFF0C\u7A7A\u95F4\u4E0D\u8DB3\u7FFB\u5230\u4E0A\u65B9\uFF0C\u5939\u5728\u89C6\u53E3\u5185
  const article = document.querySelector('article')
  const width = Math.min(article?.clientWidth ?? 600, window.innerWidth - 24)
  const rect = anchor.getBoundingClientRect()
  const left = Math.max(12, Math.min(rect.left, window.innerWidth - width - 12))
  const maxH = Math.round(window.innerHeight * 0.8)
  let top = rect.bottom + 8
  if (top + maxH > window.innerHeight - 12) {
    const above = rect.top - 8 - maxH
    top = above > 12 ? above : Math.max(12, window.innerHeight - maxH - 12)
  }

  // Escape / \u9875\u9762\u6EDA\u52A8 / \u70B9\u51FB\u6D6E\u7A97\u5916\u5173\u95ED\uFF08\u6D6E\u7A97\u5185\u90E8\u7684\u6EDA\u52A8\u9664\u5916\uFF0C\u5426\u5219\u6CA1\u6CD5\u5728\u6D6E\u7A97\u91CC\u6EDA\u8BFB\uFF09
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose()
    }
    const onScroll = (e: Event) => {
      if (cardRef.current && e.target instanceof Node && cardRef.current.contains(e.target)) return
      onClose()
    }
    const onDocMouseDown = (e: MouseEvent) => {
      const t = e.target as Node
      if (cardRef.current?.contains(t) || anchor.contains(t)) return
      onClose()
    }
    window.addEventListener('keydown', onKey)
    window.addEventListener('scroll', onScroll, true)
    document.addEventListener('mousedown', onDocMouseDown)
    return () => {
      window.removeEventListener('keydown', onKey)
      window.removeEventListener('scroll', onScroll, true)
      document.removeEventListener('mousedown', onDocMouseDown)
    }
  }, [onClose, anchor])

  const blockId = heading?.startsWith('^') ? heading.slice(1) : undefined
  const isBlockRef = !!blockId

  // \u300C\u6253\u5F00\u7B14\u8BB0 \u2197\u300D\u6539\u4E3A\u65B0\u6807\u7B7E\u9875\u6253\u5F00\uFF0C\u6240\u4EE5\u8FD9\u91CC\u5FC5\u987B\u662F\u771F\u5B9E\u53EF\u8DF3\u8F6C\u7684 URL\uFF0C
  // \u4E0D\u80FD\u8D70 navigateToNote\uFF08\u90A3\u662F SPA \u5185\u90E8\u6539\u72B6\u6001\uFF0C\u53EA\u4F1A\u6362\u6389\u5F53\u524D\u9875\uFF09\u3002
  // \u5E26 h \u662F\u4E3A\u4E86 [[\u7B14\u8BB0#\u5C0F\u8282]]\uFF1A\u65B0\u6807\u7B7E\u52A0\u8F7D\u540E store \u4ECE ?h= \u6062\u590D pendingHeading\uFF0C\u540C\u6837\u5B9A\u4F4D\u5230\u5C0F\u8282\u3002
  // ^\u5757\u5F15\u7528\u4E0D\u9002\u7528\u5C0F\u8282\u5B9A\u4F4D\uFF08isBlockRef\uFF09\uFF0C\u8DF3\u8FC7\u3002
  const noteHref = (() => {
    const p = new URLSearchParams()
    p.set('note', slug)
    if (heading && !isBlockRef) p.set('h', heading)
    return '?' + p.toString()
  })()

  // \u6BB5\u843D\u94FE\u63A5\uFF1A\u6E32\u67D3\u5B8C\u6210\u540E\u6EDA\u52A8\u5230\u76EE\u6807\u6807\u9898\u5E76\u77ED\u6682\u9AD8\u4EAE
  // \u591A\u7EA7\u6807\u9898\u8DEF\u5F84\uFF08[[\u7B14\u8BB0#A#B]]\uFF09\u4EE5\u6700\u540E\u4E00\u6BB5\u4E3A\u51C6\uFF0C\u4E0E Obsidian \u8BED\u4E49\u4E00\u81F4
  useEffect(() => {
    if (!data || data === 'private' || data === 'not_found' || isBlockRef || !heading) return
    const targetHeading = heading.split('#').pop()?.trim() || heading
    const timer = window.setTimeout(() => {
      const el = cardRef.current?.querySelector('#' + CSS.escape(headingIdFromText(targetHeading)))
      if (!el) return
      el.scrollIntoView({ block: 'start' })
      const node = el as HTMLElement
      node.style.transition = 'background-color 0.3s'
      node.style.backgroundColor = 'color-mix(in srgb, var(--primary) 18%, transparent)'
      window.setTimeout(() => {
        node.style.backgroundColor = ''
      }, 1600)
    }, 120)
    return () => window.clearTimeout(timer)
  }, [data, heading, isBlockRef])

  let title: string = t.loading
  let body: ReactNode = (
    <div className="space-y-2 py-1">
      <div className="h-3.5 w-2/3 animate-pulse rounded bg-muted" />
      <div className="h-3 w-full animate-pulse rounded bg-muted" />
      <div className="h-3 w-5/6 animate-pulse rounded bg-muted" />
    </div>
  )
  if (data === 'private') {
    title = t.notPublic
    body = (
      <div className="flex items-center gap-2 py-3 text-sm text-muted-foreground">
        <Lock className="size-4" aria-hidden />
        {t.privateByAuthor}
      </div>
    )
  } else if (data === 'not_found') {
    title = t.noteMissing
    body = <div className="py-3 text-sm text-muted-foreground">{t.noteMissingBody}</div>
  } else if (data) {
    const note = data.note
    title = note.title
    if (isBlockRef) {
      const block = extractBlockText(note.content, blockId)
      body = block ? (
        <MarkdownRenderer raw={block} linkIndex={linkIndex ?? null} currentSlug={slug} />
      ) : (
        <div>
          <p className="mb-2 text-xs text-muted-foreground">{t.blockNotFound}</p>
          <MarkdownRenderer raw={note.raw} linkIndex={linkIndex ?? null} currentSlug={slug} />
        </div>
      )
    } else {
      // \u5F15\u7528\u7684\u662F\u67D0\u4E00\u5C0F\u8282\u65F6\uFF0C\u53EA\u663E\u793A\u90A3\u4E00\u8282\u7684\u533A\u95F4\uFF08\u5230\u4E0B\u4E00\u4E2A\u540C\u7EA7/\u66F4\u9AD8\u7EA7\u6807\u9898\u4E3A\u6B62\uFF09\uFF0C
      // \u800C\u4E0D\u662F\u628A\u6574\u7BC7\u7B14\u8BB0\u90FD\u585E\u8FDB\u6D6E\u7A97 \u2014\u2014 \u4E0E Obsidian \u7684\u60AC\u6D6E\u9884\u89C8\u4E00\u81F4\u3002
      const section = heading ? extractHeadingSection(note.content, heading) : null
      if (heading && section == null) {
        body = (
          <div>
            <p className="mb-2 text-xs text-muted-foreground">{t.sectionMissing}</p>
            <MarkdownRenderer raw={note.raw} linkIndex={linkIndex ?? null} currentSlug={slug} />
          </div>
        )
      } else {
        body = <MarkdownRenderer raw={section ?? note.raw} linkIndex={linkIndex ?? null} currentSlug={slug} />
      }
    }
  }

  return createPortal(
    <PreviewDepth.Provider value={true}>
      <div
        ref={cardRef}
        className="note-preview fixed z-[60] overflow-hidden rounded-xl border border-border bg-background shadow-2xl"
        style={{ left, top, width, maxHeight: maxH }}
        onMouseEnter={onKeepOpen}
        onMouseLeave={onClose}
      >
        <div className="flex items-center justify-between gap-2 border-b bg-muted/40 px-3 py-1.5">
          <span className="truncate text-xs font-medium text-foreground/80">{title}</span>
          <a
            href={noteHref}
            target="_blank"
            rel="noopener noreferrer"
            title={t.openNoteNewTab}
            className="shrink-0 rounded px-1.5 py-0.5 text-xs text-muted-foreground transition-colors hover:bg-background hover:text-primary"
            onClick={(e) => {
              // \u6D6E\u7A97\u662F createPortal \u6E32\u67D3\u5728\u6B63\u6587\u94FE\u63A5 <a> \u7684 children \u91CC\u7684\uFF0CReact \u4E8B\u4EF6\u6309\u7EC4\u4EF6\u6811\u5192\u6CE1\uFF0C
              // \u4E0D stopPropagation \u4F1A\u4E00\u8DEF\u5192\u5230\u5916\u5C42 <a onClick> \u2192 navigateToNote \u2192 \u5F53\u524D\u9875\u4E5F\u88AB\u6362\u6389\uFF0C
              // \u53D8\u6210\u300C\u65B0\u6807\u7B7E + \u5F53\u524D\u9875\u4E00\u8D77\u8DF3\u300D\u3002\u8FD9\u91CC\u53EA\u8BE5\u5F00\u65B0\u6807\u7B7E\uFF0C\u5F53\u524D\u9875\u4FDD\u6301\u4E0D\u52A8\u3002
              e.stopPropagation()
              onClose()
            }}
          >
            {t.openNoteArrow}
          </a>
        </div>
        <div className="max-h-[calc(80vh-34px)] overflow-y-auto px-4 py-3">{body}</div>
      </div>
    </PreviewDepth.Provider>,
    document.body
  )
}
` }, "src/components/blog/note-view.tsx": { "t": "utf8", "v": `'use client'

import {
  useEffect,
  useMemo,
  useRef,
  useState,
  type CSSProperties,
  type PointerEvent as ReactPointerEvent,
  type ReactNode,
} from 'react'
import { useQuery, useQueryClient } from '@tanstack/react-query'
import {
  ArrowLeft,
  Calendar,
  FileText,
  Hash,
  Link2,
  ListTree,
  Lock,
  Minus,
  Move,
  Pencil,
  RotateCw,
} from 'lucide-react'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Skeleton } from '@/components/ui/skeleton'
import {
  fetchLinkIndex,
  fetchNoteDetail,
  type RefItem,
} from '@/lib/api'
import katex from 'katex'
import {
  extractHeadings,
  splitHeadingSegments,
  stripInlineFormatting,
  type HeadingEntry,
} from '@/lib/obsidian'
import { useBlog } from '@/lib/store'
import { clearSearchHighlight, jumpToText } from '@/lib/find-text'
import { useT } from '@/lib/i18n'
import { T } from '@/components/blog/t-text'
import { MarkdownRenderer } from '@/components/blog/markdown'

/**
 * \u5927\u7EB2\u6761\u76EE\u6587\u5B57\uFF1A\u516C\u5F0F\u4EA4\u7ED9 KaTeX\uFF0C\u884C\u5185\u6392\u7248\uFF08**\u7C97\u4F53**\u3001*\u659C\u4F53*\u3001~~\u5220\u9664\u7EBF~~\u3001
 * ==\u9AD8\u4EAE==\u3001\`\u4EE3\u7801\`\uFF09\u5168\u90E8\u6E32\u67D3\u6210\u771F\u6B63\u7684\u5143\u7D20 \u2014\u2014 \u5927\u7EB2\u91CC\u4E0D\u5141\u8BB8\u51FA\u73B0 markdown \u539F\u6587\u6807\u8BB0\u3002
 */
function HeadingText({ text }: { text: string }) {
  const segs = useMemo(() => splitHeadingSegments(text), [text])
  return (
    <>
      {segs.map((s, i) =>
        s.type === 'math' ? (
          <span
            key={i}
            className="toc-math"
            dangerouslySetInnerHTML={{
              __html: renderMath(s.value),
            }}
          />
        ) : (
          <span key={i}>{renderInlineMarkup(s.value)}</span>
        )
      )}
    </>
  )
}

/**
 * \u628A\u4E00\u6BB5\u6807\u9898\u6587\u5B57\u91CC\u7684\u884C\u5185\u6807\u8BB0\u6E32\u67D3\u6210\u5143\u7D20\uFF08\u9012\u5F52\u652F\u6301\u5D4C\u5957\uFF09\u3002
 * \`_\u659C\u4F53_\` \u53EA\u5728\u8BCD\u8FB9\u754C\u4E0A\u8BC6\u522B\uFF0C\u907F\u514D\u628A \`snake_case\` \u8FD9\u7C7B\u6807\u9898\u5403\u6389\u4E0B\u5212\u7EBF\uFF1B
 * \u8FD9\u91CC\u523B\u610F\u4E0D\u7528\u540E\u884C\u65AD\u8A00\uFF08lookbehind\uFF09\uFF0C\u65E7\u7248 Safari \u4F1A\u5728\u89E3\u6790\u9636\u6BB5\u76F4\u63A5\u62A5\u9519\u3002
 */
function renderInlineMarkup(src: string): ReactNode {
  const out: ReactNode[] = []
  // \u987A\u5E8F\u5F88\u91CD\u8981\uFF1A*** / ** / * \u7531\u957F\u5230\u77ED\uFF0C\u4E14\u6536\u5C3E\u4E0D\u5141\u8BB8\u662F\u66F4\u957F\u661F\u53F7\u4E32\u7684\u4E00\u90E8\u5206
  //\uFF08\`**\u5D4C\u5957*\u659C\u4F53***\` \u82E5\u8BA9 \`**\` \u5148\u5403\u6389 \`***\` \u7684\u524D\u4E24\u4E2A\u661F\u53F7\uFF0C\u5C31\u4F1A\u6F0F\u6389\u91CC\u9762\u7684\u659C\u4F53\uFF09\u3002
  const re =
    /\\*\\*\\*([\\s\\S]+?)\\*\\*\\*|\\*\\*([\\s\\S]+?)\\*\\*(?!\\*)|__([\\s\\S]+?)__(?!_)|~~([\\s\\S]+?)~~|==([\\s\\S]+?)==|\`([^\`\\n]+)\`|(^|[^\\w])_([^_\\n]+?)_(?=[^\\w]|$)|(\\*)([^*\\n]+?)\\*/g
  let last = 0
  let key = 0
  let m: RegExpExecArray | null
  while ((m = re.exec(src)) !== null) {
    if (m.index > last) out.push(src.slice(last, m.index))
    if (m[1] !== undefined) {
      // ***\u7C97\u659C*** = \u52A0\u7C97 + \u659C\u4F53
      out.push(
        <strong key={key++}>
          <em>{renderInlineMarkup(m[1])}</em>
        </strong>
      )
    } else if (m[2] !== undefined) {
      out.push(<strong key={key++}>{renderInlineMarkup(m[2])}</strong>)
    } else if (m[3] !== undefined) {
      out.push(<strong key={key++}>{renderInlineMarkup(m[3])}</strong>)
    } else if (m[4] !== undefined) {
      out.push(<s key={key++}>{renderInlineMarkup(m[4])}</s>)
    } else if (m[5] !== undefined) {
      out.push(
        <mark key={key++} className="toc-hl">
          {renderInlineMarkup(m[5])}
        </mark>
      )
    } else if (m[6] !== undefined) {
      out.push(
        <code key={key++} className="toc-code">
          {m[6]}
        </code>
      )
    } else if (m[8] !== undefined) {
      if (m[7]) out.push(m[7])
      out.push(<em key={key++}>{renderInlineMarkup(m[8])}</em>)
    } else if (m[10] !== undefined) {
      out.push(<em key={key++}>{renderInlineMarkup(m[10])}</em>)
    }
    last = re.lastIndex
  }
  if (last < src.length) out.push(src.slice(last))
  // \u6B8B\u7559\u7684\u5B64\u7ACB\u6807\u8BB0\uFF08\u5982\u6807\u9898\u5199\u6210\u300C\u4E8C\u5EA6\u8FDB\u9636***\u300D\uFF0CCommonMark \u4E5F\u4E0D\u4F1A\u628A\u5B83\u5F53\u5F3A\u8C03\uFF09
  // \u5728\u9996\u5C3E\u4E00\u5E76\u6E05\u6389\uFF0C\u907F\u514D\u5927\u7EB2\u91CC\u51FA\u73B0\u5149\u79C3\u79C3\u7684 *** \u2014\u2014 \u4F46\u53EA\u52A8\u4E24\u7AEF\uFF0C
  // \u4E2D\u95F4\u7684\u6587\u5B57\uFF08\`a=b\`\u3001\`snake_case\`\u3001\`__int128\`\uFF09\u539F\u6837\u4FDD\u7559\u3002
  if (out.length && typeof out[0] === 'string') {
    out[0] = (out[0] as string).replace(/^[*~=]+/, '')
  }
  const tail = out.length - 1
  if (tail >= 0 && typeof out[tail] === 'string') {
    out[tail] = (out[tail] as string).replace(/[*~=]+$/, '')
  }
  return out
}

function renderMath(tex: string): string {
  try {
    return katex.renderToString(tex, { throwOnError: false, displayMode: false })
  } catch {
    return tex
  }
}

function RefList({
  title,
  items,
  onOpen,
}: {
  title: string
  items: RefItem[]
  onOpen: (slug: string) => void
}) {
  const t = useT()
  if (items.length === 0) return null
  return (
    <div className="mt-10 rounded-xl border border-border/70 bg-muted/30 p-4">
      <h3 className="mb-3 flex items-center gap-1.5 text-sm font-semibold text-muted-foreground">
        <Link2 className="size-3.5" aria-hidden />
        {title}
        <span className="text-xs opacity-60">{items.length}</span>
      </h3>
      <div className="flex flex-wrap gap-2">
        {items.map((r) => (
          <button
            key={r.slug}
            type="button"
            onClick={() => onOpen(r.slug)}
            className="inline-flex items-center gap-1.5 rounded-lg border border-border bg-background px-3 py-1.5 text-sm transition-colors hover:border-primary/50 hover:text-primary"
          >
            {r.isPublic === false && <Lock className="size-3 text-muted-foreground" aria-hidden />}
            {r.resolved === false && (
              <span className="text-xs text-muted-foreground/70" title={t.notUploaded}>
                {t.notCreated}
              </span>
            )}
            {r.title}
          </button>
        ))}
      </div>
    </div>
  )
}

function PrivateLock({ slug }: { slug: string }) {
  const goHome = useBlog((s) => s.goHome)
  return (
    <div className="mx-auto max-w-md rounded-2xl border border-dashed p-10 text-center">
      <div className="mx-auto flex size-14 items-center justify-center rounded-full bg-muted">
        <Lock className="size-7 text-muted-foreground" aria-hidden />
      </div>
      <h2 className="mt-4 font-serif text-xl font-semibold">
        <T k="notPublic" />
      </h2>
      <p className="mt-2 text-sm text-muted-foreground">
        <T k="notPublicBody" />
      </p>
      <p className="mt-1 break-all text-xs text-muted-foreground/60">{slug}</p>
      <Button variant="outline" className="mt-4" onClick={() => goHome()}>
        <T k="goHome" />
      </Button>
    </div>
  )
}

export function NoteView({ slug }: { slug: string }) {
  const goHome = useBlog((s) => s.goHome)
  const openFolder = useBlog((s) => s.openFolder)
  const navigateToNote = useBlog((s) => s.navigateToNote)
  const setTag = useBlog((s) => s.setTag)
  const pendingHeading = useBlog((s) => s.pendingHeading)
  const clearPendingHeading = useBlog((s) => s.clearPendingHeading)
  const pendingText = useBlog((s) => s.pendingText)
  const clearPendingText = useBlog((s) => s.clearPendingText)
  const t = useT()
  // \u9759\u6001\u7AD9\u662F\u7EAF\u53EA\u8BFB\u7684\uFF1A\u6CA1\u6709\u7BA1\u7406\u89C6\u56FE\uFF0Cfrontmatter / \u539F\u6587 Tab \u4E00\u5F8B\u4E0D\u53EF\u7528
  const isAdmin = false

  const { data, isLoading, isError, isFetching } = useQuery({
    queryKey: ['note', slug, isAdmin],
    queryFn: () => fetchNoteDetail(slug),
  })

  const { data: linkIndex } = useQuery({
    queryKey: ['link-index', isAdmin],
    queryFn: () => fetchLinkIndex(),
  })

  const queryClient = useQueryClient()

  // \u91CD\u8BD5\uFF1AresetQueries \u91CD\u7F6E\u67E5\u8BE2\u72B6\u6001\u5E76\u91CD\u65B0\u62C9\u53D6\u3002\u53EA\u8C03 refetch() \u4E0D\u591F \u2014\u2014
  // \u67E5\u8BE2\u82E5\u88AB React Query \u6302\u8D77\uFF08fetchStatus \u4E3A 'paused'\uFF09\uFF0Crefetch \u4E0D\u4F1A\u771F\u7684\u53D1\u8BF7\u6C42\uFF0C
  // \u8868\u73B0\u6210\u300C\u6309\u94AE\u70B9\u4E86\u6CA1\u53CD\u5E94\u300D\uFF1B\u91CD\u7F6E\u72B6\u6001\u80FD\u4FDD\u8BC1\u91CD\u65B0\u8D70\u4E00\u6B21\u8BF7\u6C42\u3002
  const retryLoad = () => {
    void queryClient.resetQueries({ queryKey: ['note', slug, isAdmin] })
  }

  // \u5927\u7EB2\u6570\u636E\u5FC5\u987B\u5728\u6240\u6709\u63D0\u524D return \u4E4B\u524D\u8BA1\u7B97\uFF08Rules of Hooks\uFF1A\u6BCF\u6B21\u6E32\u67D3 hook \u6570\u91CF\u8981\u4E00\u81F4\uFF09
  const headings = useMemo(
    () =>
      data && data !== 'private' && data !== 'not_found'
        ? extractHeadings(data.note.content)
        : [],
    [data],
  )

  useEffect(() => {
    if (data && data !== 'private' && data !== 'not_found' && pendingHeading) {
      // \u591A\u7EA7\u6807\u9898\u8DEF\u5F84\uFF08[[\u7B14\u8BB0#A#B]]\uFF09\u53D6\u6700\u540E\u4E00\u6BB5\u4F5C\u4E3A\u8DF3\u8F6C\u76EE\u6807
      const target = pendingHeading.split('#').pop() ?? pendingHeading
      const id = target
        .replace(/^#+/, '')
        .trim()
        .toLowerCase()
        .replace(/\\s+/g, '-')
        .replace(/[^\\p{L}\\p{N}\\-_]/gu, '')
      clearPendingHeading()
      if (!id) return
      // \u65B0\u6807\u7B7E\u9875\u6253\u5F00\u65F6\u5185\u5BB9\u662F\u300C\u73B0\u52A0\u8F7D\u73B0\u6392\u7248\u300D\u7684\uFF1A\u4EE3\u7801\u5757\u8BED\u6CD5\u9AD8\u4EAE / \u516C\u5F0F / \u56FE\u7247\u4F1A\u5728\u51E0\u767E\u6BEB\u79D2\u540E
      // \u8FD8\u5728\u628A\u76EE\u6807\u5C0F\u8282\u5F80\u4E0B\u63A8\uFF0C\u65E7\u7684\u300C\u56FA\u5B9A 300ms \u6EDA\u4E00\u6B21\u300D\u5728 SPA \u91CC\u591F\u7528\uFF08\u5185\u5BB9\u65E9\u5DF2\u7F13\u5B58\uFF09\uFF0C
      // \u4F46\u65B0\u6807\u7B7E\u51B7\u52A0\u8F7D\u4F1A\u843D\u7A7A\uFF08\u5B9E\u6D4B\u957F\u7B14\u8BB0\u91CC\u4E00\u6B21\u6027\u6EDA\u52A8\u540E scrollY \u4ECD\u662F 0\uFF09\u3002
      // \u6539\u4E3A\u8F6E\u8BE2\u5230\u5143\u7D20\u51FA\u73B0\u518D\u6EDA\uFF0C\u5E76\u5728\u5176\u540E\u8FDE\u7EED\u591A\u6EDA\u51E0\u6B21\u5438\u6536\u540E\u7EED reflow\uFF0C\u76F4\u5230\u7A33\u5B9A\u6216\u8D85\u65F6\u3002
      // \u6CE8\u610F\uFF1A\u672C effect \u4E0D\u80FD return cleanup \u2014\u2014 \u4E0A\u9762 clearPendingHeading() \u4F1A\u628A pendingHeading
      // dep \u540C\u6B65\u7F6E null \u89E6\u53D1 effect \u7ACB\u5373\u91CD\u8DD1\uFF0CReact \u5148\u6267\u884C\u65E7 cleanup\uFF0Ccancelled \u53CD\u6740\u521A\u8D77\u7684\u8F6E\u8BE2\u3002
      // \u8BA9\u8F6E\u8BE2\u81EA\u5DF1\u7528 tries \u4E0A\u9650\u6536\u5C3E\u5373\u53EF\uFF08\u79BB\u5F00\u9875\u9762\u540E\u5B9A\u65F6\u5668\u81F3\u591A\u591A\u8DD1\u7EA6 4 \u79D2\uFF0C\u65E0\u526F\u4F5C\u7528\uFF09\u3002
      let tries = 0
      const MAX_TRIES = 40
      const step = () => {
        const el = document.getElementById(id)
        if (el) {
          el.scrollIntoView({ behavior: 'auto', block: 'start' })
          if (tries++ < MAX_TRIES && tries < 8) return void setTimeout(step, 200)
          return
        }
        if (tries++ < MAX_TRIES) setTimeout(step, 100)
      }
      setTimeout(step, 80)
    }
  }, [data, pendingHeading, clearPendingHeading])

  // \u6362\u7B14\u8BB0 / \u79BB\u5F00\u65F6\u6E05\u6389\u4E0A\u4E00\u5904\u7684\u9AD8\u4EAE\uFF08CSS Custom Highlight \u662F\u6587\u6863\u7EA7\u7684\uFF09\u3002
  // \u5FC5\u987B\u6392\u5728\u4E0B\u9762\u300C\u8DF3\u5230\u6B63\u6587\u7247\u6BB5\u300D\u7684 effect \u4E4B\u524D\uFF1A\u540C\u4E00\u6279 effect \u6309\u58F0\u660E\u987A\u5E8F\u6267\u884C\uFF0C
  // \u53CD\u8FC7\u6765\u7684\u8BDD\u6302\u8F7D\u65F6\u4F1A\u5148\u9AD8\u4EAE\u518D\u88AB\u8FD9\u91CC\u6E05\u6389\u3002
  useEffect(() => {
    clearSearchHighlight()
    return () => clearSearchHighlight()
  }, [slug])

  // \u641C\u7D22\u547D\u4E2D\u6B63\u6587\u65F6\uFF0C\u7ED3\u679C\u884C\u4F1A\u5E26\u4E00\u53E5\u8BDD\u8FC7\u6765\uFF08pendingText\uFF09\uFF1A\u6253\u5F00\u540E\u6EDA\u5230\u90A3\u53E5\u8BDD\u4E0A\u5E76\u9AD8\u4EAE\u3002
  // \u4E0E\u4E0A\u9762\u7684 pendingHeading \u4E00\u6837\uFF0C\u8FD9\u91CC**\u4E0D\u80FD return cleanup** \u2014\u2014 clearPendingText() \u4F1A\u628A
  // dep \u540C\u6B65\u7F6E\u7A7A\u89E6\u53D1 effect \u91CD\u8DD1\uFF0CReact \u5148\u8DD1\u65E7 cleanup \u4F1A\u53CD\u6740\u521A\u8D77\u7684\u5B9A\u65F6\u5668\u3002
  useEffect(() => {
    if (!data || data === 'private' || data === 'not_found' || !pendingText) return
    clearPendingText()
    // \u6B63\u6587\u6839\u8282\u70B9\uFF1A\u907F\u5F00\u60AC\u6D6E\u9884\u89C8\u91CC\u7684 .markdown-body\uFF08\u90A3\u4EFD\u662F\u53E6\u4E00\u4E2A\u7EC4\u4EF6\uFF09
    const bodyRoot = () => {
      const all = Array.from(document.querySelectorAll<HTMLElement>('.markdown-body'))
      return all.find((el) => !el.closest('.note-preview')) ?? null
    }
    let tries = 0
    const run = () => {
      const root = bodyRoot()
      // \u6570\u636E\u5DF2\u5C31\u7EEA\uFF0C\u6B63\u6587\u5728\u540C\u4E00\u6B21\u63D0\u4EA4\u91CC\u5C31\u6E32\u67D3\u5B8C\u4E86\uFF0C\u6240\u4EE5\u7B2C\u4E00\u6B21\u57FA\u672C\u90FD\u80FD\u540C\u6B65\u547D\u4E2D\uFF1B
      // \u6CA1\u547D\u4E2D\uFF08\u5D4C\u5165\u7684\u5757\u8FD8\u5728\u61D2\u52A0\u8F7D / \u7247\u6BB5\u88AB\u6807\u8BB0\u5207\u5F00\uFF09\u5C31\u518D\u8BD5\u51E0\u6B21\u3002
      if (root && jumpToText(root, pendingText)) return
      if (tries++ < 20) setTimeout(run, 150)
    }
    run()
  }, [data, pendingText, clearPendingText])

  if (isLoading) {
    return (
      <div className="space-y-4">
        <Skeleton className="h-8 w-2/3" />
        <Skeleton className="h-4 w-1/3" />
        <Skeleton className="h-64 w-full rounded-xl" />
      </div>
    )
  }

  if (data === 'private') return <PrivateLock slug={slug} />

  // \u300C\u52A0\u8F7D\u5931\u8D25\u300D\u4E0E\u300C\u7B14\u8BB0\u4E0D\u5B58\u5728\u300D\u662F\u4E24\u56DE\u4E8B\uFF1A\u7F51\u7EDC\u65AD\u4E86 / \u670D\u52A1\u5668 5xx \u65F6\u4E0D\u8BE5\u8BF4
  // \u300C\u7B14\u8BB0\u4E0D\u5B58\u5728\u6216\u5DF2\u88AB\u5220\u9664\u300D\uFF0C\u90A3\u4F1A\u8BA9\u4EBA\u4EE5\u4E3A\u5185\u5BB9\u88AB\u5220\u4E86\u3002\u8FD9\u91CC\u5206\u5F00\u5E76\u7ED9\u91CD\u8BD5\u6309\u94AE\u3002
  // \u6CE8\u610F\u300C\u6CA1\u6709\u6570\u636E\u300D\u4E0D\u7B49\u4E8E\u300C\u7B14\u8BB0\u4E0D\u5B58\u5728\u300D\uFF1A\u8BF7\u6C42\u8FD8\u6CA1\u843D\u5730\uFF08\u6216 React Query \u56E0\u7F51\u7EDC
  // \u72B6\u6001\u628A\u67E5\u8BE2\u6302\u8D77 paused\uFF09\u65F6 data \u540C\u6837\u662F undefined\uFF0C\u90A3\u79CD\u60C5\u51B5\u8981\u7ED9\u91CD\u8BD5\u800C\u4E0D\u662F
  // \u62A5\u300C\u5DF2\u88AB\u5220\u9664\u300D\u3002\u53EA\u6709\u660E\u786E\u62FF\u5230 'not_found' \u624D\u8BF4\u7B14\u8BB0\u4E0D\u5B58\u5728\u3002
  if (isError || (!data && !isLoading)) {
    return (
      <div className="rounded-xl border border-dashed p-10 text-center">
        <RotateCw className="mx-auto size-10 text-muted-foreground/50" aria-hidden />
        <p className="mt-3 font-medium">
          <T k="noteLoadFailed" />
        </p>
        <Button variant="outline" className="mt-4" disabled={isFetching} onClick={retryLoad}>
          {isFetching ? t.loading : <T k="retry" />}
        </Button>
      </div>
    )
  }

  if (data === 'not_found') {
    return (
      <div className="rounded-xl border border-dashed p-10 text-center">
        <FileText className="mx-auto size-10 text-muted-foreground/50" aria-hidden />
        <p className="mt-3 font-medium">
          <T k="notFound" />
        </p>
        <Button variant="outline" className="mt-4" onClick={() => goHome()}>
          <T k="goHome" />
        </Button>
      </div>
    )
  }

  // \u7EAF\u7C7B\u578B\u6536\u7A84\uFF1A\u4E0A\u9762\u7684\u5206\u652F\u5DF2\u7ECF\u628A\u300C\u52A0\u8F7D\u4E2D / \u79C1\u5BC6 / \u5931\u8D25 / \u4E0D\u5B58\u5728\u300D\u90FD\u8FD4\u56DE\u6389\u4E86\uFF0C
  // \u8FD9\u91CC data \u5FC5\u7136\u662F\u7B14\u8BB0\u5BF9\u8C61\u3002\u4FDD\u7559\u8FD9\u4E2A return \u662F\u4E3A\u4E86\u8BA9 TS \u80FD\u63A8\u65AD\u51FA\u6765\u3002
  if (!data) return null

  const { note, backlinks, outlinks } = data
  const fm = note.frontmatter

  return (
    <div className="mx-auto w-full max-w-[var(--content-w)]" data-region="note">
      <article className="mx-auto w-full" data-region="article">
      <nav className="mb-4 flex items-center gap-2 text-sm text-muted-foreground" aria-label={t.back}>
        <button
          type="button"
          onClick={() => goHome()}
          className="inline-flex items-center gap-1 rounded px-1 py-0.5 transition-colors hover:text-foreground"
        >
          <ArrowLeft className="size-4" aria-hidden />
          <T k="back" />
        </button>
        {note.folder && (
          <span className="opacity-60">
            /{' '}
            <button
              type="button"
              onClick={() => openFolder(note.folder)}
              className="rounded px-0.5 transition-colors hover:text-foreground hover:underline"
              title={t.openFolder(note.folder)}
            >
              {note.folder.split('/').join(' \u203A ')}
            </button>{' '}
            /
          </span>
        )}
        <span className="truncate font-medium text-foreground/80">{note.title}</span>
      </nav>

      <header className="mb-8">
        <h1 className="font-serif text-3xl font-bold leading-tight tracking-tight sm:text-4xl">
          {note.title}
        </h1>
        <div className="mt-3 flex flex-wrap items-center gap-x-4 gap-y-2 text-xs text-muted-foreground">
          <span className="inline-flex items-center gap-1">
            <Calendar className="size-3.5" aria-hidden />
            {(note.noteDate ?? note.updatedAt).slice(0, 10)}
          </span>
          <span className="inline-flex items-center gap-1">
            <Pencil className="size-3.5" aria-hidden />
            <T k="words" args={[note.wordCount]} />
          </span>
          {note.tags.length > 0 && (
            <span className="inline-flex flex-wrap items-center gap-1.5">
              {note.tags.map((tag) => (
                <Badge
                  key={tag}
                  variant="secondary"
                  className="cursor-pointer font-normal hover:bg-primary/20"
                  onClick={() => setTag(tag)}
                >
                  <Hash className="size-2.5" aria-hidden />
                  {tag}
                </Badge>
              ))}
            </span>
          )}
        </div>
      </header>

      {/* \u9759\u6001\u7AD9\u6CA1\u6709\u300C\u6E90\u7801\u300D\u89C6\u56FE\uFF1A\u539F\u6837\u8F93\u51FA Markdown \u662F\u7BA1\u7406\u7AEF\u7684\u804C\u8D23\uFF0C\u8FD9\u91CC\u53EA\u6E32\u67D3\u6B63\u6587\u3002
          \u66FE\u7528 Tabs \u505A\u8FC7\u300C\u9605\u8BFB / \u6E90\u7801\u300D\u5207\u6362\uFF0C\u4F46 isAdmin \u6052\u4E3A false\uFF0C\u6E90\u7801\u90A3\u4E2A Tab \u6C38\u8FDC
          \u662F disabled \u7684\u5047\u5207\u6362\uFF0C\u70B9\u4E0D\u52A8\u53CD\u800C\u8BA9\u4EBA\u4EE5\u4E3A\u574F\u4E86\uFF0C\u6545\u6574\u4E2A Tabs \u5916\u58F3\u4E00\u5E76\u53BB\u6389\u3002 */}
      <MarkdownRenderer raw={note.raw} linkIndex={linkIndex ?? null} currentSlug={slug} />

      <footer className="mt-12 space-y-6 border-t pt-6">
        {backlinks.length > 0 && (
          <RefList title={t.backlinks} items={backlinks} onOpen={(s) => navigateToNote(s)} />
        )}
        {outlinks.length > 0 && (
          <RefList title={t.outlinks} items={outlinks} onOpen={(s) => navigateToNote(s)} />
        )}
        {fm && Object.keys(fm).length > 0 && isAdmin && (
          <details className="rounded-lg border bg-muted/30 p-3 text-sm">
            <summary className="cursor-pointer font-medium text-muted-foreground">
              {t.frontmatter}
            </summary>
            <pre className="mt-2 overflow-x-auto text-xs text-muted-foreground">
              <code>{JSON.stringify(fm, null, 2)}</code>
            </pre>
          </details>
        )}
      </footer>
      </article>
      {headings.length > 1 && <NoteToc headings={headings} />}
      {/* \u5B57\u53F7\u63A7\u4EF6\u5DF2\u79FB\u5230\u5E94\u7528\u6839\u8282\u70B9\uFF08components/blog/font-control.tsx\uFF09\uFF1A
          \u4E4B\u524D\u5B83\u53EA\u5728\u8FD9\u91CC\uFF0C\u5BFC\u81F4\u9996\u9875\u6839\u672C\u6CA1\u6709\u5165\u53E3\uFF1B\u800C\u4E14\u53EA\u7F29\u653E\u6B63\u6587\u3002
          \u73B0\u5728\u5B83\u6302\u5728\u6839\u4E0A\uFF0C\u9996\u9875\u548C\u6587\u7AE0\u9875\u90FD\u6709\uFF0C\u4E14\u5168\u7AD9\u751F\u6548\u3002 */}
    </div>
  )
}

const TOC_POS_KEY = 'toc-pos'
const TOC_COLLAPSED_KEY = 'toc-collapsed'
const TOC_SIZE_KEY = 'toc-size'
const TOC_W_MIN = 180
const TOC_W_MAX = 520
const TOC_H_MIN = 140

/**
 * \u5927\u7EB2\u6D6E\u5C42\uFF1A\u56FA\u5B9A\u60AC\u6D6E\u4E8E\u9875\u9762\u4E0A\uFF08\u4E0D\u53C2\u4E0E\u6587\u7AE0\u6392\u7248\uFF0C\u4E0D\u6324\u538B\u6B63\u6587\u5BBD\u5EA6\uFF09\uFF0C
 * \u53EF\u62D6\u52A8\u5230\u4EFB\u610F\u4F4D\u7F6E\u3001\u53EF\u6298\u53E0\u6210\u5C0F\u5706\u94AE\u3001\u53F3\u4E0B\u89D2\u53EF\u62D6\u62FD\u8C03\u6574\u5BBD\u9AD8\uFF1B
 * \u4F4D\u7F6E/\u5C3A\u5BF8/\u6298\u53E0\u72B6\u6001\u8BB0\u5FC6\u5728 localStorage\u3002
 *
 * \u62D6\u52A8\u5165\u53E3\u6709\u4E24\u4E2A\uFF1A
 *   1. \u6807\u9898\u680F\u6574\u6761\uFF08\u9F20\u6807/\u89E6\u6478\u90FD\u884C\uFF09
 *   2. \u5DE6\u4FA7\u4E13\u95E8\u7684\u62D6\u52A8\u6309\u952E\uFF08\u624B\u67C4\u56FE\u6807\uFF09\u2014\u2014 \u624B\u673A\u4E0A\u6807\u9898\u680F\u5BB9\u6613\u88AB\u8BEF\u89E6\u6210\u6EDA\u52A8\uFF0C
 *      \u7ED9\u4E00\u4E2A\u660E\u786E\u7684\u6293\u624B\u66F4\u53EF\u9760\uFF1B\u4E24\u8005\u90FD\u8BBE touch-action:none\uFF0C\u4FDD\u8BC1\u89E6\u6478\u62D6\u52A8\u4E0D\u88AB
 *      \u6D4F\u89C8\u5668\u7684\u9875\u9762\u6EDA\u52A8\u62A2\u8D70\u3002
 */
function NoteToc({ headings }: { headings: HeadingEntry[] }) {
  const t = useT()
  const [activeId, setActiveId] = useState<string | null>(null)
  const [pos, setPos] = useState<{ x: number; y: number } | null>(null)
  const [size, setSize] = useState<{ w: number; h: number } | null>(null)
  const [collapsed, setCollapsed] = useState(false)
  const [dragging, setDragging] = useState(false)
  const panelRef = useRef<HTMLDivElement | null>(null)

  useEffect(() => {
    // scroll-spy\uFF1A\u53EA\u8BFB\u4E00\u6B21\u5E03\u5C40\uFF0C\u7528 rAF \u5408\u5E76\u8FDE\u7EED\u6EDA\u52A8\u4E8B\u4EF6\u3002
    // \u539F\u5148\u6BCF\u4E2A scroll \u4E8B\u4EF6\u90FD\u5BF9\u6BCF\u4E2A\u6807\u9898\u8C03 getBoundingClientRect()\uFF0C\u957F\u7B14\u8BB0 + \u9AD8\u9891\u6EDA\u52A8
    // \u4F1A\u9020\u6210\u660E\u663E\u7684\u5F3A\u5236\u91CD\u6392\u5F00\u9500\u3002
    let raf = 0
    const measure = () => {
      raf = 0
      let current: string | null = null
      for (const h of headings) {
        const el = document.getElementById(h.id)
        if (el && el.getBoundingClientRect().top <= 140) current = h.id
      }
      setActiveId(current)
    }
    const onScroll = () => {
      if (raf) return
      raf = window.requestAnimationFrame(measure)
    }
    measure()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => {
      window.removeEventListener('scroll', onScroll)
      if (raf) window.cancelAnimationFrame(raf)
    }
  }, [headings])

  // \u6062\u590D\u4E0A\u6B21\u7684\u6D6E\u52A8\u4F4D\u7F6E\u3001\u5C3A\u5BF8\u4E0E\u6298\u53E0\u72B6\u6001
  useEffect(() => {
    try {
      const raw = localStorage.getItem((TOC_POS_KEY))
      if (raw) {
        const v = JSON.parse(raw) as { x: number; y: number }
        if (typeof v?.x === 'number' && typeof v?.y === 'number') setPos(v)
      }
      const rawSize = localStorage.getItem((TOC_SIZE_KEY))
      if (rawSize) {
        const v = JSON.parse(rawSize) as { w: number; h: number }
        if (typeof v?.w === 'number' && typeof v?.h === 'number') setSize(v)
      }
      if (localStorage.getItem((TOC_COLLAPSED_KEY)) === '1') setCollapsed(true)
    } catch {
      /* \u5FFD\u7565 */
    }
  }, [])

  // \u4F4D\u7F6E/\u5C3A\u5BF8\u6301\u4E45\u5316
  useEffect(() => {
    if (!pos) return
    try {
      localStorage.setItem((TOC_POS_KEY), JSON.stringify(pos))
    } catch {
      /* \u5FFD\u7565 */
    }
  }, [pos])
  useEffect(() => {
    if (!size) return
    try {
      localStorage.setItem((TOC_SIZE_KEY), JSON.stringify(size))
    } catch {
      /* \u5FFD\u7565 */
    }
  }, [size])

  // \u7A97\u53E3\u7F29\u653E\u65F6\u628A\u9762\u677F\u62C9\u56DE\u53EF\u89C6\u8303\u56F4
  useEffect(() => {
    const onResize = () =>
      setPos((p) => {
        const el = panelRef.current
        if (!p || !el) return p
        return {
          x: Math.min(p.x, Math.max(8, window.innerWidth - el.offsetWidth - 8)),
          y: Math.min(p.y, Math.max(8, window.innerHeight - el.offsetHeight - 8)),
        }
      })
    window.addEventListener('resize', onResize)
    return () => window.removeEventListener('resize', onResize)
  }, [])

  const startDrag = (e: ReactPointerEvent) => {
    // \u89E6\u6478\u4E8B\u4EF6\u6CA1\u6709 button\uFF08\u6052\u4E3A 0/-1\uFF09\uFF0C\u53EA\u5BF9\u9F20\u6807\u5DE6\u952E\u8BBE\u9650
    if (e.pointerType === 'mouse' && e.button !== 0) return
    const el = panelRef.current
    if (!el || (e.target as HTMLElement).closest('[data-no-drag]')) return
    e.preventDefault()
    e.stopPropagation()
    setDragging(true)
    const rect = el.getBoundingClientRect()
    const dx = e.clientX - rect.left
    const dy = e.clientY - rect.top
    const move = (ev: PointerEvent) => {
      setPos({
        x: Math.min(Math.max(ev.clientX - dx, 8), window.innerWidth - el.offsetWidth - 8),
        y: Math.min(Math.max(ev.clientY - dy, 8), window.innerHeight - el.offsetHeight - 8),
      })
    }
    const up = () => {
      setDragging(false)
      window.removeEventListener('pointermove', move)
      window.removeEventListener('pointerup', up)
      window.removeEventListener('pointercancel', up)
    }
    window.addEventListener('pointermove', move)
    window.addEventListener('pointerup', up)
    window.addEventListener('pointercancel', up)
  }

  const startResize = (e: ReactPointerEvent) => {
    if (e.pointerType === 'mouse' && e.button !== 0) return
    e.preventDefault()
    e.stopPropagation()
    const startX = e.clientX
    const startY = e.clientY
    const base = size ?? { w: 240, h: 460 }
    const move = (ev: PointerEvent) => {
      setSize({
        w: Math.min(Math.max(base.w + (ev.clientX - startX), TOC_W_MIN), TOC_W_MAX),
        h: Math.min(
          Math.max(base.h + (ev.clientY - startY), TOC_H_MIN),
          Math.max(window.innerHeight - 130, TOC_H_MIN)
        ),
      })
    }
    const up = () => {
      window.removeEventListener('pointermove', move)
      window.removeEventListener('pointerup', up)
      window.removeEventListener('pointercancel', up)
    }
    window.addEventListener('pointermove', move)
    window.addEventListener('pointerup', up)
    window.addEventListener('pointercancel', up)
  }

  const setCollapsedPersisted = (v: boolean) => {
    setCollapsed(v)
    try {
      localStorage.setItem((TOC_COLLAPSED_KEY), v ? '1' : '0')
    } catch {
      /* \u5FFD\u7565 */
    }
  }

  const floatStyle: CSSProperties = pos ? { left: pos.x, top: pos.y } : { right: 24, top: 88 }

  const min = Math.min(...headings.map((h) => h.level))

  const scrollTo = (id: string) => {
    const el = document.getElementById(id)
    if (!el) return
    const align = () => Math.round(el.getBoundingClientRect().top + window.scrollY - 96)
    const apply = () => window.scrollTo({ top: align(), behavior: 'auto' })

    apply()

    // \u6B63\u6587\u56FE\u7247\u662F loading="lazy"\uFF1A\u70B9\u51FB\u65F6\u5B83\u4EEC\u8FD8\u6CA1\u52A0\u8F7D\u3001\u6CA1\u6709\u9AD8\u5EA6\uFF0C\u6587\u6863\u662F\u300C\u77EE\u300D\u7684\uFF0C
    // \u7B97\u51FA\u7684\u843D\u70B9\u504F\u4E0A\uFF08\u751A\u81F3\u88AB\u5939\u5230\u6587\u6863\u5E95\u90E8\uFF09\uFF0C\u968F\u540E\u56FE\u7247\u9646\u7EED\u52A0\u8F7D\u628A\u6807\u9898\u4E00\u8DEF\u5F80\u4E0B\u63A8
    // \u2014\u2014 \u8FD9\u6B63\u662F\u300C\u70B9\u4E00\u6B21\u53EA\u4E0B\u6ED1\u4E00\u5C0F\u6BB5\u3001\u8981\u8FDE\u70B9\u51E0\u6B21\u300D\u7684\u6839\u56E0\u3002\u4E24\u8DEF\u4E00\u8D77\u6821\u6B63\uFF1A
    //   1) \u76D1\u542C\u76EE\u6807\u4E4B\u524D\u7684\u56FE\u7247 load\uFF0C\u6BCF\u5F20\u52A0\u8F7D\u5B8C\u5C31\u91CD\u65B0\u5BF9\u9F50\uFF08\u6700\u53EF\u9760\uFF0C\u4E0D\u4F9D\u8D56\u5E27\uFF09\uFF1B
    //   2) rAF \u8FDE\u7EED\u91CD\u7B97\uFF0C\u515C\u4F4F\u5B57\u4F53/\u6298\u53E0\u7B49\u5176\u5B83\u4F4D\u79FB\u3002
    let stable = 0
    let frames = 0
    const step = () => {
      if (Math.abs(align() - Math.round(window.scrollY)) <= 2) {
        if (++stable >= 3) return
      } else {
        stable = 0
        apply()
      }
      if (++frames < 120) requestAnimationFrame(step)
    }
    requestAnimationFrame(step)

    const targetTop = el.getBoundingClientRect().top + window.scrollY
    const cleanups: Array<() => void> = []
    for (const img of Array.from(document.querySelectorAll<HTMLImageElement>('.markdown-body img'))) {
      if (img.complete) continue
      if (img.getBoundingClientRect().top + window.scrollY > targetTop) continue
      const onLoad = () => {
        stable = 0
        apply()
      }
      img.addEventListener('load', onLoad, { once: true })
      cleanups.push(() => img.removeEventListener('load', onLoad))
    }
    if (cleanups.length) {
      window.setTimeout(() => cleanups.forEach((fn) => fn()), 10000)
    }
  }

  if (collapsed) {
    return (
      <div
        ref={panelRef}
        className="fixed z-40 flex items-center gap-1 rounded-full border border-border bg-background/95 py-1 pl-3 pr-1 shadow-lg backdrop-blur"
        style={floatStyle}
        data-region="toc-panel"
      >
        <button
          type="button"
          className="flex items-center gap-1.5 text-xs font-medium text-muted-foreground transition-colors hover:text-foreground"
          onClick={() => setCollapsedPersisted(false)}
          aria-label={t.tocExpand}
        >
          <ListTree className="size-3.5" aria-hidden />
          <T k="toc" />
        </button>
        {/* \u6536\u8D77\u6001\u4E5F\u8981\u80FD\u632A\u4F4D\u7F6E\uFF1A\u540C\u6837\u7684\u56DB\u5411\u5341\u5B57\u624B\u67C4 */}
        <div
          className="flex size-5 shrink-0 cursor-move touch-none items-center justify-center rounded-full text-muted-foreground/60 transition-colors hover:bg-muted hover:text-foreground"
          onPointerDown={startDrag}
          title={t.tocDrag}
          aria-hidden
          role="presentation"
        >
          <Move className="size-3.5" />
        </div>
      </div>
    )
  }

  return (
    <div
      ref={panelRef}
      className={
        'fixed z-40 max-w-[calc(100vw-16px)] rounded-xl border border-border bg-background/95 shadow-xl backdrop-blur' +
        (dragging ? ' shadow-2xl ring-1 ring-primary/30' : '')
      }
      style={{ width: size?.w ?? 240, ...floatStyle }}
      data-region="toc-panel"
    >
      <div
        className="flex touch-none cursor-grab select-none items-center gap-1.5 border-b px-3 py-2 active:cursor-grabbing"
        onPointerDown={startDrag}
      >
        <ListTree className="size-3.5 shrink-0 text-muted-foreground" aria-hidden />
        <span className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
          <T k="toc" />
        </span>
        <span className="fs-tiny text-muted-foreground/60">{headings.length}</span>
        <button
          type="button"
          data-no-drag
          className="ml-auto rounded p-0.5 text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
          onClick={() => setCollapsedPersisted(true)}
          aria-label={t.tocCollapse}
        >
          <Minus className="size-3.5" aria-hidden />
        </button>
      </div>
      <nav
        className="toc mx-2 max-h-[min(62vh,460px)] overflow-y-auto pt-2 pb-4"
        style={size ? { maxHeight: size.h } : undefined}
        aria-label={t.toc}
      >
        <ul>
          {headings.map((h, i) => (
            <li key={h.id + '-' + i} style={{ paddingLeft: (h.level - min) * 12 }}>
              <a
                href={'#' + h.id}
                className={'toc-item block truncate py-1 pr-2 text-xs leading-5 ' + (activeId === h.id ? 'toc-active' : '')}
                title={stripInlineFormatting(h.text)}
                onClick={(e) => {
                  e.preventDefault()
                  scrollTo(h.id)
                }}
              >
                <HeadingText text={h.text} />
              </a>
            </li>
          ))}
        </ul>
      </nav>
      {/* \u79FB\u52A8\u624B\u67C4\uFF1A\u901A\u7528\u7684\u56DB\u5411\u5341\u5B57\u7BAD\u5934\uFF0C\u56FA\u5B9A\u5728\u5DE6\u4E0B\u89D2\uFF08\u53F3\u4E0B\u89D2\u7559\u7ED9\u7F29\u653E\uFF09 */}
      <div
        className="absolute bottom-0 left-0 z-10 flex size-5 cursor-move touch-none items-center justify-center rounded-bl-xl text-muted-foreground/60 transition-colors hover:text-foreground"
        onPointerDown={startDrag}
        title={t.tocDrag}
        aria-hidden
        role="presentation"
      >
        <Move className="size-3.5" />
      </div>
      <div
        className="absolute bottom-0 right-0 z-10 size-5 cursor-nwse-resize touch-none"
        onPointerDown={startResize}
        role="presentation"
      >
        <div className="absolute bottom-1 right-1 size-2 rounded-[2px] border-b-2 border-r-2 border-muted-foreground/50" />
      </div>
    </div>
  )
}
` }, "src/components/blog/t-text.tsx": { "t": "utf8", "v": `'use client'

import { DICT } from '@/lib/i18n'

type Key = keyof typeof DICT.zh

function render(v: unknown, args?: unknown[]): string {
  if (typeof v === 'function') return String((v as (...a: unknown[]) => unknown)(...(args ?? [])))
  return String(v ?? '')
}

/**
 * \u53CC\u8BED\u5E76\u5217\u6E32\u67D3\uFF1A\u540C\u65F6\u8F93\u51FA\u4E2D\u82F1\u4E24\u4EFD\u6587\u6848\uFF0C\u7531 CSS \u6309 <html data-lang> \u53EA\u663E\u793A\u4E00\u4EFD\u3002
 *
 * \u4E3A\u4EC0\u4E48\u4E0D\u7528 useT()\uFF1A\u9759\u6001\u5BFC\u51FA\u7684 HTML \u662F\u6784\u5EFA\u65F6\u70E7\u6B7B\u7684\uFF0C\u7528 useT() \u65F6\u9996\u5C4F\u53EA\u80FD\u662F
 * \u9ED8\u8BA4\u8BED\u8A00\uFF0C\u6C34\u5408\u540E\u624D\u7FFB\u6210\u7528\u6237\u9009\u7684\u8BED\u8A00 \u2014\u2014 \u975E\u9ED8\u8BA4\u8BED\u8A00\u7528\u6237\u4F1A\u770B\u5230\u6574\u9875"\u95EA\u4E00\u4E0B"\u3002
 * \u4E24\u4EFD\u90FD\u6E32\u67D3\u8FDB HTML\uFF0C\u518D\u7531\u9884\u7ED8\u5236\u811A\u672C\u5728\u9996\u5E27\u524D\u8BBE\u597D data-lang\uFF0C\u5C31\u4E0D\u4F1A\u6709\u4EFB\u4F55\u95EA\u70C1\u3002
 *
 * \u53EA\u7528\u4E8E**\u53EF\u89C1\u6587\u5B57**\uFF1Baria-label / title / placeholder \u8FD9\u7C7B\u5C5E\u6027\u4ECD\u7528 useT()\u3002
 */
export function T({ k, args }: { k: Key; args?: unknown[] }) {
  return (
    <>
      <span className="i18n-zh">{render(DICT.zh[k], args)}</span>
      <span className="i18n-en">{render(DICT.en[k], args)}</span>
    </>
  )
}
` }, "src/components/blog/transclusion.tsx": { "t": "utf8", "v": `'use client'

import { createContext, useContext } from 'react'
import { useQuery } from '@tanstack/react-query'
import { fetchLinkIndex, fetchNoteDetail } from '@/lib/api'
import { extractBlockText, extractHeadingSection, headingDisplayText } from '@/lib/obsidian'
import { MarkdownRenderer } from '@/components/blog/markdown'
import { useBlog } from '@/lib/store'
import { useT } from '@/lib/i18n'

/**
 * \u5D4C\u5165\u94FE\uFF1A\u8BB0\u5F55\u5F53\u524D\u6B63\u5728\u5C55\u5F00\u7684\u7B14\u8BB0 slug\uFF0C\u7528\u6765\u9632\u6B62 A \u5D4C\u5165 B\u3001B \u53C8\u5D4C\u5165 A \u7684\u6B7B\u5FAA\u73AF\u3002
 * \u6BCF\u5C42 Transclusion \u628A\u81EA\u5DF1\u7684 slug \u538B\u8FDB\u94FE\u91CC\u4F20\u7ED9\u4E0B\u5C42 MarkdownRenderer\u3002
 */
const EmbedChain = createContext<string[]>([])
export function useEmbedChain(): string[] {
  return useContext(EmbedChain)
}

/** \u6700\u591A\u5D4C\u5957\u51E0\u5C42\uFF08\u8D85\u8FC7\u5C31\u4E0D\u518D\u5C55\u5F00\uFF0C\u53EA\u7ED9\u4E00\u4E2A\u53EF\u70B9\u51FB\u7684\u94FE\u63A5\uFF09 */
const MAX_DEPTH = 4

export interface TransclusionProps {
  slug: string
  /** \u5F15\u7528\u7684\u5C0F\u8282\u6807\u9898\uFF0C\u6216 \`^\u5757id\`\uFF1B\u4E0D\u4F20\u8868\u793A\u6574\u7BC7 */
  heading?: string
}

/**
 * Obsidian \u5F0F\u5D4C\u5165\uFF08transclusion\uFF09\uFF1A\u628A\u76EE\u6807\u7B14\u8BB0\u7684**\u5BF9\u5E94\u533A\u95F4**\u76F4\u63A5\u5C55\u5F00\u5728\u5F53\u524D\u4F4D\u7F6E\u3002
 *
 * \u533A\u95F4\u8BED\u4E49\u4E0E Obsidian \u4E00\u81F4\uFF1A
 *   - \`![[\u7B14\u8BB0]]\`          \u2192 \u6574\u7BC7
 *   - \`![[\u7B14\u8BB0#\u5C0F\u8282]]\`     \u2192 \u8BE5\u5C0F\u8282\uFF08\u5230\u4E0B\u4E00\u4E2A\u540C\u7EA7/\u66F4\u9AD8\u7EA7\u6807\u9898\u4E3A\u6B62\uFF09
 *   - \`![[\u7B14\u8BB0#^\u5757id]]\`    \u2192 \u53EA\u6709\u90A3\u4E2A\u6587\u672C\u5757
 * \u8FD9\u6837\u5C31\u4E0D\u4F1A\u51FA\u73B0\u300C\u5F15\u7528\u4E86\u67D0\u4E00\u6BB5\uFF0C\u5374\u628A\u540E\u9762\u6CA1\u5F15\u7528\u7684\u5185\u5BB9\u4E5F\u4E00\u8D77\u663E\u793A\u300D\u3002
 */
export function Transclusion({ slug, heading }: TransclusionProps) {
  const t = useT()
  const chain = useEmbedChain()
  const navigateToNote = useBlog((s) => s.navigateToNote)
  const cyclic = chain.includes(slug)
  const tooDeep = chain.length >= MAX_DEPTH
  const skip = cyclic || tooDeep

  const { data, isLoading } = useQuery({
    queryKey: ['note', slug, false],
    queryFn: () => fetchNoteDetail(slug),
    staleTime: 60_000,
    enabled: !skip,
  })
  const { data: linkIndex } = useQuery({
    queryKey: ['link-index', false],
    queryFn: () => fetchLinkIndex(),
    staleTime: 30_000,
    enabled: !skip,
  })

  const link = (label: string, hint?: string) => (
    <div className="note-embed note-embed-note">
      <button
        type="button"
        className="embed-title"
        onClick={() => navigateToNote(slug, heading && !heading.startsWith('^') ? heading : undefined)}
      >
        {label}
      </button>
      {hint && <span className="note-embed-hint"> \xB7 {hint}</span>}
    </div>
  )

  if (skip) return link(slug, cyclic ? t.embedCycle : t.embedTooDeep)
  if (isLoading) return <div className="note-embed note-embed-loading">{t.loading}</div>
  if (!data || data === 'private' || data === 'not_found') return link(slug, t.noteMissing)

  const note = data.note
  const region = heading
    ? heading.startsWith('^')
      ? extractBlockText(note.content, heading.slice(1))
      : extractHeadingSection(note.content, heading)
    : note.content

  if (region == null || !region.trim()) return link(note.title, t.sectionMissing)

  return (
    <div className="note-embed note-embed-note">
      <div className="note-embed-head">
        <button
          type="button"
          className="embed-title"
          onClick={() => navigateToNote(slug, heading && !heading.startsWith('^') ? heading : undefined)}
          title={t.openNoteNewTab}
        >
          {note.title}
          {heading
            ? ' \u203A ' +
              (heading.startsWith('^') ? '#' + heading.slice(1) : headingDisplayText(heading))
            : ''}
        </button>
      </div>
      <div className="note-embed-body">
        <EmbedChain.Provider value={[...chain, slug]}>
          <MarkdownRenderer raw={region} linkIndex={linkIndex ?? null} currentSlug={slug} />
        </EmbedChain.Provider>
      </div>
    </div>
  )
}
` }, "src/components/ui/badge.tsx": { "t": "utf8", "v": `import * as React from 'react'
import { cva, type VariantProps } from 'class-variance-authority'

import { cn } from '@/lib/utils'

const badgeVariants = cva(
  'inline-flex items-center justify-center rounded-md border px-2 py-0.5 text-xs font-medium w-fit whitespace-nowrap shrink-0 [&>svg]:size-3 gap-1 [&>svg]:pointer-events-none focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px] transition-[color,box-shadow] overflow-hidden',
  {
    variants: {
      variant: {
        default: 'border-transparent bg-primary text-primary-foreground',
        secondary: 'border-transparent bg-secondary text-secondary-foreground',
        destructive: 'border-transparent bg-destructive text-white',
        outline: 'text-foreground',
      },
    },
    defaultVariants: {
      variant: 'default',
    },
  }
)

function Badge({
  className,
  variant,
  asChild = false,
  ...props
}: React.ComponentProps<'span'> & VariantProps<typeof badgeVariants> & { asChild?: boolean }) {
  const Comp = asChild ? 'span' : 'span'

  return (
    <Comp data-slot="badge" className={cn(badgeVariants({ variant }), className)} {...props} />
  )
}

export { Badge, badgeVariants }
` }, "src/components/ui/button.tsx": { "t": "utf8", "v": `import * as React from 'react'
import { Slot } from '@radix-ui/react-slot'
import { cva, type VariantProps } from 'class-variance-authority'

import { cn } from '@/lib/utils'

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium transition-all disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg:not([class*='size-'])]:size-4 shrink-0 [&_svg]:shrink-0 outline-none focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px] aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive",
  {
    variants: {
      variant: {
        default: 'bg-primary text-primary-foreground shadow-xs hover:bg-primary/90',
        destructive:
          'bg-destructive text-white shadow-xs hover:bg-destructive/90 focus-visible:ring-destructive/20 dark:focus-visible:ring-destructive/40',
        outline:
          'border bg-background shadow-xs hover:bg-accent hover:text-accent-foreground dark:bg-input/30 dark:border-input dark:hover:bg-input/50',
        secondary: 'bg-secondary text-secondary-foreground shadow-xs hover:bg-secondary/90',
        ghost: 'hover:bg-accent hover:text-accent-foreground dark:hover:bg-accent/50',
        link: 'text-primary underline-offset-4 hover:underline',
      },
      size: {
        default: 'h-9 px-4 py-2 has-[>svg]:px-3',
        sm: 'h-8 rounded-md gap-1.5 px-3 has-[>svg]:px-2.5',
        lg: 'h-10 rounded-md px-6 has-[>svg]:px-4',
        icon: 'size-9',
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'default',
    },
  }
)

function Button({
  className,
  variant,
  size,
  asChild = false,
  ...props
}: React.ComponentProps<'button'> &
  VariantProps<typeof buttonVariants> & {
    asChild?: boolean
  }) {
  const Comp = asChild ? Slot : 'button'

  return (
    <Comp
      data-slot="button"
      className={cn(buttonVariants({ variant, size, className }))}
      {...props}
    />
  )
}

export { Button, buttonVariants }
` }, "src/components/ui/card.tsx": { "t": "utf8", "v": `import * as React from 'react'

import { cn } from '@/lib/utils'

function Card({ className, ...props }: React.ComponentProps<'div'>) {
  return (
    <div
      data-slot="card"
      className={cn(
        'bg-card text-card-foreground flex flex-col gap-6 rounded-xl border py-6 shadow-sm',
        className
      )}
      {...props}
    />
  )
}

function CardHeader({ className, ...props }: React.ComponentProps<'div'>) {
  return (
    <div
      data-slot="card-header"
      className={cn('flex flex-col gap-1.5 px-6', className)}
      {...props}
    />
  )
}

function CardTitle({ className, ...props }: React.ComponentProps<'div'>) {
  return (
    <div
      data-slot="card-title"
      className={cn('leading-none font-semibold', className)}
      {...props}
    />
  )
}

function CardDescription({ className, ...props }: React.ComponentProps<'div'>) {
  return (
    <div
      data-slot="card-description"
      className={cn('text-muted-foreground text-sm', className)}
      {...props}
    />
  )
}

function CardContent({ className, ...props }: React.ComponentProps<'div'>) {
  return <div data-slot="card-content" className={cn('px-6', className)} {...props} />
}

function CardFooter({ className, ...props }: React.ComponentProps<'div'>) {
  return (
    <div data-slot="card-footer" className={cn('flex items-center px-6', className)} {...props} />
  )
}

export { Card, CardHeader, CardFooter, CardTitle, CardDescription, CardContent }
` }, "src/components/ui/dialog.tsx": { "t": "utf8", "v": `'use client'

import * as React from 'react'
import * as DialogPrimitive from '@radix-ui/react-dialog'
import { XIcon } from 'lucide-react'

import { cn } from '@/lib/utils'

function Dialog({ ...props }: React.ComponentProps<typeof DialogPrimitive.Root>) {
  return <DialogPrimitive.Root data-slot="dialog" {...props} />
}

function DialogTrigger({ ...props }: React.ComponentProps<typeof DialogPrimitive.Trigger>) {
  return <DialogPrimitive.Trigger data-slot="dialog-trigger" {...props} />
}

function DialogPortal({ ...props }: React.ComponentProps<typeof DialogPrimitive.Portal>) {
  return <DialogPrimitive.Portal data-slot="dialog-portal" {...props} />
}

function DialogClose({ ...props }: React.ComponentProps<typeof DialogPrimitive.Close>) {
  return <DialogPrimitive.Close data-slot="dialog-close" {...props} />
}

function DialogOverlay({
  className,
  ...props
}: React.ComponentProps<typeof DialogPrimitive.Overlay>) {
  return (
    <DialogPrimitive.Overlay
      data-slot="dialog-overlay"
      className={cn(
        'data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 fixed inset-0 z-50 bg-black/50',
        className
      )}
      {...props}
    />
  )
}

function DialogContent({
  className,
  children,
  showCloseButton = true,
  closeLabel = 'Close',
  ...props
}: React.ComponentProps<typeof DialogPrimitive.Content> & {
  showCloseButton?: boolean
  /** \u5173\u95ED\u6309\u94AE\u7684\u8BFB\u5C4F\u6587\u6848\u3002\u754C\u9762\u8BED\u8A00\u7531\u8C03\u7528\u65B9\u51B3\u5B9A\uFF08\u672C\u7AD9\u4E2D\u82F1\u53CC\u8BED\uFF09\uFF0C
      \u8FD9\u4E2A\u901A\u7528\u7EC4\u4EF6\u4E0D\u5185\u7F6E\u4EFB\u4F55\u5177\u4F53\u8BED\u8A00\u7684\u6587\u6848\u3002 */
  closeLabel?: string
}) {
  return (
    <DialogPortal data-slot="dialog-portal">
      <DialogOverlay />
      <DialogPrimitive.Content
        data-slot="dialog-content"
        className={cn(
          'bg-background data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 fixed top-[50%] left-[50%] z-50 grid w-full max-w-[calc(100%-2rem)] translate-x-[-50%] translate-y-[-50%] gap-4 rounded-lg border p-6 shadow-lg duration-200 sm:max-w-lg',
          className
        )}
        {...props}
      >
        {children}
        {showCloseButton && (
          <DialogPrimitive.Close
            data-slot="dialog-close"
            className="ring-offset-background focus:ring-ring data-[state=open]:bg-accent data-[state=open]:text-muted-foreground absolute top-4 right-4 rounded-xs opacity-70 transition-opacity hover:opacity-100 focus:ring-2 focus:ring-offset-2 focus:outline-hidden disabled:pointer-events-none [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4"
          >
            <XIcon />
            <span className="sr-only">{closeLabel}</span>
          </DialogPrimitive.Close>
        )}
      </DialogPrimitive.Content>
    </DialogPortal>
  )
}

function DialogHeader({ className, ...props }: React.ComponentProps<'div'>) {
  return (
    <div
      data-slot="dialog-header"
      className={cn('flex flex-col gap-2 text-center sm:text-left', className)}
      {...props}
    />
  )
}

function DialogFooter({ className, ...props }: React.ComponentProps<'div'>) {
  return (
    <div
      data-slot="dialog-footer"
      className={cn('flex flex-col-reverse gap-2 sm:flex-row sm:justify-end', className)}
      {...props}
    />
  )
}

function DialogTitle({ className, ...props }: React.ComponentProps<typeof DialogPrimitive.Title>) {
  return (
    <DialogPrimitive.Title
      data-slot="dialog-title"
      className={cn('text-lg leading-none font-semibold', className)}
      {...props}
    />
  )
}

function DialogDescription({
  className,
  ...props
}: React.ComponentProps<typeof DialogPrimitive.Description>) {
  return (
    <DialogPrimitive.Description
      data-slot="dialog-description"
      className={cn('text-muted-foreground text-sm', className)}
      {...props}
    />
  )
}

export {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogOverlay,
  DialogPortal,
  DialogTitle,
  DialogTrigger,
}
` }, "src/components/ui/input.tsx": { "t": "utf8", "v": `import * as React from 'react'

import { cn } from '@/lib/utils'

function Input({ className, type, ...props }: React.ComponentProps<'input'>) {
  return (
    <input
      type={type}
      data-slot="input"
      className={cn(
        'file:text-foreground placeholder:text-muted-foreground selection:bg-primary selection:text-primary-foreground border-input flex h-9 w-full min-w-0 rounded-md border bg-transparent px-3 py-1 text-base shadow-xs transition-[color,box-shadow] outline-none file:inline-flex file:h-7 file:border-0 file:bg-transparent file:text-sm file:font-medium disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50 md:text-sm',
        'focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px]',
        'aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive',
        className
      )}
      {...props}
    />
  )
}

export { Input }
` }, "src/components/ui/skeleton.tsx": { "t": "utf8", "v": `import { cn } from '@/lib/utils'

function Skeleton({ className, ...props }: React.ComponentProps<'div'>) {
  return (
    <div
      data-slot="skeleton"
      className={cn('bg-accent animate-pulse rounded-md', className)}
      {...props}
    />
  )
}

export { Skeleton }
` }, "src/components/ui/sonner.tsx": { "t": "utf8", "v": `'use client'

import { useTheme } from 'next-themes'
import { Toaster as Sonner, type ToasterProps } from 'sonner'

const Toaster = ({ ...props }: ToasterProps) => {
  const { theme = 'system' } = useTheme()

  return (
    <Sonner
      theme={theme as ToasterProps['theme']}
      className="toaster group"
      style={
        {
          '--normal-bg': 'var(--popover)',
          '--normal-text': 'var(--popover-foreground)',
          '--normal-border': 'var(--border)',
        } as React.CSSProperties
      }
      {...props}
    />
  )
}

export { Toaster }
` }, "src/components/ui/switch.tsx": { "t": "utf8", "v": `'use client'

import * as React from 'react'
import * as SwitchPrimitive from '@radix-ui/react-switch'

import { cn } from '@/lib/utils'

function Switch({ className, ...props }: React.ComponentProps<typeof SwitchPrimitive.Root>) {
  return (
    <SwitchPrimitive.Root
      data-slot="switch"
      className={cn(
        'peer data-[state=checked]:bg-primary data-[state=unchecked]:bg-input focus-visible:border-ring focus-visible:ring-ring/50 dark:data-[state=unchecked]:bg-input/80 inline-flex h-[1.15rem] w-8 shrink-0 items-center rounded-full border border-transparent shadow-xs transition-all outline-none focus-visible:ring-[3px] disabled:cursor-not-allowed disabled:opacity-50',
        className
      )}
      {...props}
    >
      <SwitchPrimitive.Thumb
        data-slot="switch-thumb"
        className={cn(
          'bg-background dark:data-[state=unchecked]:bg-foreground dark:data-[state=checked]:bg-primary-foreground pointer-events-none block size-4 rounded-full ring-0 transition-transform data-[state=checked]:translate-x-[calc(100%-2px)] data-[state=unchecked]:translate-x-0'
        )}
      />
    </SwitchPrimitive.Root>
  )
}

export { Switch }
` }, "src/components/ui/tabs.tsx": { "t": "utf8", "v": `'use client'

import * as React from 'react'
import * as TabsPrimitive from '@radix-ui/react-tabs'

import { cn } from '@/lib/utils'

function Tabs({ className, ...props }: React.ComponentProps<typeof TabsPrimitive.Root>) {
  return (
    <TabsPrimitive.Root
      data-slot="tabs"
      className={cn('flex flex-col gap-2', className)}
      {...props}
    />
  )
}

function TabsList({ className, ...props }: React.ComponentProps<typeof TabsPrimitive.List>) {
  return (
    <TabsPrimitive.List
      data-slot="tabs-list"
      className={cn(
        'bg-muted text-muted-foreground inline-flex h-9 w-fit items-center justify-center rounded-lg p-[3px]',
        className
      )}
      {...props}
    />
  )
}

function TabsTrigger({ className, ...props }: React.ComponentProps<typeof TabsPrimitive.Trigger>) {
  return (
    <TabsPrimitive.Trigger
      data-slot="tabs-trigger"
      className={cn(
        "data-[state=active]:bg-background dark:data-[state=active]:text-foreground focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:outline-ring dark:data-[state=active]:border-input dark:data-[state=active]:bg-input/30 text-foreground dark:text-muted-foreground inline-flex h-[calc(100%-1px)] flex-1 items-center justify-center gap-1.5 rounded-md border border-transparent px-2 py-1 text-sm font-medium whitespace-nowrap transition-[color,box-shadow] focus-visible:ring-[3px] focus-visible:outline-1 disabled:pointer-events-none disabled:opacity-50 data-[state=active]:shadow-sm [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4",
        className
      )}
      {...props}
    />
  )
}

function TabsContent({ className, ...props }: React.ComponentProps<typeof TabsPrimitive.Content>) {
  return (
    <TabsPrimitive.Content
      data-slot="tabs-content"
      className={cn('flex-1 outline-none', className)}
      {...props}
    />
  )
}

export { Tabs, TabsList, TabsTrigger, TabsContent }
` }, "src/lib/api.ts": { "t": "utf8", "v": "'use client'\n\n/**\n * \u9759\u6001\u7AD9\u6570\u636E\u9002\u914D\u5C42\uFF1A\n * \u4E0E\u5168\u6808\u7248 blog \u7684 lib/api.ts \u5BFC\u51FA\u5B8C\u5168\u76F8\u540C\u7684\u51FD\u6570\u7B7E\u540D\uFF0C\n * \u4F46\u6570\u636E\u6765\u81EA\u6784\u5EFA\u65F6\u751F\u6210\u7684 /data/*.json\uFF08GitHub Pages \u76F4\u63A5\u6258\u7BA1\uFF09\uFF0C\n * \u4E0D\u518D\u9700\u8981\u670D\u52A1\u5668\u3001\u6570\u636E\u5E93\u548C\u767B\u5F55\u3002\n */\n\nimport { withBase } from '@/lib/site'\nimport { tNow } from '@/lib/i18n'\n// \u6784\u5EFA\u65F6\u751F\u6210\uFF08scripts/build-content.mjs\uFF09\uFF0C\u6BCF\u6B21\u53D1\u5E03\u6362\u4E00\u4E2A\u65B0\u503C\uFF0C\n// \u7528\u6765\u7ED9 /data/*.json \u6253\u4E0A\u7248\u672C\u53C2\u6570\u3001\u7ED5\u5F00 GitHub Pages \u7684 10 \u5206\u949F\u7F13\u5B58\u3002\nimport { RELEASE_TAG } from '@/lib/release-tag'\n\nexport interface NoteListItem {\n  slug: string\n  path: string\n  title: string\n  folder: string\n  tags: string[]\n  isPublic: boolean\n  wordCount: number\n  noteDate: string | null\n  updatedAt: string\n  excerpt: string\n  linkCount: number\n}\n\nexport interface NoteDetail {\n  slug: string\n  path: string\n  title: string\n  folder: string\n  raw: string\n  content: string\n  frontmatter: Record<string, unknown>\n  tags: string[]\n  isPublic: boolean\n  wordCount: number\n  noteDate: string | null\n  updatedAt: string\n}\n\nexport interface RefItem {\n  slug: string\n  title: string\n  folder?: string\n  isPublic: boolean | null\n  resolved?: boolean\n}\n\n/** \u76EE\u5F55\u6811\u8282\u70B9\uFF08\u6784\u5EFA\u65F6\u7531 notes[].folder \u63A8\u5BFC\uFF0C\u89C1 scripts/build-content.mjs\uFF09 */\nexport interface FolderNode {\n  /** \u76F8\u5BF9\u5E93\u6839\u7684\u8DEF\u5F84\uFF0C\u5982 `\u6BD4\u8D5B/NOI \u7CFB\u5217`\uFF1B\u6839\u8282\u70B9\u4E3A '' */\n  path: string\n  /** \u672B\u7EA7\u6587\u4EF6\u5939\u540D\uFF0C\u5982 `NOI \u7CFB\u5217` */\n  name: string\n  /** \u76F4\u63A5\u653E\u5728\u8BE5\u6587\u4EF6\u5939\u91CC\u7684\u516C\u5F00\u7B14\u8BB0\u6570 */\n  directCount: number\n  /** \u542B\u6240\u6709\u5B50\u5B59\u7684\u516C\u5F00\u7B14\u8BB0\u5408\u8BA1 */\n  totalCount: number\n  children: FolderNode[]\n}\n\nexport interface LinkIndex {\n  notes: { slug: string; path: string; title: string; isPublic: boolean; excerpt?: string }[]\n  assets: { path: string }[]\n}\n\nexport interface SiteInfo {\n  name: string\n  title: string\n}\n\ninterface NoteFile {\n  note: NoteDetail\n  backlinks: RefItem[]\n  outlinks: RefItem[]\n}\n\n/** slug \u2192 \u5B89\u5168\u6587\u4EF6\u540D\uFF08base64url\uFF1A\u4E0D\u542B\u659C\u6760/\u767E\u5206\u53F7\uFF0CGitHub Pages \u53EF\u76F4\u63A5\u6258\u7BA1\uFF09 */\nfunction slugFile(slug: string): string {\n  const bytes = new TextEncoder().encode(slug)\n  let bin = ''\n  for (const b of bytes) bin += String.fromCharCode(b)\n  return btoa(bin).replace(/\\+/g, '-').replace(/\\//g, '_').replace(/=+$/, '')\n}\n\n// \u7D22\u5F15\u62C9\u53D6\u4E00\u6B21\uFF0C\u5168\u7AD9\u5171\u4EAB\nlet indexPromise: Promise<{ notes: NoteListItem[]; assets: string[]; folders: FolderNode[] }> | null = null\n\n// GitHub Pages \u7ED9 /data/*.json \u53D1\u7684\u662F `Cache-Control: max-age=600`\uFF0C\n// \u5373\u53D1\u5E03\u540E\u6700\u591A 10 \u5206\u949F\u5185\u6D4F\u89C8\u5668\u4F1A\u76F4\u63A5\u7528\u672C\u5730\u7F13\u5B58\uFF0C**\u8FDE revalidate \u90FD\u4E0D\u505A**\u3002\n// \u540E\u679C\uFF1A\u53D6\u6D88\u516C\u5F00\u67D0\u7BC7\u540E\uFF0C\u8BBF\u5BA2\u5728\u65E7\u7F13\u5B58\u7A97\u53E3\u91CC\u4ECD\u80FD\u770B\u5230\u5B83\uFF08\u8868\u73B0\u4E3A\u300C\u5DF2\u53D6\u6D88\u516C\u5F00\u4F46\u6CA1\u9690\u85CF\u300D\uFF09\u3002\n//\n// \u8FD9\u91CC\u7EDF\u4E00\u52A0 `cache: 'no-cache'`\uFF1A\u4ECD\u7136\u5141\u8BB8\u672C\u5730\u7F13\u5B58\uFF0C\u4F46\u6BCF\u6B21\u90FD\u5FC5\u987B\u56DE\u6E90\u6821\u9A8C ETag\uFF0C\n// \u672A\u53D8\u66F4\u65F6\u670D\u52A1\u7AEF\u8FD4\u56DE 304\uFF0C\u5F00\u9500\u6781\u5C0F\uFF1B\u5DF2\u53D8\u66F4\u5219\u7ACB\u523B\u62FF\u5230\u65B0\u5185\u5BB9\u3002\n// \u518D\u53E0\u52A0 `?v=<\u53D1\u5E03\u6807\u8BB0>`\uFF08\u89C1 releaseTag\uFF09\uFF1A\u8BA9\u300C\u5DF2\u53D1\u5E03\u7684\u90A3\u4E2A\u7248\u672C\u300D\u6574\u4F53\u6362\u4E00\u4E2A URL\uFF0C\n// \u5F7B\u5E95\u7ED5\u5F00\u65E7\u7F13\u5B58 \u2014\u2014 \u5373\u4F7F\u9875\u9762\u662F\u53D1\u5E03\u524D\u6253\u5F00\u7684\u65E7\u6807\u7B7E\u9875\uFF0C\u5237\u65B0\u540E\u4E5F\u4F1A\u547D\u4E2D\u65B0\u6570\u636E\u3002\n//\n// \u53E6\u5916\u652F\u6301 `?fresh=<\u65F6\u95F4\u6233>`\uFF08\u300C\u68C0\u67E5\u66F4\u65B0\u300D\u6309\u94AE\u52A0\u7684\uFF09\uFF1ACDN \u4E0E\u6D4F\u89C8\u5668\u90FD\u662F\u6309 URL \u7F13\u5B58\u7684\uFF0C\n// \u6362\u4E00\u4E2A\u4ECE\u6CA1\u51FA\u73B0\u8FC7\u7684 URL \u5C31\u7B49\u4E8E\u5F3A\u5236\u56DE\u6E90\uFF0C\u7528\u6765\u5BF9\u4ED8\u300C\u5DF2\u7ECF\u53D1\u5E03\u4F46 CDN \u8FD8\u5728\u53D1 10 \u5206\u949F\u65E7\u8D27\u300D\u3002\nfunction freshTag(): string {\n  if (typeof window === 'undefined') return ''\n  return new URLSearchParams(window.location.search).get('fresh') ?? ''\n}\n\n// \u5F53\u524D\u7EBF\u4E0A\u7D22\u5F15\u91CC\u7684\u53D1\u5E03\u6807\u8BB0\u3002\u6784\u5EFA\u671F\u5E38\u91CF RELEASE_TAG \u53EA\u7528\u4E8E\u300C\u8FD8\u6CA1\u62FF\u5230\u7D22\u5F15\u300D\u7684\u90A3\u4E00\u5C0F\u6BB5\uFF0C\n// \u4EE5\u53CA\u7D22\u5F15\u91CC\u6CA1\u6709\u8BE5\u5B57\u6BB5\u7684\u65E7\u7AD9\u70B9\uFF1B\u6B63\u5E38\u60C5\u51B5\u4E0B\u4EE5\u7D22\u5F15\u91CC\u7684\u503C\u4E3A\u51C6\u3002\nlet liveTag = ''\n\nfunction dataFetch(path: string): Promise<Response> {\n  const sep = path.indexOf('?') >= 0 ? '&' : '?'\n  const fresh = freshTag()\n  const suffix = 'v=' + (liveTag || RELEASE_TAG) + (fresh ? '&fresh=' + encodeURIComponent(fresh) : '')\n  return fetch(withBase(path + sep + suffix), { cache: 'no-cache' })\n}\n\n/**\n * \u5206\u949F\u7EA7\u65F6\u95F4\u6876\u3002\n *\n * \u7D22\u5F15\u662F\u300C\u7EBF\u4E0A\u6709\u6CA1\u6709\u65B0\u5185\u5BB9\u300D\u7684\u552F\u4E00\u5165\u53E3\uFF0C\u800C GitHub Pages \u7ED9\u9759\u6001\u6587\u4EF6\u7684\u5934\u662F\n * `Cache-Control: max-age=600`\uFF1A\u6D4F\u89C8\u5668\u4E0E\u8FB9\u7F18\u8282\u70B9\u90FD\u4F1A\u76F4\u63A5\u7528 10 \u5206\u949F\u65E7\u7F13\u5B58\uFF0C\n * \u671F\u95F4\u8FDE\u56DE\u6E90\u90FD\u4E0D\u505A\u3002\u6240\u4EE5\u7D22\u5F15\u4E0D\u80FD\u5E26\u56FA\u5B9A URL \u2014\u2014 \u6362\u6210\u6BCF\u5206\u949F\u624D\u53D8\u4E00\u6B21\u7684 URL\uFF1A\n * \u8DE8\u5206\u949F\u5C31\u662F\u4E00\u6B21\u5168\u65B0\u7684 URL\uFF0C\u8FB9\u7F18\u7F13\u5B58\u7ACB\u523B\u5931\u6548\uFF08\u6700\u591A\u65E7 60 \u79D2\uFF09\uFF1B\n * \u540C\u4E00\u5206\u949F\u5185\u7684\u6240\u6709\u8BBF\u5BA2\u4ECD\u7136\u5171\u7528\u540C\u4E00\u4EFD\u7F13\u5B58\uFF0C\u4E0D\u4F1A\u628A CDN \u6253\u7A7F\u3002\n */\nfunction indexBucket(): string {\n  return String(Math.floor(Date.now() / 60000))\n}\n\nfunction fetchIndex(): Promise<{ notes: NoteListItem[]; assets: string[]; folders: FolderNode[] }> {\n  if (!indexPromise) {\n    const fresh = freshTag()\n    const q = '?b=' + indexBucket() + (fresh ? '&fresh=' + encodeURIComponent(fresh) : '')\n    // \u6CE8\u610F\u4E0D\u80FD\u7528 dataFetch\uFF1A\u5B83\u7684 URL \u91CC\u5E26\u7740 liveTag\uFF0C\u800C liveTag \u6B63\u662F\u8981\u4ECE\u8FD9\u4E2A\u54CD\u5E94\u91CC\u8BFB\u51FA\u6765\u7684\u3002\n    indexPromise = fetch(withBase('/data/index.json' + q), { cache: 'no-cache' })\n      .then((r) => {\n        if (!r.ok) throw new Error(tNow().indexFailed)\n        return r.json()\n      })\n      .then((data: { notes: NoteListItem[]; assets: string[]; folders?: FolderNode[]; releaseTag?: string }) => {\n        if (data && typeof data.releaseTag === 'string' && data.releaseTag) liveTag = data.releaseTag\n        return {\n          notes: data.notes || [],\n          assets: data.assets || [],\n          // \u65E7\u7AD9\u70B9\uFF08\u672C\u6B21\u6539\u52A8\u4E4B\u524D\u53D1\u5E03\u7684\uFF09\u6CA1\u6709 folders \u5B57\u6BB5\uFF0C\u9000\u56DE\u7A7A\u6811\u7531\u524D\u7AEF\u6309 notes \u63A8\u5BFC\n          folders: data.folders || [],\n        }\n      })\n      .catch((e) => {\n        // \u5931\u8D25\u4E0D\u8981\u6C61\u67D3\u5355\u4F8B\uFF0C\u5426\u5219\u6574\u7AD9\u4F1A\u4E00\u76F4\u5361\u5728\u62A5\u9519\u6001\n        indexPromise = null\n        throw e\n      })\n  }\n  return indexPromise\n}\n\n/**\n * \u6807\u7B7E\u9875\u91CD\u65B0\u53EF\u89C1\u65F6\u4E22\u5F03\u7D22\u5F15\u5355\u4F8B\uFF0C\u4E0B\u6B21\u8BFB\u53D6\u4F1A\u91CD\u65B0\u56DE\u6E90\u3002\n *\n * \u573A\u666F\uFF1A\u8BBF\u5BA2\u628A\u9875\u9762\u7559\u5728\u540E\u53F0\uFF0C\u671F\u95F4\u4F60\u53D1\u5E03\u4E86\u65B0\u5185\u5BB9\u3002GitHub Pages \u7684 HTML \u6709 10 \u5206\u949F\n * max-age\uFF0C\u6D4F\u89C8\u5668\u4E0D\u4F1A\u81EA\u5DF1\u53BB\u91CD\u65B0\u6821\u9A8C\uFF1B\u8FD9\u91CC\u53EA\u505A\u300C\u6570\u636E\u5C42\u300D\u7684\u5237\u65B0\uFF08\u6210\u672C\u5F88\u5C0F\uFF1A\u4E00\u4E2A\n * \u5E26 ETag \u7684 JSON \u8BF7\u6C42\uFF09\uFF0C\u914D\u5408 dataFetch \u7684 `cache: 'no-cache'`\uFF0C\u672A\u53D8\u66F4\u65F6\u5C31\u662F 304\u3002\n * \u4E0D\u81EA\u52A8 `location.reload()`\uFF0C\u907F\u514D\u6253\u65AD\u6B63\u5728\u9605\u8BFB\u7684\u8BBF\u5BA2\u3002\n */\nif (typeof document !== 'undefined') {\n  document.addEventListener('visibilitychange', () => {\n    if (document.visibilityState === 'visible') indexPromise = null\n  })\n  // \u9996\u6B21\u8FDB\u5165\u4E5F\u7B97\u4E00\u6B21\u300C\u53EF\u89C1\u300D\uFF0C\u8BA9 indexPromise \u4E3A null \u4EE5\u4FBF\u540E\u7EED\u6309\u9700\u62C9\u53D6\n  indexPromise = null\n}\n\n/**\n * \u62C9\u5355\u7BC7\u7B14\u8BB0\u3002\n * \u8FD4\u56DE null \u8868\u793A\u300C\u771F\u7684\u6CA1\u6709\u8FD9\u7BC7\u300D\uFF08404\uFF09\uFF1B\u5176\u4F59\u5931\u8D25\uFF08500/502/\u7F51\u7EDC\u4E2D\u65AD/\u8D85\u65F6\uFF09**\u5FC5\u987B\u629B\u9519**\uFF0C\n * \u7531\u8C03\u7528\u65B9\u533A\u5206\u6210\u300C\u52A0\u8F7D\u5931\u8D25\uFF0C\u53EF\u91CD\u8BD5\u300D\u800C\u4E0D\u662F\u300C\u7B14\u8BB0\u4E0D\u5B58\u5728\u300D\u3002\n * \u539F\u5148\u4EFB\u4F55 !res.ok \u90FD\u8FD4\u56DE\u7A7A\u7B14\u8BB0\uFF0C\u5BFC\u81F4 500 \u548C\u8D85\u65F6\u90FD\u663E\u793A\u6210\u300C\u7B14\u8BB0\u4E0D\u5B58\u5728\u6216\u5DF2\u88AB\u5220\u9664\u300D\u3002\n */\nasync function fetchNoteFile(slug: string): Promise<NoteFile | null> {\n  const res = await dataFetch('/data/notes/' + slugFile(slug) + '.json')\n  if (res.status === 404) return null\n  if (!res.ok) throw new Error('HTTP ' + res.status)\n  return (await res.json()) as NoteFile\n}\n\nfunction emptyDetail(slug: string): NoteDetail {\n  return {\n    slug,\n    path: slug + '.md',\n    title: slug,\n    folder: '',\n    raw: '',\n    content: '',\n    frontmatter: {},\n    tags: [],\n    isPublic: true,\n    wordCount: 0,\n    noteDate: null,\n    updatedAt: '',\n  }\n}\n\n// ---------- \u4E0E\u5168\u6808\u7248\u540C\u7B7E\u540D\u7684\u63A5\u53E3\uFF08\u65E0\u8D26\u53F7\u4F53\u7CFB\uFF09 ----------\n//\n// \u9759\u6001\u7AD9\u662F**\u7EAF\u53EA\u8BFB**\u7684\uFF1A\u6570\u636E\u5728\u6784\u5EFA\u65F6\u5BFC\u51FA\u6210 /data/*.json\uFF0C\u968F\u7AD9\u70B9\u4E00\u8D77\u6258\u7BA1\u3002\n// \u56E0\u6B64\u8FD9\u91CC\u6CA1\u6709\u4EFB\u4F55\"\u7BA1\u7406\"\u7C7B\u63A5\u53E3 \u2014\u2014 \u4E0E\u5168\u6808\u7248\u4E0D\u540C\u7684\u662F\uFF0C\u5168\u6808\u7248\u90A3\u4E9B\u51FD\u6570\n// \uFF08\u6539\u516C\u5F00\u3001\u5220\u7B14\u8BB0\u3001\u4E0A\u4F20\u3001\u7EDF\u8BA1\u3001\u53D1\u5E03\uFF09\u5728\u9759\u6001\u7AD9**\u6839\u672C\u4E0D\u5B58\u5728**\uFF0C\n// \u7EC4\u4EF6\u91CC\u4E5F\u4E0D\u5E94\u5F15\u7528\uFF1B\u9700\u8981\u8FD9\u4E9B\u80FD\u529B\u8BF7\u7528\u5168\u6808\u7248\u6216\u53D1\u5E03\u7BA1\u7406\u5668\u3002\n\nexport async function fetchSiteInfo(): Promise<SiteInfo> {\n  const { SITE_NAME } = await import('@/lib/site')\n  // \u7AD9\u540D\u5728\u7BA1\u7406\u5668\u91CC\u586B\u4EC0\u4E48\u5C31\u663E\u793A\u4EC0\u4E48\uFF08\u4E0D\u81EA\u52A8\u8865\u300C\u7684\u535A\u5BA2\u300D\uFF09\uFF1B\u6765\u6E90\u4E0E\u6807\u9898\u4E00\u81F4\uFF0C\u89C1 lib/site.ts\u3002\n  const name = SITE_NAME\n  return { name, title: name }\n}\n\nexport async function fetchNotes(_all = false): Promise<NoteListItem[]> {\n  const idx = await fetchIndex()\n  return idx.notes\n}\n\n/** \u76EE\u5F55\u6811\uFF08\u9996\u9875\u9010\u5C42\u4E0B\u94BB\u7528\uFF09\u3002\u65E7\u7D22\u5F15\u6CA1\u6709\u8BE5\u5B57\u6BB5\u65F6\u8FD4\u56DE\u7A7A\u6570\u7EC4\u3002 */\nexport async function fetchFolders(): Promise<FolderNode[]> {\n  const idx = await fetchIndex()\n  return idx.folders\n}\n\nexport async function fetchNoteDetail(\n  slug: string\n): Promise<{ note: NoteDetail; backlinks: RefItem[]; outlinks: RefItem[] } | 'private' | 'not_found'> {\n  const file = await fetchNoteFile(slug)\n  if (!file || !file.note.raw) return 'not_found'\n  return file\n}\n\n/** \u5168\u6587\u641C\u7D22\u7D22\u5F15\uFF1Aslug \u2192 \u7EAF\u6587\u672C\uFF08\u6784\u5EFA\u65F6\u751F\u6210\uFF0C\u53EA\u6709\u771F\u7684\u5F00\u59CB\u641C\u7D22\u65F6\u624D\u62C9\uFF09 */\nlet searchPromise: Promise<Record<string, string>> | null = null\nexport function fetchSearchIndex(): Promise<Record<string, string>> {\n  if (!searchPromise) {\n    searchPromise = dataFetch('/data/search.json')\n      .then((r) => {\n        if (!r.ok) throw new Error(tNow().indexFailed)\n        return r.json() as Promise<{ notes: Record<string, string> }>\n      })\n      .then((j) => j.notes ?? {})\n      .catch((e) => {\n        // \u5931\u8D25\u4E0D\u8981\u6C61\u67D3\u5355\u4F8B\uFF0C\u4E0B\u6B21\u8F93\u5165\u8FD8\u80FD\u91CD\u8BD5\n        searchPromise = null\n        throw e\n      })\n  }\n  return searchPromise\n}\n\nexport async function fetchLinkIndex(): Promise<LinkIndex> {\n  const idx = await fetchIndex()\n  return {\n    notes: idx.notes.map((n) => ({\n      slug: n.slug,\n      path: n.path,\n      title: n.title,\n      isPublic: n.isPublic,\n      excerpt: n.excerpt,\n    })),\n    assets: idx.assets.map((p) => ({ path: p })),\n  }\n}\n" }, "src/lib/find-text.ts": { "t": "utf8", "v": "/**\n * \u300C\u8DF3\u5230\u6B63\u6587\u91CC\u7684\u90A3\u6BB5\u6587\u5B57\u300D\uFF1A\u641C\u7D22\u547D\u4E2D\u6B63\u6587\u65F6\uFF0C\u70B9\u7ED3\u679C\u5E94\u8BE5\u843D\u5230\u90A3\u53E5\u8BDD\u4E0A\uFF0C\n * \u800C\u4E0D\u662F\u628A\u7B14\u8BB0\u4ECE\u5934\u6253\u5F00\u8BA9\u4EBA\u81EA\u5DF1\u627E\u3002\n *\n * \u4E09\u4EF6\u4E8B\uFF1A\n *  1) \u627E\u4F4D\u7F6E\uFF1A\u641C\u7D22\u7D22\u5F15\u662F\u6784\u5EFA\u65F6\u5265\u6389 markdown \u6807\u8BB0\u540E\u7684**\u7EAF\u6587\u672C**\uFF0C\u4E0D\u80FD\u76F4\u63A5\u62FF\u53BB\u548C\n *     \u6E32\u67D3\u540E\u7684 DOM \u6BD4\u5B57\u7B26\u4E32\uFF08`**\u52A0\u7C97**\u8BCD` \u4F1A\u88AB\u6807\u7B7E\u5207\u6210\u4E24\u4E2A\u6587\u672C\u8282\u70B9\uFF09\u3002\u6240\u4EE5\u6309\u300C\u5757\u300D\n *     \u627E\uFF1A\u628A\u540C\u4E00\u6BB5\u843D / \u5217\u8868\u9879 / \u6807\u9898\u91CC\u7684\u6587\u672C\u8282\u70B9\u62FC\u8D77\u6765\u518D\u627E\uFF0C\u88AB\u884C\u5185\u6807\u8BB0\u5207\u5F00\u7684\u8BCD\u4E5F\u80FD\u547D\u4E2D\u3002\n *  2) \u6EDA\u8FC7\u53BB\uFF1A\u7B97 Range \u7684 rect \u518D\u6EDA\uFF0C\u843D\u70B9\u7559\u4E00\u70B9\u4E0A\u8FB9\u8DDD\uFF08\u8D34\u7740\u7A97\u53E3\u9876\u7AEF\u8BFB\u7740\u96BE\u53D7\uFF09\u3002\n *  3) \u8DDF\u7740 reflow \u6821\u6B63\uFF1A\u56FE\u7247 / \u516C\u5F0F\u662F\u61D2\u52A0\u8F7D\u7684\uFF0C\u6EDA\u5B8C\u8FD8\u4F1A\u628A\u6B63\u6587\u7EE7\u7EED\u5F80\u4E0B\u63A8\uFF0C\u6240\u4EE5\u50CF\n *     \u5927\u7EB2\u90A3\u6837\u6301\u7EED\u6821\u6B63\u5230\u843D\u70B9\u7A33\u5B9A\u4E3A\u6B62 \u2014\u2014 \u5426\u5219\u53C8\u4F1A\u51FA\u73B0\u300C\u70B9\u4E00\u6B21\u53EA\u632A\u4E00\u5C0F\u6BB5\u300D\u3002\n *\n * \u9AD8\u4EAE\u7528 CSS Custom Highlight API\uFF08\u53EA\u767B\u8BB0 Range\uFF0C\u4E0D\u6539 DOM\uFF0C\u4E0D\u4F1A\u548C React \u62A2\u8282\u70B9\uFF09\uFF1B\n * \u6D4F\u89C8\u5668\u4E0D\u652F\u6301\u5C31\u53EA\u6EDA\u52A8\uFF0C\u529F\u80FD\u4E0D\u53D7\u5F71\u54CD\u3002\n */\n\nconst HIGHLIGHT_NAME = 'blog-search-hit'\n\n/** \u53EF\u4EE5\u72EC\u7ACB\u627F\u8F7D\u4E00\u53E5\u8BDD\u7684\u5757\u7EA7\u5143\u7D20\uFF1A\u6309\u5757\u5339\u914D\uFF0C\u907F\u514D\u8DE8\u6BB5\u843D\u62FC\u51FA\u5047\u547D\u4E2D */\nconst BLOCK_SELECTOR =\n  'p, li, td, th, h1, h2, h3, h4, h5, h6, pre, blockquote, figcaption, dt, dd, summary'\n\ntype AnyWindow = Window & {\n  Highlight?: new (...ranges: Range[]) => unknown\n  CSS?: { highlights?: Map<string, unknown> }\n}\n\nfunction textNodesIn(root: Node): Text[] {\n  const out: Text[] = []\n  const walker = document.createTreeWalker(root, NodeFilter.SHOW_TEXT, {\n    acceptNode(node: Node) {\n      const v = node.nodeValue\n      if (!v || !v.trim()) return NodeFilter.FILTER_REJECT\n      const p = (node as Text).parentElement\n      if (p && (p.tagName === 'SCRIPT' || p.tagName === 'STYLE')) return NodeFilter.FILTER_REJECT\n      return NodeFilter.FILTER_ACCEPT\n    },\n  })\n  let node = walker.nextNode()\n  while (node) {\n    out.push(node as Text)\n    node = walker.nextNode()\n  }\n  return out\n}\n\n/** \u5728\u4E00\u4E2A\u5757\u91CC\u627E\u5230 needle \u5BF9\u5E94\u7684 Range\uFF08\u53EF\u80FD\u8DE8\u591A\u4E2A\u6587\u672C\u8282\u70B9\uFF09 */\nfunction rangeIn(block: Node, needle: string): Range | null {\n  const nodes = textNodesIn(block)\n  if (!nodes.length) return null\n  let joined = ''\n  const starts: number[] = []\n  for (const n of nodes) {\n    starts.push(joined.length)\n    joined += n.nodeValue ?? ''\n  }\n  const at = joined.toLowerCase().indexOf(needle)\n  if (at < 0) return null\n  const end = at + needle.length\n  const nodeAt = (pos: number) => {\n    let k = 0\n    for (let j = 0; j < nodes.length; j++) if (starts[j] <= pos) k = j\n    return k\n  }\n  const a = nodeAt(at)\n  const b = nodeAt(end - 1)\n  try {\n    const range = document.createRange()\n    range.setStart(nodes[a], at - starts[a])\n    range.setEnd(nodes[b], end - starts[b])\n    return range\n  } catch {\n    return null\n  }\n}\n\n/** \u5728\u5DF2\u6E32\u67D3\u7684\u6B63\u6587\u91CC\u627E query\uFF0C\u8FD4\u56DE\u7B2C\u4E00\u4E2A\u547D\u4E2D\u7684 Range */\nexport function findTextRange(root: HTMLElement, query: string): Range | null {\n  const needle = query.trim().toLowerCase()\n  if (!needle) return null\n  for (const block of Array.from(root.querySelectorAll<HTMLElement>(BLOCK_SELECTOR))) {\n    const r = rangeIn(block, needle)\n    if (r) return r\n  }\n  // \u515C\u5E95\uFF1A\u6574\u5757\u6B63\u6587\u5F53\u4E00\u4E2A\u6587\u672C\u6D41\uFF08\u547D\u4E2D\u8DE8\u6BB5\u843D / \u76F4\u63A5\u5199\u5728\u5BB9\u5668\u91CC\u7684\u6587\u5B57\uFF09\n  return rangeIn(root, needle)\n}\n\nexport function clearSearchHighlight(): void {\n  try {\n    ;(window as unknown as AnyWindow).CSS?.highlights?.delete(HIGHLIGHT_NAME)\n  } catch {\n    /* \u5FFD\u7565 */\n  }\n}\n\nfunction highlightRange(range: Range): void {\n  const w = window as unknown as AnyWindow\n  try {\n    if (typeof w.Highlight === 'function' && w.CSS?.highlights) {\n      w.CSS.highlights.set(HIGHLIGHT_NAME, new w.Highlight(range))\n    }\n  } catch {\n    /* \u4E0D\u652F\u6301\u5C31\u53EA\u6EDA\u52A8 */\n  }\n}\n\nconst MAX_TICKS = 50\nconst TICK_MS = 120\n\nfunction scrollRangeIntoView(range: Range): void {\n  const margin = () => Math.min(140, Math.max(40, window.innerHeight * 0.18))\n  const desiredTop = (): number | null => {\n    let rect: DOMRect\n    try {\n      rect = range.getBoundingClientRect()\n    } catch {\n      return null\n    }\n    if (!rect || (rect.width === 0 && rect.height === 0)) return null\n    return Math.max(0, window.scrollY + rect.top - margin())\n  }\n\n  const first = desiredTop()\n  if (first !== null) window.scrollTo({ top: first, behavior: 'auto' })\n\n  // \u61D2\u52A0\u8F7D\u7684\u56FE\u7247 / \u516C\u5F0F\u4F1A\u5728\u968F\u540E\u51E0\u767E\u6BEB\u79D2\u91CC\u7EE7\u7EED\u628A\u6B63\u6587\u5F80\u4E0B\u63A8\uFF0C\u6301\u7EED\u6821\u6B63\u5230\u843D\u70B9\u7A33\u5B9A\n  let prev = -1\n  let stable = 0\n  let ticks = 0\n  const tick = () => {\n    if (ticks++ >= MAX_TICKS) return\n    const want = desiredTop()\n    if (want !== null) {\n      if (Math.abs(want - window.scrollY) > 1) window.scrollTo({ top: want, behavior: 'auto' })\n      if (Math.abs(want - prev) <= 2) stable++\n      else stable = 0\n      prev = want\n    }\n    if (stable < 4) setTimeout(tick, TICK_MS)\n  }\n  setTimeout(tick, TICK_MS)\n}\n\n/** \u627E\u5230\u5E76\u8DF3\u8FC7\u53BB\uFF1B\u8FD4\u56DE\u662F\u5426\u627E\u5230\uFF08\u8C03\u7528\u65B9\u636E\u6B64\u51B3\u5B9A\u8981\u4E0D\u8981\u518D\u8BD5\u51E0\u6B21\uFF09 */\nexport function jumpToText(root: HTMLElement, query: string): boolean {\n  const range = findTextRange(root, query)\n  if (!range) return false\n  highlightRange(range)\n  scrollRangeIntoView(range)\n  return true\n}\n" }, "src/lib/font-scale.ts": { "t": "utf8", "v": "/**\n * \u9605\u8BFB\u5B57\u53F7\uFF08\u5168\u7AD9\u751F\u6548\uFF09\u3002\n *\n * \u9700\u6C42\u6765\u6E90\uFF1A\u7528\u6237\u8981\u6C42\u300C\u5B57\u4F53\u8C03\u8282\u65F6\u4E0D\u6B62\u535A\u5BA2\u6B63\u6587\u8981\u8C03\u8282\uFF0C\u6240\u6709\u5B57\u4F53\u90FD\u8981\u300D\u3002\n * \u4E4B\u524D\u7684\u5B9E\u73B0\u53EA\u5728\u6587\u7AE0\u9875\u7ED9 <article> \u6302 `--note-fs`\uFF0C\u4E8E\u662F\u8C03\u5B57\u53F7\u53EA\u5F71\u54CD\u6B63\u6587\uFF0C\n * \u9876\u680F\u3001\u9996\u9875\u5361\u7247\u3001\u5927\u7EB2\u6D6E\u5C42\u3001\u9875\u811A\u7EB9\u4E1D\u4E0D\u52A8 \u2014\u2014 \u770B\u8D77\u6765\u50CF\u300C\u53EA\u6709\u6B63\u6587\u80FD\u8C03\u300D\u3002\n *\n * \u73B0\u5728\u7684\u505A\u6CD5\uFF1A\u628A\u500D\u7387\u5199\u5230 <html> \u7684 `--site-fs` \u4E0A\uFF0Cglobals.css \u7528\u5B83\u91CD\u7B97\n * Tailwind \u7684\u5B57\u53F7\u53D8\u91CF\uFF08--text-*\uFF09\u4E0E\u6B63\u6587\u5B57\u53F7\uFF0C**\u53EA\u7F29\u653E\u6587\u5B57**\u3002\n * \u523B\u610F\u4E0D\u53BB\u6539\u6839\u5B57\u53F7\uFF1A\u6839\u5B57\u53F7\u662F rem \u7684\u57FA\u51C6\uFF0C\u6539\u5B83\u4F1A\u628A Tailwind \u7684 p-* / gap-* /\n * max-w-[68rem] \u4E00\u8D77\u7F29\u653E\uFF0C\u4E8E\u662F\u300C\u8C03\u5B57\u53F7\u300D\u4F1A\u987A\u5E26\u628A\u535A\u5BA2\u53D8\u5BBD\u3001\u628A\u5B57\u53F7\u63A7\u4EF6\u81EA\u5DF1\u6491\u5927 \u2014\u2014\n * \u7528\u6237\u660E\u786E\u8981\u6C42\u300C\u8C03\u5927\u5C0F\u7684\u90A3\u90E8\u5206\u5927\u5C0F\u4E0D\u80FD\u6539\uFF0C\u535A\u5BA2\u5BBD\u5EA6\u4E0D\u80FD\u6539\uFF0C\u53EA\u80FD\u6539\u5B57\u4F53\u5927\u5C0F\u300D\u3002\n * \u8BE6\u89C1 globals.css \u91CC\u300C\u9605\u8BFB\u5B57\u53F7\uFF1A\u53EA\u7F29\u653E\u6587\u5B57\uFF0C\u4E0D\u52A8\u7248\u9762\u300D\u90A3\u4E00\u6BB5\u3002\n *\n * \u5355\u72EC\u62BD\u6210\u6A21\u5757\u7684\u539F\u56E0\uFF1A\u8BBE\u7F6E\u63A7\u4EF6\u5728\u6587\u7AE0\u9875\uFF0C\u800C\u751F\u6548\u70B9\u5728\u6574\u4E2A\u6587\u6863\uFF0C\n * \u9700\u8981\u4E00\u4E2A\u8DE8\u7EC4\u4EF6\u5171\u4EAB\u3001\u4E14\u80FD\u5728\u9996\u5E27\u524D\u5E94\u7528\u7684\u5730\u65B9\u3002\n */\nexport const FONT_SCALE_KEY = 'font-scale'\n\nexport const FONT_MIN = 0.8\nexport const FONT_MAX = 1.6\nexport const FONT_STEP = 0.05\n\n/** \u628A\u500D\u7387\u5939\u5230\u5408\u6CD5\u533A\u95F4\uFF0C\u975E\u6CD5\u8F93\u5165\u56DE\u843D\u5230 1\uFF08\u9ED8\u8BA4\uFF09 */\nexport function clampScale(v: number): number {\n  if (!Number.isFinite(v)) return 1\n  if (v < FONT_MIN || v > FONT_MAX) return 1\n  return Math.round(v * 100) / 100\n}\n\n/** \u8BFB\u5DF2\u4FDD\u5B58\u7684\u500D\u7387\uFF1B\u6CA1\u6709\u6216\u574F\u6389\u5C31\u7528 1 */\nexport function readScale(): number {\n  if (typeof window === 'undefined') return 1\n  try {\n    return clampScale(Number(localStorage.getItem(FONT_SCALE_KEY)))\n  } catch {\n    return 1\n  }\n}\n\n/** \u5199\u5230 <html> \u4E0A\u3002\u7528 CSS \u53D8\u91CF\u800C\u4E0D\u662F\u76F4\u63A5\u6539 font-size\uFF0C\u65B9\u4FBF\u4E3B\u9898\u8986\u76D6\u4E0E\u8FC7\u6E21 */\nexport function applyScale(v: number) {\n  if (typeof document === 'undefined') return\n  document.documentElement.style.setProperty('--site-fs', String(clampScale(v)))\n}\n\n/** \u4FDD\u5B58\u5E76\u7ACB\u5373\u751F\u6548 */\nexport function saveScale(v: number): number {\n  const s = clampScale(v)\n  try {\n    localStorage.setItem(FONT_SCALE_KEY, String(s))\n  } catch {\n    /* \u5FFD\u7565\uFF1A\u9690\u79C1\u6A21\u5F0F\u4E0B\u5199\u4E0D\u8FDB\u53BB\uFF0C\u672C\u6B21\u4F1A\u8BDD\u5185\u4ECD\u7136\u751F\u6548 */\n  }\n  applyScale(s)\n  return s\n}\n" }, "src/lib/i18n.ts": { "t": "utf8", "v": "'use client'\n\nimport { create } from 'zustand'\nimport { persist } from 'zustand/middleware'\nimport { DEFAULT_LANG, LANG_STORAGE_KEY, type Lang } from './lang'\n\nexport type { Lang }\nexport { DEFAULT_LANG }\n\n/**\n * \u754C\u9762\u8BED\u8A00\u3002**\u53EA\u7FFB\u8BD1\u754C\u9762\u6587\u6848\uFF0C\u4E0D\u78B0\u535A\u5BA2\u5185\u5BB9**\u2014\u2014\u7B14\u8BB0\u6807\u9898\u3001\u6B63\u6587\u3001\u6587\u4EF6\u5939\u540D\u4E00\u5F8B\u539F\u6837\u663E\u793A\u3002\n *\n * \u9ED8\u8BA4\u8BED\u8A00\u6784\u5EFA\u671F\u56FA\u5B9A\uFF08\u89C1 lib/lang.ts\uFF09\uFF0C\u7528\u6237\u624B\u52A8\u5207\u6362\u540E\u5199\u8FDB localStorage\u3002\n */\n\nexport const DICT = {\n  zh: {\n    // \u9876\u680F\n    toggleTheme: '\u5207\u6362\u660E\u6697\u4E3B\u9898',\n    backHome: '\u8FD4\u56DE\u535A\u5BA2\u9996\u9875',\n    searchPlaceholder: '\u5168\u5E93\u641C\u7D22\uFF1A\u6807\u9898\u3001\u6B63\u6587\u3001\u8DEF\u5F84\u3001\u6807\u7B7E\u2026',\n    search: '\u5168\u5E93\u641C\u7D22',\n    clearSearch: '\u6E05\u7A7A\u641C\u7D22',\n    checkUpdate: '\u68C0\u67E5\u66F4\u65B0',\n    checkUpdateTip: '\u68C0\u67E5\u66F4\u65B0\uFF08\u5F3A\u5236\u83B7\u53D6\u6700\u65B0\u5185\u5BB9\uFF09',\n    fetching: '\u6B63\u5728\u83B7\u53D6\u6700\u65B0\u5185\u5BB9\u2026',\n    switchLang: '\u5207\u6362\u8BED\u8A00',\n    langZh: '\u4E2D\u6587',\n    langEn: 'English',\n    // \u9996\u9875\n    allNotes: '\u5168\u90E8\u7B14\u8BB0',\n    publicCount: (n: number) => `\u5171 ${n} \u7BC7\u516C\u5F00`,\n    folderPublicCount: (n: number) => `\u5171 ${n} \u7BC7`,\n    filteredCount: (n: number) => ` \xB7 \u7B5B\u9009\u51FA ${n} \u7BC7`,\n    expandAll: '\u5168\u90E8\u5C55\u5F00',\n    collapseAll: '\u5168\u90E8\u6536\u8D77',\n    tagFilter: '\u6807\u7B7E\u7B5B\u9009\uFF1A',\n    noteCountSuffix: (n: number) => `\uFF08${n} \u7BC7\uFF09`,\n    clearFilter: '\u6E05\u9664\u7B5B\u9009',\n    all: '\u5168\u90E8',\n    loadFailed: '\u7B14\u8BB0\u52A0\u8F7D\u5931\u8D25\uFF0C\u8BF7\u5237\u65B0\u91CD\u8BD5',\n    emptyVault: '\u8FD8\u6CA1\u6709\u53D1\u5E03\u4EFB\u4F55\u7B14\u8BB0',\n    noMatch: '\u6CA1\u6709\u5339\u914D\u7684\u7B14\u8BB0',\n    emptyVaultHint: '\u5728\u53D1\u5E03\u7BA1\u7406\u5668\u91CC\u628A\u7B14\u8BB0\u6807\u4E3A\u516C\u5F00\u5373\u53EF',\n    emptyHint: '\u8BD5\u8BD5\u66F4\u6362\u5173\u952E\u8BCD\u6216\u6E05\u9664\u6807\u7B7E\u8FC7\u6EE4',\n    folderCount: (n: number) => `${n} \u7BC7`,\n    uncategorized: '\u672A\u5206\u7EC4',\n    // \u9010\u5C42\u4E0B\u94BB / \u9762\u5305\u5C51\n    crumbRoot: '\u5168\u90E8',\n    emptyFolder: '\u8FD9\u4E2A\u6587\u4EF6\u5939\u91CC\u8FD8\u6CA1\u6709\u516C\u5F00\u7684\u7B14\u8BB0',\n    emptyFolderHint: '\u6362\u4E2A\u6587\u4EF6\u5939\u770B\u770B\uFF0C\u6216\u8005\u7528\u641C\u7D22\u627E',\n    openFolder: (name: string) => `\u6253\u5F00\u6587\u4EF6\u5939 ${name}`,\n    subfolderCount: (n: number) => `${n} \u4E2A\u5B50\u6587\u4EF6\u5939`,\n    backToFolder: '\u8FD4\u56DE\u4E0A\u4E00\u7EA7',\n    searchResults: '\u641C\u7D22\u7ED3\u679C',\n    siteFallback: '\u7B14\u8BB0',\n    openNote: (t: string) => `\u6253\u5F00\u7B14\u8BB0 ${t}`,\n    // \u7B14\u8BB0\u9875\n    notCreated: '\u672A\u521B\u5EFA',\n    notUploaded: '\u672A\u4E0A\u4F20',\n    /** \u7EAF\u5757\u5F15\u7528 [[#^xxx]] \u627E\u4E0D\u5230\u539F\u6587\u65F6\u7684\u515C\u5E95\u94FE\u63A5\u6587\u5B57 */\n    blockRef: '\u5757\u5F15\u7528',\n    notPublic: '\u6B64\u7B14\u8BB0\u672A\u516C\u5F00',\n    notPublicBody: '\u8FD9\u7BC7\u7B14\u8BB0\u6CA1\u6709\u88AB\u6807\u8BB0\u4E3A\u516C\u5F00\uFF0C\u56E0\u6B64\u4E0D\u4F1A\u51FA\u73B0\u5728\u9759\u6001\u7AD9\u4E0A\u3002',\n    goHome: '\u8FD4\u56DE\u9996\u9875',\n    notFound: '\u7B14\u8BB0\u4E0D\u5B58\u5728\u6216\u5DF2\u88AB\u5220\u9664',\n    back: '\u8FD4\u56DE',\n    words: (n: number) => `${n} \u5B57`,\n    backlinks: '\u94FE\u63A5\u5230\u672C\u6587\u7684\u7B14\u8BB0',\n    outlinks: '\u672C\u6587\u7684\u51FA\u94FE',\n    frontmatter: 'Frontmatter \u5143\u6570\u636E',\n    fontSmaller: '\u7F29\u5C0F\u5B57\u4F53',\n    fontReset: '\u8C03\u8282\u5B57\u4F53\u5927\u5C0F',\n    fontLarger: '\u653E\u5927\u5B57\u4F53',\n    tocExpand: '\u5C55\u5F00\u5927\u7EB2',\n    tocCollapse: '\u6536\u8D77\u5927\u7EB2',\n    toc: '\u5927\u7EB2',\n    // \u9884\u89C8\u6D6E\u5C42\n    loading: '\u52A0\u8F7D\u4E2D\u2026',\n    privateByAuthor: '\u4F5C\u8005\u5C06\u8FD9\u7BC7\u7B14\u8BB0\u8BBE\u4E3A\u4E86\u79C1\u5BC6\u3002',\n    noteMissing: '\u7B14\u8BB0\u4E0D\u5B58\u5728',\n    noteMissingBody: '\u76EE\u6807\u7B14\u8BB0\u4E0D\u5B58\u5728\u6216\u5DF2\u88AB\u5220\u9664\u3002',\n    blockNotFound: '\u672A\u627E\u5230\u5BF9\u5E94\u6587\u672C\u5757\uFF0C\u663E\u793A\u5168\u6587\uFF1A',\n    openNoteArrow: '\u6253\u5F00\u7B14\u8BB0 \u2197',\n    openNoteNewTab: '\u5728\u65B0\u6807\u7B7E\u9875\u6253\u5F00\u8FD9\u7BC7\u7B14\u8BB0',\n    // \u9875\u811A\n    vaultDriven: 'Obsidian Vault \u9A71\u52A8',\n    // \u5176\u4ED6\n    indexFailed: '\u52A0\u8F7D\u7B14\u8BB0\u7D22\u5F15\u5931\u8D25',\n    // \u6B63\u6587\u6E32\u67D3\n    copy: '\u590D\u5236',\n    copied: '\u5DF2\u590D\u5236',\n    copyCode: '\u590D\u5236\u4EE3\u7801',\n    attachmentPreview: '\u9644\u4EF6\u9884\u89C8',\n    unresolvedTip: '\u8BE5\u7B14\u8BB0\u5C1A\u672A\u521B\u5EFA\uFF0C\u70B9\u51FB\u641C\u7D22\u76F8\u5173\u7B14\u8BB0',\n    // \u5F15\u7528/\u5D4C\u5165\n    sectionMissing: '\u672A\u627E\u5230\u88AB\u5F15\u7528\u7684\u5C0F\u8282\uFF0C\u663E\u793A\u5168\u6587\uFF1A',\n    embedCycle: '\u5FAA\u73AF\u5F15\u7528',\n    embedTooDeep: '\u5D4C\u5957\u8FC7\u6DF1\uFF0C\u672A\u5C55\u5F00',\n    // \u7B14\u8BB0\u9875\u9519\u8BEF\u6001\n    noteLoadFailed: '\u7B14\u8BB0\u52A0\u8F7D\u5931\u8D25\uFF0C\u8BF7\u68C0\u67E5\u7F51\u7EDC\u540E\u91CD\u8BD5',\n    retry: '\u91CD\u8BD5',\n    close: '\u5173\u95ED',\n    tocDrag: '\u6309\u4F4F\u62D6\u52A8\u5927\u7EB2',\n    // Obsidian callout \u7684\u9ED8\u8BA4\u6807\u9898\uFF08\u7B14\u8BB0\u91CC\u5199 > [!note] \u5374\u6CA1\u7ED9\u6807\u9898\u65F6\u7528\uFF09\n    calloutLabel: {\n      note: '\u7B14\u8BB0',\n      abstract: '\u6458\u8981',\n      info: '\u4FE1\u606F',\n      todo: '\u5F85\u529E',\n      tip: '\u63D0\u793A',\n      success: '\u6210\u529F',\n      question: '\u7591\u95EE',\n      warning: '\u8B66\u544A',\n      failure: '\u5931\u8D25',\n      danger: '\u5371\u9669',\n      bug: '\u7F3A\u9677',\n      example: '\u793A\u4F8B',\n      quote: '\u5F15\u7528',\n    },\n  },\n  en: {\n    toggleTheme: 'Toggle theme',\n    backHome: 'Back to home',\n    searchPlaceholder: 'Search titles, content, paths, tags\u2026',\n    search: 'Search',\n    clearSearch: 'Clear search',\n    checkUpdate: 'Check for updates',\n    checkUpdateTip: 'Check for updates (force refresh)',\n    fetching: 'Fetching latest\u2026',\n    switchLang: 'Language',\n    langZh: '\u4E2D\u6587',\n    langEn: 'English',\n    allNotes: 'All notes',\n    publicCount: (n: number) => `${n} public`,\n    folderPublicCount: (n: number) => (n === 1 ? '1 note' : `${n} notes`),\n    filteredCount: (n: number) => ` \xB7 ${n} matched`,\n    expandAll: 'Expand all',\n    collapseAll: 'Collapse all',\n    tagFilter: 'Tag:',\n    noteCountSuffix: (n: number) => ` (${n})`,\n    clearFilter: 'Clear',\n    all: 'All',\n    loadFailed: 'Failed to load notes. Please refresh.',\n    emptyVault: 'No notes published yet',\n    noMatch: 'No matching notes',\n    emptyVaultHint: 'Mark notes as public in the publish manager',\n    emptyHint: 'Try different keywords or clear the tag filter',\n    folderCount: (n: number) => (n === 1 ? '1 note' : `${n} notes`),\n    uncategorized: 'Ungrouped',\n    crumbRoot: 'All',\n    emptyFolder: 'No public notes in this folder yet',\n    emptyFolderHint: 'Try another folder, or use search',\n    openFolder: (name: string) => `Open folder ${name}`,\n    subfolderCount: (n: number) => (n === 1 ? '1 subfolder' : `${n} subfolders`),\n    backToFolder: 'Back to parent folder',\n    searchResults: 'Search results',\n    siteFallback: 'Notes',\n    openNote: (t: string) => `Open note ${t}`,\n    notCreated: 'Not created',\n    notUploaded: 'Not uploaded',\n    blockRef: 'Block reference',\n    notPublic: 'This note is private',\n    notPublicBody: 'This note is not marked public, so it is not published to the static site.',\n    goHome: 'Back to home',\n    notFound: 'Note not found or deleted',\n    back: 'Back',\n    words: (n: number) => `${n} words`,\n    backlinks: 'Linked from',\n    outlinks: 'Links to',\n    frontmatter: 'Frontmatter',\n    fontSmaller: 'Decrease font size',\n    fontReset: 'Reset font size',\n    fontLarger: 'Increase font size',\n    tocExpand: 'Expand outline',\n    tocCollapse: 'Collapse outline',\n    toc: 'Outline',\n    loading: 'Loading\u2026',\n    privateByAuthor: 'The author set this note to private.',\n    noteMissing: 'Note not found',\n    noteMissingBody: 'The linked note does not exist or has been deleted.',\n    blockNotFound: 'Block not found \u2014 showing the full note:',\n    openNoteArrow: 'Open note \u2197',\n    openNoteNewTab: 'Open this note in a new tab',\n    vaultDriven: 'Powered by Obsidian Vault',\n    indexFailed: 'Failed to load the note index',\n    copy: 'Copy',\n    copied: 'Copied',\n    copyCode: 'Copy code',\n    attachmentPreview: 'Attachment preview',\n    unresolvedTip: 'This note has not been created yet \u2014 click to search related notes',\n    sectionMissing: 'Referenced section not found \u2014 showing the full note:',\n    embedCycle: 'Circular embed',\n    embedTooDeep: 'Nested too deeply, not expanded',\n    noteLoadFailed: 'Failed to load the note. Check your connection and retry.',\n    retry: 'Retry',\n    close: 'Close',\n    tocDrag: 'Press and drag to move the outline',\n    calloutLabel: {\n      note: 'Note',\n      abstract: 'Abstract',\n      info: 'Info',\n      todo: 'Todo',\n      tip: 'Tip',\n      success: 'Success',\n      question: 'Question',\n      warning: 'Warning',\n      failure: 'Failure',\n      danger: 'Danger',\n      bug: 'Bug',\n      example: 'Example',\n      quote: 'Quote',\n    },\n  },\n} as const\n\nexport type Dict = (typeof DICT)['zh']\n\n/**\n * \u9ED8\u8BA4\u8BED\u8A00\u56FA\u5B9A\uFF08\u6784\u5EFA\u671F\u51B3\u5B9A\uFF0C\u89C1 lib/lang.ts\uFF09\uFF0C\u4E0D\u6309\u6D4F\u89C8\u5668\u8BED\u8A00\u81EA\u52A8\u731C\u3002\n *\n * \u539F\u56E0\uFF1A\u9759\u6001\u5BFC\u51FA\u7684 HTML \u662F\u6784\u5EFA\u65F6\u5C31\u70E7\u6B7B\u7684\u3002\u82E5\u9996\u5C4F\u6309 zh \u6E32\u67D3\u3001\u6C34\u5408\u540E\u518D\u7FFB\u6210 en\uFF0C\n * \u975E\u4E2D\u6587\u7528\u6237\u4F1A\u770B\u5230\u6574\u9875\u6587\u5B57\u300C\u95EA\u4E00\u4E0B\u300D\u6362\u8BED\u8A00\u3002\u73B0\u5728\u6539\u6210\uFF1A\u9ED8\u8BA4\u8BED\u8A00\u56FA\u5B9A\uFF0C\u7528\u6237\u624B\u52A8\n * \u5207\u6362\u540E\u8BB0\u5728 localStorage\uFF0C\u7531 layout \u7684\u9884\u7ED8\u5236\u811A\u672C\u5728\u9996\u5E27\u524D\u8BBE\u597D <html data-lang>\uFF0C\n * \u754C\u9762\u6587\u6848\u4ECE\u7B2C\u4E00\u5E27\u8D77\u5C31\u662F\u5BF9\u7684\uFF08\u4E2D\u82F1\u4E24\u4EFD\u90FD\u5728 HTML \u91CC\uFF0CCSS \u53EA\u663E\u793A\u4E00\u4EFD\uFF09\u3002\n */\n\ninterface LangState {\n  lang: Lang\n  /** \u7528\u6237\u662F\u5426\u624B\u52A8\u9009\u8FC7\u3002\u9009\u8FC7\u4E4B\u540E\u5C31\u4E0D\u518D\u8DDF\u968F\u6D4F\u89C8\u5668\u8BED\u8A00\u3002 */\n  picked: boolean\n  setLang: (l: Lang) => void\n  toggle: () => void\n}\n\n/** \u628A\u8BED\u8A00\u540C\u6B65\u5230 <html data-lang/lang>\uFF1ACSS \u9760 data-lang \u9009\u663E\u793A\u54EA\u4E00\u4EFD\u6587\u6848\uFF0C\n *  lang \u4F9B\u5C4F\u5E55\u9605\u8BFB\u5668\u4E0E\u641C\u7D22\u5F15\u64CE\u5224\u65AD\u8BED\u8A00\u3002\u9996\u5E27\u7531 layout \u7684\u9884\u7ED8\u5236\u811A\u672C\u8BBE\u7F6E\uFF0C\n *  \u8FD9\u91CC\u8D1F\u8D23\u7528\u6237\u5207\u6362\u540E\uFF08\u4EE5\u53CA persist \u6062\u590D\u540E\uFF09\u4FDD\u6301\u4E00\u81F4\u3002 */\nfunction applyLangToDocument(lang: Lang) {\n  if (typeof document === 'undefined') return\n  const root = document.documentElement\n  root.dataset.lang = lang\n  root.lang = lang === 'en' ? 'en' : 'zh-CN'\n}\n\nexport const useLang = create<LangState>()(\n  persist(\n    (set, get) => ({\n      lang: DEFAULT_LANG,\n      picked: false,\n      setLang: (l) => {\n        set({ lang: l, picked: true })\n        applyLangToDocument(l)\n      },\n      toggle: () => {\n        const next: Lang = get().lang === 'zh' ? 'en' : 'zh'\n        set({ lang: next, picked: true })\n        applyLangToDocument(next)\n      },\n    }),\n    {\n      name: LANG_STORAGE_KEY,\n      partialize: (s) => ({ lang: s.picked ? s.lang : undefined, picked: s.picked }),\n      // \u6CA1\u624B\u52A8\u9009\u8FC7\u65F6\u4E0D\u6062\u590D\uFF0C\u8BA9 DEFAULT_LANG \u751F\u6548\n      merge: (persisted, current) => {\n        const p = (persisted ?? {}) as Partial<LangState>\n        return p.picked ? { ...current, ...p } : current\n      },\n    }\n  )\n)\n\n// persist \u4ECE localStorage \u6062\u590D\u65F6\u4E0D\u7ECF\u8FC7 setLang\uFF0C\u7528\u8BA2\u9605\u515C\u4F4F\u8FD9\u79CD\u60C5\u51B5\u3002\nuseLang.subscribe((s, prev) => {\n  if (s.lang !== prev.lang) applyLangToDocument(s.lang)\n})\napplyLangToDocument(useLang.getState().lang)\n\n/** \u53D6\u5F53\u524D\u8BED\u8A00\u7684\u6587\u6848\u8868\u3002\u5728\u7EC4\u4EF6\u91CC\u7528 `const t = useT()`\u3002 */\nexport function useT(): Dict {\n  const lang = useLang((s) => s.lang)\n  return DICT[lang] as Dict\n}\n\n/** \u975E\u7EC4\u4EF6\u73AF\u5883\uFF08\u5982 api.ts \u629B\u9519\u6587\u6848\uFF09\u7528\u8FD9\u4E2A\u62FF\u5F53\u524D\u8BED\u8A00 */\nexport function tNow(): Dict {\n  return DICT[useLang.getState().lang] as Dict\n}\n" }, "src/lib/lang.ts": { "t": "utf8", "v": "/**\n * \u8BED\u8A00\u5E38\u91CF\uFF08\u4E0D\u4F9D\u8D56 React\uFF0C\u670D\u52A1\u7AEF/\u5BA2\u6237\u7AEF\u90FD\u80FD\u5B89\u5168 import\uFF09\u3002\n *\n * \u7AD9\u70B9\u9ED8\u8BA4\u8BED\u8A00\u5728**\u6784\u5EFA\u671F**\u51B3\u5B9A\uFF1A\u9759\u6001\u5BFC\u51FA\u7684 HTML \u53EA\u80FD\u662F\u67D0\u4E00\u79CD\u8BED\u8A00\u3002\n * \u53EF\u7528\u73AF\u5883\u53D8\u91CF NEXT_PUBLIC_DEFAULT_LANG=en \u6539\u3002\n */\nexport type Lang = 'zh' | 'en'\n\nexport const DEFAULT_LANG: Lang =\n  (process.env.NEXT_PUBLIC_DEFAULT_LANG || '').toLowerCase() === 'en' ? 'en' : 'zh'\n\nexport const LANG_STORAGE_KEY = 'obsidian-blog-lang'\n" }, "src/lib/obsidian.ts": { "t": "utf8", "v": "import matter from 'gray-matter'\n\n/** \u89E3\u6790\u7B14\u8BB0\uFF1A\u5265\u79BB frontmatter */\nexport interface ParsedNote {\n  data: Record<string, unknown>\n  content: string\n}\n\nexport function parseNote(raw: string): ParsedNote {\n  try {\n    const m = matter(raw)\n    return { data: (m.data ?? {}) as Record<string, unknown>, content: repairObsidianArtifacts(m.content ?? '') }\n  } catch {\n    return { data: {}, content: repairObsidianArtifacts(raw) }\n  }\n}\n\n// ---------- wikilink \u626B\u63CF ----------\n\nexport interface WikiToken {\n  /** \u8D77\u59CB\u4E0B\u6807\uFF08\u542B ! \u6216 [[\uFF09 */\n  start: number\n  /** \u7ED3\u675F\u4E0B\u6807\uFF08\u4E0D\u542B\uFF09 */\n  end: number\n  isEmbed: boolean\n  /** \u62EC\u53F7\u5185\u7684\u539F\u6587\uFF1A`\u76EE\u6807#\u6807\u9898|\u522B\u540D` */\n  inner: string\n}\n\n/**\n * \u626B\u63CF\u6587\u672C\u91CC\u7684 [[...]] / ![[...]]\uFF0C**\u5141\u8BB8\u5185\u90E8\u51FA\u73B0\u6210\u5BF9\u7684\u65B9\u62EC\u53F7**\u3002\n *\n * \u4E0D\u80FD\u518D\u7528 /\\[\\[([^\\[\\]]+?)\\]\\]/ \u8FD9\u79CD\u6B63\u5219\uFF1A\u672C\u5E93\u7684\u6807\u9898\u7ECF\u5E38\u672C\u8EAB\u662F markdown \u94FE\u63A5\uFF0C\n * \u4F8B\u5982 `[[CSP-S#[P8820 [CSP-S 2022] \u6570\u636E\u4F20\u8F93](https://\u2026)]]`\uFF0C\n * \u6B63\u5219\u4F1A\u5728\u7B2C\u4E00\u4E2A ] \u5904\u622A\u65AD\uFF0C\u6574\u6761\u5F15\u7528\u5931\u6548\uFF08\u771F\u5B9E\u8E29\u8FC7\uFF09\u3002\n */\nexport function scanWikilinks(text: string): WikiToken[] {\n  const out: WikiToken[] = []\n  let i = 0\n  while (i < text.length) {\n    const isEmbed = text[i] === '!' && text[i + 1] === '[' && text[i + 2] === '['\n    const plain = text[i] === '[' && text[i + 1] === '['\n    if (!isEmbed && !plain) {\n      i += 1\n      continue\n    }\n    const open = i + (isEmbed ? 3 : 2)\n    let j = open\n    let depth = 0\n    let end = -1\n    while (j < text.length) {\n      const ch = text[j]\n      if (ch === '\\n') break\n      if (ch === '\\\\') {\n        j += 2\n        continue\n      }\n      if (ch === '[') {\n        depth += 1\n        j += 1\n        continue\n      }\n      if (ch === ']') {\n        if (depth > 0) {\n          depth -= 1\n          j += 1\n          continue\n        }\n        if (text[j + 1] === ']') {\n          end = j + 2\n          break\n        }\n        j += 1\n        continue\n      }\n      j += 1\n    }\n    if (end < 0) {\n      i = open\n      continue\n    }\n    out.push({ start: i, end, isEmbed, inner: text.slice(open, end - 2) })\n    i = end\n  }\n  return out\n}\n\n/**\n * markdown \u94FE\u63A5 `[\u6587\u5B57](url)` \u2192 `\u6587\u5B57`\u3002\u652F\u6301\u4E00\u5C42\u5D4C\u5957\u65B9\u62EC\u53F7\n * \uFF08\u5982 `[P3216 [HNOI2011]\u6570\u5B66\u4F5C\u4E1A](url)`\uFF09\uFF0C\u7531\u5185\u5411\u5916\u53CD\u590D\u5265\u3002\n */\nconst MD_LINK_RE = /\\[([^\\[\\]]*(?:\\[[^\\[\\]]*\\][^\\[\\]]*)*)\\]\\([^()]*\\)/g\nexport function stripMdLinks(input: string): string {\n  let cur = input\n  let prev: string\n  let guard = 0\n  do {\n    prev = cur\n    cur = cur.replace(MD_LINK_RE, '$1')\n  } while (cur !== prev && ++guard < 8)\n  return cur\n}\n\n/**\n * \u4FEE\u590D Obsidian / \u7F16\u8F91\u5668\u4EA7\u751F\u7684\u4E00\u7C7B\u574F\u5F15\u7528\uFF1A\u628A markdown \u94FE\u63A5\u585E\u8FDB\u4E86 wikilink\u3002\n *\n * \u5F62\u5982 `![[\u663E\u793A\u6587\u5B57](\u7F51\u5740)](\u7B14\u8BB0.md#\u6807\u9898)`\uFF08\u6CA1\u6709\u95ED\u5408\u7684 `]]`\uFF09\uFF0C\u672C\u5E93\u91CC\u771F\u5B9E\u5B58\u5728\n * \uFF08DP/DDP.md \u6700\u540E\u4E00\u884C\uFF09\u3002\u7EDF\u4E00\u6539\u5199\u6210 `![[\u7B14\u8BB0.md#\u6807\u9898|\u663E\u793A\u6587\u5B57]]`\u3002\n * \u53EA\u5904\u7406\u300C\u6574\u884C\u5C31\u662F\u8FD9\u4E00\u6761\u300D\u4E14\u6CA1\u6709 `]]` \u7684\u884C\uFF0C\u907F\u514D\u8BEF\u4F24\u6B63\u5E38\u5185\u5BB9\u3002\n *\n * \u53E6\u5916\uFF0C**\u4EFB\u4F55** wikilink \u5185\u90E8\u53EA\u8981\u542B markdown \u94FE\u63A5\u8BED\u6CD5\u90FD\u8981\u5265\u6210\u7EAF\u6587\u5B57\uFF1A\n * mdast \u89E3\u6790\u9636\u6BB5 `[\u6587\u5B57](url)` \u4F1A\u5148\u53D8\u6210 link \u8282\u70B9\uFF0C\u628A `[[` \u4E0E `]]` \u62C6\u5230\u4E0D\u540C\n * \u8282\u70B9\u91CC\uFF0C\u540E\u9762\u7684 wikilink \u626B\u63CF\u5C31\u518D\u4E5F\u62FC\u4E0D\u56DE\u6765\u4E86\uFF08Obsidian \u590D\u5236\u300C\u6807\u9898\u672C\u8EAB\u662F\n * \u94FE\u63A5\u300D\u7684\u5F15\u7528\u6B63\u597D\u662F\u8FD9\u79CD\u5F62\u6001\uFF09\u3002extractHeadingSection \u5339\u914D\u6807\u9898\u65F6\u540C\u6837\u4F1A\u5265\u6389\n * \u94FE\u63A5\u8BED\u6CD5\uFF0C\u6240\u4EE5\u8FD9\u91CC\u5265\u5B8C\u4E24\u8FB9\u4ECD\u7136\u5BF9\u5F97\u4E0A\u3002\n */\nexport function repairObsidianArtifacts(content: string): string {\n  if (!content.includes('[[')) return content\n  const ARTIFACT = /^(\\s*)(!?)\\[\\[(.+?)\\]\\(([^)]*)\\)\\]\\((.+)\\)\\s*$/\n  let inFence = false\n  const lines = content.split('\\n').map((line) => {\n    // \u4EE3\u7801\u5757\u91CC\u7684 [[ ]] \u662F\u793A\u4F8B\u4EE3\u7801\uFF0C\u4E0D\u662F\u5F15\u7528\n    if (/^\\s*(```|~~~)/.test(line)) {\n      inFence = !inFence\n      return line\n    }\n    if (inFence || !line.includes('[[')) return line\n    let l = line\n    if (!l.includes(']]')) {\n      const m = ARTIFACT.exec(l)\n      if (m) {\n        const [, indent, bang, label, , target] = m\n        l = `${indent}${bang}[[${target.trim()}|${label.trim()}]]`\n      }\n    }\n    const toks = scanWikilinks(l)\n    if (toks.length === 0) return l\n    let res = ''\n    let last = 0\n    for (const tk of toks) {\n      res += l.slice(last, tk.start)\n      res += (tk.isEmbed ? '!' : '') + '[[' + stripMdLinks(tk.inner) + ']]'\n      last = tk.end\n    }\n    return res + l.slice(last)\n  })\n  return lines.join('\\n')\n}\n\n/** \u8DEF\u5F84\u5F52\u4E00\u5316\uFF1A\u7EDF\u4E00\u659C\u6760\u3001\u53BB ./ \u524D\u7F00 */\nexport function normalizePath(p: string): string {\n  return p.replace(/\\\\/g, '/').replace(/^\\.\\//, '').replace(/^\\/+/, '')\n}\n\n/** vault \u76F8\u5BF9\u8DEF\u5F84 \u2192 URL slug\uFF08\u53BB .md\uFF0C\u4FDD\u7559\u5C42\u7EA7\uFF09 */\nexport function toSlug(path: string): string {\n  return normalizePath(path).replace(/\\.(md|markdown)$/i, '')\n}\n\n/** \u6587\u4EF6\u540D\uFF08\u4E0D\u542B\u6269\u5C55\u540D\uFF09\u2014\u2014wikilink \u7684 basename \u5339\u914D\u4F9D\u636E */\nexport function basenameOf(path: string): string {\n  const n = normalizePath(path)\n  const base = n.split('/').pop() || n\n  return base.replace(/\\.(md|markdown)$/i, '')\n}\n\nexport function folderOf(path: string): string {\n  const n = normalizePath(path)\n  const i = n.lastIndexOf('/')\n  return i <= 0 ? '' : n.slice(0, i)\n}\n\nexport function titleOf(path: string, data: Record<string, unknown>): string {\n  const t = data.title\n  if (typeof t === 'string' && t.trim()) return t.trim()\n  return basenameOf(path)\n}\n\n/** \u89E3\u6790\u53EF\u89C1\u6027\uFF1Afrontmatter \u58F0\u660E\u4F18\u5148\uFF0C\u5176\u6B21\u4FDD\u7559\u5E93\u4E2D\u5DF2\u6709\u503C\uFF0C\u65B0\u7B14\u8BB0\u9ED8\u8BA4\u79C1\u5BC6 */\nexport function resolveVisibility(\n  data: Record<string, unknown>,\n  existing: boolean | null\n): { isPublic: boolean; via: 'frontmatter' | 'draft' | 'kept' | 'default' } {\n  if (data.draft === true) return { isPublic: false, via: 'draft' }\n  const v = data.public ?? data.publish\n  if (typeof v === 'boolean') return { isPublic: v, via: 'frontmatter' }\n  if (v === 'public' || v === 'true') return { isPublic: true, via: 'frontmatter' }\n  if (v === 'private' || v === 'false') return { isPublic: false, via: 'frontmatter' }\n  if (existing !== null) return { isPublic: existing, via: 'kept' }\n  return { isPublic: false, via: 'default' }\n}\n\n/** \u6807\u7B7E\uFF1Afrontmatter.tags/tag + \u6B63\u6587\u884C\u5185 #\u6807\u7B7E */\nexport function extractTags(data: Record<string, unknown>, content: string): string[] {\n  const out = new Set<string>()\n  const add = (v: unknown) => {\n    if (typeof v === 'string') {\n      v.split(/[,\uFF0C]/).forEach((s) => {\n        const t = s.trim()\n        if (t) out.add(t)\n      })\n    } else if (Array.isArray(v)) {\n      v.forEach((x) => {\n        if (typeof x === 'string' && x.trim()) out.add(x.trim())\n      })\n    }\n  }\n  add(data.tags)\n  add(data.tag)\n  // \u884C\u5185\u6807\u7B7E\u63D0\u53D6\u524D\u5148\u79FB\u9664\uFF1A\n  // - wikilink/\u951A\u70B9\uFF08\u907F\u514D [[#\u6807\u9898]] \u88AB\u8BEF\u5224\uFF09\n  // - \u4EE3\u7801\u5757\u4E0E\u884C\u5185\u4EE3\u7801\uFF08\u907F\u514D #include\u3001#define \u7B49\u88AB\u8BEF\u5224\u4E3A\u6807\u7B7E\uFF09\n  // - HTML \u6807\u7B7E\u53CA\u5176\u5C5E\u6027\uFF08\u907F\u514D <font color=\"#ff0000\"> \u7684\u989C\u8272\u4EE3\u7801\u88AB\u8BEF\u5224\u4E3A\u6807\u7B7E\uFF09\n  const plain = content\n    .replace(/```[\\s\\S]*?```/g, ' ')\n    .replace(/~~~[\\s\\S]*?~~~/g, ' ')\n    .replace(/`[^`\\n]*`/g, ' ')\n    .replace(/<[^>\\n]+>/g, ' ')\n    .replace(/\\[\\[[^\\]\\n]*\\]\\]/g, ' ')\n  for (const m of plain.matchAll(/(^|[^\\w#])#([\\p{L}\\p{N}][\\p{L}\\p{N}_/-]*)/gu)) {\n    const t = m[2]\n    if (t && !/^\\d+$/.test(t) && !/^[0-9a-fA-F]{3,8}$/.test(t)) out.add(t)\n  }\n  return [...out].slice(0, 30)\n}\n\n/** \u6807\u9898\u6587\u672C\u6E05\u7406\uFF1A\u5265\u6389 wikilink / markdown \u94FE\u63A5\u8BED\u6CD5\uFF0C\u53EA\u7559\u53EF\u89C1\u6587\u5B57\uFF08\u5927\u7EB2\u5C55\u793A\u4E0E\u951A\u70B9\u5171\u7528\uFF09 */\nexport function stripHeadingMarkup(input: string): string {\n  let s = input\n  // wikilink\uFF1A[[\u76EE\u6807|\u522B\u540D]] \u2192 \u522B\u540D\uFF0C[[\u76EE\u6807]] \u2192 \u76EE\u6807\n  s = s.replace(/\\[\\[([^\\]|]*)\\|([^\\]]*)\\]\\]/g, '$2')\n  s = s.replace(/\\[\\[([^\\]]+)\\]\\]/g, '$1')\n  // markdown \u94FE\u63A5 [\u6587\u5B57](url)\uFF1A\u652F\u6301\u4E00\u5C42\u5D4C\u5957\u65B9\u62EC\u53F7\uFF08\u5982 [P3216 [HNOI2011]\u6570\u5B66\u4F5C\u4E1A](url)\uFF09\uFF0C\n  // \u591A\u5C42\u5D4C\u5957\u65F6\u7531\u5185\u5411\u5916\u53CD\u590D\u5265\uFF0C\u7ED3\u679C\u4E0E\u6D4F\u89C8\u5668\u6E32\u67D3\u51FA\u7684\u53EF\u89C1\u6587\u672C\u4E00\u81F4\uFF08\u4FDD\u8BC1\u951A\u70B9 id \u5BF9\u5F97\u4E0A\uFF09\n  s = stripMdLinks(s)\n  // \u884C\u5C3E\u60AC\u6302\u7684\u5757\u5F15\u7528 ID\uFF08^xxxxxx\uFF09\u4E5F\u4E0D\u8FDB\u5927\u7EB2\n  s = s.replace(/\\s+\\^[A-Za-z0-9-]{4,}\\s*$/, '')\n  return s.trim()\n}\n\n/**\n * \u5265\u6389\u6807\u9898\u91CC\u7684**\u884C\u5185\u6392\u7248\u6807\u8BB0**\uFF08\u52A0\u7C97/\u659C\u4F53/\u5220\u9664\u7EBF/\u9AD8\u4EAE/\u884C\u5185\u4EE3\u7801\uFF09\uFF0C\u53EA\u7559\u53EF\u89C1\u6587\u5B57\u3002\n *\n * \u7528\u9014\u53EA\u6709\u4E00\u5904\uFF1A\u7B97\u951A\u70B9 id\u3002\u6B63\u6587\u4E00\u4FA7\u7684 id \u6765\u81EA mdast \u7684\u6587\u672C\u8282\u70B9\uFF08`**\u7C97**` \u65E9\u5DF2\n * \u89E3\u6790\u6210 strong \u8282\u70B9\uFF0C\u6587\u672C\u5C31\u662F\u300C\u7C97\u300D\uFF09\uFF0C\u6240\u4EE5\u5927\u7EB2\u4E00\u4FA7\u4E5F\u5FC5\u987B\u5148\u628A\u6807\u8BB0\u5265\u5E72\u51C0\uFF0C\n * \u5426\u5219 `_\u659C\u4F53_` \u8FD9\u7C7B\u6807\u9898\u4F1A\u7B97\u51FA `_\u659C\u4F53_` \u800C\u6B63\u6587\u7B97\u51FA `\u659C\u4F53`\uFF0C\u951A\u70B9\u76F4\u63A5\u5BF9\u4E0D\u4E0A\u3002\n * \u6CE8\u610F\u4E0D\u80FD\u65E0\u8111\u5220 `_`\uFF1A`snake_case` \u8FD9\u79CD\u6807\u9898\u6B63\u6587\u4E00\u4FA7\u662F\u4FDD\u7559 `_` \u7684\u3002\n */\nexport function stripInlineFormatting(input: string): string {\n  let s = String(input ?? '')\n  let prev = ''\n  // \u5D4C\u5957\uFF08**\u7C97*\u659C***\uFF09\u9700\u8981\u53CD\u590D\u5265\uFF0C\u76F4\u5230\u4E0D\u518D\u53D8\u5316\n  while (prev !== s) {\n    prev = s\n    s = s\n      .replace(/\\*\\*([\\s\\S]+?)\\*\\*/g, '$1')\n      .replace(/__([\\s\\S]+?)__/g, '$1')\n      .replace(/~~([\\s\\S]+?)~~/g, '$1')\n      .replace(/==([\\s\\S]+?)==/g, '$1')\n      .replace(/`([^`\\n]+)`/g, '$1')\n      .replace(/\\*([^*\\n]+?)\\*/g, '$1')\n      // `_\u659C\u4F53_` \u53EA\u5728\u8BCD\u8FB9\u754C\u4E0A\u5265\uFF0C\u907F\u514D\u628A snake_case \u53D8\u6210 snakecase\n      .replace(/(^|[^\\w])_([^_\\n]+?)_(?=[^\\w]|$)/g, '$1$2')\n  }\n  return s.trim()\n}\n\n/**\n * \u6807\u9898\u5339\u914D\u7528\u7684\u5F52\u4E00\u5316\u6587\u672C\uFF1AURL \u89E3\u7801 \u2192 \u5265\u6389 markdown \u8BED\u6CD5 \u2192 \u538B\u7A7A\u767D \u2192 \u5C0F\u5199\u3002\n *\n * Obsidian \u5199\u51FA\u7684 `[[\u7B14\u8BB0#\u6807\u9898]]` \u91CC\uFF0C\u6807\u9898\u53EF\u80FD\u662F\u539F\u6587\uFF0C\u4E5F\u53EF\u80FD\u662F\u767E\u5206\u53F7\u7F16\u7801\u8FC7\u7684\uFF0C\n * \u800C\u4E14\u6807\u9898\u672C\u8EAB\u8FD8\u53EF\u80FD\u662F\u4E2A markdown \u94FE\u63A5\u3002\u4E09\u8005\u5FC5\u987B\u80FD\u5BF9\u4E0A\u540C\u4E00\u4E2A\u6807\u9898\u3002\n */\nexport function headingIdOf(text: string): string {\n  const id = String(text ?? '')\n    .replace(/#/g, '')\n    .trim()\n    .toLowerCase()\n    .replace(/\\s+/g, '-')\n    .replace(/[^\\p{L}\\p{N}\\-_]/gu, '')\n    .slice(0, 60)\n  return id || 'h'\n}\n\nexport function normalizeHeadingText(input: string): string {\n  let s = String(input ?? '')\n  try {\n    s = decodeURIComponent(s)\n  } catch {\n    /* \u542B\u975E\u6CD5 % \u5E8F\u5217\u65F6\u4FDD\u7559\u539F\u6837 */\n  }\n  s = stripHeadingMarkup(s)\n  s = s\n    .replace(/[`*_~]/g, ' ')\n    .replace(/[#^]+/g, ' ')\n    .replace(/\\s+/g, ' ')\n    .trim()\n    .toLowerCase()\n  return s\n}\n\n/** \u7531\u4EFB\u610F\u6807\u9898\u539F\u6587\u7B97\u51FA\u951A\u70B9 id\uFF08\u4E0E extractHeadings / remark \u9636\u6BB5\u5171\u7528\u540C\u4E00\u7B97\u6CD5\uFF09 */\nexport function headingIdFromText(text: string): string {\n  return headingIdOf(stripInlineFormatting(stripHeadingMarkup(text)))\n}\n\n/** \u6807\u9898\u7684**\u5C55\u793A**\u6587\u5B57\uFF1AURL \u89E3\u7801 + \u5265\u6389 markdown/wikilink \u8BED\u6CD5\uFF08\u4FDD\u7559\u539F\u5927\u5C0F\u5199\uFF09 */\nexport function headingDisplayText(input: string): string {\n  let s = String(input ?? '')\n  try {\n    s = decodeURIComponent(s)\n  } catch {\n    /* \u542B\u975E\u6CD5 % \u5E8F\u5217\u65F6\u4FDD\u7559\u539F\u6837 */\n  }\n  return stripHeadingMarkup(s).trim()\n}\n\n/**\n * \u63D0\u53D6\u67D0\u4E00\u5C0F\u8282\u7684\u6B63\u6587\uFF08Obsidian \u7684 `![[\u7B14\u8BB0#\u6807\u9898]]` / \u60AC\u6D6E\u9884\u89C8\u90FD\u7528\u5B83\uFF09\u3002\n * \u533A\u95F4 = \u8BE5\u6807\u9898\u7684\u4E0B\u4E00\u884C \u2192 \u4E0B\u4E00\u4E2A\u300C\u540C\u7EA7\u6216\u66F4\u9AD8\u7EA7\u300D\u6807\u9898\u4E4B\u524D\uFF0C\n * \u56E0\u6B64\u4E0D\u4F1A\u628A\u540E\u9762\u6CA1\u6709\u5F15\u7528\u7684\u5185\u5BB9\u4E00\u8D77\u5E26\u51FA\u6765\u3002\n */\nexport function extractHeadingSection(content: string, heading: string): string | null {\n  const want = normalizeHeadingText((heading || '').split('#').pop() || heading)\n  if (!want) return null\n  const lines = content.split('\\n')\n  const heads: { idx: number; level: number; text: string }[] = []\n  let inFence = false\n  for (let i = 0; i < lines.length; i++) {\n    const l = lines[i]\n    if (/^\\s{0,3}(```|~~~)/.test(l)) {\n      inFence = !inFence\n      continue\n    }\n    if (inFence) continue\n    const m = /^ {0,3}(#{1,6})\\s+(.+?)\\s*#*\\s*$/.exec(l)\n    if (m) heads.push({ idx: i, level: m[1].length, text: normalizeHeadingText(m[2]) })\n  }\n  const k = heads.findIndex((h) => h.text === want)\n  if (k < 0) return null\n  let end = lines.length\n  for (let j = k + 1; j < heads.length; j++) {\n    if (heads[j].level <= heads[k].level) {\n      end = heads[j].idx\n      break\n    }\n  }\n  return lines.slice(heads[k].idx + 1, end).join('\\n').trim()\n}\n\nexport interface HeadingEntry {\n  level: number\n  text: string\n  id: string\n}\n\n/** \u63D0\u53D6\u6B63\u6587\u6807\u9898\uFF08\u8DF3\u8FC7\u4EE3\u7801\u5757\uFF09\uFF0C\u4F9B\u5927\u7EB2\u4FA7\u8FB9\u680F\u4F7F\u7528 */\nexport function extractHeadings(content: string): HeadingEntry[] {\n  const out: HeadingEntry[] = []\n  const stripped = content.replace(/```[\\s\\S]*?```/g, ' ').replace(/~~~[\\s\\S]*?~~~/g, ' ')\n  // \u91CD\u590D\u6807\u9898\u5FC5\u987B\u53BB\u91CD\uFF1A\u4E24\u5904\u300C## \u603B\u7ED3\u300D\u82E5\u5171\u7528 id\uFF0CTOC \u7B2C\u4E8C\u9879\u3001?h= \u6DF1\u94FE\u3001\n  // scroll-spy \u4F1A\u5168\u90E8\u6307\u5411\u7B2C\u4E00\u4E2A\u6807\u9898\u3002\u89C4\u5219\u4E0E GitHub/Obsidian \u4E00\u81F4\uFF1A-1\u3001-2\u2026\n  const seen = new Map<string, number>()\n  for (const m of stripped.matchAll(/^ {0,3}(#{1,6})\\s+(.+?)\\s*#*\\s*$/gm)) {\n    // text \u4FDD\u7559\u884C\u5185\u6392\u7248\u6807\u8BB0\uFF08\u52A0\u7C97\u7B49\uFF09\uFF0C\u5927\u7EB2\u91CC\u6309\u683C\u5F0F\u6E32\u67D3\u800C\u4E0D\u662F\u663E\u793A `**`\uFF1B\n    // id \u5FC5\u987B\u7528\u5265\u5E72\u51C0\u7684\u7EAF\u6587\u5B57\uFF0C\u624D\u80FD\u548C\u6B63\u6587\u4E00\u4FA7\uFF08mdast \u6587\u672C\u8282\u70B9\uFF09\u7B97\u51FA\u7684 id \u4E00\u81F4\u3002\n    const text = stripHeadingMarkup(m[2])\n    if (!text) continue\n    const base = headingIdOf(stripInlineFormatting(text))\n    const n = seen.get(base) ?? 0\n    seen.set(base, n + 1)\n    out.push({ level: m[1].length, text, id: n === 0 ? base : `${base}-${n}` })\n  }\n  return out\n}\n\nexport interface HeadingSegment {\n  type: 'text' | 'math'\n  /** text\uFF1A\u53EF\u89C1\u6587\u5B57\uFF1Bmath\uFF1ATeX \u6E90\u7801\uFF08\u4EA4\u7ED9 KaTeX \u6E32\u67D3\uFF09 */\n  value: string\n}\n\n/**\n * \u628A\u6807\u9898\u6587\u672C\u5207\u6210\u300C\u666E\u901A\u6587\u5B57 / \u516C\u5F0F\u300D\u7247\u6BB5\uFF0C\u4F9B\u5927\u7EB2\u91CC\u7528 KaTeX \u6E32\u67D3\u516C\u5F0F\u3002\n * \u8BC6\u522B $$..$$ \u4E0E $..$\uFF0C\u8DF3\u8FC7 \\$ \u8F6C\u4E49\uFF1B\u5176\u4F59\u90E8\u5206\u4E00\u5F8B\u5F53\u6587\u5B57\uFF08\u987A\u5E26\u5265\u5220\u9664\u7EBF\uFF09\u3002\n */\nexport function splitHeadingSegments(input: string): HeadingSegment[] {\n  const out: HeadingSegment[] = []\n  let i = 0\n  let buf = ''\n  const flush = () => {\n    if (buf) {\n      // \u884C\u5185\u6392\u7248\u6807\u8BB0\u539F\u6837\u4FDD\u7559\uFF0C\u4EA4\u7ED9\u5927\u7EB2\u7684 renderInlineMarkup \u6E32\u67D3\uFF08\u4E0D\u518D\u9884\u5148\u5265\u6389\uFF09\n      out.push({ type: 'text', value: buf })\n      buf = ''\n    }\n  }\n  while (i < input.length) {\n    const ch = input[i]\n    if (ch === '\\\\') {\n      buf += input.slice(i, i + 2)\n      i += 2\n      continue\n    }\n    if (ch !== '$') {\n      buf += ch\n      i += 1\n      continue\n    }\n    const display = input.startsWith('$$', i)\n    const closer = display ? '$$' : '$'\n    const end = input.indexOf(closer, i + closer.length)\n    if (end < 0) {\n      buf += ch\n      i += 1\n      continue\n    }\n    const tex = input.slice(i + closer.length, end)\n    // \u7A7A\u516C\u5F0F\uFF08$$ \u6216 $ $\uFF09\u4E0D\u5F53\u516C\u5F0F\uFF0C\u907F\u514D\u628A\u7EAF\u6587\u672C\u91CC\u7684\u7F8E\u5143\u7B26\u53F7\u541E\u6389\n    if (!tex.trim()) {\n      buf += ch\n      i += 1\n      continue\n    }\n    flush()\n    out.push({ type: 'math', value: tex.trim() })\n    i = end + closer.length\n  }\n  flush()\n  return out\n}\n\n/** \u5B57\u6570\uFF1A\u6C49\u5B57\u9010\u5B57 + \u82F1\u6587\u6570\u5B57\u6309\u8BCD */\nexport function wordCountOf(content: string): number {\n  const text = content\n    .replace(/```[\\s\\S]*?```/g, ' ')\n    .replace(/`[^`\\n]*`/g, ' ')\n    .replace(/!\\[[^\\]]*\\]\\([^)]*\\)/g, ' ')\n    .replace(/\\[\\[[^\\]]*\\]\\]/g, ' ')\n  const cjk = (text.match(/\\p{Script=Han}/gu) || []).length\n  const words = (text.match(/[A-Za-z0-9]+/g) || []).length\n  return cjk + words\n}\n\nexport function parseNoteDate(data: Record<string, unknown>): Date | null {\n  const raw = data.date ?? data.day ?? data.created\n  if (raw === undefined || raw === null) return null\n  const d = new Date(raw as string | number | Date)\n  if (!isNaN(+d)) return d\n  return null\n}\n\n/** \u63D0\u53D6\u7EAF\u6587\u672C\u6458\u8981\uFF08\u4F9B\u5217\u8868\u4E0E\u5D4C\u5165\u5361\u7247\uFF09 */\nexport function excerptOf(content: string, len = 120): string {\n  const text = content\n    .replace(/^---[\\s\\S]*?---\\n?/, '')\n    .replace(/```[\\s\\S]*?```/g, ' ')\n    .replace(/`[^`\\n]*`/g, ' ')\n    .replace(/!\\[\\[[^\\]]*\\]\\]/g, ' ')\n    .replace(/\\[\\[([^\\]|]+)\\|([^\\]]+)\\]\\]/g, '$2')\n    .replace(/\\[\\[([^\\]]+)\\]\\]/g, '$1')\n    .replace(/!\\[[^\\]]*\\]\\([^)]*\\)/g, ' ')\n    .replace(/\\[([^\\]]*)\\]\\([^)]*\\)/g, '$1')\n    .replace(/^#{1,6}\\s+/gm, '')\n    .replace(/^>\\s?\\[![^\\]]*\\]\\s?/gm, '')\n    .replace(/^>\\s?/gm, '')\n    .replace(/\\|/g, ' ')\n    .replace(/[*_~$]+/g, '')\n    .replace(/\\s+/g, ' ')\n    .trim()\n  return text.length > len ? text.slice(0, len) + '\u2026' : text\n}\n\n// ---------- wikilink \u89E3\u6790 ----------\n\nexport interface LinkParts {\n  target: string\n  heading: string\n  alias: string | null\n}\n\n/** `[[path#heading|alias]]` \u2192 { target, heading, alias } */\nexport function parseWikilink(link: string): LinkParts {\n  let s = link.trim()\n  let alias: string | null = null\n  const bi = s.indexOf('|')\n  if (bi >= 0) {\n    alias = s.slice(bi + 1).trim() || null\n    s = s.slice(0, bi)\n  }\n  let heading = ''\n  const hi = s.indexOf('#')\n  if (hi >= 0) {\n    heading = s.slice(hi)\n    s = s.slice(0, hi)\n  }\n  // \u5757\u5F15\u7528 [[\u7B14\u8BB0#^blockid]]\uFF1A\u4FDD\u7559\u5757 ID\uFF08\u60AC\u6D6E\u9884\u89C8\u7528\uFF09\uFF0C\u8DF3\u8F6C\u65F6\u6309\u6574\u7BC7\u7B14\u8BB0\u5904\u7406\n  s = normalizePath(s.replace(/\\.(md|markdown)$/i, ''))\n  return { target: s, heading, alias }\n}\n\nexport interface WikiRefs {\n  all: string[]\n  embeds: string[]\n  links: string[]\n}\n\nexport function extractWikiRefs(raw: string): WikiRefs {\n  const all: string[] = []\n  const embeds: string[] = []\n  const links: string[] = []\n  for (const m of raw.matchAll(/(!?)\\[\\[([^\\][\\n]+?)\\]\\]/g)) {\n    all.push(m[2])\n    ;(m[1] === '!' ? embeds : links).push(m[2])\n  }\n  return { all, embeds, links }\n}\n\n/** markdown \u6807\u51C6\u56FE\u7247\u8BED\u6CD5\u4E2D\u7684 vault \u76F8\u5BF9\u8DEF\u5F84\uFF08\u6392\u9664\u5916\u94FE/data URI\uFF09 */\nexport function extractMdImagePaths(raw: string): string[] {\n  const out: string[] = []\n  for (const m of raw.matchAll(/!\\[[^\\]]*\\]\\(([^)\\s]+)(?:\\s+\"[^\"]*\")?\\)/g)) {\n    let p = m[1] || ''\n    try {\n      p = decodeURIComponent(p)\n    } catch {\n      /* \u4FDD\u7559\u539F\u503C */\n    }\n    if (p && !/^(https?:|data:|mailto:)/i.test(p)) out.push(normalizePath(p))\n  }\n  return out\n}\n\n// ---------- \u9644\u4EF6\u7C7B\u578B ----------\n\nexport const ASSET_EXTS: Record<string, string> = {\n  '.png': 'image/png',\n  '.jpg': 'image/jpeg',\n  '.jpeg': 'image/jpeg',\n  '.gif': 'image/gif',\n  '.svg': 'image/svg+xml',\n  '.webp': 'image/webp',\n  '.bmp': 'image/bmp',\n  '.ico': 'image/x-icon',\n  '.avif': 'image/avif',\n  '.pdf': 'application/pdf',\n  '.mp3': 'audio/mpeg',\n  '.wav': 'audio/wav',\n  '.ogg': 'audio/ogg',\n  '.m4a': 'audio/mp4',\n  '.mp4': 'video/mp4',\n  '.webm': 'video/webm',\n}\n\nexport function isMarkdownPath(p: string): boolean {\n  return /\\.(md|markdown)$/i.test(p)\n}\n\nexport function assetExt(path: string): string {\n  const i = path.lastIndexOf('.')\n  return i >= 0 ? path.slice(i).toLowerCase() : ''\n}\n\nexport function mimeTypeFor(path: string): string | null {\n  return ASSET_EXTS[assetExt(path)] ?? null\n}\n\n/**\n * \u89E3\u6790\u5D4C\u5165\u76EE\u6807\uFF08![[x]] \u6216 ![](x)\uFF09\u5230 vault \u5185\u9644\u4EF6\u8DEF\u5F84\u3002\n * \u5339\u914D\u987A\u5E8F\uFF1A\u7CBE\u786E\u8DEF\u5F84 \u2192 \u8865\u5168\u6269\u5C55\u540D \u2192 \u7CBE\u786E\u6587\u4EF6\u540D \u2192 \u4EFB\u610F\u76EE\u5F55\u4E0B\u540C\u540D\u6587\u4EF6\uFF08\u5927\u5C0F\u5199\u4E0D\u654F\u611F\uFF09\u3002\n * \u6700\u540E\u4E00\u6B65\u8986\u76D6 Obsidian \u5E38\u89C1\u573A\u666F\uFF1A\u7B14\u8BB0\u91CC\u5199 ![[\u56FE\u7247.png]]\uFF0C\u5B9E\u9645\u6587\u4EF6\u5728 attachments/ \u5B50\u76EE\u5F55\u3002\n */\nexport function resolveEmbedPath(target: string, assetPaths: Set<string>): string | null {\n  const t = normalizePath(target)\n  if (!t) return null\n  const exts = Object.keys(ASSET_EXTS)\n  const candidates = [t]\n  if (!exts.includes(assetExt(t))) {\n    for (const e of exts) candidates.push(t + e)\n  }\n  const base = t.split('/').pop() || t\n  if (base !== t) {\n    candidates.push(base)\n    if (!exts.includes(assetExt(base))) {\n      for (const e of exts) candidates.push(base + e)\n    }\n  }\n  for (const c of candidates) {\n    if (assetPaths.has(c)) return c\n  }\n  // \u515C\u5E95\uFF1A\u6587\u4EF6\u540D\u540E\u7F00\u5339\u914D\uFF08vault \u5185\u4EFB\u610F\u5C42\u7EA7\u76EE\u5F55\uFF0C\u5927\u5C0F\u5199\u4E0D\u654F\u611F\uFF09\n  const lowered = candidates.map((c) => c.toLowerCase())\n  for (const p of assetPaths) {\n    const pl = p.toLowerCase()\n    for (const c of lowered) {\n      if (pl === c || pl.endsWith('/' + c)) return p\n    }\n  }\n  return null\n}\n\n/**\n * \u4ECE\u6B63\u6587\u91CC\u63D0\u53D6 ^blockid \u6240\u5728\u7684\u6587\u672C\u5757\uFF08Obsidian \u5757\u5F15\u7528\uFF0C\u5D4C\u5165/\u9884\u89C8\u5171\u7528\uFF09\u3002\n * \u533A\u95F4 = \u8BE5\u5757\u81EA\u8EAB\uFF0C\u4E0D\u5411\u5916\u6269\u6563\uFF1A\u5411\u4E0A\u9047\u5230\u7A7A\u884C\u6216\u6807\u9898\u5C31\u505C\uFF0C\u5411\u4E0B\u53EA\u5230\u5E26 ^id \u7684\u90A3\u4E00\u884C\u3002\n */\nexport function extractBlockText(content: string, blockId: string): string | null {\n  const esc = blockId.replace(/[.*+?^${}()|[\\]\\\\]/g, '\\\\$&')\n  const re = new RegExp('\\\\^' + esc + '\\\\s*$')\n  const lines = content.split('\\n')\n  const idx = lines.findIndex((l) => re.test(l.trimEnd()))\n  if (idx < 0) return null\n\n  const isHeading = (l: string) => /^ {0,3}#{1,6}\\s/.test(l)\n  const stripId = (s: string) => s.replace(new RegExp('\\\\s*\\\\^' + esc + '\\\\s*$'), '').trim()\n\n  // \u5411\u4E0A\u627E\u5757\u9996\uFF1A\u9047\u5230\u7A7A\u884C\u6216\u6807\u9898\u5C31\u505C\uFF08\u539F\u6765\u7684\u5B9E\u73B0\u5224\u65AD\u7684\u662F lines[start] \u800C\u4E0D\u662F\n  // lines[start-1]\uFF0C\u4F1A\u628A\u7D27\u90BB\u7684\u6807\u9898\u884C\u4E00\u8D77\u541E\u8FDB\u5F15\u7528\u533A\u95F4\uFF09\n  let start = idx\n  while (start > 0 && lines[start - 1].trim() !== '' && !isHeading(lines[start - 1])) start--\n\n  const block = lines.slice(start, idx + 1).join('\\n')\n  const cleaned = stripId(block)\n  if (cleaned) return cleaned\n\n  // \u5B64\u7ACB\u7684 ^id \u884C\uFF08\u524D\u540E\u7686\u7A7A\u884C\u3001\u65E0\u5185\u5BB9\uFF09\uFF1A\u56DE\u9000\u5230\u4E0A\u4E00\u4E2A\u975E\u7A7A\u5757\n  let end = idx - 1\n  while (end >= 0 && lines[end].trim() === '') end--\n  if (end < 0) return null\n  let s2 = end\n  while (s2 > 0 && lines[s2 - 1].trim() !== '' && !isHeading(lines[s2 - 1])) s2--\n  return lines.slice(s2, end + 1).join('\\n').trim() || null\n}\n\n/** \u53D6\u5D4C\u5165/\u9884\u89C8\u8981\u663E\u793A\u7684\u90A3\u4E00\u6BB5\u6B63\u6587\uFF1A\u5757\u5F15\u7528 \u2192 \u5C0F\u8282 \u2192 \u6574\u7BC7 */\nexport function extractRegion(content: string, heading?: string): string {\n  if (!heading) return content\n  const h = heading.trim()\n  if (h.startsWith('^')) return extractBlockText(content, h.slice(1)) ?? content\n  return extractHeadingSection(content, h) ?? content\n}\n\n/** \u94FE\u63A5\u76EE\u6807\u6807\u51C6\u5316\u4E3A slug\uFF08\u7528\u4E8E\u5F15\u7528\u7D22\u5F15\uFF1B\u672A\u521B\u5EFA\u76EE\u6807\u4E5F\u5F52\u4E00\u5316\u5B58\u50A8\uFF09 */\nexport function refSlugOf(link: string): string {\n  const { target } = parseWikilink(link)\n  return target || '#unresolved'\n}\n\nexport const SKIP_DIRS = ['.obsidian', '.trash', '.smart-env', '.git']\n\nexport function shouldSkipPath(path: string): string | null {\n  const n = normalizePath(path)\n  for (const d of SKIP_DIRS) {\n    if (n === d || n.startsWith(d + '/')) return `\u8DF3\u8FC7 ${d} \u914D\u7F6E\u76EE\u5F55`\n  }\n  if (/\\.(canvas|excalidraw\\.md)$/i.test(n)) return 'Canvas/\u753B\u677F\u6587\u4EF6\u6682\u4E0D\u652F\u6301\u6E32\u67D3'\n  if (/(^|\\/)\\.DS_Store$/i.test(n)) return '\u7CFB\u7EDF\u6587\u4EF6'\n  return null\n}\n" }, "src/lib/rehype-safety.ts": { "t": "utf8", "v": "import { SKIP, visit } from 'unist-util-visit'\nimport type { Element, Root } from 'hast'\n\n/**\n * \u539F\u59CB HTML \u5B89\u5168\u8FC7\u6EE4\uFF08\u914D\u5408 rehype-raw \u4F7F\u7528\uFF0C\u63D2\u5728 rehype-raw \u4E4B\u540E\uFF09\n * - \u79FB\u9664 script / iframe / object / embed / form \u7B49\u5371\u9669\u5143\u7D20\n * - \u79FB\u9664\u6240\u6709 on* \u4E8B\u4EF6\u5C5E\u6027\n * - \u5C06 javascript: / vbscript: \u7B49\u5371\u9669\u534F\u8BAE\u7684 URL \u5C5E\u6027\u6539\u5199\u4E3A '#'\n * \u6CE8\u610F\uFF1A\u523B\u610F\u4E0D\u7528 rehype-sanitize\u2014\u2014\u5176\u9ED8\u8BA4\u767D\u540D\u5355\u4F1A\u5265\u6389\u672C\u6E32\u67D3\u7BA1\u7EBF\u4F9D\u8D56\u7684\n * className / data-* / \u6570\u5B66\u516C\u5F0F\u8282\u70B9\uFF0C\u5BFC\u81F4 Callout\u3001\u4EE3\u7801\u9AD8\u4EAE\u3001\u516C\u5F0F\u5168\u90E8\u5931\u6548\u3002\n * \u5185\u5BB9\u53EA\u6709\u535A\u5BA2\u7BA1\u7406\u5458\uFF08\u5E93\u4E3B\u4EBA\uFF09\u53EF\u5199\uFF0C\u6B64\u5904\u4EC5\u505A\u515C\u5E95\u9632\u7EBF\u3002\n */\n\nconst REMOVE_TAGS = new Set([\n  'script',\n  'iframe',\n  'object',\n  'embed',\n  'form',\n  'button',\n  'select',\n  'textarea',\n  'link',\n  'meta',\n  'base',\n  'frameset',\n  'frame',\n  'applet',\n])\n\nconst URL_ATTRS = new Set(['href', 'src', 'poster', 'background'])\n\nfunction isDangerousUrl(value: string): boolean {\n  const v = value.trim().toLowerCase()\n  // \u65E0\u534F\u8BAE\u524D\u7F00\uFF08\u76F8\u5BF9\u8DEF\u5F84 / \u951A\u70B9 / \u6587\u4EF6\u540D\uFF09\u2192 \u5B89\u5168\n  if (!/^[a-z][a-z0-9+.-]*:/i.test(v)) return false\n  // \u6709\u534F\u8BAE\uFF1A\u767D\u540D\u5355\u653E\u884C\uFF0C\u5176\u4F59\u4E00\u5F8B\u89C6\u4E3A\u5371\u9669\uFF08javascript:\u3001vbscript:\u3001file:\u3001data:text/ \u7B49\uFF09\n  if (v.startsWith('http://') || v.startsWith('https://')) return false\n  if (v.startsWith('mailto:') || v.startsWith('tel:')) return false\n  if (v.startsWith('data:image/')) return false\n  // \u672C\u6E32\u67D3\u7BA1\u7EBF\u7684\u5185\u90E8\u94FE\u63A5\u65B9\u6848\uFF1Aobsidian-note: / obsidian-tag: / obsidian-unresolved:\n  if (v.startsWith('obsidian-')) return false\n  return true\n}\n\nexport function rehypeSafety() {\n  return (tree: Root) => {\n    visit(tree, 'element', (node: Element, index, parent) => {\n      if (typeof index !== 'number' || !parent) return\n\n      // \u5371\u9669\u6807\u7B7E\uFF1A\u6574\u68F5\u5B50\u6811\u79FB\u9664\uFF08script \u7684\u5185\u5BB9\u4E5F\u4E0D\u4FDD\u7559\uFF09\n      // input \u7279\u6B8A\u5904\u7406\uFF1AGFM \u4EFB\u52A1\u5217\u8868\u7684 checkbox \u662F\u5408\u6CD5\u7684\uFF0C\u5176\u4ED6 input \u79FB\u9664\n      const isTaskCheckbox =\n        node.tagName === 'input' && String(node.properties?.type ?? '') === 'checkbox'\n      if (REMOVE_TAGS.has(node.tagName) || (node.tagName === 'input' && !isTaskCheckbox)) {\n        parent.children.splice(index, 1)\n        return [SKIP, index] as never\n      }\n\n      const props = node.properties ?? {}\n      let dirty = false\n      for (const key of Object.keys(props)) {\n        if (/^on/i.test(key)) {\n          delete props[key]\n          dirty = true\n          continue\n        }\n        if (URL_ATTRS.has(key)) {\n          const value = props[key]\n          if (typeof value === 'string' && isDangerousUrl(value)) {\n            props[key] = '#'\n            dirty = true\n          }\n        }\n      }\n      if (dirty) node.properties = props\n      return undefined\n    })\n  }\n}\n" }, "src/lib/release-tag.ts": { "t": "utf8", "v": "// \u672C\u6587\u4EF6\u7531 scripts/build-content.mjs \u81EA\u52A8\u751F\u6210\uFF0C\u8BF7\u52FF\u624B\u6539\u3002\n// \u6784\u5EFA\u65F6\u4F1A\u5199\u5165\u7B14\u8BB0\u6570\u636E\u7684\u5185\u5BB9\u6458\u8981\uFF1B\u6B64\u5904\u4E3A\u5360\u4F4D\u503C\uFF08\u6E90\u7801\u76EE\u5F55\u4E0D\u4FDD\u7559\u4E2A\u4EBA\u4FE1\u606F\uFF09\u3002\nexport const RELEASE_TAG = ''\n" }, "src/lib/remark-obsidian.ts": { "t": "utf8", "v": "import type { Blockquote, Link, Paragraph, PhrasingContent, Root } from 'mdast'\nimport { SKIP, visit } from 'unist-util-visit'\nimport { DICT } from './i18n'\nimport {\n  basenameOf,\n  extractBlockText,\n  headingIdFromText,\n  headingIdOf,\n  normalizePath,\n  parseWikilink,\n  resolveEmbedPath,\n  scanWikilinks,\n  type LinkParts,\n} from './obsidian'\n\n/** \u6E32\u67D3\u65F6\u53EF\u7528\u7684\u7B14\u8BB0\u7D22\u5F15\uFF08link-index API \u63D0\u4F9B\uFF09 */\nexport interface NoteIndexEntry {\n  slug: string\n  path: string\n  title: string\n  isPublic: boolean\n  excerpt?: string\n}\n\nexport interface AssetIndexEntry {\n  path: string\n}\n\nexport interface RemarkObsidianOptions {\n  notes: NoteIndexEntry[]\n  assets: AssetIndexEntry[]\n  /** \u5F53\u524D\u7B14\u8BB0\u7684 slug\uFF08\u6E32\u67D3 [[#^\u5757id]] \u7EAF\u5757\u5F15\u7528\u65F6\u5B9A\u4F4D\u7528\uFF09 */\n  currentSlug?: string\n  /** \u5F53\u524D\u7B14\u8BB0\u6B63\u6587\uFF08\u63D0\u53D6\u5757\u5185\u5BB9\u4F5C\u4E3A\u94FE\u63A5\u6587\u5B57\uFF09 */\n  currentRaw?: string\n  /** \u5F53\u524D\u8BED\u8A00\u7684 callout \u9ED8\u8BA4\u6807\u9898\uFF08\u952E\u4E3A\u89C4\u8303\u7C7B\u578B\uFF09\u3002\u4E0D\u7ED9\u5C31\u56DE\u843D\u4E2D\u6587\u3002 */\n  labels?: Record<string, string>\n  /** \u7EAF\u5757\u5F15\u7528\u515C\u5E95\u6587\u6848\uFF08\u5F53\u524D\u8BED\u8A00\uFF09 */\n  blockRefLabel?: string\n}\n\n/** \u6E32\u67D3\u65F6\u53EF\u7528\u7684\u5B8C\u6574\u7D22\u5F15\uFF08link-index API \u8FD4\u56DE\u7ED3\u6784\uFF09 */\nexport interface LinkIndex {\n  notes: NoteIndexEntry[]\n  assets: AssetIndexEntry[]\n}\n\ninterface IndexCtx {\n  bySlug: Map<string, NoteIndexEntry>\n  byBasename: Map<string, NoteIndexEntry[]>\n  assetSet: Set<string>\n  currentSlug?: string\n  currentRaw?: string\n  /** \u7EAF\u5757\u5F15\u7528\u7684\u515C\u5E95\u94FE\u63A5\u6587\u5B57\uFF08\u5F53\u524D\u8BED\u8A00\uFF09 */\n  blockRefLabel: string\n}\n\nfunction buildIndex(\n  notes: NoteIndexEntry[],\n  assets: AssetIndexEntry[],\n  currentSlug?: string,\n  currentRaw?: string,\n  blockRefLabel?: string\n): IndexCtx {\n  const bySlug = new Map<string, NoteIndexEntry>()\n  const byBasename = new Map<string, NoteIndexEntry[]>()\n  for (const n of notes) {\n    bySlug.set(n.slug, n)\n    const base = basenameOf(n.path)\n    const arr = byBasename.get(base) ?? []\n    arr.push(n)\n    byBasename.set(base, arr)\n  }\n  const assetSet = new Set<string>()\n  for (const a of assets) assetSet.add(normalizeAsset(a.path))\n  return {\n    bySlug,\n    byBasename,\n    assetSet,\n    currentSlug,\n    currentRaw,\n    blockRefLabel: blockRefLabel ?? '\u5757\u5F15\u7528',\n  }\n}\n\nfunction normalizeAsset(p: string): string {\n  return p.replace(/\\\\/g, '/').replace(/^\\.\\//, '')\n}\n\n/** \u4E2D\u6587 callout \u9ED8\u8BA4\u6807\u9898\uFF08\u670D\u52A1\u7AEF / \u9759\u6001\u5BFC\u51FA\u7684\u515C\u5E95\uFF0C\u6B64\u65F6\u8BFB\u4E0D\u5230\u6D4F\u89C8\u5668\u8BED\u8A00\uFF09 */\nconst CALLOUT_LABELS_ZH: Record<string, string> = DICT.zh.calloutLabel as unknown as Record<\n  string,\n  string\n>\n\n/** Obsidian callout \u7C7B\u578B\u8868\uFF1A\u522B\u540D \u2192 \u89C4\u8303\u7C7B\u578B\u3002\n *  \u9ED8\u8BA4\u6807\u9898\u4E0D\u5199\u6B7B\u5728\u8FD9\u91CC\u2014\u2014\u5B83\u5C5E\u4E8E\u754C\u9762\u6587\u6848\uFF0C\u7531 i18n \u5B57\u5178\u6309\u5F53\u524D\u8BED\u8A00\u63D0\u4F9B\uFF08\u89C1 calloutLabels\uFF09\u3002 */\nconst CALLOUTS: Record<string, string> = {\n  note: 'note',\n  abstract: 'abstract',\n  summary: 'abstract',\n  tldr: 'abstract',\n  info: 'info',\n  todo: 'todo',\n  tip: 'tip',\n  hint: 'tip',\n  important: 'tip',\n  success: 'success',\n  check: 'success',\n  done: 'success',\n  question: 'question',\n  help: 'question',\n  faq: 'question',\n  warning: 'warning',\n  caution: 'warning',\n  attention: 'warning',\n  failure: 'failure',\n  fail: 'failure',\n  missing: 'failure',\n  danger: 'danger',\n  error: 'danger',\n  bug: 'bug',\n  example: 'example',\n  quote: 'quote',\n  cite: 'quote',\n}\n\n/** \u6807\u9898\u951A\u70B9 id\uFF08\u4E0E obsidian.ts \u7684 headingIdOf \u4FDD\u6301\u540C\u4E00\u5B9E\u73B0\uFF0C\u5927\u7EB2\u4E0E\u6E32\u67D3\u5171\u7528\uFF09 */\nexport const headingId = headingIdOf\n\nfunction headingLabel(heading: string): string {\n  return heading.replace(/^#+/, '').trim()\n}\n\nfunction findNote(target: string, ctx: IndexCtx): NoteIndexEntry | null {\n  if (!target) return null\n  const direct = ctx.bySlug.get(target)\n  if (direct) return direct\n  const base = target.split('/').pop() || target\n  const arr = ctx.byBasename.get(base)\n  if (!arr || arr.length === 0) return null\n  if (arr.length === 1) return arr[0]\n  // \u540C\u540D\u7B14\u8BB0\uFF1A\u53D6\u8DEF\u5F84\u6700\u77ED\u8005\uFF08Obsidian \u6700\u77ED\u8DEF\u5F84\u89C4\u5219\uFF09\n  return [...arr].sort((a, b) => a.path.length - b.path.length)[0]\n}\n\nfunction makeText(value: string): PhrasingContent {\n  return { type: 'text', value }\n}\n\n/**\n * \u53D6 mdast \u77ED\u8BED\u8282\u70B9\u7684\u7EAF\u6587\u672C\uFF0C\u7528\u4E8E\u751F\u6210\u6807\u9898\u951A\u70B9 id\u3002\n * inlineMath \u53D6 TeX \u539F\u6587\uFF08\u4E0D\u5E26 $ \u5B9A\u754C\u7B26\uFF09\uFF0C\u4E0E obsidian.ts \u7684 extractHeadings \u53E3\u5F84\u4E00\u81F4\uFF1A\n * \u90A3\u8FB9\u6807\u9898\u6587\u672C\u662F \"$trans$\"\uFF0CheadingIdOf \u4F1A\u5403\u6389 $ \u53EA\u5269 trans\u3002\n */\nfunction plainTextOf(nodes: PhrasingContent[]): string {\n  let out = ''\n  for (const n of nodes) {\n    const node = n as unknown as { type: string; value?: string; children?: PhrasingContent[] }\n    if (typeof node.value === 'string') {\n      out += node.value\n      continue\n    }\n    if (node.children) out += plainTextOf(node.children)\n  }\n  return out.trim()\n}\n\n/** \u751F\u6210 wikilink / \u5D4C\u5165 / \u951A\u70B9\u94FE\u63A5\u8282\u70B9 */\nfunction wikilinkNode(isEmbed: boolean, raw: string, ctx: IndexCtx): PhrasingContent | Paragraph {\n  const { target, heading, alias }: LinkParts = parseWikilink(raw)\n  const trimmedRaw = raw.trim()\n\n  // \u7EAF\u951A\u70B9\u94FE\u63A5 [[#\u6807\u9898]] / \u7EAF\u5757\u5F15\u7528 [[#^blockid]]\n  if (!target && heading) {\n    if (heading.startsWith('#^') && ctx.currentSlug) {\n      // \u672C\u6587\u5757\u5F15\u7528\uFF1A\u8F6C\u6210\u5185\u94FE\u4EE5\u4FBF\u60AC\u505C\u9884\u89C8\uFF1B\u94FE\u63A5\u6587\u5B57\u663E\u793A\u5757\u5185\u5BB9\u6458\u8981\uFF08\u5265\u6389 md \u8BED\u6CD5\uFF09\n      const blockId = heading.slice(2)\n      const blockText = ctx.currentRaw ? extractBlockText(ctx.currentRaw, blockId) : null\n      const plain = blockText\n        ?.replace(/^ {0,3}#{1,6}\\s+/, '')\n        .replace(/\\[([^\\]]*)\\]\\([^)]*\\)/g, '$1')\n        .replace(/\\[\\[([^\\]|]*)\\|([^\\]]*)\\]\\]/g, '$2')\n        .replace(/\\[\\[([^\\]]+)\\]\\]/g, '$1')\n        .replace(/\\s+/g, ' ')\n        .trim()\n      const short = plain ? plain.slice(0, 26) + (plain.length > 26 ? '\u2026' : '') : null\n      return makeLink(\n        'obsidian-note:' + ctx.currentSlug + '?h=' + encodeURIComponent('^' + blockId),\n        alias ?? short ?? ctx.blockRefLabel,\n        'internal-link anchor-link'\n      )\n    }\n    const label = headingLabel(heading)\n    return makeLink('#' + headingIdFromText(label), alias ?? label, 'internal-link anchor-link')\n  }\n\n  if (isEmbed) {\n    // \u5D4C\u5165\uFF1A\u4F18\u5148\u9644\u4EF6\uFF08\u56FE\u7247\u7B49\uFF09\uFF0C\u5176\u6B21\u7B14\u8BB0\n    const assetPath = resolveEmbedPath(target, ctx.assetSet)\n    if (assetPath) {\n      return {\n        type: 'image',\n        url: '/api/asset?path=' + encodeURIComponent(assetPath),\n        title: null,\n        alt: alias ?? basenameOf(assetPath),\n        data: { hProperties: { className: ['obsidian-image'] } },\n      } as PhrasingContent\n    }\n    const note = findNote(target, ctx)\n    if (note) {\n      // \u771F\xB7\u5D4C\u5165\uFF1A\u4EA4\u7ED9\u6E32\u67D3\u5C42\u628A\u76EE\u6807\u7B14\u8BB0\u7684\u5BF9\u5E94\u533A\u95F4\uFF08\u6574\u7BC7 / \u67D0\u5C0F\u8282 / \u67D0\u4E2A\u5757\uFF09\n      // \u76F4\u63A5\u5C55\u5F00\u5728\u5F53\u524D\u4F4D\u7F6E\uFF0C\u800C\u4E0D\u662F\u5F39\u60AC\u6D6E\u7A97\u6216\u53EA\u653E\u4E00\u5F20\u6458\u8981\u5361\u7247\u3002\n      // \u8FD9\u91CC\u53EA\u8F93\u51FA\u5360\u4F4D\u8282\u70B9\uFF0C\u533A\u95F4\u622A\u53D6\u548C\u5F02\u6B65\u53D6\u6570\u5728 Transclusion \u7EC4\u4EF6\u91CC\u505A\u3002\n      return {\n        type: 'paragraph',\n        data: {\n          hName: 'div',\n          hProperties: {\n            className: ['note-embed'],\n            'data-embed-slug': note.slug,\n            ...(heading ? { 'data-embed-heading': headingLabel(heading) } : {}),\n          },\n        },\n        children: [],\n      } as Paragraph\n    }\n  }\n\n  // \u666E\u901A wikilink\n  const note = findNote(target, ctx)\n  if (note) {\n    const label =\n      alias ??\n      (heading && !heading.startsWith('#^')\n        ? note.title +\n          ' > ' +\n          headingLabel(heading)\n            .split('#')\n            .map((s) => s.trim())\n            .filter(Boolean)\n            .join(' > ')\n        : note.title)\n    return makeLink(\n      'obsidian-note:' +\n        note.slug +\n        (heading ? '?h=' + encodeURIComponent(headingLabel(heading)) : ''),\n      label,\n      'internal-link' + (note.isPublic ? '' : ' private-link')\n    )\n  }\n\n  // \u672A\u521B\u5EFA\u7684\u76EE\u6807\uFF08Obsidian \u98CE\u683C\uFF1A\u7070\u8272\u865A\u7EBF\uFF09\n  return makeLink(\n    'obsidian-unresolved:' + encodeURIComponent(trimmedRaw),\n    alias ?? trimmedRaw,\n    'internal-link unresolved-link'\n  )\n}\n\nfunction makeLink(url: string, label: string, className: string): Link {\n  return {\n    type: 'link',\n    url,\n    title: null,\n    data: { hProperties: { className: className.split(/\\s+/).filter(Boolean) } },\n    children: [makeText(label)],\n  }\n}\n\n/** \u666E\u901A\u6587\u672C\u6BB5\uFF1A\u5904\u7406 ==\u9AD8\u4EAE== \u4E0E #\u884C\u5185\u6807\u7B7E */\nfunction plainNodes(text: string): PhrasingContent[] {\n  const nodes: PhrasingContent[] = []\n  const TOKEN = /==([^=\\n]+)==|(^|\\s)(#[\\p{L}\\p{N}][\\p{L}\\p{N}_/-]*)/gmu\n  let last = 0\n  for (const m of text.matchAll(TOKEN)) {\n    const lead = m[3] !== undefined ? m[2] : ''\n    const start = (m.index ?? 0) + lead.length\n    if (start > last) nodes.push(makeText(text.slice(last, start)))\n    if (m[1] !== undefined) {\n      // ==\u9AD8\u4EAE==\n      nodes.push({\n        type: 'emphasis',\n        data: { hName: 'mark', hProperties: { className: ['obsidian-highlight'] } },\n        children: [makeText(m[1])],\n      })\n      last = start + m[0].length - lead.length\n    } else if (m[3] !== undefined) {\n      // #\u6807\u7B7E\n      const tag = m[3]\n      nodes.push(makeLink('obsidian-tag:' + encodeURIComponent(tag.slice(1)), tag, 'inline-tag'))\n      last = start + tag.length\n    }\n  }\n  if (last < text.length) nodes.push(makeText(text.slice(last)))\n  return nodes\n}\n\n/** \u6587\u672C\u8282\u70B9 \u2192 \u884C\u5185\u8282\u70B9\u6570\u7EC4\uFF08wikilink \u4F18\u5148\u62C6\u5206\uFF1B\u652F\u6301\u6807\u9898\u91CC\u5E26\u6210\u5BF9\u65B9\u62EC\u53F7\uFF09 */\nfunction inlineNodes(text: string, ctx: IndexCtx): PhrasingContent[] {\n  const nodes: PhrasingContent[] = []\n  const tokens = scanWikilinks(text)\n  if (tokens.length === 0) return plainNodes(text)\n  let last = 0\n  for (const tk of tokens) {\n    if (tk.start > last) nodes.push(...plainNodes(text.slice(last, tk.start)))\n    nodes.push(wikilinkNode(tk.isEmbed, tk.inner, ctx) as PhrasingContent)\n    last = tk.end\n  }\n  if (last < text.length) nodes.push(...plainNodes(text.slice(last)))\n  return nodes\n}\n\n/** blockquote \u2192 Obsidian callout \u8F6C\u6362\u3002\n *  labels \u4E3A\u5F53\u524D\u8BED\u8A00\u7684 callout \u9ED8\u8BA4\u6807\u9898\uFF08\u952E\u662F\u89C4\u8303\u7C7B\u578B\uFF09\uFF1B\u4E0D\u7ED9\u5C31\u56DE\u843D\u4E2D\u6587\u3002 */\nfunction tryCallout(node: Blockquote, labels: Record<string, string>): boolean {\n  const first = node.children[0]\n  if (!first || first.type !== 'paragraph') return false\n  const fc = first.children[0]\n  if (!fc || fc.type !== 'text') return false\n  const m = /^\\[!(\\w+)\\]([+-]?)\\s?/.exec(fc.value)\n  if (!m) return false\n  const rawType = m[1].toLowerCase()\n  const canonical = CALLOUTS[rawType] ?? 'note'\n  const label = labels[canonical] ?? CALLOUT_LABELS_ZH[canonical] ?? rawType\n  const fold = m[2] === '-' ? 'closed' : m[2] === '+' ? 'open' : null\n  let rest = fc.value.slice(m[0].length)\n  let bodyText: string | null = null\n  const nl = rest.indexOf('\\n')\n  if (nl >= 0) {\n    bodyText = rest.slice(nl + 1)\n    rest = rest.slice(0, nl)\n  }\n  fc.value = rest.trim() || label\n  first.data = {\n    hName: fold ? 'summary' : 'div',\n    hProperties: { className: ['callout-title'], 'data-callout-type': canonical },\n  }\n  node.data = {\n    hName: fold ? 'details' : 'div',\n    hProperties: {\n      className: ['callout', 'callout-' + canonical],\n      ...(fold === 'open' ? { open: true } : {}),\n    },\n  }\n  if (bodyText && bodyText.trim()) {\n    const para: Paragraph = { type: 'paragraph', children: [makeText(bodyText)] }\n    node.children.splice(1, 0, para)\n  }\n  return true\n}\n\n/** \u5757\u5F15\u7528 ID\uFF08Obsidian \u590D\u5236\u5757\u94FE\u63A5\u65F6\u81EA\u52A8\u751F\u6210\uFF0C\u5982\u884C\u5C3E ^735c76\uFF09\u2014\u2014\u6B63\u6587\u91CC\u6309\u4E71\u7801\u5265\u79BB\u3002\n *  \u4E24\u79CD\u5F62\u6001\uFF1A\u8DDF\u5728\u5757\u5C3E\uFF08\u524D\u9762\u6709\u7A7A\u767D\uFF09\u3001\u6216\u6574\u4E2A\u6BB5\u843D\u53EA\u6709\u4E00\u884C\u5757 ID\uFF08Obsidian \u9605\u8BFB\u89C6\u56FE\u540C\u6837\u9690\u85CF\uFF09\u3002 */\nconst BLOCK_ID_TAIL = /(?:\\s+|^)\\^[A-Za-z0-9-]{4,}\\s*$/\n\nfunction decodeURIComponentSafe(s: string): string {\n  try {\n    return decodeURIComponent(s)\n  } catch {\n    return s\n  }\n}\n\n/** remark \u63D2\u4EF6\uFF1AObsidian \u8BED\u6CD5\uFF08wikilink / \u5D4C\u5165 / callout / \u9AD8\u4EAE / \u6807\u7B7E / \u5757\u5F15\u7528\u6E05\u7406\uFF09 */\nexport function remarkObsidian(this: unknown, opts: RemarkObsidianOptions) {\n  const ctx = buildIndex(\n    opts.notes,\n    opts.assets,\n    opts.currentSlug,\n    opts.currentRaw,\n    opts.blockRefLabel\n  )\n  const labels = (opts.labels ?? CALLOUT_LABELS_ZH) as Record<string, string>\n  const blockRefLabel = opts.blockRefLabel ?? 'Block reference'\n  return (tree: Root) => {\n    // \u7B2C\u4E00\u8F6E\uFF1Acallout \u8F6C\u6362\uFF08\u4EA7\u751F\u7684 text \u4F1A\u53C2\u4E0E\u7B2C\u4E8C\u8F6E\u884C\u5185\u5904\u7406\uFF09\n    visit(tree, 'blockquote', (node) => {\n      tryCallout(node as Blockquote, labels)\n    })\n    // \u7B2C\u4E00\u8F6E B\uFF08\u539F\u4F4D\u7F6E\uFF09\u5DF2\u79FB\u5230\u6700\u540E\u4E00\u8F6E\uFF1A\u6807\u9898\u951A\u70B9 id \u5FC5\u987B\u5728 wikilink / \u884C\u5185\u8BED\u6CD5\n    // \u5C55\u5F00**\u4E4B\u540E**\u518D\u7B97\uFF0C\u5426\u5219 `## [[\u7B14\u8BB0|\u522B\u540D]]` \u8FD9\u7C7B\u6807\u9898\u4F1A\u5F97\u5230 notealias\uFF08\u539F\u6587\uFF09\n    // \u800C\u5927\u7EB2\u4FA7\u5F97\u5230 alias\uFF08\u53EF\u89C1\u6587\u5B57\uFF09\uFF0C\u6B63\u6587 id \u4E0E TOC id \u5BF9\u4E0D\u4E0A\u3001\u70B9\u51FB\u5927\u7EB2\u4E0D\u8DF3\u8F6C\u3002\n    // \u7B2C\u4E8C\u8F6E\uFF1A\u5265\u79BB\u60AC\u6302\u7684\u5757\u5F15\u7528 ID\uFF08\u6BB5\u843D/\u6807\u9898\u672B\u5C3E\u7684 ^xxxxxx\uFF09\uFF0C\u907F\u514D\u6E32\u67D3\u6210\u4E71\u7801\n    visit(tree, ['paragraph', 'heading'], (node, index, parent) => {\n      if (!parent || typeof index !== 'number') return\n      const children = (node as { children: PhrasingContent[] }).children\n      const last = children[children.length - 1]\n      if (!last || last.type !== 'text') return\n      const value = (last as { value: string }).value\n      const m = BLOCK_ID_TAIL.exec(value)\n      if (!m) return\n      const rest = value.slice(0, m.index)\n      if (rest.trim()) {\n        ;(last as { value: string }).value = rest\n      } else if (children.length === 1) {\n        // \u6574\u4E2A\u5757\u53EA\u5269\u5757 ID\uFF1A\u76F4\u63A5\u79FB\u9664\u8BE5\u5757\n        parent.children.splice(index, 1)\n        return [SKIP, index] as never\n      } else {\n        children.pop()\n      }\n    })\n    // \u7B2C\u4E09\u8F6E\uFF1Amarkdown \u94FE\u63A5\u6307\u5411\u5E93\u5185\u7B14\u8BB0\uFF08[\u6587\u5B57](\u7B14\u8BB0.md)\uFF09\u2192 \u8F6C\u5185\u94FE\uFF0C\u652F\u6301 #\u6807\u9898/#^\u5757id \u7247\u6BB5\n    visit(tree, 'link', (node) => {\n      const link = node as Link\n      const url = link.url\n      if (!url || /^(https?:|mailto:|data:|#|obsidian-)/i.test(url)) return\n      const decoded = decodeURIComponentSafe(url)\n      const hi = decoded.indexOf('#')\n      const targetPart = hi >= 0 ? decoded.slice(0, hi) : decoded\n      const frag = hi >= 0 ? decoded.slice(hi) : ''\n      const target = normalizePath(targetPart.replace(/\\.(md|markdown)$/i, ''))\n      if (!target) return\n      const note = findNote(target, ctx)\n      if (note) {\n        link.url =\n          'obsidian-note:' +\n          note.slug +\n          (frag ? '?h=' + encodeURIComponent(headingLabel(frag)) : '')\n        link.data = {\n          hProperties: { className: ['internal-link' + (note.isPublic ? '' : ' private-link')] },\n        }\n      } else if (/\\.(md|markdown)$/i.test(targetPart)) {\n        // \u660E\u663E\u662F\u60F3\u94FE\u5E93\u5185\u7B14\u8BB0\u4F46\u76EE\u6807\u4E0D\u5B58\u5728\uFF1A\u6309\u672A\u521B\u5EFA\u5904\u7406\uFF08\u70B9\u51FB\u641C\u7D22\uFF09\uFF0C\u907F\u514D 404\n        link.url = 'obsidian-unresolved:' + encodeURIComponent(target)\n        link.data = { hProperties: { className: ['internal-link', 'unresolved-link'] } }\n      }\n    })\n    // \u7B2C\u56DB\u8F6E\uFF1A\u884C\u5185\u8BED\u6CD5\uFF08wikilink / ==\u9AD8\u4EAE== / #\u6807\u7B7E\uFF09\n    visit(tree, 'text', (node, index, parent) => {\n      if (!parent || typeof index !== 'number') return\n      const p = parent as unknown as {\n        type: string\n        url?: string\n        children: PhrasingContent[]\n      }\n      if (p.type === 'link' && typeof p.url === 'string' && p.url.startsWith('obsidian-')) {\n        return\n      }\n      const value = (node as { value: string }).value\n      if (!value.includes('[[') && !value.includes('==') && !/#[\\p{L}\\p{N}]/u.test(value)) {\n        return\n      }\n      const replacement = inlineNodes(value, ctx)\n      if (\n        replacement.length === 1 &&\n        replacement[0].type === 'text' &&\n        (replacement[0] as { value: string }).value === value\n      ) {\n        return\n      }\n      p.children.splice(index, 1, ...replacement)\n    })\n    // \u6700\u540E\u4E00\u8F6E\uFF1A\u7ED9\u6807\u9898\u6253\u951A\u70B9 id\uFF08\u89C1\u7B2C\u4E00\u8F6E B \u7684\u8BF4\u660E\uFF09\u3002\n    // \u4ECD\u7136\u5728 mdast \u9636\u6BB5\u7B97\uFF1A\u6B64\u65F6\u516C\u5F0F\u8FD8\u662F inlineMath\uFF08TeX \u539F\u6587\uFF09\uFF0C\u800C rehype \u4E4B\u540E\n    // KaTeX \u4F1A\u628A\u540C\u4E00\u516C\u5F0F\u5C55\u5F00\u6210 mathml + annotation + html \u4E09\u4EFD\uFF0C\u53D6\u6587\u672C\u4F1A\u53D6\u4E09\u904D\u3002\n    // \u91CD\u590D\u6807\u9898\u6309\u51FA\u73B0\u987A\u5E8F\u52A0 -1 / -2 \u540E\u7F00\uFF0C\u4E0E extractHeadings\uFF08\u5927\u7EB2\u4FA7\uFF09\u5B8C\u5168\u4E00\u81F4\u3002\n    const seenIds = new Map<string, number>()\n    visit(tree, 'heading', (node) => {\n      const h = node as { children: PhrasingContent[]; data?: { hProperties?: Record<string, unknown> } }\n      const plain = plainTextOf(h.children)\n      if (!plain) return\n      const base = headingIdOf(plain)\n      const n = seenIds.get(base) ?? 0\n      seenIds.set(base, n + 1)\n      h.data = h.data || {}\n      h.data.hProperties = { ...(h.data.hProperties || {}), id: n === 0 ? base : `${base}-${n}` }\n    })\n  }\n}\n\n/** \u628A\u524D\u7F00\u6587\u5B57\u63D2\u5230 hast \u5B50\u6811\u6700\u9760\u524D\u7684\u6587\u672C\u8282\u70B9\u4E0A\uFF08\u627E\u4E0D\u5230\u5C31\u8FD4\u56DE false\uFF09 */\nfunction prependToFirstText(nodes: unknown[], prefix: string): boolean {\n  for (const raw of nodes) {\n    const n = raw as { type?: string; value?: string; children?: unknown[] }\n    if (!n || typeof n !== 'object') continue\n    if (n.type === 'text' && typeof n.value === 'string') {\n      n.value = prefix + n.value\n      return true\n    }\n    if (Array.isArray(n.children) && prependToFirstText(n.children, prefix)) return true\n  }\n  return false\n}\n\n/**\n * \u4FEE remark-math \u7684 `$$` \u540C\u884C\u5199\u6CD5\u3002\n *\n * micromark \u7684\u6570\u5B66\u5757\u6CBF\u7528\u4EE3\u7801\u56F4\u680F\u8BED\u4E49\uFF1A`$$` \u540E\u9762\u540C\u4E00\u884C\u7684\u5185\u5BB9\u88AB\u5F53\u6210 **meta**\n * \uFF08\u7C7B\u4F3C ```js \u7684 info string\uFF09\uFF0C\u771F\u6B63\u7684\u516C\u5F0F\u4F53\u4ECE\u4E0B\u4E00\u884C\u5F00\u59CB\u3002\u4E8E\u662F\n *\n *   $$\\left(\\begin{matrix}\n *   a & b \\\\\n *   \\end{matrix}\\right)$$\n *\n * \u7684\u9996\u884C\u88AB\u4E22\u8FDB meta \u91CC\u518D\u6CA1\u4EBA\u8BFB\uFF0C\u516C\u5F0F\u4F53\u53EA\u5269 `a & b \\\\ \\end{matrix}\\right)`\uFF0C\n * `\\left` \u6CA1\u6709\u914D\u5BF9\u7684 `\\right`\uFF0CKaTeX \u76F4\u63A5\u62A5\u9519\u3002Obsidian \u6CA1\u6709 math meta \u6982\u5FF5\uFF0C\n * \u90A3\u91CC `$$` \u540E\u9762\u7684\u5185\u5BB9\u5C31\u662F\u516C\u5F0F\u7B2C\u4E00\u884C\uFF0C\u6240\u4EE5\u8FD9\u91CC\u628A meta \u5E76\u56DE\u516C\u5F0F\u4F53\u3002\n * \u540C\u65F6\u8981\u6539 data.hChildren \u2014\u2014 rehype-katex \u8BFB\u7684\u662F\u90A3\u4EFD\u9884\u5148\u70D8\u597D\u7684\u6587\u672C\u3002\n */\nexport function remarkMathMetaFix() {\n  return (tree: Root) => {\n    visit(tree, (node) => {\n      const n = node as unknown as {\n        type: string\n        meta?: string | null\n        value?: string\n        data?: { hChildren?: unknown[] }\n      }\n      if (n.type !== 'math' || !n.meta) return\n      const head = n.meta\n      n.meta = null\n      n.value = head + '\\n' + (n.value ?? '')\n      const kids = n.data?.hChildren\n      if (Array.isArray(kids)) prependToFirstText(kids, head + '\\n')\n    })\n  }\n}\n" }, "src/lib/site-name.generated.ts": { "t": "utf8", "v": '// \u672C\u6587\u4EF6\u7531 scripts/build-content.mjs \u81EA\u52A8\u751F\u6210\uFF0C\u8BF7\u52FF\u624B\u6539\u3002\n// \u6784\u5EFA\u65F6\u4F1A\u5199\u5165\u7528\u6237\u6570\u636E\u76EE\u5F55\u91CC\u7684\u7AD9\u540D\uFF1B\u6B64\u5904\u4E3A\u4E2D\u6027\u5360\u4F4D\u503C\u3002\nexport const SITE_NAME = "\u7B14\u8BB0"\n' }, "src/lib/site.ts": { "t": "utf8", "v": "/** \u9759\u6001\u7AD9\u70B9\u5E38\u91CF\uFF1AGitHub Pages \u9879\u76EE\u7AD9\u90E8\u7F72\u65F6\uFF0C\u6784\u5EFA\u524D\u8BBE\u7F6E NEXT_PUBLIC_BASE_PATH=/<\u4ED3\u5E93\u540D> */\nexport const BASE_PATH = process.env.NEXT_PUBLIC_BASE_PATH || ''\n\n// \u7AD9\u540D\uFF08\u7F51\u9875\u5DE6\u4E0A\u89D2\u6807\u9898 / <title>\uFF09\uFF1A\u4F18\u5148\u7EA7\u4ECE\u9AD8\u5230\u4F4E\n//   1. site-name.txt \u2014\u2014 \u53D1\u5E03\u7BA1\u7406\u5668\u5728\u53D1\u5E03\u65F6\u5199\u5165\u4ED3\u5E93\u5E76\u968F\u63D0\u4EA4\u63A8\u4E0A\u6765\uFF08\u6539\u540D+\u53D1\u5E03\u5373\u751F\u6548\uFF0C\n//      \u4E0D\u4F9D\u8D56 GitHub \u7684 Actions \u53D8\u91CF\u63A5\u53E3\uFF0C\u6362\u673A\u5668/\u6362\u7F51\u7EDC\u90FD\u4E00\u6837\uFF09\n//   2. NEXT_PUBLIC_SITE_NAME \u2014\u2014 \u517C\u5BB9\u65E7\u7684 Actions \u53D8\u91CF\u65B9\u5F0F\n//   3. \u300C\u7B14\u8BB0\u300D\u2014\u2014 \u4E2D\u6027\u515C\u5E95\uFF0C\u7EDD\u4E0D\u56DE\u9000\u5230\u67D0\u4E2A\u5177\u4F53\u4EBA\u540D\n//\n// site-name.generated.ts \u7531 scripts/build-content.mjs \u5728\u6784\u5EFA\u65F6\u751F\u6210\uFF0C\u5185\u5BB9\u662F site-name.txt \u7684\u503C\u3002\nimport { SITE_NAME as GENERATED_SITE_NAME } from './site-name.generated'\n\nexport const SITE_NAME: string = (\n  GENERATED_SITE_NAME ||\n  (process.env.NEXT_PUBLIC_SITE_NAME || '').trim() ||\n  '\u7B14\u8BB0'\n).trim()\n\n/** \u62FC\u63A5\u7AD9\u70B9\u5185\u8DEF\u5F84\uFF08\u81EA\u52A8\u5E26 basePath\uFF09 */\nexport function withBase(p: string): string {\n  return BASE_PATH + p\n}\n" }, "src/lib/store.ts": { "t": "utf8", "v": "'use client'\n\nimport { create } from 'zustand'\nimport { persist } from 'zustand/middleware'\n\nexport type ViewKind = 'home' | 'note'\n\n/** \u9996\u6B21\u52A0\u8F7D\u65F6\u4ECE URL \u6062\u590D\u89C6\u56FE\uFF08?note= / ?h= / ?tag= / ?folder=\uFF09\uFF0C\u4FDD\u8BC1\u6DF1\u94FE\u4E0E\u524D\u8FDB\u540E\u9000\u6B63\u786E */\nfunction initialViewFromUrl(): Pick<\n  BlogState,\n  'view' | 'slug' | 'activeTag' | 'folder' | 'pendingHeading' | 'pendingText'\n> {\n  if (typeof window === 'undefined')\n    return {\n      view: 'home',\n      slug: null,\n      activeTag: null,\n      folder: '',\n      pendingHeading: null,\n      pendingText: null,\n    }\n  const params = new URLSearchParams(window.location.search)\n  const note = params.get('note')\n  const tag = params.get('tag')\n  const folder = params.get('folder') || ''\n  // ?h= \u662F\u300C\u6253\u5F00\u65F6\u5B9A\u4F4D\u5230\u67D0\u5C0F\u8282\u300D\uFF0C\u7531\u6D6E\u7A97\u300C\u6253\u5F00\u7B14\u8BB0 \u2197\u300D\u5199\u5165\uFF1B\u6D88\u8D39\u4E00\u6B21\u5373\u6E05\u9664\uFF08note-view\uFF09\n  const h = params.get('h')\n  if (note)\n    return {\n      view: 'note',\n      slug: note,\n      activeTag: null,\n      // \u7B14\u8BB0\u9875\u4E5F\u5E26\u7740\u6765\u6E90\u6587\u4EF6\u5939\uFF1A\u70B9\u300C\u8FD4\u56DE\u300D\u56DE\u5230\u8FDB\u6765\u65F6\u90A3\u4E00\u5C42\uFF0C\u800C\u4E0D\u662F\u6839\u76EE\u5F55\n      folder,\n      pendingHeading: h,\n      pendingText: null,\n    }\n  if (tag)\n    return {\n      view: 'home',\n      slug: null,\n      activeTag: tag,\n      folder: '',\n      pendingHeading: null,\n      pendingText: null,\n    }\n  return {\n    view: 'home',\n    slug: null,\n    activeTag: null,\n    folder,\n    pendingHeading: null,\n    pendingText: null,\n  }\n}\n\n/**\n * \u5168\u5C40\u89C6\u56FE\u72B6\u6001\u3002\n *\n * \u9759\u6001\u7AD9**\u6CA1\u6709\u8D26\u53F7\u4F53\u7CFB**\uFF082026-10-13 \u4E0E\u5168\u6808\u7248\u5BF9\u9F50\u53BB\u6389\uFF09\uFF1A\n * \u7EAF\u53EA\u8BFB\u7AD9\u70B9\uFF0C\u6CA1\u6709\u767B\u5F55\u3001\u6CA1\u6709\u6CE8\u518C\u3001\u6CA1\u6709\u672C\u5730\u8D26\u53F7\uFF0C\u6253\u5F00\u5373\u7528\u3002\n * \u9605\u8BFB\u504F\u597D\uFF08\u5B57\u53F7\u3001\u6298\u53E0\u7B49\uFF09\u76F4\u63A5\u7528\u56FA\u5B9A\u952E\u5B58\u5728 localStorage \u91CC\u3002\n */\ninterface BlogState {\n  view: ViewKind\n  slug: string | null\n  pendingHeading: string | null\n  /** \u6253\u5F00\u7B14\u8BB0\u540E\u8981\u6EDA\u5230\u7684\u6B63\u6587\u7247\u6BB5\uFF08\u641C\u7D22\u547D\u4E2D\u6B63\u6587\u65F6\u7531\u7ED3\u679C\u884C\u5199\u5165\uFF0C\u6D88\u8D39\u4E00\u6B21\u5373\u6E05\u9664\uFF09 */\n  pendingText: string | null\n  activeTag: string | null\n  /** \u9996\u9875\u5F53\u524D\u6240\u5728\u6587\u4EF6\u5939\uFF08\u76F8\u5BF9\u5E93\u6839\u7684\u8DEF\u5F84\uFF0C'' = \u5168\u90E8\uFF09\u3002\u9010\u5C42\u4E0B\u94BB\u9760\u5B83\u5B9A\u4F4D\u3002 */\n  folder: string\n  search: string\n  navigateToNote: (slug: string, heading?: string, text?: string) => void\n  goHome: (tag?: string | null) => void\n  setTag: (tag: string | null) => void\n  /** \u4E0B\u94BB\u5230\u67D0\u4E2A\u6587\u4EF6\u5939\uFF08'' = \u56DE\u5230\u5168\u90E8\uFF09 */\n  openFolder: (folder: string) => void\n  setSearch: (s: string) => void\n  clearPendingHeading: () => void\n  clearPendingText: () => void\n}\n\nexport const useBlog = create<BlogState>()(\n  persist(\n    (set) => ({\n      // initialViewFromUrl() \u73B0\u5728\u4E5F\u8FD4\u56DE pendingHeading\uFF08\u6DF1\u94FE ?note=X&h=Y\uFF09\uFF0C\n      // \u6545\u4E0D\u518D\u5199\u6B7B pendingHeading: null\uFF0C\u5426\u5219\u4F1A\u628A\u5B83\u76D6\u6389\u3002\n      ...initialViewFromUrl(),\n      activeTag: null,\n      search: '',\n      navigateToNote: (slug, heading, text) =>\n        set((s) => ({\n          view: 'note',\n          slug,\n          pendingHeading: heading ?? null,\n          pendingText: text ?? null,\n          search: s.search,\n        })),\n      // \u4ECE\u7B14\u8BB0\u8FD4\u56DE\u9996\u9875\u65F6\u4FDD\u7559\u5F53\u524D\u6587\u4EF6\u5939\uFF1A\u5728\u300C\u6BD4\u8D5B/NF\u300D\u91CC\u6253\u5F00\u4E00\u7BC7\u518D\u70B9\u8FD4\u56DE\uFF0C\n      // \u5E94\u8BE5\u56DE\u5230 NF\uFF0C\u800C\u4E0D\u662F\u88AB\u6254\u56DE\u6839\u76EE\u5F55\n      goHome: (tag) =>\n        set((s) => ({\n          view: 'home',\n          slug: null,\n          activeTag: tag ?? null,\n          folder: tag ? '' : s.folder,\n        })),\n      setTag: (tag) => set({ view: 'home', activeTag: tag, folder: '' }),\n      openFolder: (folder) => set({ view: 'home', activeTag: null, folder }),\n      setSearch: (s) => set({ search: s }),\n      clearPendingHeading: () => set({ pendingHeading: null }),\n      clearPendingText: () => set({ pendingText: null }),\n    }),\n    {\n      name: 'obsidian-blog-view',\n      // \u53EA\u8BB0\u4F4F\u6807\u7B7E\u7B5B\u9009\uFF1B\u65E0\u8D26\u53F7\u4F53\u7CFB\uFF0C\u6CA1\u6709\u767B\u5F55\u6001\u53EF\u6301\u4E45\u5316\n      partialize: (s) => ({ activeTag: s.activeTag }),\n    }\n  )\n)\n" }, "src/lib/theme.generated.ts": { "t": "utf8", "v": "// \u672C\u6587\u4EF6\u7531 scripts/build-content.mjs \u81EA\u52A8\u751F\u6210\uFF0C\u8BF7\u52FF\u624B\u6539\u3002\n// \u6784\u5EFA\u65F6\u4F1A\u5199\u5165 public/theme.css \u7684\u5B58\u5728\u6027\u4E0E\u5185\u5BB9\u54C8\u5E0C\uFF1B\u6B64\u5904\u4E3A\u5360\u4F4D\u503C\u3002\nexport const THEME_EXISTS = false\nexport const THEME_VERSION = ''\n" }, "src/lib/utils.ts": { "t": "utf8", "v": "import { clsx, type ClassValue } from 'clsx'\nimport { twMerge } from 'tailwind-merge'\n\nexport function cn(...inputs: ClassValue[]) {\n  return twMerge(clsx(inputs))\n}\n" }, "scripts/build-content.mjs": { "t": "utf8", "v": "#!/usr/bin/env node\n/**\n * \u5185\u5BB9\u6784\u5EFA\u811A\u672C\uFF1Acontent/\uFF08\u53D1\u5E03\u5DE5\u5177\u751F\u6210\u7684\u516C\u5F00\u7B14\u8BB0+\u9644\u4EF6\uFF09\u2192 public/data/*.json + public/assets/*\n *\n * - \u6BCF\u7BC7\u7B14\u8BB0\u751F\u6210 /data/notes/<base64url(slug)>.json\uFF08\u539F\u6587\u3001frontmatter\u3001\u53CD\u94FE\u3001\u51FA\u94FE\uFF09\n * - \u751F\u6210 /data/index.json\uFF08\u5217\u8868 + \u9644\u4EF6\u8DEF\u5F84\u7D22\u5F15\uFF0C\u4F9B\u641C\u7D22/\u6587\u4EF6\u5939/\u60AC\u6D6E\u9884\u89C8\u4F7F\u7528\uFF09\n * - \u9644\u4EF6\u539F\u6837\u62F7\u8D1D\u5230 /assets/<\u76F8\u5BF9\u8DEF\u5F84>\uFF08\u9875\u9762\u91CC\u6309\u76F8\u540C\u89C4\u5219\u5F15\u7528\uFF09\n * \u53CD\u94FE/\u51FA\u94FE/\u6807\u7B7E/\u6458\u8981\u7B49\u4E0E\u5168\u6808\u7248\u540C\u4E00\u5957\u7B97\u6CD5\uFF08\u6B64\u6587\u4EF6\u5185\u4E3A\u5BF9\u5E94\u5B9E\u73B0\uFF09\u3002\n */\n\nimport fsSync from 'node:fs'\nimport { promises as fs } from 'node:fs'\nimport os from 'node:os'\nimport path from 'node:path'\nimport { createHash } from 'node:crypto'\nimport { fileURLToPath } from 'node:url'\nimport matter from 'gray-matter'\n\nconst __dirname = path.dirname(fileURLToPath(import.meta.url))\nconst ROOT = path.resolve(__dirname, '..')\n/**\n * \u5185\u5BB9\u76EE\u5F55\uFF1A\u4F18\u5148\u7528\u53D1\u5E03\u7BA1\u7406\u5668\u6240\u5728\u7684\u7528\u6237\u6570\u636E\u76EE\u5F55\u91CC\u7684 content/\uFF0C\n * \u5176\u6B21\u7528\u73AF\u5883\u53D8\u91CF CONTENT_DIR\uFF0C\u6700\u540E\u624D\u7528\u4ED3\u5E93\u91CC\u7684 content/\uFF08CI \u8D70\u8FD9\u6761\uFF09\u3002\n *\n * \u8FD9\u6837\u6E90\u76EE\u5F55\uFF08\u53EF\u4EE5\u5F00\u6E90\u7684\u90A3\u4EFD\uFF09\u91CC\u4E0D\u653E\u4EFB\u4F55\u4E2A\u4EBA\u7B14\u8BB0\uFF0C\n * CI \u5728 GitHub \u4E0A\u6784\u5EFA\u65F6\u7528\u6237\u76EE\u5F55\u4E0D\u5B58\u5728\uFF0C\u81EA\u7136\u56DE\u843D\u5230\u4ED3\u5E93\u81EA\u5E26 content/\uFF0C\u884C\u4E3A\u4E0D\u53D8\u3002\n */\nconst CONTENT = (() => {\n  const fromEnv = (process.env.CONTENT_DIR || '').trim()\n  if (fromEnv) return path.resolve(fromEnv)\n  const home = os.homedir() || ''\n  let dataDir = ''\n  const fromData = (process.env.OBSIDIAN_BLOG_DATA || '').trim()\n  if (fromData) dataDir = path.resolve(fromData)\n  else if (process.platform === 'win32') dataDir = path.join(process.env.APPDATA || path.join(home, 'AppData', 'Roaming'), 'obsidian-blog')\n  else if (process.platform === 'darwin') dataDir = path.join(home, 'Library', 'Application Support', 'obsidian-blog')\n  else dataDir = path.join(process.env.XDG_CONFIG_HOME || path.join(home, '.config'), 'obsidian-blog')\n  const inUserData = path.join(dataDir, 'content')\n  try {\n    if (fsSync.statSync(inUserData).isDirectory()) return inUserData\n  } catch {\n    /* \u7528\u6237\u6570\u636E\u76EE\u5F55\u91CC\u6CA1\u6709\uFF0C\u56DE\u843D */\n  }\n  return path.join(ROOT, 'content')\n})()\nconst PUBLIC = path.join(ROOT, 'public')\n// \u26A0\uFE0F \u8FD9\u4E2A\u5E38\u91CF\u5FC5\u987B\u5B9A\u4E49\u5728\u6587\u4EF6\u9876\u90E8\uFF1Afinalize() \u5728 --finalize \u6A21\u5F0F\u4E0B\u4F1A\u88AB\u63D0\u524D\u8C03\u7528\uFF0C\n// \u90A3\u65F6\u4E3B\u6D41\u7A0B\u8FD8\u6CA1\u6267\u884C\u5230\uFF0C\u665A\u5B9A\u4E49\u7684\u53D8\u91CF\u4F1A\u8BA9 finalize \u5185\u90E8\u629B ReferenceError\uFF0C\n// \u88AB catch \u9759\u9ED8\u541E\u6389\uFF08\u75C7\u72B6\uFF1A\u6E90\u7801\u76EE\u5F55\u91CC\u7684\u7AD9\u540D/\u5185\u5BB9\u6458\u8981\u6CA1\u88AB\u6362\u6210\u5360\u4F4D\u503C\uFF09\u3002\nconst generatedDir = path.join(ROOT, 'src', 'lib')\n\n/**\n * \u7528\u6237\u6570\u636E\u76EE\u5F55\uFF1A\u4E0E manager.mjs \u4FDD\u6301\u540C\u4E00\u5957\u89E3\u6790\u89C4\u5219\u3002\n * \u6784\u5EFA\u4EA7\u7269\uFF08public/data\u3001public/assets\u3001out\uFF09\u4F1A\u642C\u5230\u8FD9\u91CC\u7684 build/ \u4E0B\uFF0C\n * \u8BA9\u6E90\u7801\u76EE\u5F55\uFF08\u53EF\u4EE5\u5F00\u6E90\u7684\u90A3\u4EFD\uFF09\u91CC\u4E0D\u7559\u4EFB\u4F55\u7B14\u8BB0\u5185\u5BB9\u3002\n */\nconst DATA_DIR = (() => {\n  const fromEnv = (process.env.OBSIDIAN_BLOG_DATA || '').trim()\n  if (fromEnv) return path.resolve(fromEnv)\n  const home = os.homedir() || ''\n  if (process.platform === 'win32') {\n    return path.join(process.env.APPDATA || path.join(home, 'AppData', 'Roaming'), 'obsidian-blog')\n  }\n  if (process.platform === 'darwin') {\n    return path.join(home, 'Library', 'Application Support', 'obsidian-blog')\n  }\n  return path.join(process.env.XDG_CONFIG_HOME || path.join(home, '.config'), 'obsidian-blog')\n})()\n\n/**\n * CI \u73AF\u5883\uFF08GitHub Actions \u4F1A\u81EA\u52A8\u8BBE CI=true\uFF09\u4E0B\u4E0D\u642C\u8FD0\uFF1A\n * Actions \u9700\u8981 out/ \u7559\u5728\u4ED3\u5E93\u5DE5\u4F5C\u76EE\u5F55\u91CC\u7ED9 upload-pages-artifact \u7528\uFF0C\n * \u800C\u4E14 Actions \u8FD9\u53F0\u673A\u5668\u4E0A\u672C\u6765\u5C31\u6CA1\u6709\u7528\u6237\u6570\u636E\u76EE\u5F55\u3002\n */\nconst IS_CI = !!(process.env.CI || process.env.GITHUB_ACTIONS)\n\n/**\n * \u7AD9\u540D\uFF08\u7F51\u9875\u5DE6\u4E0A\u89D2\u6807\u9898 / <title>\uFF09\u4ECE\u4ED3\u5E93\u91CC\u7684 site-name.txt \u8BFB\uFF0C\n * \u7531\u53D1\u5E03\u7BA1\u7406\u5668\u5728\u53D1\u5E03\u65F6\u5199\u5165\u5E76\u968F\u672C\u6B21\u63D0\u4EA4\u4E00\u8D77\u63A8\u4E0A\u6765\u3002\n *\n * \u8FD9\u6837\u7F51\u9875\u6807\u9898\u4E0D\u4F9D\u8D56 GitHub \u7684 Actions \u53D8\u91CF\u63A5\u53E3\uFF1A\n *   - \u63A8\u9001\u8FD9\u6761\u8DEF\u4E00\u76F4\u662F\u901A\u7684\uFF0C\u540D\u5B57\u8DDF\u7740\u4EE3\u7801\u8D70\uFF0C\u6539\u540D + \u53D1\u5E03\u5373\u53EF\u751F\u6548\uFF1B\n *   - \u4ED3\u5E93\u91CC\u770B\u5F97\u89C1\u3001\u53EF\u8FFD\u6EAF\uFF0C\u6362\u673A\u5668/\u6362\u7F51\u7EDC\u4E5F\u4E00\u6837\u3002\n * \u517C\u5BB9\u65E7\u7684 Actions \u53D8\u91CF\u65B9\u5F0F\uFF1Asite-name.txt \u4E0D\u5B58\u5728\u65F6\u56DE\u843D\u5230\n * NEXT_PUBLIC_SITE_NAME\uFF08\u5DE5\u4F5C\u6D41\u91CC\u7684 vars.SITE_NAME\uFF09\uFF0C\u4ECD\u7136\u6CA1\u6709\u624D\u7528\u300C\u7B14\u8BB0\u300D\u3002\n */\nfunction resolveSiteName() {\n  // \u672C\u5730\u6784\u5EFA\u4F18\u5148\u7528\u7528\u6237\u6570\u636E\u76EE\u5F55\u91CC\u7684\u7AD9\u540D\uFF0CCI \u53EA\u8BA4\u4ED3\u5E93\u91CC\u90A3\u4EFD\uFF08\u968F\u63D0\u4EA4\u63A8\u4E0A\u6765\u7684\uFF09\n  const candidates = IS_CI\n    ? [path.join(ROOT, 'site-name.txt')]\n    : [path.join(DATA_DIR, 'site-name.txt'), path.join(ROOT, 'site-name.txt')]\n  for (const file of candidates) {\n    try {\n      const raw = fsSync.readFileSync(file, 'utf8')\n      const name = raw.replace(/^\\uFEFF/, '').replace(/\\r\\n/g, '\\n').split('\\n')[0].trim()\n      if (name) return { name, from: 'site-name.txt' }\n    } catch {\n      /* \u6CA1\u6709\u8FD9\u4E2A\u6587\u4EF6\u5C31\u8BD5\u4E0B\u4E00\u4E2A */\n    }\n  }\n  const env = (process.env.NEXT_PUBLIC_SITE_NAME || '').trim()\n  if (env) return { name: env, from: 'NEXT_PUBLIC_SITE_NAME' }\n  return { name: '\u7B14\u8BB0', from: '\u9ED8\u8BA4\u503C' }\n}\n\nconst SKIP = ['.obsidian', '.trash', '.smart-env', '.git']\nconst ASSET_EXTS = new Set(['.png', '.jpg', '.jpeg', '.gif', '.svg', '.webp', '.bmp', '.ico', '.avif', '.pdf', '.mp3', '.wav', '.ogg', '.m4a', '.mp4', '.webm'])\n\n// ---------- \u4E0E src/lib/obsidian.ts \u4E00\u81F4\u7684\u5DE5\u5177 ----------\nconst normalize = (p) => p.replace(/\\\\/g, '/').replace(/^\\.\\//, '').replace(/^\\/+/, '')\nconst toSlug = (p) => normalize(p).replace(/\\.(md|markdown)$/i, '')\nconst basenameOf = (p) => {\n  const n = normalize(p)\n  const base = n.split('/').pop() || n\n  return base.replace(/\\.(md|markdown)$/i, '')\n}\nconst folderOf = (p) => {\n  const n = normalize(p)\n  const i = n.lastIndexOf('/')\n  return i <= 0 ? '' : n.slice(0, i)\n}\nconst headingIdOf = (text) => {\n  const id = text.replace(/#/g, '').trim().toLowerCase().replace(/\\s+/g, '-').replace(/[^\\p{L}\\p{N}\\-_]/gu, '').slice(0, 60)\n  return id || 'h'\n}\nconst titleOf = (p, data) => {\n  const t = data.title\n  return typeof t === 'string' && t.trim() ? t.trim() : basenameOf(p)\n}\nconst parseNoteDate = (data) => {\n  const raw = data.date ?? data.day ?? data.created\n  if (raw === undefined || raw === null) return null\n  const d = new Date(raw)\n  return isNaN(+d) ? null : d\n}\nconst wordCountOf = (content) => {\n  const text = content.replace(/```[\\s\\S]*?```/g, ' ').replace(/`[^`\\n]*`/g, ' ').replace(/!\\[[^\\]]*\\]\\([^)]*\\)/g, ' ').replace(/\\[\\[[^\\]]*\\]\\]/g, ' ')\n  const cjk = (text.match(/\\p{Script=Han}/gu) || []).length\n  const words = (text.match(/[A-Za-z0-9]+/g) || []).length\n  return cjk + words\n}\nconst excerptOf = (content, len = 120) => {\n  const text = content\n    .replace(/^---[\\s\\S]*?---\\n?/, '')\n    .replace(/```[\\s\\S]*?```/g, ' ')\n    .replace(/`[^`\\n]*`/g, ' ')\n    .replace(/!\\[\\[[^\\]]*\\]\\]/g, ' ')\n    .replace(/\\[\\[([^\\]|]+)\\|([^\\]]+)\\]\\]/g, '$2')\n    .replace(/\\[\\[([^\\]]+)\\]\\]/g, '$1')\n    .replace(/!\\[[^\\]]*\\]\\([^)]*\\)/g, ' ')\n    .replace(/\\[([^\\]]*)\\]\\([^)]*\\)/g, '$1')\n    .replace(/^#{1,6}\\s+/gm, '')\n    .replace(/^>\\s?\\[![^\\]]*\\]\\s?/gm, '')\n    .replace(/^>\\s?/gm, '')\n    .replace(/\\|/g, ' ')\n    .replace(/[*_~$]+/g, '')\n    .replace(/\\s+/g, ' ')\n    .trim()\n  return text.length > len ? text.slice(0, len) + '\u2026' : text\n}\n/**\n * \u5168\u6587\u641C\u7D22\u7528\u7684\u7EAF\u6587\u672C\uFF08\u4E0D\u622A\u65AD\uFF09\uFF1A\u5265\u6389 frontmatter\u3001\u56FE\u7247/\u94FE\u63A5\u8BED\u6CD5\u3001\u6807\u9898\u4E95\u53F7\u3001\n * \u5F15\u7528\u7B26\u53F7\u4E0E\u5F3A\u8C03\u6807\u8BB0\uFF0C\u4FDD\u7559\u6B63\u6587\uFF08\u542B\u516C\u5F0F\u4E0E\u4EE3\u7801\uFF0C\u65B9\u4FBF\u641C\u51FD\u6570\u540D/\u7B26\u53F7\uFF09\u3002\n * \u4E0A\u9650 20000 \u5B57\u9632\u6B62\u4E2A\u522B\u8D85\u957F\u7B14\u8BB0\u628A\u7D22\u5F15\u6491\u7206\u3002\n */\nconst searchTextOf = (content) => {\n  const text = content\n    .replace(/^---[\\s\\S]*?---\\n?/, '')\n    .replace(/!\\[\\[[^\\]]*\\]\\]/g, ' ')\n    .replace(/\\[\\[([^\\]|]+)\\|([^\\]]+)\\]\\]/g, '$2')\n    .replace(/\\[\\[([^\\]]+)\\]\\]/g, '$1')\n    .replace(/!\\[[^\\]]*\\]\\([^)]*\\)/g, ' ')\n    .replace(/\\[([^\\]]*)\\]\\([^)]*\\)/g, '$1')\n    .replace(/^ {0,3}#{1,6}\\s+/gm, '')\n    .replace(/^>\\s?\\[![^\\]]*\\]\\s?/gm, '')\n    .replace(/^>\\s?/gm, '')\n    .replace(/[*_~`#>|]+/g, ' ')\n    .replace(/\\s+/g, ' ')\n    .trim()\n  return text.slice(0, 20000)\n}\nfunction extractTags(data, content) {\n  const out = new Set()\n  const add = (v) => {\n    if (typeof v === 'string') v.split(/[,\uFF0C]/).forEach((s) => s.trim() && out.add(s.trim()))\n    else if (Array.isArray(v)) v.forEach((x) => typeof x === 'string' && x.trim() && out.add(x.trim()))\n  }\n  add(data.tags)\n  add(data.tag)\n  const plain = content\n    .replace(/```[\\s\\S]*?```/g, ' ')\n    .replace(/~~~[\\s\\S]*?~~~/g, ' ')\n    .replace(/`[^`\\n]*`/g, ' ')\n    .replace(/<[^>\\n]+>/g, ' ')\n    .replace(/\\[\\[[^\\]\\n]*\\]\\]/g, ' ')\n  for (const m of plain.matchAll(/(^|[^\\w#])#([\\p{L}\\p{N}][\\p{L}\\p{N}_/-]*)/gu)) {\n    const t = m[2]\n    if (t && !/^\\d+$/.test(t) && !/^[0-9a-fA-F]{3,8}$/.test(t)) out.add(t)\n  }\n  return [...out].slice(0, 30)\n}\n/**\n * \u4FEE\u300Cmarkdown \u94FE\u63A5\u88AB\u585E\u8FDB wikilink\u300D\u7684\u574F\u884C\uFF08\u4E0E src/lib/obsidian.ts \u7684\n * repairObsidianArtifacts \u540C\u4E00\u5B9E\u73B0\uFF09\u3002\n *\n * Obsidian \u5141\u8BB8 wikilink \u76EE\u6807\u91CC\u5E26\u6210\u5BF9\u65B9\u62EC\u53F7\uFF0C\u4F46\u65E9\u671F\u5BFC\u51FA/\u624B\u6ED1\u4F1A\u5199\u51FA\n *   ![[P8820 [CSP-S 2022] \u6570\u636E\u4F20\u8F93](https //x)](CSP-S.md#[P8820%20...](https%20//x))\n * \u8FD9\u79CD\u300C\u4E24\u5C42 markdown \u94FE\u63A5\u5957\u5728 [[ ]] \u91CC\u3001\u4E14\u6CA1\u6709\u95ED\u5408 ]]\u300D\u7684\u884C\u3002\u6309\u65B9\u62EC\u53F7\u914D\u5E73\n * \u626B\u63CF\u65F6\u5B83\u6CA1\u6709\u7ED3\u675F\u7B26\uFF0C\u6574\u6BB5\u5F15\u7528\u76F4\u63A5\u5931\u6548\u3002\u8FD9\u91CC\u53EA\u5904\u7406\u300C\u6574\u884C\u3001\u542B [[\u3001\u4E0D\u542B ]]\u300D\n * \u7684\u884C\uFF0C\u628A\u5B83\u91CD\u5199\u6210 [[\u5916\u5C42\u94FE\u63A5\u76EE\u6807|\u663E\u793A\u6587\u5B57]]\u3002\n */\nconst ARTIFACT_LINE = /^(\\s*)(!?)\\[\\[(.+?)\\]\\(([^)]*)\\)\\]\\((.+)\\)\\s*$/\nconst MD_LINK_RE = /\\[([^\\[\\]]*(?:\\[[^\\[\\]]*\\][^\\[\\]]*)*)\\]\\([^()]*\\)/g\nfunction stripMdLinks(input) {\n  let cur = input\n  let prev\n  let guard = 0\n  do {\n    prev = cur\n    cur = cur.replace(MD_LINK_RE, '$1')\n  } while (cur !== prev && ++guard < 8)\n  return cur\n}\nfunction repairObsidianArtifacts(content) {\n  if (!content.includes('[[')) return content\n  let inFence = false\n  const lines = content.split('\\n').map((line) => {\n    if (/^\\s*(```|~~~)/.test(line)) {\n      inFence = !inFence\n      return line\n    }\n    if (inFence || !line.includes('[[')) return line\n    let l = line\n    if (!l.includes(']]')) {\n      const m = ARTIFACT_LINE.exec(l)\n      if (m) {\n        const [, indent, bang, label, , target] = m\n        l = `${indent}${bang}[[${target.trim()}|${label.trim()}]]`\n      }\n    }\n    // wikilink \u5185\u90E8\u542B markdown \u94FE\u63A5\u8BED\u6CD5\u65F6\uFF0Cmdast \u89E3\u6790\u4F1A\u628A [[ \u4E0E ]] \u62C6\u6563\uFF0C\n    // \u8FD9\u91CC\u5148\u5265\u6210\u7EAF\u6587\u5B57\uFF08\u4E0E src/lib/obsidian.ts \u540C\u4E00\u5B9E\u73B0\uFF09\n    const toks = scanWikilinks(l)\n    if (toks.length === 0) return l\n    let res = ''\n    let last = 0\n    for (const tk of toks) {\n      res += l.slice(last, tk.start)\n      res += (tk.isEmbed ? '!' : '') + '[[' + stripMdLinks(tk.inner) + ']]'\n      last = tk.end\n    }\n    return res + l.slice(last)\n  })\n  return lines.join('\\n')\n}\n\n/**\n * \u6309\u65B9\u62EC\u53F7\u914D\u5E73\u626B\u63CF wikilink\uFF08\u4E0E src/lib/obsidian.ts \u7684 scanWikilinks \u540C\u4E00\u89C4\u5219\uFF09\u3002\n * \u4E0D\u80FD\u7528 /\\[\\[([^\\][\\n]+?)\\]\\]/ \u8FD9\u79CD\u6734\u7D20\u6B63\u5219\uFF1A\u672C\u5E93\u5B58\u5728\u76EE\u6807\u91CC\u5E26\u6210\u5BF9\u65B9\u62EC\u53F7\u7684\n * wikilink\uFF08\u6807\u9898\u672C\u8EAB\u5C31\u662F markdown \u94FE\u63A5\uFF09\uFF0C\u6734\u7D20\u6B63\u5219\u4F1A\u6F0F\u6389\u6216\u622A\u65AD\u5B83\u4EEC\u3002\n */\nfunction scanWikilinks(text) {\n  const out = []\n  for (let i = 0; i < text.length; i++) {\n    const isEmbed = text[i] === '!' && text[i + 1] === '[' && text[i + 2] === '['\n    const start = isEmbed ? i + 1 : i\n    if (text[start] !== '[' || text[start + 1] !== '[') continue\n    let j = start + 2\n    let depth = 0\n    let inner = ''\n    while (j < text.length) {\n      const ch = text[j]\n      if (ch === '\\\\') {\n        inner += text[j + 1] ?? ''\n        j += 2\n        continue\n      }\n      if (ch === '\\n') break\n      if (ch === '[') depth++\n      else if (ch === ']') {\n        if (depth === 0 && text[j + 1] === ']') {\n          out.push({ start: i, end: j + 2, isEmbed, inner })\n          i = j + 1\n          break\n        }\n        if (depth > 0) depth--\n      }\n      inner += ch\n      j++\n    }\n  }\n  return out\n}\n\nfunction extractWikiRefs(raw) {\n  const all = []\n  const embeds = []\n  const links = []\n  for (const tk of scanWikilinks(repairObsidianArtifacts(raw))) {\n    all.push(tk.inner)\n    ;(tk.isEmbed ? embeds : links).push(tk.inner)\n  }\n  return { all, embeds, links }\n}\nfunction extractMdImagePaths(raw) {\n  const out = []\n  for (const m of raw.matchAll(/!\\[[^\\]]*\\]\\(([^)\\s]+)(?:\\s+\"[^\"]*\")?\\)/g)) {\n    let p = m[1] || ''\n    try { p = decodeURIComponent(p) } catch { /* \u4FDD\u7559\u539F\u503C */ }\n    if (p && !/^(https?:|data:|mailto:)/i.test(p)) out.push(normalize(p))\n  }\n  return out\n}\nfunction parseWikilink(link) {\n  let s = link.trim()\n  let alias = null\n  const bi = s.indexOf('|')\n  if (bi >= 0) {\n    alias = s.slice(bi + 1).trim() || null\n    s = s.slice(0, bi)\n  }\n  let heading = ''\n  const hi = s.indexOf('#')\n  if (hi >= 0) {\n    heading = s.slice(hi)\n    s = s.slice(0, hi)\n  }\n  s = normalize(s.replace(/\\.(md|markdown)$/i, ''))\n  return { target: s, heading, alias }\n}\nconst refSlugOf = (link) => parseWikilink(link).target || '#unresolved'\n\nfunction walk(dir, out = []) {\n  let entries\n  try {\n    entries = fsSync.readdirSync(dir, { withFileTypes: true })\n  } catch {\n    return out\n  }\n  for (const e of entries) {\n    const abs = path.join(dir, e.name)\n    if (e.isDirectory()) {\n      if (SKIP.includes(e.name)) continue\n      walk(abs, out)\n    } else if (e.isFile()) {\n      out.push(path.relative(CONTENT, abs).replace(/\\\\/g, '/'))\n    }\n  }\n  return out\n}\n\nconst slugFile = (slug) => Buffer.from(slug, 'utf8').toString('base64url')\n\n// ---------- \u4E3B\u6D41\u7A0B ----------\n// --finalize \u53EA\u505A\u300C\u628A\u4EA7\u7269\u642C\u51FA\u6E90\u7801\u76EE\u5F55\u300D\uFF0C\u4E0D\u9700\u8981\u91CD\u65B0\u751F\u6210\u4E00\u904D\u5185\u5BB9\uFF1A\n// \u4E3B\u6D41\u7A0B\u5728\u6B64\u76F4\u63A5\u8DF3\u8FC7\uFF0C\u672B\u5C3E\u518D\u6267\u884C finalize()\u3002\nconst FINALIZE_ONLY = process.argv.includes('--finalize')\n// .markdown \u4E0E .md \u662F\u540C\u4E00\u7C7B\u7B14\u8BB0\uFF08Obsidian \u4E24\u79CD\u6269\u5C55\u540D\u90FD\u8BA4\uFF09\uFF0C\u8FD9\u91CC\u5FC5\u987B\u4E00\u81F4\uFF0C\n// \u5426\u5219 toSlug() \u63A5\u53D7\u7684 .markdown \u4F1A\u5728\u66F4\u65E9\u4E00\u6B65\u88AB\u4E22\u6389\u3002\nconst isPublicMd = (p) => /\\.(md|markdown)$/i.test(p)\n\n/**\n * \u53D1\u5E03\u65F6\u5199\u5165\u7684\u300C\u672C\u5730\u7B14\u8BB0\u65F6\u95F4\u300D\u6E05\u5355\uFF08content/.blog-meta.json\uFF09\u3002\n *\n * \u4E3A\u4EC0\u4E48\u9700\u8981\uFF1Agit \u4E0D\u4FDD\u5B58\u6587\u4EF6 mtime\uFF0CCI \u5168\u65B0 checkout \u540E\u6BCF\u7BC7\u7B14\u8BB0\u7684 mtime\n * \u90FD\u662F checkout \u90A3\u4E00\u523B\uFF0C\u4E8E\u662F\u7EBF\u4E0A\u6240\u6709\u7B14\u8BB0\u7684\u65E5\u671F\u90FD\u53D8\u6210\u90E8\u7F72\u65E5\u3001\u6392\u5E8F\u4E5F\u5168\u4E71\u3002\n * \u53D1\u5E03\u65F6\u95F4\u5728\u7528\u6237\u672C\u673A\uFF0C\u80FD\u8BFB\u5230\u771F\u5B9E mtime/birthtime\uFF0C\u6240\u4EE5\u7531\u53D1\u5E03\u7BA1\u7406\u5668\u628A\u5B83\u4EEC\n * \u8BB0\u4E0B\u6765\u968F content/ \u4E00\u8D77\u63D0\u4EA4\uFF0C\u6784\u5EFA\u65F6\u4F18\u5148\u7528\u8FD9\u4EFD\u6E05\u5355\u3002\n */\nconst META_FILE = path.join(CONTENT, '.blog-meta.json')\nlet noteMeta = {}\ntry {\n  const j = JSON.parse(fsSync.readFileSync(META_FILE, 'utf8'))\n  if (j && j.notes && typeof j.notes === 'object') noteMeta = j.notes\n} catch {\n  /* \u6CA1\u6709\u6E05\u5355\uFF08\u9996\u6B21\u53D1\u5E03\u524D / \u8001\u4ED3\u5E93\uFF09\uFF1A\u56DE\u843D\u5230\u6587\u4EF6 stat */\n}\nconst metaOf = (rel) => {\n  const m = noteMeta[normalize(rel)]\n  return m && typeof m === 'object' ? m : {}\n}\n\nif (FINALIZE_ONLY) {\n  await finalize()\n  process.exit(0)\n}\n\nconst rels = fsSync.existsSync(CONTENT) ? walk(CONTENT) : []\nif (rels.length === 0) {\n  console.log('[build-content] content/ \u4E3A\u7A7A\uFF1A\u5148\u8FD0\u884C\u53D1\u5E03\u7BA1\u7406\u5668\uFF08npm run manage\uFF09\u63A8\u9001\u516C\u5F00\u7B14\u8BB0')\n}\n\nconst mdRels = rels.filter(isPublicMd)\nconst assetRels = rels.filter((p) => !isPublicMd(p) && ASSET_EXTS.has(path.extname(p).toLowerCase()))\n\n// \u6CA1\u6709\u4EFB\u4F55\u516C\u5F00\u7B14\u8BB0\u65F6**\u62D2\u7EDD\u6784\u5EFA**\uFF1A\u5386\u53F2\u4E0A\u771F\u7684\u53D1\u751F\u8FC7 CI \u7EFF\u706F\u53D1\u5E03\u51FA\u4E00\u4E2A\u7A7A\u7AD9\u70B9\n// \uFF08content/ \u4ECE\u672A\u586B\u5145\uFF0C\u6784\u5EFA\u7167\u5E38 exit 0\uFF09\u3002\u7A7A\u7AD9\u70B9\u6BD4\u6784\u5EFA\u5931\u8D25\u66F4\u96BE\u53D1\u73B0\u3002\nif (mdRels.length === 0) {\n  console.error(\n    '[build-content] content/ \u91CC\u6CA1\u6709\u4EFB\u4F55\u516C\u5F00\u7B14\u8BB0 \u2014\u2014 \u62D2\u7EDD\u6784\u5EFA\u7A7A\u7AD9\u70B9\u3002' +\n      '\u5148\u8FD0\u884C\u53D1\u5E03\u7BA1\u7406\u5668\uFF08npm run manage\uFF09\u628A\u7B14\u8BB0\u6807\u4E3A\u516C\u5F00\u5E76\u53D1\u5E03\uFF1B\u786E\u5B9E\u8981\u6784\u5EFA\u7A7A\u7AD9\u8BF7\u8BBE ALLOW_EMPTY=1\u3002'\n  )\n  if (!process.env.ALLOW_EMPTY) process.exit(1)\n}\n\n// \u9644\u4EF6\u76EE\u5F55\u6BCF\u6B21\u5168\u91CF\u91CD\u5EFA\uFF1A\u4E0D\u6E05\u6389\u4E0A\u4E00\u6B21\u7684\u9644\u4EF6\uFF0C\u53D6\u6D88\u5F15\u7528\u7684\u65E7\u56FE\u4F1A\u4E00\u76F4\u7559\u5728\u4EA7\u7269\u91CC\u3002\nawait fs.rm(path.join(PUBLIC, 'assets'), { recursive: true, force: true })\n\n// \u9644\u4EF6\u62F7\u8D1D\u5230 public/assets/<\u76F8\u5BF9\u8DEF\u5F84>\nfor (const rel of assetRels) {\n  const dest = path.join(PUBLIC, 'assets', rel)\n  await fs.mkdir(path.dirname(dest), { recursive: true })\n  await fs.copyFile(path.join(CONTENT, rel), dest)\n}\n\n// \u89E3\u6790\u7B14\u8BB0\nconst notes = []\nconst seenSlugs = new Set()\nfor (const rel of mdRels) {\n  const abs = path.join(CONTENT, rel)\n  const raw = await fs.readFile(abs, 'utf8')\n  let data, content\n  try {\n    ;({ data, content } = matter(raw))\n  } catch (e) {\n    // \u5355\u7BC7 frontmatter \u574F\u4E86\u4E0D\u8BE5\u8BA9\u6574\u6B21\u6784\u5EFA\u5931\u8D25\uFF08\u5426\u5219 --finalize \u4E0D\u4F1A\u6267\u884C\uFF0C\n    // \u6E90\u7801\u76EE\u5F55\u4F1A\u6B8B\u7559\u7B14\u8BB0\u6B63\u6587\uFF09\u3002\u8DF3\u8FC7\u5E76\u5927\u58F0\u62A5\u51FA\u6765\u3002\n    console.warn(`[build-content] \u8DF3\u8FC7 ${rel}\uFF1Afrontmatter \u89E3\u6790\u5931\u8D25\uFF08${e.message}\uFF09`)\n    continue\n  }\n  // \u6B63\u6587\u91CC\u7684\u574F wikilink \u884C\u5148\u4FEE\u597D\uFF1A\u6458\u8981 / \u5B57\u6570 / \u641C\u7D22\u6B63\u6587 / \u51FA\u94FE\u90FD\u7528\u8FD9\u4EFD\u4FEE\u597D\u7684\u6587\u672C\n  // \uFF08\u6E32\u67D3\u7AEF parseNote \u4E5F\u4F1A\u4FEE\uFF0C\u90A3\u91CC\u670D\u52A1\u7684\u662F\u672A\u4FEE\u7684\u539F\u7A3F raw\uFF0C\u4E24\u8FB9\u7ED3\u679C\u4E00\u81F4\uFF09\n  content = repairObsidianArtifacts(content)\n  const slug = toSlug(rel)\n  if (seenSlugs.has(slug)) {\n    // a.md \u4E0E a.markdown \u4F1A\u649E\u6210\u540C\u4E00\u4E2A slug\uFF0C\u540E\u8005\u8986\u76D6\u524D\u8005\n    console.warn(`[build-content] \u8DF3\u8FC7 ${rel}\uFF1Aslug\u300C${slug}\u300D\u5DF2\u88AB\u5360\u7528\uFF08.md / .markdown \u540C\u540D\uFF09`)\n    continue\n  }\n  seenSlugs.add(slug)\n  const meta = metaOf(rel)\n  const st = await fs.stat(abs)\n  const mtime = meta.mtime ? new Date(meta.mtime) : st.mtime\n  // \u7B14\u8BB0\u65E5\u671F\uFF1Afrontmatter \u663E\u5F0F\u58F0\u660E\u4F18\u5148\uFF0C\u5426\u5219\u7528**\u6700\u540E\u4FEE\u6539\u65F6\u95F4**\u3002\n  // \u4E0D\u7528 birthtime\uFF1A\u7B14\u8BB0\u901A\u5E38\u662F\u6574\u5E93\u62F7\u8FDB vault \u7684\uFF0Cbirthtime \u5168\u90E8\u7B49\u4E8E\u62F7\u8D1D\u90A3\u4E00\u523B\n  // \uFF08\u5B9E\u6D4B 116 \u7BC7\u5168\u843D\u5728\u540C\u4E00\u5929\uFF09\uFF0C\u62FF\u5B83\u5F53\u65E5\u671F\u7B49\u4E8E\u53C8\u56DE\u5230\u300C\u6240\u6709\u7B14\u8BB0\u65E5\u671F\u90FD\u4E00\u6837\u300D\u3002\n  const date = parseNoteDate(data) ?? mtime\n  notes.push({\n    slug,\n    path: normalize(rel),\n    title: titleOf(rel, data),\n    folder: folderOf(rel),\n    raw,\n    content,\n    frontmatter: data ?? {},\n    tags: extractTags(data, content),\n    isPublic: true,\n    wordCount: wordCountOf(content),\n    noteDate: isNaN(+date) ? null : date.toISOString(),\n    updatedAt: mtime.toISOString(),\n    excerpt: excerptOf(content, 120),\n    searchText: searchTextOf(content),\n  })\n}\nnotes.sort((a, b) => b.updatedAt.localeCompare(a.updatedAt))\n\n// \u53CC\u94FE/\u51FA\u94FE\u89E3\u6790\uFF08\u6700\u77ED\u8DEF\u5F84\u5339\u914D\uFF0C\u4E0E\u5168\u6808\u7248\u4E00\u81F4\uFF09\nconst bySlug = new Map()\nconst byBasename = new Map()\nfor (const n of notes) {\n  bySlug.set(n.slug, n)\n  const base = basenameOf(n.path)\n  ;(byBasename.get(base) ?? byBasename.set(base, []).get(base)).push(n)\n}\nfunction resolveNote(target) {\n  if (!target) return null\n  const direct = bySlug.get(target)\n  if (direct) return direct\n  const base = target.split('/').pop() || target\n  const arr = byBasename.get(base)\n  if (!arr || arr.length === 0) return null\n  return [...arr].sort((a, b) => a.path.length - b.path.length)[0]\n}\n\nconst refRows = new Map() // sourceSlug -> Set<targetSlug>\nconst linkIndexAssets = assetRels.slice()\nconst assetSet = new Set(linkIndexAssets.map((p) => normalize(p)))\n\n/** \u5D4C\u5165\u76EE\u6807 \u2192 \u9644\u4EF6\u8DEF\u5F84\u3002\u4E0E src/lib/obsidian.ts \u7684 resolveEmbedPath \u4FDD\u6301\u540C\u4E00\u5957\u89C4\u5219\uFF1A\n *  \u7CBE\u786E\u8DEF\u5F84 \u2192 \u8865\u5168\u6269\u5C55\u540D \u2192 \u7CBE\u786E\u6587\u4EF6\u540D \u2192 \u4EFB\u610F\u76EE\u5F55\u4E0B\u540C\u540D\uFF08\u5927\u5C0F\u5199\u4E0D\u654F\u611F\uFF09\u3002 */\nfunction resolveAsset(target, assets) {\n  const t = normalize(target)\n  if (!t) return null\n  const exts = [...ASSET_EXTS]\n  const hasExt = (p) => {\n    const i = p.lastIndexOf('.')\n    return i >= 0 && ASSET_EXTS.has(p.slice(i).toLowerCase())\n  }\n  const candidates = [t]\n  if (!hasExt(t)) for (const e of exts) candidates.push(t + e)\n  const base = t.split('/').pop() || t\n  if (base !== t) {\n    candidates.push(base)\n    if (!hasExt(base)) for (const e of exts) candidates.push(base + e)\n  }\n  for (const c of candidates) if (assets.has(c)) return c\n  const lowered = candidates.map((c) => c.toLowerCase())\n  for (const p of assets) {\n    const pl = p.toLowerCase()\n    for (const c of lowered) if (pl === c || pl.endsWith('/' + c)) return p\n  }\n  return null\n}\n\nfor (const n of notes) {\n  const { links, embeds } = extractWikiRefs(n.raw)\n  const targets = []\n  for (const link of links) {\n    const { target } = parseWikilink(link)\n    if (target) targets.push(target)\n  }\n  for (const emb of embeds) {\n    const { target } = parseWikilink(emb)\n    if (!target) continue\n    // \u5D4C\u5165\u89E3\u6790\uFF1A\u9644\u4EF6\u4F18\u5148\uFF08\u4E0D\u7B97\u51FA\u94FE\uFF09\uFF0C\u89E3\u6790\u5230\u7B14\u8BB0\u7684\u7B97\u51FA\u94FE\u3002\n    // \u5FC5\u987B\u4E0E\u524D\u7AEF src/lib/obsidian.ts \u7684 resolveEmbedPath \u7528\u540C\u4E00\u5957\u89C4\u5219\uFF0C\n    // \u5426\u5219 ![[diagram]]\uFF08\u7701\u7565\u6269\u5C55\u540D\uFF09\u5728\u9875\u9762\u4E0A\u80FD\u663E\u793A\u6210\u56FE\uFF0C\u6784\u5EFA\u5374\u628A\u5B83\u8BB0\u6210\u7B14\u8BB0\u51FA\u94FE\uFF0C\n    // \u4E8E\u662F\u53CD\u94FE\u533A\u5192\u51FA\u4E00\u6761\u5047\u7684\u300C\u672A\u521B\u5EFA\u300D\u3002\n    if (resolveAsset(target, assetSet)) continue\n    targets.push(target)\n  }\n  const slugs = new Set()\n  for (const target of targets) {\n    const note = resolveNote(target)\n    slugs.add(note ? note.slug : refSlugOf(target))\n  }\n  refRows.set(n.slug, slugs)\n}\n\nconst byTitle = new Map(notes.map((n) => [n.slug, n]))\nfunction refItem(slug) {\n  const n = byTitle.get(slug)\n  return { slug, title: n ? n.title : slug, folder: n ? n.folder : '', isPublic: !!n, resolved: !!n }\n}\n\n// \u751F\u6210\u6570\u636E\u6587\u4EF6\nawait fs.rm(path.join(PUBLIC, 'data'), { recursive: true, force: true })\nawait fs.mkdir(path.join(PUBLIC, 'data', 'notes'), { recursive: true })\n\nconst indexNotes = []\nfor (const n of notes) {\n  const outlinks = [...(refRows.get(n.slug) ?? [])].map(refItem)\n  const backlinks = notes\n    .filter((other) => other.slug !== n.slug && (refRows.get(other.slug) ?? new Set()).has(n.slug))\n    .map((other) => refItem(other.slug))\n  const file = {\n    note: {\n      slug: n.slug,\n      path: n.path,\n      title: n.title,\n      folder: n.folder,\n      raw: n.raw,\n      content: n.content,\n      frontmatter: n.frontmatter,\n      tags: n.tags,\n      isPublic: true,\n      wordCount: n.wordCount,\n      noteDate: n.noteDate,\n      updatedAt: n.updatedAt,\n    },\n    backlinks,\n    outlinks,\n  }\n  const name = slugFile(n.slug) + '.json'\n  await fs.writeFile(path.join(PUBLIC, 'data', 'notes', name), JSON.stringify(file))\n  indexNotes.push({\n    slug: n.slug,\n    path: n.path,\n    title: n.title,\n    folder: n.folder,\n    tags: n.tags,\n    isPublic: true,\n    wordCount: n.wordCount,\n    noteDate: n.noteDate,\n    updatedAt: n.updatedAt,\n    excerpt: n.excerpt,\n    linkCount: outlinks.length,\n  })\n}\n\n/**\n * \u76EE\u5F55\u6811\uFF1A\u9996\u9875\u300C\u9010\u5C42\u4E0B\u94BB\u300D\u8981\u77E5\u9053\u300C\u5F53\u524D\u6587\u4EF6\u5939\u4E0B\u6709\u54EA\u4E9B\u5B50\u6587\u4EF6\u5939\u3001\u5404\u6709\u591A\u5C11\u7BC7\u300D\u3002\n *\n * \u53EA\u4ECE\u5DF2\u5BFC\u51FA\u7684\u7B14\u8BB0\u63A8\u5BFC\uFF08indexNotes \u91CC\u5168\u662F\u516C\u5F00\u7B14\u8BB0\uFF09\uFF0C\u79C1\u5BC6\u7B14\u8BB0\u7684\u76EE\u5F55\u540D\u4E0D\u8BE5\u51FA\u73B0\u5728\n * \u7AD9\u70B9\u5BFC\u822A\u91CC\u3002folder \u672C\u8EAB\u662F\u6241\u5E73\u5B57\u7B26\u4E32\uFF08`\u6BD4\u8D5B/NOI \u7CFB\u5217`\uFF09\uFF0C\u8FD9\u91CC\u6309 `/` \u62C6\u5F00\u9010\u7EA7\u5EFA\u8282\u70B9\u3002\n *\n * directCount = \u76F4\u63A5\u653E\u5728\u8BE5\u6587\u4EF6\u5939\u91CC\u7684\u7BC7\u6570\uFF1BtotalCount = \u542B\u6240\u6709\u5B50\u5B59\u7684\u5408\u8BA1\u3002\n */\nfunction buildFolderTree(items) {\n  const root = { path: '', name: '', directCount: 0, totalCount: 0, children: new Map() }\n  for (const it of items) {\n    const f = it.folder || ''\n    root.totalCount += 1\n    if (!f) {\n      root.directCount += 1\n      continue\n    }\n    const parts = f.split('/')\n    let cur = root\n    for (let i = 0; i < parts.length; i += 1) {\n      const name = parts[i]\n      let node = cur.children.get(name)\n      if (!node) {\n        node = {\n          path: parts.slice(0, i + 1).join('/'),\n          name,\n          directCount: 0,\n          totalCount: 0,\n          children: new Map(),\n        }\n        cur.children.set(name, node)\n      }\n      node.totalCount += 1\n      cur = node\n    }\n    cur.directCount += 1\n  }\n  const toArray = (node) =>\n    [...node.children.values()]\n      .sort((a, b) => (a.name < b.name ? -1 : a.name > b.name ? 1 : 0))\n      .map((c) => ({\n        path: c.path,\n        name: c.name,\n        directCount: c.directCount,\n        totalCount: c.totalCount,\n        children: toArray(c),\n      }))\n  return toArray(root)\n}\n\nconst folderTree = buildFolderTree(indexNotes)\n\n// \u53D1\u5E03\u6807\u8BB0\uFF1A\u628A\u300C\u672C\u6B21\u6784\u5EFA\u7684\u6570\u636E\u300D\u7ED1\u5B9A\u5230\u4E00\u4E2A\u552F\u4E00 URL \u53C2\u6570\u4E0A\uFF0C\n// \u8BA9\u6D4F\u89C8\u5668\u4E0D\u53EF\u80FD\u590D\u7528\u4E0A\u4E00\u7248 /data/*.json \u7684\u7F13\u5B58\uFF08GitHub Pages \u7684 max-age=600\n// \u4F1A\u5BFC\u81F4\u53D6\u6D88\u516C\u5F00\u540E 10 \u5206\u949F\u5185\u4ECD\u80FD\u770B\u5230\u65E7\u5185\u5BB9\uFF09\u3002\n//\n// \u6CE8\u610F\uFF1A\u4E0D\u80FD\u7528 `process.env.NEXT_PUBLIC_*` \u2014\u2014 \u672C\u811A\u672C\u4E0E `next build` \u662F**\u4E24\u4E2A\u8FDB\u7A0B**\n// \uFF08package.json: \"build\": \"node scripts/build-content.mjs && next build\"\uFF09\uFF0C\n// \u5728\u8FD9\u91CC\u8BBE\u7F6E env \u4E0D\u4F1A\u88AB next build \u770B\u5230\uFF0CNext \u4E5F\u5C31\u4E0D\u4F1A\u505A\u6784\u5EFA\u671F\u5E38\u91CF\u66FF\u6362\uFF0C\n// \u5BA2\u6237\u7AEF\u53EA\u4F1A\u62FF\u5230\u4E00\u4E2A\u8FD0\u884C\u65F6 undefined\u3002\u6539\u4E3A\u76F4\u63A5\u751F\u6210\u4E00\u4E2A\u6E90\u6587\u4EF6\u4F9B\u524D\u7AEF import\u3002\n//\n// \u6807\u8BB0\u7531**\u5185\u5BB9\u6458\u8981**\u5F97\u51FA\uFF08\u800C\u4E0D\u662F\u65F6\u95F4\u6233\uFF09\uFF1A\u5185\u5BB9\u6CA1\u53D8\u5219\u6807\u8BB0\u4E0D\u53D8\uFF0C\n// \u8BBF\u5BA2\u53EF\u7EE7\u7EED\u7528\u7F13\u5B58\uFF1B\u5185\u5BB9\u4E00\u53D8\u5219\u6807\u8BB0\u7ACB\u523B\u6539\u53D8\uFF0C\u65E7\u7F13\u5B58\u6574\u4F53\u5931\u6548\u3002\nconst payload = JSON.stringify({ notes: indexNotes, assets: linkIndexAssets })\nconst releaseTag = createHash('sha256').update(payload).digest('hex').slice(0, 12)\n\nawait fs.writeFile(\n  path.join(PUBLIC, 'data', 'index.json'),\n  JSON.stringify({\n    notes: indexNotes,\n    assets: linkIndexAssets,\n    // \u76EE\u5F55\u6811\uFF08\u7531 notes[].folder \u63A8\u5BFC\uFF09\uFF1A\u9996\u9875\u9010\u5C42\u4E0B\u94BB\u7528\u5B83\u5217\u5B50\u6587\u4EF6\u5939\u4E0E\u7BC7\u6570\uFF0C\n    // \u4E0D\u7528\u6BCF\u6B21\u904D\u5386\u5168\u90E8\u7B14\u8BB0\u73B0\u7B97\uFF0C\u4E5F\u80FD\u8868\u8FBE\u300C\u81EA\u5DF1\u6CA1\u7B14\u8BB0\u3001\u53EA\u6709\u5B50\u76EE\u5F55\u300D\u7684\u5BB9\u5668\u76EE\u5F55\u3002\n    folders: folderTree,\n    // \u628A\u53D1\u5E03\u6807\u8BB0\u4E5F\u5199\u8FDB\u7D22\u5F15\uFF1A\u524D\u7AEF\u7684 HTML/JS \u4F1A\u88AB GitHub Pages \u7F13\u5B58 10 \u5206\u949F\uFF0C\n    // \u65E7\u9875\u9762\u91CC\u7684 RELEASE_TAG \u662F\u65E7\u7684\uFF1B\u53EA\u6709\u4ECE\u300C\u521A\u62C9\u4E0B\u6765\u7684\u7D22\u5F15\u300D\u91CC\u8BFB\u5230\u65B0\u6807\u8BB0\uFF0C\n    // \u624D\u80FD\u7ACB\u523B\u6309\u65B0\u6807\u8BB0\u53BB\u53D6\u7B14\u8BB0\uFF0C\u4E0D\u7528\u7B49\u7F13\u5B58\u8FC7\u671F\u3002\n    releaseTag,\n    // Actions \u4F1A\u7ED9\u6BCF\u4E2A\u6B65\u9AA4\u81EA\u52A8\u6CE8\u5165 GITHUB_SHA\uFF0C\u4E0D\u9700\u8981\u6539 workflow\u3002\n    // \u53D1\u5E03\u7BA1\u7406\u5668\u7528\u5B83\u5224\u65AD\u300C\u7EBF\u4E0A\u8FD9\u4E00\u7248\u662F\u4E0D\u662F\u6211\u521A\u63A8\u7684\u90A3\u6B21\u63D0\u4EA4\u300D\uFF0C\u6BD4\u6BD4\u65F6\u95F4\u66F4\u51C6\uFF08\u4E0D\u53D7\u672C\u673A\u65F6\u949F\u5F71\u54CD\uFF09\u3002\n    commit: process.env.GITHUB_SHA || '',\n    generatedAt: new Date().toISOString(),\n  })\n)\n\n// \u5168\u6587\u641C\u7D22\u7D22\u5F15\uFF1Aslug \u2192 \u7EAF\u6587\u672C\u3002\u9996\u9875\u641C\u7D22\u6846\u6309\u9700\u61D2\u52A0\u8F7D\uFF08\u53EA\u6709\u771F\u7684\u8F93\u5165\u65F6\u624D\u62C9\uFF09\uFF0C\n// \u8FD9\u6837\u300C\u641C\u7D22\u6807\u9898\u3001\u6B63\u6587\u3001\u8DEF\u5F84\u3001\u6807\u7B7E\u300D\u624D\u540D\u526F\u5176\u5B9E \u2014\u2014 \u539F\u5148\u53EA\u5339\u914D 120 \u5B57\u6458\u8981\u3002\nconst searchNotes = {}\nfor (const n of notes) searchNotes[n.slug] = n.searchText\nawait fs.writeFile(\n  path.join(PUBLIC, 'data', 'search.json'),\n  JSON.stringify({ v: 1, notes: searchNotes })\n)\n\nawait fs.mkdir(generatedDir, { recursive: true })\nawait fs.writeFile(\n  path.join(generatedDir, 'release-tag.ts'),\n  [\n    '// \u672C\u6587\u4EF6\u7531 scripts/build-content.mjs \u81EA\u52A8\u751F\u6210\uFF0C\u8BF7\u52FF\u624B\u6539\u3002',\n    '// \u503C\u4E3A\u7B14\u8BB0\u6570\u636E\u7684\u5185\u5BB9\u6458\u8981\uFF0C\u7528\u4F5C /data/*.json \u8BF7\u6C42\u4E0A\u7684 ?v= \u53C2\u6570\uFF0C',\n    '// \u7ED5\u5F00 GitHub Pages \u7684 max-age=600 \u7F13\u5B58\uFF08\u5426\u5219\u53D6\u6D88\u516C\u5F00\u540E\u65E7\u5185\u5BB9\u4ECD\u53EF\u89C1\uFF09\u3002',\n    '// \u5185\u5BB9\u672A\u53D8\u65F6\u8BE5\u503C\u4E0D\u53D8\uFF0C\u8BBF\u5BA2\u53EF\u7EE7\u7EED\u547D\u4E2D\u7F13\u5B58\u3002',\n    `export const RELEASE_TAG = '${releaseTag}'`,\n    '',\n  ].join('\\n')\n)\n\n// \u7AD9\u540D\u540C\u6837\u8981\u4F20\u7ED9 `next build` \u90A3\u4E2A\u8FDB\u7A0B\uFF0C\u505A\u6CD5\u4E0E release-tag \u4E00\u81F4\uFF1A\n// \u751F\u6210\u4E00\u4E2A\u6E90\u6587\u4EF6\u4F9B\u524D\u7AEF import\uFF08\u672C\u811A\u672C\u8BBE\u7F6E env \u4E0D\u4F1A\u88AB next build \u770B\u5230\uFF09\u3002\nconst siteName = resolveSiteName()\nawait fs.writeFile(\n  path.join(generatedDir, 'site-name.generated.ts'),\n  [\n    '// \u672C\u6587\u4EF6\u7531 scripts/build-content.mjs \u81EA\u52A8\u751F\u6210\uFF0C\u8BF7\u52FF\u624B\u6539\u3002',\n    '// \u503C\u6765\u81EA\u4ED3\u5E93\u6839\u76EE\u5F55\u7684 site-name.txt\uFF08\u53D1\u5E03\u7BA1\u7406\u5668\u5728\u53D1\u5E03\u65F6\u5199\u5165\uFF09\u3002',\n    '// \u6539\u7AD9\u540D\u8BF7\u7528\u53D1\u5E03\u7BA1\u7406\u5668\uFF0C\u6216\u76F4\u63A5\u6539 site-name.txt \u540E\u91CD\u65B0\u53D1\u5E03\u3002',\n    `export const SITE_NAME = ${JSON.stringify(siteName.name)}`,\n    '',\n  ].join('\\n')\n)\n\n/**\n * \u7528\u6237\u81EA\u5B9A\u4E49\u5916\u89C2\uFF08public/theme.css\uFF09\u2192 src/lib/theme.generated.ts\n *\n * theme.css \u662F\u300C\u5E93\u4E3B\u4EBA\u81EA\u5DF1\u5728\u7BA1\u7406\u5668\u91CC\u7C98\u8D34\u7684 CSS\u300D\uFF0C\u5C5E\u4E8E\u5185\u5BB9\u800C\u4E0D\u662F\u6E90\u7801\uFF1A\n * \u5B83\u653E\u5728 public/ \u4E0B\uFF0C\u968F\u4ED3\u5E93\u63D0\u4EA4\uFF0CNext \u7684 output:'export' \u4F1A\u628A\u5B83\u539F\u6837\u62F7\u8FDB out/\u3002\n *\n * \u8FD9\u91CC\u53EA\u505A\u4E24\u4EF6\u4E8B\uFF1A\n *   \u2460 \u8BB0\u5F55\u5B83\u5230\u5E95\u5B58\u4E0D\u5B58\u5728 \u2014\u2014 \u4E0D\u5B58\u5728\u65F6 layout \u5C31\u4E0D\u8F93\u51FA <link>\uFF0C\u514D\u5F97\u6BCF\u6B21\u8BBF\u95EE\u90FD\u7559\u4E00\u4E2A 404\uFF1B\n *   \u2461 \u7B97\u4E00\u4E2A\u5185\u5BB9\u54C8\u5E0C \u2014\u2014 \u6587\u4EF6\u540D\u53EB theme.css \u4E0D\u53D8\uFF0C\u800C GitHub Pages \u5BF9\u9759\u6001\u8D44\u6E90\u6709\n *      max-age=600\uFF0C\u4E0D\u6362 URL \u7684\u8BDD\u7528\u6237\u6539\u5B8C CSS \u8981\u7B49\u5341\u5206\u949F\u624D\u751F\u6548\uFF08\u4F1A\u4EE5\u4E3A\u6CA1\u4FDD\u5B58\u4E0A\uFF09\u3002\n *      \u505A\u6CD5\u4E0E /data/*.json \u7684 ?v=RELEASE_TAG \u4E00\u81F4\u3002\n *\n * \u6CE8\u610F\uFF1A\u672C\u51FD\u6570\u5FC5\u987B\u5728 CI \u4E0E\u672C\u5730\u90FD\u80FD\u5DE5\u4F5C\u3002CI \u4E0A public/theme.css \u6765\u81EA\u4ED3\u5E93\uFF0C\n * \u672C\u5730\u6E90\u7801\u76EE\u5F55\u91CC\u901A\u5E38\u6CA1\u6709\uFF08\u5B83\u5728\u5DE5\u4F5C\u526F\u672C repos/<id>/ \u91CC\uFF09\uFF0C\u6B64\u65F6\u6309\u300C\u65E0\u81EA\u5B9A\u4E49\u5916\u89C2\u300D\u5904\u7406\u3002\n */\nfunction resolveThemeCss() {\n  const file = path.join(PUBLIC, 'theme.css')\n  try {\n    const raw = fsSync.readFileSync(file, 'utf8')\n    // \u5168\u662F\u7A7A\u767D/\u6CE8\u91CA\u7B49\u4E8E\u6CA1\u5199\uFF1A\u4E0D\u8981\u4E3A\u4E86\u4E00\u4E2A\u7A7A\u6587\u4EF6\u53BB\u6539 URL\uFF0C\u4E5F\u4E0D\u8981\u8F93\u51FA\u7A7A\u7684 <link>\n    const effective = raw.replace(/\\/\\*[\\s\\S]*?\\*\\//g, '').trim()\n    if (!effective) return { exists: false, version: '', bytes: 0 }\n    const version = createHash('sha256').update(raw).digest('hex').slice(0, 10)\n    return { exists: true, version, bytes: Buffer.byteLength(raw, 'utf8') }\n  } catch {\n    return { exists: false, version: '', bytes: 0 }\n  }\n}\n\nconst themeCss = resolveThemeCss()\nawait fs.writeFile(\n  path.join(generatedDir, 'theme.generated.ts'),\n  [\n    '// \u672C\u6587\u4EF6\u7531 scripts/build-content.mjs \u81EA\u52A8\u751F\u6210\uFF0C\u8BF7\u52FF\u624B\u6539\u3002',\n    '// \u503C\u6765\u81EA\u4ED3\u5E93\u91CC\u7684 public/theme.css\uFF08\u5E93\u4E3B\u4EBA\u5728\u53D1\u5E03\u7BA1\u7406\u5668\u7684\u300C\u5916\u89C2\u300D\u91CC\u4FDD\u5B58\u7684\u81EA\u5B9A\u4E49 CSS\uFF09\u3002',\n    '// \u60F3\u6539\u5916\u89C2\u8BF7\u7528\u53D1\u5E03\u7BA1\u7406\u5668\uFF0C\u4E0D\u8981\u624B\u6539\u8FD9\u4E2A\u6587\u4EF6\u3002',\n    `export const THEME_EXISTS = ${themeCss.exists}`,\n    `export const THEME_VERSION = ${JSON.stringify(themeCss.version)}`,\n    '',\n  ].join('\\n')\n)\n\nconsole.log(`[build-content] \u7B14\u8BB0 ${indexNotes.length} \u7BC7\uFF0C\u9644\u4EF6 ${linkIndexAssets.length} \u4E2A \u2192 public/data/ + public/assets/`)\nconsole.log(\n  themeCss.exists\n    ? `[build-content] \u81EA\u5B9A\u4E49\u5916\u89C2 public/theme.css \u5DF2\u542F\u7528\uFF08${themeCss.bytes} \u5B57\u8282\uFF0Cv=${themeCss.version}\uFF09`\n    : '[build-content] \u672A\u4F7F\u7528\u81EA\u5B9A\u4E49\u5916\u89C2\uFF08public/theme.css \u4E0D\u5B58\u5728\u6216\u4E3A\u7A7A\uFF09'\n)\nconsole.log(`[build-content] \u7AD9\u540D\u300C${siteName.name}\u300D\uFF08\u6765\u6E90\uFF1A${siteName.from}\uFF09`)\nconsole.log(`[build-content] \u53D1\u5E03\u6807\u8BB0 releaseTag=${releaseTag}`)\n\n// ---------- --finalize\uFF1A\u628A\u6784\u5EFA\u4EA7\u7269\u642C\u51FA\u6E90\u7801\u76EE\u5F55 ----------\n/**\n * \u4F9B `npm run build` \u5728 `next build` \u4E4B\u540E\u8C03\u7528\uFF08`node scripts/build-content.mjs --finalize`\uFF09\u3002\n *\n * \u6E90\u7801\u76EE\u5F55\u8981\u80FD\u76F4\u63A5\u5F00\u6E90\uFF0C\u5C31\u4E0D\u80FD\u7559\u7740\u7B14\u8BB0\u6B63\u6587\u3001\u9644\u4EF6\u548C\u5B8C\u6574\u7AD9\u70B9\u526F\u672C\u3002\n * \u672C\u6B65\u9AA4\u628A public/data\u3001public/assets\u3001out \u642C\u5230\u7528\u6237\u6570\u636E\u76EE\u5F55\u7684 build/ \u4E0B\uFF0C\n * \u518D\u628A\u6E90\u7801\u76EE\u5F55\u91CC\u8FD9\u4E9B\u76EE\u5F55\u5220\u6389\u3002\n *\n * CI \u4E0A\u4E0D\u505A\u4EFB\u4F55\u4E8B\uFF1AActions \u9700\u8981 out/ \u539F\u5730\u4E0D\u52A8\u7ED9 upload-pages-artifact\uFF0C\n * \u800C\u4E14\u90A3\u53F0\u673A\u5668\u4E0A\u6CA1\u6709\u7528\u6237\u6570\u636E\u76EE\u5F55\uFF0C\u642C\u8FC7\u53BB\u4E5F\u6CA1\u7528\u3002\n *\n * \u7528 move \u800C\u4E0D\u662F copy\uFF1A\u9644\u4EF6\u53EF\u80FD\u51E0\u5341\u4E0A\u767E MB\uFF0C\u590D\u5236\u65E2\u6162\u53C8\u4F1A\u5728\u6E90\u76EE\u5F55\u7559\u4E00\u4EFD\u6B8B\u7559\u3002\n */\nasync function finalize() {\n  if (IS_CI) {\n    console.log('[build-content] CI \u73AF\u5883\uFF0C\u6784\u5EFA\u4EA7\u7269\u7559\u5728\u4ED3\u5E93\u76EE\u5F55\uFF08Actions \u9700\u8981 out/\uFF09')\n    return\n  }\n  const BUILD_DIR = path.join(DATA_DIR, 'build')\n  await fs.mkdir(BUILD_DIR, { recursive: true })\n\n  const moves = [\n    [path.join(PUBLIC, 'data'), path.join(BUILD_DIR, 'data')],\n    [path.join(PUBLIC, 'assets'), path.join(BUILD_DIR, 'assets')],\n    [path.join(ROOT, 'out'), path.join(BUILD_DIR, 'site')],\n  ]\n\n  let moved = 0\n  for (const [src, dst] of moves) {\n    // \u76EE\u6807\u5DF2\u5B58\u5728\uFF08\u4E0A\u4E00\u6B21\u6784\u5EFA\u7684\u6B8B\u7559\uFF09\u5148\u6E05\u6389\uFF0C\u5426\u5219 move \u5728\u8DE8\u76EE\u5F55\u65F6\u4F1A\u5931\u8D25\n    await fs.rm(dst, { recursive: true, force: true })\n    try {\n      await fs.rename(src, dst)\n      moved += 1\n      console.log(`[build-content] \u5DF2\u628A ${path.relative(ROOT, src) || src} \u79FB\u5230\u7528\u6237\u6570\u636E\u76EE\u5F55`)\n    } catch (e) {\n      if (e.code === 'ENOENT') continue // \u6CA1\u6784\u5EFA\u51FA\u6765\u5C31\u8DF3\u8FC7\n      if (e.code === 'EXDEV') {\n        // \u8DE8\u76D8\uFF08\u6E90\u7801\u5728 C:\uFF0C\u7528\u6237\u6570\u636E\u76EE\u5F55\u5728 D: \u7B49\uFF09rename \u4F1A\u5931\u8D25\u3002\n        // \u4E0D\u5904\u7406\u7684\u8BDD\u4E0A\u6B21\u7684\u4EA7\u7269\u5DF2\u88AB\u4E0A\u9762 rm \u6389\u3001\u65B0\u7684\u53C8\u642C\u4E0D\u8D70\uFF0C\u7B49\u4E8E\u4E24\u5934\u843D\u7A7A\u3002\n        try {\n          await fs.cp(src, dst, { recursive: true })\n          await fs.rm(src, { recursive: true, force: true })\n          moved += 1\n          console.log(`[build-content] \u5DF2\u628A ${path.relative(ROOT, src) || src} \u590D\u5236\u5230\u7528\u6237\u6570\u636E\u76EE\u5F55\uFF08\u8DE8\u76D8\uFF09`)\n          continue\n        } catch (e2) {\n          console.warn(`[build-content] ${path.relative(ROOT, src)} \u8DE8\u76D8\u642C\u79FB\u5931\u8D25\uFF1A${e2.message}`)\n          continue\n        }\n      }\n      console.warn(`[build-content] ${path.relative(ROOT, src)} \u672A\u80FD\u79FB\u8D70\uFF08\u7559\u5728\u6E90\u7801\u76EE\u5F55\uFF09\uFF1A${e.message}`)\n    }\n  }\n\n  // \u751F\u6210\u7684\u6E90\u6587\u4EF6\u4E0D\u80FD\u5220\uFF08src/lib/site.ts \u4E0E api.ts \u4F1A import \u5B83\u4EEC\uFF0C\u5220\u4E86\u4E0B\u4E2A build \u8D77\u4E0D\u6765\uFF09\uFF0C\n  // \u6539\u6210\u5199\u56DE\u300C\u4E2D\u6027\u5360\u4F4D\u503C\u300D\uFF1A\u6E90\u7801\u76EE\u5F55\u91CC\u770B\u4E0D\u5230\u7AD9\u540D\u548C\u5185\u5BB9\u6458\u8981\uFF0C\n  // \u800C\u4E0B\u4E00\u6B21\u6784\u5EFA\u65F6\u672C\u811A\u672C\u4F1A\u91CD\u65B0\u751F\u6210\u771F\u5B9E\u503C\u8986\u76D6\u6389\u3002\n  const placeholders = {\n    'release-tag.ts': [\n      '// \u672C\u6587\u4EF6\u7531 scripts/build-content.mjs \u81EA\u52A8\u751F\u6210\uFF0C\u8BF7\u52FF\u624B\u6539\u3002',\n      '// \u6784\u5EFA\u65F6\u4F1A\u5199\u5165\u7B14\u8BB0\u6570\u636E\u7684\u5185\u5BB9\u6458\u8981\uFF1B\u6B64\u5904\u4E3A\u5360\u4F4D\u503C\uFF08\u6E90\u7801\u76EE\u5F55\u4E0D\u4FDD\u7559\u4E2A\u4EBA\u4FE1\u606F\uFF09\u3002',\n      \"export const RELEASE_TAG = ''\",\n      '',\n    ].join('\\n'),\n    'site-name.generated.ts': [\n      '// \u672C\u6587\u4EF6\u7531 scripts/build-content.mjs \u81EA\u52A8\u751F\u6210\uFF0C\u8BF7\u52FF\u624B\u6539\u3002',\n      '// \u6784\u5EFA\u65F6\u4F1A\u5199\u5165\u7528\u6237\u6570\u636E\u76EE\u5F55\u91CC\u7684\u7AD9\u540D\uFF1B\u6B64\u5904\u4E3A\u4E2D\u6027\u5360\u4F4D\u503C\u3002',\n      'export const SITE_NAME = \"\u7B14\u8BB0\"',\n      '',\n    ].join('\\n'),\n    // \u5916\u89C2\u6807\u8BB0\u540C\u6837\u8981\u8FD8\u539F\u6210\u5360\u4F4D\u503C\uFF1A\u6E90\u7801\u76EE\u5F55\u91CC\u770B\u4E0D\u51FA\u8FD9\u4E2A\u5E93\u6709\u6CA1\u6709\u81EA\u5B9A\u4E49\u76AE\u80A4\u3002\n    // \u5360\u4F4D\u503C\u662F\u300C\u65E0\u81EA\u5B9A\u4E49\u5916\u89C2\u300D\uFF0C\u4E0B\u6B21\u6784\u5EFA\u4F1A\u6309\u771F\u5B9E\u7684 public/theme.css \u91CD\u65B0\u7B97\u3002\n    'theme.generated.ts': [\n      '// \u672C\u6587\u4EF6\u7531 scripts/build-content.mjs \u81EA\u52A8\u751F\u6210\uFF0C\u8BF7\u52FF\u624B\u6539\u3002',\n      '// \u6784\u5EFA\u65F6\u4F1A\u5199\u5165 public/theme.css \u7684\u5B58\u5728\u6027\u4E0E\u5185\u5BB9\u54C8\u5E0C\uFF1B\u6B64\u5904\u4E3A\u5360\u4F4D\u503C\u3002',\n      'export const THEME_EXISTS = false',\n      \"export const THEME_VERSION = ''\",\n      '',\n    ].join('\\n'),\n  }\n  for (const [name, content] of Object.entries(placeholders)) {\n    try {\n      await fs.writeFile(path.join(generatedDir, name), content)\n    } catch {\n      /* \u5199\u4E0D\u8FDB\u53BB\u4E5F\u4E0D\u5F71\u54CD\u5DF2\u7ECF\u642C\u8D70\u7684\u4EA7\u7269 */\n    }\n  }\n\n  if (moved > 0) {\n    console.log(`[build-content] \u6784\u5EFA\u4EA7\u7269\u5DF2\u79FB\u5230\uFF1A${BUILD_DIR}`)\n  }\n}\n\nif (process.argv.includes('--finalize')) {\n  await finalize()\n}\n" }, ".github/workflows/deploy.yml": { "t": "utf8", "v": "name: \u6784\u5EFA\u5E76\u53D1\u5E03\u9759\u6001\u535A\u5BA2\n\non:\n  push:\n    branches: [main]\n  workflow_dispatch:\n\npermissions:\n  contents: read\n  pages: write\n  id-token: write\n\nconcurrency:\n  group: pages\n  cancel-in-progress: true\n\njobs:\n  build:\n    runs-on: ubuntu-latest\n    steps:\n      - uses: actions/checkout@v4\n      - uses: actions/setup-node@v4\n        with:\n          node-version: 22\n          cache: npm\n      - run: npm ci\n      - name: \u6784\u5EFA\u9759\u6001\u7AD9\n        run: npm run build\n        env:\n          NEXT_PUBLIC_BASE_PATH: /${{ github.event.repository.name }}\n          NEXT_PUBLIC_SITE_NAME: ${{ vars.SITE_NAME || '\u535A\u5BA2' }}\n      - uses: actions/configure-pages@v5\n      - uses: actions/upload-pages-artifact@v3\n        with:\n          path: out\n\n  deploy:\n    needs: build\n    runs-on: ubuntu-latest\n    environment:\n      name: github-pages\n      url: ${{ steps.deployment.outputs.page_url }}\n    steps:\n      - id: deployment\n        uses: actions/deploy-pages@v4\n" } };

// src/template.ts
var REV_FILE = ".template-rev";
function materializeTemplate(fs, path, destDir) {
  const files = TEMPLATE_FILES;
  for (const [rel, f] of Object.entries(files)) {
    const abs = path.join(destDir, rel);
    fs.mkdirSync(path.dirname(abs), { recursive: true });
    if (f.t === "base64") {
      fs.writeFileSync(abs, Buffer.from(f.v, "base64"));
    } else {
      fs.writeFileSync(abs, f.v, "utf8");
    }
  }
  fs.writeFileSync(path.join(destDir, REV_FILE), TEMPLATE_REV, "utf8");
}
function templateReady(fs, path, dir) {
  const revFile = path.join(dir, REV_FILE);
  if (!fs.existsSync(revFile)) return false;
  try {
    if (fs.readFileSync(revFile, "utf8").trim() !== TEMPLATE_REV) return false;
  } catch {
    return false;
  }
  const must = ["package.json", "next.config.ts", "scripts/build-content.mjs", "src/lib/api.ts"];
  return must.every((m) => fs.existsSync(path.join(dir, m)));
}

// src/explorer.ts
var import_obsidian = require("obsidian");

// src/i18n.ts
function hostLang(app) {
  let raw = "";
  try {
    const cfg = app.vault;
    const fromCfg = cfg?.getConfig ? cfg.getConfig("language") : "";
    if (typeof fromCfg === "string" && fromCfg) raw = fromCfg;
    else raw = window.localStorage.getItem("language") || "";
  } catch {
  }
  return /^zh/i.test(raw) ? "zh" : raw ? "en" : "zh";
}
var ZH = {
  pub: "\u516C\u5F00",
  priv: "\u79C1\u5BC6",
  swToPrivate: "\u5DF2\u516C\u5F00\uFF0C\u70B9\u51FB\u8BBE\u4E3A\u79C1\u5BC6",
  swToPublic: "\u79C1\u5BC6\uFF0C\u70B9\u51FB\u8BBE\u4E3A\u516C\u5F00",
  folderAllPublic: (f, n) => `${f}\uFF1A${n} \u7BC7\u5168\u90E8\u516C\u5F00`,
  folderAllPrivate: (f, n) => `${f}\uFF1A${n} \u7BC7\u5168\u90E8\u79C1\u5BC6`,
  folderMixed: (f, n, p) => `${f}\uFF1A${n} \u7BC7\u91CC ${p} \u7BC7\u516C\u5F00`,
  vaultAllPublic: (n) => `\u5168\u5E93 ${n} \u7BC7\u5168\u90E8\u516C\u5F00`,
  vaultAllPrivate: (n) => `\u5168\u5E93 ${n} \u7BC7\u5168\u90E8\u79C1\u5BC6`,
  vaultMixed: (n, p) => `\u5168\u5E93 ${n} \u7BC7\u91CC ${p} \u7BC7\u516C\u5F00`,
  scopeAll: "\u5168\u5E93",
  confirmPublicTitle: (s) => `\u628A${s}\u7B14\u8BB0\u8BBE\u4E3A\u516C\u5F00\uFF1F`,
  confirmPrivateTitle: (s) => `\u628A${s}\u7B14\u8BB0\u8BBE\u4E3A\u79C1\u5BC6\uFF1F`,
  confirmPublicBody: (n) => `\u8FD9\u4F1A\u6539\u52A8 ${n} \u7BC7\u7B14\u8BB0\u7684 public \u5B57\u6BB5\u3002`,
  confirmPrivateBody: (n) => `\u8FD9\u4F1A\u6539\u52A8 ${n} \u7BC7\u7B14\u8BB0\u7684 public \u5B57\u6BB5\u3002\u8BBE\u4E3A\u79C1\u5BC6\u540E\u5B83\u4EEC\u4F1A\u4ECE\u7EBF\u4E0A\u535A\u5BA2\u4E0B\u7EBF\uFF0C\u9700\u8981\u91CD\u65B0\u516C\u5F00\u5E76\u53D1\u5E03\u624D\u4F1A\u56DE\u6765\u3002`,
  confirmPublicCta: "\u5168\u90E8\u516C\u5F00",
  confirmPrivateCta: "\u5168\u90E8\u79C1\u5BC6",
  cancel: "\u53D6\u6D88",
  batchDone: (scope, pub, n) => `${scope ? scope + "\uFF1A" : ""}\u5DF2${pub ? "\u516C\u5F00" : "\u8BBE\u4E3A\u79C1\u5BC6"} ${n} \u7BC7`,
  toggleFail: (msg) => "\u8BBE\u7F6E\u5931\u8D25\uFF1A" + msg,
  vaultMismatch: (a, b) => "\u535A\u5BA2\u53D1\u5E03\u5668\uFF1A\u7BA1\u7406\u5668\u914D\u7F6E\u7684\u5E93\u4E0D\u662F\u5F53\u524D\u5E93\uFF0C\u6587\u4EF6\u6811\u4E0A\u7684\u516C\u5F00\u5F00\u5173\u5DF2\u505C\u7528\u3002\n\u7BA1\u7406\u5668\uFF1A" + a + "\n\u5F53\u524D\uFF1A" + b,
  ribbonOpen: "\u6253\u5F00\u535A\u5BA2\u53D1\u5E03\u5668",
  cmdOpen: "\u6253\u5F00\u535A\u5BA2\u53D1\u5E03\u5668",
  cmdPublish: "\u7ACB\u5373\u53D1\u5E03\u5230 GitHub",
  cmdAllPublic: "\u5168\u90E8\u7B14\u8BB0\u8BBE\u4E3A\u516C\u5F00",
  cmdAllPrivate: "\u5168\u90E8\u7B14\u8BB0\u8BBE\u4E3A\u79C1\u5BC6",
  cmdFolderPublic: "\u5F53\u524D\u6587\u4EF6\u5939\u5168\u90E8\u516C\u5F00",
  cmdFolderPrivate: "\u5F53\u524D\u6587\u4EF6\u5939\u5168\u90E8\u79C1\u5BC6",
  noActiveNote: "\u5148\u6253\u5F00\u4E00\u7BC7\u7B14\u8BB0",
  viewTitle: "\u535A\u5BA2\u53D1\u5E03\u5668",
  loading: "\u6B63\u5728\u542F\u52A8\u53D1\u5E03\u5668\u2026",
  startFail: (m) => "\u542F\u52A8\u5931\u8D25\uFF1A" + m,
  publishing: "\u6B63\u5728\u53D1\u5E03\u2026",
  publishFailed: (m) => "\u53D1\u5E03\u5931\u8D25\uFF1A" + m,
  pushed: "\u5DF2\u63A8\u9001 GitHub\uFF0C\u6B63\u5728\u6784\u5EFA",
  upToDate: "\u7EBF\u4E0A\u5DF2\u662F\u6700\u65B0",
  pluginStartFail: (m) => "\u535A\u5BA2\u53D1\u5E03\u5668\u542F\u52A8\u5931\u8D25\uFF1A" + m,
  settingsTitle: "\u535A\u5BA2\u53D1\u5E03\u5668",
  settingsDataDesc: "\u6570\u636E\u76EE\u5F55\u4E0E\u547D\u4EE4\u884C\u7248\u53D1\u5E03\u7BA1\u7406\u5668\u5171\u7528\uFF08\u9ED8\u8BA4 %APPDATA%\\obsidian-blog\uFF09\uFF0C\u6240\u4EE5\u4E24\u8FB9\u7684\u8FDE\u63A5\u3001\u4EE4\u724C\u3001\u53D1\u5E03\u6D41\u6C34\u662F\u540C\u4E00\u4EFD\u3002",
  settingsOpenName: "\u6253\u5F00\u53D1\u5E03\u5668",
  settingsOpenDesc: "\u4E5F\u53EF\u4EE5\u70B9\u5DE6\u4FA7\u680F\u7684\u56FE\u6807\uFF0C\u6216\u7528\u547D\u4EE4\u9762\u677F\u300C\u6253\u5F00\u535A\u5BA2\u53D1\u5E03\u5668\u300D",
  settingsOpenBtn: "\u6253\u5F00",
  settingsBrowserName: "\u5728\u6D4F\u89C8\u5668\u4E2D\u6253\u5F00",
  settingsBrowserDesc: "\u7528\u7CFB\u7EDF\u6D4F\u89C8\u5668\u6253\u5F00\u540C\u4E00\u4E2A\u754C\u9762\uFF08\u9002\u5408\u5927\u5C4F\u64CD\u4F5C\uFF09",
  settingsBrowserBtn: "\u6253\u5F00"
};
var EN = {
  // 文件树一行本来就窄，英文全拼「Public」「Private」比中文宽四成，
  // 会把标题挤掉。缩写到 Pub / Priv 后整组宽度和「公开|私密」基本一致。
  // 完整说法放在悬停提示里，不影响理解。
  pub: "Pub",
  priv: "Priv",
  swToPrivate: "Public \u2014 click to make private",
  swToPublic: "Private \u2014 click to make public",
  folderAllPublic: (f, n) => `${f}: all ${n} public`,
  folderAllPrivate: (f, n) => `${f}: all ${n} private`,
  folderMixed: (f, n, p) => `${f}: ${p} of ${n} public`,
  vaultAllPublic: (n) => `All ${n} notes public`,
  vaultAllPrivate: (n) => `All ${n} notes private`,
  vaultMixed: (n, p) => `${p} of ${n} notes public`,
  scopeAll: "",
  confirmPublicTitle: () => "Make these notes public?",
  confirmPrivateTitle: () => "Make these notes private?",
  confirmPublicBody: (n) => `This changes the public field of ${n} notes.`,
  confirmPrivateBody: (n) => `This changes the public field of ${n} notes. Private notes are removed from the published site \u2014 they only come back after you make them public and publish again.`,
  confirmPublicCta: "Make all public",
  confirmPrivateCta: "Make all private",
  cancel: "Cancel",
  batchDone: (scope, pub, n) => `${scope ? scope + ": " : ""}${n} note(s) set to ${pub ? "public" : "private"}`,
  toggleFail: (msg) => "Failed: " + msg,
  vaultMismatch: (a, b) => "Blog Publisher: the vault configured in the manager is not the current vault, so the public toggles in the file explorer are disabled.\nManager: " + a + "\nCurrent: " + b,
  ribbonOpen: "Open blog publisher",
  cmdOpen: "Open blog publisher",
  cmdPublish: "Publish to GitHub now",
  cmdAllPublic: "Make all notes public",
  cmdAllPrivate: "Make all notes private",
  cmdFolderPublic: "Make current folder public",
  cmdFolderPrivate: "Make current folder private",
  noActiveNote: "Open a note first",
  viewTitle: "Blog publisher",
  loading: "Starting publisher\u2026",
  startFail: (m) => "Failed to start: " + m,
  publishing: "Publishing\u2026",
  publishFailed: (m) => "Publish failed: " + m,
  pushed: "Pushed to GitHub, building now",
  upToDate: "Site is already up to date",
  pluginStartFail: (m) => "Blog publisher failed to start: " + m,
  settingsTitle: "Blog publisher",
  settingsDataDesc: "Shares the same data directory as the command-line manager (default %APPDATA%\\obsidian-blog), so connections, tokens and publish history are one and the same.",
  settingsOpenName: "Open publisher",
  settingsOpenDesc: 'You can also click the ribbon icon or use the "Open blog publisher" command',
  settingsOpenBtn: "Open",
  settingsBrowserName: "Open in browser",
  settingsBrowserDesc: "Opens the same UI in your system browser (handy on a large screen)",
  settingsBrowserBtn: "Open"
};
var TABLE = { zh: ZH, en: EN };
function strings(lang) {
  return TABLE[lang];
}

// src/explorer.ts
var MARK_FILE = "data-blog-pub";
var MARK_FOLDER = "data-blog-pub-folder";
var MARK_NAV = "data-blog-pub-nav";
var ExplorerBadges = class {
  app;
  getPort;
  /** rel 路径（正斜杠）→ 是否公开 */
  notes = /* @__PURE__ */ new Map();
  /**
   * 刚点过的结果，防止 8 秒轮询用「点击之前」的响应把界面改回去。
   * 实测踩过：点一下变私密，紧接着一次在途的 /api/state 响应把它又刷成公开，
   * 用户看到的就是「点了没反应 / 自己跳回去」。
   */
  overrides = /* @__PURE__ */ new Map();
  observer = null;
  watched = null;
  debounce = null;
  poll = null;
  revPoll = null;
  hookTimer = null;
  busy = false;
  enabled = true;
  warnedVault = false;
  /** 上次见到的状态版本号。只有它变了才去拉全量 /api/state（那份要扫 117 个文件） */
  lastRev = 0;
  /**
   * 写操作的串行队列。
   *
   * 为什么需要：改一篇的 public 会触发管理器的自动同步（git commit + push 整个库，
   * 117 篇要 1~2 秒）。如果在这期间再点一次，旧代码 `if (this.busy) return`
   * 会把第二次操作**静默丢掉**，用户看到的就是「点了没反应，得等一会儿再点」。
   * 排队能保证每次操作都被执行，而且按用户点的顺序。
   */
  queue = Promise.resolve();
  /** 回到前台时立刻对一次状态（隐藏期间定时器被冻结） */
  onWake = null;
  /**
   * 界面语言。跟随 Obsidian，不在插件里另设开关。
   * 缓存上一次的语言字符串，语言变了才重建已经注入的节点文字。
   */
  lang;
  t;
  enqueue(job) {
    const run = this.queue.then(job, job);
    this.queue = run.catch(() => void 0);
    return run;
  }
  constructor(app, getPort) {
    this.app = app;
    this.getPort = getPort;
    this.lang = hostLang(app);
    this.t = strings(this.lang);
  }
  /** 语言变了就重刷一遍文案（Obsidian 改语言不广播事件，由宿主定时比对后调用） */
  setLang() {
    const next = hostLang(this.app);
    if (next === this.lang) return false;
    this.lang = next;
    this.t = strings(next);
    this.stripAll();
    this.decorate();
    return true;
  }
  /** 全库设为公开 / 私密（命令面板入口，走同一套确认） */
  async setAll(pub) {
    const paths = Array.from(this.notes.keys());
    if (paths.length === 0) return;
    const s = this.t.scopeAll;
    new ConfirmModal(this.app, {
      title: pub ? this.t.confirmPublicTitle(s) : this.t.confirmPrivateTitle(s),
      body: pub ? this.t.confirmPublicBody(paths.length) : this.t.confirmPrivateBody(paths.length),
      cta: pub ? this.t.confirmPublicCta : this.t.confirmPrivateCta,
      cancel: this.t.cancel,
      onConfirm: () => void this.toggleMany(paths, pub, s)
    }).open();
  }
  /** 某个文件夹设为公开 / 私密（命令面板入口） */
  async setFolder(folder, pub) {
    const paths = this.pathsUnder(folder);
    if (paths.length === 0) return;
    await this.toggleMany(paths, pub, folder || this.t.scopeAll);
  }
  start() {
    this.stripAll();
    this.hook();
    this.hookTimer = window.setInterval(() => this.hook(), 2e3);
    this.revPoll = window.setInterval(() => void this.checkRev(), 600);
    this.poll = window.setInterval(() => void this.refresh(), 8e3);
    this.onWake = () => {
      void this.checkRev();
    };
    window.addEventListener("focus", this.onWake);
    document.addEventListener("visibilitychange", this.onWake);
    void this.refresh();
  }
  stop() {
    this.observer?.disconnect();
    this.observer = null;
    this.watched = null;
    if (this.hookTimer !== null) window.clearInterval(this.hookTimer);
    if (this.poll !== null) window.clearInterval(this.poll);
    if (this.revPoll !== null) window.clearInterval(this.revPoll);
    if (this.debounce !== null) window.clearTimeout(this.debounce);
    this.hookTimer = this.poll = this.revPoll = this.debounce = null;
    if (this.onWake) {
      window.removeEventListener("focus", this.onWake);
      document.removeEventListener("visibilitychange", this.onWake);
      this.onWake = null;
    }
    this.stripAll();
  }
  /** 只拉版本号；变了才去拉那份很重的全量状态 */
  async checkRev() {
    if (!this.enabled) return;
    try {
      const port = await this.getPort();
      const r = await (0, import_obsidian.requestUrl)({ url: `http://127.0.0.1:${port}/api/rev`, method: "GET" });
      if (r.status !== 200) return;
      const rev = Number(r.json?.rev || 0);
      if (!rev || rev === this.lastRev) return;
      this.lastRev = rev;
      await this.refresh();
    } catch {
    }
  }
  /** 找文件浏览器里真正装树节点的容器 */
  container() {
    const leaf = this.app.workspace.getLeavesOfType("file-explorer")[0];
    if (!leaf) return null;
    const root = leaf.view.containerEl;
    return root.querySelector(".nav-files-container") || root;
  }
  hook() {
    const el = this.container();
    if (!el || el === this.watched) return;
    this.observer?.disconnect();
    this.watched = el;
    this.observer = new MutationObserver(() => this.schedule());
    this.observer.observe(el, { childList: true, subtree: true });
    this.schedule();
  }
  schedule() {
    if (this.debounce !== null) window.clearTimeout(this.debounce);
    this.debounce = window.setTimeout(() => {
      this.debounce = null;
      this.decorate();
    }, 120);
  }
  async refresh() {
    if (!this.enabled) return;
    try {
      const port = await this.getPort();
      const r = await (0, import_obsidian.requestUrl)({ url: `http://127.0.0.1:${port}/api/state`, method: "GET" });
      if (r.status !== 200) return;
      const j = r.json;
      const base = this.app.vault.adapter.basePath || "";
      if (j.vaultPath && base && normalize(j.vaultPath) !== normalize(base)) {
        if (!this.warnedVault) {
          this.warnedVault = true;
          new import_obsidian.Notice(this.t.vaultMismatch(String(j.vaultPath), base), 12e3);
        }
        this.enabled = false;
        this.stripAll();
        return;
      }
      this.notes.clear();
      for (const n of j.notes || []) this.notes.set(n.path.replace(/\\/g, "/"), !!n.isPublic);
      const now = Date.now();
      for (const [p, o] of Array.from(this.overrides)) {
        if (now - o.at > 3e4) {
          this.overrides.delete(p);
          continue;
        }
        if (this.notes.get(p) === o.pub) this.overrides.delete(p);
        else this.notes.set(p, o.pub);
      }
      this.decorate();
    } catch {
    }
  }
  async toggle(path, pub) {
    return this.enqueue(() => this.doToggle(path, pub));
  }
  async doToggle(path, pub) {
    this.busy = true;
    this.overrides.set(path, { pub, at: Date.now() });
    this.notes.set(path, pub);
    this.decorate();
    try {
      const port = await this.getPort();
      const r = await (0, import_obsidian.requestUrl)({
        url: `http://127.0.0.1:${port}/api/toggle`,
        method: "POST",
        contentType: "application/json",
        body: JSON.stringify({ path, pub }),
        throw: false
      });
      if (r.status !== 200) {
        const j = r.json || {};
        new import_obsidian.Notice(this.t.toggleFail(j.error || "HTTP " + r.status), 6e3);
        this.overrides.delete(path);
        this.notes.set(path, !pub);
        this.decorate();
        return;
      }
      this.notes.set(path, pub);
      this.decorate();
      this.lastRev = 0;
    } catch (e) {
      new import_obsidian.Notice(this.t.toggleFail(String(e?.message || e)), 6e3);
      this.overrides.delete(path);
      this.notes.set(path, !pub);
      this.decorate();
    } finally {
      this.busy = false;
    }
  }
  async toggleMany(paths, pub, scope = "") {
    if (paths.length === 0) return;
    return this.enqueue(() => this.doToggleMany(paths, pub, scope));
  }
  async doToggleMany(paths, pub, scope = "") {
    this.busy = true;
    let done = 0;
    const at = Date.now();
    for (const p of paths) {
      this.overrides.set(p, { pub, at });
      this.notes.set(p, pub);
    }
    this.decorate();
    try {
      const port = await this.getPort();
      for (const p of paths) {
        try {
          const r = await (0, import_obsidian.requestUrl)({
            url: `http://127.0.0.1:${port}/api/toggle`,
            method: "POST",
            contentType: "application/json",
            body: JSON.stringify({ path: p, pub }),
            throw: false
          });
          if (r.status === 200) {
            this.overrides.set(p, { pub, at: Date.now() });
            this.notes.set(p, pub);
            done++;
          }
        } catch {
        }
      }
      new import_obsidian.Notice(this.t.batchDone(scope, pub, done), 4e3);
      this.decorate();
      this.lastRev = 0;
    } finally {
      this.busy = false;
    }
  }
  /** 把树上的节点补齐 / 刷新状态 */
  decorate() {
    const root = this.watched;
    if (!root) return;
    this.addNavSwitch();
    this.updateNavSwitch();
    for (const el of Array.from(root.querySelectorAll(".nav-file-title[data-path]"))) {
      const path = (el.getAttribute("data-path") || "").replace(/\\/g, "/");
      if (!/\.(md|markdown)$/i.test(path)) continue;
      const pub = this.notes.get(path);
      let sw = el.querySelector(".blog-pub-sw");
      if (pub === void 0) {
        if (sw) sw.remove();
        continue;
      }
      if (!sw) {
        sw = document.createElement("span");
        sw.className = "blog-pub-sw";
        sw.setAttribute(MARK_FILE, "1");
        sw.setAttribute("role", "switch");
        sw.addEventListener("click", (ev) => {
          ev.preventDefault();
          ev.stopPropagation();
          const now = this.notes.get(path) === true;
          void this.toggle(path, !now);
        });
        el.appendChild(sw);
      }
      sw.classList.toggle("on", pub);
      sw.setAttribute("aria-checked", pub ? "true" : "false");
      sw.setAttribute("aria-label", pub ? this.t.swToPrivate : this.t.swToPublic);
    }
    for (const el of Array.from(root.querySelectorAll(".nav-folder-title[data-path]"))) {
      const folder = (el.getAttribute("data-path") || "").replace(/\\/g, "/");
      const inFolder = this.pathsUnder(folder);
      let box = el.querySelector(".blog-pub-folder");
      if (inFolder.length === 0) {
        if (box) box.remove();
        continue;
      }
      if (!box) {
        box = document.createElement("span");
        box.className = "blog-pub-folder";
        box.setAttribute(MARK_FOLDER, "1");
        const cnt2 = document.createElement("span");
        cnt2.className = "blog-pub-fcount";
        box.appendChild(cnt2);
        box.appendChild(this.buildBatchButtons(folder, () => this.pathsUnder(folder)));
        el.appendChild(box);
      }
      const pubCount = inFolder.filter((p) => this.notes.get(p) === true).length;
      const allPub = pubCount === inFolder.length;
      const nonePub = pubCount === 0;
      const batch = box.querySelector(".blog-pub-batch");
      if (batch) {
        this.paintBatchButtons(batch, allPub, nonePub);
        const label = allPub ? this.t.folderAllPublic(folder, inFolder.length) : nonePub ? this.t.folderAllPrivate(folder, inFolder.length) : this.t.folderMixed(folder, inFolder.length, pubCount);
        batch.setAttribute("aria-label", label);
      }
      const cnt = box.querySelector(".blog-pub-fcount");
      if (cnt) {
        cnt.textContent = `${pubCount}/${inFolder.length}`;
      }
    }
  }
  /**
   * 造一组「公开 / 私密」两个按钮，用来批量改一个文件夹（或全库）的公开状态。
   *
   * 为什么不用开关：开关只有两个态，一个「部分公开」的文件夹点下去只能被推断成
   * 「全公开」—— 想一键变全私密就没有入口了。滑块能选方向，但 44px 的长条挂在
   * 文件树里又太长、很碍眼。两个按钮把方向直接写出来，宽度也只比开关略大。
   */
  buildBatchButtons(scopeLabel, getPaths, needConfirm = false) {
    const box = document.createElement("span");
    box.className = "blog-pub-batch";
    for (const pub of [true, false]) {
      const btn = document.createElement("span");
      btn.className = "blog-pub-bbtn";
      btn.setAttribute("role", "button");
      btn.setAttribute("tabindex", "0");
      btn.dataset.pub = pub ? "1" : "0";
      btn.textContent = pub ? this.t.pub : this.t.priv;
      const run = (ev) => {
        ev.preventDefault();
        ev.stopPropagation();
        const paths = getPaths();
        if (paths.length === 0) return;
        const go = () => void this.toggleMany(paths, pub, scopeLabel);
        if (!needConfirm) {
          go();
          return;
        }
        const s = scopeLabel || this.t.scopeAll;
        new ConfirmModal(this.app, {
          title: pub ? this.t.confirmPublicTitle(s) : this.t.confirmPrivateTitle(s),
          body: pub ? this.t.confirmPublicBody(paths.length) : this.t.confirmPrivateBody(paths.length),
          cta: pub ? this.t.confirmPublicCta : this.t.confirmPrivateCta,
          cancel: this.t.cancel,
          onConfirm: go
        }).open();
      };
      btn.addEventListener("click", run);
      btn.addEventListener("keydown", (ev) => {
        if (ev.key === "Enter" || ev.key === " ") run(ev);
      });
      box.appendChild(btn);
    }
    return box;
  }
  /**
   * 按当前公开状态给两个按钮上色：已经全公开就点亮「公开」，
   * 已经全私密就点亮「私密」，部分公开时两个都不点亮。
   */
  paintBatchButtons(batch, allPub, nonePub) {
    for (const btn of Array.from(batch.querySelectorAll(".blog-pub-bbtn"))) {
      const pub = btn.dataset.pub === "1";
      btn.classList.toggle("active", pub ? allPub : nonePub);
    }
  }
  /** 某文件夹下所有已纳入管理的笔记路径 */
  pathsUnder(folder) {
    const prefix = folder ? folder + "/" : "";
    const out = [];
    for (const p of this.notes.keys()) {
      if (!prefix || p.startsWith(prefix)) out.push(p);
    }
    return out;
  }
  /** 顶部工具条：两个按钮管全库（公开 / 私密） */
  addNavSwitch() {
    const leaf = this.app.workspace.getLeavesOfType("file-explorer")[0];
    const bar = leaf?.view.containerEl.querySelector(".nav-buttons-container");
    if (!bar || bar.querySelector(`[${MARK_NAV}]`)) return;
    const wrap = document.createElement("div");
    wrap.className = "clickable-icon nav-action-button blog-pub-navwrap";
    wrap.setAttribute(MARK_NAV, "all");
    wrap.appendChild(this.buildBatchButtons(this.t.scopeAll, () => Array.from(this.notes.keys()), true));
    bar.appendChild(wrap);
  }
  /** 刷新顶部按钮的点亮状态（全公开 / 全私密 / 部分公开） */
  updateNavSwitch() {
    const batch = document.querySelector(`[${MARK_NAV}] .blog-pub-batch`);
    if (!batch) return;
    const all = Array.from(this.notes.values());
    const pubCount = all.filter(Boolean).length;
    const allPub = all.length > 0 && pubCount === all.length;
    const nonePub = pubCount === 0;
    this.paintBatchButtons(batch, allPub, nonePub);
    const label = allPub ? this.t.vaultAllPublic(all.length) : nonePub ? this.t.vaultAllPrivate(all.length) : this.t.vaultMixed(all.length, pubCount);
    batch.setAttribute("aria-label", label);
  }
  /** 停用时把注入的东西都摘掉，别留一堆点了没反应的开关 */
  stripAll() {
    for (const el of Array.from(
      document.querySelectorAll(
        ".blog-pub-sw, .blog-pub-batch, .blog-pub-folder, [data-blog-pub], [data-blog-pub-folder], [data-blog-pub-nav]"
      )
    )) {
      el.remove();
    }
  }
};
var ConfirmModal = class extends import_obsidian.Modal {
  opts;
  constructor(app, opts) {
    super(app);
    this.opts = opts;
  }
  onOpen() {
    const { contentEl } = this;
    contentEl.createEl("h3", { text: this.opts.title });
    contentEl.createEl("p", { text: this.opts.body });
    const row = contentEl.createDiv({ cls: "modal-button-container" });
    const yes = row.createEl("button", { text: this.opts.cta, cls: "mod-warning" });
    yes.addEventListener("click", () => {
      this.close();
      this.opts.onConfirm();
    });
    const no = row.createEl("button", { text: this.opts.cancel });
    no.addEventListener("click", () => this.close());
  }
  onClose() {
    this.contentEl.empty();
  }
};
function normalize(p) {
  return String(p).replace(/\\/g, "/").replace(/\/+$/, "").toLowerCase();
}

// src/main.ts
var VIEW_TYPE = "blog-publisher-view";
function activeFolder(app) {
  const f = app.workspace.getActiveFile();
  if (!f) return null;
  const i = f.path.lastIndexOf("/");
  return i < 0 ? "" : f.path.slice(0, i);
}
function hostTheme() {
  return document.body.classList.contains("theme-dark") ? "dark" : "light";
}
var EXPLORER_CSS = `
/* \u5355\u7BC7\u5F00\u5173\uFF1A\u548C\u7BA1\u7406\u5668\u754C\u9762\u91CC\u90A3\u4E2A .sw \u540C\u4E00\u4E2A\u9020\u578B\uFF08\u80F6\u56CA + \u5706\u94AE\uFF09\uFF0C
   \u4F46\u7F29\u5230 24\xD713\uFF0C\u56E0\u4E3A\u5728 250px \u5BBD\u7684\u6587\u4EF6\u6811\u91CC 30\xD716 \u592A\u5360\u5730\u65B9\u3002 */
.blog-pub-sw {
  position: relative; flex-shrink: 0; margin-left: 6px;
  width: 24px; height: 13px; border-radius: 999px;
  background: var(--background-modifier-border);
  cursor: pointer; user-select: none;
  transition: background-color .15s ease;
}
.blog-pub-sw::after {
  content: ''; position: absolute; top: 1.5px; left: 2px;
  width: 10px; height: 10px; border-radius: 50%;
  background: var(--text-on-accent, #fff);
  box-shadow: 0 1px 2px rgba(0,0,0,.25);
  transition: left .15s ease;
}
.blog-pub-sw.on { background: #2570cc; }
.blog-pub-sw.on::after { left: 12px; }
.blog-pub-sw:hover { box-shadow: 0 0 0 2px var(--background-modifier-hover); }

/* \u6587\u4EF6\u884C\uFF1A\u5F00\u5173\u8D34\u5230\u884C\u5C3E\uFF08\u548C\u6587\u4EF6\u5939\u884C\u5BF9\u9F50\uFF0C\u4E0D\u7136\u5B83\u7D27\u8DDF\u5728\u6807\u9898\u540E\u9762\uFF09 */
.nav-file-title .blog-pub-sw { margin-left: auto; }

/* \u6279\u91CF\u6309\u94AE\uFF08\u6587\u4EF6\u5939 / \u5168\u5E93\uFF09\uFF1A\u4E24\u4E2A\u660E\u786E\u7684\u300C\u516C\u5F00\u300D\u300C\u79C1\u5BC6\u300D\u3002
   \u505A\u6210\u4E00\u4E2A\u8FDE\u4F53\u7684\u5206\u6BB5\u63A7\u4EF6\uFF08\u5171\u7528\u5916\u6846\u3001\u4E2D\u95F4\u4E00\u9053\u5206\u9694\u7EBF\uFF09\uFF0C\u6BD4\u4E24\u4E2A\u72EC\u7ACB\u5C0F\u80F6\u56CA
   \u7D27\u51D1\u5F97\u591A\uFF0C\u89C6\u89C9\u4E0A\u4E5F\u53EA\u5360\u300C\u4E00\u4E2A\u63A7\u4EF6\u300D\u7684\u4F4D\u7F6E\u3002 */
.blog-pub-batch {
  margin-left: 6px; flex-shrink: 0;
  display: inline-flex; align-items: stretch;
  border: 1px solid var(--background-modifier-border);
  border-radius: 4px; overflow: hidden;
}
.blog-pub-bbtn {
  font-size: 10px; line-height: 12px; padding: 1px 5px;
  cursor: pointer; user-select: none;
  color: var(--text-faint); background: transparent;
  transition: background-color .12s ease, color .12s ease;
}
.blog-pub-bbtn + .blog-pub-bbtn { border-left: 1px solid var(--background-modifier-border); }
.blog-pub-bbtn:hover { color: var(--text-normal); background: var(--background-modifier-hover); }
.blog-pub-bbtn.active {
  background: #2570cc; color: var(--text-on-accent, #fff);
}
.blog-pub-bbtn.active:hover { background: #2570cc; color: var(--text-on-accent, #fff); }
body.theme-dark .blog-pub-bbtn.active,
body.theme-dark .blog-pub-bbtn.active:hover { background: #5b9bf8; }

/* \u6587\u4EF6\u5939\u884C\u5C3E\uFF1A\u8BA1\u6570\u5E38\u9A7B\uFF08\u4E0D\u60AC\u505C\u4E5F\u80FD\u770B\u5230\u516C\u5F00\u4E86\u51E0\u7BC7\uFF09\uFF0C\u6309\u94AE\u7EC4\u8DDF\u540E\u9762 */
.blog-pub-folder {
  margin-left: auto; flex-shrink: 0;
  display: flex; align-items: center; gap: 4px;
}
.blog-pub-folder .blog-pub-fcount {
  font-size: 10px; line-height: 15px; color: var(--text-faint);
  font-variant-numeric: tabular-nums;
}
/* \u9876\u90E8\u5DE5\u5177\u6761\u91CC\u7684\u6309\u94AE\u7EC4\uFF1A\u8DDF\u7740 nav-action-button \u7684\u5C3A\u5BF8\u8D70 */
.blog-pub-navwrap { display: inline-flex; align-items: center; padding: 0 4px; }

/* \u6DF1\u8272\u4E3B\u9898\u4E0B\u7528\u4EAE\u4E00\u6863\u7684\u84DD\uFF0C\u5426\u5219 #2570cc \u538B\u5728\u6DF1\u5E95\u4E0A\u53D1\u95F7\u3002
   \uFF08.theme-dark \u662F Obsidian \u6302\u5728 body \u4E0A\u7684\uFF0C\u4E0D\u9700\u8981\u63D2\u4EF6\u81EA\u5DF1\u5224\u65AD\u3002\uFF09 */
body.theme-dark .blog-pub-sw.on { background: #5b9bf8; }
`;
function getUtilityProcess() {
  try {
    const electron = require("electron");
    const main = electron.remote?.require ? electron.remote.require("electron") : null;
    const up = main?.utilityProcess ?? electron.utilityProcess;
    if (up && typeof up.fork === "function") return up;
  } catch {
  }
  return null;
}
function dataRoot() {
  const fromEnv = (process.env.OBSIDIAN_BLOG_DATA || "").trim();
  if (fromEnv) return nodePath.resolve(fromEnv);
  const home = nodeOs.homedir() || "";
  if (process.platform === "win32") {
    return nodePath.join(process.env.APPDATA || nodePath.join(home, "AppData", "Roaming"), "obsidian-blog");
  }
  if (process.platform === "darwin") {
    return nodePath.join(home, "Library", "Application Support", "obsidian-blog");
  }
  return nodePath.join(process.env.XDG_CONFIG_HOME || nodePath.join(home, ".config"), "obsidian-blog");
}
var BlogPublisherPlugin = class extends import_obsidian2.Plugin {
  child = null;
  port = 0;
  starting = null;
  toolRoot = "";
  explorer = null;
  /** 界面语言：跟随 Obsidian，简体 / 繁体中文都算中文，其余英文 */
  lang = "zh";
  /** 当前语言的全部文案（视图与设置页也要读，故不设 private） */
  t = strings("zh");
  /** 命令对象留一份：Obsidian 改语言不广播事件，靠定时比对后改 name 刷新命令面板 */
  cmds = [];
  syncLang() {
    const next = hostLang(this.app);
    if (next === this.lang) return false;
    this.lang = next;
    this.t = strings(next);
    this.manifest.name = next === "zh" ? "\u535A\u5BA2\u53D1\u5E03\u5668" : "Blog Publisher";
    this.registerCommands();
    this.explorer?.setLang();
    for (const leaf of this.app.workspace.getLeavesOfType(VIEW_TYPE)) {
      const el = leaf.tabHeaderInnerTitleEl;
      if (el) el.setText(this.t.viewTitle);
    }
    return true;
  }
  /**
   * 注册 / 重注册命令。
   *
   * 命令面板里显示的插件名前缀是 addCommand 那一刻按 manifest.name 定死的，
   * 之后改 manifest.name 不会影响已经注册的命令（实测）。所以语言变了要把
   * 名字改好再整批重新注册一遍，前缀才会跟着变。
   */
  registerCommands() {
    for (const c of this.cmds) {
      try {
        this.removeCommand(c.id);
      } catch {
      }
    }
    this.cmds = [];
    this.cmds.push(
      this.addCommand({
        id: "open-publisher",
        name: this.t.cmdOpen,
        callback: () => void this.activateView()
      })
    );
    this.cmds.push(
      this.addCommand({
        id: "publish-now",
        name: this.t.cmdPublish,
        callback: async () => {
          const n = new import_obsidian2.Notice(this.t.publishing, 4e3);
          try {
            const port = await this.ensureServer();
            const r = await fetch(`http://127.0.0.1:${port}/api/publish`, {
              method: "POST",
              headers: { "content-type": "application/json" },
              body: "{}"
            });
            const j = await r.json();
            n.hide();
            new import_obsidian2.Notice(
              j.failed ? this.t.publishFailed((j.log || []).slice(-1)[0] || "") : j.pushed ? this.t.pushed : this.t.upToDate,
              6e3
            );
          } catch (e) {
            n.hide();
            new import_obsidian2.Notice(this.t.publishFailed(String(e?.message || e)), 8e3);
          }
        }
      })
    );
    const bulk = (pub, folderOnly) => async () => {
      const ex = this.explorer;
      if (!ex) return;
      if (folderOnly) {
        const folder = activeFolder(this.app);
        if (folder === null) {
          new import_obsidian2.Notice(this.t.noActiveNote, 5e3);
          return;
        }
        await ex.setFolder(folder, pub);
        return;
      }
      await ex.setAll(pub);
    };
    this.cmds.push(
      this.addCommand({ id: "set-all-public", name: this.t.cmdAllPublic, callback: bulk(true, false) }),
      this.addCommand({ id: "set-all-private", name: this.t.cmdAllPrivate, callback: bulk(false, false) }),
      this.addCommand({
        id: "set-folder-public",
        name: this.t.cmdFolderPublic,
        checkCallback: (checking) => {
          if (activeFolder(this.app) === null) return false;
          if (!checking) void bulk(true, true)();
          return true;
        }
      }),
      this.addCommand({
        id: "set-folder-private",
        name: this.t.cmdFolderPrivate,
        checkCallback: (checking) => {
          if (activeFolder(this.app) === null) return false;
          if (!checking) void bulk(false, true)();
          return true;
        }
      })
    );
  }
  async onload() {
    console.log("[blog-publisher] loading");
    this.lang = hostLang(this.app);
    this.t = strings(this.lang);
    this.manifest.name = this.lang === "zh" ? "\u535A\u5BA2\u53D1\u5E03\u5668" : "Blog Publisher";
    (0, import_obsidian2.addIcon)(
      "blog-publisher",
      '<svg viewBox="0 0 100 100"><path fill="currentColor" d="M20 15h60a5 5 0 0 1 5 5v60a5 5 0 0 1-5 5H20a5 5 0 0 1-5-5V20a5 5 0 0 1 5-5zm10 15v10h40V30H30zm0 18v8h40v-8H30zm0 16v8h26v-8H30z"/></svg>'
    );
    const style = document.createElement("style");
    style.id = "blog-publisher-explorer-css";
    style.textContent = EXPLORER_CSS;
    document.head.appendChild(style);
    this.register(() => style.remove());
    this.registerView(VIEW_TYPE, (leaf) => new BlogPublisherView(leaf, this));
    this.addRibbonIcon("blog-publisher", this.t.ribbonOpen, () => {
      void this.activateView();
    });
    this.registerCommands();
    this.addSettingTab(new BlogPublisherSettingTab(this.app, this));
    void this.ensureServer().then(() => {
      this.explorer = new ExplorerBadges(this.app, () => this.ensureServer());
      this.explorer.start();
      this.register(() => this.explorer?.stop());
    }).catch((e) => {
      console.error("[blog-publisher] \u542F\u52A8\u5931\u8D25", e);
      new import_obsidian2.Notice(this.t.pluginStartFail(String(e?.message || e)), 1e4);
    });
    this.registerInterval(window.setInterval(() => this.syncLang(), 2e3));
    this.registerDomEvent(window, "focus", () => this.syncLang());
    this.registerDomEvent(document, "visibilitychange", () => {
      if (document.visibilityState === "visible") this.syncLang();
    });
  }
  async onunload() {
    this.explorer?.stop();
    this.explorer = null;
    if (this.child) {
      try {
        this.child.postMessage({ type: "stop" });
      } catch {
      }
      await new Promise((res) => setTimeout(res, 1500));
      try {
        this.child.kill();
      } catch {
      }
      this.child = null;
    }
  }
  /**
   * 确保后台服务在跑，返回端口。
   *
   * 模板要先铺到用户数据目录（插件装到 .obsidian/plugins/ 之后，用户机器上
   * 不一定还有 blog-static 源码目录），所以第一次会多花几百毫秒写 ~50 个文件。
   */
  async ensureServer() {
    if (this.port) return this.port;
    if (this.starting) return this.starting;
    this.starting = (async () => {
      const root = dataRoot();
      this.toolRoot = nodePath.join(root, "site-template");
      if (!templateReady(nodeFs, nodePath, this.toolRoot)) {
        console.log("[blog-publisher] \u9996\u6B21\u94FA\u5F00\u7AD9\u70B9\u6A21\u677F \u2192", this.toolRoot);
        materializeTemplate(nodeFs, nodePath, this.toolRoot);
      }
      const basePath = this.app.vault.adapter.basePath || "";
      const workerPath = basePath ? nodePath.join(basePath, this.manifest.dir || "", "worker.js") : nodePath.join(this.manifest.dir || "", "worker.js");
      const startEnv = { ...process.env, BLOG_PUBLISHER_START: JSON.stringify({ toolRoot: this.toolRoot, dataDir: root, port: 0 }) };
      const port = await new Promise((resolve2, reject) => {
        const timer = setTimeout(() => reject(new Error("\u540E\u53F0\u670D\u52A1\u542F\u52A8\u8D85\u65F6\uFF0840 \u79D2\uFF09")), 4e4);
        const utility = getUtilityProcess();
        let child = null;
        if (utility) {
          const u = utility.fork(workerPath, [], { env: startEnv, stdio: "pipe" });
          child = {
            postMessage: (m) => u.postMessage(m),
            on: (ev, cb) => {
              if (ev === "message") u.on("message", cb);
              else if (ev === "exit") u.on("exit", cb);
              else if (ev === "error") u.on("error", cb);
            },
            kill: () => {
              try {
                u.kill();
              } catch {
              }
            },
            pid: u.pid
          };
          if (u.stderr) u.stderr.on("data", (d) => console.error("[blog-publisher] " + String(d)));
        } else {
          const cp = require("node:child_process");
          const c2 = cp.spawn("node", [workerPath], { env: startEnv, windowsHide: true });
          child = {
            postMessage: (m) => c2.send(m),
            on: (ev, cb) => {
              if (ev === "message") c2.on("message", cb);
              else if (ev === "exit") c2.on("exit", (code) => cb(code));
              else if (ev === "error") c2.on("error", cb);
            },
            kill: () => {
              try {
                c2.kill();
              } catch {
              }
            },
            pid: c2.pid
          };
          c2.stderr?.on("data", (d) => console.error("[blog-publisher] " + String(d)));
        }
        this.child = child;
        const c = child;
        c.on("message", (m) => {
          if (m.type === "ready" && typeof m.port === "number") {
            clearTimeout(timer);
            resolve2(m.port);
          } else if (m.type === "error") {
            clearTimeout(timer);
            reject(new Error(m.error || "\u672A\u77E5\u9519\u8BEF"));
          } else if (m.type === "log") {
            console.log("[blog-publisher] " + m.text);
          }
        });
        c.on("error", (e) => {
          clearTimeout(timer);
          reject(e);
        });
        c.on("exit", (code) => {
          clearTimeout(timer);
          reject(new Error("\u540E\u53F0\u670D\u52A1\u8FDB\u7A0B\u9000\u51FA\uFF08code " + code + "\uFF09"));
        });
      });
      this.port = port;
      console.log("[blog-publisher] \u670D\u52A1\u5DF2\u5C31\u7EEA\uFF0C\u7AEF\u53E3", port);
      return port;
    })();
    try {
      return await this.starting;
    } finally {
      this.starting = null;
    }
  }
  async activateView() {
    const { workspace } = this.app;
    const leaves = workspace.getLeavesOfType(VIEW_TYPE);
    let leaf = leaves.find((l) => l.getRoot() === workspace.rootSplit);
    if (!leaf) {
      for (const old of leaves) {
        if (old.getRoot() !== workspace.rootSplit) old.detach();
      }
      leaf = workspace.getLeaf("tab");
      await leaf.setViewState({ type: VIEW_TYPE, active: true });
    }
    workspace.revealLeaf(leaf);
    return leaf;
  }
};
var BlogPublisherView = class extends import_obsidian2.ItemView {
  plugin;
  frame = null;
  langTimer = null;
  langSent = "";
  constructor(leaf, plugin) {
    super(leaf);
    this.plugin = plugin;
  }
  getViewType() {
    return VIEW_TYPE;
  }
  getDisplayText() {
    return this.plugin.t.viewTitle;
  }
  getIcon() {
    return "blog-publisher";
  }
  async onOpen() {
    const root = this.contentEl;
    root.empty();
    root.addClass("blog-publisher-root");
    root.style.padding = "0";
    root.style.overflow = "hidden";
    const loading = root.createDiv({ text: this.plugin.t.loading, cls: "blog-publisher-loading" });
    loading.style.padding = "20px";
    try {
      const port = await this.plugin.ensureServer();
      loading.remove();
      const frame = root.createEl("iframe");
      const lang = hostLang(this.app);
      const theme = hostTheme();
      this.langSent = lang + "|" + theme;
      const vaultPath = this.app.vault.adapter.basePath || "";
      const vq = vaultPath ? "&vault=" + encodeURIComponent(vaultPath) : "";
      frame.src = `http://127.0.0.1:${port}/?embed=1&lang=${lang}&theme=${theme}${vq}`;
      frame.style.width = "100%";
      frame.style.height = "100%";
      frame.style.border = "0";
      frame.style.display = "block";
      frame.setAttribute("allow", "clipboard-write");
      this.frame = frame;
      this.registerEvent(
        this.app.workspace.on("css-change", () => {
          this.postSettings();
        })
      );
      this.langTimer = window.setInterval(() => {
        const now = hostLang(this.app) + "|" + hostTheme();
        if (now !== this.langSent) this.postSettings();
      }, 2e3);
    } catch (e) {
      loading.setText(this.plugin.t.startFail(String(e?.message || e)));
      loading.style.color = "var(--text-error)";
    }
  }
  /** 把宿主的语言 / 主题送进 iframe（不刷新，避免丢输入和滚动位置） */
  postSettings() {
    const win = this.frame?.contentWindow;
    if (!win) return;
    const lang = hostLang(this.app);
    const theme = hostTheme();
    this.langSent = lang + "|" + theme;
    try {
      win.postMessage({ __blogPublisher: true, lang, theme }, "*");
    } catch {
    }
  }
  async onClose() {
    if (this.langTimer !== null) window.clearInterval(this.langTimer);
    this.langTimer = null;
    this.frame = null;
  }
};
var BlogPublisherSettingTab = class extends import_obsidian2.PluginSettingTab {
  plugin;
  constructor(app, plugin) {
    super(app, plugin);
    this.plugin = plugin;
  }
  display() {
    const { containerEl } = this;
    containerEl.empty();
    const t = this.plugin.t;
    containerEl.createEl("h2", { text: t.settingsTitle });
    containerEl.createEl("p", {
      text: t.settingsDataDesc,
      cls: "setting-item-description"
    });
    new import_obsidian2.Setting(containerEl).setName(t.settingsOpenName).setDesc(t.settingsOpenDesc).addButton(
      (b) => b.setButtonText(t.settingsOpenBtn).onClick(() => {
        void this.plugin.activateView();
      })
    );
    new import_obsidian2.Setting(containerEl).setName(t.settingsBrowserName).setDesc(t.settingsBrowserDesc).addButton(
      (b) => b.setButtonText(t.settingsBrowserBtn).onClick(async () => {
        const port = await this.plugin.ensureServer();
        window.open(`http://127.0.0.1:${port}/`, "_blank");
      })
    );
  }
};
