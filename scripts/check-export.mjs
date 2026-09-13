import assert from 'node:assert/strict';
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { milestones } from '../app/content/milestones.ts';
import { myTests } from '../app/content/my-tests.ts';

const exportDir = fileURLToPath(new URL('../dist/client/', import.meta.url));
const origin = 'https://pelican.catou.se';
const pages = [
  { file: 'index.html', pathname: '/', lang: 'zh-CN', heading: '同一提示词，看见两年进步', title: '鹈鹕测试时间轴 | 大模型 SVG 能力演进', image: '/og.png' },
  { file: 'en/index.html', pathname: '/en/', lang: 'en', heading: 'One prompt, two years of progress', title: 'Pelican Test Timeline | LLM SVG Capability Evolution', image: '/og-en.png' },
  { file: 'my-tests/index.html', pathname: '/my-tests/', lang: 'zh-CN', heading: '我的鹈鹕测试集锦', title: '我的鹈鹕测试集锦 | Pelican Test', collection: true },
  { file: 'en/my-tests/index.html', pathname: '/en/my-tests/', lang: 'en', heading: 'My pelican test collection', title: 'My pelican test collection | Pelican Test', collection: true },
];

for (const page of pages) {
  const html = fs.readFileSync(path.join(exportDir, page.file), 'utf8');
  const tags = [...html.matchAll(/<(?:html|meta|link)\b[^>]*>/g)].map(([tag]) =>
    Object.fromEntries([...tag.matchAll(/([\w:-]+)="([^"]*)"/g)].map(([, key, value]) => [key, value])),
  );
  const meta = (name) => tags.find((tag) => tag.name === name || tag.property === name)?.content;
  assert.equal(tags[0].lang, page.lang, `${page.file}: incorrect document language`);
  assert.ok(html.includes(`<h1>${page.heading}</h1>`), `${page.file}: incorrect initial content`);
  assert.ok(html.includes(`<title>${page.title}</title>`), `${page.file}: incorrect title`);
  assert.equal(meta('og:image'), page.image ? origin + page.image : undefined);
  assert.equal(meta('twitter:image'), page.image ? origin + page.image : undefined);
  assert.equal(meta('og:url'), origin + page.pathname);
  assert.equal(tags.find((tag) => tag.rel === 'canonical')?.href, origin + page.pathname);
  const languages = page.collection
    ? [['zh-CN', '/my-tests/'], ['en', '/en/my-tests/']]
    : [['zh-CN', '/'], ['en', '/en/']];
  for (const [lang, pathname] of languages) {
    assert.equal(tags.find((tag) => tag.rel === 'alternate' && tag.hrefLang === lang)?.href, origin + pathname);
  }
  const entryClass = page.collection ? 'test-card' : 'timeline-entry';
  const entries = page.collection ? myTests : milestones;
  assert.equal((html.match(new RegExp(`class="${entryClass}"`, 'g')) ?? []).length, entries.length);
  if (page.image) assert.ok(fs.existsSync(path.join(exportDir, page.image)), `${page.file}: missing sharing image`);
  if (page.collection) {
    for (const item of myTests) {
      assert.ok(html.includes(item.model) && html.includes(item.date), `${page.file}: missing test metadata`);
      assert.ok(html.includes(`href="${item.href}"`), `${page.file}: missing demo link`);
    }
  }

  const assets = new Set([...html.matchAll(/(?:src|href)="(\/(?!\/)[^"#?]*)"/g)].map(([, asset]) => asset));
  for (const asset of assets) {
    const file = path.join(exportDir, asset.endsWith('/') ? asset + 'index.html' : asset);
    assert.ok(fs.existsSync(file), `${page.file}: missing exported asset ${asset}`);
  }
  console.log(`${page.file}: language, metadata, ${entries.length} entries, and ${assets.size} local references verified`);
}
