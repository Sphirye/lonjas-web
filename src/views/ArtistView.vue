<template>
  <v-container fluid class="px-4">

    <v-progress-linear class="mb-4" color="grey" :indeterminate="loading"/>

    <template v-if="artist.item.id">
      <v-row align="start" dense>

        <v-col cols="4">
          <ArtistCardComponent :artist="artist.item" :total-post-count="posts.totalItems"/>
        </v-col>

        <v-col cols="8">
          <v-sheet color="transparent" min-height="550px">
            <v-row dense>
              <template v-for="(post) in posts.items">
                <v-col cols="auto">
                  <PostCardComponent width="150px" height="150px" :post="post"/>
                </v-col>
              </template>
            </v-row>
          </v-sheet>
        </v-col>
      </v-row>
      <v-row dense justify="end" align="center">
        <v-pagination v-model="page" :length="pageCount" :total-visible="8"/>
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
import Artist, {Source} from "@/model/Artist"
import Post from "@/model/Post";
import PostService from "@/service/PostService";
import RouterTool from "@/service/tool/RouterTool";
import Tab from "@/model/vue/Tab";
import Handler from "@/handlers/Handler";
import {MultipleItem, SingleItem} from "@/handlers/interfaces/ContentUI";
import ArtistCardComponent from "@/components/ArtistCardComponent.vue";

@Component( {
  computed: { Source() { return Source } },
  components: {ArtistCardComponent, PostCardComponent },
} )
export default class PostsView extends Vue {

  @Ref() readonly form!: HTMLFormElement

  tab = 0
  tabs: Tab[] = [
    { name: "Twitter", route: "/twitter"  }
  ]

  artist: SingleItem<Artist> = { item: new Artist() }
  posts: MultipleItem<Post> = { items: [], totalItems: 0 }

  post: Post = new Post()
  page: number = 1
  size: number = 10
  pageCount: number = 0

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
