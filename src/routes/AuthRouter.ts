import express, { Request, Response } from "express";
import { AuthController } from "../controller/AuthController";
import { IUser } from "../domain/interfaces/IUser.interface";
import { IAuth } from "../domain/interfaces/IAuth.interface";

// BCRYPT
import bcrypt from 'bcrypt';

// MiddleWare
import { verifyToken } from "../middlewares/verifyToken.middleware";

// Body Parser (Read JSON from Body in Requests)
import bodyParser from "body-parser";
import { visitIterationBody } from "typescript";

//Router from express
let authRouter = express.Router();

// Middleware to read JSON from body
let jsonParser = bodyParser.json();

authRouter.route('/register')
.post( jsonParser, async (req: Request, res: Response) => {

    let { name, email, password, age } = req?.body;
    let hashedPassword = '';
    if(name && password && email && age ){
        // Obtaion the password in request and cypher
        hashedPassword = bcrypt.hashSync(password, 8)
        
        let newUser: IUser = {
            name: name,
            email: email,
            password: hashedPassword,
            age: age,
            katas: []
        }

        //Controller Instance to execute method
        const controller: AuthController = new AuthController();

        //Obtain Response
        const response: any = await controller.registerUser(newUser);

        //Send to the client the response
        return res.status(200).send(response);


    }


})



authRouter.route('/login')
.post( jsonParser, async (req: Request, res: Response) => {

    let { email, password } = req?.body;
    
    if(email && password){

        //Controller Instance to execute method
        const controller: AuthController = new AuthController();
        
        let auth: IAuth = {
            email,
            password
        }

        //Obtain Response
        const response: any = await controller.loginUser(auth);
        
        //Send to the client the response which includes de JWT to authorize requests
        return res.status(200).send(response);
    }else{
        //Send to the client the response
        return res.status(400).send({
            message: '[ERROR User data missing] No user can be registered'
        });

    }


});

// Route Protected by verify token middleware
authRouter.route('/me')
    .get(verifyToken, async (req: Request, res: Response) => {

        // Obtain the logged in User ID 
        let id: any = res.locals.loggedUser?._id

        if(id) {
            // Controller: Auth COntroller
            const controller: AuthController = new AuthController();

            // Obtain response form Controller
            let response: any = await controller.userData(id);

            // If user is authorized:
            return res.status(200).send(response);


        }else{
            return res.status(401).send({
                message: 'You are not authorized to perform this action'
            })

        }

    })




//Export Auth Router
export default authRouter;