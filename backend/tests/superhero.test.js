const request = require('supertest')
const app = require('../app')
const superman = {
  nickname: 'Superman',
  real_name: 'Clark Kent',
  origin_description: `he was born Kal-El on the planet Krypton, before being rocketed to
  Earth as an infant by his scientist father Jor-El, moments before Krypton's destruction…
  superpowers: solar energy absorption and healing factor, solar flare and heat vision,
  solar invulnerability, flight…`,
  catch_phrase:
    "Look, up in the sky, it's a bird, it's a plane, it's Superman!",
}
const superheroes = [superman]
describe('Superhero', () => {
  test('create superhero returns 200', async () => {
    const res = await request(app).post('/superheroes').send(superman)
    expect(res.statusCode).toEqual(200)
    expect(res.body).toHaveProperty('nickname')
  })
  test('get /superheroes should return list of superheroes', async () => {
    const res = await request(app).get('/superheroes')
    expect(res.statusCode).toEqual(200)
    expect(res.body).toEqual(superheroes)
  })
})
