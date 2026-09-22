<script setup lang="ts">
import { ref } from 'vue';
import { useTranslation } from '../composables/useLanguage';

const { t } = useTranslation();
const activeStage = ref(0);
</script>

<template>
  <section id="process" class="relative bg-black/50 backdrop-blur-md py-24 px-6 lg:px-12 z-10 border-t border-white/5">
    <div class="max-w-7xl mx-auto">
      
      <div class="mb-16">
        <div class="flex items-center gap-4 mb-6">
          <div class="w-12 h-[1px] bg-accent-gold"></div>
          <span class="text-accent-gold tracking-[0.2em] uppercase text-sm font-bold">{{ t.process.tag }}</span>
        </div>
        <h2 class="text-4xl md:text-5xl lg:text-6xl font-display font-bold text-white mb-6">
          {{ t.process.title }}
        </h2>
      </div>

      <!-- Timeline Component -->
      <div class="relative">
        
        <!-- Connecting Line (Desktop) -->
        <div class="hidden lg:block absolute top-3 left-0 w-full h-[2px] bg-white/10 z-0">
          <!-- Progress Line -->
          <div class="absolute top-0 left-0 h-full bg-accent-gold transition-all duration-700 ease-out rtl:left-auto rtl:right-0"
               :style="{ width: `${(activeStage / (t.process.items.length - 1)) * 100}%` }">
          </div>
        </div>

        <!-- Grid of Stages -->
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-y-12 lg:gap-y-16 lg:gap-x-8">
          
          <div 
            v-for="(stage, index) in t.process.items" 
            :key="stage.num"
            class="relative group cursor-pointer"
            @mouseenter="activeStage = index"
          >
            <!-- Timeline Node -->
            <div class="hidden lg:flex items-center justify-center w-6 h-6 rounded-full bg-black/80 border-2 border-white/20 mb-8 transition-colors duration-300 relative z-10"
                 :class="{ 'border-accent-gold bg-accent-gold/10': activeStage >= index }">
              <div class="w-2 h-2 rounded-full transition-colors duration-300"
                   :class="activeStage >= index ? 'bg-accent-gold' : 'bg-white/20'"></div>
            </div>

            <!-- Content -->
            <div class="border-l-2 lg:border-l-0 border-white/10 pl-6 lg:pl-0 lg:pt-4 rtl:border-l-0 rtl:border-r-2 rtl:pl-0 rtl:pr-6"
                 :class="{ 'border-accent-gold rtl:border-accent-gold': activeStage >= index }">
              <span class="block text-accent-gold font-display font-bold text-xl mb-2">{{ stage.num }}</span>
              <h4 class="text-white font-bold text-lg mb-3 transition-colors duration-300"
                  :class="activeStage === index ? 'text-white' : 'text-white/70'">
                {{ stage.title }}
              </h4>
              <p class="text-white/50 text-sm leading-relaxed transition-opacity duration-300"
                 :class="activeStage === index ? 'opacity-100' : 'opacity-60 lg:opacity-0 group-hover:opacity-60'">
                {{ stage.desc }}
              </p>
            </div>
            
          </div>
          
        </div>
      </div>
      
    </div>
  </section>
</template>
