import winston from 'winston';
import 'dotenv/config';
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import LogdnaWinston from 'logdna-winston';
import appRoot from 'app-root-path';

const options = {
    file: {
        level: 'info',
        filename: `${appRoot}/logs/app.log`,
        handleExceptions: true,
        json: true,
        maxsize: 5242880,
        maxFiles: 5,
        colorize: false,
    },
    console: {
        level: 'debug',
        handleExceptions: true,
        json: false,
        colorize: true,
    },
};

const logger = winston.createLogger({
    transports: [
        new winston.transports.File(options.file),
        new winston.transports.Console(options.console),
    ],
    exitOnError: false,
});

if (process.env.NODE_ENV === 'production') {
    logger.add(
        new LogdnaWinston({
            key: process.env.LOGDNA_API_KEY,
            handleExceptions: true,
            app: 'USSD',
            env: process.env.NODE_ENV,
            index_meta: true,
        }),
    );
}

export default logger;
