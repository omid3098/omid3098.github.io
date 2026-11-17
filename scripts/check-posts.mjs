// Fails the build when a new post has too few pictures for its length.
// Omid (2026-11-12, again 2026-11-17): a post needs a picture after every few paragraphs;
// step diagrams (<ol class="flow">), tables and code do not count as pictures.
import { readFileSync, readdirSync } from 'node:fs';
import { join } from 'node:path';

const DIR = process.argv[2] || 'src/content/blog';
const FROM = '2026-11-12'; // posts before this date were written before the rule
const WORDS_PER_PICTURE = 200;

const pictureRes = [
  /!\[[^\]]*\]\([^)]+\)/g, // markdown image
  /<img\b/g,
  /<video\b/g,
  /class="twitter-tweet"/g, // embedded X post
  /class="compare"/g, // before/after bar
];

const failures = [];
for (const name of readdirSync(DIR).filter((f) => f.endsWith('.md'))) {
  const text = readFileSync(join(DIR, name), 'utf8');
  const fm = text.match(/^---\n([\s\S]*?)\n---/);
  const front = fm ? fm[1] : '';
  const date = (front.match(/^date:\s*(\S+)/m) || [])[1] || '';
  if (date < FROM || /^draft:\s*true/m.test(front)) continue;

  const body = fm ? text.slice(fm[0].length) : text;
  const pictures = pictureRes.reduce((n, re) => n + (body.match(re) || []).length, 0);
  const prose = body
    .replace(/<ol class="flow">[\s\S]*?<\/ol>/g, ' ')
    .replace(/<[^>]+>/g, ' ')
    .replace(/!\[[^\]]*\]\([^)]+\)/g, ' ')
    .replace(/\]\([^)]+\)/g, ' ');
  const words = (prose.match(/[\p{L}\p{N}][\p{L}\p{N}\p{M}'’‌-]*/gu) || []).length;
  const needed = Math.max(1, Math.ceil(words / WORDS_PER_PICTURE));
  if (pictures < needed) {
    failures.push(`${name}: ${pictures} picture(s) for ${words} words; needs at least ${needed} (one per ${WORDS_PER_PICTURE} words). A step diagram is not a picture: add screenshots, GIFs, frames or mocks of what the text explains.`);
  }
}

if (failures.length) {
  console.error('Post picture check failed:\n- ' + failures.join('\n- '));
  process.exit(1);
}
console.log('Post picture check passed.');
