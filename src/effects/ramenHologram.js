import * as THREE from 'three';

const TWO_PI = Math.PI * 2;

/**
 * Bangun cloud partikel mangkuk ramen 3D (~3.100 titik dalam 1 BufferGeometry)
 * yang ringan di GPU tapi tetap padat dan terbaca jelas.
 */
function buildRamenBowlGeometry() {
  const positions = [];
  const phases = [];
  const sizes = [];
  const kinds = []; // 0 = mangkuk, 1 = mie/topping/sumpit, 2 = uap melayang

  const push = (x, y, z, size, kind, phase = Math.random() * TWO_PI) => {
    positions.push(x, y, z);
    sizes.push(size);
    kinds.push(kind);
    phases.push(phase);
  };

  // 1. Mangkuk Ramen
  const bowlRings = 18;
  for (let i = 0; i <= bowlRings; i++) {
    const t = i / bowlRings;
    const y = -0.44 + t * 0.7;
    const r = 0.34 + 0.62 * Math.pow(t, 0.56);
    const isRim = i === bowlRings || i === bowlRings - 1;
    const count = isRim ? 100 : Math.floor(28 + t * 44);
    const ptSize = isRim ? 1.5 : 1.05;

    for (let j = 0; j < count; j++) {
      const a = (j / count) * TWO_PI + (i % 2) * 0.05;
      const jitter = isRim ? 0.008 : 0.014;
      push(
        Math.cos(a) * r + (Math.random() - 0.5) * jitter,
        y + (Math.random() - 0.5) * jitter,
        Math.sin(a) * r + (Math.random() - 0.5) * jitter,
        ptSize,
        0
      );
    }
  }

  // Ring kaki mangkuk
  for (let rStep = 0; rStep < 3; rStep++) {
    const y = -0.5 + rStep * 0.025;
    for (let j = 0; j < 32; j++) {
      const a = (j / 32) * TWO_PI;
      push(Math.cos(a) * 0.33, y, Math.sin(a) * 0.33, 1.1, 0);
    }
  }

  // Garis rusuk vertikal mangkuk
  for (let rib = 0; rib < 12; rib++) {
    const a = (rib / 12) * TWO_PI;
    for (let k = 0; k <= 12; k++) {
      const t = k / 12;
      const y = -0.44 + t * 0.7;
      const r = 0.34 + 0.62 * Math.pow(t, 0.56);
      push(Math.cos(a) * r, y, Math.sin(a) * r, 0.95, 0);
    }
  }

  // 2. Permukaan kuah
  for (let i = 0; i < 220; i++) {
    const t = Math.sqrt(Math.random());
    const r = t * 0.84;
    const a = Math.random() * TWO_PI;
    push(Math.cos(a) * r, 0.1 + Math.sin(r * 18) * 0.012, Math.sin(a) * r, 0.85, 1);
  }

  // 3. Gulungan mie di dalam mangkuk
  const coilStrands = 9;
  for (let s = 0; s < coilStrands; s++) {
    const baseAngle = (s / coilStrands) * TWO_PI;
    for (let k = 0; k < 38; k++) {
      const u = k / 37;
      const a = baseAngle + u * 2.4;
      const r = 0.12 + u * 0.56 + Math.sin(u * 16) * 0.04;
      const y = 0.11 + Math.sin(u * 12 + s) * 0.035;
      push(Math.cos(a) * r, y, Math.sin(a) * r, 1.15, 1);
    }
  }

  // 4. Mie yang terangkat ke sumpit
  const liftedStrands = 8;
  for (let s = 0; s < liftedStrands; s++) {
    const spreadX = ((s / (liftedStrands - 1)) - 0.5) * 0.22;
    const spreadZ = Math.sin(s * 1.7) * 0.09;
    for (let k = 0; k < 32; k++) {
      const t = k / 31;
      const y = 0.14 + t * 0.68;
      const waveX = Math.sin(t * Math.PI * 5 + s * 0.8) * 0.045;
      const waveZ = Math.cos(t * Math.PI * 4.5 + s * 1.1) * 0.04;
      const pinch = 1 - t * 0.65;
      push(0.04 + spreadX * pinch + waveX, y, 0.02 + spreadZ * pinch + waveZ, 1.25, 1);
    }
  }

  // 5. Topping: telur, narutomaki, & chashu
  for (let i = 0; i < 65; i++) {
    const a = Math.random() * TWO_PI;
    const rad = Math.sqrt(Math.random());
    push(-0.36 + Math.cos(a) * rad * 0.18, 0.15 + (1 - rad) * 0.04, 0.28 + Math.sin(a) * rad * 0.13, 1.1, 1);
  }
  for (let i = 0; i < 60; i++) {
    const t = i / 60;
    const a = t * TWO_PI * 2.5;
    const r = t * 0.14;
    push(0.38 + Math.cos(a) * r, 0.16, 0.22 + Math.sin(a) * r, 1.15, 1);
  }
  for (let i = 0; i < 70; i++) {
    const a = Math.random() * TWO_PI;
    const rad = Math.sqrt(Math.random()) * 0.22;
    push(0.05 + Math.cos(a) * rad, 0.14, -0.4 + Math.sin(a) * rad, 1.05, 1);
  }

  // 6. Sepasang sumpit diagonal
  const chopsticks = [
    { start: new THREE.Vector3(-0.08, 0.72, -0.05), end: new THREE.Vector3(1.12, 1.38, 0.34) },
    { start: new THREE.Vector3(-0.06, 0.64, 0.08), end: new THREE.Vector3(1.16, 1.23, 0.48) },
  ];
  chopsticks.forEach(({ start, end }) => {
    const steps = 85;
    for (let k = 0; k <= steps; k++) {
      const t = k / steps;
      const p = new THREE.Vector3().lerpVectors(start, end, t);
      const radius = 0.012 + t * 0.012;
      for (let c = 0; c < 2; c++) {
        const ang = c * Math.PI + k * 0.4;
        push(
          p.x + Math.cos(ang) * radius,
          p.y + Math.sin(ang) * radius * 0.5,
          p.z + Math.sin(ang) * radius,
          1.35,
          1
        );
      }
    }
  });

  // 7. Partikel uap
  for (let i = 0; i < 200; i++) {
    const a = Math.random() * TWO_PI;
    const r = 0.12 + Math.random() * 0.85;
    const y = Math.random() * 1.45;
    push(Math.cos(a) * r, y, Math.sin(a) * r, 0.75 + Math.random() * 0.8, 2);
  }

  const geometry = new THREE.BufferGeometry();
  geometry.setAttribute('position', new THREE.Float32BufferAttribute(positions, 3));
  geometry.setAttribute('aPhase', new THREE.Float32BufferAttribute(phases, 1));
  geometry.setAttribute('aSize', new THREE.Float32BufferAttribute(sizes, 1));
  geometry.setAttribute('aKind', new THREE.Float32BufferAttribute(kinds, 1));
  return geometry;
}

