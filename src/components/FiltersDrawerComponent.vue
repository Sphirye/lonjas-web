<template>
  <v-navigation-drawer v-model="drawer" width="350px" right clipped app :mobile-breakpoint="0" color="lonjas-base-2" dark>
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
              <v-autocomplete outlined v-model="selectedTags" :items="tags" clearable item-text="name" :loading="loading" class="rounded-0" dense hide-details="auto" multiple small-chips :label="lang.search"/>
            </v-col>
          </v-row>
        </v-expansion-panel-content>
      </v-expansion-panel>
    </v-expansion-panels>
    <v-divider/>

  </v-navigation-drawer>
</template>

<script lang="ts">
import {Component, Model, ModelSync, Prop, PropSync, Provide, Ref, VModel, Vue} from 'vue-property-decorator'
import {getModule} from "vuex-module-decorators"
import TagService from "@/service/TagService"
import LangModule from "@/store/LangModule"
import Rules from "@/service/tool/Rules"
import Tag from "@/model/Tag";

@Component
export default class FiltersDrawerComponent extends Vue {

  //TODO: Two way data binding selectedTags

  @Model("changed", { type: Boolean }) drawer!: boolean

  loading: boolean = false
  tags: Tag[] = []
  selectedTags: Tag[] = []
  tagSearch: string = ""

  get lang() { return getModule(LangModule).lang }
  get rules() { return Rules }

  created() {
    this.refresh()
  }

  async refresh() {
    await TagService.getTags(this, this.tags, 0, 5, this.tagSearch)
  }

  toggleDrawer() {
    this.drawer = !this.drawer
  }

}
</script>

<style>
.v-expansion-panel-content>>> .v-expansion-panel-content__wrap {
  padding: 0 !important;
}
</style>
