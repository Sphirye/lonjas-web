import ConstantTool from "@/service/tool/ConstantTool";
import JsonTool from "@/service/tool/JsonTool";
import {Vue} from "vue-property-decorator";
import Tag from "@/model/Tag";

export default class TagService {
    static async getTag(component: Vue, id: number) {
        // @ts-ignore
        component.loading = true
        try {
            const response = await component.axios.get(`${ConstantTool.BASE_URL}/public/tags/${id}`)
            // @ts-ignore
            component.tag = JsonTool.jsonConvert.deserializeObject(response.data, Tag)
        } catch (e) {

        } finally {
            // @ts-ignore
            component.loading = false
        }
    }

    static async getTags(component: Vue, tags: Tag[], page: number, size: number, search: string | null) {
        // @ts-ignore
        component.loading = true
        try {
            const response = await component.axios.get(ConstantTool.BASE_URL + "/public/tags", {
                params: { page, size, search }
            })
            let list = JsonTool.jsonConvert.deserializeArray(response.data, Tag)
            tags.splice(0, tags.length)
            list.forEach(v => tags.push(v))
        } catch (e) {

        } finally {
            // @ts-ignore
            component.loading = false
        }
    }
}