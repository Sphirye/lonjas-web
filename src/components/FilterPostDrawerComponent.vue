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
          <h3 class="grey--text text--lighten-4 work-sans font-weight-medium mx-2">Tags</h3>
        </v-expansion-panel-header>
        <v-expansion-panel-content>
          <TagAutocompleteComponent v-model="tags"/>
        </v-expansion-panel-content>
      </v-expansion-panel>
    </v-expansion-panels>
    <v-divider/>

    <v-expansion-panels flat>
      <v-expansion-panel class="transparent">
        <v-expansion-panel-header>
          <h3 class="grey--text text--lighten-4 work-sans font-weight-medium mx-2">{{ lang.category }}</h3>
        </v-expansion-panel-header>

        <v-expansion-panel-content>
          <CategoryAutocompleteComponent v-model="categories"/>
        </v-expansion-panel-content>
      </v-expansion-panel>
    </v-expansion-panels>

    <v-divider/>

    <v-expansion-panels flat>
      <v-expansion-panel class="transparent">
        <v-expansion-panel-header>
          <h3 class="grey--text text--lighten-4 work-sans font-weight-medium mx-2">{{ lang.characters }}</h3>
        </v-expansion-panel-header>

        <v-expansion-panel-content>
          <CharacterAutocompleteComponent v-model="characters"/>
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

import CharacterAutocompleteComponent from "@/components/autocomplete/CharacterAutocompleteComponent.vue"
import CategoryAutocompleteComponent from "@/components/autocomplete/CategoryAutocompleteComponent.vue"
import TagAutocompleteComponent from "@/components/autocomplete/TagAutocompleteComponent.vue"
import {Component, Model, PropSync, Vue} from 'vue-property-decorator'
import {getModule} from "vuex-module-decorators"
import LangModule from "@/store/LangModule"
import Character from "@/model/Character"
import Category from "@/model/Category"
import Tag from "@/model/Tag"

@Component({
    components: { CharacterAutocompleteComponent, CategoryAutocompleteComponent, TagAutocompleteComponent }
})
export default class FiltersDrawerComponent extends Vue {

    @Model("changed", { type: Boolean }) drawer!: boolean

    @PropSync("selectedCategories") categories!: Tag[]
    @PropSync("selectedCharacters") characters!: Character[]
    @PropSync("selectedTags") tags!: Tag[]

    loading: boolean = false

    get lang() { return getModule(LangModule).lang }

    clearFilters() {
        // this.tags = []
        // this.categories = []
        // this.characters = []
        this.$emit('clear')
    }

}
</script>

<style>
.v-expansion-panel-content >>> .v-expansion-panel-content__wrap {
    padding: 0 !important;
}
</style>
