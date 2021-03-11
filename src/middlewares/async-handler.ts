import { Response, NextFunction } from 'express';
import { OK } from '../constants/status-codes';
import logger from '../helpers/logger';
import textResponse from '../helpers/text-response';
import { APPLICATION_DOWN } from '../helpers/messages';
import sessionActions from '../constants/session-actions';

const asyncHandler = (cb: any) => async (req: any, res: Response, next?: NextFunction): Promise<any> => {
    const { activity } = req;
    try {
        await cb(req, res, next);
    } catch (error) {
        logger.error(error);
        logger.info(`failed ${error.message}`);
        const { tillNumber } = activity.payload;

        if (tillNumber) {
            logger.error(`save plus failed, till ${tillNumber}, ${error.message}`);
        }

        let text = APPLICATION_DOWN;
        if (
            process.env.NODE_ENV === 'production' &&
            error?.response?.status !== 400 &&
            error?.response?.status !== 401 &&
            error?.response?.status !== 403 &&
            error?.response?.status !== 404 &&
            error?.response?.status !== 409 &&
            error?.response?.status !== 408 &&
            error?.code !== 'ECONNABORTED'
        ) {
            logger.error(error);
        }

        await activity?.update({
            status: 'exited',
            comment: error.message,
        });

        if (error?.response?.status >= 400 && error?.response?.status < 500) {
            text = error?.response?.data?.message || text;
        }

        return textResponse({
            res,
            status: OK,
            text,
            sessionAction: sessionActions.terminate,
        });
    }
};

export default asyncHandler;
