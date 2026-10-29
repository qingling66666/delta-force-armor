/* ============================================================
 * 《三角洲行动》护甲数据库 — 交互层
 * ============================================================ */

/* ---------- 主题 ---------- */
(function initTheme() {
  const saved = localStorage.getItem('dfa-theme') || 'dark';
  document.documentElement.setAttribute('data-theme', saved);
})();

function toggleTheme() {
  const cur = document.documentElement.getAttribute('data-theme');
  const next = cur === 'dark' ? 'light' : 'dark';
  document.documentElement.setAttribute('data-theme', next);
  localStorage.setItem('dfa-theme', next);
  syncThemeIcon();
}

function syncThemeIcon() {
  const btn = document.getElementById('themeBtn');
  if (!btn) return;
  const dark = document.documentElement.getAttribute('data-theme') === 'dark';
  btn.innerHTML = dark
    ? '<svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><circle cx="12" cy="12" r="4.2"/><path d="M12 2v2.4M12 19.6V22M2 12h2.4M19.6 12H22M4.9 4.9l1.7 1.7M17.4 17.4l1.7 1.7M19.1 4.9l-1.7 1.7M6.6 17.4l-1.7 1.7"/></svg>'
    : '<svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><path d="M20 14.2A8.4 8.4 0 1 1 9.8 4a6.9 6.9 0 0 0 10.2 10.2z"/></svg>';
}

/* ---------- 导航高亮 ---------- */
function initNav(page) {
  document.querySelectorAll('.nav-links a[data-page]').forEach(a => {
    if (a.dataset.page === page) a.classList.add('on');
  });
  const btn = document.getElementById('themeBtn');
  if (btn) btn.addEventListener('click', toggleTheme);
  syncThemeIcon();
}

