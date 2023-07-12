import supertest from "supertest";
import app from "../src/index";

const server = supertest(app);

describe("api", () => {

    describe("post fruits", () => {
        it("201 when inserting a fruit", async () => {
            const body = {
                name: "banana",
                price: 10
            };
            const resultadoPost = await server.post("/fruits").send(body);
    
            expect(resultadoPost.status).toBe(201);
        });
    
        it("409 when inserting a fruit that is already registered", async () => {
            const body = {
                name: "banana",
                price: 10
            };
            const resultadoPost = await server.post("/fruits").send(body);
    
            expect(resultadoPost.status).toBe(409);
        });
    
        it("422 when inserting a fruit with data missing", async () => {
            const body = {
            };
            const resultadoPost = await server.post("/fruits").send(body);
    
            expect(resultadoPost.status).toBe(422);
        });
    });

    describe("get fruits", () => {

        it("404 when trying to get a fruit that doesn't exists", async () => {

            const resultado = await server.get("/fruits/2");
    
            expect(resultado.status).toBe(404);
        });

        it("400 when id param is not valid", async () => {

            const resultado = await server.get("/fruits/a");
    
            expect(resultado.status).toBe(400);
        });
        
        it("return a fruit given an id", async () => {
            const id = 1;
            const resultado = await server.get(`/fruits/${id}`);
            
            expect(resultado.status).toBe(200);
            expect(resultado.body.id).toBe(id);
        });

        it("return all fruits", async () => {
            const resultado = await server.get(`/fruits`);
            
            expect(resultado.status).toBe(200);
            expect(resultado.body).toEqual(expect.arrayContaining(
                [expect.objectContaining({
                    id: expect.any(Number),
                    name: expect.any(String),
                    price: expect.any(Number)
                })]
            ));
        });
    });

});