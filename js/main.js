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

  // Contact form: placeholder handler until a real form service is connected
  var form = document.getElementById("contact-form");
  if (form && !form.getAttribute("action")) {
    form.addEventListener("submit", function (e) {
      e.preventDefault();
      var status = document.getElementById("form-status");
      status.textContent = "Thanks! Your message is ready — but this form isn't connected yet (see README).";
    });
  }
})();
