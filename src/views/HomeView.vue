<template>
  <v-container fluid class="mt-0 px-10">
    <v-row dense>
      <v-card color="dark-4" flat dark>
        <v-card-text class="pt-2">
          <v-subheader class="my-0 my-0">
            <span>Tendencia:</span>
          </v-subheader>

          <v-slide-group multiple show-arrows dark>
            <template v-if="!loading">
              <v-slide-item v-for="(post, key) in posts.items" :key="key">
                <PostCardComponent width="250px" height="300px" :post="post" class="mx-1"/>
              </v-slide-item>
            </template>
            <template v-else>
              <v-slide-item v-for="(item, key) in 5" :key="key + 'loading'">
                <v-skeleton-loader class="ma-1" width="300" height="350px" type="image"/>
              </v-slide-item>
            </template>
            <template v-else>
            </template>
          </v-slide-group>
        </v-card-text>
      </v-card>
    </v-row>

    <v-progress-linear class="mb-4 mt-5" color="grey" :indeterminate="loading"/>

    <v-row dense>
      <v-col cols="12" lg="4">
        <v-card color="dark-4" dark flat>
          <v-card-text class="pt-2">
            <v-subheader class="my-0 my-0">{{ lang.recentArtists }}</v-subheader>
            <div class="d-flex justify-center flex-wrap">
              <template v-if="!loading">
                <ArtistButtonComponent class="ma-1" v-for="(artist, key) in artists.items" :key="key" :artist="artist"/>
              </template>
              <template v-else>
                <v-skeleton-loader class="ma-1" width="130px" height="190px" type="image" v-for="(item, key) in 10" :key="key"/>
              </template>
            </div>
          </v-card-text>
        </v-card>
      </v-col>

      <v-col cols="12" lg="8">
        <v-card color="dark-4" dark flat>
          <v-card-text class="pt-2">
            <v-subheader>{{ lang.recentPosts }}</v-subheader>
            <v-row dense>
              <template v-if="!loading">
                <v-col cols="6" sm="4" md="3" class="flex" v-for="(post, key) in posts.items" :key="key">
                  <PostCardComponent width="100%" height="200px" :post="post"/>
                </v-col>
              </template>
              <template v-else>
                <v-col cols="6" sm="4" md="3" class="flex" v-for="(item, key) in 10" :key="key">
                  <v-skeleton-loader class="ma-1" width="100%" height="200px" type="image"/>
                </v-col>
              </template>
            </v-row>
          </v-card-text>
        </v-card>
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
import Handler from "@/handlers/Handler";
import {MultipleItem} from "@/handlers/interfaces/ContentUI";
import Post from "@/model/Post";
import PostService from "@/service/PostService";
import PostCardComponent from "@/components/PostCardComponent.vue";
import Artist from "@/model/Artist";
import ArtistService from "@/service/ArtistService";
import ArtistCardComponent from "@/components/ArtistCardComponent.vue";
import ArtistButtonComponent from "@/components/ArtistButtonComponent.vue";

@Component({
    components: {ArtistButtonComponent, ArtistCardComponent, PostCardComponent}
})
export default class HomeView extends Vue {

    @Ref() readonly form!: HTMLFormElement

    get lang() { return getModule(LangModule).lang }

    get rules() { return Rules }

    loading: boolean = false
    posts: MultipleItem<Post> = {items: [], totalItems: 0}
    artists: MultipleItem<Artist> = {items: [], totalItems: 0}

    created() {
        this.refresh()
    }

    async refresh() {
        await Handler.getItems(this, this.posts, () => PostService.getPublicPosts(0, 20))
        await Handler.getItems(this, this.artists, () => ArtistService.getPublicArtists(0, 10))
    }

}
</script>

<style>
.v-skeleton-loader__image.v-skeleton-loader__bone { height: 100%; }
</style>