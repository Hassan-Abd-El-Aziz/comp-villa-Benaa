<script setup lang="ts">
import { useTranslation } from '../composables/useLanguage';
import { onMounted, ref } from 'vue';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);
const { t } = useTranslation();
const statsContainer = ref(null);

onMounted(() => {
  const statElements = statsContainer.value?.querySelectorAll('.stat-value');
  
  statElements?.forEach((el) => {
    const originalText = el.innerText;
    // Extract only the numeric part (English or Arabic digits)
    const numMatch = originalText.match(/[\d\u0660-\u0669]+/);
    if (numMatch) {
      const numStr = numMatch[0];
      // Convert Arabic numerals to English for JS math if needed, but it's easier to just animate a proxy object
      const isArabic = /[\u0660-\u0669]/.test(numStr);
      const toEng = (s: string) => s.replace(/[\u0660-\u0669]/g, d => String(d.charCodeAt(0) - 0x0660));
      const toAr = (n: number | string) => String(n).replace(/\d/g, d => String.fromCharCode(0x0660 + Number(d)));
      
      const targetNum = Number(isArabic ? toEng(numStr) : numStr);
      const prefix = originalText.substring(0, numMatch.index);
      const suffix = originalText.substring(numMatch.index! + numStr.length);
      
      const obj = { val: 0 };
      gsap.to(obj, {
        val: targetNum,
        duration: 2,
        scrollTrigger: {
          trigger: el,
          start: "top 80%",
        },
        onUpdate: () => {
          const currentNum = Math.floor(obj.val);
          el.innerText = prefix + (isArabic ? toAr(currentNum) : currentNum) + suffix;
        }
      });
    } else {
      // Fallback fade in
      gsap.from(el, {
        opacity: 0,
        y: 20,
        duration: 1,
        scrollTrigger: {
          trigger: el,
          start: "top 80%",
        }
      });
    }
  });
});
</script>

<template>
  <section class="relative bg-accent-gold/80 backdrop-blur-md py-20 px-6 lg:px-12 z-10 overflow-hidden" ref="statsContainer">
    <!-- Subtle architectural blueprint pattern -->
    <div class="absolute inset-0 opacity-10 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAiIGhlaWdodD0iNDAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PHBhdGggZD0iTTAgMGg0MHY0MEgweiIgZmlsbD0ibm9uZSIvPjxwYXRoIGQ9Ik0wIDEwaDQwdjFIMHptMCAxMGg0MHYxSDB6bTAgMTBoNDB2MUgwek0xMCAwdjQwaDFWMHptMTAgMHY0MGgxVDB6bTEwIDB2NDBoMVYweiIgZmlsbD0iIzAwMCIvPjwvc3ZnPg==')]"></div>
    
    <div class="max-w-7xl mx-auto relative z-10">
      <div class="grid grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-8 divide-x-0 lg:divide-x divide-black/10 rtl:lg:divide-x-reverse">
        
        <div v-for="stat in t.stats" :key="stat.label" class="flex flex-col items-center text-center px-4">
          <span class="stat-value text-5xl md:text-7xl font-display font-bold text-black mb-4">{{ stat.value }}</span>
          <span class="text-sm font-bold tracking-[0.2em] uppercase text-black/70">{{ stat.label }}</span>
        </div>
        
      </div>
    </div>
  </section>
</template>
