/* assets/character.js — dark-red worker ball + colored expression-ball crew
   Main: dark red ball head + laptop (no lower body; CSS shades the rest).
   Behind: floating head-balls only (no hands/legs/body), each its own dark color
   and fixed expression.
   Gaze: mouse moves -> every face turns toward the mouse (head + eyes).
         mouse stops -> everyone looks back at the laptop.
   Main expression cycles only when the player clicks it (no HUD comments).
*/
(function () {
  "use strict";

  var stage = document.getElementById("character-stage");
  var mount = document.getElementById("character-canvas");
  var fallback = document.getElementById("stage-fallback");

  function showFallback() {
    if (fallback) fallback.hidden = false;
    if (mount) mount.style.display = "none";
    var ring = stage && stage.querySelector(".stage-ring");
    if (ring) ring.style.animation = "none";
  }

  if (!stage || !mount) return;
  if (typeof THREE === "undefined") {
    showFallback();
    return;
  }

  var reduceMotion = false;
  try {
    reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  } catch (e) {}

  try {
    var testCanvas = document.createElement("canvas");
    if (!testCanvas.getContext("webgl2") && !testCanvas.getContext("webgl") && !testCanvas.getContext("experimental-webgl")) {
      showFallback();
      return;
    }
  } catch (e) {
    showFallback();
    return;
  }

  var renderer;
  try {
    renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true, powerPreference: "high-performance" });
  } catch (e) {
    showFallback();
    return;
  }
  renderer.setClearColor(0x000000, 0);
  if ("outputEncoding" in renderer) renderer.outputEncoding = THREE.sRGBEncoding;
  renderer.domElement.setAttribute("aria-hidden", "true");
  mount.appendChild(renderer.domElement);

  var scene = new THREE.Scene();
  var camera = new THREE.PerspectiveCamera(38, 1, 0.1, 100);
  camera.position.set(0, 0.75, 6.4);
  camera.lookAt(0, 0.75, 0);

  scene.add(new THREE.AmbientLight(0xffffff, 0.7));
  var keyLight = new THREE.DirectionalLight(0xffffff, 1.05);
  keyLight.position.set(3, 5, 4);
  scene.add(keyLight);
  var rimLight = new THREE.PointLight(0xe94ecf, 1.3, 30);
  rimLight.position.set(-3, 1.6, 2.5);
  scene.add(rimLight);
  var fillLight = new THREE.PointLight(0x9b5cff, 0.85, 30);
  fillLight.position.set(3, -0.5, 2);
  scene.add(fillLight);

  // shared geometry for every face
  var GEO = {
    head: new THREE.SphereGeometry(0.62, 32, 32),
    ear: new THREE.SphereGeometry(0.1, 12, 12),
    horn: new THREE.ConeGeometry(0.13, 0.42, 12),
    eyeWhite: new THREE.SphereGeometry(0.15, 20, 20),
    pupil: new THREE.SphereGeometry(0.068, 16, 16),
    brow: new THREE.BoxGeometry(0.24, 0.05, 0.06),
    lapBase: new THREE.BoxGeometry(1.0, 0.06, 0.62),
    lapFrame: new THREE.BoxGeometry(1.0, 0.66, 0.05),
    lapScreen: new THREE.PlaneGeometry(0.86, 0.52)
  };

  // ------------------------------------------------------------------ main (dark red)
  var MAIN_THEME = {
    dark: { head: 0x6b1220, limb: 0x52101c, brow: 0x2a0a10, eyeWhite: 0xfff3ef, pupil: 0x160a0c, accent: 0xf0b429 },
    light: { head: 0x7a1828, limb: 0x5c1422, brow: 0x2e0c12, eyeWhite: 0xffffff, pupil: 0x14090b, accent: 0xd99a1a }
  };

  var matMain = {
    head: new THREE.MeshStandardMaterial({ color: 0x6b1220, roughness: 0.5, metalness: 0.1 }),
    limb: new THREE.MeshStandardMaterial({ color: 0x52101c, roughness: 0.5, metalness: 0.1 }),
    brow: new THREE.MeshStandardMaterial({ color: 0x2a0a10, roughness: 0.5 }),
    eyeWhite: new THREE.MeshStandardMaterial({ color: 0xfff3ef, roughness: 0.3 }),
    pupil: new THREE.MeshStandardMaterial({ color: 0x160a0c, roughness: 0.25 }),
    accent: new THREE.MeshStandardMaterial({ color: 0xf0b429, roughness: 0.35, emissive: 0xf0b429, emissiveIntensity: 0.45 }),
    horn: new THREE.MeshStandardMaterial({ color: 0x111114, roughness: 0.35, metalness: 0.35, emissive: 0x050508, emissiveIntensity: 0.4 }),
    laptop: new THREE.MeshStandardMaterial({ color: 0x050507, roughness: 0.9, metalness: 0.05 }),
    screen: (function () {
      var c = document.createElement("canvas");
      c.width = 512;
      c.height = 320;
      var ctx = c.getContext("2d");
      var grad = ctx.createLinearGradient(0, 0, 512, 320);
      grad.addColorStop(0, "#12081c");
      grad.addColorStop(1, "#1a0a28");
      ctx.fillStyle = grad;
      ctx.fillRect(0, 0, 512, 320);
      ctx.strokeStyle = "rgba(155, 92, 255, 0.35)";
      ctx.lineWidth = 2;
      for (var y = 24; y < 320; y += 22) {
        ctx.beginPath();
        ctx.moveTo(16, y);
        ctx.lineTo(512 - 16, y);
        ctx.stroke();
      }
      var g2 = ctx.createLinearGradient(80, 0, 432, 0);
      g2.addColorStop(0, "#9b5cff");
      g2.addColorStop(1, "#e94ecf");
      ctx.fillStyle = g2;
      ctx.font = "bold 150px Arial, Helvetica, sans-serif";
      ctx.textAlign = "center";
      ctx.textBaseline = "middle";
      ctx.fillText("HR", 256, 145);
      ctx.fillStyle = "rgba(246, 247, 252, 0.9)";
      ctx.font = "26px Arial, Helvetica, sans-serif";
      ctx.fillText("HUSSAIN RAZA", 256, 255);
      var tex = new THREE.CanvasTexture(c);
      if ("encoding" in tex) tex.encoding = THREE.sRGBEncoding;
      return new THREE.MeshStandardMaterial({
        map: tex,
        color: 0xffffff,
        roughness: 0.35,
        metalness: 0.05,
        emissive: 0xffffff,
        emissiveMap: tex,
        emissiveIntensity: 0.85
      });
    })()
  };

  // neutral dark face materials shared by all background balls
  var ballFaceMats = {
    brow: new THREE.MeshStandardMaterial({ color: 0x0e0a08, roughness: 0.5 }),
    eyeWhite: new THREE.MeshStandardMaterial({ color: 0xf7f4ee, roughness: 0.3 }),
    pupil: new THREE.MeshStandardMaterial({ color: 0x0a0a0c, roughness: 0.25 })
  };

  // ------------------------------------------------------------------ emotions (eyes/brows only; mouths removed)
  var EMOTIONS = {
    expressionless: {
      eyeY: 1.0, pupilY: 0, brow: 0,
      pitchOff: 0, roll: 0
    },
    happy: {
      eyeY: 0.92, pupilY: -0.02, brow: -0.25,
      pitchOff: -0.04, roll: 0.05
    },
    sad: {
      eyeY: 1.05, pupilY: 0.03, brow: 0.55,
      pitchOff: 0.12, roll: -0.06
    },
    angry: {
      eyeY: 0.88, pupilY: 0.01, brow: 0.62,
      pitchOff: -0.06, roll: 0, shake: true
    },
    excited: {
      eyeY: 1.2, pupilY: 0, brow: -0.4,
      pitchOff: -0.05, roll: 0, bounce: true
    },
    bored: {
      eyeY: 0.85, pupilY: 0.04, brow: 0.15,
      pitchOff: 0.08, roll: 0.14, droop: true
    },
    silent: {
      eyeY: 1.0, pupilY: 0, brow: 0.05,
      pitchOff: 0, roll: 0
    }
  };

  function makeFace(headGroup, mats) {
    function eye(side) {
      var g = new THREE.Group();
      g.position.set(side * 0.24, 0.08, 0.5);
      var white = new THREE.Mesh(GEO.eyeWhite, mats.eyeWhite);
      white.scale.set(1, 1, 0.92);
      g.add(white);
      var pupil = new THREE.Mesh(GEO.pupil, mats.pupil);
      pupil.position.z = 0.12;
      g.add(pupil);
      headGroup.add(g);
      return { group: g, white: white, pupil: pupil };
    }
    function brow(side) {
      var b = new THREE.Mesh(GEO.brow, mats.brow);
      b.position.set(side * 0.24, 0.32, 0.53);
      headGroup.add(b);
      return b;
    }
    var browL = brow(-1);
    var browR = brow(1);

    var face = {
      eyeL: eye(-1),
      eyeR: eye(1),
      browL: browL,
      browR: browR,
      headGroup: headGroup,
      mats: mats,
      eyeBaseY: 0.08
    };
    return face;
  }


  // ------------------------------------------------------------------ main character
  var mainHead = new THREE.Group();
  mainHead.position.set(0, 1.05, 0);
  scene.add(mainHead);
  mainHead.add(new THREE.Mesh(GEO.head, matMain.head));

  var earL = new THREE.Mesh(GEO.ear, matMain.limb);
  earL.position.set(-0.6, 0.05, 0);
  mainHead.add(earL);
  var earR = earL.clone();
  earR.position.x = 0.6;
  mainHead.add(earR);

  /* dark black horns (replaces the old antenna) */
  var hornL = new THREE.Mesh(GEO.horn, matMain.horn);
  hornL.position.set(-0.32, 0.62, 0.05);
  hornL.rotation.z = 0.45;
  hornL.rotation.x = -0.2;
  mainHead.add(hornL);
  var hornR = new THREE.Mesh(GEO.horn, matMain.horn);
  hornR.position.set(0.32, 0.62, 0.05);
  hornR.rotation.z = -0.45;
  hornR.rotation.x = -0.2;
  mainHead.add(hornR);

  var mainFace = makeFace(mainHead, matMain);

  // laptop
  var laptop = new THREE.Group();
  laptop.position.set(0, -0.18, 0.68);
  scene.add(laptop);
  laptop.add(new THREE.Mesh(GEO.lapBase, matMain.laptop));
  var lapFrame = new THREE.Mesh(GEO.lapFrame, matMain.laptop);
  lapFrame.position.set(0, 0.36, -0.28);
  lapFrame.rotation.x = -0.32;
  laptop.add(lapFrame);
  var lapScreen = new THREE.Mesh(GEO.lapScreen, matMain.screen);
  lapScreen.position.set(0, 0.36, -0.245);
  lapScreen.rotation.x = -0.32;
  laptop.add(lapScreen);

  // ------------------------------------------------------------------ background balls
  /* head-balls only — no hands, legs or body; each dark color + fixed expression */
  /* Head-balls only — no hands, legs or body. Same size as the main head,
     crown ABOVE the laptop so every face can see it clearly. */
  var BALL_DEFS = [
    { color: 0x24409a, expr: "happy",   pos: [-1.55, 0.95, -0.30], s: 1.0 }, // dark blue   left
    { color: 0xa08010, expr: "excited", pos: [-1.35, 1.95, -0.55], s: 1.0 }, // dark yellow upper-left
    { color: 0xa04a12, expr: "angry",   pos: [-0.60, 2.40, -1.00], s: 1.0 }, // dark orange top-left  (was below laptop)
    { color: 0x15706e, expr: "silent",  pos: [0.60, 2.40, -1.00],  s: 1.0 }, // dark teal   top-right (was below laptop)
    { color: 0x1f6b3a, expr: "sad",     pos: [1.35, 1.95, -0.55],  s: 1.0 }, // dark green  upper-right
    { color: 0x5a2a82, expr: "bored",   pos: [1.55, 0.95, -0.30],  s: 1.0 }  // dark purple right
  ];

  var balls = BALL_DEFS.map(function (def, i) {
    var group = new THREE.Group();
    group.position.set(def.pos[0], def.pos[1], def.pos[2]);
    group.scale.setScalar(def.s);
    scene.add(group);

    var headMat = new THREE.MeshStandardMaterial({ color: def.color, roughness: 0.5, metalness: 0.1 });
    group.add(new THREE.Mesh(GEO.head, headMat));

    var face = makeFace(group, ballFaceMats);
    return {
      def: def,
      group: group,
      face: face,
      cfg: EMOTIONS[def.expr] || EMOTIONS.expressionless,
      baseY: def.pos[1],
      phase: i * 1.7,
      yaw: 0, pitch: 0, roll: 0
    };
  });

  // ------------------------------------------------------------------ gaze
  var IDLE_MS = 1100;
  var lastMoveTime = 0;
  var mode = "work"; // "work" = everyone watches the laptop; "react" = everyone watches the mouse
  var emotion = "expressionless";
  var exprIdx = -1;
  var mouseN = { x: 0, y: 0 };
  var EXPR_CYCLE = ["happy", "excited", "sad", "angry", "bored", "silent", "expressionless"];

  var LAPTOP_TARGET = new THREE.Vector3(0, 0.1, 0.75);
  var mouseTarget = new THREE.Vector3(0, 0.55, 4);

  function setMode(next) {
    if (next === mode) return;
    mode = next;
    stage.dataset.mode = mode;
  }

  function setEmotion(next) {
    if (next === emotion) return;
    emotion = next;
    stage.dataset.emotion = emotion;
  }

  stage.addEventListener("click", function () {
    exprIdx = (exprIdx + 1) % EXPR_CYCLE.length;
    setEmotion(EXPR_CYCLE[exprIdx]);
  });

  function trackPointer(clientX, clientY) {
    var rect = stage.getBoundingClientRect();
    if (!rect.width || !rect.height) return;
    var nx = (clientX - (rect.left + rect.width / 2)) / (rect.width / 2);
    var ny = (clientY - (rect.top + rect.height / 2)) / (rect.height / 2);
    mouseN.x = Math.max(-1, Math.min(1, nx));
    mouseN.y = Math.max(-1, Math.min(1, ny));
    // world point in front of the scene; screen-down => world-down (negated y)
    mouseTarget.set(mouseN.x * 4.5, 0.55 - mouseN.y * 3.0, 4);
    lastMoveTime = performance.now();
    setMode("react");
  }

  window.addEventListener("mousemove", function (e) {
    trackPointer(e.clientX, e.clientY);
  }, { passive: true });
  window.addEventListener("touchmove", function (e) {
    if (e.touches && e.touches[0]) trackPointer(e.touches[0].clientX, e.touches[0].clientY);
  }, { passive: true });

  var _wp = new THREE.Vector3();
  function gazeAngles(obj, target, out) {
    obj.getWorldPosition(_wp);
    var dx = target.x - _wp.x;
    var dy = target.y - _wp.y;
    var dz = target.z - _wp.z;
    var horiz = Math.sqrt(dx * dx + dz * dz);
    // face is +Z: yaw = atan2(dx, dz); pitch = -atan2(dy, horiz) (up => negative => look up)
    out.yaw = Math.max(-1.15, Math.min(1.15, Math.atan2(dx, dz)));
    out.pitch = Math.max(-0.8, Math.min(0.8, -Math.atan2(dy, horiz)));
  }
  var _ang = { yaw: 0, pitch: 0 };

  // ------------------------------------------------------------------ animation
  var clock = new THREE.Clock();
  var visible = true;
  var blinkAt = performance.now() + 1500 + Math.random() * 3000;
  var blinking = 0;
  var ballBlinks = balls.map(function () { return { next: performance.now() + Math.random() * 4000, t: 0 }; });

  function lerp(a, b, t) { return a + (b - a) * t; }

  function faceGazeUpdate(headGroup, store, cfg, k, dt, now, blinkState) {
    var target = mode === "work" ? LAPTOP_TARGET : mouseTarget;
    gazeAngles(headGroup, target, _ang);

    store.yaw = lerp(store.yaw, _ang.yaw, k * 0.9);
    store.pitch = lerp(store.pitch, _ang.pitch + (cfg.pitchOff || 0), k * 0.9);
    store.roll = lerp(store.roll, cfg.roll || 0, k * 0.9);
    headGroup.rotation.y = store.yaw;
    headGroup.rotation.x = store.pitch;
    headGroup.rotation.z = store.roll;
  }

  function faceExprUpdate(face, cfg, k, blinkState, pupilX, pupilYBase) {
    // blink
    if (blinkState) {
      if (blinkState.next < performance.now() && blinkState.t <= 0) {
        blinkState.t = 1;
        blinkState.next = performance.now() + 2200 + Math.random() * 3400;
      }
      if (blinkState.t > 0) blinkState.t -= 0.014;
    }
    var blinkScale = blinkState && blinkState.t > 0
      ? (blinkState.t > 0.5 ? (1 - blinkState.t) * 2 : blinkState.t * 2)
      : 1;

    face.eyeL.white.scale.y = Math.max(0.06, cfg.eyeY * blinkScale);
    face.eyeR.white.scale.y = Math.max(0.06, cfg.eyeY * blinkScale);
    face.eyeL.group.position.y = face.eyeBaseY + cfg.pupilY;
    face.eyeR.group.position.y = face.eyeBaseY + cfg.pupilY;

    // eyes toward the mouse direction (screen-space micro-offset; head does the aim)
    var pxx = mode === "react" ? pupilX : 0;
    var pyy = mode === "react" ? -mouseN.y * 0.03 : 0.01;
    face.eyeL.pupil.position.x = pxx;
    face.eyeR.pupil.position.x = pxx;
    face.eyeL.pupil.position.z = 0.12 + pyy * 0.2;
    face.eyeR.pupil.position.z = 0.12 + pyy * 0.2;

    face.browL.rotation.z = cfg.brow;
    face.browR.rotation.z = -cfg.brow;
    var lift = cfg.brow < 0 ? 0.04 : 0;
    face.browL.position.y = 0.32 + lift;
    face.browR.position.y = 0.32 + lift;
  }

  var mainStore = { yaw: 0, pitch: -0.3, roll: 0 };

  function frame() {
    requestAnimationFrame(frame);
    if (!visible) return;

    var dt = Math.min(clock.getDelta(), 0.05);
    var t = clock.elapsedTime;
    var now = performance.now();
    var k = 1 - Math.pow(0.0001, dt);

    if (mode === "react" && now - lastMoveTime > IDLE_MS) setMode("work");

    var cfg = EMOTIONS[emotion] || EMOTIONS.expressionless;
    var pupilX = mouseN.x * 0.045;

    // ---- main gaze (always: laptop when idle, mouse when moving)
    faceGazeUpdate(mainHead, mainStore, cfg, k, dt, now, null);
    faceExprUpdate(mainFace, cfg, k, null, pupilX, 0);

    // ---- background balls: same targets, fixed expressions
    balls.forEach(function (b, i) {
      faceGazeUpdate(b.group, b, b.cfg, k, dt, now, null);
      faceExprUpdate(b.face, b.cfg, k, ballBlinks[i], pupilX, 0);
      if (!reduceMotion) {
        b.group.position.y = b.baseY + Math.sin(t * 1.3 + b.phase) * 0.02;
      }
    });

    // ---- life
    var bob = reduceMotion ? 0 : Math.sin(t * 2.1) * 0.025;
    mainHead.position.y = 1.05 + bob;
    var bounce = cfg.bounce && !reduceMotion && mode === "react" ? Math.abs(Math.sin(t * 6)) * 0.08 : 0;
    mainHead.position.y += bounce;

    matMain.accent.emissiveIntensity = 0.4 + Math.sin(t * 3) * 0.25;
    matMain.screen.emissiveIntensity = mode === "work" && !reduceMotion
      ? 1.15 + Math.sin(t * 9) * 0.35
      : 0.6;

    renderer.render(scene, camera);
  }

  // ---------------------------------------------------------------- resize/theme/lifecycle
  function resize() {
    var w = mount.clientWidth || stage.clientWidth || 400;
    var h = mount.clientHeight || stage.clientHeight || 400;
    renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2));
    renderer.setSize(w, h, false);
    camera.aspect = w / h;
    camera.updateProjectionMatrix();
    if (reduceMotion) renderer.render(scene, camera);
  }
  if (typeof ResizeObserver !== "undefined") new ResizeObserver(resize).observe(mount);
  window.addEventListener("resize", resize);
  resize();

  function applyCharacterTheme(theme) {
    var c = MAIN_THEME[theme === "light" ? "light" : "dark"];
    matMain.head.color.setHex(c.head);
    matMain.limb.color.setHex(c.limb);
    matMain.brow.color.setHex(c.brow);
    matMain.eyeWhite.color.setHex(c.eyeWhite);
    matMain.pupil.color.setHex(c.pupil);
    matMain.accent.color.setHex(c.accent);
    matMain.accent.emissive.setHex(c.accent);
    rimLight.color.setHex(theme === "light" ? 0xc9762b : 0xe94ecf);
    fillLight.color.setHex(theme === "light" ? 0x8a5a3a : 0x9b5cff);
  }
  function readTheme() {
    return document.documentElement.getAttribute("data-theme") === "light" ? "light" : "dark";
  }
  window.__characterTheme = applyCharacterTheme;
  applyCharacterTheme(readTheme());
  document.addEventListener("portfolio:themechange", function (e) {
    applyCharacterTheme((e.detail && e.detail.theme) || readTheme());
    if (reduceMotion) renderer.render(scene, camera);
  });

  document.addEventListener("visibilitychange", function () {
    visible = !document.hidden;
    if (visible) clock.getDelta();
  });
  if (typeof IntersectionObserver !== "undefined") {
    new IntersectionObserver(function (entries) {
      visible = entries[0] && entries[0].isIntersecting && !document.hidden;
      if (visible) clock.getDelta();
    }, { threshold: 0.05 }).observe(stage);
  }

  stage.dataset.mode = mode;
  stage.dataset.emotion = emotion;
  frame();

  window.__characterState = function () {
    return {
      mode: mode,
      emotion: emotion,
      headX: Number(mainHead.rotation.x.toFixed(3)),
      headY: Number(mainHead.rotation.y.toFixed(3)),
      balls: balls.map(function (b) {
        return {
          x: b.def.pos[0],
          y: b.def.pos[1],
          s: b.def.s,
          yaw: Number(b.group.rotation.y.toFixed(3)),
          expr: b.def.expr
        };
      })
    };
  };
})();
