import express, { Request, Response } from "express";
import { UserController } from "../controller/UsersController";
import { LogInfo } from "../utils/logger";
import { IUser } from "../domain/interfaces/IUser.interface";



//Router from express
let usersRouter = express.Router();

// Body Parser to read BODY from requests
import bodyParser from "body-parser";

let jsonParser = bodyParser.json();

//http:localhost:8000/api/users?id=6256e3dd6d173f7b990593a5
usersRouter.route('/')
    // GET:
    .get(async (req: Request, res: Response)=>{
        //Obtaion a Query Param (Id)
        let id: any = req.query?.id;
        LogInfo(`Query Param: ${id}`);
        //Controller Instance to execute method
        const controller: UserController = new UserController();
        //Obtain Response
        const response: any = await controller.getUsers(id);
        //Send to the client the response
        return res.status(200).send(response);
    })// DELETE:
    .delete(async (req: Request, res: Response)=>{
        let id: any = req.query?.id;
        LogInfo(`Query Param: ${id}`);
        //Controller Instance to execute method
        const controller: UserController = new UserController();
        //Obtain Response
        const response: any = await controller.deleteUser(id);
        //Send to the client the response
        return res.status(200).send(response);
    })
    // PUT
    .put(async (req: Request, res: Response) =>{
        //Obtain a Query Param (Id)
        let id: any = req.query?.id;
        let name: any = req?.query.name;
        let email: any = req?.query.email;
        let age: any = req?.query.age;
        LogInfo(`Query Params: ${id}, ${name}, ${age}, ${email}`);

        //Controller Instance to execute method
        const controller: UserController = new UserController();
        let user = {
            name: name,
            email: email,
            age: age
        }

        //Obtain Response
        const response: any = await controller.updateUserById(id, user);

        //Send to the client the response
        return res.status(200).send(response);
        // A 204 status wouldn't return the message

    })




//Export Users Router
export default usersRouter;





/**
 * 
 * Get documents => 200 ok
 * Create documents => 201 ok
 * Delete  documents => 200(Entity) / 204(No return)
 * Update documents => 200(Entity) / 204(No return)
 * 
 */