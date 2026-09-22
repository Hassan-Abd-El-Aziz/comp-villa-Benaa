<script setup lang="ts">
import Navbar from './components/Navbar.vue';
import Hero from './components/Hero.vue';
import ConstructionScene from './components/3d/ConstructionScene.vue';
import StorySections from './components/StorySections.vue';
import AboutSection from './components/AboutSection.vue';
import ServicesSection from './components/ServicesSection.vue';
import ConstructionProcess from './components/ConstructionProcess.vue';
import ProjectsSection from './components/ProjectsSection.vue';
import StatisticsSection from './components/StatisticsSection.vue';
import ContactSection from './components/ContactSection.vue';
import Footer from './components/Footer.vue';
import { useTranslation } from './composables/useLanguage';
import { onMounted, onUnmounted, ref } from 'vue';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ArrowUp } from 'lucide-vue-next';

const { t } = useTranslation();

const showScrollTop = ref(false);

const handleScroll = () => {
  showScrollTop.value = window.scrollY > 300;
};

const scrollToTop = () => {
  window.scrollTo({ top: 0, behavior: 'smooth' });
};

onMounted(() => {
  window.addEventListener('scroll', handleScroll);
  
  gsap.registerPlugin(ScrollTrigger);
  
  // Select main content sections to animate
  const sections = document.querySelectorAll('.animate-section');
  sections.forEach((sec) => {
    gsap.from(sec, {
      y: 60,
      opacity: 0,
      duration: 1,
      ease: "power2.out",
      scrollTrigger: {
        trigger: sec,
        start: 'top 85%',
        toggleActions: 'play reverse play reverse'
      }
    });
  });
});

onUnmounted(() => {
  window.removeEventListener('scroll', handleScroll);
});
</script>

<template>
  <div class="relative min-h-screen bg-primary-dark">
    <!-- Background 3D Canvas -->
    <ConstructionScene />

    <!-- UI Layer -->
    <div class="relative z-10 w-full overflow-hidden">
      <Navbar />
      
      <main>
        <!-- Phase 1: Hero -->
        <Hero id="home" />
        
        <!-- Phase 3: Scroll-driven Construction Journey -->
        <StorySections id="journey" />
        
        <!-- Phases 4, 5 & 6: Content Sections -->
        <div class="relative z-20">
          <AboutSection class="animate-section" />
          <ServicesSection class="animate-section" />
          <ConstructionProcess class="animate-section" />
          
          <ProjectsSection class="animate-section" />
          <StatisticsSection class="animate-section" />
          <ContactSection class="animate-section" />
          
          <!-- Final Showcase Section before footer -->
          <section class="animate-section h-screen bg-transparent flex flex-col items-center  pointer-events-none relative z-10">
            <div class="mt-3 bottom-32 text-center pointer-events-auto bg-black/30 backdrop-blur-md px-8 py-4 rounded-full border border-white/10">
              <span class="text-white/80 tracking-[0.2em] uppercase text-sm font-bold">{{ t.footer.final }}</span>
            </div>
          </section>
        </div>
        
      </main>
      
      <!-- Phase 6: Footer -->
      <Footer class="relative z-20 animate-section" />
    </div>

    <!-- Floating Actions -->
    <div class="fixed bottom-6 right-6 rtl:right-auto rtl:left-6 z-50 flex flex-col gap-4">
      <!-- WhatsApp Icon -->
      <a href="https://wa.me/971501234567" target="_blank" class="w-12 h-12 bg-green-500 rounded-full flex items-center justify-center shadow-lg hover:scale-110 transition-transform">
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="white" viewBox="0 0 24 24"><path d="M12.031 6.172c-3.181 0-5.767 2.586-5.768 5.766-.001 1.298.38 2.27 1.019 3.287l-.582 2.128 2.182-.573c.978.58 1.911.928 3.145.929 3.178 0 5.767-2.587 5.768-5.766.001-3.187-2.575-5.77-5.764-5.771zm3.392 8.244c-.144.405-.837.774-1.17.824-.299.045-.677.063-1.092-.069-.252-.08-.575-.187-.988-.365-1.739-.751-2.874-2.502-2.961-2.617-.087-.116-.708-.94-.708-1.793s.448-1.273.607-1.446c.159-.173.346-.217.462-.217l.332.006c.106.005.249-.04.39.298.144.347.491 1.2.534 1.287.043.087.072.188.014.304-.058.116-.087.188-.173.289l-.26.304c-.087.086-.177.18-.076.354.101.174.449.741.964 1.201.662.591 1.221.774 1.394.86s.274.072.376-.043c.101-.116.433-.506.549-.68.116-.173.231-.145.39-.087s1.011.477 1.184.564.289.13.332.202c.045.072.045.419-.099.824zm-3.423-14.416c-6.627 0-12 5.373-12 12s5.373 12 12 12 12-5.373 12-12-5.373-12-12-12zm.082 21.615c-1.802 0-3.561-.468-5.111-1.353l-5.69 1.492 1.521-5.545c-.975-1.588-1.488-3.435-1.488-5.334 0-5.546 4.515-10.061 10.062-10.061 5.544 0 10.06 4.515 10.06 10.061s-4.516 10.06-10.06 10.06z"/></svg>
      </a>
      <!-- Scroll to Top Button -->
      <button v-show="showScrollTop" @click="scrollToTop" class="w-12 h-12 bg-white text-black rounded-full flex items-center justify-center shadow-lg hover:bg-gray-200 transition-colors">
        <ArrowUp class="w-6 h-6" />
      </button>
    </div>
  </div>
</template>

<style>
/* Global smooth scrolling */
html {
  scroll-behavior: smooth;
}
</style>
