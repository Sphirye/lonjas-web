<template>
  <v-container fluid class="px-8">
    <v-row dense align="center">
      <span class="uni-sans-heavy text-md white--text mx-4">{{ lang.recentPosts }}</span>
      <v-spacer/>
      <v-btn icon dark class="mx-4" large @click="toggleDrawer">
        <v-icon>mdi-filter-menu-outline</v-icon>
      </v-btn>
    </v-row>
    <v-progress-linear class="my-4" color="grey" :indeterminate="loading"/>
    <v-row justify="center" align="start">
      <v-col cols="3" v-for="(post, key) in posts" :key="key">
        <PostCardComponent :post="post"/>
      </v-col>
    </v-row>

    <v-progress-linear class="my-4" color="grey" :indeterminate="loading"/>

    <FiltersDrawerComponent :drawer="drawer" @close="toggleDrawer" @clear="clearFilters" :selectedTags.sync="tags" :selectedCategory.sync="category" :selectedCharacters.sync="characters" @search="refresh"/>

  </v-container>
</template>

<script lang="ts">
import FiltersDrawerComponent from "@/components/FiltersDrawerComponent.vue"
import PostCardComponent from "@/components/PostCardComponent.vue"
import {Component, Ref, Vue} from 'vue-property-decorator'
import PostService from "@/service/PostService"
import {getModule} from "vuex-module-decorators"
import DialogModule from "@/store/DialogModule"
import LangModule from "@/store/LangModule"
import Rules from "@/service/tool/Rules"
import Category from "@/model/Category"
import Dialog from "@/model/vue/Dialog"
import Post from "@/model/Post"
import Tag from "@/model/Tag"
import Character from "@/model/Character";

@Component( { components: { PostCardComponent, FiltersDrawerComponent } } )
export default class PostsView extends Vue {

  @Ref() readonly form!: HTMLFormElement

  loading: boolean = false
  drawer: boolean = false
  posts: Post[] = []
  page: number = 0
  size: number = 12

  tags: number[] = []
  category: number | null = null
  characters: number[] = []

  get lang() { return getModule(LangModule).lang }
  get rules() { return Rules }

  created() {
    this.refresh()
  }

  refresh() {
    PostService.getPosts(this, this.posts, this.page, this.size, this.category, this.characters, this.tags)
  }

  toggleDrawer() {
    this.drawer = !this.drawer
  }

  clearFilters() {
    this.category = null
    this.tags.splice(0, this.tags.length)
    this.characters.splice(0, this.characters.length)
    this.refresh()
  }

  validate() {
    getModule(DialogModule).showDialog(new Dialog(this.lang.warning, "¿Desea continuar?", () => {
      alert("Has continuado.")
    }))
  }

}
</script>

<style>
.v-expansion-panel-content>>> .v-expansion-panel-content__wrap {
  padding: 0 !important;
}
</style>
