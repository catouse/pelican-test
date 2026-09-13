export type PelicanTest = {
  id: string;
  title: string;
  date: string;
  model: string;
  description: string;
  prompt: string;
  thumbnail: string;
  thumbnailAlt: string;
  href: string;
};

// Add new tests here, newest first. Keep each original result and thumbnail in public/my-tests/.
export const myTests: PelicanTest[] = [
  {
    // Source: Codex task 01a09a6b-61f2-7d30-b4b5-4a640517d460, 创建鹈鹕骑车SVG动画.
    id: '2026-09-12-gpt-6-astra-max',
    title: '鹈鹕骑车 SVG 动画',
    date: '2026-09-12',
    model: 'GPT-6-Astra-Max',
    description: '海边骑行场景，支持暂停、三档速度和车铃。',
    prompt: '创建一个html，内容是svg绘制一个鹈鹕骑自行车的2d动画',
    thumbnail: '/my-tests/2026-09-12-gpt-6-astra-max/thumbnail.webp',
    thumbnailAlt: '系着红围巾的鹈鹕骑着绿色自行车，沿着海边前进',
    href: '/my-tests/2026-09-12-gpt-6-astra-max/index.html',
  },
];
