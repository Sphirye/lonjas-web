<template>
  <v-container fluid>
    <v-progress-linear class="mb-4" color="grey" :indeterminate="loading"/>
    <template v-if="post.item.id !== undefined">
      <v-row dense>

        <v-col cols="4">
          <ArtistCardComponent :artist="post.item.artist"/>
        </v-col>

        <v-col cols="8" class="d-flex flex-column">
          <PostImageComponent :post="post.item"/>

          <v-divider class="my-2" dark/>

          <template v-if="post.item.type === Type.TWEET">
            <v-card color="dark-3" flat dark>

              <v-card-title>
                <v-avatar class="pointer" @click="toArtistPage(artist)">
                  <v-img :src="getArtistAvatar"/>
                </v-avatar>

              </v-card-title>
            </v-card>
          </template>
        </v-col>
      </v-row>
    </template>
  </v-container>
</template>

<script lang="ts">
import ArtistCardComponent from "@/components/ArtistCardComponent.vue"
import PostImageComponent from "@/components/PostImageComponent.vue"
import PostCardComponent from "@/components/PostCardComponent.vue"
import {SingleItem} from "@/handlers/interfaces/ContentUI"
import {Component, Ref, Vue} from 'vue-property-decorator'
import PostService from "@/service/PostService"
import Handler from "@/handlers/Handler"
import Artist, {Source} from "@/model/Artist"
import Post, {Type} from "@/model/Post";

@Component( {
  computed: {
    Type() { return Type }
  },
  components: {PostImageComponent, ArtistCardComponent, PostCardComponent } }
)
export default class PostView extends Vue {

  post: SingleItem<Post> = { item: new Post() }
  loading: boolean = false

  created() { this.refresh() }

  get artist() { return this.post.item.artist }

  async refresh() {
    try {
      await Handler.getItem(this, this.post, () => PostService.getPublicPost(Number(this.$route.params.id)))
    } catch (e) { console.log(e) }
  }

  get getArtistAvatar(): string | undefined {
    let url: string | undefined = undefined

    switch (this.artist!!.source) {
      case (Source.TWITTER): { url = this.artist!!.twitter!.profileImageUrl!; break; }
      case Source.DEVIANTART: { /* todo */ break; }
    }

    return url
  }

  toArtistPage(artist: Artist) {
    this.$router.push("/artists/" + artist.id).catch(() => {})
  }

}
</script>

<style>
.v-expansion-panel-content>>> .v-expansion-panel-content__wrap {
  padding: 0 !important;
}
</style>
