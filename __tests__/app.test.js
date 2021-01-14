process.env.NODE_ENV = 'test';
const app = require('../app.js');
const request = require('supertest');
const connection = require('../connection.js')

beforeEach(( ) => connection.seed.run());

describe('/api', () => {
    describe('api/topics', () => {

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
                    {"avatar_url": "https://www.healthytherapies.com/wp-content/uploads/2016/06/Lime3.jpg",
                    "name": "jonny", 
                    "username": "butter_bridge"})
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
                expect(res.body).toEqual({ "msg": "Not Found - article_id does not exist in database"}
                )
            }).then(() => {
                //once I have a comment endpoint in pace, I can check that the comments are getting destroyed. They are, since no conflict, but I would like to be able to prove that through express.
            })
        });

        test('PATCH - status 201 - accepts a body formatted { inc_votes : number }, and increments the vote property of the article selected by the number specified if the number is positive', () => {
            const incrementVote = { inc_votes : 1}
            return request(app)
            .patch('/api/articles/1')
            .send(incrementVote)
            .expect(201)
            .then((patchedArticle) => {
                expect(patchedArticle.body.article).toEqual(expect.objectContaining({
                    author : expect.any(String),
                    title : expect.any(String),
                    article_id : 1,
                    body : expect.any(String),
                    topic : expect.any(String),
                    created_at :expect.any(String),
                    votes : 101,
                }))
            });
        });

        test('PATCH - status 201 - accepts a body formatted { inc_votes : number }, and decrements the vote property of the article selected by the number specified if the number is negative', () => {
            const incrementVote = { inc_votes : -10}
            return request(app)
            .patch('/api/articles/1')
            .send(incrementVote)
            .expect(201)
            .then((patchedArticle) => {
                expect(patchedArticle.body.article).toEqual(expect.objectContaining({
                    author : expect.any(String),
                    title : expect.any(String),
                    article_id : 1,
                    body : expect.any(String),
                    topic : expect.any(String),
                    created_at :expect.any(String),
                    votes : 90,
                }))
            });
        });

        test.skip('PATCH - status 201 - the number of votes cannot go below zero', () => {
            const incrementVote = { inc_votes : -110}
            return request(app)
            .patch('/api/articles/1')
            .send(incrementVote)
            .expect(201)
            .then((patchedArticle) => {
                expect(patchedArticle.body.article).toEqual(expect.objectContaining({
                    author : expect.any(String),
                    title : expect.any(String),
                    article_id : 1,
                    body : expect.any(String),
                    topic : expect.any(String),
                    created_at :expect.any(String),
                    votes : 0,
                }))
            });
        });

        test('ERROR GET - 404 - Invalid parametric endpoint input, the path is correct, but the input does not correspond to anything in the database', () => {
            return request(app)
            .get('/api/articles/109')
            .expect(404)
            .then((errorMessage) => {
                expect(errorMessage.body).toEqual(  
                    {"msg": "Not Found - article_id does not exist in database"}
                
                );
            });
        });

        test('ERROR DELETE - 404 - Invalid parametric endpoint input, the path is correct, but the input does not correspond to anything in the database', () => {
            return request(app)
            .delete('/api/articles/109')
            .expect(404)
            .then((errorMessage) => {
                expect(errorMessage.body).toEqual(
                    {"msg": "Not Found - can't delete article if article_id does not exist in database"} 
                );
            });
        });

        test('ERROR PATCH - status 400 Bad Request - the body on the request is not formatted properly, and thus, can\'t patch the article object', () => {
            const wrongReq = { 'wrong input' : 'is not going to work'}
            return request(app)
            .patch('/api/articles/1')
            .send(wrongReq)
            .expect(400)
            .then((errorMessage) => {
                expect(errorMessage.body).toEqual(
                { "msg": "Incorrect request - request must be formatted to conform to following model : {inc_votes : vote_number}" })
            })
        });

        describe('/api/articles/comments', () => {
            test('POST - status 201 - takes a post request formatted as {username, body} and posts a comment that references the appropriate article in the database', () => {
                const input = {username: "icellusedkars", body : "I think therefore I am"};

                return request(app)
                .post('/api/articles/1/comments')
                .send(input)
                .expect(201)
                .then((commentPosted) => {
                    expect(commentPosted.body.comment).toEqual(expect.objectContaining({
                        comment_id : expect.any(Number),
                        author : 'icellusedkars',
                        article_id : 1,
                        body : 'I think therefore I am',
                        created_at :expect.any(String),
                        votes : 0,
                    }))
                })
            });

            test('ERROR POST - status 404 Not Found - the article_id on the request does not correspond to an existing article, and thus, can\'t post a comment', () => {
                const input = {username: "icellusedkars", body : "I think therefore I am"};
                
                return request(app)
                .post('/api/articles/900000/comments')
                .send(input)
                .expect(404)
                .then((errorMessage) => {
                    expect(errorMessage.body).toEqual(
                    { "msg": 'Not Found - can\'t post article if article_id does not exist in database'})
                })
            });

            test('ERROR POST - status 400 Bad Request - the body on the request is not formatted properly, and thus, can\'t post the comment', () => {
                const wrongReq = { 'wrong input' : 'is not going to work',
                'wrong input 2' : 'still not going to work'}

                return request(app)
                .post('/api/articles/1/comments')
                .send(wrongReq)
                .expect(400)
                .then((errorMessage) => {
                    expect(errorMessage.body).toEqual(
                    { "msg": "Incorrect request - request must be formatted to conform to following model : {username, body}" })
                })
            });
    
    
        });//describe
    });//describe
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
});

afterAll(() => {
    return connection.destroy();
 });