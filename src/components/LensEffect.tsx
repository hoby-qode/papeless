// LensEffect.js
import { useEffect, useRef } from "react";
import * as THREE from "three";

const LensEffect = ({ selector = ".product-card" }) => {
  const canvasRef = useRef();

  useEffect(() => {
    const renderer = new THREE.WebGLRenderer({
      alpha: true,
      canvas: canvasRef.current,
    });
    renderer.setSize(window.innerWidth, window.innerHeight);
    const scene = new THREE.Scene();
    const camera = new THREE.OrthographicCamera(-1, 1, 1, -1, 0.1, 10);
    camera.position.z = 1;

    const uniforms = {
      u_mouse: { value: new THREE.Vector2(0.0, 0.0) },
      u_radius: { value: 0.25 },
    };

    const geometry = new THREE.PlaneGeometry(2, 2);
    const material = new THREE.ShaderMaterial({
      uniforms,
      vertexShader: `
        varying vec2 vUv;
        void main() {
          vUv = uv;
          gl_Position = vec4(position, 1.0);
        }
      `,
      fragmentShader: `
        uniform vec2 u_mouse;
        uniform float u_radius;
        varying vec2 vUv;

        void main() {
          float dist = distance(vUv, u_mouse);
          if (dist < u_radius) {
            vec2 offset = (vUv - u_mouse) * 0.2;
            gl_FragColor = vec4(1.0 - dist, 1.0, 1.0, 0.5);
          } else {
            gl_FragColor = vec4(0.0);
          }
        }
      `,
      transparent: true,
    });

    const plane = new THREE.Mesh(geometry, material);
    scene.add(plane);

    const animate = () => {
      requestAnimationFrame(animate);

      // Simule que la "loupe" est au centre de l’écran
      uniforms.u_mouse.value.set(0.5, 0.5);

      renderer.render(scene, camera);
    };

    animate();
  }, []);

  return (
    <canvas
      ref={canvasRef}
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        pointerEvents: "none",
        width: "100%",
        height: "100%",
        zIndex: 20,
        mixBlendMode: "screen",
      }}
    />
  );
};

export default LensEffect;
