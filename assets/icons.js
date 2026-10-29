/* ============================================================
 * 《三角洲行动》护甲数据库 — 图标库
 * 全部为内联 SVG 线稿：零外部资源、离线可用，
 * 描边与填充统一走 currentColor，配合各品质的 --c 变量自适应配色。
 * ============================================================ */

/* ---------------- 图标原型（viewBox 0 0 48 48） ---------------- */
const ICON_GLYPHS = {

  /* ============ 护甲 ============ */

  /* 软式防弹衣：V 领躯干片 + 绗缝纹，无插板 */
  'soft': `
    <path d="M15 18C15 13.8 18 11 21.2 12.1L24 13l2.8-.9C30 11 33 13.8 33 18v14c0 3.8-4 5.6-9 5.6s-9-1.8-9-5.6z"/>
    <path d="M18.7 23.6h10.6M18.7 28.6h10.6" fill="none" opacity=".6"/>`,

  /* 基础背心：细肩带 + 窄身片 */
  'vest-basic': `
    <path d="M16 16h16v18a3 3 0 0 1-3 3H19a3 3 0 0 1-3-3z"/>
    <path d="M19.6 16l-2.1-5.2M28.4 16l2.1-5.2" fill="none"/>
    <path d="M16 22.4h16" fill="none" opacity=".55"/>`,

  /* 轻量插板：单块小插板 */
  'plate-light': `
    <path d="M14 16h20v18a3 3 0 0 1-3 3H17a3 3 0 0 1-3-3z"/>
    <rect x="18.6" y="20.6" width="10.8" height="10.8" rx="1.6" fill="none"/>
    <path d="M18.2 16l1.5-4.2h8.6L29.8 16" fill="none"/>`,

  /* 标准插板背心：前后插板 + 侧带 */
  'plate-standard': `
    <path d="M13.5 15h21v19a3 3 0 0 1-3 3h-15a3 3 0 0 1-3-3z"/>
    <rect x="17.9" y="19.6" width="12.2" height="11.8" rx="1.6" fill="none"/>
    <path d="M17.6 15l1.6-4.2h9.6L30.4 15" fill="none"/>
    <path d="M13.5 21.2h-2.6M13.5 29h-2.6M34.5 21.2h2.6M34.5 29h2.6" fill="none" opacity=".7"/>`,

  /* 胸挂半甲：护胸不护腹（虚线表示下腹盲区） */
  'half-plate': `
    <path d="M15 15h18v13a3 3 0 0 1-3 3H18a3 3 0 0 1-3-3z"/>
    <path d="M18.7 15l1.5-4.2h7.6L29.3 15" fill="none"/>
    <path d="M19.6 19.8h8.8M19.6 23.8h8.8" fill="none" opacity=".55"/>
    <path d="M12.5 38.6h23" fill="none" stroke-dasharray="3 3" opacity=".85"/>`,

  /* 全甲连体：胸腹连贯，中缝 + 腰带 */
  'plate-full': `
    <path d="M14 14h20v23a3.5 3.5 0 0 1-3.5 3.5h-13A3.5 3.5 0 0 1 14 37z"/>
    <path d="M18.1 14l1.6-4.2h8.6L29.9 14" fill="none"/>
    <path d="M24 19.2v20.6" fill="none" opacity=".7"/>
    <path d="M17.6 27h4.4M26 27h4.4" fill="none" opacity=".55"/>`,

  /* 突击背心：前置三连弹匣袋 */
  'assault': `
    <path d="M13 14h22v20a3 3 0 0 1-3 3H16a3 3 0 0 1-3-3z"/>
    <path d="M17.5 14l1.6-4.2h9.8L30.5 14" fill="none"/>
    <path d="M18.2 17.6h11.6v4.4H18.2z" fill="none" opacity=".8"/>
    <rect x="17.5" y="26" width="4.6" height="7.4" rx="1.1" fill="none"/>
    <rect x="22.5" y="26" width="4.6" height="7.4" rx="1.1" fill="none"/>
    <rect x="27.5" y="26" width="4.6" height="7.4" rx="1.1" fill="none"/>`,

  /* 快拆背心：双侧快拆扣 */
  'fast': `
    <path d="M15 15h18v20a3 3 0 0 1-3 3H18a3 3 0 0 1-3-3z"/>
    <path d="M18.6 15l1.4-4.2h8L29.4 15" fill="none"/>
    <path d="M15 20.6h-4.4a1.6 1.6 0 0 0-1.6 1.6v4.2a1.6 1.6 0 0 0 1.6 1.6H15z"/>
    <path d="M33 20.6h4.4a1.6 1.6 0 0 1 1.6 1.6v4.2a1.6 1.6 0 0 1-1.6 1.6H33z"/>`,

  /* 轻量全甲：尖领流线剪裁 */
  'elite': `
    <path d="M15 17l9-3.6 9 3.6v15.4c0 3.6-4 5.8-9 5.8s-9-2.2-9-5.8z"/>
    <path d="M20 24h8v6.2h-8z" fill="none"/>
    <path d="M15 17l-2.4-4.2M33 17l2.4-4.2" fill="none" opacity=".8"/>`,

  /* 重型护肩甲：大面积护片 + 护肩 */
  'heavy': `
    <path d="M12.5 16.5C16.5 12.8 31.5 12.8 35.5 16.5V34.5C35.5 38.6 30.4 40.3 24 40.3C17.6 40.3 12.5 38.6 12.5 34.5Z"/>
    <path d="M12.5 16.5L7.4 22.6l5.1 3.3z"/>
    <path d="M35.5 16.5l5.1 6.1-5.1 3.3z"/>
    <path d="M24 14.7V39.8" fill="none" opacity=".6"/>`,

  /* 堡垒重甲：颈围 + 双层护肩 */
  'titan': `
    <path d="M17 11.6h14" fill="none"/>
    <path d="M11 17.6C15.4 13.4 32.6 13.4 37 17.6V36C37 40.6 31 42.6 24 42.6C17 42.6 11 40.6 11 36Z"/>
    <path d="M11 17.6L5.2 24.6l5.8 3.8z"/>
    <path d="M37 17.6l5.8 7-5.8 3.8z"/>
    <path d="M24 14.6v27.8" fill="none" opacity=".55"/>
    <path d="M16.8 23h14.4" fill="none" opacity=".45"/>`,

  /* ============ 头盔 ============ */

  /* 棒球帽：帽檐朝前的软帽 */
  'cap': `
    <path d="M14.5 31h19c4.6 0 7.5 1.6 7.5 3.7 0 1.2-1 1.9-2.7 1.9H14.5z"/>
    <path d="M14.5 31C14.5 21.4 19 14.5 24 14.5S33.5 21.4 33.5 31z"/>
    <path d="M14.5 26.6h19" fill="none" opacity=".6"/>`,

  /* 宽檐帽（奔尼帽） */
  'boonie': `
    <path d="M7 27.6c4.6-4 29.4-4 34 0 2 1.8.7 4.9-2.3 4.9-5 0-9.7-2.9-14.7-2.9s-9.7 2.9-14.7 2.9c-3 0-4.3-3.1-2.3-4.9z"/>
    <path d="M17.5 28.4c0-9.6 2.9-15.7 6.5-15.7s6.5 6.1 6.5 15.7z"/>
    <path d="M18.2 30.6c1.5 3.6 10.1 3.6 11.6 0" fill="none" opacity=".5"/>`,

  /* 老式钢盔：半球盔体 + 卷边 */
  'steel': `
    <path d="M13.4 31c0-11 4.7-18 10.6-18s10.6 7 10.6 18z"/>
    <path d="M11.4 31h25.2c2.6 0 2.6 3 0 3H11.4c-2.6 0-2.6-3 0-3z"/>
    <path d="M13.4 27.4h21.2" fill="none" opacity=".6"/>`,

  /* 战术头盔：高切盔体 + 侧导轨 + 夜视支架 */
  'bump': `
    <path d="M14.5 29V23.5C14.5 17.9 18.8 13.7 24 13.7C29.2 13.7 33.5 17.9 33.5 23.5V29C33.5 30 32.7 30.6 31.7 30.6H16.3C15.3 30.6 14.5 30 14.5 29Z"/>
    <rect x="10.3" y="22.4" width="4.2" height="3.6" rx="1" fill="none"/>
    <rect x="33.5" y="22.4" width="4.2" height="3.6" rx="1" fill="none"/>
    <path d="M21.8 14h4.4l1.3 3.5h-7z" fill="none"/>
    <path d="M17 26.6h14" fill="none" opacity=".5"/>`,

  /* 面罩盔：盔体 + 整片防暴面罩 */
  'riot': `
    <path d="M15.6 26.6V22C15.6 16.9 19.3 13.3 24 13.3S32.4 16.9 32.4 22v4.6"/>
    <path d="M13.6 26.6h20.8c1.5 0 2.5 1 2.5 2.4v4.1c0 2.5-1.7 3.9-4 3.9H15.1c-2.3 0-4-1.4-4-3.9V29c0-1.4 1-2.4 2.5-2.4z"/>
    <path d="M16.9 29.6l3.1 3.3" fill="none" opacity=".45"/>`,

  /* 全罩自闭盔：全包裹盔体 + 目镜 + 通气口 */
  'enclosed': `
    <path d="M24 12.2C31.2 12.2 35.3 17.2 35.3 24.2V30.5C35.3 35.8 30.3 38.6 24 38.6C17.7 38.6 12.7 35.8 12.7 30.5V24.2C12.7 17.2 16.8 12.2 24 12.2Z"/>
    <path d="M16.6 23.7C16.6 22 18.2 21 20.4 21H27.6C29.8 21 31.4 22 31.4 23.7C31.4 25.4 29.8 26.4 27.6 26.4H20.4C18.2 26.4 16.6 25.4 16.6 23.7Z" fill="none"/>
    <path d="M20.2 31.4h7.6M21.6 34.8h4.8" fill="none" opacity=".6"/>`,

  /* 听力头：电子耳罩 + 麦克风杆 */
  'hearing': `
    <path d="M16.4 28V22.5C16.4 18 19.8 14.5 24 14.5S31.6 18 31.6 22.5V28Z"/>
    <rect x="8.6" y="23.8" width="7.4" height="10.4" rx="2.4"/>
    <rect x="32" y="23.8" width="7.4" height="10.4" rx="2.4"/>
    <path d="M11.8 23.8h4.6M31.6 23.8h4.6" fill="none" stroke-width="1.6" opacity=".65"/>
    <path d="M24.6 28.4c0 4 1.6 6.3 4.6 6.9" fill="none"/>`,

  /* 夜视盔：盔体 + 双筒夜视仪 */
  'nvg': `
    <path d="M14.5 28.6V24C14.5 18.4 18.8 14.2 24 14.2S33.5 18.4 33.5 24v4.6z"/>
    <path d="M24 14.2V9" fill="none"/>
    <rect x="16.4" y="4.4" width="15.2" height="6.2" rx="2.2" fill="none"/>
    <circle cx="20.6" cy="7.5" r="1.9" fill="none"/>
    <circle cx="27.4" cy="7.5" r="1.9" fill="none"/>
    <path d="M17 26.2h14" fill="none" opacity=".45"/>`,

  /* ============ 弹药 ============ */

  /* 手枪 / 冲锋枪弹：平钝弹头 + 直筒弹壳 */
  'ammo-pistol': `
    <path d="M18 10.5c0-4.2 2.5-6.5 6-6.5s6 2.3 6 6.5V20H18z"/>
    <path d="M18 20h12v18H18z"/>
    <path d="M16.2 38h15.6v5H16.2z"/>
    <path d="M24 20v18" fill="none" opacity=".45"/>`,

  /* 步枪中间威力弹：尖头 + 瓶肩 */
  'ammo-rifle': `
    <path d="M24 4c3.6 0 5.6 3.6 5.6 8.2v3.8h-11.2v-3.8C18.4 7.6 20.4 4 24 4z"/>
    <path d="M18.4 16h11.2l2.2 4.2H16.2z" fill="none"/>
    <path d="M16.2 20.2h15.6V38H16.2z"/>
    <path d="M14.4 38h19.2v5H14.4z"/>`,

  /* 全威力 / 狙击弹：细长弹头 + 收尾弹壳 */
  'ammo-long': `
    <path d="M24 2.5c3.2 0 4.9 3.6 4.9 8v4.5h-9.8v-4.5c0-4.4 1.7-8 4.9-8z"/>
    <path d="M19.1 15h9.8l1.7 3.8H17.4z" fill="none"/>
    <path d="M17.4 18.8h13.2l-1.7 19.7H19.1z"/>
    <path d="M15.6 38.5h16.8v5H15.6z"/>`,

  /* 霰弹：粗直筒 + 顶部收口折痕 */
  'ammo-shell': `
    <path d="M16 12.5h16l-3.2-4.6H19.2z" fill="none"/>
    <path d="M16 12.5h16V38H16z"/>
    <path d="M20.5 12.5V8.4M24 12.5V8.2M27.5 12.5V8.4" fill="none" opacity=".6"/>
    <path d="M14.6 38h18.8v5H14.6z"/>`
};

