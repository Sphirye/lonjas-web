import {Action, getModule, Module, Mutation, VuexModule} from "vuex-module-decorators"
import store from "@/store/index"
import PostFilter from "@/model/vue/PostFilter"
import SnackbarModule from "@/store/SnackbarModule"
import {Axios} from "axios";
import Post from "@/model/Post";
import PostFilterMixin from "@/mixins/PostFilterMixin";

/* Vuex seems to be broken while referencing actions / mutations so they'll be just mixed between this and PostFilterMixin.ts */
@Module({ dynamic: true, store, name: "PostFilterModule" })
export default class PostFilterModule extends VuexModule {

    postFilter: PostFilter = new PostFilter()

    @Mutation
    setPostFilter(filter: PostFilter) {
        localStorage.setItem(PostFilter.KEY, JSON.stringify(filter))
    }

    @Mutation
    loadPostFilter() {
        this.postFilter = JSON.parse(localStorage.getItem(PostFilter.KEY)!)
    }

}