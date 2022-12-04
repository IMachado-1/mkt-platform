import {expect, describe, it} from '@jest/globals'
import {soma} from '../src/soma'

describe('A soma de 2+1 deve retornar 3', () => {
    it('Testando soma de 2 + 1, deve ser 3', () => {
        const resultado = soma(1, 2);

        expect(resultado).toEqual(3);
    })
})