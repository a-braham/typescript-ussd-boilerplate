import asyncHandler from '../middlewares/async-handler';
import textResponse from '../helpers/text-response';
import { APPLICATION_UNDER_MAINTENANCE } from '../helpers/messages';
import sessionActions from '../constants/session-actions';
import logger from '../helpers/logger';

/**
 * @description a dummy class to showcase how controllers should structured
 * @class Main
 */
class MainController {
    /**
     * @author user
     * @param {any} req
     * @param {object} res
     * @returns {Object} Returns an object
     */
    static home = asyncHandler(async (req: any, res: any) => {
        const { msisdn, session_id: sessionId, input } = req.query;
        let menu;
        logger.info('Main Run successfully');

        return textResponse({
            res,
            text: menu || APPLICATION_UNDER_MAINTENANCE,
            sessionAction: menu
                ? sessionActions.continue
                : sessionActions.terminate,
        });
    });
}

export default MainController;