/* ---------------- 装备 → 图标原型 映射 ---------------- */
const ICON_MAP = {
  /* ===== 护甲（25 件） ===== */
  '摩托马甲':            { g: 'half-plate',     arch: '胸挂半甲' },
  '尼龙防弹衣':          { g: 'soft',           arch: '软式防弹衣' },
  '轻型防弹衣':          { g: 'plate-light',    arch: '轻量插板' },
  '安保防弹衣':          { g: 'vest-basic',     arch: '基础背心' },
  '简易防刺服':          { g: 'soft',           arch: '软式防刺服' },
  'TG 战术防弹衣':       { g: 'plate-standard', arch: '插板背心' },
  '通用战术背心':        { g: 'plate-light',    arch: '轻量插板' },
  'HT 战术背心':         { g: 'plate-standard', arch: '插板背心' },
  '制式防弹背心':        { g: 'half-plate',     arch: '胸挂半甲' },
  'TG-H 防弹衣':         { g: 'plate-full',     arch: '全甲连体' },
  '射手战术背心':        { g: 'assault',        arch: '突击背心' },
  'Hvk 快拆防弹衣':      { g: 'fast',           arch: '快拆背心' },
  '武士防弹背心':        { g: 'assault',        arch: '突击背心' },
  'DT-AVS 防弹衣':       { g: 'plate-full',     arch: '全甲连体' },
  'MK-2 战术背心':       { g: 'plate-full',     arch: '全甲连体' },
  '突击手防弹背心':      { g: 'assault',        arch: '突击背心' },
  'HMP 特勤防弹衣':      { g: 'half-plate',     arch: '胸挂半甲' },
  '精英防弹背心':        { g: 'elite',          arch: '轻量全甲' },
  'FS 复合防弹衣':       { g: 'plate-full',     arch: '全甲连体' },
  '重型防弹背心':        { g: 'heavy',          arch: '重型护肩甲' },
  'Hvk-2 防弹衣':        { g: 'heavy',          arch: '重型护肩甲' },
  '金刚防弹衣':          { g: 'titan',          arch: '堡垒重甲' },
  '特里克 MAS2.0 装甲':  { g: 'heavy',          arch: '重型护肩甲' },
  '泰坦防弹装甲':        { g: 'titan',          arch: '堡垒重甲' },
  'HA-2 重型防弹衣':     { g: 'heavy',          arch: '重型护肩甲' },

  /* ===== 头盔（23 顶） ===== */
  '老式钢盔':            { g: 'steel',    arch: '钢盔' },
  '奔尼帽':              { g: 'boonie',   arch: '宽檐帽' },
  '户外棒球帽':          { g: 'cap',      arch: '棒球帽' },
  '安保头盔':            { g: 'bump',     arch: '基础头盔' },
  '复古摩托头盔':        { g: 'enclosed', arch: '摩托全盔' },
  'DRO 战术头盔':        { g: 'bump',     arch: '战术头盔' },
  'MC 防弹头盔':         { g: 'bump',     arch: '战术头盔' },
  'H01 战术头盔':        { g: 'bump',     arch: '战术头盔' },
  '防暴头盔':            { g: 'riot',     arch: '面罩盔' },
  'DAS 防弹头盔':        { g: 'bump',     arch: '战术头盔' },
  'MC201 头盔':          { g: 'hearing',  arch: '听力头' },
  'H07 战术头盔':        { g: 'bump',     arch: '战术头盔' },
  'D6 战术头盔':         { g: 'enclosed', arch: '全罩自闭盔' },
  'DICH 训练头盔':       { g: 'hearing',  arch: '听力头' },
  'GT1 战术头盔':        { g: 'riot',     arch: '面罩盔' },
  'MHS 战术头盔':        { g: 'hearing',  arch: '听力头' },
  'Mask-1 铁壁头盔':     { g: 'enclosed', arch: '全罩自闭盔' },
  'DICH-1 战术头盔':     { g: 'hearing',  arch: '听力头' },
  'GN 重型头盔':         { g: 'enclosed', arch: '全罩盔' },
  'H09 防暴头盔':        { g: 'riot',     arch: '面罩盔' },
  'DICH-9 重型头盔':     { g: 'hearing',  arch: '听力头' },
  'GT5 指挥官头盔':      { g: 'enclosed', arch: '全罩盔' },
  'H70 精英头盔':        { g: 'enclosed', arch: '全罩盔' },

  /* ===== 夜视头盔（3 顶） ===== */
  'GN 久战重型夜视头盔': { g: 'nvg', arch: '夜视盔' },
  'GN 重型夜视头盔':     { g: 'nvg', arch: '夜视盔' },
  'H70 夜视精英头盔':    { g: 'nvg', arch: '夜视盔' }
};

