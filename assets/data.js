/* ============================================================
 * 《三角洲行动》护甲数据库 — 数据层
 * 数据整理自公开社区实测（繁星攻略组全护甲/全头盔解析等）
 * 游戏版本持续更新，数值仅供参考，请以游戏内面板为准。
 * ============================================================ */

/* 品质体系：白 / 绿 / 蓝 / 紫 / 金 / 红 */
const TIERS = [
  { tier: 1, cn: '一级', cls: 't1', name: '白装', desc: '纯心理安慰', short: '过渡凑战备' },
  { tier: 2, cn: '二级', cls: 't2', name: '绿装', desc: '能挡，但不多', short: '开局临时用' },
  { tier: 3, cn: '三级', cn2: '蓝装', cls: 't3', name: '蓝装', desc: '平民入场券', short: '新手首选' },
  { tier: 4, cn: '四级', cls: 't4', name: '紫装', desc: '中流砥柱', short: '机密标配' },
  { tier: 5, cn: '五级', cls: 't5', name: '金装', desc: '交火护身符', short: '绝密起步' },
  { tier: 6, cn: '六级', cls: 't6', name: '红装', desc: '横行无阻', short: '钞能力' }
];

/* ---------------- 护甲（防弹衣） ---------------- */
/* dur 耐久 / wt 重量kg / ads 瞄准速度惩罚% / mv 移动速度惩罚% / wear 单次修满耐久上限损耗% */
const ARMORS = [
  /* ---- 一级 ---- */
  { name: '摩托马甲', tier: 1, type: '半甲', dur: 20, wt: 2.44, ads: 0, mv: 0, wear: 15,
    note: '谁会指望这种东西挡子弹啊？连新兵制式套都很少用。', tags: ['最轻', '不建议'] },
  { name: '尼龙防弹衣', tier: 1, type: '半甲', dur: 25, wt: 1.7, ads: 0, mv: 0, wear: 9,
    note: '三角洲部队早期软式防弹衣，仅具备较低的防弹能力。', tags: ['轻', '不建议'] },
  { name: '轻型防弹衣', tier: 1, type: '半甲', dur: 30, wt: 3.07, ads: 0, mv: 0, wear: 6,
    note: 'GTI 的训练装备，基本不具备实战价值。一级里耐久最高、损耗最低。', tags: ['一级最优', '训练用'] },
  { name: '安保防弹衣', tier: 1, type: '半甲', dur: 20, wt: 2.44, ads: 0, mv: 0, wear: 12,
    note: '很难想象，有什么防弹衣的防弹能力会比防刺服还差。', tags: ['不建议'] },

  /* ---- 二级 ---- */
  { name: '简易防刺服', tier: 2, type: '半甲', dur: 30, wt: 2.74, ads: 0, mv: 0, wear: 15,
    note: '不少市面上的防刺服确实有 NIJ I 级防弹能力，也正因此 NIJ I 后期被取消。', tags: ['不建议'] },
  { name: 'TG 战术防弹衣', tier: 2, type: '半甲', dur: 40, wt: 4.04, ads: 0, mv: 0, wear: 9,
    note: '三角洲装配的软式防弹衣，主打灵活与舒适性，牺牲了防弹能力。', tags: ['二级推荐'] },
  { name: '通用战术背心', tier: 2, type: '半甲', dur: 50, wt: 4.19, ads: 0, mv: 0, wear: 6,
    note: '现代快拆防弹衣，模型上像插板结构，但防弹等级很低。二级耐久最高。', tags: ['二级最耐'] },
  { name: 'HT 战术背心', tier: 2, type: '半甲', dur: 35, wt: 3.38, ads: 0, mv: 0, wear: 12,
    note: '哈夫克祖传插板防弹衣，很奇怪他们是怎么做出防护差异如此大的插板的。', tags: ['不建议'] },

  /* ---- 三级 ---- */
  { name: '制式防弹背心', alias: '阿萨拉蓝甲', tier: 3, type: '半甲', dur: 50, wt: 2.45, ads: -1, mv: 0, wear: 5,
    note: '名字都叫“制式”了，什么水平还不懂么。50 耐久还不保护下腹部，除了从 AI 身上抢装备的刀仔没人穿。',
    tags: ['最轻', '不护腹'] },
  { name: 'TG-H 防弹衣', alias: '三角洲蓝甲', tier: 3, type: '全甲', dur: 75, wt: 4.5, ads: -3, mv: -1, wear: 9,
    note: '唯二躯干全防护的蓝甲之一。胸腹双护、负面小、一个自制维修包能修满，新手性价比天花板。',
    tags: ['三级首选', '胸腹双护', '性价比'], best: true },
  { name: '射手战术背心', alias: 'GTI 蓝甲', tier: 3, type: '全甲', dur: 85, wt: 6.43, ads: -4, mv: -2, wear: 7,
    note: '躯干全防护的另一选择，全蓝甲中耐久最高，但负面效果最大、重量最重，与三角洲甲拉不开差距。',
    tags: ['胸腹双护', '全蓝甲最耐'] },
  { name: 'Hvk 快拆防弹衣', alias: '哈夫克蓝甲', tier: 3, type: '半甲', dur: 60, wt: 3.23, ads: -1, mv: -1, wear: 4,
    note: '哈夫克制式装备。维修损耗全蓝甲最低（4%），但从模型看才勉强算插板防弹衣，不护腹是硬伤。',
    tags: ['维修损耗低', '不护腹'] },

  /* ---- 四级 ---- */
  { name: '武士防弹背心', alias: '武士甲', tier: 4, type: '半甲', dur: 80, wt: 7.12, ads: -5, mv: -5, wear: 6,
    note: '维修效率高、损耗低，但同时占了紫甲最低耐久、最高负面两个缺点，防护面积还小。',
    tags: ['维修损耗低', '负面大'] },
  { name: 'DT-AVS 防弹衣', alias: 'DT 甲', tier: 4, type: '全甲', dur: 100, wt: 8.34, ads: -4, mv: -3, wear: 10,
    note: 'MK-2 的同位竞争款。略低耐久、略高损耗，换来略低负面与略低重量，两者无决定性差异。',
    tags: ['胸腹双护', '均衡'] },
  { name: 'MK-2 战术背心', alias: 'MK-2 甲', tier: 4, type: '全甲', dur: 110, wt: 9.84, ads: -5, mv: -5, wear: 9,
    note: '耐久最高的紫甲，无特殊需要时的紫甲首选。满耐久可扛 6 枪四级弹、2 枪金弹，修满一次只掉 9% 上限。',
    tags: ['四级首选', '胸腹双护', '最高耐久'], best: true },
  { name: '突击手防弹背心', alias: '突击甲', tier: 4, type: '全甲', dur: 90, wt: 5.64, ads: -2, mv: -1, wear: 18,
    note: '负面效果极低、重量轻，但维修损耗奇高（18%），基本不存在长期修理价值，当一次性护甲用。',
    tags: ['负面最低', '几乎不耐修'] },
  { name: 'HMP 特勤防弹衣', alias: '特勤甲', tier: 4, type: '半甲', dur: 80, wt: 3.88, ads: 0, mv: 0, wear: 10,
    note: '唯一没有负面效果的紫甲，重量也最轻，但不护下腹，且 80 耐久配 10% 损耗比较致命。',
    tags: ['无负面', '最轻紫甲', '不护腹'] },

  /* ---- 五级 ---- */
  { name: '精英防弹背心', alias: '牢赛甲', tier: 5, type: '全甲', dur: 95, wt: 4.85, ads: 0, mv: -1, wear: 12,
    note: '阿萨拉黑科技：五级防护却比紫甲都轻，负面还少。代价是总承伤在金甲中最低，适合机动流与摸金。',
    tags: ['机动之王', '最轻金甲'] },
  { name: 'FS 复合防弹衣', alias: 'FS 甲', tier: 5, type: '全甲', dur: 105, wt: 7.12, ads: -5, mv: -3, wear: 9,
    note: '负面较小、维修损耗最低（9%），重量与耐久都居中，没有致命短板的中庸之选。缺点是维修效率极低，基本绑定高级维修组合。',
    tags: ['五级均衡', '胸腹双护', '损耗最低'] },
  { name: '重型防弹背心', alias: 'GTI 金甲', tier: 5, type: '重甲', dur: 125, wt: 9.83, ads: -10, mv: -5, wear: 10,
    note: '最抗揍的金甲，没有之一。最高总耐久 + 最大防护范围，修三次仍有 75.5 上限，一个红修够用到报废。代价是 10% 瞄准速度惩罚。',
    tags: ['抗伤王', '重甲'], best: true },
  { name: 'Hvk-2 防弹衣', alias: '哈夫克金甲', tier: 5, type: '重甲', dur: 115, wt: 10.33, ads: -8, mv: -7, wear: 14,
    note: 'GTI 金甲的下位取代。重、机动性差、还不耐修，碎甲修两次只剩 78.6 上限，胜在比较省维修工具。',
    tags: ['重甲', '不耐修'] },

  /* ---- 六级 ---- */
  { name: '金刚防弹衣', alias: '金刚甲', tier: 6, type: '重甲', dur: 140, wt: 13.68, ads: -8, mv: -7, wear: 15,
    note: '除了比较抗揍，几乎找不出任何优点：损耗大、负面大、重量全游戏最重。需要红咖啡豆手搓且不能交易。',
    tags: ['最重', '一次性'] },
  { name: '特里克 MAS2.0 装甲', alias: '特里克甲', tier: 6, type: '重甲', dur: 125, wt: 9.39, ads: -6, mv: -5, wear: 6,
    note: '最耐修的红甲，没有之一。维修损耗仅 6%，修两次仍剩 107.3 上限，适配游走突击打法。代价是维修包消耗巨大。',
    tags: ['最耐修', '游走突击'], best: true },
  { name: '泰坦防弹装甲', alias: '泰坦甲', tier: 6, type: '重甲', dur: 150, wt: 12.04, ads: -12, mv: -8, wear: 9,
    note: '全游戏最高耐久（150），全红甲最高维修效率。碎甲二修、三修仍有 118.6 与 95.9 上限，守点抗伤最优；但 -12% 瞄速机动性极差。',
    tags: ['最高耐久', '守点抗伤'] },
  { name: 'HA-2 重型防弹衣', alias: '牢太甲', tier: 6, type: '重甲', dur: 115, wt: 6.86, ads: -1, mv: -3, wear: 11,
    note: '整体最轻便的红甲，重量不到 7kg、机动惩罚胜过部分紫甲，也是唯一能直接在交易行买到的红甲。短板是耐久最低、损耗偏高。',
    tags: ['手感最好', '唯一可购买'] }
];

