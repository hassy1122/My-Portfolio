/* portfolio-dark/script.js — data-driven edit mode, nav, particles, modal */
(function () {
  "use strict";

  // ---------- Default data (edit this or use the Edit panel in-browser) ----------
  var DEFAULT_DATA = {
    profile: {
      name: "Muhammad Hussain Raza",
      heroName: "Hussain",
      dob: "2004-03-11",
      location: "Lahore, Punjab, Pakistan",
      email: "hr.hussainraza112@gmail.com",
      phone: "+92 304 2936540",
      linkedin: "https://www.linkedin.com/in/hr-hassy/",
      github: "https://github.com/hassy1122",
      fiverr: "https://www.fiverr.com/hussainraza223/",
      upwork: "https://www.upwork.com/freelancers/~014ad670d9b6e6dd80",
      education: "BS Computer Science — KFUEIT (2020–2024)",
      languages: "English, Urdu",
      availability: "Open to freelance & remote opportunities",
      rate: "Competitive rates — discussed per project",
      photo: "images/myimg.jpg",
      tagline: "Full-Stack JavaScript Developer with hands-on experience building responsive web and mobile applications using the MERN stack.",
      bio: "BSCS graduate and Full-Stack JavaScript Developer with hands-on experience building responsive web and mobile applications using the MERN stack. I care about understanding how every layer of an application fits together — from database design to deployed UI. Currently preparing for advanced master's studies abroad.",
      skills: ["JavaScript (ES6+)", "HTML5", "CSS3", "SQL", "React", "Node.js", "Express.js", "MongoDB", "MySQL", "REST APIs", "Git", "GitHub"],
    },
    projects: [
      {
        name: "Tracker",
        desc: "Task and activity tracker for organizing work, logging progress and keeping day-to-day goals visible in one place.",
        tags: ["JavaScript", "HTML", "CSS"],
        link: "https://github.com/hassy1122/Tracker",
        images: [],
      },
      {
        name: "Project Management Dashboard",
        desc: "Dashboard for planning projects, tracking tasks and viewing status at a glance — built for clear, structured teamwork.",
        tags: ["React", "JavaScript", "CSS"],
        link: "https://github.com/hassy1122/Project-Management-Dashboard",
        images: [],
      },
      {
        name: "Real-Time Chat Application",
        desc: "Real-time messaging app with live conversations, a clean chat UI and fast message delivery between users.",
        tags: ["JavaScript", "Node.js", "WebSockets"],
        link: "https://github.com/hassy1122/Real-Time-Chat-Application",
        images: [],
      },
      {
        name: "NovaCart",
        desc: "E-commerce storefront with product browsing, shopping cart and a responsive, modern shopping experience.",
        tags: ["React", "JavaScript", "CSS"],
        link: "https://github.com/hassy1122/novacart",
        images: [],
      },
      {
        name: "Travel Recommendation",
        desc: "Destination recommendation site with categories, search and curated travel cards — simple to browse and explore.",
        tags: ["HTML", "CSS", "JavaScript"],
        link: "https://github.com/hassy1122/travel-recommendation",
        images: [],
      },
      {
        name: "Paradise Nursery",
        desc: "Plant shop front for browsing products, viewing details and managing a small catalog with a clean layout.",
        tags: ["HTML", "CSS", "JavaScript"],
        link: "https://github.com/hassy1122/Paradise-Nursery",
        images: [],
      },
      {
        name: "Online Learning",
        desc: "Online learning platform for exploring courses, tracking progress and organizing study material in one interface.",
        tags: ["React", "JavaScript", "CSS"],
        link: "https://github.com/hassy1122/Online-Learning",
        images: [],
      },
      {
        name: "Job Portal",
        desc: "Job board for browsing openings, filtering roles and connecting candidates with opportunities.",
        tags: ["React", "Node.js", "MongoDB"],
        link: "https://github.com/hassy1122/Job-Portal",
        images: [],
      },
      {
        name: "Clinic Appointment System",
        desc: "Appointment system for booking clinic visits, managing schedules and keeping patient requests organized.",
        tags: ["React", "Node.js", "MongoDB"],
        link: "https://github.com/hassy1122/Clinic-Appointment-System",
        images: [],
      },
    ],
    certs: [
      { name: "IBM Full-Stack JavaScript Developer Professional Certificate", issuer: "IBM / Coursera (Sep 17, 2026)", link: "https://coursera.org/verify/professional-cert/8FA06GAV0238", image: "images/certificates/all-in-one.png" },
      { name: "Introduction to Software Engineering", issuer: "IBM on Coursera (Sep 5, 2026)", link: "https://coursera.org/verify/YGODXN9PXQVC", image: "images/certificates/C1.png" },
      { name: "Introduction to HTML, CSS, & JavaScript", issuer: "IBM on Coursera (Sep 5, 2026)", link: "https://coursera.org/verify/SA8HT45TNX", image: "images/certificates/C2.png" },
      { name: "Getting Started with Git and GitHub", issuer: "IBM on Coursera (Sep 17, 2026)", link: "https://coursera.org/verify/KAXTHNRL7PDW", image: "images/certificates/C3.png" },
      { name: "JavaScript Programming Essentials", issuer: "IBM on Coursera (Sep 16, 2026)", link: "https://coursera.org/verify/Y8MJE85T7N", image: "images/certificates/C4.png" },
      { name: "Developing Front-End Apps with React", issuer: "IBM on Coursera (Sep 8, 2026)", link: "https://coursera.org/verify/R1Q90WbVyRP", image: "images/certificates/C5.png" },
      { name: "Developing Back-End Apps with Node.js and Express", issuer: "IBM on Coursera (Sep 17, 2026)", link: "https://coursera.org/verify/32SDZLR53YAL", image: "images/certificates/C6.png" },
      { name: "Get Started with Cloud Native, DevOps, Agile, and NoSQL", issuer: "IBM on Coursera (Sep 17, 2026)", link: "https://coursera.org/verify/BHUUY41XMQD", image: "images/certificates/C7.png" },
      { name: "Introduction to Containers w/ Docker, Kubernetes & OpenShift", issuer: "IBM on Coursera (Sep 17, 2026)", link: "https://coursera.org/verify/GBJGGVYF19O", image: "images/certificates/C8.png" },
      { name: "Application Development using Microservices and Serverless", issuer: "IBM on Coursera (Sep 17, 2026)", link: "https://coursera.org/verify/4GF5LE6XPHY9", image: "images/certificates/C9.png" },
      { name: "Node.js & MongoDB: Developing Back-end Database Applications", issuer: "IBM on Coursera (Sep 9, 2026)", link: "https://coursera.org/verify/QIITJW8RC3T4", image: "images/certificates/C10.png" },
      { name: "JavaScript Full Stack Capstone Project", issuer: "IBM on Coursera (Sep 16, 2026)", link: "https://coursera.org/verify/GNXSGXATAQLX", image: "images/certificates/C11.png" },
      { name: "Software Developer Career Guide and Interview Preparation", issuer: "IBM on Coursera (Sep 11, 2026)", link: "https://coursera.org/verify/D5DMJQSVTA9D", image: "images/certificates/C12.png" },
      { name: "Full Stack Web Development Certification", issuer: "ICR IT Centre, Rahim Yar Khan (Sep 26, 2023)", link: "images/certificates/icr-fullstack.jpg", image: "images/certificates/icr-fullstack.jpg" },
      { name: "Full-Stack JavaScript Development (NAVTTC)", issuer: "ExD Academy · NAVTTC, Lahore (Sep 2026)", link: "", image: "" },
    ],
    /* Permanent CV: hosted copy inside the repo (one click, never expires).
       cvMirror = owner's Cloudinary collection link (online copy). */
    cvUrl: "assets/Hussain_Raza_CV.pdf",
    cvMirror: "https://collection.cloudinary.com/iseuqu9s/541a499b3c68104ce8de47cb12ec0437",
    cvDataUrl: null,
    cvFileName: "Hussain_Raza_CV.pdf",
    comments: [],
  };

  var STORAGE_KEY = "portfolio-data-v3";
  var MIGRATION_KEY = "portfolio-data-migrated-v4";
  /* Public snapshot: window.SITE_DATA from site-data.js (same folder). Visitors read this.
     Owner localStorage always wins on the owner's browser. Export from admin to publish. */

  function isPlainObject(v) {
    return v !== null && typeof v === "object" && !Array.isArray(v);
  }

  function deepMerge(base, extra) {
    if (!isPlainObject(base)) return extra !== undefined ? extra : base;
    var out = {};
    Object.keys(base).forEach(function (k) {
      out[k] = base[k];
    });
    if (!isPlainObject(extra)) return out;
    Object.keys(extra).forEach(function (k) {
      if (isPlainObject(base[k]) && isPlainObject(extra[k])) {
        out[k] = deepMerge(base[k], extra[k]);
      } else if (extra[k] !== undefined) {
        out[k] = extra[k];
      }
    });
    return out;
  }

  function needsMigration() {
    try { return localStorage.getItem(MIGRATION_KEY) !== "1"; } catch (e) { return false; }
  }
  function markMigrated() {
    try { localStorage.setItem(MIGRATION_KEY, "1"); } catch (e) {}
  }

  /* One-time only — never re-runs, so later admin edits stay permanent. */
  function applyLegacyMigrations(merged) {
    if (!needsMigration()) return merged;
    if (merged.profile && Array.isArray(merged.profile.skills)) {
      merged.profile.skills = merged.profile.skills.filter(function (s) {
        return !/^(React Native|Firebase)$/i.test(String(s).trim());
      });
    }
    if (merged.profile && !merged.profile.photo) {
      merged.profile.photo = DEFAULT_DATA.profile.photo;
    }
    var hasTracker = (merged.projects || []).some(function (pr) {
      return /hassy1122\/Tracker/i.test(pr.link || "");
    });
    if (!hasTracker) {
      merged.projects = JSON.parse(JSON.stringify(DEFAULT_DATA.projects));
    }
    if (Array.isArray(merged.certs)) {
      merged.certs = merged.certs.filter(function (c) {
        return !/IBM Developer Skills Network/i.test(c.issuer || "");
      });
    }
    markMigrated();
    return merged;
  }

  function loadData() {
    /* 1) defaults  2) public site-data.js  3) this browser's localStorage (owner wins) */
    var merged = JSON.parse(JSON.stringify(DEFAULT_DATA));
    try {
      if (window.SITE_DATA && isPlainObject(window.SITE_DATA)) {
        merged = deepMerge(merged, window.SITE_DATA);
      }
    } catch (e) {}
    try {
      var raw = localStorage.getItem(STORAGE_KEY);
      if (raw) {
        merged = deepMerge(merged, JSON.parse(raw));
      }
    } catch (e) {}
    merged = applyLegacyMigrations(merged);
    /* empty photo falls back to default professional photo */
    if (merged.profile && !merged.profile.photo) {
      merged.profile.photo = DEFAULT_DATA.profile.photo;
    }
    /* Languages: drop IELTS band detail (owner preference), even if it comes
       from saved browser data or an exported site-data.js snapshot. */
    if (merged.profile && /IELTS|band score/i.test(String(merged.profile.languages || ""))) {
      merged.profile.languages = "English, Urdu";
    }
    return merged;
  }

  function saveData() {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
      return true;
    } catch (e) {
      /* quota / private mode — keep in-memory state, tell the admin */
      try {
        var box = document.getElementById("cv-error");
        if (box) {
          box.hidden = false;
          box.textContent = "Could not save to this browser (storage full or blocked). Changes may be lost on refresh — export site-data.js to publish.";
        }
      } catch (e2) {}
      return false;
    }
  }

  var state = loadData();

  // ---------- Rendering ----------
  function renderAll() {
    var p = state.profile || {};
    var setText = function (id, text) {
      var el = document.getElementById(id);
      if (el) el.textContent = text;
    };
    setText("nav-name", p.heroName || p.name);
    setText("hero-name", p.heroName || "");
    setText("hero-tagline", p.tagline || "");
    setText("about-bio", p.bio || "");
    setText("fact-name", p.name || "—");
    setText("fact-dob", p.dob ? formatDate(p.dob) : "—");
    setText("fact-location", p.location || "—");
    setText("fact-email", p.email || "—");
    setText("fact-phone", p.phone || "—");
    setText("fact-education", p.education || "—");
    setText("fact-languages", p.languages || "—");
    setText("fact-availability", p.availability || "—");
    setText("fact-rate", p.rate || "—");
    setText("availability-text", p.availability || "");
    var availBadge = document.getElementById("availability-badge");
    if (availBadge) availBadge.hidden = !p.availability;
    setText("footer-name", p.name || "");
    setText("footer-year", String(new Date().getFullYear()));

    /* avatar: photo if set, otherwise initials from name */
    var photoEl = document.getElementById("profile-photo");
    var initialsEl = document.getElementById("profile-initials");
    var photoSrc = p.photo || "images/myimg.jpg";
    if (photoEl) {
      if (photoSrc) {
        photoEl.src = photoSrc;
        photoEl.hidden = false;
        if (initialsEl) initialsEl.hidden = true;
      } else {
        photoEl.hidden = true;
        photoEl.removeAttribute("src");
        if (initialsEl) initialsEl.hidden = false;
      }
    }
    if (initialsEl) {
      var nameParts = String(p.name || "").trim().split(/\s+/).filter(Boolean);
      var ini = nameParts.length >= 2
        ? nameParts[0].charAt(0) + nameParts[nameParts.length - 1].charAt(0)
        : (nameParts[0] || "?").slice(0, 2);
      initialsEl.textContent = ini.toUpperCase();
    }
    updatePhotoHint();

    var emailLink = document.getElementById("contact-email-link");
    var phoneLink = document.getElementById("contact-phone-link");
    var whatsappLink = document.getElementById("contact-whatsapp-link");
    var linkedinLink = document.getElementById("contact-linkedin-link");
    var githubLink = document.getElementById("contact-github-link");
    var fiverrLink = document.getElementById("contact-fiverr-link");
    var upworkLink = document.getElementById("contact-upwork-link");
    if (emailLink && p.email) {
      emailLink.setAttribute("data-tip", p.email);
      emailLink.href = "https://mail.google.com/mail/u/0/?view=cm&fs=1&to=" + encodeURIComponent(p.email);
    }
    if (phoneLink && p.phone) {
      phoneLink.setAttribute("data-tip", p.phone);
      phoneLink.href = "tel:" + String(p.phone).replace(/[^\d+]/g, "");
    }
    if (whatsappLink) {
      var waNum = String(p.phone || "").replace(/[^\d]/g, "");
      if (waNum) {
        if (waNum.charAt(0) === "0") waNum = waNum.slice(1);
        if (waNum.length === 10) waNum = "92" + waNum;
        whatsappLink.setAttribute("data-tip", p.phone || waNum);
        whatsappLink.href = "https://wa.me/" + waNum;
      }
    }
    if (linkedinLink && p.linkedin) linkedinLink.href = p.linkedin;
    if (githubLink && p.github) githubLink.href = p.github;
    if (fiverrLink && p.fiverr) fiverrLink.href = p.fiverr;
    if (upworkLink && p.upwork) upworkLink.href = p.upwork;

    var skillsList = document.getElementById("skills-list");
    if (skillsList) {
      skillsList.innerHTML = "";
      (p.skills || []).forEach(function (s) {
        var pill = document.createElement("span");
        pill.className = "skill-pill";
        pill.textContent = s;
        skillsList.appendChild(pill);
      });
    }

    renderProjects();
    renderCerts();
    renderCvHint();
    renderComments();
  }

  function formatDate(isoStr) {
    var d = new Date(isoStr);
    if (isNaN(d)) return isoStr;
    return d.toLocaleDateString(undefined, { year: "numeric", month: "long", day: "numeric" });
  }

  /* Downscale an uploaded image so localStorage never overflows. */
  function resizeImage(file, max, cb) {
    var reader = new FileReader();
    reader.onload = function () {
      var img = new Image();
      img.onload = function () {
        var scale = Math.min(1, max / Math.max(img.width, img.height));
        var c = document.createElement("canvas");
        c.width = Math.max(1, Math.round(img.width * scale));
        c.height = Math.max(1, Math.round(img.height * scale));
        c.getContext("2d").drawImage(img, 0, 0, c.width, c.height);
        try { cb(c.toDataURL("image/jpeg", 0.85)); } catch (e) { cb(null); }
      };
      img.onerror = function () { cb(null); };
      img.src = reader.result;
    };
    reader.onerror = function () { cb(null); };
    reader.readAsDataURL(file);
  }

  function updatePhotoHint() {
    var hint = document.getElementById("photo-current-hint");
    var removeBtn = document.getElementById("photo-remove-btn");
    var photo = (state.profile && state.profile.photo) || "images/myimg.jpg";
    var hasPhoto = !!photo;
    if (hint) hint.textContent = hasPhoto && photo === "images/myimg.jpg"
      ? "Default profile photo (images/myimg.jpg) — upload to replace."
      : "Photo uploaded — remove it to show the default photo.";
    if (removeBtn) removeBtn.hidden = photo === "images/myimg.jpg";
  }

  var photoUpload = document.getElementById("photo-upload");
  if (photoUpload) {
    photoUpload.addEventListener("change", function (e) {
      var file = e.target.files && e.target.files[0];
      if (!file) return;
      resizeImage(file, 320, function (url) {
        if (!url) return;
        state.profile = state.profile || {};
        state.profile.photo = url;
        saveData();
        renderAll();
      });
      photoUpload.value = "";
    });
  }
  var photoRemoveBtn = document.getElementById("photo-remove-btn");
  if (photoRemoveBtn) {
    photoRemoveBtn.addEventListener("click", function () {
      state.profile = state.profile || {};
      state.profile.photo = "images/myimg.jpg";
      saveData();
      renderAll();
    });
  }

  function renderProjects() {
    var grid = document.getElementById("project-grid");
    if (!grid) return;
    grid.innerHTML = "";
    (state.projects || []).forEach(function (proj, i) {
      var card = document.createElement("div");
      card.className = "project-card reveal";
      card.style.setProperty("--i", String(i));
      var tags = proj.tags || [];
      var imgs = Array.isArray(proj.images)
        ? proj.images
        : proj.image
          ? [proj.image]
          : [];
      var mediaHtml = "";
      if (imgs.length) {
        mediaHtml =
          '<div class="project-media gallery" data-count="' + Math.min(imgs.length, 6) + '">' +
          imgs.slice(0, 6).map(function (src, gi) {
            return (
              '<img class="project-img" loading="lazy" alt="' +
              escapeAttr((proj.name || "Project") + " screenshot " + (gi + 1)) +
              '" src="' + escapeAttr(src) + '">'
            );
          }).join("") +
          "</div>";
      } else {
        mediaHtml =
          '<div class="project-media project-media-empty" aria-hidden="true">' +
          '<span class="project-media-ph">Screenshots coming soon</span>' +
          "</div>";
      }
      card.innerHTML =
        '<button class="project-edit-btn" data-idx="' + i + '" type="button">Edit</button>' +
        mediaHtml +
        '<div class="project-title">' + escapeHtml(proj.name || "") + "</div>" +
        '<div class="project-desc">' + escapeHtml(proj.desc || "") + "</div>" +
        '<div class="project-tags">' +
        tags.map(function (t) {
          return '<span class="project-tag">' + escapeHtml(t) + "</span>";
        }).join("") +
        "</div>" +
        (proj.link
          ? '<a class="project-link" href="' + escapeAttr(proj.link) + '" target="_blank" rel="noopener">View project →</a>'
          : "");
      grid.appendChild(card);
    });
    grid.querySelectorAll(".project-edit-btn").forEach(function (btn) {
      btn.addEventListener("click", function () {
        openModal("projects");
      });
    });
    attachTilt(".project-card");
  }

  function renderCerts() {
    var grid = document.getElementById("cert-grid");
    if (!grid) return;
    grid.innerHTML = "";
    (state.certs || []).forEach(function (cert, i) {
      var card = document.createElement("div");
      card.className = "cert-card reveal";
      card.style.setProperty("--i", String(i % 4));
      card.innerHTML =
        '<button class="cert-edit-btn" data-idx="' + i + '" type="button">Edit</button>' +
        (cert.image
          ? '<img src="' + escapeAttr(cert.image) + '" alt="' + escapeHtml(cert.name || "Certificate") + '" class="cert-img" loading="lazy">'
          : "") +
        '<div class="cert-name">' + escapeHtml(cert.name || "") + "</div>" +
        '<div class="cert-issuer">' + escapeHtml(cert.issuer || "") + "</div>" +
        (cert.link
          ? '<a class="cert-link" href="' + escapeAttr(cert.link) + '" target="_blank" rel="noopener">View certificate →</a>'
          : '<span class="cert-link" style="opacity:0.5;">No file attached</span>');
      grid.appendChild(card);
    });
    grid.querySelectorAll(".cert-edit-btn").forEach(function (btn) {
      btn.addEventListener("click", function () {
        openModal("certs");
      });
    });
  }

  function setBtnDisabled(btn, disabled) {
    if (!btn) return;
    if (disabled) {
      btn.setAttribute("aria-disabled", "true");
      btn.classList.add("is-disabled");
      if (btn.tagName === "A") btn.removeAttribute("href");
    } else {
      btn.removeAttribute("aria-disabled");
      btn.classList.remove("is-disabled");
    }
  }

  /* CV source: owner's uploaded PDF wins, otherwise the permanent hosted copy. */
  function cvSource() {
    if (state.cvDataUrl) {
      return { url: state.cvDataUrl, name: state.cvFileName || "CV.pdf" };
    }
    if (state.cvUrl) {
      return { url: state.cvUrl, name: state.cvFileName || "Hussain_Raza_CV.pdf" };
    }
    return null;
  }

  function renderCvHint() {
    var hint = document.getElementById("cv-current-hint");
    var dlBtn = document.getElementById("cv-download-btn");
    var actions = document.getElementById("cv-actions");
    var preview = document.getElementById("cv-preview-link");
    var secStatus = document.getElementById("cv-section-status");
    var secFile = document.getElementById("cv-section-file");
    var secDl = document.getElementById("cv-section-download");
    var secPrev = document.getElementById("cv-section-preview");
    var mirrorLinks = document.querySelectorAll("[data-cv-mirror]");
    var src = cvSource();
    var has = !!src;
    var fileName = (src && src.name) || "CV.pdf";

    if (hint) hint.textContent = has ? "Current file: " + fileName : "No CV available yet.";
    if (actions) actions.hidden = !state.cvDataUrl;

    mirrorLinks.forEach(function (a) {
      if (state.cvMirror) {
        a.href = state.cvMirror;
        a.hidden = false;
      } else {
        a.hidden = true;
      }
    });

    if (has) {
      if (preview) {
        preview.href = src.url;
        preview.setAttribute("download", fileName);
      }
      if (dlBtn) {
        dlBtn.href = src.url;
        dlBtn.setAttribute("download", fileName);
        dlBtn.title = "Download " + fileName;
        setBtnDisabled(dlBtn, false);
      }
      if (secStatus) secStatus.textContent = "My resume is ready — download the PDF or open it in a new tab.";
      if (secFile) {
        secFile.hidden = false;
        secFile.textContent = "File: " + fileName;
      }
      if (secDl) {
        secDl.href = src.url;
        secDl.setAttribute("download", fileName);
        setBtnDisabled(secDl, false);
      }
      if (secPrev) {
        secPrev.href = src.url;
        setBtnDisabled(secPrev, false);
      }
    } else {
      if (preview) preview.removeAttribute("href");
      if (dlBtn) {
        dlBtn.title = "No CV uploaded yet";
        setBtnDisabled(dlBtn, true);
      }
      if (secStatus) secStatus.textContent = "CV not available yet — please check back soon.";
      if (secFile) {
        secFile.hidden = true;
        secFile.textContent = "";
      }
      if (secDl) setBtnDisabled(secDl, true);
      if (secPrev) setBtnDisabled(secPrev, true);
    }
  }

  var cvDeleteBtn = document.getElementById("cv-delete-btn");
  if (cvDeleteBtn) {
    cvDeleteBtn.addEventListener("click", function () {
      if (!state.cvDataUrl) return;
      if (!window.confirm("Remove the PDF you uploaded here? Visitors keep the hosted copy.")) return;
      state.cvDataUrl = null;
      state.cvFileName = null;
      saveData();
      renderCvHint();
      var err = document.getElementById("cv-error");
      if (err) err.hidden = true;
    });
  }

  function escapeHtml(str) {
    var div = document.createElement("div");
    div.textContent = str == null ? "" : String(str);
    return div.innerHTML;
  }
  function escapeAttr(str) {
    return String(str == null ? "" : str).replace(/"/g, "&quot;");
  }

  // ---------- Mobile nav ----------
  var body = document.body;
  var hamburger = document.getElementById("hamburger");
  var navLinks = document.getElementById("nav-links");

  function setNavOpen(open) {
    if (!hamburger) return;
    hamburger.classList.toggle("open", open);
    hamburger.setAttribute("aria-expanded", open ? "true" : "false");
    hamburger.setAttribute("aria-label", open ? "Close menu" : "Open menu");
    if (navLinks) navLinks.classList.toggle("open", open);
    body.classList.toggle("nav-open", open);
  }

  function isNavOpen() {
    return body.classList.contains("nav-open");
  }

  if (hamburger) {
    hamburger.addEventListener("click", function () {
      setNavOpen(!isNavOpen());
    });
  }
  if (navLinks) {
    navLinks.addEventListener("click", function (e) {
      if (e.target.closest("a")) setNavOpen(false);
    });
  }
  window.addEventListener("resize", function () {
    if (window.innerWidth > 860 && isNavOpen()) setNavOpen(false);
  });

  // ---------- Edit mode toggle ----------
  var editMode = false;
  var editToggleBtn = document.getElementById("edit-toggle-btn");
  if (editToggleBtn) {
    editToggleBtn.addEventListener("click", function () {
      editMode = !editMode;
      body.classList.toggle("edit-mode", editMode);
      editToggleBtn.textContent = editMode ? "Exit edit" : "Edit";
      if (editMode) openModal("profile");
      else closeModal();
    });
  }

  // ---------- Modal ----------
  var modal = document.getElementById("edit-modal");
  var modalCloseBtn = document.getElementById("modal-close-btn");
  if (modalCloseBtn) modalCloseBtn.addEventListener("click", closeModal);
  if (modal) {
    modal.addEventListener("click", function (e) {
      if (e.target === modal) closeModal();
    });
  }

  function openModal(tab) {
    if (!modal) return;
    modal.classList.add("open");
    populateProfileForm();
    populateProjectsForm();
    populateCertsForm();
    switchTab(tab || "profile");
    if (modalCloseBtn) modalCloseBtn.focus();
  }

  function closeModal() {
    if (!modal) return;
    modal.classList.remove("open");
  }

  document.querySelectorAll(".tab-btn").forEach(function (btn) {
    btn.addEventListener("click", function () {
      switchTab(btn.dataset.tab);
    });
  });

  function switchTab(tab) {
    document.querySelectorAll(".tab-btn").forEach(function (b) {
      b.classList.toggle("active", b.dataset.tab === tab);
    });
    document.querySelectorAll(".tab-panel").forEach(function (p) {
      p.classList.toggle("active", p.dataset.panel === tab);
    });
  }

  document.addEventListener("keydown", function (e) {
    if (e.key !== "Escape") return;
    if (adminModal && adminModal.classList.contains("open")) {
      closeAdminGate();
      return;
    }
    if (modal && modal.classList.contains("open")) {
      closeModal();
      return;
    }
    if (isNavOpen()) setNavOpen(false);
  });

  // ---------- Profile form ----------
  function val(id, fallback) {
    var el = document.getElementById(id);
    return el ? el.value : fallback;
  }

  function populateProfileForm() {
    var p = state.profile || {};
    var set = function (id, v) {
      var el = document.getElementById(id);
      if (el) el.value = v || "";
    };
    set("edit-name", p.name);
    set("edit-hero-name", p.heroName);
    set("edit-dob", p.dob);
    set("edit-location", p.location);
    set("edit-email", p.email);
    set("edit-phone", p.phone);
    set("edit-linkedin", p.linkedin);
    set("edit-github", p.github);
    set("edit-fiverr", p.fiverr);
    set("edit-upwork", p.upwork);
    set("edit-education", p.education);
    set("edit-languages", p.languages);
    set("edit-availability", p.availability);
    set("edit-rate", p.rate);
    set("edit-tagline", p.tagline);
    set("edit-bio", p.bio);
    set("edit-skills", (p.skills || []).join(", "));
  }

  var saveProfileBtn = document.getElementById("save-profile-btn");
  if (saveProfileBtn) {
    saveProfileBtn.addEventListener("click", function () {
      state.profile = {
        name: val("edit-name", "").trim(),
        heroName: val("edit-hero-name", "").trim(),
        photo: (state.profile && state.profile.photo) || "",
        dob: val("edit-dob", ""),
        location: val("edit-location", "").trim(),
        email: val("edit-email", "").trim(),
        phone: val("edit-phone", "").trim(),
        linkedin: val("edit-linkedin", "").trim(),
        github: val("edit-github", "").trim(),
        fiverr: val("edit-fiverr", "").trim(),
        upwork: val("edit-upwork", "").trim(),
        education: val("edit-education", "").trim(),
        languages: val("edit-languages", "").trim(),
        availability: val("edit-availability", "").trim(),
        rate: val("edit-rate", "").trim(),
        tagline: val("edit-tagline", "").trim(),
        bio: val("edit-bio", "").trim(),
        skills: val("edit-skills", "").split(",").map(function (s) {
          return s.trim();
        }).filter(Boolean),
      };
      saveData();
      renderAll();
      closeModal();
    });
  }

  // ---------- Projects form ----------
  function populateProjectsForm() {
    var list = document.getElementById("edit-projects-list");
    if (!list) return;
    list.innerHTML = "";
    (state.projects || []).forEach(function (proj, i) {
      var row = document.createElement("div");
      row.className = "edit-item-row";
      row.innerHTML =
        "<label>Project name<input type=\"text\" class=\"proj-name\" value=\"" + escapeAttr(proj.name || "") + "\" /></label>" +
        "<label>Description<textarea class=\"proj-desc\" rows=\"2\">" + escapeHtml(proj.desc || "") + "</textarea></label>" +
        "<label>Tags (comma separated)<input type=\"text\" class=\"proj-tags\" value=\"" + escapeAttr((proj.tags || []).join(", ")) + "\" /></label>" +
        "<label>Link (optional)<input type=\"text\" class=\"proj-link\" value=\"" + escapeAttr(proj.link || "") + "\" /></label>" +
        "<label>Image URLs (comma separated — multiple allowed)<input type=\"text\" class=\"proj-images\" value=\"" +
        escapeAttr((proj.images || (proj.image ? [proj.image] : [])).join(", ")) +
        "\" placeholder=\"https://…/shot1.png, https://…/shot2.png\" /></label>" +
        "<button class=\"remove-item-btn\" data-idx=\"" + i + "\" type=\"button\">Remove project</button>";
      list.appendChild(row);
    });
    list.querySelectorAll(".remove-item-btn").forEach(function (btn) {
      btn.addEventListener("click", function () {
        state.projects.splice(parseInt(btn.dataset.idx, 10), 1);
        saveData();
        renderAll();
        populateProjectsForm();
      });
    });
    attachAutosave(list, saveProjectsFromForm);
  }

  function saveProjectsFromForm() {
    var rows = document.querySelectorAll("#edit-projects-list .edit-item-row");
    var projects = [];
    rows.forEach(function (row) {
      projects.push({
        name: (row.querySelector(".proj-name") || {}).value ? row.querySelector(".proj-name").value.trim() : "",
        desc: row.querySelector(".proj-desc") ? row.querySelector(".proj-desc").value.trim() : "",
        tags: row.querySelector(".proj-tags")
          ? row.querySelector(".proj-tags").value.split(",").map(function (s) {
              return s.trim();
            }).filter(Boolean)
          : [],
        link: row.querySelector(".proj-link") ? row.querySelector(".proj-link").value.trim() : "",
        images: row.querySelector(".proj-images")
          ? row.querySelector(".proj-images").value.split(",").map(function (s) {
              return s.trim();
            }).filter(Boolean)
          : [],
      });
    });
    state.projects = projects;
    saveData();
    renderProjects();
  }

  var addProjectBtn = document.getElementById("modal-add-project-btn");
  if (addProjectBtn) {
    addProjectBtn.addEventListener("click", function () {
      state.projects.push({ name: "New project", desc: "", tags: [], link: "" });
      saveData();
      renderAll();
      populateProjectsForm();
    });
  }
  var addProjectPageBtn = document.getElementById("add-project-btn");
  if (addProjectPageBtn) {
    addProjectPageBtn.addEventListener("click", function () {
      openModal("projects");
    });
  }

  // ---------- Certs form ----------
  function populateCertsForm() {
    var list = document.getElementById("edit-certs-list");
    if (!list) return;
    list.innerHTML = "";
    (state.certs || []).forEach(function (cert, i) {
      var row = document.createElement("div");
      row.className = "edit-item-row";
      row.innerHTML =
        "<label>Certificate name<input type=\"text\" class=\"cert-name-input\" value=\"" + escapeAttr(cert.name || "") + "\" /></label>" +
        "<label>Issuer<input type=\"text\" class=\"cert-issuer-input\" value=\"" + escapeAttr(cert.issuer || "") + "\" /></label>" +
        "<label>Link or upload" +
        "<input type=\"text\" class=\"cert-link-input\" placeholder=\"https://...\" value=\"" + escapeAttr(cert.link || "") + "\" />" +
        "<input type=\"file\" class=\"cert-file-input\" accept=\"image/*,application/pdf\" style=\"margin-top:6px;\" />" +
        "</label>" +
        "<button class=\"remove-item-btn\" data-idx=\"" + i + "\" type=\"button\">Remove certificate</button>";
      list.appendChild(row);

      var fileInput = row.querySelector(".cert-file-input");
      if (fileInput) {
        fileInput.addEventListener("change", function (e) {
          var file = e.target.files[0];
          if (!file) return;
          var reader = new FileReader();
          reader.onload = function () {
            state.certs[i].link = reader.result;
            row.querySelector(".cert-link-input").value = reader.result.slice(0, 40) + "...";
            saveData();
            renderAll();
          };
          reader.readAsDataURL(file);
        });
      }
    });
    list.querySelectorAll(".remove-item-btn").forEach(function (btn) {
      btn.addEventListener("click", function () {
        state.certs.splice(parseInt(btn.dataset.idx, 10), 1);
        saveData();
        renderAll();
        populateCertsForm();
      });
    });
    attachAutosave(list, saveCertsFromForm);
  }

  function saveCertsFromForm() {
    var rows = document.querySelectorAll("#edit-certs-list .edit-item-row");
    rows.forEach(function (row, i) {
      if (!state.certs[i]) return;
      var nameInput = row.querySelector(".cert-name-input");
      var issuerInput = row.querySelector(".cert-issuer-input");
      var linkInput = row.querySelector(".cert-link-input");
      if (nameInput) state.certs[i].name = nameInput.value.trim();
      if (issuerInput) state.certs[i].issuer = issuerInput.value.trim();
      if (linkInput) {
        var linkVal = linkInput.value.trim();
        if (!linkVal.endsWith("...")) state.certs[i].link = linkVal;
      }
    });
    saveData();
    renderCerts();
  }

  var addCertBtn = document.getElementById("modal-add-cert-btn");
  if (addCertBtn) {
    addCertBtn.addEventListener("click", function () {
      state.certs.push({ name: "New certificate", issuer: "", link: "" });
      saveData();
      renderAll();
      populateCertsForm();
    });
  }
  var addCertPageBtn = document.getElementById("add-cert-btn");
  if (addCertPageBtn) {
    addCertPageBtn.addEventListener("click", function () {
      openModal("certs");
    });
  }

  // ---------- Comments (seeded + visitor comments, persisted locally) ----------
  var COMMENTS_KEY = "portfolio-daynight-comments-v1";
  var SEED_COMMENTS = [
    {
      name: "Dr. Ayesha Malik",
      role: "Final Year Project Supervisor",
      text: "Hussain was one of the strongest students in our final-year project group — quick to pick up new tools and always willing to debug the parts no one else wanted to touch.",
    },
    {
      name: "Fahad Siddiqui",
      role: "Software Engineering Lead",
      text: "During his internship, Hussain picked up our MERN codebase fast and shipped clean, well-tested features with minimal hand-holding.",
    },
    {
      name: "Sara Khan",
      role: "University Project Partner",
      text: "Reliable teammate who cares about writing code that's easy for others to read later, not just code that works today.",
    },
  ];

  function loadComments() {
    try {
      var raw = localStorage.getItem(COMMENTS_KEY);
      if (raw) {
        var parsed = JSON.parse(raw);
        if (Array.isArray(parsed)) return parsed;
      }
    } catch (e) {}
    return SEED_COMMENTS.slice();
  }

  function saveComments() {
    try {
      localStorage.setItem(COMMENTS_KEY, JSON.stringify(state.comments));
    } catch (e) {}
  }

  function renderComments() {
    var list = document.getElementById("comments-list");
    if (!list) return;
    list.innerHTML = "";
    (state.comments || []).forEach(function (c, i) {
      var card = document.createElement("blockquote");
      card.className = "comment-card reveal";
      card.style.setProperty("--i", String(i % 4));
      var initial = String(c.name || "?").trim().charAt(0).toUpperCase() || "?";
      card.innerHTML =
        '<p class="comment-text">' + escapeHtml(c.text || "") + "</p>" +
        '<footer class="comment-author">' +
        '<span class="comment-avatar" aria-hidden="true">' + escapeHtml(initial) + "</span>" +
        "<span>" +
        '<cite class="comment-name">' + escapeHtml(c.name || "Anonymous") + "</cite>" +
        (c.role ? '<span class="comment-role">' + escapeHtml(c.role) + "</span>" : "") +
        "</span>" +
        "</footer>";
      if (isAdmin()) {
        var del = document.createElement("button");
        del.type = "button";
        del.className = "comment-delete-btn";
        del.setAttribute("aria-label", "Delete comment");
        del.textContent = "×";
        del.addEventListener("click", function () {
          if (!window.confirm("Delete this comment?")) return;
          state.comments.splice(i, 1);
          saveComments();
          renderComments();
        });
        card.appendChild(del);
      }
      list.appendChild(card);
    });
  }

  var commentForm = document.getElementById("comment-form");
  if (commentForm) {
    commentForm.addEventListener("submit", function (e) {
      e.preventDefault();
      var nameEl = document.getElementById("comment-name");
      var roleEl = document.getElementById("comment-role");
      var textEl = document.getElementById("comment-text");
      var errorEl = document.getElementById("comment-error");
      var name = nameEl ? nameEl.value.trim() : "";
      var text = textEl ? textEl.value.trim() : "";
      if (!name || !text) {
        if (errorEl) errorEl.hidden = false;
        return;
      }
      if (errorEl) errorEl.hidden = true;
      state.comments = state.comments || loadComments();
      state.comments.unshift({
        name: name,
        role: roleEl ? roleEl.value.trim() : "",
        text: text,
        ts: Date.now(),
      });
      saveComments();
      renderComments();
      commentForm.reset();
      burstConfetti(document.getElementById("comment-form") || document.body);
    });
  }

  // ---------- Contact form (opens Gmail compose — static site, no backend) ----------
  var contactForm = document.getElementById("contact-form");
  if (contactForm) {
    contactForm.addEventListener("submit", function (e) {
      e.preventDefault();
      var nameEl = document.getElementById("cf-name");
      var emailEl = document.getElementById("cf-email");
      var projectEl = document.getElementById("cf-project");
      var msgEl = document.getElementById("cf-msg");
      var errorEl = document.getElementById("cf-error");
      var successEl = document.getElementById("cf-success");

      var name = nameEl ? nameEl.value.trim() : "";
      var email = emailEl ? emailEl.value.trim() : "";
      var project = projectEl ? projectEl.value.trim() : "";
      var msg = msgEl ? msgEl.value.trim() : "";
      var emailOk = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

      if (!name || !emailOk || !project || !msg) {
        if (errorEl) errorEl.hidden = false;
        if (successEl) successEl.hidden = true;
        return;
      }
      if (errorEl) errorEl.hidden = true;

      var to = (state.profile && state.profile.email) || "hr.hussainraza112@gmail.com";
      var subject = "Project: " + project;
      var body =
        "Name: " + name + "\n" +
        "Email: " + email + "\n" +
        "Project: " + project + "\n\n" +
        msg;
      var url =
        "https://mail.google.com/mail/u/0/?view=cm&fs=1" +
        "&to=" + encodeURIComponent(to) +
        "&su=" + encodeURIComponent(subject) +
        "&body=" + encodeURIComponent(body);

      if (successEl) successEl.hidden = false;
      window.open(url, "_blank", "noopener");
      contactForm.reset();
      burstConfetti(document.getElementById("cf-success") || contactForm);
    });
  }

  function burstConfetti(anchor) {
    if (!anchor || typeof reduceMotion === "undefined" || reduceMotion) return;
    var host = document.body;
    for (var i = 0; i < 18; i++) {
      (function (n) {
        var bit = document.createElement("span");
        bit.className = "confetti-bit";
        bit.style.left = 40 + Math.random() * 20 + "vw";
        bit.style.top = "40vh";
        bit.style.setProperty("--x", String(-1 + Math.random() * 2));
        bit.style.background = ["#9b5cff", "#e94ecf", "#c4a3ff", "#6d28d9"][n % 4];
        bit.style.animationDelay = Math.random() * 0.15 + "s";
        host.appendChild(bit);
        setTimeout(function () {
          if (bit.parentNode) bit.remove();
        }, 1400);
      })(i);
    }
  }

  function attachAutosave(container, saveFn) {
    if (!container) return;
    if (container.dataset.autosave === "on") return;
    container.dataset.autosave = "on";
    container.addEventListener("input", debounce(saveFn, 400));
  }

  function debounce(fn, ms) {
    var t;
    return function () {
      var args = arguments;
      clearTimeout(t);
      t = setTimeout(function () {
        fn.apply(null, args);
      }, ms);
    };
  }

  // ---------- CV upload ----------
  var CV_MAX_BYTES = 2 * 1024 * 1024;
  var cvUpload = document.getElementById("cv-upload");
  var cvError = document.getElementById("cv-error");

  function showCvError(msg) {
    if (!cvError) return;
    cvError.hidden = !msg;
    cvError.textContent = msg || "";
  }

  if (cvUpload) {
    cvUpload.addEventListener("change", function (e) {
      var file = e.target.files && e.target.files[0];
      if (!file) return;
      showCvError("");
      var isPdf = file.type === "application/pdf" || /\.pdf$/i.test(file.name || "");
      if (!isPdf) {
        showCvError("Please choose a PDF file.");
        cvUpload.value = "";
        return;
      }
      if (file.size > CV_MAX_BYTES) {
        showCvError("PDF is too large (max 2 MB). Compress it and try again.");
        cvUpload.value = "";
        return;
      }
      var reader = new FileReader();
      reader.onload = function () {
        state.cvDataUrl = reader.result;
        state.cvFileName = file.name;
        var ok = saveData();
        if (ok) showCvError("");
        renderCvHint();
      };
      reader.onerror = function () {
        showCvError("Could not read that file — please try again.");
      };
      reader.readAsDataURL(file);
      cvUpload.value = "";
    });
  }

  // ---------- 3D tilt interaction for cards ----------
  var reduceMotion = false;
  try {
    reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  } catch (e) {}

  function attachTilt(selector) {
    if (reduceMotion) return;
    document.querySelectorAll(selector).forEach(function (card) {
      if (card.dataset.tilt === "on") return;
      card.dataset.tilt = "on";
      card.addEventListener("mousemove", function (e) {
        var rect = card.getBoundingClientRect();
        var x = e.clientX - rect.left;
        var y = e.clientY - rect.top;
        var rotateX = (y / rect.height - 0.5) * -10;
        var rotateY = (x / rect.width - 0.5) * 10;
        card.style.transform =
          "perspective(700px) rotateX(" + rotateX + "deg) rotateY(" + rotateY + "deg) translateY(-4px)";
      });
      card.addEventListener("mouseleave", function () {
        card.style.transform = "perspective(700px) rotateX(0) rotateY(0) translateY(0)";
      });
    });
  }

  // ---------- Admin / viewer panel gate ----------
  /* The public page IS the viewer panel. The admin panel is username+password gated so
     deployed visitors never see edit controls. */
  var ADMIN_USERNAME = "hassy1122";
  var ADMIN_PASSWORD = "hasSy<12@21>";
  var ADMIN_SESSION_KEY = "portfolio-admin-session";
  var ADMIN_REMEMBER_KEY = "portfolio-admin-remember";
  var adminModal = document.getElementById("admin-modal");
  var adminCloseBtn = document.getElementById("admin-close-btn");
  var adminLoginBtn = document.getElementById("admin-login-btn");
  var adminUsernameEl = document.getElementById("admin-username");
  var adminPasswordEl = document.getElementById("admin-password");
  var adminRememberEl = document.getElementById("admin-remember");
  var adminErrorEl = document.getElementById("admin-error");
  var adminEntryBtn = document.getElementById("admin-entry-btn");
  var adminSignoutBtn = document.getElementById("admin-signout-btn");

  function isAdmin() {
    try {
      return sessionStorage.getItem(ADMIN_SESSION_KEY) === "1" ||
        localStorage.getItem(ADMIN_REMEMBER_KEY) === "1";
    } catch (e) { return false; }
  }

  function applyAdminMode() {
    var admin = isAdmin();
    body.classList.toggle("admin-mode", admin);
    renderComments(); /* refresh per-comment delete buttons */
  }

  function openAdminGate() {
    if (!adminModal) return;
    if (isAdmin()) { openModal("profile"); return; }
    adminModal.classList.add("open");
    if (adminErrorEl) adminErrorEl.hidden = true;
    if (adminUsernameEl) {
      adminUsernameEl.value = "";
      adminPasswordEl && (adminPasswordEl.value = "");
      adminUsernameEl.focus();
    } else if (adminPasswordEl) {
      adminPasswordEl.value = "";
      adminPasswordEl.focus();
    }
  }

  function closeAdminGate() {
    if (adminModal) adminModal.classList.remove("open");
  }

  function adminLogin() {
    if (!adminPasswordEl) return;
    var userOk = adminUsernameEl
      ? adminUsernameEl.value.trim() === ADMIN_USERNAME
      : true;
    var passOk = adminPasswordEl.value === ADMIN_PASSWORD;
    if (userOk && passOk) {
      try {
        sessionStorage.setItem(ADMIN_SESSION_KEY, "1");
        if (adminRememberEl && adminRememberEl.checked) localStorage.setItem(ADMIN_REMEMBER_KEY, "1");
      } catch (e) {}
      closeAdminGate();
      applyAdminMode();
      editMode = true;
      body.classList.add("edit-mode");
      if (editToggleBtn) editToggleBtn.textContent = "Exit edit";
      openModal("profile");
    } else {
      if (adminErrorEl) adminErrorEl.hidden = false;
      if (adminModal) {
        var m = adminModal.querySelector(".modal");
        if (m) {
          m.classList.remove("shake");
          void m.offsetWidth;
          m.classList.add("shake");
        }
      }
    }
  }

  function adminSignout() {
    try {
      sessionStorage.removeItem(ADMIN_SESSION_KEY);
      localStorage.removeItem(ADMIN_REMEMBER_KEY);
    } catch (e) {}
    editMode = false;
    body.classList.remove("edit-mode");
    if (editToggleBtn) editToggleBtn.textContent = "Edit";
    closeModal();
    applyAdminMode();
  }

  /* Publish current data for all visitors: downloads site-data.js.
     Save that file into this folder (replace site-data.js) and deploy. */
  function exportSiteData() {
    try {
      var json = JSON.stringify(state);
      var js = "/* portfolio public snapshot — generated from admin Export. Visitors load this. */\n" +
        "window.SITE_DATA = " + json + ";\n";
      var blob = new Blob([js], { type: "application/javascript" });
      var url = URL.createObjectURL(blob);
      var a = document.createElement("a");
      a.href = url;
      a.download = "site-data.js";
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      setTimeout(function () { URL.revokeObjectURL(url); }, 1000);
      var hint = document.getElementById("publish-hint");
      if (hint) {
        hint.hidden = false;
        hint.textContent = "Downloaded site-data.js — replace the file in your portfolio folder and redeploy so visitors see these changes.";
      }
    } catch (e) {}
  }

  var exportBtn = document.getElementById("export-site-btn");
  if (exportBtn) exportBtn.addEventListener("click", exportSiteData);

  if (adminLoginBtn) adminLoginBtn.addEventListener("click", adminLogin);
  if (adminPasswordEl) {
    adminPasswordEl.addEventListener("keydown", function (e) {
      if (e.key === "Enter") adminLogin();
    });
  }
  if (adminUsernameEl) {
    adminUsernameEl.addEventListener("keydown", function (e) {
      if (e.key === "Enter") {
        if (adminPasswordEl) adminPasswordEl.focus();
        else adminLogin();
      }
    });
  }
  if (adminCloseBtn) adminCloseBtn.addEventListener("click", closeAdminGate);
  if (adminModal) {
    adminModal.addEventListener("click", function (e) {
      if (e.target === adminModal) closeAdminGate();
    });
  }
  if (adminEntryBtn) adminEntryBtn.addEventListener("click", openAdminGate);
  if (adminSignoutBtn) adminSignoutBtn.addEventListener("click", adminSignout);

  /* Deep-link: portfolio.html#admin opens the admin gate directly. */
  function checkAdminHash() {
    if (String(window.location.hash || "").toLowerCase() === "#admin") openAdminGate();
  }
  window.addEventListener("hashchange", checkAdminHash);

  // ---------- Init ----------
  if (!Array.isArray(state.comments) || !state.comments.length) state.comments = loadComments();
  renderAll();
  applyAdminMode();
  checkAdminHash();

  // ---------- Loading screen ----------
  function hideLoader() {
    var loader = document.getElementById("loading-screen");
    if (loader) loader.classList.add("hidden");
  }
  if (document.readyState === "complete") {
    setTimeout(hideLoader, 400);
  } else {
    window.addEventListener("load", function () {
      setTimeout(hideLoader, 400);
    });
    setTimeout(hideLoader, 3000);
  }

  // ---------- Scroll-to-top button ----------
  var scrollTopBtn = document.getElementById("scroll-top-btn");
  if (scrollTopBtn) {
    window.addEventListener(
      "scroll",
      function () {
        scrollTopBtn.classList.toggle("visible", window.scrollY > 400);
      },
      { passive: true }
    );
    scrollTopBtn.addEventListener("click", function () {
      window.scrollTo({ top: 0, behavior: "smooth" });
    });
  }

  // ---------- Scroll progress + nav scroll-spy ----------
  var progressBar = document.querySelector("#scroll-progress span");
  var sectionIds = ["about", "services", "experience", "work", "certs", "cv", "comments", "contact"];
  var navAnchors = document.querySelectorAll('.nav-links a[href^="#"]');

  function updateScrollChrome() {
    var doc = document.documentElement;
    var max = doc.scrollHeight - window.innerHeight;
    var pct = max > 0 ? (window.scrollY / max) * 100 : 0;
    if (progressBar) progressBar.style.width = pct + "%";

    var activeId = "";
    var probeY = 100;
    for (var si = 0; si < sectionIds.length; si++) {
      var sec = document.getElementById(sectionIds[si]);
      if (!sec) continue;
      var top = sec.getBoundingClientRect().top;
      var bottom = sec.getBoundingClientRect().bottom;
      if (top <= probeY && bottom > probeY) {
        activeId = sectionIds[si];
        break;
      }
    }
    if (window.scrollY < 40) activeId = "";
    navAnchors.forEach(function (a) {
      var href = a.getAttribute("href") || "";
      a.classList.toggle("active", href === "#" + activeId);
    });
  }

  window.addEventListener("scroll", updateScrollChrome, { passive: true });
  window.addEventListener("resize", updateScrollChrome);
  updateScrollChrome();

  // ---------- Character "click me" hint ----------
  var stageEl = document.getElementById("character-stage");
  if (stageEl && !document.getElementById("char-click-hint")) {
    var hint = document.createElement("div");
    hint.id = "char-click-hint";
    hint.className = "char-click-hint";
    hint.textContent = "click me";
    hint.setAttribute("aria-hidden", "true");
    stageEl.appendChild(hint);
    setTimeout(function () {
      hint.classList.add("visible");
    }, 3200);
    setTimeout(function () {
      hint.classList.remove("visible");
      setTimeout(function () {
        if (hint.parentNode) hint.remove();
      }, 600);
    }, 14000);
    stageEl.addEventListener(
      "pointerdown",
      function () {
        hint.classList.remove("visible");
      },
      { once: true }
    );
  }

  // ---------- Particle effect generator ----------
  function createParticles(container, count) {
    if (!container) return;
    var colors = ["#c4a3ff", "#e94ecf", "#9b5cff", "#6d28d9"];
    for (var i = 0; i < count; i++) {
      var particle = document.createElement("div");
      particle.className = "particle";
      particle.style.left = Math.random() * 100 + "%";
      particle.style.top = Math.random() * 100 + "%";
      particle.style.animationDelay = Math.random() * 3 + "s";
      particle.style.animationDuration = 2 + Math.random() * 3 + "s";
      particle.style.background = colors[Math.floor(Math.random() * colors.length)];
      particle.style.width = 2 + Math.random() * 3 + "px";
      particle.style.height = particle.style.width;
      container.appendChild(particle);
    }
  }

  var particleContainer = document.getElementById("particle-container");
  if (particleContainer && !reduceMotion) createParticles(particleContainer, 25);

  // ---------- Theme toggle (day / night) ----------
  var THEME_KEY = "portfolio-theme";
  var themeToggleBtn = document.getElementById("theme-toggle");
  var metaThemeColor = document.getElementById("meta-theme-color");

  function currentTheme() {
    return document.documentElement.getAttribute("data-theme") === "light" ? "light" : "dark";
  }

  function applyTheme(theme, persist) {
    document.documentElement.setAttribute("data-theme", theme);
    if (metaThemeColor) metaThemeColor.setAttribute("content", theme === "light" ? "#f6f7fc" : "#0a0713");
    if (themeToggleBtn) {
      /* Icon shows the theme you would switch TO:
         day (light) -> moon  (click: turn night)
         night (dark) -> sun   (click: turn day) */
      var goingNight = theme === "light";
      var icon = themeToggleBtn.querySelector(".theme-icon");
      if (icon) icon.textContent = goingNight ? "🌙" : "☀️";
      themeToggleBtn.setAttribute("aria-label", goingNight ? "Switch to night theme" : "Switch to day theme");
      themeToggleBtn.setAttribute("title", goingNight ? "Night mode" : "Day mode");
      themeToggleBtn.setAttribute("aria-pressed", theme === "light" ? "true" : "false");
    }
    if (persist) {
      try { localStorage.setItem(THEME_KEY, theme); } catch (e) {}
    }
    recolorParticles();
    document.dispatchEvent(new CustomEvent("portfolio:themechange", { detail: { theme: theme } }));
  }

  function recolorParticles() {
    if (!particleContainer) return;
    var cs = getComputedStyle(document.documentElement);
    var a = cs.getPropertyValue("--accent-light").trim() || "#c4a3ff";
    var b = cs.getPropertyValue("--accent-2").trim() || "#e94ecf";
    var c = cs.getPropertyValue("--accent").trim() || "#9b5cff";
    var d = cs.getPropertyValue("--accent-deep").trim() || "#6d28d9";
    var colors = [a, b, c, d];
    var nodes = particleContainer.querySelectorAll(".particle");
    nodes.forEach(function (el, i) {
      el.style.background = colors[i % colors.length];
    });
  }

  applyTheme(currentTheme(), false);

  if (themeToggleBtn) {
    themeToggleBtn.addEventListener("click", function () {
      /* day + moon click -> night (button becomes sun)
         night + sun click -> day   (button becomes moon) */
      applyTheme(currentTheme() === "light" ? "dark" : "light", true);
      themeToggleBtn.classList.remove("flip");
      void themeToggleBtn.offsetWidth; /* restart morph animation */
      themeToggleBtn.classList.add("flip");
    });
    themeToggleBtn.addEventListener("animationend", function (e) {
      if (e.target.classList && e.target.classList.contains("theme-icon")) {
        themeToggleBtn.classList.remove("flip");
      }
    });
  }

  // ---------- Animated word rotator ----------
  var rotatorEl = document.getElementById("word-rotator");
  var rotatorWords = ["websites", "apps", "APIs", "systems", "products", "tools"];
  var rotatorIdx = 0;

  function swapWord() {
    if (!rotatorEl) return;
    var out = rotatorEl.querySelector(".rotator-word");
    rotatorIdx = (rotatorIdx + 1) % rotatorWords.length;
    var word = document.createElement("span");
    word.className = "rotator-word";
    word.textContent = rotatorWords[rotatorIdx];
    if (out) {
      out.classList.add("word-out");
      out.addEventListener("animationend", function handler() {
        out.remove();
        if (out.isConnected) out.removeEventListener("animationend", handler);
      });
      rotatorEl.appendChild(word);
      setTimeout(function () { if (out.parentNode) out.remove(); }, 400);
    } else {
      rotatorEl.appendChild(word);
    }
  }

  if (rotatorEl && !reduceMotion) {
    var rotatorTimer = setInterval(swapWord, 2400);
    document.addEventListener("visibilitychange", function () {
      if (document.hidden) {
        clearInterval(rotatorTimer);
        rotatorTimer = null;
      } else if (!rotatorTimer) {
        rotatorTimer = setInterval(swapWord, 2400);
      }
    });
  }

  /* Scroll reveal / split words handled by assets/word-anim.js */
  /* 3D character handled by assets/character.js */
})();
