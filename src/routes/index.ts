/**
 * Root Router
 * Redirections to Routers
 */

import express, { Request, Response } from 'express';
import helloRouter from './HelloRouter';
import { LogInfo } from '../utils/logger';
import goodbyeRouter from './GoodbyeRouter';

//Server instance 
let server = express();

//Router instance
let rootRouter = express.Router();

//Activate for requests to http://localhost:8000/api/

//GET: http://localhost:8000/api/
rootRouter.get('/', (req: Request, res: Response) => {
    LogInfo('GET: http://localhost:8000/api/')
    res.send('Welcome to API Restful: Express + Nodemon + Jest + TS + Swagger + Mongoose')
});

// Redirections to Routers and Controllers
server.use('/', rootRouter);
server.use('/hello', helloRouter); //http://localhost:8000/api/hello
server.use('/goodbye', goodbyeRouter); //http://localhost:8000/api/goodbye

export default server;
