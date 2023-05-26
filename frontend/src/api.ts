import { stringify } from 'querystring'
import { SuperHeroDTO, SuperHero } from './types'

export const url = 'http://localhost:4000'
export async function createHero(hero: SuperHeroDTO) {
    const data = new FormData()
    if (hero.images?.length) {
        for (let i = 0; i < hero.images.length; i++) {
            data.append('files[]', hero.images[i])
            console.log(hero.images[i])
        }
    }
    data.append('nickname', hero.nickname)
    data.append('real_name', hero.real_name)
    data.append('superpowers',  hero.superpowers)
    data.append('origin_description', hero.origin_description)
    data.append('catch_phrase', hero.catch_phrase)
    const response = await fetch(url + '/superheroes', {
        method: 'post',
        body: data,
    })
    const responseJson = await response.json()
    return responseJson
}

export async function fetchSuperHeroes(pageNumber: number) {
    const response = await fetch(url + '/superheroes?page=' + pageNumber)
    const responseJson = await response.json()
    return responseJson
}

export async function fetchHero(_id?: string) {
    const response = await fetch(url + '/superheroes/' + _id)
    const responseJson = await response.json()
    return responseJson
}

export async function updateHero(hero: SuperHeroDTO) {
    const data = new FormData()
    if (hero.images?.length) {
        for (let i = 0; i < hero.images.length; i++) {
            data.append('files[]', hero.images[i])
            console.log(hero.images[i])
        }
    }
    data.append('nickname', hero.nickname)
    data.append('superpowers',  hero.superpowers)
    data.append('real_name', hero.real_name)
    data.append('origin_description', hero.origin_description)
    data.append('catch_phrase', hero.catch_phrase)
    const response = await fetch(url + '/superheroes/' + hero._id, {
        method: 'put',
        body: data,
    })
    const responseJson = await response.json()
    return responseJson
}

export async function deleteHero(_id?: string) {
    const response = await fetch(url + '/superheroes/' + _id, {
        method: 'delete',
    })
    const responseJson = await response.json()
    return responseJson
}

export async function deleteImg(imglink: string, hero: SuperHero | undefined) {
    const response = await fetch(
        url + '/superheroes/' + hero?._id + '/image/' + imglink,
        {
            method: 'delete',
        }
    )
    const responseJson = await response.json()
    return responseJson
}
