<script setup lang="ts">
import { MapPin, Phone, Mail, ArrowRight } from 'lucide-vue-next';
import { useTranslation } from '../composables/useLanguage';
const { t } = useTranslation();
</script>

<template>
  <section id="contact" class="relative bg-black/60 backdrop-blur-md py-32 px-6 lg:px-12 z-10 border-t border-white/5">
    <div class="max-w-7xl mx-auto">
      
      <div class="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24">
        
        <!-- Left: Info -->
        <div class="flex flex-col">
          <div class="flex items-center gap-4 mb-8">
            <div class="w-12 h-[1px] bg-accent-gold"></div>
            <span class="text-accent-gold tracking-[0.2em] uppercase text-sm font-bold">{{ t.contact.tag }}</span>
          </div>
          
          <h2 class="text-4xl md:text-6xl font-display font-bold leading-[1.1] text-white mb-8">
            {{ t.contact.title1 }}<br/>
            <span class="text-white/40">{{ t.contact.title2 }}</span>
          </h2>
          
          <p class="text-white/60 text-lg leading-relaxed mb-16 max-w-md">
            {{ t.contact.desc }}
          </p>
          
          <div class="flex flex-col gap-8">
            <div class="flex items-start gap-4">
              <div class="w-12 h-12 rounded-full border border-white/10 flex items-center justify-center shrink-0">
                <MapPin class="w-5 h-5 text-accent-gold" />
              </div>
              <div>
                <h4 class="text-white font-bold mb-1">{{ t.contact.hq }}</h4>
                <p class="text-white/50">Level 42, The Obsidian Tower<br/>Dubai, UAE</p>
              </div>
            </div>
            
            <div class="flex items-start gap-4">
              <div class="w-12 h-12 rounded-full border border-white/10 flex items-center justify-center shrink-0">
                <Phone class="w-5 h-5 text-accent-gold" />
              </div>
              <div>
                <h4 class="text-white font-bold mb-1">{{ t.contact.phone }}</h4>
                <p class="text-white/50">+971 50 123 4567</p>
              </div>
            </div>
            
            <div class="flex items-start gap-4">
              <div class="w-12 h-12 rounded-full border border-white/10 flex items-center justify-center shrink-0">
                <Mail class="w-5 h-5 text-accent-gold" />
              </div>
              <div>
                <h4 class="text-white font-bold mb-1">{{ t.contact.email }}</h4>
                <p class="text-white/50">projects@atlasengineering.com</p>
              </div>
            </div>
          </div>
        </div>
        
        <!-- Right: Form -->
        <div class="bg-black/50 border border-white/10 p-8 md:p-12">
          <form @submit.prevent="" class="flex flex-col gap-6">
            <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div class="flex flex-col gap-2">
                <label class="text-white/70 text-sm font-bold tracking-wider uppercase">{{ t.contact.form.name }}</label>
                <input type="text" :placeholder="t.contact.form.namePl" class="bg-transparent border-b border-white/20 py-3 text-white focus:outline-none focus:border-accent-gold transition-colors duration-300">
              </div>
              <div class="flex flex-col gap-2">
                <label class="text-white/70 text-sm font-bold tracking-wider uppercase">{{ t.contact.form.comp }}</label>
                <input type="text" :placeholder="t.contact.form.compPl" class="bg-transparent border-b border-white/20 py-3 text-white focus:outline-none focus:border-accent-gold transition-colors duration-300">
              </div>
            </div>
            
            <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div class="flex flex-col gap-2">
                <label class="text-white/70 text-sm font-bold tracking-wider uppercase">{{ t.contact.form.email }}</label>
                <input type="email" :placeholder="t.contact.form.emailPl" class="bg-transparent border-b border-white/20 py-3 text-white focus:outline-none focus:border-accent-gold transition-colors duration-300">
              </div>
              <div class="flex flex-col gap-2">
                <label class="text-white/70 text-sm font-bold tracking-wider uppercase">{{ t.contact.form.phone }}</label>
                <input type="tel" :placeholder="t.contact.form.phonePl" class="bg-transparent border-b border-white/20 py-3 text-white focus:outline-none focus:border-accent-gold transition-colors duration-300">
              </div>
            </div>
            
            <div class="flex flex-col gap-2 mt-4">
              <label class="text-white/70 text-sm font-bold tracking-wider uppercase">{{ t.contact.form.proj }}</label>
              <textarea rows="4" :placeholder="t.contact.form.projPl" class="bg-transparent border-b border-white/20 py-3 text-white focus:outline-none focus:border-accent-gold transition-colors duration-300 resize-none"></textarea>
            </div>
            
            <button type="submit" class="group flex items-center justify-between w-full mt-8 px-8 py-5 bg-white text-black font-bold tracking-wider uppercase hover:bg-accent-gold transition-colors duration-300">
              <span>{{ t.contact.form.btn }}</span>
              <ArrowRight class="w-5 h-5 ltr:block hidden group-hover:translate-x-2 transition-transform" />
              <ArrowRight class="w-5 h-5 rtl:block hidden rotate-180 group-hover:-translate-x-2 transition-transform" />
            </button>
          </form>
        </div>
        
      </div>
    </div>
  </section>
</template>
