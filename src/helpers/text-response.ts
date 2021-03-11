import { Response } from 'express';
import { OK } from '../constants/status-codes';

interface Params {
    res: Response;
    status?: number;
    text: string;
    sessionAction?: string;
}

/**
 * @param {Object} data,
 * @param {ServerResponse} response
 * @return {ServerResponse} Response
 */

const textResponse = ({ status = OK, res, sessionAction, text }: Params): Response => {
    if (sessionAction) {
        res.header('Freeflow', sessionAction.toString());
    }
    return res.status(status).send(text.replace(/ {2,}/g, '').replace(/[’]/g, ''));
};

export default textResponse;
