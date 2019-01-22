import express from 'express';
import taskController from '../controllers/task-controller';
import healthCheckController from '../controllers/health-check-controller';

const router = express.Router();

router.get('/', healthCheckController);
router.get('/tasks', taskController);

export default router;
