<template>
  <v-card outlined dark color="dark-5" class="pa-2" rounded :width="width" :height="height" @click="$router.push('/artists/' + artist.id)">
    <v-img class="rounded-b" height="130px" width="100%" contain :src="artist.twitter.profileImageUrl"/>
    <v-card-text class="text-center py-2">
      <h3 class="line-clamp-1">{{ artist.twitter.name }}</h3>
      <p class="line-clamp-1">@{{ artist.twitter.username }}</p>
    </v-card-text>
  </v-card>
</template>

<script lang="ts">
import {Component, Prop, Ref, Vue} from 'vue-property-decorator'
import {getModule} from "vuex-module-decorators"
import LangModule from "@/store/LangModule"
import Artist from "@/model/Artist"

@Component
export default class ArtistButtonComponent extends Vue {
    @Prop() readonly artist!: Artist

    @Prop({default: '150px'}) readonly width!: string
    @Prop({default: '200px'}) readonly height!: string

    get lang() {
        return getModule(LangModule).lang
    }
}
</script>