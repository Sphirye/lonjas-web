<template>
  <div>
    <v-autocomplete
        outlined clearable class="rounded-0" dense
        v-model="selectedTags" :items="tags.items"
        item-text="name" item-value="id" :loading="loading" hide-details="auto"
        multiple small-chips :label="lang.search" v-debounce:200="refresh" dark
        cache-items return-object :search-input.sync="search"
    />
  </div>
</template>

<script lang="ts">
import {MultipleItem} from "@/handlers/interfaces/ContentUI"
import {Component, Mixins, PropSync, VModel, Watch} from 'vue-property-decorator'
import PaginationMixin from "@/mixins/PaginationMixin"
import {getModule} from "vuex-module-decorators"
import TagService from "@/service/TagService"
import LangModule from "@/store/LangModule"
import Handler from "@/handlers/Handler"
import Tag from "@/model/Tag"
import CustomTools from "@/service/tool/CustomTools";

@Component
export default class TagAutocompleteComponent extends Mixins(PaginationMixin) {

    @VModel({ type: Array }) selectedTags!: Tag[]

    loading: boolean = false
    get lang() { return getModule(LangModule).lang }
    tags: MultipleItem<Tag> = { items: [], totalItems: 0 }
    size: number = 10

    created() { this.refresh() }

    async refresh() {
        await Handler.getItems(this, this.tags, () => TagService.getPublicTags(this.page - 1, this.size, this.search))
    }

}
</script>