import ConstantTool from "@/service/tool/ConstantTool"
import Response from "@/model/responses/Response"
import JsonTool from "@/service/tool/JsonTool"
import Post from "@/model/Post"
import axios from "axios"

export default class PostService {

    static async getPublicPost(id: number): Promise<Response<Post>> {
        try {
            const response = await axios.get(`${ConstantTool.BASE_URL}/public/post/${id}`)
            const post = JsonTool.jsonConvert.deserializeObject(response.data, Post)
            return Promise.resolve({result: post})
        } catch (e) { return Promise.reject(e) }
    }

    static async getPublicPosts(
        page: number, size: number, artistId: Nullable<number> = null, categoryIds: Nullable<number[]> = null,
        characterIds: Nullable<number[]> = null, tagIds: Nullable<number[]> = null
    ): Promise<Response<Post[]>> {
        try {
            const response = await axios.get(`${ConstantTool.BASE_URL}/public/post`, {
                params: {
                    page, size, search: null, artistId,
                    categoryIds: categoryIds?.toString(), characterIds: characterIds?.toString(), tagIds: tagIds?.toString()
                }
            })
            let posts = JsonTool.jsonConvert.deserializeArray(response.data, Post)
            const xTotalCount = Number(response.headers["x-total-count"])
            return Promise.resolve({result: posts, xTotalCount})
        } catch (e) { return Promise.reject(e) }
    }



}