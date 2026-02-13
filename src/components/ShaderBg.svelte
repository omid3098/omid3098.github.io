<script>
  let canvas = $state(null);
  let gl = null;
  let program = null;
  let animId = null;
  let pointCount = 0;
  let mouse = { x: -1, y: -1 };
  let targetMouse = { x: -1, y: -1 };
  let startTime = 0;
  let pulseStart = 0;
  const PULSE_DURATION = 1.0;

  const VERT = `
    attribute vec2 a_grid;
    uniform float u_time;
    uniform vec2 u_mouse;
    uniform vec2 u_resolution;
    uniform float u_cols;
    uniform float u_rows;
    uniform float u_pulse;

    varying float v_brightness;

    void main() {
      float aspect = u_resolution.x / u_resolution.y;

      vec2 cell = a_grid;
      vec2 pos = cell;

      // Subtle idle drift
      float t = u_time * 0.3;
      pos.x += sin(cell.y * 6.0 + t) * 0.003;
      pos.y += cos(cell.x * 6.0 + t * 0.7) * 0.003;

      // Mouse influence
      vec2 mPos = u_mouse;
      vec2 diff = pos - mPos;
      diff.x *= aspect;
      float dist = length(diff);
      float radius = 2.8;
      float influence = smoothstep(radius, 0.0, dist);
      influence = pow(influence, 3.0);

      // Push dots away from cursor
      vec2 dir = dist > 0.001 ? normalize(diff) : vec2(0.0);
      pos += dir * influence * 0.018;

      // Navigation ripple: expanding ring from mouse position
      float rippleT = 1.0 - u_pulse;
      float rippleR = rippleT * 3.0;
      float band = 0.5;
      float ripple = smoothstep(rippleR - band, rippleR, dist)
                   * (1.0 - smoothstep(rippleR, rippleR + band, dist));
      float rippleStrength = ripple * u_pulse;

      float totalBrightness = max(influence, rippleStrength);
      v_brightness = totalBrightness;

      vec2 clip = pos * 2.0 - 1.0;
      gl_Position = vec4(clip, 0.0, 1.0);

      float baseSize = min(u_resolution.x, u_resolution.y) / u_cols * 0.2;
      gl_PointSize = totalBrightness > 0.01 ? baseSize + totalBrightness * baseSize * 1.0 : 0.0;
    }`;

  const FRAG = `
    precision mediump float;
    varying float v_brightness;

    void main() {
      float d = length(gl_PointCoord - 0.5) * 2.0;
      float alpha = smoothstep(1.0, 0.4, d);

      vec3 accentCol = vec3(0.42, 0.70, 0.93);
      vec3 col = accentCol;

      float finalAlpha = v_brightness * 0.40;

      gl_FragColor = vec4(col, alpha * finalAlpha);
    }`;

  function compile(glCtx, type, src) {
    const s = glCtx.createShader(type);
    glCtx.shaderSource(s, src);
    glCtx.compileShader(s);
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

    // Clean up any previous context (HMR)
    destroy();

    gl = canvas.getContext('webgl', { alpha: true, premultipliedAlpha: false });
    if (!gl) return;

    const vs = compile(gl, gl.VERTEX_SHADER, VERT);
    const fs = compile(gl, gl.FRAGMENT_SHADER, FRAG);
    program = gl.createProgram();
    gl.attachShader(program, vs);
    gl.attachShader(program, fs);
    gl.linkProgram(program);
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

    gl.uniform1f(gl.getUniformLocation(program, 'u_cols'), cols);
    gl.uniform1f(gl.getUniformLocation(program, 'u_rows'), rows);

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

    mouse.x += (targetMouse.x - mouse.x) * 0.08;
    mouse.y += (targetMouse.y - mouse.y) * 0.08;

    const now = performance.now();
    const t = (now - startTime) / 1000;
    const pulseVal = Math.max(0, 1 - (now - pulseStart) / (PULSE_DURATION * 1000));

    gl.uniform1f(gl.getUniformLocation(program, 'u_time'), t);
    gl.uniform2f(gl.getUniformLocation(program, 'u_resolution'), canvas.width, canvas.height);
    gl.uniform2f(gl.getUniformLocation(program, 'u_mouse'), mouse.x, mouse.y);
    gl.uniform1f(gl.getUniformLocation(program, 'u_pulse'), pulseVal);

    gl.clearColor(0, 0, 0, 0);
    gl.clear(gl.COLOR_BUFFER_BIT);
    gl.drawArrays(gl.POINTS, 0, pointCount);

    animId = requestAnimationFrame(loop);
  }

  function onMouseMove(e) {
    targetMouse.x = e.clientX / window.innerWidth;
    targetMouse.y = 1.0 - e.clientY / window.innerHeight;
  }

  function onMouseLeave() {
    targetMouse.x = -1;
    targetMouse.y = -1;
  }

  function onNavStart() {
    pulseStart = performance.now();
  }

  $effect(() => {
    init();
    window.addEventListener('resize', resize);
    window.addEventListener('mousemove', onMouseMove);
    document.addEventListener('mouseleave', onMouseLeave);
    document.addEventListener('astro:before-preparation', onNavStart);
    return () => {
      destroy();
      window.removeEventListener('resize', resize);
      window.removeEventListener('mousemove', onMouseMove);
      document.removeEventListener('mouseleave', onMouseLeave);
      document.removeEventListener('astro:before-preparation', onNavStart);
    };
  });
</script>

<canvas bind:this={canvas} class="shader-bg" aria-hidden="true"></canvas>