/* ---------------- 头盔 ---------------- */
/* hear 拾音范围% / noise 降噪 / areas 防护区域 / anti 防同级狙爆头 */
const HELMETS = [
  /* ---- 一级 ---- */
  { name: '老式钢盔', tier: 1, dur: 10, wt: 1.01, ads: 0, mv: 0, wear: 15, hear: 0, noise: '无', areas: ['头部'], anti: null,
    note: '阿萨拉杂兵佩戴的钢盔，面对现代弹道学产物毫无防御力可言。', tags: ['不建议'] },
  { name: '奔尼帽', tier: 1, dur: 10, wt: 0.37, ads: 0, mv: 0, wear: 8, hear: 0, noise: '无', areas: ['头部'], anti: null,
    note: '遮阳效果不错，不规则帽檐能在阴影中隐藏自身轮廓——但它根本不能挡子弹。', tags: ['最轻', '不建议'] },
  { name: '户外棒球帽', tier: 1, dur: 12, wt: 0.41, ads: 0, mv: 0, wear: 6, hear: 10, noise: '低', areas: ['头部'], anti: null,
    note: '唯一的价值就是有个耳机。约 1 万哈夫币换 10% 拾音，无机动惩罚，跑刀与低成本配装的高性价比之选。',
    tags: ['跑刀神器', '拾音+10%'], best: true },
  { name: '安保头盔', tier: 1, dur: 10, wt: 0.55, ads: 0, mv: 0, wear: 12, hear: 0, noise: '无', areas: ['头部'], anti: null,
    note: '哈夫克新兵的头盔，质量与阿萨拉钢盔不相上下。', tags: ['不建议'] },

  /* ---- 二级 ---- */
  { name: '复古摩托头盔', tier: 2, dur: 18, wt: 1.63, ads: 0, mv: 0, wear: 15, hear: -5, noise: '中', areas: ['头部'], anti: null,
    note: '适合用来骑车，而不是上战场。还会削弱拾音范围。', tags: ['不推荐'] },
  { name: 'DRO 战术头盔', tier: 2, dur: 15, wt: 1.54, ads: 0, mv: 0, wear: 8, hear: 0, noise: '无', areas: ['头部'], anti: null,
    note: '三角洲特种部队 1993 年黑鹰坠落事件中佩戴的制式头盔。不要戴它，它挡不住子弹。', tags: ['彩蛋', '不推荐'] },
  { name: 'MC 防弹头盔', tier: 2, dur: 20, wt: 1.69, ads: 0, mv: 0, wear: 6, hear: 0, noise: '无', areas: ['头部'], anti: null,
    note: 'GTI 的制式防弹头盔，但性能不佳。二级里耐久最高、损耗最低。', tags: ['二级最优'] },
  { name: 'H01 战术头盔', tier: 2, dur: 12, wt: 0.75, ads: 0, mv: 0, wear: 12, hear: 0, noise: '无', areas: ['头部'], anti: null,
    note: '哈夫克新兵的轻型头盔，防御力不佳，但至少重量轻。', tags: ['轻', '不推荐'] },

  /* ---- 三级 ---- */
  { name: '防暴头盔', alias: '阿萨拉蓝头', tier: 3, dur: 28, wt: 1.88, ads: -3, mv: -1, wear: 6, hear: -5, noise: '中',
    areas: ['头部', '耳部'], anti: false,
    note: '耐修但不耐打，还影响听力范围。跑刀捡到可以考虑，别花钱买。', tags: ['耐修', '掉听力'] },
  { name: 'DAS 防弹头盔', alias: '三角洲蓝头', tier: 3, dur: 40, wt: 1.38, ads: 0, mv: 0, wear: 9, hear: 0, noise: '无',
    areas: ['头部'], anti: true,
    note: '唯一能防 3 级弹狙击的蓝头，而且完全修理后能再防一次。无任何负面属性，适合正面硬刚。', tags: ['三级最硬', '可防狙'], best: true },
  { name: 'MC201 头盔', alias: '3 级听力头', tier: 3, dur: 34, wt: 1.32, ads: -1, mv: -1, wear: 13, hear: 20, noise: '中',
    areas: ['头部', '耳部'], anti: true,
    note: '唯一有听力加成的 3 级头，+20% 拾音、约 2 万哈夫币，中低强度机密局的性价比天花板。缺点是耐久偏低、维修损耗 13% 偏高。',
    tags: ['平民核心', '拾音+20%'] },
  { name: 'H07 战术头盔', alias: '哈夫克蓝头', tier: 3, dur: 20, wt: 0.9, ads: 0, mv: 0, wear: 10, hear: 0, noise: '无',
    areas: ['头部'], anti: false,
    note: '没有任何用处，它的存在只是为了保证哈夫克有头盔，以及给跑刀仔又一个选择。', tags: ['不推荐'] },

  /* ---- 四级 ---- */
  { name: 'D6 战术头盔', alias: '自闭头', tier: 4, dur: 55, wt: 3.59, ads: -6, mv: -4, wear: 8, hear: -10, noise: '高',
    areas: ['头部', '耳部', '面部'], anti: true,
    note: '紫头中的耐修王与耐打王，极端抗揍且多次维修后防护依旧优秀。代价是视野受限，更致命的是听力受阻、还会放大自身受击与喘息声。',
    tags: ['最抗揍紫头', '听觉封锁'] },
  { name: 'DICH 训练头盔', alias: '听力头', tier: 4, dur: 35, wt: 1.13, ads: 0, mv: -2, wear: 15, hear: 50, noise: '高',
    areas: ['头部', '耳部'], anti: false,
    note: '全游戏最大听力范围增益（+50%），且不遮挡视野。配合听力针能实现“塔内听塔外”。除听力外一无是处，不适合贴脸作战。',
    tags: ['拾音+50%', '信息流神器'] },
  { name: 'GT1 战术头盔', alias: 'GTI 紫头', tier: 4, dur: 48, wt: 4.05, ads: -4, mv: -4, wear: 10, hear: 20, noise: '中',
    areas: ['头部', '耳部', '上脸'], anti: true,
    note: '全能型选手：48 高耐久 + 20% 拾音 + 面罩防眩晕，无明显短板。代价是重，-4% 瞄速 -4% 移速。猛攻流首选。',
    tags: ['猛攻首选', '带面罩'], best: true },
  { name: 'MHS 战术头盔', alias: '哈夫克紫头', tier: 4, dur: 30, wt: 2.24, ads: -3, mv: -1, wear: 12, hear: 30, noise: '中',
    areas: ['头部', '耳部', '上脸'], anti: false,
    note: '+30% 拾音看着不错，但耐久仅 30 且不能防同级狙。几乎每个紫头都有价值——这个是例外。',
    tags: ['不推荐'] },

  /* ---- 五级 ---- */
  { name: 'Mask-1 铁壁头盔', alias: 'Killa 头 / 雷斯头', tier: 5, dur: 75, wt: 3.89, ads: -6, mv: -5, wear: 7, hear: -15, noise: '高',
    areas: ['头部', '耳部', '面部'], anti: true,
    note: '集耐打、耐修于一身，75 耐久能扛大多数武器两枪头而不破甲。但放大自身声音、视野更小，适合让队友穿着去冲房间。',
    tags: ['最高耐久头', '听觉封锁'] },
  { name: 'DICH-1 战术头盔', alias: '5 级听力头', tier: 5, dur: 40, wt: 1.71, ads: -1, mv: -1, wear: 16, hear: 40, noise: '高',
    areas: ['头部', '耳部', '上脸'], anti: false,
    note: 'DICH 训练头的削弱版，唯一增强的是防弹等级。+40% 拾音、负面极小，但不耐修也修不起，最好的选择是别让它中枪。',
    tags: ['拾音+40%', '不耐修'] },
  { name: 'GN 重型头盔', alias: 'GN 头', tier: 5, dur: 50, wt: 3.63, ads: -4, mv: -3, wear: 7, hear: 10, noise: '中',
    areas: ['头部', '耳部', '面部'], anti: true,
    note: '最主流的金头：没有特点、没有短板，各方面中庸。维修损耗低很耐修，价格不离谱，配重甲就是标准的绝密猛攻模板。',
    tags: ['主流金头', '耐修'], best: true },
  { name: 'H09 防暴头盔', alias: '防暴盔', tier: 5, dur: 45, wt: 2.3, ads: -4, mv: -3, wear: 16, hear: 20, noise: '中',
    areas: ['头部', '耳部', '面部'], anti: true,
    note: '一次性的防具：好修但不耐修（16% 损耗），因此不建议修。有面罩但基本没有视野影响。',
    tags: ['一次性'] },

  /* ---- 六级 ---- */
  { name: 'DICH-9 重型头盔', alias: '斯巴达盔', tier: 6, dur: 50, wt: 2.06, ads: -3, mv: -1, wear: 10, hear: 40, noise: '中',
    areas: ['头部', '耳部', '下脸'], anti: true,
    note: '唯一听力加成最大、还能防狙的头盔，且负面效果最低（-3% 瞄速 / -1% 移速）。缺点是修过之后不能再防同级狙，且主要靠特勤处制造、不是想买就买得到。',
    tags: ['六级最优', '拾音+40%', '稀有'], best: true },
  { name: 'GT5 指挥官头盔', alias: '指挥官头', tier: 6, dur: 60, wt: 3.63, ads: -8, mv: -3, wear: 7, hear: 20, noise: '中',
    areas: ['头部', '耳部', '上脸'], anti: true,
    note: '全游戏最肉的头（60 耐久），最耐修的红头，还能多次防狙击爆头。但笨重到离谱：-8% 开镜速度，维修极贵。适合打狙、不爱第一时间开镜的玩法。',
    tags: ['最高耐久头', '最耐修'] },
  { name: 'H70 精英头盔', alias: '牢太头 / 少爷头', tier: 6, dur: 55, wt: 3.58, ads: -4, mv: -3, wear: 16, hear: 10, noise: '中',
    areas: ['头部', '耳部', '面部'], anti: true,
    note: '唯一能在交易行买到的红头，55 耐久 + 全脸防护。但维修损耗高达 16%，修一次接近报废，售价昂贵，性价比不高。',
    tags: ['唯一可购买', '不耐修'] }
];

