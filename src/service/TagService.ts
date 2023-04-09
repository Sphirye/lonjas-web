import ConstantTool from "@/service/tool/ConstantTool";
import axios from "axios";
import Response from "@/model/responses/Response";
import Tag from "@/model/Tag";
import JsonTool from "@/service/tool/JsonTool";

export default class TagService {

    static async getPublicTags(page: number, size: number, search: Nullable<string>): Promise<Response<Tag[]>> {
        try {
            const response = await axios.get(`${ConstantTool.BASE_URL}/public/tag`, {
                params: { page, size, search }
            })
            const tags = JsonTool.jsonConvert.deserializeArray(response.data, Tag)
            const xTotalCount = Number(response.headers["x-total-count"])
            return Promise.resolve({result: tags, xTotalCount})
        } catch (e) { return Promise.reject(e) }
    }

}