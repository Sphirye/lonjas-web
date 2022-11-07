<template>
  <v-container fluid class="px-8">
    <v-row dense align="center">
      <span class="uni-sans-heavy text-md white--text mx-4">{{ lang.artists }}</span>
      <v-spacer/>
      <v-expand-x-transition>
        <v-sheet class="transparent mr-4" v-if="showSearchBar" dark>
          <v-text-field
              @click:clear="search = ''; newQuery()"
              v-model="search" v-debounce:250ms="newQuery"
              clearable hide-details dense outlined
              append-icon="mdi-magnify" :label="lang.search"
          />
        </v-sheet>
      </v-expand-x-transition>
      <v-btn large icon outlined @click="showSearchBar = !showSearchBar" dark class="mr-3">
        <v-icon>mdi-magnify</v-icon>
      </v-btn>
    </v-row>
    <v-progress-linear class="my-4" color="grey" :indeterminate="loading"/>
    <v-row justify="start" align="start">
      <v-col cols="3" v-for="(artist, key) in artists" :key="key">
        <artist-card-component :artist="artist"/>
      </v-col>
    </v-row>
  </v-container>
</template>
<script lang="ts">
import {Component, Ref, Vue} from 'vue-property-decorator'
import {getModule} from "vuex-module-decorators"
import DialogModule from "@/store/DialogModule"
import LangModule from "@/store/LangModule"
import Rules from "@/service/tool/Rules"
import Dialog from "@/model/vue/Dialog"
import PostService from "@/service/PostService";
import Post from "@/model/Post";
import PostCardComponent from "@/components/PostCardComponent.vue";
import ArtistService from "@/service/ArtistService";
import Artist from "@/model/Artist";
import ArtistCardComponent from "@/components/ArtistCardComponent.vue";

@Component( { components: { ArtistCardComponent } } )
export default class HomeView extends Vue {

  get lang() { return getModule(LangModule).lang }
  showSearchBar: boolean = false
  loading: boolean = false
  page: number = 1
  size: number = 10
  search: string = ""
  artists: Artist[] = []

  created() {
    this.refresh()
  }

  refresh() {
    ArtistService.getArtists(this, this.artists, this.page - 1, this.size, this.search)
  }

  newQuery() {
    this.page = 1
    this.refresh()
  }

  validate() {
    getModule(DialogModule).showDialog(new Dialog(this.lang.warning, "¿Desea continuar?", () => {
      alert("Has continuado.")
    }))
  }

}
</script>
