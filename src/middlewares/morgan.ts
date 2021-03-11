import morgan from 'morgan';
import logger from '../helpers/logger';
import moment from 'moment';

export default morgan(
    (tokens, req, res) =>
        [
            '\n',
            moment().format('YYYY-MM-DD hh:mm:ss:SS'),
            tokens.method(req, res),
            tokens.url(req, res),
            tokens.status(req, res),
            tokens.res(req, res, 'content-length'),
            '-',
            tokens['response-time'](req, res),
            'ms',
            '\n',
            '-'.repeat(100),
            `\nHeaders: ${JSON.stringify(req.headers)}`,
        ].join(' '),
    {
        stream: {
            write: (message: string): void => {
                logger.info(JSON.stringify(message));
            },
        },
    },
);
