import {Gender} from "@/model/Character"
import Tag from "@/model/Tag"

export default class PostFilter {
    static readonly KEY = "post-filter"
    nsfw: Nullable<boolean> = null
    weirdMaterial: Nullable<boolean> = null
    excludedTags: Nullable<Tag[]> = null
    gender: Nullable<Gender> = null
}