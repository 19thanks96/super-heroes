export type SuperHeroDTO = {
    nickname: string
    real_name: string
    origin_description: string
    catch_phrase: string
    images: FileList | null
}

export type SuperHero = {
    nickname: string
    real_name: string
    origin_description: string
    catch_phrase: string
    images: string[]
}

export type SuperHeroArray = Array<SuperHero>
