<template>
  <v-container fluid class="px-8">
    <v-row dense>
      <v-col cols="12">
        <span class="uni-sans-heavy text-md white--text mx-4">{{ lang.recentPosts }}</span>
      </v-col>
    </v-row>
    <v-divider class="my-4" dark/>
    <v-row justify="start" align="start">
      <v-col cols="3" v-for="(post, key) in posts" :key="key">
        <PostCardComponent :post="post"/>
      </v-col>
    </v-row>
  </v-container>
</template>
<script lang="ts">
import {Component, Ref, Vue} from 'vue-property-decorator'
import {getModule} from "vuex-module-decorators"
import DialogModule from "@/store/DialogModule"
import LangModule from "@/store/LangModule"
import Rules from "@/service/tool/Rules"
import Dialog from "@/model/vue/Dialog"
import PostService from "@/service/PostService";
import Post from "@/model/Post";
import PostCardComponent from "@/components/PostCardComponent.vue";

@Component( { components: { PostCardComponent } } )
export default class HomeView extends Vue {

	@Ref() readonly form!: HTMLFormElement

  posts: Post[] = []
  page: number = 0
  size: number = 12

  get lang() { return getModule(LangModule).lang }
	get rules() { return Rules }

  created() {
    this.refresh()
  }

  refresh() {
    PostService.getPosts(this, this.posts, this.page, this.size, null)
  }

	validate() {
		getModule(DialogModule).showDialog(new Dialog(this.lang.warning, "¿Desea continuar?", () => {
			alert("Has continuado.")
		}))
	}

}
</script>
