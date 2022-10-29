<template>
	<v-app-bar color="lonjas-base-2" dark clipped-left clipped-right app flat style="border-bottom: 1px solid rgba(64,64,64,0.52) !important;">
    <v-app-bar-nav-icon @click.stop="toggleDrawer"/>

    <div class="pointer" @click="$router.push('/').catch(err => {})">
      <span class="uni-sans-heavy text-lg grey--text text--lighten-1 mx-3">LONJAS</span>
    </div>

		<v-spacer/>

    <div class="mx-2">
      <v-text-field :label="lang.search" dense append-icon="fas fa-search" outlined hide-details="auto" dark rounded/>
    </div>

    <v-menu v-model="menu" bottom offset-y :close-on-content-click="false" close-delay="1000" tile transition="slide-y-transition">
      <template v-slot:activator="{ on ,attrs }">
        <v-btn dark icon class="mx-2" v-bind="attrs" v-on="on">
          <v-icon>far fa-square-plus</v-icon>
        </v-btn>
      </template>

      <v-card flat tile dark width="250px">
        <v-card-title class="lonjas-base-2">
          <v-row align="center" no-gutters>
            <h3 class="grey--text text--lighten-4 work-sans font-weight-medium">Peticiones</h3>
            <v-spacer/>
            <v-btn icon @click="menu = false">
              <v-icon>mdi-close</v-icon>
            </v-btn>
          </v-row>
        </v-card-title>

        <v-divider/>

        <v-card-text>
          <v-list class="py-0">
            <v-list-item @click>
              <v-list-item-icon class="mr-5">
                <v-icon>mdi-plus</v-icon>
              </v-list-item-icon>
              <v-list-item-content>
                <v-list-item-title>Sugerir artista</v-list-item-title>
              </v-list-item-content>
            </v-list-item>
            <v-divider/>
            <v-list-item @click>
              <v-list-item-icon class="mr-5"><v-icon>mdi-note-plus-outline</v-icon></v-list-item-icon>
              <v-list-item-content>
                <v-list-item-title class="work-sans">Sugerir post</v-list-item-title>
              </v-list-item-content>
            </v-list-item>
            <v-divider/>
            <v-list-item @click>
              <v-list-item-icon class="mr-5"><v-icon>mdi-tag-plus-outline</v-icon></v-list-item-icon>
              <v-list-item-content>
                <v-list-item-title class="work-sans">Sugerir tag</v-list-item-title>
              </v-list-item-content>
            </v-list-item>
          </v-list>
        </v-card-text>
      </v-card>
    </v-menu>

	</v-app-bar>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator"
import {getModule} from "vuex-module-decorators"
import LangModule from "@/store/LangModule"
import DrawerModule from "@/store/DrawerModule";

@Component
export default class HeaderComponent extends Vue {

	lang = getModule(LangModule).lang
  menu: boolean = false
  drawerModule:DrawerModule = getModule(DrawerModule)

  toggleDrawer(){ this.drawerModule.toggle() }

}
</script>

<style>
.color {
 background: #212146;
}
</style>
