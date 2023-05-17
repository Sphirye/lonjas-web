<template>
  <v-container fluid>
    <v-row dense align="center">
      <h2 class="uni-sans-heavy white--text mx-4">{{ lang.posts }}</h2>
      <v-spacer/>
      <v-sheet color="transparent">
        <v-text-field clearable hide-details dense outlined dark rounded append-icon="mdi-magnify" :label="lang.search" @keydown.enter="refresh" @click:clear="refresh"/>
      </v-sheet>
      <v-btn icon dark class="mx-4" large @click="toggleDrawer">
        <v-icon>mdi-filter-menu-outline</v-icon>
      </v-btn>

    </v-row>

    <v-progress-linear class="my-4" color="grey" :indeterminate="loading"/>

    <v-row align="start" dense justify="center" style="min-height: 500px">
      <template v-for="(post) in posts.items">
        <v-col cols="6" sm="4" md="3" lg="2" xl="1" class="flex">
          <PostCardComponent width="100%" height="200px" :post="post"/>
        </v-col>
      </template>
    </v-row>

    <v-progress-linear class="my-4" color="grey" :indeterminate="loading"/>

    <v-row dense align="center">
      <v-spacer/>
      <v-pagination class="white--text" v-model="page" :length="pageCount" :total-visible="8"/>
    </v-row>

    <FilterPostDrawerComponent v-model="drawer" @close="toggleDrawer" @clear="clearFilters" :selectedTags.sync="tags" :selectedCategories.sync="categories" :selectedCharacters.sync="characters" @search="refresh"/>

  </v-container>
</template>

<script lang="ts">
import {Component, Mixins, Vue, Watch} from "vue-property-decorator"
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
import PaginationMixin from "@/mixins/PaginationMixin";

@Component({components: {FilterPostDrawerComponent, PostCardComponent}})
export default class PostsView extends Mixins(PaginationMixin) {

    drawer: boolean = false

    lang = getModule(LangModule).lang
    loading: boolean = false
    size: number = 40
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
            this.setPageCount(this.posts.totalItems!!)
        } catch (e) { console.log(e) }
    }

    toggleDrawer() {
        this.drawer = !this.drawer
    }

    clearFilters() {
        this.categories = []
        this.tags.splice(0, this.tags.length)
        this.characters.splice(0, this.characters.length)
        this.refresh()
    }

    @Watch("page")
    async onPageChanged() {
        await this.refresh()
        await this.$vuetify.goTo(0)
    }
}
</script>