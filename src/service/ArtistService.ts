import ConstantTool from "@/service/tool/ConstantTool";
import Artist from "@/model/Artist";
import axios from "axios";
import JsonTool from "@/service/tool/JsonTool";
import Response from "@/model/responses/Response";

export default class ArtistService {

    static async getPublicArtist(id: number): Promise<Response<Artist>> {
        try {
            const response = await axios.get(`${ConstantTool.BASE_URL}/public/artist/` + id)
            const artist = JsonTool.jsonConvert.deserializeObject(response.data, Artist)
            return Promise.resolve({ result: artist })
        } catch (e) { return Promise.reject(e) }
    }

    static async getPublicArtists(page: number, size: number, search: Nullable<string> = null): Promise<Response<Artist[]>> {
        try {
            const response = await axios.get(`${ConstantTool.BASE_URL}/public/artist`, {
                params: { page, size, search }
            })
            let artists = JsonTool.jsonConvert.deserializeArray(response.data, Artist)
            const xTotalCount = Number(response.headers["x-total-count"])
            return Promise.resolve({result: artists, xTotalCount})
        } catch (e) { return Promise.reject(e) }
    }

}