<template>
  <v-container fluid>
		<v-row dense>
			<v-col cols="6">
        <v-card color="dark-4" dark flat>
          <v-subheader class="my-0 my-0">Posts recientes:</v-subheader>
          <v-card-text>
            <v-row dense justify="center">
              <template v-for="(post) in posts.items">
                <v-col cols="auto">
                  <PostCardComponent width="180px" height="250px" :post="post"/>
                </v-col>
              </template>
            </v-row>
          </v-card-text>
        </v-card>
			</v-col>

      <v-col cols="6">
        <v-card color="dark-4" dark flat>
          <v-subheader class="my-0 my-0">Posts recientes:</v-subheader>
          <v-card-text>
            <div class="d-flex justify-start flex-wrap">
              <template v-for="(artist) in artists.items">
                <ArtistButtonComponent :artist="artist"/>
              </template>
            </div>
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
  components: {ArtistButtonComponent, ArtistCardComponent, PostCardComponent }
})
export default class HomeView extends Vue {

	@Ref() readonly form!: HTMLFormElement

  get lang() { return getModule(LangModule).lang }
	get rules() { return Rules }

  loading: boolean = false
  posts: MultipleItem<Post> = { items: [], totalItems: 0 }
  artists: MultipleItem<Artist> = { items: [], totalItems: 0 }

  created() { this.refresh() }

  async refresh() {
    try {
      await Handler.getItems(this, this.posts, () => PostService.getPublicPosts(0, 20))
      await Handler.getItems(this, this.artists, () => ArtistService.getPublicArtists(0, 10, null))
    } catch (e) { console.log(e) }
  }

}
</script>
