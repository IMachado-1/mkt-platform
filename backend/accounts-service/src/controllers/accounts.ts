import {Request, Response} from 'express';
import { func } from 'joi';
import {IAccount} from '../models/account';

const accounts: IAccount[] = []; // declarando array de account do tipo account, para teste do addAccount

function getAccounts(req: Request, res: Response, next: any){
    res.json(accounts);
}

function getAccount(req: Request, res: Response, next: any){
    try {
        const id = parseInt(req.params.id);
        if(!id){ 
            throw new Error("ID is invalid format");
        }

        const index = accounts.findIndex(item => item.id === id);
        if (index === -1) {
            return res.status(404).end();
        } else {
            return res.json(accounts[index]);
        } 
    } catch (error) {
        console.log(error);
        res.status(400).end();
    }
}

function addAccount(req: Request, res: Response, next: any){
    try {
    // a interface apenas disponibiliza a visulização dos atributos do tipo IAccout
        const newAccount = req.body as IAccount;
        accounts.push(newAccount);
        res.status(201).json(newAccount);
    } catch (error) {
        console.log(error);
        res.status(400).end;
    }

}
    
function setAccount(req: Request, res: Response, next: any){
    try {
        
        const id = parseInt(req.params.id);
        if(!id) throw new Error('ID is invalid format.');//Solicitação incorreta 400
        const accountParams = req.body as IAccount;
        const index = accounts.findIndex(item => item.id === id);
        const orinalAccount = accounts[index];

        if(index === -1) return res.status(404).end();
        if(accountParams.name) orinalAccount.name = accountParams.name;
        if(accountParams.password) orinalAccount.password = accountParams.password;

        accounts[index] = orinalAccount;
        res.status(200).json(orinalAccount);

    } catch (error) {
        console.log(error);
        res.status(400).end();
    }
}

function loginAccount(req: Request, res: Response, next: any){
    try {
        const loginParams = req.body as IAccount;
        const index = accounts.findIndex(item =>item.email === loginParams.email && item.password === loginParams.password);
        if(index === -1) return res.status(401).end();

        res.json({auth: true, token: {}});
    } catch (error) {
        console.log(error);
        res.status(400).end();
    }
}

function logoutAccount(req: Request, res: Response, next: any){
    res.json({auth: false, token: null});
}

export default {getAccounts, getAccount, addAccount, setAccount, loginAccount, logoutAccount}