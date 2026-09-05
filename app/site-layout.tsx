import type { Metadata } from 'next';
import './globals.css';
import { milestones } from './content/milestones';
import { translate, localePaths, type Locale } from './content/translations';

const themeInitScript = `
(() => {
  try {
    const savedTheme = localStorage.getItem('pelican-theme');
    const systemTheme = matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
    const theme = savedTheme === 'light' || savedTheme === 'dark' ? savedTheme : systemTheme;
    document.documentElement.dataset.theme = theme;
    document.documentElement.style.colorScheme = theme;
  } catch {}
})();
`;

export function createMetadata(locale: Locale): Metadata {
  const t = (text: string) => translate(locale, text);
  const title = t('鹈鹕测试时间轴 | 大模型 SVG 能力演进');
  const description = t('用同一句 SVG 提示词，直观浏览 2024 到 2026 年不同大模型的实际效果演进。');
  const shareTitle = locale === 'zh' ? '鹈鹕测试时间轴' : 'Pelican Test Timeline';
  const shareDescription = locale === 'zh'
    ? `从抽象几何块到会蹬车的鹈鹕，${milestones.length} 个真实测试节点。`
    : `From abstract shapes to a pedaling pelican: ${milestones.length} real test milestones.`;
  const shareImage = locale === 'zh' ? '/og.png' : '/og-en.png';

  return {
    metadataBase: new URL('https://pelican.catou.se'),
    title,
    description,
    alternates: {
      canonical: localePaths[locale],
      languages: { 'zh-CN': localePaths.zh, en: localePaths.en, 'x-default': localePaths.zh },
    },
    openGraph: {
      title: shareTitle,
      description: shareDescription,
      type: 'website',
      url: localePaths[locale],
      locale: locale === 'zh' ? 'zh_CN' : 'en_US',
      alternateLocale: locale === 'zh' ? 'en_US' : 'zh_CN',
      images: [{
        url: shareImage,
        width: 1200,
        height: 630,
        alt: locale === 'zh'
          ? '鹈鹕测试时间轴，从抽象几何块演进到完整的鹈鹕骑自行车'
          : 'Pelican Test Timeline, from abstract shapes to a complete pelican riding a bicycle',
      }],
    },
    twitter: {
      card: 'summary_large_image',
      title: shareTitle,
      description: shareDescription,
      images: [shareImage],
    },
    icons: {
      icon: [{ url: '/pelican-logo.png', type: 'image/png' }],
      apple: '/pelican-logo.png',
    },
  };
}

export function SiteLayout({ children, locale }: Readonly<{ children: React.ReactNode; locale: Locale }>) {
  return (
    <html lang={locale === 'zh' ? 'zh-CN' : 'en'} suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeInitScript }} />
        <link
          rel="preload"
          href="/pelicans/hero-qwen-3.8.webp"
          as="image"
          type="image/webp"
          fetchPriority="high"
        />
      </head>
      <body>{children}</body>
    </html>
  );
}
