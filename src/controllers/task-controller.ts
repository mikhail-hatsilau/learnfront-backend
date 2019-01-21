import { Request, Response } from 'express';

const taskController = (req: Request, res: Response) => {
    res.json({
        success: true
    });
};

export default taskController;
