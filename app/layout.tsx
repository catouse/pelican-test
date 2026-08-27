import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: '鹈鹕测试时间轴 | 大模型 SVG 能力演进',
  description: '用同一句 SVG 提示词，直观浏览 2024 到 2026 年不同大模型的实际效果演进。',
  openGraph: {
    title: '鹈鹕测试时间轴',
    description: '从抽象几何块到会蹬车的鹈鹕，19 个真实测试节点。',
    type: 'website',
    images: [
      {
        url: '/og.png',
        width: 1200,
        height: 630,
        alt: '鹈鹕测试时间轴，从抽象几何块演进到完整的鹈鹕骑自行车',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: '鹈鹕测试时间轴',
    description: '从抽象几何块到会蹬车的鹈鹕，19 个真实测试节点。',
    images: ['/og.png'],
  },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="zh-CN">
      <head>
        <link
          rel="preload"
          href="/pelicans/hero-qwen-3.8.webp"
          as="image"
          type="image/webp"
        />
      </head>
      <body>{children}</body>
    </html>
  );
}
