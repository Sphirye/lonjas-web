<template>
  <v-navigation-drawer v-model="drawer" clipped app color="dark-3" width="210" :mobile-breakpoint="0">
    <v-list class="my-0 py-0">
      <v-list dark class="my-0 py-0" dense>
        <v-list-item-group class="pa-2" mandatory>
          <template v-for="(item) in drawerList">
            <template v-if="item.divider">
              <v-divider class="grey darken-2 mx-1 my-2"/>
            </template>
            <template v-if="item.subheader != null">
              <v-subheader class="text-uppercase" style="height: 30px">{{item.subheader}}</v-subheader>
            </template>
            <v-list-item v-else dense class="pl-3 mb-1" style="padding: 0px 10px !important;" @click="$router.push(item.to).catch(() => {})">
              <v-list-item-content>
                <v-list-item-title class="text-20 mx-0 grey--text text--lighten-1">{{ item.title }}</v-list-item-title>
              </v-list-item-content>
            </v-list-item>
          </template>
        </v-list-item-group>
      </v-list>
    </v-list>
  </v-navigation-drawer>
</template>

<script lang="ts">
import {Component, Vue} from "vue-property-decorator"
import DrawerModule from "@/store/DrawerModule"
import LangModule from "@/store/LangModule"
import {getModule} from "vuex-module-decorators"
import drawerList from "@/service/tool/DrawerList"

@Component
export default class DrawerComponent extends Vue {

  drawerModule:DrawerModule = getModule(DrawerModule)
  lang = getModule(LangModule).lang

  get drawer() { return this.drawerModule.drawer }
  set drawer(value: boolean) { this.drawerModule.setDrawer(value) }
  get drawerList() { return drawerList }

}
</script>

<style scoped>

</style>