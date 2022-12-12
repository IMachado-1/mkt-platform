"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const accounts_1 = __importDefault(require("../controllers/accounts"));
const accountSchemas_1 = require("../models/accountSchemas");
//Futuramente extrair validações para um modulo isolado
function validateSchema(schema, req, res, next) {
    const { error } = schema.validate(req.body);
    if (error == null)
        return next();
    const { details } = error;
    const message = details.map(item => item.message).join(',');
    console.log(message);
    res.status(422).end();
}
;
function validateAccount(req, res, next) {
    return validateSchema(accountSchemas_1.accountSchema, req, res, next);
}
;
function validadeLogin(req, res, next) {
    return validateSchema(accountSchemas_1.loginSchema, req, res, next);
}
;
const router = (0, express_1.Router)();
router.get('/accounts/', accounts_1.default.getAccounts);
router.get('/accounts/:id', accounts_1.default.getAccount);
router.patch('/accounts/:id', validateAccount, accounts_1.default.setAccount);
router.post('/accounts/', validateAccount, accounts_1.default.addAccount);
router.post('/accounts/login', validadeLogin, accounts_1.default.loginAccount);
router.post('/accounts/logout', accounts_1.default.logoutAccount);
exports.default = router;
