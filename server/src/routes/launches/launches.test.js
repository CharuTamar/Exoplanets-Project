const request = require('supertest');
const app = require('../../app');


describe('Test GET /launches', () => {
    test('It should respond with 200 success', async() => {
        const response = await request(app)
          .get('/launches')
          .expect(200)        //supertest assertions
          .expect('Content-type', /json/)    
        // expect(response.statusCode).toBe(200)   //jest assertion

    })
}) 


describe('Test POST /launches', () => {
    test('It should respond with 201 created', async() => {
        const response = await request(app)
        .post('/launches')
        .send({
            mission: 'USS Ent',
            rocket: 'NCC 1702',
            target: 'Kepler 67-f',
            launchDate: 'January 4,2028'
        })
        .expect(201)
        .expect('Content-type', /json/)
      expect(response.body).toMatchObject({
        mission: 'USS Ent',
        rocket: 'NCC 1702',
        target: 'Kepler 67-f',
        launchDate: new Date('January 4,2028').toISOString()
      })  
    })


    test('It should catch missing properties', async() => {
        const response = await request(app)
        .post('/launches')
        .send({
            mission: 'USS Ent',
            rocket: 'NCC 1702',
            target: 'Kepler 67-f'
        })
        .expect(400)
      expect(response.body).toStrictEqual({
        error: 'Missing required launch property'
    })
    })

    test('It should catch invalid date', async() => {
        const response = await request(app)
        .post('/launches')
        .send({
            mission: 'USS Ent',
            rocket: 'NCC 1702',
            target: 'Kepler 67-f',
            launchDate: 'booo'
        })
        .expect(400)
      expect(response.body).toStrictEqual({
        error: 'Invalid date'
      })
    })
})