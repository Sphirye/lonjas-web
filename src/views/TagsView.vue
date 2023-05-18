<template>
  <v-container fluid>
    <v-row dense align="center">
      <span class="uni-sans-heavy text-25 grey--text  text--lighten-2 mx-4">{{ lang.tags }}</span>
      <v-spacer/>
      <v-sheet color="transparent">
        <v-text-field
            @keydown.enter="refresh" clearable hide-details dense outlined
            dark append-icon="mdi-magnify" :label="lang.search"
            v-model="search"
        />
      </v-sheet>
    </v-row>

    <v-progress-linear class="my-4" color="grey" :indeterminate="loading"/>

    <v-row align="start" dense>
      <template v-for="(tag, key) in tags.items">
        <v-col cols="auto" :key="key">
          <v-tooltip top>
            <template v-slot:activator="{ on, attrs }">
              <v-card flat dark @click="$router.push('/tags/' + tag.id)" v-bind="attrs" v-on="on">
                <v-card-title class="font-weight-regular">{{ tag.name }}</v-card-title>
              </v-card>
            </template>
            <span>{{ tag.description ? tag.description : "Descripción indefinida." }}</span>
          </v-tooltip>
        </v-col>
      </template>
    </v-row>

    <v-row dense align="center">
      <v-spacer/>
      <v-pagination class="white--text" v-model="page" :length="pageCount" :total-visible="8"/>
    </v-row>

  </v-container>
</template>

<script lang="ts">
import {Component, Mixins, Vue, Watch} from "vue-property-decorator"
import DrawerModule from "@/store/DrawerModule"
import LangModule from "@/store/LangModule"
import {getModule} from "vuex-module-decorators"
import Tag from "@/model/Tag";
import TagService from "@/service/TagService";
import CreateTagDialog from "@/components/dialog/CreateTagDialog.vue";
import {Route} from "vue-router";
import Handler from "@/handlers/Handler";
import {MultipleItem} from "@/handlers/interfaces/ContentUI";
import PaginationMixin from "@/mixins/PaginationMixin";
import TagAutocompleteComponent from "@/components/autocomplete/TagAutocompleteComponent.vue";

@Component({
    components: {TagAutocompleteComponent}
})
export default class TagsService extends Mixins(PaginationMixin) {

    lang = getModule(LangModule).lang
    loading: boolean = false
    tags: MultipleItem<Tag> = { items: [], totalItems: 0 }
    size = 50

    created() { this.refresh() }

    async refresh() {
        try {
            await Handler.getItems(this, this.tags, () =>
                TagService.getPublicTags(this.page - 1, this.size, this.search)
            )
            this.setPageCount(this.tags.totalItems!!)
        } catch (e) { console.log(e) }
    }

    @Watch("page")
    onPageChanged() { this.refresh() }

}
</script>