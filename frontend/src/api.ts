import { stringify } from 'querystring'
import { SuperHero } from './types'

const url = 'http://localhost:4000'
export async function createHero(hero: SuperHero) {
    const response = await fetch(url + '/superheroes', {
        method: 'post',
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(hero),
    })
    const responseJson = await response.json()
    return responseJson
}
