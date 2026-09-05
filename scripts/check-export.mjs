import assert from 'node:assert/strict';
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { milestones } from '../app/content/milestones.ts';

const exportDir = fileURLToPath(new URL('../dist/client/', import.meta.url));
const origin = 'https://pelican.catou.se';
const pages = [
  { file: 'index.html', pathname: '/', lang: 'zh-CN', heading: '同一提示词，看见两年进步', title: '鹈鹕测试时间轴 | 大模型 SVG 能力演进', image: '/og.png' },
  { file: 'en/index.html', pathname: '/en/', lang: 'en', heading: 'One prompt, two years of progress', title: 'Pelican Test Timeline | LLM SVG Capability Evolution', image: '/og-en.png' },
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
  assert.equal(meta('og:image'), origin + page.image);
  assert.equal(meta('twitter:image'), origin + page.image);
  assert.equal(meta('og:url'), origin + page.pathname);
  assert.equal(tags.find((tag) => tag.rel === 'canonical')?.href, origin + page.pathname);
  for (const [lang, pathname] of [['zh-CN', '/'], ['en', '/en/']]) {
    assert.equal(tags.find((tag) => tag.rel === 'alternate' && tag.hrefLang === lang)?.href, origin + pathname);
  }
  assert.equal((html.match(/class="timeline-entry"/g) ?? []).length, milestones.length);
  assert.ok(fs.existsSync(path.join(exportDir, page.image)), `${page.file}: missing sharing image`);

  const assets = new Set([...html.matchAll(/(?:src|href)="(\/(?!\/)[^"#?]*)"/g)].map(([, asset]) => asset));
  for (const asset of assets) {
    const file = path.join(exportDir, asset.endsWith('/') ? asset + 'index.html' : asset);
    assert.ok(fs.existsSync(file), `${page.file}: missing exported asset ${asset}`);
  }
  console.log(`${page.file}: language, metadata, ${milestones.length} entries, and ${assets.size} local references verified`);
}
