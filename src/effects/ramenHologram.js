import * as THREE from 'three';

const TWO_PI = Math.PI * 2;

/**
 * Bangun cloud partikel mangkuk ramen 3D (mangkuk, kuah, mie terangkat,
 * sumpit, topping, dan uap) dalam satu BufferGeometry agar cuma 1 draw call.
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

  // 1. Mangkuk Ramen (siluet lengkung donburi + ring kaki + bibir mangkuk tebal)
  const bowlRings = 24;
  for (let i = 0; i <= bowlRings; i++) {
    const t = i / bowlRings; // 0 = dasar, 1 = bibir atas
    const y = -0.44 + t * 0.7;
    const r = 0.34 + 0.62 * Math.pow(t, 0.56);
    const isRim = i === bowlRings || i === bowlRings - 1;
    const count = isRim ? 140 : Math.floor(42 + t * 65);
    const ptSize = isRim ? 1.55 : 1.05;

    for (let j = 0; j < count; j++) {
      const a = (j / count) * TWO_PI + (i % 2) * 0.05;
      const jitter = isRim ? 0.008 : 0.015;
      push(
        Math.cos(a) * r + (Math.random() - 0.5) * jitter,
        y + (Math.random() - 0.5) * jitter,
        Math.sin(a) * r + (Math.random() - 0.5) * jitter,
        ptSize,
        0
      );
    }
  }

  // Ring kaki mangkuk di paling bawah
  for (let rStep = 0; rStep < 4; rStep++) {
    const y = -0.5 + rStep * 0.02;
    for (let j = 0; j < 44; j++) {
      const a = (j / 44) * TWO_PI;
      push(Math.cos(a) * 0.33, y, Math.sin(a) * 0.33, 1.15, 0);
    }
  }

  // Garis rusuk vertikal halus pada dinding mangkuk agar struktur terbaca
  for (let rib = 0; rib < 16; rib++) {
    const a = (rib / 16) * TWO_PI;
    for (let k = 0; k <= 16; k++) {
      const t = k / 16;
      const y = -0.44 + t * 0.7;
      const r = 0.34 + 0.62 * Math.pow(t, 0.56);
      push(Math.cos(a) * r, y, Math.sin(a) * r, 0.95, 0);
    }
  }

  // 2. Permukaan kuah & pusaran di dalam mangkuk
  for (let i = 0; i < 420; i++) {
    const t = Math.sqrt(Math.random());
    const r = t * 0.84;
    const a = Math.random() * TWO_PI;
    const ripple = Math.sin(r * 18) * 0.012;
    push(Math.cos(a) * r, 0.1 + ripple, Math.sin(a) * r, 0.85, 1);
  }

  // 3. Gulungan mie bergelombang di dalam mangkuk
  const coilStrands = 12;
  for (let s = 0; s < coilStrands; s++) {
    const baseAngle = (s / coilStrands) * TWO_PI;
    for (let k = 0; k < 55; k++) {
      const u = k / 54;
      const a = baseAngle + u * 2.4;
      const r = 0.12 + u * 0.56 + Math.sin(u * 16) * 0.04;
      const y = 0.11 + Math.sin(u * 12 + s) * 0.035;
      push(Math.cos(a) * r, y, Math.sin(a) * r, 1.15, 1);
    }
  }

  // 4. Mie yang terangkat ke atas (menuju sumpit, ciri khas hologram ramen)
  const liftedStrands = 11;
  for (let s = 0; s < liftedStrands; s++) {
    const spreadX = ((s / (liftedStrands - 1)) - 0.5) * 0.22;
    const spreadZ = Math.sin(s * 1.7) * 0.09;
    for (let k = 0; k < 44; k++) {
      const t = k / 43; // 0 = di mangkuk, 1 = puncak sumpit
      const y = 0.14 + t * 0.68;
      const waveX = Math.sin(t * Math.PI * 5 + s * 0.8) * 0.045;
      const waveZ = Math.cos(t * Math.PI * 4.5 + s * 1.1) * 0.04;
      const pinch = 1 - t * 0.65; // menyempit saat dijepit sumpit
      push(
        0.04 + spreadX * pinch + waveX,
        y,
        0.02 + spreadZ * pinch + waveZ,
        1.25,
        1
      );
    }
  }

  // 5. Topping: irisan telur (tamago), narutomaki, & daging chashu
  // Setengah telur rebus
  for (let i = 0; i < 110; i++) {
    const a = Math.random() * TWO_PI;
    const rad = Math.sqrt(Math.random());
    push(-0.36 + Math.cos(a) * rad * 0.18, 0.15 + (1 - rad) * 0.04, 0.28 + Math.sin(a) * rad * 0.13, 1.1, 1);
  }
  // Narutomaki bergelombang
  for (let i = 0; i < 90; i++) {
    const t = i / 90;
    const a = t * TWO_PI * 2.5;
    const r = t * 0.14;
    push(0.38 + Math.cos(a) * r, 0.16, 0.22 + Math.sin(a) * r, 1.15, 1);
  }
  // Chashu slice
  for (let i = 0; i < 120; i++) {
    const a = Math.random() * TWO_PI;
    const rad = Math.sqrt(Math.random()) * 0.22;
    push(0.05 + Math.cos(a) * rad, 0.14, -0.4 + Math.sin(a) * rad, 1.05, 1);
  }

  // 6. Sepasang sumpit diagonal panjang (menjepit mie yang terangkat)
  const chopsticks = [
    { start: new THREE.Vector3(-0.08, 0.72, -0.05), end: new THREE.Vector3(1.12, 1.38, 0.34) },
    { start: new THREE.Vector3(-0.06, 0.64, 0.08), end: new THREE.Vector3(1.16, 1.23, 0.48) },
  ];
  chopsticks.forEach(({ start, end }) => {
    const steps = 115;
    for (let k = 0; k <= steps; k++) {
      const t = k / steps;
      const p = new THREE.Vector3().lerpVectors(start, end, t);
      const radius = 0.012 + t * 0.012;
      // 3 titik per langkah biar garis sumpit padat & menyala jelas
      for (let c = 0; c < 3; c++) {
        const ang = (c / 3) * TWO_PI + k * 0.4;
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

  // 7. Partikel uap & kilau hologram yang naik di sekitar mangkuk
  for (let i = 0; i < 420; i++) {
    const a = Math.random() * TWO_PI;
    const r = 0.12 + Math.random() * 0.85;
    const y = Math.random() * 1.45; // di-loop oleh shader secara kontinu
    push(Math.cos(a) * r, y, Math.sin(a) * r, 0.75 + Math.random() * 0.85, 2);
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
          // Uap & partikel melayang naik terus-menerus
          float cycle = mod(pos.y + uTime * 0.28 + aPhase * 0.23, 1.55);
          pos.y = 0.12 + cycle;
          pos.x += sin(uTime * 1.4 + aPhase) * 0.06;
          pos.z += cos(uTime * 1.2 + aPhase) * 0.06;
          alpha = smoothstep(0.0, 0.25, cycle) * (1.0 - smoothstep(0.95, 1.55, cycle)) * 0.72;
        } else {
          // Efek scanline hologram naik perlahan + kilau sangat halus
          float scan = 0.5 + 0.5 * sin(pos.y * 18.0 - uTime * 3.8);
          float twinkle = 0.82 + 0.18 * sin(uTime * 4.5 + aPhase);
          alpha = (0.68 + 0.32 * scan) * twinkle;
        }

        vAlpha = alpha;
        vMix = 0.35 + 0.65 * (0.5 + 0.5 * sin(pos.y * 14.0 - uTime * 3.2 + aPhase));

        vec4 mvPosition = modelViewMatrix * vec4(pos, 1.0);
        gl_Position = projectionMatrix * mvPosition;
        gl_PointSize = clamp(aSize * uPixelRatio * (78.0 / -mvPosition.z), 1.5, 15.0);
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

        // Titik glow bulat halus (inti terang + halo cyan)
        float soft = exp(-dist * dist * 16.0);
        float core = smoothstep(0.24, 0.0, dist);
        vec3 color = mix(uColorMain, uColorCore, core * 0.75 + vMix * 0.2);

        gl_FragColor = vec4(color * 1.15, (soft * 0.48 + core * 0.36) * vAlpha);
      }
    `,
    transparent: true,
    depthWrite: false,
    blending: THREE.AdditiveBlending,
  });
}

function createProjectionBeam(rBottom, rTop, height) {
  const geo = new THREE.CylinderGeometry(rTop, rBottom, height, 32, 1, true);
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
        // Memudar di pangkal & puncak kerucut + lembut di sisi tepi
        float vertical = smoothstep(0.0, 0.18, vUv.y) * (1.0 - smoothstep(0.35, 1.0, vUv.y));
        float facing = abs(dot(normalize(vNormalView), normalize(vViewDir)));
        float scan = 0.85 + 0.15 * sin(vUv.y * 30.0 - uTime * 3.0);
        float alpha = vertical * pow(facing, 0.7) * 0.24 * scan;
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
  const geo = new THREE.CircleGeometry(radius, 40);
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
        float d = length(vUv - 0.5) * 2.0; // 0 di tengah, 1 di tepi
        if (d > 1.0) discard;

        float centerGlow = exp(-d * d * 3.5) * 0.75;
        float ring1 = smoothstep(0.045, 0.0, abs(d - 0.88));
        float pulseRing = smoothstep(0.05, 0.0, abs(d - fract(uTime * 0.45))) * (1.0 - d) * 0.6;
        float alpha = clamp(centerGlow + ring1 * 0.7 + pulseRing, 0.0, 0.9);
        gl_FragColor = vec4(uColor * 1.2, alpha);
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

  // 1. Piringan cahaya proyektor di permukaan atas silinder
  const emitter = createEmitterDisc(emitterRadius);
  emitter.mesh.position.y = 0.015;
  emitter.mesh.userData.bloom = true;
  group.add(emitter.mesh);

  // 2. Kerucut sinar hologram yang memancar ke atas
  const beamHeight = 2.05;
  const beam = createProjectionBeam(emitterRadius * 0.88, emitterRadius * 1.95, beamHeight);
  beam.mesh.position.y = beamHeight * 0.5 + 0.01;
  beam.mesh.userData.bloom = true;
  group.add(beam.mesh);

  // 3. Pivot mangkuk ramen partikel (miring + mengambang + berputar pelan)
  const bowlPivot = new THREE.Group();
  const baseHoverY = 1.48;
  bowlPivot.position.y = baseHoverY;
  bowlPivot.rotation.set(0.28, 0, -0.18); // miring agar isi mangkuk terlihat dari bawah/samping
  group.add(bowlPivot);

  const bowlGeo = buildRamenBowlGeometry();
  const bowlMat = createHologramPointsMaterial(pixelRatio);
  const bowlPoints = new THREE.Points(bowlGeo, bowlMat);
  bowlPoints.scale.setScalar(1.12);
  bowlPoints.userData.bloom = true;
  bowlPivot.add(bowlPoints);

  // 4. Cahaya cyan lokal yang menerangi bagian atap di sekitar proyektor (radius pendek)
  const holoLight = new THREE.PointLight(0x00eaff, 24, 7.0, 2);
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
      holoLight.intensity = 22 + Math.sin(elapsed * 3.2) * 3;
    },
  };
}
