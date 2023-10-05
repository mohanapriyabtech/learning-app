import mongoose from 'mongoose';
import dotenv from 'dotenv';
import Express from './express';
import { Sequelize } from 'sequelize';


// Basic configuration 
export default class BaseConfig extends Express {

    constructor() {
        super()
        //set mongoose
        this.mongoose = mongoose;
        //set environment variables
        this.ENV = dotenv.config().parsed;
        //connecting seqalize for other sql db's
        // this.sequelize = new Sequelize({
        //     database: this.ENV.SQL_DB_NAME,
        //     username: this.ENV.SQL_USERNAME,
        //     password: this.ENV.SQL_PASSWORD,
        //     host: this.ENV.SQL_HOST,
        //     port: this.ENV.SQL_PORT,
        //     dialect: this.ENV.SQL_DB,
        //     logging: false
        // });
    }
}

