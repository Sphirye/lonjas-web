import {JsonObject, JsonProperty} from "json2typescript";

@JsonObject("TwitterUser")
export default class TwitterUser {

    @JsonProperty("id", String, true)
    id?: string = undefined

    @JsonProperty("name", String, true)
    name?: string = undefined

    @JsonProperty("username", String, true)
    username?: string = undefined

    @JsonProperty("profile_image_url", String, true)
    profile_image_url?: string = undefined

}