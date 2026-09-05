import assert from 'node:assert/strict';
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { test } from 'node:test';
import ts from 'typescript';
import { milestones } from '../app/content/milestones.ts';
import { english } from '../app/content/translations.ts';

const projectDir = fileURLToPath(new URL('../', import.meta.url));

test('timeline entries have valid dates, unique keys and chronological order', () => {
  assert.ok(milestones.length > 0, 'The timeline must contain at least one entry');
  const keys = new Set();
  for (const [index, milestone] of milestones.entries()) {
    const { date, year, model } = milestone;
    assert.match(date, /^\d{4}-\d{2}(?:-\d{2})?$/, `${model}: invalid date format`);
    const day = date.length === 7 ? `${date}-01` : date;
    assert.equal(new Date(day).toISOString().slice(0, 10), day, `${model}: invalid date`);
    assert.equal(year, date.slice(0, 4), `${model}: year does not match date`);
    if (index) assert.ok(date >= milestones[index - 1].date, `${model}: date is out of order`);
    const key = `${date}-${model}`;
    assert.ok(!keys.has(key), `Duplicate timeline entry: ${key}`);
    keys.add(key);
  }
});

test('every sample has a local asset and a source link', () => {
  const mediaPaths = new Set();
  for (const milestone of milestones) {
    assert.ok(milestone.media.length > 0, `${milestone.model}: missing media`);
    assert.ok(milestone.sources.length > 0, `${milestone.model}: missing sources`);
    for (const media of milestone.media) {
      assert.match(media.src, /^\/pelicans\/[^/]+\.(svg|png|jpe?g|webp|mp4)$/);
      assert.ok(fs.existsSync(path.join(projectDir, 'public', media.src)), `Missing asset: ${media.src}`);
      assert.ok(media.alt.trim() && media.label.trim(), `${media.src}: missing description`);
      assert.equal(media.kind === 'video', media.src.endsWith('.mp4'), `${media.src}: incorrect media kind`);
      assert.ok(!mediaPaths.has(media.src), `Duplicate preview asset: ${media.src}`);
      mediaPaths.add(media.src);
    }
    for (const source of milestone.sources) {
      assert.equal(new URL(source.href).protocol, 'https:', `Invalid source: ${source.href}`);
      assert.ok(source.label.trim(), `${source.href}: missing source label`);
    }
  }
});

test('Chinese content and literal translation calls have English translations', () => {
  const texts = new Set();
  const collect = (value) => {
    if (typeof value === 'string' && /\p{Script=Han}/u.test(value)) texts.add(value);
    else if (value && typeof value === 'object') Object.values(value).forEach(collect);
  };
  collect(milestones);

  const scan = (directory) => {
    for (const entry of fs.readdirSync(directory, { withFileTypes: true })) {
      const file = path.join(directory, entry.name);
      if (entry.isDirectory()) scan(file);
      else if (/\.tsx?$/.test(file)) {
        const tree = ts.createSourceFile(file, fs.readFileSync(file, 'utf8'), ts.ScriptTarget.Latest, true);
        const visit = (node) => {
          if (ts.isCallExpression(node) && ts.isIdentifier(node.expression)) {
            const name = node.expression.text;
            const argument = node.arguments[name === 'translate' ? 1 : 0];
            if ((name === 't' || name === 'translate') && argument && ts.isStringLiteralLike(argument)) {
              collect(argument.text);
            }
          }
          ts.forEachChild(node, visit);
        };
        visit(tree);
      }
    }
  };
  scan(path.join(projectDir, 'app'));
  const missing = [...texts].filter((text) => !english[text]?.trim());
  assert.deepEqual(missing, [], `Missing English translations:\n${missing.join('\n')}`);
});
