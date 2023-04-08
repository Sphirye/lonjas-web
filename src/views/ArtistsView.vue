<template>
  <v-container fluid>
    <v-row dense align="center">
      <span class="uni-sans-heavy text-25 grey--text text--lighten-2 mx-4">{{ lang.artists }}</span>
      <v-spacer/>
      <v-sheet class="transparent mx-2" dark>
        <v-text-field
            @click:clear="search = ''; resetAll()"
            v-model="search" clearable hide-details dense outlined :label="lang.search"
            append-icon="mdi-magnify" @keydown.enter="refresh"
        />
      </v-sheet>
    </v-row>

    <v-progress-linear class="my-2" color="grey" :indeterminate="loading"/>

    <v-row align="start" dense no-gutters>
      <v-col cols="auto" v-for="(artist, key) in artists.items" :key="key">
        <ArtistCardComponent :artist="artist"/>
      </v-col>
    </v-row>
  </v-container>
</template>

<script lang="ts">
import {Component, Vue} from "vue-property-decorator"
import DrawerModule from "@/store/DrawerModule"
import LangModule from "@/store/LangModule"
import {getModule} from "vuex-module-decorators"
import Artist from "@/model/Artist";
import ArtistService from "@/service/ArtistService";
import ArtistButtonComponent from "@/components/ArtistButtonComponent.vue";
import RegisterArtistDialog from "@/components/dialog/RegisterArtistDialog.vue";
import Handler from "@/handlers/Handler";
import {MultipleItem} from "@/handlers/interfaces/ContentUI";

@Component( { components: { ArtistCardComponent: ArtistButtonComponent } } )
export default class ArtistsView extends Vue {

  artist: Artist = new Artist()
  artists: MultipleItem<Artist> = { items: [], totalItems: 0 }
  dialog: boolean = false
  loading: boolean = false
  page: number = 1
  size: number = 20
  search: string = ""

  get lang() { return getModule(LangModule).lang }

  created() {
    this.refresh()
  }

  async refresh() {
    try {
      await Handler.getItems(this, this.artists, () => ArtistService.getPublicArtists(this.page - 1, this.size, this.search))
    } catch (e) { console.log(e) }
  }

  resetAll() {
    this.page = 1
    this.refresh()
  }

}
</script>
