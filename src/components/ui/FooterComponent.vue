<template>
  <v-footer color="dark-2">
    <v-row justify="center" no-gutters>
      <v-btn
          fab color="dark-4" depressed width="50px" height="50px"
          target="_blank" :href="`https://twitter.com/lonjas_archive`"
      >
        <v-icon color="grey lighten-4">fab fa-twitter</v-icon>
      </v-btn>
    </v-row>
    <v-col class="py-4 text-center white--text" cols="12">
      {{ new Date().getFullYear() }} — <strong>Lonjas</strong>
    </v-col>
  </v-footer>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator"

@Component
export default class FooterComponent extends Vue {

}
</script>