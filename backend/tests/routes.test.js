const request = require('supertest')
const app = require('../app')
describe('Post Endpoints', () => {
  test('create a new post', async () => {
    const res = await request(app).get('/')
    expect(res.statusCode).toEqual(200)
    expect(res.body).toBe('Hello World!')
  })
})
