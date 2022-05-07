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
        let intents: string[] = []   
        let stars: number = req?.body?.stars || 0;
        let creator: string = res.locals.loggedUser._id;
        let solution: string = req?.body?.solution || 'Default solution';
        let participants: string[] = req?.body?.participants || [];
        let ratings: number[] = []
        

        if(name && description && level && stars >= 0 && creator && solution && participants){
            
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
                ratings: ratings
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
        //Obtain a Query Param (Id)
        let id: any = req?.query.id;

        // Obtain the logged in User ID 
        let userId: any = res.locals.loggedUser?._id

        // Obtain Kata creator
        // Controller Instance to execute methods
        const controller: KataController = new KataController();
        let creator: any = ""

        // TODO EXTRACT ANOTHER PROPERTIES THAT SHOULDN'T BE MODIFIED
        await controller.getKatas(1,1,id).then((kata:any) => {
            creator = kata.creator
            console.log('kata creator:', creator, kata.creator );
            console.log('User ID:', userId);
            console.log('Verifing kata creator:', userId == creator);
        } );

        // Read from body 
        let name: string = req?.body?.name;
        let description: string = req?.body?.description || 'Default description';
        let level: KataLevel = req?.body?.level || KataLevel.BASIC;
        let intents: string[]= []
        let stars: number = req?.body?.stars || 0;
        let solution: string = req?.body?.solution || 'Default solution';
        let participants: string[] = req?.body?.participants || [];
        let ratings: number[] = []
        
        let kataSent: IKata = {
            name: name || "default",
            description: description || 'No description',
            level: level,
            intents: intents, 
            stars: stars,
            creator: creator,
            solution: solution,
            participants: participants,
            ratings: ratings
        }

        console.log('Kata sent:', kataSent);
        

        
        
        // Only the kata creator can make updatings
        if(userId == creator){

            if(name && description && level  && stars >= 0 && solution && participants){
    
                let kata: IKata = {
                    name: name || "default",
                    description: description || 'No description',
                    level: level,
                    intents: intents, 
                    stars: stars,
                    creator: creator,
                    solution: solution,
                    participants: participants,
                    ratings: ratings
                }   
    
            // Obtain response
            const response: any = await controller.updateKataById(id, kata)
    
            // send to the client the response 
            return res.send(response);   
    
            }else{
                return res.status(400).send({
                    message: '[ERROR] Updating Kata. All kata fields are required'
                });
            }

        }else{
            return res.status(400).send({
                message: '[ERROR] Updating Kata. User is not authorized to make modifications to this entry'
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

    // TODO refactor following the new kata schema
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

    katasRouter.route('/star/stars')
    // PUT - Add stars
    .put(verifyToken, async (req: Request, res: Response)=>{
        //Obtaion a Query Params
        let id: any = req?.query.id;
        let stars: any = req?.query.user_star;

        if(stars>0 && stars<=5){

        //Controller Instance to execute method
        const controller: KataController = new KataController();

        //Obtain Response
        const response: any = await controller.addStars(id, stars);

        //Send to the client the response
        return res.send(response);

        }else{
            return res.status(400).send({
                message: '[ERROR] Rating Kata. Rating must be in the range of 1 to 5'
            });
        }
    })

    katasRouter.route('/intents')
    // PUT - Send a solution
    .put(jsonParser, verifyToken, async (req: Request, res: Response) => {
        //Obtain a Query Param (Id)
        let id: any = req?.query.id;

        // Obtain the logged in User ID 
        //let userId: any = res.locals.loggedUser?._id

        // Read from body
        let solution: any = req?.body.solution 

        

        if(solution){

            // Controller Instance to execute methods
            const controller: KataController = new KataController();

            // Obtain response
            const response: any = await controller.tryToSolveKata(id, solution)

            
    
            // Send to the client the response 
            return res.send(response);
            
        }else{
            return res.status(400).send({
                message: '[ERROR] Solving Kata. Please provide your solution'
            });
        }
    })

//Export Kata Router
export default katasRouter;