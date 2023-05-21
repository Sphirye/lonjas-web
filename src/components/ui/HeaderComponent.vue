<template>
  <v-app-bar color="dark-4" dark app clipped-left clipped-right flat>
    <v-app-bar-nav-icon @click.stop="toggleDrawer"/>

    <div class="pointer" @click="$router.push('/').catch(err => {})">
      <span class="uni-sans-heavy text-35 grey--text text--lighten-1 mx-3">LONJAS</span>
    </div>

    <v-sheet width="250px" color="transparent" class="mx-4">
      <v-select class="mx-auto" full-width :items="languages" item-text="name" outlined dense hide-details v-model="selectedLang" :menu-props="{ bottom: true, offsetY: true }" return-object>
        <template v-slot:item="{ active, item, attrs, on }">
          <v-list-item v-on="on" v-bind="attrs" #default="{ active }" dense>
            <v-list-item-avatar>
              <country-flag class="my-auto" :country="item.flag" size="normal"/>
            </v-list-item-avatar>
            <v-list-item-title>
              <span class="mx-3 text-h6 font-weight-regular">{{ item.name }}</span>
            </v-list-item-title>
          </v-list-item>
        </template>
      </v-select>
    </v-sheet>

    <v-spacer/>

  </v-app-bar>
</template>

<script lang="ts">
import {Component, Vue} from "vue-property-decorator"
import {getModule} from "vuex-module-decorators"
import LangModule from "@/store/LangModule"
import DrawerModule from "@/store/DrawerModule";
import Language from "@/model/vue/Language";

@Component
export default class HeaderComponent extends Vue {

    get selectedLang() {
        return getModule(LangModule).language
    }

    set selectedLang(language: Language) {
        getModule(LangModule).setLanguage(language)
    }

    lang = getModule(LangModule).lang
    languages = getModule(LangModule).languages
    drawerModule: DrawerModule = getModule(DrawerModule)

    toggleDrawer() {
        this.drawerModule.toggle()
    }

}
</script>
