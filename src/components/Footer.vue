<script setup lang="ts">
import { Linkedin, Instagram, Twitter } from 'lucide-vue-next';
import { useTranslation } from '../composables/useLanguage';

const { t } = useTranslation();
</script>

<template>
  <footer class="relative bg-black/80 backdrop-blur-md pt-24 pb-12 px-6 lg:px-12 z-10 border-t border-white/5">
    <div class="max-w-7xl mx-auto">
      
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-8 mb-24">
        
        <!-- Brand -->
        <div class="lg:col-span-1">
          <div class="flex items-center gap-2 mb-6">
            <div class="w-8 h-8 bg-accent-gold flex items-center justify-center font-display font-bold text-black text-lg">
              A
            </div>
            <span class="font-display font-bold text-xl tracking-wider text-white">
              ATLAS
            </span>
          </div>
          <p class="text-white/50 text-sm leading-relaxed max-w-xs mb-8">
            {{ t.footer.desc }}
          </p>
          <div class="flex items-center gap-4">
            <a href="#" class="w-10 h-10 rounded-full border border-white/10 flex items-center justify-center text-white/50 hover:text-white hover:border-white/30 transition-all duration-300">
              <Linkedin class="w-4 h-4" />
            </a>
            <a href="#" class="w-10 h-10 rounded-full border border-white/10 flex items-center justify-center text-white/50 hover:text-white hover:border-white/30 transition-all duration-300">
              <Instagram class="w-4 h-4" />
            </a>
            <a href="#" class="w-10 h-10 rounded-full border border-white/10 flex items-center justify-center text-white/50 hover:text-white hover:border-white/30 transition-all duration-300">
              <Twitter class="w-4 h-4" />
            </a>
          </div>
        </div>
        
        <!-- Quick Links -->
        <div>
          <h4 class="text-white font-bold tracking-widest uppercase text-sm mb-6">{{ t.footer.comp }}</h4>
          <ul class="flex flex-col gap-4">
            <li><a href="#about" class="text-white/50 hover:text-accent-gold transition-colors duration-300 text-sm">{{ t.nav.about }}</a></li>
            <li><a href="#projects" class="text-white/50 hover:text-accent-gold transition-colors duration-300 text-sm">{{ t.nav.projects }}</a></li>
            <li><a href="#services" class="text-white/50 hover:text-accent-gold transition-colors duration-300 text-sm">{{ t.nav.services }}</a></li>
            <li><a href="#process" class="text-white/50 hover:text-accent-gold transition-colors duration-300 text-sm">{{ t.nav.process }}</a></li>
            <li><a href="#contact" class="text-white/50 hover:text-accent-gold transition-colors duration-300 text-sm">{{ t.nav.contact }}</a></li>
          </ul>
        </div>
        
        <!-- Services -->
        <div>
          <h4 class="text-white font-bold tracking-widest uppercase text-sm mb-6">{{ t.footer.exp }}</h4>
          <ul class="flex flex-col gap-4">
            <li v-for="service in t.services.items.slice(0, 5)" :key="service.id">
              <a href="#" class="text-white/50 hover:text-accent-gold transition-colors duration-300 text-sm">{{ service.title }}</a>
            </li>
          </ul>
        </div>
        
        <!-- Newsletter -->
        <div>
          <h4 class="text-white font-bold tracking-widest uppercase text-sm mb-6">{{ t.footer.news }}</h4>
          <p class="text-white/50 text-sm mb-4">{{ t.footer.newsDesc }}</p>
          <form @submit.prevent="" class="flex">
            <input type="email" :placeholder="t.footer.emailPl" class="bg-white/5 border border-white/10 px-4 py-3 text-sm text-white focus:outline-none focus:border-accent-gold w-full rtl:border-l-0 rtl:border-r">
            <button class="bg-accent-gold text-black px-4 flex items-center justify-center font-bold hover:bg-white transition-colors duration-300">
              <span class="ltr:block hidden">→</span>
              <span class="rtl:block hidden">←</span>
            </button>
          </form>
        </div>
        
      </div>
      
      <!-- Bottom -->
      <div class="flex flex-col md:flex-row justify-between items-center pt-8 border-t border-white/10 gap-4">
        <p class="text-white/30 text-xs tracking-widest uppercase">
          &copy; {{ new Date().getFullYear() }} {{ t.footer.rights }}
        </p>
        <div class="flex gap-6">
          <a href="#" class="text-white/30 hover:text-white text-xs tracking-widest uppercase transition-colors duration-300">{{ t.footer.privacy }}</a>
          <a href="#" class="text-white/30 hover:text-white text-xs tracking-widest uppercase transition-colors duration-300">{{ t.footer.terms }}</a>
        </div>
      </div>
      
    </div>
  </footer>
</template>