/* ---------------- 夜视头盔（附录） ---------------- */
const NVG_HELMETS = [
  { name: 'GN 久战重型夜视头盔', tier: 5, dur: 20, wt: 3.6, ads: 0, mv: -3, wear: 7, hear: 10, noise: '中',
    areas: ['头部', '耳部', '面部'], anti: false,
    note: '耐久极低，基本没有防御能力。价值主要体现在夜视仪，头盔只是载体。', tags: ['夜战'] },
  { name: 'GN 重型夜视头盔', tier: 5, dur: 50, wt: 3.8, ads: -4, mv: -3, wear: 7, hear: 10, noise: '中',
    areas: ['头部', '耳部', '面部'], anti: true,
    note: 'GN 头 + 夜视仪，除了重量以外没有任何差异。', tags: ['夜战'] },
  { name: 'H70 夜视精英头盔', tier: 6, dur: 55, wt: 3.8, ads: -4, mv: -3, wear: 16, hear: 10, noise: '中',
    areas: ['头部', '耳部', '面部'], anti: true,
    note: '唯一的 6 级夜视头，属性同原版牢太头，除了重量略重。', tags: ['夜战', '六级'] }
];

/* ---------------- 弹药穿透机制表 ---------------- */
/* 子弹等级 - 护甲等级 = 差值 → 肉体伤害保留比例 / 甲伤倍率 */
const PEN_TABLE = [
  { diff: 2, label: '高 2 级及以上', flesh: 100, armor: 100, text: '完全无视护甲减免，肉伤与甲伤全额生效。', cls: 'good' },
  { diff: 1, label: '高 1 级', flesh: 75, armor: 100, text: '部分穿透：肉伤保留 75%，甲伤全额。', cls: 'good' },
  { diff: 0, label: '同级', flesh: 50, armor: 100, text: '半穿透：肉伤减免 50%，甲伤全额。金弹另有约 110% 甲伤加成。', cls: 'mid' },
  { diff: -1, label: '低 1 级', flesh: 0, armor: 100, text: '无法穿透，肉伤为 0，只能消耗护甲耐久。', cls: 'bad' },
  { diff: -2, label: '低 2 级', flesh: 0, armor: 60, text: '无法穿透，且甲伤额外衰减至约 60%。', cls: 'bad' },
  { diff: -3, label: '低 3 级', flesh: 0, armor: 40, text: '无法穿透，甲伤进一步衰减（约 40%，实测近似值）。', cls: 'bad' },
  { diff: -4, label: '低 4 级及以下', flesh: 0, armor: 25, text: '几乎打不动，甲伤衰减到极低（约 25%，实测近似值）。', cls: 'bad' }
];

