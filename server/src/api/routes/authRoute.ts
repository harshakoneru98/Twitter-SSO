// Importing express package
import * as express from 'express';

// Router-level middleware works in the same way as application-level middleware, 
// except it is bound to an instance of express.Router().
const router = express.Router();

// Get Order Controller
import AuthController from '../controllers/authController'

// Creating object for OrdersController Class
const Controller = new AuthController()

// Getting trusted ticket from tableau server
router.post('/request_token', Controller.request_token)

export default router;