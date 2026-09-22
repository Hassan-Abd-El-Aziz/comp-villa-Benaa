<script setup lang="ts">
import { ref, watch, onMounted } from 'vue';
import * as THREE from 'three';
import { useThreeScene } from '../../composables/useThreeScene';
import { useScrollAnimation } from '../../composables/useScrollAnimation';
import BuildingModel from './BuildingModel.vue';

const canvasContainer = ref<HTMLElement | null>(null);
const buildingModelRef = ref<InstanceType<typeof BuildingModel> | null>(null);

const { scene, camera, renderer } = useThreeScene(canvasContainer);

const setupEnvironment = (sceneInstance: THREE.Scene) => {
  // Global illumination simulation
  const hemiLight = new THREE.HemisphereLight(0xffffff, 0x444444, 0.6);
  hemiLight.position.set(0, 20, 0);
  sceneInstance.add(hemiLight);

  const ambientLight = new THREE.AmbientLight(0xffffff, 0.4); 
  sceneInstance.add(ambientLight);

  // Main Sun (Warm architectural light)
  const sunLight = new THREE.DirectionalLight(0xfff5e6, 2.8); 
  sunLight.position.set(30, 50, 40);
  sunLight.castShadow = true;
  sunLight.shadow.mapSize.width = 2048;
  sunLight.shadow.mapSize.height = 2048;
  sunLight.shadow.camera.near = 0.5;
  sunLight.shadow.camera.far = 150;
  sunLight.shadow.camera.left = -30;
  sunLight.shadow.camera.right = 30;
  sunLight.shadow.camera.top = 30;
  sunLight.shadow.camera.bottom = -30;
  sunLight.shadow.bias = -0.0005; // Fix shadow acne
  sceneInstance.add(sunLight);

  // Fill Light (Cool sky bounce)
  const fillLight = new THREE.DirectionalLight(0x88bbff, 0.8);
  fillLight.position.set(-20, 20, -20);
  sceneInstance.add(fillLight);

  // Studio Presentation Ground
  const groundGeo = new THREE.PlaneGeometry(200, 200);
  const groundMat = new THREE.MeshStandardMaterial({ 
    color: 0x1a1a1a,
    roughness: 0.2, // Slight reflection for a premium showroom feel
    metalness: 0.1
  });
  const ground = new THREE.Mesh(groundGeo, groundMat);
  ground.rotation.x = -Math.PI / 2;
  ground.position.y = -0.5;
  ground.receiveShadow = true;
  sceneInstance.add(ground);

  const gridHelper = new THREE.GridHelper(100, 50, 0x333333, 0x222222);
  gridHelper.position.y = -0.49;
  sceneInstance.add(gridHelper);
};

watch(scene, (newScene) => {
  if (newScene) {
    setupEnvironment(newScene);
  }
}, { immediate: true });

// Once building model is mounted and we have camera, initialize scroll animations
watch([buildingModelRef, camera], ([model, cam]) => {
  if (model && cam && scene.value) {
    const groups = {
      foundationGroup: model.foundationGroup,
      structureGroup: model.structureGroup,
      mepGroup: model.mepGroup,
      finishingGroup: model.finishingGroup,
      envGroup: model.envGroup,
      buildingGroup: model.buildingGroup
    };
    
    const { initScrollTimeline } = useScrollAnimation(cam, groups);
    initScrollTimeline();
  }
});
</script>

<template>
  <div class="fixed inset-0 pointer-events-none z-0" ref="canvasContainer">
    <BuildingModel v-if="scene" :scene="scene" ref="buildingModelRef" />
  </div>
</template>
