'use client';

import Image from 'next/image';
import { useEffect, useMemo, useRef, useState, type CSSProperties } from 'react';
import { readPreference, writePreference } from './preferences';
import { milestones, mediaCount, timelineStart, latestUpdate, type Media } from './content/milestones';
import { translate, localePaths, type Locale } from './content/translations';

const yearOptions = ['全部', ...new Set(milestones.map((milestone) => milestone.year))] as const;
type YearOption = (typeof yearOptions)[number];
type Theme = 'light' | 'dark';

function LanguageSwitch({
  locale,
  onSelect,
}: {
  locale: Locale;
  onSelect: (locale: Locale) => void;
}) {
  return (
    <div className="language-select">
      <svg
        className="control-icon"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        aria-hidden="true"
      >
        <circle cx="12" cy="12" r="9" />
        <path d="M3 12h18M12 3c2.3 2.5 3.5 5.5 3.5 9s-1.2 6.5-3.5 9c-2.3-2.5-3.5-5.5-3.5-9S9.7 5.5 12 3Z" />
      </svg>
      <select
        value={locale}
        aria-label={locale === 'zh' ? '语言' : 'Language'}
        onChange={(event) => onSelect(event.target.value as Locale)}
      >
        <option value="zh">中文</option>
        <option value="en">English</option>
      </select>
    </div>
  );
}

function ThemeSwitch({ locale }: { locale: Locale }) {
  const [theme, setTheme] = useState<Theme | null>(null);
  const selectedTheme = useRef<Theme | null>(null);

  useEffect(() => {
    const media = window.matchMedia('(prefers-color-scheme: dark)');
    const savedTheme = readPreference('pelican-theme');
    selectedTheme.current = savedTheme === 'light' || savedTheme === 'dark' ? savedTheme : null;
    const syncTheme = () => {
      const nextTheme = selectedTheme.current ?? (media.matches ? 'dark' : 'light');

      document.documentElement.dataset.theme = nextTheme;
      document.documentElement.style.colorScheme = nextTheme;
      setTheme(nextTheme);
    };

    syncTheme();
    media.addEventListener('change', syncTheme);
    return () => media.removeEventListener('change', syncTheme);
  }, []);

  const selectTheme = (nextTheme: Theme) => {
    selectedTheme.current = nextTheme;
    document.documentElement.dataset.theme = nextTheme;
    document.documentElement.style.colorScheme = nextTheme;
    setTheme(nextTheme);
    writePreference('pelican-theme', nextTheme);
  };

  const isDark = theme === 'dark';

  return (
    <button
      className="theme-toggle"
      type="button"
      aria-label={
        locale === 'zh'
          ? isDark
            ? '切换为浅色模式'
            : '切换为深色模式'
          : isDark
            ? 'Switch to light mode'
            : 'Switch to dark mode'
      }
      aria-pressed={isDark}
      onClick={() => selectTheme(isDark ? 'light' : 'dark')}
    >
      {isDark ? (
        <svg
          className="control-icon"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          aria-hidden="true"
        >
          <circle cx="12" cy="12" r="4" />
          <path d="M12 2v2M12 20v2M4.93 4.93l1.42 1.42M17.66 17.66l1.41 1.41M2 12h2M20 12h2M4.93 19.07l1.42-1.42M17.66 6.34l1.41-1.41" />
        </svg>
      ) : (
        <svg
          className="control-icon"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          aria-hidden="true"
        >
          <path d="M20.5 14.5A8.5 8.5 0 0 1 9.5 3.5a8.5 8.5 0 1 0 11 11Z" />
        </svg>
      )}
    </button>
  );
}

