<template>
  <v-autocomplete
      outlined clearable class="rounded-0" dense
      v-model="selectedCharacters" :items="characters.items"
      item-text="name" item-value="id" :loading="loading" hide-details="auto"
      multiple small-chips :label="lang.search" v-debounce:200="refresh" dark
      cache-items return-object :search-input.sync="search"
  />
</template>

<script lang="ts">
import {Component, VModel, Mixins} from 'vue-property-decorator'
import {MultipleItem} from "@/handlers/interfaces/ContentUI"
import PaginationMixin from "@/mixins/PaginationMixin"
import {getModule} from "vuex-module-decorators"
import LangModule from "@/store/LangModule"
import Character from "@/model/Character"
import Handler from "@/handlers/Handler";
import CharacterService from "@/service/CharacterService";

@Component
export default class CharacterAutocompleteComponent extends Mixins(PaginationMixin) {

    loading: boolean = false
    get lang() { return getModule(LangModule).lang }
    size = 10

    @VModel({type: Array}) selectedCharacters!: Character[]

    characters: MultipleItem<Character> = { items: [], totalItems: 0 }

    created() { this.refresh() }

    async refresh() {
        await Handler.getItems(this, this.characters, () =>
            CharacterService.getPublicCharacters(this.page - 1, this.size, this.search)
        )
    }

}
</script>