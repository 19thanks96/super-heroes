import { stringify } from 'querystring'
import { SuperHero } from './types'

const url = 'http://localhost:4000'
export async function createHero(hero: SuperHero) {
    const data = new FormData()
    //@ts-ignore
    data.append('file', hero.images[0])
    //@ts-ignore
    console.log(hero.images[0])
    const response = await fetch(url + '/superheroes', {
        method: 'post',
        //headers: {
        //    Accept: 'application/json',
        //    'Content-Type': 'application/json',
        //},
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
