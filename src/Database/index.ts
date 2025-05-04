import { Sequelize,Dialect } from "sequelize";
import dotenv from 'dotenv';
dotenv.config();

const database = process.env.DB_NAME as string;
const username = process.env.DB_USERNAME as string;
const password = process.env.DB_PASSWORD as string;
const dialect = (process.env.DB_DIALECT as Dialect) ?? "mysql";
const host = process.env.DB_HOST as string;
const port = parseInt(process.env.PORT as string);

const sequelize = new Sequelize(database,username,password,{
    dialect,
    host,
    port,
    logging: false
})

export default sequelize;


