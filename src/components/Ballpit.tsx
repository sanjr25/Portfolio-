import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';
import './Ballpit.css';

interface BallpitProps {
  count?: number;
  gravity?: number;
  friction?: number;
  wallBounce?: number;
  followCursor?: boolean;
  colors?: string[];
  minSize?: number;
  maxSize?: number;
  className?: string;
}

interface BallPhysics {
  mesh: THREE.Mesh;
  position: THREE.Vector3;
  velocity: THREE.Vector3;
  radius: number;
  mass: number;
}

export const Ballpit: React.FC<BallpitProps> = ({
  count = 42,
  gravity = 0.02,
  friction = 0.994,
  wallBounce = 0.85,
  followCursor = true,
  colors = ['#f59e0b', '#ec4899', '#8b5cf6', '#38bdf8', '#10b981', '#f43f5e', '#a855f7', '#06b6d4'],
  minSize = 0.8,
  maxSize = 1.6,
  className = '',
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const mousePos = useRef<{ x: number; y: number; active: boolean }>({ x: 0, y: 0, active: false });

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const width = container.clientWidth || window.innerWidth;
    const height = container.clientHeight || window.innerHeight;

    // Scene
    const scene = new THREE.Scene();

    // Camera
    const camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 1000);
    camera.position.z = 25;

    // High performance renderer setup
    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true, powerPreference: 'high-performance' });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.5));
    renderer.shadowMap.enabled = false;

    const canvas = renderer.domElement;
    canvas.className = 'ballpit-canvas';
    container.appendChild(canvas);

    // Multi-color ambient & point lights
    const ambientLight = new THREE.AmbientLight(0xffffff, 1.4);
    scene.add(ambientLight);

    const pinkLight = new THREE.PointLight(0xec4899, 3, 50);
    pinkLight.position.set(15, 15, 10);
    scene.add(pinkLight);

    const cyanLight = new THREE.PointLight(0x38bdf8, 3, 50);
    cyanLight.position.set(-15, -15, 10);
    scene.add(cyanLight);

    const amberLight = new THREE.PointLight(0xf59e0b, 2.5, 50);
    amberLight.position.set(0, 20, -5);
    scene.add(amberLight);

    // Bounds calculation
    const getBoundsAtZ0 = () => {
      const vFov = (camera.fov * Math.PI) / 180;
      const h = 2 * Math.tan(vFov / 2) * camera.position.z;
      const w = h * camera.aspect;
      return { width: w, height: h, depth: 10 };
    };

    let bounds = getBoundsAtZ0();

    const geometry = new THREE.SphereGeometry(1, 16, 16);

    // Highly reflective and vivid MeshStandardMaterial
    const materials = colors.map(
      (color) =>
        new THREE.MeshStandardMaterial({
          color: new THREE.Color(color),
          roughness: 0.1,
          metalness: 0.3,
          transparent: true,
          opacity: 0.95,
        })
    );

    // Instantiate balls
    const balls: BallPhysics[] = [];

    for (let i = 0; i < count; i++) {
      const radius = minSize + Math.random() * (maxSize - minSize);
      const mat = materials[Math.floor(Math.random() * materials.length)];

      const mesh = new THREE.Mesh(geometry, mat);
      mesh.scale.set(radius, radius, radius);

      const posX = (Math.random() - 0.5) * (bounds.width * 0.7);
      const posY = (Math.random() - 0.5) * (bounds.height * 0.7);
      const posZ = (Math.random() - 0.5) * 4;

      mesh.position.set(posX, posY, posZ);
      scene.add(mesh);

      balls.push({
        mesh,
        position: mesh.position,
        velocity: new THREE.Vector3(
          (Math.random() - 0.5) * 0.06,
          (Math.random() - 0.5) * 0.06,
          (Math.random() - 0.5) * 0.03
        ),
        radius,
        mass: radius * radius,
      });
    }

    // Mouse Interaction
    const handleMouseMove = (e: MouseEvent) => {
      const rect = container.getBoundingClientRect();
      const x = ((e.clientX - rect.left) / rect.width) * 2 - 1;
      const y = -((e.clientY - rect.top) / rect.height) * 2 + 1;

      const vec = new THREE.Vector3(x, y, 0.5);
      vec.unproject(camera);
      const dir = vec.sub(camera.position).normalize();
      const distance = -camera.position.z / dir.z;
      const pos = camera.position.clone().add(dir.multiplyScalar(distance));

      mousePos.current = { x: pos.x, y: pos.y, active: true };
    };

    const handleMouseLeave = () => {
      mousePos.current.active = false;
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    container.addEventListener('mouseleave', handleMouseLeave);

    const handleResize = () => {
      if (!container) return;
      const w = container.clientWidth || window.innerWidth;
      const h = container.clientHeight || window.innerHeight;
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      renderer.setSize(w, h);
      bounds = getBoundsAtZ0();
    };

    window.addEventListener('resize', handleResize, { passive: true });

    // Physics Animation Loop
    let animationFrameId: number;

    const animate = () => {
      animationFrameId = requestAnimationFrame(animate);

      const halfW = bounds.width / 2;
      const halfH = bounds.height / 2;
      const halfD = bounds.depth / 2;

      for (let i = 0; i < balls.length; i++) {
        const b = balls[i];

        b.velocity.y -= gravity * 0.08;

        if (followCursor && mousePos.current.active) {
          const dx = mousePos.current.x - b.position.x;
          const dy = mousePos.current.y - b.position.y;
          const distSq = dx * dx + dy * dy;

          if (distSq < 49 && distSq > 0.01) {
            const dist = Math.sqrt(distSq);
            const force = (1 - dist / 7) * 0.03;
            b.velocity.x -= (dx / dist) * force;
            b.velocity.y -= (dy / dist) * force;
          }
        }

        b.velocity.multiplyScalar(friction);
        b.position.add(b.velocity);

        // Bounds check
        if (b.position.x - b.radius < -halfW) {
          b.position.x = -halfW + b.radius;
          b.velocity.x = -b.velocity.x * wallBounce;
        } else if (b.position.x + b.radius > halfW) {
          b.position.x = halfW - b.radius;
          b.velocity.x = -b.velocity.x * wallBounce;
        }

        if (b.position.y - b.radius < -halfH) {
          b.position.y = -halfH + b.radius;
          b.velocity.y = -b.velocity.y * wallBounce;
        } else if (b.position.y + b.radius > halfH) {
          b.position.y = halfH - b.radius;
          b.velocity.y = -b.velocity.y * wallBounce;
        }

        if (b.position.z - b.radius < -halfD) {
          b.position.z = -halfD + b.radius;
          b.velocity.z = -b.velocity.z * wallBounce;
        } else if (b.position.z + b.radius > halfD) {
          b.position.z = halfD - b.radius;
          b.velocity.z = -b.velocity.z * wallBounce;
        }

        // Fast pairwise collision
        for (let j = i + 1; j < balls.length; j++) {
          const b2 = balls[j];
          const dx = b.position.x - b2.position.x;
          const dy = b.position.y - b2.position.y;
          const dz = b.position.z - b2.position.z;
          const distSq = dx * dx + dy * dy + dz * dz;
          const minDist = b.radius + b2.radius;

          if (distSq < minDist * minDist && distSq > 0.0001) {
            const dist = Math.sqrt(distSq);
            const normalX = dx / dist;
            const normalY = dy / dist;
            const normalZ = dz / dist;
            const overlap = (minDist - dist) * 0.5;

            b.position.x += normalX * overlap;
            b.position.y += normalY * overlap;
            b.position.z += normalZ * overlap;

            b2.position.x -= normalX * overlap;
            b2.position.y -= normalY * overlap;
            b2.position.z -= normalZ * overlap;

            const relVelX = b.velocity.x - b2.velocity.x;
            const relVelY = b.velocity.y - b2.velocity.y;
            const relVelZ = b.velocity.z - b2.velocity.z;

            const velAlongNormal = relVelX * normalX + relVelY * normalY + relVelZ * normalZ;

            if (velAlongNormal < 0) {
              const impulse = (2 * velAlongNormal) / (b.mass + b2.mass);
              b.velocity.x -= impulse * b2.mass * wallBounce * normalX;
              b.velocity.y -= impulse * b2.mass * wallBounce * normalY;
              b.velocity.z -= impulse * b2.mass * wallBounce * normalZ;

              b2.velocity.x += impulse * b.mass * wallBounce * normalX;
              b2.velocity.y += impulse * b.mass * wallBounce * normalY;
              b2.velocity.z += impulse * b.mass * wallBounce * normalZ;
            }
          }
        }
      }

      renderer.render(scene, camera);
    };

    animate();

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('mousemove', handleMouseMove);
      container.removeEventListener('mouseleave', handleMouseLeave);
      window.removeEventListener('resize', handleResize);
      if (container.contains(canvas)) {
        container.removeChild(canvas);
      }
      geometry.dispose();
      materials.forEach((m) => m.dispose());
      renderer.dispose();
    };
  }, [count, gravity, friction, wallBounce, followCursor, colors, minSize, maxSize]);

  return <div ref={containerRef} className={`ballpit-container ${className}`} />;
};

export default Ballpit;
