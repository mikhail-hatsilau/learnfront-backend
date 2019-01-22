import { Request, Response } from 'express';

const healthCheckController = (req: Request, res: Response) => {
    res.json({
        working: true
    });
};

export default healthCheckController;
