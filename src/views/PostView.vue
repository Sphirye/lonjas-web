<template>
  <v-container fluid>
    <v-progress-linear class="mb-4" color="grey" :indeterminate="loading"/>
    <template v-if="post.item.id !== undefined">
      <v-row dense>

        <v-col cols="4">
          <ArtistCardComponent :artist="post.item.artist"/>

          <v-divider class="my-2" dark/>

          <template v-if="post.item.type === Type.TWEET">
            <v-card color="dark-3" flat dark>

              <v-card-text>
                <v-row no-gutters justify="space-around" class="blue--text">
                  <v-col cols="auto">
                    <v-subheader>Categorias:</v-subheader>
                    <div class="d-flex flex-column">
                      <template v-for="(category) in post.item.categories">
                        <a class="my-0 text-start" @click="$router.push('/categories/' + category.id)">
                          {{ category.name }}
                        </a>
                      </template>
                    </div>
                  </v-col>

                  <v-divider vertical/>

                  <v-col cols="auto">
                    <v-subheader>Personajes:</v-subheader>
                    <div class="d-flex flex-column">
                      <template v-for="(character) in post.item.characters">
                        <a class="my-0 text-start">
                          {{ character.name }}
                        </a>
                      </template>
                    </div>
                  </v-col>

                  <v-divider vertical/>

                  <v-col cols="auto">
                    <v-subheader>Tags:</v-subheader>
                    <div class="d-flex flex-column">
                      <template v-for="(tag) in post.item.tags">
                        <a class="my-0 text-start">
                          {{ tag.name }}
                        </a>
                      </template>
                    </div>
                  </v-col>
                </v-row>
              </v-card-text>


              <v-card-actions>
                <v-spacer/>
                <v-btn
                    color="grey lighten-1" depressed light large target="_blank" height="30px" tile
                    :href="`https://twitter.com/${artist.twitter.username}/status/${post.item.tweet.id}`"
                >
                  Fuente
                </v-btn>
              </v-card-actions>

            </v-card>
          </template>


        </v-col>

        <v-col cols="8" class="d-flex flex-column">
          <v-card outlined dark color="dark-4">
            <v-card-text>
              <PostImageComponent :post="post.item"/>
            </v-card-text>
          </v-card>
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

@Component({
      computed: {
        Type() {
          return Type
        }
      },
      components: {PostImageComponent, ArtistCardComponent, PostCardComponent}
    }
)
export default class PostView extends Vue {

  post: SingleItem<Post> = {item: new Post()}
  loading: boolean = false

  created() {
    this.refresh()
  }

  get artist() {
    return this.post.item.artist
  }

  async refresh() {
    try {
      await Handler.getItem(this, this.post, () => PostService.getPublicPost(Number(this.$route.params.id)))
    } catch (e) {
      console.log(e)
    }
  }

  get getArtistAvatar(): string | undefined {
    let url: string | undefined = undefined

    switch (this.artist!!.source) {
      case (Source.TWITTER): {
        url = this.artist!!.twitter!.profileImageUrl!;
        break;
      }
      case Source.DEVIANTART: { /* todo */
        break;
      }
    }

    return url
  }

  toArtistPage(artist: Artist) {
    this.$router.push("/artists/" + artist.id).catch(() => {
    })
  }

}
</script>

<style>

a:hover {
  color: #72a7ff;
  background-color: transparent;
  text-decoration: underline;
}

a:active {
  color: #106c85;
  background-color: transparent;
  text-decoration: underline;
}

</style>
