//Testes relativos a rotas de autenticação.
import {expect, describe, it} from '@jest/globals'
import request from 'supertest'
import app from '../src/app'

describe('Testando rotas de autenticação', () =>{
    it('POST /accounts/login - 201 OK', async () =>{
        //mocking
        const newAccount ={
            id: 1,
            name: 'Italo',
            email: 'italo.teste@gmail.com',
            password: '1234567'
        }
    
        await request(app)
            .post('/accounts/')
            .send(newAccount);
    
        //testing
        const payload ={
            email: 'italo.teste@gmail.com',
            password: '1234567'
        }

        const resultado = await request(app)
            .post('/accounts/login')
            .send(payload);

        expect(resultado.status).toEqual(200);
        expect(resultado.body.auth).toBeTruthy();
        expect(resultado.body.token).toBeTruthy();
    })

    it('POST /accounts/login - 401 Unauthorized', async () =>{
        const payload ={
            email: 'italo.teste@gmail.com',
            password: '8564321' //Senha errada
        }
    
        const resultado = await request(app)
            .post('/accounts/login')
            .send(payload);
    
        expect(resultado.status).toEqual(401);
    })

    it('POST /accounts/login - 422 Unprocessable entity', async () =>{
        const payload ={
            email: 'italo.teste@gmail.com',
            password: '123' //Senha curta
        }
    
        const resultado = await request(app)
            .post('/accounts/login')
            .send(payload);
    
        expect(resultado.status).toEqual(422);
    })

    it('POST /accounts/logout - Deve retornar statusCode 200', async () =>{
        
        const resultado = await request(app)
            .post('/accounts/logout')
          
        expect(resultado.status).toEqual(200);
    })
})

