export default class Environment {
    static nodeEnv: string = process.env.NODE_ENV || 'local';

    static mongo = {
        url: String(process.env.MONGO_URL || 'mongodb://localhost:27017/autofi-test'),
    };

    static useMemoDb =
        process.env.MONGOMS_VERSION && process.env.MONGOMS_DOWNLOAD_DIR && process.env.MONGOMS_DOWNLOAD_URL;

    static port: number = parseInt(process.env.PORT || '3030', 10);
}
