import { Case, Topic } from '../types';

export const mockTopics: Topic[] = [
  {
    id: 'burn-money',
    name: '烧钱过快',
    description: '资金消耗速度过快的创业失败案例，警示资本效率的重要性',
    icon: 'flame',
    tags: ['资金管理', '运营效率'],
    caseCount: 5
  },
  {
    id: 'pivot-fail',
    name: '转型失败',
    description: '多次转型未果，最终走向失败的案例',
    icon: 'refresh-cw',
    tags: ['战略调整', '市场定位'],
    caseCount: 3
  },
  {
    id: 'founder-exit',
    name: '创始人离场',
    description: '因创始人退出或团队分裂导致的失败案例',
    icon: 'user-x',
    tags: ['团队管理', '股权结构'],
    caseCount: 4
  },
  {
    id: 'competition-out',
    name: '竞争淘汰',
    description: '在市场竞争中被对手击败的案例',
    icon: 'swords',
    tags: ['市场竞争', '差异化'],
    caseCount: 4
  },
  {
    id: 'policy-risk',
    name: '政策风险',
    description: '受政策变化影响而关闭的案例',
    icon: 'scale',
    tags: ['合规经营', '政策预判'],
    caseCount: 2
  },
  {
    id: 'team-conflict',
    name: '团队内斗',
    description: '因团队内部矛盾导致的失败案例',
    icon: 'users',
    tags: ['团队管理', '企业文化'],
    caseCount: 2
  }
];

