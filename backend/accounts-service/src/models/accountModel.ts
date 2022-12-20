//definição da tabela de bd
import Sequelize, {Model, Optional} from 'sequelize';
import database from '../db'; //inportando objeto Sequelize como database
import {IAccount} from './account';

//AccountCreationAttributes são os campos opcionais para insert
interface AccountCreationAttributes extends Optional<IAccount, "id">{}

//Devo extender classe Model para informar o type corresponte na minha aplicação(IAccount) 
//e os atributos que serão opcionais em casos de insert
export interface AccountModel extends Model<IAccount, AccountCreationAttributes>, IAccount{}

//Definir o schema que siga as regras da interface
//Utilizar o AccountModel como generics para definir que a minha tabela siga as regras da interface IAccount e AccountCreationAttributes
const accountModel = database.define<AccountModel>('account',{    
    id: {
        type: Sequelize.INTEGER.UNSIGNED,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false
    },
    name: {
        type: Sequelize.STRING,
        allowNull: false
    },
    email: {
        type: Sequelize.STRING,
        allowNull: false
    },
    password: {
        type: Sequelize.STRING,
        allowNull: false
    },
    status: {
        type: Sequelize.SMALLINT.UNSIGNED,
        allowNull: false,
        defaultValue: 100
    },
    domain: {
        type: Sequelize.STRING,
        allowNull: false
    }
});

//(função assincrona) usar generics <AccountModel> expressa explicitamente que o findAll usa a interface accountModel e durante o desenvolvimento concede autocomplete de seus atributos 
function findAll(){
    return accountModel.findAll<AccountModel>(); 
};    

function findById(id: number){
    return accountModel.findByPk<AccountModel>(id);
};

function add(account: IAccount){
    return accountModel.create(account);
};

export default { findAll, findById, add };