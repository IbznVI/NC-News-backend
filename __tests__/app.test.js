const request = require("supertest");
const db = require("../db/connection");
const app = require("../app");
const seed = require("../db/seeds/seed");
const data = require("../db/data/test-data/index")
const endpointsJSON = require("../endpoints.json");

beforeEach(()=> {
    return seed(data);
})

afterAll(()=>{
    return db.end();
})

describe("GET /api/topics", ()=> {
    test("200: responds with an array of topic objects with the correct properties of slug and description", () => {
        return request(app)
        .get("/api/topics")
        .expect(200)
        .then((response) => {
            const { body: { topics }} = response;
            expect(Array.isArray(topics)).toBe(true)
            expect(topics).toHaveLength(3);
            topics.forEach((topic)=>{
                expect(topic).toHaveProperty("slug", expect.any(String))
                expect(topic).toHaveProperty("description", expect.any(String))
            });
        });
    });
});


describe("GET /api invalid endpoints", ()=> {
    test("404: responds with the correct error when an invalid api request is made", ()=> {
        return request(app)
        .get("/api/fail-test")
        .expect(404)
        .then(({ body: {msg} })=> {
            expect(msg).toBe("Not found")
        })
    })
})

describe("GET /api endpoints", ()=> {
    test("200: responds with the correct endpoints", () => {
        return request(app)
        .get("/api")
        .expect(200)
        .then(({ body: { endpoints }}) => {
            expect(endpoints).toEqual(endpointsJSON)
        });
    });
});

describe("GET /api/articles/article_id:", ()=> {
    test("200: responds with the article requested with all of its contents", () => {
        return request(app)
        .get("/api/articles/1")
        .expect(200)
        .then((response) => {
            const expectedContents = {
                article_id: 1,
                title: 'Living in the shadow of a great man',
                topic: 'mitch',
                author: 'butter_bridge',
                body: 'I find this existence challenging',
                created_at: '2020-07-09T20:11:00.000Z',
                votes: 100,
                article_img_url: 'https://images.pexels.com/photos/158651/news-newsletter-newspaper-information-158651.jpeg?w=700&h=700'
              }
            const { body: { article }} = response;
            expect(typeof (article)).toBe("object")
            expect(article).toEqual(expectedContents)
        });
     })
     test("404: returns the correct error message when a non existing id is input", ()=> {
        return request(app)
        .get("/api/articles/100")
        .expect(404)
        .then(({ body: {msg} }) => {
            expect(msg).toBe("Not found")
        })
     });
     test("400: returns the correct error message when invalid id is input", ()=> {
        return request(app)
        .get("/api/articles/not-a-number")
        .expect(400)
        .then(({ body: {msg} }) => {
            expect(msg).toBe("Bad Request")
        })
     });
});


describe("GET /api/articles", ()=> {
    test("200: responds with an array of article objects with the correct properties including the comments", () => {
        return request(app)
        .get("/api/articles")
        .expect(200)
        .then((response) => {
            const { body: { articles }} = response;
            expect(Array.isArray(articles)).toBe(true)
            expect(articles).toHaveLength(13);
            articles.forEach((article)=>{
                expect(article).toHaveProperty("author", expect.any(String))
                expect(article).toHaveProperty("title", expect.any(String))
                expect(article).toHaveProperty("article_id", expect.any(Number))
                expect(article).toHaveProperty("topic", expect.any(String))
                expect(article).toHaveProperty("created_at", expect.any(String))
                expect(article).toHaveProperty("votes", expect.any(Number))
                expect(article).toHaveProperty("article_img_url", expect.any(String))
                expect(article).toHaveProperty("comment_count", expect.any(String))
            });
        });
    })
    test("200: responds with the articles decending by date order", ()=>{
        return request(app)
        .get("/api/articles")
        .expect(200)
        .then((response)=>{
            const { body: { articles }} = response;
            expect(articles).toBeSortedBy("created_at", { descending: true })
        });
    });
    test("200: responds with the articles without a body property present", ()=>{
        return request(app)
        .get("/api/articles")
        .expect(200)
        .then((response)=>{
            const { body: { articles }} = response;
            articles.forEach((article)=>{
                expect(article).not.toHaveProperty("body")
            })
        });
    })
});

