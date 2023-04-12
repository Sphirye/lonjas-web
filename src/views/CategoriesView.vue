<template>
  <v-container fluid>
    <v-row dense align="center">
      <h2 class="uni-sans-heavy white--text mx-4">{{ lang.categories }}</h2>
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
      <template v-for="(category) in categories.items">
        <v-col cols="auto">
          <v-card flat dark @click="$router.push('/categories/' + category.id)">
            <v-card-title class="font-weight-regular">
              {{ category.name }}
            </v-card-title>
          </v-card>
        </v-col>
      </template>
    </v-row>

  </v-container>
</template>

<script lang="ts">
import {MultipleItem} from "@/handlers/interfaces/ContentUI"
import CategoryService from "@/service/CategoryService"
import {Component, Vue} from "vue-property-decorator"
import {getModule} from "vuex-module-decorators"
import LangModule from "@/store/LangModule"
import Handler from "@/handlers/Handler"
import Category from "@/model/Category"

@Component
export default class CategoriesView extends Vue {

  lang = getModule(LangModule).lang
  loading: boolean = false
  search: string = ""
  page: number = 1
  size: number = 20

  categories: MultipleItem<Category> = { totalItems: 0, items: [] }

  created() { this.refresh() }

  async refresh() {

    try {
      await Handler.getItems(this, this.categories, () => CategoryService.getPublicCategories(
          this.page - 1, this.size, this.search)
      )
    } catch (e) { console.log(e) }
  }

}
</script>