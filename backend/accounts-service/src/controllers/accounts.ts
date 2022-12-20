import {Request, Response} from 'express';
import {IAccount} from '../models/account';
//accountRepository para chamada de funções(assincronas)
import repository from '../models/accountModel';



const accounts: IAccount[] = []; // declarando array de account do tipo account, para teste do addAccount

async function getAccounts(req: Request, res: Response, next: any){
    const accounts = await repository.findAll();

    res.json(accounts.map(item => {//zerando as senhas para retornalas
        item.password = '';
        return item;
    }));
}

async function getAccount(req: Request, res: Response, next: any){
    try {
        const id = parseInt(req.params.id);
        if(!id){  
            throw new Error("ID is invalid format");
        }

        const account = await repository.findById(id);
        if (account === null) {
            return res.status(404).end();
        } else {
            account.password = '';
            return res.json(account);
        } 
    } catch (error) {
        console.log(`getAccount ${error}`);
        res.status(400).end();
    }
}

async function addAccount(req: Request, res: Response, next: any){
    try {
    // a interface apenas disponibiliza a visulização dos atributos do tipo IAccout
        const newAccount = req.body as IAccount;
        const result = await repository.add(newAccount);
        newAccount.password = '';
        newAccount.id = result.id;
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