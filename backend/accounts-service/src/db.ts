import  {Sequelize} from 'sequelize';

//Variaveis de ambiente
const dbName = process.env.DB_NAME!;
const dbUser = process.env.DB_USER!;
const dbPassword = process.env.DB_PASSWORD;
const dbHost = process.env.DB_HOST; 

//Contrutor
const sequelize = new Sequelize(dbName, dbUser, dbPassword, {
    dialect: 'mysql',
    host: dbHost
});

export default sequelize;