/* ---------------- 图标图例（原型说明） ---------------- */
const ICON_LEGEND = {
  armor: [
    { g: 'soft',           arch: '软式防弹衣', desc: '无插板的绗缝软质结构，仅护胸' },
    { g: 'vest-basic',     arch: '基础背心',   desc: '细肩带 + 窄身片，防护面积最小' },
    { g: 'plate-light',    arch: '轻量插板',   desc: '嵌一块小尺寸防弹插板' },
    { g: 'plate-standard', arch: '插板背心',   desc: '标准前后插板，弹带固定' },
    { g: 'half-plate',     arch: '胸挂半甲',   desc: '护胸不护下腹（虚线为盲区）' },
    { g: 'plate-full',     arch: '全甲连体',   desc: '胸腹一体连贯防护' },
    { g: 'assault',        arch: '突击背心',   desc: '前置三连弹匣袋的重装型' },
    { g: 'fast',           arch: '快拆背心',   desc: '双侧快拆扣，可快速脱卸' },
    { g: 'elite',          arch: '轻量全甲',   desc: '尖领流线剪裁，兼顾机动' },
    { g: 'heavy',          arch: '重型护肩甲', desc: '大面积护片 + 护肩延伸' },
    { g: 'titan',          arch: '堡垒重甲',   desc: '颈围 + 双层护肩，最重装' }
  ],
  helmet: [
    { g: 'cap',      arch: '棒球帽',     desc: '无防护，靠耳机提供拾音' },
    { g: 'boonie',   arch: '宽檐帽',     desc: '遮阳伪装用，完全不防弹' },
    { g: 'steel',    arch: '钢盔',       desc: '老式半球盔体 + 卷边' },
    { g: 'bump',     arch: '战术头盔',   desc: '高切盔体 + 侧导轨 + 夜视支架' },
    { g: 'riot',     arch: '面罩盔',     desc: '盔体加整片面罩，护住面部' },
    { g: 'enclosed', arch: '全罩自闭盔', desc: '全包裹盔体，视野与听力受限' },
    { g: 'hearing',  arch: '听力头',     desc: '电子耳罩 + 麦克风杆，拾音优先' },
    { g: 'nvg',      arch: '夜视盔',     desc: '盔体加装双筒夜视仪' }
  ],
  ammo: [
    { g: 'ammo-pistol', arch: '手枪 / 冲锋枪弹', desc: '平钝弹头直筒壳，9×19 / .45 / 5.7 等' },
    { g: 'ammo-rifle',  arch: '步枪中间威力弹', desc: '尖头瓶肩，5.56 / 5.45 / 7.62×39 等' },
    { g: 'ammo-long',   arch: '全威力 / 狙击弹', desc: '细长收尾弹壳，7.62×51 / .338 / .50 等' },
    { g: 'ammo-shell',  arch: '霰弹',           desc: '粗直筒收口，12 Gauge 独头弹穿甲 +1' }
  ]
};

