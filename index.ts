import express, { Express, Request, Response } from "express";
import dotenv from 'dotenv';

//Configuration the .env file
dotenv.config();

//Create Express App
const app: Express = express();
const port:  string | number = process.env.PORT || 8000;

//Define the first Route of APP
app.get('/',(req:Request, res:Response)=>{
    //Send Hello World
    res.send('Welcome to API Restful: Express + Nodemon + Jest + TS + Swagger + Mongoose')
});

//Define the first Route of APP
app.get('/hello',(req:Request, res:Response)=>{
    //Send Hello World
    res.send('Welcome to GET Route: Hello ')
});

//Execute APP and listen request to PORT
app.listen(port, ()=>{
    console.log(`EXPRESS SERVER: Running at http://localhost:${port}`)
})