import signale from 'signale';

export interface CompleteLog {
    prefix: string;
    message: string;
    suffix?: string;
}

export const PREFIX_LOG = 'Autofi-TEST-API';

export class Logger {
    static debug(message: any) {
        signale.debug(message);
    }

    static error(e: any) {
        signale.fatal(e);
    }

    static success(message: string) {
        signale.success(message);
    }

    static complete(log: CompleteLog) {
        if (log.suffix) {
            signale.complete({ prefix: log.prefix, message: log.message, suffix: log.suffix });
        } else {
            signale.complete({ prefix: log.prefix, message: log.message });
        }
    }
}
