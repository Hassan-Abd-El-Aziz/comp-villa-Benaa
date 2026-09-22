<script setup lang="ts">
import { watch, onUnmounted } from 'vue';
import * as THREE from 'three';

const props = defineProps<{
  scene: THREE.Scene | undefined;
}>();

// Main groups for construction phases
const buildingGroup = new THREE.Group();
const foundationGroup = new THREE.Group();
const structureGroup = new THREE.Group();
const mepGroup = new THREE.Group();
const finishingGroup = new THREE.Group();
const envGroup = new THREE.Group();

buildingGroup.add(foundationGroup);
buildingGroup.add(structureGroup);
buildingGroup.add(mepGroup);
buildingGroup.add(finishingGroup);
buildingGroup.add(envGroup);

// Materials (Industrial Luxury style - more realistic)
// Materials (Ultra-Realistic Architectural Style like 3ds Max / V-Ray)
const materials = {
  // Main Villa Walls (Premium off-white stucco)
  concrete: new THREE.MeshStandardMaterial({ 
    color: 0xf5f5f5, 
    roughness: 0.8, 
    metalness: 0.05 
  }),
  // Accent Walls / Frames (Sleek dark architectural gray)
  darkConcrete: new THREE.MeshStandardMaterial({ 
    color: 0x3a3a3a, 
    roughness: 0.7, 
    metalness: 0.1 
  }),
  // Steel structures
  steel: new THREE.MeshStandardMaterial({ 
    color: 0x1f1f1f, 
    roughness: 0.3, 
    metalness: 0.9 
  }),
  // Architectural Glass (High reflection, clear blue tint)
  glass: new THREE.MeshPhysicalMaterial({ 
    color: 0x0088ff, // Bright Blue Facade
    metalness: 0.2, 
    roughness: 0.05,
    envMapIntensity: 2.5,
    transparent: true,
    opacity: 1.0, // Important: keep at 1.0 when using transmission
    reflectivity: 1.0,
    transmission: 0.85, // Handles the glass transparency
    ior: 1.5,
    thickness: 0.5,
    clearcoat: 1.0,
    clearcoatRoughness: 0.0
  }),
  // Premium Walnut Wood
  wood: new THREE.MeshStandardMaterial({
    color: 0x5a3319,
    roughness: 0.6,
    metalness: 0.05
  }),
  // Brushed Gold/Brass Accents
  accent: new THREE.MeshStandardMaterial({
    color: 0xc9a25b, 
    roughness: 0.25,
    metalness: 1.0
  }),
  mepRed: new THREE.MeshStandardMaterial({ color: 0xaa3333, roughness: 0.6 }),
  mepBlue: new THREE.MeshStandardMaterial({ color: 0x3344aa, roughness: 0.6 }),
  mepSilver: new THREE.MeshStandardMaterial({ color: 0xaaaaaa, roughness: 0.4, metalness: 0.8 }),
  // Interior Furniture Materials
  deskWood: new THREE.MeshStandardMaterial({ color: 0xc2a685, roughness: 0.7 }),
  chairFabric: new THREE.MeshStandardMaterial({ color: 0x222222, roughness: 0.9 }),
  monitorBlack: new THREE.MeshStandardMaterial({ color: 0x050505, roughness: 0.2, metalness: 0.8 })
};

const geometries: THREE.BufferGeometry[] = [];

// Helper to register geometry for cleanup
const regGeo = <T extends THREE.BufferGeometry>(geo: T): T => {
  geometries.push(geo);
  return geo;
};

