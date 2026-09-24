/* word-anim.js — split-words / split-chars heading animation + scroll reveal orchestration.
   Self-contained classic script (no modules). Safe to include on any page.

   Classes handled:
     .split-words  -> wraps each word in .word > .word-inner with --i stagger
     .split-chars  -> wraps each character in .char > .char-inner with --i stagger
     .reveal / .reveal-lines / .fade-in* / .scroll-reveal -> rise + fade on scroll
     .stagger      -> assigns --i to reveal children for sequenced entrances
*/
(function () {
  "use strict";

  var WORD_SELECTOR = ".split-words";
  var CHAR_SELECTOR = ".split-chars";
  var REVEAL_SELECTOR =
    ".reveal, .reveal-lines, .fade-in, .fade-in-left, .fade-in-right, .scroll-reveal";
  var TARGET_SELECTOR = WORD_SELECTOR + ", " + CHAR_SELECTOR + ", " + REVEAL_SELECTOR;
  var STAGGER_CAP = 14;

  var reduceMotion = false;
  try {
    reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  } catch (e) {}

  function staggerIndex(n) {
    return n > STAGGER_CAP ? STAGGER_CAP : n;
  }

  function revealAll() {
    document.querySelectorAll(TARGET_SELECTOR).forEach(function (el) {
      el.classList.add("is-visible");
    });
  }

  /* Split text nodes into <span class="word"><span class="word-inner">w</span></span>,
     preserving inner elements (a/em/strong/br/span). Each word gets --i:index. */
  function splitWords(el) {
    if (!el || el.getAttribute("data-split") === "done") return;
    var index = 0;

    function walk(parent) {
      var children = Array.prototype.slice.call(parent.childNodes);
      children.forEach(function (node) {
        if (node.nodeType === 3) {
          var text = node.textContent;
          if (!text || !text.trim()) return;
          var parts = text.split(/(\s+)/);
          var frag = document.createDocumentFragment();
          parts.forEach(function (part) {
            if (!part) return;
            if (/^\s+$/.test(part)) {
              frag.appendChild(document.createTextNode(part));
              return;
            }
            var word = document.createElement("span");
            word.className = "word";
            word.style.setProperty("--i", String(staggerIndex(index++)));
            var inner = document.createElement("span");
            inner.className = "word-inner";
            inner.textContent = part;
            word.appendChild(inner);
            frag.appendChild(word);
          });
          parent.replaceChild(frag, node);
        } else if (node.nodeType === 1) {
          if (node.tagName === "BR") return;
          walk(node);
        }
      });
    }

    walk(el);
    el.setAttribute("data-split", "done");
  }

  /* Split into per-character spans for a typewriter/stagger feel on short labels. */
  function splitChars(el) {
    if (!el || el.getAttribute("data-split") === "done") return;
    var index = 0;

    function walk(parent) {
      var children = Array.prototype.slice.call(parent.childNodes);
      children.forEach(function (node) {
        if (node.nodeType === 3) {
          var text = node.textContent;
          if (!text) return;
          var frag = document.createDocumentFragment();
          Array.prototype.forEach.call(text, function (ch) {
            if (ch === " ") {
              frag.appendChild(document.createTextNode(" "));
              return;
            }
            var box = document.createElement("span");
            box.className = "char";
            box.style.setProperty("--i", String(staggerIndex(index++)));
            var inner = document.createElement("span");
            inner.className = "char-inner";
            inner.textContent = ch;
            box.appendChild(inner);
            frag.appendChild(box);
          });
          parent.replaceChild(frag, node);
        } else if (node.nodeType === 1) {
          if (node.tagName === "BR") return;
          walk(node);
        }
      });
    }

    walk(el);
    el.setAttribute("data-split", "done");
  }

  /* Stagger: assign --i to reveal children inside .stagger containers. */
  function applyStagger() {
    document.querySelectorAll(".stagger").forEach(function (group) {
      Array.prototype.forEach.call(group.children, function (child, i) {
        if (child.matches(REVEAL_SELECTOR)) {
          child.style.setProperty("--i", String(i));
        }
      });
    });
  }

  var observer = null;

  function observe(el) {
    if (!el || el.dataset.observed === "1") return;
    el.dataset.observed = "1";
    if (observer) observer.observe(el);
    else el.classList.add("is-visible");
  }

  function collectTargets(root) {
    return Array.prototype.slice.call((root || document).querySelectorAll(TARGET_SELECTOR));
  }

  function prepare(root) {
    (root || document).querySelectorAll(WORD_SELECTOR).forEach(splitWords);
    (root || document).querySelectorAll(CHAR_SELECTOR).forEach(splitChars);
    applyStagger();
  }

  var started = false;

  function start() {
    if (started) return;
    started = true;

    if (reduceMotion || typeof IntersectionObserver === "undefined") {
      revealAll();
    } else {
      observer = new IntersectionObserver(
        function (entries) {
          entries.forEach(function (entry) {
            if (entry.isIntersecting) {
              entry.target.classList.add("is-visible");
              observer.unobserve(entry.target);
            }
          });
        },
        { threshold: 0.15, rootMargin: "0px 0px -5% 0px" }
      );
      collectTargets().forEach(observe);
    }

    /* Failsafe: never leave content invisible. */
    setTimeout(revealAll, 2500);
    watchForNewContent();
  }

  /* Content rendered after load (cards, skills, re-rendered lists) must animate too. */
  function watchForNewContent() {
    if (typeof MutationObserver === "undefined") return;
    var queue = [];
    var flushing = false;

    function flush() {
      flushing = false;
      if (!queue.length) return;
      var nodes = queue.slice();
      queue.length = 0;
      nodes.forEach(function (node) {
        if (node.nodeType !== 1) return;
        prepare(node);
        var list = [];
        if (node.matches && node.matches(TARGET_SELECTOR)) list.push(node);
        list = list.concat(collectTargets(node));
        list.forEach(observe);
      });
    }

    function schedule(nodes) {
      nodes.forEach(function (n) {
        if (n.nodeType === 1) queue.push(n);
      });
      if (!flushing) {
        flushing = true;
        setTimeout(flush, 60);
      }
    }

    new MutationObserver(function (mutations) {
      var nodes = [];
      mutations.forEach(function (m) {
        Array.prototype.forEach.call(m.addedNodes, function (n) {
          nodes.push(n);
        });
      });
      if (nodes.length) schedule(nodes);
    }).observe(document.body, { childList: true, subtree: true });
  }

  /* Split as soon as this script runs (end of body => parsed DOM). */
  prepare();

  if (document.readyState === "complete") {
    start();
  } else {
    window.addEventListener("load", start);
    setTimeout(start, 1500);
  }
})();
