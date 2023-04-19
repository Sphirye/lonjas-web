import ConstantTool from "@/service/tool/ConstantTool"
import Response from "@/model/responses/Response"
import JsonTool from "@/service/tool/JsonTool"
import Character from "@/model/Character"
import axios from "axios"

export default class CharacterService {

    static async getPublicCharacters(page: number, size: number, search: string | null): Promise<Response<Character[]>> {
        try {
            const response = await axios.get(ConstantTool.BASE_URL + "/public/character", {
                params: { page, size, search }
            })
            const characters = JsonTool.jsonConvert.deserializeArray(response.data, Character)
            const xTotalCount = Number(response.headers["x-total-count"])
            return Promise.resolve({ result: characters, xTotalCount })
        } catch (e) { return Promise.reject(e) }
    }


    static async getPublicCategoryCharacters(page: number, size: number, search: string | null, id: number) {
        try {
            const response = await axios.get(ConstantTool.BASE_URL + "/public/category/" + id + "/character", {
                params: { page, size, search }
            })
            const characters = JsonTool.jsonConvert.deserializeArray(response.data, Character)
            const xTotalCount = Number(response.headers["x-total-count"])
            return Promise.resolve({ result: characters, xTotalCount })
        } catch (e) { return Promise.reject(e) }
    }

}