import express from 'express';
import taskController from '../controllers/task-controller';

const router = express.Router();

router.post('/tasks/:id', taskController);

export default router;
