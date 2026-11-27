(function () {
  // Mobile nav
  var toggle = document.querySelector(".nav-toggle");
  var nav = document.querySelector(".site-nav");
  if (toggle && nav) {
    var setMenu = function (open) {
      nav.classList.toggle("open", open);
      toggle.setAttribute("aria-expanded", String(open));
    };
    toggle.addEventListener("click", function () { setMenu(!nav.classList.contains("open")); });
    // Escape closes the menu and puts focus back on the button
    document.addEventListener("keydown", function (e) {
      if (e.key === "Escape" && nav.classList.contains("open")) { setMenu(false); toggle.focus(); }
    });
    // A tap outside the header closes it
    document.addEventListener("click", function (e) {
      if (nav.classList.contains("open") && !e.target.closest(".site-header")) setMenu(false);
    });
    // Growing the window to desktop width resets it
    var desktop = window.matchMedia("(min-width: 881px)");
    var reset = function () { if (desktop.matches) setMenu(false); };
    if (desktop.addEventListener) desktop.addEventListener("change", reset); else desktop.addListener(reset);
  }

  // Twinkling stars in hero sections
  document.querySelectorAll(".stars").forEach(function (layer) {
    for (var i = 0; i < 50; i++) {
      var s = document.createElement("i");
      s.style.left = Math.random() * 100 + "%";
      s.style.top = Math.random() * 100 + "%";
      s.style.animationDelay = Math.random() * 3 + "s";
      var size = Math.random() < 0.15 ? 4 : 2;
      s.style.width = s.style.height = size + "px";
      layer.appendChild(s);
    }
  });

  // Pause / play all looping video and animation (WCAG 2.2.2).
  // Starts paused for visitors who ask their device for reduced motion; the choice is remembered.
  var motionButton = document.querySelector(".motion-toggle");
  var saved = null;
  try { saved = localStorage.getItem("ga-motion"); } catch (e) {}
  var reduce = window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  function setMotion(paused, remember) {
    document.documentElement.classList.toggle("motion-paused", paused);
    document.querySelectorAll("video").forEach(function (v) {
      if (paused) { v.pause(); } else { var p = v.play(); if (p && p.catch) p.catch(function () {}); }
    });
    if (motionButton) {
      motionButton.dataset.paused = String(paused);
      motionButton.querySelector("span").textContent = paused ? "Play animations" : "Pause animations";
      motionButton.querySelector("svg").innerHTML = paused
        ? '<path d="M4 2.5v11l9-5.5z" fill="currentColor"/>'
        : '<rect x="3" y="2" width="3.5" height="12" rx="1" fill="currentColor"/><rect x="9.5" y="2" width="3.5" height="12" rx="1" fill="currentColor"/>';
    }
    if (remember) { try { localStorage.setItem("ga-motion", paused ? "paused" : "playing"); } catch (e) {} }
    window.dispatchEvent(new Event("resize"));
  }
  var startPaused = saved ? saved === "paused" : reduce;
  if (startPaused) {
    document.querySelectorAll("video[autoplay]").forEach(function (v) { v.removeAttribute("autoplay"); });
    setMotion(true, false);
  }
  if (motionButton) {
    motionButton.addEventListener("click", function () {
      setMotion(motionButton.dataset.paused !== "true", true);
    });
  }

  // The emblem's silhouette drifts down the page as a soft shadow, crossing from side to side
  // into each section. On the homepage it leaves from the hero emblem; on other pages from the hero.
  // Scroll-linked, so it only moves when the visitor scrolls.
  var heroPortal = document.querySelector(".hero-portal, main > .hero, main > .cat-hero");
  var shadowSections = heroPortal ? [].slice.call(document.querySelectorAll("main > section")).filter(function (s) { return s !== heroPortal; }) : [];
  if (heroPortal && shadowSections.length) {
    document.body.classList.add("has-logo-shadow");
    var shadow = document.createElement("div");
    shadow.className = "logo-shadow";
    shadow.setAttribute("aria-hidden", "true");
    document.body.appendChild(shadow);
    var footer = document.querySelector(".site-footer");
    var sections = shadowSections;
    var emblem = heroPortal.querySelector(".portal");
    var MAX_OPACITY = 0.07;      // keep in step with the contrast check in README (Accessibility)
    var footerLogo = document.querySelector(".footer-logo");
    // Where the emblem sits inside the footer lockup image, and inside the shadow box (measured from the PNGs)
    var EMBLEM_IN_LOCKUP = { x: 0.2183, y: 0.0147, w: 0.5578, h: 0.6905 };
    var EMBLEM_IN_SHADOW = 0.9583;
    // Hidden for reduced motion / paused animations: then the footer logo simply shows as normal
    var shadowActive = function () { return getComputedStyle(shadow).display !== "none"; };
    var ticking = false;

    var place = function () {
      ticking = false;
      var vw = window.innerWidth, vh = window.innerHeight;
      var size = shadow.offsetWidth, sh = shadow.offsetHeight;
      var y = window.scrollY + vh / 2;              // page position at the middle of the screen
      // Each section has a resting spot: alternate right, left, right...
      var stops = sections.map(function (sec, i) {
        var top = sec.offsetTop, h = sec.offsetHeight;
        return { at: top + h / 2, x: i % 2 === 0 ? vw * 0.62 : vw * 0.04 - size * 0.15, rot: i % 2 === 0 ? 10 : -10 };
      });
      var startX = vw * 0.04 - size * 0.15;          // other pages: start on the left
      if (emblem) { var r = emblem.getBoundingClientRect(); startX = r.left + r.width / 2 - size / 2; }
      var start = { at: heroPortal.offsetTop + heroPortal.offsetHeight / 2, x: startX, rot: 0 };
      stops.unshift(start);
      var a = stops[0], b = stops[stops.length - 1];
      for (var i = 0; i < stops.length - 1; i++) {
        if (y >= stops[i].at && y <= stops[i + 1].at) { a = stops[i]; b = stops[i + 1]; break; }
      }
      if (y > stops[stops.length - 1].at) a = b;
      var t = b.at === a.at ? 0 : Math.min(1, Math.max(0, (y - a.at) / (b.at - a.at)));
      t = t * t * (3 - 2 * t);                      // ease in and out between stops
      var x = a.x + (b.x - a.x) * t;
      var rot = a.rot + (b.rot - a.rot) * t;
      var scale = 0.9 + 0.2 * Math.sin(t * Math.PI);
      var ty = vh / 2 - sh / 2;
      // Fade in as the hero leaves the screen
      var heroBottom = heroPortal.getBoundingClientRect().bottom;
      var fadeIn = Math.min(1, Math.max(0, (vh * 0.75 - heroBottom) / (vh * 0.5)));
      var opacity = MAX_OPACITY * fadeIn;
      var morph = 0, handoff = 0;

      // Near the end, the shadow shrinks onto the footer emblem, takes on its colours and becomes it
      if (footerLogo && footerLogo.offsetWidth) {
        var f = footerLogo.getBoundingClientRect();
        var targetW = (f.width * EMBLEM_IN_LOCKUP.w) / EMBLEM_IN_SHADOW;          // shadow width that matches the emblem
        var cx = f.left + f.width * (EMBLEM_IN_LOCKUP.x + EMBLEM_IN_LOCKUP.w / 2);
        var cy = f.top + f.height * (EMBLEM_IN_LOCKUP.y + EMBLEM_IN_LOCKUP.h / 2);
        // 0 while the footer logo is still LEAD px below the screen, 1 once it is fully in view
        var LEAD = vh * 0.45;
        var p = Math.min(1, Math.max(0, (vh + LEAD - f.top) / (f.height * 0.7 + vh * 0.3 + LEAD)));
        var e = p * p * (3 - 2 * p);
        x += (cx - size / 2 - x) * e;
        ty += (cy - sh / 2 - ty) * e;
        rot += (0 - rot) * e;
        scale += (targetW / size - scale) * e;
        morph = Math.min(1, Math.max(0, (e - 0.4) / 0.55));                         // espresso -> logo colours
        opacity += (1 - opacity) * morph;
        handoff = Math.min(1, Math.max(0, (p - 0.9) / 0.1));                         // real footer logo takes over
      }
      shadow.style.transform = "translate(" + x + "px," + ty + "px) rotate(" + rot + "deg) scale(" + scale + ")";
      shadow.style.setProperty("--morph", morph.toFixed(3));
      shadow.style.opacity = String(opacity * (1 - handoff));
      if (footerLogo) footerLogo.style.opacity = shadowActive() ? String(handoff) : "";
    };
    var request = function () { if (!ticking) { ticking = true; requestAnimationFrame(place); } };
    window.addEventListener("scroll", request, { passive: true });
    window.addEventListener("resize", request);
    window.addEventListener("load", request);
    place();
  }

  // Footer year
  document.querySelectorAll("[data-year]").forEach(function (el) {
    el.textContent = new Date().getFullYear();
  });

  // Cat cards
  // Shown until a cat has a real photo
  var PLACEHOLDER = '<img class="placeholder" src="assets/logo-mark.png" alt="" loading="lazy">';

  function esc(str) {
    var d = document.createElement("div");
    d.textContent = str;
    return d.innerHTML;
  }

  // Each cat has its own page: cat.html?c=<slug>, where the slug comes from the name ("Orión" -> "orion")
  function slugOf(cat) {
    return (cat.slug || cat.name).normalize("NFD").replace(/[\u0300-\u036f]/g, "")
      .toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");
  }
  function catUrl(cat) { return "cat.html?c=" + encodeURIComponent(slugOf(cat)); }
  function catPhoto(cat) {
    return cat.photo
      ? '<img src="' + esc(cat.photo) + '" alt="Photo of ' + esc(cat.name) + '" loading="lazy">'
      : PLACEHOLDER;
  }
  function catTags(cat) {
    var tags = cat.traits.map(function (t) { return '<span class="tag">' + esc(t) + "</span>"; }).join("");
    if (cat.status === "pending") tags = '<span class="tag tag--dark">Adoption pending</span>' + tags;
    return tags;
  }
  function catMeta(cat) { return [cat.sex, cat.ageLabel, cat.coat].filter(Boolean).map(esc).join(" · "); }
  function meetUrl(cat) { return "contact.html?subject=" + encodeURIComponent("Adoption inquiry: " + cat.name); }
  function firstName(cat) { return esc(cat.name.split(" ")[0]); }

  function catCard(cat) {
    return (
      '<article class="card cat-card">' +
      '<div class="cat-photo">' + catPhoto(cat) + "</div>" +
      '<div class="cat-body">' +
      '<h3><a class="cat-name" href="' + catUrl(cat) + '">' + esc(cat.name) + "</a></h3>" +
      '<p class="cat-meta">' + catMeta(cat) + "</p>" +
      '<div class="tags">' + catTags(cat) + "</div>" +
      (cat.pairShort ? '<p class="cat-pair">' + esc(cat.pairShort) + "</p>" : "") +
      '<p class="cat-story">' + esc(cat.story) + "</p>" +
      '<div class="cat-actions">' +
      '<a class="btn btn--primary" href="' + meetUrl(cat) + '">Meet ' + firstName(cat) + "</a>" +
      '<a class="cat-more" href="' + catUrl(cat) + '">Read more<span class="sr-only"> about ' + esc(cat.name) + "</span></a>" +
      "</div>" +
      "</div></article>"
    );
  }

  var cats = window.GA_CATS || [];

  var featured = document.getElementById("featured-cats");
  if (featured) {
    featured.innerHTML = cats.filter(function (c) { return c.featured; }).slice(0, 3).map(catCard).join("");
  }

  var list = document.getElementById("cat-list");
  if (list) {
    var render = function (filter) {
      var shown = cats.filter(function (c) { return filter === "all" || c.age === filter; });
      list.innerHTML = shown.length
        ? shown.map(catCard).join("")
        : '<p class="lead">No cats in this group right now — check back soon!</p>';
    };
    document.querySelectorAll(".filters .chip").forEach(function (chip) {
      chip.addEventListener("click", function () {
        document.querySelectorAll(".filters .chip").forEach(function (c) { c.setAttribute("aria-pressed", "false"); });
        chip.setAttribute("aria-pressed", "true");
        render(chip.dataset.filter);
      });
    });
    render("all");
  }

  // Cat profile page (cat.html?c=<slug>)
  var profile = document.getElementById("cat-profile");
  if (profile) {
    var wanted = new URLSearchParams(window.location.search).get("c") || "";
    var cat = cats.filter(function (c) { return slugOf(c) === wanted.toLowerCase(); })[0];
    var crumb = document.getElementById("crumb-name");
    var others = document.getElementById("other-cats");
    if (cat) {
      document.title = cat.name + " | Garras Astrales Collective";
      crumb.textContent = cat.name;
      profile.innerHTML =
        '<div class="cat-profile-photo card">' + catPhoto(cat) + "</div>" +
        '<div class="cat-profile-body">' +
        '<h1>Meet <span class="hl">' + esc(cat.name) + "</span></h1>" +
        '<p class="cat-meta">' + catMeta(cat) + "</p>" +
        '<div class="tags">' + catTags(cat) + "</div>" +
        (cat.pairShort ? '<p class="cat-pair">' + esc(cat.pairShort) + "</p>" : "") +
        '<div class="cat-profile-story"><p>' + esc(cat.story) + "</p>" +
        (cat.pair ? "<p>" + esc(cat.pair) + "</p>" : "") + "</div>" +
        '<div class="btn-row">' +
        '<a class="btn btn--primary" href="' + meetUrl(cat) + '">Meet ' + firstName(cat) + "</a>" +
        '<a class="btn btn--ghost" href="adopt.html">See all cats</a>' +
        "</div></div>";
      // related cats first (same pair note), then the rest
      var rest = cats.filter(function (c) { return c !== cat; });
      rest.sort(function (a, b) { return (b.pair && b.pair === cat.pair) - (a.pair && a.pair === cat.pair); });
      if (rest.length) others.innerHTML = rest.map(catCard).join("");
      else document.getElementById("other-cats-section").hidden = true;
    } else {
      document.title = "Cat not found | Garras Astrales Collective";
      profile.innerHTML =
        '<div class="cat-profile-body"><h1>We couldn\'t find <span class="hl">that cat</span></h1>' +
        '<p class="lead">They may have found their forever home already! Here are the cats still looking.</p></div>';
      others.innerHTML = cats.map(catCard).join("");
    }
  }

  // Prefill contact subject from ?subject=
  var subjectField = document.getElementById("subject");
  if (subjectField) {
    var params = new URLSearchParams(window.location.search);
    if (params.get("subject")) subjectField.value = params.get("subject");
  }

  // Contact form: sends to contact.php without leaving the page.
  // Without JavaScript the form still posts normally and contact.php redirects back.
  var form = document.getElementById("contact-form");
  if (form) {
    var status = document.getElementById("form-status");
    var started = form.querySelector('[name="started"]');
    if (started) started.value = Date.now();

    var params2 = new URLSearchParams(window.location.search);
    if (params2.get("sent")) status.textContent = "Thanks! Your message has been sent. A volunteer will get back to you soon.";
    if (params2.get("error")) status.textContent = "Sorry, something went wrong. Please check the form or email us directly.";

    form.addEventListener("submit", function (e) {
      e.preventDefault();
      var button = form.querySelector('[type="submit"]');
      button.disabled = true;
      status.textContent = "Sending…";
      fetch(form.action, { method: "POST", body: new FormData(form), headers: { Accept: "application/json" } })
        .then(function (r) { return r.json(); })
        .then(function (data) {
          status.textContent = data.message;
          if (data.ok) form.reset();
        })
        .catch(function () {
          status.textContent = "Sorry, the message couldn't be sent. Please email us directly.";
        })
        .finally(function () { button.disabled = false; });
    });
  }
})();
