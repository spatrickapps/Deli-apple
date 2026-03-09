#!/usr/bin/env node
/**
 * Build script: JSX → plain JS (Babel) → minified (Terser)
 * Run by Netlify on every deploy via netlify.toml [build] command
 */

const fs = require("fs");
const path = require("path");
const { execSync } = require("child_process");

// Install deps if needed
console.log("📦 Installing build tools...");
execSync("npm install --save-dev @babel/core @babel/preset-react terser", {
  stdio: "inherit",
  cwd: __dirname,
});

const babel = require("@babel/core");
const { minify } = require("terser");

const SRC = path.join(__dirname, "../src/app.jsx");
const OUT_DIR = path.join(__dirname, "../public");
const OUT_JS = path.join(OUT_DIR, "app.min.js");

async function build() {
  console.log("⚙️  Transpiling JSX...");
  const source = fs.readFileSync(SRC, "utf8");

  const transpiled = babel.transformSync(source, {
    presets: [
      ["@babel/preset-react", { runtime: "classic" }],
    ],
    configFile: false,
    filename: "app.jsx",
  });

  console.log("🗜️  Minifying...");
  const minified = await minify(transpiled.code, {
    compress: {
      dead_code: true,
      drop_console: true,      // removes all console.log/error calls
      passes: 2,
    },
    mangle: {
      toplevel: true,           // renames top-level variables to single chars
    },
    format: {
      comments: false,          // strip all comments
    },
  });

  fs.writeFileSync(OUT_JS, minified.code, "utf8");

  const origKB = Math.round(Buffer.byteLength(source) / 1024);
  const minKB = Math.round(Buffer.byteLength(minified.code) / 1024);
  console.log(`✅ Built: ${origKB}KB → ${minKB}KB (${Math.round((1 - minKB/origKB)*100)}% smaller)`);
}

build().catch(e => { console.error(e); process.exit(1); });
