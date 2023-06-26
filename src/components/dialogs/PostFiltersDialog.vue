<template>
  <v-card dark color="dark-3">
    <v-card-title class="dark-2">
      <v-row no-gutters>
        <h2 class="uni-sans-heavy white--text mx-4">Filtros</h2>
      </v-row>
    </v-card-title>

    <v-divider/>

    <v-card-text>
      <v-container>

        <v-row>
          <v-col cols="12">
            <v-subheader class="px-0">Tags a excluir</v-subheader>
            <TagAutocompleteComponent v-model="modelPostFilter.excludedTags" cached/>
          </v-col>

          <v-col cols="12" md="6" class="d-flex align-center justify-space-around">
            <v-tooltip top max-width="300px">
              <template v-slot:activator="{ on, attrs }">
                <div v-bind="attrs" v-on="on">
                  <v-switch v-model="modelPostFilter.weirdMaterial" :label="lang.weirdMaterial" hide-details class="my-0 py-0" dark inset/>
                </div>
              </template>
              <p class="text-center my-0">Permitir que los posts con tags marcados como material raro se incluyan en las respuestas.</p>
            </v-tooltip>

            <v-tooltip top max-width="300px">
              <template v-slot:activator="{ on, attrs }">
                <div v-bind="attrs" v-on="on">
                  <v-switch v-model="modelPostFilter.nsfw" label="NSFW" hide-details class="my-0 py-0" dark inset/>
                </div>
              </template>
              <p class="text-center my-0">Permitir que los posts con tags marcados como NSFW se incluyan en las respuestas.</p>
            </v-tooltip>
          </v-col>

          <v-divider vertical/>

          <v-col cols="12" md="6">
            <span>Genero:</span>
            <v-checkbox :value="Gender.MALE" v-model="modelPostFilter.gender" label="Hombre" hide-details/>
            <v-checkbox :value="Gender.FEMALE" v-model="modelPostFilter.gender" label="Mujer" hide-details/>
            <v-checkbox :value="Gender.OTHER" v-model="modelPostFilter.gender" label="Otro" hide-details/>
          </v-col>
        </v-row>
      </v-container>
    </v-card-text>

    <v-card-actions>
      <v-spacer/>
      <v-btn @click="setFilters">{{ lang.continue }}</v-btn>
    </v-card-actions>

  </v-card>
</template>

<script lang="ts">

import TagAutocompleteComponent from "@/components/autocomplete/TagAutocompleteComponent.vue"
import { Component, Mixins } from 'vue-property-decorator'
import PostFilterMixin from "@/mixins/PostFilterMixin"
import {getModule} from "vuex-module-decorators"
import PostFilter from "@/model/vue/PostFilter"
import DialogModule from "@/store/DialogModule"
import LangModule from "@/store/LangModule"
import {Gender} from "@/model/Character"
import Dialog from "@/model/vue/Dialog"

@Component({
    computed: {
        Gender() { return Gender }
    },
    components: {TagAutocompleteComponent}
})
export default class PostFiltersDialog extends Mixins(PostFilterMixin) {

    get lang() { return getModule(LangModule).lang }
    modelPostFilter = new PostFilter()

    created() {
        //Set cached post filter data as default values
        this.modelPostFilter = Object.assign({}, this.postFilter)
    }

    setFilters() {
        getModule(DialogModule).showDialog(new Dialog(this.lang.warning, "¿Esta seguro de cambiar los filtros?", () => {
            this.updatePostFilter(this.modelPostFilter)
            this.$emit("update")
            this.$emit("close")
        }))
    }
}
</script>