import express, { Express, Request, Response } from "express";
import dotenv from 'dotenv';

//Configuration the .env file
dotenv.config();

//Create Express App
const app: Express = express();
const port:  string | number = process.env.PORT || 8000;

//Define the first Route of APP
app.get('/',(req:Request, res:Response)=>{
    res.send('Welcome to API Restful: Express + Nodemon + Jest + TS + Swagger + Mongoose')
});

//Send a Response 200 
app.get('/goodbye',(req:Request, res:Response)=>{
    res.status(200).json( {
        "data":{
            "message": "Goodbye, world"
        }
    })
});

//Query parameters
//http://localhost:8000/hello/?name={name}
app.get('/hello',(req:Request, res:Response)=>{
    
    const name = req.query.name;

    if(name==undefined || name===""){
        res.status(200).json( {
            "data":{
                "message": "Hola, anónimo"
            }
        })
    }
    res.status(200).json( {
        "data":{
            "message": "Hola, " + name
        }
    })
});

//Execute APP and listen request to PORT
app.listen(port, ()=>{
    console.log(`EXPRESS SERVER: Running at http://localhost:${port}`)
})