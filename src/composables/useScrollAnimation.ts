import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import type * as THREE from 'three';

gsap.registerPlugin(ScrollTrigger);

export interface ConstructionGroups {
  foundationGroup: THREE.Group;
  structureGroup: THREE.Group;
  mepGroup: THREE.Group;
  finishingGroup: THREE.Group;
  envGroup: THREE.Group;
  buildingGroup: THREE.Group;
}

export function useScrollAnimation(
  camera: THREE.PerspectiveCamera,
  groups: ConstructionGroups
) {
  // Set initial states (Hidden / Scaled down)
  groups.foundationGroup.position.y = -5;
  groups.foundationGroup.scale.set(0.001, 0.001, 0.001);
  
  groups.structureGroup.position.y = -20;
  groups.structureGroup.scale.set(1, 0.001, 1);
  
  groups.mepGroup.scale.set(0.001, 0.001, 0.001);
  groups.mepGroup.position.y = -10;

  groups.finishingGroup.position.y = 30;
  groups.finishingGroup.scale.set(0.001, 0.001, 0.001);
  
  groups.envGroup.scale.set(0.001, 0.001, 0.001);
  groups.envGroup.position.y = -2;

  // Initial camera position (Low cinematic)
  camera.position.set(30, 5, 40);
  camera.lookAt(0, 0, 0);

  // We create an object to hold camera target so we can animate it
  const camTarget = { x: 0, y: 0, z: 0 };
  const updateCamera = () => {
    camera.lookAt(camTarget.x, camTarget.y, camTarget.z);
  };

  const initScrollTimeline = () => {
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: '#story-container',
        start: 'top top',
        end: 'bottom bottom',
        scrub: 1.2,
      }
    });

    const sectionDuration = 1;

    // 01 -> 02: Empty Site to Foundation
    tl.to(groups.foundationGroup.position, { y: 0, duration: sectionDuration, ease: "power2.out" }, 0)
      .to(groups.foundationGroup.scale, { x: 1, y: 1, z: 1, duration: sectionDuration, ease: "power2.out" }, 0)
      .to(camera.position, { x: 35, y: 15, z: 35, duration: sectionDuration, ease: "power1.inOut", onUpdate: updateCamera }, 0)
      .to(camTarget, { y: 2, duration: sectionDuration, onUpdate: updateCamera }, 0);

    // 02 -> 03: Foundation to Structure
    tl.to(groups.structureGroup.position, { y: 0, duration: sectionDuration, ease: "power2.out" }, sectionDuration)
      .to(groups.structureGroup.scale, { y: 1, duration: sectionDuration, ease: "power2.out" }, sectionDuration)
      .to(camera.position, { x: 40, y: 25, z: 30, duration: sectionDuration, ease: "power1.inOut", onUpdate: updateCamera }, sectionDuration)
      .to(camTarget, { y: 8, duration: sectionDuration, onUpdate: updateCamera }, sectionDuration);

    // 03 -> 04: Structure to MEP
    tl.to(groups.mepGroup.position, { y: 0, duration: sectionDuration, ease: "back.out(1.2)" }, sectionDuration * 2)
      .to(groups.mepGroup.scale, { x: 1, y: 1, z: 1, duration: sectionDuration, ease: "power2.out" }, sectionDuration * 2)
      .to(camera.position, { x: 25, y: 20, z: 45, duration: sectionDuration, ease: "power1.inOut", onUpdate: updateCamera }, sectionDuration * 2);

    // 04 -> 05: MEP to Finishing
    tl.to(groups.finishingGroup.position, { y: 0, duration: sectionDuration, ease: "bounce.out" }, sectionDuration * 3)
      .to(groups.finishingGroup.scale, { x: 1, y: 1, z: 1, duration: sectionDuration, ease: "power2.out" }, sectionDuration * 3)
      .to(camera.position, { x: -30, y: 15, z: 40, duration: sectionDuration, ease: "power2.inOut", onUpdate: updateCamera }, sectionDuration * 3)
      .to(camTarget, { y: 6, duration: sectionDuration, onUpdate: updateCamera }, sectionDuration * 3);

    // 05 -> 06: Finishing to Complete (Environment & Orbit)
    tl.to(groups.envGroup.position, { y: 0, duration: sectionDuration, ease: "power2.out" }, sectionDuration * 4)
      .to(groups.envGroup.scale, { x: 1, y: 1, z: 1, duration: sectionDuration, ease: "back.out(1.5)" }, sectionDuration * 4)
      .to(camera.position, { x: 0, y: 12, z: 50, duration: sectionDuration, ease: "sine.inOut", onUpdate: updateCamera }, sectionDuration * 4)
      .to(camTarget, { y: 4, duration: sectionDuration, onUpdate: updateCamera }, sectionDuration * 4);

    return tl;
  };

  return {
    initScrollTimeline
  };
}
