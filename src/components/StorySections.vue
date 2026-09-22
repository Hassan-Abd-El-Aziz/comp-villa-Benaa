<script setup lang="ts">
import { useTranslation } from '../composables/useLanguage';
const { t } = useTranslation();
</script>

<template>
  <div id="story-container" class="relative z-10 pointer-events-none">
    
    <section 
      v-for="section in t.story" 
      :key="section.id"
      class="h-screen w-full flex items-center px-6 lg:px-24"
      :class="{
        'justify-start': section.align === 'left',
        'justify-end': section.align === 'right',
        'justify-center text-center': section.align === 'center'
      }"
    >
      <div class="max-w-xl">
        <div class="flex items-center gap-4 mb-4" :class="{'justify-center': section.align === 'center'}">
          <span class="text-accent-gold font-display font-bold text-xl">{{ section.id }}</span>
          <div class="w-12 h-[1px] bg-accent-gold"></div>
          <span class="text-white/60 tracking-[0.2em] uppercase text-sm font-semibold">{{ section.title }}</span>
        </div>
        
        <h2 
          class="text-4xl md:text-5xl lg:text-7xl font-display font-bold leading-[1.1] text-white"
          v-html="section.headline"
        ></h2>
      </div>
    </section>
    
  </div>
</template>
