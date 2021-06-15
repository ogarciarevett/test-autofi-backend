import mongoose from 'mongoose';
import { Application } from 'express';
import Environment from './environment';
import { Logger, PREFIX_LOG } from './utils/logger';
import { MongoMemoryServer } from 'mongodb-memory-server';

const connect = async (app?: Application) => {
    let mongoUrl: string = Environment.mongo.url as string;
    if (Environment.useMemoDb) {
        const mongod = new MongoMemoryServer();
        Logger.debug('Using memory db');
        const connected = Boolean(await mongod.getInstanceInfo());
        connected ? (mongoUrl = await mongod.getUri()) : null;
    }

    await mongoose.connect(mongoUrl, {
        useNewUrlParser: true,
        useCreateIndex: true,
        autoIndex: true,
        useUnifiedTopology: true,
        socketTimeoutMS: 0,
        useFindAndModify: false,
    });
    mongoose.Promise = global.Promise;
    mongoose.set('debug', true);
    if (app) {
        app.set('mongooseClient', mongoose);
    }
    Logger.success(`[${PREFIX_LOG}]: Connected to ${mongoUrl}`);
};

export default connect;
