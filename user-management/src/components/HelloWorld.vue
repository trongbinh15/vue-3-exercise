<template>
  <v-container>
    <v-row class="text-center">
      <v-col cols="12">
        <v-img :src="logo" class="my-3" contain height="200" />
      </v-col>

      <v-col class="mb-4">
        <h1 class="display-2 font-weight-bold mb-3">
          <div>Welcome to the Vuetify 3 Alpha</div>
        </h1>

        <small>Vite Preview</small>

        <p class="subheading font-weight-regular">
          For help and collaboration with other Vuetify developers,
          <br />please join our online
          <a
            href="https://community.vuetifyjs.com"
            target="_blank"
          >Discord Community</a>
        </p>
      </v-col>


      <v-col class="mb-5" cols="12">
        <h2 class="headline font-weight-bold mb-5">Ecosystem</h2>

        <v-row justify="center">
          <a
            v-for="(eco, i) in ecosystem"
            :key="i"
            :href="eco.href"
            class="subheading mx-3"
            target="_blank"
          >{{ eco.text }}</a>
        </v-row>
      </v-col>
    </v-row>
  </v-container>
</template>

<script setup >
import logo from '../assets/logo.svg'
import { ref } from 'vue'

const ecosystem = ref([
  {
    text: 'vuetify-loader',
    href: 'https://github.com/vuetifyjs/vuetify-loader',
  },
  {
    text: 'github',
    href: 'https://github.com/vuetifyjs/vuetify',
  },
  {
    text: 'awesome-vuetify',
    href: 'https://github.com/vuetifyjs/awesome-vuetify',
  },
]);
</script>