function Comparison({ locale }: { locale: Locale }) {
  const [comparison, setComparison] = useState(47);
  const t = (text: string) => translate(locale, text);

  return (
    <figure className="comparison">
      <figcaption className="visually-hidden" id="comparison-caption">
        {t(
          '2024 年 Claude 3.5 Sonnet 的简化鸟形，与 2026 年 Qwen 3.8 27B 的完整鹈鹕骑自行车对比',
        )}
      </figcaption>
      <div className="comparison-meta" aria-hidden="true">
        <span>2024 Claude 3.5</span>
        <span>2026 Qwen 3.8</span>
      </div>
      <div
        className="comparison-stage"
        style={{ '--split': `${comparison}%` } as CSSProperties}
      >
        <Image
          className="comparison-image comparison-image-new"
          src="/pelicans/hero-qwen-3.8.webp"
          alt=""
          fill
          priority
          sizes="(max-width: 980px) 100vw, 58vw"
          unoptimized
          aria-hidden="true"
          style={{ objectFit: 'contain' }}
        />
        <Image
          className="comparison-image comparison-image-old"
          src="/pelicans/2024-10-claude-3.5-sonnet.svg"
          alt=""
          fill
          priority
          sizes="(max-width: 980px) 100vw, 58vw"
          unoptimized
          aria-hidden="true"
          style={{
            objectFit: 'contain',
            clipPath: `inset(0 ${100 - comparison}% 0 0)`,
          }}
        />
        <span className="comparison-divider" aria-hidden="true" />
        <input
          id="comparison-slider"
          className="comparison-stage-control"
          type="range"
          min="8"
          max="92"
          value={comparison}
          aria-label={t('拖动对比 2024 与 2026')}
          aria-describedby="comparison-caption"
          aria-valuetext={
            locale === 'zh'
              ? `左侧显示 ${comparison}% 的 2024 结果`
              : `${comparison}% of the 2024 result is visible on the left`
          }
          onChange={(event) => setComparison(Number(event.target.value))}
        />
      </div>
      <div className="comparison-control" aria-hidden="true">
        <span>{t('直接拖动图片，或使用方向键')}</span>
        <output htmlFor="comparison-slider">{comparison}%</output>
      </div>
    </figure>
  );
}

