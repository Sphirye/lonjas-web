<template>
  <v-container fluid>
    <v-row dense align="center">
      <h2 class="uni-sans-heavy white--text mx-4">{{ lang.posts }}</h2>
      <v-spacer/>
      <v-sheet color="transparent">
        <v-text-field
            clearable hide-details dense outlined dark rounded append-icon="mdi-magnify"
            :label="lang.search" @keydown.enter="refresh" @click:clear="refresh"
        />
      </v-sheet>
      <v-btn icon dark class="mx-4" large @click="toggleDrawer"><v-icon>mdi-filter-menu-outline</v-icon></v-btn>

    </v-row>

    <v-progress-linear class="my-4" color="grey" :indeterminate="loading"/>

    <v-row align="start" dense>
      <template v-for="(post) in posts.items">
        <v-col cols="auto">
         <PostCardComponent :post="post"/>
        </v-col>
      </template>
    </v-row>

    <FilterPostDrawerComponent
        v-model="drawer" @close="toggleDrawer" @clear="clearFilters"
        :selectedTags.sync="tags"
        :selectedCategories.sync="categories"
        :selectedCharacters.sync="characters" @search="refresh"
    />

  </v-container>
</template>

<script lang="ts">
import {Component, Vue} from "vue-property-decorator"
import DrawerModule from "@/store/DrawerModule"
import LangModule from "@/store/LangModule"
import {getModule} from "vuex-module-decorators"
import Tag from "@/model/Tag";
import Handler from "@/handlers/Handler";
import {MultipleItem} from "@/handlers/interfaces/ContentUI";
import Post from "@/model/Post";
import PostService from "@/service/PostService";
import PostCardComponent from "@/components/PostCardComponent.vue";
import FilterPostDrawerComponent from "@/components/FilterPostDrawerComponent.vue";

@Component({ components: {FilterPostDrawerComponent, PostCardComponent } })
export default class PostsView extends Vue {

  drawer: boolean = true

  lang = getModule(LangModule).lang
  loading: boolean = false
  tag: Tag = new Tag()
  search: string = ""
  page: number = 1
  size: number = 20
  posts: MultipleItem<Post> = { items: [], totalItems: 0 }

  tags: number[] = []
  categories: number[] = []
  characters: number[] = []

  created() { this.refresh() }

  async refresh() {

    try {
      await Handler.getItems(this, this.posts, () => PostService.getPublicPosts(
          this.page - 1, this.size, null, this.categories, this.characters, this.tags)
      )
    } catch (e) { console.log(e) }
  }

  toggleDrawer() { this.drawer = !this.drawer }

  clearFilters() {
    this.categories = []
    this.tags.splice(0, this.tags.length)
    this.characters.splice(0, this.characters.length)
    this.refresh()
  }
}
</script>

<style scoped>

</style>