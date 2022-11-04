<template>
  <v-navigation-drawer v-model="drawer" width="300px" right clipped app :mobile-breakpoint="0" color="lonjas-base-2" dark>
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
                  outlined clearable class="rounded-0"dense
                  v-model="selectedTags" :items="tags"
                  @change="(v) => $emit('update:selectedTags', v)"
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
                  outlined clearable class="rounded-0"dense
                  v-model="category" :items="categories"
                  @change="(v) => $emit('update:selectedCategory', v)"
                  item-text="name" item-value="id" :loading="loading" hide-details="auto"
                  small-chips :label="lang.search"
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
                  outlined clearable class="rounded-0"dense
                  v-model="selectedCharacters" :items="characters" multiple
                  @change="(v) => $emit('update:selectedCharacters', v)"
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
import {Component, Model, ModelSync, Prop, PropSync, Provide, Ref, VModel, Vue, Watch} from 'vue-property-decorator'
import {getModule} from "vuex-module-decorators"
import TagService from "@/service/TagService"
import LangModule from "@/store/LangModule"
import Rules from "@/service/tool/Rules"
import Tag from "@/model/Tag"
import Category from "@/model/Category";
import CategoryService from "@/service/CategoryService";
import Character from "@/model/Character";
import CharacterService from "@/service/CharacterService";

@Component
export default class FiltersDrawerComponent extends Vue {

  @Model("changed", { type: Boolean }) drawer!: boolean
  selectedTags: Tag[] = []
  selectedCharacters: Character[] = []

  loading: boolean = false
  tags: Tag[] = []
  categories: Category[] = []
  category: number | null = null
  characters: Character[] = []


  tagSearch: string = ""
  categorySearch: string = ""
  characterSearch: string = ""

  get lang() { return getModule(LangModule).lang }
  get rules() { return Rules }

  created() {
    this.refresh()
  }

  async refresh() {
    await TagService.getTags(this, this.tags, 0, 5, this.tagSearch)
    await CategoryService.getCategories(this, this.categories, 0, 5, this.categorySearch)
    await CharacterService.getCharacters(this, this.characters, 0, 5, this.characterSearch, null)
  }

  clearFilters() {
    this.category = null
    this.tags.splice(0, this.tags.length)
    this.characters.splice(0, this.characters.length)
    this.$emit('clear')
  }

}
</script>

<style>
.v-expansion-panel-content>>> .v-expansion-panel-content__wrap {
  padding: 0 !important;
}
</style>