/* ---------- 工具 ---------- */
const tierInfo = t => TIERS.find(x => x.tier === t);
const tierCls = t => 't' + t;
const esc = s => String(s).replace(/[&<>"]/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]));
const fmtSign = v => (v === 0 ? '—' : (v > 0 ? '+' : '') + v + '%');
const fmtNeg = v => (v === 0 || v === null || v === undefined ? '无' : v + '%');

/* 品质标记 */
function tierTag(t) {
  const info = tierInfo(t);
  return `<span class="tier-tag">Lv.${t} ${info.name}</span>`;
}

/* ---------- 渲染：装备卡片 ---------- */
function renderArmors(list, mount) {
  if (!list.length) { mount.innerHTML = '<div class="empty">没有符合条件的护甲，换个筛选条件试试。</div>'; return; }
  mount.innerHTML = list.map((a, i) => {
    const c = tierCls(a.tier);
    const maxDur = 150;
    return `
    <div class="item ${c}" role="button" tabindex="0" onclick="openArmor(${a._i})">
      <div class="item-head">
        ${itemVisual(a.name, 'armor')}
        <div class="item-head-body">
          <div class="item-top">
            <h3>${esc(a.name)}</h3>
            ${tierTag(a.tier)}
          </div>
          <div class="alias">${a.alias ? esc(a.alias) + ' · ' : ''}${esc(a.type)}</div>
        </div>
      </div>
      <div class="item-stats">
        <div><b>${a.dur}</b><span>耐久</span></div>
        <div><b>${a.wt}</b><span>重量kg</span></div>
        <div><b>${a.ads === 0 ? '0' : a.ads}</b><span>瞄速%</span></div>
        <div><b>${a.wear}%</b><span>维修损耗</span></div>
      </div>
      <div class="bar"><i style="width:${Math.round(a.dur / maxDur * 100)}%"></i></div>
      <p class="note">${esc(a.note)}</p>
      <div class="item-tags">
        ${a.best ? '<span class="mini star">★ 推荐</span>' : ''}
        ${(a.tags || []).map(t => `<span class="mini">${esc(t)}</span>`).join('')}
      </div>
    </div>`;
  }).join('');
}

function renderHelmets(list, mount) {
  if (!list.length) { mount.innerHTML = '<div class="empty">没有符合条件的头盔，换个筛选条件试试。</div>'; return; }
  mount.innerHTML = list.map(h => {
    const c = tierCls(h.tier);
    const maxDur = 75;
    const anti = h.anti === true ? '<span class="badge g">可防狙</span>'
      : h.anti === false ? '<span class="badge r">不防狙</span>' : '';
    const hearCls = h.hear > 0 ? 'badge g' : h.hear < 0 ? 'badge r' : 'badge n';
    return `
    <div class="item ${c}" role="button" tabindex="0" onclick="openHelmet(${h._i})">
      <div class="item-head">
        ${itemVisual(h.name, 'helmet')}
        <div class="item-head-body">
          <div class="item-top">
            <h3>${esc(h.name)}</h3>
            ${tierTag(h.tier)}
          </div>
          <div class="alias">${h.alias ? esc(h.alias) + ' · ' : ''}${esc(h.areas.join(' / '))}</div>
        </div>
      </div>
      <div class="item-stats">
        <div><b>${h.dur}</b><span>耐久</span></div>
        <div><b>${h.wt}</b><span>重量kg</span></div>
        <div><b>${h.hear > 0 ? '+' : ''}${h.hear}%</b><span>拾音</span></div>
        <div><b>${h.wear}%</b><span>维修损耗</span></div>
      </div>
      <div class="bar"><i style="width:${Math.round(h.dur / maxDur * 100)}%"></i></div>
      <p class="note">${esc(h.note)}</p>
      <div class="item-tags">
        <span class="badge ${hearCls}">拾音 ${h.hear > 0 ? '+' : ''}${h.hear}%</span>
        ${anti}
        ${h.best ? '<span class="mini star">★ 推荐</span>' : ''}
        ${(h.tags || []).map(t => `<span class="mini">${esc(t)}</span>`).join('')}
      </div>
    </div>`;
  }).join('');
}

/* ---------- 详情弹窗 ---------- */
/* 键盘可达性：卡片带 role="button" + tabindex，支持 Enter / Space 打开 */
document.addEventListener('keydown', e => {
  if (e.key !== 'Enter' && e.key !== ' ') return;
  const card = e.target.closest && e.target.closest('[role="button"][onclick]');
  if (!card) return;
  e.preventDefault();
  const m = card.getAttribute('onclick').match(/open(Armor|Helmet)\((\d+)\)/);
  if (m) window['open' + m[1]](+m[2]);
});

function ensureModal() {
  let m = document.getElementById('modal');
  if (m) return m;
  m = document.createElement('div');
  m.id = 'modal';
  m.className = 'modal';
  m.innerHTML = '<div class="modal-box" id="modalBox"></div>';
  m.addEventListener('click', e => { if (e.target === m) closeModal(); });
  document.body.appendChild(m);
  document.addEventListener('keydown', e => { if (e.key === 'Escape') closeModal(); });
  return m;
}
function closeModal() { const m = document.getElementById('modal'); if (m) m.classList.remove('on'); }

function openArmor(i) {
  const a = ARMORS[i];
  const m = ensureModal();
  const box = document.getElementById('modalBox');
  box.className = 'modal-box ' + tierCls(a.tier);
  box.innerHTML = `
    <div class="modal-head">
      <button class="modal-close" onclick="closeModal()">&times;</button>
      <div class="modal-head-row">
        ${itemVisualBig(a.name, 'armor')}
        <div style="min-width:0">
          <div class="eyebrow">${tierInfo(a.tier).cn}护甲 · ${esc(a.type)}</div>
          <h3>${esc(a.name)}</h3>
          <div class="alias">${a.alias ? esc(a.alias) : ''}</div>
        </div>
      </div>
    </div>
    <div class="kv">
      <div><b>${a.dur}</b><span>总耐久</span></div>
      <div><b>${a.wt}</b><span>重量 kg</span></div>
      <div><b>${fmtSign(a.ads)}</b><span>瞄准速度</span></div>
      <div><b>${fmtSign(a.mv)}</b><span>移动速度</span></div>
      <div><b>${a.wear}%</b><span>单次修满损耗</span></div>
      <div><b>${a.type}</b><span>防护范围</span></div>
    </div>
    <div class="verdict">
      <b>点评 · </b>${esc(a.note)}
      <br><br><b>维修推演 · </b>碎甲修满一次后耐久上限约 ${(a.dur * (1 - a.wear / 100)).toFixed(1)}，两次后约 ${(a.dur * Math.pow(1 - a.wear / 100, 2)).toFixed(1)}。
    </div>
    <div class="item-tags" style="margin-top:16px">
      <span class="mini">原型 · ${esc(iconEntry(a.name, 'armor').arch)}</span>
      ${(a.tags || []).map(t => `<span class="mini">${esc(t)}</span>`).join('')}
    </div>`;
  m.classList.add('on');
}

function openHelmet(i) {
  const h = (window.__helmets || HELMETS)[i];
  const m = ensureModal();
  const box = document.getElementById('modalBox');
  box.className = 'modal-box ' + tierCls(h.tier);
  const anti = h.anti === true
    ? '<span style="color:var(--ok)">可以防住同级狙击弹爆头</span>'
    : h.anti === false
      ? '<span style="color:var(--no)">无法防住同级狙击弹爆头</span>'
      : '<span style="color:var(--txt-3)">该等级不做防狙判定</span>';
  const thr = SNIPE_THRESHOLD[h.tier];
  box.innerHTML = `
    <div class="modal-head">
      <button class="modal-close" onclick="closeModal()">&times;</button>
      <div class="modal-head-row">
        ${itemVisualBig(h.name, 'helmet')}
        <div style="min-width:0">
          <div class="eyebrow">${tierInfo(h.tier).cn}头盔 · ${esc(h.areas.join(' / '))}</div>
          <h3>${esc(h.name)}</h3>
          <div class="alias">${h.alias ? esc(h.alias) : ''}</div>
        </div>
      </div>
    </div>
    <div class="kv">
      <div><b>${h.dur}</b><span>总耐久</span></div>
      <div><b>${h.wt}</b><span>重量 kg</span></div>
      <div><b>${h.hear > 0 ? '+' : ''}${h.hear}%</b><span>拾音范围</span></div>
      <div><b>${fmtSign(h.ads)}</b><span>瞄准速度</span></div>
      <div><b>${fmtSign(h.mv)}</b><span>移动速度</span></div>
      <div><b>${h.wear}%</b><span>单次修满损耗</span></div>
    </div>
    <div class="verdict">
      <b>点评 · </b>${esc(h.note)}
      <br><br><b>防狙判定 · </b>${anti}。${thr ? `${tierInfo(h.tier).cn}头盔的“同级防狙最低耐久”为 <code style="font-family:monospace;color:var(--accent)">${thr}</code>，当前耐久 ${h.dur} 点。` : ''}
    </div>
    <div class="item-tags" style="margin-top:16px">
      <span class="mini">降噪 ${h.noise}</span>
      <span class="mini">原型 · ${esc(iconEntry(h.name, 'helmet').arch)}</span>
      ${(h.tags || []).map(t => `<span class="mini">${esc(t)}</span>`).join('')}
    </div>`;
  m.classList.add('on');
}

/* ---------- 通用：绑定装备图鉴页 ---------- */
function setupAtlas(opts) {
  const { data, mountId, type } = opts;
  data.forEach((x, i) => { x._i = i; });
  const mount = document.getElementById(mountId);
  let tierFilter = 0, subFilter = 'all', kw = '', sortBy = 'tier';

  const chipWrap = document.getElementById('tierChips');
  chipWrap.innerHTML =
    `<button class="chip on" data-t="0">全部</button>` +
    TIERS.map(t => `<button class="chip ${t.cls}" data-t="${t.tier}">${t.tier} 级 ${t.name}</button>`).join('');

  chipWrap.addEventListener('click', e => {
    const c = e.target.closest('.chip');
    if (!c) return;
    chipWrap.querySelectorAll('.chip').forEach(x => x.classList.remove('on'));
    c.classList.add('on');
    tierFilter = +c.dataset.t;
    apply();
  });

  const subWrap = document.getElementById('subChips');
  if (subWrap) {
    subWrap.addEventListener('click', e => {
      const c = e.target.closest('.chip');
      if (!c) return;
      subWrap.querySelectorAll('.chip').forEach(x => x.classList.remove('on'));
      c.classList.add('on');
      subFilter = c.dataset.v;
      apply();
    });
  }

  document.getElementById('kw').addEventListener('input', e => { kw = e.target.value.trim(); apply(); });
  document.getElementById('sort').addEventListener('change', e => { sortBy = e.target.value; apply(); });

  function apply() {
    let list = data.filter(x => {
      if (tierFilter && x.tier !== tierFilter) return false;
      if (type === 'armor' && subFilter !== 'all' && x.type !== subFilter) return false;
      if (type === 'helmet' && subFilter !== 'all') {
        if (subFilter === 'hear' && x.hear <= 0) return false;
        if (subFilter === 'anti' && x.anti !== true) return false;
        if (subFilter === 'all') return true;
      }
      if (kw) {
        const hay = (x.name + (x.alias || '') + (x.tags || []).join('') + x.note).toLowerCase();
        if (!hay.includes(kw.toLowerCase())) return false;
      }
      return true;
    });

    const sorters = {
      tier: (a, b) => a.tier - b.tier || b.dur - a.dur,
      dur: (a, b) => b.dur - a.dur || a.tier - b.tier,
      wt: (a, b) => a.wt - b.wt || a.tier - b.tier,
      wear: (a, b) => a.wear - b.wear || a.tier - b.tier,
      ads: (a, b) => (b.ads || 0) - (a.ads || 0) || a.tier - b.tier
    };
    list.sort(sorters[sortBy] || sorters.tier);

    document.getElementById('cnt').textContent = `共 ${list.length} 件`;
    type === 'armor' ? renderArmors(list, mount) : renderHelmets(list, mount);
  }

  apply();
}

/* ---------- 通用：穿透结算（机制页计算器与弹药页共用同一套公式） ---------- */
function calcPen(F, A0, bLv, aLv, H) {
  const diff = bLv - aLv;
  /* 1. 甲伤倍率：低 2 级及以上会额外衰减 */
  const armorMul = diff >= -1 ? 1 : diff === -2 ? .6 : diff === -3 ? .4 : .25;
  /* 2. 被护甲覆盖部分的肉伤减免比例 */
  const absorb = diff >= 2 ? 0 : diff === 1 ? .25 : diff === 0 ? .5 : 1;
  /* 3. 能否穿透（低 1 级及以下完全无法穿透） */
  const penetrates = diff >= 0;

  const A = A0 * armorMul;                    // 本枪实际甲伤
  const coveredRatio = Math.min(1, H / A);    // 本枪被甲吸收的比例
  const coveredFlesh = F * coveredRatio;      // 落在护甲上的肉伤
  const mitigated = penetrates ? coveredFlesh * (1 - absorb) : 0;
  const overflow = F * (1 - coveredRatio);    // 溢出部分按无防护全额结算
  const total = mitigated + overflow;

  return {
    diff, absorb, penetrates, A,
    flesh: total,
    breakNow: A >= H,
    shots: Math.ceil(H / A),
    absorbedPct: coveredRatio
  };
}

/* ---------- 伤害计算器 ---------- */
function initCalc() {
  const el = {};
  ['bLv', 'bFlesh', 'bArmor', 'aLv', 'aDur'].forEach(id => { el[id] = document.getElementById(id); });
  if (!el.bLv) return;

  /* 滑杆与数字输入双向同步 */
  ['bLv', 'aDur'].forEach(id => {
    const r = document.getElementById(id + 'R');
    if (r) r.addEventListener('input', () => { el[id].value = r.value; calcRun(); });
  });
  ['bLv', 'bFlesh', 'bArmor', 'aLv', 'aDur'].forEach(id => {
    if (!el[id]) return;
    el[id].addEventListener('input', () => {
      const r = document.getElementById(id + 'R');
      if (r) r.value = el[id].value;
      calcRun();
    });
    if (el[id].tagName === 'SELECT') el[id].addEventListener('change', calcRun);
  });

  function calcRun() {
    const F = Math.max(0, +el.bFlesh.value || 0);        // 基础肉体伤害
    const A0 = Math.max(1, +el.bArmor.value || 1);       // 基础护甲伤害
    const bLv = Math.max(0, Math.min(7, +el.bLv.value || 0));
    const aLv = +el.aLv.value;
    const H = Math.max(1, +el.aDur.value || 1);          // 护甲剩余耐久

    const r = calcPen(F, A0, bLv, aLv, H);
    const diff = r.diff;
    const A = r.A;
    const total = r.flesh;
    const shotsToBreak = r.shots;
    const breakNow = r.breakNow;

    let verdict, cls;
    if (diff >= 2) { verdict = `子弹高 ${diff} 级 · 完全无视护甲，肉伤与甲伤全额穿透。`; cls = 'var(--ok)'; }
    else if (diff === 1) { verdict = '子弹高 1 级 · 部分穿透，被甲覆盖的肉伤减免 25%。'; cls = 'var(--ok)'; }
    else if (diff === 0) { verdict = '子弹同级 · 半穿透，被甲覆盖的肉伤减免 50%。'; cls = 'var(--warn)'; }
    else if (diff === -1) { verdict = '子弹低 1 级 · 无法穿透，破甲前不造成肉体伤害。'; cls = 'var(--no)'; }
    else if (diff === -2) { verdict = '子弹低 2 级 · 无法穿透，且甲伤额外衰减至 60%。'; cls = 'var(--no)'; }
    else if (diff === -3) { verdict = '子弹低 3 级 · 无法穿透，甲伤衰减至约 40%。'; cls = 'var(--no)'; }
    else { verdict = `子弹低 ${-diff} 级 · 几乎打不动，甲伤衰减至约 25%。`; cls = 'var(--no)'; }

    const set = (id, v) => { const e = document.getElementById(id); if (e) e.textContent = v; };
    set('rArmorDmg', A.toFixed(1));
    set('rFleshDmg', total.toFixed(1));
    set('rShots', breakNow ? '本枪即可' : shotsToBreak + ' 枪');
    set('rVerdict', verdict);
    const v = document.getElementById('rVerdict');
    if (v) v.style.color = cls;

    const ex = document.getElementById('rExplain');
    if (ex) {
      ex.innerHTML =
        `输入：基础肉伤 <code>${F}</code> · 基础甲伤 <code>${A0}</code> · 穿透等级 <code>${bLv}</code> → 目标 <code>${aLv}</code> 级护甲，剩余耐久 <code>${H}</code>。<br>` +
        `结算：本枪造成 <code>${A.toFixed(1)}</code> 点甲伤、<code>${total.toFixed(1)}</code> 点肉伤。` +
        (breakNow
          ? `甲伤已超过剩余耐久，护甲被击碎：其中 <code>${(r.flesh - F * (1 - r.absorbedPct)).toFixed(1)}</code> 点经护甲衰减，<code>${(F * (1 - r.absorbedPct)).toFixed(1)}</code> 点按无防护全额结算。`
          : `护甲吸收 <code>${(r.absorbedPct * 100).toFixed(0)}%</code> 的伤害，还需约 <code>${shotsToBreak}</code> 枪才能打空这层甲。`);
    }

    const bar = document.getElementById('rBar');
    if (bar) {
      const p = Math.min(100, (A / H) * 100);
      bar.innerHTML = `<i style="width:${p}%;background:var(--t3)"></i>`;
    }
  }

  calcRun();
}

/* ---------- 首页：渲染等级条 / 推荐 ---------- */
function renderHome() {
  const strip = document.getElementById('tierStrip');
  if (strip) {
    strip.innerHTML = TIERS.map(t => {
      const ac = ARMORS.filter(a => a.tier === t.tier).length;
      const hc = HELMETS.filter(h => h.tier === t.tier).length;
      const maxD = Math.max(...ARMORS.filter(a => a.tier === t.tier).map(a => a.dur));
      /* 该档代表作：优先取标了「推荐」的，否则取耐久最高的 */
      const pick = list => list.find(x => x.best) || [...list].sort((x, y) => y.dur - x.dur)[0];
      const topA = pick(ARMORS.filter(a => a.tier === t.tier));
      const topH = pick(HELMETS.filter(h => h.tier === t.tier));
      return `<div class="tier-box ${t.cls}">
        <div class="tier-icos">
          <span title="${esc(topA.name)}">${iconMini(topA.name, 'armor', t.tier)}</span>
          <span title="${esc(topH.name)}">${iconMini(topH.name, 'helmet', t.tier)}</span>
        </div>
        <div class="lv">${t.tier}<small>级</small></div>
        <h4>${t.name} · ${t.desc}</h4>
        <p>${t.short} · 最高耐久 ${maxD}</p>
        <div class="cnt">护甲 ${ac} 件 · 头盔 ${hc} 顶</div>
      </div>`;
    }).join('');
  }

  const rec = document.getElementById('recGrid');
  if (rec) {
    /* 推荐配置里的装备名可能带简写或「A / B」并联，容错匹配后取品质色出图标 */
    const recIcons = (str, kind) => {
      const src = kind === 'armor' ? ARMORS : (window.__helmets || HELMETS);
      return str.split('/').map(s => s.trim()).filter(Boolean).map(n => {
        const hit = src.find(x => x.name.startsWith(n) || n.startsWith(x.name));
        return iconMini(n, kind, hit ? hit.tier : null);
      }).join('');
    };
    rec.innerHTML = RECOMMEND.map(r => `
      <div class="card">
        <div class="eyebrow">${esc(r.mode)}</div>
        <h4 style="font-size:17px;margin-bottom:14px">${esc(r.scene)}</h4>
        <div style="display:grid;gap:9px;margin-bottom:14px">
          <div class="rec-line">
            <span class="mini star">护甲</span>
            <span class="rec-icos">${recIcons(r.armor, 'armor')}</span>
            <b>${esc(r.armor)}</b>
          </div>
          <div class="rec-line">
            <span class="mini star">头盔</span>
            <span class="rec-icos">${recIcons(r.helmet, 'helmet')}</span>
            <b>${esc(r.helmet)}</b>
          </div>
        </div>
        <p style="font-size:13px;color:var(--txt-2)">${esc(r.why)}</p>
      </div>`).join('');
  }

  const pen = document.getElementById('penMini');
  if (pen) {
    pen.innerHTML = PEN_TABLE.map(p => `
      <tr>
        <td><b>${esc(p.label)}</b></td>
        <td class="num" style="color:${p.flesh >= 75 ? 'var(--ok)' : p.flesh > 0 ? 'var(--warn)' : 'var(--no)'}">${p.flesh}%</td>
        <td class="num">${p.armor}%</td>
        <td style="color:var(--txt-2);font-size:12.5px">${esc(p.text)}</td>
      </tr>`).join('');
  }
}

/* ---------- 弹药速查页 ---------- */

/* 穿透等级徽标配色：0 级灰、1-6 级按品质色、7 级用强调色 */
function penColor(pen) {
  if (pen === 0) return 'var(--txt-3)';
  if (pen >= 7) return 'var(--accent)';
  return 'var(--t' + pen + ')';
}

function penBadge(pen) {
  const c = penColor(pen);
  return '<span class="pen-badge" style="color:' + c + ';border-color:color-mix(in srgb, ' + c + ' 42%, transparent);background:color-mix(in srgb, ' + c + ' 12%, transparent)">' + pen + ' 级</span>';
}

/* 「子弹等级 vs 护甲等级」的判定文案 */
function penCellInfo(diff) {
  if (diff >= 2) return { short: '全额', full: '高 ' + diff + ' 级：肉伤与甲伤全额生效', cls: 'g' };
  if (diff === 1) return { short: '75%', full: '高 1 级：部分穿透，肉伤保留 75%', cls: 'g' };
  if (diff === 0) return { short: '半穿', full: '同级：半穿透，肉伤减免 50%', cls: 'w' };
  if (diff === -1) return { short: '磨甲', full: '低 1 级：无法穿透，只能磨耐久', cls: 'r' };
  if (diff === -2) return { short: '磨甲↓', full: '低 2 级：无法穿透，甲伤衰减至 60%', cls: 'r' };
  if (diff === -3) return { short: '磨甲↓', full: '低 3 级：无法穿透，甲伤衰减至约 40%', cls: 'r' };
  return { short: '磨甲↓', full: '低 ' + (-diff) + ' 级：几乎打不动，甲伤衰减至约 25%', cls: 'r' };
}

/* 判定等级 → 主题色变量（cls 为 badge 的 g/w/r 类名） */
function penTone(cls) {
  return cls === 'g' ? 'var(--ok)' : cls === 'w' ? 'var(--warn)' : 'var(--no)';
}

/* 弹甲克制矩阵：行＝子弹穿透等级，列＝护甲等级 */
function renderAmmoMatrix(mount) {
  if (!mount) return;
  const pens = [0, 1, 2, 3, 4, 5, 6, 7];
  const head = '<tr><th>子弹等级 ＼ 护甲等级</th>' + TIERS.map(t => '<th style="color:var(--' + t.cls + ')">' + t.tier + ' 级</th>').join('') + '</tr>';
  const rows = pens.map(p => `
    <tr>
      <td>${penBadge(p)}<span style="margin-left:8px;font-size:12px;color:var(--txt-3)">${p === 0 ? '肉伤弹' : p >= 7 ? '仅少数狙击枪' : ''}</span></td>
      ${TIERS.map(t => {
        const info = penCellInfo(p - t.tier);
        return `<td class="num" title="${esc(info.full)}" style="color:${penTone(info.cls)}">${info.short}</td>`;
      }).join('')}
    </tr>`).join('');
  mount.innerHTML = `<table><thead>${head}</thead><tbody>${rows}</tbody></table>`;
}

/* 口径卡片：弹种表 */
function renderAmmoCalibers(mount) {
  if (!mount) return;
  mount.innerHTML = AMMO.map(c => `
    <div class="card ammo-cal">
      <div class="ammo-cal-head">
        <div class="ico-tile">${glyphSvg(c.glyph)}</div>
        <div class="ammo-cal-title">
          <h3>${esc(c.cal)}</h3>
          <div class="ammo-weapons">${c.weapons.map(w => `<span class="mini">${esc(w)}</span>`).join('')}</div>
        </div>
        <span class="ammo-flag ${c.full ? 'ok' : 'warn'}">${c.full ? '梯子完整' : '部分收录'}</span>
      </div>
      <p class="ammo-note">${esc(c.note)}</p>
      <div class="tbl-wrap">
        <table>
          <thead><tr><th>型号</th><th>穿透</th><th>类型</th><th>肉伤系数</th><th>甲伤</th><th>获取</th><th>说明</th></tr></thead>
          <tbody>
            ${c.rounds.map(r => `
              <tr>
                <td><b>${esc(r.name)}</b></td>
                <td>${penBadge(r.pen)}</td>
                <td style="font-size:12.5px;color:var(--txt-2)">${esc(r.kind)}</td>
                <td class="num">${esc(r.flesh)}</td>
                <td class="num">${esc(r.admg)}</td>
                <td style="font-size:12px;color:var(--txt-3)">${esc(r.src)}</td>
                <td style="font-size:12.5px;color:var(--txt-2)">${esc(r.note)}</td>
              </tr>`).join('')}
          </tbody>
        </table>
      </div>
    </div>`).join('');
}

/* 选弹测甲：选中一发弹 → 对 1-6 级护甲逐档结算 */
function initAmmoPick(selId, outId) {
  const sel = document.getElementById(selId);
  const out = document.getElementById(outId);
  if (!sel || !out) return;

  sel.innerHTML = AMMO.map(c =>
    '<optgroup label="' + esc(c.cal) + '">' +
    c.rounds.map(r => '<option value="' + esc(c.cal) + '|' + esc(r.name) + '">' + esc(c.cal) + ' · ' + esc(r.name) + '（' + r.pen + ' 级穿透）</option>').join('') +
    '</optgroup>').join('');

  /* 每档护甲的代表作：优先「推荐」标记，否则取耐久最高（与首页速览条同一逻辑） */
  const pickTop = tier => {
    const list = ARMORS.filter(a => a.tier === tier);
    return list.find(x => x.best) || [...list].sort((a, b) => b.dur - a.dur)[0];
  };

  function run() {
    const parts = sel.value.split('|');
    const c = AMMO.find(x => x.cal === parts[0]);
    const r = c.rounds.find(x => x.name === parts[1]);
    const B = AMMO_BASELINE;
    const pc = penColor(r.pen);

    const rows = TIERS.map(t => {
      const a = pickTop(t.tier);
      const res = calcPen(B.flesh, B.armor, r.pen, t.tier, a.dur);
      const info = penCellInfo(res.diff);
      const cls = res.diff >= 1 ? 'var(--ok)' : res.diff === 0 ? 'var(--warn)' : 'var(--no)';
      return `<tr>
        <td>${iconMini(a.name, 'armor', t.tier)}<b>${esc(a.name)}</b><div style="font-size:11.5px;color:var(--txt-3);padding-left:25px">${t.tier} 级 · 满耐久 ${a.dur}</div></td>
        <td><span class="badge ${info.cls}">${esc(info.short)}</span></td>
        <td class="num">${res.A.toFixed(1)}</td>
        <td class="num" style="color:${cls}">${res.flesh.toFixed(1)}</td>
        <td class="num">${res.breakNow ? '<span style="color:var(--no)">本枪碎甲</span>' : res.shots + ' 枪'}</td>
      </tr>`;
    }).join('');

    out.innerHTML = `
      <div class="res-main" style="margin-bottom:16px">
        <h4>当前选中</h4>
        <div style="display:flex;align-items:center;gap:14px;flex-wrap:wrap">
          <div class="ico-tile" style="color:${pc};background:color-mix(in srgb, ${pc} 12%, transparent);border-color:color-mix(in srgb, ${pc} 34%, transparent)">${glyphSvg(c.glyph)}</div>
          <div>
            <div style="font-size:18px;font-weight:800">${esc(c.cal)} · ${esc(r.name)}</div>
            <div style="font-size:12.5px;color:var(--txt-2);margin-top:2px">${esc(r.kind)} · 肉伤系数 ${esc(r.flesh)} · 甲伤 ${esc(r.admg)} · ${esc(r.src)}</div>
          </div>
          <div style="margin-left:auto">${penBadge(r.pen)}</div>
        </div>
        <p class="res-explain" style="margin-top:12px">换算基准：基础肉伤 <code>${B.flesh}</code> / 基础甲伤 <code>${B.armor}</code>，目标取每档代表作满耐久状态。实际肉伤 / 甲伤随枪械浮动，精确换算请用下方计算器。</p>
      </div>
      <div class="tbl-wrap"><table>
        <thead><tr><th>目标护甲（代表作）</th><th>穿透判定</th><th>每枪甲伤</th><th>每枪肉伤</th><th>破甲所需</th></tr></thead>
        <tbody>${rows}</tbody>
      </table></div>`;
  }

  sel.addEventListener('change', run);
  run();
}

/* ---------- 对枪沙盘 ---------- */

const SIM_SIDES = [
  { key: 'me',  title: '我方', accent: 'var(--ok)' },
  { key: 'foe', title: '敌方', accent: 'var(--no)' }
];

function simDefaults() {
  return {
    me:  { armor: 'MK-2 战术背心', helmet: 'GT1 战术头盔', ammo: '5.56×45mm|M855A1', flesh: 40, armorDmg: 40, rpm: 600 },
    foe: { armor: '泰坦防弹装甲', helmet: 'GN 重型头盔', ammo: '7.62×39mm|BP', flesh: 40, armorDmg: 40, rpm: 600 }
  };
}

function simFindArmor(name)  { return ARMORS.find(a => a.name === name) || ARMORS[0]; }
function simFindHelmet(name) { return HELMETS.find(h => h.name === name) || HELMETS[0]; }
/* 返回带口径信息的弹药对象（含 glyph，用于配装速览条） */
function simFindAmmo(v) {
  const parts = String(v).split('|');
  const c = AMMO.find(x => x.cal === parts[0]);
  const r = c && c.rounds.find(x => x.name === parts[1]);
  if (!r) return Object.assign({ cal: AMMO[0].cal, glyph: AMMO[0].glyph }, AMMO[0].rounds[0]);
  return Object.assign({ cal: c.cal, glyph: c.glyph }, r);
}

/* 生成一侧配装卡片 */
function simBuildCard(side, cfg) {
  const armorOpts = TIERS.map(t =>
    '<optgroup label="' + t.tier + ' 级 ' + t.name + '">' +
    ARMORS.filter(a => a.tier === t.tier).map(a =>
      '<option value="' + esc(a.name) + '"' + (a.name === cfg.armor ? ' selected' : '') + '>' + esc(a.name) + '（' + a.dur + ' 耐久）</option>').join('') +
    '</optgroup>').join('');
  const helmetOpts = TIERS.map(t =>
    '<optgroup label="' + t.tier + ' 级 ' + t.name + '">' +
    HELMETS.filter(h => h.tier === t.tier).map(h =>
      '<option value="' + esc(h.name) + '"' + (h.name === cfg.helmet ? ' selected' : '') + '>' + esc(h.name) + '（' + h.dur + ' 耐久）</option>').join('') +
    '</optgroup>').join('');
  const ammoOpts = AMMO.map(c =>
    '<optgroup label="' + esc(c.cal) + '">' +
    c.rounds.map(r => '<option value="' + esc(c.cal) + '|' + esc(r.name) + '"' + (cfg.ammo === c.cal + '|' + r.name ? ' selected' : '') + '>' + esc(c.cal) + ' · ' + esc(r.name) + '（' + r.pen + ' 级）</option>').join('') +
    '</optgroup>').join('');

  return `
    <div class="card">
      <div class="eyebrow" style="color:${side.accent}">${side.title}配装</div>
      <div class="sim-loadout" id="${side.key}Strip"></div>
      <div class="field" style="margin-top:14px">
        <label for="${side.key}Armor">防弹衣</label>
        <select id="${side.key}Armor">${armorOpts}</select>
      </div>
      <div class="field">
        <label for="${side.key}Helmet">头盔</label>
        <select id="${side.key}Helmet">${helmetOpts}</select>
      </div>
      <div class="field">
        <label for="${side.key}Ammo">弹药</label>
        <select id="${side.key}Ammo">${ammoOpts}</select>
      </div>
      <div style="display:grid;grid-template-columns:1fr 1fr;gap:10px">
        <div class="field">
          <label for="${side.key}Flesh">枪械基础肉伤</label>
          <input type="number" id="${side.key}Flesh" value="${cfg.flesh}" min="1" step="1">
        </div>
        <div class="field">
          <label for="${side.key}ArmorDmg">枪械基础甲伤</label>
          <input type="number" id="${side.key}ArmorDmg" value="${cfg.armorDmg}" min="1" step="1">
        </div>
      </div>
      <div class="field">
        <label for="${side.key}Rpm">射速 RPM（选填，用于估算 TTK）</label>
        <input type="number" id="${side.key}Rpm" value="${cfg.rpm}" min="60" step="1">
      </div>
      <div class="field" style="margin-bottom:0">
        <div class="hint">肉伤 / 甲伤填武器面板数值（例：SCAR-H 为 40 / 40），弹系数由所选弹药决定；部位倍率由下方「弹着部位」统一控制。</div>
      </div>
    </div>`;
}

/* 读取一侧配置 */
function simReadCard(side) {
  return {
    armor: simFindArmor(document.getElementById(side.key + 'Armor').value),
    helmet: simFindHelmet(document.getElementById(side.key + 'Helmet').value),
    ammo: simFindAmmo(document.getElementById(side.key + 'Ammo').value),
    flesh: Math.max(1, +document.getElementById(side.key + 'Flesh').value || 40),
    armorDmg: Math.max(1, +document.getElementById(side.key + 'ArmorDmg').value || 40),
    rpm: Math.max(60, +document.getElementById(side.key + 'Rpm').value || 600)
  };
}

/* 逐枪模拟：atk 开火 → def 承伤，弹着点固定在同一部位 */
function simSequence(atk, def, part) {
  const F0 = atk.flesh * part.mult;   // 每枪基础肉伤（含部位倍率）
  const A0 = atk.armorDmg;            // 每枪基础甲伤（不乘部位倍率）
  const armor = part.armored === 'helmet' ? def.helmet : part.armored === 'armor' ? def.armor : null;
  let dur = armor ? armor.dur : 0;
  let hp = SIM.hp;
  const log = [];
  let breakShot = null, downShot = null;

  for (let i = 1; i <= 60 && hp > 0; i++) {
    let flesh, admg = 0;
    const before = dur;
    const armoredNow = !!(armor && dur > 0);
    if (armoredNow) {
      const r = calcPen(F0, A0, atk.ammo.pen, armor.tier, dur);
      flesh = r.flesh;
      admg = r.A;
      dur = Math.max(0, dur - r.A);
      if (breakShot === null && dur <= 0) breakShot = i;
    } else {
      flesh = F0;
    }
    hp = Math.max(0, hp - flesh);
    log.push({ n: i, armoredNow, before, after: dur, admg, flesh, hp });
    if (hp <= 0 && downShot === null) downShot = i;
  }
  return { log, breakShot, downShot };
}

/* 一侧结果卡：汇总 + 逐枪明细 */
function simResultCard(side, res, part, armorObj) {
  const ttk = res.downShot ? ((res.downShot - 1) * 60 / side.rpm).toFixed(2) : null;
  const downTxt = res.downShot ? res.downShot + ' 枪' : '60 枪内未击倒';
  const rows = res.log.slice(0, 24).map(s => `
    <tr${s.hp <= 0 ? ' style="background:color-mix(in srgb, var(--no) 10%, transparent)"' : ''}>
      <td class="num">${s.n}</td>
      <td>${s.armoredNow
        ? `<span class="num" style="font-size:12.5px">${s.before} → ${s.after}</span>${s.after === 0 ? ' <span class="badge r">碎甲</span>' : ''}`
        : '<span class="badge n">无防护</span>'}</td>
      <td class="num">${s.admg ? s.admg.toFixed(1) : '—'}</td>
      <td class="num" style="color:${s.flesh > 0 ? 'var(--no)' : 'var(--txt-3)'}">${s.flesh.toFixed(1)}</td>
      <td class="num">${s.hp}</td>
    </tr>`).join('');

  return `
    <div class="res-main">
      <h4 style="color:${side.accent}">${side.title}· 击倒对方</h4>
      <div class="res-grid" style="grid-template-columns:repeat(3,1fr)">
        <div><b style="font-size:22px;color:${side.accent}">${downTxt}</b><span>击倒对方</span></div>
        <div><b style="font-size:22px">${res.breakShot ? '第 ' + res.breakShot + ' 枪' : '未破甲'}</b><span>护甲破碎</span></div>
        <div><b style="font-size:22px">${ttk ? ttk + 's' : '—'}</b><span>TTK 估算</span></div>
      </div>
      <p class="res-explain">目标：<code>${esc(armorObj ? armorObj.name + '（' + armorObj.dur + ' 耐久）' : '无防护部位')}</code> · ${part.name} ×${part.mult} · 弹药 <code>${esc(side.ammo.cal + ' ' + side.ammo.name)}</code>（${side.ammo.pen} 级穿透）· 基础肉伤 <code>${side.flesh}</code></p>
    </div>
    <div class="tbl-wrap" style="margin-top:14px">
      <table>
        <thead><tr><th>枪序</th><th>护甲耐久</th><th>本枪甲伤</th><th>本枪肉伤</th><th>剩余血量</th></tr></thead>
        <tbody>${rows}</tbody>
      </table>
    </div>
    ${res.log.length > 24 ? '<p style="font-size:12px;color:var(--txt-3);margin-top:8px">明细仅展示前 24 枪，此后每枪均按无防护全额结算。</p>' : ''}`;
}

function initSim() {
  const meBox = document.getElementById('simMe');
  const foeBox = document.getElementById('simFoe');
  const partSel = document.getElementById('simPart');
  const out = document.getElementById('simOut');
  if (!meBox || !foeBox || !out) return;

  const defaults = simDefaults();
  meBox.innerHTML = simBuildCard(SIM_SIDES[0], defaults.me);
  foeBox.innerHTML = simBuildCard(SIM_SIDES[1], defaults.foe);

  partSel.innerHTML = PART_MULT.map(p => `<option value="${p.id}">${p.name}（×${p.mult}）</option>`).join('');

  /* 配装速览条：护甲 / 头盔 / 弹药三枚图标 */
  function strip(side) {
    const cfg = simReadCard(side);
    const box = document.getElementById(side.key + 'Strip');
    if (!box) return;
    box.innerHTML = `
      <span class="sim-chip" title="${esc(cfg.armor.name)}">${iconMini(cfg.armor.name, 'armor', cfg.armor.tier)}<b>${esc(cfg.armor.name)}</b></span>
      <span class="sim-chip" title="${esc(cfg.helmet.name)}">${iconMini(cfg.helmet.name, 'helmet', cfg.helmet.tier)}<b>${esc(cfg.helmet.name)}</b></span>
      <span class="sim-chip" title="${esc(cfg.ammo.cal + ' ' + cfg.ammo.name)}">${glyphSvg(cfg.ammo.glyph)}<b>${esc(cfg.ammo.name)} · ${cfg.ammo.pen}级</b></span>`;
  }

  function run() {
    const part = PART_MULT.find(p => p.id === partSel.value) || PART_MULT[0];
    const me = simReadCard(SIM_SIDES[0]);
    const foe = simReadCard(SIM_SIDES[1]);
    strip(SIM_SIDES[0]); strip(SIM_SIDES[1]);

    /* 敌方开火打我方 / 我方开火打敌方 */
    const meTaken = simSequence(foe, me, part);
    const foeTaken = simSequence(me, foe, part);

    let verdict, vColor;
    /* downShot 为空 = 60 枪内打不倒，视作极差的一端参与比较 */
    const a = meTaken.downShot || Infinity;
    const b = foeTaken.downShot || Infinity;
    const meTxt = meTaken.downShot ? meTaken.downShot + ' 枪' : '60 枪内';
    const foeTxt = foeTaken.downShot ? foeTaken.downShot + ' 枪' : '60 枪内';
    if (a > b) {
      verdict = `我方占优：能扛住敌方 ${meTxt}，而 ${foeTxt}就能击倒对方。`;
      vColor = 'var(--ok)';
    } else if (a < b) {
      verdict = `敌方占优：我方 ${meTxt}就被击倒，而打倒对方需要 ${foeTxt}。`;
      vColor = 'var(--no)';
    } else if (a === Infinity) {
      verdict = '双方在 60 枪内都无法击倒对方——检查一下是不是弹药穿透等级低于对方护甲等级，且弹着部位被护甲完整覆盖。';
      vColor = 'var(--warn)';
    } else {
      verdict = `势均力敌：双方都需要 ${meTxt}才能击倒对方，胜负取决于先手与命中部位。`;
      vColor = 'var(--warn)';
    }
    if (part.id === 'limb') {
      verdict += ' 四肢不受任何护甲保护——这一枪位的胜负只取决于谁的基础肉伤更高。';
    }

    const meArmorObj = part.armored === 'armor' ? me.armor : part.armored === 'helmet' ? me.helmet : null;
    const foeArmorObj = part.armored === 'armor' ? foe.armor : part.armored === 'helmet' ? foe.helmet : null;

    out.innerHTML = `
      <div class="res-main" style="border-left-color:${vColor};margin-bottom:16px">
        <h4>沙盘结论 · ${esc(part.name)}（×${part.mult}）</h4>
        <p style="font-size:15.5px;font-weight:800;color:${vColor};line-height:1.6">${esc(verdict)}</p>
        <p class="res-explain" style="margin-top:10px">${esc(SIM.note)}</p>
      </div>
      <div class="grid g2">
        <div>${simResultCard(Object.assign({}, SIM_SIDES[0], { rpm: me.rpm, ammo: me.ammo, flesh: me.flesh }), foeTaken, part, foeArmorObj)}</div>
        <div>${simResultCard(Object.assign({}, SIM_SIDES[1], { rpm: foe.rpm, ammo: foe.ammo, flesh: foe.flesh }), meTaken, part, meArmorObj)}</div>
      </div>`;
  }

  [SIM_SIDES[0], SIM_SIDES[1]].forEach(side => {
    ['Armor', 'Helmet', 'Ammo', 'Flesh', 'ArmorDmg', 'Rpm'].forEach(k => {
      const elx = document.getElementById(side.key + k);
      if (!elx) return;
      elx.addEventListener('change', run);
      if (elx.tagName === 'INPUT') elx.addEventListener('input', run);
    });
  });
  partSel.addEventListener('change', run);
  run();
}