function createHologramPointsMaterial(pixelRatio = 1) {
  return new THREE.ShaderMaterial({
    uniforms: {
      uTime: { value: 0 },
      uPixelRatio: { value: pixelRatio },
      uColorCore: { value: new THREE.Color(0xc2ffff) },
      uColorMain: { value: new THREE.Color(0x00eeff) },
    },
    vertexShader: /* glsl */ `
      attribute float aPhase;
      attribute float aSize;
      attribute float aKind;

      uniform float uTime;
      uniform float uPixelRatio;

      varying float vAlpha;
      varying float vMix;

      void main() {
        vec3 pos = position;
        float alpha = 0.9;

        if (aKind > 1.5) {
          float cycle = mod(pos.y + uTime * 0.28 + aPhase * 0.23, 1.55);
          pos.y = 0.12 + cycle;
          pos.x += sin(uTime * 1.4 + aPhase) * 0.06;
          pos.z += cos(uTime * 1.2 + aPhase) * 0.06;
          alpha = smoothstep(0.0, 0.25, cycle) * (1.0 - smoothstep(0.95, 1.55, cycle)) * 0.7;
        } else {
          float scan = 0.5 + 0.5 * sin(pos.y * 18.0 - uTime * 3.8);
          float twinkle = 0.84 + 0.16 * sin(uTime * 4.5 + aPhase);
          alpha = (0.7 + 0.3 * scan) * twinkle;
        }

        vAlpha = alpha;
        vMix = 0.35 + 0.65 * (0.5 + 0.5 * sin(pos.y * 14.0 - uTime * 3.2 + aPhase));

        vec4 mvPosition = modelViewMatrix * vec4(pos, 1.0);
        gl_Position = projectionMatrix * mvPosition;
        gl_PointSize = clamp(aSize * uPixelRatio * (74.0 / -mvPosition.z), 1.5, 12.0);
      }
    `,
    fragmentShader: /* glsl */ `
      uniform vec3 uColorCore;
      uniform vec3 uColorMain;

      varying float vAlpha;
      varying float vMix;

      void main() {
        vec2 uv = gl_PointCoord - 0.5;
        float dist = length(uv);
        if (dist > 0.5) discard;

        // Polynomial falloff cepat (tanpa exp()) → jauh lebih enteng di fragment shader
        float r = 1.0 - dist * 2.0;
        float soft = r * r;
        float core = r * r * r;
        vec3 color = mix(uColorMain, uColorCore, core * 0.75 + vMix * 0.2);

        gl_FragColor = vec4(color * 1.35, (soft * 0.5 + core * 0.35) * vAlpha);
      }
    `,
    transparent: true,
    depthWrite: false,
    blending: THREE.AdditiveBlending,
  });
}

