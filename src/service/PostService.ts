import ConstantTool from "@/service/tool/ConstantTool"
import JsonTool from "@/service/tool/JsonTool"
import {Vue} from "vue-property-decorator"
import Post from "@/model/Post"

export default class PostService {
    static async getPost(component: Vue, id: number) {
        // @ts-ignore
        component.loading = true
        try {
            const response = await component.axios.get(`${ConstantTool.BASE_URL}/public/post/${id}`)
            // @ts-ignore
            component.post = JsonTool.jsonConvert.deserializeObject(response.data, Post)
        } catch (e) {

        } finally {
            // @ts-ignore
            component.loading = false
        }
    }

    static async getPosts(component: Vue, posts: Post[], page: number, size: number) {
        // @ts-ignore
        component.loading = true
        try {
            const response = await component.axios.get(`${ConstantTool.BASE_URL}/public/post`, {
                params: { page: page, size: size }
            })

            let list = JsonTool.jsonConvert.deserializeArray(response.data, Post)
            // @ts-ignore
            posts.splice(0, posts.length)
            list.forEach(v => posts.push(v))
        } catch (e) {

        } finally {
            // @ts-ignore
            component.loading = false
        }
    }
}