/* ---------------- 取值与渲染 ---------------- */

/* 容错匹配：支持简称（如「MC201」「DICH 训练」「特里克 MAS2.0」） */
function iconEntry(name, kind) {
  const def = kind === 'helmet' ? 'bump' : 'plate-standard';
  if (!name) return { g: def, arch: '' };
  if (ICON_MAP[name]) return ICON_MAP[name];
  const keys = Object.keys(ICON_MAP);
  const hit = keys.find(k => k.startsWith(name)) || keys.find(k => name.startsWith(k));
  return hit ? ICON_MAP[hit] : { g: def, arch: '' };
}

/* 生成图标 SVG；颜色由父级 CSS 的 currentColor / --c 决定 */
function glyphSvg(g, cls) {
  const body = ICON_GLYPHS[g] || '';
  return `<svg class="ico${cls ? ' ' + cls : ''}" viewBox="0 0 48 48" role="img" aria-hidden="true"><g fill="currentColor" fill-opacity=".13" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">${body}</g></svg>`;
}

function iconSvg(name, kind, cls) {
  const e = iconEntry(name, kind);
  return glyphSvg(e.g, cls).replace('aria-hidden="true"', `aria-label="${esc(e.arch || '装备图标')}"`);
}

/* 图鉴卡片用：色块 + 图标 + 原型名 */
function iconTile(name, kind) {
  const e = iconEntry(name, kind);
  return `<div class="ico-wrap">
      <div class="ico-tile">${iconSvg(name, kind)}</div>
      ${e.arch ? `<span class="ico-cap">${esc(e.arch)}</span>` : ''}
    </div>`;
}

