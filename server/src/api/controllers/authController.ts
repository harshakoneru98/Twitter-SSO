import { Request, Response } from 'express';

export default class AuthController {
    // Request User Token
    public request_token = async (req: Request, res: Response) => {
        try {
            
        } catch (err) {
            res.status(500).json({
                message: err
            });
        }
    };
}
