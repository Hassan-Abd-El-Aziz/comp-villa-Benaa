<script setup lang="ts">
import { ref } from 'vue';
import { useTranslation } from '../composables/useLanguage';

const { t } = useTranslation();

const activeFilter = ref('All');

// Projects don't necessarily need translation for titles if they are proper names, 
// but we'll leave them English here, and just translate categories
const projects = [
  { id: 1, name: 'The Obsidian Tower', location: 'Dubai, UAE', type: 'Commercial', area: '45,000 m²', status: 'Completed', image: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?q=80&w=2070&auto=format&fit=crop' },
  { id: 2, name: 'Aura Luxury Villas', location: 'Riyadh, KSA', type: 'Residential', area: '12,000 m²', status: 'Completed', image: 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?q=80&w=2075&auto=format&fit=crop' },
  { id: 3, name: 'Nexus Administrative Complex', location: 'Cairo, Egypt', type: 'Administrative', area: '85,000 m²', status: 'Under Construction', image: 'https://images.unsplash.com/photo-1497366216548-37526070297c?q=80&w=2069&auto=format&fit=crop' },
  { id: 4, name: 'Crescent Bay Resort', location: 'Doha, Qatar', type: 'Hospitality', area: '120,000 m²', status: 'Completed', image: 'https://images.unsplash.com/photo-1551882547-ff40c0d5b9af?q=80&w=2071&auto=format&fit=crop' },
  { id: 5, name: 'Royal Palm Hotel & Spa', location: 'Sharm El Sheikh, Egypt', type: 'Hospitality', area: '200,000 m²', status: 'Completed', image: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?q=80&w=2070&auto=format&fit=crop' }
];

const getCategoryName = (engCat: string) => {
  const index = ['All', 'Residential', 'Commercial', 'Administrative', 'Hospitality'].indexOf(engCat);
  return t.value.projects.cats[index] || engCat;
};
</script>

<template>
  <section id="projects" class="relative bg-black/60 backdrop-blur-md py-32 px-6 lg:px-12 z-10 border-t border-white/5">
    <div class="max-w-7xl mx-auto">
      
      <div class="flex flex-col lg:flex-row justify-between items-end mb-16 gap-8">
        <div>
          <div class="flex items-center gap-4 mb-6">
            <div class="w-12 h-[1px] bg-accent-gold"></div>
            <span class="text-accent-gold tracking-[0.2em] uppercase text-sm font-bold">{{ t.projects.tag }}</span>
          </div>
          <h2 class="text-4xl md:text-5xl lg:text-6xl font-display font-bold text-white">
            {{ t.projects.title }}
          </h2>
        </div>
        
        <!-- Filters -->
        <div class="flex flex-wrap gap-2 lg:gap-4">
          <button 
            v-for="(cat, index) in ['All', 'Residential', 'Commercial', 'Administrative', 'Hospitality']"
            :key="cat"
            @click="activeFilter = cat"
            class="px-6 py-2 border text-sm font-bold tracking-wider uppercase transition-all duration-300"
            :class="activeFilter === cat ? 'border-accent-gold bg-accent-gold text-black' : 'border-white/20 text-white/50 hover:text-white hover:border-white/50'"
          >
            {{ t.projects.cats[index] }}
          </button>
        </div>
      </div>

      <!-- Project Grid -->
      <div class="grid grid-cols-1 md:grid-cols-2 gap-12 lg:gap-16">
        
        <div 
          v-for="project in projects.filter(p => activeFilter === 'All' || p.type === activeFilter)" 
          :key="project.id"
          class="group cursor-pointer flex flex-col"
        >
          <!-- Image -->
          <div class="relative w-full aspect-[4/3] overflow-hidden mb-6">
            <img :src="project.image" :alt="project.name" class="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
            <div class="absolute inset-0 bg-black/20 group-hover:bg-transparent transition-colors duration-500"></div>
            
            <div class="absolute top-6 right-6 rtl:right-auto rtl:left-6 bg-black/60 backdrop-blur-md px-4 py-2 border border-white/10">
              <span class="text-white text-xs font-bold tracking-widest uppercase">{{ getCategoryName(project.type) }}</span>
            </div>
          </div>
          
          <!-- Info -->
          <div class="flex justify-between items-start">
            <div>
              <h3 class="text-2xl font-bold text-white mb-2">{{ project.name }}</h3>
              <p class="text-white/50 text-sm flex items-center gap-2">
                <span>{{ project.location }}</span>
                <span class="w-1 h-1 bg-accent-gold rounded-full"></span>
                <span>{{ project.area }}</span>
              </p>
            </div>
            
            <div class="w-12 h-12 rounded-full border border-white/20 flex items-center justify-center group-hover:bg-accent-gold group-hover:border-accent-gold transition-colors duration-300">
              <span class="text-white group-hover:text-black ltr:block hidden">↗</span>
              <span class="text-white group-hover:text-black rtl:block hidden">↖</span>
            </div>
          </div>
        </div>

      </div>
      
    </div>
  </section>
</template>
