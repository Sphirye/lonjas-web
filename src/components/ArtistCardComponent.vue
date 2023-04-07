<template>
  <v-card flat class="lonjas-base-2" dark>
    <v-card-title class="mx-3">
      <v-avatar size="128" class="mr-4">
        <v-img contain :src="artist.twitter.profileImageUrl"/>
      </v-avatar>

      <div v-if="artist.source === Source.TWITTER">
        <span class="text-20 font-weight-bold grey--text text--lighten-2">{{ artist.twitter.name }}</span>
        <br/>
        <span class="font-weight-medium grey--text">@{{ artist.twitter.username }}</span>
      </div>

      <div v-if="artist.source === Source.DEVIANTART">
        <!--Todo-->
      </div>

    </v-card-title>
    <v-divider class="mx-3"/>
    <v-card-text>
      <div>
        <p v-if="artist.source === Source.TWITTER" style="white-space: pre-wrap;" class="mx-4 font-weight-regular text-15">
          {{ artist.twitter.description }}
        </p>
        <v-divider class="my-3"/>
        <div class="mx-3">
          <v-row align="center">
            <v-col cols="10">
              <h3 class="font-weight-medium">Posts: totalPosts
                <v-tooltip top max-width="150px">
                  <template v-slot:activator="{ on, attrs }">
                    <span v-on="on" v-bind="attrs" class="grey--text text--darken-1 pointer">?</span>
                  </template>
                  <span class="text-center">Cantidad total de posts añadidos a la galería.</span>
                </v-tooltip>
              </h3>
              <h3 class="font-weight-medium">
                Last update: 30 min ago.
              </h3>
            </v-col>
          </v-row>
        </div>
      </div>
    </v-card-text>
    <v-card-actions class="pb-3 mr-3">
      <v-spacer/>
      <v-btn
          v-if="artist.twitter" fab color="grey ligthen-1" depressed width="50px" height="50px"
          target="_blank" :href="`https://twitter.com/${artist.twitter.username}`"
      >
        <v-icon color="grey darken-4">fab fa-twitter</v-icon>
      </v-btn>
    </v-card-actions>
  </v-card>
</template>

<script lang="ts">

import PostCardComponent from "@/components/PostCardComponent.vue"
import {Component, Prop, Ref, Vue, Watch} from 'vue-property-decorator'
import ArtistService from "@/service/ArtistService"
import {getModule} from "vuex-module-decorators"
import DialogModule from "@/store/DialogModule"
import LangModule from "@/store/LangModule"
import Rules from "@/service/tool/Rules"
import Dialog from "@/model/vue/Dialog"
import Artist, {Source} from "@/model/Artist"
import Post from "@/model/Post";
import PostService from "@/service/PostService";
import RouterTool from "@/service/tool/RouterTool";
import Tab from "@/model/vue/Tab";
import Handler from "@/handlers/Handler";
import {MultipleItem, SingleItem} from "@/handlers/interfaces/ContentUI";

@Component( {
  computed: {
    Source() {
      return Source
    }
  },
  components: { PostCardComponent } } )
export default class A extends Vue {
  @Prop() readonly artist!: Artist
  get lang() { return getModule(LangModule).lang }
}
</script>

<style>
.v-expansion-panel-content>>> .v-expansion-panel-content__wrap {
  padding: 0 !important;
}
</style>