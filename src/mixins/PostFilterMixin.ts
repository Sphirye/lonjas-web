import {Component, Vue} from "vue-property-decorator"
import PostFilter from "@/model/vue/PostFilter"
import {getModule} from "vuex-module-decorators"
import SnackbarModule from "@/store/SnackbarModule"
import PostFilterModule from "@/store/PostFilterModule";
import PostFiltersDialog from "@/components/dialogs/PostFiltersDialog.vue";

/*
*  This mixin store and manage the post filter data in the browser cache.
*/
@Component
export default class PostFilterMixin extends Vue {

    private get postFilterModule() { return getModule(PostFilterModule) }

    private get defaultFilter(): PostFilter {
        let filter = new PostFilter()
        filter.nsfw = false
        filter.weirdMaterial = false
        filter.gender = null
        return filter
    }

    get postFilter() { return this.postFilterModule.postFilter }

    created() { this.refreshPostFilter() }

    updatePostFilter(filter: PostFilter) {
        this.postFilterModule.setPostFilter(filter)
        this.refreshPostFilter()
    }

    refreshPostFilter() {
        if (localStorage.getItem(PostFilter.KEY) == null) { localStorage.setItem(PostFilter.KEY, JSON.stringify(this.defaultFilter)) }
        this.postFilterModule.loadPostFilter()
    }

}