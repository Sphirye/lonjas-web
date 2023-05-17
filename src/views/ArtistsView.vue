<template>
  <v-container fluid>
    <v-row dense align="center">
      <span class="uni-sans-heavy text-25 grey--text text--lighten-2 mx-4">{{ lang.artists }}</span>
      <v-spacer/>
      <v-sheet class="transparent mx-2" dark>
        <v-text-field
            @click:clear="resetAll(); refresh()" v-model="search" clearable hide-details outlined
            :label="lang.search" append-icon="mdi-magnify" @keydown.enter="refresh" dense
        />
      </v-sheet>
    </v-row>

    <v-progress-linear class="my-2" color="grey" :indeterminate="loading"/>

    <v-row align="start" dense no-gutters style="min-height: 500px">
      <v-row dense>
        <template v-for="(artist, key) in artists.items">
          <v-col cols="auto" class="flex" :key="key">
            <ArtistCardComponent :artist="artist"/>
          </v-col>
        </template>
      </v-row>
    </v-row>

    <v-progress-linear class="my-2" color="grey" :indeterminate="loading"/>

    <v-row dense align="center">
      <v-spacer/>
      <v-pagination class="white--text" v-model="page" :length="pageCount" :total-visible="8"/>
    </v-row>
  </v-container>
</template>

<script lang="ts">
import ArtistButtonComponent from "@/components/ArtistButtonComponent.vue"
import {Component, Mixins, Vue, Watch} from "vue-property-decorator"
import {MultipleItem} from "@/handlers/interfaces/ContentUI"
import PaginationMixin from "@/mixins/PaginationMixin"
import ArtistService from "@/service/ArtistService"
import {getModule} from "vuex-module-decorators"
import LangModule from "@/store/LangModule"
import Handler from "@/handlers/Handler"
import Artist from "@/model/Artist"

@Component({components: {ArtistCardComponent: ArtistButtonComponent}})
export default class ArtistsView extends Mixins(PaginationMixin) {

    artist: Artist = new Artist()
    artists: MultipleItem<Artist> = {items: [], totalItems: 0}
    dialog: boolean = false
    loading: boolean = false

    get lang() { return getModule(LangModule).lang }

    created() { this.refresh() }

    async refresh() {
        try {
            await Handler.getItems(this, this.artists, () => ArtistService.getPublicArtists(this.page - 1, this.size, this.search))
            this.setPageCount(this.artists.totalItems!!)
        } catch (e) { console.log(e) }
    }

    @Watch("page")
    async onPageChanged() {
        await this.refresh()
        await this.$vuetify.goTo(0)
    }

}
</script>