export const mockCases: Case[] = [
  {
    id: '1',
    name: '小蓝单车',
    logo: '/logos/xiaolan.png',
    industry: '出行交通',
    region: '华北',
    foundedYear: 2016,
    closedYear: 2018,
    stage: 'C轮',
    fundingAmount: 15000,
    products: [
      {
        id: '1',
        name: '小蓝单车App',
        description: '共享单车应用，提供城市短途出行服务',
        features: ['扫码解锁', 'GPS定位', '信用积分', '智能计费'],
        targetUsers: '城市通勤人群'
      }
    ],
    timeline: [
      { year: 2016, month: 3, title: '公司成立', description: '小蓝单车在北京成立' },
      { year: 2016, month: 6, title: '天使轮融资', description: '获得1000万天使轮融资' },
      { year: 2017, month: 1, title: 'A轮融资', description: '获得1亿A轮融资' },
      { year: 2017, month: 8, title: 'B轮融资', description: '获得5亿B轮融资' },
      { year: 2017, month: 11, title: '资金链紧张', description: '扩张过快，资金消耗巨大' },
      { year: 2018, month: 3, title: '宣布关闭', description: '正式宣布停止运营' }
    ],
    team: [
      { id: '1', name: '李刚', role: '创始人', avatar: '/avatars/ligang.jpg', change: '离开' },
      { id: '2', name: '王强', role: 'CEO', avatar: '/avatars/wangqiang.jpg', change: '离开' }
    ],
    fundingRecords: [
      { round: '天使轮', amount: 1000, investors: '个人投资者', year: 2016 },
      { round: 'A轮', amount: 10000, investors: '红杉资本', year: 2017 },
      { round: 'B轮', amount: 50000, investors: '腾讯', year: 2017 }
    ],
    failureReasons: [
      { category: '资金管理', description: '扩张速度过快，在多个城市同时投放车辆，资金消耗远超预期', severity: 5 },
      { category: '市场竞争', description: '面对ofo和摩拜的激烈竞争，市场份额被严重挤压', severity: 4 },
      { category: '运营问题', description: '车辆维护成本高，损坏率居高不下，用户体验下降', severity: 3 }
    ],
    lessons: [
      '控制扩张速度，确保资金充足后再进行地域扩张',
      '建立有效的成本控制体系，设定资金红线',
      '关注竞争对手动向，寻找差异化竞争策略',
      '保持用户服务质量，不能为了扩张牺牲体验'
    ],
    references: [
      { title: '小蓝单车倒闭始末', url: 'https://tech.163.com/18/0301', source: '网易科技' },
      { title: '共享单车行业洗牌进行时', url: 'https://finance.sina.com.cn/17/1128', source: '新浪财经' }
    ],
    stats: { views: 12580, favorites: 892, corrections: 3 },
    status: 'approved',
    createdAt: '2024-01-15T10:00:00Z',
    updatedAt: '2024-01-15T10:00:00Z',
    topics: ['burn-money', 'competition-out']
  },
  {
    id: '2',
    name: '神奇百货',
    logo: '/logos/shenqi.png',
    industry: '电子商务',
    region: '华东',
    foundedYear: 2015,
    closedYear: 2017,
    stage: 'A轮',
    fundingAmount: 2000,
    products: [
      {
        id: '1',
        name: '神奇百货App',
        description: '面向95后的潮流电商平台',
        features: ['个性化推荐', '社交分享', '限时秒杀'],
        targetUsers: '95后年轻群体'
      }
    ],
    timeline: [
      { year: 2015, month: 5, title: '项目启动', description: '神奇百货项目启动' },
      { year: 2015, month: 9, title: '种子轮融资', description: '获得200万种子轮融资' },
      { year: 2016, month: 3, title: 'A轮融资', description: '获得2000万A轮融资' },
      { year: 2016, month: 7, title: '用户增长停滞', description: '用户增长遇到瓶颈' },
      { year: 2017, month: 1, title: '宣布关闭', description: '业务转型失败，宣布关闭' }
    ],
    team: [
      { id: '1', name: '王凯', role: '创始人', avatar: '/avatars/wangkai.jpg', change: '离开' }
    ],
    fundingRecords: [
      { round: '种子轮', amount: 200, investors: '创新工场', year: 2015 },
      { round: 'A轮', amount: 2000, investors: '经纬中国', year: 2016 }
    ],
    failureReasons: [
      { category: '市场定位', description: '目标用户群体过于狭窄，难以形成规模效应', severity: 4 },
      { category: '产品问题', description: '供应链管理混乱，商品质量参差不齐', severity: 4 },
      { category: '运营能力', description: '团队运营经验不足，用户留存率低', severity: 3 }
    ],
    lessons: [
      '明确目标用户群体，但也要考虑市场容量',
      '建立稳定的供应链体系',
      '创始团队需要具备相关行业经验',
      '用户留存与用户获取同样重要'
    ],
    references: [
      { title: '神奇百货的兴衰启示录', url: 'https://www.36kr.com/p/5056128', source: '36氪' }
    ],
    stats: { views: 8920, favorites: 567, corrections: 2 },
    status: 'approved',
    createdAt: '2024-01-20T10:00:00Z',
    updatedAt: '2024-01-20T10:00:00Z',
    topics: ['pivot-fail']
  },
  {
    id: '3',
    name: '空你太美',
    logo: '/logos/kong.png',
    industry: '社交网络',
    region: '华南',
    foundedYear: 2018,
    closedYear: 2020,
    stage: 'B轮',
    fundingAmount: 8000,
    products: [
      {
        id: '1',
        name: '空你太美App',
        description: '基于AI的陌生人社交应用',
        features: ['智能匹配', 'AI虚拟形象', '语音聊天'],
        targetUsers: '年轻单身群体'
      }
    ],
    timeline: [
      { year: 2018, month: 6, title: '产品上线', description: '空你太美App正式上线' },
      { year: 2018, month: 10, title: 'A轮融资', description: '获得5000万A轮融资' },
      { year: 2019, month: 5, title: 'B轮融资', description: '获得8000万B轮融资' },
      { year: 2019, month: 12, title: '用户增长放缓', description: '用户增长速度明显放缓' },
      { year: 2020, month: 3, title: '资金耗尽', description: '资金链断裂，无法继续运营' }
    ],
    team: [
      { id: '1', name: '张伟', role: '创始人', avatar: '/avatars/zhangwei.jpg', change: '离开' },
      { id: '2', name: '李娜', role: 'CTO', avatar: '/avatars/lina.jpg', change: '离开' }
    ],
    fundingRecords: [
      { round: 'A轮', amount: 5000, investors: 'IDG资本', year: 2018 },
      { round: 'B轮', amount: 8000, investors: 'GGV纪源资本', year: 2019 }
    ],
    failureReasons: [
      { category: '商业模式', description: '变现能力不足，用户付费意愿低', severity: 5 },
      { category: '市场竞争', description: '社交赛道竞争激烈，难以与头部产品竞争', severity: 4 },
      { category: '政策风险', description: '监管政策趋严，部分功能被迫下线', severity: 3 }
    ],
    lessons: [
      '尽早验证商业模式，确保产品有变现能力',
      '差异化竞争，找到自己的细分市场',
      '关注政策风险，合规经营',
      '控制成本，保持健康的现金流'
    ],
    references: [
      { title: '陌生人社交还有机会吗', url: 'https://www.huxiu.com/article/345678', source: '虎嗅' }
    ],
    stats: { views: 15230, favorites: 1024, corrections: 5 },
    status: 'approved',
    createdAt: '2024-01-25T10:00:00Z',
    updatedAt: '2024-01-25T10:00:00Z',
    topics: ['burn-money', 'competition-out']
  },
  {
    id: '4',
    name: '健康猫',
    logo: '/logos/jiankangmao.png',
    industry: '医疗健康',
    region: '华南',
    foundedYear: 2015,
    closedYear: 2019,
    stage: 'Pre-IPO',
    fundingAmount: 35000,
    products: [
      {
        id: '1',
        name: '健康猫App',
        description: '运动健康服务平台，连接用户与健身教练',
        features: ['在线预约', '课程购买', '健康管理'],
        targetUsers: '健身爱好者和亚健康人群'
      }
    ],
    timeline: [
      { year: 2015, month: 3, title: '成立', description: '健康猫成立' },
      { year: 2016, month: 6, title: 'A轮融资', description: '获得1亿A轮融资' },
      { year: 2017, month: 9, title: 'B轮融资', description: '获得2.5亿B轮融资' },
      { year: 2018, month: 5, title: '涉嫌传销', description: '被曝光涉嫌传销模式' },
      { year: 2019, month: 1, title: '被调查', description: '创始人被立案调查' }
    ],
    team: [
      { id: '1', name: '杨骅', role: '创始人', avatar: '/avatars/yanghua.jpg', change: '被捕' }
    ],
    fundingRecords: [
      { round: 'A轮', amount: 10000, investors: '平安好医生', year: 2016 },
      { round: 'B轮', amount: 25000, investors: '腾讯投资', year: 2017 }
    ],
    failureReasons: [
      { category: '商业模式', description: '采用多级分销模式，涉嫌传销', severity: 5 },
      { category: '法律风险', description: '忽视法律合规，最终导致创始人被捕', severity: 5 },
      { category: '道德风险', description: '利用用户信任进行非法集资', severity: 5 }
    ],
    lessons: [
      '商业模式必须合法合规',
      '不要触碰法律红线',
      '诚信经营是企业发展的基石',
      '远离灰色地带'
    ],
    references: [
      { title: '健康猫涉嫌传销被查', url: 'https://news.sina.com.cn/c/2018-08-27', source: '新浪新闻' }
    ],
    stats: { views: 45670, favorites: 3420, corrections: 12 },
    status: 'approved',
    createdAt: '2024-02-01T10:00:00Z',
    updatedAt: '2024-02-01T10:00:00Z',
    topics: ['policy-risk']
  },
  {
    id: '5',
    name: '超级表格',
    logo: '/logos/chaobiao.png',
    industry: '企业服务',
    region: '华北',
    foundedYear: 2014,
    closedYear: 2017,
    stage: 'A轮',
    fundingAmount: 1500,
    products: [
      {
        id: '1',
        name: '超级表格SaaS',
        description: '在线表格和数据库工具',
        features: ['多人协作', '数据收集', '表单设计'],
        targetUsers: '中小企业和团队'
      }
    ],
    timeline: [
      { year: 2014, month: 1, title: '产品上线', description: '超级表格1.0上线' },
      { year: 2015, month: 6, title: '种子轮融资', description: '获得500万种子轮融资' },
      { year: 2016, month: 3, title: 'A轮融资', description: '获得1500万A轮融资' },
      { year: 2016, month: 12, title: '转型失败', description: '尝试转型企业版失败' },
      { year: 2017, month: 6, title: '关闭服务', description: '服务器关停' }
    ],
    team: [
      { id: '1', name: '陈明', role: '创始人', avatar: '/avatars/chenming.jpg', change: '离开' }
    ],
    fundingRecords: [
      { round: '种子轮', amount: 500, investors: '真格基金', year: 2015 },
      { round: 'A轮', amount: 1500, investors: '经纬中国', year: 2016 }
    ],
    failureReasons: [
      { category: '产品定位', description: '定位模糊，既想做大客户又想服务小客户', severity: 4 },
      { category: '竞争压力', description: '微软、Google等巨头进入市场', severity: 4 },
      { category: '融资能力', description: '后续融资困难，资金断裂', severity: 3 }
    ],
    lessons: [
      '产品定位要清晰明确',
      '大厂进入时要果断转型或寻找差异化',
      '保持与投资人的良好沟通',
      '做好过冬准备，储备足够资金'
    ],
    references: [
      { title: '超级表格的失败复盘', url: 'https://www.zhihu.com/question/26890123', source: '知乎' }
    ],
    stats: { views: 6780, favorites: 423, corrections: 1 },
    status: 'approved',
    createdAt: '2024-02-05T10:00:00Z',
    updatedAt: '2024-02-05T10:00:00Z',
    topics: ['pivot-fail', 'competition-out']
  },
  {
    id: '6',
    name: '大师之星',
    logo: '/logos/dashi.png',
    industry: '教育培训',
    region: '华东',
    foundedYear: 2016,
    closedYear: 2019,
    stage: 'B轮',
    fundingAmount: 12000,
    products: [
      {
        id: '1',
        name: '大师之星App',
        description: 'K12在线教育平台',
        features: ['直播课', '一对一辅导', 'AI批改'],
        targetUsers: 'K12学生群体'
      }
    ],
    timeline: [
      { year: 2016, month: 9, title: '产品上线', description: '大师之星App上线' },
      { year: 2017, month: 4, title: 'A轮融资', description: '获得5000万A轮融资' },
      { year: 2018, month: 1, title: 'B轮融资', description: '获得1.2亿B轮融资' },
      { year: 2018, month: 8, title: '扩张过速', description: '大规模扩张，人员激增' },
      { year: 2019, month: 3, title: '资金链断裂', description: '资金链出现问题' }
    ],
    team: [
      { id: '1', name: '刘强', role: '创始人', avatar: '/avatars/liuqiang.jpg', change: '离开' },
      { id: '2', name: '赵敏', role: 'COO', avatar: '/avatars/zhaomin.jpg', change: '离开' }
    ],
    fundingRecords: [
      { round: 'A轮', amount: 5000, investors: 'SIG海纳亚洲', year: 2017 },
      { round: 'B轮', amount: 12000, investors: 'GGV纪源资本', year: 2018 }
    ],
    failureReasons: [
      { category: '资金管理', description: '扩张速度远超营收增长，人员成本过高', severity: 5 },
      { category: '商业模式', description: '获客成本高，续费率低', severity: 4 },
      { category: '团队管理', description: '快速扩张导致管理失控', severity: 3 }
    ],
    lessons: [
      '教育行业要稳扎稳打，不能急于求成',
      '控制获客成本在合理范围内',
      '续费率是教育产品的生命线',
      '扩张要有节奏，与资金储备匹配'
    ],
    references: [
      { title: '在线教育洗牌期到来', url: 'https://www.36kr.com/p/5167856', source: '36氪' }
    ],
    stats: { views: 18920, favorites: 1456, corrections: 4 },
    status: 'approved',
    createdAt: '2024-02-10T10:00:00Z',
    updatedAt: '2024-02-10T10:00:00Z',
    topics: ['burn-money', 'team-conflict']
  },
  {
    id: '7',
    name: '人人爱',
    logo: '/logos/renrenai.png',
    industry: '社交网络',
    region: '华北',
    foundedYear: 2017,
    closedYear: 2019,
    stage: 'A轮',
    fundingAmount: 3000,
    products: [
      {
        id: '1',
        name: '人人爱App',
        description: '匿名社交应用',
        features: ['匿名聊天', '兴趣匹配', '树洞功能'],
        targetUsers: '年轻人群'
      }
    ],
    timeline: [
      { year: 2017, month: 3, title: '产品上线', description: '人人爱App上线' },
      { year: 2017, month: 8, title: 'A轮融资', description: '获得3000万A轮融资' },
      { year: 2018, month: 2, title: '用户增长', description: '用户突破100万' },
      { year: 2018, month: 9, title: '下架整改', description: '因内容问题被应用商店下架' },
      { year: 2019, month: 1, title: '停止运营', description: '无法恢复，停止运营' }
    ],
    team: [
      { id: '1', name: '周杰', role: '创始人', avatar: '/avatars/zhoujie.jpg', change: '离开' }
    ],
    fundingRecords: [
      { round: 'A轮', amount: 3000, investors: '险峰长青', year: 2017 }
    ],
    failureReasons: [
      { category: '政策风险', description: '内容监管不力，被迫下架整改', severity: 5 },
      { category: '产品问题', description: '匿名社交难以管控内容风险', severity: 4 },
      { category: '商业模式', description: '变现模式单一', severity: 3 }
    ],
    lessons: [
      '内容平台必须重视内容审核',
      '匿名社交要建立完善的内容管控机制',
      '政策风险是社交产品的重要因素',
      '提前布局商业化'
    ],
    references: [
      { title: '匿名社交的合规困境', url: 'https://www.pingwest.com/show/2018-08-29', source: '品玩' }
    ],
    stats: { views: 9870, favorites: 678, corrections: 2 },
    status: 'approved',
    createdAt: '2024-02-15T10:00:00Z',
    updatedAt: '2024-02-15T10:00:00Z',
    topics: ['policy-risk']
  },
  {
    id: '8',
    name: '订房宝',
    logo: '/logos/dingfang.png',
    industry: '旅游出行',
    region: '华北',
    foundedYear: 2013,
    closedYear: 2017,
    stage: 'B轮',
    fundingAmount: 6000,
    products: [
      {
        id: '1',
        name: '订房宝App',
        description: '酒店预订应用',
        features: ['酒店搜索', '价格对比', '会员优惠'],
        targetUsers: '出差和旅游人群'
      }
    ],
    timeline: [
      { year: 2013, month: 6, title: '成立', description: '订房宝成立' },
      { year: 2014, month: 9, title: 'A轮融资', description: '获得2000万A轮融资' },
      { year: 2015, month: 12, title: 'B轮融资', description: '获得6000万B轮融资' },
      { year: 2016, month: 6, title: '巨头竞争', description: '携程、美团等加大投入' },
      { year: 2017, month: 3, title: '停止运营', description: '市场份额被蚕食，停止运营' }
    ],
    team: [
      { id: '1', name: '吴浩', role: '创始人', avatar: '/avatars/wuhao.jpg', change: '离开' }
    ],
    fundingRecords: [
      { round: 'A轮', amount: 2000, investors: '携程', year: 2014 },
      { round: 'B轮', amount: 6000, investors: '红杉资本', year: 2015 }
    ],
    failureReasons: [
      { category: '市场竞争', description: '面对携程、美团等巨头竞争', severity: 5 },
      { category: '资源不足', description: '没有足够的资金与巨头持久战', severity: 4 },
      { category: '差异化不足', description: '产品同质化严重', severity: 3 }
    ],
    lessons: [
      '避开巨头的核心战场',
      '寻找差异化竞争点',
      '小而美的产品也可以活得很好',
      '不要太早把自己卖给巨头'
    ],
    references: [
      { title: '订房宝的失败启示', url: 'https://www.tourweb.cn/2017/04/', source: '旅游圈' }
    ],
    stats: { views: 7650, favorites: 456, corrections: 1 },
    status: 'approved',
    createdAt: '2024-02-20T10:00:00Z',
    updatedAt: '2024-02-20T10:00:00Z',
    topics: ['competition-out']
  },
  {
    id: '9',
    name: '云鸟配送',
    logo: '/logos/yunniao.png',
    industry: '物流运输',
    region: '华北',
    foundedYear: 2014,
    closedYear: 2020,
    stage: 'C轮',
    fundingAmount: 20000,
    products: [
      {
        id: '1',
        name: '云鸟配送平台',
        description: '同城配送服务',
        features: ['智能调度', '实时追踪', '保险服务'],
        targetUsers: 'B端商户'
      }
    ],
    timeline: [
      { year: 2014, month: 11, title: '成立', description: '云鸟配送成立' },
      { year: 2015, month: 9, title: 'A轮融资', description: '获得1亿A轮融资' },
      { year: 2016, month: 6, title: 'B轮融资', description: '获得数亿B轮融资' },
      { year: 2017, month: 3, title: 'C轮融资', description: '获得2亿C轮融资' },
      { year: 2019, month: 12, title: '资金问题', description: '资金链出现问题' },
      { year: 2020, month: 4, title: '解散', description: '公司解散' }
    ],
    team: [
      { id: '1', name: '韩迪', role: '创始人', avatar: '/avatars/handi.jpg', change: '离开' }
    ],
    fundingRecords: [
      { round: 'A轮', amount: 10000, investors: '经纬中国', year: 2015 },
      { round: 'B轮', amount: 10000, investors: '红杉资本', year: 2016 },
      { round: 'C轮', amount: 20000, investors: '华平投资', year: 2017 }
    ],
    failureReasons: [
      { category: '商业模式', description: '重资产运营模式，成本过高', severity: 5 },
      { category: '市场竞争', description: '顺丰、京东等巨头进入市场', severity: 4 },
      { category: '资金管理', description: '扩张过快，资金消耗大', severity: 4 }
    ],
    lessons: [
      '物流行业要谨慎扩张',
      '轻资产模式可能更适合创业公司',
      '巨头进入时要及时调整策略',
      '保持与巨头差异化的核心竞争力'
    ],
    references: [
      { title: '同城配送的生死局', url: 'https://www.logclub.com/2020/05/', source: '物流沙龙' }
    ],
    stats: { views: 11230, favorites: 876, corrections: 3 },
    status: 'approved',
    createdAt: '2024-02-25T10:00:00Z',
    updatedAt: '2024-02-25T10:00:00Z',
    topics: ['burn-money', 'competition-out']
  },
  {
    id: '10',
    name: '光圈直播',
    logo: '/logos/guangquan.png',
    industry: '文化娱乐',
    region: '华北',
    foundedYear: 2015,
    closedYear: 2018,
    stage: 'A轮',
    fundingAmount: 5000,
    products: [
      {
        id: '1',
        name: '光圈直播App',
        description: '美女直播平台',
        features: ['直播打赏', '粉丝互动', '签约主播'],
        targetUsers: '年轻男性用户'
      }
    ],
    timeline: [
      { year: 2015, month: 5, title: '上线', description: '光圈直播上线' },
      { year: 2016, month: 2, title: 'A轮融资', description: '获得5000万A轮融资' },
      { year: 2016, month: 9, title: '用户高峰', description: '月活用户突破100万' },
      { year: 2017, month: 5, title: '监管收紧', description: '直播监管政策收紧' },
      { year: 2018, month: 2, title: '倒闭', description: '资金断裂，倒闭' }
    ],
    team: [
      { id: '1', name: '张晓', role: '创始人', avatar: '/avatars/zhangxiao.jpg', change: '离开' }
    ],
    fundingRecords: [
      { round: 'A轮', amount: 5000, investors: '合一资本', year: 2016 }
    ],
    failureReasons: [
      { category: '政策风险', description: '监管政策收紧，部分业务受限', severity: 5 },
      { category: '商业模式', description: '过度依赖打赏模式，收入单一', severity: 4 },
      { category: '竞争压力', description: '映客、花椒等竞争对手崛起', severity: 3 }
    ],
    lessons: [
      '直播行业要提前布局合规',
      '不要过度依赖单一收入来源',
      '监管环境是直播行业的重要因素',
      '内容为王，优质内容才能留住用户'
    ],
    references: [
      { title: '直播行业的洗牌与重生', url: 'https://www.leiphone.com/2018-03', source: '雷锋网' }
    ],
    stats: { views: 14560, favorites: 987, corrections: 2 },
    status: 'approved',
    createdAt: '2024-03-01T10:00:00Z',
    updatedAt: '2024-03-01T10:00:00Z',
    topics: ['policy-risk', 'competition-out']
  },
  {
    id: '11',
    name: '小鸣单车',
    logo: '/logos/xiaoming.png',
    industry: '出行交通',
    region: '华南',
    foundedYear: 2016,
    closedYear: 2018,
    stage: 'B轮',
    fundingAmount: 10000,
    products: [
      {
        id: '1',
        name: '小鸣单车App',
        description: '共享单车服务平台',
        features: ['扫码解锁', 'GPS定位', '信用免押'],
        targetUsers: '城市居民'
      }
    ],
    timeline: [
      { year: 2016, month: 9, title: '成立', description: '小鸣单车成立' },
      { year: 2016, month: 12, title: 'A轮融资', description: '获得数千万A轮融资' },
      { year: 2017, month: 7, title: 'B轮融资', description: '获得1亿B轮融资' },
      { year: 2017, month: 11, title: '资金紧张', description: '资金链出现问题' },
      { year: 2018, month: 5, title: '破产清算', description: '申请破产清算' }
    ],
    team: [
      { id: '1', name: '陈宇莹', role: 'CEO', avatar: '/avatars/chenyuying.jpg', change: '离开' }
    ],
    fundingRecords: [
      { round: 'A轮', amount: 5000, investors: '凯路仕', year: 2016 },
      { round: 'B轮', amount: 10000, investors: '联创永宣', year: 2017 }
    ],
    failureReasons: [
      { category: '资金管理', description: '押金管理不当，资金被挪用', severity: 5 },
      { category: '市场竞争', description: 'ofo、摩拜双寡头格局', severity: 4 },
      { category: '运营能力', description: '运维效率低，成本控制差', severity: 3 }
    ],
    lessons: [
      '押金必须合规管理，不能挪用',
      '共享经济需要规模效应',
      '行业洗牌期要及时止损',
      '控制成本，保持健康运营'
    ],
    references: [
      { title: '小鸣单车破产警示录', url: 'https://www.yicai.com/news/2018/05/', source: '第一财经' }
    ],
    stats: { views: 19230, favorites: 1345, corrections: 5 },
    status: 'approved',
    createdAt: '2024-03-05T10:00:00Z',
    updatedAt: '2024-03-05T10:00:00Z',
    topics: ['burn-money', 'competition-out']
  },
  {
    id: '12',
    name: '美味不用等',
    logo: '/logos/meiwei.png',
    industry: '本地生活',
    region: '华东',
    foundedYear: 2013,
    closedYear: 2019,
    stage: 'C轮',
    fundingAmount: 30000,
    products: [
      {
        id: '1',
        name: '美味不用等App',
        description: '餐厅排队预订平台',
        features: ['排队取号', '预约订座', '点餐支付'],
        targetUsers: '餐饮消费者'
      }
    ],
    timeline: [
      { year: 2013, month: 10, title: '成立', description: '美味不用等成立' },
      { year: 2014, month: 8, title: 'A轮融资', description: '获得5000万A轮融资' },
      { year: 2015, month: 10, title: 'B轮融资', description: '获得1.5亿B轮融资' },
      { year: 2017, month: 4, title: 'C轮融资', description: '获得3亿C轮融资' },
      { year: 2018, month: 9, title: '被收购', description: '被竞争对手收购' }
    ],
    team: [
      { id: '1', name: '郑德熙', role: '创始人', avatar: '/avatars/zhengdexi.jpg', change: '套现离场' }
    ],
    fundingRecords: [
      { round: 'A轮', amount: 5000, investors: '经纬中国', year: 2014 },
      { round: 'B轮', amount: 15000, investors: '天图资本', year: 2015 },
      { round: 'C轮', amount: 30000, investors: '阿里巴巴', year: 2017 }
    ],
    failureReasons: [
      { category: '商业模式', description: '盈利模式不清晰，过度依赖融资', severity: 4 },
      { category: '竞争压力', description: '美团点评进入市场，竞争加剧', severity: 4 },
      { category: '战略选择', description: '最终被大厂收购，创始团队套现离场', severity: 3 }
    ],
    lessons: [
      '餐饮SaaS要找到清晰的盈利模式',
      '巨头进入时要考虑转型或合作',
      '被收购不一定是失败，也是一种退出',
      '保持独立运营能力很重要'
    ],
    references: [
      { title: '美味不用等的并购之路', url: 'https://www.10juhui.com/2018/09/', source: '餐饮老板内参' }
    ],
    stats: { views: 8760, favorites: 543, corrections: 1 },
    status: 'approved',
    createdAt: '2024-03-10T10:00:00Z',
    updatedAt: '2024-03-10T10:00:00Z',
    topics: ['competition-out', 'founder-exit']
  },
  {
    id: '13',
    name: '傲天动联',
    logo: '/logos/aotian.png',
    industry: '硬件设备',
    region: '华北',
    foundedYear: 2012,
    closedYear: 2016,
    stage: 'B轮',
    fundingAmount: 5000,
    products: [
      {
        id: '1',
        name: '智能路由器',
        description: '面向家庭的智能路由器',
        features: ['智能加速', '家长控制', '远程管理'],
        targetUsers: '家庭用户'
      }
    ],
    timeline: [
      { year: 2012, month: 3, title: '成立', description: '傲天动联成立' },
      { year: 2013, month: 6, title: 'A轮融资', description: '获得2000万A轮融资' },
      { year: 2014, month: 12, title: 'B轮融资', description: '获得5000万B轮融资' },
      { year: 2015, month: 6, title: '销量下滑', description: '产品销量未达预期' },
      { year: 2016, month: 2, title: '关闭', description: '停止运营' }
    ],
    team: [
      { id: '1', name: '白光勇', role: '创始人', avatar: '/avatars/bai.png', change: '离开' },
      { id: '2', name: '王志明', role: '联合创始人', avatar: '/avatars/wangzm.jpg', change: '离开' }
    ],
    fundingRecords: [
      { round: 'A轮', amount: 2000, investors: '君联资本', year: 2013 },
      { round: 'B轮', amount: 5000, investors: '启明创投', year: 2014 }
    ],
    failureReasons: [
      { category: '产品问题', description: '产品体验不佳，故障率高', severity: 4 },
      { category: '市场竞争', description: '小米、华为等大厂进入市场', severity: 5 },
      { category: '供应链', description: '供应链管理能力不足', severity: 3 }
    ],
    lessons: [
      '硬件创业需要强大的供应链能力',
      '大厂进入时要及时转型',
      '产品质量是硬件产品的生命线',
      '家庭用户对品牌敏感度高'
    ],
    references: [
      { title: '智能路由器的生死劫', url: 'https://www.52rd.com/2016/03/', source: '52RD' }
    ],
    stats: { views: 6540, favorites: 321, corrections: 1 },
    status: 'approved',
    createdAt: '2024-03-15T10:00:00Z',
    updatedAt: '2024-03-15T10:00:00Z',
    topics: ['competition-out', 'pivot-fail']
  },
  {
    id: '14',
    name: '回家吃饭',
    logo: '/logos/huijia.png',
    industry: '本地生活',
    region: '华北',
    foundedYear: 2014,
    closedYear: 2017,
    stage: 'B轮',
    fundingAmount: 8000,
    products: [
      {
        id: '1',
        name: '回家吃饭App',
        description: '家庭厨房共享平台',
        features: ['私厨预约', '上门吃饭', '厨艺分享'],
        targetUsers: '追求家庭味道的用户'
      }
    ],
    timeline: [
      { year: 2014, month: 6, title: '成立', description: '回家吃饭成立' },
      { year: 2015, month: 3, title: 'A轮融资', description: '获得3000万A轮融资' },
      { year: 2016, month: 1, title: 'B轮融资', description: '获得8000万B轮融资' },
      { year: 2016, month: 8, title: '监管问题', description: '家庭厨房监管政策不明' },
      { year: 2017, month: 5, title: '停止运营', description: '业务无法继续' }
    ],
    team: [
      { id: '1', name: '唐万里', role: '创始人', avatar: '/avatars/tangwanli.jpg', change: '离开' }
    ],
    fundingRecords: [
      { round: 'A轮', amount: 3000, investors: '今日头条', year: 2015 },
      { round: 'B轮', amount: 8000, investors: '金沙江创投', year: 2016 }
    ],
    failureReasons: [
      { category: '政策风险', description: '家庭厨房监管政策趋严', severity: 5 },
      { category: '商业模式', description: '标准化难度大，难以规模化', severity: 4 },
      { category: '食品安全', description: '食品安全风险难以控制', severity: 4 }
    ],
    lessons: [
      '餐饮行业必须重视食品安全',
      '政策风险是餐饮创新的重要因素',
      '共享经济在餐饮领域要谨慎',
      '标准化是可规模化的前提'
    ],
    references: [
      { title: '共享厨房的合规困境', url: 'https://www.cyz.com.cn/2017/05/', source: '创业家' }
    ],
    stats: { views: 11230, favorites: 876, corrections: 2 },
    status: 'approved',
    createdAt: '2024-03-20T10:00:00Z',
    updatedAt: '2024-03-20T10:00:00Z',
    topics: ['policy-risk', 'pivot-fail']
  },
  {
    id: '15',
    name: '药快好',
    logo: '/logos/yaokuai.png',
    industry: '医疗健康',
    region: '华北',
    foundedYear: 2014,
    closedYear: 2016,
    stage: 'A轮',
    fundingAmount: 4000,
    products: [
      {
        id: '1',
        name: '药快好App',
        description: '医药电商平台',
        features: ['在线购药', '药师咨询', '健康资讯'],
        targetUsers: '需要购药的用户'
      }
    ],
    timeline: [
      { year: 2014, month: 9, title: '成立', description: '药快好成立' },
      { year: 2015, month: 6, title: 'A轮融资', description: '获得4000万A轮融资' },
      { year: 2015, month: 12, title: '政策收紧', description: '医药电商政策收紧' },
      { year: 2016, month: 4, title: '停止运营', description: '无法获得牌照，停止运营' }
    ],
    team: [
      { id: '1', name: '王雪', role: '创始人', avatar: '/avatars/wangxue.jpg', change: '离开' }
    ],
    fundingRecords: [
      { round: 'A轮', amount: 4000, investors: '平安创投', year: 2015 }
    ],
    failureReasons: [
      { category: '政策风险', description: '无法获得医药电商相关牌照', severity: 5 },
      { category: '合规问题', description: '医药销售需要特殊资质', severity: 5 },
      { category: '商业模式', description: '盈利模式单一', severity: 3 }
    ],
    lessons: [
      '医药行业必须重视资质和牌照',
      '政策风险是医药创业的重要因素',
      '合规经营是底线',
      '不要在政策不明时大规模投入'
    ],
    references: [
      { title: '医药电商的牌照之困', url: 'https://www.yyjzt.com/2016/05/', source: '医药观察家' }
    ],
    stats: { views: 8760, favorites: 543, corrections: 2 },
    status: 'approved',
    createdAt: '2024-03-25T10:00:00Z',
    updatedAt: '2024-03-25T10:00:00Z',
    topics: ['policy-risk']
  },
  {
    id: '16',
    name: '叮直送',
    logo: '/logos/dingzhisong.png',
    industry: '本地生活',
    region: '华东',
    foundedYear: 2015,
    closedYear: 2018,
    stage: 'A轮',
    fundingAmount: 2500,
    products: [
      {
        id: '1',
        name: '叮直送App',
        description: '社区便利店配送平台',
        features: ['即时配送', '便利店接入', '优惠券'],
        targetUsers: '社区居民'
      }
    ],
    timeline: [
      { year: 2015, month: 3, title: '成立', description: '叮直送成立' },
      { year: 2016, month: 2, title: 'A轮融资', description: '获得2500万A轮融资' },
      { year: 2017, month: 1, title: '扩张', description: '覆盖10个城市' },
      { year: 2017, month: 9, title: '美团进入', description: '美团推出类似服务' },
      { year: 2018, month: 3, title: '关闭', description: '市场份额被蚕食' }
    ],
    team: [
      { id: '1', name: '李明阳', role: '创始人', avatar: '/avatars/limingyang.jpg', change: '离开' }
    ],
    fundingRecords: [
      { round: 'A轮', amount: 2500, investors: '源码资本', year: 2016 }
    ],
    failureReasons: [
      { category: '竞争压力', description: '美团、饿了么等巨头进入市场', severity: 5 },
      { category: '资金不足', description: '没有足够资金与巨头持久战', severity: 4 },
      { category: '规模问题', description: '扩张速度过快，管理失控', severity: 3 }
    ],
    lessons: [
      '避开巨头核心战场',
      '社区服务要建立本地化壁垒',
      '控制扩张速度',
      '寻找差异化竞争点'
    ],
    references: [
      { title: '社区配送的生存之战', url: 'https://www.winshang.com/2018/04/', source: '赢商网' }
    ],
    stats: { views: 7890, favorites: 456, corrections: 1 },
    status: 'approved',
    createdAt: '2024-04-01T10:00:00Z',
    updatedAt: '2024-04-01T10:00:00Z',
    topics: ['competition-out', 'burn-money']
  },
  {
    id: '17',
    name: '一起唱',
    logo: '/logos/yiqichang.png',
    industry: '文化娱乐',
    region: '华南',
    foundedYear: 2013,
    closedYear: 2017,
    stage: 'B轮',
    fundingAmount: 6000,
    products: [
      {
        id: '1',
        name: '一起唱App',
        description: 'KTV预订和社交平台',
        features: ['KTV预订', '在线点歌', '社交互动'],
        targetUsers: '喜欢唱歌的年轻人'
      }
    ],
    timeline: [
      { year: 2013, month: 8, title: '成立', description: '一起唱成立' },
      { year: 2014, month: 6, title: 'A轮融资', description: '获得2000万A轮融资' },
      { year: 2015, month: 9, title: 'B轮融资', description: '获得6000万B轮融资' },
      { year: 2016, month: 5, title: '团队动荡', description: '创始团队内斗' },
      { year: 2017, month: 1, title: '关闭', description: '资金耗尽' }
    ],
    team: [
      { id: '1', name: '沈思', role: '创始人', avatar: '/avatars/shensi.jpg', change: '离开' },
      { id: '2', name: '李强', role: '联合创始人', avatar: '/avatars/liqiang.jpg', change: '离开' }
    ],
    fundingRecords: [
      { round: 'A轮', amount: 2000, investors: '清流资本', year: 2014 },
      { round: 'B轮', amount: 6000, investors: '蓝驰创投', year: 2015 }
    ],
    failureReasons: [
      { category: '团队问题', description: '创始团队内斗，核心人员流失', severity: 5 },
      { category: '战略失误', description: '多元化扩张失败', severity: 4 },
      { category: '资金管理', description: '资金使用效率低', severity: 3 }
    ],
    lessons: [
      '创始团队要保持稳定',
      '股权结构要合理设计',
      '专注核心业务，不要盲目多元化',
      '团队矛盾要及时解决'
    ],
    references: [
      { title: '一起唱的内部战争', url: 'https://www.huxiu.com/article/178945', source: '虎嗅' }
    ],
    stats: { views: 14560, favorites: 987, corrections: 3 },
    status: 'approved',
    createdAt: '2024-04-05T10:00:00Z',
    updatedAt: '2024-04-05T10:00:00Z',
    topics: ['team-conflict', 'founder-exit']
  },
  {
    id: '18',
    name: '易淘食',
    logo: '/logos/yitaoshi.png',
    industry: '本地生活',
    region: '华北',
    foundedYear: 2012,
    closedYear: 2016,
    stage: 'B轮',
    fundingAmount: 8000,
    products: [
      {
        id: '1',
        name: '易淘食App',
        description: '餐饮全流程服务商',
        features: ['点餐系统', '配送服务', '会员管理'],
        targetUsers: '餐饮商家'
      }
    ],
    timeline: [
      { year: 2012, month: 5, title: '成立', description: '易淘食成立' },
      { year: 2013, month: 9, title: 'A轮融资', description: '获得3000万A轮融资' },
      { year: 2014, month: 11, title: 'B轮融资', description: '获得8000万B轮融资' },
      { year: 2015, month: 6, title: '转型困难', description: '从C端转向B端' },
      { year: 2016, month: 3, title: '关闭', description: '转型失败' }
    ],
    team: [
      { id: '1', name: '张洋', role: '创始人', avatar: '/avatars/zhangyang.jpg', change: '离开' }
    ],
    fundingRecords: [
      { round: 'A轮', amount: 3000, investors: '鼎晖创投', year: 2013 },
      { round: 'B轮', amount: 8000, investors: '清科创投', year: 2014 }
    ],
    failureReasons: [
      { category: '转型问题', description: 'C端转B端战略失误', severity: 4 },
      { category: '产品问题', description: 'B端产品体验差', severity: 4 },
      { category: '市场竞争', description: '美团等巨头挤压市场', severity: 3 }
    ],
    lessons: [
      '转型要谨慎，充分论证',
      'B端和C端需要不同的能力',
      '产品体验是SaaS的核心',
      '巨头挤压时要寻找细分市场'
    ],
    references: [
      { title: '餐饮SaaS的转型之痛', url: 'https://www.canyin.com/2016/04/', source: '餐饮老板内参' }
    ],
    stats: { views: 6540, favorites: 321, corrections: 1 },
    status: 'approved',
    createdAt: '2024-04-10T10:00:00Z',
    updatedAt: '2024-04-10T10:00:00Z',
    topics: ['pivot-fail', 'competition-out']
  },
  {
    id: '19',
    name: '大姨吗',
    logo: '/logos/dayima.png',
    industry: '医疗健康',
    region: '华北',
    foundedYear: 2012,
    closedYear: 2018,
    stage: 'C轮',
    fundingAmount: 15000,
    products: [
      {
        id: '1',
        name: '大姨吗App',
        description: '女性经期健康管理平台',
        features: ['经期记录', '健康分析', '社区交流'],
        targetUsers: '女性用户'
      }
    ],
    timeline: [
      { year: 2012, month: 3, title: '成立', description: '大姨吗成立' },
      { year: 2013, month: 6, title: 'A轮融资', description: '获得5000万A轮融资' },
      { year: 2014, month: 9, title: 'B轮融资', description: '获得1亿B轮融资' },
      { year: 2015, month: 5, title: 'C轮融资', description: '获得1.5亿C轮融资' },
      { year: 2016, month: 3, title: '变现困难', description: '商业化进展缓慢' },
      { year: 2018, month: 6, title: '团队动荡', description: '创始人出走' }
    ],
    team: [
      { id: '1', name: '柴可', role: '创始人', avatar: '/avatars/chaike.jpg', change: '离开' }
    ],
    fundingRecords: [
      { round: 'A轮', amount: 5000, investors: '真格基金', year: 2013 },
      { round: 'B轮', amount: 10000, investors: '红杉资本', year: 2014 },
      { round: 'C轮', amount: 15000, investors: 'BAI贝塔斯曼', year: 2015 }
    ],
    failureReasons: [
      { category: '商业模式', description: '女性健康领域变现困难', severity: 5 },
      { category: '市场局限', description: '用户群体单一，规模有限', severity: 4 },
      { category: '团队问题', description: '创始人出走，团队动荡', severity: 4 }
    ],
    lessons: [
      '垂直领域要尽早探索商业化',
      '女性经济要找到合适的变现路径',
      '创始人要保持稳定',
      '数据驱动的精准营销很重要'
    ],
    references: [
      { title: '大姨吗的商业化困境', url: 'https://www.pingwest.com/2018-07/', source: '品玩' }
    ],
    stats: { views: 23450, favorites: 1876, corrections: 4 },
    status: 'approved',
    createdAt: '2024-04-15T10:00:00Z',
    updatedAt: '2024-04-15T10:00:00Z',
    topics: ['burn-money', 'founder-exit']
  },
  {
    id: '20',
    name: '神奇百货（复刻版）',
    logo: '/logos/shenqiv2.png',
    industry: '电子商务',
    region: '华东',
    foundedYear: 2017,
    closedYear: 2019,
    stage: 'A轮',
    fundingAmount: 1800,
    products: [
      {
        id: '1',
        name: '神奇百货V2',
        description: '二手潮流电商平台',
        features: ['二手交易', '潮品鉴定', '社交分享'],
        targetUsers: 'Z世代消费者'
      }
    ],
    timeline: [
      { year: 2017, month: 6, title: '成立', description: '神奇百货V2成立' },
      { year: 2018, month: 2, title: 'A轮融资', description: '获得1800万A轮融资' },
      { year: 2018, month: 9, title: '竞争加剧', description: '毒、nice等平台崛起' },
      { year: 2019, month: 3, title: '停止运营', description: '市场份额被蚕食' }
    ],
    team: [
      { id: '1', name: '王凯', role: '创始人', avatar: '/avatars/wangkai.jpg', change: '再次离开' }
    ],
    fundingRecords: [
      { round: 'A轮', amount: 1800, investors: '创新工场', year: 2018 }
    ],
    failureReasons: [
      { category: '竞争压力', description: '面对毒、nice等强劲对手', severity: 5 },
      { category: '资源不足', description: '资金和流量都不如对手', severity: 4 },
      { category: '产品差异化', description: '差异化不足，用户粘性低', severity: 3 }
    ],
    lessons: [
      '同一创始人不能两次踏入同一条河流',
      '二手电商需要鉴定能力作为壁垒',
      '早期要建立差异化优势',
      '资本寒冬要更加谨慎'
    ],
    references: [
      { title: '二手电商的格局之变', url: 'https://www.36kr.com/p/5167898', source: '36氪' }
    ],
    stats: { views: 9230, favorites: 654, corrections: 2 },
    status: 'approved',
    createdAt: '2024-04-20T10:00:00Z',
    updatedAt: '2024-04-20T10:00:00Z',
    topics: ['competition-out', 'founder-exit']
  }
];

export const mockUsers = [
  {
    id: '1',
    email: 'admin@example.com',
    name: '管理员',
    role: 'admin' as const,
    avatar: '/avatars/admin.jpg',
    createdAt: '2024-01-01T00:00:00Z'
  },
  {
    id: '2',
    email: 'user@example.com',
    name: '普通用户',
    role: 'user' as const,
    avatar: '/avatars/user.jpg',
    createdAt: '2024-01-15T00:00:00Z'
  }
];
