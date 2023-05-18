<template>
  <div>
    <v-autocomplete
        outlined clearable class="rounded-0" dense
        v-model="selectedCategories" :items="categories.items"
        item-text="name" item-value="id" :loading="loading" hide-details="auto"
        multiple small-chips :label="lang.search" v-debounce:200="refresh" dark
        cache-items return-object :search-input.sync="search"
    />
  </div>
</template>

<script lang="ts">
import {Component, Mixins, VModel} from 'vue-property-decorator'
import {MultipleItem} from "@/handlers/interfaces/ContentUI"
import CategoryService from "@/service/CategoryService"
import PaginationMixin from "@/mixins/PaginationMixin"
import {getModule} from "vuex-module-decorators"
import LangModule from "@/store/LangModule"
import Handler from "@/handlers/Handler"
import Category from "@/model/Category"

@Component
export default class CategoryAutocompleteComponent extends Mixins(PaginationMixin) {

    @VModel({type: Array}) selectedCategories!: Category[]

    loading: boolean = false
    get lang() { return getModule(LangModule).lang }

    categories: MultipleItem<Category> = { items: [], totalItems: 0 }
    size: number = 10

    created() { this.refresh() }

    async refresh() {
        await Handler.getItems(this, this.categories, () =>
            CategoryService.getPublicCategories(this.page - 1, this.size, this.search)
        )
    }

}
</script>