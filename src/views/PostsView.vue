<template>
  <v-container fluid class="px-8">
    <v-row dense align="center">
      <span class="uni-sans-heavy text-md white--text mx-4">{{ lang.recentPosts }}</span>
      <v-spacer/>
      <v-btn icon dark class="mx-4" large @click="toggleDrawer">
        <v-icon>mdi-filter-menu-outline</v-icon>
      </v-btn>
    </v-row>
    <v-divider class="my-4" dark/>
    <v-row justify="center" align="start">
      <v-col cols="3" v-for="(post, key) in posts" :key="key">
        <PostCardComponent :post="post"/>
      </v-col>
    </v-row>

    <v-navigation-drawer v-if="false" v-model="drawer" width="300px" right clipped app :mobile-breakpoint="0" color="lonjas-base-2" dark>
      <v-list-item class="px-2">
        <v-list-item-avatar>
          <v-icon large>mdi-filter</v-icon>
        </v-list-item-avatar>

        <v-list-item-title>
          <h2 class="grey--text text--lighten-4 work-sans font-weight-medium">Filtros</h2>
        </v-list-item-title>

        <v-btn icon @click.stop="toggleDrawer">
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
                <v-autocomplete outlined class="rounded-0" dense hide-details="auto" append-icon="mdi-magnify" :label="lang.search"/>
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
              <h3 class="grey--text text--lighten-4 work-sans font-weight-medium mx-2">Tags</h3>
            </v-row>
          </v-expansion-panel-header>

          <v-expansion-panel-content>
            <v-row dense no-gutters align="center">
              <v-col cols="12">
                <v-autocomplete outlined class="rounded-0" dense hide-details="auto" append-icon="mdi-magnify" :label="lang.search"/>
              </v-col>
            </v-row>
          </v-expansion-panel-content>
        </v-expansion-panel>
      </v-expansion-panels>

    </v-navigation-drawer>

    <FiltersDrawerComponent :drawer="drawer" :selectedTags="tags" @close="toggleDrawer"/>

  </v-container>
</template>

<script lang="ts">
import {Component, Ref, Vue} from 'vue-property-decorator'
import {getModule} from "vuex-module-decorators"
import DialogModule from "@/store/DialogModule"
import LangModule from "@/store/LangModule"
import Rules from "@/service/tool/Rules"
import Dialog from "@/model/vue/Dialog"
import PostService from "@/service/PostService";
import Post from "@/model/Post";
import PostCardComponent from "@/components/PostCardComponent.vue";
import FiltersDrawerComponent from "@/components/FiltersDrawerComponent.vue";
import Tag from "@/model/Tag";

@Component( { components: { PostCardComponent, FiltersDrawerComponent } } )
export default class PostsView extends Vue {

  @Ref() readonly form!: HTMLFormElement

  drawer: boolean = false
  posts: Post[] = []
  page: number = 0
  size: number = 12
  tags: Tag[] = []

  get lang() { return getModule(LangModule).lang }
  get rules() { return Rules }

  created() {
    this.refresh()
  }

  refresh() {
    PostService.getPosts(this, this.posts, this.page, this.size, null)
  }

  toggleDrawer() {
    this.drawer = !this.drawer
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
