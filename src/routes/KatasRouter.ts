import express, { Request, Response } from "express";
import { KataController } from "../controller/KatasController";
import { LogInfo } from "../utils/logger";

//Router from express
let katasRouter = express.Router();

// MiddleWare
import { verifyToken } from "../middlewares/verifyToken.middleware";

katasRouter.route('/')
    // GET
    .get(verifyToken, async (req: Request, res: Response)=>{
        //Obtaion a Query Param (Id, level)
        let id: any = req.query?.id;
        let level: any = req.query?.level;

        // Pagination
        let page: any = req.query?.page || 1;
        let limit: any = req.query?.limit || 10;

        LogInfo(`Query Param id: ${id}, level: ${level}`);
        //Controller Instance to execute method
        const controller: KataController = new KataController();
        //Obtain Response
        const response: any = await controller.getKatas(page, limit, id, level);
        //Send to the client the response
        return res.status(200).send(response);
    })
    // DELETE:
    .delete(verifyToken, async (req: Request, res: Response)=>{
        let id: any = req.query?.id;
        LogInfo(`Query Param: ${id}`);
        //Controller Instance to execute method
        const controller: KataController = new KataController();
        //Obtain Response
        const response: any = await controller.deleteKata(id);
        //Send to the client the response
        return res.send(response);
    })
    // POST:
    .post(verifyToken, async (req: Request, res: Response) => {
        let name: any = req?.query.name;
        let description: any = req?.query.description;
        let user: any = req?.query.user;
        let chances: any = req?.query.chances;
        let valoration: any = req?.query.valoration;
        //Controller Instance to execute method
        const controller: KataController = new KataController();
        let kata = {
            name: name || "default",
            description: description || 'No description',
            user: user || "default user",
            date: Date(),
            chances: chances || 0, 
            valoration: valoration || 0

        }
        //Obtain Response
        const response: any = await controller.createKata(kata);
        //Send to the client the response
        return res.send(response);
    })
    // PUT:
    .put(verifyToken, async (req: Request, res: Response) => {
        let id: any = req?.query.id;
        let name: any = req?.query.name;
        let description: any = req?.query.description;
        let user: any = req?.query.user;
        let chances: any = req?.query.chances;
        let valoration: any = req?.query.valoration;
        LogInfo(`Query Params: ${name}, ${description}, ${user}, ${chances}, ${valoration}`);
        //Controller Instance to execute method
        const controller: KataController = new KataController();
        let kata = {
            name: name || "default",
            description: description || 'No description',
            user: user || "default user",
            date: Date(),
            chances: chances || 0, 
            valoration: valoration || 0

        }
        //Obtain Response
        const response: any = await controller.updateKataById(id, kata);
        //Send to the client the response
        return res.send(response);
    })

    katasRouter.route('/:newest')
    // GET - sort by newest
    .get(verifyToken, async (req: Request, res: Response)=>{ 
        //Controller Instance to execute method
        const controller: KataController = new KataController();
        //Obtain Response
        const response: any = await controller.sortkatasByNewest();
        //Send to the client the response
        return res.send(response);
    })

    katasRouter.route('/:rating')
    // GET - sort by newest
    .get(verifyToken, async (req: Request, res: Response)=>{ 
        //Controller Instance to execute method
        const controller: KataController = new KataController();
        //Obtain Response
        const response: any = await controller.sortKatasByRatings();
        //Send to the client the response
        return res.send(response);
    })

    katasRouter.route('/:chances')
    // GET - sort by newest
    .get(verifyToken, async (req: Request, res: Response)=>{ 
        //Controller Instance to execute method
        const controller: KataController = new KataController();
        //Obtain Response
        const response: any = await controller.sortKatasByChances();
        //Send to the client the response
        return res.send(response);
    })


//Export Kata Router
export default katasRouter;