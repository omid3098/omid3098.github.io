<script>
  let canvas = $state(null);
  let gl = null;
  let program = null;
  let animId = null;
  let pointCount = 0;
  let uni = {};
  let mouse = { x: -1, y: -1 };
  let targetMouse = { x: -1, y: -1 };
  let startTime = 0;
  let pulseStart = 0;
  const PULSE_DURATION = 1.0;
  let hover = { x: 0.5, y: 0.5, hw: 0, hh: 0, str: 0 };
  let hoverVel = { x: 0, y: 0, hw: 0, hh: 0 };
  let targetHover = { x: 0.5, y: 0.5, hw: 0, hh: 0, str: 0 };
  const SPRING = 0.04;
  const DAMPING = 0.84;

  const VERT = `
    attribute vec2 a_grid;
    uniform float u_time;
    uniform vec2 u_mouse;
    uniform vec2 u_resolution;
    uniform float u_cols;
    uniform float u_rows;
    uniform float u_pulse;
    uniform vec4 u_hoverRect; // centerX, centerY, halfW, halfH
    uniform float u_hoverStr;

    varying float v_brightness;
    varying float v_biolum;

    void main() {
      float aspect = u_resolution.x / u_resolution.y;

      vec2 cell = a_grid;
      vec2 pos = cell;

      // Idle drift (layered for organic feel)
      float t = u_time * 0.3;
      pos.x += sin(cell.y * 6.0 + t) * 0.005;
      pos.y += cos(cell.x * 6.0 + t * 0.7) * 0.005;
      pos.x += sin(cell.y * 3.0 + t * 1.3) * 0.002;
      pos.y += cos(cell.x * 4.0 + t * 0.9) * 0.002;

      // Breathing — organic idle pulse (~5s cycle)
      float breathPhase = u_time * 1.2;
      vec2 bCenter = vec2(0.5, 0.5);
      vec2 bDiffRaw = pos - bCenter;
      vec2 bDiff = bDiffRaw;
      bDiff.x *= aspect;
      float bDist = length(bDiff);

      float globalPulse = pow(sin(breathPhase) * 0.5 + 0.5, 1.5);
      float spatialWave = sin(bDist * 3.0 - breathPhase * 0.7) * 0.5 + 0.5;
      float breath = globalPulse * 0.65 + spatialWave * 0.35;
      breath *= smoothstep(2.0, 0.1, bDist);
      float breathBrightness = breath * 0.15;

      // Breathing displacement — expand/contract from center
      vec2 breathDir = length(bDiffRaw) > 0.001 ? normalize(bDiffRaw) : vec2(0.0);
      pos += breathDir * globalPulse * 0.003;

      // Mouse influence
      vec2 mPos = u_mouse;
      vec2 diff = pos - mPos;
      diff.x *= aspect;
      float dist = length(diff);
      float radius = 2.8;
      float influence = smoothstep(radius, 0.0, dist);
      influence = pow(influence, 3.0);

      // Push dots away from cursor — suppressed when hovering content
      float repulsionStr = 1.0 - u_hoverStr;
      vec2 dir = dist > 0.001 ? normalize(diff) : vec2(0.0);
      pos += dir * influence * 0.018 * repulsionStr;

      // Navigation ripple: expanding ring from mouse position
      float rippleT = 1.0 - u_pulse;
      float rippleR = rippleT * 3.0;
      float band = 0.5;
      float ripple = smoothstep(rippleR - band, rippleR, dist)
                   * (1.0 - smoothstep(rippleR, rippleR + band, dist));
      float rippleStrength = ripple * u_pulse;

      // Content hover glow (rectangle SDF)
      vec2 hPos = pos - u_hoverRect.xy;
      hPos.x *= aspect;
      vec2 hHalf = u_hoverRect.zw;
      hHalf.x *= aspect;
      vec2 hd = abs(hPos) - hHalf;
      float rectDist = length(max(hd, 0.0)) + min(max(hd.x, hd.y), 0.0);
      float rectGlow = 1.0 - smoothstep(0.0, 0.25, rectDist);

      // Attract particles toward nearest rect edge (SDF-based)
      vec2 nearest = clamp(hPos, -hHalf, hHalf);
      vec2 toRect = nearest - hPos;
      toRect.x /= aspect;
      pos += toRect * rectGlow * u_hoverStr * 0.5;

      // Bioluminescence — slow diagonal wave, faded toward content center
      float bioTime = u_time * 0.18;
      vec2 bioDir = normalize(vec2(1.0, 0.7));
      float bioDot = dot(pos, bioDir);
      float bioWave1 = pow(sin(bioDot * 5.0 - bioTime * 2.0) * 0.5 + 0.5, 3.0);
      float bioWave2 = pow(sin(bioDot * 3.0 + bioTime * 1.3 + 1.5) * 0.5 + 0.5, 4.0);
      float bio = bioWave1 * 0.7 + bioWave2 * 0.3;

      // Vignette mask — strong at edges, fades toward content center
      vec2 edgeDist = abs(pos - 0.5) * 2.0;
      float vignette = smoothstep(0.3, 1.0, max(edgeDist.x, edgeDist.y));

      float bioBrightness = bio * vignette * 0.8;
      v_biolum = bio * vignette;

      // Blend: mouse brightness → rect brightness when hovering
      float activeBrightness = mix(influence, rectGlow * 1.4, u_hoverStr);

      float totalBrightness = max(max(activeBrightness, rippleStrength), breathBrightness) + bioBrightness;
      v_brightness = totalBrightness;

      vec2 clip = pos * 2.0 - 1.0;
      gl_Position = vec4(clip, 0.0, 1.0);

      float baseSize = min(u_resolution.x, u_resolution.y) / u_cols * 0.2;
      gl_PointSize = totalBrightness > 0.01 ? baseSize + totalBrightness * baseSize * 1.0 : 0.0;
    }`;

  const FRAG = `
    precision mediump float;
    varying float v_brightness;
    varying float v_biolum;

    void main() {
      float d = length(gl_PointCoord - 0.5) * 2.0;
      float alpha = smoothstep(1.0, 0.4, d);

      vec3 accentCol = vec3(0.42, 0.70, 0.93);
      vec3 bioCol = vec3(0.28, 0.82, 0.74);
      vec3 col = mix(accentCol, bioCol, v_biolum * 1.0);

      float finalAlpha = v_brightness * 0.40;

      gl_FragColor = vec4(col, alpha * finalAlpha);
    }`;

  function compile(glCtx, type, src) {
    const s = glCtx.createShader(type);
    glCtx.shaderSource(s, src);
    glCtx.compileShader(s);
    if (!glCtx.getShaderParameter(s, glCtx.COMPILE_STATUS)) {
      console.error('Shader compile error:', glCtx.getShaderInfoLog(s));
      glCtx.deleteShader(s);
      return null;
    }
    return s;
  }

  function destroy() {
    if (animId) cancelAnimationFrame(animId);
    animId = null;
    if (gl) {
      const ext = gl.getExtension('WEBGL_lose_context');
      if (ext) ext.loseContext();
      gl = null;
    }
    program = null;
  }

  function init() {
    if (!canvas) return;
    if (window.innerWidth <= 768) return;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    // Clean up any previous context (HMR)
    destroy();

    gl = canvas.getContext('webgl', { alpha: true, premultipliedAlpha: false });
    if (!gl) return;

    const vs = compile(gl, gl.VERTEX_SHADER, VERT);
    const fs = compile(gl, gl.FRAGMENT_SHADER, FRAG);
    if (!vs || !fs) return;
    program = gl.createProgram();
    gl.attachShader(program, vs);
    gl.attachShader(program, fs);
    gl.linkProgram(program);
    if (!gl.getProgramParameter(program, gl.LINK_STATUS)) {
      console.error('Program link error:', gl.getProgramInfoLog(program));
      return;
    }
    gl.useProgram(program);

    // Generate grid points
    const cols = 45;
    const rows = 30;
    const points = [];
    for (let r = 0; r < rows; r++) {
      for (let c = 0; c < cols; c++) {
        points.push(
          (c + 0.5) / cols,
          (r + 0.5) / rows
        );
      }
    }
    pointCount = cols * rows;

    const buf = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, buf);
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(points), gl.STATIC_DRAW);
    const loc = gl.getAttribLocation(program, 'a_grid');
    gl.enableVertexAttribArray(loc);
    gl.vertexAttribPointer(loc, 2, gl.FLOAT, false, 0, 0);

    uni = {
      time: gl.getUniformLocation(program, 'u_time'),
      resolution: gl.getUniformLocation(program, 'u_resolution'),
      mouse: gl.getUniformLocation(program, 'u_mouse'),
      pulse: gl.getUniformLocation(program, 'u_pulse'),
      hoverRect: gl.getUniformLocation(program, 'u_hoverRect'),
      hoverStr: gl.getUniformLocation(program, 'u_hoverStr'),
      cols: gl.getUniformLocation(program, 'u_cols'),
      rows: gl.getUniformLocation(program, 'u_rows'),
    };
    gl.uniform1f(uni.cols, cols);
    gl.uniform1f(uni.rows, rows);

    gl.enable(gl.BLEND);
    gl.blendFunc(gl.SRC_ALPHA, gl.ONE_MINUS_SRC_ALPHA);

    startTime = performance.now();
    resize();
    loop();
  }

  function resize() {
    if (!canvas || !gl) return;
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    gl.viewport(0, 0, canvas.width, canvas.height);
  }

  function loop() {
    if (!gl || !program) return;
    if (document.hidden) {
      animId = null;
      return;
    }

    mouse.x += (targetMouse.x - mouse.x) * 0.05;
    mouse.y += (targetMouse.y - mouse.y) * 0.05;
    // Spring physics for elastic hover rect transitions
    hoverVel.x += (targetHover.x - hover.x) * SPRING;
    hoverVel.y += (targetHover.y - hover.y) * SPRING;
    hoverVel.hw += (targetHover.hw - hover.hw) * SPRING;
    hoverVel.hh += (targetHover.hh - hover.hh) * SPRING;
    hoverVel.x *= DAMPING;
    hoverVel.y *= DAMPING;
    hoverVel.hw *= DAMPING;
    hoverVel.hh *= DAMPING;
    hover.x += hoverVel.x;
    hover.y += hoverVel.y;
    hover.hw += hoverVel.hw;
    hover.hh += hoverVel.hh;
    hover.str += (targetHover.str - hover.str) * 0.07;

    const now = performance.now();
    const t = (now - startTime) / 1000;
    const pulseVal = Math.max(0, 1 - (now - pulseStart) / (PULSE_DURATION * 1000));

    gl.uniform1f(uni.time, t);
    gl.uniform2f(uni.resolution, canvas.width, canvas.height);
    gl.uniform2f(uni.mouse, mouse.x, mouse.y);
    gl.uniform1f(uni.pulse, pulseVal);
    gl.uniform4f(uni.hoverRect, hover.x, hover.y, hover.hw, hover.hh);
    gl.uniform1f(uni.hoverStr, hover.str);

    gl.clearColor(0, 0, 0, 0);
    gl.clear(gl.COLOR_BUFFER_BIT);
    gl.drawArrays(gl.POINTS, 0, pointCount);

    animId = requestAnimationFrame(loop);
  }

  function onMouseMove(e) {
    targetMouse.x = e.clientX / window.innerWidth;
    targetMouse.y = 1.0 - e.clientY / window.innerHeight;

    const el = document.elementFromPoint(e.clientX, e.clientY);
    const item = el && (el.closest('.content-item') || el.closest('.activity-item'));
    if (item) {
      const rect = item.getBoundingClientRect();
      targetHover.x = (rect.left + rect.width / 2) / window.innerWidth;
      targetHover.y = 1.0 - (rect.top + rect.height / 2) / window.innerHeight;
      targetHover.hw = (rect.width / 2) / window.innerWidth;
      targetHover.hh = (rect.height / 2) / window.innerHeight;
      targetHover.str = 1;
    } else {
      targetHover.str = 0;
    }
  }

  function onMouseLeave() {
    targetMouse.x = -1;
    targetMouse.y = -1;
    targetHover.str = 0;
  }

  function onNavStart() {
    pulseStart = performance.now();
    targetHover.str = 0;
  }

  function onVisibilityChange() {
    if (!document.hidden && gl && program && animId === null) {
      loop();
    }
  }

  $effect(() => {
    init();
    window.addEventListener('resize', resize);
    window.addEventListener('mousemove', onMouseMove);
    document.addEventListener('mouseleave', onMouseLeave);
    document.addEventListener('astro:before-preparation', onNavStart);
    document.addEventListener('visibilitychange', onVisibilityChange);
    return () => {
      destroy();
      window.removeEventListener('resize', resize);
      window.removeEventListener('mousemove', onMouseMove);
      document.removeEventListener('mouseleave', onMouseLeave);
      document.removeEventListener('astro:before-preparation', onNavStart);
      document.removeEventListener('visibilitychange', onVisibilityChange);
    };
  });
</script>

<canvas bind:this={canvas} class="shader-bg" aria-hidden="true"></canvas>
