import {getModule} from "vuex-module-decorators"
import DrawerItem from "@/model/vue/DrawerItem"
import LangModule from "@/store/LangModule"

let lang = getModule(LangModule).lang

let drawerList: DrawerItem[] = [
    { title: lang.home, to: "/", icon: "mdi-home", global: true },
    { title: lang.posts, to: "/posts", icon: "mdi-home", global: true, divider: true },
    { title: lang.artists, to: "/artists", icon: "mdi-home", global: true },
    { title: lang.categories, to: "/categories", icon: "mdi-home", global: true },
    { title: lang.characters, to: "/characters", icon: "mdi-home", global: true },
    { title: lang.about, to: "/about", icon: "mdi-home", global: true, divider: true },
]

export default drawerList