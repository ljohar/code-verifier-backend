import dotenv from 'dotenv';
import server from './src/server'
import { LogError, LogSuccess } from './src/utils/logger';

// * Configurate the .env file
dotenv.config();

const port = process.env.PORT || 8000;


// * Execute SERVER

server.listen(port, () => {
    LogSuccess(`[SERVER ON]: Running in http://localhost:${port}/api`);
});

// * Control SERVER ERROR
server.on('error', (error) => {
    LogError(`[SERVER ERROR]: ${error}`);
});

















// Send a Response 200 
// app.get('/goodbye',(req:Request, res:Response)=>{
//     res.status(200).json( {
//         "data":{
//             "message": "Goodbye, world"
//         }
//     })
// });

// Query parameters
// http://localhost:8000/hello/?name={name}
// app.get('/hello',(req:Request, res:Response)=>{
    
//     const name = req.query.name;

//     if(name==undefined || name===""){
//         res.status(200).json( {
//             "data":{
//                 "message": "Hola, anónimo"
//             }
//         })
//     }
//     res.status(200).json( {
//         "data":{
//             "message": "Hola, " + name
//         }
//     })
// });