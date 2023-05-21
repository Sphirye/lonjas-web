<template>
  <v-container>
    <v-row justify="center" class="white--text">
      <v-col cols="8">
        <h1 class="text-center font-weight-bold uni-sans-heavy my-5">{{ lang.aboutLonjas }}</h1>

        <p>
          {{ lang.about1 }}
        </p>

        <p>
          {{ lang.about2 }}
        </p>

      <v-divider class="ma-10" dark/>

        <h1 class="text-center font-weight-bold uni-sans-heavy my-5">{{ lang.about3 }}</h1>

        <div>
          <p class="text-25 font-weight-bold text-start">{{ lang.about4 }}</p>
          <p>
            {{ lang.about5 }}
          </p>
        </div>

        <br>

        <div>
          <p class="text-25 font-weight-bold text-start">{{ lang.about6 }}</p>
          <p>
            {{lang.about7}}
          </p>
        </div>

        <br>

        <div>
          <p class="text-25 font-weight-bold">{{ lang.about8 }}</p>
          <p>
            {{ lang.about9 }}
          </p>
        </div>

        <br>

        <div>
          <p class="text-25 font-weight-bold">{{ lang.about10 }}</p>
          <p>
            {{ lang.about11 }}
          </p>
        </div>

      </v-col>
    </v-row>
  </v-container>
</template>

<script lang="ts">
import {Component, Ref, Vue} from 'vue-property-decorator'
import Rules from "@/service/tool/Rules"
import {getModule} from "vuex-module-decorators"
import DialogModule from "@/store/DialogModule"
import Dialog from "@/model/vue/Dialog"
import LangModule from "@/store/LangModule";

@Component
export default class AboutView extends Vue {

    get lang() { return getModule(LangModule).lang }

}
</script>