<script setup lang="ts">
import { RouterLink } from 'vue-router';
</script>
<template>
  <nav
    class="relative flex flex-wrap justify-between text-white font-semibold px-8 py-3 bg-black"
  >
    <RouterLink to="/">E Money Test</RouterLink>

    <ul class="flex list-none ml-auto">
      <li>
        <RouterLink to="/users">Users</RouterLink>
      </li>
    </ul>
  </nav>
</template>
