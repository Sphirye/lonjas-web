<template>
  <v-app>
    <HeaderComponent/>
    <DrawerComponent/>
    <v-main class="dark-2">
      <transition name="fade" mode="out-in">
        <router-view class="my-2"/>
      </transition>
    </v-main>
    <SnackbarComponent/>
    <DialogComponent/>
    <FooterComponent/>
  </v-app>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator"
import SnackbarComponent from "@/components/ui/SnackbarComponent.vue"
import HeaderComponent from "@/components/ui/HeaderComponent.vue"
import FooterComponent from "@/components/ui/FooterComponent.vue"
import DialogComponent from "@/components/ui/DialogComponent.vue"
import DrawerComponent from "@/components/ui/DrawerComponent.vue";

@Component({ components: { DialogComponent, SnackbarComponent, HeaderComponent, FooterComponent, DrawerComponent } })
export default class App extends Vue {


}
</script>

<style>
* {
  font-family: 'Work Sans', sans-serif;
  font-weight: normal;
}

.fade-enter-active, .fade-leave-active {
  transition: opacity .2s;
}

.fade-enter, .fade-leave-to {
  opacity: 0;
}

</style>