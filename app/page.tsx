'use client';

import { useMemo, useState, type CSSProperties } from 'react';

type Media = {
  src: string;
  alt: string;
  label: string;
  kind?: 'image' | 'video';
};

type Source = {
  label: string;
  href: string;
};

type Milestone = {
  date: string;
  year: '2024' | '2025' | '2026';
  model: string;
  title: string;
  summary: string;
  track: '固定提示词' | '回顾样本' | '混合口径' | '动画变体' | '待确认';
  media: Media[];
  sources: Source[];
};

const milestones: Milestone[] = [
  {
    date: '2024-10-25',
    year: '2024',
    model: '首轮 16 个模型',
    title: '多数模型只画出了鸟或几何块',
    summary:
      '模型通常能生成 SVG，也知道鸟或轮子大概长什么样，但无法组织出骑自行车的完整关系。',
    track: '固定提示词',
    media: [
      {
        src: '/pelicans/2024-10-claude-3.5-sonnet.svg',
        label: 'Claude 3.5 Sonnet',
        alt: 'Claude 3.5 Sonnet 生成的简化鹈鹕，没有自行车',
      },
      {
        src: '/pelicans/2024-10-gpt-4o.svg',
        label: 'GPT-4o',
        alt: 'GPT-4o 生成的一只孤立的鸟',
      },
      {
        src: '/pelicans/2024-10-o1-preview.svg',
        label: 'o1-preview',
        alt: 'o1-preview 生成的鸟和一条竖线，没有形成自行车',
      },
      {
        src: '/pelicans/2024-10-gemini-1.5-flash-002.svg',
        label: 'Gemini 1.5 Flash-002',
        alt: 'Gemini 1.5 Flash-002 生成的黄色几何块',
      },
      {
        src: '/pelicans/2024-10-gemini-1.5-flash-8b.svg',
        label: 'Gemini 1.5 Flash-8B',
        alt: 'Gemini 1.5 Flash-8B 生成的抽象黄色图形',
      },
      {
        src: '/pelicans/2024-10-llama-3.1-70b.svg',
        label: 'Llama 3.1 70B',
        alt: 'Llama 3.1 70B 生成的抽象轮状图案',
      },
    ],
    sources: [
      {
        label: '首轮测试',
        href: 'https://simonwillison.net/2024/Oct/25/pelicans-on-a-bicycle/',
      },
    ],
  },
  {
    date: '2024-11-27',
    year: '2024',
    model: 'QwQ 32B Preview',
    title: '推理变长，构图没有同步解决',
    summary:
      '较长的推理过程最终仍得到抽象鸟形。这个样本很早就说明，更多推理 token 不保证更好的空间构图。',
    track: '固定提示词',
    media: [
      {
        src: '/pelicans/2024-11-qwq-32b.svg',
        label: 'QwQ 32B Preview',
        alt: 'QwQ 32B Preview 生成的抽象蓝色鸟形',
      },
    ],
    sources: [
      {
        label: 'X 原帖',
        href: 'https://x.com/simonw/status/1861925397585391912',
      },
      {
        label: 'Qwen 归档',
        href: 'https://simonwillison.net/tags/pelican-riding-a-bicycle%2Bqwen/',
      },
    ],
  },
  {
    date: '2024-12-06',
    year: '2024',
    model: 'Gemini exp-1206',
    title: '第一次明显形成完整场景',
    summary:
      '主体、两个车轮、车架和地面同时出现。画面还不精确，但已经从识别对象跨到组织场景。',
    track: '固定提示词',
    media: [
      {
        src: '/pelicans/2024-12-gemini-exp-1206.svg',
        label: 'Gemini exp-1206',
        alt: 'Gemini exp-1206 生成的鹈鹕骑两轮自行车场景',
      },
    ],
    sources: [
      {
        label: '博客记录',
        href: 'https://simonwillison.net/2024/Dec/6/gemini-exp-1206/',
      },
      {
        label: 'X 原帖',
        href: 'https://x.com/simonw/status/1865087864729690540',
      },
    ],
  },
  {
    date: '2024-12-25',
    year: '2024',
    model: 'DeepSeek V3',
    title: '完整场景开始成为常态',
    summary:
      '鹈鹕、车轮和车架已经在同一画面里，但主体更像叠放，接触关系仍然薄弱。',
    track: '回顾样本',
    media: [
      {
        src: '/pelicans/2024-12-deepseek-v3.jpeg',
        label: 'DeepSeek V3',
        alt: 'DeepSeek V3 的鹈鹕和近似自行车结构',
      },
    ],
    sources: [
      {
        label: '六个月回顾',
        href: 'https://simonwillison.net/2025/Jun/6/six-months-in-llms/',
      },
    ],
  },
  {
    date: '2025-01',
    year: '2025',
    model: 'DeepSeek R1',
    title: '对象更清楚，物理关系仍脆弱',
    summary:
      '鹈鹕和自行车更容易辨认，细节也更多，但鸟、车把和脚踏之间仍缺少可信连接。',
    track: '回顾样本',
    media: [
      {
        src: '/pelicans/2025-01-deepseek-r1.jpeg',
        label: 'DeepSeek R1',
        alt: 'DeepSeek R1 生成的鹈鹕和近似自行车车架',
      },
    ],
    sources: [
      {
        label: '首发测试',
        href: 'https://simonwillison.net/2025/Jan/20/deepseek-r1/',
      },
      {
        label: '回顾样本',
        href: 'https://simonwillison.net/2025/Jun/6/six-months-in-llms/',
      },
    ],
  },
  {
    date: '2025-02-25',
    year: '2025',
    model: 'Claude 3.7 Sonnet',
    title: '开始处理对象组合关系',
    summary:
      '主体和自行车元素更完整，但局部仍有重复和错位。模型知道场景里要有什么，还不能稳定连接它们。',
    track: '回顾样本',
    media: [
      {
        src: '/pelicans/2025-02-claude-3.7-sonnet.svg',
        label: 'Claude 3.7 Sonnet',
        alt: 'Claude 3.7 Sonnet 生成的鹈鹕与自行车元素',
      },
    ],
    sources: [
      {
        label: '六个月回顾',
        href: 'https://simonwillison.net/2025/Jun/6/six-months-in-llms/',
      },
    ],
  },
  {
    date: '2025-03-25',
    year: '2025',
    model: 'Gemini 2.5 Pro',
    title: '骑车关系开始稳定',
    summary:
      '问题从有没有自行车，转向车架是否合理、脚是否真正踩在踏板上。',
    track: '固定提示词',
    media: [
      {
        src: '/pelicans/2025-03-gemini-2.5-pro.jpg',
        label: 'Gemini 2.5 Pro',
        alt: 'Gemini 2.5 Pro 生成的鹈鹕和自行车完整场景',
      },
    ],
    sources: [
      {
        label: '博客记录',
        href: 'https://simonwillison.net/2025/Mar/25/gemini/',
      },
    ],
  },
  {
    date: '2025-06-05',
    year: '2025',
    model: 'Gemini 2.5 Pro Preview 06-05',
    title: '进入较完整的骑行构图',
    summary:
      '红色车架、两个轮子和车把相互连接，鹈鹕姿态也更接近骑乘。',
    track: '固定提示词',
    media: [
      {
        src: '/pelicans/2025-06-gemini-2.5-pro-preview.png',
        label: 'Gemini 2.5 Pro Preview 06-05',
        alt: 'Gemini 2.5 Pro Preview 生成的鹈鹕骑红色自行车',
      },
    ],
    sources: [
      {
        label: '博客记录',
        href: 'https://simonwillison.net/2025/Jun/5/gemini-25-pro-preview-06-05/',
      },
    ],
  },
  {
    date: '2025-08-07',
    year: '2025',
    model: 'GPT-5 系列',
    title: '自行车结构显著改善',
    summary:
      '车架、辐条、脚踏、腿部位置和整体比例都明显进步。小模型也能完成场景，但细节并不按规模单调变化。',
    track: '固定提示词',
    media: [
      {
        src: '/pelicans/2025-08-gpt-5.png',
        label: 'GPT-5',
        alt: 'GPT-5 生成的结构完整自行车和正在踩踏的鹈鹕',
      },
      {
        src: '/pelicans/2025-08-gpt-5-mini.png',
        label: 'GPT-5 mini',
        alt: 'GPT-5 mini 生成的鹈鹕骑自行车',
      },
      {
        src: '/pelicans/2025-08-gpt-5-nano.png',
        label: 'GPT-5 nano',
        alt: 'GPT-5 nano 生成的鹈鹕骑自行车',
      },
    ],
    sources: [
      {
        label: '博客记录',
        href: 'https://simonwillison.net/2025/Aug/7/gpt-5/',
      },
    ],
  },
  {
    date: '2025-12-11',
    year: '2025',
    model: 'GPT-5.2',
    title: '基础任务与细节任务分轨',
    summary:
      '基础提示词已经能生成完整结果。增强提示词增加鸟种、羽毛和喉囊要求，两者不应直接排名。',
    track: '混合口径',
    media: [
      {
        src: '/pelicans/2025-12-gpt-5.2-basic.png',
        label: '原始提示词',
        alt: 'GPT-5.2 使用原始提示词生成的鹈鹕骑自行车',
      },
      {
        src: '/pelicans/2025-12-gpt-5.2-advanced.png',
        label: '增强提示词',
        alt: 'GPT-5.2 使用增强提示词生成的加州褐鹈鹕骑自行车',
      },
    ],
    sources: [
      {
        label: '博客记录',
        href: 'https://simonwillison.net/2025/Dec/11/gpt-52/',
      },
    ],
  },
  {
    date: '2026-02-19',
    year: '2026',
    model: 'Gemini 3.1 Pro',
    title: '复杂约束继续增加',
    summary:
      '原始提示词用于纵向比较，增强提示词测试羽毛、喉囊、姿势和场景细节。',
    track: '混合口径',
    media: [
      {
        src: '/pelicans/2026-02-gemini-3.1-pro-basic.png',
        label: '原始提示词',
        alt: 'Gemini 3.1 Pro 使用原始提示词生成的鹈鹕骑自行车',
      },
      {
        src: '/pelicans/2026-02-gemini-3.1-pro-advanced.png',
        label: '增强提示词',
        alt: 'Gemini 3.1 Pro 使用增强提示词生成的细节版鹈鹕骑自行车',
      },
    ],
    sources: [
      {
        label: '博客记录',
        href: 'https://simonwillison.net/2026/Feb/19/gemini-31-pro/',
      },
    ],
  },
  {
    date: '2026-03-17',
    year: '2026',
    model: 'GPT-5.4 家族',
    title: '推理等级并不单调决定画质',
    summary:
      '同一家族的模型和推理等级组成对照矩阵。高推理通常有帮助，但单次画面并不保证更好。',
    track: '固定提示词',
    media: [
      {
        src: '/pelicans/2026-03-gpt-5.4-family.svg',
        label: '模型与推理等级矩阵',
        alt: 'GPT-5.4 家族在多档推理等级下的鹈鹕测试矩阵',
      },
    ],
    sources: [
      {
        label: '家族对比',
        href: 'https://simonwillison.net/2026/Mar/17/mini-and-nano/',
      },
      {
        label: 'GPT-5.4 首测',
        href: 'https://simonwillison.net/2026/Mar/5/introducing-gpt54/',
      },
    ],
  },
  {
    date: '2026-04-22',
    year: '2026',
    model: 'Qwen 3.6 27B',
    title: '本地小模型跨过实用门槛',
    summary:
      '约 17GB 的本地模型已经画出完整车架、辐条、车把和踩踏姿势，进步不再只属于大型云端模型。',
    track: '固定提示词',
    media: [
      {
        src: '/pelicans/2026-04-qwen-3.6-27b-local.png',
        label: 'Qwen 3.6 27B 本地运行',
        alt: 'Qwen 3.6 27B 本地模型生成的鹈鹕骑红色自行车',
      },
    ],
    sources: [
      {
        label: '本地测试',
        href: 'https://simonwillison.net/2026/Apr/22/qwen36-27b/',
      },
    ],
  },
  {
    date: '2026-06-17',
    year: '2026',
    model: 'GLM 5.2',
    title: '从静态构图进入动画 SVG',
    summary:
      '画面结构已经很完整，并且能生成动画。新的难点变成车轮转动时，脚能否持续跟随踏板。',
    track: '动画变体',
    media: [
      {
        src: '/pelicans/2026-06-glm-5.2.svg',
        label: 'GLM 5.2 动画 SVG',
        alt: 'GLM 5.2 生成的动画鹈鹕骑自行车 SVG',
      },
    ],
    sources: [
      {
        label: '博客记录',
        href: 'https://simonwillison.net/2026/Jun/17/glm-52/',
      },
    ],
  },
  {
    date: '2026-07-09',
    year: '2026',
    model: 'GPT-5.6 家族',
    title: '同一家族内部仍有明显差异',
    summary:
      'Luna、Terra、Sol 和多档推理等级组成九宫格，展示模型档位、推理预算与采样的共同影响。',
    track: '固定提示词',
    media: [
      {
        src: '/pelicans/2026-07-gpt-5.6-grid.webp',
        label: 'GPT-5.6 九宫格',
        alt: 'GPT-5.6 Luna Terra Sol 在多档推理等级下的结果矩阵',
      },
    ],
    sources: [
      {
        label: '家族对比',
        href: 'https://simonwillison.net/2026/Jul/9/gpt-5-6/',
      },
    ],
  },
  {
    date: '2026-07-16',
    year: '2026',
    model: 'Kimi K3',
    title: '结果更完整，测试开始失去区分度',
    summary:
      '场景已经相当连贯，但测试无法代表代理能力和工具调用等差异，也开始面临过度推理和成本问题。',
    track: '固定提示词',
    media: [
      {
        src: '/pelicans/2026-07-kimi-k3.jpg',
        label: 'Kimi K3',
        alt: 'Kimi K3 生成的完整鹈鹕骑自行车场景',
      },
    ],
    sources: [
      {
        label: '测试与反思',
        href: 'https://simonwillison.net/2026/Jul/16/kimi-k3/',
      },
    ],
  },
  {
    date: '2026-08-16',
    year: '2026',
    model: 'Qwen 3.8 27B',
    title: '17GB 本地模型继续逼近前沿效果',
    summary:
      'xhigh 推理得到结构完整的结果，关闭推理则明显松散，直观显示效果、等待时间和本地资源之间的取舍。',
    track: '固定提示词',
    media: [
      {
        src: '/pelicans/2026-08-qwen-3.8-27b-xhigh.jpg',
        label: 'xhigh 推理',
        alt: 'Qwen 3.8 27B 使用 xhigh 推理生成的鹈鹕骑红色自行车',
      },
      {
        src: '/pelicans/2026-08-qwen-3.8-27b-no-reasoning.png',
        label: '关闭推理',
        alt: 'Qwen 3.8 27B 关闭推理后的较松散构图',
      },
    ],
    sources: [
      {
        label: '本地测试',
        href: 'https://simonwillison.net/2026/Aug/16/qwen-38-27b/',
      },
      {
        label: 'X 原帖',
        href: 'https://x.com/simonw/status/2088361426662637714',
      },
    ],
  },
  {
    date: '2026-08-24',
    year: '2026',
    model: 'Ornith-1.5-35B-A3B',
    title: 'X 上的本地动画测试',
    summary:
      '发布者称模型在 M4 Pro 本地运行。提示词增加了 animation，因此只作为动画能力补充，不并入静态主线。',
    track: '动画变体',
    media: [
      {
        src: '/pelicans/2026-08-ornith-1.5-animation-x.jpg',
        label: '本地运行记录',
        alt: 'Ornith-1.5 在 M4 Pro 本地运行的终端记录',
      },
    ],
    sources: [
      {
        label: 'X 发布帖',
        href: 'https://x.com/Oluwaphilemon1/status/2091884119676330256',
      },
      {
        label: '动画视频',
        href: 'https://x.com/xueyu1125/status/2091388619793813737/video/1',
      },
    ],
  },
  {
    date: '2026-08-27',
    year: '2026',
    model: '未公开新模型',
    title: '效果很好，但模型身份待确认',
    summary:
      '原帖没有给出模型名称，讨论中也提到可能见过该测试。这里只展示实际结果，不据此判断排名。',
    track: '待确认',
    media: [
      {
        src: '/pelicans/2026-08-unknown-model.mp4',
        label: 'X 视频样本',
        alt: '未公开模型生成的鹈鹕骑自行车动画',
        kind: 'video',
      },
    ],
    sources: [
      {
        label: 'X 原帖',
        href: 'https://x.com/vista8/status/2092957933328072816',
      },
    ],
  },
];

