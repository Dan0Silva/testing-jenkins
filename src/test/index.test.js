const request = require('supertest')
const app = require('../') // Importa a aplicação Express

describe('GET /', () => {
    it('should return Hello World!', async () => {
        const response = await request(app).get('/')

        // Verifica se o status da resposta é 200 (OK)
        expect(response.status).toBe(200)

        // Verifica se o corpo da resposta é 'Hello World!'
        expect(response.text).toBe('Hello World!')
    })
})
