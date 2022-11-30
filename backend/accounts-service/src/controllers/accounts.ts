import {Request, Response} from 'express';
import {IAccount} from '../models/account';

const accounts: IAccount[] = []; // declarando array de account do tipo account, para teste do addAccount

function getAccounts(req: Request, res: Response, next: any){
    res.json(accounts);
}

function getAccount(req: Request, res: Response, next: any){
    const id = parseInt(req.params.id);
    const index = accounts.findIndex(item => item.id === id);
    try {
        if (index === 1) {
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
        //typecasting do body para a interface IAccount(Assegurando que seja seguido a interface)
        const newAccount = req.body as IAccount;
        accounts.push(newAccount);
        res.status(201).json(newAccount);
    } catch (error) {
        console.log(error);
        res.status(400).end;
    }

}
    
export default {getAccounts, getAccount, addAccount}