const yearOptions = ['全部', '2024', '2025', '2026'] as const;
type YearOption = (typeof yearOptions)[number];

export default function Home() {
  const [comparison, setComparison] = useState(47);
  const [year, setYear] = useState<YearOption>('全部');

  const filteredMilestones = useMemo(
    () =>
      year === '全部'
        ? milestones
        : milestones.filter((milestone) => milestone.year === year),
    [year],
  );

  return (
    <div className="site-shell">
      <a className="skip-link" href="#timeline">
        跳到时间轴
      </a>

      <header className="topbar">
        <a className="brand" href="#top" aria-label="返回页面顶部">
          <span className="brand-mark" aria-hidden="true">
            P
          </span>
          <span>Pelican Test</span>
        </a>
        <nav className="topnav" aria-label="主导航">
          <a href="#timeline">时间轴</a>
          <a href="#method">比较口径</a>
          <a
            href="https://simonwillison.net/tags/pelican-riding-a-bicycle/"
            target="_blank"
            rel="noreferrer"
          >
            原始归档
          </a>
        </nav>
      </header>

      <main>
        <section className="hero" id="top">
          <div className="hero-copy">
            <p className="eyebrow">大模型 SVG 能力演进</p>
            <h1>同一提示词，看见两年进步</h1>
            <p className="hero-summary">
              从抽象几何块到会蹬车的鹈鹕，按时间浏览 19 个真实测试节点。
            </p>
            <div className="hero-actions">
              <a className="button button-primary" href="#timeline">
                查看时间轴
              </a>
              <a
                className="button button-secondary"
                href="https://simonwillison.net/2024/Oct/25/pelicans-on-a-bicycle/"
                target="_blank"
                rel="noreferrer"
              >
                了解测试
              </a>
            </div>
          </div>

          <figure className="comparison">
            <div className="comparison-meta" aria-hidden="true">
              <span>2024 Claude 3.5</span>
              <span>2026 Qwen 3.8</span>
            </div>
            <div
              className="comparison-stage"
              style={{ '--split': `${comparison}%` } as CSSProperties}
              role="img"
              aria-label="2024 年 Claude 3.5 Sonnet 的简化鸟形，与 2026 年 Qwen 3.8 27B 的完整鹈鹕骑自行车对比"
            >
              <span className="comparison-image comparison-image-new" aria-hidden="true" />
              <span
                className="comparison-image comparison-image-old"
                aria-hidden="true"
                style={{ clipPath: `inset(0 ${100 - comparison}% 0 0)` }}
              />
              <span className="comparison-divider" aria-hidden="true" />
            </div>
            <label className="comparison-control">
              <span>拖动对比 2024 与 2026</span>
              <input
                type="range"
                min="8"
                max="92"
                value={comparison}
                onChange={(event) => setComparison(Number(event.target.value))}
                aria-valuetext={`左侧显示 ${comparison}% 的 2024 结果`}
              />
            </label>
          </figure>
        </section>

        <section className="fact-strip" aria-label="收录范围">
          <div>
            <strong>2024.10</strong>
            <span>时间轴起点</span>
          </div>
          <div>
            <strong>19</strong>
            <span>代表节点</span>
          </div>
          <div>
            <strong>29</strong>
            <span>实图与视频</span>
          </div>
          <div>
            <strong>2026.08</strong>
            <span>当前更新</span>
          </div>
        </section>

        <section className="timeline-section" id="timeline">
          <div className="section-heading">
            <h2>从“画出来”到“关系正确”</h2>
            <p>选择年份，查看模型如何逐步解决对象、结构、接触关系和运动。</p>
          </div>

          <div className="year-filter" role="group" aria-label="按年份筛选">
            {yearOptions.map((option) => (
              <button
                key={option}
                type="button"
                aria-pressed={year === option}
                onClick={() => setYear(option)}
              >
                {option}
              </button>
            ))}
            <span className="result-count" aria-live="polite">
              {filteredMilestones.length} 个节点
            </span>
          </div>

          <div className="timeline-list">
            {filteredMilestones.map((milestone) => (
              <article className="timeline-entry" key={`${milestone.date}-${milestone.model}`}>
                <div className="timeline-date">
                  <time>{milestone.date}</time>
                  <span className="timeline-marker" aria-hidden="true" />
                </div>

                <div className="timeline-content">
                  <header className="entry-header">
                    <div>
                      <p className="model-name">{milestone.model}</p>
                      <h3>{milestone.title}</h3>
                    </div>
                    <span className={`track-label track-${milestone.track}`}>{milestone.track}</span>
                  </header>
                  <p className="entry-summary">{milestone.summary}</p>

                  <div className={`media-grid media-count-${milestone.media.length}`}>
                    {milestone.media.map((asset) => (
                      <figure className="media-item" key={asset.src}>
                        {asset.kind === 'video' ? (
                          <video
                            src={asset.src}
                            aria-label={asset.alt}
                            controls
                            muted
                            loop
                            playsInline
                            preload="metadata"
                          />
                        ) : (
                          <a
                            href={asset.src}
                            target="_blank"
                            rel="noreferrer"
                            aria-label={`打开原图：${asset.label}`}
                          >
                            <img src={asset.src} alt={asset.alt} loading="lazy" decoding="async" />
                          </a>
                        )}
                        <figcaption>{asset.label}</figcaption>
                      </figure>
                    ))}
                  </div>

                  <div className="source-links" aria-label={`${milestone.model} 的来源`}>
                    {milestone.sources.map((source) => (
                      <a key={source.href} href={source.href} target="_blank" rel="noreferrer">
                        {source.label}
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
            <h2>如何读这条时间轴</h2>
            <p>它适合感受变化，不替代系统评测。四条记录规则避免把不同任务混成排行榜。</p>
          </div>
          <div className="method-grid">
            <article>
              <h3>固定提示词作为主线</h3>
              <p>主线统一使用 “Generate an SVG of a pelican riding a bicycle”。</p>
            </article>
            <article>
              <h3>增强提示词单独标记</h3>
              <p>加入鸟种、羽毛、背景等要求后，任务已经变化，不能直接横向排名。</p>
            </article>
            <article>
              <h3>动画变体单独标记</h3>
              <p>动画 SVG 还要处理时间与运动关系，难度不同于静态结果。</p>
            </article>
            <article>
              <h3>未知模型不做结论</h3>
              <p>只有结果、没有模型和运行信息的样本保留展示，但不参与能力判断。</p>
            </article>
          </div>
          <aside className="caveat">
            <strong>测试正在趋于饱和。</strong>
            <p>
              它公开时间越长，越容易受样本挑选、随机性和训练数据影响。Simon 也认为它与综合能力的相关性已经减弱。
            </p>
            <a href="https://simonwillison.net/2026/Jul/16/kimi-k3/" target="_blank" rel="noreferrer">
              阅读 Simon 的反思
            </a>
          </aside>
        </section>
      </main>

      <footer>
        <p>资料整理至 2026-08-27。结果版权归原作者与发布者所有。</p>
        <a
          href="https://simonwillison.net/tags/pelican-riding-a-bicycle/"
          target="_blank"
          rel="noreferrer"
        >
          查看完整来源归档
        </a>
      </footer>
    </div>
  );
}
