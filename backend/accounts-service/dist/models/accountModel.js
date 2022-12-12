"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
//definição da tabela de bd
const sequelize_1 = __importDefault(require("sequelize"));
const db_1 = __importDefault(require("../db"));
//Definir o schema que siga as regras da interface
//Utilizar o AccountModel como generics para definir que a minha tabela siga as regras da interface IAccount e AccountCreationAttributes
const accountModel = db_1.default.define('account', {
    id: {
        type: sequelize_1.default.INTEGER.UNSIGNED,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false
    },
    name: {
        type: sequelize_1.default.STRING,
        allowNull: false
    },
    email: {
        type: sequelize_1.default.STRING,
        allowNull: false
    },
    password: {
        type: sequelize_1.default.STRING,
        allowNull: false
    },
    status: {
        type: sequelize_1.default.SMALLINT.UNSIGNED,
        allowNull: false,
        defaultValue: 100
    },
    domain: {
        type: sequelize_1.default.STRING,
        allowNull: false
    }
});
//(função assincrona) usar generics <AccountModel> expressa explicitamente que o findAll usa a interface accountModel e durante o desenvolvimento concede autocomplete de seus atributos 
function findAll() {
    return accountModel.findAll();
}
;
function findById(id) {
    return accountModel.findByPk(id);
}
;
function add(account) {
    return accountModel.create(account);
}
;
exports.default = { findAll, findById, add };
