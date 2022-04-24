import express, { Request, Response } from "express";
import { KataController } from "../controller/KatasController";
import { LogInfo } from "../utils/logger";
import { IKata, KataLevel } from "../domain/interfaces/IKata.interface";

//Router from express
let katasRouter = express.Router();

// Body Parser to read BODY from requests
import bodyParser from "body-parser";

let jsonParser = bodyParser.json();

// JWT verifier MiddleWare
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
        // Controller Instance to execute method
        const controller: KataController = new KataController();
        // Obtain Response
        const response: any = await controller.deleteKata(id);
        // Send to the client the response
        return res.send(response);
    })
    // POST:
    .post(jsonParser, verifyToken, async (req: Request, res: Response) => {
        // Read from body 
        let name: string = req?.body?.name;
        let description: string = req?.body?.description || '';
        let level: KataLevel = req?.body?.level || KataLevel.BASIC;
        let intents: number = req?.body?.intents || 0;
        let stars: number = req?.body?.stars || 0;
        let creator: string = res.locals.loggedUser._id;
        let solution: string = req?.body?.solution || '';
        let participants: string[] = req?.body?.participants || [];
        let stars_array: number[] = []
        

        if(name && description && level && intents >= 0 && stars >= 0 && creator && solution && participants){
            
            //Controller Instance to execute method
            const controller: KataController = new KataController();
            
            let kata: IKata = {
                name: name || "default",
                description: description || 'No description',
                level: level,
                intents: intents, 
                stars: stars,
                creator: creator,
                solution: solution,
                participants: participants,
                stars_array: stars_array
            }

            //Obtain Response
            const response: any = await controller.createKata(kata);

            //Send to the client the response
            return res.status(201).send(response);

        }else{
            return res.status(400).send({
                message: '[ERROR] Creating Kata. All kata fields are required'
            });
        }
        
    })
    // PUT:
    .put(jsonParser, verifyToken, async (req: Request, res: Response) => {
        // Obtain a query param (ID)
        let id: any = req?.query.id;

        // Read from body 
        let name: string = req?.body?.name;
        let description: string = req?.body?.description || 'Default description';
        let level: KataLevel = req?.body?.level || KataLevel.BASIC;
        let intents: number = req?.body?.intents || 0;
        let stars: number = req?.body?.stars || 0;
        let creator: string = req?.body?.creator;
        let solution: string = req?.body?.solution || 'Default solution';
        let participants: string[] = req?.body?.participants || [];
        let stars_array: number[] = []
        
        let kataSent: IKata = {
            name: name || "default",
            description: description || 'No description',
            level: level,
            intents: intents, 
            stars: stars,
            creator: creator,
            solution: solution,
            participants: participants,
            stars_array: stars_array
        }

        console.log('Kata:', kataSent);

        // TODO create methods tu sum up stars and intents
        // TODO keep creator, it shouldn't be passed through the body

        if(name && description && level && intents >= 0 && stars >= 0 && creator && solution && participants){
            //Controller Instance to execute method
            const controller: KataController = new KataController();
            
            let kata: IKata = {
                name: name || "default",
                description: description || 'No description',
                level: level,
                intents: intents, 
                stars: stars,
                creator: creator,
                solution: solution,
                participants: participants,
                stars_array: stars_array
            }

            //Obtain Response
            const response: any = await controller.updateKataById(id, kata);

            //Send to the client the response
            return res.send(response);

        }else{
            return res.status(400).send({
                message: '[ERROR] Updating Kata. All kata fields are required'
            });
        }
        
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