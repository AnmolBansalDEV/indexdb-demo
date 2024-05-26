<script setup lang="ts">
import { RouterView } from 'vue-router';
import Navbar from './components/Navbar.vue'
import Toaster from '@/components/ui/toast/Toaster.vue'

</script>

<template>
  <main class="size-full flex gap-4 pb-6 flex-col">
    <Navbar />
    <Toaster />
    <RouterView />
  </main>
 </template>