/* 各等级护甲「同级防狙爆头」的最低耐久门槛 */
const SNIPE_THRESHOLD = {
  3: 36, 4: 40, 5: 44, 6: 48,
  note: '头盔面对狙击步枪时几乎必定碎甲，因此同级甲弹对抗中，耐久越高的头盔最终所受伤害越低。'
};

/* ---------------- 场景推荐 ---------------- */
const RECOMMEND = [
  { scene: '新手入门 / 跑刀', mode: '普通行动', armor: 'TG-H 防弹衣', helmet: '户外棒球帽 / MC201',
    why: '价格亲民、胸腹双护、负面效果小。头盔优先要信息，10% 拾音能提前发现敌人动向。' },
  { scene: '日常对局', mode: '机密行动', armor: 'MK-2 战术背心', helmet: 'GT1 战术头盔 / DICH 训练',
    why: '紫甲综合表现最均衡，110 耐久 + 9% 损耗可反复维修；头盔看你要信息（DICH +50%）还是要抗揍（GT1 带面罩防眩晕）。' },
  { scene: '高强度对抗', mode: '绝密行动', armor: 'FS 复合防弹衣', helmet: 'GN 重型头盔',
    why: '金甲里最没有短板的一套。GN 头 50 耐久 + 低维修损耗，扎个听力针就能补回拾音亏空。' },
  { scene: '团队突破 / 守点', mode: '绝密行动', armor: '泰坦防弹装甲 / 特里克 MAS2.0', helmet: 'DICH-9 重型头盔',
    why: '守点用泰坦正面抗伤为队友创造空间，游走突击用特里克甲低损耗拉扯。DICH-9 既是听力头又能防狙，六级里负面最低。' }
];

