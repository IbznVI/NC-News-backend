const request = require("supertest");
const db = require("../db/connection");
const app = require("../app");
const seed = require("../db/seeds/seed");
const data = require("../db/data/test-data/index")

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
            expect(endpoints).toHaveProperty("GET /api");
            expect(endpoints).toHaveProperty("GET /api/topics");
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