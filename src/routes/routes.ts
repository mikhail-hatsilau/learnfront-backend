import express from 'express';
import taskController from '../controllers/task-controller';

const router = express.Router();

router.get('/tasks', taskController);

export default router;
