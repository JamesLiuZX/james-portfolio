#!/usr/bin/env node
// Kino's website, at /kino/, is built from Kino's own repository
// (JamesLiuZX/kino, its main) into public/kino/, which `next build` then copies
// into the site. Vercel, which serves jamesliuzx.com, runs this before every
// build (vercel.json). deploy.yml builds Kino with its own steps first, so
// there this finds public/kino/ already built and does nothing.

import { execFileSync } from "node:child_process"
import { existsSync, rmSync } from "node:fs"

if (existsSync("public/kino/index.html")) {
  console.log("Kino: public/kino/ is already built.")
  process.exit(0)
}
const run = (cmd, args, options = {}) => execFileSync(cmd, args, { stdio: "inherit", ...options })
rmSync("kino", { recursive: true, force: true })
run("git", ["clone", "--quiet", "--depth", "1", "--branch", "main", "https://github.com/JamesLiuZX/kino.git", "kino"])
// Kino's other dev dependencies build its desktop app: skip Electron's 100 MB download.
run("npm", ["ci", "--no-audit", "--no-fund", "--omit=optional"], { cwd: "kino", env: { ...process.env, ELECTRON_SKIP_BINARY_DOWNLOAD: "1" } })
// The two in-browser models come from Kino's web-models release.
run("node", ["kino/web/build.mjs", "public/kino", "--strict", "--fetch-models"])
