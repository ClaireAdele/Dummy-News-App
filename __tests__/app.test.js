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

    describe('/api/users', () => {
        test('GET - status 200 - get a user object with the following properties: username, avatar_url, name', () => {
            return request(app)
            .get('/api/users/butter_bridge')
            .expect(200)
            .then(({body}) => {
                expect(body.user).toEqual(
                    [{"avatar_url": "https://www.healthytherapies.com/wp-content/uploads/2016/06/Lime3.jpg",
                    "name": "jonny", 
                    "username": "butter_bridge"}])
            });
        });
    });
    
    describe('/api/articles', () => {
        test('GET - status 200 - get an article object corresponding to the article_id in parameters', () => {
            return request(app)
            .get('/api/articles/1')
            .expect(200)
            .then(({body}) => {
                expect(body.article).toEqual(expect.objectContaining({
                    author : expect.any(String),
                    title : expect.any(String),
                    article_id : 1,
                    body : expect.any(String),
                    topic : expect.any(String),
                    created_at :expect.any(String),
                    votes : expect.any(Number),
                    comments_count : expect.any(Number)
                }));
            });
        });

        test('DELETE - status 204 - deletes the article and associated comments at parametric endpoint specified', () => {
            return request(app)
            .delete('/api/articles/1')
            .expect(204)
            .then(() => {
                return request(app)
                .get('/api/articles/1')
                .expect(404)
            }).then((res) => {
                expect(res.text).toEqual("{\"msg\":\"Not Found - article_id does not exist in database\"}"
                )
            }).then(() => {
                //once I have a comment endpoint in pace, I can check that the comments are getting destroyed. They are, since no conflict, but I would like to be able to prove that through express.
            })
        });

        test('PATCH - status 201 - accepts a body formatted { inc_votes : number }, and increments the vote property of the article selected by the number specified', () => {
            
        });

        test('ERROR GET - Invalid parametric endpoint input, the path is correct, but the input does not correspond to anything in the database', () => {
            return request(app)
            .get('/api/articles/109')
            .expect(404)
            .then((errorMessage) => {
                expect(errorMessage.text).toEqual(  
                    "{\"msg\":\"Not Found - article_id does not exist in database\"}")
            });
        });

        test('ERROR DELETE - Invalid parametric endpoint input, the path is correct, but the input does not correspond to anything in the database', () => {
            return request(app)
            .delete('/api/articles/109')
            .expect(404)
            .then((errorMessage) => {
                expect(errorMessage.text).toEqual(
                    "{\"msg\":\"Not Found - can't delete article if article_id does not exist in database\"}"    
                );
            });
        });


        afterAll(() => {
        return connection.destroy();
        });
    });
});

describe('/not-a-route', () => {
    test('ERROR - status 404 - if a user inputs a url that does not correspond to en endpoint', () => {
        return request(app)
        .get('/not-a-route')
        .expect(404)
        .then(({body}) => {
            expect(body.message).toBe('Not Found');
        });
    });

    afterAll(() => {
        return connection.destroy();
     });
});