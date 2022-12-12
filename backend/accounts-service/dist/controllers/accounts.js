"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
//accountRepository para chamada de funções(assincronas)
const accountModel_1 = __importDefault(require("../models/accountModel"));
const accounts = []; // declarando array de account do tipo account, para teste do addAccount
function getAccounts(req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        const accounts = yield accountModel_1.default.findAll();
        res.json(accounts.map(item => {
            item.password = '';
            return item;
        }));
    });
}
function getAccount(req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const id = parseInt(req.params.id);
            if (!id) {
                throw new Error("ID is invalid format");
            }
            const account = yield accountModel_1.default.findById(id);
            if (account === null) {
                return res.status(404).end();
            }
            else {
                account.password = '';
                return res.json(account);
            }
        }
        catch (error) {
            console.log(`getAccount ${error}`);
            res.status(400).end();
        }
    });
}
function addAccount(req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            // a interface apenas disponibiliza a visulização dos atributos do tipo IAccout
            const newAccount = req.body;
            const result = yield accountModel_1.default.add(newAccount);
            newAccount.password = '';
            newAccount.id = result.id;
            res.status(201).json(newAccount);
        }
        catch (error) {
            console.log(error);
            res.status(400).end;
        }
    });
}
function setAccount(req, res, next) {
    try {
        const id = parseInt(req.params.id);
        if (!id)
            throw new Error('ID is invalid format.'); //Solicitação incorreta 400
        const accountParams = req.body;
        const index = accounts.findIndex(item => item.id === id);
        const orinalAccount = accounts[index];
        if (index === -1)
            return res.status(404).end();
        if (accountParams.name)
            orinalAccount.name = accountParams.name;
        if (accountParams.password)
            orinalAccount.password = accountParams.password;
        accounts[index] = orinalAccount;
        res.status(200).json(orinalAccount);
    }
    catch (error) {
        console.log(error);
        res.status(400).end();
    }
}
function loginAccount(req, res, next) {
    try {
        const loginParams = req.body;
        const index = accounts.findIndex(item => item.email === loginParams.email && item.password === loginParams.password);
        if (index === -1)
            return res.status(401).end();
        res.json({ auth: true, token: {} });
    }
    catch (error) {
        console.log(error);
        res.status(400).end();
    }
}
function logoutAccount(req, res, next) {
    res.json({ auth: false, token: null });
}
exports.default = { getAccounts, getAccount, addAccount, setAccount, loginAccount, logoutAccount };
