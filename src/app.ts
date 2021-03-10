import express, { Response, Request } from 'express';
import cors from 'cors';
import methodOverride from 'method-override';
import helmet from 'helmet';

import morgan from './middlewares/morgan';
import routes from './routes';
import { OK } from './constants/status-codes';
import {
    APPLICATION_UNDER_MAINTENANCE,
    APPLICATION_DOWN,
} from './helpers/messages';
import logger from './helpers/logger';
import textResponse from './helpers/text-response';
import sessionActions from './constants/session-actions';


const app = express();

app.use(cors());
app.use(methodOverride('_method'));
app.use(helmet());
app.use(morgan);
app.use(function (req, res, next) {
    res.header('Freeflow', 'FB');
    res.header('Cache-Control', 'max-age=0');
    res.header('Pragma', 'no-cache');
    res.header('Expires', '-1');
    const { query } = req;
    if (query.sessionid) {
        query.session_id = query.sessionid;
    }
    if (query.sessionId) {
        query.session_id = query.sessionId;
    }
    if (query.sessionID) {
        query.session_id = query.sessionID;
    }
    if (query.newrequest) {
        query.new_request = query.newrequest;
    }
    next();
});
app.use(routes);
app.get('/', (req, res) => res.status(OK).send(APPLICATION_UNDER_MAINTENANCE));
app.use((req: Request, res: Response) => {
    const status = OK;
    const message = APPLICATION_DOWN;
    logger.error(`${status} - ${message} - ${req.originalUrl} - ${req.method} - ${req.ip}`);
    return textResponse({
        res,
        status,
        text: message,
        sessionAction: sessionActions.terminate,
    });
});

export default app;