/* ---------------- 弹药速查 ----------------
 * 口径与型号的「穿透等级」经多来源交叉验证后收录（17173 官方口径专栏、
 * 32r / 三国游戏弹药攻略、360 官方 S9 赛季公告等）。
 * 基础肉伤与甲伤绑定枪械、子弹只提供系数；各口径精确系数公开资料
 * 仅有「低 / 中 / 高」级定性描述，故此处同样保留定性、不做编造。
 * 未收录完整梯子的口径在 note 中明确标注。 */
const AMMO = [
  {
    cal: '5.56×45mm', glyph: 'ammo-rifle', full: true,
    weapons: ['K416', 'M4A1', 'CAR-15', 'M16A4', 'SG552', 'AUG', 'Mini-14', 'M249'],
    note: '突击步枪 / 轻机枪 / 精确射手步枪的主流口径，1-5 级梯子完整，是弹药体系最规整的一档。同口径武器优势射程分 27 / 40 / 55 / 90 米几档。',
    rounds: [
      { name: 'RRLP', pen: 1, kind: '普通弹', flesh: '100%', admg: '低', src: '战术部门 / 交易行', note: '入门弹，只适合清 AI 与打无甲目标。' },
      { name: 'FMJ', pen: 2, kind: '普通弹', flesh: '100%', admg: '中低', src: '战术部门 / 交易行', note: '常规过渡弹，跑刀局够用。' },
      { name: 'M855', pen: 3, kind: '穿甲弹', flesh: '100%', admg: '中等', src: '交易行 / 12 级战术兑换', note: '通用主流弹，机密局的常备弹药。' },
      { name: 'M855A1', pen: 4, kind: '穿甲弹', flesh: '100%', admg: '高', src: '交易行 / 3 级工作台', note: '高级穿甲，对抗紫甲的主力弹。' },
      { name: 'M995', pen: 5, kind: '穿甲弹', flesh: '100%', admg: '110%', src: '交易行 / 3 级工作台', note: '顶级穿甲，对 1-6 级甲均造成 110% 甲伤。' }
    ]
  },
  {
    cal: '5.45×39mm', glyph: 'ammo-rifle', full: true,
    weapons: ['AK-12', 'AKS-74U'],
    note: '苏系小口径，梯子同样完整。BT / BS 的尖头弹变体（BT ST、BS ST+）会额外附带爆头倍率提升与命中晃屏。',
    rounds: [
      { name: 'PRS', pen: 1, kind: '普通弹', flesh: '100%', admg: '低', src: '战术部门 / 交易行', note: '入门低侵彻弹。' },
      { name: 'T', pen: 2, kind: '曳光弹', flesh: '100%', admg: '中低', src: '战术部门 / 交易行', note: '曳光过渡弹。' },
      { name: 'PS', pen: 3, kind: '穿甲弹', flesh: '100%', admg: '中等', src: '交易行 / 10 级战术兑换', note: '通用钢芯弹。' },
      { name: 'BT', pen: 4, kind: '穿甲弹', flesh: '100%', admg: '高', src: '交易行 / 工作台制作', note: '早期高级弹，尖头变体爆头倍率 2.2、命中后视角晃动。' },
      { name: 'BS', pen: 5, kind: '穿甲弹', flesh: '100%', admg: '110%', src: '交易行 / 3 级工作台', note: '顶级穿甲。' }
    ]
  },
  {
    cal: '7.62×39mm', glyph: 'ammo-rifle', full: true,
    weapons: ['AKM', 'PTR-32', 'SKS'],
    note: '枪械基础伤害更高、后坐力更大。AP 对 6 级甲也能打出 110% 甲伤，是 AK 系突破重甲的本钱。',
    rounds: [
      { name: 'LP', pen: 1, kind: '普通弹', flesh: '100%', admg: '低', src: '战术部门 / 交易行', note: '基础弹。' },
      { name: 'T45M', pen: 2, kind: '曳光弹', flesh: '100%', admg: '中低', src: '战术部门 / 交易行', note: '曳光过渡弹。' },
      { name: 'PS', pen: 3, kind: '穿甲弹', flesh: '100%', admg: '中等', src: '交易行', note: '钢芯弹，性价比之选。' },
      { name: 'BP', pen: 4, kind: '穿甲弹', flesh: '100%', admg: '高', src: '交易行 / 工作台制作', note: '高穿甲弹。' },
      { name: 'AP', pen: 5, kind: '穿甲弹', flesh: '100%', admg: '110%', src: '交易行 / 工作台制作', note: '顶级穿甲，对 6 级甲伤 110%。' }
    ]
  },
  {
    cal: '9×39mm', glyph: 'ammo-long', full: true,
    weapons: ['VSS', 'AS Val', 'SR-3M'],
    note: '微声亚音速特种弹，全口径微声隐匿。该口径型号从 3 级起步，公开资料未收录 1-2 级型号。',
    rounds: [
      { name: 'SP5', pen: 3, kind: '穿甲弹', flesh: '100%', admg: '中等', src: '交易行 / 12 级战术兑换', note: '微声隐匿，常规甲伤衰减。' },
      { name: 'SP6', pen: 4, kind: '穿甲弹', flesh: '100%', admg: '高', src: '交易行 / 生产', note: '中级穿甲。' },
      { name: 'BP', pen: 5, kind: '穿甲弹', flesh: '100%', admg: '110%', src: '交易行 / 生产', note: '顶级穿甲，对 1-6 级甲均 110% 甲伤。' }
    ]
  },
  {
    cal: '9×19mm', glyph: 'ammo-pistol', full: false,
    weapons: ['MP5', '勇士', 'UZI', '93R', 'G17', 'G18', 'QSZ92G'],
    note: '冲锋枪 / 手枪口径，以肉伤弹（修脚弹）见长。完整梯子未核实，仅收录可确认型号。',
    rounds: [
      { name: 'RIP', pen: 0, kind: '肉伤弹', flesh: '高（约 140%+）', admg: '极低', src: '交易行', note: '修脚流核心：甲伤极低、肉伤加成高，专打四肢 / 面部 / 颈部等无防护部位。' },
      { name: 'CT', pen: 0, kind: '肉伤弹', flesh: '175%', admg: '极低', src: '交易行（S10 新增）', note: '高肉伤 0 级弹，贴脸对枪爆发，价格偏高。' },
      { name: '穿甲弹', pen: 3, kind: '穿甲弹', flesh: '100%', admg: '中等', src: '交易行', note: '官方机制示例中的 3 级穿甲弹，可部分穿透同级甲。' }
    ]
  },
  {
    cal: '.45 ACP', glyph: 'ammo-pistol', full: false,
    weapons: ['SMG-45', 'Vector', 'M1911'],
    note: '口径更粗、单发更重，同样以肉伤弹为代表。穿甲梯子未核实。',
    rounds: [
      { name: 'RIP', pen: 0, kind: '肉伤弹', flesh: '高（约 140%+）', admg: '极低', src: '交易行', note: '低穿甲高肉伤，配合腰射打四肢收益极高。' },
      { name: 'CT', pen: 0, kind: '肉伤弹', flesh: '高', admg: '极低', src: '交易行（S10 新增）', note: '极致肉伤，减少 BTK，适合近战爆发。' }
    ]
  },
  {
    cal: '.338 Lap Magnum', glyph: 'ammo-long', full: false,
    weapons: ['AWM'],
    note: '全游戏唯一的 7 级穿透弹药，无视绝大多数护甲减免。',
    rounds: [
      { name: 'AWM 专用弹', pen: 7, kind: '穿甲弹', flesh: '—', admg: '—', src: '对局内获取', note: '7 级穿透仅 AWM 等极少数狙击枪配备，对任何护甲都是碾压级穿透。' }
    ]
  },
  {
    cal: '.50 BMG', glyph: 'ammo-long', full: false,
    weapons: ['M82（S9 新增）'],
    note: 'S9「回声」赛季随 M82 狙击枪加入的重口径弹药，特种弹均无法放入安全箱。',
    rounds: [
      { name: 'M10 "RAZOR"', pen: 6, kind: '创伤弹', flesh: '70%', admg: '—', src: '对局内获取', note: '命中后 4 秒内敌方打药时间大幅延长。' },
      { name: 'M3 "K-0"', pen: 6, kind: '失能弹', flesh: '70%', admg: '—', src: '对局内获取', note: '命中后短暂减速 + 视角剧烈晃动。' },
      { name: 'M903 SLAP', pen: 7, kind: '穿甲弹', flesh: '100%', admg: '—', src: '对局内获取', note: '7 级穿透穿甲弹。' }
    ]
  },
  {
    cal: '.50 AE', glyph: 'ammo-pistol', full: false,
    weapons: ['沙漠之鹰'],
    note: '手枪里罕见的 5 级穿透弹。',
    rounds: [
      { name: 'AP', pen: 5, kind: '穿甲弹', flesh: '—', admg: '—', src: 'S9 限时回归', note: '沙漠之鹰专属穿甲弹，5 级穿透。' }
    ]
  },
  {
    cal: '12.7×55mm', glyph: 'ammo-long', full: false,
    weapons: ['ASh-12'],
    note: '大口径突击弹，单发伤害极高（来源单一，等级供参考）。',
    rounds: [
      { name: 'ASh-12 专用弹', pen: 4, kind: '穿甲弹', flesh: '—', admg: '—', src: '交易行', note: '4 级穿透，价格高昂、备弹稀少。' }
    ]
  }
];

