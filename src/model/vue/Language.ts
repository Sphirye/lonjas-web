export default class Language {

    static readonly KEY = "lang"
    name!: string
    value!: LanguageType
    file!: any
    flag!: string

}

export enum LanguageType {
    SPANISH = "SPANISH",
    ENGLISH = "ENGLISH"
}
