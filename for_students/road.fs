varying vec2 v_uv;

float random(in vec2 st) {
    return fract(sin(dot(st.xy, vec2(12.9898, 78.233))) * 43758.5453123);
}

vec2 random2(vec2 p) {
    return fract(
        sin(vec2(dot(p, vec2(127.1, 311.7)), dot(p, vec2(269.5, 183.3)))) *
        43758.5453);
}

float cellular(vec2 p) {
    vec2 i_st = floor(p);
    vec2 f_st = fract(p);
    float m_dist = 10.;
    for (int j = -1; j <= 1; j++) {
        for (int i = -1; i <= 1; i++) {
            vec2 neighbor = vec2(float(i), float(j));
            vec2 point = random2(i_st + neighbor);
            point = 0.5 + 0.5 * sin(6.2831 * point);
            vec2 diff = neighbor + point - f_st;
            float dist = length(diff);
            if (dist < m_dist) {
                m_dist = dist;
            }
        }
    }
    return m_dist;
}

void main() {
    vec2 st = v_uv;
    st *= 5.;
    float v0 =
        smoothstep(0.0, 1.0, ((cellular(st) - cellular(st - vec2(0.0, 0.3)))));
    float v1 = random(st) * 0.5 + 0.5;
    vec3 color = vec3(0.1);
    color = mix(color, vec3(1.0, 0.9, 0.8), v0 * 5.0);
    color *= v1;

    gl_FragColor = vec4(color, 1.0);
}
