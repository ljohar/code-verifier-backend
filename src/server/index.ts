import express, { Express, Request, Response } from "express";

//Swagger
import swaggerUi from 'swagger-ui-express';

// Security
import cors from 'cors';
import helmet from 'helmet';

// TODO HHTPS

// Root Router
import rootRouter from'../routes';
import mongoose from "mongoose";


//Create Express App
const server: Express = express();

// * Swagger config and route
server.use(
    '/docs',
    swaggerUi.serve,
    swaggerUi.setup(undefined, {
        swaggerOptions:{
            url: "/swagger.json",
            explorer: true
        }
    })

)


//Define SERVER to use "/api" api and use rootRouter from 'index.ts' in routes
//From this point onover: http://localhost:8000/api/...
server.use(
    '/api',
    rootRouter
);


//Static server (tsoa docs)

server.use(express.static('public'));

//Moongoose Connection
mongoose.connect('mongodb://localhost:27017/codeVerification')


//Security Config
server.use(helmet());
server.use(cors());

//Content Type Config
server.use(express.urlencoded({ extended: true, limit: '50mb' }))
server.use(express.json({limit: '50mb'}));


// Redirection Config
//http://localhost:8000/ --> http://localhost:8000/api/

server.get('/', (req: Request, res: Response) => {
    res.redirect('/api');
});

export default server


