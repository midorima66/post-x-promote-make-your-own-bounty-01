// Entry for the make.fun bounty post-x-promote-make-your-own-bounty-01.
// The entry's real work is the X post itself; this program hands the
// post's address to the grader by copying POST.json (the file beside
// this one) into the output directory. Outside the grader's container,
// MAKEFUN_OUTPUT_DIR stands in for /output:
//   mkdir -p out && MAKEFUN_OUTPUT_DIR=out node main.ts
// No network: every run copies the same bytes after one sanity check —
// POST.json must parse and name an x.com status address, so a placeholder
// or a truncated file fails here instead of at the grader.

import { copyFileSync, readFileSync } from 'node:fs';
import { join } from 'node:path';

const source = new URL('./POST.json', import.meta.url);
const post = JSON.parse(readFileSync(source, 'utf8'));
if (typeof post.url !== 'string' || !/^https:\/\/x\.com\/[^/]+\/status\/\d+$/.test(post.url)) {
  throw new Error(`POST.json does not name an X post: ${JSON.stringify(post)}`);
}

copyFileSync(source, join(process.env.MAKEFUN_OUTPUT_DIR ?? '/output', 'POST.json'));
