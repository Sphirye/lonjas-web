<template>
  <v-container fluid>
    <v-row dense align="center">
      <h2 class="uni-sans-heavy white--text mx-4">{{ category.item.name }}</h2>
    </v-row>

    <v-progress-linear class="my-4" color="grey" :indeterminate="loading"/>

    <v-row dense>
      <v-col cols="3">
        <v-card outlined color="dark-3" dark>
          <v-card-title>
            {{ lang.characters }}
          </v-card-title>
          <v-divider/>
          <v-card-text class="pt-1">
            <v-list dense color="transparent" dark>
              <template v-for="(character) in characters.items">
                <v-list-item>
                  <v-list-item-title class="text-15">
                    {{ character.name }}
                  </v-list-item-title>
                </v-list-item>
              </template>
            </v-list>
          </v-card-text>

          <v-card-actions>
            <v-spacer/>
            <v-pagination light v-model="charactersPage" :length="charactersPageCount" :total-visible="8"/>
          </v-card-actions>

        </v-card>
      </v-col>

      <v-col cols="9">
        <PostsGridPageableComponent :posts.sync="posts" :page.sync="postsPage" :page-count.sync="postsPageCount" post-width="100%" post-height="200px"/>
        <v-progress-linear class="my-4" color="grey" :indeterminate="loading"/>
      </v-col>
    </v-row>

  </v-container>
</template>


<script lang="ts">

import PostsGridPageableComponent from "@/components/PostsGridPageableComponent.vue"
import {MultipleItem, SingleItem} from "@/handlers/interfaces/ContentUI"
import PostCardComponent from "@/components/PostCardComponent.vue"
import {Component, Mixins, Watch} from 'vue-property-decorator'
import CharacterService from "@/service/CharacterService"
import CategoryService from "@/service/CategoryService"
import PaginationMixin from "@/mixins/PaginationMixin"
import {getModule} from "vuex-module-decorators"
import PostService from "@/service/PostService"
import LangModule from "@/store/LangModule"
import Character from "@/model/Character"
import Handler from "@/handlers/Handler"
import Post, {Type} from "@/model/Post"
import Category from "@/model/Category"

@Component({components: {PostsGridPageableComponent, PostCardComponent}})
export default class CategoryView extends Mixins(PaginationMixin) {

    get lang() {
        return getModule(LangModule).lang
    }

    category: SingleItem<Category> = {item: new Category()}
    characters: MultipleItem<Character> = {items: [], totalItems: 0}
    posts: MultipleItem<Post> = {items: [], totalItems: 0}

    charactersPage: number = 1
    charactersSize: number = 10
    charactersPageCount: number = 0

    postsPage: number = 1
    postsSize: number = 30
    postsPageCount: number = 0

    loading: boolean = false

    created() {
        this.refresh()
    }

    async getCharacters() {
        await Handler.getItems(this, this.characters, () =>
            CharacterService.getPublicCategoryCharacters(this.charactersPage - 1, this.charactersSize, null, this.category.item.id!!)
        )

        this.charactersPageCount = Math.ceil(this.characters.totalItems! / this.charactersSize)
    }

    async getCategoryPosts() {
        await Handler.getItems(this, this.posts, () =>
            PostService.getPublicPosts(this.postsPage - 1, this.postsSize, null, [this.category.item.id!!], null, null, null)
        )
        this.setPageCount(this.posts.totalItems!)
    }

    async refresh() {
        await Handler.getItem(this, this.category, () => CategoryService.getPublicCategory(Number(this.$route.params.id)))
        if (this.category.item.id) {
            await this.getCharacters()
            await this.getCategoryPosts()
        }
    }

    @Watch('charactersPage')
    onPageChanged() {
        this.refresh()
    }


}
</script>