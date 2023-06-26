<template>
  <div>
    <v-row align="start" dense justify="start">
      <template v-for="(post, key) in syncedPosts.items">
        <v-col cols="6" sm="4" md="3" lg="2" xl="1" class="flex" :key="key">
          <PostCardComponent :post="post" :width="syncedPostsWidth" :height="syncedPostsHeight"/>
        </v-col>
      </template>
    </v-row>

    <v-row dense align="center">
      <v-spacer/>
      <span class="white--text mx-4">Mostrando {{syncedPosts.items.length}} de {{syncedPosts.totalItems}} posts.</span>
      <v-pagination class="white--text" v-model="syncedPage" :length="syncedPageCount" :total-visible="8"/>
    </v-row>
  </div>
</template>

<script lang="ts">
import {Component, PropSync, Vue} from 'vue-property-decorator'
import {MultipleItem} from "@/handlers/interfaces/ContentUI"
import Post from "@/model/Post"
import PostCardComponent from "@/components/PostCardComponent.vue";

@Component({
    components: {PostCardComponent}
})
export default class PostGridListComponent extends Vue {

    @PropSync("posts") syncedPosts!: MultipleItem<Post>
    @PropSync("page") syncedPage!: number
    @PropSync("pageCount") syncedPageCount!: number

    @PropSync("postWidth") syncedPostsWidth!: string
    @PropSync("postHeight") syncedPostsHeight!: string

}
</script>