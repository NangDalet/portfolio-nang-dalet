// A single full-screen pass; motion shares the portfolio's existing render clock.
export const auroraVertexShader = `
  varying vec2 vUv;
  void main() {
    vUv = position.xy * 0.5 + 0.5;
    gl_Position = vec4(position.xy, 0.0, 1.0);
  }
`

export const auroraFragmentShader = `
  uniform float time;
  uniform float aspect;
  uniform vec2 pointer;
  varying vec2 vUv;

  void main() {
    vec2 uv = vUv;
    vec2 p = vec2((uv.x - 0.5) * aspect, uv.y);
    p += pointer * vec2(0.045, 0.025);
    float t = time * 0.12;
    vec3 color = vec3(0.012, 0.035, 0.067);

    // Broad, slowly folding curtains with a fine luminous leading edge.
    for (int i = 0; i < 4; i++) {
      float layer = float(i);
      float x = p.x * (1.3 + layer * 0.16);
      float fold = sin(x * 1.6 + t + layer * 0.9) * 0.13;
      fold += sin(x * 3.1 - t * 0.7 + layer) * 0.045;
      float center = 0.58 + layer * 0.065 + fold + p.x * 0.09;
      float d = p.y - center;
      float veil = exp(-abs(d) * (10.0 + layer * 2.0));
      float edge = exp(-d * d * 2400.0);
      float threads = 0.76 + 0.24 * sin(x * 21.0 + sin(x * 6.0 + t) * 2.0 + t);
      vec3 tint = mix(vec3(0.06, 0.48, 0.62), vec3(0.22, 0.17, 0.46), layer / 3.0);
      color += tint * (veil * 0.19 + edge * 0.11) * threads;
    }

    // Keep the reading area and edges dark so the work stays in focus.
    float horizon = smoothstep(0.08, 0.55, uv.y);
    float edgeFade = 1.0 - smoothstep(0.28, 0.85, length((uv - 0.5) * vec2(0.9, 0.65)));
    color = mix(vec3(0.012, 0.035, 0.067), color, horizon * edgeFade);
    gl_FragColor = vec4(color, 1.0);
  }
`
