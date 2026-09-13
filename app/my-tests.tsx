import Image from 'next/image';
import type { Metadata } from 'next';
import SiteHeader from './site-header';
import { myTests } from './content/my-tests';
import { localePaths, myTestsPaths, translate, type Locale } from './content/translations';

export function createMyTestsMetadata(locale: Locale): Metadata {
  const t = (text: string) => translate(locale, text);
  const title = t('我的鹈鹕测试集锦 | Pelican Test');
  const description = t('记录我的鹈鹕骑行测试，浏览不同模型的作品、日期和原始提示词，打开完整演示。');

  return {
    title,
    description,
    alternates: {
      canonical: myTestsPaths[locale],
      languages: { 'zh-CN': myTestsPaths.zh, en: myTestsPaths.en, 'x-default': myTestsPaths.zh },
    },
    openGraph: {
      title,
      description,
      type: 'website',
      url: myTestsPaths[locale],
      locale: locale === 'zh' ? 'zh_CN' : 'en_US',
      alternateLocale: locale === 'zh' ? 'en_US' : 'zh_CN',
    },
    twitter: { card: 'summary', title, description },
  };
}

export default function MyTests({ locale }: { locale: Locale }) {
  const t = (text: string) => translate(locale, text);

  return (
    <div className="site-shell collection-shell">
      <a className="skip-link" href="#my-tests">{t('跳到测试集锦')}</a>
      <SiteHeader locale={locale} section="my-tests" />

      <main className="collection-main" id="my-tests">
        <div className="collection-heading">
          <div>
            <h1>{t('我的鹈鹕测试集锦')}</h1>
            <p>{t('我用不同模型生成的鹈鹕骑行作品，持续收集中。')}</p>
          </div>
          <span className="collection-count">
            {locale === 'zh' ? `${myTests.length} 个测试` : `${myTests.length} ${myTests.length === 1 ? 'test' : 'tests'}`}
          </span>
        </div>

        <div className="test-grid">
          {myTests.map((test) => (
            <article className="test-card" key={test.id}>
              <a
                className="test-card-link"
                href={test.href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={`${t('打开测试')}：${t(test.title)} · ${test.model} · ${test.date}（${t('新标签页')}）`}
              >
                <div className="test-thumbnail">
                  <Image
                    src={test.thumbnail}
                    alt={t(test.thumbnailAlt)}
                    width={1200}
                    height={600}
                    sizes="(max-width: 720px) calc(100vw - 32px), (max-width: 1288px) calc((100vw - 72px) / 2), 608px"
                    unoptimized
                  />
                  <span className="test-play" aria-hidden="true">
                    <svg viewBox="0 0 24 24" fill="currentColor"><path d="m9 5 11 7-11 7Z" /></svg>
                  </span>
                </div>
                <div className="test-card-body">
                  <h2>{t(test.title)}</h2>
                  <dl className="test-details">
                    <div><dt>{t('模型')}</dt><dd>{test.model}</dd></div>
                    <div><dt>{t('日期')}</dt><dd><time dateTime={test.date}>{test.date}</time></dd></div>
                  </dl>
                  <p className="test-description">{t(test.description)}</p>
                  <div className="test-prompt">
                    <span>{t('原始提示词')}</span>
                    <blockquote lang="zh-CN">{test.prompt}</blockquote>
                  </div>
                  <span className="test-open">
                    {t('打开完整演示')}
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden="true">
                      <path d="M7 17 17 7M7 7h10v10" />
                    </svg>
                    <span className="visually-hidden">（{t('新标签页')}）</span>
                  </span>
                </div>
              </a>
            </article>
          ))}
        </div>
      </main>

      <footer>
        <p>Pelican Test</p>
        <a href={localePaths[locale]}>{t('浏览鹈鹕测试时间轴')}</a>
      </footer>
    </div>
  );
}
