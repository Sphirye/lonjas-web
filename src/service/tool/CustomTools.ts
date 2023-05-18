import Artist from "@/model/Artist";
import Post from "@/model/Post";
import Tag from "@/model/Tag";
import Category from "@/model/Category";
import Character from "@/model/Character";

export default class CustomTools {

    static getIdsArray<T>(objects: (Artist | Post | Tag | Category | Character)[]): (number)[] {
        const ids: number[] = []

        for (const obj of objects) {
            const id = obj.id
            if (id != undefined) { ids.push(id) }
        }

        return ids
    }

}