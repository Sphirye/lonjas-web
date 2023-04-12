import axios from "axios";
import ConstantTool from "@/service/tool/ConstantTool";
import Category from "@/model/Category";
import Response from "@/model/responses/Response";
import JsonTool from "@/service/tool/JsonTool";

export default class CategoryService {

    static async getPublicCategory(id: number): Promise<Response<Category>> {
        try {
            const response = await axios.get(ConstantTool.BASE_URL + "/public/category/" + id)
            let category = JsonTool.jsonConvert.deserializeObject(response.data, Category)
            return Promise.resolve({ result: category })
        } catch (e) { return Promise.resolve(e) }
    }

    static async getPublicCategories(page: number, size: number, search: string | null): Promise<Response<Category[]>> {
        try {
            const response = await axios.get(ConstantTool.BASE_URL + "/public/category", {
                params: { page, size, search }
            })
            let categories = JsonTool.jsonConvert.deserializeArray(response.data, Category)
            const xTotalCount = Number(response.headers["x-total-count"])
            return Promise.resolve({
                result: categories,
                xTotalCount
            })
        } catch (e) { return Promise.resolve(e) }
    }

}