/* 弹窗标题用的大图标 */
function iconBig(name, kind) {
  return `<div class="modal-ico">${iconSvg(name, kind)}</div>`;
}

/* 表格 / 列表用的小图标（自带品质色） */
function iconMini(name, kind, tier) {
  const color = tier ? ` style="color:var(--t${tier})"` : '';
  return `<span class="t-ico"${color}>${iconSvg(name, kind, 'ico-mini')}</span>`;
}

/* ---------- 装备实图（AI 生成的原型示意图，同原型共用一张） ----------
 * 只覆盖已生成图片的原型；没有的装备自动回退到 SVG 线稿图标。
 * 这些是「原型示意图」，不是游戏内素材，页面上会明确标注。 */
const PROTO_IMG = {
  'plate-full': 'assets/img/plate-full.jpg',
  'half-plate': 'assets/img/half-plate.jpg',
  'steel':      'assets/img/steel.jpg',
  'nvg':        'assets/img/nvg.jpg'
};

/* 单件装备的实图：由 _itemimg.py 从游戏内素材生成，定义在 assets/itemimg.js。
 * 优先级高于下面的原型示意图——同一件装备有真图时就用真图。 */
function realImg(name) {
  return (typeof ITEM_IMG !== 'undefined' && ITEM_IMG[name]) ? ITEM_IMG[name] : null;
}

