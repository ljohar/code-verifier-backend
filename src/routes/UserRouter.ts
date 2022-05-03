import express, { Request, Response } from "express";
import { UserController } from "../controller/UsersController";
import { KataController } from "../controller/KatasController";
import { LogInfo } from "../utils/logger";
import { IUser } from "../domain/interfaces/IUser.interface";



//Router from express
let usersRouter = express.Router();

// Body Parser to read BODY from requests
import bodyParser from "body-parser";

let jsonParser = bodyParser.json();

// JWT verifier MiddleWare
import { verifyToken } from "../middlewares/verifyToken.middleware";

//http:localhost:8000/api/users?id=6256e3dd6d173f7b990593a5
usersRouter.route('/')
    // GET:
    .get(verifyToken, async (req: Request, res: Response)=>{
        //Obtaion a Query Param (Id)
        let id: any = req.query?.id;
        
        // Pagination
        let page: any = req.query?.page || 1;
        let limit: any = req.query?.limit || 10;

        LogInfo(`Query Param: ${id}`);
        //Controller Instance to execute method
        const controller: UserController = new UserController();
        //Obtain Response
        const response: any = await controller.getUsers(page, limit, id);
        //Send to the client the response
        return res.status(200).send(response);
    })// DELETE:
    .delete(verifyToken, async (req: Request, res: Response)=>{
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
    .put(verifyToken, async (req: Request, res: Response) =>{
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
        // A 204 status wouldn't return a message

    });

usersRouter.route('/katas')
    .get(verifyToken, async (req: Request, res: Response) => {
        //Obtain a Query Param (Id)
        let id: any = req.query?.id;
        
        // Pagination
        let page: any = req.query?.page || 1;
        let limit: any = req.query?.limit || 10;

        //Controller Instance to execute method
        const controller: UserController = new UserController();
        //Obtain Response
        const response: any = await controller.getKatas(page, limit, id);
        //Send to the client the response
        return res.status(200).send(response);
    });

usersRouter.route('/katas/stars')
    .get(verifyToken, async (req: Request, res: Response) => {
        // Obtain query Param (Kata Id and user stars)
        let id: any = req.query?.id;
        let user_star: any = req.query?.user_star;
        LogInfo(`Query Params: ${id} and ${user_star}`);

        //Controller Instance to execute method
        const controller: KataController = new KataController();
        //Obtain Response
        const response: any = await controller.addStars(id, user_star);
        //Send to the client the response
        return res.status(200).send(response);


    });



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