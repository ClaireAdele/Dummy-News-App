process.env.NODE_ENV = 'test';
const app = require('../app.js');
const request = require('supertest');
const connection = require('../connection.js')


describe('/api', () => {
    describe('api/topics', () => {

        beforeEach(( ) => connection.seed.run());

        test('GET - status 200 - gets the array of all topics, within an object, at a key of topics', () => {
            return request(app)
            .get('/api/topics')
            .expect(200)
            .then(({body}) => {
                expect(body.topics.length).toBe(3)
                expect(body.topics[0]).toEqual(expect.objectContaining({
                    slug: expect.any(String),
                    description : expect.any(String)
                }));
            });
        });
    });

    afterAll(() => {
        return connection.destroy();
     });
})

describe('/not-a-route', () => {
    test('ERROR - status 404 - if a user inputs a url that does not correspond to en endpoint', () => {
        return request(app)
        .get('/not-a-route')
        .expect(404)
        .then(({body}) => {
            expect(body.message).toBe('Not Found');
        })
    });

    afterAll(() => {
        return connection.destroy();
     });
})



