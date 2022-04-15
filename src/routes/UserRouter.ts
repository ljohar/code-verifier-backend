import express, { Request, Response } from "express";
import { UserController } from "../controller/UsersController";
import { LogInfo } from "../utils/logger";

//Router from express
let usersRouter = express.Router();

//http:localhost:8000/api/users?id=6256e3dd6d173f7b990593a5
usersRouter.route('/')
    //GET:
    .get(async (req: Request, res: Response)=>{
        //Obtaion a Query Param (Id)
        let id: any = req.query?.id;
        LogInfo(`Query Param: ${id}`);
        //Controller Instance to execute method
        const controller: UserController = new UserController();
        //Obtain Response
        const response: any = await controller.getUsers(id);
        //Send to the client the response
        return res.send(response);
    })// DELETE:
    .delete(async (req: Request, res: Response)=>{
        let id: any = req.query?.id;
        LogInfo(`Query Param: ${id}`);
        //Controller Instance to execute method
        const controller: UserController = new UserController();
        //Obtain Response
        const response: any = await controller.deleteUser(id);
        //Send to the client the response
        return res.send(response);
    })
    // POST:
    .post(async (req: Request, res: Response) => {
        let name: any = req?.query.name;
        let email: any = req?.query.email;
        let age: any = req?.query.age;
        //Controller Instance to execute method
        const controller: UserController = new UserController();
        let user = {
            name: name || "default",
            email: email || 'default email',
            age: age || 18
        }
        //Obtain Response
        const response: any = await controller.createUser(user);
        //Send to the client the response
        return res.send(response);
    })
    // PUT
    .put(async (req: Request, res: Response) =>{
        //Obtaion a Query Param (Id)
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
        return res.send(response);

    })


// usersRouter.route('/:user-id') instead of query params

//Export Hello Router
export default usersRouter;