const buildProceduralModel = () => {
  // 1. Foundation (Phase 01/02)
  const padGeo = regGeo(new THREE.BoxGeometry(22, 1, 22));
  const pad = new THREE.Mesh(padGeo, materials.darkConcrete);
  pad.position.y = -0.5;
  pad.receiveShadow = true;
  pad.castShadow = true;
  foundationGroup.add(pad);

  // 2. Structure (Columns & Slabs) (Phase 03)
  const floors = 4;
  const floorHeight = 4;
  const colSize = 0.6;
  const colGeo = regGeo(new THREE.BoxGeometry(colSize, floorHeight, colSize));
  const slabGeo = regGeo(new THREE.BoxGeometry(20, 0.5, 20));

  for (let f = 0; f < floors; f++) {
    const yOffset = f * floorHeight;
    
    // Slab
    const slab = new THREE.Mesh(slabGeo, materials.concrete);
    slab.position.y = yOffset + floorHeight;
    slab.receiveShadow = true;
    slab.castShadow = true;
    structureGroup.add(slab);

    // Columns (Grid)
    for (let x = -8; x <= 8; x += 8) {
      for (let z = -8; z <= 8; z += 8) {
        const col = new THREE.Mesh(colGeo, materials.concrete);
        col.position.set(x, yOffset + floorHeight / 2, z);
        col.castShadow = true;
        col.receiveShadow = true;
        structureGroup.add(col);
      }
    }
  }

  // 3. MEP Systems (Pipes and Ducts) (Phase 04)
  const pipeGeo = regGeo(new THREE.CylinderGeometry(0.1, 0.1, 18));
  const ductGeo = regGeo(new THREE.BoxGeometry(0.5, 0.3, 18));
  
  for (let f = 0; f < floors; f++) {
    const yOffset = f * floorHeight + floorHeight - 0.5; // Under slab
    
    // Red Pipe
    const pipe1 = new THREE.Mesh(pipeGeo, materials.mepRed);
    pipe1.position.set(-2, yOffset, 0);
    pipe1.rotation.x = Math.PI / 2;
    mepGroup.add(pipe1);

    // Blue Pipe
    const pipe2 = new THREE.Mesh(pipeGeo, materials.mepBlue);
    pipe2.position.set(-2.5, yOffset, 0);
    pipe2.rotation.x = Math.PI / 2;
    mepGroup.add(pipe2);

    // HVAC Duct
    const duct = new THREE.Mesh(ductGeo, materials.mepSilver);
    duct.position.set(2, yOffset, 0);
    duct.rotation.x = Math.PI / 2;
    mepGroup.add(duct);
  }

  // 4. Finishing (Facade, Glass, Accents) (Phase 05 & 06)
  const facadeGeo = regGeo(new THREE.BoxGeometry(20, floors * floorHeight, 0.2));
  const glassGeo = regGeo(new THREE.BoxGeometry(19.5, floors * floorHeight - 1, 0.1));
  const mullionGeo = regGeo(new THREE.BoxGeometry(0.1, floors * floorHeight, 0.3));
  
  // Front Glass Facade
  const frontGlass = new THREE.Mesh(glassGeo, materials.glass);
  frontGlass.position.set(0, (floors * floorHeight) / 2, 9.9);
  finishingGroup.add(frontGlass);

  // Vertical Mullions
  for (let i = -9; i <= 9; i += 3) {
    const mullion = new THREE.Mesh(mullionGeo, materials.steel);
    mullion.position.set(i, (floors * floorHeight) / 2, 10);
    finishingGroup.add(mullion);
  }

  // Back/Side Walls (Now entirely Blue Glass Facade)
  const backWall = new THREE.Mesh(facadeGeo, materials.glass);
  backWall.position.set(0, (floors * floorHeight) / 2, -10);
  finishingGroup.add(backWall);

  const sideGeo = regGeo(new THREE.BoxGeometry(0.2, floors * floorHeight, 20));
  const leftWall = new THREE.Mesh(sideGeo, materials.glass);
  leftWall.position.set(-10, (floors * floorHeight) / 2, 0);
  finishingGroup.add(leftWall);

  const rightWall = new THREE.Mesh(sideGeo, materials.glass);
  rightWall.position.set(10, (floors * floorHeight) / 2, 0);
  finishingGroup.add(rightWall);
  
  // Decorative Gold Accent Frame
  const frameGeoH = regGeo(new THREE.BoxGeometry(20.4, 0.4, 20.4));
  const topFrame = new THREE.Mesh(frameGeoH, materials.accent);
  topFrame.position.set(0, floors * floorHeight, 0);
  finishingGroup.add(topFrame);

  // Interior Furniture (Offices)
  const deskGeo = regGeo(new THREE.BoxGeometry(1.6, 0.75, 0.8));
  const chairGeo = regGeo(new THREE.BoxGeometry(0.5, 0.9, 0.5));
  const monitorGeo = regGeo(new THREE.BoxGeometry(0.6, 0.4, 0.05));
  
  for (let f = 0; f < floors; f++) {
    const floorY = f * floorHeight;
    // Generate an office layout grid
    for (let x = -6; x <= 6; x += 4) {
      for (let z = -6; z <= 6; z += 4) {
        // desk
        const desk = new THREE.Mesh(deskGeo, materials.deskWood);
        desk.position.set(x, floorY + 0.375, z);
        desk.receiveShadow = true;
        desk.castShadow = true;
        finishingGroup.add(desk);

        // chair
        const chair = new THREE.Mesh(chairGeo, materials.chairFabric);
        chair.position.set(x, floorY + 0.45, z - 0.7);
        chair.receiveShadow = true;
        chair.castShadow = true;
        finishingGroup.add(chair);

        // monitor
        const monitor = new THREE.Mesh(monitorGeo, materials.monitorBlack);
        monitor.position.set(x, floorY + 0.75 + 0.2, z + 0.2);
        monitor.castShadow = true;
        finishingGroup.add(monitor);
      }
    }
  }

  // 5. Environment (Pool & Landscaping)

  // Grass (Landscaping)
  const grassGeo = regGeo(new THREE.PlaneGeometry(80, 80));
  const grassMat = new THREE.MeshStandardMaterial({ color: 0x3b7a33, roughness: 0.9, metalness: 0 });
  const grass = new THREE.Mesh(grassGeo, grassMat);
  grass.rotation.x = -Math.PI / 2;
  grass.position.y = -0.05; // Ground level, just below foundation
  grass.receiveShadow = true;
  envGroup.add(grass);

  // Realistic Elevated Pool
  const deckHeight = 0.5;
  const deckThickness = 2;
  const poolWidth = 14;
  const poolLength = 7;
  const deckY = deckHeight / 2 - 0.05; // Starting from grass level
  const poolZ = 16;
  
  // Back border
  const borderB = new THREE.Mesh(regGeo(new THREE.BoxGeometry(poolWidth + deckThickness*2, deckHeight, deckThickness)), materials.wood);
  borderB.position.set(0, deckY, poolZ - poolLength/2 - deckThickness/2);
  borderB.receiveShadow = true;
  borderB.castShadow = true;
  envGroup.add(borderB);

  // Front border
  const borderF = new THREE.Mesh(regGeo(new THREE.BoxGeometry(poolWidth + deckThickness*2, deckHeight, deckThickness)), materials.wood);
  borderF.position.set(0, deckY, poolZ + poolLength/2 + deckThickness/2);
  borderF.receiveShadow = true;
  borderF.castShadow = true;
  envGroup.add(borderF);

  // Left border
  const borderL = new THREE.Mesh(regGeo(new THREE.BoxGeometry(deckThickness, deckHeight, poolLength)), materials.wood);
  borderL.position.set(-poolWidth/2 - deckThickness/2, deckY, poolZ);
  borderL.receiveShadow = true;
  borderL.castShadow = true;
  envGroup.add(borderL);

  // Right border
  const borderR = new THREE.Mesh(regGeo(new THREE.BoxGeometry(deckThickness, deckHeight, poolLength)), materials.wood);
  borderR.position.set(poolWidth/2 + deckThickness/2, deckY, poolZ);
  borderR.receiveShadow = true;
  borderR.castShadow = true;
  envGroup.add(borderR);

  // Pool Floor (Tiles)
  const poolFloorGeo = regGeo(new THREE.BoxGeometry(poolWidth, 0.1, poolLength));
  const tileMat = new THREE.MeshStandardMaterial({ color: 0x88ccff, roughness: 0.2 });
  const poolFloor = new THREE.Mesh(poolFloorGeo, tileMat);
  poolFloor.position.set(0, 0.05 - 0.05, poolZ); // bottom of pool
  envGroup.add(poolFloor);

  // Pool Water
  const poolWaterGeo = regGeo(new THREE.BoxGeometry(poolWidth, deckHeight - 0.15, poolLength));
  const poolWaterMat = new THREE.MeshPhysicalMaterial({
    color: 0x00aaff,
    transmission: 0.9,
    opacity: 1,
    metalness: 0.1,
    roughness: 0.05,
    ior: 1.33,
    thickness: 1.0,
    clearcoat: 1.0
  });
  const poolWater = new THREE.Mesh(poolWaterGeo, poolWaterMat);
  poolWater.position.set(0, 0.1 + (deckHeight - 0.15)/2 - 0.05, poolZ); // water surface
  envGroup.add(poolWater);

  // Simple Trees/Bushes
  const bushGeo = regGeo(new THREE.SphereGeometry(1, 16, 16));
  const bushMat = new THREE.MeshStandardMaterial({ color: 0x1f3d1f, roughness: 0.9 });
  const bushPositions = [
    [-11, 0.5, 12], [-13, 0.5, 10], [11, 0.5, 12], [13, 0.5, 10],
    [-11, 0.5, -12], [11, 0.5, -12]
  ];
  
  bushPositions.forEach(pos => {
    const bush = new THREE.Mesh(bushGeo, bushMat);
    bush.position.set(pos[0], pos[1], pos[2]);
    bush.castShadow = true;
    envGroup.add(bush);
  });

  // Abstract Cars (Architectural Scale Model Style)
  const carMatBlack = new THREE.MeshStandardMaterial({ color: 0x111111, roughness: 0.1, metalness: 0.9 });
  const carMatSilver = new THREE.MeshStandardMaterial({ color: 0xeeeeee, roughness: 0.2, metalness: 0.8 });
  
  const createCar = (mat: THREE.Material, x: number, z: number, rotation: number) => {
    const carGroup = new THREE.Group();
    
    // Main Body
    const bodyGeo = regGeo(new THREE.BoxGeometry(4.5, 0.9, 2));
    const body = new THREE.Mesh(bodyGeo, mat);
    body.position.y = 0.65;
    body.castShadow = true;
    carGroup.add(body);
    
    // Cabin
    const topGeo = regGeo(new THREE.BoxGeometry(2.5, 0.7, 1.8));
    const topMat = new THREE.MeshPhysicalMaterial({ color: 0x050505, metalness: 1, roughness: 0, transmission: 0.2 });
    const top = new THREE.Mesh(topGeo, topMat);
    top.position.set(-0.2, 1.45, 0);
    top.castShadow = true;
    carGroup.add(top);
    
    carGroup.position.set(x, 0, z);
    carGroup.rotation.y = rotation;
    envGroup.add(carGroup);
  };

  createCar(carMatBlack, -9, 16, Math.PI / 8); 
  createCar(carMatSilver, -12, 12, Math.PI / 1.5); 

  // Abstract People (Architectural Scale Figures)
  const personMat = new THREE.MeshStandardMaterial({ color: 0xffffff, roughness: 1.0 });
  const createPerson = (x: number, z: number) => {
    const personGroup = new THREE.Group();
    
    const bodyGeo = regGeo(new THREE.CylinderGeometry(0.15, 0.1, 1.4));
    const body = new THREE.Mesh(bodyGeo, personMat);
    body.position.y = 0.7;
    body.castShadow = true;
    personGroup.add(body);
    
    const headGeo = regGeo(new THREE.SphereGeometry(0.18));
    const head = new THREE.Mesh(headGeo, personMat);
    head.position.y = 1.58;
    head.castShadow = true;
    personGroup.add(head);

    personGroup.position.set(x, 0, z);
    envGroup.add(personGroup);
  };

  createPerson(2, 14);      // Near pool
  createPerson(2.6, 14.2);  // Near pool (talking)
  createPerson(-3, 11);     // Near entrance
  createPerson(0, 10.5);    // At entrance
  createPerson(5, 12);      // Walking on deck
};

buildProceduralModel();

let animationFrameId: number;
const animate = () => {
  animationFrameId = requestAnimationFrame(animate);
  buildingGroup.rotation.y += 0.001; // slow rotation
};

watch(() => props.scene, (newScene) => {
  if (newScene) {
    newScene.add(buildingGroup);
    animate();
  }
}, { immediate: true });

onUnmounted(() => {
  cancelAnimationFrame(animationFrameId);
  if (props.scene) {
    props.scene.remove(buildingGroup);
  }
  // Dispose geometries
  geometries.forEach(geo => geo.dispose());
  // Dispose materials
  Object.values(materials).forEach(mat => mat.dispose());
});

// Expose groups for animation in Phase 3
defineExpose({
  foundationGroup,
  structureGroup,
  mepGroup,
  finishingGroup,
  envGroup,
  buildingGroup
});
</script>

<template>
  <!-- Non-visual component, acts as a bridge for Three.js logic -->
  <slot></slot>
</template>
