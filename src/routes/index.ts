import { Router } from 'express';
import controller from '../controllers/MainController';

const router = Router();

router.get('/ussd-app/:type', controller.home);

export default router;
