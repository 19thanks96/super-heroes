import { stringify } from 'querystring'
import { SuperHeroDTO } from './types'

export const url = 'http://localhost:4000'
export async function createHero(hero: SuperHeroDTO) {
    const data = new FormData()
    //@ts-ignore
    data.append('file', hero.images[0])
    data.append('nickname', hero.nickname)
    data.append('real_name', hero.real_name)
    data.append('origin_description', hero.origin_description)
    data.append('catch_phrase', hero.catch_phrase)
    //@ts-ignore
    console.log(hero.images[0])
    const response = await fetch(url + '/superheroes', {
        method: 'post',
        body: data,
    })
    const responseJson = await response.json()
    return responseJson
}

export async function fetchSuperHeroes() {
    const response = await fetch(url + '/superheroes')
    const responseJson = await response.json()
    return responseJson
}

export async function fetchHero(_id?:string) {
    const response = await fetch(url + '/superheroes/' + _id)
    const responseJson = await response.json()
    return responseJson
}

export async function updateHero(hero: SuperHeroDTO) {
    const data = new FormData()
    //@ts-ignore
    data.append('file', hero.images[0])
    data.append('nickname', hero.nickname)
    data.append('real_name', hero.real_name)
    data.append('origin_description', hero.origin_description)
    data.append('catch_phrase', hero.catch_phrase)
    //@ts-ignore
    console.log(hero.images[0])
    const response = await fetch(url + '/superheroes/' + hero._id, {
        method: 'put',
        body: data,
    })
    const responseJson = await response.json()
    return responseJson
}

export async function deleteHero(_id?:string) {
    const response = await fetch(url + '/superheroes/' + _id,{
        method: 'delete'})
    const responseJson = await response.json()
    return responseJson
}