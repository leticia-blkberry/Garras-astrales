(function () {
  // Mobile nav
  var toggle = document.querySelector(".nav-toggle");
  var nav = document.querySelector(".site-nav");
  if (toggle && nav) {
    toggle.addEventListener("click", function () {
      var open = nav.classList.toggle("open");
      toggle.setAttribute("aria-expanded", String(open));
    });
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

  // Homepage: the emblem's silhouette drifts down the page as a soft shadow,
  // crossing from side to side into each section. Scroll-linked, so it only moves when the visitor scrolls.
  var heroPortal = document.querySelector(".hero-portal");
  if (heroPortal) {
    document.body.classList.add("has-logo-shadow");
    var shadow = document.createElement("div");
    shadow.className = "logo-shadow";
    shadow.setAttribute("aria-hidden", "true");
    document.body.appendChild(shadow);
    var footer = document.querySelector(".site-footer");
    var sections = [].slice.call(document.querySelectorAll("main > section:not(.hero-portal)"));
    var MAX_OPACITY = 0.07;      // keep in step with the contrast check in README (Accessibility)
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
      var heroRect = heroPortal.querySelector(".portal").getBoundingClientRect();
      var start = { at: heroPortal.offsetTop + heroPortal.offsetHeight / 2, x: heroRect.left + heroRect.width / 2 - size / 2, rot: 0 };
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
      shadow.style.transform = "translate(" + x + "px," + (vh / 2 - sh / 2) + "px) rotate(" + rot + "deg) scale(" + scale + ")";
      // Fade in as the hero leaves the screen, fade out before the dark footer
      var heroBottom = heroPortal.getBoundingClientRect().bottom;
      var fadeIn = Math.min(1, Math.max(0, (vh * 0.75 - heroBottom) / (vh * 0.5)));
      var fadeOut = footer ? Math.min(1, Math.max(0, (footer.getBoundingClientRect().top - vh * 0.4) / (vh * 0.4))) : 1;
      shadow.style.opacity = String(MAX_OPACITY * fadeIn * fadeOut);
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

  function catCard(cat) {
    var photo = cat.photo
      ? '<img src="' + esc(cat.photo) + '" alt="Photo of ' + esc(cat.name) + '" loading="lazy">'
      : PLACEHOLDER;
    var tags = cat.traits.map(function (t) { return '<span class="tag">' + esc(t) + "</span>"; }).join("");
    if (cat.status === "pending") tags = '<span class="tag tag--dark">Adoption pending</span>' + tags;
    var subject = encodeURIComponent("Adoption inquiry: " + cat.name);
    return (
      '<article class="card cat-card">' +
      '<div class="cat-photo">' + photo + "</div>" +
      '<div class="cat-body">' +
      "<h3>" + esc(cat.name) + "</h3>" +
      '<p class="cat-meta">' + [cat.sex, cat.ageLabel, cat.coat].filter(Boolean).map(esc).join(" · ") + "</p>" +
      '<div class="tags">' + tags + "</div>" +
      "<p>" + esc(cat.story) + "</p>" +
      (cat.pair ? '<p class="cat-pair">' + esc(cat.pair) + "</p>" : "") +
      '<a class="btn btn--primary" href="contact.html?subject=' + subject + '">Meet ' + esc(cat.name.split(" ")[0]) + "</a>" +
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