/* 尚未收录完整梯子的口径 → 适用武器映射（来自公开武器选择器资料） */
const AMMO_TODO = [
  { cal: '5.8×42mm', weapons: ['191 式', 'QBZ95-1'], hint: 'S10 新增 DVC12 +P、DBP10 +P（4 级）等型号' },
  { cal: '6.8×51mm', weapons: ['M7', 'M250'], hint: 'S10 新增 PLY 轻量化系列、Hybrid（5 级）' },
  { cal: '5.7×28mm', weapons: ['P90', 'AR57（S9）'], hint: 'AR57 随 S9 登场' },
  { cal: '4.6×30mm', weapons: ['MP7'], hint: '型号待补' },
  { cal: '12 Gauge', weapons: ['M1014', 'M870', 'S12K'], hint: '独头弹穿透等级 +1（近距破甲特化）' },
  { cal: '7.62×51mm', weapons: ['G3', 'SCAR-H', 'M14', 'M700', 'SR-25', 'R93'], hint: '型号待补' },
  { cal: '7.62×54R', weapons: ['PKM', 'SVD', 'SV-98'], hint: '型号待补' },
  { cal: '.357 Magnum', weapons: ['左轮'], hint: '型号待补' }
];

/* 选弹测甲的换算基准：官方机制示例使用的基础肉伤 / 甲伤数值 */
const AMMO_BASELINE = { flesh: 40, armor: 40, note: '官方机制示例采用的基准：基础肉伤 40、基础甲伤 40。实际数值随枪械浮动，可去机制解析页用计算器换算具体枪械。' };

