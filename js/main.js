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
      '<p class="cat-meta">' + esc(cat.ageLabel) + " · " + esc(cat.sex) + "</p>" +
      '<div class="tags">' + tags + "</div>" +
      "<p>" + esc(cat.story) + "</p>" +
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
