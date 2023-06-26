<template>
  <v-container fluid>
    <v-row dense align="center">
      <h2 class="uni-sans-heavy white--text mx-4">{{ lang.posts }}</h2>
      <v-spacer/>

      <v-btn icon dark @click="dialog = true">
        <v-icon>mdi-cog</v-icon>
      </v-btn>

      <v-divider vertical class="mx-3" dark/>

      <v-sheet color="transparent">
        <v-text-field clearable hide-details dense outlined dark append-icon="mdi-magnify" :label="lang.search" @keydown.enter="refresh" @click:clear="refresh"/>
      </v-sheet>
      <v-btn icon dark class="mx-4" large @click="toggleDrawer">
        <v-icon>mdi-filter-menu-outline</v-icon>
      </v-btn>
    </v-row>

    <v-progress-linear class="my-4" color="grey" :indeterminate="loading"/>

    <PostsGridPageableComponent :posts.sync="posts" :page.sync="page" :page-count.sync="pageCount" post-width="100%" post-height="200px"/>

    <v-progress-linear class="my-4" color="grey" :indeterminate="loading"/>

    <FilterPostDrawerComponent
        v-model="drawer" @close="toggleDrawer" @clear="clearFilters"
        :selectedTags.sync="tags" :selectedCategories.sync="categories" :selectedCharacters.sync="characters"
        @search="page = 1; refresh()"
    />

    <v-dialog v-model="dialog" width="700px" persistent>
      <PostFiltersDialog @update="refresh" @close="dialog = false"/>
    </v-dialog>

  </v-container>
</template>

<script lang="ts">

import PostsGridPageableComponent from "@/components/PostsGridPageableComponent.vue"
import FilterPostDrawerComponent from "@/components/FilterPostDrawerComponent.vue"
import PostFiltersDialog from "@/components/dialogs/PostFiltersDialog.vue"
import PostCardComponent from "@/components/PostCardComponent.vue"
import {Component, Mixins, Watch} from "vue-property-decorator"
import {MultipleItem} from "@/handlers/interfaces/ContentUI"
import PaginationMixin from "@/mixins/PaginationMixin"
import PostFilterMixin from "@/mixins/PostFilterMixin"
import CustomTools from "@/service/tool/CustomTools"
import {getModule} from "vuex-module-decorators"
import PostService from "@/service/PostService"
import LangModule from "@/store/LangModule"
import Character from "@/model/Character"
import Handler from "@/handlers/Handler"
import Category from "@/model/Category"
import Post from "@/model/Post"
import Tag from "@/model/Tag"

@Component({
    computed: {
        CustomTools() {
            return CustomTools
        }
    },
    components: {PostsGridPageableComponent, PostFiltersDialog, FilterPostDrawerComponent, PostCardComponent}})
export default class PostsView extends Mixins(PaginationMixin, PostFilterMixin) {

    drawer: boolean = false
    dialog: boolean = false

    get lang() { return getModule(LangModule).lang }

    loading: boolean = false
    weirdMaterial: boolean = false
    size: number = 30
    posts: MultipleItem<Post> = { items: [], totalItems: 0 }

    tags: Tag[] = []
    categories: Category[] = []
    characters: Character[] = []

    created() {
        this.refresh()
    }

    async refresh() {
        await Handler.getItems(this, this.posts, () => PostService. getPublicPosts(
            this.page - 1, this.size,
            null, this.toIds(this.categories), this.toIds(this.characters), this.toIds(this.tags), this.postFilter
        ))
        this.setPageCount(this.posts.totalItems!!)
    }

    toggleDrawer() { this.drawer = !this.drawer }

    clearFilters() {
        this.categories = []
        this.tags.splice(0, this.tags.length)
        this.characters.splice(0, this.characters.length)
        this.refresh()
    }

    toIds(array: (Category | Character | Tag)[]) { return array.map(v => v.id!!) }

    @Watch("categories")
    onCategoriesChanged() {
        // this.$router.push({
        //     query: { categories: CustomTools.getIdsArray(this.categories).toString() }
        // }).catch(() => {})
    }

    @Watch("page")
    async onPageChanged() {
        await this.refresh()
        await this.$vuetify.goTo(0)
    }
}
</script>