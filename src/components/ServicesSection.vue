<script setup lang="ts">
import { useTranslation } from '../composables/useLanguage';
import { HardHat, Ruler, Building2, Cpu, PaintBucket, Briefcase } from 'lucide-vue-next';

const { t } = useTranslation();

const getIcon = (index: number) => {
  const icons = [HardHat, Building2, Ruler, Cpu, PaintBucket, Briefcase];
  return icons[index];
};
</script>

<template>
  <section id="services" class="relative bg-black/60 backdrop-blur-md py-24 px-6 lg:px-12 z-10">
    <div class="max-w-7xl mx-auto">
      
      <div class="flex flex-col md:flex-row justify-between items-end mb-16 gap-8">
        <div class="max-w-2xl">
          <div class="flex items-center gap-4 mb-6">
            <div class="w-12 h-[1px] bg-accent-gold"></div>
            <span class="text-accent-gold tracking-[0.2em] uppercase text-sm font-bold">{{ t.services.tag }}</span>
          </div>
          <h2 class="text-4xl md:text-5xl lg:text-6xl font-display font-bold text-white mb-6">
            {{ t.services.title }}
          </h2>
          <p class="text-white/60 text-lg leading-relaxed">
            {{ t.services.desc }}
          </p>
        </div>
      </div>

      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        
        <div 
          v-for="(service, index) in t.services.items" 
          :key="service.id"
          class="group relative bg-black/40 p-10 hover:bg-black/70 transition-colors duration-500 cursor-pointer overflow-hidden"
        >
          <!-- Hover effect subtle gradient -->
          <div class="absolute inset-0 bg-gradient-to-br from-accent-gold/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"></div>
          
          <div class="flex justify-between items-start mb-8 relative z-10">
            <component :is="getIcon(index)" class="w-10 h-10 text-accent-gold" stroke-width="1.5" />
            <span class="text-white/20 font-display font-bold text-2xl group-hover:text-white/40 transition-colors duration-300">{{ service.id }}</span>
          </div>
          
          <h3 class="text-xl font-bold text-white mb-4 relative z-10">{{ service.title }}</h3>
          <p class="text-white/50 text-sm leading-relaxed mb-8 relative z-10 group-hover:text-white/70 transition-colors duration-300">
            {{ service.desc }}
          </p>
          
          <div class="flex items-center gap-2 text-accent-gold text-sm font-bold tracking-wider uppercase opacity-0 -translate-x-4 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300 relative z-10 rtl:translate-x-4 rtl:group-hover:translate-x-0">
            {{ t.services.explore }} <span class="text-lg leading-none ltr:block hidden">→</span><span class="text-lg leading-none rtl:block hidden">←</span>
          </div>
        </div>

      </div>
    </div>
  </section>
</template>
