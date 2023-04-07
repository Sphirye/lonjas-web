<template>
  <v-container fluid>
    <template v-if="post.item.id !== undefined">
      <v-row dense>

        <v-col cols="4">
          <ArtistCardComponent :artist="post.item.artist"/>
        </v-col>

        <v-col cols="8">
          <PostImageComponent :post="post.item"/>
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
import ArtistCardComponent from "@/components/ArtistCardComponent.vue";
import PostImageComponent from "@/components/PostImageComponent.vue";

@Component( { components: {PostImageComponent, ArtistCardComponent, PostCardComponent } } )
export default class PostView extends Vue {

  @Ref() postImageComponent!: PostImageComponent;
  
  post: SingleItem<Post> = { item: new Post() }
  loading: boolean = false

  created() {
    this.refresh()
  }

  async refresh() {
    try {
      await Handler.getItem(this, this.post, () => PostService.getPublicPost(Number(this.$route.params.id)))
    } catch (e) {
      console.log(e)
    }
  }

}
</script>

<style>
.v-expansion-panel-content>>> .v-expansion-panel-content__wrap {
  padding: 0 !important;
}
</style>
