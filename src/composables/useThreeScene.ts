import { onMounted, onUnmounted, shallowRef, type Ref } from 'vue';
import * as THREE from 'three';

export function useThreeScene(containerRef: Ref<HTMLElement | null>) {
  const scene = shallowRef(new THREE.Scene());
  const camera = shallowRef<THREE.PerspectiveCamera | null>(null);
  const renderer = shallowRef<THREE.WebGLRenderer | null>(null);
  let animationFrameId = 0;

  const init = () => {
    if (!containerRef.value) return;

    // 1. Scene setup
    scene.value.background = new THREE.Color('#0a0a0a');
    scene.value.fog = new THREE.FogExp2('#0a0a0a', 0.02);

    // 2. Camera setup
    const width = containerRef.value.clientWidth;
    const height = containerRef.value.clientHeight;
    camera.value = new THREE.PerspectiveCamera(45, width / height, 0.1, 1000);
    camera.value.position.set(40, 20, 40);
    camera.value.lookAt(0, 5, 0);

    // 3. Renderer setup
    renderer.value = new THREE.WebGLRenderer({ 
      antialias: true,
      alpha: true,
      powerPreference: 'high-performance'
    });
    
    // Performance: Cap device pixel ratio to 2
    renderer.value.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.value.setSize(width, height);
    renderer.value.shadowMap.enabled = true;
    renderer.value.shadowMap.type = THREE.PCFSoftShadowMap;
    renderer.value.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.value.toneMappingExposure = 1.3; // Brighter exposure for V-Ray style render

    containerRef.value.appendChild(renderer.value.domElement);

    // 4. Resize Handler
    window.addEventListener('resize', onWindowResize);

    // 5. Start Loop
    startLoop();
  };

  const onWindowResize = () => {
    if (!containerRef.value || !camera.value || !renderer.value) return;
    
    const width = window.innerWidth;
    const height = window.innerHeight;

    camera.value.aspect = width / height;
    camera.value.updateProjectionMatrix();
    renderer.value.setSize(width, height);
  };

  const startLoop = () => {
    if (!renderer.value || !scene.value || !camera.value) return;

    const render = () => {
      animationFrameId = requestAnimationFrame(render);
      renderer.value!.render(scene.value, camera.value!);
    };
    render();
  };

  const destroy = () => {
    window.removeEventListener('resize', onWindowResize);
    cancelAnimationFrame(animationFrameId);
    
    if (renderer.value && containerRef.value) {
      containerRef.value.removeChild(renderer.value.domElement);
      renderer.value.dispose();
    }
    
    // Clean up geometries and materials
    scene.value.traverse((object: THREE.Object3D) => {
      if (object instanceof THREE.Mesh) {
        if (object.geometry) object.geometry.dispose();
        if (object.material) {
          if (Array.isArray(object.material)) {
            object.material.forEach((mat: THREE.Material) => mat.dispose());
          } else {
            object.material.dispose();
          }
        }
      }
    });
  };

  onMounted(() => {
    init();
  });

  onUnmounted(() => {
    destroy();
  });

  return {
    scene,
    camera,
    renderer
  };
}
