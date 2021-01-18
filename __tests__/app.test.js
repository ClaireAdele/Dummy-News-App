process.env.NODE_ENV = 'test';
const app = require('../app.js');
const request = require('supertest');
const connection = require('../connection.js')

beforeEach(() => connection.seed.run());

describe('/api', () => {
    describe('api/topics', () => {

        test('GET ALL TOPICS - status 200 - gets the array of all topics, within an object, at a key of topics', () => {
            return request(app)
                .get('/api/topics')
                .expect(200)
                .then(({ body }) => {
                    expect(body.topics.length).toBe(3)
                    expect(body.topics[0]).toEqual(expect.objectContaining({
                        slug: expect.any(String),
                        description: expect.any(String)
                    }));
                });
        });

        describe('INVALID METHODS', () => {
            test('ERROR INVALID METHOD - status 405 - the user tried to use a method that is not defined on the router', () => {
                const invalidMethods = ['put', 'patch', 'post', 'delete']
                const methodPromise = invalidMethods.map((method) => {
                    return request(app)
                    [method]('/api/topics')
                    .expect(405)
                    .then((errorMessage) => {
                        expect(errorMessage.body).toEqual({ 'message' : 'Method not allowed'})
                    });
                });
                return Promise.all(methodPromise);
            });
        })
    });

    describe('/api/users', () => {
        test('GET USER BY USERNAME- status 200 - get a user object with the following properties: username, avatar_url, name', () => {
            return request(app)
                .get('/api/users/butter_bridge')
                .expect(200)
                .then(({ body }) => {
                    expect(body.user).toEqual(
                        {
                            "avatar_url": "https://www.healthytherapies.com/wp-content/uploads/2016/06/Lime3.jpg",
                            "name": "jonny",
                            "username": "butter_bridge"
                        })
                });
        });

        describe('INVALID METHODS', () => {
            test('ERROR INVALID METHOD - status 405 - the user tried to use a method that is not defined on the router', () => {
                const invalidMethods = ['put', 'patch', 'post', 'delete']
                const methodPromise = invalidMethods.map((method) => {
                    return request(app)
                    [method]('/api/users/butter_bridge')
                    .expect(405)
                    .then((errorMessage) => {
                        expect(errorMessage.body).toEqual({ 'message' : 'Method not allowed'})
                    });
                });
                return Promise.all(methodPromise);
            });
        })
    });

    describe('/api/articles', () => {
        test('GET ARTICLE BY ID - status 200 - get an article object corresponding to the article_id in parameters', () => {
            return request(app)
                .get('/api/articles/1')
                .expect(200)
                .then(({ body }) => {
                    expect(body.article).toEqual(expect.objectContaining({
                        author: expect.any(String),
                        title: expect.any(String),
                        article_id: 1,
                        body: expect.any(String),
                        topic: expect.any(String),
                        created_at: expect.any(String),
                        votes: expect.any(Number),
                        comments_count: 13
                    }));
                });
        });

        test('DELETE ARTICLE BY ID- status 204 - deletes the article and associated comments at parametric endpoint specified', () => {
            return request(app)
                .delete('/api/articles/1')
                .expect(204)
                .then(() => {
                    return request(app)
                        .get('/api/articles/1')
                        .expect(400)
                }).then((res) => {
                    expect(res.body).toEqual({ "msg": "Not Found - Bad request - article_id does not exist in database" }
                    )
                }).then(() => {
                    //once I have a comment endpoint in place, I can check that the comments are getting destroyed. They are, since no conflict, but I would like to be able to prove that through express.
                })
        });

        test('PATCH ARTICLE VOTE PROPERTY BY ID - status 201 - accepts a body formatted { inc_votes : number }, and increments the vote property of the article selected by the number specified if the number is positive', () => {
            const incrementVote = { inc_votes: 1 }
            return request(app)
                .patch('/api/articles/1')
                .send(incrementVote)
                .expect(200)
                .then((patchedArticle) => {
                    expect(patchedArticle.body.article).toEqual(expect.objectContaining({
                        author: expect.any(String),
                        title: expect.any(String),
                        article_id: 1,
                        body: expect.any(String),
                        topic: expect.any(String),
                        created_at: expect.any(String),
                        votes: 101,
                    }))
                });
        });

        test('PATCH ARTICLE VOTE PROPERTY BY ID - status 201 - accepts a body formatted { inc_votes : number }, and decrements the vote property of the article selected by the number specified if the number is negative', () => {
            const incrementVote = { inc_votes: -10 }
            return request(app)
                .patch('/api/articles/1')
                .send(incrementVote)
                .expect(200)
                .then((patchedArticle) => {
                    expect(patchedArticle.body.article).toEqual(expect.objectContaining({
                        author: expect.any(String),
                        title: expect.any(String),
                        article_id: 1,
                        body: expect.any(String),
                        topic: expect.any(String),
                        created_at: expect.any(String),
                        votes: 90,
                    }))
                });
        });

        test.skip('PATCH ARTICLE VOTE PROPERTY BY ID - status 201 - the number of votes cannot go below zero', () => {
            const incrementVote = { inc_votes: -110 }
            return request(app)
                .patch('/api/articles/1')
                .send(incrementVote)
                .expect(200)
                .then((patchedArticle) => {
                    expect(patchedArticle.body.article).toEqual(expect.objectContaining({
                        author: expect.any(String),
                        title: expect.any(String),
                        article_id: 1,
                        body: expect.any(String),
                        topic: expect.any(String),
                        created_at: expect.any(String),
                        votes: 0,
                    }))
                });
        });

        test('GET ALL ARTICLES - status 200 - gets all of the articles and returns them as object containing the following properties {author, title, article_id, topic, created_at, votes, comments_count}', () => {
            return request(app)
                .get('/api/articles')
                .expect(200)
                .then((articles) => {
                    expect(articles.body.articles.length).toBe(12);
                    expect(articles.body.articles[0]).toEqual(expect.objectContaining({
                        author: expect.any(String),
                        title: expect.any(String),
                        article_id: expect.any(Number),
                        body: expect.any(String),
                        topic: expect.any(String),
                        created_at: expect.any(String),
                        votes: expect.any(Number)
                    }))
                });
        });

        test('GET ALL ARTICLES - status 200 - the order of the array of article objects defaults to being sorted by date if no queries are introduced', () => {
            return request(app)
                .get('/api/articles')
                .expect(200)
                .then((articles) => {
                    expect(articles.body.articles).toBeSortedBy('created_at', { descending: true });
                    expect(articles.body.articles[0]).toEqual(expect.objectContaining({
                        article_id: 1
                    }))
                });

        });

        test('GET ALL ARTICLES - status 200 - the order of the array of article objects changes depending on the query', () => {
            return request(app)
                .get('/api/articles?order=asc')
                .expect(200)
                .then((articles) => {
                    expect(articles.body.articles).toBeSortedBy('created_at', { ascending: true });
                    expect(articles.body.articles[0]).toEqual(expect.objectContaining({
                        article_id: 12
                    }));
                });
        });

        test('GET ALL ARTICLES - status 200 - if an author query is made, responds with the articles associated with the author specified', () => {
            return request(app)
                .get('/api/articles?author=rogersop')
                .expect(200)
                .then((articles) => {
                    const articlesLength = articles.body.articles.length;
                    for (let i = 0; i < articlesLength; i++) {
                        expect(articles.body.articles[0]).toEqual(expect.objectContaining({
                            author: 'rogersop'
                        }));
                    }
                });
        });

        test('GET ALL ARTICLES - status 200 - if a topic query is made, responds with the articles associated with the author specified', () => {
            return request(app)
                .get('/api/articles?topic=mitch')
                .expect(200)
                .then((articles) => {
                    const articlesLength = articles.body.articles.length;
                    for (let i = 0; i < articlesLength; i++) {
                        expect(articles.body.articles[i]).toEqual(expect.objectContaining({
                            topic: 'mitch'
                        }));
                    }
                });
        });

        test('POST NEW ARTICLE - status 201 - post a new article object formatted properly, with the following properties {author, title, article_id, body, topic, created_at, votes} if the author & slug don\'t already exist in the database', () => {
            const postArticle = {
                username: "JaneDoe",
                name: "Claire",
                title: "How I got into coding",
                body: "'Tis a long story",
                topic: "Life stories",
                slug: 'code'
            }
            return request(app)
                .post('/api/articles')
                .send(postArticle)
                .expect(201)
                .then((article) => {
                    expect(article.body.article).toEqual(expect.objectContaining({
                        author: "JaneDoe",
                        title: "How I got into coding",
                        article_id: expect.any(Number),
                        body: "'Tis a long story",
                        topic: "code",
                        created_at: expect.any(String),
                        votes: expect.any(Number),
                        comments_count: 0
                    }))
                })

        });

        test('POST NEW ARTICLE - status 201 - the function still works and post a new article if the author already exists in the database', () => {
            const postArticleTwo = {
                username: "butter_bridge",
                name: "jonny",
                title: "How I got into coding",
                body: "'Tis a long story",
                topic: "Life stories",
                slug: 'code'
            }
            return request(app)
                .post('/api/articles')
                .send(postArticleTwo)
                .expect(201)
                .then((article) => {
                    expect(article.body.article).toEqual(expect.objectContaining({
                        author: "butter_bridge",
                        title: "How I got into coding",
                        article_id: expect.any(Number),
                        body: "'Tis a long story",
                        topic: "code",
                        created_at: expect.any(String),
                        comments_count: 0,
                        votes: expect.any(Number)
                    }))
                })
        });

        test('POST NEW ARTICLE - status 201 - the function still works and post a new article if the slug already exists in the database', () => {
            const postArticleTwo = {
                username: "JaneDoe",
                name: "Claire",
                title: "How I got into coding",
                body: "'Tis a long story",
                topic: "Life stories",
                slug: 'mitch'
            }
            return request(app)
                .post('/api/articles')
                .send(postArticleTwo)
                .expect(201)
                .then((article) => {
                    expect(article.body.article).toEqual(expect.objectContaining({
                        author: "JaneDoe",
                        title: "How I got into coding",
                        article_id: expect.any(Number),
                        body: "'Tis a long story",
                        topic: "mitch",
                        created_at: expect.any(String),
                        comments_count: 0,
                        votes: expect.any(Number)
                    }))
                })
        });

        test('ERROR GET ALL ARTICLES - status 404 - if a query is made to a topic that doesn\'t exist, return 404', () => {
            return request(app)
                .get('/api/articles?topic=bananas')
                .expect(404)
                .then((errorMessage) => {
                    expect(errorMessage.body).toEqual({
                        'msg': 'Not Found - the topic entered does not match any topics in the database'
                    });
                });
        });

        test('ERROR GET ALL ARTICLES - status 404 - if a query is made to a topic that doesn\'t exist, return 404', () => {
            return request(app)
                .get('/api/articles?author=bananas')
                .expect(404)
                .then((errorMessage) => {
                    expect(errorMessage.body).toEqual({
                        'msg': 'Not Found - the author entered does not match any authors in the database'
                    });
                });
        });

        test('ERROR GET ARTICLE BY ID - 404 - Invalid parametric endpoint input, the path is correct, but the input does not correspond to anything in the database', () => {
            return request(app)
                .get('/api/articles/109')
                .expect(400)
                .then((errorMessage) => {
                    expect(errorMessage.body).toEqual(
                        { "msg": "Not Found - Bad request - article_id does not exist in database" }

                    );
                });
        });

        test('ERROR GET ARTICLE BY ID - 404 - Invalid parametric endpoint input, article_id is not a number', () => {
            return request(app)
                .get('/api/articles/bananas')
                .expect(400)
                .then((errorMessage) => {
                    expect(errorMessage.body).toEqual(
                        { "msg": "Not Found - Bad request - article_id must be a number and exist in the database" }

                    );
                });
        });

        test('ERROR DELETE ARTICLE BY ID - 404 - Invalid parametric endpoint input, the path is correct, but the input does not correspond to anything in the database', () => {
            return request(app)
                .delete('/api/articles/109')
                .expect(404)
                .then((errorMessage) => {
                    expect(errorMessage.body).toEqual(
                        { "msg": "Not Found - can't delete article if article_id does not exist in database" }
                    );
                });
        });

        test('ERROR PATCH ARTICLE VOTE PROPERTY BY ID - status 400 Bad Request - the body on the request is not formatted properly, and thus, can\'t patch the article object', () => {
            const wrongReq = { 'wrong input': 'is not going to work' }
            return request(app)
                .patch('/api/articles/1')
                .send(wrongReq)
                .expect(400)
                .then((errorMessage) => {
                    expect(errorMessage.body).toEqual(
                        { "msg": "Incorrect request - request must be formatted to conform to following model : {inc_votes : vote_number}" })
                });
        });

        test('ERROR PATCH ARTICLE VOTE PROPERTY BY ID - status 400 Bad Request - when an error is sent, the vote property is not incremented at all', () => {
            const wrongReq = { 'wrong input': 'is not going to work' }
            return request(app)
                .patch('/api/articles/1')
                .send(wrongReq)
                .expect(400)
                .then(() => {
                    return request(app)
                        .get('/api/articles/1')
                        .expect(200)
                        .then((article) => {
                            expect(article.body.article).toEqual(expect.objectContaining({
                                votes: 100
                            }))
                        });
                });
        });

        describe('INVALID METHODS', () => {
            test('ERROR INVALID METHOD - status 405 - the user tried to use a method that is not defined on the router for url /api/articles', () => {
                const invalidMethods = ['put', 'patch', 'delete']
                const methodPromise = invalidMethods.map((method) => {
                    return request(app)
                    [method]('/api/articles')
                    .expect(405)
                    .then((errorMessage) => {
                        expect(errorMessage.body).toEqual({ 'message' : 'Method not allowed'})
                    });
                });
                return Promise.all(methodPromise);
            });

            test('ERROR INVALID METHOD - status 405 - the user tried to use a method that is not defined on the router for url /api/articles/:article', () => {
                const invalidMethods = ['put', 'post']
                const methodPromise = invalidMethods.map((method) => {
                    return request(app)
                    [method]('/api/articles/1')
                    .expect(405)
                    .then((errorMessage) => {
                        console.log(errorMessage.body)
                        expect(errorMessage.body).toEqual({ 'message' : 'Method not allowed'})
                    });
                });
                return Promise.all(methodPromise);
            });
        });
    });

    describe('/api/articles/comments', () => {
        test('POST COMMENTS ON ARTICLE SELECTED BY ID - status 201 - takes a post request formatted as {username, body} and posts a comment that references the appropriate article in the database', () => {
            const input = { username: "icellusedkars", body: "I think therefore I am" };

            return request(app)
                .post('/api/articles/1/comments')
                .send(input)
                .expect(201)
                .then((commentPosted) => {
                    expect(commentPosted.body.comment).toEqual(expect.objectContaining({
                        comment_id: expect.any(Number),
                        author: 'icellusedkars',
                        article_id: 1,
                        body: 'I think therefore I am',
                        created_at: expect.any(String),
                        votes: 0,
                    }))
                })
        });

        test('GET ALL THE COMMENTS FOR ARTICLE SELECTED BY ID - status 200 - get all the comments associated with a particular article', () => {
            return request(app)
                .get('/api/articles/1/comments')
                .expect(200)
                .then((comments) => {
                    expect(comments.body.comments.length).toBe(13);
                    expect(comments.body.comments[0]).toEqual(expect.objectContaining({
                        comment_id: expect.any(Number),
                        author: expect.any(String),
                        article_id: 1,
                        body: expect.any(String),
                        created_at: expect.any(String),
                        votes: expect.any(Number),
                    }))
                });
        });

        test('GET ALL THE COMMENTS FOR ARTICLE SELECTED BY ID - status 200 - comments are sorted according to their created_at property in descending order by default', () => {
            return request(app)
                .get('/api/articles/1/comments')
                .expect(200)
                .then((comments) => {
                    expect(comments).toBeSortedBy('created_at', {descending : true});
                });
        });

        test('GET ALL THE COMMENTS FOR ARTICLE SELECTED BY ID - status 200 - comments are sorted according to their created_at property by default, and respond to query for asc or desc order', () => {
            return request(app)
                .get('/api/articles/1/comments?order=asc')
                .expect(200)
                .then((comments) => {
                    expect(comments).toBeSortedBy('created_at', { ascending: true });
                });
        });

        test('ERROR POST COMMENTS ON ARTICLE SELECTED BY ID - status 400 Bad Request - the body on the request is not formatted properly, and thus, can\'t post the comment', () => {
            const wrongReq = {
                'wrong input': 'is not going to work',
                'wrong input 2': 'still not going to work'
            }

            return request(app)
                .post('/api/articles/1/comments')
                .send(wrongReq)
                .expect(400)
                .then((errorMessage) => {
                    expect(errorMessage.body).toEqual(
                        { "msg": "Incorrect request - request must be formatted to conform to following model : {username, body}" })
                })
        });

        test('ERROR POST COMMENTS ON ARTICLE SELECTED BY ID - status 404 Not Found - the article_id on the request does not correspond to an existing article, and thus, can\'t post a comment', () => {
            const input = { username: "icellusedkars", body: "I think therefore I am" };

            return request(app)
                .post('/api/articles/900000/comments')
                .send(input)
                .expect(404)
                .then((errorMessage) => {
                    expect(errorMessage.body).toEqual(
                        { "msg": 'Not Found - can\'t post comment if article_id does not exist in database' })
                })
        });

        test('ERROR POST COMMENTS ON ARTICLE SELECTED BY ID - status 400 Bad Request - the article_id on the request is not a number', () => {
            const input = { username: "icellusedkars", body: "I think therefore I am" };

            return request(app)
                .post('/api/articles/not-a-valid-id/comments')
                .send(input)
                .expect(400)
                .then((errorMessage) => {
                    expect(errorMessage.body).toEqual(
                        { "msg": 'Bad request - article_id must be a number' })
                })
        });


        test('ERROR GET ALL THE COMMENTS FOR ARTICLE SELECTED BY ID - status 404 Not Found - the article_id on the request does not correspond to an existing article, and thus, can\'t get the comments associated with it', () => {
            return request(app)
                .get('/api/articles/10000/comments')
                .expect(404)
                .then((errorMessage) => {
                    expect(errorMessage.body).toEqual({ msg: 'Not Found - can\'t return comments if article_id does not exist in database' })
                });
        });

        test('ERROR - status 404 - if a user inputs a url that does not correspond to en endpoint', () => {
            return request(app)
                .get('/api/articles/comments/not-a-route')
                .expect(404)
                .then(({ body }) => {
                    expect(body.message).toBe('Not Found - the url entered does not match any content');
                });
        });

        describe('INVALID METHODS', () => {
            test('ERROR INVALID METHOD - status 405 - the user tried to use a method that is not defined on the router for the /api/articles/:article_id/comments', () => {
                const invalidMethods = ['put', 'patch']
                const methodPromise = invalidMethods.map((method) => {
                    return request(app)
                    [method]('/api/articles/1/comments')
                    .expect(405)
                    .then((errorMessage) => {
                        expect(errorMessage.body).toEqual({ 'message' : 'Method not allowed'})
                    });
                });
                return Promise.all(methodPromise);
            });
        })
    }); //describe
});


describe('/not-a-route', () => {
    test('ERROR - status 404 - if a user inputs a url that does not correspond to en endpoint', () => {
        return request(app)
            .get('/not-a-route')
            .expect(404)
            .then(({body}) => {
                expect(body.message).toBe('Not Found - the url entered does not match any content');
            });
    });
});

afterAll(() => {
    return connection.destroy();
});