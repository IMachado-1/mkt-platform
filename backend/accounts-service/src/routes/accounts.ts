import { Router, Request, Response } from "express";
import accountsController from '../controllers/accounts';
import { accountSchema, loginSchema } from "../models/account";
import joi from 'joi';

//Futuramente extrair validações para um modulo isolado
function validateSchema(schema: joi.ObjectSchema<any> ,req: Request, res: Response, next: any): any{
    const {error} = schema.validate(req.body);
    if(error == null) return next();

    const {details} = error;
    const message = details.map(item => item.message).join(',');

    console.log(message)
    res.status(422).end();
};

function validateAccount(req: Request, res: Response, next: any){
    return validateSchema(accountSchema, req, res, next);    
};

function validadeLogin(req: Request, res: Response, next: any){
    return validateSchema(loginSchema, req, res, next);    
};

const router = Router();

router.get('/accounts/', accountsController.getAccounts);
router.get('/accounts/:id', accountsController.getAccount);
router.patch('/accounts/:id', validateAccount, accountsController.setAccount);
router.post('/accounts/', validateAccount, accountsController.addAccount);
router.post('/accounts/login', validadeLogin, accountsController.loginAccount);
router.post('/accounts/logout', accountsController.logoutAccount);

export default router;