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
    test("404: responds with the correct error when an invalid api request is made", ()=> {
        return request(app)
        .get("/api/fail-test")
        .expect(404)
        .then(({ body: {msg} })=> {
            expect(msg).toBe("Not found: API not found")
        })
    })
});


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