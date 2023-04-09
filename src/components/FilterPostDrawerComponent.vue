<template>
  <v-navigation-drawer v-model="drawer" width="300px" color="dark-4" right app clipped dark :mobile-breakpoint="0">
    <v-divider/>
    <v-list-item class="px-2">
      <v-list-item-avatar>
        <v-icon large>mdi-filter</v-icon>
      </v-list-item-avatar>

      <v-list-item-title>
        <h2 class="grey--text text--lighten-4 work-sans font-weight-medium">Filtros</h2>
      </v-list-item-title>

      <v-btn icon @click.stop="$emit('close')">
        <v-icon large>mdi-chevron-right</v-icon>
      </v-btn>
    </v-list-item>
    <v-divider/>

    <v-expansion-panels flat>
      <v-expansion-panel class="transparent">
        <v-expansion-panel-header>
          <v-row align="center" no-gutters dense>
            <v-icon small>mdi-filter</v-icon>
            <h3 class="grey--text text--lighten-4 work-sans font-weight-medium mx-2">Tags</h3>
          </v-row>
        </v-expansion-panel-header>

        <v-expansion-panel-content>
          <v-row dense no-gutters align="center">
            <v-col cols="12">
              <v-autocomplete
                  outlined clearable class="rounded-0" dense
                  v-model="syncedTags" :items="tags.items"
                  item-text="name" item-value="id" :loading="loading" hide-details="auto"
                  multiple small-chips :label="lang.search"
              />
            </v-col>
          </v-row>
        </v-expansion-panel-content>
      </v-expansion-panel>
    </v-expansion-panels>
    <v-divider/>

    <v-expansion-panels flat>
      <v-expansion-panel class="transparent">
        <v-expansion-panel-header>
          <v-row align="center" no-gutters dense>
            <v-icon small>mdi-filter</v-icon>
            <h3 class="grey--text text--lighten-4 work-sans font-weight-medium mx-2">{{ lang.category }}</h3>
          </v-row>
        </v-expansion-panel-header>

        <v-expansion-panel-content>
          <v-row dense no-gutters align="center">
            <v-col cols="12">
              <v-autocomplete
                  outlined clearable class="rounded-0" dense
                  v-model="syncedCategories" :items="categories.items"
                  item-text="name" item-value="id" :loading="loading" hide-details="auto"
                  small-chips :label="lang.search" multiple
              />
            </v-col>
          </v-row>
        </v-expansion-panel-content>
      </v-expansion-panel>
    </v-expansion-panels>

    <v-divider/>

    <v-expansion-panels flat>
      <v-expansion-panel class="transparent">
        <v-expansion-panel-header>
          <v-row align="center" no-gutters dense>
            <v-icon small>mdi-filter</v-icon>
            <h3 class="grey--text text--lighten-4 work-sans font-weight-medium mx-2">{{ lang.characters }}</h3>
          </v-row>
        </v-expansion-panel-header>

        <v-expansion-panel-content>
          <v-row dense no-gutters align="center">
            <v-col cols="12">
              <v-autocomplete
                  outlined clearable class="rounded-0" dense
                  v-model="syncedCharacters" :items="characters.items" multiple
                  item-text="name" :loading="loading" hide-details="auto"
                  small-chips :label="lang.search" item-value="id"
              />
            </v-col>
          </v-row>
        </v-expansion-panel-content>
      </v-expansion-panel>
    </v-expansion-panels>

    <v-divider/>


    <v-row no-gutters justify="space-between" align="center" class="ma-3">
      <v-btn color="grey darken-3" tile depressed @click="clearFilters">{{ lang.clearFilters }}</v-btn>

      <v-btn color="grey darken-3" tile depressed @click="$emit('search')">{{ lang.search }}</v-btn>
    </v-row>


  </v-navigation-drawer>
</template>

<script lang="ts">
import { Component, Model, PropSync, Vue } from 'vue-property-decorator'
import {getModule} from "vuex-module-decorators"
import TagService from "@/service/TagService"
import LangModule from "@/store/LangModule"
import Rules from "@/service/tool/Rules"
import Tag from "@/model/Tag"
import Category from "@/model/Category"
import Character from "@/model/Character"
import Handler from "@/handlers/Handler"
import CategoryService from "@/service/CategoryService"
import {MultipleItem} from "@/handlers/interfaces/ContentUI"
import CharacterService from "@/service/CharacterService"

@Component
export default class FiltersDrawerComponent extends Vue {

  @Model("changed", { type: Boolean }) drawer!: boolean

  @PropSync("selectedCategories") syncedCategories!: number[]
  @PropSync("selectedCharacters") syncedCharacters!: number[]
  @PropSync("selectedTags") syncedTags!: number[]

  loading: boolean = false

  categories: MultipleItem<Category> = { items: [], totalItems: 0 }
  characters: MultipleItem<Character> = { items: [], totalItems: 0 }
  tags: MultipleItem<Tag> = { items: [], totalItems: 0 }

  tagSearch: string = ""
  categorySearch: string = ""
  characterSearch: string = ""

  get lang() { return getModule(LangModule).lang }
  get rules() { return Rules }

  created() { this.refresh() }

  async refresh() {

    try {
      await Handler.getItems(this, this.categories, () =>
          CategoryService.getPublicCategories(0, 5, this.categorySearch)
      )

      await Handler.getItems(this, this.characters, () =>
        CharacterService.getPublicCharacters(0, 5, this.characterSearch)
      )

      await Handler.getItems(this, this.tags, () =>
          TagService.getPublicTags(0, 5, this.tagSearch)
      )
    } catch (e) { console.log(e) }
  }

  clearFilters() {
    this.categories = { totalItems: 0, items: [] }
    this.tags = { totalItems: 0, items: [] }
    this.characters = { totalItems: 0, items: [] }
    this.$emit('clear')
  }

}
</script>

<style>
.v-expansion-panel-content>>> .v-expansion-panel-content__wrap {
  padding: 0 !important;
}
</style>
