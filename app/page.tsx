'use client';

import Image from 'next/image';
import { useEffect, useMemo, useRef, useState, type CSSProperties } from 'react';

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
        src: '/pelicans/2024-10-claude-3-opus.svg',
        label: 'Claude 3 Opus',
        alt: 'Claude 3 Opus 生成的鹈鹕和两轮自行车，主体与车架连接仍然错乱',
      },
      {
        src: '/pelicans/2024-10-claude-3-haiku.svg',
        label: 'Claude 3 Haiku',
        alt: 'Claude 3 Haiku 生成的橙色抽象鸟形和简化自行车',
      },
      {
        src: '/pelicans/2024-10-claude-3.5-sonnet-20240620.svg',
        label: 'Claude 3.5 Sonnet · 2024-06-20',
        alt: 'Claude 3.5 Sonnet 2024 年 6 月版生成的简化鹈鹕和几何车架',
      },
      {
        src: '/pelicans/2024-10-claude-3.5-sonnet-20241022.svg',
        label: 'Claude 3.5 Sonnet · 2024-10-22',
        alt: 'Claude 3.5 Sonnet 2024 年 10 月升级版生成的鹈鹕和自行车尝试',
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
      {
        label: '原始样本仓库',
        href: 'https://github.com/simonw/pelican-bicycle',
      },
      {
        label: 'Claude 3 发布',
        href: 'https://www.anthropic.com/news/claude-3-family',
      },
      {
        label: 'Claude 3.5 首发',
        href: 'https://www.anthropic.com/news/claude-3-5-sonnet',
      },
      {
        label: 'Claude 3.5 升级版',
        href: 'https://www.anthropic.com/news/3-5-models-and-computer-use',
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
    date: '2025-02-24',
    year: '2025',
    model: 'Claude 3.7 Sonnet',
    title: '推理模式带来两次可比结果',
    summary:
      '普通模式与 thinking 模式都画出了完整主体和自行车元素，但局部仍有重复、错位和堆叠。',
    track: '固定提示词',
    media: [
      {
        src: '/pelicans/2025-02-claude-3.7-sonnet.svg',
        label: '普通模式',
        alt: 'Claude 3.7 Sonnet 普通模式生成的鹈鹕与自行车元素',
      },
      {
        src: '/pelicans/2025-02-claude-3.7-sonnet-thinking.svg',
        label: 'Thinking 模式',
        alt: 'Claude 3.7 Sonnet thinking 模式生成的鹈鹕与自行车元素',
      },
    ],
    sources: [
      {
        label: '双模式测试',
        href: 'https://simonwillison.net/2025/Feb/24/claude-37-sonnet-and-claude-code/',
      },
      {
        label: 'Anthropic 发布',
        href: 'https://www.anthropic.com/news/claude-3-7-sonnet',
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
    date: '2025-05-22',
    year: '2025',
    model: 'Claude Sonnet 4 / Opus 4',
    title: '同代两档模型首次并排',
    summary:
      'Sonnet 4 的自行车更完整，Opus 4 的车轮缺少辐条。两者都能完成场景，但旗舰档位并没有在这次单样本中明显胜出。',
    track: '固定提示词',
    media: [
      {
        src: '/pelicans/2025-05-claude-sonnet-4.png',
        label: 'Claude Sonnet 4',
        alt: 'Claude Sonnet 4 生成的鹈鹕骑自行车，车架和轮辐较完整',
      },
      {
        src: '/pelicans/2025-05-claude-opus-4.png',
        label: 'Claude Opus 4',
        alt: 'Claude Opus 4 生成的鹈鹕骑自行车，车轮缺少辐条',
      },
    ],
    sources: [
      {
        label: '发布会实测',
        href: 'https://simonwillison.net/2025/May/22/code-with-claude-live-blog/',
      },
      {
        label: 'Anthropic 发布',
        href: 'https://www.anthropic.com/news/claude-4',
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
    date: '2025-08-05',
    year: '2025',
    model: 'Claude Opus 4.1',
    title: '鸟形进步，自行车仍是短板',
    summary:
      '线稿里的喙和脚踏关系更清楚，但车架形状依然不合理，说明点版本升级没有稳定解决空间结构。',
    track: '固定提示词',
    media: [
      {
        src: '/pelicans/2025-08-claude-opus-4.1.png',
        label: 'Claude Opus 4.1',
        alt: 'Claude Opus 4.1 生成的线稿鹈鹕骑自行车，车架形状仍不规则',
      },
    ],
    sources: [
      {
        label: '发布日实测',
        href: 'https://simonwillison.net/2025/Aug/5/claude-opus-41/',
      },
      {
        label: 'Anthropic 发布',
        href: 'https://www.anthropic.com/news/claude-opus-4-1',
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
    date: '2025-09-29',
    year: '2025',
    model: 'Claude Sonnet 4.5',
    title: 'Thinking 与普通模式各有缺陷',
    summary:
      '两次结果都能认出鹈鹕和自行车，但构件连接仍不可靠。Thinking 没有在这次单样本里带来稳定的结构优势。',
    track: '固定提示词',
    media: [
      {
        src: '/pelicans/2025-09-claude-sonnet-4.5-thinking.png',
        label: 'Thinking 开启',
        alt: 'Claude Sonnet 4.5 开启 thinking 后生成的鹈鹕骑自行车',
      },
      {
        src: '/pelicans/2025-09-claude-sonnet-4.5.png',
        label: 'Thinking 关闭',
        alt: 'Claude Sonnet 4.5 关闭 thinking 后生成的鹈鹕骑自行车',
      },
    ],
    sources: [
      {
        label: '双模式测试',
        href: 'https://simonwillison.net/2025/Sep/29/claude-sonnet-4-5/',
      },
      {
        label: 'Anthropic 发布',
        href: 'https://www.anthropic.com/news/claude-sonnet-4-5',
      },
    ],
  },
  {
    date: '2025-10-15',
    year: '2025',
    model: 'Claude Haiku 4.5',
    title: '轻量模型也能完成完整场景',
    summary:
      '圆润的鸟形、两个车轮和地面同时出现。主体更像一般鸟类，但低成本档位已经跨过“完整构图”门槛。',
    track: '固定提示词',
    media: [
      {
        src: '/pelicans/2025-10-claude-haiku-4.5.jpg',
        label: 'Claude Haiku 4.5',
        alt: 'Claude Haiku 4.5 生成的圆润鸟形骑自行车场景',
      },
    ],
    sources: [
      {
        label: '发布日实测',
        href: 'https://simonwillison.net/2025/Oct/15/claude-haiku-45/',
      },
      {
        label: 'Anthropic 发布',
        href: 'https://www.anthropic.com/news/claude-haiku-4-5',
      },
    ],
  },
  {
    date: '2025-11-24',
    year: '2025',
    model: 'Claude Opus 4.5',
    title: '细化要求改善物种特征与车架',
    summary:
      '原始提示词下鹈鹕朝向和车架仍有问题；加入繁殖羽、喉囊等要求后，鸟种特征与车架都明显改善，因此单独标记为混合口径。',
    track: '混合口径',
    media: [
      {
        src: '/pelicans/2025-11-claude-opus-4.5.jpg',
        label: '原始提示词 · high',
        alt: 'Claude Opus 4.5 使用原始提示词生成的鹈鹕骑自行车，车架方向存在问题',
      },
      {
        src: '/pelicans/2025-11-claude-opus-4.5-advanced.jpg',
        label: '增强提示词',
        alt: 'Claude Opus 4.5 使用增强提示词生成的繁殖羽鹈鹕和更完整自行车',
      },
    ],
    sources: [
      {
        label: '两种提示词实测',
        href: 'https://simonwillison.net/2025/Nov/24/claude-opus/',
      },
      {
        label: 'Anthropic 发布',
        href: 'https://www.anthropic.com/news/claude-opus-4-5',
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
    date: '2026-02-05',
    year: '2026',
    model: 'Claude Opus 4.6',
    title: '鹈鹕细节成熟，车架仍略扭曲',
    summary:
      '喙、喉囊和羽毛已经很像鹈鹕，整体观感明显成熟；自行车基本成立，但车架几何仍有轻微错位。',
    track: '固定提示词',
    media: [
      {
        src: '/pelicans/2026-02-claude-opus-4.6.png',
        label: 'Claude Opus 4.6',
        alt: 'Claude Opus 4.6 生成的羽毛细节丰富的鹈鹕骑自行车，车架略有扭曲',
      },
    ],
    sources: [
      {
        label: '发布日实测',
        href: 'https://simonwillison.net/2026/Feb/5/two-new-models/',
      },
      {
        label: 'Anthropic 发布',
        href: 'https://www.anthropic.com/news/claude-opus-4-6',
      },
    ],
  },
  {
    date: '2026-02-17',
    year: '2026',
    model: 'Claude Sonnet 4.6',
    title: '完整但带着稳定的怪异细节',
    summary:
      '两次尝试都给鹈鹕加了礼帽。展示样本的鸟喙之间多出一根线，车架也发生弯折，完整性不等于关系正确。',
    track: '固定提示词',
    media: [
      {
        src: '/pelicans/2026-02-claude-sonnet-4.6.png',
        label: 'Claude Sonnet 4.6',
        alt: 'Claude Sonnet 4.6 生成的戴礼帽鹈鹕骑自行车，车架弯折且鸟喙间有多余连线',
      },
    ],
    sources: [
      {
        label: '发布日实测',
        href: 'https://simonwillison.net/2026/Feb/17/claude-sonnet-46/',
      },
      {
        label: 'Anthropic 发布',
        href: 'https://www.anthropic.com/news/claude-sonnet-4-6',
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
    date: '2026-04-16',
    year: '2026',
    model: 'Claude Opus 4.7',
    title: '两次尝试都没修好自行车',
    summary:
      '默认与 max thinking 的鹈鹕都可以辨认，但车架分别以不同方式失真。更多推理没有在这次测试里解决结构问题。',
    track: '固定提示词',
    media: [
      {
        src: '/pelicans/2026-04-claude-opus-4.7.png',
        label: '默认推理',
        alt: 'Claude Opus 4.7 默认推理生成的回头鹈鹕和错误自行车车架',
      },
      {
        src: '/pelicans/2026-04-claude-opus-4.7-max.png',
        label: 'Max thinking',
        alt: 'Claude Opus 4.7 max thinking 生成的鹈鹕和另一种错误自行车车架',
      },
    ],
    sources: [
      {
        label: '双次测试',
        href: 'https://simonwillison.net/2026/Apr/16/qwen-beats-opus/',
      },
      {
        label: 'Anthropic 发布',
        href: 'https://www.anthropic.com/news/claude-opus-4-7',
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
    date: '2026-05-28',
    year: '2026',
    model: 'Claude Opus 4.8',
    title: '五档推理展示从鸭到鹈鹕',
    summary:
      'low、medium、high 更像鸭或鹭，xhigh 才稳定出现鹈鹕特征，max 的鸟形与自行车最完整，也付出了最高的输出成本。',
    track: '固定提示词',
    media: [
      {
        src: '/pelicans/2026-05-claude-opus-4.8-low.png',
        label: 'Low',
        alt: 'Claude Opus 4.8 low 推理生成的鸭形鸟骑自行车',
      },
      {
        src: '/pelicans/2026-05-claude-opus-4.8-medium.png',
        label: 'Medium',
        alt: 'Claude Opus 4.8 medium 推理生成的鹭形鸟骑自行车',
      },
      {
        src: '/pelicans/2026-05-claude-opus-4.8-high.png',
        label: 'High',
        alt: 'Claude Opus 4.8 high 推理生成的鸭形鸟骑自行车',
      },
      {
        src: '/pelicans/2026-05-claude-opus-4.8-xhigh.png',
        label: 'Xhigh',
        alt: 'Claude Opus 4.8 xhigh 推理生成的鹈鹕骑黑色自行车',
      },
      {
        src: '/pelicans/2026-05-claude-opus-4.8-max.png',
        label: 'Max',
        alt: 'Claude Opus 4.8 max 推理生成的鹈鹕骑红色自行车完整场景',
      },
    ],
    sources: [
      {
        label: '五档推理测试',
        href: 'https://simonwillison.net/2026/May/28/claude-opus-4-8/',
      },
      {
        label: 'Anthropic 发布',
        href: 'https://www.anthropic.com/news/claude-opus-4-8',
      },
    ],
  },
  {
    date: '2026-06-09',
    year: '2026',
    model: 'Claude Fable 5',
    title: '五档推理差异不再只是细节',
    summary:
      '同一个固定提示词下，五档 effort 在造型、结构和输出成本上形成明显梯度；high 的 token 反而少于 medium，说明推理预算仍不是线性旋钮。',
    track: '固定提示词',
    media: [
      {
        src: '/pelicans/2026-06-claude-fable-5-low.jpg',
        label: 'Low',
        alt: 'Claude Fable 5 low 推理生成的鹈鹕骑自行车',
      },
      {
        src: '/pelicans/2026-06-claude-fable-5-medium.jpg',
        label: 'Medium',
        alt: 'Claude Fable 5 medium 推理生成的鹈鹕骑自行车',
      },
      {
        src: '/pelicans/2026-06-claude-fable-5-high.jpg',
        label: 'High',
        alt: 'Claude Fable 5 high 推理生成的鹈鹕骑自行车',
      },
      {
        src: '/pelicans/2026-06-claude-fable-5-xhigh.jpg',
        label: 'Xhigh',
        alt: 'Claude Fable 5 xhigh 推理生成的鹈鹕骑自行车',
      },
      {
        src: '/pelicans/2026-06-claude-fable-5-max.jpg',
        label: 'Max',
        alt: 'Claude Fable 5 max 推理生成的鹈鹕骑自行车',
      },
    ],
    sources: [
      {
        label: '五档推理测试',
        href: 'https://simonwillison.net/2026/Jun/9/claude-fable-5/',
      },
      {
        label: 'Anthropic 发布',
        href: 'https://www.anthropic.com/news/claude-fable-5-mythos-5',
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
    date: '2026-06-30',
    year: '2026',
    model: 'Claude Sonnet 5',
    title: '自行车成立，物种却退成了鹅',
    summary:
      '车轮、车架和抓住车把的动作已经连贯，但主体更像白鹅。结构能力成熟后，物种辨识仍会独立失手。',
    track: '固定提示词',
    media: [
      {
        src: '/pelicans/2026-06-claude-sonnet-5.png',
        label: 'Claude Sonnet 5',
        alt: 'Claude Sonnet 5 生成的白鹅形鸟骑自行车',
      },
    ],
    sources: [
      {
        label: '发布日实测',
        href: 'https://simonwillison.net/2026/Jun/30/claude-sonnet-5/',
      },
      {
        label: 'Anthropic 发布',
        href: 'https://www.anthropic.com/news/claude-sonnet-5',
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
    date: '2026-07-24',
    year: '2026',
    model: 'Claude Opus 5',
    title: '两次生成暴露渲染兼容性差异',
    summary:
      '第一版用 SVG use 元素复用轮组，Simon 当时记录为“车轮缺失”，在本站现代浏览器中会显示；第二版改为显式车轮，构图也更稳。',
    track: '固定提示词',
    media: [
      {
        src: '/pelicans/2026-07-claude-opus-5-first.svg',
        label: '第一次 · 复用轮组',
        alt: 'Claude Opus 5 第一次生成的鹈鹕骑红色自行车 SVG，轮组通过 SVG use 元素复用',
      },
      {
        src: '/pelicans/2026-07-claude-opus-5-second.svg',
        label: '第二次 · 显式轮组',
        alt: 'Claude Opus 5 第二次生成的鹈鹕骑红色自行车 SVG，车轮和车架完整',
      },
    ],
    sources: [
      {
        label: '两次测试',
        href: 'https://simonwillison.net/2026/Jul/24/introducing-claude-opus-5/',
      },
      {
        label: 'Anthropic 发布',
        href: 'https://www.anthropic.com/news/claude-opus-5',
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

const mediaCount = milestones.reduce((total, milestone) => total + milestone.media.length, 0);

const yearOptions = ['全部', '2024', '2025', '2026'] as const;
type YearOption = (typeof yearOptions)[number];
type Theme = 'light' | 'dark';
type Locale = 'zh' | 'en';

const english: Record<string, string> = {
  '固定提示词': 'Standard prompt',
  '回顾样本': 'Retrospective sample',
  '混合口径': 'Mixed criteria',
  '动画变体': 'Animation variant',
  '待确认': 'Unconfirmed',
  '首轮 16 个模型': 'Initial 16 models',
  '多数模型只画出了鸟或几何块': 'Most models drew only a bird or geometric shapes',
  '模型通常能生成 SVG，也知道鸟或轮子大概长什么样，但无法组织出骑自行车的完整关系。':
    'Models could usually generate SVG and approximate birds or wheels, but they could not assemble a coherent bicycle-riding scene.',
  'Claude 3 Opus 生成的鹈鹕和两轮自行车，主体与车架连接仍然错乱':
    'A pelican and two-wheeled bicycle generated by Claude 3 Opus, with the rider and frame still connected incorrectly',
  'Claude 3 Haiku 生成的橙色抽象鸟形和简化自行车':
    'An abstract orange bird and simplified bicycle generated by Claude 3 Haiku',
  'Claude 3.5 Sonnet 2024 年 6 月版生成的简化鹈鹕和几何车架':
    'A simplified pelican and geometric frame generated by the June 2024 Claude 3.5 Sonnet',
  'Claude 3.5 Sonnet 2024 年 10 月升级版生成的鹈鹕和自行车尝试':
    'A pelican-and-bicycle attempt generated by the October 2024 Claude 3.5 Sonnet',
  'GPT-4o 生成的一只孤立的鸟': 'An isolated bird generated by GPT-4o',
  'o1-preview 生成的鸟和一条竖线，没有形成自行车':
    'A bird and vertical line generated by o1-preview, without a bicycle',
  'Gemini 1.5 Flash-002 生成的黄色几何块':
    'Yellow geometric shapes generated by Gemini 1.5 Flash-002',
  'Gemini 1.5 Flash-8B 生成的抽象黄色图形':
    'An abstract yellow figure generated by Gemini 1.5 Flash-8B',
  'Llama 3.1 70B 生成的抽象轮状图案':
    'An abstract wheel-like pattern generated by Llama 3.1 70B',
  '首轮测试': 'Initial test',
  '原始样本仓库': 'Original sample repository',
  'Claude 3 发布': 'Claude 3 announcement',
  'Claude 3.5 首发': 'Claude 3.5 launch',
  'Claude 3.5 升级版': 'Claude 3.5 upgrade',
  '推理变长，构图没有同步解决': 'Longer reasoning did not fix composition',
  '较长的推理过程最终仍得到抽象鸟形。这个样本很早就说明，更多推理 token 不保证更好的空间构图。':
    'A longer reasoning process still produced an abstract bird. This early sample showed that more reasoning tokens do not guarantee better spatial composition.',
  'QwQ 32B Preview 生成的抽象蓝色鸟形':
    'An abstract blue bird generated by QwQ 32B Preview',
  'X 原帖': 'Original post on X',
  'Qwen 归档': 'Qwen archive',
  '第一次明显形成完整场景': 'The first clearly complete scene',
  '主体、两个车轮、车架和地面同时出现。画面还不精确，但已经从识别对象跨到组织场景。':
    'The subject, two wheels, frame, and ground all appear together. The image is still imprecise, but it moves from recognizing objects to composing a scene.',
  'Gemini exp-1206 生成的鹈鹕骑两轮自行车场景':
    'A pelican riding a two-wheeled bicycle generated by Gemini exp-1206',
  '博客记录': 'Blog post',
  '完整场景开始成为常态': 'Complete scenes started becoming routine',
  '鹈鹕、车轮和车架已经在同一画面里，但主体更像叠放，接触关系仍然薄弱。':
    'The pelican, wheels, and frame now share one image, but they look stacked together and their contact relationships remain weak.',
  'DeepSeek V3 的鹈鹕和近似自行车结构':
    'DeepSeek V3\'s pelican with an approximate bicycle structure',
  '六个月回顾': 'Six-month retrospective',
  '对象更清楚，物理关系仍脆弱': 'Clearer objects, fragile physical relationships',
  '鹈鹕和自行车更容易辨认，细节也更多，但鸟、车把和脚踏之间仍缺少可信连接。':
    'The pelican and bicycle are easier to recognize and more detailed, but the bird, handlebars, and pedals still lack believable connections.',
  'DeepSeek R1 生成的鹈鹕和近似自行车车架':
    'A pelican and approximate bicycle frame generated by DeepSeek R1',
  '首发测试': 'Launch test',
  '推理模式带来两次可比结果': 'Reasoning mode produced two comparable results',
  '普通模式与 thinking 模式都画出了完整主体和自行车元素，但局部仍有重复、错位和堆叠。':
    'Both standard and thinking modes drew a complete subject and bicycle elements, but parts were still duplicated, misaligned, or stacked.',
  '普通模式': 'Standard mode',
  'Claude 3.7 Sonnet 普通模式生成的鹈鹕与自行车元素':
    'Pelican and bicycle elements generated by Claude 3.7 Sonnet in standard mode',
  'Thinking 模式': 'Thinking mode',
  'Claude 3.7 Sonnet thinking 模式生成的鹈鹕与自行车元素':
    'Pelican and bicycle elements generated by Claude 3.7 Sonnet in thinking mode',
  '双模式测试': 'Two-mode test',
  'Anthropic 发布': 'Anthropic announcement',
  '骑车关系开始稳定': 'The riding relationship started to stabilize',
  '问题从有没有自行车，转向车架是否合理、脚是否真正踩在踏板上。':
    'The question shifted from whether there was a bicycle to whether the frame made sense and the feet truly met the pedals.',
  'Gemini 2.5 Pro 生成的鹈鹕和自行车完整场景':
    'A complete pelican-and-bicycle scene generated by Gemini 2.5 Pro',
  '同代两档模型首次并排': 'Two tiers of one generation compared side by side',
  'Sonnet 4 的自行车更完整，Opus 4 的车轮缺少辐条。两者都能完成场景，但旗舰档位并没有在这次单样本中明显胜出。':
    'Sonnet 4 produced the more complete bicycle, while Opus 4 omitted wheel spokes. Both completed the scene, but the flagship did not clearly win this single sample.',
  'Claude Sonnet 4 生成的鹈鹕骑自行车，车架和轮辐较完整':
    'A pelican riding a bicycle generated by Claude Sonnet 4, with a relatively complete frame and spokes',
  'Claude Opus 4 生成的鹈鹕骑自行车，车轮缺少辐条':
    'A pelican riding a bicycle generated by Claude Opus 4, with missing wheel spokes',
  '发布会实测': 'Live launch test',
  '进入较完整的骑行构图': 'A more complete riding composition',
  '红色车架、两个轮子和车把相互连接，鹈鹕姿态也更接近骑乘。':
    'The red frame, two wheels, and handlebars connect to one another, and the pelican\'s pose looks more like riding.',
  'Gemini 2.5 Pro Preview 生成的鹈鹕骑红色自行车':
    'A pelican riding a red bicycle generated by Gemini 2.5 Pro Preview',
  '鸟形进步，自行车仍是短板': 'The bird improved; the bicycle remained the weak point',
  '线稿里的喙和脚踏关系更清楚，但车架形状依然不合理，说明点版本升级没有稳定解决空间结构。':
    'The line drawing clarifies the beak and pedal relationship, but the frame is still implausible, showing that the point release did not reliably solve spatial structure.',
  'Claude Opus 4.1 生成的线稿鹈鹕骑自行车，车架形状仍不规则':
    'A line-art pelican riding a bicycle generated by Claude Opus 4.1, with an irregular frame',
  '发布日实测': 'Launch-day test',
  'GPT-5 系列': 'GPT-5 family',
  '自行车结构显著改善': 'Bicycle structure improved substantially',
  '车架、辐条、脚踏、腿部位置和整体比例都明显进步。小模型也能完成场景，但细节并不按规模单调变化。':
    'The frame, spokes, pedals, leg placement, and overall proportions all improved. Smaller models could also complete the scene, though detail did not improve monotonically with model size.',
  'GPT-5 生成的结构完整自行车和正在踩踏的鹈鹕':
    'A structurally complete bicycle and pedaling pelican generated by GPT-5',
  'GPT-5 mini 生成的鹈鹕骑自行车': 'A pelican riding a bicycle generated by GPT-5 mini',
  'GPT-5 nano 生成的鹈鹕骑自行车': 'A pelican riding a bicycle generated by GPT-5 nano',
  'Thinking 与普通模式各有缺陷': 'Thinking and standard modes each had flaws',
  '两次结果都能认出鹈鹕和自行车，但构件连接仍不可靠。Thinking 没有在这次单样本里带来稳定的结构优势。':
    'Both results show a recognizable pelican and bicycle, but the component connections remain unreliable. Thinking provided no consistent structural advantage in this single sample.',
  'Thinking 开启': 'Thinking on',
  'Claude Sonnet 4.5 开启 thinking 后生成的鹈鹕骑自行车':
    'A pelican riding a bicycle generated by Claude Sonnet 4.5 with thinking on',
  'Thinking 关闭': 'Thinking off',
  'Claude Sonnet 4.5 关闭 thinking 后生成的鹈鹕骑自行车':
    'A pelican riding a bicycle generated by Claude Sonnet 4.5 with thinking off',
  '轻量模型也能完成完整场景': 'Lightweight models could complete the scene too',
  '圆润的鸟形、两个车轮和地面同时出现。主体更像一般鸟类，但低成本档位已经跨过“完整构图”门槛。':
    'A rounded bird, two wheels, and ground appear together. The subject looks like a generic bird, but the lower-cost tier crossed the complete-composition threshold.',
  'Claude Haiku 4.5 生成的圆润鸟形骑自行车场景':
    'A rounded bird riding a bicycle generated by Claude Haiku 4.5',
  '细化要求改善物种特征与车架':
    'More detailed instructions improved species features and the frame',
  '原始提示词下鹈鹕朝向和车架仍有问题；加入繁殖羽、喉囊等要求后，鸟种特征与车架都明显改善，因此单独标记为混合口径。':
    'With the original prompt, the pelican orientation and frame still had problems. Adding breeding plumage and throat-pouch requirements improved both, so the result is marked as mixed criteria.',
  '原始提示词 · high': 'Original prompt · high',
  'Claude Opus 4.5 使用原始提示词生成的鹈鹕骑自行车，车架方向存在问题':
    'A pelican riding a bicycle generated by Claude Opus 4.5 from the original prompt, with an incorrectly oriented frame',
  '增强提示词': 'Enhanced prompt',
  'Claude Opus 4.5 使用增强提示词生成的繁殖羽鹈鹕和更完整自行车':
    'A breeding-plumage pelican and more complete bicycle generated by Claude Opus 4.5 from the enhanced prompt',
  '两种提示词实测': 'Two-prompt test',
  '基础任务与细节任务分轨': 'Base and detail tasks split into separate tracks',
  '基础提示词已经能生成完整结果。增强提示词增加鸟种、羽毛和喉囊要求，两者不应直接排名。':
    'The base prompt already produces a complete result. The enhanced prompt adds species, plumage, and throat-pouch requirements, so the two should not be ranked directly.',
  '原始提示词': 'Original prompt',
  'GPT-5.2 使用原始提示词生成的鹈鹕骑自行车':
    'A pelican riding a bicycle generated by GPT-5.2 from the original prompt',
  'GPT-5.2 使用增强提示词生成的加州褐鹈鹕骑自行车':
    'A California brown pelican riding a bicycle generated by GPT-5.2 from the enhanced prompt',
  '鹈鹕细节成熟，车架仍略扭曲': 'Mature pelican detail, a slightly distorted frame',
  '喙、喉囊和羽毛已经很像鹈鹕，整体观感明显成熟；自行车基本成立，但车架几何仍有轻微错位。':
    'The beak, throat pouch, and feathers now look convincingly pelican-like. The bicycle mostly works, though its frame geometry remains slightly misaligned.',
  'Claude Opus 4.6 生成的羽毛细节丰富的鹈鹕骑自行车，车架略有扭曲':
    'A richly feathered pelican riding a bicycle generated by Claude Opus 4.6, with a slightly distorted frame',
  '完整但带着稳定的怪异细节': 'Complete, but with consistently strange details',
  '两次尝试都给鹈鹕加了礼帽。展示样本的鸟喙之间多出一根线，车架也发生弯折，完整性不等于关系正确。':
    'Both attempts gave the pelican a top hat. The shown sample adds a stray line between the beak halves and bends the frame, proving completeness is not the same as correct relationships.',
  'Claude Sonnet 4.6 生成的戴礼帽鹈鹕骑自行车，车架弯折且鸟喙间有多余连线':
    'A top-hatted pelican riding a bicycle generated by Claude Sonnet 4.6, with a bent frame and stray line across the beak',
  '复杂约束继续增加': 'The constraints kept getting more complex',
  '原始提示词用于纵向比较，增强提示词测试羽毛、喉囊、姿势和场景细节。':
    'The original prompt supports longitudinal comparison, while the enhanced prompt tests plumage, throat pouch, pose, and scene detail.',
  'Gemini 3.1 Pro 使用原始提示词生成的鹈鹕骑自行车':
    'A pelican riding a bicycle generated by Gemini 3.1 Pro from the original prompt',
  'Gemini 3.1 Pro 使用增强提示词生成的细节版鹈鹕骑自行车':
    'A more detailed pelican riding a bicycle generated by Gemini 3.1 Pro from the enhanced prompt',
  'GPT-5.4 家族': 'GPT-5.4 family',
  '推理等级并不单调决定画质':
    'Reasoning level did not determine image quality monotonically',
  '同一家族的模型和推理等级组成对照矩阵。高推理通常有帮助，但单次画面并不保证更好。':
    'Models and reasoning levels from one family form a comparison matrix. More reasoning often helps, but does not guarantee a better single image.',
  '模型与推理等级矩阵': 'Model and reasoning-level matrix',
  'GPT-5.4 家族在多档推理等级下的鹈鹕测试矩阵':
    'A pelican-test matrix of the GPT-5.4 family across multiple reasoning levels',
  '家族对比': 'Family comparison',
  'GPT-5.4 首测': 'First GPT-5.4 test',
  '两次尝试都没修好自行车': 'Neither attempt fixed the bicycle',
  '默认与 max thinking 的鹈鹕都可以辨认，但车架分别以不同方式失真。更多推理没有在这次测试里解决结构问题。':
    'Both default and max-thinking results show recognizable pelicans, but their frames fail in different ways. More reasoning did not solve the structural problem in this test.',
  '默认推理': 'Default reasoning',
  'Claude Opus 4.7 默认推理生成的回头鹈鹕和错误自行车车架':
    'A backward-looking pelican and incorrect bicycle frame generated by Claude Opus 4.7 with default reasoning',
  'Claude Opus 4.7 max thinking 生成的鹈鹕和另一种错误自行车车架':
    'A pelican and another incorrect bicycle frame generated by Claude Opus 4.7 with max thinking',
  '双次测试': 'Two-run test',
  '本地小模型跨过实用门槛': 'A small local model crossed the practical threshold',
  '约 17GB 的本地模型已经画出完整车架、辐条、车把和踩踏姿势，进步不再只属于大型云端模型。':
    'A roughly 17GB local model drew a complete frame, spokes, handlebars, and pedaling pose. Progress was no longer limited to large cloud models.',
  'Qwen 3.6 27B 本地运行': 'Qwen 3.6 27B running locally',
  'Qwen 3.6 27B 本地模型生成的鹈鹕骑红色自行车':
    'A pelican riding a red bicycle generated by the local Qwen 3.6 27B model',
  '本地测试': 'Local test',
  '五档推理展示从鸭到鹈鹕': 'Five reasoning levels ranged from duck to pelican',
  'low、medium、high 更像鸭或鹭，xhigh 才稳定出现鹈鹕特征，max 的鸟形与自行车最完整，也付出了最高的输出成本。':
    'Low, medium, and high looked more like ducks or herons. Pelican features became reliable at xhigh, while max produced the most complete bird and bicycle at the highest output cost.',
  'Claude Opus 4.8 low 推理生成的鸭形鸟骑自行车':
    'A duck-like bird riding a bicycle generated by Claude Opus 4.8 at low reasoning',
  'Claude Opus 4.8 medium 推理生成的鹭形鸟骑自行车':
    'A heron-like bird riding a bicycle generated by Claude Opus 4.8 at medium reasoning',
  'Claude Opus 4.8 high 推理生成的鸭形鸟骑自行车':
    'A duck-like bird riding a bicycle generated by Claude Opus 4.8 at high reasoning',
  'Claude Opus 4.8 xhigh 推理生成的鹈鹕骑黑色自行车':
    'A pelican riding a black bicycle generated by Claude Opus 4.8 at xhigh reasoning',
  'Claude Opus 4.8 max 推理生成的鹈鹕骑红色自行车完整场景':
    'A complete pelican-riding-a-red-bicycle scene generated by Claude Opus 4.8 at max reasoning',
  '五档推理测试': 'Five-level reasoning test',
  '五档推理差异不再只是细节': 'Five reasoning levels differed by more than detail',
  '同一个固定提示词下，五档 effort 在造型、结构和输出成本上形成明显梯度；high 的 token 反而少于 medium，说明推理预算仍不是线性旋钮。':
    'With one fixed prompt, five effort levels formed a clear gradient in shape, structure, and output cost. High used fewer tokens than medium, showing that reasoning budget is not a linear dial.',
  'Claude Fable 5 low 推理生成的鹈鹕骑自行车':
    'A pelican riding a bicycle generated by Claude Fable 5 at low reasoning',
  'Claude Fable 5 medium 推理生成的鹈鹕骑自行车':
    'A pelican riding a bicycle generated by Claude Fable 5 at medium reasoning',
  'Claude Fable 5 high 推理生成的鹈鹕骑自行车':
    'A pelican riding a bicycle generated by Claude Fable 5 at high reasoning',
  'Claude Fable 5 xhigh 推理生成的鹈鹕骑自行车':
    'A pelican riding a bicycle generated by Claude Fable 5 at xhigh reasoning',
  'Claude Fable 5 max 推理生成的鹈鹕骑自行车':
    'A pelican riding a bicycle generated by Claude Fable 5 at max reasoning',
  '从静态构图进入动画 SVG': 'From static composition to animated SVG',
  '画面结构已经很完整，并且能生成动画。新的难点变成车轮转动时，脚能否持续跟随踏板。':
    'The scene structure is already complete and can be animated. The new challenge is keeping the feet on the pedals as the wheels turn.',
  'GLM 5.2 动画 SVG': 'GLM 5.2 animated SVG',
  'GLM 5.2 生成的动画鹈鹕骑自行车 SVG':
    'An animated SVG of a pelican riding a bicycle generated by GLM 5.2',
  '自行车成立，物种却退成了鹅':
    'The bicycle worked, but the species regressed into a goose',
  '车轮、车架和抓住车把的动作已经连贯，但主体更像白鹅。结构能力成熟后，物种辨识仍会独立失手。':
    'The wheels, frame, and grip on the handlebars are coherent, but the subject looks more like a white goose. Species recognition can still fail independently after structure matures.',
  'Claude Sonnet 5 生成的白鹅形鸟骑自行车':
    'A white goose-like bird riding a bicycle generated by Claude Sonnet 5',
  'GPT-5.6 家族': 'GPT-5.6 family',
  '同一家族内部仍有明显差异': 'Large differences remained within one model family',
  'Luna、Terra、Sol 和多档推理等级组成九宫格，展示模型档位、推理预算与采样的共同影响。':
    'Luna, Terra, Sol, and multiple reasoning levels form a 3×3 grid showing the combined effects of model tier, reasoning budget, and sampling.',
  'GPT-5.6 九宫格': 'GPT-5.6 3×3 grid',
  'GPT-5.6 Luna Terra Sol 在多档推理等级下的结果矩阵':
    'A result matrix for GPT-5.6 Luna, Terra, and Sol across multiple reasoning levels',
  '结果更完整，测试开始失去区分度':
    'Results improved as the test lost discriminating power',
  '场景已经相当连贯，但测试无法代表代理能力和工具调用等差异，也开始面临过度推理和成本问题。':
    'The scene is quite coherent, but the test cannot represent differences in agent capabilities or tool use, and now faces over-reasoning and cost issues.',
  'Kimi K3 生成的完整鹈鹕骑自行车场景':
    'A complete pelican-riding-a-bicycle scene generated by Kimi K3',
  '测试与反思': 'Test and reflection',
  '两次生成暴露渲染兼容性差异':
    'Two generations exposed rendering compatibility differences',
  '第一版用 SVG use 元素复用轮组，Simon 当时记录为“车轮缺失”，在本站现代浏览器中会显示；第二版改为显式车轮，构图也更稳。':
    'The first version reused wheels with SVG use elements. Simon recorded them as missing, though they render in modern browsers here. The second used explicit wheels and a steadier composition.',
  '第一次 · 复用轮组': 'First attempt · reused wheelset',
  'Claude Opus 5 第一次生成的鹈鹕骑红色自行车 SVG，轮组通过 SVG use 元素复用':
    'Claude Opus 5\'s first SVG of a pelican riding a red bicycle, with wheels reused through SVG use elements',
  '第二次 · 显式轮组': 'Second attempt · explicit wheels',
  'Claude Opus 5 第二次生成的鹈鹕骑红色自行车 SVG，车轮和车架完整':
    'Claude Opus 5\'s second SVG of a pelican riding a red bicycle, with complete wheels and frame',
  '两次测试': 'Two tests',
  '17GB 本地模型继续逼近前沿效果': 'A 17GB local model moved closer to frontier results',
  'xhigh 推理得到结构完整的结果，关闭推理则明显松散，直观显示效果、等待时间和本地资源之间的取舍。':
    'Xhigh reasoning produced a structurally complete result, while disabling reasoning made the composition much looser, exposing the tradeoff among quality, wait time, and local resources.',
  'xhigh 推理': 'xhigh reasoning',
  'Qwen 3.8 27B 使用 xhigh 推理生成的鹈鹕骑红色自行车':
    'A pelican riding a red bicycle generated by Qwen 3.8 27B with xhigh reasoning',
  '关闭推理': 'Reasoning off',
  'Qwen 3.8 27B 关闭推理后的较松散构图':
    'A looser composition from Qwen 3.8 27B with reasoning disabled',
  '未公开新模型': 'Undisclosed new model',
  '效果很好，但模型身份待确认': 'A strong result from an unconfirmed model',
  '原帖没有给出模型名称，讨论中也提到可能见过该测试。这里只展示实际结果，不据此判断排名。':
    'The original post did not name the model, and the discussion suggested it may have seen the test before. Only the result is shown here, without ranking it.',
  'X 视频样本': 'Video sample on X',
  '未公开模型生成的鹈鹕骑自行车动画':
    'An animation of a pelican riding a bicycle generated by an undisclosed model',
  '全部': 'All',
  '外观主题': 'Color theme',
  '浅色': 'Light',
  '深色': 'Dark',
  '跳到时间轴': 'Skip to timeline',
  '返回页面顶部': 'Back to top',
  '主导航': 'Primary navigation',
  '时间轴': 'Timeline',
  '比较口径': 'Method',
  '原始归档': 'Source archive',
  '大模型 SVG 能力演进': 'LLM SVG capability evolution',
  '同一提示词，看见两年进步': 'One prompt, two years of progress',
  '查看时间轴': 'Explore the timeline',
  '了解测试': 'About the test',
  '2024 年 Claude 3.5 Sonnet 的简化鸟形，与 2026 年 Qwen 3.8 27B 的完整鹈鹕骑自行车对比':
    'A comparison between the simplified bird from Claude 3.5 Sonnet in 2024 and the complete pelican riding a bicycle from Qwen 3.8 27B in 2026',
  '拖动对比 2024 与 2026': 'Drag to compare 2024 and 2026',
  '收录范围': 'Coverage',
  '时间轴起点': 'Timeline begins',
  '代表节点': 'Milestones',
  '实图与视频': 'Images and video',
  '当前更新': 'Latest update',
  '从“画出来”到“关系正确”': 'From drawing objects to getting relationships right',
  '选择年份，查看模型如何逐步解决对象、结构、接触关系和运动。':
    'Choose a year to see how models gradually solved objects, structure, contact, and motion.',
  '按年份筛选': 'Filter by year',
  '如何读这条时间轴': 'How to read this timeline',
  '它适合感受变化，不替代系统评测。四条记录规则避免把不同任务混成排行榜。':
    'It reveals the direction of change, but does not replace systematic evaluation. These rules keep different tasks from becoming a false leaderboard.',
  '固定提示词作为主线': 'Use the fixed prompt as the main thread',
  '主线统一使用 “Generate an SVG of a pelican riding a bicycle”。':
    'The main thread always uses “Generate an SVG of a pelican riding a bicycle.”',
  '增强提示词单独标记': 'Mark enhanced prompts separately',
  '加入鸟种、羽毛、背景等要求后，任务已经变化，不能直接横向排名。':
    'Adding requirements for species, plumage, or background changes the task, so the results should not be ranked directly.',
  '动画变体单独标记': 'Mark animation variants separately',
  '动画 SVG 还要处理时间与运动关系，难度不同于静态结果。':
    'Animated SVG must also handle time and motion, making it a different challenge from static output.',
  '未知模型不做结论': 'Draw no conclusions from unknown models',
  '只有结果、没有模型和运行信息的样本保留展示，但不参与能力判断。':
    'Samples with a result but no model or run information remain visible, but do not inform capability judgments.',
  'Claude 覆盖按可追溯样本': 'Include Claude models only when samples are traceable',
  'Claude 3 Sonnet、Claude 3.5 Haiku 与 Mythos 5 暂未找到可追溯的同提示词原图，因此不补空白节点。':
    'No traceable original image from the same prompt has been found for Claude 3 Sonnet, Claude 3.5 Haiku, or Mythos 5, so no placeholder milestones are added.',
  '测试正在趋于饱和。': 'The test is becoming saturated.',
  '它公开时间越长，越容易受样本挑选、随机性和训练数据影响。Simon 也认为它与综合能力的相关性已经减弱。':
    'The longer it remains public, the more it is affected by sample selection, randomness, and training data. Simon also believes its correlation with general capability has weakened.',
  '阅读 Simon 的反思': 'Read Simon\'s reflection',
  '资料整理至 2026-08-27。结果版权归原作者与发布者所有。':
    'Research compiled through 2026-08-27. Results remain the property of their original authors and publishers.',
  '查看完整来源归档': 'View the complete source archive',
  '图片预览': 'Image preview',
  '原始测试结果': 'Original test result',
  '关闭': 'Close',
  '打开原图': 'Open original image',
  '鹈鹕测试时间轴 | 大模型 SVG 能力演进':
    'Pelican Test Timeline | LLM SVG Capability Evolution',
  '用同一句 SVG 提示词，直观浏览 2024 到 2026 年不同大模型的实际效果演进。':
    'See how real outputs from different language models evolved from 2024 to 2026 using the same SVG prompt.',
};

const translate = (locale: Locale, text: string) =>
  locale === 'en' ? (english[text] ?? text) : text;

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

  useEffect(() => {
    const media = window.matchMedia('(prefers-color-scheme: dark)');
    const syncTheme = () => {
      const savedTheme = localStorage.getItem('pelican-theme');
      const nextTheme =
        savedTheme === 'light' || savedTheme === 'dark'
          ? savedTheme
          : media.matches
            ? 'dark'
            : 'light';

      document.documentElement.dataset.theme = nextTheme;
      document.documentElement.style.colorScheme = nextTheme;
      setTheme(nextTheme);
    };

    syncTheme();
    media.addEventListener('change', syncTheme);
    return () => media.removeEventListener('change', syncTheme);
  }, []);

  const selectTheme = (nextTheme: Theme) => {
    localStorage.setItem('pelican-theme', nextTheme);
    document.documentElement.dataset.theme = nextTheme;
    document.documentElement.style.colorScheme = nextTheme;
    setTheme(nextTheme);
  };

  const isDark = theme === 'dark';

  return (
    <button
      className="icon-toggle"
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

export default function Home() {
  const [locale, setLocale] = useState<Locale>('zh');
  const [comparison, setComparison] = useState(47);
  const [year, setYear] = useState<YearOption>('全部');
  const [preview, setPreview] = useState<Media | null>(null);
  const previewDialog = useRef<HTMLDialogElement>(null);

  useEffect(() => {
    const savedLocale = localStorage.getItem('pelican-locale');
    const nextLocale =
      savedLocale === 'zh' || savedLocale === 'en'
        ? savedLocale
        : navigator.language.toLowerCase().startsWith('zh')
          ? 'zh'
          : 'en';
    const timeout = window.setTimeout(() => setLocale(nextLocale), 0);
    return () => window.clearTimeout(timeout);
  }, []);

  useEffect(() => {
    document.documentElement.lang = locale === 'zh' ? 'zh-CN' : 'en';
    document.title = translate(locale, '鹈鹕测试时间轴 | 大模型 SVG 能力演进');
    document
      .querySelector('meta[name="description"]')
      ?.setAttribute(
        'content',
        translate(
          locale,
          '用同一句 SVG 提示词，直观浏览 2024 到 2026 年不同大模型的实际效果演进。',
        ),
      );
  }, [locale]);

  const selectLocale = (nextLocale: Locale) => {
    localStorage.setItem('pelican-locale', nextLocale);
    setLocale(nextLocale);
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

          <figure className="comparison">
            <div className="comparison-meta" aria-hidden="true">
              <span>2024 Claude 3.5</span>
              <span>2026 Qwen 3.8</span>
            </div>
            <div
              className="comparison-stage"
              style={{ '--split': `${comparison}%` } as CSSProperties}
              role="img"
              aria-label={t(
                '2024 年 Claude 3.5 Sonnet 的简化鸟形，与 2026 年 Qwen 3.8 27B 的完整鹈鹕骑自行车对比',
              )}
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
            </div>
            <label className="comparison-control">
              <span>{t('拖动对比 2024 与 2026')}</span>
              <input
                type="range"
                min="8"
                max="92"
                value={comparison}
                onChange={(event) => setComparison(Number(event.target.value))}
                aria-valuetext={
                  locale === 'zh'
                    ? `左侧显示 ${comparison}% 的 2024 结果`
                    : `${comparison}% of the 2024 result is visible on the left`
                }
              />
            </label>
          </figure>
        </section>

        <section className="fact-strip" aria-label={t('收录范围')}>
          <div>
            <strong>2024.10</strong>
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
            <strong>2026.08</strong>
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
        <p>{t('资料整理至 2026-08-27。结果版权归原作者与发布者所有。')}</p>
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
        }}
      >
        {preview ? (
          <div className="preview-dialog-inner">
            <header className="preview-dialog-header">
              <div>
                <strong>{t(preview.label)}</strong>
                <span>{t('原始测试结果')}</span>
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
              <a href={preview.src} target="_blank" rel="noreferrer">
                {t('打开原图')}
              </a>
            </div>
          </div>
        ) : null}
      </dialog>
    </div>
  );
}
