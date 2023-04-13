<template>
  <v-container fluid>
    <v-row dense align="center">
      <h2 class="uni-sans-heavy white--text mx-4">{{ lang.characters }}</h2>
      <v-spacer/>
      <v-sheet color="transparent">
        <v-text-field
            clearable hide-details dense outlined dark rounded append-icon="mdi-magnify"
            :label="lang.search" @keydown.enter="refresh" @click:clear="refresh"
            v-model="search"
        />
      </v-sheet>

    </v-row>

    <v-progress-linear class="my-4" color="grey" :indeterminate="loading"/>

    <v-row align="start" dense>
      <template v-for="(character) in characters.items">
        <v-col cols="auto">
          <v-card flat dark>
            <v-card-title class="font-weight-regular">
              {{ character.name }}
            </v-card-title>
            <v-card-subtitle class="blue--text text--accent-1">
              <span class="pointer" @click="$router.push('/categories/' + character.category.id)">
                {{ character.category.name }}
              </span>
            </v-card-subtitle>
          </v-card>
        </v-col>
      </template>
    </v-row>

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
import Category from "@/model/Category";
import CategoryService from "@/service/CategoryService";
import CharacterService from "@/service/CharacterService";
import Character from "@/model/Character";

@Component
export default class CharactersView extends Vue {

  lang = getModule(LangModule).lang
  loading: boolean = false
  search: string = ""
  page: number = 1
  size: number = 20

  characters: MultipleItem<Character> = { totalItems: 0, items: [] }

  created() { this.refresh() }

  async refresh() {

    try {
      await Handler.getItems(this, this.characters, () => CharacterService.getPublicCharacters(
          this.page - 1, this.size, this.search
      ))
    } catch (e) { console.log(e) }
  }

}
</script>