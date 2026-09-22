<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue';
import { Menu, X, Globe } from 'lucide-vue-next';
import { useTranslation } from '../composables/useLanguage';

const { t, currentLang, toggleLanguage } = useTranslation();

const isScrolled = ref(false);
const mobileMenuOpen = ref(false);

const handleScroll = () => {
  isScrolled.value = window.scrollY > 50;
};

onMounted(() => {
  window.addEventListener('scroll', handleScroll);
});

onUnmounted(() => {
  window.removeEventListener('scroll', handleScroll);
});

const toggleMenu = () => {
  mobileMenuOpen.value = !mobileMenuOpen.value;
};
</script>

<template>
  <header 
    class="fixed top-0 left-0 w-full z-50 transition-all duration-500"
    :class="[
      isScrolled ? 'bg-primary-dark/80 backdrop-blur-md border-b border-white/5 py-4' : 'bg-transparent py-6'
    ]"
  >
    <div class="max-w-7xl mx-auto px-6 lg:px-12 flex items-center justify-between">
      
      <!-- Logo -->
      <a href="#home" class="flex items-center gap-2 cursor-pointer z-50">
        <div class="w-8 h-8 bg-accent-gold flex items-center justify-center font-display font-bold text-black text-lg">
          {{ currentLang === 'ar' ? 'ب' : 'B' }}
        </div>
        <span class="font-display font-bold text-xl tracking-wider text-white">
          {{ currentLang === 'ar' ? 'بناء' : 'BENAA' }}
        </span>
      </a>

      <!-- Desktop Nav -->
      <nav class="hidden md:flex items-center gap-8">
        <a href="#projects" class="text-sm font-medium text-white/70 hover:text-white transition-colors">{{ t.nav.projects }}</a>
        <a href="#services" class="text-sm font-medium text-white/70 hover:text-white transition-colors">{{ t.nav.services }}</a>
        <a href="#process" class="text-sm font-medium text-white/70 hover:text-white transition-colors">{{ t.nav.process }}</a>
        <a href="#about" class="text-sm font-medium text-white/70 hover:text-white transition-colors">{{ t.nav.about }}</a>
        <a href="#contact" class="text-sm font-medium text-white/70 hover:text-white transition-colors">{{ t.nav.contact }}</a>
      </nav>

      <!-- Actions -->
      <div class="hidden md:flex items-center gap-6">
        <button @click="toggleLanguage" class="flex items-center gap-2 text-sm text-white/70 hover:text-white transition-colors">
          <Globe class="w-4 h-4" />
          <span>{{ t.nav.lang }}</span>
        </button>
        <a href="#contact" class="px-6 py-2.5 bg-white/10 hover:bg-white text-white hover:text-black font-medium text-sm transition-all duration-300 border border-white/20 hover:border-white">
          {{ t.nav.request }}
        </a>
      </div>

      <!-- Mobile Menu Button -->
      <button class="md:hidden text-white z-50" @click="toggleMenu">
        <Menu v-if="!mobileMenuOpen" class="w-6 h-6" />
        <X v-else class="w-6 h-6" />
      </button>

    </div>

    <!-- Mobile Menu Overlay -->
    <div 
      class="fixed inset-0 bg-primary-dark/95 backdrop-blur-xl z-40 flex flex-col items-center justify-center gap-8 transition-all duration-500 md:hidden"
      :class="mobileMenuOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'"
    >
      <a href="#projects" class="text-2xl font-display font-bold text-white hover:text-accent-gold transition-colors" @click="toggleMenu">{{ t.nav.projects }}</a>
      <a href="#services" class="text-2xl font-display font-bold text-white hover:text-accent-gold transition-colors" @click="toggleMenu">{{ t.nav.services }}</a>
      <a href="#process" class="text-2xl font-display font-bold text-white hover:text-accent-gold transition-colors" @click="toggleMenu">{{ t.nav.process }}</a>
      <a href="#about" class="text-2xl font-display font-bold text-white hover:text-accent-gold transition-colors" @click="toggleMenu">{{ t.nav.about }}</a>
      <a href="#contact" class="text-2xl font-display font-bold text-white hover:text-accent-gold transition-colors" @click="toggleMenu">{{ t.nav.contact }}</a>
      
      <button @click="toggleLanguage" class="mt-4 px-8 py-3 border border-white/20 text-white font-bold tracking-wide">
        {{ t.nav.lang === 'AR' ? 'العربية' : 'English' }}
      </button>
      
      <a href="#contact" @click="toggleMenu" class="mt-4 px-8 py-3 bg-accent-gold text-black font-bold tracking-wide text-center">
        {{ t.nav.request }}
      </a>
    </div>
  </header>
</template>