function hasItemImg(name, kind) {
  if (realImg(name)) return true;
  const e = iconEntry(name, kind);
  return !!(e && PROTO_IMG[e.g]);
}

/* 图鉴卡片视觉：单件实图 > 原型示意图 > SVG 色块图标 */
function itemVisual(name, kind) {
  const real = realImg(name);
  if (real) {
    return `<div class="ico-wrap">
      <div class="item-pic item-pic-real"><img src="${real}" alt="${esc(name)} 游戏内图标" loading="lazy"></div>
    </div>`;
  }
  const e = iconEntry(name, kind);
  const src = e && PROTO_IMG[e.g];
  if (!src) return iconTile(name, kind);
  return `<div class="ico-wrap">
      <div class="item-pic"><img src="${src}" alt="${esc(e.arch || name)} 示意图" loading="lazy"></div>
      ${e.arch ? `<span class="ico-cap">${esc(e.arch)}</span>` : ''}
    </div>`;
}

/* 弹窗大图：单件实图 > 原型示意图 > 大号 SVG 图标 */
function itemVisualBig(name, kind) {
  const real = realImg(name);
  if (real) return `<div class="modal-pic item-pic-real"><img src="${real}" alt="${esc(name)} 游戏内图标"></div>`;
  const e = iconEntry(name, kind);
  const src = e && PROTO_IMG[e.g];
  if (!src) return iconBig(name, kind);
  return `<div class="modal-pic"><img src="${src}" alt="${esc(e.arch || name)} 示意图"></div>`;
}

/* 渲染图标图例：直接按原型 id 出图，不走名称映射 */
function renderIconLegend(kind, mountId) {
  const mount = document.getElementById(mountId);
  if (!mount) return;
  mount.innerHTML = (ICON_LEGEND[kind] || []).map(x => `
    <div class="lg">
      <div class="ico-tile">${glyphSvg(x.g, 'ico-lg')}</div>
      <div><b>${esc(x.arch)}</b><span>${esc(x.desc)}</span></div>
    </div>`).join('');
}
