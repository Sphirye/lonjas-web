<template>
  <v-card outlined dark rounded width="200px" height="200px" @click="$router.push('/artists/' + artist.id)">
    <v-img contain class="mx-3 my-2 pre-blur-image rounded-b" :src="artist.twitter.profile_image_url"/>
    <v-card-text class="text-center">
      <h3>{{ artist.twitter.name }}</h3>
      <p>@{{ artist.twitter.username }}</p>
    </v-card-text>
  </v-card>
</template>

<script lang="ts">
import {Component, Prop, Ref, Vue} from 'vue-property-decorator'
import {getModule} from "vuex-module-decorators"
import LangModule from "@/store/LangModule"
import Artist from "@/model/Artist"

@Component
export default class ArtistCardComponent extends Vue {

  @Prop() readonly artist!: Artist
  get lang() { return getModule(LangModule).lang }

}
</script>

<style>
.pre-blur-image .v-image__image{
  image-rendering: crisp-edges !important;
  transition: all 0.5s;
}

.blur-image .v-image__image {
  filter: blur(2px);
  -webkit-filter: blur(2px);
}
</style>