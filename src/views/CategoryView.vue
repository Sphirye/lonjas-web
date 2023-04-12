<template>
  <v-container fluid>
    <v-row dense align="center">
      <h2 class="uni-sans-heavy white--text mx-4">{{ category.item.name }}</h2>
    </v-row>

    <v-progress-linear class="my-4" color="grey" :indeterminate="loading"/>

    <v-row dense>
      <v-col cols="3">
        <v-card outlined dark>
          <v-list>
            <v-subheader dark>{{ lang.characters }}:</v-subheader>
            <template v-for="(character) in characters.items">
              <v-list-item dense>
                {{character.name}}
              </v-list-item>
            </template>
          </v-list>
        </v-card>
      </v-col>

      <v-col cols="9">
        <v-row dense>
          <template v-for="(post) in posts.items">
            <v-col cols="auto">
              <PostCardComponent width="150px" height="150px" :post="post"/>
            </v-col>
          </template>
        </v-row>
      </v-col>
    </v-row>

  </v-container>
</template>


<script lang="ts">
import ArtistCardComponent from "@/components/ArtistCardComponent.vue"
import PostImageComponent from "@/components/PostImageComponent.vue"
import PostCardComponent from "@/components/PostCardComponent.vue"
import {MultipleItem, SingleItem} from "@/handlers/interfaces/ContentUI"
import {Component, Ref, Vue} from 'vue-property-decorator'
import PostService from "@/service/PostService"
import Handler from "@/handlers/Handler"
import Artist, {Source} from "@/model/Artist"
import Post, {Type} from "@/model/Post";
import Category from "@/model/Category";
import CategoryService from "@/service/CategoryService";
import {getModule} from "vuex-module-decorators";
import LangModule from "@/store/LangModule";
import Character from "@/model/Character";
import CharacterService from "@/service/CharacterService";

@Component({
  components: {PostCardComponent}
})
export default class CategoryView extends Vue {

  get lang() { return getModule(LangModule).lang }

  category: SingleItem<Category> = { item: new Category() }
  characters: MultipleItem<Character> = { items: [], totalItems: 0 }
  posts: MultipleItem<Post> = { items: [], totalItems: 0 }

  loading: boolean = false

  created() {
    this.refresh()
  }

  async refresh() {
    try {
      await Handler.getItem(this, this.category, () => CategoryService.getPublicCategory(Number(this.$route.params.id)))
      if (this.category.item.id) {
        await Handler.getItems(this, this.characters, () =>
          CharacterService.getPublicCategoryCharacters(0, 10, null, this.category.item.id!!)
        )
        await Handler.getItems(this, this.posts, () =>
            PostService.getPublicPosts(0, 30, null, [this.category.item.id!!], null, null)
        )
      }
    } catch (e) { console.log(e) }
  }

}
</script>