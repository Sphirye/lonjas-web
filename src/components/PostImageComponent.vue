<template>
  <v-card :width="width" :height="height" outlined color="dark-3">
    <v-img width="100%" height="100%" contain :src="images[index]">

      <v-row no-gutters style="position: absolute; top: 50%; transform: translateY(-50%); width: 100%" class="d-flex my-auto px-3">

        <v-btn icon x-large @click="previousIndex">
          <v-icon color="white">fas fa-angle-left</v-icon>
        </v-btn>

        <v-spacer/>

        <v-btn icon x-large @click="nextIndex">
          <v-icon color="white">fas fa-angle-right</v-icon>
        </v-btn>
      </v-row>

      <div class="media-count grey--text text--lighten-3 mr-8 mb-8">{{ index + 1 }} / {{ images.length }}</div>

    </v-img>
  </v-card>
</template>

<script lang="ts">

import {Component, Prop, Vue} from 'vue-property-decorator'
import {getModule} from "vuex-module-decorators"
import LangModule from "@/store/LangModule"
import Post, {Type} from "@/model/Post"

@Component
export default class PostImageComponent extends Vue {

  @Prop() readonly post!: Post
  @Prop({ default: '100%' }) readonly width!: string
  @Prop({ default: '600px' }) readonly height!: string

  index: number = 0

  get lang() { return getModule(LangModule).lang }

  get images(): string[] {
    let urls: string[] = []

    switch (this.post.type) {
      case Type.TWEET: { urls = urls.concat(this.post.tweet!!.images!!); break; }
    }

    return urls
  }

  nextIndex() {
    if (this.images.length == this.index + 1) (this.index) = 0
    else this.index = this.index + 1
  }

  previousIndex() {
    if (this.index == 0) this.index = this.images.length - 1
    else this.index = this.index - 1
  }

}
</script>

<style>
.media-count {
  position: absolute;
  right: 0px;
  bottom: 0px;
}
</style>