describe("GET /api/articles/:article_id/comments", ()=> {
    test("200: responds with an array of comments for the given article_id containing the correct properties", () => {
        return request(app)
        .get("/api/articles/1/comments")
        .expect(200)
        .then((response) => {
            const { body: {comments}} = response
            expect(Array.isArray(comments)).toBe(true)
            expect(comments.length === 11).toBe(true)
            comments.forEach((comment)=>{
                expect(comment).toHaveProperty("comment_id", expect.any(Number));
                expect(comment).toHaveProperty("votes", expect.any(Number));
                expect(comment).toHaveProperty("created_at", expect.any(String));
                expect(comment).toHaveProperty("author", expect.any(String));
                expect(comment).toHaveProperty("body", expect.any(String));
                expect(comment).toHaveProperty("article_id", expect.any(Number));
            })
        });
    });
    test("200: comments are served with the most recent comment first (Sorted by descending order)", ()=>{
        return request(app)
        .get("/api/articles/1/comments")
        .expect(200)
        .then((response)=>{
            const { body: {comments}} = response 
            expect(comments).toBeSortedBy("created_at", {descending: true})
        })
    })
    test("404: returns the correct error message when a non existing id is input", ()=> {
        return request(app)
        .get("/api/articles/100/comments")
        .expect(404)
        .then(({ body: {msg} }) => {
            expect(msg).toBe("Not found")
        })
     });
     test("400: returns the correct error message when invalid id is input", ()=> {
        return request(app)
        .get("/api/articles/not-a-number/comments")
        .expect(400)
        .then(({ body: {msg} }) => {
            expect(msg).toBe("Bad Request")
        })
     });
});

describe("POST /api/articles/:article_id/comments", ()=> {
    test("201: posts a comment for the article id that was input", () => {
        const testComment = {
            username: "icellusedkars",
            body: "Great Website"
        };
        return request(app)
        .post("/api/articles/9/comments")
        .send(testComment)
        .expect(201)
        .then((response) => {
            const { body: { comment }} = response
            expect(comment).toEqual(
                expect.objectContaining({
                    body: "Great Website",
                    votes: 0,
                    author: "icellusedkars",
                    article_id: 9,
                    created_at: expect.any(String),
                    comment_id: expect.any(Number),
                })
            )
        });
    });
     test("400: returns the correct error message when invalid id is input", ()=> {
        return request(app)
        .post("/api/articles/not-a-number/comments")
        .send(({ username: "icellusedkars", body: "Great Website"}))
        .expect(400)
        .then(({ body: {msg} }) => {
            expect(msg).toBe("Bad Request")
        })
     });
});


describe("PATCH /api/articles/:article_id", ()=> {
    test("200: patches the vote on the article requested", () => {
        return request(app)
        .patch("/api/articles/1")
        .send({ inc_votes: 10})
        .expect(200)
        .then((response) => {
            const { body: { article }} = response
            expect(article).toEqual(
                expect.objectContaining({
                    article_id: 1,
                    votes: 110
                })
            )
        });
    });
     test("400: returns the correct error message when invalid id is input", ()=> {
        return request(app)
        .patch("/api/articles/not-a-number")
        .send({ inc_votes: 10})
        .expect(400)
        .then(({ body: {msg} }) => {
            expect(msg).toBe("Bad Request")
        })
     });
     test("400: returns the correct error message when invalid data type is input", ()=> {
        return request(app)
        .patch("/api/articles/1")
        .send({ inc_votes: "Not-a-number"})
        .expect(400)
        .then(({ body: {msg} }) => {
            expect(msg).toBe("Bad Request")
        })
     });
     test("400: returns the correct error message when a non existing id is input", ()=> {
        return request(app)
        .patch("/api/articles/100")
        .send({ inc_votes: "Not-a-number"})
        .expect(400)
        .then(({ body: {msg} }) => {
            expect(msg).toBe("Bad Request")
        })
     });
});

describe("DELETE /api/comments/:comment_id", ()=> {
    test("204: responds with 204", () => {
        return request(app)
        .delete("/api/comments/1")
        .expect(204)
    });
    test("404: returns the correct error message when a non existing id is input", ()=> {
        return request(app)
        .delete("/api/comments/100000")
        .expect(404)
        .then(({ body: {msg} }) => {
            expect(msg).toBe("Not found")
        })
     });
});
