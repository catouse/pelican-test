export type Media = {
  src: string;
  alt: string;
  label: string;
  kind?: 'image' | 'video';
};

type Source = {
  label: string;
  href: string;
};

export type Milestone = {
  date: string;
  year: '2024' | '2025' | '2026';
  model: string;
  title: string;
  summary: string;
  track: '固定提示词' | '回顾样本' | '混合口径' | '动画变体' | '待确认';
  media: Media[];
  sources: Source[];
};

export const milestones: Milestone[] = [
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

export const mediaCount = milestones.reduce((total, milestone) => total + milestone.media.length, 0);

export const timelineStart = milestones[0].date;
export const latestUpdate = milestones[milestones.length - 1].date;
