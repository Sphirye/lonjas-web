import ConstantTool from "@/service/tool/ConstantTool"
import {Vue} from "vue-property-decorator"
import Category from "@/model/Category"
import JsonTool from "@/service/tool/JsonTool";
import Post from "@/model/Post";

export default class CategoryService {
    static async getCategories(component: Vue, categories: Category[], page: number, size: number, search: string | null) {
        // @ts-ignore
        component.loading = true
        try {
            const response = await component.axios.get(`${ConstantTool.BASE_URL}/public/category`, {
                params: { page, size, search }
            })
            let list = JsonTool.jsonConvert.deserializeArray(response.data, Category)
            categories.splice(0, categories.length)
            list.forEach(v => categories.push(v))
        } catch (e) {

        } finally {
            // @ts-ignore
            component.loading = false
        }
    }
}