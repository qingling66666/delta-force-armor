/* ============================================================
 * 《三角洲行动》护甲数据库 — 装饰层脚本
 * ------------------------------------------------------------
 * 只往页面里补三块纯装饰 DOM：
 *   ① 屏幕 HUD 边框（四角括号 + 两侧刻度尺）
 *   ② Hero 校准环水印 + 系统读数
 *   ③ 页脚数据链路状态条
 * 不读写任何数据、不绑定任何事件；样式全在 deco.css。
 * ============================================================ */
(function () {
  'use strict';

  /* ---------- ① 屏幕边框 ---------- */
  var frame = document.createElement('div');
  frame.className = 'hud-frame';
  frame.setAttribute('aria-hidden', 'true');
  frame.innerHTML =
    '<span class="hud-c tl"></span><span class="hud-c tr"></span>' +
    '<span class="hud-c bl"></span><span class="hud-c br"></span>' +
    '<span class="hud-rail l"></span><span class="hud-rail r"></span>';
  document.body.appendChild(frame);

  /* ---------- ② Hero 装饰 ---------- */
  var hero = document.querySelector('.hero');
  if (hero) {
    var deco = document.createElement('div');
    deco.className = 'hero-deco';
    deco.setAttribute('aria-hidden', 'true');
    deco.innerHTML =
      '<svg class="hero-ret" viewBox="0 0 200 200" fill="none">' +
        '<g stroke="currentColor" stroke-width="1">' +
          '<circle cx="100" cy="100" r="78" stroke-dasharray="4 9"/>' +
          '<circle cx="100" cy="100" r="52" opacity=".7"/>' +
          '<circle cx="100" cy="100" r="30" opacity=".45" stroke-dasharray="2 7"/>' +
          '<path d="M100 8v30M100 162v30M8 100h30M162 100h30"/>' +
          '<path d="M100 86v28M86 100h28" opacity=".7"/>' +
          '<path d="M62 62l13 13M138 62l-13 13M62 138l13-13M138 138l-13-13" opacity=".4"/>' +
        '</g>' +
        '<circle cx="100" cy="100" r="2.6" fill="currentColor"/>' +
      '</svg>' +
      '<span class="hero-hud"><i class="dot"></i>System Online · 7 Modules</span>';
    hero.appendChild(deco);
  }

  /* ---------- ③ 页脚状态条 ---------- */
  var fwrap = document.querySelector('.footer .wrap');
  if (fwrap) {
    var chip = document.createElement('span');
    chip.className = 'foot-status';
    chip.innerHTML = '<i class="dot"></i>Tactical Data Link';
    fwrap.insertBefore(chip, fwrap.firstChild);
  }
})();