function createProjectionBeam(rBottom, rTop, height) {
  const geo = new THREE.CylinderGeometry(rTop, rBottom, height, 20, 1, true);
  const mat = new THREE.ShaderMaterial({
    uniforms: {
      uTime: { value: 0 },
      uColor: { value: new THREE.Color(0x00eaff) },
    },
    vertexShader: /* glsl */ `
      varying vec2 vUv;
      varying vec3 vNormalView;
      varying vec3 vViewDir;
      void main() {
        vUv = uv;
        vec4 mv = modelViewMatrix * vec4(position, 1.0);
        vNormalView = normalize(normalMatrix * normal);
        vViewDir = normalize(-mv.xyz);
        gl_Position = projectionMatrix * mv;
      }
    `,
    fragmentShader: /* glsl */ `
      uniform float uTime;
      uniform vec3 uColor;
      varying vec2 vUv;
      varying vec3 vNormalView;
      varying vec3 vViewDir;

      void main() {
        float vertical = smoothstep(0.0, 0.18, vUv.y) * (1.0 - smoothstep(0.35, 1.0, vUv.y));
        float facing = abs(dot(normalize(vNormalView), normalize(vViewDir)));
        float scan = 0.85 + 0.15 * sin(vUv.y * 30.0 - uTime * 3.0);
        float alpha = vertical * pow(facing, 0.7) * 0.22 * scan;
        gl_FragColor = vec4(uColor, alpha);
      }
    `,
    transparent: true,
    depthWrite: false,
    side: THREE.DoubleSide,
    blending: THREE.AdditiveBlending,
  });

  return { mesh: new THREE.Mesh(geo, mat), mat };
}

function createEmitterDisc(radius) {
  const geo = new THREE.CircleGeometry(radius, 28);
  geo.rotateX(-Math.PI / 2);

  const mat = new THREE.ShaderMaterial({
    uniforms: {
      uTime: { value: 0 },
      uColor: { value: new THREE.Color(0x33f6ff) },
    },
    vertexShader: /* glsl */ `
      varying vec2 vUv;
      void main() {
        vUv = uv;
        gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
      }
    `,
    fragmentShader: /* glsl */ `
      uniform float uTime;
      uniform vec3 uColor;
      varying vec2 vUv;

      void main() {
        float d = length(vUv - 0.5) * 2.0;
        if (d > 1.0) discard;

        float centerGlow = max(0.0, 1.0 - d * d) * 0.65;
        float ring1 = smoothstep(0.05, 0.0, abs(d - 0.88));
        float pulseRing = smoothstep(0.05, 0.0, abs(d - fract(uTime * 0.45))) * (1.0 - d) * 0.55;
        float alpha = clamp(centerGlow + ring1 * 0.65 + pulseRing, 0.0, 0.85);
        gl_FragColor = vec4(uColor * 1.25, alpha);
      }
    `,
    transparent: true,
    depthWrite: false,
    blending: THREE.AdditiveBlending,
  });

  return { mesh: new THREE.Mesh(geo, mat), mat };
}

/**
 * Pasang hologram mangkuk ramen partikel ala jesse-zhou.com tepat di atas
 * alas bundar proyektor atap (`Cylinder 3` / `bulettengah`).
 */
export function createRamenHologram(scene, modelRoot, pixelRatio = 1) {
  const projectorBase = modelRoot.getObjectByName('Cylinder 3') || modelRoot.getObjectByName('bulettengah');
  if (!projectorBase) return null;

  modelRoot.updateMatrixWorld(true);
  const box = new THREE.Box3().setFromObject(projectorBase);
  const center = box.getCenter(new THREE.Vector3());
  const size = box.getSize(new THREE.Vector3());
  const topY = box.max.y;
  const emitterRadius = Math.max(size.x, size.z) * 0.42;

  const group = new THREE.Group();
  group.name = 'ramenHologram';
  group.position.set(center.x, topY, center.z);

  const emitter = createEmitterDisc(emitterRadius);
  emitter.mesh.position.y = 0.015;
  group.add(emitter.mesh);

  const beamHeight = 2.05;
  const beam = createProjectionBeam(emitterRadius * 0.88, emitterRadius * 1.95, beamHeight);
  beam.mesh.position.y = beamHeight * 0.5 + 0.01;
  group.add(beam.mesh);

  const bowlPivot = new THREE.Group();
  const baseHoverY = 1.48;
  bowlPivot.position.y = baseHoverY;
  bowlPivot.rotation.set(0.28, 0, -0.18);
  group.add(bowlPivot);

  const bowlGeo = buildRamenBowlGeometry();
  const bowlMat = createHologramPointsMaterial(pixelRatio);
  const bowlPoints = new THREE.Points(bowlGeo, bowlMat);
  bowlPoints.scale.setScalar(1.12);
  bowlPivot.add(bowlPoints);

  const holoLight = new THREE.PointLight(0x00eaff, 22, 6.8, 2);
  holoLight.position.set(0, baseHoverY - 0.1, 0);
  group.add(holoLight);

  scene.add(group);

  return {
    group,
    update(dt, elapsed) {
      bowlMat.uniforms.uTime.value = elapsed;
      beam.mat.uniforms.uTime.value = elapsed;
      emitter.mat.uniforms.uTime.value = elapsed;

      bowlPoints.rotation.y += 0.42 * dt;
      bowlPivot.position.y = baseHoverY + Math.sin(elapsed * 1.6) * 0.055;
      holoLight.intensity = 20 + Math.sin(elapsed * 3.2) * 2.5;
    },
  };
}
