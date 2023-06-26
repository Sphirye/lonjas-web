<template>
  <v-container fluid class="px-4">

    <v-progress-linear class="mb-4" color="grey" :indeterminate="loading"/>

    <template v-if="artist.item.id">
      <v-row align="start" dense>

        <v-col cols="4">
          <ArtistCardComponent :artist="artist.item" :total-post-count="posts.totalItems"/>
        </v-col>

        <v-col cols="8">
          <PostsGridPageableComponent :posts.sync="posts" :page.sync="page" :page-count.sync="pageCount" post-width="100%" post-height="200px"/>
          <v-progress-linear class="my-4" color="grey" :indeterminate="loading"/>
        </v-col>
      </v-row>
    </template>
  </v-container>
</template>

<script lang="ts">

import PostsGridPageableComponent from "@/components/PostsGridPageableComponent.vue"
import {MultipleItem, SingleItem} from "@/handlers/interfaces/ContentUI"
import ArtistCardComponent from "@/components/ArtistCardComponent.vue"
import PostCardComponent from "@/components/PostCardComponent.vue"
import {Component, Mixins, Ref, Watch} from 'vue-property-decorator'
import ArtistService from "@/service/ArtistService"
import {getModule} from "vuex-module-decorators"
import PostService from "@/service/PostService"
import Artist, {Source} from "@/model/Artist"
import LangModule from "@/store/LangModule"
import Handler from "@/handlers/Handler"
import Rules from "@/service/tool/Rules"
import Post from "@/model/Post"
import PaginationMixin from "@/mixins/PaginationMixin";

@Component({
    computed: {
        Source() {
            return Source
        }
    },
    components: {PostsGridPageableComponent, ArtistCardComponent, PostCardComponent},
})
export default class PostsView extends Mixins(PaginationMixin) {

    @Ref() readonly form!: HTMLFormElement

    artist: SingleItem<Artist> = {item: new Artist()}
    posts: MultipleItem<Post> = {items: [], totalItems: 0}

    post: Post = new Post()
    size: number = 10

    loading: boolean = false

    get lang() {
        return getModule(LangModule).lang
    }

    get artistId() {
        return Number(this.$route.params.id)
    }

    get rules() {
        return Rules
    }

    async created() {
        if (this.$route.params.id == undefined) {
            await this.$router.push("/")
            return
        }

        await Handler.getItem(this, this.artist, () => ArtistService.getPublicArtist(Number(this.$route.params.id)))
        await this.refresh()
    }

    async refresh() {
        await Handler.getItems(this, this.posts, () =>
            PostService.getPublicPosts(this.page - 1, this.size, this.artistId, null, null, null, null)
        )
        this.setPageCount(this.posts.totalItems!)
    }

    @Watch("page")
    onPageChanged() {
        this.refresh()
    }


}
</script>
