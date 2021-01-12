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
                expect(body.article.length).toBe(1);
                expect(body.article[0]).toEqual(expect.objectContaining({
                    author : expect.any(String),
                    title : expect.any(String),
                    article_id : expect.any(Number),
                    body : expect.any(String),
                    topic : expect.any(String),
                    created_at :expect.any(String),
                    votes : expect.any(Number),
                    comments_count : expect.any(Number)
                }));
                // expect(body.article).toEqual(
                //     {
                //       article_id: 1,
                //       title: 'Living in the shadow of a great man',
                //       body: 'I find this existence challenging',
                //       votes: 100,
                //       topic: 'mitch',
                //       author: 'butter_bridge',
                //       created_at: 2018-11-15T12:21:54.171Z,
                //       comments_count: '13'
                //     }
                //   )
            });
        });
    });


    afterAll(() => {
        return connection.destroy();
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