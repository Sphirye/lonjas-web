<template>
  <v-container fluid class="px-8">

    <v-progress-linear class="mb-4" color="grey" :indeterminate="loading"/>

    <template v-if="artist.item.id">
      <v-row align="start" dense>

        <v-col cols="4">
          <v-card flat class="lonjas-base-2" dark>
            <v-card-title class="mx-3">
              <v-avatar size="128" class="mr-4">
                <v-img contain :src="artist.item.twitter.profileImageUrl"/>
              </v-avatar>
              <div>
                <span class="text-20 font-weight-bold grey--text text--lighten-2">{{ artist.item.twitter.name }}</span>
                <br/>
                <span class="font-weight-medium grey--text">@{{ artist.item.twitter.username }}</span>
              </div>
            </v-card-title>
            <v-divider class="mx-3"/>
            <v-card-text>
              <div>

                <p style="white-space: pre-wrap;" class="mx-4 font-weight-medium text-15">{{ artist.item.twitter.description }}</p>

                <v-divider class="my-3"/>
                <div class="mx-3">
                  <v-row align="center">
                    <v-col cols="10">
                      <h3 class="font-weight-medium">Posts:  totalPosts
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
                    <v-col cols="2">
                      <v-icon size="30">fab fa-twitter</v-icon>
                    </v-col>
                  </v-row>
                </div>
              </div>
            </v-card-text>
          </v-card>
        </v-col>

        <v-col cols="8">
          <v-row dense>
            <template v-for="(post) in posts.items">
              <v-col cols="6" sm="4" md="4" lg="auto">
                <PostCardComponent width="150px" height="150px" :post="post"/>
              </v-col>
            </template>
          </v-row>


          <template v-if="false">
            <v-row no-gutters align="center" dense>
              <v-tabs v-model="tab" centered background-color="transparent">
                <v-tab v-for="item in tabs" :key="item.route" active-class="grey darken-2 grey--text">
                  <span class="uni-sans-heavy grey--text text--lighten-2 text-20">{{ item.name }}</span>
                </v-tab>
              </v-tabs>
            </v-row>
            <v-tabs-items v-model="tab" class="transparent">
            </v-tabs-items>
          </template>
        </v-col>
      </v-row>
    </template>
  </v-container>
</template>

<script lang="ts">

import PostCardComponent from "@/components/PostCardComponent.vue"
import {Component, Ref, Vue, Watch} from 'vue-property-decorator'
import ArtistService from "@/service/ArtistService"
import {getModule} from "vuex-module-decorators"
import DialogModule from "@/store/DialogModule"
import LangModule from "@/store/LangModule"
import Rules from "@/service/tool/Rules"
import Dialog from "@/model/vue/Dialog"
import Artist from "@/model/Artist"
import Post from "@/model/Post";
import PostService from "@/service/PostService";
import RouterTool from "@/service/tool/RouterTool";
import Tab from "@/model/vue/Tab";
import Handler from "@/handlers/Handler";
import {MultipleItem, SingleItem} from "@/handlers/interfaces/ContentUI";

@Component( { components: { PostCardComponent } } )
export default class PostsView extends Vue {

  @Ref() readonly form!: HTMLFormElement

  tab = 0
  tabs: Tab[] = [
    { name: "Twitter", route: "/twitter"  },
  ]

  artist: SingleItem<Artist> = { item: new Artist() }
  posts: MultipleItem<Post> = { items: [], totalItems: 0 }

  post: Post = new Post()
  page: number = 1
  size: number = 10
  loading: boolean = false

  get lang() { return getModule(LangModule).lang }
  get artistId() { return Number(this.$route.params.id) }
  get rules() { return Rules }

  async created() {
    try {

      if (this.$route.params.id == undefined) {
        await this.$router.push("/")
        return
      }

      await Handler.getItem(this, this.artist, () => ArtistService.getPublicArtist(Number(this.$route.params.id)))
      await this.refresh()
      this.tab = RouterTool.configTabs(this, this.tabs)
    } catch (e) { console.log(e) }
  }

  async refresh() {
    try {
      await Handler.getItems(this, this.posts, () =>
          PostService.getPublicPosts(this.page - 1, this.size, this.artistId, null, null, null)
      )
    } catch (e) {
      console.log(e)
    }
  }

  validate() {
    getModule(DialogModule).showDialog(new Dialog(this.lang.warning, "¿Desea continuar?", () => {
      alert("Has continuado.")
    }))
  }

  @Watch("tab")
  watchTab() {
    RouterTool.watchTabs(this, "/artists/" + this.$route.params.id, this.tab, this.tabs)
  }

}
</script>

<style>
.v-expansion-panel-content>>> .v-expansion-panel-content__wrap {
  padding: 0 !important;
}
</style>
