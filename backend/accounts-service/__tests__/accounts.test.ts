import {expect, describe, it} from '@jest/globals'
//import { describe, it } from 'node:test'
import request from 'supertest'
import app from './../src/app'

describe('Testando rotas accounts', () =>{
    
    it('GET /accounts/ Deve retornar statuscode 200', async() =>{
        const resultado = await request(app)
        .get('/accounts/');

        expect(resultado.status).toEqual(200);
        expect(Array.isArray(resultado.body)).toBeTruthy();
    })
    
    it('POST /accounts/ - Deve retornar statusCode 201', async () =>{
        const payload = {
            id: 1,
            name: 'Italo',
            email: 'italo.teste@gmail.com',
            password: "123456",
            status : 100
        }

        const resultado = await request(app)
            .post('/accounts')
            .send(payload);

        expect(resultado.status).toEqual(201);
        expect(resultado.body.id).toBe(1);
    })

    it('POST /accounts/ - Deve retornar statusCode 422', async () =>{
        const payload = {
            id: 1,
            street: 'Rua abc',
            city: 'Brasilândia',
            status: 1
        }

        const resultado = await request(app)
            .post('/accounts').send(payload);

        expect(resultado.status).toEqual(422);
    })

    it('GET /accounts/:id Deve retornar statuscode 200', async() =>{
        const resultado = await request(app)
        .get('/accounts/1');

        expect(resultado.status).toEqual(200);
        expect(resultado.body.id).toBe(1);
    })

    it('GET /accounts/:id Deve retornar statuscode 404', async() =>{
        const resultado = await request(app)
        .get('/accounts/2');

        expect(resultado.status).toEqual(404);
    })

    it('GET /accounts/:id Deve retornar statuscode 400', async() =>{
        const resultado = await request(app)
        .get('/accounts/string');

        expect(resultado.status).toEqual(400);
    })
})