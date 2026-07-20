/* ProtoPeek reviewer chrome — a fixed top bar injected into the TOP-LEVEL prototype page.
   SitePing's own launcher is hidden; we drive it from two real buttons in this bar (which
   render reliably everywhere): "＋ Comment" → start an annotation, "☰ Feedback" → toggle
   the comments sidebar (via the captured widget instance window.__pp_sp). We also inject a
   few fixes into SitePing's (patched-open) shadow: 16px inputs so iOS doesn't auto-zoom on
   focus, and a top offset on the panel so its close ✕ clears this bar. A first-run modal
   explains the flow. All dynamic values ride in a JSON island (textContent, never HTML). */
(function () {
  var el = document.getElementById("__pp_bar_data");
  if (!el) return;
  var d;
  try { d = JSON.parse(el.textContent); } catch (e) { return; }

  var host = document.createElement("div");
  host.id = "__pp_host";
  host.style.cssText = "all:initial";
  var root = host.attachShadow({ mode: "open" });

  var style = document.createElement("style");
  style.textContent =
    ".bar{position:fixed;top:0;left:0;right:0;z-index:2147483647;" +
    "font:12px/1.4 ui-monospace,SFMono-Regular,Menlo,monospace;background:#131519;" +
    "color:#e9e7e0;display:flex;align-items:center;gap:8px;padding:6px 10px;" +
    "padding-top:calc(6px + env(safe-area-inset-top,0px));min-height:44px;" +
    "border-bottom:1px solid #2a2e35;box-sizing:border-box}" +
    ".who{color:#ff4b31}.sp{flex:1}.muted{color:#8f96a0}" +
    ".btn{border-radius:7px;padding:9px 13px;font:inherit;font-weight:700;cursor:pointer;" +
    "white-space:nowrap;flex:none;-webkit-tap-highlight-color:transparent}" +
    ".btn-primary{background:#ff4b31;color:#fff;border:0}.btn-primary:active{background:#e23d24}" +
    ".btn-ghost{background:transparent;color:#e9e7e0;border:1px solid #3a3f48}" +
    ".btn-ghost:active,.btn-ghost.on{background:#2a2e35}" +
    "@media(max-width:560px){.who-wrap{display:none}" +
    ".name{max-width:34vw;overflow:hidden;text-overflow:ellipsis;white-space:nowrap}}" +
    /* first-run modal */
    ".ov{position:fixed;inset:0;z-index:2147483647;background:rgba(8,9,11,.72);" +
    "display:flex;align-items:center;justify-content:center;padding:20px;" +
    "font:14px/1.5 -apple-system,system-ui,sans-serif;-webkit-tap-highlight-color:transparent}" +
    ".modal{background:#faf7ef;color:#181510;border:1px solid #d9d2c1;border-radius:14px;" +
    "max-width:400px;width:100%;padding:22px 22px 18px;box-shadow:0 24px 60px rgba(0,0,0,.4)}" +
    ".modal h2{font:700 18px/1.25 -apple-system,system-ui,sans-serif;margin:0 0 4px}" +
    ".modal p{margin:0 0 14px;color:#6c6656;font-size:13.5px}" +
    ".steps{margin:0 0 16px;padding:0;list-style:none}" +
    ".steps li{display:flex;gap:10px;align-items:flex-start;margin:9px 0}" +
    ".steps b{flex:none;width:22px;height:22px;border-radius:50%;background:#ff4b31;color:#fff;" +
    "font:700 12px/22px ui-monospace,monospace;text-align:center}" +
    ".modal .go{display:block;width:100%;background:#ff4b31;color:#fff;border:0;border-radius:9px;" +
    "padding:12px;font:700 15px -apple-system,system-ui,sans-serif;cursor:pointer;margin-top:4px}" +
    ".modal .go:active{background:#e23d24}" +
    /* keyboard-shortcut callout — deliberately oversized, it's the one thing we want
       a first-time reviewer to actually remember */
    ".kbd-hero{display:flex;align-items:center;gap:11px;margin:0 0 16px;padding:13px 15px;" +
    "border:1px solid #d9d2c1;border-radius:10px;background:#fff}" +
    ".kbd-hero .k{flex:none;min-width:38px;height:38px;padding:0 10px;border-radius:8px;" +
    "background:#131519;color:#fff;border-bottom:2px solid #000;" +
    "font:700 20px/38px ui-monospace,SFMono-Regular,Menlo,monospace;text-align:center}" +
    ".kbd-hero span{font-size:14px;color:#181510}" +
    ".kbd-hero b{font-weight:700}" +
    /* animated how-to demo */
    ".demo{position:relative;height:132px;border:1px solid #d9d2c1;border-radius:10px;" +
    "background:#eef2f7;overflow:hidden;margin:0 0 16px}" +
    ".demo .blk{position:absolute;background:#cdd7e3;border-radius:5px}" +
    ".demo .b1{left:14px;top:16px;width:96px;height:44px}" +
    ".demo .b2{left:124px;top:16px;width:120px;height:20px}" +
    ".demo .b3{left:124px;top:44px;width:80px;height:16px}" +
    ".demo .box{position:absolute;left:14px;top:16px;width:96px;height:44px;border:2px solid #ff4b31;" +
    "border-radius:5px;background:rgba(255,75,49,.12);opacity:0;animation:ppbox 4s ease-in-out infinite}" +
    ".demo .cur{position:absolute;width:16px;height:16px;border-radius:50%;background:#131519;" +
    "border:2px solid #fff;box-shadow:0 2px 6px rgba(0,0,0,.35);left:14px;top:16px;" +
    "animation:ppcur 4s ease-in-out infinite}" +
    ".demo .pop{position:absolute;left:60px;top:66px;background:#131519;color:#fff;border-radius:8px;" +
    "padding:6px 9px;font:600 11px ui-monospace,monospace;opacity:0;transform:translateY(4px);" +
    "animation:pppop 4s ease-in-out infinite;white-space:nowrap}" +
    "@keyframes ppcur{0%,8%{left:14px;top:16px}30%{left:104px;top:56px}" +
    "40%,100%{left:104px;top:56px}}" +
    "@keyframes ppbox{0%,8%{opacity:0;width:0;height:0}30%{opacity:1;width:96px;height:44px}" +
    "88%{opacity:1}100%{opacity:0}}" +
    "@keyframes pppop{0%,42%{opacity:0;transform:translateY(4px)}52%,90%{opacity:1;transform:none}" +
    "100%{opacity:0}}";
  root.appendChild(style);

  var bar = document.createElement("div");
  bar.className = "bar";
  var name = document.createElement("strong");
  name.className = "name";
  name.textContent = "◐ " + (d.name || "Prototype");
  bar.appendChild(name);
  if (d.version) {
    var ver = document.createElement("span"); ver.className = "muted"; ver.textContent = d.version;
    bar.appendChild(ver);
  }
  var spacer = document.createElement("span"); spacer.className = "sp"; bar.appendChild(spacer);
  if (d.email) {
    var whoWrap = document.createElement("span"); whoWrap.className = "who-wrap";
    whoWrap.appendChild(document.createTextNode("commenting as "));
    var who = document.createElement("span"); who.className = "who"; who.textContent = d.email;
    whoWrap.appendChild(who); bar.appendChild(whoWrap);
  }
  var fbBtn = mkBtn("☰ Feedback", "btn-ghost", toggleFeedback);
  bar.appendChild(fbBtn);
  bar.appendChild(mkBtn("＋ Comment", "btn-primary", onCommentClick));
  root.appendChild(bar);
  document.documentElement.appendChild(host);

  function raise() { try { document.documentElement.appendChild(host); } catch (e) {} }
  [250, 800, 2000, 4000].forEach(function (ms) { setTimeout(raise, ms); });

  function pad() {
    var h = bar.getBoundingClientRect().height || 44;
    document.documentElement.style.setProperty("--pp-bar-h", h + "px");
    var s = document.getElementById("__pp_bar_pad");
    if (!s) { s = document.createElement("style"); s.id = "__pp_bar_pad";
      (document.head || document.documentElement).appendChild(s); }
    s.textContent = "body{padding-top:" + h + "px !important}";
  }
  pad();
  window.addEventListener("resize", pad);

  function mkBtn(label, cls, handler) {
    var b = document.createElement("button");
    b.type = "button"; b.className = "btn " + cls; b.textContent = label;
    b.addEventListener("click", handler);
    return b;
  }
  function spShadow() { var w = document.querySelector("siteping-widget"); return w && w.shadowRoot; }
  function item(sroot, aria) { return sroot.querySelector('.sp-radial-item[aria-label="' + aria + '"]'); }
  function panelOpen() {
    var sroot = spShadow(); var p = sroot && sroot.querySelector(".sp-panel");
    return !!(p && p.getBoundingClientRect().left < window.innerWidth - 20);
  }

  // Inject viewer fixes into SitePing's (open) shadow once it mounts, and hide its launcher.
  var tries = 0;
  var timer = setInterval(function () {
    tries++;
    var sroot = spShadow();
    if (sroot) {
      if (!sroot.getElementById("__pp_sp_fixes")) {
        var fs = document.createElement("style");
        fs.id = "__pp_sp_fixes";
        fs.textContent =
          ".sp-fab,.sp-radial{opacity:0 !important;pointer-events:none !important}" +
          // 16px so iOS doesn't auto-zoom on the sidebar's search field (in this shadow)
          "input,textarea,select,[contenteditable]{font-size:16px !important}" +
          // Pin the panel between our top bar and the viewport bottom. SitePing hard-codes
          // top:0;height:100vh; nudging top down by the bar height without capping height
          // left the panel 44px too tall — its footer (incl. the Go-to-annotation button at
          // the bottom of the scroll area) hung below the viewport, unreachable, and the
          // overflow showed a stranded scrollbar. top + bottom:0 + height:auto fits it exactly.
          ".sp-panel{top:var(--pp-bar-h,44px) !important;bottom:0 !important;height:auto !important}" +
          // Collapse the two densest detail sections (Details, Annotation) by default so the
          // Go-to-annotation button sits near the top; click a section title to expand. Scoped
          // via :has() to just those sections (they own .sp-detail-meta /
          // .sp-detail-annotation-info). The button is a SIBLING of the annotation rows, so it
          // stays visible when the section is collapsed. Browsers without :has() render
          // everything expanded — same as before, just a longer scroll.
          ".sp-detail-section:has(.sp-detail-meta)>.sp-detail-section-title," +
          ".sp-detail-section:has(.sp-detail-annotation-info)>.sp-detail-section-title" +
          "{cursor:pointer;user-select:none;display:flex;align-items:center;gap:8px}" +
          ".sp-detail-section:has(.sp-detail-meta)>.sp-detail-section-title::after," +
          ".sp-detail-section:has(.sp-detail-annotation-info)>.sp-detail-section-title::after" +
          "{content:'\\25B8';margin-left:auto;opacity:.5;font-size:12px;transition:transform .2s ease}" +
          ".sp-detail-section[data-pp-open]>.sp-detail-section-title::after{transform:rotate(90deg)}" +
          ".sp-detail-section:not([data-pp-open]) .sp-detail-meta," +
          ".sp-detail-section:not([data-pp-open]) .sp-detail-annotation-info{display:none}" +
          // The shortcuts affordance ships as a 24px "?" circle pinned bottom-right, which
          // reads as decoration and got missed. Widen it into a plain text link. The "?"
          // is a text node we can't remove from CSS, so it's zeroed out and the label comes
          // from ::before — ::after is already taken by SitePing's hover tooltip, which the
          // visible label makes redundant, so that's suppressed too.
          ".sp-shortcuts-hint{width:auto !important;height:auto !important;padding:0 !important;" +
          "border:0 !important;border-radius:0 !important;background:transparent !important;" +
          "font-size:0 !important;color:var(--sp-accent) !important}" +
          '.sp-shortcuts-hint::before{content:"Keyboard Shortcuts";font-family:var(--sp-font);' +
          "font-size:12px;font-weight:600;line-height:1;text-decoration:underline;" +
          "text-underline-offset:2px}" +
          ".sp-shortcuts-hint:hover::before{text-decoration-thickness:2px}" +
          ".sp-shortcuts-hint::after{display:none !important}";
        sroot.appendChild(fs);
        ppWatchShortcuts(sroot);
        // Toggle a collapsible detail section when its title is clicked. Delegated on the
        // shadow root (survives SitePing re-rendering the detail on every open). Only
        // sections that actually have collapsible rows respond.
        sroot.addEventListener("click", function (ev) {
          var t = ev.target;
          var title = t && t.closest ? t.closest(".sp-detail-section-title") : null;
          if (!title) return;
          var sec = title.closest(".sp-detail-section");
          if (!sec || !sec.querySelector(".sp-detail-meta,.sp-detail-annotation-info")) return;
          if (sec.hasAttribute("data-pp-open")) sec.removeAttribute("data-pp-open");
          else sec.setAttribute("data-pp-open", "");
        });
      }
      clearInterval(timer);
    } else if (tries > 80) { clearInterval(timer); }
  }, 150);

  function drive(ariaLabel, label) {
    var deadline = Date.now() + 4000;
    (function attempt() {
      var w = document.querySelector("siteping-widget");
      var sroot = w && w.shadowRoot;
      if (!sroot) {
        if (Date.now() < deadline) return setTimeout(attempt, 70);
        if (window.__pp_sp_err) return toast("Overlay error: " + String(window.__pp_sp_err).slice(0, 220));
        return toast(window.SitePing ? "Overlay didn't mount — please reload."
                                     : "Overlay script didn't load — please reload.");
      }
      var fab = sroot.querySelector(".sp-fab");
      if (!fab) { if (Date.now() < deadline) return setTimeout(attempt, 70);
        return toast("Comment tool unavailable — please reload."); }
      fab.click();
      setTimeout(function () {
        var it = item(sroot, ariaLabel);
        if (it) it.click();
        else toast("Couldn't open “" + label + "” — tap again or reload.");
      }, 200);
    })();
  }

  function toggleFeedback() {
    var open = panelOpen();
    if (window.__pp_sp && typeof window.__pp_sp.open === "function") {
      open ? window.__pp_sp.close() : window.__pp_sp.open();
    } else {
      drive("Show sidebar", "Feedback"); // fallback
    }
    setTimeout(function () { fbBtn.classList.toggle("on", panelOpen()); }, 250);
  }

  // Once per prototype (not once globally) — a reviewer sees the intro the first time
  // they open each prototype.
  var INTRO_KEY = "pp_intro_" + (d.uuid || "x");
  function onCommentClick() {
    loadShotLib();  // warm the screenshot lib now so it's ready by the time they Send
    var seen;
    try { seen = localStorage.getItem(INTRO_KEY); } catch (e) { seen = "1"; }
    if (seen) return drive("Create new annotation", "Comment");
    showIntro();
  }

  function showIntro() {
    var ov = document.createElement("div"); ov.className = "ov";
    var m = document.createElement("div"); m.className = "modal";
    m.innerHTML =
      '<h2>Leave feedback on this prototype</h2>' +
      '<p>Point at anything on the page and drop a note — the team pulls it back in one place.</p>' +
      '<div class="demo"><div class="blk b1"></div><div class="blk b2"></div><div class="blk b3"></div>' +
      '<div class="box"></div><div class="cur"></div><div class="pop">＋ your note</div></div>' +
      '<ul class="steps">' +
      '<li><b>1</b><span>Tap <strong>＋ Comment</strong>, then <strong>draw a box</strong> around what you mean.</span></li>' +
      '<li><b>2</b><span>Pick a type (question / change / bug), type your note, and <strong>Send</strong>.</span></li>' +
      '<li><b>3</b><span>Tap <strong>☰ Feedback</strong> anytime to see every comment.</span></li>' +
      '</ul>' +
      '<div class="kbd-hero"><span class="k">C</span>' +
      '<span>Press <b>C</b> anytime to start a comment — <b>F</b> opens the feedback panel.</span></div>';
    var go = document.createElement("button"); go.className = "go"; go.textContent = "Got it — start commenting";
    go.addEventListener("click", function () {
      try { localStorage.setItem(INTRO_KEY, "1"); } catch (e) {}
      ov.remove();
      drive("Create new annotation", "Comment");
    });
    m.appendChild(go); ov.appendChild(m);
    ov.addEventListener("click", function (e) { if (e.target === ov) ov.remove(); });
    root.appendChild(ov);
  }

  // ── Keyboard shortcuts ──────────────────────────────────────────────────────
  // C = new comment, F = toggle the feedback panel. SitePing's own shortcuts (J/K/R/D/
  // F//X/?/Esc) are bound on its shadow root and stopPropagation() the keys they consume,
  // so they win whenever focus is inside the widget and these never double-fire. That
  // does mean F focuses the panel's search while you're in the panel, and toggles the
  // panel when focus is on the page — each correct in its own context.
  // The F row sits above SitePing's own "F / — Focus search", so it says where it applies:
  // without that, the overlay lists F twice and reads like a bug.
  var PP_KEYS = [
    { key: "C", label: "New comment" },
    { key: "F", label: "Toggle feedback panel (from the page)" },
  ];

  // Add our keys to SitePing's shortcuts overlay. The overlay is rebuilt on each open, so
  // watch the shadow root rather than injecting once; the marker attribute keeps repeat
  // observations idempotent.
  function ppWatchShortcuts(sroot) {
    function fill() {
      var grid = sroot.querySelector(".sp-shortcuts-grid");
      if (!grid || grid.hasAttribute("data-pp-keys")) return;
      grid.setAttribute("data-pp-keys", "");
      for (var i = PP_KEYS.length - 1; i >= 0; i--) {
        var row = document.createElement("div");
        row.className = "sp-shortcuts-row";
        var keys = document.createElement("div");
        keys.className = "sp-shortcuts-keys";
        var kbd = document.createElement("span");
        kbd.className = "sp-kbd";
        kbd.textContent = PP_KEYS[i].key;
        keys.appendChild(kbd);
        var desc = document.createElement("span");
        desc.className = "sp-shortcuts-desc";
        desc.textContent = PP_KEYS[i].label;
        row.appendChild(keys); row.appendChild(desc);
        grid.insertBefore(row, grid.firstChild);
      }
    }
    fill();
    new MutationObserver(fill).observe(sroot, { childList: true, subtree: true });
  }

  // Mirror SitePing's own guards: never steal a key the reviewer is typing into a field
  // (the prototype may have its own forms), and leave modified chords alone.
  function typingContext(ev) {
    var t = (ev.composedPath && ev.composedPath()[0]) || ev.target;
    if (!t) return false;
    var tag = t.tagName && t.tagName.toLowerCase();
    return tag === "input" || tag === "textarea" || tag === "select" || !!t.isContentEditable;
  }
  document.addEventListener("keydown", function (ev) {
    if (ev.ctrlKey || ev.altKey || ev.metaKey) return;
    if (typingContext(ev)) return;
    if (root.querySelector(".ov")) return;  // intro modal is up; it has its own button
    var k = (ev.key || "").toLowerCase();
    if (k === "c") { ev.preventDefault(); onCommentClick(); }
    else if (k === "f") { ev.preventDefault(); toggleFeedback(); }
  });

  function toast(msg) {
    var t = document.createElement("div"); t.textContent = msg;
    t.style.cssText =
      "position:fixed;left:50%;top:calc(56px + env(safe-area-inset-top,0px));" +
      "transform:translateX(-50%);z-index:2147483647;max-width:92vw;background:#2a2e35;color:#e9e7e0;" +
      "border:1px solid #ff4b31;border-radius:8px;padding:10px 14px;" +
      "font:12px/1.4 ui-monospace,SFMono-Regular,Menlo,monospace;box-shadow:0 8px 24px rgba(0,0,0,.4)";
    root.appendChild(t); setTimeout(function () { t.remove(); }, 6000);
  }

  // ── Screenshot capture ─────────────────────────────────────────────────────
  // Load the capture library lazily (once) so the initial viewer stays lean. Resolves to
  // null if it's unavailable — capture is always best-effort and never blocks the comment.
  //
  // modern-screenshot, not html2canvas. html2canvas reimplements CSS painting in JS, so
  // any property it doesn't know about is dropped *silently*: a conic-gradient ring came
  // back as an empty box while the rest of the page rendered fine, and nothing in the
  // payload said anything was missing. The agent then reasons about a page with a hole in
  // it. modern-screenshot serializes into an SVG <foreignObject> and lets the browser
  // paint, so fidelity is whatever the reviewer's own engine does.
  function loadShotLib() {
    if (window.modernScreenshot) return Promise.resolve(window.modernScreenshot);
    if (window.__pp_shotlib) return window.__pp_shotlib;
    window.__pp_shotlib = new Promise(function (resolve) {
      if (!d.shotlib) return resolve(null);
      var s = document.createElement("script");
      s.src = d.shotlib;
      s.onload = function () { resolve(window.modernScreenshot || null); };
      s.onerror = function () { resolve(null); };
      (document.head || document.documentElement).appendChild(s);
    });
    return window.__pp_shotlib;
  }

  // Skip our own chrome + SitePing's UI so the shot shows only the prototype.
  function ignoreEl(el) {
    if (!el || !el.tagName) return false;
    if (el.id === "__pp_host") return true;
    if (el.tagName === "SITEPING-WIDGET") return true;
    if (el.hasAttribute && el.hasAttribute("data-siteping-ignore")) return true;
    if (el.dataset && "sitepingIgnore" in el.dataset) return true;
    return false;
  }

  // Inverted from html2canvas's ignoreElements: modern-screenshot keeps what returns true.
  function keepEl(node) { return !ignoreEl(node); }

  // Rasterize the visible viewport and stroke a highlight around the region the reviewer
  // actually dragged. Returns a WebP data URL, or null on any failure.
  //
  // `rect` is SitePing's box for the drag, stored as fractions OF THE RESOLVED ELEMENT,
  // not of the viewport — its So() computes xPct=(drag.x-el.x)/el.width. So we re-project
  // it through the element's live rect to get viewport coordinates. Highlighting the
  // element's own box instead (what this used to do) is badly wrong whenever the drag
  // resolves to a coarse ancestor: a box drawn around one card inside <main> came back
  // with the entire column stroked. Missing/degenerate rect → whole element, which is
  // also what SitePing sends ({0,0,1,1}) when there was no drag.
  function capture(cssSelector, rect) {
    return loadShotLib().then(function (ms) {
      if (!ms || !ms.domToCanvas) return null;
      var vw = window.innerWidth, vh = window.innerHeight;
      var scale = Math.min(window.devicePixelRatio || 1, 2);
      var target = null;
      try { if (cssSelector) target = document.querySelector(cssSelector); } catch (e) {}
      // modern-screenshot has no x/y crop, so shift the clone by the scroll offset and
      // render a viewport-sized canvas. Rendering the full document and cropping also
      // works, but a long prototype would blow past the browser's max canvas dimension —
      // and a capture is viewport-only by definition anyway.
      return ms.domToCanvas(document.documentElement, {
        width: vw, height: vh, scale: scale, backgroundColor: "#ffffff",
        style: {
          transform: "translate(" + -window.scrollX + "px," + -window.scrollY + "px)",
          transformOrigin: "top left",
        },
        filter: keepEl,
      }).then(function (canvas) {
        if (target) {
          try {
            var r = target.getBoundingClientRect();
            if (r.width > 0 && r.height > 0) {
              var bx = r.left, by = r.top, bw = r.width, bh = r.height;
              if (rect && rect.wPct > 0 && rect.hPct > 0) {
                bx = r.left + (rect.xPct || 0) * r.width;
                by = r.top + (rect.yPct || 0) * r.height;
                bw = rect.wPct * r.width;
                bh = rect.hPct * r.height;
              }
              var ctx = canvas.getContext("2d");
              ctx.lineWidth = Math.max(2, 3 * scale);
              ctx.strokeStyle = "#ff4b31";
              ctx.fillStyle = "rgba(255,75,49,0.12)";
              var x = bx * scale, y = by * scale, w = bw * scale, h = bh * scale;
              ctx.fillRect(x, y, w, h); ctx.strokeRect(x, y, w, h);
            }
          } catch (e) {}
        }
        var out = canvas, maxEdge = Math.max(canvas.width, canvas.height);
        if (maxEdge > 1600) {
          var k = 1600 / maxEdge, c2 = document.createElement("canvas");
          c2.width = Math.round(canvas.width * k); c2.height = Math.round(canvas.height * k);
          c2.getContext("2d").drawImage(canvas, 0, 0, c2.width, c2.height);
          out = c2;
        }
        try { return out.toDataURL("image/webp", 0.72); } catch (e) { return null; }
      });
    }).catch(function () { return null; });
  }

  // ── Hide "orphan" markers whose anchor isn't currently on screen ─────────────
  // SitePing positions every marker in document coordinates inside #siteping-markers.
  // When an annotation's anchor is connected but not rendered — e.g. it lives on a
  // hidden screen of a multi-screen prototype, so getBoundingClientRect() is all zeros —
  // SitePing still shows the marker, at (scrollX-13, scrollY-13): the top-left corner.
  // They pile at the left edge and slide with the page as you scroll. We know each
  // marker's feedback id (data-feedback-id) and the annotation's CSS selector (sniffed
  // from the widget list response below), so we hide any marker whose anchor doesn't
  // render a box. Fail-safe: unknown selector → marker left exactly as SitePing placed it.
  // Debounce with setTimeout, NOT requestAnimationFrame: rAF is paused while the tab is
  // backgrounded, which would strand the fixup (and its pending flag) until refocus.
  var ppFixTimer = 0;
  function schedulePpFix() {
    if (ppFixTimer) return;
    ppFixTimer = setTimeout(function () { ppFixTimer = 0; ppFixMarkers(); }, 50);
  }
  function ppFixMarkers() {
    var cont = document.getElementById("siteping-markers");
    var map = window.__pp_anchors;
    if (!cont || !map) return;
    var nodes = cont.querySelectorAll("[data-feedback-id]");
    for (var i = 0; i < nodes.length; i++) {
      var el = nodes[i];
      var sel = map[el.getAttribute("data-feedback-id")];
      if (!sel) { el.classList.remove("pp-orphan"); continue; }
      var anchor = null;
      try { anchor = document.querySelector(sel); } catch (e) { anchor = null; }
      var vis = false;
      if (anchor) {
        var r = anchor.getClientRects();
        vis = r.length > 0 && (r[0].width > 0 || r[0].height > 0);
      }
      // Only touch the class when it actually changes, so our own mutation never
      // re-triggers the body observer below (infinite loop guard).
      if (el.classList.contains("pp-orphan") === vis) el.classList.toggle("pp-orphan", !vis);
    }
  }
  var ppOStyle = document.createElement("style");
  ppOStyle.textContent = "#siteping-markers .pp-orphan{display:none !important}";
  (document.head || document.documentElement).appendChild(ppOStyle);
  // Re-check whenever SitePing repositions markers (it rewrites their inline styles) or
  // adds/removes them. We toggle a class, not a style, so this never re-triggers itself.
  var ppMarkerObs = new MutationObserver(schedulePpFix);
  function ppWatchMarkers() {
    var cont = document.getElementById("siteping-markers");
    if (!cont) return false;
    ppMarkerObs.observe(cont, { childList: true, subtree: true, attributes: true, attributeFilter: ["style"] });
    schedulePpFix();
    return true;
  }
  if (!ppWatchMarkers()) {
    var ppw = setInterval(function () { if (ppWatchMarkers()) clearInterval(ppw); }, 200);
    setTimeout(function () { clearInterval(ppw); }, 15000);
  }
  // Also re-check on any prototype DOM change (a screen switch that shows/hides anchored
  // elements), so we don't depend on SitePing's own (idle-callback) reposition firing.
  new MutationObserver(schedulePpFix).observe(document.body, {
    childList: true, subtree: true, attributes: true, attributeFilter: ["style", "class", "hidden"],
  });
  window.addEventListener("scroll", schedulePpFix, { passive: true, capture: true });
  window.addEventListener("resize", schedulePpFix, { passive: true });

  // Intercept SitePing's create-feedback POST (JSON to /api/widget) and attach a
  // screenshot of the moment. On any hiccup we fall through to the original request.
  // We also sniff the GET list response to learn each feedback's anchor selector (used
  // by the orphan-marker fixup above).
  var _fetch = window.fetch.bind(window);
  window.fetch = function (input, init) {
    try {
      var url = typeof input === "string" ? input : (input && input.url) || "";
      var method = ((init && init.method) || (input && input.method) || "GET").toUpperCase();
      if (method === "GET" && /\/api\/widget\b/.test(url)) {
        return _fetch(input, init).then(function (resp) {
          try {
            resp.clone().json().then(function (data) {
              var list = data && (data.feedbacks || (Array.isArray(data) ? data : null));
              if (!list || !list.length) return;
              var map = window.__pp_anchors || (window.__pp_anchors = {});
              for (var i = 0; i < list.length; i++) {
                var f = list[i];
                var sel = f && f.annotations && f.annotations[0] && f.annotations[0].cssSelector;
                if (f && f.id != null && sel) map[String(f.id)] = sel;
              }
              schedulePpFix();
            }).catch(function () {});
          } catch (e) {}
          return resp;
        });
      }
      if (method === "POST" && /\/api\/widget\/?$/.test(url) && init && typeof init.body === "string") {
        var body = null;
        try { body = JSON.parse(init.body); } catch (e) { body = null; }
        if (body && body.annotations && !body.screenshot) {
          var sel = "", rect = null;
          try {
            var a0 = body.annotations[0];
            sel = (a0 && a0.anchor && a0.anchor.cssSelector) || "";
            rect = (a0 && a0.rect) || null;
          } catch (e) {}
          return capture(sel, rect).then(function (shot) {
            if (shot) { body.screenshot = shot; init = Object.assign({}, init, { body: JSON.stringify(body) }); }
            return _fetch(input, init);
          }).catch(function () { return _fetch(input, init); });
        }
      }
    } catch (e) {}
    return _fetch(input, init);
  };
})();
