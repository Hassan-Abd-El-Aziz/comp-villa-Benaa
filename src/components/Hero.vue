<script setup lang="ts">
import { ArrowRight } from 'lucide-vue-next';
import { useTranslation } from '../composables/useLanguage';
import { ref, onMounted, onUnmounted } from 'vue';

const { t } = useTranslation();

const mouseX = ref(0);
const mouseY = ref(0);
const isHovering = ref(false);

const handleMouseMove = (e: MouseEvent) => {
  mouseX.value = e.clientX;
  mouseY.value = e.clientY;
};

onMounted(() => {
  window.addEventListener('mousemove', handleMouseMove);
});

onUnmounted(() => {
  window.removeEventListener('mousemove', handleMouseMove);
});
</script>

<template>
  <section  id="hero" class="relative min-h-screen flex items-center pt-20 px-6 lg:px-12 pointer-events-none">
    <div class="max-w-7xl mx-auto w-full z-10 grid grid-cols-1 lg:grid-cols-12 gap-12 pointer-events-auto">
      
      <!-- Main Content -->
      <div class="lg:col-span-8 flex flex-col justify-center">
        <span class="text-accent-gold text-xl md:text-2xl font-bold tracking-widest uppercase mb-4 block">
          {{ t.hero.company }}
        </span>
        <h1 class="text-5xl md:text-7xl lg:text-8xl font-display font-bold leading-[1.05] tracking-tight mb-8">
          {{ t.hero.title1 }}<br />
          <span class="text-transparent bg-clip-text bg-gradient-to-r from-white to-white/40">
            {{ t.hero.title2 }}
          </span>
        </h1>
        
        <p class="text-lg md:text-xl text-white/70 max-w-2xl mb-12 font-light leading-relaxed">
          {{ t.hero.desc }}
        </p>
        
        <div class="flex flex-col sm:flex-row gap-6">
          <a href="#projects" class="group flex items-center justify-center gap-3 px-8 py-4 bg-white text-black font-semibold hover:bg-white/90 transition-all duration-300">
            {{ t.hero.explore }}
            <ArrowRight class="w-5 h-5 group-hover:-translate-x-1 transition-transform rtl:group-hover:-translate-x-1 ltr:group-hover:translate-x-1" />
          </a>
          
          <a href="#contact" class="px-8 py-4 bg-transparent border border-white/20 text-white font-medium hover:bg-white/5 hover:border-white/40 transition-all duration-300 flex items-center justify-center text-center">
            {{ t.hero.request }}
          </a>
        </div>
      </div>

      <!-- Stats -->
      <div class="lg:col-span-4 flex flex-col justify-end lg:pb-12 gap-10">
        <div class="grid grid-cols-2 gap-8 lg:gap-12">
          
          <div class="flex flex-col">
            <span class="text-4xl lg:text-5xl font-display font-bold mb-2">150+</span>
            <span class="text-sm text-white/50 font-medium tracking-wide uppercase">{{ t.hero.stats[0] }}</span>
          </div>
          
          <div class="flex flex-col">
            <span class="text-4xl lg:text-5xl font-display font-bold mb-2">15+</span>
            <span class="text-sm text-white/50 font-medium tracking-wide uppercase">{{ t.hero.stats[1] }}</span>
          </div>
          
          <div class="flex flex-col">
            <span class="text-4xl lg:text-5xl font-display font-bold mb-2">250K+</span>
            <span class="text-sm text-white/50 font-medium tracking-wide uppercase">{{ t.hero.stats[2] }}</span>
          </div>
          
          <div class="flex flex-col">
            <span class="text-4xl lg:text-5xl font-display font-bold mb-2">98%</span>
            <span class="text-sm text-white/50 font-medium tracking-wide uppercase">{{ t.hero.stats[3] }}</span>
          </div>
          
        </div>
      </div>
      
    </div>
    
    <!-- Background overlay to ensure text is readable even if 3D scene is bright -->
    <div class="absolute inset-0 bg-gradient-to-t from-primary-dark via-primary-dark/50 to-transparent pointer-events-none z-0"></div>
    
    <!-- Interactive Spotlight Effect -->
    <div 
      class="absolute inset-0 pointer-events-none z-0 transition-opacity duration-300"
      :style="{
        background: `radial-gradient(600px circle at ${mouseX}px ${mouseY}px, rgba(255, 255, 255, 0.12), transparent 40%)`
      }"
    ></div>
  </section>
</template>
