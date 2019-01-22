import { Request, Response } from 'express';

const taskController = (req: Request, res: Response) => {
    res.json({
        tasks: []
    });
};

export default taskController;
