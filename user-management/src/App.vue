<template>
  <v-app>
    <v-main>
      <v-progress-linear :indeterminate="loading" color="blue darken-2"></v-progress-linear>
      <v-container>
        <router-view></router-view>
      </v-container>
    </v-main>
  </v-app>
</template>

<script setup>
import { useStore } from 'vuex';
import { computed } from 'vue';
const store = useStore();
const loading = computed(() => store.state.base.loading);
</script>
