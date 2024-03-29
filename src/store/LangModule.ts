import { Action, Module, Mutation, VuexModule } from "vuex-module-decorators"
import Language, { LanguageType } from "@/model/vue/Language"
import store from "@/store/index"
import spanish from "@/lang/spanish"
import english from "@/lang/english";

@Module({ dynamic: true, store, name: "LangModule" } )
export default class LangModule extends VuexModule {

    lang: any = spanish
    languages: Language[] = [
        { name: "Spanish", flag: "es", file: spanish, value: LanguageType.SPANISH },
        { name: "English", flag: "gb", file: english, value: LanguageType.ENGLISH }
    ]
    language: Language = this.languages[0]

    @Mutation
    setLanguage(language: Language) {
        this.lang = language.file
        this.language = language
        localStorage.setItem(Language.KEY, JSON.stringify(this.language))
    }

    @Action
    loadLanguage() {
        let languageObject = localStorage.getItem(Language.KEY)
        if (languageObject != null) {
            this.setLanguage(JSON.parse(languageObject))
        }
    }

}