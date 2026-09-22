<script setup lang="ts">
import { useTranslation } from '../composables/useLanguage';
const { t } = useTranslation();
</script>

<template>
  <section id="about" class="relative bg-black/40 backdrop-blur-md pt-32 pb-24 px-6 lg:px-12 z-10 border-t border-white/5">
    <div class="max-w-7xl mx-auto">
      <div class="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24">
        
        <!-- Left: Statement & Image -->
        <div class="flex flex-col h-full">
          <div class="flex items-center gap-4 mb-8">
            <div class="w-12 h-[1px] bg-accent-gold"></div>
            <span class="text-accent-gold tracking-[0.2em] uppercase text-sm font-bold">{{ t.about.tag }}</span>
          </div>
          
          <h2 class="text-4xl md:text-6xl font-display font-bold leading-[1.15] text-white">
            {{ t.about.title1 }}<span class="text-white/40">{{ t.about.title1_sub }}</span><br/>
            {{ t.about.title2 }}<span class="text-white/40">{{ t.about.title2_sub }}</span>
          </h2>
          
          <div class="mt-12 hidden md:block">
            <img src="https://images.unsplash.com/photo-1503387762-592deb58ef4e?q=80&w=1931&auto=format&fit=crop" alt="Modern Architecture" class="w-full h-64 object-cover border border-white/10" />
          </div>
        </div>
        
        <!-- Right: Content -->
        <div class="flex flex-col justify-center">
          <p class="text-white/70 text-lg leading-relaxed mb-8">
            {{ t.about.desc }}
          </p>
          
          <ul class="grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-4 mb-12">
            <li v-for="bullet in t.about.bullets" :key="bullet" class="flex items-center gap-3">
              <div class="w-1.5 h-1.5 bg-accent-gold rounded-full"></div>
              <span class="text-white/80 font-medium">{{ bullet }}</span>
            </li>
          </ul>
          
          <div>
            <button class="px-8 py-4 border border-white/20 text-white font-bold tracking-wider uppercase hover:bg-white hover:text-black transition-colors duration-300">
              {{ t.about.btn }}
            </button>
          </div>
        </div>
        
      </div>
    </div>
  </section>
</template>