export default function Home({ locale }: { locale: Locale }) {
  const [year, setYear] = useState<YearOption>('全部');
  const [preview, setPreview] = useState<Media | null>(null);
  const previewDialog = useRef<HTMLDialogElement>(null);

  const selectLocale = (nextLocale: Locale) => {
    window.location.assign(localePaths[nextLocale] + window.location.hash);
  };

  const t = (text: string) => translate(locale, text);

  useEffect(() => {
    const dialog = previewDialog.current;
    if (!dialog) return;

    if (preview && !dialog.open) dialog.showModal();
    if (!preview && dialog.open) dialog.close();
  }, [preview]);

  const filteredMilestones = useMemo(
    () =>
      year === '全部'
        ? milestones
        : milestones.filter((milestone) => milestone.year === year),
    [year],
  );
  const previewAssets = useMemo(
    () =>
      filteredMilestones.flatMap((milestone) =>
        milestone.media.filter((asset) => asset.kind !== 'video'),
      ),
    [filteredMilestones],
  );
  const previewIndex = preview
    ? previewAssets.findIndex((asset) => asset.src === preview.src)
    : -1;

  const movePreview = (direction: -1 | 1) => {
    const nextIndex = previewIndex + direction;
    if (nextIndex >= 0 && nextIndex < previewAssets.length) {
      setPreview(previewAssets[nextIndex]);
    }
  };

  return (
    <div className="site-shell">
      <a className="skip-link" href="#timeline">
        {t('跳到时间轴')}
      </a>

      <header className="topbar">
        <a className="brand" href="#top" aria-label={t('返回页面顶部')}>
          <Image
            className="brand-logo"
            src="/pelican-logo.png"
            alt=""
            width={40}
            height={40}
            priority
          />
          <span>Pelican Test</span>
        </a>
        <div className="topbar-actions">
          <nav className="topnav" aria-label={t('主导航')}>
            <a href="#timeline">{t('时间轴')}</a>
            <a href="#method">{t('比较口径')}</a>
            <a
              href="https://simonwillison.net/tags/pelican-riding-a-bicycle/"
              target="_blank"
              rel="noreferrer"
            >
              {t('原始归档')}
            </a>
          </nav>
          <LanguageSwitch locale={locale} onSelect={selectLocale} />
          <ThemeSwitch locale={locale} />
        </div>
      </header>

      <main>
        <section className="hero" id="top">
          <div className="hero-copy">
            <p className="eyebrow">{t('大模型 SVG 能力演进')}</p>
            <h1>{t('同一提示词，看见两年进步')}</h1>
            <p className="hero-summary">
              {locale === 'zh'
                ? `从抽象几何块到会蹬车的鹈鹕，按时间浏览 ${milestones.length} 个真实测试节点。`
                : `From abstract shapes to a pedaling pelican, explore ${milestones.length} real test milestones in chronological order.`}
            </p>
            <div className="hero-actions">
              <a className="button button-primary" href="#timeline">
                {t('查看时间轴')}
              </a>
              <a
                className="button button-secondary"
                href="https://simonwillison.net/2024/Oct/25/pelicans-on-a-bicycle/"
                target="_blank"
                rel="noreferrer"
              >
                {t('了解测试')}
              </a>
            </div>
          </div>

          <Comparison locale={locale} />
        </section>

        <section className="fact-strip" aria-label={t('收录范围')}>
          <div>
            <strong>{timelineStart.slice(0, 7).replace('-', '.')}</strong>
            <span>{t('时间轴起点')}</span>
          </div>
          <div>
            <strong>{milestones.length}</strong>
            <span>{t('代表节点')}</span>
          </div>
          <div>
            <strong>{mediaCount}</strong>
            <span>{t('实图与视频')}</span>
          </div>
          <div>
            <strong>{latestUpdate.slice(0, 7).replace('-', '.')}</strong>
            <span>{t('当前更新')}</span>
          </div>
        </section>

        <section className="timeline-section" id="timeline">
          <div className="section-heading">
            <h2>{t('从“画出来”到“关系正确”')}</h2>
            <p>{t('选择年份，查看模型如何逐步解决对象、结构、接触关系和运动。')}</p>
          </div>

          <div className="year-filter" role="group" aria-label={t('按年份筛选')}>
            {yearOptions.map((option) => (
              <button
                key={option}
                type="button"
                aria-controls="timeline-results"
                aria-pressed={year === option}
                onClick={() => setYear(option)}
              >
                {t(option)}
              </button>
            ))}
            <span className="result-count" aria-live="polite">
              {locale === 'zh'
                ? `${filteredMilestones.length} 个节点`
                : `${filteredMilestones.length} milestones`}
            </span>
          </div>

          <div className="timeline-list" id="timeline-results">
            {filteredMilestones.map((milestone) => (
              <article className="timeline-entry" key={`${milestone.date}-${milestone.model}`}>
                <div className="timeline-date">
                  <time>{milestone.date}</time>
                  <span className="timeline-marker" aria-hidden="true" />
                </div>

                <div className="timeline-content">
                  <header className="entry-header">
                    <div>
                      <p className="model-name">{t(milestone.model)}</p>
                      <h3>{t(milestone.title)}</h3>
                    </div>
                    <span className={`track-label track-${milestone.track}`}>
                      {t(milestone.track)}
                    </span>
                  </header>
                  <p className="entry-summary">{t(milestone.summary)}</p>

                  <div className={`media-grid media-count-${milestone.media.length}`}>
                    {milestone.media.map((asset) => (
                      <figure className="media-item" key={asset.src}>
                        {asset.kind === 'video' ? (
                          <video
                            src={asset.src}
                            aria-label={t(asset.alt)}
                            controls
                            muted
                            loop
                            playsInline
                            preload="metadata"
                          />
                        ) : (
                          <button
                            className="media-preview"
                            type="button"
                            aria-label={
                              locale === 'zh'
                                ? `放大预览：${asset.label}`
                                : `Enlarge preview: ${t(asset.label)}`
                            }
                            aria-haspopup="dialog"
                            onClick={() => setPreview(asset)}
                          >
                            <Image
                              src={asset.src}
                              alt={t(asset.alt)}
                              width={1200}
                              height={900}
                              loading="lazy"
                              unoptimized
                            />
                          </button>
                        )}
                        <figcaption>{t(asset.label)}</figcaption>
                      </figure>
                    ))}
                  </div>

                  <div
                    className="source-links"
                    aria-label={
                      locale === 'zh'
                        ? `${milestone.model} 的来源`
                        : `Sources for ${t(milestone.model)}`
                    }
                  >
                    {milestone.sources.map((source) => (
                      <a key={source.href} href={source.href} target="_blank" rel="noreferrer">
                        {t(source.label)}
                      </a>
                    ))}
                  </div>
                </div>
              </article>
            ))}
          </div>
        </section>

        <section className="method-section" id="method">
          <div className="section-heading">
            <h2>{t('如何读这条时间轴')}</h2>
            <p>{t('它适合感受变化，不替代系统评测。四条记录规则避免把不同任务混成排行榜。')}</p>
          </div>
          <div className="method-grid">
            <article>
              <h3>{t('固定提示词作为主线')}</h3>
              <p>{t('主线统一使用 “Generate an SVG of a pelican riding a bicycle”。')}</p>
            </article>
            <article>
              <h3>{t('增强提示词单独标记')}</h3>
              <p>{t('加入鸟种、羽毛、背景等要求后，任务已经变化，不能直接横向排名。')}</p>
            </article>
            <article>
              <h3>{t('动画变体单独标记')}</h3>
              <p>{t('动画 SVG 还要处理时间与运动关系，难度不同于静态结果。')}</p>
            </article>
            <article>
              <h3>{t('未知模型不做结论')}</h3>
              <p>{t('只有结果、没有模型和运行信息的样本保留展示，但不参与能力判断。')}</p>
            </article>
            <article>
              <h3>{t('Claude 覆盖按可追溯样本')}</h3>
              <p>
                {t(
                  'Claude 3 Sonnet、Claude 3.5 Haiku 与 Mythos 5 暂未找到可追溯的同提示词原图，因此不补空白节点。',
                )}
              </p>
            </article>
          </div>
          <aside className="caveat">
            <strong>{t('测试正在趋于饱和。')}</strong>
            <p>
              {t(
                '它公开时间越长，越容易受样本挑选、随机性和训练数据影响。Simon 也认为它与综合能力的相关性已经减弱。',
              )}
            </p>
            <a href="https://simonwillison.net/2026/Jul/16/kimi-k3/" target="_blank" rel="noreferrer">
              {t('阅读 Simon 的反思')}
            </a>
          </aside>
        </section>
      </main>

      <footer>
        <p>
          {locale === 'zh'
            ? `资料整理至 ${latestUpdate}。结果版权归原作者与发布者所有。`
            : `Research compiled through ${latestUpdate}. Results remain the property of their original authors and publishers.`}
        </p>
        <a
          href="https://simonwillison.net/tags/pelican-riding-a-bicycle/"
          target="_blank"
          rel="noreferrer"
        >
          {t('查看完整来源归档')}
        </a>
      </footer>

      <dialog
        className="preview-dialog"
        ref={previewDialog}
        aria-label={
          preview
            ? locale === 'zh'
              ? `${preview.label} 图片预览`
              : `${t(preview.label)} image preview`
            : t('图片预览')
        }
        onClose={() => setPreview(null)}
        onClick={(event) => {
          if (event.target === event.currentTarget) event.currentTarget.close();
        }}
        onKeyDown={(event) => {
          if (event.key === 'Escape') {
            event.preventDefault();
            event.currentTarget.close();
          }
          if (event.key === 'ArrowLeft') {
            event.preventDefault();
            movePreview(-1);
          }
          if (event.key === 'ArrowRight') {
            event.preventDefault();
            movePreview(1);
          }
        }}
      >
        {preview ? (
          <div className="preview-dialog-inner">
            <header className="preview-dialog-header">
              <div>
                <strong>{t(preview.label)}</strong>
                <span>
                  {locale === 'zh'
                    ? `${t('原始测试结果')}，第 ${previewIndex + 1} 张，共 ${previewAssets.length} 张`
                    : `${t('原始测试结果')}, ${previewIndex + 1} of ${previewAssets.length}`}
                </span>
              </div>
              <button type="button" onClick={() => previewDialog.current?.close()}>
                {t('关闭')}
              </button>
            </header>
            <div className="preview-dialog-media">
              <Image
                src={preview.src}
                alt={t(preview.alt)}
                width={1200}
                height={900}
                unoptimized
              />
            </div>
            <div className="preview-dialog-footer">
              <p>{t(preview.alt)}</p>
              <div className="preview-dialog-footer-actions">
                <a href={preview.src} target="_blank" rel="noreferrer">
                  {t('打开原图')}
                </a>
                <div className="preview-dialog-nav" role="group" aria-label={t('预览导航')}>
                  <button
                    type="button"
                    disabled={previewIndex <= 0}
                    onClick={() => movePreview(-1)}
                  >
                    {t('上一张')}
                  </button>
                  <button
                    type="button"
                    disabled={previewIndex === previewAssets.length - 1}
                    onClick={() => movePreview(1)}
                  >
                    {t('下一张')}
                  </button>
                </div>
              </div>
            </div>
          </div>
        ) : null}
      </dialog>
    </div>
  );
}