/* ---------------- 对枪沙盘 ----------------
 * 干员满血 100（单一血池，无部位血量判定）。
 * 部位伤害倍率为常规武器通用值，700g 与繁星攻略组互证：
 * 头 1.9 / 胸 1.0 / 腹 0.9 / 四肢 0.4（个别枪械存在差异，如 Ash 头 1.6 / 四肢 0.45）。
 * 实际伤害 = 基础肉伤 × 弹药系数 × 部位倍率；甲伤不乘部位倍率，但受射程衰减影响（本模型不模拟射程）。 */
const PART_MULT = [
  { id: 'chest',   name: '胸部', mult: 1.0, armored: 'armor',  note: '标准倍率，护甲核心覆盖区' },
  { id: 'abdomen', name: '腹部', mult: 0.9, armored: 'armor',  note: '略低于胸部，多数护甲同样覆盖' },
  { id: 'head',    name: '头部', mult: 1.9, armored: 'helmet', note: '爆头收益最高，头盔的等级与剩余耐久决定减伤' },
  { id: 'limb',    name: '四肢', mult: 0.4, armored: null,     note: '全游戏护甲盲区，肉伤弹的主战场' }
];

const SIM = {
  hp: 100, baseFlesh: 40, baseArmor: 40, rpm: 600,
  note: '本沙盘按「弹着点固定在同一部位」的理想情形结算：先按穿透规则扣护甲耐久，护甲破碎后每一枪都按无防护全额结算；不模拟射程衰减、跳弹与命中部位漂移。'
};

