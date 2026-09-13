'use client';

import Image from 'next/image';
import { useEffect, useRef, useState } from 'react';
import { readPreference, writePreference } from './preferences';
import { translate, localePaths, myTestsPaths, type Locale } from './content/translations';

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

export default function SiteHeader({
  locale,
  section = 'timeline',
}: {
  locale: Locale;
  section?: 'timeline' | 'my-tests';
}) {
  const t = (text: string) => translate(locale, text);
  const homePath = section === 'timeline' ? '' : localePaths[locale];
  const selectLocale = (nextLocale: Locale) => {
    const paths = section === 'my-tests' ? myTestsPaths : localePaths;
    window.location.assign(paths[nextLocale] + window.location.hash);
  };

  return (
    <header className="topbar">
      <a
        className="brand"
        href={section === 'timeline' ? '#top' : localePaths[locale]}
        aria-label={section === 'timeline' ? t('返回页面顶部') : t('返回首页')}
      >
        <Image className="brand-logo" src="/pelican-logo.png" alt="" width={40} height={40} priority />
        <span>Pelican Test</span>
      </a>
      <div className="topbar-actions">
        <nav className="topnav" aria-label={t('主导航')}>
          <a href={`${homePath}#timeline`}>{t('时间轴')}</a>
          <a href={myTestsPaths[locale]} aria-current={section === 'my-tests' ? 'page' : undefined}>
            {t('我的测试')}
          </a>
          <a className="topnav-secondary" href={`${homePath}#method`}>{t('比较口径')}</a>
          <a
            className="topnav-archive"
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
  );
}
