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
          // keep the panel's header (with its close ✕) below our top bar
          ".sp-panel{top:var(--pp-bar-h,44px) !important}";
        sroot.appendChild(fs);
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
    loadH2C();  // warm the screenshot lib now so it's ready by the time they Send
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
      '</ul>';
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
  // Load html2canvas lazily (once) so the initial viewer stays lean. Resolves to null
  // if it's unavailable — capture is always best-effort and never blocks the comment.
  function loadH2C() {
    if (window.html2canvas) return Promise.resolve(window.html2canvas);
    if (window.__pp_h2c) return window.__pp_h2c;
    window.__pp_h2c = new Promise(function (resolve) {
      if (!d.h2c) return resolve(null);
      var s = document.createElement("script");
      s.src = d.h2c;
      s.onload = function () { resolve(window.html2canvas || null); };
      s.onerror = function () { resolve(null); };
      (document.head || document.documentElement).appendChild(s);
    });
    return window.__pp_h2c;
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

  // Rasterize the visible viewport and stroke a highlight around the pinned element
  // (located live via its cssSelector). Returns a WebP data URL, or null on any failure.
  function capture(cssSelector) {
    return loadH2C().then(function (h2c) {
      if (!h2c) return null;
      var vw = window.innerWidth, vh = window.innerHeight;
      var scale = Math.min(window.devicePixelRatio || 1, 2);
      var target = null;
      try { if (cssSelector) target = document.querySelector(cssSelector); } catch (e) {}
      return h2c(document.documentElement, {
        x: window.scrollX, y: window.scrollY, width: vw, height: vh,
        windowWidth: vw, windowHeight: vh, scale: scale,
        useCORS: true, allowTaint: false, backgroundColor: "#ffffff",
        logging: false, ignoreElements: ignoreEl,
      }).then(function (canvas) {
        if (target) {
          try {
            var r = target.getBoundingClientRect();
            if (r.width > 0 && r.height > 0) {
              var ctx = canvas.getContext("2d");
              ctx.lineWidth = Math.max(2, 3 * scale);
              ctx.strokeStyle = "#ff4b31";
              ctx.fillStyle = "rgba(255,75,49,0.12)";
              var x = r.left * scale, y = r.top * scale, w = r.width * scale, h = r.height * scale;
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

  // Intercept SitePing's create-feedback POST (JSON to /api/widget) and attach a
  // screenshot of the moment. On any hiccup we fall through to the original request.
  var _fetch = window.fetch.bind(window);
  window.fetch = function (input, init) {
    try {
      var url = typeof input === "string" ? input : (input && input.url) || "";
      var method = ((init && init.method) || (input && input.method) || "GET").toUpperCase();
      if (method === "POST" && /\/api\/widget\/?$/.test(url) && init && typeof init.body === "string") {
        var body = null;
        try { body = JSON.parse(init.body); } catch (e) { body = null; }
        if (body && body.annotations && !body.screenshot) {
          var sel = "";
          try { sel = (body.annotations[0] && body.annotations[0].anchor
                       && body.annotations[0].anchor.cssSelector) || ""; } catch (e) {}
          return capture(sel).then(function (shot) {
            if (shot) { body.screenshot = shot; init = Object.assign({}, init, { body: JSON.stringify(body) }); }
            return _fetch(input, init);
          }).catch(function () { return _fetch(input, init); });
        }
      }
    } catch (e) {}
    return _fetch(input, init);
  };
})();
